#!/usr/bin/env python3
"""Parse the official Massachusetts DPU regulated household-goods mover CSV.

Source: the "Download table data as CSV" link on
https://www.mass.gov/info-details/moving-companies-regulated-by-the-department-of-public-utilities-dpu
(file DPU Moving Company Tariff February 2026 (1).csv, HTTP Last-Modified 2026-06-16).

Grain: one row per company listing. Values are kept verbatim except that
surrounding whitespace is trimmed and internal whitespace runs are collapsed.
No USDOT/MC is printed by DPU, so no federal identifier is inferred or joined.
"""
from __future__ import annotations

import csv
import hashlib
import json
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "data/massachusetts/ma-move-001/dpu-moving-company-tariff-list.csv"
DEST = ROOT / "data/massachusetts/ma-move-001/roster.json"
EXPECTED_HEADER = [
    "Company Name",
    "Tariff / Rates",
    "Tariff / Rates",
    "Doing Business As",
    "Certificate Number",
    "City / Town",
    "State",
]
STATUS = "LISTED_ON_DPU_REGULATED_HHG_MOVER_LIST"


def clean(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def main() -> None:
    raw = SRC.read_bytes()
    rows = list(csv.reader(raw.decode("utf-8-sig").splitlines()))
    header, data = rows[0], rows[1:]
    if header != EXPECTED_HEADER:
        raise SystemExit(f"unexpected header: {header}")
    out = []
    for record in data:
        if len(record) != 7:
            raise SystemExit(f"unexpected row width: {record}")
        name, label, url, dba, cert, city, state = (clean(v) for v in record)
        pending = url.upper() == "PENDING"
        if not pending and not url.startswith("https://www.mass.gov/"):
            raise SystemExit(f"tariff link outside mass.gov: {url}")
        out.append({
            "certificate": cert or None,
            "companyName": name,
            "dba": None if dba.upper() == "SAME" else dba,
            "dbaSource": dba,
            "city": city,
            "businessState": state,
            "tariffStatus": "PENDING" if pending else "POSTED",
            "tariffLabel": label,
            "tariffUrl": None if pending else url,
            "status": STATUS,
        })
    certs = [r["certificate"] for r in out if r["certificate"]]
    cert_counts = Counter(certs)
    urls = Counter(r["tariffUrl"] for r in out if r["tariffUrl"])
    states = Counter(r["businessState"] for r in out)
    summary = {
        "rows": len(out),
        "distinctCertificates": len(cert_counts),
        "rowsMissingCertificate": sum(1 for r in out if not r["certificate"]),
        "duplicateCertificates": sorted(k for k, v in cert_counts.items() if v > 1),
        "tariffPostedRows": sum(1 for r in out if r["tariffStatus"] == "POSTED"),
        "tariffPendingRows": sum(1 for r in out if r["tariffStatus"] == "PENDING"),
        "distinctTariffUrls": len(urls),
        "rowsSharingATariffUrl": sum(v for v in urls.values() if v > 1),
        "rowsWithDba": sum(1 for r in out if r["dba"]),
        "massachusettsBusinessAddressRows": states.get("MASSACHUSETTS", 0),
        "outOfStateBusinessAddressRows": len(out) - states.get("MASSACHUSETTS", 0),
        "businessStates": dict(sorted(states.items())),
        "bostonCityRows": sum(1 for r in out if r["city"].upper() == "BOSTON"),
        "certificateFormats": dict(sorted(Counter(
            re.sub(r"\d", "9", re.sub(r"[A-Z]", "A", c)) for c in certs).items())),
        "federalIdentifiersOnSource": False,
        "exactUsdotJoins": 0,
        "exactMcJoins": 0,
    }
    body = {
        "source": {
            "agency": "Massachusetts Department of Public Utilities",
            "division": "Transportation Oversight Division",
            "page": "https://www.mass.gov/info-details/moving-companies-regulated-by-the-department-of-public-utilities-dpu",
            "csv": "https://www.mass.gov/files/csv/2026-06/DPU%20Moving%20Company%20Tariff%20February%202026%20%281%29.csv",
            "csvFileLabel": "DPU Moving Company Tariff February 2026 (1).csv",
            "csvSha256": hashlib.sha256(raw).hexdigest(),
            "csvHttpLastModified": "2026-06-16T16:19:55Z",
            "pageDatePublished": "2024-08-21",
            "pageLastUpdated": "2026-06-16",
            "pageRowFooter": "Showing 1 to 10 of 309 entries",
            "retrievedAt": "2026-09-24T14:37:20Z",
        },
        "rows": out,
        "summary": summary,
    }
    DEST.write_text(json.dumps(body, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
