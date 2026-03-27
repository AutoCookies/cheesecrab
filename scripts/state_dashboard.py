#!/usr/bin/env python3
"""
Summarize cheeeserag state-json artifacts into one table.

Usage:
  python3 scripts/state_dashboard.py --dir .cache
  python3 scripts/state_dashboard.py --glob ".cache/*state*.json"
"""

from __future__ import annotations

import argparse
import glob
import json
import os
from typing import Any


def _collect_files(target_dir: str, pattern: str) -> list[str]:
    if pattern:
        return sorted(glob.glob(pattern))
    return sorted(glob.glob(os.path.join(target_dir, "*state*.json")))


def _load(path: str) -> dict[str, Any] | None:
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        if isinstance(data, dict):
            data["_path"] = path
            return data
    except Exception:
        return None
    return None


def _as_str(v: Any) -> str:
    if v is None:
        return ""
    if isinstance(v, bool):
        return "true" if v else "false"
    return str(v)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dir", default=".cache", help="directory containing state json files")
    ap.add_argument("--glob", default="", help="optional glob, overrides --dir")
    args = ap.parse_args()

    files = _collect_files(args.dir, args.glob)
    rows = [r for r in (_load(p) for p in files) if r]
    if not rows:
        print("No state files found.")
        return 0

    cols = [
        ("file", lambda r: os.path.basename(_as_str(r.get("_path")))),
        ("status", lambda r: _as_str(r.get("status"))),
        ("intent", lambda r: _as_str(r.get("observed_intent"))),
        ("det", lambda r: _as_str(r.get("deterministic_autonomous"))),
        ("forced", lambda r: _as_str(r.get("forced_path_used"))),
        ("ok_tools", lambda r: _as_str(r.get("successful_tool_calls"))),
        ("err_tools", lambda r: _as_str(r.get("failed_tool_calls"))),
        ("stop_reason", lambda r: _as_str(r.get("stop_reason"))),
        ("duration_ms", lambda r: _as_str(r.get("duration_ms"))),
    ]

    widths = []
    for name, getter in cols:
        w = len(name)
        for row in rows:
            w = max(w, len(getter(row)))
        widths.append(w)

    header = " | ".join(name.ljust(widths[i]) for i, (name, _) in enumerate(cols))
    sep = "-+-".join("-" * widths[i] for i in range(len(cols)))
    print(header)
    print(sep)
    for row in rows:
        line = " | ".join(getter(row).ljust(widths[i]) for i, (_, getter) in enumerate(cols))
        print(line)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

