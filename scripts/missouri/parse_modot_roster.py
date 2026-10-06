import collections
import json
import re
from pathlib import Path

import pdfplumber

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "data/missouri/mo-move-001/raw/modot-hhg-authorized-2025-09-29.pdf"
OUTPUT = ROOT / "data/missouri/mo-move-001/roster-observations.json"

with pdfplumber.open(SOURCE) as pdf:
    lines = [line for page in pdf.pages for line in page.extract_text().splitlines()]

rows = []
for line in lines:
    status = re.search(r"\b(ACTIVE|SUSPENDED|CANCELLED|REVOKED)\s*$", line)
    usdot = re.search(r"(?<!\d)(\d{9})(?=\d|\s)", line)
    if not status or not usdot:
        continue
    rows.append({"source_line": line, "usdot": usdot.group(1), "status": status.group(1)})

assert len(rows) == len({row["usdot"] for row in rows}), "USDOT duplicate in snapshot"
OUTPUT.write_text(json.dumps({"source_as_of": "2025-09-29", "rows": rows}, indent=2) + "\n")
print(json.dumps({"rows": len(rows), "status": dict(collections.Counter(row["status"] for row in rows))}))
