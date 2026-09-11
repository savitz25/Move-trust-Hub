#!/usr/bin/env python3
"""NY-MOVE-001A — acquire 2026 NYSDOT Weekly Bulletin PDFs. No carrier-search brute force."""
from __future__ import annotations

import hashlib
import json
import re
import time
import urllib.error
import urllib.request
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "new-york" / "ny-move-001"
RAW = OUT / "raw" / "bulletins"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
RETRIEVED = "2026-09-11T18:00:00Z"

# 2026 YTD from official archive page as of 2026-09-11.
BULLETINS = [
    ("2026-01-07", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%201-7-26.pdf"),
    ("2026-01-14", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%201-14-26.pdf"),
    ("2026-01-21", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%201-21-26.pdf"),
    ("2026-01-28", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%201-28-26.pdf"),
    ("2026-02-04", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%202-4-26.pdf"),
    ("2026-02-11", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%202-11-26.pdf"),
    ("2026-02-18", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%202-18-26.pdf"),
    ("2026-02-25", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%202-25-26.pdf"),
    ("2026-03-04", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%203-4-26.pdf"),
    ("2026-03-11", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%203-11-26.pdf"),
    ("2026-03-18", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%203-18-26.pdf"),
    ("2026-03-25", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%203-25-26.pdf"),
    ("2026-04-01", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%204-1-26.pdf"),
    ("2026-04-08", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%204-8-26.pdf"),
    ("2026-04-15", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%204-15-26.pdf"),
    ("2026-04-22", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%204-22-26.pdf"),
    ("2026-04-29", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%204-29-26.pdf"),
    ("2026-05-06", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%205-6-26.pdf"),
    ("2026-05-13", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%205-13-26.pdf"),
    ("2026-05-20", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%205-20-26.pdf"),
    ("2026-05-27", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%205-27-26_%20%28002%29.pdf"),
    ("2026-06-03", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%206-3-26.pdf"),
    ("2026-06-10", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%206-10-26.pdf"),
    ("2026-06-17", "https://www.dot.ny.gov/main/publications/publications-repository/54878F8A9D8B023CE0630A6C8948023C"),
    ("2026-06-24", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%206-24-26.pdf"),
    ("2026-07-01", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%207-1-26.pdf"),
    ("2026-07-08", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%207-8-26%20%28002%29.pdf"),
    ("2026-07-15", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%207-15-26.pdf"),
    ("2026-07-22", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%207-22-26.pdf"),
    ("2026-07-29", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%207-29-26.pdf"),
    ("2026-08-05", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%208-5-26%20%28002%29.pdf"),
    ("2026-08-12", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%208-12-26.pdf"),
    ("2026-08-19", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%208-19-26.pdf"),
    ("2026-08-26", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%208-26-26.pdf"),
    ("2026-09-02", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%209-2-26.pdf"),
    ("2026-09-09", "https://www.dot.ny.gov/main/publications/publications-repository/Bulletin%209-9-26.pdf"),
]


def get(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=90) as resp:
        return resp.read()


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def is_hhg_block(text: str) -> bool:
    lower = text.lower()
    if "except household goods" in lower and "household goods:" not in lower:
        return False
    if re.search(r"household goods\s*:", lower):
        return True
    if "household goods" in lower and "except household goods" not in lower:
        return True
    return False


def application_type(text: str) -> str:
    m = re.search(
        r"Details of Application:\s*(New Service|Extension|Transfer|Partial Transfer of Authority|Name Change|Transfer of Authority)[:\s]",
        text,
        re.I,
    )
    if m:
        return m.group(1)
    for label in [
        "New Service",
        "Partial Transfer of Authority",
        "Transfer of Authority",
        "Extension",
        "Name Change",
        "Transfer",
    ]:
        if re.search(rf"\b{re.escape(label)}\b", text, re.I):
            return label
    return "UNKNOWN"


def parse_bulletin(date: str, data: bytes) -> dict:
    reader = PdfReader(__import__("io").BytesIO(data))
    text = "\n".join((page.extract_text() or "") for page in reader.pages)
    parts = re.split(r"Case Number:\s*", text)
    cases = []
    for part in parts[1:]:
        m = re.match(r"(\d+)", part)
        if not m:
            continue
        case_no = m.group(1)
        block = part[:4000]
        hhg = is_hhg_block(block)
        usdot = re.search(r"\bUSDOT\s*#?\s*(\d{5,8})\b", block, re.I)
        nydot = re.search(r"\bNYDOT\s*#?\s*(\d+)\b", block, re.I)
        cert = re.search(r"\bCertificate\s*(?:No\.|Number|#)\s*([A-Z0-9-]+)\b", block, re.I)
        name_m = re.search(r"\n\s*\n\s*([A-Z0-9][A-Za-z0-9 .,'&-]{2,80})\s*\n", block)
        cases.append(
            {
                "caseNumber": case_no,
                "bulletinDate": date,
                "hhgRelevant": hhg,
                "applicationType": application_type(block) if hhg else None,
                "usdot": usdot.group(1) if usdot else None,
                "nydot": nydot.group(1) if nydot else None,
                "certificate": cert.group(1) if cert else None,
                "nameGuess": (name_m.group(1).strip() if name_m else None),
            }
        )
    hhg_cases = [c for c in cases if c["hhgRelevant"]]
    return {
        "date": date,
        "pages": len(reader.pages),
        "chars": len(text),
        "caseBlocks": len(cases),
        "hhgObservations": hhg_cases,
        "hhgCount": len(hhg_cases),
    }


def main() -> None:
    RAW.mkdir(parents=True, exist_ok=True)
    issues = []
    hhg_all = []
    failed = []
    for date, url in BULLETINS:
        dest = RAW / f"{date}.pdf"
        try:
            if dest.exists() and dest.stat().st_size > 1000:
                data = dest.read_bytes()
                print("CACHE", date, dest.stat().st_size, flush=True)
            else:
                data = get(url)
                dest.write_bytes(data)
                print("GET", date, len(data), flush=True)
                time.sleep(0.25)
            parsed = parse_bulletin(date, data)
            parsed["sha256"] = sha256(data)
            parsed["bytes"] = len(data)
            parsed["url"] = url
            issues.append({k: v for k, v in parsed.items() if k != "hhgObservations"})
            hhg_all.extend(parsed["hhgObservations"])
            print(" ", date, "cases", parsed["caseBlocks"], "hhg", parsed["hhgCount"], flush=True)
        except Exception as exc:
            failed.append({"date": date, "url": url, "error": str(exc)[:200]})
            print("FAIL", date, exc, flush=True)

    types = Counter(c.get("applicationType") or "UNKNOWN" for c in hhg_all)
    with_usdot = sum(1 for c in hhg_all if c.get("usdot"))
    with_nydot = sum(1 for c in hhg_all if c.get("nydot"))
    with_cert = sum(1 for c in hhg_all if c.get("certificate"))
    census = {
        "retrievedAt": RETRIEVED,
        "archiveUrl": "https://www.dot.ny.gov/main/publications/wb-motor-carrier-applications",
        "window": {"start": "2026-01-07", "end": "2026-09-09"},
        "issuesAttempted": len(BULLETINS),
        "issuesAcquired": len(issues),
        "failed": failed,
        "hhgObservationCount": len(hhg_all),
        "applicationTypes": types.most_common(),
        "rowsWithUsdot": with_usdot,
        "rowsWithNydot": with_nydot,
        "rowsWithCertificate": with_cert,
        "distinctCaseNumbers": len({c["caseNumber"] for c in hhg_all}),
        "issues": issues,
        "hhgObservations": hhg_all,
        "carrierSearch": {
            "url": "https://carcert.dot.ny.gov/",
            "status": "OPEN_SEARCH_ONLY",
            "note": "CarCert home page states Search New York State Carriers (Functionality Under Development).",
        },
    }
    (OUT / "ny-move-census.json").write_text(json.dumps(census, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({
        "issues": census["issuesAcquired"],
        "failed": len(failed),
        "hhg": census["hhgObservationCount"],
        "types": census["applicationTypes"],
        "usdot": with_usdot,
        "nydot": with_nydot,
    }, indent=2))


if __name__ == "__main__":
    main()
