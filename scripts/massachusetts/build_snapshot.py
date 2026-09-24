#!/usr/bin/env python3
"""Freeze move-ma-state-intel-v1. generated_at is excluded from the fingerprint."""
from __future__ import annotations

import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
ROSTER = ROOT / "data/massachusetts/ma-move-001/roster.json"
SNAP = ROOT / "lib/massachusetts-intelligence/accepted-snapshot.json"
ACCEPTED = ROOT / "lib/massachusetts-intelligence/accepted-roster.json"
PAGE = "https://www.mass.gov/info-details/moving-companies-regulated-by-the-department-of-public-utilities-dpu"


def dumps(obj: object) -> str:
    return json.dumps(obj, sort_keys=True, separators=(",", ":"), ensure_ascii=False)


def semantic(body: dict) -> dict:
    return {k: v for k, v in body.items() if k not in {"generated_at", "fingerprint"}}


def main() -> None:
    raw = json.loads(ROSTER.read_text(encoding="utf-8"))
    source, summary = raw["source"], raw["summary"]
    generated = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    body = {
        "version": "move-ma-state-intel-v1",
        "ticket": "MA-MOVE-001",
        "as_of": "2026-09-24",
        "generated_at": generated,
        "snapshotAsOf": "2026-09-24",
        "retrievedAt": source["retrievedAt"],
        "no_trust_score": True,
        "no_paid_ranking": True,
        "no_massachusetts_local_routes": True,
        "no_boston_intelligence_page": True,
        "publication": {
            "canonical": "https://www.movetrusthub.com/massachusetts",
            "indexable": True,
            "robots": "index,follow",
            "route": "/massachusetts",
            "h1": "Massachusetts Moving & Household Goods Intelligence",
        },
        "regulator": {
            "agency": "Massachusetts Department of Public Utilities",
            "division": "Transportation Oversight Division",
            "short": "Massachusetts DPU",
            "credential_term": "DPU certificate number on the list of moving companies regulated by the Transportation Oversight Division",
            "list_url": PAGE,
            "csv_url": source["csv"],
            "guide_url": "https://www.mass.gov/guides/moving-within-massachusetts",
            "complaint_form_url": "https://www.mass.gov/forms/file-a-complaint-against-a-bus-moving-or-towing-company",
            "division_url": "https://www.mass.gov/orgs/transportation-oversight-division",
            "complaint_email": "DPU.Transportation@mass.gov",
            "complaint_phone": "(617) 305-3559",
            "intrastate_only": True,
            "interstate_regulator": "FMCSA",
        },
        "clocks": {
            "generatedAt": generated,
            "snapshotAsOf": "2026-09-24",
            "retrievedAt": source["retrievedAt"],
            "sourceAsOf": source["pageLastUpdated"],
            "do_not_use_retrieval_as_authority_effective_date": True,
            "dpu_list": {
                "sourceAsOf": source["pageLastUpdated"],
                "pageDatePublished": source["pageDatePublished"],
                "pageLastUpdated": source["pageLastUpdated"],
                "csvHttpLastModified": source["csvHttpLastModified"],
                "csvFileLabel": source["csvFileLabel"],
                "retrievedAt": source["retrievedAt"],
                "note": "The page states it is updated as of the LAST UPDATED date printed at its foot (June 16, 2026). The CSV file name says February 2026; that label is recorded verbatim and not used as a clock.",
            },
            "tariffs": {
                "effectiveDates": "NOT_ACQUIRED_AT_LIST_GRAIN",
                "note": "The list links each carrier's filed tariff but prints no effective date. Individual tariff documents were not parsed; link labels are not effective dates.",
            },
        },
        "current_hhg_roster": {
            "coverage": "ACQUIRED_OFFICIAL_LIST_SNAPSHOT",
            "MA_DPU_HHG_ROSTER_STATUS": "OFFICIAL_CSV_SNAPSHOT",
            "MA_DPU_HHG_LISTING_ROWS": summary["rows"],
            "MA_DPU_HHG_DISTINCT_CERTIFICATES": summary["distinctCertificates"],
            "MA_DPU_HHG_ROWS_MISSING_CERTIFICATE": summary["rowsMissingCertificate"],
            "MA_DPU_HHG_DUPLICATE_CERTIFICATES": len(summary["duplicateCertificates"]),
            "MA_DPU_HHG_ROWS_WITH_DBA": summary["rowsWithDba"],
            "MA_DPU_HHG_MA_BUSINESS_ADDRESS_ROWS": summary["massachusettsBusinessAddressRows"],
            "MA_DPU_HHG_OUT_OF_STATE_BUSINESS_ADDRESS_ROWS": summary["outOfStateBusinessAddressRows"],
            "MA_DPU_HHG_BOSTON_CITY_ROWS": summary["bostonCityRows"],
            "MA_DPU_HHG_EXACT_USDOT_JOINS": 0,
            "MA_DPU_HHG_EXACT_MC_JOINS": 0,
            "status_semantics": "LISTED_ON_DPU_REGULATED_HHG_MOVER_LIST",
            "status_note": "DPU describes this as the list of companies its Transportation Oversight Division regulates to move household goods within Massachusetts. It prints no Active/Inactive column. Listing is not a separate enforcement finding and not FMCSA interstate authority.",
            "address_note": "City/Town and State are the business address DPU prints. An out-of-state address does not mean interstate authority, and a city is not a service area.",
        },
        "tariff": {
            "model": "CARRIER_FILED_TARIFFS",
            "MA_DPU_TARIFF_POSTED_ROWS": summary["tariffPostedRows"],
            "MA_DPU_TARIFF_PENDING_ROWS": summary["tariffPendingRows"],
            "MA_DPU_DISTINCT_TARIFF_DOCUMENTS": summary["distinctTariffUrls"],
            "MA_DPU_ROWS_SHARING_A_TARIFF_DOCUMENT": summary["rowsSharingATariffUrl"],
            "filed_rate_rule": "Moving companies must file their rates with the DPU and may not charge more or less than the rates on file.",
            "filed_rate_rule_source": "https://www.mass.gov/guides/moving-within-massachusetts",
            "not_a_quote": True,
            "not_a_statewide_maximum_rate_tariff": True,
            "not_interstate": True,
            "rate_sheets_parsed": False,
        },
        "complaints": {
            "coverage": "NOT_ACQUIRED",
            "intake": "KNOWN",
            "disposition_dataset": "REQUEST_ONLY",
            "public_complaint_page_status": "HTTP 404 at retrieval (https://www.mass.gov/how-to/find-complaints-on-bus-moving-and-tow-companies)",
            "count": None,
        },
        "identity": {
            "preferred": "Massachusetts DPU certificate number printed on the regulated movers list",
            "usdot_on_source": False,
            "mc_on_source": False,
            "name_only_join": "UNSAFE",
            "dpu_certificate_is_not_fmcsa": True,
        },
        "expansion_ledger": {
            "GRAPH_WRITES": 0,
            "NET_NEW_PUBLIC_PROFILES": 0,
            "EXACT_USDOT_JOINS": 0,
            "EXACT_MC_JOINS": 0,
            "PROFILE_ATTACHMENTS": 0,
        },
        "source_csv_sha256": source["csvSha256"],
    }
    body["fingerprint"] = hashlib.sha256(dumps(semantic(body)).encode("utf-8")).hexdigest()
    SNAP.parent.mkdir(parents=True, exist_ok=True)
    SNAP.write_text(json.dumps(body, indent=2) + "\n", encoding="utf-8")
    ACCEPTED.write_text(json.dumps({"rows": raw["rows"]}, indent=2) + "\n", encoding="utf-8")
    print(body["fingerprint"], summary["rows"], summary["distinctCertificates"])


if __name__ == "__main__":
    main()
