#!/usr/bin/env python3
"""Freeze move-ga-state-intel-v1. generatedAt is excluded from the fingerprint."""
from __future__ import annotations

import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
ROSTER = ROOT / "data/georgia/ga-move-001/roster.json"
SNAP = ROOT / "lib/georgia-intelligence/accepted-snapshot.json"
ACCEPTED = ROOT / "lib/georgia-intelligence/accepted-roster.json"


def dumps(obj: object) -> str:
    return json.dumps(obj, sort_keys=True, separators=(",", ":"), ensure_ascii=False)


def semantic(body: dict) -> dict:
    return {k: v for k, v in body.items() if k not in {"generated_at", "fingerprint"}}


def main() -> None:
    raw = json.loads(ROSTER.read_text(encoding="utf-8"))
    rows = []
    for row in raw["rows"]:
        rows.append({k: v for k, v in row.items() if k != "email"})
    summary = raw["summary"]
    generated = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    body = {
        "version": "move-ga-state-intel-v1",
        "ticket": "GA-MOVE-001",
        "as_of": "2026-09-24",
        "generated_at": generated,
        "snapshotAsOf": "2026-09-24",
        "retrievedAt": "2026-09-24T02:31:14Z",
        "no_trust_score": True,
        "no_paid_ranking": True,
        "no_georgia_local_routes": True,
        "no_atlanta_intelligence_page": True,
        "publication": {
            "canonical": "https://www.movetrusthub.com/georgia",
            "indexable": True,
            "robots": "index,follow",
            "route": "/georgia",
            "h1": "Georgia Moving & Household Goods Intelligence",
        },
        "regulator": {
            "agency": "Georgia Department of Public Safety",
            "division": "Commercial Vehicle Enforcement / Regulatory Compliance",
            "short": "Georgia DPS",
            "credential_term": "MCA / household-goods certificate number on the licensed movers list",
            "list_url": "https://regulatorycompliance.gamccd.net/public/",
            "grid_url": "https://regulatorycompliance.gamccd.net/public/Home/_HHgrid",
            "guidance_url": "https://www.gamccd.net/HouseholdGoods.aspx",
            "tariff_url": "https://www.gamccd.net/Documents/Household%20Goods%20MRT%20No.7.pdf",
            "rules_url": "https://rules.sos.ga.gov/gac/570-38-3",
            "complaint_form_url": "https://www.gamccd.net/Documents/TR0051.pdf",
            "intrastate_only": True,
        },
        "clocks": {
            "generatedAt": generated,
            "snapshotAsOf": "2026-09-24",
            "retrievedAt": "2026-09-24T02:31:14Z",
            "sourceAsOf": None,
            "do_not_use_retrieval_as_authority_effective_date": True,
            "hhg_roster": {
                "sourceAsOf": None,
                "retrievedAt": "2026-09-24T02:31:14Z",
                "note": "The DPS Movers List does not print a revision date. retrievedAt is not an authority effective date.",
            },
            "tariff": {
                "number": 7,
                "adopted": "2026-01-05",
                "effective": "2026-01-13",
                "source": "CVE Regulatory Compliance portal announcement and Household Goods MRT No. 7 PDF",
            },
        },
        "current_hhg_roster": {
            "coverage": "ACQUIRED_LICENSED_LIST_SNAPSHOT",
            "GA_DPS_HHG_ROSTER_STATUS": "LICENSED_MOVERS_LIST_SNAPSHOT",
            "GA_DPS_HHG_RAW_TABLE_ROWS": summary["rawTableRows"],
            "GA_DPS_HHG_LISTING_ROWS": summary["rows"],
            "GA_DPS_HHG_DISTINCT_MCA": summary["distinctMca"],
            "GA_DPS_HHG_ROWS_MISSING_MCA": summary["missingMca"],
            "GA_DPS_HHG_ROWS_WITH_PUBLIC_EMAIL_NOT_REPUBLISHED": summary.get("withEmail", 0),
            "GA_DPS_HHG_EXACT_USDOT_JOINS": 0,
            "status_semantics": "LISTED_ON_DPS_LICENSED_HHG_ROSTER",
            "status_note": "The portal labels this the list of household goods movers licensed by DPS. It does not print an Active/Inactive column. Listing is not a separate enforcement finding.",
        },
        "tariff": {
            "number": 7,
            "effective": "2026-01-13",
            "applies_to": "Intrastate household-goods moves under Georgia DPS jurisdiction",
            "not_a_price_calculator": True,
            "not_interstate": True,
        },
        "complaints": {
            "coverage": "NOT_ACQUIRED",
            "disposition_dataset": "REQUEST_ONLY",
            "intake": "KNOWN",
            "count": None,
        },
        "identity": {
            "preferred": "Georgia MCA number printed on the licensed movers list",
            "usdot_on_source": False,
            "name_only_join": "UNSAFE",
            "ga_certificate_is_not_fmcsa": True,
        },
        "expansion_ledger": {
            "GRAPH_WRITES": 0,
            "NET_NEW_PUBLIC_PROFILES": 0,
            "EXACT_USDOT_JOINS": 0,
        },
    }
    body["fingerprint"] = hashlib.sha256(dumps(semantic(body)).encode("utf-8")).hexdigest()
    SNAP.parent.mkdir(parents=True, exist_ok=True)
    SNAP.write_text(json.dumps(body, indent=2) + "\n", encoding="utf-8")
    ACCEPTED.write_text(json.dumps({"rows": rows}, indent=2) + "\n", encoding="utf-8")
    raw["rows"] = rows
    ROSTER.write_text(json.dumps(raw, indent=2) + "\n", encoding="utf-8")
    print(body["fingerprint"], summary["rows"], summary["distinctMca"])


if __name__ == "__main__":
    main()
