import re
import hashlib
from typing import List, Tuple
from loguru import logger
import fitz  # PyMuPDF for PDF parsing

def _chunk_bytes(text: str, max_bytes: int, overlap: int) -> List[str]:
    raw = text.encode("utf-8")
    if max_bytes <= 0:
        return [text]
    out: List[str] = []
    start = 0
    while start < len(raw):
        end = min(start + max_bytes, len(raw))
        piece = raw[start:end]
        out.append(piece.decode("utf-8", errors="replace"))
        if end >= len(raw):
            break
        start = max(0, end - overlap)
    return out if out else [""]

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

def process_and_ingest(text: str, max_bytes: int = 512, overlap: int = 64) -> List[Tuple[str, List[int]]]:
    """
    Takes raw text, applies smart chunking, and returns tokenized chunks ready for vector DB mapping.
    """
    logger.debug(f"Chunking text of length {len(text)} (max_bytes={max_bytes}, overlap={overlap})")
    chunks = _chunk_bytes(text, max_bytes, overlap)
    results = []
    for chunk in chunks:
        tokens = _token_ids_from_text(chunk)
        results.append((chunk, tokens))
    
    logger.success(f"Generated {len(results)} chunks")
    return results
