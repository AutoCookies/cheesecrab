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
            current_symbol = match.group(2)
        else:
            current_block.append(line)
            
    if len(current_block) > 3:
        chunk_code = f"File: {filepath}\nSymbol: {current_symbol}\n" + "\n".join(current_block)
        chunks.append((f"{filepath}:{current_symbol}", chunk_code))
        
    return chunks

def index_project_workspace(root_dir: str) -> List[str]:
    """Traverses the root dir and extracts AST chunks from source code."""
    all_chunks = []
    for dirpath, _, filenames in os.walk(root_dir):
        if ".git" in dirpath or ".venv" in dirpath or "build" in dirpath:
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
            except Exception:
                continue
    return [text for _, text in all_chunks]
