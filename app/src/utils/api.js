import axios from 'axios';

// The Go agent runs on port 11435 by default
const API_PORT = 11435;
const api = axios.create({
    baseURL: `http://127.0.0.1:${API_PORT}/v1`,
    timeout: 120000, // 120 seconds to allow huge models to load into VRAM
});

export const fetchAIModels = async () => {
    const res = await api.get('/spaces/ai_models/local');
    return res.data || [];
};

export const pullAIModel = async (url, filename) => {
    const res = await api.post('/spaces/ai_models/pull', { url, filename });
    return res.data;
};

export const deleteAIModel = async (filename) => {
    const res = await api.delete(`/spaces/ai_models/${filename}`);
    return res.data;
};

export const fetchOSHealth = async () => {
    const res = await api.get('/spaces/os/health');
    return res.data;
};

export const fetchLogs = async () => {
    const res = await api.get('/spaces/os/logs');
    return res.data;
};

export const startServer = async () => {
    return await api.post(`/spaces/ai_models/server/start`);
};

export const stopServer = async () => {
    return await api.post(`/spaces/ai_models/server/stop`);
};

export const checkLoadedModels = async () => {
    try {
        const res = await api.get('/spaces/ai_models/proxy/v1/models');
        let models = res.data?.data || [];
        // The C++ server exposes vocabulary files as runnable models. Filter them permanently.
        models = models.filter(m => !m.id.startsWith('ggml-vocab-'));
        return models;
    } catch (e) {
        if (e.response?.status === 500) {
            // Server is likely off
            return [];
        }
        throw e;
    }
};

export const loadModelContext = async (modelName) => {
    // Sending a tiny completion request forces the llama-server to load the model into memory
    await api.post('/spaces/ai_models/proxy/v1/chat/completions', {
        model: modelName,
        messages: [{ role: 'user', content: 'hello' }],
        max_tokens: 1
    });
};

export const sendChatCompletion = async (model, messages) => {
    const res = await api.post('/spaces/ai_models/proxy/v1/chat/completions', {
        model,
        messages
    });
    return res.data;
};
