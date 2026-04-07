import csv
import io
import re
import hashlib
from typing import List, Tuple, Optional
from loguru import logger
import fitz  # PyMuPDF for PDF parsing


def _chunk_bytes(text: str, max_bytes: int, overlap: int) -> List[Tuple[str, int]]:
    """Return (chunk_text, byte_offset_in_text) pairs."""
    raw = text.encode("utf-8")
    if max_bytes <= 0:
        return [(text, 0)]
    out: List[Tuple[str, int]] = []
    start = 0
    while start < len(raw):
        end = min(start + max_bytes, len(raw))
        piece = raw[start:end]
        out.append((piece.decode("utf-8", errors="replace"), start))
        if end >= len(raw):
            break
        start = max(0, end - overlap)
    return out if out else [("", 0)]


def _chunk_sentences(text: str, max_bytes: int) -> List[Tuple[str, int]]:
    """Sentence-aware chunking: split on sentence boundaries, group under max_bytes."""
    sentence_end = re.compile(r'(?<=[.!?])\s+')
    sentences = sentence_end.split(text)
    out: List[Tuple[str, int]] = []
    current: List[str] = []
    current_bytes = 0
    offset = 0
    chunk_start = 0

    for sent in sentences:
        sb = len(sent.encode("utf-8"))
        if current and current_bytes + sb > max_bytes:
            chunk = " ".join(current)
            out.append((chunk, chunk_start))
            chunk_start = offset
            current = [sent]
            current_bytes = sb
        else:
            current.append(sent)
            current_bytes += sb
        offset += len(sent.encode("utf-8")) + 1  # +1 for the space

    if current:
        out.append((" ".join(current), chunk_start))
    return out if out else [(text, 0)]


def _token_ids_from_text(s: str, max_tokens: int = 48) -> List[int]:
    words = re.findall(r"[A-Za-z0-9_]+", s.lower())
    ids: List[int] = []
    for w in words[:max_tokens]:
        digest = hashlib.sha1(w.encode("utf-8")).digest()
        ids.append(int.from_bytes(digest[:4], "little"))
    if not ids:
        ids = [0]
    return ids


def parse_pdf_bytes(file_bytes: bytes) -> str:
    try:
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text() + "\n"
        return text
    except Exception as e:
        logger.error(f"Failed to parse PDF: {e}")
        return ""


def parse_pdf_bytes_with_pages(file_bytes: bytes) -> List[Tuple[str, int]]:
    """Return (page_text, page_number) pairs (1-indexed). Falls back to OCR if page is empty."""
    pages: List[Tuple[str, int]] = []
    try:
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        for i, page in enumerate(doc):
            text = page.get_text()
            if not text.strip():
                # Try OCR fallback
                try:
                    tp = page.get_textpage_ocr(flags=fitz.TEXT_PRESERVE_WHITESPACE)
                    text = page.get_text(textpage=tp)
                except Exception:
                    pass
            pages.append((text, i + 1))
    except Exception as e:
        logger.error(f"Failed to parse PDF pages: {e}")
    return pages


def parse_csv_bytes(file_bytes: bytes) -> List[Tuple[str, int]]:
    """Return (row_chunk, row_number) pairs. Each chunk = header + one row."""
    try:
        text = file_bytes.decode("utf-8", errors="replace")
        reader = csv.reader(io.StringIO(text))
        rows = list(reader)
        if not rows:
            return []
        header = " | ".join(rows[0])
        chunks: List[Tuple[str, int]] = []
        for i, row in enumerate(rows[1:], start=1):
            chunk = f"{header}\n{' | '.join(row)}"
            chunks.append((chunk, i))
        return chunks
    except Exception as e:
        logger.error(f"Failed to parse CSV: {e}")
        return []


def process_and_ingest(text: str, max_bytes: int = 512, overlap: int = 64) -> List[Tuple[str, List[int]]]:
    """Legacy: returns (chunk_text, token_ids) without metadata. Backward-compatible."""
    logger.debug(f"Chunking text of length {len(text)} (max_bytes={max_bytes}, overlap={overlap})")
    chunks = _chunk_bytes(text, max_bytes, overlap)
    results = []
    for chunk_text, _ in chunks:
        tokens = _token_ids_from_text(chunk_text)
        results.append((chunk_text, tokens))
    logger.success(f"Generated {len(results)} chunks")
    return results


def process_file_with_meta(
    file_bytes: Optional[bytes],
    filename: str,
    text: Optional[str],
    max_bytes: int = 512,
    overlap: int = 64,
) -> List[Tuple[str, List[int], dict]]:
    """
    Parse and chunk a file or text, returning (chunk_text, token_ids, meta) triples.
    meta = {"file": str, "page": int, "byte_offset": int, "line": int}
    """
    fname = filename or "text"
    ext = fname.lower().rsplit(".", 1)[-1] if "." in fname else ""

    raw_chunks: List[Tuple[str, int, int]] = []  # (text, page, byte_offset)

    if file_bytes and ext == "pdf":
        pages = parse_pdf_bytes_with_pages(file_bytes)
        for page_text, page_num in pages:
            for chunk_text, offset in _chunk_sentences(page_text, max_bytes):
                if chunk_text.strip():
                    raw_chunks.append((chunk_text, page_num, offset))

    elif file_bytes and ext == "csv":
        rows = parse_csv_bytes(file_bytes)
        for row_text, row_num in rows:
            raw_chunks.append((row_text, 0, row_num))

    else:
        src = text or (file_bytes.decode("utf-8", errors="replace") if file_bytes else "")
        for chunk_text, offset in _chunk_bytes(src, max_bytes, overlap):
            if chunk_text.strip():
                raw_chunks.append((chunk_text, 0, offset))

    results: List[Tuple[str, List[int], dict]] = []
    for chunk_text, page, byte_offset in raw_chunks:
        tokens = _token_ids_from_text(chunk_text)
        # best-effort line number from byte offset
        line = 0
        if text and byte_offset > 0:
            line = text[:byte_offset].count("\n") + 1
        meta = {
            "file": fname,
            "page": page,
            "byte_offset": byte_offset,
            "line": line,
        }
        results.append((chunk_text, tokens, meta))

    logger.success(f"Generated {len(results)} chunks with metadata from '{fname}'")
    return results
