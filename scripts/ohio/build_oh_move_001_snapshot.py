#!/usr/bin/env python3
"""Build move-oh-state-intel-v1. PUCO HHG current roster stays OPEN_SEARCH_ONLY."""
from __future__ import annotations

import argparse
import copy
import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "lib/ohio-intelligence/accepted-snapshot.json"
VOLATILE = frozenset({"fingerprint", "generated_at", "generatedAt"})


def dump(obj: object) -> str:
    return json.dumps(obj, sort_keys=True, separators=(",", ":"), ensure_ascii=False)


def sha_body(obj: dict[str, Any]) -> str:
    body = {k: v for k, v in obj.items() if k not in VOLATILE}
    clocks = copy.deepcopy(body.get("clocks") or {})
    clocks.pop("generatedAt", None)
    body["clocks"] = clocks
    return hashlib.sha256(dump(body).encode("utf-8")).hexdigest()


def build() -> dict[str, Any]:
    generated = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    snap: dict[str, Any] = {
        "version": "move-oh-state-intel-v1",
        "ticket": "OH-MOVE-001",
        "as_of": None,
        "generated_at": generated,
        "snapshotAsOf": "2026-09-18",
        "retrievedAt": "2026-09-18T14:30:00Z",
        "retrievedAtPrecision": "date",
        "no_trust_score": True,
        "no_paid_ranking": True,
        "no_ohio_local_routes": True,
        "no_columbus_page": True,
        "no_cleveland_page": True,
        "no_cincinnati_page": True,
        "no_toledo_page": True,
        "no_dayton_page": True,
        "no_akron_page": True,
        "publication": {
            "canonical": "https://www.movetrusthub.com/ohio",
            "indexable": True,
            "robots": "index,follow",
            "route": "/ohio",
            "rankings": False,
            "trustScore": False,
            "h1": "Ohio Moving & Household Goods Intelligence",
        },
        "regulator": {
            "agency": "Public Utilities Commission of Ohio",
            "short": "PUCO",
            "credential_term": "household-goods certificate / PUCO No.",
            "statute_hhg": "ORC 4921.30–4921.38",
            "rules": "OAC Chapter 4901:2-19",
            "advertisement_format": "PUCO No. ______",
            "certificate_suffix_observed": "-HG",
            "home_url": "https://puco.ohio.gov/",
            "dis_url": "https://dis.puc.state.oh.us/",
            "complaint_phone": "1-800-686-7826",
            "complaint_url": "https://puco.ohio.gov/",
            "tariff_dam_folder": "https://dam.assets.ohio.gov/image/upload/puco.ohio.gov/empliibrary/files/docketing/tariffs/Household%20Goods%20Carriers/",
            "motor_carrier_registration_note": "Login system; carriers search by USDOT. Not a public complete HHG roster.",
            "intrastate_only": True,
        },
        "clocks": {
            "generatedAt": generated,
            "snapshotAsOf": "2026-09-18",
            "retrievedAt": "2026-09-18T14:30:00Z",
            "do_not_use_retrieval_as_certificate_effective_date": True,
            "hhg_roster": {
                "sourceAsOf": None,
                "retrievedAt": "2026-09-18T14:30:00Z",
                "note": "Search-only currentness. Do not fake sourceAsOf from retrieval time.",
            },
            "tariff": {
                "sourceAsOf": None,
                "retrievedAt": "2026-09-18T14:30:00Z",
                "issue_date": None,
                "effective_date": None,
                "replacement_date": None,
            },
            "docket": {
                "sourceAsOf": None,
                "retrievedAt": "2026-09-18T14:30:00Z",
            },
        },
        "current_hhg_roster": {
            "coverage": "OPEN_SEARCH_ONLY",
            "OH_PUCO_HHG_ROSTER_STATUS": "OPEN_SEARCH_ONLY",
            "OH_PUCO_HHG_ROWS": None,
            "OH_PUCO_DISTINCT_CERTIFICATE_NUMBERS": None,
            "OH_PUCO_ACTIVE_ROWS": None,
            "OH_PUCO_INACTIVE_ROWS": None,
            "OH_PUCO_SUSPENDED_ROWS": None,
            "OH_PUCO_CANCELLED_ROWS": None,
            "OH_PUCO_STATUS_UNKNOWN_ROWS": None,
            "OH_PUCO_DISTINCT_SOURCE_NAMES": None,
            "OH_PUCO_DBA_ROWS": None,
            "reason": "No public complete current household-goods certificate roster, CSV, Excel, or paging API was found. Motor Carrier Registration is a login system searched by USDOT. Do not brute-force certificate numbers. Search-only is not zero.",
            "search_only_is_not_zero": True,
            "oam_agent_tariff_is_not_complete_roster": True,
            "household_goods_carrier_ne_generic_trucking": True,
            "household_goods_carrier_ne_freight": True,
            "household_goods_carrier_ne_interstate_automatically": True,
            "household_goods_carrier_ne_broker": True,
        },
        "identity": {
            "display_format": "PUCO No. ______",
            "source_native_suffix_observed": "-HG",
            "examples_observed": ["113554-HG", "1288-HG", "129005 H", "512348"],
            "do_not_strip_hg_blindly": True,
            "namespace": None,
            "namespace_note": "Do not mint OH-PUCO-HHG:{n} until a household-goods-only bulk roster is acquired. Observed displays include numeric IDs, -HG suffixes, and spaced H markers.",
            "puco_certificate_ne_usdot": True,
            "puco_certificate_ne_mc": True,
            "puco_intrastate_ne_fmcsa_interstate": True,
            "leading_zeroes_identity_relevant_until_roster_acquired": True,
        },
        "status": {
            "raw_and_normalized_separate": True,
            "current_roster_status_ne_tariff_existence": True,
            "historic_tariff_ne_current_authority": True,
            "observed_in_tariff_documents_is_not_current_status": True,
        },
        "company_dba": {
            "legal_carrier_ne_dba": True,
            "dba_ne_second_carrier_unless_source_says": True,
            "address_ne_service_territory": True,
            "ohio_address_ne_federal_hq": True,
            "record_address_ne_verified_operating_location": True,
        },
        "tariff": {
            "model": "CARRIER_SPECIFIC",
            "OH_PUCO_TARIFF_COVERAGE": "PUBLIC_DAM_FOLDER_KNOWN / COMPLETE_INDEX_NOT_ACQUIRED",
            "OH_PUCO_TARIFF_DOCUMENT_ROWS": None,
            "OH_PUCO_DISTINCT_TARIFF_NUMBERS": None,
            "OH_PUCO_DISTINCT_CERTIFICATES_WITH_TARIFF": None,
            "OH_PUCO_CURRENT_TARIFF_RELATIONSHIPS": None,
            "OH_PUCO_HISTORIC_TARIFF_ROWS": None,
            "not_nc_statewide_maximum_rate_tariff": True,
            "each_carrier_files_own_tariff": True,
            "carrier_tariff_ne_statewide_tariff": True,
            "one_carrier_tariff_ne_another": True,
            "tariff_rate_ne_quote": True,
            "tariff_existence_ne_current_authority": True,
            "historic_tariff_ne_current_rate": True,
            "oam_agent_tariff_is_participating_carriers_not_census": True,
            "interstate_hhg_carriers_not_required_to_file_ohio_tariff": True,
            "rule": "OAC 4901:2-19-03",
        },
        "estimates": {
            "types": ["nonbinding", "binding", "guaranteed-not-to-exceed"],
            "rule": "OAC 4901:2-19-08",
            "statewide_context_not_carrier_compliance_evidence": True,
            "do_not_label_carrier_offers_binding_without_carrier_source": True,
        },
        "bill_of_lading": {
            "rule": "OAC 4901:2-19-09",
            "must_include_certificate_number": True,
            "do_not_label_carrier_compliant_without_evidence": True,
        },
        "liability": {
            "rule": "OAC 4901:2-19-06",
            "default": "replacement value unless consumer elects a disclosed limitation",
            "minimal_option": "sixty cents per pound per article",
            "full_replacement_minimum": "declared value or six dollars per pound times shipment weight, whichever is greater",
            "required_framework_ne_active_insurance_proof": True,
            "liability_rule_ne_insurance_policy": True,
            "deductible_election_ne_quality": True,
        },
        "claims": {
            "minimum_consumer_claim_window_days": 60,
            "carrier_ack_days": 15,
            "carrier_respond_days": 30,
            "consumer_damage_claim_ne_puco_complaint": True,
            "damage_claim_ne_enforcement": True,
            "complaint_ne_finding": True,
            "source": "OAC 4901:2-19-08(D)(16) consumer-rights statement",
        },
        "insurance": {
            "OH_PUCO_CURRENT_INSURANCE_ROWS": None,
            "OH_PUCO_INSURANCE_COVERAGE": "REQUIREMENT_OR_VERIFICATION_PATH_KNOWN / CURRENT_BULK_NOT_ACQUIRED",
            "form_e": "liability proof filed into Motor Carrier Registration (not public bulk)",
            "form_h": "household-goods cargo proof (login/insurance-company path)",
            "requirement_ne_all_carriers_insured": True,
        },
        "dockets": {
            "OH_PUCO_DOCKET_COVERAGE": "OPEN_SEARCH_ONLY",
            "OH_PUCO_DOCKET_ROWS": None,
            "OH_PUCO_DISTINCT_DOCKET_NUMBERS": None,
            "OH_PUCO_ORDER_ROWS": None,
            "OH_PUCO_APPLICATION_ROWS": None,
            "OH_PUCO_CERTIFICATE_APPLICATION_ROWS": None,
            "OH_PUCO_TARIFF_FILING_ROWS": None,
            "OH_PUCO_ENFORCEMENT_ROWS": None,
            "system": "DIS https://dis.puc.state.oh.us/",
            "tr_transportation_cases_observed_label": 19099,
            "tr_label_is_not_hhg_census": True,
            "purpose_filtered_listing_waf_blocked": True,
            "docket_ne_complaint": True,
            "application_ne_violation": True,
            "tariff_filing_ne_enforcement": True,
            "certificate_transfer_ne_discipline": True,
            "order_ne_automatically_adverse": True,
            "complaint_filing_ne_final_finding": True,
            "no_uncontrolled_document_crawl": True,
        },
        "complaints": {
            "OH_PUCO_HHG_COMPLAINT_ROWS": None,
            "OH_PUCO_HHG_COMPLAINT_COVERAGE": "INTAKE_AVAILABLE / BULK_NOT_PUBLIC",
            "intake": "PUCO 1-800-686-7826; puco.ohio.gov",
            "complaint_intake_ne_census": True,
            "complaint_ne_finding": True,
        },
        "enforcement": {
            "OH_PUCO_HHG_ENFORCEMENT_COVERAGE": "OPEN_SEARCH_ONLY",
            "OH_PUCO_HHG_ENFORCEMENT_ROWS": None,
            "search_only_is_not_zero": True,
        },
        "unauthorized": {
            "OH_UNAUTHORIZED_MOVER_ROWS": None,
            "no_news_blacklist": True,
            "no_bbb_blacklist": True,
        },
        "federal": {
            "name_only": "UNSAFE",
            "EXACT_OH_PUCO_TO_USDOT_CROSSWALKS": 0,
            "EXACT_OH_PUCO_TO_MC_CROSSWALKS": 0,
            "EXACT_PUCO_TO_USDOT_CROSSWALKS": 0,
            "EXACT_PUCO_TO_MC_CROSSWALKS": 0,
            "puco_certificate_ne_usdot": True,
            "puco_certificate_ne_mc": True,
            "puco_ne_fmcsa": True,
            "ohio_address_ne_federal_hq": True,
            "reuse_existing_fmcsa_architecture": True,
            "overlay_note": "Existing MoveTrustHub FMCSA spine is supporting context. No official PUCO bulk roster published USDOT/MC. Observed USDOT on an individual tariff PDF is not a roster-wide exact bridge. No name-only bridges.",
        },
        "identity_ledger": {
            "EXACT_PUCO_CERTIFICATE_IDENTITIES": 0,
            "EXACT_PUCO_TO_USDOT_CROSSWALKS": 0,
            "EXACT_PUCO_TO_MC_CROSSWALKS": 0,
            "EXACT_PROFILE_ATTACHMENTS": 0,
            "REVIEW_REQUIRED": 0,
            "note": "Zero exact certificate identities because no complete current HHG roster was acquired. Zero is not a census of zero movers.",
        },
        "adverse_publication": {
            "ADVERSE_SOURCES_FOUND": 3,
            "ADVERSE_SOURCES_ACQUIRED": 0,
            "ADVERSE_ROWS_ACQUIRED": None,
            "UNIQUE_REGULATORY_MATTERS": None,
            "EXACT_PROFILE_ATTACHMENTS": 0,
            "REVIEW_REQUIRED": 0,
            "UNRESOLVED": None,
            "INTERNAL_ONLY": 0,
            "PUBLICATION_PENDING": 0,
            "PUBLIC_READY_PROFILES": 0,
            "PUBLICLY_RENDERED_PROFILES": 0,
            "BUSINESS_RESPONSE_READY": False,
            "SEARCH_SUPPORTED": True,
            "REMAINING_ADVERSE_GAPS": [
                "No bounded public HHG complaint census",
                "No bounded HHG enforcement census",
                "DIS transportation case list is not an HHG adverse universe",
            ],
            "do_not_add_dockets_complaints_orders_tariffs": True,
        },
        "withheld_reason_counts": {
            "OPEN_SEARCH_ONLY": 4,
            "UNSAFE_NAME_MATCH": 0,
        },
        "expansion_ledger": {
            "NET_NEW_STATE_RESEARCH_IDENTITIES": 0,
            "NET_NEW_CANONICAL_ORGANIZATIONS": 0,
            "NET_NEW_PUBLIC_MOVE_PROFILES": 0,
            "EXISTING_ORGANIZATIONS_ENRICHED": 0,
            "GRAPH_WRITES": 0,
            "EXACT_PROFILE_ATTACHMENTS": 0,
            "CLAIM_ELIGIBILITY_BROADENED": False,
        },
        "claimEligibilityBroadened": False,
        "local_work_needed_now": "NO",
        "semantic_guardrails": [
            "PUCO certificate != USDOT",
            "PUCO certificate != MC",
            "PUCO intrastate HHG != FMCSA interstate HHG",
            "carrier tariff != statewide Maximum Rate Tariff",
            "tariff != quote",
            "tariff existence != current authority",
            "search-only != zero",
            "docket != complaint",
            "application != violation",
            "insurance requirement != current proof",
            "NO TRUST SCORE",
            "NO COLUMBUS CLEVELAND CINCINNATI TOLEDO DAYTON AKRON INTEL ROUTES",
        ],
        "fingerprint": "",
    }
    snap["fingerprint"] = sha_body(snap)
    return snap


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    snap = build()
    if args.check:
        existing = json.loads(OUT.read_text(encoding="utf-8"))
        if sha_body(existing) != existing["fingerprint"]:
            raise SystemExit("stored fingerprint drifted from body")
        if sha_body(snap) != existing["fingerprint"]:
            raise SystemExit(f"rebuild {sha_body(snap)} != stored {existing['fingerprint']}")
        print("check PASS", existing["fingerprint"])
        return
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(snap, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print("wrote", OUT, snap["fingerprint"])


if __name__ == "__main__":
    main()
