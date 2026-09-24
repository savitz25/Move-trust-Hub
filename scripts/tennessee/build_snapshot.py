#!/usr/bin/env python3
"""Freeze move-tn-state-intel-v1 (TN-MOVE-001). generated_at is excluded from the fingerprint.

Tennessee publishes no public Intrastate Authority roster or search, so this snapshot is a regulatory
capability layer: the Revenue authority model, the current motor-carrier rule text (March 2026
revision, which repealed the former household-goods and tariff rules), and complaint intake. No
carrier rows, no fake population, no name matching to FMCSA. Standard library only; --check rebuilds
and fails on drift.
"""
from __future__ import annotations

import hashlib
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "data/tennessee/tn-move-001"
SNAP = ROOT / "lib/tennessee-intelligence/accepted-snapshot.json"


def dumps(obj: object) -> str:
    return json.dumps(obj, sort_keys=True, separators=(",", ":"), ensure_ascii=False)


def semantic(body: dict) -> dict:
    return {k: v for k, v in body.items() if k not in {"generated_at", "fingerprint"}}


def need(cond: bool, msg: str) -> None:
    if not cond:
        raise SystemExit(f"TN-MOVE-001 build: {msg}")


def main() -> None:
    check = "--check" in sys.argv
    s = json.loads((SRC / "sources.json").read_text(encoding="utf-8"))
    rules = s["rules_current"]
    pdf = SRC / rules["file"]
    need(hashlib.sha256(pdf.read_bytes()).hexdigest() == rules["sha256"], "rule PDF bytes differ from the capture record")
    need(all(v == 0 for v in rules["current_text_keyword_counts"].values()), "current rule text unexpectedly contains household-goods/tariff wording; re-audit")
    need("Repeal filed December 9, 2025; effective March 9, 2026." in rules["household_goods_rule_13_text"], "rule .13 repeal clock")
    ia = s["revenue_intrastate_authority"]
    form_h = next(x for x in ia["statements"] if x.startswith("Form H"))
    need("household goods" in form_h, "Form H household-goods wording")

    existing = json.loads(SNAP.read_text(encoding="utf-8")) if SNAP.exists() else None
    generated = existing["generated_at"] if check and existing else datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    body = {
        "version": "move-tn-state-intel-v1",
        "ticket": "TN-MOVE-001",
        "as_of": "2026-09-24",
        "generated_at": generated,
        "snapshotAsOf": "2026-09-24",
        "retrievedAt": ia["retrieved_at"],
        "no_trust_score": True,
        "no_paid_ranking": True,
        "no_tennessee_local_routes": True,
        "no_nashville_intelligence_page": True,
        "publication": {
            "canonical": "https://www.movetrusthub.com/tennessee",
            "indexable": True,
            "robots": "index,follow",
            "route": "/tennessee",
            "h1": "Tennessee Moving & Household Goods Intelligence",
        },
        "regulator": {
            "agency": "Tennessee Department of Revenue",
            "division": "Vehicle Services Division, Motor Carrier Section",
            "short": "Tennessee Revenue",
            "credential_term": "Tennessee Intrastate Authority",
            "authority_url": ia["url"],
            "tntap_url": ia["tntap_url"],
            "application_form": s["application_form"]["form"],
            "application_url": s["application_form"]["url"],
            "process_agent_form": s["process_agent_form"]["form"],
            "process_agent_url": s["process_agent_form"]["url"],
            "process_agent_statute": s["process_agent_form"]["statute"],
            "rules_publisher": rules["publisher"],
            "rules_url": rules["url"],
            "complaint_agency": s["complaints"]["agency"],
            "complaint_url": s["complaints"]["url"],
            "intrastate_only": True,
            "interstate_regulator": "FMCSA",
        },
        "authority_model": {
            "definition": ia["statements"][0],
            "new_applicant_requirements": ia["new_applicant_requirements"],
            "process_agent": ia["process_agent_statement"],
            "insurance_forms": ia["statements"][2:4],
            "form_h_household_goods": True,
            "fees": s["application_form"]["fees"],
            "tntap_functions": s["tntap_motor_carrier"]["intrastate_authority_functions"],
            "application_asks_for_usdot": True,
            "usdot_field_note": s["application_form"]["usdot_field_note"],
        },
        "clocks": {
            "generatedAt": generated,
            "snapshotAsOf": "2026-09-24",
            "retrievedAt": ia["retrieved_at"],
            "sourceAsOf": None,
            "do_not_use_retrieval_as_authority_effective_date": True,
            "authority_roster": {"sourceAsOf": None, "note": "No public roster exists to carry a clock."},
            "rules": {
                "revision": rules["revision_label"],
                "filed": rules["amendments_and_repeals_filed"],
                "effective": rules["effective"],
                "retrievedAt": rules["retrieved_at"],
            },
            "application_form": {"revision": "10/25", "httpLastModified": s["application_form"]["http_last_modified"]},
        },
        "current_hhg_roster": {
            "coverage": "NOT_ACQUIRED",
            "TN_INTRASTATE_AUTHORITY_BULK": s["roster_search"]["TN_INTRASTATE_AUTHORITY_BULK"],
            "TN_INTRASTATE_AUTHORITY_PUBLIC_SEARCH": "NOT_AVAILABLE",
            "TN_INTRASTATE_AUTHORITY_ROWS": None,
            "TN_INTRASTATE_AUTHORITY_DISTINCT_IDS": None,
            "TN_HHG_AUTHORITY_ROWS": None,
            "TN_EXACT_USDOT_JOINS": 0,
            "TN_EXACT_MC_JOINS": 0,
            "reason": "Tennessee Revenue publishes the Intrastate Authority application and renewal framework but no carrier list, download or public search. TNTAP Intrastate Authority functions are carrier account functions. Search-only would still not be zero; here there is no public search at all.",
            "search": s["roster_search"],
            "missing_is_not_zero": True,
            "tennessee_address_is_not_state_authority": True,
            "household_goods_is_a_cargo_insurance_class_not_a_published_roster": True,
        },
        "rules": {
            "chapter": rules["chapter"],
            "revision": rules["revision_label"],
            "effective": rules["effective"],
            "sections_in_force": rules["sections_in_force"],
            "repealed_range": rules["repealed_range"],
            "insurance_filing_text": rules["insurance_filing_text"],
            "intrastate_cargo_liability_text": rules["intrastate_cargo_liability_text"],
            "intrastate_cargo_liability_limits": {"per_vehicle": "$5,000", "any_one_time_and_place": "$10,000"},
            "household_goods_rule_status": "REPEALED_EFFECTIVE_2026_03_09",
            "household_goods_rule_13_text": rules["household_goods_rule_13_text"],
            "current_text_keyword_counts": rules["current_text_keyword_counts"],
            "prior_revision": s["rules_prior_revision"],
            "repealed_rules_are_not_current_protections": True,
        },
        "tariff": {
            "model": "NO_CURRENT_RULE",
            "TN_TARIFF_INDEX": "NOT_ACQUIRED",
            "current_rule_requirement": "NONE_IN_CHAPTER_1340_06_01",
            "note": "The former rules requiring tariffs to be kept open for public inspection and barring charges that differ from the filed tariff were in the August 2021 revision and are not in the March 2026 revision. No state tariff index was found.",
            "not_a_quote": True,
            "no_statewide_price": True,
            "rate_sheets_parsed": False,
        },
        "complaints": {
            "coverage": "NOT_ACQUIRED",
            "intake": "KNOWN",
            "intake_statements": s["complaints"]["statements"],
            "provider_level_complaints": "NOT_ACQUIRED",
            "outcomes": "REQUEST_ONLY",
            "count": None,
            "complaint_is_not_a_finding": True,
        },
        "identity": {
            "preferred": None,
            "state_authority_identifier_published": False,
            "usdot_on_source": False,
            "mc_on_source": False,
            "name_only_join": "UNSAFE",
            "tn_intrastate_authority_is_not_usdot": True,
            "tn_intrastate_authority_is_not_mc": True,
        },
        "capabilities": {
            "intrastate_authority_framework": "KNOWN",
            "form_h_household_goods_cargo_insurance": "KNOWN",
            "intrastate_cargo_liability_limits": "KNOWN",
            "state_authority_bulk_roster": "NOT_ACQUIRED",
            "state_authority_public_search": "UNSUPPORTED",
            "household_goods_consumer_rules": "UNSUPPORTED",
            "tariff_index": "NOT_ACQUIRED",
            "complaint_intake": "KNOWN",
            "complaint_outcomes": "REQUEST_ONLY",
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
        "source_rule_pdf_sha256": rules["sha256"],
    }
    body["fingerprint"] = hashlib.sha256(dumps(semantic(body)).encode("utf-8")).hexdigest()
    text = json.dumps(body, indent=2, ensure_ascii=False) + "\n"
    if check:
        need(SNAP.exists() and SNAP.read_text(encoding="utf-8").replace("\r\n", "\n") == text, "snapshot drifted; rebuild")
        print("check", body["fingerprint"])
        return
    SNAP.parent.mkdir(parents=True, exist_ok=True)
    SNAP.write_text(text, encoding="utf-8", newline="\n")
    print(body["fingerprint"])


if __name__ == "__main__":
    main()
