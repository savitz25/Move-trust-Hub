#!/usr/bin/env python3
"""Build TX-MOVE-001 accepted snapshot. No TxMCCS scrape. No fake mover count."""
from __future__ import annotations

import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT_TS = ROOT / "lib/texas-intelligence/accepted-snapshot.json"
OUT_JSON = ROOT / "data/reports/tx-move-001-public-snapshot.json"
VERSION = "move-tx-state-intel-v1"
AS_OF = "2026-09-03"


def dump(obj: object) -> str:
    return json.dumps(obj, sort_keys=True, separators=(",", ":"), ensure_ascii=True)


def fingerprint(obj: dict) -> str:
    body = {k: v for k, v in obj.items() if k not in ("fingerprint", "generated_at")}
    return hashlib.sha256(dump(body).encode("utf-8")).hexdigest()


def main() -> None:
    snapshot = {
        "as_of": AS_OF,
        "authority": {
            "certificate_name": "TxDMV motor carrier certificate of registration (household goods)",
            "fmcsa_active_is_not_texas_intrastate_authorized": True,
            "identifier": "TxDMV certificate number (TxDMV No.)",
            "intrastate_meaning": "Moves performed entirely within Texas. Official TxDMV guidance: local/intrastate household-goods work requires a TxDMV certificate.",
            "license_count_published": None,
            "roster_coverage": "OPEN_SEARCH_ONLY / SOURCE_NOT_ACQUIRED",
            "state_authority_is_not_fmcsa": True,
            "texas_certificate_is_not_usdot": True,
            "texas_hhg_also_requires_usdot_number": True,
            "texas_hhg_usdot_is_not_interstate_operating_authority": True,
            "usdot_is_not_interstate_operating_authority_by_itself": True,
            "classes": {
                "TEXAS_INTRASTATE_HHG": {
                    "consumer_intrastate": True,
                    "covers": "For-hire transportation of household goods on Texas public roads, regardless of vehicle weight (Transportation Code ch. 643; 43 TAC ch. 218).",
                    "label": "TxDMV household-goods certificate of registration",
                    "not_a_substitute_for_fmcsa": True,
                },
                "FMCSA_INTERSTATE": {
                    "consumer_intrastate": False,
                    "covers": "Moves that cross a state line. Official TxDMV guidance: interstate operating authority is an FMCSA Motor Carrier (MC) number. Having one authority does not authorize the other.",
                    "label": "FMCSA interstate operating authority",
                    "not_a_substitute_for_txdmv": True,
                },
            },
        },
        "complaints": {
            "bulk_report": "SOURCE_NOT_ACQUIRED",
            "cms_note": "CES contains complaints filed after September 1, 2008. Complete history requires an open-records request or the consumer helpline. TxDMV does not settle loss/damage claims.",
            "complaint_is_not_violation": True,
            "coverage": "OPEN_SEARCH / CONSUMER COMPLAINT PROCESS",
            "helpline": "1-888-368-4689",
            "no_complaint_is_not_clean": True,
            "path": "https://apps.txdmv.gov/apps/mccs/cms",
            "path_intro": "https://apps.txdmv.gov/APPS/MCCS/CMS/new_complaint/Complaint_Intro.asp",
        },
        "contacts": {
            "fmcsa_contacts_remain_federal_source": True,
            "provenance_separate": True,
            "state_roster_contacts": "NOT_SCRAPED",
        },
        "consumer_rules": {
            "as_of": AS_OF,
            "source_clock": "Official TxDMV consumer pages and 43 TAC Chapter 218 household-goods rules as retrieved 2026-09-03",
            "tariff_is_not_invoice": True,
            "tariff_is_not_quality": True,
            "rules": [
                "Before loading, a household-goods carrier must give a written proposal stating the maximum amount the shipper could be required to pay (binding or not-to-exceed).",
                "A licensed mover must also provide a moving services contract before loading. Do not rely on verbal agreements.",
                "Licensed movers must provide the official Your Rights and Responsibilities When You Move in Texas information sheet before loading.",
                "Additional charges after the contract is signed require written agreement by both parties.",
                "Licensed movers must have a tariff (maximum rates/charges) on file with TxDMV.",
                "The contract must clearly disclose the mover's liability for loss or damage. Parties may agree to $0.00 liability; that is not insurance.",
                "Loss/damage claims are first filed in writing with the mover. TxDMV does not settle claims.",
                "Household-goods carriers have 90 days from receipt of a claim to pay, decline, or make a firm settlement offer in writing.",
                "A shipper may request TxDMV mediation within 35 days after an unsatisfactory offer or denial, or after 90 days with no mover response.",
                "Licensed movers must mark trucks with the company name, TxDMV certificate number, and USDOT number.",
            ],
            "sources": [
                "https://www.txdmv.gov/motorists/consumer-protection/dont-make-a-move",
                "https://www.txdmv.gov/sites/default/files/body-files/hhgbrochure.pdf",
                "https://www.txdmv.gov/sites/default/files/body-files/SmartBuyer_SmartMoving.pdf",
                "https://www.txdmv.gov/sites/default/files/body-files/moving_checklist.pdf",
            ],
        },
        "coverage_gaps": [
            {
                "id": "tx-hhg-roster",
                "label": "Complete Texas household-goods mover roster",
                "state": "OPEN_SEARCH_ONLY / SOURCE_NOT_ACQUIRED",
            },
            {
                "id": "licensed-denominator",
                "label": "Complete current Texas household-goods certificate denominator",
                "state": "UNKNOWN",
            },
            {
                "id": "bulk-insurance-filings",
                "label": "Bulk current Form E / Form H&I filing universe",
                "state": "LOOKUP_ONLY / SOURCE_NOT_ACQUIRED",
            },
            {
                "id": "enforcement-history",
                "label": "Complete state enforcement / penalty history",
                "state": "PDF_SANCTION_SCHEDULE_ONLY / SOURCE_NOT_ACQUIRED",
            },
            {
                "id": "bulk-complaints",
                "label": "Bulk complaints",
                "state": "OPEN_SEARCH / CES AFTER 2008 / SOURCE_NOT_ACQUIRED",
            },
            {
                "id": "state-usdot-crosswalk",
                "label": "Statewide TxDMV certificate ↔ USDOT exact crosswalk",
                "state": "SOURCE_NOT_ACQUIRED",
            },
            {
                "id": "texas-counties",
                "label": "Texas county intelligence pages",
                "state": "OUT_OF_SCOPE_THIS_TICKET",
            },
        ],
        "crosswalk": {
            "coverage": "SOURCE_NOT_ACQUIRED",
            "exact_possible_on_individual_lookup": True,
            "name_only": "UNSAFE",
            "note": "An official TxMCCS/Truck Stop record that displays both a TxDMV number and a USDOT number can support an EXACT crosswalk for that looked-up record. No bulk mapping was acquired. Company-name matching is UNSAFE.",
        },
        "enforcement": {
            "agency": "Texas Department of Motor Vehicles",
            "bulk_case_file": "SOURCE_NOT_ACQUIRED",
            "citation_is_not_revocation": True,
            "coverage": "OFFICIAL_SANCTION_SCHEDULE_PDF / NO_BULK_CASE_ROSTER",
            "disciplinary_matrix": "https://www.txdmv.gov/sites/default/files/body-files/Motor-Carrier-Disciplinary-Matrix.pdf",
            "disciplinary_matrix_as_of": "2026-06-19",
            "name_only_is_unsafe": True,
            "profile_attachments": 0,
            "rows": None,
            "unlicensed_hhg_operation_is_a_violation_class": True,
        },
        "evidence_depth": [
            {
                "access_class": "OPEN_OFFICIAL",
                "agency": "TxDMV Motor Carrier Division",
                "as_of": AS_OF,
                "family": "TxDMV authority",
                "grain": "regulator / certificate class",
                "identity": "TxDMV certificate number",
                "limitations": "No bulk household-goods roster. Certificate is not FMCSA interstate authority.",
                "rows": None,
                "source": "https://www.txdmv.gov/motor-carriers/txdmv-number",
            },
            {
                "access_class": "OPEN_SEARCH_ONLY",
                "agency": "TxDMV / TxMCCS",
                "as_of": AS_OF,
                "family": "TxDMV lookup",
                "grain": "individual motor-carrier search",
                "identity": "TxDMV No. / name / USDOT",
                "limitations": "Not scraped. Complete count UNKNOWN. Truck Stop is the official public lookup; TxMCCS hosts Search Records with no login.",
                "rows": None,
                "source": "https://txmccs.txdmv.gov/",
            },
            {
                "access_class": "OPEN_SEARCH / FILING REQUIREMENT",
                "agency": "TxDMV",
                "as_of": AS_OF,
                "family": "insurance filings",
                "grain": "Form E liability / Form H&I cargo filing on a looked-up record",
                "identity": "TxDMV certificate when present on the lookup",
                "limitations": "No bulk filing universe. Certificate presence is not an insured badge. Form E / H&I is not a quality signal.",
                "rows": None,
                "source": "https://www.txdmv.gov/motor-carriers/how-to-be-a-motor-carrier",
            },
            {
                "access_class": "EXISTING_GRAPH",
                "agency": "FMCSA",
                "as_of": "live directory when available",
                "family": "FMCSA",
                "grain": "publishable company with Texas headquarters",
                "identity": "USDOT",
                "limitations": "Not a Texas household-goods certificate. FMCSA ACTIVE is not Texas intrastate authority.",
                "rows": None,
                "source": "MoveTrustHub FMCSA-keyed publishable companies",
            },
            {
                "access_class": "OPEN_PDF",
                "agency": "TxDMV",
                "as_of": "2026-06-19",
                "family": "state enforcement",
                "grain": "administrative sanction schedule",
                "identity": "n/a — not a case roster",
                "limitations": "Disciplinary matrix is penalty ranges, not a list of orders. No license-ID bulk attach.",
                "rows": None,
                "source": "https://www.txdmv.gov/sites/default/files/body-files/Motor-Carrier-Disciplinary-Matrix.pdf",
            },
            {
                "access_class": "OPEN_SEARCH / CONSUMER PROCESS",
                "agency": "TxDMV",
                "as_of": AS_OF,
                "family": "complaint process",
                "grain": "consumer complaint intake",
                "identity": "n/a",
                "limitations": "No bulk complaint report acquired. Complaint ≠ violation. CES after 2008 only.",
                "rows": None,
                "source": "https://apps.txdmv.gov/apps/mccs/cms",
            },
            {
                "access_class": "OPEN_HTML / OPEN_PDF",
                "agency": "TxDMV",
                "as_of": AS_OF,
                "family": "consumer rules",
                "grain": "official household-goods consumer protections",
                "identity": "n/a",
                "limitations": "Guidance, not a quote calculator. Tariff ≠ invoice.",
                "rows": None,
                "source": "https://www.txdmv.gov/motorists/consumer-protection/dont-make-a-move",
            },
            {
                "access_class": "ATH_TX_001_READ_ONLY",
                "agency": "TDLR",
                "as_of": "ATH-TX-001",
                "family": "TDLR tow data as separate adjacent family",
                "grain": "TDLR TowCompanies certificate row",
                "identity": "TDLR tow company — not HHG",
                "limitations": "3,797 tow rows are not household-goods movers. Not used in the HHG hero.",
                "rows": 3797,
                "source": "TDLR TowCompanies.csv (ATH-TX-001)",
            },
        ],
        "federal": {
            "coverage": "LIVE_DIRECTORY_WHEN_AVAILABLE",
            "directory_href": "/companies?state=TX",
            "disclaimer": "Federal interstate authority and Texas intrastate household-goods authority are separate. FMCSA ACTIVE is not Texas intrastate authorized. A TxDMV certificate is not FMCSA interstate operating authority. A USDOT number is not interstate operating authority by itself.",
            "fmcsa_safer": "https://safer.fmcsa.dot.gov/",
            "grain": "MoveTrustHub publishable company profiles with Texas headquarters (FMCSA-keyed), not TxDMV household-goods certificates",
            "hq_count_committed": None,
            "label": "FMCSA interstate records with a Texas business/HQ location",
            "verify_href": "/verify-dot",
        },
        "findings": [
            {
                "id": "txdmv-vs-fmcsa",
                "text": "Texas household-goods moves entirely inside the state are regulated by the Texas Department of Motor Vehicles. The credential is a TxDMV motor carrier certificate of registration (TxDMV No.). Official TxDMV guidance: interstate work requires FMCSA operating authority (an MC number). Having one authority does not authorize the other. A USDOT number is not interstate operating authority by itself.",
            },
            {
                "id": "no-bulk-roster",
                "text": "No official bulk Texas household-goods mover roster was acquired. Public verification is OPEN_SEARCH_ONLY through TxMCCS / Truck Stop Motor Carrier Lookup. The complete Texas licensed-mover count is UNKNOWN, not zero. This page does not invent a general-contractor-style mover universe.",
            },
            {
                "id": "insurance-filings",
                "text": "Household-goods carriers must have Form E (liability) and Form H&I (cargo) filed electronically by the insurer before a certificate is granted. Official TxDMV guidance: Truck Stop publishes insurance data so anyone can look up whether a company's filings are current. That lookup is record-specific. A TxDMV certificate is not an insured badge on this page. Form E / H&I is not a quality signal.",
            },
            {
                "id": "consumer-protections",
                "text": "Official TxDMV consumer rules for Texas intrastate household-goods moves include a written proposal before loading, a moving services contract, the Rights and Responsibilities sheet, a tariff on file, and a claims/mediation path. TxDMV does not settle loss-or-damage claims. A tariff is not an invoice.",
            },
            {
                "id": "tow-not-hhg",
                "text": "TDLR TowCompanies is a separate transportation-business family (3,797 rows in ATH-TX-001). A tow company is not a household-goods mover. Tow counts are not part of this mover universe and are not used in the hero.",
            },
        ],
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "insurance": {
            "cargo_form": "Form H & I — proof of cargo insurance, filed electronically by the insurer",
            "cargo_minimums": "Official Form 1899H / handbook: $5,000 loss of a single shipper's cargo on any one vehicle; $10,000 aggregate for multiple shippers on any one vehicle",
            "coverage": "LOOKUP_CAN_SHOW_CURRENT_FILING / BULK_UNIVERSE_NOT_ACQUIRED",
            "form_k": "Form K — notice of cancellation for liability and cargo",
            "liability_form": "Form E — proof of liability insurance, filed electronically by the insurer",
            "liability_minimums": "Official Form 1899H / handbook: $300,000 for household-goods vehicles under 26,000 lbs GVWR/registered/gross weight rating; $500,000 above 26,000 lbs",
            "license_is_not_confirmed_current_insurance": True,
            "lookup_can_establish_current_filing_for_that_record": True,
            "no_insured_badge_from_certificate": True,
            "source": "https://www.txdmv.gov/motor-carriers/how-to-be-a-motor-carrier",
        },
        "lookup": {
            "access": "OPEN_SEARCH_ONLY",
            "fields_documented_from_official_materials": [
                "company name",
                "TxDMV certificate number",
                "USDOT number",
                "certificate status (consumer page: Active means licensed)",
                "insurance filing data (official: Truck Stop publishes whether filings are current)",
                "tariff on file (official consumer materials)",
            ],
            "not_scraped": True,
            "one_record_can_establish": "For that looked-up carrier: whether a TxDMV certificate appears, whether status is presented as Active, and — when the lookup shows it — whether insurance filings are current and whether a USDOT number is associated. That is not a bulk denominator.",
            "search_keys_official": ["Name", "TxDMV number", "USDOT number"],
            "url": "https://txmccs.txdmv.gov/",
            "url_consumer": "https://www.txdmv.gov/motorists/consumer-protection/dont-make-a-move",
        },
        "no_paid_ranking": True,
        "no_trust_score": True,
        "publication": {
            "canonical": "https://www.movetrusthub.com/texas",
            "indexable": True,
            "no_texas_counties": True,
            "rankings": False,
            "robots": "index,follow",
            "route": "/texas",
            "trustScore": False,
        },
        "regulator": {
            "agency": "Texas Department of Motor Vehicles",
            "department": "Motor Carrier Division",
            "home_url": "https://www.txdmv.gov/motor-carriers",
            "identifier": "TxDMV certificate number (TxDMV No.)",
            "not_the_current_regulator": "Texas Department of Transportation (historical TxDOT number; authority is now TxDMV)",
            "program": "Intrastate motor carrier registration — household goods",
            "short": "TxDMV",
            "statute": "Texas Transportation Code Chapter 643; 43 TAC Chapter 218",
            "verification_coverage": "OPEN_SEARCH_ONLY",
            "verification_url": "https://txmccs.txdmv.gov/",
        },
        "semantics": [
            "TX STATE AUTHORITY != USDOT",
            "USDOT != INTERSTATE OPERATING AUTHORITY BY ITSELF",
            "FMCSA ACTIVE != TEXAS INTRASTATE AUTHORIZED",
            "STATE AUTHORITY != CURRENT INSURANCE UNLESS FILING PROVES IT",
            "FORM E / H&I != QUALITY SIGNAL",
            "TOW COMPANY != HOUSEHOLD-GOODS MOVER",
            "COMPLAINT != VIOLATION",
            "MISSING != ZERO",
            "NO TRUST SCORE",
            "NO PAID RANKING",
        ],
        "ticket": "TX-MOVE-001",
        "tow": {
            "count_from_ath_tx_001": 3797,
            "hero_inclusion": False,
            "note": "Texas tow-company data exists separately and is not part of this household-goods mover universe.",
            "source": "TDLR TowCompanies.csv via ATH-TX-001",
            "tow_company_is_not_hhg_mover": True,
        },
        "verify": {
            "cms": "https://apps.txdmv.gov/apps/mccs/cms",
            "consumer": "https://www.txdmv.gov/motorists/consumer-protection/dont-make-a-move",
            "fmcsa_safer": "https://safer.fmcsa.dot.gov/",
            "how_to_be_a_carrier": "https://www.txdmv.gov/motor-carriers/how-to-be-a-motor-carrier",
            "movetrusthub_federal": "/companies?state=TX",
            "movetrusthub_verify_dot": "/verify-dot",
            "protect_your_move": "https://www.protectyourmove.gov/",
            "txdmv_home": "https://www.txdmv.gov/motor-carriers",
            "txdmv_number": "https://www.txdmv.gov/motor-carriers/txdmv-number",
            "txmccs": "https://txmccs.txdmv.gov/",
        },
        "version": VERSION,
    }
    snapshot["fingerprint"] = fingerprint(snapshot)
    OUT_TS.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    text = json.dumps(snapshot, indent=2, ensure_ascii=True) + "\n"
    OUT_TS.write_text(text, encoding="utf-8")
    OUT_JSON.write_text(text, encoding="utf-8")
    print("wrote", OUT_TS)
    print("fingerprint", snapshot["fingerprint"])
    print("roster", snapshot["authority"]["roster_coverage"])
    print("gate_ready", snapshot["authority"]["license_count_published"] is None)


if __name__ == "__main__":
    main()
