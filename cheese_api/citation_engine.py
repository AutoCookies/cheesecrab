"""
Algorithmic citation assignment for 0.5B model outputs.

The LLM is never asked to place citation markers — it only extracts text.
This module matches the extracted answer back to the original retrieved chunks
using TF-IDF cosine similarity (with a word-overlap Jaccard fallback) and
programmatically inserts [N] markers sentence-by-sentence.
"""

from __future__ import annotations

import re
from typing import Optional

# ---------------------------------------------------------------------------
# TF-IDF backend (sklearn) with Jaccard fallback
# ---------------------------------------------------------------------------

_TFIDF_THRESHOLD = 0.15   # minimum cosine similarity to assign a citation
_JACCARD_THRESHOLD = 0.08  # fallback threshold


def _word_set(text: str) -> set[str]:
    return set(re.findall(r"[a-z0-9]+", text.lower()))


def _jaccard(a: str, b: str) -> float:
    sa, sb = _word_set(a), _word_set(b)
    if not sa or not sb:
        return 0.0
    return len(sa & sb) / len(sa | sb)


def _tfidf_scores(query: str, candidates: list[str]) -> list[float]:
    """Return cosine similarity scores between query and each candidate."""
    try:
        from sklearn.feature_extraction.text import TfidfVectorizer  # type: ignore
        from sklearn.metrics.pairwise import cosine_similarity         # type: ignore
        import numpy as np

        corpus = [query] + candidates
        vec = TfidfVectorizer(min_df=1, stop_words=None)
        matrix = vec.fit_transform(corpus)
        scores = cosine_similarity(matrix[0:1], matrix[1:]).flatten()
        return scores.tolist()
    except ImportError:
        # Fall back to Jaccard
        return [_jaccard(query, c) for c in candidates]


def best_chunk_index(sentence: str, chunks: list[str]) -> tuple[int, float]:
    """
    Return (index, score) of the chunk most similar to `sentence`.
    Returns (-1, 0.0) if no chunk clears the threshold.
    """
    if not chunks:
        return -1, 0.0
    scores = _tfidf_scores(sentence, chunks)
    best_i = int(max(range(len(scores)), key=lambda i: scores[i]))
    best_score = scores[best_i]
    threshold = _TFIDF_THRESHOLD
    try:
        from sklearn.feature_extraction.text import TfidfVectorizer  # noqa
    except ImportError:
        threshold = _JACCARD_THRESHOLD
    return (best_i, best_score) if best_score >= threshold else (-1, 0.0)


# ---------------------------------------------------------------------------
# Sentence splitter
# ---------------------------------------------------------------------------

_SENT_RE = re.compile(r'(?<=[.!?])\s+')


def _split_sentences(text: str) -> list[str]:
    parts = _SENT_RE.split(text.strip())
    return [p.strip() for p in parts if p.strip()]


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def assign_citations(
    answer: str,
    hits: list[dict],
) -> tuple[str, list[dict]]:
    """
    Programmatically assign [N] citation markers to `answer` sentences.

    Args:
        answer: Raw text extracted by the LLM (no markers).
        hits:   List of hit dicts with at minimum a "text" key and optionally
                "citation" (the metadata dict) and "chunk_id".

    Returns:
        (annotated_answer, ordered_citations)
        - annotated_answer: answer string with [N] appended after matched sentences.
        - ordered_citations: list of citation dicts in the order their [N] appears,
          deduplicated — one entry per unique chunk referenced.
    """
    if not hits or not answer.strip():
        return answer, []

    chunk_texts = [str(h.get("text", "")) for h in hits]
    sentences = _split_sentences(answer)

    # Map: chunk_index → citation number (1-based, assigned on first use)
    chunk_to_num: dict[int, int] = {}
    next_num = 1

    annotated_sentences: list[str] = []
    for sent in sentences:
        idx, score = best_chunk_index(sent, chunk_texts)
        if idx >= 0:
            if idx not in chunk_to_num:
                chunk_to_num[idx] = next_num
                next_num += 1
            annotated_sentences.append(f"{sent} [{chunk_to_num[idx]}]")
        else:
            annotated_sentences.append(sent)

    annotated = " ".join(annotated_sentences)

    # Build ordered citation list (ordered by citation number)
    ordered: list[tuple[int, dict]] = []
    for chunk_idx, num in sorted(chunk_to_num.items(), key=lambda x: x[1]):
        hit = hits[chunk_idx]
        ordered.append((num, hit.get("citation") or {
            "file": "unknown",
            "page": 0,
            "byte_offset": 0,
            "line": 0,
            "chunk_id": hit.get("chunk_id"),
            "score": hit.get("score"),
        }))

    citations = [c for _, c in ordered]
    return annotated, citations


def strip_llm_citation_artifacts(text: str) -> str:
    """Remove any [N] or (N) markers the LLM may have hallucinated itself."""
    text = re.sub(r'\s*\[\d+\]', '', text)
    text = re.sub(r'\s*\(\d+\)', '', text)
    return text.strip()
