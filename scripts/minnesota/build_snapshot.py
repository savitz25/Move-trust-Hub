#!/usr/bin/env python3
"""Freeze move-mn-state-intel-v1 (MN-MOVE-001). generated_at is excluded from the fingerprint.

MnDOT publishes a per-carrier Carrier Search but no household-goods permit roster, authority-type
filter or export, so this snapshot is a regulatory capability layer: the Household Goods Mover
Permit framework (Minn. Stat. ch. 221, 2025 edition), MnDOT's current insurance filings and limits,
tariff / fixed-compensation / shipment-record rules, verification path, complaint intake and
enforcement powers. No carrier rows, no invented population, no name matching to FMCSA.
Standard library only; --check rebuilds and fails on drift.
"""
from __future__ import annotations

import hashlib
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "data/minnesota/mn-move-001/sources.json"
SNAP = ROOT / "lib/minnesota-intelligence/accepted-snapshot.json"
GENERATED_AT = "2026-09-26T14:10:00Z"
FEDERAL_OBSERVED_AT = "2026-09-26T13:20:00Z"


def dumps(obj: object) -> str:
    return json.dumps(obj, sort_keys=True, separators=(",", ":"), ensure_ascii=False)


def semantic(body: dict) -> dict:
    return {k: v for k, v in body.items() if k not in {"generated_at", "fingerprint"}}


def need(cond: bool, msg: str) -> None:
    if not cond:
        raise SystemExit(f"MN-MOVE-001 build: {msg}")


def build() -> dict:
    s = json.loads(SRC.read_text(encoding="utf-8"))
    hhg = s["mndot_household_goods_page"]["statements"]
    st = s["statutes"]
    search = s["mndot_carrier_search"]
    need(all(v["edition"] == "2025 Minnesota Statutes" for v in st.values()), "statute edition")
    need("$100,000/$300,000" in hhg["limit_public_liability"], "public liability limit")
    need("$50,000" in hhg["limit_property"] and "$50,000" in hhg["limit_cargo"], "property/cargo limits")
    need("$50,000" in st["221.141"]["text"]["hhg_cargo"], "statutory cargo amount")
    need("may operate statewide" in st["221.121"]["text"]["statewide"], "statewide authority")
    need(search["rows_collected"] == 0 and not search["bulk_export"] and not search["authority_type_filter"], "carrier search capability")
    body = {
        "version": "move-mn-state-intel-v1",
        "ticket": "MN-MOVE-001",
        "as_of": "2026-09-26",
        "generated_at": GENERATED_AT,
        "snapshotAsOf": "2026-09-26",
        "retrievedAt": s["mndot_household_goods_page"]["retrieved_at"],
        "no_trust_score": True,
        "no_paid_ranking": True,
        "no_minnesota_local_routes": True,
        "no_minneapolis_intelligence_page": True,
        "publication": {
            "canonical": "https://www.movetrusthub.com/minnesota",
            "indexable": True,
            "robots": "index,follow",
            "route": "/minnesota",
            "h1": "Minnesota Moving & Household Goods Intelligence",
        },
        "regulator": {
            "agency": "Minnesota Department of Transportation",
            "office": "Office of Freight and Commercial Vehicle Operations",
            "short": "MnDOT",
            "credential_term": "Household Goods Mover Permit (Minn. Stat. 221.121)",
            "household_goods_page": s["mndot_household_goods_page"]["url"],
            "carrier_search_url": search["url"],
            "complaint_page": s["mndot_complaint_page"]["url"],
            "complaint_form": s["mndot_complaint_page"]["complaint_form"],
            "fmcsa_complaints": s["mndot_complaint_page"]["fmcsa_complaints"],
            "application_packet": s["mndot_household_goods_page"]["forms"]["application_packet"],
            "intrastate_only": True,
            "interstate_regulator": "FMCSA",
        },
        "clocks": {
            "generatedAt": GENERATED_AT,
            "snapshotAsOf": "2026-09-26",
            "retrievedAt": s["mndot_household_goods_page"]["retrieved_at"],
            "sourceAsOf": None,
            "statutes_edition": "2025 Minnesota Statutes",
            "mndot_pages_as_of": None,
            "permit_roster": {"sourceAsOf": None, "note": "No public roster exists to carry a clock."},
            "federal_overlay_observedAt": FEDERAL_OBSERVED_AT,
            "do_not_use_retrieval_as_authority_effective_date": True,
        },
        "permit_framework": {
            "coverage": "KNOWN",
            "definition": hhg["definition"],
            "apply": st["221.121"]["text"]["apply"],
            "issue": st["221.121"]["text"]["issue"],
            "duration": st["221.121"]["text"]["duration"],
            "statewide": st["221.121"]["text"]["statewide"],
            "statewide_meaning": "Permit authority is statewide Minnesota authority. It does not mean the carrier is headquartered in Minnesota, serves every shipment, holds interstate authority, or is recommended.",
            "permit_fee": st["221.121"]["text"]["fee"],
            "no_operation_without_permit": st["221.021"]["text"]["no_operation"],
            "no_operation_before_permit_mndot": hhg["no_operation_before_permit"],
            "renewal": st["221.131"]["text"]["renewal"],
            "vehicle_registration": st["221.131"]["text"]["vehicle_fee"],
            "usdot_step": hhg["usdot_step"],
            "usdot_types": hhg["usdot_types"],
            "maintenance_facts_kept_separate": ["permit", "annual renewal", "vehicle registration and identification card", "continuous insurance", "safety rating"],
            "no_synthetic_license_status": True,
        },
        "insurance": {
            "coverage": "KNOWN",
            "filing": hhg["insurance_filing"],
            "limits": [hhg["limit_public_liability"], hhg["limit_property"], hhg["limit_cargo"]],
            "statutory_cargo": st["221.141"]["text"]["hhg_cargo"],
            "continuous": st["221.141"]["text"]["continuous"],
            "insurance_is_not_quality": True,
        },
        "rates_and_records": {
            "tariff_rule": st["221.161"]["text"]["tariff"],
            "tariff_availability": st["221.161"]["text"]["availability"],
            "tariff_copies": st["221.161"]["text"]["copies"],
            "fixed_compensation": st["221.171"]["text"]["fixed"],
            "shipment_record": st["221.172"]["text"]["record"],
            "shipment_record_contents": st["221.172"]["text"]["contents"],
            "shipment_record_retention": st["221.172"]["text"]["retention"],
            "MN_TARIFF_REPOSITORY": "NOT_ACQUIRED",
            "state_tariff_repository_published": False,
            "not_a_quote": True,
            "no_statewide_price": True,
            "rate_sheets_parsed": False,
            "record_is_not_tariff_is_not_quote": True,
        },
        "current_hhg_roster": {
            "coverage": "NOT_ACQUIRED",
            "MN_HHG_PERMIT_ROSTER": "NOT_ACQUIRED",
            "MN_HHG_PERMIT_ROWS": None,
            "MN_HHG_DISTINCT_PERMITS": None,
            "MN_EXACT_PERMIT_USDOT_BRIDGES": 0,
            "MN_EXACT_MC_JOINS": 0,
            "verification": "KNOWN",
            "verification_path": "MnDOT Carrier Search by MnDOT #, USDOT # or name; each carrier's detail page lists its authority types (for example Household Goods), status and status date.",
            "search_fields": search["search_fields"],
            "result_columns": search["result_columns"],
            "detail_fields": search["detail_fields"],
            "why_not_acquired": search["note"],
            "missing_is_not_zero": True,
            "minnesota_address_is_not_state_authority": True,
            "paths_checked": s["roster_search"]["paths_checked"],
        },
        "complaints": {
            "coverage": "NOT_ACQUIRED",
            "intake": "KNOWN",
            "mndot_statement": s["mndot_complaint_page"]["statements"]["mndot"],
            "fmcsa_scope": s["mndot_complaint_page"]["statements"]["fmcsa_scope"],
            "latest_published_complaint_report": s["mndot_complaint_page"]["latest_published_complaint_report"],
            "company_level_records": "NOT_ACQUIRED",
            "outcomes": "REQUEST_ONLY",
            "count": None,
            "complaint_is_not_a_finding": True,
        },
        "enforcement": {
            "coverage": "KNOWN",
            "administrative_orders": st["221.036"]["text"]["order"],
            "penalty_amount": st["221.036"]["text"]["amount"],
            "suspension": st["221.185"]["text"]["suspension"],
            "provider_level_actions": "NOT_ACQUIRED",
            "name_only_adverse_join": "UNSUPPORTED",
        },
        "existing_coverage_audit": {
            "federal_overlay": {
                "source": "MoveTrustHub production research search (FMCSA spine), recorded headquarters state MN",
                "observedAt": FEDERAL_OBSERVED_AT,
                "interstate_hhg_carriers_headquartered_mn": 66,
                "movers_in_minnesota_public_identity_cohort": 69,
                "note": "Headquarters address is not a Minnesota permit and not a service area. Existing federal records were not duplicated.",
            },
            "existing_minnesota_routes": ["/moving-to/minnesota (destination guide)", "/moving-to/minnesota/[slug]"],
            "state_intelligence_route_before": None,
            "mndot_evidence_before": "NONE",
        },
        "identity": {
            "preferred": "MnDOT # as printed by the MnDOT Carrier Search (verification only; no roster held)",
            "usdot_on_state_search": True,
            "exact_bridges_accepted": 0,
            "name_only_join": "UNSAFE",
            "mn_permit_is_not_usdot": True,
            "mn_permit_is_not_mc": True,
            "mc_not_required_for_intrastate": True,
            "zero_bridges_is_not_zero_overlap": True,
        },
        "capabilities": {
            "permit_framework": "KNOWN",
            "active_permit_roster": "NOT_ACQUIRED",
            "permit_verification": "KNOWN",
            "state_usdot_bridge": "UNKNOWN",
            "insurance_requirements": "KNOWN",
            "tariff_rules": "KNOWN",
            "carrier_tariff_corpus": "NOT_ACQUIRED",
            "shipment_record_rules": "KNOWN",
            "complaint_intake": "KNOWN",
            "complaint_outcomes": "REQUEST_ONLY",
            "enforcement_powers": "KNOWN",
            "provider_enforcement_actions": "NOT_ACQUIRED",
            "name_only_state_fmcsa_join": "UNSUPPORTED",
            "combined_state_fmcsa_mover_count": "UNSUPPORTED",
            "local_city_pages": "UNSUPPORTED",
        },
        "expansion_ledger": {
            "GRAPH_WRITES": 0,
            "NET_NEW_PUBLIC_PROFILES": 0,
            "EXACT_USDOT_JOINS": 0,
            "EXACT_MC_JOINS": 0,
            "PROFILE_ATTACHMENTS": 0,
        },
        "source_capture_sha256": hashlib.sha256(SRC.read_bytes().replace(b"\r\n", b"\n")).hexdigest(),
    }
    body["fingerprint"] = hashlib.sha256(dumps(semantic(body)).encode("utf-8")).hexdigest()
    return body


def main() -> None:
    body = build()
    text = json.dumps(body, indent=2, ensure_ascii=False) + "\n"
    if "--check" in sys.argv:
        if SNAP.read_text(encoding="utf-8").replace("\r\n", "\n") != text:
            raise SystemExit("lib/minnesota-intelligence/accepted-snapshot.json drifted from the builder")
        print("MN-MOVE-001 snapshot check OK", body["fingerprint"])
        return
    SNAP.parent.mkdir(parents=True, exist_ok=True)
    SNAP.write_text(text, encoding="utf-8", newline="\n")
    print(body["fingerprint"])


if __name__ == "__main__":
    main()
