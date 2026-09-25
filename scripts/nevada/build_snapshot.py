#!/usr/bin/env python3
"""Freeze move-nv-state-intel-v1 (NV-MOVE-001). Standard library only.

Input: data/nevada/nv-move-001/roster.json (committed; produced by scripts/nevada/parse_nta.py).
Outputs: lib/nevada-intelligence/accepted-snapshot.json and accepted-roster.json.
generated_at is excluded from the fingerprint. --check rebuilds and fails on drift.
"""
from __future__ import annotations

import hashlib
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
ROSTER = ROOT / "data/nevada/nv-move-001/roster.json"
SNAP = ROOT / "lib/nevada-intelligence/accepted-snapshot.json"
ACCEPTED = ROOT / "lib/nevada-intelligence/accepted-roster.json"
GENERATED_AT = "2026-09-25T15:30:00Z"
FEDERAL_OBSERVED_AT = "2026-09-25T14:52:00Z"


def dumps(obj: object) -> str:
    return json.dumps(obj, sort_keys=True, separators=(",", ":"), ensure_ascii=False)


def semantic(body: dict) -> dict:
    return {k: v for k, v in body.items() if k not in {"generated_at", "fingerprint"}}


def build() -> tuple[dict, dict]:
    raw = json.loads(ROSTER.read_text(encoding="utf-8"))
    src, s = raw["source"], raw["summary"]
    rows = raw["rows"]
    active = [r for r in rows if r["classificationEvidence"] == "NTA_ACTIVE_CERTIFICATES_CATEGORY_MOVER"]
    other = [r for r in rows if r["classificationEvidence"] != "NTA_ACTIVE_CERTIFICATES_CATEGORY_MOVER"]
    if len(active) != s["activeMoverCategoryRows"] or len(rows) != s["hhgRows"]:
        raise SystemExit("roster summary drifted")
    body = {
        "version": "move-nv-state-intel-v1",
        "ticket": "NV-MOVE-001",
        "as_of": "2026-09-25",
        "generated_at": GENERATED_AT,
        "snapshotAsOf": "2026-09-25",
        "retrievedAt": src["retrievedAt"],
        "no_trust_score": True,
        "no_paid_ranking": True,
        "no_nevada_local_routes": True,
        "no_las_vegas_intelligence_page": True,
        "publication": {
            "canonical": "https://www.movetrusthub.com/nevada",
            "indexable": True,
            "robots": "index,follow",
            "route": "/nevada",
            "h1": "Nevada Moving & Household Goods Intelligence",
        },
        "regulator": {
            "agency": "Nevada Transportation Authority",
            "short": "NTA",
            "credential_term": "Certificate of Public Convenience and Necessity (CPCN) number as NTA prints it",
            "directory_url": src["directory"],
            "active_certificates_url": src["activeCertificatesIndex"],
            "active_mover_category_url": src["activeMoverCategory"],
            "complaints_url": src["complaints"],
            "hhg_complaint_form_url": "http://hal.nv.gov/form/NTA/Household_Goods_Mover_Complaint",
            "notices_url": src["notices2026"],
            "intrastate_only": True,
            "interstate_regulator": "FMCSA",
            "interstate_statement": "The Nevada Transportation Authority does not have jurisdiction over interstate service. Interstate service is defined as services originating in one State and ending in another State.",
        },
        "clocks": {
            "generatedAt": GENERATED_AT,
            "snapshotAsOf": "2026-09-25",
            "retrievedAt": src["retrievedAt"],
            "sourceAsOf": None,
            "do_not_use_retrieval_as_authority_effective_date": True,
            "nta_directory": {"sourceAsOf": None, "retrievedAt": src["retrievedAt"], "sha256": src["directorySha256"], "note": "The directory prints no as-of date."},
            "nta_active_mover_list": {"sourceAsOf": None, "retrievedAt": src["retrievedAt"], "sha256": src["activeMoverSha256"], "note": "The Active Certificates page prints no as-of date."},
            "tariffs": {
                "effectiveDates": "NOT_ACQUIRED",
                "note": "Tariffs are scanned documents; their issued, accepted and effective dates are stamps that OCR reads unreliably, so no tariff date is published. Retrieval is not a tariff date.",
            },
            "notices": {"window": "2026 public notices", "dates": "notice date as printed per row"},
            "federal_overlay_observedAt": FEDERAL_OBSERVED_AT,
        },
        "directory": {
            "coverage": "KNOWN",
            "NV_NTA_DIRECTORY_ROWS": s["directoryRows"],
            "NV_NTA_DIRECTORY_STATUS_TEXTS": s["directoryStatusTexts"],
            "all_transportation_classes": True,
            "has_class_column": False,
            "note": "The Tariffs & Certificates directory lists every NTA class (towing, limousine, charter bus, taxi, movers and others) by corporate name. It is not a mover list and is never counted as movers.",
        },
        "current_hhg_roster": {
            "coverage": "KNOWN",
            "classification": "NTA Active Certificates category 'Mover', plus directory rows whose NTA-filed certificate or tariff says household goods",
            "NV_NTA_HHG_ROWS": s["hhgRows"],
            "NV_NTA_HHG_DISTINCT_CPCN": s["hhgDistinctCpcnBase"],
            "NV_NTA_ACTIVE_MOVER_CERTIFICATES": len(active),
            "NV_NTA_ACTIVE_MOVER_STATUS_AS_PRINTED": s["activeMoverStatusAsPrinted"],
            "NV_NTA_HHG_DOCUMENT_EVIDENCE_NOT_ON_ACTIVE_LIST": len(other),
            "NV_NTA_HHG_DIRECTORY_STATUS_TEXT": s["hhgDirectoryStatusText"],
            "NV_NTA_ACTIVE_MOVER_DIRECTORY_MATCH": s["activeMoverDirectoryMatch"],
            "NV_NTA_3XXX_DIRECTORY_ROWS_EXCLUDED_AS_NOT_HHG": s["directory3xxxRowsExcludedAsNotHhg"],
            "NV_NTA_ACTIVE_WAREHOUSE_PERMITS": s["activeWarehousePermitRows"],
            "NV_NTA_HHG_EXACT_USDOT_JOINS": 0,
            "NV_NTA_HHG_EXACT_MC_JOINS": 0,
            "status_semantics": "Status is kept exactly as NTA prints it: 'Active' on the Active Certificates list; the directory prints status text only when there is one (Temporary Discontinuance, Revocation Pending Expiration, Other Pending OSC). No status is invented.",
            "name_is_not_class": "Company names were never used to classify. Six 3xxx-series directory rows are towing companies and are excluded.",
            "revision_suffix_note": "Three Active Mover certificates (3380.1, 3398.1, 3405.2) appear in the directory under the same certificate number with an earlier revision suffix; they are matched on that number, not on name.",
        },
        "tariff": {
            "model": "CARRIER_FILED_TARIFFS",
            "NV_NTA_HHG_TARIFF_LINKS": s["hhgWithTariffLink"],
            "NV_NTA_HHG_TARIFF_TITLE_SAYS_HOUSEHOLD_GOODS": s["hhgTariffTitleSaysHouseholdGoods"],
            "NV_NTA_HHG_TARIFF_SCANNED_WITHOUT_TEXT": s["hhgTariffScannedWithoutText"],
            "not_a_quote": True,
            "not_a_statewide_rate": True,
            "not_interstate": True,
            "rate_sheets_parsed": False,
            "note": "Each mover files its own tariff naming rates, charges and rules within the territory in its certificate. A tariff is not a quote and there is no statewide Nevada moving price.",
        },
        "applications": {
            "coverage": "PARTIAL",
            "window": "2026 public notices",
            "NV_NTA_2026_NOTICES": s["notices2026Rows"],
            "NV_NTA_2026_HHG_APPLICATION_NOTICES": s["notices2026HhgApplications"],
            "application_is_not_a_cpcn": True,
            "rows": raw["notices2026Hhg"],
        },
        "complaints": {
            "coverage": "NOT_ACQUIRED",
            "intake": "KNOWN",
            "jurisdiction": "Moves within Nevada only; interstate moves go to FMCSA.",
            "company_level_records": "NOT_ACQUIRED",
            "outcomes": "REQUEST_ONLY",
            "count": None,
            "complaint_is_not_a_finding": True,
        },
        "existing_coverage_audit": {
            "federal_overlay": {
                "source": "MoveTrustHub production research search (FMCSA spine), recorded headquarters state NV",
                "observedAt": FEDERAL_OBSERVED_AT,
                "interstate_hhg_carriers_headquartered_nv": 44,
                "movers_in_nevada_public_identity_cohort": 46,
                "note": "Headquarters address is not NTA authority and not a service area. These are existing federal records and were not duplicated.",
            },
            "existing_nevada_routes": ["/moving-to/nevada (destination guide)", "/moving-to/nevada/[slug]", "/local-movers/nevada/[county]"],
            "state_intelligence_route_before": None,
            "nta_evidence_before": "NONE",
        },
        "identity": {
            "preferred": "NTA CPCN number as printed",
            "usdot_on_source": False,
            "mc_on_source": False,
            "name_only_join": "UNSAFE",
            "cpcn_is_not_usdot": True,
            "cpcn_is_not_mc": True,
            "zero_joins_is_not_zero_overlap": True,
        },
        "capabilities": {
            "nta_directory": "KNOWN",
            "nta_hhg_subset": "KNOWN",
            "nta_hhg_tariff_links": "KNOWN",
            "nta_hhg_tariff_effective_dates": "NOT_ACQUIRED",
            "nta_hhg_applications_2026": "PARTIAL",
            "complaint_intake": "KNOWN",
            "complaint_records": "NOT_ACQUIRED",
            "complaint_outcomes": "REQUEST_ONLY",
            "exact_nta_fmcsa_join": "UNKNOWN",
            "name_only_nta_fmcsa_join": "UNSUPPORTED",
            "combined_nta_fmcsa_mover_count": "UNSUPPORTED",
            "local_city_pages": "UNSUPPORTED",
        },
        "expansion_ledger": {
            "GRAPH_WRITES": 0,
            "NET_NEW_PUBLIC_PROFILES": 0,
            "EXACT_USDOT_JOINS": 0,
            "EXACT_MC_JOINS": 0,
            "PROFILE_ATTACHMENTS": 0,
        },
        "source_roster_sha256": hashlib.sha256(ROSTER.read_bytes().replace(b"\r\n", b"\n")).hexdigest(),
    }
    body["fingerprint"] = hashlib.sha256(dumps(semantic(body)).encode("utf-8")).hexdigest()
    accepted = {"rows": rows}
    return body, accepted


def main() -> None:
    body, accepted = build()
    snap_text = json.dumps(body, indent=2, ensure_ascii=False) + "\n"
    roster_text = json.dumps(accepted, indent=2, ensure_ascii=False) + "\n"
    if "--check" in sys.argv:
        for path, want in ((SNAP, snap_text), (ACCEPTED, roster_text)):
            if path.read_text(encoding="utf-8").replace("\r\n", "\n") != want:
                raise SystemExit(f"{path.relative_to(ROOT)} drifted from the builder")
        print("NV-MOVE-001 snapshot check OK", body["fingerprint"])
        return
    SNAP.parent.mkdir(parents=True, exist_ok=True)
    SNAP.write_text(snap_text, encoding="utf-8", newline="\n")
    ACCEPTED.write_text(roster_text, encoding="utf-8", newline="\n")
    print(body["fingerprint"], body["current_hhg_roster"]["NV_NTA_HHG_ROWS"], body["current_hhg_roster"]["NV_NTA_ACTIVE_MOVER_CERTIFICATES"])


if __name__ == "__main__":
    main()
