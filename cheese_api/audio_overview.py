"""
Audio overview generator — 3-step prompt chain optimised for 0.5B models.

Instead of one massive prompt ("write a podcast about all these pages"), we
decompose the task into an assembly line where the LLM is a single-task worker:

  Step 1 — Extract: per-chunk bullet extraction (max_tokens=80 per call)
  Step 2 — Aggregate: pure-Python dedup + ranking (no LLM)
  Step 3 — Dialogue: per-bullet Host A → Host B exchange (max_tokens=120 + 80)

Each LLM call is ≤ 512 tokens total (prompt + completion), well within the
reliable operating range of a 0.5B model.
"""

from __future__ import annotations

import io
import os
import re
import threading
from dataclasses import dataclass, field
from pathlib import Path
from typing import Callable, Optional

import requests as _requests
from loguru import logger

_tts_lock = threading.Lock()


# ---------------------------------------------------------------------------
# LLM helper — constrained single-turn completion
# ---------------------------------------------------------------------------

def _cheesebrain_url() -> str:
    return os.environ.get("CHEESEBRAIN_URL", "http://127.0.0.1:8080").strip().rstrip("/")


def _llm_complete(prompt: str, max_tokens: int = 80) -> str:
    """
    Tight, single-task LLM call.
    temperature=0.3: just enough creativity to avoid robotic repetition.
    repeat_penalty=1.1: prevents the 0.5B loop-of-death.
    """
    model = os.environ.get("CHEESE_CHAT_MODEL", "")
    body: dict = {
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": max_tokens,
        "temperature": 0.3,
        "repeat_penalty": 1.1,
        "stream": False,
    }
    if model:
        body["model"] = model
    resp = _requests.post(
        f"{_cheesebrain_url()}/v1/chat/completions",
        json=body,
        timeout=60,
    )
    resp.raise_for_status()
    return resp.json()["choices"][0]["message"]["content"].strip()


# ---------------------------------------------------------------------------
# Step 1 — Extract: per-chunk bullet (one call per chunk, max_tokens=80)
# ---------------------------------------------------------------------------

def _extract_bullet(chunk_text: str) -> str:
    """Ask the model for a single key-point sentence from one chunk."""
    # Completion-style: model fills in after the colon
    prompt = (
        f"Text: {chunk_text[:400]}\n"
        f"Key point (one short sentence):"
    )
    try:
        return _llm_complete(prompt, max_tokens=80)
    except Exception as e:
        logger.warning(f"Bullet extraction failed: {e}")
        # Fallback: use first sentence of the chunk
        first = re.split(r'(?<=[.!?])\s+', chunk_text.strip())[0]
        return first[:200]


# ---------------------------------------------------------------------------
# Step 2 — Aggregate: pure-Python dedup + rank (no LLM)
# ---------------------------------------------------------------------------

def _word_set(text: str) -> set[str]:
    return set(re.findall(r"[a-z0-9]+", text.lower()))


def _jaccard(a: str, b: str) -> float:
    sa, sb = _word_set(a), _word_set(b)
    if not sa or not sb:
        return 0.0
    return len(sa & sb) / len(sa | sb)


def _dedupe_bullets(bullets: list[str], max_keep: int = 8) -> list[str]:
    """
    Remove near-duplicate bullets (Jaccard > 0.5) and keep the most
    informative ones (ranked by word count as a proxy for content density).
    """
    unique: list[str] = []
    for candidate in bullets:
        if not candidate.strip():
            continue
        if any(_jaccard(candidate, kept) > 0.5 for kept in unique):
            continue
        unique.append(candidate)

    # Rank by word count (more words = more specific = more useful)
    unique.sort(key=lambda s: len(s.split()), reverse=True)
    return unique[:max_keep]


# ---------------------------------------------------------------------------
# Step 3 — Dialogue: per-bullet Host A → Host B (two calls per bullet)
# ---------------------------------------------------------------------------

def _generate_exchange(bullet: str) -> tuple[str, str]:
    """
    Two tiny calls per key point.
    HOST_A: conversational statement about the point.
    HOST_B: brief reaction or follow-up.
    """
    prompt_a = (
        f"Key point: {bullet}\n"
        f"HOST_A (one engaging sentence about this):"
    )
    line_a = _llm_complete(prompt_a, max_tokens=120)

    prompt_b = (
        f"HOST_A said: {line_a}\n"
        f"HOST_B (one brief follow-up or reaction):"
    )
    line_b = _llm_complete(prompt_b, max_tokens=80)

    return line_a, line_b


# ---------------------------------------------------------------------------
# TTS + WAV helpers
# ---------------------------------------------------------------------------

def _tts_pyttsx3(text: str, rate: int = 150) -> bytes:
    import pyttsx3  # type: ignore
    with _tts_lock:
        engine = pyttsx3.init()
        engine.setProperty("rate", rate)
        tmp = Path(os.environ.get("RAG_DB_PATH", "/tmp")) / "_tts_tmp.wav"
        engine.save_to_file(text, str(tmp))
        engine.runAndWait()
        data = tmp.read_bytes()
        tmp.unlink(missing_ok=True)
        return data


def _tts_backend(text: str, speaker: str) -> bytes:
    try:
        rate = 140 if speaker == "HOST_A" else 160
        return _tts_pyttsx3(text, rate=rate)
    except ImportError:
        logger.warning("pyttsx3 not available; returning silent WAV placeholder")
        return (
            b'RIFF$\x00\x00\x00WAVEfmt \x10\x00\x00\x00\x01\x00'
            b'\x01\x00\x80\xbb\x00\x00\x00w\x01\x00\x02\x00\x10\x00'
            b'data\x00\x00\x00\x00'
        )


def _concat_wav_bytes(segments: list[bytes]) -> bytes:
    if not segments:
        return b''
    if len(segments) == 1:
        return segments[0]
    pcm_chunks = []
    sample_rate = 44100
    for seg in segments:
        if seg[:4] == b'RIFF' and seg[8:12] == b'WAVE':
            idx = seg.find(b'data', 12)
            if idx != -1:
                data_len = int.from_bytes(seg[idx + 4:idx + 8], 'little')
                pcm_chunks.append(seg[idx + 8: idx + 8 + data_len])
    combined = b''.join(pcm_chunks)
    data_len = len(combined)
    return (
        b'RIFF' + (data_len + 36).to_bytes(4, 'little') +
        b'WAVE' +
        b'fmt ' + (16).to_bytes(4, 'little') +
        (1).to_bytes(2, 'little') +
        (1).to_bytes(2, 'little') +
        sample_rate.to_bytes(4, 'little') +
        (sample_rate * 2).to_bytes(4, 'little') +
        (2).to_bytes(2, 'little') +
        (16).to_bytes(2, 'little') +
        b'data' + data_len.to_bytes(4, 'little') +
        combined
    )


# ---------------------------------------------------------------------------
# Job orchestration
# ---------------------------------------------------------------------------

@dataclass
class OverviewJob:
    job_id: str
    workspace_id: str
    status: str = "pending"
    error: Optional[str] = None
    output_path: Optional[str] = None
    _callbacks: list[Callable[[dict], None]] = field(default_factory=list)

    def emit(self, msg: dict):
        for cb in list(self._callbacks):
            try:
                cb(msg)
            except Exception:
                pass


_jobs: dict[str, OverviewJob] = {}
_jobs_lock = threading.Lock()


def run_overview_job(job: OverviewJob, chunks: list[str]):
    """
    3-step prompt chain — the backend is the orchestrator, the 0.5B LLM is a worker.

    chunks: list of raw text chunks retrieved from PomaiDB (each ≤ 400 chars used).
    """
    try:
        # ── Step 1: Extract one bullet per chunk ─────────────────────────────
        job.status = "extracting"
        job.emit({"status": "extracting", "total": len(chunks)})

        raw_bullets: list[str] = []
        for i, chunk in enumerate(chunks):
            bullet = _extract_bullet(chunk)
            raw_bullets.append(bullet)
            job.emit({"status": "extracting", "progress": i + 1, "total": len(chunks)})
            logger.debug(f"Bullet {i+1}/{len(chunks)}: {bullet[:60]}...")

        # ── Step 2: Pure-Python dedup + rank (no LLM) ────────────────────────
        job.status = "aggregating"
        job.emit({"status": "aggregating"})
        bullets = _dedupe_bullets(raw_bullets, max_keep=8)
        logger.info(f"Aggregated {len(raw_bullets)} bullets → {len(bullets)} unique key points")

        if not bullets:
            raise RuntimeError("No usable key points extracted from chunks")

        # ── Step 3: Per-bullet Host A/B dialogue ─────────────────────────────
        job.status = "scripting"
        job.emit({"status": "scripting", "total": len(bullets)})

        exchanges: list[tuple[str, str]] = []
        for i, bullet in enumerate(bullets):
            line_a, line_b = _generate_exchange(bullet)
            exchanges.append(("HOST_A", line_a))
            exchanges.append(("HOST_B", line_b))
            job.emit({"status": "scripting", "progress": i + 1, "total": len(bullets)})
            logger.debug(f"Exchange {i+1}: A={line_a[:40]}... B={line_b[:40]}...")

        # ── TTS: render each line ─────────────────────────────────────────────
        job.status = "synthesizing"
        job.emit({"status": "synthesizing", "total": len(exchanges)})

        wav_segments: list[bytes] = []
        for i, (speaker, text) in enumerate(exchanges):
            wav = _tts_backend(text, speaker)
            wav_segments.append(wav)
            job.emit({"status": "synthesizing", "progress": i + 1, "total": len(exchanges)})

        combined = _concat_wav_bytes(wav_segments)

        out_dir = Path(os.environ.get("RAG_DB_PATH", "/tmp")) / "overviews"
        out_dir.mkdir(parents=True, exist_ok=True)
        out_path = out_dir / f"{job.workspace_id}.wav"
        out_path.write_bytes(combined)

        job.output_path = str(out_path)
        job.status = "done"
        job.emit({"status": "done", "path": str(out_path), "exchanges": len(exchanges)})
        logger.success(f"Audio overview done: {len(exchanges)} lines → {out_path}")

    except Exception as e:
        job.status = "error"
        job.error = str(e)
        logger.error(f"Audio overview job {job.job_id} failed: {e}")
        job.emit({"status": "error", "error": str(e)})


def start_overview_job(job_id: str, workspace_id: str, chunks: list[str]) -> OverviewJob:
    """
    Start an overview job.
    `chunks` is a list of raw text strings (not the full context blob).
    """
    job = OverviewJob(job_id=job_id, workspace_id=workspace_id)
    with _jobs_lock:
        _jobs[job_id] = job
    t = threading.Thread(target=run_overview_job, args=(job, chunks), daemon=True)
    t.start()
    return job


def get_job(job_id: str) -> Optional[OverviewJob]:
    with _jobs_lock:
        return _jobs.get(job_id)
