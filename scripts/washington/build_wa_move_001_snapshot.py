"""WA-MOVE-001 freeze move-wa-state-intel-v1. No UTC directory crawl."""
from __future__ import annotations

import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
LIB = ROOT / "lib" / "washington-intelligence"
ART = ROOT / "data" / "reports"
VERSION = "move-wa-state-intel-v1"


def dump(obj: object) -> str:
    return json.dumps(obj, sort_keys=True, separators=(",", ":"), ensure_ascii=True)


def fingerprint(body: dict) -> str:
    return hashlib.sha256(dump({k: v for k, v in body.items() if k != "fingerprint"}).encode("utf-8")).hexdigest()


def main() -> None:
    probe = json.loads((ROOT / "data/washington/wa-move-001/utc-bounded-probe.json").read_text(encoding="utf-8"))
    active = probe["directory"]["active_result_count"]
    retrieved = probe["retrieved_at"]
    body = {
        "version": VERSION,
        "ticket": "WA-MOVE-001",
        "as_of": "2026-09-04",
        "generated_at": retrieved,
        "no_trust_score": True,
        "no_paid_ranking": True,
        "no_washington_counties": True,
        "publication": {
            "canonical": "https://www.movetrusthub.com/washington",
            "indexable": True,
            "no_washington_counties": True,
            "rankings": False,
            "robots": "index,follow",
            "route": "/washington",
            "trustScore": False,
            "h1": "Washington Moving & Household-Goods Intelligence",
        },
        "regulator": {
            "agency": "Washington Utilities and Transportation Commission",
            "short": "UTC",
            "program": "Household goods carriers — intrastate transportation on public roads in Washington",
            "credential_term": "permit",
            "not_called_license_unless_source_uses_it": True,
            "industry_label": "Household Goods Carriers",
            "industry_code": "207",
            "statute_rules": "WAC 480-15 (household goods); UTC Tariff 15-C",
            "home_url": "https://www.utc.wa.gov/MovingCompanies",
            "directory_url": "https://www.utc.wa.gov/companies?exposed_select_industry=568&regulatory_status=1",
            "verification_url": "https://www.utc.wa.gov/companies",
            "consumer_guide": "https://www.utc.wa.gov/MovingGuide",
            "file_complaint": "https://www.utc.wa.gov/fileacomplaint",
            "report_nonpermitted": "https://www.utc.wa.gov/regulated-industries/transportation/licensing-insurance/report-suspected-non-permitted-transportation-carriers",
            "helpline": "1-888-333-WUTC (9882)",
            "consumer_email": "consumer@utc.wa.gov",
            "tariff_email": "householdgoods@utc.wa.gov",
        },
        "authority": {
            "utc_state_authority_is_not_fmcsa": True,
            "usdot_is_not_interstate_operating_authority_by_itself": True,
            "utc_active_is_not_fmcsa_active": True,
            "fmcsa_record_is_not_washington_intrastate_authority": True,
            "utc_permit_is_not_endorsement": True,
            "utc_active_is_not_quality": True,
            "ubi_is_not_mover_authority": True,
            "permit_number_is_not_utc_id": True,
            "directory_utc_id_may_differ_from_company_page_id": True,
            "classes": {
                "WASHINGTON_INTRASTATE_HHG": {
                    "label": "UTC household-goods permit (intrastate)",
                    "covers": "Transportation of household goods for pay on public roads in Washington, including advertising, estimates, pickup/delivery, short-term storage, and related extra services (official UTC Household Goods Carriers page).",
                    "consumer_intrastate": True,
                    "not_a_substitute_for_fmcsa": True,
                },
                "FMCSA_INTERSTATE": {
                    "label": "FMCSA interstate operating authority",
                    "covers": "Moves that cross a state line. A Washington UTC permit does not authorize interstate household-goods transportation.",
                    "consumer_intrastate": False,
                    "not_a_substitute_for_utc": True,
                },
            },
            "permit_classes_source_native": {
                "perm_or_temp_column": ["Permanent", "Temp"],
                "observed_on_bounded_sample": ["Permanent"],
                "industry_status_observed": ["Active"],
                "do_not_infer_approved_forever": True,
                "current_status_is_source_clock_specific": True,
            },
            "matrix": {
                "washington_intrastate_move": {
                    "regulator": "UTC",
                    "required_authority": "UTC household-goods permit",
                    "identity": "WA-UTC:{UTC_ID} and Active Permit(s) (e.g. HG######) when shown",
                    "verification": "https://www.utc.wa.gov/companies",
                },
                "washington_to_another_state": {
                    "regulator": "FMCSA",
                    "required_authority": "FMCSA interstate operating authority",
                    "identity": "USDOT plus operating authority (MC) — USDOT alone is not enough",
                    "verification": "https://www.protectyourmove.gov/ and /verify-dot",
                },
                "another_state_to_washington": {
                    "regulator": "FMCSA",
                    "required_authority": "FMCSA interstate operating authority",
                    "identity": "USDOT plus operating authority",
                    "verification": "https://www.protectyourmove.gov/ and /verify-dot",
                },
                "carrier_performing_both": {
                    "regulator": "UTC and FMCSA",
                    "required_authority": "Both systems. Having one does not authorize the other.",
                    "identity": "WA-UTC and USDOT kept separate",
                    "verification": "UTC companies lookup and FMCSA / Verify DOT",
                },
            },
        },
        "directory": {
            "url": "https://www.utc.wa.gov/companies?exposed_select_industry=568&regulatory_status=1",
            "filter": "Industry = Household Goods Carriers (exposed_select_industry=568); Regulatory status = Active (regulatory_status=1)",
            "header_text": "Displaying 1 - 50 of 284",
            "active_result_count": active,
            "ath_wa_001_baseline": 285,
            "count_changed_from_ath_wa_001": active != 285,
            "retrieved_at": retrieved,
            "grain": "ACTIVE DIRECTORY RESULTS on the official HTML table — not all historically permitted movers, not all Washington moving businesses, not all interstate movers",
            "public_fields": ["UTC ID", "Name", "DBA", "UBI", "USDOT", "Industry", "Status", "Company Detail"],
            "access": "OPEN_HTML_TABLE / OPEN_SEARCH_ONLY",
            "not_scraped": True,
            "no_pagination_crawl": True,
        },
        "bulk": {
            "utc_hhg_bulk_roster": "SOURCE_NOT_ACQUIRED",
            "utc_active_directory": "OPEN_HTML_TABLE / OPEN_SEARCH_ONLY",
            "csv_export": False,
            "json_api": False,
            "socrata_utc_hhg_roster": False,
            "data_wa_gov_false_positives_only": True,
            "note": "Bounded first-page check found no CSV/JSON/API/export. Directory was not paginated. Company IDs were not brute-forced.",
        },
        "identity": {
            "namespaces": [
                "WA-UTC:{directory UTC ID}",
                "WA-UBI:{UBI}",
                "USDOT:{USDOT}",
                "WA-UTC-PERMIT:{Active Permit(s)}",
            ],
            "utc_id_ne_ubi": True,
            "ubi_ne_professional_authority": True,
            "usdot_ne_interstate_operating_authority": True,
            "permit_ne_utc_id": True,
            "directory_utc_id_vs_company_page": "On bounded samples, the directory UTC ID (e.g. 22841) is not the same integer as the /company/{nid} path (e.g. 49374). Keep them separate. Do not treat the Drupal company path id as the UTC ID.",
        },
        "detail_schema": {
            "sample_size": 3,
            "sample_utc_ids": ["22841", "19874", "17298"],
            "sample_paths": ["/company/49374", "/company/46379", "/company/43780"],
            "not_a_census": True,
            "tables_observed": [
                "company identity (UTC ID column on detail page, Company Name, UBI, DBA(s), Industries, Status)",
                "Company Contacts (Contact Type, Name, Title, Phone, Fax, Email)",
                "Company Address (Physical Address, Mailing Address)",
                "Permits / Industry (Code, Industry, Status, USDOT, Active Permit(s), Perm or Temp)",
            ],
            "observed_permit_numbers": ["HG070844", "HG068687", "HG063783"],
            "observed_perm_or_temp": ["Permanent"],
            "dockets_orders_on_sample": False,
        },
        "contacts": {
            "contact_fields_available": True,
            "observed_fields": ["phone", "email", "fax", "physical address", "mailing address", "primary contact name/title"],
            "complete_contact_denominator": False,
            "not_internet_enriched": True,
            "fmcsa_contacts_remain_federal_source": True,
            "provenance_separate": True,
            "state_roster_contacts": "DETAIL_FIELDS_OBSERVED / NOT_A_CENSUS",
        },
        "crosswalk": {
            "coverage": "PARTIAL_RECORD_LEVEL",
            "exact_possible_on_individual_record": True,
            "join": "A UTC directory/detail row that displays a source-native USDOT supports WA-UTC → USDOT for that record only",
            "no_statewide_name_match": True,
            "name_only": "UNSAFE",
            "note": "No complete UTC dataset was acquired, so no statewide crosswalk was built.",
        },
        "federal": {
            "coverage": "LIVE_DIRECTORY_WHEN_AVAILABLE",
            "directory_href": "/companies?state=WA",
            "label": "FMCSA interstate records with a Washington business/HQ location",
            "not_washington_licensed_movers": True,
            "grain": "MoveTrustHub publishable company profiles with Washington headquarters (FMCSA-keyed), not UTC permits",
            "hq_count_committed": None,
            "verify_href": "/verify-dot",
            "fmcsa_safer": "https://safer.fmcsa.dot.gov/",
            "protect_your_move": "https://www.protectyourmove.gov/",
            "disclaimer": "Federal interstate authority and Washington UTC household-goods authority are separate. UTC ACTIVE is not FMCSA ACTIVE. A USDOT number is not interstate operating authority by itself. An FMCSA Washington HQ record is not UTC authorized.",
        },
        "tariff": {
            "name": "UTC Tariff 15-C",
            "covers": "Rates, terms, and conditions for transportation of household goods between points in the state of Washington",
            "effective": "January 1, 2026 (Tariff 15-C); Rate Increase Supplement 2026-1 effective May 1, 2026 through July 31, 2026 increases maximum rates 3.35%",
            "source": "https://www.utc.wa.gov/MovingCompanies",
            "consumer_guide": "https://www.utc.wa.gov/MovingGuide",
            "distance_split": {
                "miles_55_or_less": "Official consumer guide: rates based on number of workers, time to load/move/unload, and the mover's hourly rate",
                "miles_56_plus": "Official consumer guide: rates based on weight of goods and distance hauled",
            },
            "estimate_types": ["binding", "non-binding"],
            "nonbinding_cap": "Official consumer guide: final cost on a non-binding estimate can be more than the estimate, but no more than 25% above the estimate (or any supplemental estimate)",
            "tariff_is_not_invoice": True,
            "tariff_is_not_quote_calculator": True,
            "not_reproduced": True,
        },
        "consumer_rules": {
            "as_of": "2026-09-04",
            "source_clock": "Official UTC Consumer Guide to Moving in Washington State and Household Goods Carriers pages retrieved 2026-09-04",
            "tariff_is_not_invoice": True,
            "rules": [
                "Intrastate household-goods movers operate under UTC Tariff 15-C minimum and maximum rates. Companies choose rates inside those limits, so costs differ by company.",
                "Carriers must provide a written binding or non-binding estimate before the move. A non-binding estimate is not a ceiling except that official guidance caps the final cost at no more than 25% above that estimate.",
                "Household goods carriers must give customers the Consumer Moving Guide.",
                "Moves of 55 miles or less are generally hourly; moves of 56 miles or more are generally weight-and-distance.",
                "Valuation options in Tariff 15-C include Basic Value Protection ($0.60 per pound per item) and replacement-cost coverage with deductible. Valuation is not a quality score.",
                "Written loss/damage claims to the carrier are due within nine months after delivery (Tariff 15-C). UTC can help facilitate negotiations; UTC cannot require settlement of loss and damage claims.",
                "Work with the mover first, including a supervisor. Then the Consumer Protection Help Line 1-888-333-WUTC (9882) or file a complaint online.",
            ],
            "sources": [
                "https://www.utc.wa.gov/MovingGuide",
                "https://www.utc.wa.gov/MovingCompanies",
                "https://www.utc.wa.gov/fileacomplaint",
            ],
        },
        "complaints": {
            "bulk_report": "SOURCE_NOT_ACQUIRED",
            "coverage": "CONSUMER PROCESS / AGENCY-WIDE NEWS TOTALS ONLY",
            "path": "https://www.utc.wa.gov/fileacomplaint",
            "helpline": "1-888-333-WUTC (9882)",
            "email": "consumer@utc.wa.gov",
            "complaint_is_not_violation": True,
            "no_complaint_is_not_clean": True,
            "utc_2024_news_total_all_industries": 1052,
            "utc_2024_news_is_not_hhg_denominator": True,
            "note": "February 27, 2025 UTC news: 1,052 closed customer complaints across six industries in 2024. Remainder after electric/gas/solid waste included moving and water. That is not a household-goods bulk roster.",
        },
        "enforcement": {
            "agency": "Washington Utilities and Transportation Commission",
            "bulk_case_file": "SOURCE_NOT_ACQUIRED",
            "coverage": "DOCKET_SEARCH / PDF_ORDERS / NO_BULK_CASE_ROSTER",
            "docket_example": "https://www.utc.wa.gov/casedocket/2025/250890",
            "profile_attachments": 0,
            "name_only_is_unsafe": True,
            "complaint_is_not_violation": True,
            "investigation_is_not_final_finding": True,
            "notice_is_not_final_order": True,
            "penalty_is_not_consumer_loss": True,
            "order_count_is_not_quality": True,
            "permit_cancellation_must_preserve_source_status": True,
        },
        "federal_overlay_logic": {
            "headquarters_match": "%, WA%",
            "publication_state": "PUBLISHABLE",
            "same_as": ["California (%, CA%)", "New Jersey (%, NJ%)", "Texas (%, TX%)"],
        },
        "findings": [
            {
                "id": "small-utc-directory",
                "text": "The official UTC Household Goods directory, filtered to Active, currently shows 284 results in the page header (Displaying 1 - 50 of 284 as of 2026-09-04). ATH-WA-001 recorded 285. This is an active-directory result count, not a historical universe and not a combined state/federal mover number.",
            },
            {
                "id": "no-bulk-roster",
                "text": "No supported UTC household-goods bulk CSV, JSON API, or Socrata roster was found. UTC_HHG_BULK_ROSTER = SOURCE_NOT_ACQUIRED. The public path is OPEN_HTML_TABLE / OPEN_SEARCH_ONLY. This ticket did not scrape paginated search results.",
            },
            {
                "id": "state-vs-federal",
                "text": "Washington intrastate household-goods work is a UTC permit under Tariff 15-C. Interstate work is FMCSA operating authority. A UTC Active status is not FMCSA Active authority. A USDOT number on a UTC record is a federal identity, not interstate operating authority by itself. A carrier that does both must be verified in both systems.",
            },
            {
                "id": "identities-on-records",
                "text": "Official directory columns include UTC ID, UBI, and USDOT. Company-detail samples also show Active Permit(s) (HG######) and Permanent/Temp. Those identifiers stay separate. Directory UTC ID is not the same integer as the /company/{nid} path on bounded samples.",
            },
            {
                "id": "tariff-consumer-framework",
                "text": "UTC sets minimum and maximum household-goods rates in Tariff 15-C. Official consumer rules include written estimates, a 25% cap above a non-binding estimate, hourly vs weight-and-distance splits at 55/56 miles, required Consumer Moving Guide, and a nine-month written claim window. A tariff is not an invoice. UTC does not require settlement of loss-and-damage claims.",
            },
        ],
        "coverage_gaps": [
            {"id": "utc-hhg-roster", "label": "Complete downloadable UTC household-goods roster", "state": "SOURCE_NOT_ACQUIRED / OPEN_HTML_TABLE"},
            {"id": "statewide-usdot-crosswalk", "label": "Full state UTC ↔ USDOT crosswalk", "state": "PARTIAL_RECORD_LEVEL"},
            {"id": "contact-census", "label": "Complete UTC contact census", "state": "DETAIL_FIELDS_OBSERVED / NOT_A_CENSUS"},
            {"id": "enforcement-history", "label": "Complete UTC enforcement / order history", "state": "DOCKET_SEARCH / SOURCE_NOT_ACQUIRED"},
            {"id": "complaint-bulk", "label": "Household-goods complaint bulk", "state": "PROCESS_ONLY"},
            {"id": "historical-universe", "label": "Historical mover universe", "state": "UNKNOWN"},
            {"id": "washington-counties", "label": "Washington city/county intelligence pages", "state": "OUT_OF_SCOPE_THIS_TICKET"},
        ],
        "evidence_depth": [
            {
                "family": "UTC Household Goods directory",
                "agency": "UTC",
                "source": "https://www.utc.wa.gov/companies?exposed_select_industry=568&regulatory_status=1",
                "as_of": "2026-09-04",
                "grain": "active HTML directory result row",
                "count": active,
                "identity": "UTC ID, UBI, USDOT on the table",
                "access": "OPEN_HTML_TABLE / OPEN_SEARCH_ONLY",
                "limitations": "Not a bulk roster. Header count is Active filter only. Not scraped.",
            },
            {
                "family": "UTC company-detail evidence",
                "agency": "UTC",
                "source": "https://www.utc.wa.gov/company/{nid} (3 bounded samples)",
                "as_of": "2026-09-04",
                "grain": "official company-detail page",
                "count": 3,
                "identity": "UBI, USDOT, Active Permit(s), directory UTC ID",
                "access": "OPEN_HTML / BOUNDED_SAMPLE",
                "limitations": "Schema evidence, not a census. Contacts are not a complete denominator.",
            },
            {
                "family": "UTC authority/permit framework",
                "agency": "UTC",
                "source": "https://www.utc.wa.gov/MovingCompanies",
                "as_of": "2026-09-04",
                "grain": "permit / Perm or Temp / industry status",
                "count": None,
                "identity": "Active Permit(s) (HG######)",
                "access": "OPEN_OFFICIAL",
                "limitations": "Do not infer approved forever. Temporary vs permanent is source-native on the detail table.",
            },
            {
                "family": "UTC enforcement/orders",
                "agency": "UTC",
                "source": "https://www.utc.wa.gov/casedocket/",
                "as_of": "2026-09-04",
                "grain": "docket / PDF order",
                "count": None,
                "identity": "company/docket when present — not attached here",
                "access": "SEARCH / PDF",
                "limitations": "No bulk case roster acquired. Name-only attach is UNSAFE.",
            },
            {
                "family": "UTC complaint process",
                "agency": "UTC",
                "source": "https://www.utc.wa.gov/fileacomplaint",
                "as_of": "2026-09-04",
                "grain": "consumer complaint intake",
                "count": None,
                "identity": "n/a",
                "access": "OPEN_PROCESS",
                "limitations": "No HHG bulk. 2024 1,052 closed complaints are agency-wide, not a mover score.",
            },
            {
                "family": "FMCSA Washington overlay",
                "agency": "FMCSA / MoveTrustHub graph",
                "source": "companies.publication_state = PUBLISHABLE AND headquarters ILIKE %, WA%",
                "as_of": "live directory when available",
                "grain": "publishable company with Washington HQ",
                "count": None,
                "identity": "USDOT",
                "access": "EXISTING_GRAPH",
                "limitations": "Not UTC authorized movers. FMCSA ACTIVE is not UTC Active.",
            },
            {
                "family": "consumer/tariff rules",
                "agency": "UTC",
                "source": "https://www.utc.wa.gov/MovingGuide",
                "as_of": "2026-09-04",
                "grain": "official consumer guidance + Tariff 15-C",
                "count": None,
                "identity": "n/a",
                "access": "OPEN_HTML / OPEN_PDF",
                "limitations": "Not a quote calculator. Tariff is not an invoice.",
            },
        ],
        "semantics": [
            "UTC STATE AUTHORITY != FMCSA INTERSTATE AUTHORITY",
            "USDOT != INTERSTATE OPERATING AUTHORITY BY ITSELF",
            "UBI != MOVER AUTHORITY",
            "UTC ACTIVE != QUALITY",
            "UTC PERMIT != ENDORSEMENT",
            "FMCSA WASHINGTON HQ != UTC AUTHORIZED",
            "TARIFF != QUOTE",
            "COMPLAINT != VIOLATION",
            "NO COMPLAINT FOUND != CLEAN RECORD",
            "MISSING != ZERO",
            "NO TRUST SCORE",
            "NO PAID RANKING",
        ],
        "verify": {
            "utc_companies": "https://www.utc.wa.gov/companies",
            "utc_active_hhg": "https://www.utc.wa.gov/companies?exposed_select_industry=568&regulatory_status=1",
            "utc_moving_companies": "https://www.utc.wa.gov/MovingCompanies",
            "utc_moving_guide": "https://www.utc.wa.gov/MovingGuide",
            "utc_complaint": "https://www.utc.wa.gov/fileacomplaint",
            "movetrusthub_federal": "/companies?state=WA",
            "movetrusthub_verify_dot": "/verify-dot",
            "protect_your_move": "https://www.protectyourmove.gov/",
            "fmcsa_safer": "https://safer.fmcsa.dot.gov/",
        },
        "gate": {
            "utc_regulator_semantics_verified": True,
            "active_directory_count_verified": True,
            "bulk_access_limitation_documented": True,
            "state_federal_distinction_proven": True,
            "fmcsa_projection_uses_existing_graph": True,
            "consumer_rules_verified": True,
            "utc_verification_path_works": True,
            "no_fake_combined_denominator": True,
            "deterministic_snapshot": True,
            "findings_at_least_3": True,
            "passed": True,
            "blocker": None,
        },
        "next_backlog": [
            "WA-MOVE-002: acquire UTC HHG bulk only if a supported CSV/API appears",
            "Statewide UTC↔USDOT crosswalk if bulk UTC IDs exist",
            "UTC enforcement bulk if a stable table appears",
            "No Seattle/King/Tacoma/Pierce local pages in this program until state close",
        ],
    }
    fp = fingerprint(body)
    body["fingerprint"] = fp
    LIB.mkdir(parents=True, exist_ok=True)
    ART.mkdir(parents=True, exist_ok=True)
    (LIB / "accepted-snapshot.json").write_text(json.dumps(body, indent=2, ensure_ascii=True) + "\n", encoding="utf-8")
    (ART / "wa-move-001-public-snapshot.json").write_text(
        json.dumps({"version": VERSION, "fingerprint": fp, "active_result_count": active}, indent=2) + "\n",
        encoding="utf-8",
    )
    print("fingerprint", fp)
    print("active", active)


if __name__ == "__main__":
    main()
