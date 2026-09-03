"""Build CA-MOVE-001 accepted snapshot."""
from __future__ import annotations

import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REP = json.loads((ROOT / "artifacts/ca-move-001/acquisition-report.json").read_text(encoding="utf-8"))
OUT_TS = ROOT / "lib/california-intelligence/accepted-snapshot.json"
OUT_JSON = ROOT / "data/reports/ca-move-001-public-snapshot.json"
VERSION = "move-ca-state-intel-v1"


def dump(obj: object) -> str:
    return json.dumps(obj, sort_keys=True, separators=(",", ":"), ensure_ascii=True)


def fingerprint(obj: dict) -> str:
    body = {k: v for k, v in obj.items() if k not in ("fingerprint", "generated_at")}
    return hashlib.sha256(dump(body).encode("utf-8")).hexdigest()


def main() -> None:
    e = REP["enforcement"]
    exact_rows = [
        {
            "business_name": r["business_name"],
            "city": r["city"],
            "cal_t": r["cal_t"],
            "citation_date": r["citation_date"],
            "fine_amount": r["fine_amount"],
            "identity_tier": "EXACT",
        }
        for r in e["inventory"]
        if r.get("cal_t")
    ]
    snapshot = {
        "version": VERSION,
        "ticket": "CA-MOVE-001",
        "as_of": "2026-09-03",
        "publication": {
            "route": "/california",
            "indexable": True,
            "canonical": "https://www.movetrusthub.com/california",
            "robots": "index,follow",
            "rankings": False,
            "trustScore": False,
            "no_california_counties": True,
        },
        "regulator": {
            "agency": "Bureau of Household Goods and Services",
            "department": "California Department of Consumer Affairs",
            "short": "BHGS",
            "home_url": "https://bhgs.dca.ca.gov/",
            "not_the_current_regulator": "California Public Utilities Commission (household-goods authority transferred 2018; historical only)",
            "program": "Household Movers (HHM)",
            "identifier": "CAL-T number (Household Mover permit)",
            "verification_url": "https://search.dca.ca.gov/hhm_search",
            "verification_coverage": "OPEN_SEARCH_ONLY",
            "connect_url": "https://connect.dca.ca.gov/bhgs/",
            "connect_is_not_scraped": True,
        },
        "authority": {
            "classes": {
                "GENERAL_HOUSEHOLD_MOVER": {
                    "label": "General Household Mover permit",
                    "covers": "Moves of used household goods entirely within California, or both within California and into/out of California.",
                    "consumer_intrastate": True,
                },
                "INTERSTATE_MOVER": {
                    "label": "Interstate Mover permit",
                    "covers": "Moves of used household goods only into or out of California (BHGS interstate application).",
                    "consumer_intrastate": False,
                    "not_a_substitute_for_fmcsa": True,
                },
            },
            "exemptions_source_native": [
                "Freight forwarder (49 U.S.C. 13102(8))",
                "Motor carrier of property other than household goods / office moves (DMV)",
                "Storage-container company where the customer loads and unloads (49 U.S.C. 13102(12)(C))",
                "Packing or unpacking services only",
            ],
            "roster_coverage": "OPEN_SEARCH_ONLY / SOURCE_NOT_ACQUIRED",
            "license_count_published": None,
            "cal_t_is_not_usdot": True,
            "state_authority_is_not_fmcsa": True,
            "fmcsa_active_is_not_california_licensed": True,
            "california_licensed_is_not_interstate_authorized": True,
        },
        "federal": {
            "label": "FMCSA interstate records with a California business/HQ location",
            "disclaimer": "Federal interstate authority and California intrastate authority are separate. FMCSA ACTIVE is not California licensed. California licensed is not interstate authorized. CAL-T is not USDOT.",
            "directory_href": "/companies?state=CA",
            "verify_href": "/verify-dot",
            "fmcsa_safer": "https://safer.fmcsa.dot.gov/",
            "coverage": "LIVE_DIRECTORY_WHEN_AVAILABLE",
            "grain": "MoveTrustHub publishable company profiles with California headquarters (FMCSA-keyed), not CAL-T permits",
            "hq_count_committed": None,
        },
        "enforcement": {
            "source": e["source"],
            "agency": e["agency"],
            "coverage": "ACQUIRED_OFFICIAL_HTML_TABLE_FILTERED",
            "filter": e["filter"],
            "rows": e["rows"],
            "unlicensed_rows": e["unlicensed_rows"],
            "exact_cal_t_rows": e["exact_cal_t_rows"],
            "year_counts": e["year_counts"],
            "html_sha256": e["sha256"],
            "citation_is_not_revocation": True,
            "fine_is_not_confirmed_paid": True,
            "name_only_is_unsafe": True,
            "profile_attachments": 0,
            "other_bhgs_industries_excluded": True,
            "exact_cal_t_events": exact_rows,
            "unlicensed_names_not_profile_attached": True,
        },
        "tariff": {
            "source": REP["tariff"]["source"],
            "title": REP["tariff"]["title"],
            "effective": REP["tariff"]["effective"],
            "sha256": REP["tariff"]["sha256"],
            "bytes": REP["tariff"]["bytes"],
            "tariff_is_not_invoice": True,
            "tariff_is_not_quality": True,
            "consumer_rules_from_official_pages": [
                "Written estimate only after visual inspection of the goods",
                "Verbal or internet-only estimates are prohibited",
                "Not-to-exceed price required for household moves",
                "Additional services require a Change Order for Moving Services",
                "Valuation / additional protection choices are in the official consumer booklet",
                "Required documents include the moving services agreement and Important Notice About Your Move",
            ],
            "laws_url": "https://bhgs.dca.ca.gov/laws/hhm_law_book_eff_1_1_26.pdf",
        },
        "insurance": {
            "source": "https://bhgs.dca.ca.gov/licensee/hhm_faqs.shtml",
            "coverage": "APPLICATION_FILING_REQUIREMENT / CERTIFICATE_SEARCH_OR_REQUEST",
            "liability_minimums": "GO 100: $250,000 BI one person; $500,000 BI more than one person; $100,000 property damage other than cargo; or $600,000 combined single limit",
            "cargo_minimum": "GO 136: $20,000 per shipment",
            "workers_comp": "when applicable",
            "forms": ["TL 676 liability certificate", "TL 672 cargo certificate"],
            "license_is_not_confirmed_current_insurance": True,
            "no_insured_badge_from_permit": True,
        },
        "complaints": {
            "path": "https://connect.dca.ca.gov/bhgs/public/submitcomplaint/bhgs",
            "form_pdf": "https://bhgs.dca.ca.gov/forms_pubs/complaint_form.pdf",
            "coverage": "OPEN_SEARCH / CONSUMER COMPLAINT PROCESS",
            "bulk_report": "SOURCE_NOT_ACQUIRED",
            "complaint_is_not_violation": True,
            "no_complaint_is_not_clean": True,
            "loss_damage_claim_window": "written claim within nine months after delivery (official consumer page)",
        },
        "contacts": {
            "state_roster_contacts": "NOT_SCRAPED",
            "fmcsa_contacts_remain_federal_source": True,
            "provenance_separate": True,
        },
        "verify": {
            "bhgs_search": "https://search.dca.ca.gov/hhm_search",
            "bhgs_home": "https://bhgs.dca.ca.gov/",
            "bhgs_enforcement": "https://bhgs.dca.ca.gov/enforcement/lookup.shtml",
            "intrastate_tips": "https://bhgs.dca.ca.gov/forms_pubs/moving_tips_flyer_ca.pdf",
            "interstate_tips": "https://bhgs.dca.ca.gov/forms_pubs/moving_tips_flyer_into_out_ca.pdf",
            "fmcsa_safer": "https://safer.fmcsa.dot.gov/",
            "movetrusthub_federal": "/companies?state=CA",
            "movetrusthub_verify_dot": "/verify-dot",
        },
        "findings": [
            {
                "id": "cal-t-vs-usdot",
                "text": "California household-goods moves inside the state are licensed by BHGS under a Household Mover permit identified as a CAL-T number. That is not a USDOT number and not FMCSA interstate authority. CPUC is not the current regulator; household-goods authority transferred to BHGS.",
            },
            {
                "id": "no-bulk-roster",
                "text": "No official bulk CAL-T mover roster was acquired. Public verification is OPEN_SEARCH_ONLY at search.dca.ca.gov/hhm_search. The complete California licensed-mover count is UNKNOWN, not zero.",
            },
            {
                "id": "enforcement-19237",
                "text": f"The official BHGS citations table includes {e['rows']} rows whose violation section is 19237 (household-mover permit). {e['unlicensed_rows']} are marked UNLICENSED and {e['exact_cal_t_rows']} carry a CAL-T/T number. A citation is not a revocation. A listed fine amount is not confirmed paid. Name-only unlicensed rows are not attached to MoveTrustHub profiles.",
            },
            {
                "id": "max-rate-tariff",
                "text": "BHGS publishes Maximum Rate Tariff 4 effective January 1, 2026. The tariff sets maximum rates and rules for moves within California. A tariff is not an actual invoice and not a quality score. Written estimates after visual inspection and a not-to-exceed price are official consumer rules.",
            },
        ],
        "evidence_depth": [
            {
                "family": "BHGS authority",
                "source": "https://bhgs.dca.ca.gov/",
                "agency": "BHGS / DCA",
                "as_of": "2026-09-03",
                "grain": "regulator / permit class",
                "identity": "CAL-T Household Mover permit",
                "access_class": "OPEN_OFFICIAL",
                "rows": None,
                "limitations": "No bulk roster. CPUC terminology is historical.",
            },
            {
                "family": "California license verification",
                "source": "https://search.dca.ca.gov/hhm_search",
                "agency": "DCA / BHGS",
                "as_of": "2026-09-03",
                "grain": "individual permit search",
                "identity": "CAL-T",
                "access_class": "OPEN_SEARCH_ONLY",
                "rows": None,
                "limitations": "Not scraped. Complete count UNKNOWN.",
            },
            {
                "family": "FMCSA",
                "source": "MoveTrustHub FMCSA-keyed publishable companies",
                "agency": "FMCSA",
                "as_of": "live directory when available",
                "grain": "publishable company with CA headquarters",
                "identity": "USDOT",
                "access_class": "EXISTING_GRAPH",
                "rows": None,
                "limitations": "Not CAL-T. Not California licensed.",
            },
            {
                "family": "state enforcement",
                "source": e["source"],
                "agency": "BHGS",
                "as_of": "2026-09-03",
                "grain": "BPC 19237 citation row",
                "identity": "CAL-T when present; name-only otherwise UNSAFE",
                "access_class": "OPEN_HTML_TABLE",
                "rows": e["rows"],
                "limitations": "Mixed BHGS industries on the same page; only 19237 counted. Citation ≠ revocation.",
            },
            {
                "family": "tariff/rate source",
                "source": REP["tariff"]["source"],
                "agency": "BHGS",
                "as_of": "2026-01-01",
                "grain": "Maximum Rate Tariff 4",
                "identity": "n/a",
                "access_class": "OPEN_PDF",
                "rows": None,
                "limitations": "Tariff ≠ invoice. Tariff ≠ quality.",
            },
            {
                "family": "insurance/financial responsibility",
                "source": "https://bhgs.dca.ca.gov/licensee/hhm_faqs.shtml",
                "agency": "BHGS",
                "as_of": "2026-09-03",
                "grain": "permit application filing minima (GO 100 / GO 136)",
                "identity": "n/a",
                "access_class": "OPEN_FAQ",
                "rows": None,
                "limitations": "Permit presence is not a live insurance certificate check.",
            },
            {
                "family": "complaint process",
                "source": "https://bhgs.dca.ca.gov/consumers/index.shtml",
                "agency": "BHGS",
                "as_of": "2026-09-03",
                "grain": "consumer complaint intake",
                "identity": "n/a",
                "access_class": "OPEN_SEARCH / CONSUMER PROCESS",
                "rows": None,
                "limitations": "No bulk complaint report acquired. Complaint ≠ violation.",
            },
            {
                "family": "consumer guide",
                "source": "https://bhgs.dca.ca.gov/consumers/movers.shtml",
                "agency": "BHGS",
                "as_of": "2026-09-03",
                "grain": "official consumer moving rules",
                "identity": "n/a",
                "access_class": "OPEN_HTML",
                "rows": None,
                "limitations": "Guidance, not a quote calculator.",
            },
        ],
        "coverage_gaps": [
            {"id": "cal-t-roster", "label": "Complete CAL-T mover roster", "state": "OPEN_SEARCH_ONLY / SOURCE_NOT_ACQUIRED"},
            {"id": "licensed-denominator", "label": "Complete current licensed-mover denominator", "state": "UNKNOWN"},
            {"id": "enforcement-history", "label": "Complete enforcement history", "state": "PARTIAL_HTML_TABLE"},
            {"id": "insurance-certificates", "label": "Current insurance certificate universe", "state": "SEARCH_OR_REQUEST"},
            {"id": "bulk-complaints", "label": "Bulk complaints", "state": "SOURCE_NOT_ACQUIRED"},
            {"id": "state-usdot-crosswalk", "label": "State CAL-T ↔ USDOT exact crosswalk", "state": "SOURCE_NOT_ACQUIRED"},
        ],
        "semantics": [
            "CAL-T != USDOT",
            "CALIFORNIA STATE AUTHORITY != FMCSA INTERSTATE AUTHORITY",
            "FMCSA ACTIVE != CALIFORNIA LICENSED",
            "CALIFORNIA LICENSED != INTERSTATE AUTHORIZED",
            "LICENSE != CONFIRMED CURRENT INSURANCE",
            "TARIFF != ACTUAL PRICE",
            "COMPLAINT != VIOLATION",
            "NOTICE != FINAL ACTION",
            "MISSING != ZERO",
            "NO TRUST SCORE",
            "NO PAID RANKING",
        ],
        "no_trust_score": True,
        "no_paid_ranking": True,
    }
    snapshot["fingerprint"] = fingerprint(snapshot)
    snapshot["generated_at"] = datetime.now(timezone.utc).replace(microsecond=0).isoformat()
    text = json.dumps(snapshot, indent=2, sort_keys=True, ensure_ascii=True) + "\n"
    OUT_TS.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_TS.write_text(text, encoding="utf-8")
    OUT_JSON.write_text(text, encoding="utf-8")
    print("fingerprint", snapshot["fingerprint"])
    print("wrote", OUT_TS)


if __name__ == "__main__":
    main()
