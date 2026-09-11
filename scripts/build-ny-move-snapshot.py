#!/usr/bin/env python3
"""NY-MOVE-001 — public snapshot. Bulletin observations are not a current roster."""
from __future__ import annotations

import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CENSUS = ROOT / "data" / "new-york" / "ny-move-001" / "ny-move-census.json"
OUT_JSON = ROOT / "lib" / "new-york-intelligence" / "accepted-snapshot.json"

RETRIEVED = "2026-09-11T18:00:00Z"


def sha256_obj(obj: object) -> str:
    blob = json.dumps(obj, sort_keys=True, separators=(",", ":")).encode()
    return hashlib.sha256(blob).hexdigest()


def main() -> int:
    census = json.loads(CENSUS.read_text(encoding="utf-8"))
    snapshot = {
        "version": "move-ny-state-intel-v1",
        "ticket": "NY-MOVE-001A",
        "as_of": None,
        "generated_at": RETRIEVED,
        "snapshotAsOf": "2026-09-11",
        "retrievedAt": RETRIEVED,
        "no_trust_score": True,
        "no_paid_ranking": True,
        "no_new_york_local_routes": True,
        "publication": {
            "canonical": "https://www.movetrusthub.com/new-york",
            "indexable": True,
            "robots": "index,follow",
            "route": "/new-york",
            "rankings": False,
            "trustScore": False,
            "h1": "New York Household-Goods Moving Intelligence",
        },
        "uiGrains": {
            "currentHhgRoster": "VISIBLE_SUPPORTING_CONTEXT",
            "bulletinIssues": "VISIBLE_PUBLIC_METRIC",
            "hhgBulletinObservations": "VISIBLE_PUBLIC_METRIC",
            "federalOverlay": "VISIBLE_SUPPORTING_CONTEXT",
            "complaints": "VISIBLE_SUPPORTING_CONTEXT",
            "insurance": "VISIBLE_SUPPORTING_CONTEXT",
        },
        "regulator": {
            "agency": "New York State Department of Transportation — Office of Modal Safety and Security",
            "short": "NYSDOT",
            "notDfs": True,
            "hhg_url": "https://www.dot.ny.gov/divisions/operating/osss/truck/registration-licensing",
            "carcert_url": "https://carcert.dot.ny.gov/",
            "bulletin_url": "https://www.dot.ny.gov/main/publications/wb-motor-carrier-applications",
            "complaint_url": "https://www.dot.ny.gov/divisions/operating/osss/truck",
            "fuel_surcharge_url": "https://www.dot.ny.gov/divisions/operating/osss/truck",
        },
        "current_hhg_roster": {
            "coverage": "OPEN_SEARCH_ONLY",
            "CURRENT_NY_HHG_AUTHORIZED_ROSTER": "OPEN_SEARCH_ONLY",
            "rows": None,
            "distinctAuthorityIds": None,
            "reason": "CarCert states Search New York State Carriers (Functionality Under Development). No complete current Household Goods roster was enumerated. Search-only is not zero.",
        },
        "bulletin_2026": {
            "coverage": "ACQUIRED_CURRENT_SNAPSHOT",
            "source": "NYSDOT Weekly Bulletin of Motor Carrier Applications",
            "sourceAsOf": "2026-09-09",
            "windowStart": "2026-01-07",
            "windowEnd": "2026-09-09",
            "retrievedAt": RETRIEVED,
            "issues": 36,
            "hhgApplicationObservations": 108,
            "distinctCaseNumbers": 103,
            "applicationTypes": {
                "New Service": 101,
                "Transfer": 3,
                "Extension": 1,
                "Partial Transfer of Authority": 1,
                "Name Change": 1,
                "UNKNOWN": 1,
            },
            "rowsWithUsdot": 0,
            "rowsWithNydot": 0,
            "rowsWithCertificate": 0,
            "application_ne_authority": True,
            "application_ne_current_mover": True,
            "observation_ne_carrier_count": True,
            "probationary_ne_permanent": True,
        },
        "identity": {
            "native_id_field": "Case Number on bulletin observations; NYDOT number required for consumer verification when available",
            "namespace": None,
            "namespace_note": "No source-native NYDOT number field was printed on 2026 bulletin HHG observations. Do not invent NY-DOT-HHG:{n} until the source field is confirmed.",
            "usdot_alone_is_not_ny_intrastate_authority": True,
        },
        "federal": {
            "name_only": "UNSAFE",
            "name_plus_address": "REVIEW_REQUIRED",
            "exact_state_to_federal_crosswalks": 0,
            "review_required_crosswalks": 0,
            "rejected_unsafe_crosswalks": 0,
            "nydot_authority_ne_usdot": True,
            "usdot_ne_active_interstate_authority": True,
            "state_mover_ne_federal_mover": True,
            "hq_geography_ne_nydot_authority": True,
            "overlay_note": "Existing MoveTrustHub FMCSA spine is reused. A New York-address USDOT carrier is not a New York-authorized intrastate household-goods mover.",
        },
        "complaints": {
            "coverage": "PUBLIC_RESEARCH_PATH",
            "NY_HHG_COMPLAINT_ROWS": None,
            "path": "NYSDOT Motor Carrier Investigators mci@dot.ny.gov / 518-485-1010; household-goods complaint form in the truck repository",
            "complaint_ne_violation": True,
        },
        "compliance": {
            "coverage": "PUBLIC_RESEARCH_PATH",
            "reason": "No bounded household-goods-only Notice of Violation bulk table was acquired.",
        },
        "insurance": {
            "CURRENT_INSURANCE_COMPLIANCE": "OPEN_SEARCH_ONLY",
            "historical_application_ne_insured_today": True,
            "insurance_ne_quality": True,
        },
        "tariff": {
            "coverage": "REGULATORY_CONTEXT",
            "corpus": "NOT_ACQUIRED",
            "tariff_ne_quality": True,
            "rate_ne_recommendation": True,
        },
        "applications": {
            "applicant_ne_authorized_carrier": True,
            "publication_ne_operating_authority": True,
            "approval_ne_current_authority": True,
        },
        "expansion_ledger": {
            "NY_CURRENT_HHG_AUTHORITY_ROWS": None,
            "NY_CURRENT_HHG_DISTINCT_AUTHORITY_IDS": None,
            "NY_DOT_2026_BULLETIN_ISSUES": 36,
            "NY_DOT_2026_HHG_APPLICATION_OBSERVATIONS": 108,
            "NY_DOT_2026_HHG_DISTINCT_SOURCE_IDS": 103,
            "EXACT_NY_STATE_TO_FEDERAL_CROSSWALKS": 0,
            "REVIEW_REQUIRED_CROSSWALKS": 0,
            "REJECTED_UNSAFE_CROSSWALKS": 0,
            "NY_HHG_COMPLAINT_ROWS": None,
            "NET_NEW_CANONICAL_ORGANIZATIONS": 0,
            "NET_NEW_PUBLIC_MOVE_PROFILES": 0,
            "EXISTING_ORGANIZATIONS_ENRICHED": 0,
            "EXACT_PROFILE_ATTACHMENTS": 0,
            "GRAPH_WRITES": 0,
        },
        "claimEligibilityBroadened": False,
        "noCombinedNewYorkMoversTotal": True,
        "unknownIsNotZero": True,
        "searchOnlyIsNotZero": True,
        "juiceSqueeze": [
            {"decision": "GRABBED — HIGH YIELD", "source": "NYSDOT Household Goods authority framework"},
            {"decision": "GRABBED — HIGH YIELD", "source": "2026 Weekly Bulletin of Motor Carrier Applications (36 issues; 108 HHG observations)"},
            {"decision": "GRABBED — HIGH YIELD", "source": "Existing FMCSA federal overlay (not treated as NYDOT authority)"},
            {"decision": "GRABBED — EASY SECONDARY", "source": "Complaint path, fuel-surcharge/tariff context, bulletin Case Numbers"},
            {"decision": "LEFT — SEARCH ONLY", "source": "Current CarCert Household Goods roster (functionality under development)"},
            {"decision": "LEFT — SEARCH ONLY", "source": "Current insurance compliance"},
            {"decision": "LEFT — TOO MUCH WORK FOR CURRENT YIELD", "source": "Tariff corpus, historical bulletins, complaint-by-complaint retrieval"},
            {"decision": "LEFT — REQUEST ONLY", "source": "FOIL"},
            {"decision": "LEFT — LOCAL / FUTURE", "source": "NYC / boroughs / counties"},
        ],
        "censusIssuesAcquired": census["issuesAcquired"],
        "censusFailed": census["failed"],
    }
    snapshot["fingerprint"] = sha256_obj({k: v for k, v in snapshot.items() if k != "fingerprint"})
    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(snapshot, indent=2) + "\n", encoding="utf-8")
    (ROOT / "artifacts" / "ny-move-001-public-snapshot.json").parent.mkdir(parents=True, exist_ok=True)
    (ROOT / "artifacts" / "ny-move-001-public-snapshot.json").write_text(
        json.dumps(snapshot, indent=2) + "\n", encoding="utf-8"
    )
    print(json.dumps({"fingerprint": snapshot["fingerprint"], "issues": 36, "hhg": 108}, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
