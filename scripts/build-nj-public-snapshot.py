#!/usr/bin/env python3
"""Build NJ-MOVE-002 public snapshot from NJ-MOVE-001 parsers + official OSM HTML.

Does not commit raw HTML/PDF. Public OSM rows are source-level only (no profile attach).
"""
from __future__ import annotations

import hashlib
import json
from importlib.machinery import SourceFileLoader
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RAW_CANDIDATES = [
    ROOT / "data" / "nj-raw" / "pmw",
    Path(r"C:\Users\Michael.Savitsky\move-nj-move-001\data\nj-raw\pmw"),
]
mod = SourceFileLoader("nj_move_001", str(ROOT / "scripts" / "nj-move-001.py")).load_module()

URL_2025 = "https://www.njoag.gov/division-of-consumer-affairs-undercover-enforcement-operations-result-in-notices-of-violations-against-18-unregistered-home-improvement-contractor-businesses-and-11-unlicensed-moving-companies/"
URL_2024 = "https://www.njoag.gov/ag-platkin-division-of-consumer-affairs-cites-23-unlicensed-movers-in-covert-civil-enforcement-action/"
URL_2023 = "https://www.njoag.gov/tag/operation-safe-move/"
URL_2015 = "https://www.njoag.gov/new-jersey-division-of-consumer-affairs-cites-19-unlicensed-movers-following-undercover-sting-operation-partnership-with-ice-results-in-several-arrests-including-moving-company-worker-with/"
URL_JD = "https://www.njconsumeraffairs.gov/ocp/Legal%20Filings/20241218_JDMoversLLCandJasonDotts.pdf"
RGB = "https://rgbportal.dca.njoag.gov/public-view/"
FAQ = "https://www.njconsumeraffairs.gov/pmw/Pages/FAQ.aspx"
PMW = "https://www.njconsumeraffairs.gov/pmw"


def raw_dir() -> Path:
    for path in RAW_CANDIDATES:
        if (path / "osm_2025.html").is_file():
            return path
    raise SystemExit("Official OSM HTML not found. Need NJ-MOVE-001 raw cache.")


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def fingerprint(value: object) -> str:
    return hashlib.sha256(
        json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":")).encode("utf-8")
    ).hexdigest()


def public_row(row: dict, source_url: str) -> dict:
    return {
        "respondent": row["respondent"],
        "principal": row["principal"],
        "city": row["city"],
        "county": row["county"],
        "state": row["state"],
        "year": row["release_date"][:4],
        "operation": row["operation"],
        "actionType": "Notice of Violation",
        "novStatus": "NOV announced in official release — not a final order",
        "proposedPenalty": row["proposed_penalty"],
        "sourceUrl": source_url,
        "profileIdentity": "not_confirmed",
        "label": "Official source-level enforcement record",
        "wording": f"Named in an NJ DCA Notice of Violation alleging unlicensed moving activity ({row['operation']}).",
    }


def main() -> None:
    raw = raw_dir()
    html25 = (raw / "osm_2025.html").read_bytes()
    html24 = (raw / "osm_2024.html").read_bytes()
    rows25 = mod.parse_osm_table(html25.decode("utf-8", "replace"), URL_2025, "Operation Safe Move 2025", "2025-12-01")
    rows24 = mod.parse_osm_table(html24.decode("utf-8", "replace"), URL_2024, "Operation Safe Move 2024", "2024-09-25")
    html15 = (raw / "osm_2015.html").read_bytes() if (raw / "osm_2015.html").is_file() else b""
    parsed15 = (
        mod.parse_osm_table(html15.decode("utf-8", "replace"), URL_2015, "Unlicensed mover sting 2015", "2015-02-25")
        if html15
        else []
    )

    jd_excerpt = (
        "JD Movers LLC and Jason Dotts, Individually. Administrative Action NOV2300328. "
        "FINAL ORDER ON DEFAULT. Notice of Violation dated November 8, 2023. "
        "Alleged violation of the New Jersey Consumer Fraud Act and Public Movers and Warehousemen Licensing Act."
    )
    jd = mod.parse_ocp_filing_meta("20241218_JDMoversLLCandJasonDotts.pdf", URL_JD, jd_excerpt)

    body = {
        "version": "nj-move-002-public-v1",
        "ticket": "NJ-MOVE-002",
        "asOf": "2026-09-03",
        "generatedFrom": "NJ-MOVE-001 official OSM/OCP artifacts + PMW FAQ/coverage contract",
        "publication": {
            "route": "/new-jersey",
            "indexable": True,
            "rankings": False,
            "trustScore": False,
        },
        "authority": {
            "regulator": "New Jersey Division of Consumer Affairs — Public Movers and Warehousemen / Regulated Business Section",
            "classes": {
                "PM": {
                    "code": "PM",
                    "label": "public mover / move-only",
                    "consumerMover": True,
                    "definition": "NJ license to move household goods within New Jersey. Not warehouse-only authority and not FMCSA interstate authority.",
                },
                "PW": {
                    "code": "PW",
                    "label": "public warehouseman / warehouse-only",
                    "consumerMover": False,
                    "definition": "NJ warehouse authority only. PW-only is not mover authority.",
                },
                "PC": {
                    "code": "PC",
                    "label": "combined public mover and warehouseman",
                    "consumerMover": True,
                    "definition": "Combined NJ mover and warehouse authority. Still not FMCSA interstate authority.",
                },
            },
            "rosterCoverage": "SOURCE_AVAILABLE_BY_REQUEST",
            "verificationCoverage": "OPEN_SEARCH_ONLY",
            "verificationUrl": RGB,
            "faqUrl": FAQ,
            "homeUrl": PMW,
            "licenseCountPublished": None,
        },
        "federal": {
            "label": "FEDERAL / INTERSTATE",
            "disclaimer": "Federal interstate authority and New Jersey intrastate authority are separate. FMCSA ACTIVE is not NJ licensed. NJ licensed is not interstate authorized.",
            "directoryHref": "/companies?state=NJ",
            "verifyHref": "/verify-dot",
            "hqCount": None,
            "hhgCount": None,
            "coverage": "LIVE_DIRECTORY_WHEN_AVAILABLE",
            "grain": "MoveTrustHub publishable company profiles with New Jersey headquarters (FMCSA-keyed), not NJ PM/PW/PC licenses",
        },
        "osm": {
            "coverage": "ACQUIRED_PARTIAL_HISTORY",
            "years": {
                "2025": {
                    "novs": len(rows25),
                    "respondents": len(rows25),
                    "proposedPenaltyTypical": 5000,
                    "releaseDate": "2025-12-01",
                    "sourceUrl": URL_2025,
                    "sha256": sha256_bytes(html25),
                    "coverage": "acquired official release with respondent table",
                    "caveat": "Notice of Violation is not a final order. Proposed penalty is not a paid fine.",
                },
                "2024": {
                    "novs": len(rows24),
                    "respondents": len(rows24),
                    "proposedPenaltyTypical": 5000,
                    "proposedPenaltyAlso": 10000,
                    "fiveThousand": sum(1 for r in rows24 if r["proposed_penalty"] == 5000),
                    "tenThousand": sum(1 for r in rows24 if r["proposed_penalty"] == 10000),
                    "releaseDate": "2024-09-25",
                    "sourceUrl": URL_2024,
                    "sha256": sha256_bytes(html24),
                    "coverage": "acquired official release with respondent table",
                    "caveat": "Notice of Violation is not a final order. Proposed penalty is not a paid fine.",
                },
                "2023": {
                    "novs": 34,
                    "respondents": None,
                    "sourceUrl": URL_2023,
                    "coverage": "official enforcement-highlight count; no acquired machine-readable respondent name table",
                    "caveat": "Highlight count is not a complete respondent roster.",
                },
                "2015": {
                    "citedRespondents": 19,
                    "parsedStructuredRows": len(parsed15),
                    "sourceUrl": URL_2015,
                    "coverage": "official sting release; incomplete structured parsing",
                    "caveat": "Cited-respondent count from the release title/body. Structured table rows were not parsed.",
                },
            },
            "rows": [public_row(r, URL_2025) for r in rows25] + [public_row(r, URL_2024) for r in rows24],
        },
        "finalOrder": {
            "respondents": ["JD Movers LLC", "Jason Dotts"],
            "documentClass": "FINAL_ORDER",
            "caption": "Final Order on Default",
            "fileDate": "2024-12-18",
            "novNumber": "NOV2300328",
            "novDate": "2023-11-08",
            "sourceUrl": URL_JD,
            "grain": "source-event; name-only identity is not attached to a company profile",
            "profileIdentity": "not_confirmed",
            "coverage": "PARTIAL_SOURCE_COVERAGE",
        },
        "complaints": {
            "coverage": "OPEN_SEARCH_ONLY",
            "url": RGB,
            "countPublished": None,
            "caveat": "Complaint is not a violation. No published complaint count does not mean zero complaints.",
        },
        "tariffs": {
            "coverage": "SOURCE_AVAILABLE_BY_REQUEST",
            "url": "https://rgbportal.dca.njoag.gov/Instructions-Download-PublicMovers",
            "caveat": "A filed tariff is rate/rule evidence, not a quality score and not automatically the final invoice.",
        },
        "insurance": {
            "coverage": "SOURCE_AVAILABLE_BY_REQUEST",
            "framework": [
                "cargo",
                "vehicle",
                "storage",
                "workers' compensation",
            ],
            "caveat": "State license existence is not proof of current insurance in this snapshot.",
        },
        "gaps": [
            "Complete PM/PW/PC machine-readable statewide roster is pending official request.",
            "Historical NJ licensing file is unavailable in the acquired public files.",
            "No official roster field currently acquired tying NJ license to USDOT/MC.",
            "Complaints are search-only.",
            "Tariffs are request/appointment-based.",
            "Current insurance certificate status is not available as a complete public file.",
            "DCA/OCP enforcement history is partial (SharePoint index Incapsula-blocked).",
            "Production DB execution remains pending for state-authority attachments.",
        ],
        "profileAttachments": [],
        "monitoring": {
            "baselineOnly": True,
            "currentUpdate": "Current snapshot of Operation Safe Move 2024 and 2025 official releases, one 2024 final-order PDF, and the RGB verification architecture. This is a baseline, not a change feed.",
        },
    }
    body["osm"]["acquiredNovs"] = len(rows25) + len(rows24)
    body["fingerprint"] = fingerprint({k: v for k, v in body.items() if k != "fingerprint"})

    out_json = ROOT / "data" / "reports" / "nj-move-002-public-snapshot.json"
    out_json.parent.mkdir(parents=True, exist_ok=True)
    out_json.write_text(json.dumps(body, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    ts_path = ROOT / "lib" / "state-hhg" / "nj" / "public-snapshot.ts"
    ts_path.write_text(
        "/** Generated by scripts/build-nj-public-snapshot.py. Do not edit by hand. */\n"
        "export const NJ_MOVE_PUBLIC_SNAPSHOT = "
        + json.dumps(body, indent=2, ensure_ascii=False)
        + " as const;\n",
        encoding="utf-8",
    )
    print(
        "wrote",
        out_json.name,
        "rows",
        len(body["osm"]["rows"]),
        "2025",
        len(rows25),
        "2024",
        len(rows24),
        "fp",
        body["fingerprint"][:16],
    )


if __name__ == "__main__":
    main()
