#!/usr/bin/env python3
"""Acquire official Colorado PUC OPR household-goods permit listings (CO-MOVE-001).

Does not scrape the interactive permit search form.
Does not brute-force identifiers.
Uses the newest official public PDF on the State Publications Library serial REG7.64.
"""
from __future__ import annotations

import hashlib
import json
import re
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path
from urllib.request import Request, urlopen

from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[2]
RAW_DIR = ROOT / "data" / "raw" / "co_puc"
OUT_DIR = ROOT / "data" / "colorado" / "co-move-001"
INDEX_URL = "https://spl.cde.state.co.us/artemis/regserials/reg764internet/"
PDF_URL = "https://spl.cde.state.co.us/artemis/regserials/reg764internet/reg764202507internet.pdf"
PDF_TITLE = "Carriers with permits. Household goods. July 2025 (REG7.64)"
STATUS_RE = re.compile(
    r"Permit Status:\s*(ACTIVE|CANCELLED|INACTIVE-TRANSFERRED|INACTIVE|REVOKED|SUSPENDED)"
)
HHG_RE = re.compile(r"HHG-\d{5}")
TOTAL_RE = re.compile(r"Total Permits:\s*(\d+)")
DATE_RE = re.compile(r"(\d{2}/\d{2}/\d{4})\s+(\d{2}:\d{2})")
NAME_CHARS = re.compile(r"[A-Za-z0-9&'./()#,+-]")


def fetch(url: str) -> bytes:
    req = Request(url, headers={"User-Agent": "MoveTrustHub-CO-MOVE-001/1.0"})
    with urlopen(req, timeout=60) as resp:
        return resp.read()


def normalize_name(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", " ", value.lower()).strip()


def parse_pdf(pdf_path: Path) -> dict:
    reader = PdfReader(str(pdf_path))
    current_status = None
    ids_by_status: dict[str, list[str]] = defaultdict(list)
    totals: dict[str, int] = {}
    clocks: dict[str, str] = {}
    page_map: list[dict] = []
    for i, page in enumerate(reader.pages, start=1):
        text = page.extract_text() or ""
        status_match = STATUS_RE.search(text)
        if status_match:
            current_status = status_match.group(1)
        date_match = DATE_RE.search(text)
        if current_status and date_match:
            clocks[current_status] = f"{date_match.group(1)} {date_match.group(2)}"
        ids = HHG_RE.findall(text)
        if current_status:
            ids_by_status[current_status].extend(ids)
        total_match = TOTAL_RE.search(text)
        if current_status and total_match:
            totals[current_status] = int(total_match.group(1))
        page_map.append(
            {
                "page": i,
                "status": current_status,
                "hhg_extracted": len(ids),
                "total_line": int(total_match.group(1)) if total_match else None,
            }
        )

    records = []
    seen_status_ids: dict[str, set[str]] = defaultdict(set)
    for status, ids in ids_by_status.items():
        for permit in ids:
            if permit in seen_status_ids[status]:
                continue
            seen_status_ids[status].add(permit)
            records.append(
                {
                    "permitNumber": permit,
                    "identity": f"CO-PUC-HHG:{permit}",
                    "status": status,
                    "usdot": None,
                    "mc": None,
                }
            )
    return {
        "pages": len(reader.pages),
        "page_map": page_map,
        "ids_by_status": {k: v for k, v in ids_by_status.items()},
        "distinct_by_status": {k: sorted(seen_status_ids[k]) for k in seen_status_ids},
        "official_totals": totals,
        "source_clocks": clocks,
        "records": records,
    }


def name_overlap(records: list[dict]) -> dict:
    # Names are not reliably extracted from the 5-column OPR PDF.
    # Identity is the permit number. Report that name-dedupe is not published as exact identity.
    return {
        "name_fields_source_native_on_pdf": True,
        "normalized_name_dedupe_published_as_identity": False,
        "reason": "Five-column OPR PDF interleaves names across columns in text extraction. Permit number is the stable identity. Normalized-name overlap is not published as exact identity.",
    }


def main() -> None:
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    retrieved = datetime.now(timezone.utc).replace(microsecond=0).isoformat()
    pdf_path = RAW_DIR / "reg764202507internet.pdf"
    if not pdf_path.exists():
        pdf_path.write_bytes(fetch(PDF_URL))
    raw = pdf_path.read_bytes()
    parsed = parse_pdf(pdf_path)
    official = parsed["official_totals"]
    assert official.get("ACTIVE") == 203, official
    assert official.get("CANCELLED") == 82, official
    assert official.get("INACTIVE") == 295, official
    assert official.get("INACTIVE-TRANSFERRED") == 17, official
    assert official.get("REVOKED") == 207, official
    assert official.get("SUSPENDED") == 5, official

    extracted_active = len(parsed["distinct_by_status"].get("ACTIVE", []))
    # Extracted unique IDs should match official totals when text extraction is complete.
    # ACTIVE: 203 official. Distinct extracted may be 203.
    report = {
        "ticket": "CO-MOVE-001",
        "dataset": "colorado_puc_opr_hhg_carriers_with_permits",
        "index_url": INDEX_URL,
        "source_url": PDF_URL,
        "document_title": PDF_TITLE,
        "access": "OFFICIAL_PDF",
        "no_search_form_scrape": True,
        "no_id_bruteforce": True,
        "retrieved_at": retrieved,
        "source_publication_date": "2025-06-27",
        "source_clocks": parsed["source_clocks"],
        "raw_bytes": len(raw),
        "raw_sha256": hashlib.sha256(raw).hexdigest(),
        "pages": parsed["pages"],
        "official_totals": official,
        "extracted_distinct_by_status": {k: len(v) for k, v in parsed["distinct_by_status"].items()},
        "extracted_row_counts": {k: len(v) for k, v in parsed["ids_by_status"].items()},
        "active_extracted_distinct": extracted_active,
        "grain": "Colorado PUC household-goods carrier permit listing",
        "identity": "CO-PUC-HHG:{permitNumber}",
        "usdot_printed_on_list": False,
        "mc_printed_on_list": False,
        "crosswalk_default": "REVIEW",
        "name_only": "UNSAFE",
        "do_not_sum_historical_into_active": True,
        "name_overlap": name_overlap(parsed["records"]),
        "page_map": parsed["page_map"],
    }
    (OUT_DIR / "acquire-report.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    (OUT_DIR / "permit-records.json").write_text(
        json.dumps(
            {
                "version": "co-move-001-permits-v1",
                "source_url": PDF_URL,
                "source_publication_date": "2025-06-27",
                "official_totals": official,
                "records": parsed["records"],
                "distinct_by_status": parsed["distinct_by_status"],
            },
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )
    (RAW_DIR / "manifest.json").write_text(
        json.dumps(
            {
                "file": "reg764202507internet.pdf",
                "url": PDF_URL,
                "sha256": report["raw_sha256"],
                "bytes": report["raw_bytes"],
                "retrieved_at": retrieved,
            },
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )
    print(json.dumps({"ok": True, "official_totals": official, "sha256": report["raw_sha256"]}, indent=2))


if __name__ == "__main__":
    main()
