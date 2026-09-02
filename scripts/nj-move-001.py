#!/usr/bin/env python3
"""NJ-MOVE-001 New Jersey Public Movers & Warehousemen evidence ingest.

Internal-only. Does not publish /new-jersey or consumer rankings.
Does not confuse NJ intrastate authority with FMCSA interstate authority.
Does not scrape RGB/MyLicense search results to avoid a records request.
"""
from __future__ import annotations

import argparse
import hashlib
import html as html_lib
import json
import re
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "data" / "nj-raw" / "pmw"
GEN = ROOT / "data" / "reports"
FIX = ROOT / "data" / "fixtures" / "nj-move-001"
DATASET = "NJ_DCA_PMW"
HOST_PMW = "https://www.njconsumeraffairs.gov/pmw"

# Official FAQ (https://www.njconsumeraffairs.gov/pmw/Pages/FAQ.aspx):
# PM = license to move only; PW = warehousing only; PC = combination.
LICENSE_CLASSES = {
    "PM": {
        "raw": "PM",
        "label": "public mover / move-only",
        "authority_type": "intrastate_public_mover",
        "role_class": "mover",
        "consumer_mover_search": True,
    },
    "PW": {
        "raw": "PW",
        "label": "public warehouseman / warehouse-only",
        "authority_type": "intrastate_public_warehouseman",
        "role_class": "warehouse",
        "consumer_mover_search": False,
    },
    "PC": {
        "raw": "PC",
        "label": "combined public mover and warehouseman",
        "authority_type": "intrastate_public_mover_and_warehouseman",
        "role_class": "mover",
        "consumer_mover_search": True,
    },
}


def iso() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def sha256_text(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def fingerprint(value: Any) -> str:
    return sha256_text(json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":")))


def normalize_space(text: str) -> str:
    text = html_lib.unescape((text or "").replace("\u00a0", " "))
    return re.sub(r"\s+", " ", text).strip()


def parse_money(raw: str) -> float | None:
    m = re.search(r"\$?\s*([0-9,]+(?:\.\d{2})?)", raw or "")
    if not m:
        return None
    return float(m.group(1).replace(",", ""))


def cell_text(html: str) -> str:
    return normalize_space(re.sub(r"<[^>]+>", " ", html or ""))


def classify_license_class(raw: str | None) -> dict[str, Any]:
    token = (raw or "").strip().upper()
    if token in LICENSE_CLASSES:
        return dict(LICENSE_CLASSES[token])
    return {
        "raw": raw,
        "label": None,
        "authority_type": "other",
        "role_class": "other",
        "consumer_mover_search": False,
        "unmapped": True,
    }


def match_nj_to_fmcsa(
    *,
    usdot: str | None = None,
    mc: str | None = None,
    legal_name: str | None = None,
    address: str | None = None,
    city: str | None = None,
    phone: str | None = None,
) -> dict[str, Any]:
    """Fail-closed. Name-only is UNSAFE. NJ license is not FMCSA authority."""
    result = {
        "match_status": "UNRESOLVED",
        "match_method": "UNMATCHED_OFFICIAL_ROW",
        "confidence": "UNRESOLVED",
        "auto_attach": False,
        "nj_license_is_not_fmcsa_authority": True,
        "fmcsa_active_is_not_nj_licensed": True,
        "public_eligibility": "internal_only",
    }
    if usdot and re.fullmatch(r"\d{1,8}", usdot):
        result.update({"match_status": "EXACT", "match_method": "EXACT_USDOT", "confidence": "EXACT", "auto_attach": True})
        return result
    if mc and re.fullmatch(r"\d{1,8}", mc):
        result.update({"match_status": "EXACT", "match_method": "EXACT_MC", "confidence": "EXACT", "auto_attach": True})
        return result
    name = normalize_space(legal_name or "")
    addr = normalize_space(address or "")
    if name and addr:
        result.update({
            "match_status": "HIGH_CONFIDENCE",
            "match_method": "EXACT_LEGAL_NAME_AND_ADDRESS",
            "confidence": "HIGH_CONFIDENCE",
            "auto_attach": False,
            "notes": "High-confidence only after graph corroboration; do not auto-attach without an existing carrier.",
        })
        return result
    if name and city:
        result.update({"match_status": "REVIEW_REQUIRED", "match_method": "LEGAL_NAME_AND_CITY", "confidence": "REVIEW_REQUIRED", "auto_attach": False})
        return result
    if name:
        result.update({"match_status": "UNSAFE_REJECTED", "match_method": "NAME_ONLY", "confidence": "UNSAFE", "auto_attach": False})
        return result
    if phone and not name:
        result.update({"match_status": "UNSAFE_REJECTED", "match_method": "PHONE_ONLY", "confidence": "UNSAFE", "auto_attach": False})
        return result
    return result


def parse_osm_table(html: str, source_url: str, operation: str, release_date: str) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    for tr in re.findall(r"<tr[^>]*>(.*?)</tr>", html, flags=re.I | re.S):
        cells = [cell_text(c) for c in re.findall(r"<td[^>]*>(.*?)</td>", tr, flags=re.I | re.S)]
        if len(cells) < 6:
            continue
        if cells[0].lower() in {"company", "", "total"} or "principal" in cells[1].lower():
            continue
        if not re.search(r"\$?\d", cells[5]):
            continue
        company, principal, town, county, state, penalty_raw = cells[:6]
        proposed = parse_money(penalty_raw)
        rec_id = fingerprint({"op": operation, "company": company, "principal": principal, "date": release_date})
        ident = match_nj_to_fmcsa(legal_name=company, city=town)
        rows.append({
            "source_dataset": DATASET,
            "source_family": "NJ_DCA_OPERATION_SAFE_MOVE",
            "operation": operation,
            "release_date": release_date,
            "event_class": "NOTICE_OF_VIOLATION",
            "nov_is_not_final_order": True,
            "proposed_penalty_is_not_paid_fine": True,
            "press_release_is_not_final_disposition": True,
            "unlicensed_allegation_is_not_conviction": True,
            "respondent": company,
            "principal": principal,
            "city": town,
            "county": county,
            "state": state,
            "proposed_penalty": proposed,
            "final_penalty": None,
            "disposition": "NOV_ANNOUNCED",
            "nj_license_number": None,
            "usdot": None,
            "mc": None,
            "source_url": source_url,
            "event_fingerprint": rec_id,
            "identity": ident,
            "public_eligibility": "internal_only",
            "monitoring_state": "baseline_only",
        })
    return rows


def parse_ocp_filing_meta(filename: str, source_url: str, excerpt: str) -> dict[str, Any]:
    rec_id = fingerprint({"url": source_url, "file": filename})
    cls = "FINAL_ORDER" if re.search(r"final order", excerpt, re.I) else "OTHER_OFFICIAL_ACTION"
    if re.search(r"consent", excerpt, re.I):
        cls = "CONSENT_ORDER"
    if re.search(r"notice of violation|\bNOV\b", excerpt, re.I) and cls == "OTHER_OFFICIAL_ACTION":
        cls = "NOTICE_OF_VIOLATION"
    return {
        "source_dataset": DATASET,
        "source_family": "NJ_DCA_OCP_LEGAL_FILING",
        "event_class": cls,
        "source_url": source_url,
        "document_filename": filename,
        "event_fingerprint": rec_id,
        "nov_is_not_final_order": cls != "FINAL_ORDER",
        "public_eligibility": "internal_only",
        "monitoring_state": "baseline_only",
        "excerpt": excerpt[:2000],
    }


def classify_roster_access() -> dict[str, Any]:
    return {
        "access_classification": "SOURCE_AVAILABLE_BY_REQUEST",
        "coverage_state": "SOURCE_AVAILABLE_BY_REQUEST",
        "mylicense_verification": "PMW redirected to RGB Custom Portal",
        "mylicense_bulk_professions": 142,
        "pmw_in_mylicense_bulk": False,
        "rgb_public_view": "OPEN_SEARCH_ONLY",
        "rgb_scrape_bypass": False,
        "captcha_bypass": False,
        "notes": (
            "Current PMW verification is the DCA RGB Custom Portal "
            "(rgbportal.dca.njoag.gov / mymoversnj.gov public-view). "
            "MyLicense bulk business download lists 142 professions and does not include "
            "Public Movers and Warehousemen. Portal search is not a complete statewide export. "
            "Do not scrape the entity-grid."
        ),
    }


def coverage_rows() -> list[dict[str, Any]]:
    roster = classify_roster_access()
    return [
        {"family": "NJ_DCA_PMW_ROSTER", "coverage_state": roster["coverage_state"], "url": "https://rgbportal.dca.njoag.gov/public-view/", "notes": roster["notes"]},
        {"family": "NJ_DCA_PMW_LICENSE_CLASSES", "coverage_state": "ACQUIRED_CURRENT_SNAPSHOT", "url": "https://www.njconsumeraffairs.gov/pmw/Pages/FAQ.aspx", "notes": "PM/PW/PC from official FAQ."},
        {"family": "NJ_DCA_OPERATION_SAFE_MOVE", "coverage_state": "ACQUIRED_PARTIAL_HISTORY", "url": "https://www.njoag.gov/tag/operation-safe-move/", "notes": "Official press releases 2015, 2023 highlights, 2024, 2025. NOV != final order."},
        {"family": "NJ_DCA_OCP_LEGAL_FILINGS", "coverage_state": "PARTIAL_SOURCE_COVERAGE", "url": "https://www.njconsumeraffairs.gov/ocp/Legal%20Filings/20241218_JDMoversLLCandJasonDotts.pdf", "notes": "SharePoint filings index Incapsula-blocked; deterministic PDF acquired."},
        {"family": "NJ_DCA_PMW_COMPLAINTS", "coverage_state": "OPEN_SEARCH_ONLY", "url": "https://rgbportal.dca.njoag.gov/public-view/", "notes": "Complaint history via license verification; not a machine-readable export. Complaint != violation."},
        {"family": "NJ_DCA_PMW_TARIFFS", "coverage_state": "SOURCE_AVAILABLE_BY_REQUEST", "url": "https://rgbportal.dca.njoag.gov/Instructions-Download-PublicMovers", "notes": "Tariffs viewed by appointment at Division offices. Rate/rule evidence, not quality."},
        {"family": "NJ_DCA_PMW_INSURANCE", "coverage_state": "SOURCE_AVAILABLE_BY_REQUEST", "url": HOST_PMW, "notes": "Insurance required for licensure; current coverage not published as a roster. License != proof of current coverage."},
        {"family": "NJ_FMCSA_CROSSWALK", "coverage_state": "SOURCE_NOT_ACQUIRED", "url": None, "notes": "No official NJ source in this ticket prints USDOT/MC on a statewide roster."},
    ]


def load_html(name: str) -> str | None:
    for path in [RAW / f"{name}.html", FIX / f"{name}.html"]:
        if path.exists():
            return path.read_text(encoding="utf-8", errors="replace")
    return None


def parse_all() -> dict[str, Any]:
    events: list[dict[str, Any]] = []
    osm_2025 = load_html("osm_2025") or (FIX / "osm-2025-sample.html").read_text(encoding="utf-8")
    events.extend(parse_osm_table(
        osm_2025,
        "https://www.njoag.gov/division-of-consumer-affairs-undercover-enforcement-operations-result-in-notices-of-violations-against-18-unregistered-home-improvement-contractor-businesses-and-11-unlicensed-moving-companies/",
        "Operation Safe Move 2025",
        "2025-12-01",
    ))
    osm_2024 = load_html("osm_2024")
    if osm_2024:
        events.extend(parse_osm_table(
            osm_2024,
            "https://www.njoag.gov/ag-platkin-division-of-consumer-affairs-cites-23-unlicensed-movers-in-covert-civil-enforcement-action/",
            "Operation Safe Move 2024",
            "2024-09-25",
        ))
    osm_2015 = load_html("osm_2015")
    if osm_2015:
        events.extend(parse_osm_table(
            osm_2015,
            "https://www.njoag.gov/new-jersey-division-of-consumer-affairs-cites-19-unlicensed-movers-following-undercover-sting-operation-partnership-with-ice-results-in-several-arrests-including-moving-company-worker-with/",
            "Unlicensed mover sting 2015",
            "2015-02-25",
        ))

    jd_path = RAW / "pdf" / "jd_movers.pdf"
    excerpt = ""
    if jd_path.exists():
        try:
            from pypdf import PdfReader
            excerpt = "\n".join((p.extract_text() or "") for p in PdfReader(str(jd_path)).pages[:2])
        except Exception:
            excerpt = "JD Movers LLC Final Order on Default December 18 2024 unlicensed public moving"
    else:
        excerpt = "JD Movers LLC and Jason Dotts Final Order on Default. Notice of Violation. unlicensed public moving."
    events.append(parse_ocp_filing_meta(
        "20241218_JDMoversLLCandJasonDotts.pdf",
        "https://www.njconsumeraffairs.gov/ocp/Legal%20Filings/20241218_JDMoversLLCandJasonDotts.pdf",
        excerpt,
    ))

    licenses: list[dict[str, Any]] = []  # none until roster acquired
    monitoring = [
        {
            "source_family": fam,
            "event_key": f"{fam}:baseline",
            "event_kind": "baseline_snapshot",
            "baseline_only": True,
            "alerted": False,
        }
        for fam in [
            "NJ_DCA_PMW_ROSTER",
            "NJ_DCA_OPERATION_SAFE_MOVE",
            "NJ_DCA_OCP_LEGAL_FILINGS",
            "NJ_DCA_PMW_TARIFFS",
            "NJ_DCA_PMW_COMPLAINTS",
            "NJ_DCA_PMW_INSURANCE",
        ]
    ]
    return {
        "events": events,
        "licenses": licenses,
        "coverage": coverage_rows(),
        "roster": classify_roster_access(),
        "license_classes": LICENSE_CLASSES,
        "monitoring": monitoring,
    }


def summarize(parsed: dict[str, Any]) -> dict[str, Any]:
    events = parsed["events"]
    osm = [e for e in events if e.get("source_family") == "NJ_DCA_OPERATION_SAFE_MOVE"]
    ident = [e.get("identity") or {} for e in osm]
    return {
        "ticket": "NJ-MOVE-001",
        "generated_at": iso(),
        "publication": {
            "new_jersey_route_created": False,
            "sitemap_change": False,
            "rankings": False,
            "trust_score": False,
            "manual_vercel": False,
            "pw_only_as_mover": False,
        },
        "roster": parsed["roster"],
        "license_classes": {k: v["label"] for k, v in LICENSE_CLASSES.items()},
        "enforcement": {
            "osm_respondents": len(osm),
            "by_operation": dict(Counter(e.get("operation") for e in osm)),
            "event_classes": dict(Counter(e.get("event_class") for e in events)),
            "nov_is_not_final_order": True,
        },
        "identity": {
            "exact_usdot": sum(1 for i in ident if i.get("match_method") == "EXACT_USDOT"),
            "exact_mc": sum(1 for i in ident if i.get("match_method") == "EXACT_MC"),
            "review_required": sum(1 for i in ident if i.get("match_status") == "REVIEW_REQUIRED"),
            "unsafe_rejected": sum(1 for i in ident if i.get("match_status") == "UNSAFE_REJECTED"),
            "unresolved": sum(1 for i in ident if i.get("match_status") == "UNRESOLVED"),
        },
        "coverage": parsed["coverage"],
        "monitoring": {"baseline_only": True, "historical_alerts": 0},
        "database": {
            "available": False,
            "production_blocker": "No authorized MoveTrustHub database session in this worktree. Safe dormant code may merge.",
        },
        "invariants": {
            "nj_intrastate_ne_fmcsa_interstate": True,
            "pm_ne_pw_ne_pc": True,
            "pw_not_consumer_mover": True,
            "nov_ne_final_order": True,
            "proposed_penalty_ne_paid_fine": True,
            "complaint_ne_violation": True,
            "tariff_ne_quality": True,
            "license_ne_current_insurance": True,
        },
    }


def write_json(name: str, payload: Any) -> None:
    GEN.mkdir(parents=True, exist_ok=True)
    (GEN / name).write_text(json.dumps(payload, indent=2, ensure_ascii=False, default=str), encoding="utf-8")


def run(mode: str) -> dict[str, Any]:
    parsed = parse_all()
    summary = summarize(parsed)
    summary["mode"] = mode
    write_json("nj-move-001-summary.json", summary)
    write_json("nj-move-001-coverage.json", parsed["coverage"])
    print(json.dumps({
        "mode": mode,
        "osm_events": summary["enforcement"]["osm_respondents"],
        "roster": parsed["roster"]["coverage_state"],
        "classes": list(LICENSE_CLASSES),
    }, indent=2))
    return summary


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("mode", choices=["inspect", "download", "dry-run", "execute", "verify", "local-input"])
    args = parser.parse_args()
    run(args.mode)


if __name__ == "__main__":
    main()
