#!/usr/bin/env python3
"""Freeze move-co-state-intel-v1 from the official PUC OPR acquire report."""
from __future__ import annotations

import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
ACQ = json.loads((ROOT / "data/colorado/co-move-001/acquire-report.json").read_text(encoding="utf-8"))
RECS = json.loads((ROOT / "data/colorado/co-move-001/permit-records.json").read_text(encoding="utf-8"))
LIB = ROOT / "lib" / "colorado-intelligence"
ART = ROOT / "data" / "reports"
VERSION = "move-co-state-intel-v1"


def dump(obj: object) -> str:
    return json.dumps(obj, sort_keys=True, separators=(",", ":"), ensure_ascii=True)


def fingerprint(body: dict) -> str:
    return hashlib.sha256(dump({k: v for k, v in body.items() if k != "fingerprint"}).encode("utf-8")).hexdigest()


def main() -> None:
    totals = ACQ["official_totals"]
    distinct = ACQ["extracted_distinct_by_status"]
    rows = ACQ["extracted_row_counts"]
    active = totals["ACTIVE"]
    body = {
        "version": VERSION,
        "ticket": "CO-MOVE-001",
        "as_of": "2026-09-09",
        "generated_at": ACQ["retrieved_at"],
        "no_trust_score": True,
        "no_paid_ranking": True,
        "no_colorado_counties": True,
        "no_denver_work": True,
        "publication": {
            "canonical": "https://www.movetrusthub.com/colorado",
            "indexable": True,
            "no_colorado_counties": True,
            "rankings": False,
            "robots": "index,follow",
            "route": "/colorado",
            "trustScore": False,
            "h1": "Colorado Moving & Household-Goods Intelligence",
        },
        "regulator": {
            "agency": "Colorado Public Utilities Commission",
            "short": "PUC",
            "program": "Household-goods movers — intrastate transportation under title 40, article 10.1, C.R.S.",
            "credential_term": "permit",
            "permit_prefix": "HHG",
            "statute_rules": "C.R.S. title 40, article 10.1, part 5; 4 CCR 723-6 mover rules",
            "home_url": "https://puc.colorado.gov/movers",
            "consumer_url": "https://puc.colorado.gov/household-goods-movers-consumer-info",
            "permit_search": "https://www.dora.state.co.us/pls/real/PUC_Permit.Search_Form",
            "complaint_url": "http://www.dora.state.co.us/pls/real/CCTS_oWEB.trans_complaint_form",
            "apply_url": "https://doraapps.state.co.us/puc/TransportationApplications/",
            "insurance_filing": "http://www.dora.state.co.us/pls/real/puc_ins_web.logon",
            "rules_url": "https://puc.colorado.gov/pucrules",
            "helpline": "303-894-2070",
        },
        "source": {
            "index_url": ACQ["index_url"],
            "pdf_url": ACQ["source_url"],
            "document_title": ACQ["document_title"],
            "access": "OFFICIAL_PDF",
            "retrieved_at": ACQ["retrieved_at"],
            "source_publication_date": ACQ["source_publication_date"],
            "source_clocks": ACQ["source_clocks"],
            "raw_sha256": ACQ["raw_sha256"],
            "raw_bytes": ACQ["raw_bytes"],
            "no_search_form_scrape": True,
            "no_id_bruteforce": True,
            "grain": "Colorado PUC household-goods carrier permit listing",
        },
        "authority": {
            "colorado_state_authority_is_not_fmcsa": True,
            "usdot_is_not_interstate_operating_authority_by_itself": True,
            "colorado_active_is_not_fmcsa_active": True,
            "hhg_permit_is_not_usdot": True,
            "hhg_permit_is_not_mc": True,
            "usdot_is_not_colorado_hhg_permit": True,
            "mc_is_not_colorado_hhg_permit": True,
            "state_permit_status_is_not_fmcsa_authority_status": True,
            "mc_presence_is_not_active_authority": True,
            "colorado_permit_is_not_fmcsa_endorsement": True,
            "classes": {
                "COLORADO_INTRASTATE_HHG": {
                    "label": "Colorado PUC household-goods permit (intrastate)",
                    "covers": "A person shall not operate or offer to operate as a mover in intrastate commerce, or advertise services as a mover, without first having obtained a PUC permit (C.R.S. 40-10.1-502).",
                    "consumer_intrastate": True,
                    "not_a_substitute_for_fmcsa": True,
                },
                "FMCSA_INTERSTATE": {
                    "label": "FMCSA interstate operating authority",
                    "covers": "Moves that cross a state line. Official PUC consumer page: if you are out of state, check with the U.S. Department of Transportation.",
                    "consumer_intrastate": False,
                    "not_a_substitute_for_puc": True,
                },
            },
            "matrix": {
                "colorado_intrastate_move": {
                    "regulator": "Colorado PUC",
                    "required_authority": "Colorado PUC household-goods permit",
                    "identity": "CO-PUC-HHG:{HHG-#####}",
                    "verification": "https://www.dora.state.co.us/pls/real/PUC_Permit.Search_Form",
                },
                "colorado_to_another_state": {
                    "regulator": "FMCSA",
                    "required_authority": "FMCSA interstate operating authority",
                    "identity": "USDOT plus operating authority (MC) — USDOT alone is not enough",
                    "verification": "https://www.protectyourmove.gov/ and /verify-dot",
                },
                "another_state_to_colorado": {
                    "regulator": "FMCSA",
                    "required_authority": "FMCSA interstate operating authority",
                    "identity": "USDOT plus operating authority",
                    "verification": "https://www.protectyourmove.gov/ and /verify-dot",
                },
                "carrier_performing_both": {
                    "regulator": "Colorado PUC and FMCSA",
                    "required_authority": "Both systems. Having one does not authorize the other.",
                    "identity": "CO-PUC-HHG and USDOT kept separate",
                    "verification": "PUC permit search and FMCSA / Verify DOT",
                },
            },
        },
        "active_universe": {
            "label": "Active Colorado PUC household-goods permit listings",
            "official_total_permits": active,
            "extracted_distinct_permit_numbers": distinct["ACTIVE"],
            "extracted_rows": rows["ACTIVE"],
            "grain": "source-native ACTIVE OPR listing rows / Total Permits line",
            "not": [
                "all moving companies in Colorado",
                "all Colorado movers",
                "all businesses offering moving services",
                "federal directory profiles",
                "FMCSA-authorized interstate movers",
            ],
            "do_not_sum_historical_statuses": True,
            "source_publication_date": "2025-06-27",
            "source_clock": ACQ["source_clocks"]["ACTIVE"],
            "publication": "PUBLIC",
        },
        "status_classes": {
            "do_not_flatten": True,
            "inactive_ne_revoked": True,
            "revoked_ne_criminal_conviction": True,
            "suspended_ne_permanently_revoked": True,
            "cancelled_ne_revoked": True,
            "status_row_ne_unique_company": True,
            "classes": {
                "ACTIVE": {
                    "official_total": totals["ACTIVE"],
                    "extracted_rows": rows["ACTIVE"],
                    "extracted_distinct": distinct["ACTIVE"],
                    "publication": "PUBLIC",
                    "current_universe": True,
                    "source_clock": ACQ["source_clocks"]["ACTIVE"],
                },
                "CANCELLED": {
                    "official_total": totals["CANCELLED"],
                    "extracted_rows": rows["CANCELLED"],
                    "extracted_distinct": distinct["CANCELLED"],
                    "publication": "PUBLIC_RESEARCH_GRAPH",
                    "current_universe": False,
                    "source_clock": ACQ["source_clocks"]["CANCELLED"],
                },
                "INACTIVE": {
                    "official_total": totals["INACTIVE"],
                    "extracted_rows": rows["INACTIVE"],
                    "extracted_distinct": distinct["INACTIVE"],
                    "publication": "PUBLIC_RESEARCH_GRAPH",
                    "current_universe": False,
                    "source_clock": ACQ["source_clocks"]["INACTIVE"],
                },
                "INACTIVE-TRANSFERRED": {
                    "official_total": totals["INACTIVE-TRANSFERRED"],
                    "extracted_rows": rows["INACTIVE-TRANSFERRED"],
                    "extracted_distinct": distinct["INACTIVE-TRANSFERRED"],
                    "publication": "PUBLIC_RESEARCH_GRAPH",
                    "current_universe": False,
                    "source_clock": ACQ["source_clocks"]["INACTIVE-TRANSFERRED"],
                },
                "REVOKED": {
                    "official_total": totals["REVOKED"],
                    "extracted_rows": rows["REVOKED"],
                    "extracted_distinct": distinct["REVOKED"],
                    "publication": "PUBLIC",
                    "current_universe": False,
                    "source_clock": ACQ["source_clocks"]["REVOKED"],
                    "not_criminal_enforcement": True,
                    "not_consumer_fraud_findings": True,
                    "not_bad_movers": True,
                    "attach": "EXACT_OFFICIAL_ID",
                    "name_only": "UNSAFE",
                },
                "SUSPENDED": {
                    "official_total": totals["SUSPENDED"],
                    "extracted_rows": rows["SUSPENDED"],
                    "extracted_distinct": distinct["SUSPENDED"],
                    "publication": "PUBLIC",
                    "current_universe": False,
                    "source_clock": ACQ["source_clocks"]["SUSPENDED"],
                    "not_permanently_revoked": True,
                    "attach": "EXACT_OFFICIAL_ID",
                    "name_only": "UNSAFE",
                },
            },
        },
        "identity": {
            "namespace": "CO-PUC-HHG:{permitNumber}",
            "permit_example": "HHG-00513",
            "hhg_permit_ne_usdot": True,
            "hhg_permit_ne_mc": True,
            "usdot_ne_colorado_hhg_permit": True,
            "mc_ne_colorado_hhg_permit": True,
            "license_number_alone_note": "The official permit number begins with HHG.",
        },
        "duplicates": {
            "active_rows": rows["ACTIVE"],
            "active_distinct_permits": distinct["ACTIVE"],
            "inactive_rows": rows["INACTIVE"],
            "inactive_distinct_permits": distinct["INACTIVE"],
            "revoked_rows": rows["REVOKED"],
            "revoked_distinct_permits": distinct["REVOKED"],
            "status_row_ne_unique_company": True,
            "normalized_name_dedupe_published_as_identity": False,
            "note": "OPR Total Permits is the official listing-row count. Distinct permit numbers can be lower when a permit appears more than once on a status list. A row is not a unique company unless identity confirms it. Normalized-name overlap is not published as exact identity.",
        },
        "crosswalk": {
            "coverage": "REVIEW",
            "exact_when": "only when an official source explicitly contains both the HHG permit and USDOT",
            "name_only": "UNSAFE",
            "usdot_printed_on_opr_list": False,
            "mc_printed_on_opr_list": False,
            "no_auto_attach_fmcsa_adverse_by_name": True,
            "note": "ATH-CO-000: applications may collect USDOT, but the public OPR permit list does not print USDOT. Default Colorado HHG ↔ USDOT crosswalk is REVIEW.",
        },
        "federal": {
            "coverage": "LIVE_DIRECTORY_WHEN_AVAILABLE",
            "directory_href": "/companies?state=CO",
            "label": "FMCSA interstate records with a Colorado business/HQ location",
            "not_colorado_puc_permits": True,
            "grain": "MoveTrustHub publishable company profiles with Colorado headquarters (FMCSA-keyed), not PUC HHG permits",
            "hq_count_committed": None,
            "hq_ne_service_territory": True,
            "federal_profile_ne_state_permit": True,
            "state_permit_ne_federal_profile": True,
            "verify_href": "/verify-dot",
            "fmcsa_safer": "https://safer.fmcsa.dot.gov/",
            "protect_your_move": "https://www.protectyourmove.gov/",
            "disclaimer": "Federal interstate authority and Colorado PUC household-goods authority are separate. Colorado ACTIVE is not FMCSA ACTIVE. A USDOT number is not interstate operating authority by itself. An FMCSA Colorado HQ record is not a PUC HHG permit.",
        },
        "consumer_rules": {
            "as_of": "2026-09-09",
            "source_clock": "Official PUC Household Goods Movers and Consumer Info pages retrieved 2026-09-09",
            "not_evidence_of_individual_compliance": True,
            "tariff_is_not_invoice": True,
            "tariff_is_not_quality": True,
            "rules": [
                "Colorado law requires a PUC permit to operate or advertise as a household-goods mover in intrastate commerce (C.R.S. 40-10.1-502).",
                "Official consumer page: ensure that your selected in-state moving company is permitted by the PUC.",
                "Get a written estimate and sign a contract — both required by all permitted household goods movers in Colorado.",
                "Request an in-person inspection of your household goods to ensure the accuracy of your estimate.",
                "Each mover must have a Colorado Public Utilities Commission permit number that has the letters HHG.",
                "Per statute, refunds for household goods movers must go through binding arbitration 40-10.1-507, C.R.S.",
                "Official student-move guidance: no moving company can withhold any of your property to force payment.",
                "If you are out of state, official PUC consumer page: check with the U.S. Department of Transportation.",
            ],
            "sources": [
                "https://puc.colorado.gov/movers",
                "https://puc.colorado.gov/household-goods-movers-consumer-info",
                "https://puc.colorado.gov/press-release/puc-alerts-students-to-avoid-fraud-and-hire-permitted-moving-companies",
            ],
        },
        "complaints": {
            "process": "PUBLIC_RESEARCH_PATH",
            "bulk_observation_universe": "NOT_ACQUIRED / UNKNOWN",
            "path": "http://www.dora.state.co.us/pls/real/CCTS_oWEB.trans_complaint_form",
            "helpline": "303-894-2070",
            "complaint_is_not_violation": True,
            "no_complaint_is_not_clean": True,
            "missing_ne_zero": True,
            "do_not_invent_zero_complaints": True,
            "note": "Colorado provides a complaint filing process. No public bulk complaint observation dataset was identified.",
        },
        "insurance": {
            "coverage": "NOT_ACQUIRED / VERIFY_PATH",
            "missing_ne_zero": True,
            "washington_style_bulk_not_supported": True,
            "verify_path": "http://www.dora.state.co.us/pls/real/puc_ins_web.logon",
            "note": "PUC transportation pages describe insurance and advisement requirements. The public OPR HHG list does not expose a bulk insurance-verification file. Official insurance filing is a login path, not a bulk public roster.",
        },
        "tariff": {
            "coverage": "PUBLIC_RULES",
            "name": "4 CCR 723-6 household-goods mover rules",
            "tariff_is_not_invoice": True,
            "tariff_is_not_actual_charged_price": True,
            "tariff_is_not_consumer_premium": True,
            "tariff_is_not_quality": True,
            "note": "Commission rules and written-estimate requirements are consumer/state market rules. They are not a mover's invoice, a quality score, or a consumer premium.",
            "source": "https://puc.colorado.gov/pucrules",
        },
        "enforcement": {
            "revoked_suspended_are_permit_status_evidence": True,
            "not_criminal_enforcement": True,
            "not_consumer_fraud_findings": True,
            "not_bad_movers": True,
            "attach": "EXACT_OFFICIAL_ID",
            "name_only": "UNSAFE",
        },
        "claim": {
            "colorado_hhg_permit_automatically_claimable": False,
            "existing_claim_requires_usdot_directory_profile": True,
            "claimed_ne_verified": True,
        },
        "search": {
            "channels": [
                "/colorado",
                "https://www.dora.state.co.us/pls/real/PUC_Permit.Search_Form",
                "/verify-dot",
            ],
            "exact_permit_search": True,
            "no_rank_by_discipline": True,
        },
        "verify": {
            "puc_permit_search": "https://www.dora.state.co.us/pls/real/PUC_Permit.Search_Form",
            "movetrusthub_verify_dot": "/verify-dot",
            "protect_your_move": "https://www.protectyourmove.gov/",
        },
        "findings": [
            {
                "id": "real-state-universe",
                "text": "Colorado has a real statewide household-goods mover permit universe. The official OPR Active listing dated 2025-06-27 reports Total Permits: 203. That is Active Colorado PUC household-goods permit listings, not all moving companies in Colorado and not a federal directory count.",
            },
            {
                "id": "status-classes-separate",
                "text": "The same official PDF publishes separate status classes: ACTIVE 203, CANCELLED 82, INACTIVE 295, INACTIVE-TRANSFERRED 17, REVOKED 207, SUSPENDED 5. These are not summed into the current active universe. Inactive is not revoked. Revoked is not a criminal conviction. Suspended is not permanently revoked.",
            },
            {
                "id": "state-vs-federal",
                "text": "Intrastate Colorado household-goods moves are a PUC HHG permit. Interstate household-goods moves are FMCSA operating authority. Colorado ACTIVE is not FMCSA ACTIVE. An HHG permit is not a USDOT or MC number. A USDOT number is not interstate operating authority by itself.",
            },
            {
                "id": "no-name-crosswalk",
                "text": "The public OPR list does not print USDOT. Default Colorado HHG ↔ USDOT crosswalk is REVIEW. Name-only joins are unsafe. FMCSA safety/adverse evidence is not auto-attached to a Colorado permit by name.",
            },
            {
                "id": "complaint-process-not-dataset",
                "text": "Colorado provides a public complaint filing process. No bulk complaint observation universe was acquired. Missing is not zero. A complaint is not a violation. No complaint found is not a clean history.",
            },
        ],
        "coverage_gaps": [
            {"id": "usdot-on-opr-list", "label": "USDOT printed on the public OPR HHG list", "state": "NOT_PRINTED / REVIEW"},
            {"id": "complaint-bulk", "label": "Household-goods complaint bulk", "state": "NOT_ACQUIRED / UNKNOWN"},
            {"id": "insurance-bulk", "label": "Bulk insurance/financial-responsibility verification file", "state": "NOT_ACQUIRED / VERIFY_PATH"},
            {"id": "denver-county", "label": "Denver or county intelligence pages", "state": "OUT_OF_SCOPE_THIS_TICKET"},
        ],
        "gate": {
            "passed": True,
            "blocker": None,
            "required": [
                "official OPR PDF acquired",
                "active universe from source Total Permits",
                "status classes unflattened",
                "HHG permit identity",
                "FMCSA kept separate",
                "no Denver/county routes",
            ],
        },
    }
    fp = fingerprint(body)
    body["fingerprint"] = fp
    LIB.mkdir(parents=True, exist_ok=True)
    ART.mkdir(parents=True, exist_ok=True)
    (LIB / "accepted-snapshot.json").write_text(json.dumps(body, indent=2) + "\n", encoding="utf-8")
    (ART / "co-move-001-public-snapshot.json").write_text(
        json.dumps(
            {
                "version": VERSION,
                "fingerprint": fp,
                "active_official_total": active,
                "route": "/colorado",
            },
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )
    print("fingerprint", fp)
    print("active", active)


if __name__ == "__main__":
    main()
