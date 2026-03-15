/**
 * Unified API for Cheesecrab: uses Wails bindings when available (desktop),
 * otherwise uses fetch against the same origin (web UI).
 */

export function isWeb() {
	return typeof window === 'undefined' || typeof window.go === 'undefined';
}

export function getApp() {
	return window.go?.main?.App ?? null;
}

/**
 * @returns {Promise<Array<Record<string, unknown>>>}
 */
export async function getModels() {
	const app = getApp();
	if (app && app.GetModels) {
		const out = await app.GetModels();
		return Array.isArray(out) ? out : [];
	}
	const res = await fetch('/api/models');
	if (!res.ok) throw new Error(`getModels: ${res.status}`);
	const data = await res.json();
	return Array.isArray(data?.data) ? data.data : (data && !Array.isArray(data) ? [] : (data || []));
}

/**
 * @returns {Promise<Array<Record<string, unknown>>>}
 */
export async function getSwarmAgents() {
	const app = getApp();
	if (app && app.GetSwarmAgents) {
		const out = await app.GetSwarmAgents();
		return Array.isArray(out) ? out : [];
	}
	try {
		const res = await fetch('/v1/agents');
		if (!res.ok) return [];
		const data = await res.json();
		return Array.isArray(data?.agents) ? data.agents : [];
	} catch {
		return [];
	}
}

/**
 * Stream chat completion. In Wails mode uses EventsOn('chat:token'|'chat:error'|'chat:done').
 * In web mode uses fetch + SSE parsing.
 * @param {{ model: string, messages: Array<{ role: string, content: string }> }} request
 * @param {{ onToken: (chunk: Record<string, unknown>) => void, onError: (err: string) => void, onDone: () => void }} callbacks
 */
export function chatCompletion(request, { onToken, onError, onDone }) {
	const app = getApp();
	if (app && app.ChatCompletion && window.runtime) {
		const cleanup = () => {
			try {
				window.runtime.EventsOff('chat:token');
				window.runtime.EventsOff('chat:error');
				window.runtime.EventsOff('chat:done');
			} catch (_) { }
		};
		window.runtime.EventsOn('chat:token', (chunk) => { try { onToken(chunk); } catch (_) { } });
		window.runtime.EventsOn('chat:error', (err) => { cleanup(); try { onError(String(err)); } catch (_) { } });
		window.runtime.EventsOn('chat:done', () => { cleanup(); try { onDone(); } catch (_) { } });
		app.ChatCompletion({ ...request, stream: true });
		return;
	}

	// Web: POST /v1/chat/completions with stream, parse SSE
	const body = JSON.stringify({ ...request, stream: true });
	fetch('/v1/chat/completions', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body,
	})
		.then((res) => {
			if (!res.ok) {
				res.text().then((t) => onError(t || `HTTP ${res.status}`)).catch(() => onError(`HTTP ${res.status}`));
				return;
			}
			const reader = res.body.getReader();
			const dec = new TextDecoder();
			let buf = '';
			function pump() {
				return reader.read().then(({ done, value }) => {
					if (done) {
						onDone();
						return;
					}
					buf += dec.decode(value, { stream: true });
					const lines = buf.split('\n');
					buf = lines.pop() ?? '';
					for (const line of lines) {
						if (line.startsWith('data: ')) {
							const data = line.slice(6);
							if (data === '[DONE]') {
								onDone();
								return;
							}
							try {
								const chunk = JSON.parse(data);
								onToken(chunk);
							} catch (_) { }
						}
					}
					return pump();
				});
			}
			return pump();
		})
		.catch((err) => onError(err?.message || String(err)));
}

/**
 * Pull a model (streaming progress). In Wails uses PullModel + EventsOn('pull:progress'|'pull:error').
 * In web mode uses POST /api/pull and parses NDJSON stream.
 * @param {string} name - Model name or URL
 * @param {{ onProgress: (data: Record<string, unknown>) => void, onError: (err: string) => void }} callbacks
 */
export function pullModel(name, { onProgress, onError }) {
	const app = getApp();
	if (app && app.PullModel && window.runtime) {
		window.runtime.EventsOn('pull:progress', (data) => { try { onProgress(data); } catch (_) { } });
		window.runtime.EventsOn('pull:error', (err) => { try { onError(String(err)); } catch (_) { } });
		app.PullModel(name);
		return;
	}
	const body = JSON.stringify({ model: name, stream: true });
	fetch('/api/pull', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body })
		.then((res) => {
			if (!res.ok) {
				res.text().then((t) => onError(t || `HTTP ${res.status}`)).catch(() => onError(`HTTP ${res.status}`));
				return;
			}
			const reader = res.body.getReader();
			const dec = new TextDecoder();
			let buf = '';
			function pump() {
				return reader.read().then(({ done, value }) => {
					if (done) return;
					buf += dec.decode(value, { stream: true });
					const lines = buf.split('\n');
					buf = lines.pop() ?? '';
					for (const line of lines) {
						if (line.trim()) {
							try {
								onProgress(JSON.parse(line));
							} catch (_) { }
						}
					}
					return pump();
				});
			}
			return pump();
		})
		.catch((err) => onError(err?.message || String(err)));
}

/**
 * Run an agent goal, streaming StreamEvents from POST /v1/agent/run.
 * @param {{ goal: string, model?: string, strategy?: string, max_steps?: number }} request
 * @param {{ onEvent: (ev: Record<string, unknown>) => void, onError: (err: string) => void, onDone: () => void }} callbacks
 * @returns {{ cancel: () => void }}
 */
export function agentRun(request, { onEvent, onError, onDone }) {
	const controller = new AbortController();
	const body = JSON.stringify(request);

	fetch('/v1/agent/run', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body,
		signal: controller.signal,
	})
		.then((res) => {
			if (!res.ok) {
				res.text().then((t) => onError(t || `HTTP ${res.status}`)).catch(() => onError(`HTTP ${res.status}`));
				return;
			}
			const reader = res.body.getReader();
			const dec = new TextDecoder();
			let buf = '';
			function pump() {
				return reader.read().then(({ done, value }) => {
					if (done) {
						onDone();
						return;
					}
					buf += dec.decode(value, { stream: true });
					const lines = buf.split('\n');
					buf = lines.pop() ?? '';
					for (const line of lines) {
						if (line.startsWith('data: ')) {
							const data = line.slice(6).trim();
							if (data === '[DONE]') {
								onDone();
								return;
							}
							try {
								const ev = JSON.parse(data);
								onEvent(ev);
							} catch (_) { }
						}
					}
					return pump();
				});
			}
			return pump();
		})
		.catch((err) => {
			if (err?.name !== 'AbortError') {
				onError(err?.message || String(err));
			}
		});

	return { cancel: () => controller.abort() };
}

/**
 * Approve or deny a pending dangerous tool call for a running agent session.
 * @param {string} sessionId
 * @param {boolean} approved
 * @returns {Promise<void>}
 */
export async function agentApprove(sessionId, approved) {
	const res = await fetch('/v1/agent/approve', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ session_id: sessionId, approved }),
	});
	if (!res.ok) {
		const t = await res.text();
		throw new Error(t || `agentApprove: HTTP ${res.status}`);
	}
}

/**
 * Send the result of a crabtable tool call back to the agent session.
 * @param {string} sessionId
 * @param {string} result
 * @returns {Promise<void>}
 */
export async function agentCrabTableResponse(sessionId, result) {
	const res = await fetch('/v1/agent/crabtable/response', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ session_id: sessionId, result }),
	});
	if (!res.ok) {
		const t = await res.text();
		throw new Error(t || `agentCrabTableResponse: HTTP ${res.status}`);
	}
}

/**
 * Fetch past agent run paths.
 * @returns {Promise<Array<Record<string, unknown>>>}
 */
export async function getAgentPaths() {
	try {
		const res = await fetch('/v1/agent/paths');
		if (!res.ok) return [];
		const data = await res.json();
		return Array.isArray(data?.paths) ? data.paths : [];
	} catch {
		return [];
	}
}

/**
 * Load a model by name.
 * @param {string} name
 * @returns {Promise<void>}
 */
export async function loadModel(name) {
	const app = getApp();
	if (app && app.LoadModel) {
		await app.LoadModel(name);
		return;
	}
	const res = await fetch('/models/load', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ model: name })
	});
	if (!res.ok) {
		const t = await res.text();
		throw new Error(t || `HTTP ${res.status}`);
	}
}
