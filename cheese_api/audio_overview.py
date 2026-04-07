"""Audio overview generator: LLM writes a Host A / Host B dialogue, then TTS renders it."""

from __future__ import annotations

import io
import json
import os
import re
import threading
from dataclasses import dataclass, field
from pathlib import Path
from typing import Callable, Optional

import requests
from loguru import logger

# Optional TTS backends — imported lazily
_tts_lock = threading.Lock()


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


def _cheesebrain_url() -> str:
    return os.environ.get("CHEESEBRAIN_URL", "http://127.0.0.1:8080").strip().rstrip("/")


def _build_dialogue_prompt(context_text: str) -> str:
    return (
        "You are a podcast scriptwriter. Write a lively 2-person dialogue (Host A and Host B) "
        "that summarizes the following document excerpts in an engaging, conversational way. "
        "Format:\nHOST_A: <text>\nHOST_B: <text>\n(alternate, 8-12 exchanges)\n\n"
        f"Document context:\n{context_text}\n\nDialogue:"
    )


def _call_llm(prompt: str) -> str:
    url = f"{_cheesebrain_url()}/v1/chat/completions"
    model = os.environ.get("CHEESE_CHAT_MODEL", "")
    body = {"messages": [{"role": "user", "content": prompt}], "stream": False}
    if model:
        body["model"] = model
    try:
        r = requests.post(url, json=body, timeout=120)
        r.raise_for_status()
        return r.json()["choices"][0]["message"]["content"]
    except Exception as e:
        raise RuntimeError(f"LLM call failed: {e}")


def _parse_dialogue(script: str) -> list[tuple[str, str]]:
    """Return list of (speaker, line) pairs."""
    lines = []
    for line in script.strip().splitlines():
        m = re.match(r"^(HOST_[AB]):\s*(.+)$", line.strip())
        if m:
            lines.append((m.group(1), m.group(2)))
    return lines


def _tts_pyttsx3(text: str, rate: int = 150) -> bytes:
    import pyttsx3  # type: ignore
    with _tts_lock:
        engine = pyttsx3.init()
        engine.setProperty("rate", rate)
        buf = io.BytesIO()
        # pyttsx3 can't stream to buffer directly; write to tmp file
        tmp = Path(os.environ.get("RAG_DB_PATH", "/tmp")) / "_tts_tmp.wav"
        engine.save_to_file(text, str(tmp))
        engine.runAndWait()
        with open(tmp, "rb") as f:
            data = f.read()
        tmp.unlink(missing_ok=True)
        return data


def _tts_backend(text: str, speaker: str) -> bytes:
    """Try available TTS backends in order."""
    try:
        # Slightly different rate for each speaker to differentiate voices
        rate = 140 if speaker == "HOST_A" else 160
        return _tts_pyttsx3(text, rate=rate)
    except ImportError:
        logger.warning("pyttsx3 not available; returning silent placeholder")
        # Return a minimal silent WAV (44 bytes)
        return (
            b'RIFF$\x00\x00\x00WAVEfmt \x10\x00\x00\x00\x01\x00'
            b'\x01\x00\x80\xbb\x00\x00\x00w\x01\x00\x02\x00\x10\x00'
            b'data\x00\x00\x00\x00'
        )


def _concat_wav_bytes(segments: list[bytes]) -> bytes:
    """Naively concatenate WAV files (assumes all same format — PCM)."""
    if not segments:
        return b''
    if len(segments) == 1:
        return segments[0]
    # Extract PCM data from each segment and rebuild a single WAV
    pcm_chunks = []
    sample_rate = 44100
    for seg in segments:
        if seg[:4] == b'RIFF' and seg[8:12] == b'WAVE':
            # Find 'data' chunk
            idx = seg.find(b'data', 12)
            if idx != -1:
                data_len = int.from_bytes(seg[idx + 4:idx + 8], 'little')
                pcm_chunks.append(seg[idx + 8: idx + 8 + data_len])
    combined = b''.join(pcm_chunks)
    data_len = len(combined)
    header = (
        b'RIFF' + (data_len + 36).to_bytes(4, 'little') +
        b'WAVE' +
        b'fmt ' + (16).to_bytes(4, 'little') +
        (1).to_bytes(2, 'little') +   # PCM
        (1).to_bytes(2, 'little') +   # mono
        sample_rate.to_bytes(4, 'little') +
        (sample_rate * 2).to_bytes(4, 'little') +  # byte rate
        (2).to_bytes(2, 'little') +   # block align
        (16).to_bytes(2, 'little') +  # bits per sample
        b'data' + data_len.to_bytes(4, 'little') +
        combined
    )
    return header


def run_overview_job(job: OverviewJob, context_text: str):
    try:
        job.status = "scripting"
        job.emit({"status": "scripting"})

        prompt = _build_dialogue_prompt(context_text[:8000])  # cap context
        script = _call_llm(prompt)
        lines = _parse_dialogue(script)

        if not lines:
            raise RuntimeError("LLM produced no parseable dialogue")

        job.status = "synthesizing"
        job.emit({"status": "synthesizing", "total": len(lines)})

        wav_segments: list[bytes] = []
        for i, (speaker, text) in enumerate(lines):
            wav = _tts_backend(text, speaker)
            wav_segments.append(wav)
            job.emit({"status": "synthesizing", "progress": i + 1, "total": len(lines)})

        combined = _concat_wav_bytes(wav_segments)

        out_dir = Path(os.environ.get("RAG_DB_PATH", "/tmp")) / "overviews"
        out_dir.mkdir(parents=True, exist_ok=True)
        out_path = out_dir / f"{job.workspace_id}.wav"
        out_path.write_bytes(combined)

        job.output_path = str(out_path)
        job.status = "done"
        job.emit({"status": "done", "path": str(out_path)})

    except Exception as e:
        job.status = "error"
        job.error = str(e)
        logger.error(f"Audio overview job {job.job_id} failed: {e}")
        job.emit({"status": "error", "error": str(e)})


def start_overview_job(job_id: str, workspace_id: str, context_text: str) -> OverviewJob:
    job = OverviewJob(job_id=job_id, workspace_id=workspace_id)
    with _jobs_lock:
        _jobs[job_id] = job
    t = threading.Thread(target=run_overview_job, args=(job, context_text), daemon=True)
    t.start()
    return job


def get_job(job_id: str) -> Optional[OverviewJob]:
    with _jobs_lock:
        return _jobs.get(job_id)
