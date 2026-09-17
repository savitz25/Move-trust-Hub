#!/usr/bin/env python3
"""Patch committed move-network-metrics-v1.json with NC-MOVE-001 without a federal recount."""
from __future__ import annotations

import json
from pathlib import Path

path = Path("data/home/move-network-metrics-v1.json")
data = json.loads(path.read_text(encoding="utf-8"))

if "/north-carolina" in data["network"]["publishedStateIntelligencePaths"]:
    raise SystemExit("NC already present")

data["network"]["publishedStateIntelligencePaths"].append("/north-carolina")
data["network"]["publishedStateIntelligencePages"] = len(data["network"]["publishedStateIntelligencePaths"])
data["northCarolina"] = {
    "hhgListRows": 362,
    "distinctCNumbers": 362,
    "sourceAsOf": "2026-09-08",
}

nc_metric = {
    "unit": "count",
    "key": "nc_ncuc_hhg_c_number_identities",
    "label": "North Carolina NCUC household-goods C-number identities",
    "value": 362,
    "valueState": "KNOWN",
    "grain": "nc_ncuc_hhg_c_number_identity",
    "denominator": "Distinct C-numbers on the accepted NCUC household-goods carrier-list snapshot",
    "description": "Distinct NCUC Certificate of Exemption C-numbers on the monthly carrier-list snapshot. Not active movers, not T-numbers, and not FMCSA interstate movers.",
    "coverage": "North Carolina",
    "contributingSourceSystems": ["ncuc_hhg_carrier_list"],
    "sourceAsOf": "2026-09-08",
    "generatedAt": data.get("generatedAt"),
    "publicationStatus": "PUBLIC",
    "trace": {
        "counts": "Count distinct C-numbers (362) on 362 list rows.",
        "doesNotCount": "Not the announced header total. Not T-numbers. Not USDOT/MC. Not a live authority census.",
        "contributingSourceSystems": ["ncuc_hhg_carrier_list"],
        "geographicCoverage": "North Carolina intrastate household-goods certificates",
        "sourceDates": "Carrier-list revision September 8, 2026; monthly list is not real-time status",
        "generationDate": "2026-09-17",
    },
    "snapshotAsOf": "2026-09-08",
    "retrievedAt": "2026-09-17T19:40:54Z",
}

metrics = data["metrics"]
insert_at = next(i for i, m in enumerate(metrics) if m["key"] == "ny_dot_2026_hhg_bulletin_observations")
metrics.insert(insert_at, nc_metric)

for m in metrics:
    if m["key"] == "published_state_intelligence_pages":
        m["value"] = 12
        coverage = ", ".join(data["network"]["publishedStateIntelligencePaths"])
        m["coverage"] = coverage
        m["trace"]["counts"] = f"Published {coverage} intelligence routes."
        m["trace"]["geographicCoverage"] = coverage

data["homepageStateCards"].append(
    {
        "state": "North Carolina",
        "href": "/north-carolina",
        "regulator": "NCUC",
        "authority": "Certificate of Exemption (C-number)",
        "roster": "362 distinct C-numbers on the September 8, 2026 snapshot (header announces 361)",
        "evidence": "Monthly HHG carrier list with C↔T crosswalks; tariff and insurance requirements kept separate from FMCSA",
        "sourceClock": "Carrier-list revision 2026-09-08; retrieved 2026-09-17T19:40:54Z",
    }
)

path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
print("overlayed /north-carolina; pages", data["network"]["publishedStateIntelligencePages"])
