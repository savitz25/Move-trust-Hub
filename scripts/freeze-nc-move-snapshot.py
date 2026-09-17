#!/usr/bin/env python3
"""Freeze move-nc-state-intel-v1 from the parsed NCUC extract."""
from __future__ import annotations

import hashlib
import json
from pathlib import Path

ROOT = Path("lib/north-carolina-intelligence")
EXTRACT = Path("data/nc-move-001/extract")


def semantic_fingerprint(payload: dict) -> str:
    clone = json.loads(json.dumps(payload))
    clone.pop("generated_at", None)
    clocks = clone.get("clocks") or {}
    clocks.pop("generatedAt", None)
    clone["clocks"] = clocks
    clone.pop("fingerprint", None)
    canonical = json.dumps(clone, sort_keys=True, separators=(",", ":"), ensure_ascii=True)
    return hashlib.sha256(canonical.encode("utf-8")).hexdigest()


def main() -> None:
    summary = json.loads((EXTRACT / "summary.json").read_text(encoding="utf-8"))
    rows = json.loads((EXTRACT / "carrier-rows.json").read_text(encoding="utf-8"))
    cl = summary["carrier_list"]
    roster_rows = [
        {
            "cNumber": r["c_number"],
            "tNumber": r["t_number"],
            "name": r["source_name"],
            "status": r["status_normalized"],
            "statusRaw": r["status_raw"],
        }
        for r in rows
    ]
    ROOT.mkdir(parents=True, exist_ok=True)
    (ROOT / "accepted-roster.json").write_text(
        json.dumps({"version": "move-nc-state-intel-v1", "rows": roster_rows}, indent=2) + "\n",
        encoding="utf-8",
    )

    retrieved = summary["retrievedAt"]
    snap = {
        "version": "move-nc-state-intel-v1",
        "ticket": "NC-MOVE-001",
        "as_of": None,
        "generated_at": retrieved,
        "snapshotAsOf": "2026-09-17",
        "retrievedAt": retrieved,
        "retrievedAtPrecision": "datetime",
        "no_trust_score": True,
        "no_paid_ranking": True,
        "no_north_carolina_local_routes": True,
        "no_charlotte_page": True,
        "no_raleigh_page": True,
        "publication": {
            "canonical": "https://www.movetrusthub.com/north-carolina",
            "indexable": True,
            "robots": "index,follow",
            "route": "/north-carolina",
            "rankings": False,
            "trustScore": False,
            "h1": "North Carolina Moving & Household Goods Intelligence",
        },
        "regulator": {
            "agency": "North Carolina Utilities Commission",
            "short": "NCUC",
            "credential_term": "Certificate of Exemption (C-number)",
            "company_docket_term": "T-number / Docket Number",
            "list_url": "https://www.ncuc.gov/industries/documents/carriers.pdf",
            "transcar_url": "https://www.ncuc.gov/Industries/transcar.aspx",
            "transportation_url": "https://www.ncuc.gov/Industries/transportation/transportation.html",
            "moving_guide_url": "https://www.ncuc.gov/industries/transportation/movingguide.html",
            "mrt_url": "https://www.ncuc.gov/industries/documents/maxrate.pdf",
            "annual_report_url": "https://www.ncuc.gov/appforms/trans/HHGannual.pdf",
            "docket_portal_url": "https://starw1.ncuc.gov/NCUC/",
            "status_verify_phone": "919-733-7766",
            "intrastate_only": True,
        },
        "clocks": {
            "generatedAt": retrieved,
            "snapshotAsOf": "2026-09-17",
            "sourceAsOf": "2026-09-08",
            "retrievedAt": retrieved,
            "do_not_use_retrieval_as_authority_effective_date": True,
            "hhg_roster": {
                "sourceAsOf": "2026-09-08",
                "revision_date_text": "September 8, 2026",
                "retrievedAt": retrieved,
                "note": "Monthly carrier-list publication date is not real-time authority status. Later cancellations, suspensions, and newly issued certificates may not appear until the next update.",
            },
            "transcar": {
                "retrievedAt": retrieved,
                "sourceAsOf": None,
            },
            "tariff": {
                "issued": "2025-12-30",
                "effective": "2026-01-01",
            },
            "annual_report_form": {
                "form": "NCUC FORM HHG-1",
                "revised": "January 2026",
                "reporting_year": "2025",
                "docket": "M-2 SUB 2026T",
            },
        },
        "current_hhg_roster": {
            "coverage": "ACQUIRED_MONTHLY_LIST_SNAPSHOT",
            "NC_NCUC_HHG_ROSTER_STATUS": "MONTHLY_LIST_SNAPSHOT",
            "NC_NCUC_HHG_SOURCE_REVISION_DATE": "2026-09-08",
            "NC_NCUC_HHG_SOURCE_ANNOUNCED_TOTAL": cl["announced_total"],
            "NC_NCUC_HHG_LIST_ROWS": cl["list_rows"],
            "NC_NCUC_DISTINCT_C_NUMBERS": cl["distinct_c"],
            "NC_NCUC_DISTINCT_T_NUMBERS": cl["distinct_t"],
            "NC_NCUC_DISTINCT_SOURCE_NAMES": cl["distinct_source_names"],
            "NC_NCUC_ROWS_MISSING_C": cl["rows_missing_c"],
            "NC_NCUC_ROWS_MISSING_T": cl["rows_missing_t"],
            "NC_NCUC_EXACT_C_TO_T_CROSSWALKS": cl["exact_c_to_t"],
            "NC_NCUC_C_NUMBERS_WITH_T_NUMBER": cl["c_with_t"],
            "NC_NCUC_T_NUMBERS_WITH_C_NUMBER": cl["t_with_c"],
            "NC_NCUC_AUTHORIZED_OBSERVATIONS": cl["status_counts"].get("AUTHORIZED_AS_LISTED", 0),
            "NC_NCUC_TEMP_SUSPENDED_OBSERVATIONS": cl["status_counts"].get("TEMPORARILY_SUSPENDED", 0),
            "NC_NCUC_NOT_AUTHORIZED_OBSERVATIONS": 0,
            "NC_NCUC_STATUS_UNKNOWN_OBSERVATIONS": 0,
            "grain": "Official NCUC Certificate of Exemption carrier-list row (C-number)",
            "realtime_census": False,
            "listed_ne_authorized_today": True,
            "missing_from_pdf_ne_proof_of_no_authority": True,
            "announced_total_ne_parsed_identities": True,
            "announced_vs_parsed_note": "Header announces 361 certified carriers. Parser observed 362 distinct C-numbers on the same PDF (357 AUTHORIZED_AS_LISTED + 5 TEMPORARILY_SUSPENDED). Do not average or replace the announced total. Hero metric is distinct C-number identities on this snapshot, not active movers.",
            "sha256": summary["files"]["carriers.pdf"]["sha256"],
        },
        "identity": {
            "c_namespace": "NC-NCUC-C:{certificateNumber}",
            "t_namespace": "NC-NCUC-T:{tNumber}",
            "c_number_is_certificate_of_exemption": True,
            "t_number_is_company_docket": True,
            "c_ne_t": True,
            "c_ne_usdot": True,
            "c_ne_mc": True,
            "t_ne_usdot": True,
            "t_ne_mc": True,
            "do_not_rename_as_license_number": True,
            "legal_entity_ne_dba": True,
            "source_row_ne_unique_organization": True,
        },
        "status": {
            "capability": "MONTHLY_LIST_SNAPSHOT",
            "not": "REALTIME_AUTHORITY_CENSUS",
            "verify_current_status": "Call NCUC/Public Staff at 919-733-7766. Monthly list can lag.",
            "source_native_suspended_still_listed": True,
        },
        "count_reconciliation": {
            "carrier_list_announced": 361,
            "carrier_list_distinct_c": 362,
            "authorized_as_listed": 357,
            "temporarily_suspended_on_list": 5,
            "industries_page_362": "NOT_ACQUIRED_LIVE",
            "coordinator_february_340": "SUPERSEDED_BY_SEPTEMBER_8_2026_LIST",
            "do_not_merge_or_average": True,
            "note": "Use the September 8, 2026 carrier-list snapshot. A separate NCUC Industries summary of ~362 was not independently live-acquired (directory listing 403). Historic 2022 Statistical Report 351 certificated carriers is a different year/grain.",
        },
        "transcar": {
            "coverage": "ACQUIRED_CURRENT_HTML_SNAPSHOT",
            "SOURCE_ROWS": 371,
            "DISTINCT_T_NUMBERS": 368,
            "duplicate_t_observation_rows": 3,
            "html_rows_ne_unique_hhg_companies": True,
            "includes_non_hhg_transportation_companies": True,
            "address_caveat": "Listed addresses may not be up to date, but represent the official address currently on file with the Commission.",
            "recorded_address_ne_operating_address": True,
            "recorded_address_ne_service_territory": True,
            "recorded_address_ne_headquarters": True,
            "hhg_t_also_on_transcar": summary["hhg_t_in_transcar"],
            "hhg_t_not_on_transcar": summary["hhg_t_not_in_transcar"],
        },
        "brokers": {
            "coverage": "NOT_APPLICABLE_HHG",
            "NC_HHG_BROKER_ROWS": None,
            "reason": "NCUC passenger-broker certificates (B-#) are not a household-goods broker roster. No HHG broker universe was manufactured for symmetry with Pennsylvania.",
            "passenger_broker_ne_hhg_broker": True,
        },
        "territory": {
            "coverage": "OPEN_SEARCH_ONLY",
            "NC_NCUC_SERVICE_TERRITORY_ROWS": None,
            "reason": "The carrier list authorizes household-goods transportation within North Carolina. Individual certificate territory restrictions were not published as a structured table. Certificate is not guaranteed statewide availability. Recorded office is not service area.",
            "office_address_ne_territory": True,
            "charlotte_address_ne_charlotte_only": True,
        },
        "tariff": {
            "coverage": "ACQUIRED_CURRENT_TARIFF",
            "NC_NCUC_MRT_STATUS": "ACQUIRED_CURRENT_TARIFF",
            "NC_NCUC_MRT_VERSION": "NCUC HHG NO. 2",
            "NC_NCUC_MRT_ISSUED_DATE": "2025-12-30",
            "NC_NCUC_MRT_EFFECTIVE_DATE": "2026-01-01",
            "sha256": summary["files"]["maxrate.pdf"]["sha256"],
            "tariff_ne_quote": True,
            "maximum_ne_price_charged": True,
            "discount_ne_special_status": True,
            "consumer_rule_categories": [
                "maximum rates and charges",
                "binding guaranteed estimates",
                "binding not-to-exceed estimates",
                "nonbinding estimates subject to 120% rule",
                "bill of lading",
                "valuation / Full Value Protection",
                "required moving forms",
                "Moving in North Carolina consumer booklet",
            ],
        },
        "insurance": {
            "coverage": "REQUIREMENT_KNOWN / CURRENT_BULK_NOT_ACQUIRED",
            "NC_NCUC_GENERAL_LIABILITY_REQUIREMENT": "$50,000",
            "NC_NCUC_CARGO_INSURANCE_REQUIREMENT": "$35,000/$50,000",
            "NC_NCUC_VEHICLE_LIABILITY_REQUIREMENT": "$100,000/$300,000/$50,000 for GVW less than 26,000 lbs; $750,000 for GVW of 26,001 lbs or over",
            "NC_NCUC_WAREHOUSE_INSURANCE_RULE": "COI must also note proof of warehouse insurance for carriers providing storage. Annual report asks whether the carrier owns a warehouse or has a long-term lease and, if yes, to attach proof of warehouse insurance coverage.",
            "NC_NCUC_CURRENT_INSURANCE_ROWS": None,
            "NC_NCUC_CURRENT_INSURANCE_DISTINCT_C_NUMBERS": None,
            "requirement_ne_current_coverage": True,
            "annual_report_requirement_ne_certificate_of_coverage": True,
        },
        "annual_reports": {
            "coverage": "FORM_ACQUIRED / FILINGS_OPEN_SEARCH_ONLY",
            "NC_NCUC_ANNUAL_REPORT_FILING_ROWS": None,
            "form": "NCUC FORM HHG-1 Common Carriers of Household Goods Revised Jan 2026 — 2025 ANNUAL REPORT",
            "c_and_t_on_form": True,
            "filed_ne_currently_active": True,
            "revenue_ne_quality": True,
            "missing_acquisition_ne_noncompliance": True,
        },
        "dockets": {
            "coverage": "OPEN_SEARCH_ONLY",
            "NC_NCUC_DOCKET_COVERAGE": "OPEN_SEARCH_ONLY",
            "NC_NCUC_DOCKET_ROWS": None,
            "NC_NCUC_DISTINCT_DOCKET_NUMBERS": None,
            "NC_NCUC_ORDER_ROWS": None,
            "NC_NCUC_DISTINCT_ORDER_IDS": None,
            "reason": "NCUC Docket Portal (starw1.ncuc.gov) presented a Cloudflare challenge to unattended acquisition. No bounded T-number metadata harvest was performed. T-number remains the company/docket identity on the carrier list.",
            "docket_ne_complaint": True,
            "docket_ne_adverse": True,
            "annual_report_ne_enforcement": True,
            "application_ne_violation": True,
            "order_ne_automatically_adverse": True,
            "consumer_statement_ne_complaint": True,
        },
        "complaints": {
            "coverage": "INTAKE_AVAILABLE / BULK_NOT_PUBLIC",
            "NC_NCUC_HHG_COMPLAINT_ROWS": None,
            "NC_NCUC_HHG_COMPLAINT_COVERAGE": "INTAKE_AVAILABLE / BULK_NOT_PUBLIC",
            "intake": "NCUC/Public Staff 919-733-7766; Moving 101 directs consumers to report uncertificated movers and to confirm current status.",
            "complaint_intake_ne_census": True,
            "complaint_ne_violation": True,
        },
        "enforcement": {
            "coverage": "OPEN_SEARCH_ONLY",
            "NC_NCUC_HHG_ENFORCEMENT_ROWS": None,
            "NC_NCUC_HHG_ENFORCEMENT_COVERAGE": "OPEN_SEARCH_ONLY",
            "NC_NCUC_SUSPENSION_EVENT_ROWS": None,
            "NC_NCUC_CANCELLATION_EVENT_ROWS": None,
            "NC_NCUC_REINSTATEMENT_EVENT_ROWS": None,
            "list_annotations_ne_enforcement_census": True,
            "historical_suspension_ne_current_status": True,
        },
        "uncertificated": {
            "NC_UNCERTIFICATED_MOVER_ROWS": None,
            "reason": "Consumer reporting of uncertificated movers is an intake path, not a public statewide roster. No blacklist from search results or news.",
        },
        "federal": {
            "name_only": "UNSAFE",
            "EXACT_NC_NCUC_TO_USDOT_CROSSWALKS": 0,
            "EXACT_NC_NCUC_TO_MC_CROSSWALKS": 0,
            "review_required_crosswalks": 0,
            "ncuc_c_ne_usdot": True,
            "ncuc_t_ne_usdot": True,
            "ncuc_c_ne_mc": True,
            "ncuc_t_ne_mc": True,
            "ncuc_certificate_ne_fmcsa": True,
            "nc_address_ne_federal_headquarters": True,
            "fmcsa_nc_hq_ne_ncuc_certificate": True,
            "overlay_note": "Existing MoveTrustHub FMCSA spine is supporting context. No USDOT/MC published on the NCUC carrier list. No name-only bridges.",
        },
        "identity_ledger": {
            "EXACT_NCUC_C_IDENTITIES": cl["distinct_c"],
            "EXACT_NCUC_T_IDENTITIES": cl["distinct_t"],
            "EXACT_NCUC_C_TO_T_CROSSWALKS": cl["exact_c_to_t"],
            "EXACT_NC_NCUC_TO_USDOT_CROSSWALKS": 0,
            "EXACT_NC_NCUC_TO_MC_CROSSWALKS": 0,
            "EXACT_PROFILE_ATTACHMENTS": 0,
            "REVIEW_REQUIRED": 0,
        },
        "expansion_ledger": {
            "NET_NEW_STATE_RESEARCH_IDENTITIES": cl["distinct_c"],
            "NET_NEW_CANONICAL_ORGANIZATIONS": 0,
            "NET_NEW_PUBLIC_MOVE_PROFILES": 0,
            "EXISTING_ORGANIZATIONS_ENRICHED": 0,
            "GRAPH_WRITES": 0,
            "EXACT_PROFILE_ATTACHMENTS": 0,
            "CLAIM_ELIGIBILITY_BROADENED": False,
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
                "Docket Portal metadata not acquired (Cloudflare challenge)",
                "Carrier-specific current insurance bulk not acquired",
            ],
            "list_status_annotations_ne_adverse_census": True,
        },
        "withheld_reason_counts": {
            "PUBLICATION_ADAPTER_NOT_READY": True,
            "SOURCE_RESTRICTION": 3,
            "MISSING_IDENTIFIER": 5,
            "UNSAFE_NAME_MATCH": 0,
        },
        "claimEligibilityBroadened": False,
        "local_work_needed_now": "NO",
        "fingerprint": "",
    }
    snap["fingerprint"] = semantic_fingerprint(snap)
    (ROOT / "accepted-snapshot.json").write_text(json.dumps(snap, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"fingerprint": snap["fingerprint"], "c": cl["distinct_c"], "t": cl["distinct_t"], "announced": cl["announced_total"]}, indent=2))


if __name__ == "__main__":
    main()
