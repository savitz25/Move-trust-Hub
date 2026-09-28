"""Reproduce the CT-MOVE-001 2026 CTDOT household-goods roster snapshot.

Requires openpyxl. The source is CTDOT's public workbook linked from its
Household Goods Movers with CTDOT Certificate to Operate page. This script
keeps the regulator's row grain, including duplicate certificate observations,
and intentionally omits street addresses and personal contact fields.
"""

from __future__ import annotations

import hashlib
import io
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from urllib.request import urlopen

from openpyxl import load_workbook


SOURCE_URL = (
    "https://portal.ct.gov/dot/-/media/dot/public-transportation/"
    "hhg-annual-registration.xlsx?hash=C131B3F94680E8B130171EB5919411D1"
    "&rev=ea4c3598044b4f4d8bd8920a030f5c47"
)
SOURCE_SHA256 = "3aa39c8d1531128a7c2b39fa871c3ea02fbde4d8a755fc4a47f57258d26a156c"
OUT = Path(__file__).resolve().parents[1] / "data/connecticut/ct-move-001/ctdot-hhg-2026.json"
TOWN = re.compile(r"^\s*([A-Za-z][A-Za-z .'-]*?),?\s+CT\s*(?:\d{5})?\s*$", re.I)


def ct_towns(value: str) -> list[str]:
    towns = []
    for part in value.split("/"):
        match = TOWN.match(part)
        if match:
            town = re.sub(r"\s+", " ", match.group(1)).strip().upper()
            if town not in towns:
                towns.append(town)
    return towns


def main() -> None:
    with urlopen(SOURCE_URL, timeout=30) as response:
        source = response.read()
        last_modified = response.headers.get("Last-Modified")
    retrieved_at = datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")
    actual_sha = hashlib.sha256(source).hexdigest()
    if actual_sha != SOURCE_SHA256:
        raise RuntimeError(f"CTDOT workbook changed: expected {SOURCE_SHA256}, got {actual_sha}")

    sheet = load_workbook(io.BytesIO(source), read_only=True, data_only=True)["2026"]
    values = list(sheet.values)
    assert tuple(values[0]) == (
        "Legal Name", "DBA", "Mailing/Business  Address", "City, State, Zip", "cert No. HG:"
    )
    footer = values[-1]
    assert footer[0] == "TOTAL NUMBER OF REGISTERED HHG CARRIERS:"
    rows = []
    for index, row in enumerate(values[1:-1], start=2):
        legal_name, dba, _street_address, city_state_zip, certificate = row
        assert legal_name and isinstance(certificate, int), (index, row)
        rows.append({
            "sourceRow": index,
            "legalName": str(legal_name).strip(),
            "dba": str(dba).strip() if dba else None,
            "towns": ct_towns(str(city_state_zip or "")),
            "ctdotCertificate": f"HG{certificate}",
            "usdot": None,
            "mc": None,
        })
    assert len(rows) == footer[4] == 117
    certificates = {row["ctdotCertificate"] for row in rows}
    assert len(certificates) == 115
    assert {cert for cert in certificates if sum(row["ctdotCertificate"] == cert for row in rows) > 1} == {"HG1775", "HG1792"}

    payload = {
        "contract": "ct-move-001-ctdot-hhg-2026-v1",
        "sourceUrl": SOURCE_URL,
        "sourcePage": "https://portal.ct.gov/dot/publictrans/bureau-of-public-transportation/household-goods-movers-with-ctdot-cert",
        "sourceSha256": actual_sha,
        "sourceLastModifiedHttp": last_modified,
        "sourcePublicationDate": None,
        "retrievedAt": retrieved_at,
        "generatedAt": datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z"),
        "rosterYear": 2026,
        "sourceAnnouncedTotal": footer[4],
        "rowCount": len(rows),
        "distinctCertificates": len(certificates),
        "duplicateCertificateRows": len(rows) - len(certificates),
        "rowsWithPrintedUsdot": 0,
        "distinctPrintedUsdot": 0,
        "rowsWithPrintedMc": 0,
        "rowsWithoutPrintedFederalIdentifier": len(rows),
        "rows": rows,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"{OUT}: {len(rows)} rows, {len(certificates)} distinct certificates, SHA256 {actual_sha}")


if __name__ == "__main__":
    main()
