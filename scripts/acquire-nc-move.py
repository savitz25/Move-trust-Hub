#!/usr/bin/env python3
"""Parse frozen NCUC NC-MOVE-001 source files into a research extract."""
from __future__ import annotations

import hashlib
import json
import re
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

from pypdf import PdfReader

ROOT = Path("data/nc-move-001")
RAW = ROOT / "raw"
OUT = ROOT / "extract"


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def extract_pdf_text(path: Path) -> str:
    reader = PdfReader(str(path))
    return "\n".join((page.extract_text() or "") for page in reader.pages)


STATUS_RE = re.compile(
    r"(temporarily suspended|not yet been reinstated|not currently authorized|"
    r"certificate (?:was |is )?(?:cancelled|canceled|surrendered|revoked)|"
    r"authority has not yet been reinstated|"
    r"at carrier.?s request)",
    re.I,
)
C_RE = re.compile(r"\bC-(\d+)\b")
T_RE = re.compile(r"\bT-(\d+)\b")
HEADER_RE = re.compile(
    r"Revised\s+([A-Za-z]+\s+\d{1,2},\s+\d{4})\s+[–-]\s+(\d+)\s+Total Number of Certified Household Goods Carriers",
    re.I,
)


def classify_status(raw: str) -> str:
    t = raw.lower()
    if "temporarily suspended" in t or "at carrier" in t and "suspended" in t:
        if "not yet been reinstated" in t or "not currently authorized" in t:
            return "TEMPORARILY_SUSPENDED"
        return "TEMPORARILY_SUSPENDED"
    if "not currently authorized" in t or "not yet been reinstated" in t:
        return "SOURCE_SAYS_NOT_AUTHORIZED"
    if re.search(r"cancell?ed|surrendered|revoked", t):
        return "SOURCE_SAYS_NOT_AUTHORIZED"
    if STATUS_RE.search(raw):
        return "STATUS_UNCLEAR"
    return "AUTHORIZED_AS_LISTED"


def parse_carrier_list(text: str) -> dict:
    header = HEADER_RE.search(text)
    announced = int(header.group(2)) if header else None
    revision = header.group(1) if header else None
    body = HEADER_RE.sub("", text)
    body = re.sub(r"LIST OF CARRIERS ISSUED A CERTIFICATE OF EXEMPTION\s+AUTHORIZING HOUSEHOLD GOODS TRANSPORTATION WITHIN NORTH CAROLINA", "", body, flags=re.I)
    # Split into candidate rows: a new row typically starts after a C-number or at a company-like line.
    # Keep original line breaks, then glue wrapped lines that do not start a new identity.
    lines = [re.sub(r"[ \t]+", " ", ln).strip() for ln in body.splitlines()]
    lines = [ln for ln in lines if ln]
    glued: list[str] = []
    buf = ""
    for ln in lines:
        if not buf:
            buf = ln
            continue
        # New row if previous already has a C-number and this looks like a company start
        prev_has_c = bool(C_RE.search(buf))
        this_has_t_or_c = bool(T_RE.search(ln) or C_RE.search(ln))
        looks_new = prev_has_c and (
            re.match(r"^[A-Z0-9]", ln)
            and (T_RE.search(ln) or C_RE.search(ln) or re.search(r"\b(LLC|Inc\.|INC|Co\.|Company|Movers?|Moving)\b", ln))
        )
        if looks_new:
            glued.append(buf)
            buf = ln
        else:
            buf = f"{buf} {ln}"
    if buf:
        glued.append(buf)

    rows = []
    for raw in glued:
        c_ids = C_RE.findall(raw)
        t_ids = T_RE.findall(raw)
        if not c_ids and not t_ids:
            continue
        # Prefer last C-number on the line as the certificate (status text can mention another C).
        c_number = f"C-{c_ids[-1]}" if c_ids else None
        t_number = f"T-{t_ids[0]}" if t_ids else None
        status_raw = None
        m = STATUS_RE.search(raw)
        if m:
            # capture surrounding sentence
            start = max(0, m.start() - 40)
            status_raw = raw[start:].strip()
        name = raw
        name = C_RE.sub("", name)
        name = T_RE.sub("", name)
        name = re.sub(r"\(\s*\)", "", name)
        name = re.sub(r"\s+", " ", name).strip(" ,;")
        rows.append(
            {
                "raw": raw,
                "source_name": name,
                "c_number": c_number,
                "t_number": t_number,
                "status_normalized": classify_status(raw),
                "status_raw": status_raw,
            }
        )

    c_set = {r["c_number"] for r in rows if r["c_number"]}
    t_set = {r["t_number"] for r in rows if r["t_number"]}
    exact_pairs = {(r["c_number"], r["t_number"]) for r in rows if r["c_number"] and r["t_number"]}
    status_counts = Counter(r["status_normalized"] for r in rows)
    return {
        "revision_date_text": revision,
        "announced_total": announced,
        "list_rows": len(rows),
        "distinct_c": len(c_set),
        "distinct_t": len(t_set),
        "distinct_source_names": len({r["source_name"] for r in rows}),
        "rows_missing_c": sum(1 for r in rows if not r["c_number"]),
        "rows_missing_t": sum(1 for r in rows if not r["t_number"]),
        "exact_c_to_t": len(exact_pairs),
        "c_with_t": len({c for c, t in exact_pairs}),
        "t_with_c": len({t for c, t in exact_pairs}),
        "status_counts": dict(status_counts),
        "rows": rows,
    }


def parse_transcar(html: str) -> dict:
    # Table rows: T-#### in first cell
    rows = re.findall(
        r"<tr[^>]*>\s*<td[^>]*>\s*(T-\d+)\s*</td>\s*<td[^>]*>(.*?)</td>",
        html,
        flags=re.I | re.S,
    )
    t_ids = [t for t, _ in rows]
    names = [re.sub(r"<[^>]+>", "", n).strip() for _, n in rows]
    return {
        "html_rows": len(rows),
        "distinct_t": len(set(t_ids)),
        "duplicate_t_rows": len(t_ids) - len(set(t_ids)),
        "distinct_names": len(set(names)),
        "sample": [{"t": t, "name": n} for t, n in list(zip(t_ids, names))[:5]],
    }


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    retrieved = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    carriers_path = RAW / "carriers.pdf"
    transcar_path = RAW / "transcar.html"
    maxrate_path = RAW / "maxrate.pdf"
    annual_path = RAW / "HHGannual.pdf"
    moving_path = RAW / "transportation.html"

    carrier_text = extract_pdf_text(carriers_path)
    (OUT / "carriers.txt").write_text(carrier_text, encoding="utf-8")
    parsed = parse_carrier_list(carrier_text)

    transcar_html = transcar_path.read_text(encoding="utf-8", errors="replace")
    transcar = parse_transcar(transcar_html)

    maxrate_text = extract_pdf_text(maxrate_path)
    (OUT / "maxrate-head.txt").write_text(maxrate_text[:8000], encoding="utf-8")
    annual_text = extract_pdf_text(annual_path)
    (OUT / "annual-head.txt").write_text(annual_text[:8000], encoding="utf-8")

    # Crosswalk: HHG T-numbers vs transcar T-numbers
    hhg_t = {r["t_number"] for r in parsed["rows"] if r["t_number"]}
    transcar_t = set(re.findall(r"\bT-\d+\b", transcar_html))
    overlap = hhg_t & transcar_t

    summary = {
        "retrievedAt": retrieved,
        "files": {
            "carriers.pdf": {"sha256": sha256(carriers_path), "bytes": carriers_path.stat().st_size},
            "transcar.html": {"sha256": sha256(transcar_path), "bytes": transcar_path.stat().st_size},
            "maxrate.pdf": {"sha256": sha256(maxrate_path), "bytes": maxrate_path.stat().st_size},
            "HHGannual.pdf": {"sha256": sha256(annual_path), "bytes": annual_path.stat().st_size},
            "transportation.html": {"sha256": sha256(moving_path), "bytes": moving_path.stat().st_size},
        },
        "carrier_list": {k: v for k, v in parsed.items() if k != "rows"},
        "transcar": transcar,
        "hhg_t_in_transcar": len(overlap),
        "hhg_t_not_in_transcar": len(hhg_t - transcar_t),
        "fixtures": {
            "C-2655": next((r for r in parsed["rows"] if r["c_number"] == "C-2655"), None),
            "T-4664": next((r for r in parsed["rows"] if r["t_number"] == "T-4664"), None),
        },
        "status_examples": [r for r in parsed["rows"] if r["status_normalized"] != "AUTHORIZED_AS_LISTED"][:20],
        "missing_t_examples": [r for r in parsed["rows"] if not r["t_number"]][:10],
        "missing_c_examples": [r for r in parsed["rows"] if not r["c_number"]][:10],
    }
    (OUT / "summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    (OUT / "carrier-rows.json").write_text(json.dumps(parsed["rows"], indent=2), encoding="utf-8")
    print(json.dumps({k: summary[k] for k in ("retrievedAt", "carrier_list", "transcar", "hhg_t_in_transcar", "hhg_t_not_in_transcar", "fixtures")}, indent=2))


if __name__ == "__main__":
    main()
