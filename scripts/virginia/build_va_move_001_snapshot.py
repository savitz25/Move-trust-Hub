"""Freeze move-va-state-intel-v1 from acquired DMV listings."""
from __future__ import annotations

import hashlib
import json
import shutil
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
STAGE = ROOT / "data" / "virginia" / "va-move-001"
LIB = ROOT / "lib" / "virginia-intelligence"
ART = ROOT / "data" / "reports"
VERSION = "move-va-state-intel-v1"
sys.path.insert(0, str(ROOT / "scripts" / "virginia"))
from acquire_va_move_001 import authority_id_stats  # noqa: E402

HHG_PAGE = "https://www.dmv.virginia.gov/businesses/motor-carriers/intrastate/house-goods"
PROP_PAGE = "https://www.dmv.virginia.gov/businesses/motor-carriers/intrastate"
AUTH = "https://www.dmv.virginia.gov/businesses/motor-carriers/auth-mc/authorized-motor-carriers"
APPLICANTS = "https://www.dmv.virginia.gov/businesses/motor-carriers/auth-mc"
FAQ = "https://www.dmv.virginia.gov/businesses/motor-carriers/faqs/intra"
DENIAL = "https://www.dmv.virginia.gov/businesses/motor-carriers/intrastate/denial-suspend"
BOND = "https://www.dmv.virginia.gov/businesses/motor-carriers/intrastate/bond-require"
COMPLAINT = "https://www.dmv.virginia.gov/businesses/motor-carriers/forms"
OA460 = "https://www.dmv.virginia.gov/sites/default/files/documents/oa460.pdf"


def dump(obj: object) -> str:
    return json.dumps(obj, sort_keys=True, separators=(",", ":"), ensure_ascii=True)


def fingerprint(body: dict) -> str:
    skip = {"fingerprint", "generated_at"}
    return hashlib.sha256(dump({k: v for k, v in body.items() if k not in skip}).encode("utf-8")).hexdigest()


def main() -> None:
    acq = json.loads((STAGE / "acquire-report.json").read_text(encoding="utf-8"))
    hhg = acq["household_goods_carrier"]
    prop = acq["property_carrier"]
    hhg_records = json.loads((STAGE / "hhg-records.json").read_text(encoding="utf-8"))
    prop_records = json.loads((STAGE / "property-records.json").read_text(encoding="utf-8"))
    if hhg["rows"] != len(hhg_records) or prop["rows"] != len(prop_records):
        raise SystemExit("Acquire-report row counts must match accepted listing records")
    hhg_stats = authority_id_stats(hhg_records)
    prop_stats = authority_id_stats(prop_records)
    hhg_labels = len({(r.get("name") or "").strip() for r in hhg_records if (r.get("name") or "").strip()})
    retrieved = acq["retrieved_at"]
    body = {
        "version": VERSION,
        "ticket": "VA-MOVE-001A",
        "as_of": None,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "no_trust_score": True,
        "no_paid_ranking": True,
        "no_virginia_local_routes": True,
        "publication": {
            "canonical": "https://www.movetrusthub.com/virginia",
            "indexable": True,
            "robots": "index,follow",
            "route": "/virginia",
            "rankings": False,
            "trustScore": False,
            "h1": "Virginia Household-Goods Moving Intelligence",
        },
        "clocks": {
            "authorized_carriers_sourceAsOf": None,
            "authorized_carriers_sourceAsOf_status": "UNKNOWN",
            "authorized_carriers_retrievedAt": retrieved,
            "snapshotAsOf": None,
            "retrievedAt_is_not_sourceAsOf": True,
            "listing_term": "Authorized Motor Carriers",
            "do_not_translate_authorized_into_insurance_verified_today": True,
        },
        "regulator": {
            "agency": "Virginia Department of Motor Vehicles — Motor Carrier Services",
            "short": "DMV",
            "hhg_url": HHG_PAGE,
            "auth_url": AUTH,
            "applicants_url": APPLICANTS,
            "faq_url": FAQ,
            "denial_url": DENIAL,
            "bond_url": BOND,
            "oa460_url": OA460,
        },
        "authority_classes": {
            "HOUSEHOLD_GOODS_CERTIFICATE": {
                "label": "Household Goods Carrier",
                "legal_authority_document": "Certificate",
                "source_display_label": "Permit Number",
                "identity_namespace": "VA-DMV-HHG:{authorityNumber}",
                "jurisdiction": "Virginia_intrastate",
                "grain": "household_goods_carrier_certificate",
                "covers": "A person who transports only household goods. Certificate authorizes operations only in Virginia.",
                "not_a_permit": True,
                "not_property_carrier": True,
                "not_usdot": True,
                "not_all_virginia_movers": True,
            },
            "PROPERTY_CARRIER_PERMIT": {
                "label": "Property Carrier",
                "legal_authority_document": "Permit",
                "source_display_label": "Permit Number",
                "identity_namespace": "VA-DMV-PROP:{authorityNumber}",
                "jurisdiction": "Virginia_intrastate",
                "grain": "property_carrier_permit",
                "covers": "A person who transports property. May transport household goods only when delivery is less than 31 road-miles from pickup.",
                "not_household_goods_carrier": True,
                "not_a_moving_company_label": True,
                "not_usdot": True,
            },
            "FMCSA_INTERSTATE": {
                "label": "FMCSA interstate operating authority",
                "jurisdiction": "interstate",
                "grain": "federal_operating_authority",
                "virginia_state_authority_is_not_a_substitute": True,
            },
        },
        "distance_rule": {
            "hhg_required_when_official_faq": "If you transport household goods further than 30 miles from where the move started, you must obtain Household Goods Carrier authority.",
            "property_may_apply_when_official_faq": "If you do not transport household goods for more than 30 miles from where the move started, you must obtain Property Carrier authority.",
            "property_oa460": "You can transport household goods only if the goods are delivered to a place that is less than 31 road-miles from the place where you picked them up.",
            "hhg_holder_short_move_faq": "The property carrier authority for moves of 30 miles or less is not required if you have household goods authority and you only transport household goods.",
            "over_30_miles_relevant": "HOUSEHOLD_GOODS_CERTIFICATE",
            "short_local_relevant": "HOUSEHOLD_GOODS_CERTIFICATE_OR_QUALIFYING_PROPERTY_CARRIER_PERMIT",
            "do_not_collapse_30_and_less_than_31_into_one_invented_rule": True,
            "edge_sources_preserved_separately": True,
            "authority_depends_on_distance_and_type": True,
        },
        "hhg_roster": {
            "status": "ACQUIRED",
            "access": "OFFICIAL_PUBLIC_DIRECTORY_FILTERED_TRAVERSAL",
            "filter": {"field_carrier_type_target_id": "476"},
            "pages_traversed": hhg["pages_traversed"],
            "grain": "authorized_listing_row",
            "identity_grain": "distinct_non_null_authority_number",
            "rows": hhg["rows"],
            "non_null_authority_rows": hhg_stats["non_null_authority_rows"],
            "distinct_authority_numbers": hhg_stats["distinct_non_null_authority_numbers"],
            "distinct_non_null_authority_numbers": hhg_stats["distinct_non_null_authority_numbers"],
            "duplicate_authority_numbers": hhg_stats["duplicate_non_null_authority_numbers"],
            "null_identifiers": hhg_stats["null_identifiers"],
            "source_identifier_conflicts": hhg_stats["source_identifier_conflicts"],
            "distinct_labels": hhg_labels,
            "out_of_state": hhg["out_of_state"],
            "completeness": "last official pager page reached; last page has fewer than 25 rows",
            "legal_authority_document": "Certificate",
            "source_display_label": "Permit Number",
            "do_not_call_certificate_a_permit": True,
            "retrievedAt": retrieved,
            "sourceAsOf": None,
        },
        "property_roster": {
            "status": "ACQUIRED",
            "access": "OFFICIAL_PUBLIC_DIRECTORY_FILTERED_TRAVERSAL",
            "filter": {"field_carrier_type_target_id": "456"},
            "pages_traversed": prop["pages_traversed"],
            "grain": "authorized_listing_row",
            "identity_grain": "distinct_non_null_authority_number",
            "rows": prop["rows"],
            "non_null_authority_rows": prop_stats["non_null_authority_rows"],
            "distinct_authority_numbers": prop_stats["distinct_non_null_authority_numbers"],
            "distinct_non_null_authority_numbers": prop_stats["distinct_non_null_authority_numbers"],
            "duplicate_authority_numbers": prop_stats["duplicate_non_null_authority_numbers"],
            "null_identifiers": prop_stats["null_identifiers"],
            "source_identifier_conflicts": prop_stats["source_identifier_conflicts"],
            "null_identifier_row_is_not_state_identity": True,
            "household_goods_relevance": "May legally cover household-goods transportation when delivery is less than 31 road-miles from pickup, subject to current DMV rules. Not a household-goods mover census.",
            "not_called_movers": True,
            "not_added_to_hhg_denominator": True,
            "retrievedAt": retrieved,
            "sourceAsOf": None,
        },
        "cross_authority": acq["cross_authority"],
        "identity": {
            "hhg_namespace": "VA-DMV-HHG:{authorityNumber}",
            "property_namespace": "VA-DMV-PROP:{authorityNumber}",
            "authority_type_is_part_of_identity": True,
            "name_is_not_canonical_identity": True,
            "state_dmv_is_not_usdot": True,
            "authority_number_is_not_unique_company": True,
            "blank_authority_is_not_state_identity": True,
            "duplicate_property_number_1276_two_carriers": True,
            "property_1276_status": "SOURCE_IDENTIFIER_CONFLICT",
            "property_1276_does_not_resolve_unique_carrier": True,
            "property_1276_canonical_organization_forbidden": True,
        },
        "federal": {
            "virginia_state_authority_is_not_fmcsa": True,
            "usdot_is_not_active_interstate_authority": True,
            "mc_presence_is_not_active_authority": True,
            "dmv_does_not_expose_usdot_or_mc_on_authorized_listing": True,
            "exact_federal_crosswalk": "NOT_AVAILABLE_FROM_STATE_LISTING",
            "name_only": "UNSAFE",
            "name_plus_address": "REVIEW_REQUIRED",
        },
        "insurance_bond": {
            "hhg_liability": "$750,000 bodily injury and property damage",
            "hhg_cargo": "$50,000 cargo, with source-defined exceptions for passenger cars, motorcycles, autocycles, mopeds, or vehicles GVWR 10,000 pounds or less",
            "hhg_bond": "$50,000 surety bond or irrevocable letter of credit maintained for five years from issuance of Household Goods Carrier authority",
            "property_bond": "None (DMV OA460 / current guidance)",
            "property_insurance_differs_by_vehicle": True,
            "requirement_ne_carrier_specific_public_proof": True,
            "roster_presence_ne_insured_true": True,
            "roster_presence_ne_bonded_true": True,
            "coverage": "UNKNOWN / VERIFY_PATH / NOT_ACQUIRED",
        },
        "tariff": {
            "hhg_requirement": "For deliveries over 30 miles, charge the same rates as listed in the tariff filed with DMV. Rate changes require 30-day notice and written DMV approval.",
            "bill_of_lading": "A copy of the bill of lading must be carried when transporting household goods and maintained at the place of business for at least three years.",
            "structured_public_tariff_repository": "SOURCE_NOT_ACQUIRED",
            "status": "PUBLIC_REQUIREMENT / SOURCE_NOT_ACQUIRED",
            "tariff_ne_quote": True,
            "filed_tariff_ne_quality": True,
        },
        "applications": {
            "grain": "application_notice",
            "status": "ACQUIRED_CURRENT_NOTICE_INDEX",
            "url": APPLICANTS,
            "notice_rows": acq["applications"]["notice_rows"],
            "household_goods_notices": acq["applications"]["household_goods_notices"],
            "not_added_to_authorized_roster": True,
            "applicant_ne_authorized_carrier": True,
            "case_ne_authority_number": True,
            "protest_ne_unfitness_finding": True,
            "hearing_ne_discipline": True,
        },
        "enforcement": {
            "status": "PUBLIC_RESEARCH_PATH",
            "url": DENIAL,
            "carrier_specific_order_index": "SOURCE_NOT_ACQUIRED",
            "do_not_report_zero_actions": True,
            "suspension_ne_revocation": True,
            "revocation_ne_criminal_conviction": True,
            "insurance_cancellation_may_lead_to_suspension": True,
            "do_not_infer_uninsured_without_carrier_order": True,
            "name_only": "UNSAFE",
        },
        "complaints": {
            "process": "PUBLIC_RESEARCH_PATH",
            "form": "OA 411 Consumer Complaint Against a Passenger/Property Carrier",
            "bulk": "SOURCE_NOT_ACQUIRED",
            "complaint_ne_violation": True,
            "filed_ne_substantiated": True,
            "no_row_ne_clean_history": True,
        },
        "claims": {
            "model": "CONSUMER_RIGHTS / OPERATING_REQUIREMENT",
            "not_enforcement_observation": True,
            "no_claim_history_rows": True,
        },
        "search_v1": {
            "distance_sensitive": True,
            "over_30_uses_hhg_certificate": True,
            "short_local_may_use_hhg_or_qualifying_property": True,
            "interstate_uses_fmcsa": True,
            "usdot_alone_insufficient_for_interstate": True,
            "do_not_rank": True,
            "unqualified_licensed_in_virginia_fail_closed": True,
        },
        "claim_safety": {
            "virginia_state_identities_not_claimable": True,
            "eligibility_remains_usdot_publishable_profiles": True,
            "applicants_not_claimable": True,
            "property_carrier_ne_hhg_profile": True,
        },
        "expansion_ledger": {
            "PRE_INGEST_MOVE_CANONICAL_ORGANIZATIONS": 5022,
            "NEW_VA_STATE_IDENTITIES": hhg_stats["distinct_non_null_authority_numbers"]
            + prop_stats["distinct_non_null_authority_numbers"],
            "NEW_VA_HHG_AUTHORITY_IDENTITIES": hhg_stats["distinct_non_null_authority_numbers"],
            "NEW_VA_PROPERTY_AUTHORITY_IDENTITIES": prop_stats["distinct_non_null_authority_numbers"],
            "identity_grain": "distinct_non_null_authority_number",
            "credential_row_grain": "authorized_listing_row",
            "credential_rows_are_not_authority_identities": True,
            "blank_identifier_is_not_state_identity": True,
            "duplicate_source_identifier_counts_once": True,
            "NET_NEW_CANONICAL_ORGANIZATIONS": 0,
            "NET_NEW_PUBLIC_MOVE_PROFILES": 0,
            "EXISTING_ORGANIZATIONS_ENRICHED": 0,
            "NEW_STATE_CREDENTIAL_ROWS": hhg["rows"] + prop["rows"],
            "NEW_APPLICATION_NOTICE_ROWS": acq["applications"]["notice_rows"],
            "NEW_DISCIPLINE_OR_REVOCATION_EVIDENCE_ROWS": 0,
            "EXACT_STATE_TO_FEDERAL_CROSSWALKS": 0,
            "REVIEW_REQUIRED_CROSSWALKS": len(acq["cross_authority"]["normalized_name_overlap_review_only"]),
            "REJECTED_UNSAFE_CROSSWALKS": "NOT_EXECUTED_NAME_ONLY",
            "EXACT_PROFILE_ATTACHMENTS": 0,
        },
        "gaps": {
            "ACQUIRED": [
                "Household Goods Carrier authorized-listing cohort",
                "Property Carrier authorized-listing cohort",
                "Current applicant/notice index",
            ],
            "OPEN_SEARCH_ONLY": ["Authorized Motor Carriers live directory lookup"],
            "SOURCE_NOT_ACQUIRED": [
                "Carrier-specific tariffs",
                "Complaint bulk",
                "Suspension/revocation order corpus",
                "Carrier-specific insurance filings",
                "Bond filings",
                "State to FMCSA exact ID crosswalk",
            ],
            "SOURCE_AVAILABLE_BY_REQUEST": [],
            "SOURCE_USE_RESTRICTED": [],
            "HISTORICAL_STALE": [],
            "UNKNOWN": ["Official sourceAsOf for Authorized Motor Carriers listing"],
            "NOT_APPLICABLE": ["Colorado PUC HHG-only permit model"],
        },
        "gate": {"passed": True, "statewide_only": True},
    }
    fp = fingerprint(body)
    body["fingerprint"] = fp
    LIB.mkdir(parents=True, exist_ok=True)
    ART.mkdir(parents=True, exist_ok=True)
    (LIB / "accepted-snapshot.json").write_text(json.dumps(body, indent=2) + "\n", encoding="utf-8")
    shutil.copy(LIB / "accepted-snapshot.json", ART / "va-move-001-public-snapshot.json")
    pub = f"""export const VA_MOVE_INTEL_VERSION = '{VERSION}' as const;
export const VA_MOVE_PUBLIC_PATH = '/virginia' as const;
export const VA_MOVE_PUBLIC_FINGERPRINT =
  '{fp}';

export const VIRGINIA_INTELLIGENCE_GATE = {{
  path: VA_MOVE_PUBLIC_PATH,
  robotsIndex: true,
  sitemap: true,
  title: 'Virginia Household-Goods Mover Authority & DMV Intelligence | MoveTrustHub',
  description:
    'Research official Virginia DMV Household Goods Carrier certificates and Property Carrier permits. Authority depends on move distance. Interstate authority is FMCSA. Not a ranking or Trust Score.',
}} as const;
"""
    (LIB / "publication.ts").write_text(pub, encoding="utf-8")
    print(
        "fingerprint",
        fp,
        "hhg_rows",
        hhg["rows"],
        "hhg_ids",
        hhg_stats["distinct_non_null_authority_numbers"],
        "hhg_labels",
        hhg_labels,
        "prop_rows",
        prop["rows"],
        "prop_ids",
        prop_stats["distinct_non_null_authority_numbers"],
        "ledger_identities",
        hhg_stats["distinct_non_null_authority_numbers"] + prop_stats["distinct_non_null_authority_numbers"],
        "ledger_rows",
        hhg["rows"] + prop["rows"],
    )


if __name__ == "__main__":
    main()
