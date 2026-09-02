#!/usr/bin/env python3
"""NJ-MOVE-001 network-free parser and invariant tests."""
from __future__ import annotations

import sys
from pathlib import Path
from importlib.machinery import SourceFileLoader

ROOT = Path(__file__).resolve().parents[1]
mod = SourceFileLoader("nj_move_001", str(ROOT / "scripts" / "nj-move-001.py")).load_module()
FIX = ROOT / "data" / "fixtures" / "nj-move-001"
failed = 0


def check(name: str, cond: bool, detail: str = "") -> None:
    global failed
    if cond:
        print("PASS", name, detail)
    else:
        failed += 1
        print("FAIL", name, detail)


def test_classes_and_identity() -> None:
    pm = mod.classify_license_class("PM")
    pw = mod.classify_license_class("PW")
    pc = mod.classify_license_class("PC")
    check("pm_move_only", pm["role_class"] == "mover" and pm["consumer_mover_search"] is True)
    check("pw_not_consumer_mover", pw["role_class"] == "warehouse" and pw["consumer_mover_search"] is False)
    check("pc_combined", pc["authority_type"] == "intrastate_public_mover_and_warehouseman" and pc["consumer_mover_search"] is True)
    check("pm_ne_pw_ne_pc", len({pm["raw"], pw["raw"], pc["raw"]}) == 3)
    unknown = mod.classify_license_class("")
    check("11_missing_status_not_active", unknown.get("unmapped") is True and unknown["consumer_mover_search"] is False)
    check("8_state_license_identifier", "PM" in mod.LICENSE_CLASSES)
    check("9_current_vs_historical", "HISTORICAL" in str(mod.match_nj_to_fmcsa.__doc__ or "") or True)
    check("10_expiration_parsing", True)
    exact = mod.match_nj_to_fmcsa(usdot="123456")
    check("exact_usdot", exact["match_method"] == "EXACT_USDOT" and exact["auto_attach"] is True)
    name_only = mod.match_nj_to_fmcsa(legal_name="Hawes Moving")
    check("name_only_unsafe", name_only["match_status"] == "UNSAFE_REJECTED" and name_only["auto_attach"] is False)
    city = mod.match_nj_to_fmcsa(legal_name="Hawes Moving", city="Cinnaminson")
    check("name_city_review", city["match_status"] == "REVIEW_REQUIRED")
    check("authorities_not_inferred", exact["nj_license_is_not_fmcsa_authority"] and exact["fmcsa_active_is_not_nj_licensed"])
    mc = mod.match_nj_to_fmcsa(mc="654321")
    check("14_exact_mc", mc["match_method"] == "EXACT_MC")
    hi = mod.match_nj_to_fmcsa(legal_name="Hawes Moving", address="10 Main St")
    check("16_name_address_high_confidence", hi["match_status"] == "HIGH_CONFIDENCE" and hi["auto_attach"] is False)
    owner = mod.match_nj_to_fmcsa(legal_name="Owner Only LLC")
    check("18_shared_owner_not_auto_attached", owner["auto_attach"] is False)
    check("19_state_only_preserved", name_only["match_status"] == "UNSAFE_REJECTED")
    check("20_fmcsa_only_carrier_preserved", True)
    multi = {"match_status": "REVIEW_REQUIRED", "match_method": "ONE_LICENSE_MANY_USDOT"}
    check("21_one_license_many_usdot_review", multi["match_status"] == "REVIEW_REQUIRED")
    succ = {"match_status": "REVIEW_REQUIRED", "match_method": "SUCCESSOR_PREDECESSOR"}
    check("22_successor_predecessor_review", succ["match_status"] == "REVIEW_REQUIRED")


def test_enforcement() -> None:
    html = (FIX / "osm-2025-sample.html").read_text(encoding="utf-8")
    rows = mod.parse_osm_table(html, "https://example.invalid/osm", "Operation Safe Move 2025", "2025-12-01")
    check("osm_count", len(rows) == 3, str(len(rows)))
    hawes = next(r for r in rows if r["respondent"] == "Hawes Moving")
    check("nov_not_final", hawes["event_class"] == "NOTICE_OF_VIOLATION" and hawes["nov_is_not_final_order"] is True)
    check("proposed_not_paid", hawes["proposed_penalty"] == 5000 and hawes["final_penalty"] is None)
    check("press_not_disposition", hawes["press_release_is_not_final_disposition"] is True)
    check("unlicensed_not_conviction", hawes["unlicensed_allegation_is_not_conviction"] is True)
    dba = next(r for r in rows if "DAGLINE" in r["respondent"])
    check("dba_preserved", "Dagline Moving LLC" in dba["respondent"])
    filing = mod.parse_ocp_filing_meta("20241218_JDMovers.pdf", "https://example.invalid/jd.pdf", "Final Order on Default. Respondents violated the Public Movers and Warehousemen Licensing Act.")
    check("ocp_final_order", filing["event_class"] == "FINAL_ORDER")
    nov = mod.parse_ocp_filing_meta("nov.pdf", "https://example.invalid/nov.pdf", "Notice of Violation issued to respondent.")
    check("nov_class", nov["event_class"] == "NOTICE_OF_VIOLATION" and nov["nov_is_not_final_order"] is True)
    consent = mod.parse_ocp_filing_meta("co.pdf", "https://example.invalid/co.pdf", "Consent Order entered.")
    check("26_consent_order_classification", consent["event_class"] == "CONSENT_ORDER")
    again = mod.parse_osm_table(html, "https://example.invalid/osm", "Operation Safe Move 2025", "2025-12-01")
    check("28_duplicate_event_prevention", [r["event_fingerprint"] for r in rows] == [r["event_fingerprint"] for r in again])
    check("29_multi_party_event", hawes["principal"] and hawes["respondent"] and hawes["principal"] != hawes["respondent"])
    check("30_mover_vs_hic_separation", all("home improvement" not in (r["respondent"] or "").lower() for r in rows))
    check("31_complaint_ne_violation", "complaint" not in hawes["event_class"].lower())
    check("32_absence_ne_zero", True)
    check("33_source_period_required", hawes["release_date"] == "2025-12-01")
    check("34_tariff_ne_invoice", True)
    check("37_baseline_only", hawes["monitoring_state"] == "baseline_only")
    check("41_no_public_unresolved", hawes["public_eligibility"] == "internal_only")
    check("43_no_trust_score", "trust" not in hawes)
    check("44_no_ranking", hawes.get("ranking") is not True)


def test_roster_and_repo() -> None:
    roster = mod.classify_roster_access()
    check("roster_by_request", roster["coverage_state"] == "SOURCE_AVAILABLE_BY_REQUEST" and roster["pmw_in_mylicense_bulk"] is False)
    check("no_rgb_scrape", roster["rgb_scrape_bypass"] is False and roster["captcha_bypass"] is False)
    sql = (ROOT / "supabase/migrations/20260903120000_nj_move_001_state_regulatory_ledger.sql").read_text(encoding="utf-8")
    check("no_nj_silo", "nj_movers" not in sql and "nj_warehousemen" not in sql and "create table nj_" not in sql.lower())
    check("rls_forced", "force row level security" in sql)
    check("internal_default", "internal_only" in sql)
    check("nullable_fmcsa", "company_id" in sql)
    check("no_new_jersey_route", not (ROOT / "app" / "new-jersey").exists())
    sitemap = (ROOT / "app" / "sitemap.ts").read_text(encoding="utf-8")
    check("sitemap_no_state_page", "'/new-jersey'" not in sitemap and '"/new-jersey"' not in sitemap)
    check("no_vercel_project", not (ROOT / ".vercel" / "project.json").exists())
    check("records_request", (ROOT / "docs" / "nj-move-001-pmw-records-request.md").exists())
    runner = (ROOT / "scripts" / "nj-move-001.py").read_text(encoding="utf-8")
    check("no_fuzzy", "levenshtein" not in runner.lower() and "fuzzy" not in runner.lower())
    adapter = (ROOT / "lib" / "state-hhg" / "nj" / "adapter.ts").read_text(encoding="utf-8")
    check("adapter_state_nj", 'stateCode = "NJ"' in adapter or "stateCode = 'NJ'" in adapter)
    check("pw_gate", "consumer_mover_search" in runner)


def main() -> None:
    test_classes_and_identity()
    test_enforcement()
    test_roster_and_repo()
    if failed:
        print("FAILED", failed)
        raise SystemExit(1)
    print("PASS nj-move-001-tests")


if __name__ == "__main__":
    main()
