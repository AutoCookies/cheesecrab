import os
import ast
import re
import hashlib
from typing import List, Tuple
from loguru import logger

def extract_python_chunks(filepath: str, code: str) -> List[Tuple[str, str]]:
    """AST-based chunking for Python files."""
    chunks = []
    try:
        tree = ast.parse(code)
        lines = code.split("\n")
        for node in ast.iter_child_nodes(tree):
            if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef, ast.ClassDef)):
                start = getattr(node, "lineno", 1) - 1
                end = getattr(node, "end_lineno", len(lines))
                # Add context prefix
                chunk_code = f"File: {filepath}\nSymbol: {node.name}\n" + "\n".join(lines[start:end])
                chunks.append((f"{filepath}:{node.name}", chunk_code))
    except SyntaxError:
        pass
    return chunks

def extract_regex_chunks(filepath: str, code: str, lang: str) -> List[Tuple[str, str]]:
    """Naive regex-based block extraction for Go/C++."""
    chunks = []
    lines = code.split("\n")
    
    pattern = ""
    if lang == "go":
        pattern = r"^(func|type)\s+([A-Za-z0-9_]+)"
    elif lang in ("cpp", "c", "h"):
        pattern = r"^(class|struct|void|int|bool|string)\s+([A-Za-z0-9_:]+)\s*\("
    elif lang in ("js", "ts"):
        pattern = r"^(export\s+)?(function|class|const|let|async\s+function)\s+([A-Za-z0-9_]+)"
    elif lang == "rust":
        pattern = r"^(pub\s+)?(fn|struct|enum|impl|trait)\s+([A-Za-z0-9_]+)"
        
    if not pattern:
        return []

    current_block = []
    current_symbol = "global"
    
    for line in lines:
        match = re.match(pattern, line)
        if match:
            # Save previous block if it has substance
            if len(current_block) > 3:
                chunk_code = f"File: {filepath}\nSymbol: {current_symbol}\n" + "\n".join(current_block)
                chunks.append((f"{filepath}:{current_symbol}", chunk_code))
            current_block = [line]
            current_symbol = match.group(match.lastindex) # Grab the last name match
        else:
            current_block.append(line)
            
    if len(current_block) > 3:
        chunk_code = f"File: {filepath}\nSymbol: {current_symbol}\n" + "\n".join(current_block)
        chunks.append((f"{filepath}:{current_symbol}", chunk_code))
        
    return chunks

def extract_prose_chunks(filepath: str, content: str) -> List[Tuple[str, str]]:
    """Simple paragraph-based chunking for documentation."""
    chunks = []
    paragraphs = re.split(r"\n\s*\n", content)
    for i, p in enumerate(paragraphs):
        if len(p.strip()) > 20:
            chunk_code = f"File: {filepath}\nType: Prose\n" + p.strip()
            chunks.append((f"{filepath}:p{i}", chunk_code))
    return chunks

def index_project_workspace(root_dir: str) -> List[str]:
    """Traverses the root dir and extracts AST chunks from source code."""
    all_chunks = []
    for dirpath, _, filenames in os.walk(root_dir):
        if ".git" in dirpath or ".venv" in dirpath or "build" in dirpath or "node_modules" in dirpath:
            continue
        for f in filenames:
            path = os.path.join(dirpath, f)
            try:
                with open(path, "r", encoding="utf-8") as file:
                    code = file.read()
                
                if path.endswith(".py"):
                    all_chunks.extend(extract_python_chunks(path, code))
                elif path.endswith(".go"):
                    all_chunks.extend(extract_regex_chunks(path, code, "go"))
                elif path.endswith((".cpp", ".c", ".h")):
                    all_chunks.extend(extract_regex_chunks(path, code, "cpp"))
                elif path.endswith((".js", ".ts", ".tsx")):
                    all_chunks.extend(extract_regex_chunks(path, code, "js"))
                elif path.endswith(".rs"):
                    all_chunks.extend(extract_regex_chunks(path, code, "rust"))
                elif path.endswith((".md", ".txt")):
                    all_chunks.extend(extract_prose_chunks(path, code))
            except Exception:
                continue
    return [text for _, text in all_chunks]

def index_single_file(filepath: str) -> List[str]:
    """Extracts AST chunks from a single specific file."""
    if not os.path.exists(filepath):
        return []
    try:
        with open(filepath, "r", encoding="utf-8") as file:
            code = file.read()
        if filepath.endswith(".py"):
            return [text for _, text in extract_python_chunks(filepath, code)]
        elif filepath.endswith(".go"):
            return [text for _, text in extract_regex_chunks(filepath, code, "go")]
        elif filepath.endswith((".cpp", ".c", ".h")):
            return [text for _, text in extract_regex_chunks(filepath, code, "cpp")]
        elif filepath.endswith((".js", ".ts", ".tsx")):
            return [text for _, text in extract_regex_chunks(filepath, code, "js")]
        elif filepath.endswith(".rs"):
            return [text for _, text in extract_regex_chunks(filepath, code, "rust")]
        elif filepath.endswith((".md", ".txt")):
            return [text for _, text in extract_prose_chunks(filepath, code)]
    except Exception as e:
        logger.error(f"Failed to single-index {filepath}: {e}")
    return []

def get_symbol_map(root_dir: str) -> dict:
    """Returns a map of {file: [symbols]} for the entire workspace."""
    symbol_map = {}
    for dirpath, _, filenames in os.walk(root_dir):
        if ".git" in dirpath or ".venv" in dirpath or "build" in dirpath or "node_modules" in dirpath:
            continue
        for f in filenames:
            path = os.path.join(dirpath, f)
            try:
                with open(path, "r", encoding="utf-8") as file:
                    code = file.read()
                
                lang = ""
                if path.endswith(".py"):
                    chunks = extract_python_chunks(path, code)
                elif path.endswith(".go"):
                    chunks = extract_regex_chunks(path, code, "go")
                elif path.endswith((".cpp", ".c", ".h")):
                    chunks = extract_regex_chunks(path, code, "cpp")
                elif path.endswith((".js", ".ts", ".tsx")):
                    chunks = extract_regex_chunks(path, code, "js")
                elif path.endswith(".rs"):
                    chunks = extract_regex_chunks(path, code, "rust")
                else:
                    continue
                
                # Chunks are (symbol_name, content)
                symbols = [c[0].split(":")[-1] for c in chunks]
                if symbols:
                    symbol_map[path] = symbols
            except Exception:
                continue
    return symbol_map
