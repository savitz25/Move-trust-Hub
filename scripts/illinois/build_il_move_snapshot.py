#!/usr/bin/env python3
"""Build move-il-state-intel-v1 from frozen audit (no network)."""
from __future__ import annotations

import copy
import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
LIB = ROOT / "lib" / "illinois-intelligence"
ART = ROOT / "artifacts"
DATA = ROOT / "data" / "illinois"
VOLATILE = frozenset({"fingerprint", "generated_at"})


def dump(obj: object) -> str:
    return json.dumps(obj, sort_keys=True, separators=(",", ":"), ensure_ascii=True)


def semantic_body(obj: dict) -> dict:
    out = {}
    for key, value in obj.items():
        if key in VOLATILE:
            continue
        if key == "clocks" and isinstance(value, dict):
            clocks = {ck: cv for ck, cv in value.items() if ck != "generatedAt"}
            out[key] = clocks
        else:
            out[key] = value
    return out


def fingerprint(body: dict) -> str:
    return hashlib.sha256(dump(semantic_body(body)).encode("utf-8")).hexdigest()


def main() -> None:
    generated = datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    body = {
        "version": "move-il-state-intel-v1",
        "ticket": "IL-MOVE-001",
        "as_of": None,
        "generated_at": generated,
        "snapshotAsOf": "2026-09-12",
        "retrievedAt": "2026-09-12",
        "retrievedAtPrecision": "date",
        "retrievedAtExactUnknown": True,
        "no_trust_score": True,
        "no_paid_ranking": True,
        "no_illinois_local_routes": True,
        "no_chicago_page": True,
        "no_cook_page": True,
        "no_ask_illinois": True,
        "publication": {
            "canonical": "https://www.movetrusthub.com/illinois",
            "indexable": True,
            "robots": "index,follow",
            "route": "/illinois",
            "rankings": False,
            "trustScore": False,
            "h1": "Illinois Moving Company Research",
        },
        "uiGrains": {
            "currentHhgRoster": "VISIBLE_SUPPORTING_CONTEXT",
            "federalOverlay": "VISIBLE_SUPPORTING_CONTEXT",
            "complaints": "VISIBLE_SUPPORTING_CONTEXT",
            "enforcement": "VISIBLE_SUPPORTING_CONTEXT",
            "insurance": "VISIBLE_SUPPORTING_CONTEXT",
            "otherCarrierClasses": "VISIBLE_SUPPORTING_CONTEXT",
        },
        "regulator": {
            "agency": "Illinois Commerce Commission — Transportation Division",
            "short": "ICC",
            "hhg_url": "https://icc.illinois.gov/authority/household-goods-movers",
            "mcis_search_url": "https://icc.illinois.gov/emdb/mcis/search",
            "complaint_url": "https://icc.illinois.gov/Complaints",
            "complaint_email": "ICC.Moving@illinois.gov",
            "complaint_phone": "217-782-6448",
            "pcc_url": "https://icc.illinois.gov/authority/public-carrier-certificate",
            "transportation_url": "https://icc.illinois.gov/transportation/",
            "consumer_guide_url": "https://icc.illinois.gov/downloads/public/mc/2026ConsumerGuide.pdf",
            "statute": "625 ILCS 5/18c-1101 et seq.",
            "rules": "92 Ill. Adm. Code 1457",
        },
        "clocks": {
            "generatedAt": generated,
            "snapshotAsOf": "2026-09-12",
            "hhg_roster": {
                "sourceUpdatedAt": None,
                "sourceAsOf": None,
                "retrievedAt": "2026-09-12",
                "note": "Search-only currentness. Do not fake sourceAsOf from retrieval time.",
            },
            "do_not_use_ticket_date_as_source": True,
        },
        "current_hhg_roster": {
            "coverage": "OPEN_SEARCH_ONLY",
            "CURRENT_IL_HHG_AUTHORIZED_ROSTER": "OPEN_SEARCH_ONLY",
            "rows": None,
            "distinctAuthorityIds": None,
            "activeRows": None,
            "activeDistinctAuthorityIds": None,
            "blankIds": None,
            "duplicates": None,
            "reason": "Official Find a Licensed Household Goods Mover path is ICC Motor Carrier Information System Entity Search with CAPTCHA. No complete current Household Goods roster CSV/XLSX/API was published. Search-only is not zero.",
            "native_id_field": "ILCC",
            "license_row_ne_unique_company": True,
        },
        "identity": {
            "native_id_field": "ILCC",
            "namespace": None,
            "namespace_note": "Entity profiles print ILCC as the source-native identifier. Do not mint IL-ICC-HHG:{n} until a household-goods-only bulk roster is acquired. ILCC numbers are also used for Public Carrier Certificate, warehousing, and towing classes.",
            "usdot_alone_is_not_il_intrastate_authority": True,
            "mc_alone_is_not_il_intrastate_authority": True,
            "ilcc_ne_usdot": True,
            "ilcc_ne_mc": True,
            "hhg_license_ne_pcc": True,
        },
        "other_carrier_classes": {
            "public_carrier_certificate": {
                "coverage": "OPEN_SEARCH_ONLY",
                "rows": None,
                "note": "PCC authorizes for-hire property other than household goods. Not a household-goods mover universe.",
            },
            "relocation_towing": {"coverage": "LABEL_AND_MOVE_ON", "rows": None},
            "warehousing": {"coverage": "LABEL_AND_MOVE_ON", "rows": None},
            "do_not_sum_classes": True,
        },
        "federal": {
            "name_only": "UNSAFE",
            "name_plus_address": "REVIEW_REQUIRED",
            "exact_state_to_usdot_crosswalks": 0,
            "exact_state_to_mc_crosswalks": 0,
            "conflicting_exact_ids": 0,
            "review_required_crosswalks": 0,
            "rejected_name_only_crosswalks": 0,
            "icc_authority_ne_usdot": True,
            "usdot_ne_active_interstate_authority": True,
            "state_mover_ne_federal_mover": True,
            "hq_geography_ne_icc_authority": True,
            "overlay_note": "Existing MoveTrustHub FMCSA spine is reused. An Illinois-address USDOT carrier is not an ICC-authorized intrastate household-goods mover. No national FMCSA redownload.",
        },
        "complaints": {
            "coverage": "OPEN_SEARCH_ONLY",
            "IL_STATE_COMPLAINT_OBSERVATIONS": None,
            "path": "ICC.Moving@illinois.gov / 217-782-6448; File a Complaint; MCIS entity pages display a complaint-on-file window. No bulk complaint table acquired.",
            "complaint_ne_violation": True,
            "complaint_ne_quality": True,
            "missing_bulk_ne_zero": True,
            "do_not_substitute_fmcsa_complaints": True,
        },
        "enforcement": {
            "coverage": "OPEN_SEARCH_ONLY",
            "IL_STATE_ENFORCEMENT_OBSERVATIONS": None,
            "reason": "Revocation/suspension/cancellation appear on MCIS entity records and docket orders. No bounded household-goods-only enforcement bulk table was acquired.",
            "inactive_ne_criminal_conviction": True,
            "revoked_state_ne_fmcsa_oos": True,
            "federal_oos_ne_illinois_revocation": True,
        },
        "insurance": {
            "CURRENT_INSURANCE_COMPLIANCE": "OPEN_SEARCH_ONLY",
            "path": "MCIS entity profile insurance-on-file flags; Form E / Form H filings at grant. No bulk insurance extract.",
            "insurance_filing_ne_active_authority": True,
            "old_filing_ne_current_insurance": True,
            "insurance_ne_quality": True,
        },
        "authority_semantics": {
            "temporary_ne_permanent": True,
            "cab_card_ne_license": True,
            "annual_report_ne_current_authority": True,
            "pcc_ne_hhg": True,
            "warehouse_ne_hhg": True,
        },
        "claimEligibilityBroadened": False,
        "noCombinedIllinoisMoversTotal": True,
        "unknownIsNotZero": True,
        "searchOnlyIsNotZero": True,
        "expansion_ledger": {
            "IL_HHG_AUTHORITY_ROWS": None,
            "IL_HHG_DISTINCT_AUTHORITY_IDS": None,
            "IL_HHG_ACTIVE_ROWS": None,
            "IL_HHG_ACTIVE_DISTINCT_AUTHORITY_IDS": None,
            "IL_PROPERTY_CARRIER_ROWS": None,
            "IL_STATE_COMPLAINT_OBSERVATIONS": None,
            "IL_STATE_ENFORCEMENT_OBSERVATIONS": None,
            "EXACT_STATE_TO_USDOT_CROSSWALKS": 0,
            "EXACT_STATE_TO_MC_CROSSWALKS": 0,
            "REVIEW_REQUIRED_CROSSWALKS": 0,
            "REJECTED_NAME_ONLY_CROSSWALKS": 0,
            "EXACT_PROFILE_ATTACHMENTS": 0,
            "NET_NEW_STATE_RESEARCH_IDENTITIES": 0,
            "NET_NEW_CANONICAL_ORGANIZATIONS": 0,
            "NET_NEW_PUBLIC_MOVE_PROFILES": 0,
            "EXISTING_ORGANIZATIONS_ENRICHED": 0,
            "GRAPH_WRITES": 0,
            "baselines": {
                "prior_accepted_il_hhg_authority_ids": 0,
                "prior_accepted_il_state_research_identities": 0,
            },
        },
        "juiceSqueeze": [
            {
                "decision": "GRABBED — HIGH YIELD",
                "source": "ICC household-goods authority framework, ILCC identifier, MCIS entity search, statute/rules",
            },
            {
                "decision": "GRABBED — HIGH YIELD",
                "source": "Existing FMCSA federal overlay (not treated as ICC authority; no national redownload)",
            },
            {
                "decision": "GRABBED — EASY SECONDARY",
                "source": "Complaint path, insurance-on-file verification path, PCC class split, 2026 consumer guide URL",
            },
            {
                "decision": "LEFT — SEARCH ONLY",
                "source": "Current ICC MCIS Household Goods roster (CAPTCHA entity search)",
            },
            {
                "decision": "LEFT — SEARCH ONLY",
                "source": "Current insurance-on-file / complaint-on-file flags on entity pages",
            },
            {
                "decision": "LEFT — TOO MUCH WORK",
                "source": "Docket-by-docket HHG order archaeology; CAPTCHA MCIS scrape; FOIA",
            },
            {
                "decision": "LEFT — FUTURE",
                "source": "Chicago / Cook / local pages; Ask Illinois",
            },
        ],
    }
    fp1 = fingerprint(body)
    alt = copy.deepcopy(body)
    alt["generated_at"] = "2099-01-01T00:00:00Z"
    alt["clocks"]["generatedAt"] = "2099-01-01T00:00:00Z"
    if fingerprint(alt) != fp1:
        raise SystemExit("generatedAt leaked")
    body["fingerprint"] = fp1
    LIB.mkdir(parents=True, exist_ok=True)
    ART.mkdir(parents=True, exist_ok=True)
    DATA.mkdir(parents=True, exist_ok=True)
    text = json.dumps(body, indent=2) + "\n"
    (LIB / "accepted-snapshot.json").write_text(text, encoding="utf-8")
    (ART / "il-move-001-public-snapshot.json").write_text(text, encoding="utf-8")
    (DATA / "accepted-snapshot.json").write_text(text, encoding="utf-8")
    print(json.dumps({"fingerprint": fp1, "coverage": body["current_hhg_roster"]["coverage"]}, indent=2))


if __name__ == "__main__":
    main()
