"""CA-MOVE-001 bounded official BHGS acquisition.

Does not scrape DCA/BHGS Connect license search. Parses the official
citations HTML table for household-mover (BPC 19237) rows only.
"""
from __future__ import annotations

import hashlib
import json
import re
import ssl
import urllib.request
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "data" / "ca-raw"
ART = ROOT / "artifacts" / "ca-move-001"
UA = "Mozilla/5.0 (compatible; MoveTrustHub/CA-MOVE-001; +https://www.movetrusthub.com)"
CTX = ssl.create_default_context()

ENF_URL = "https://bhgs.dca.ca.gov/enforcement/lookup.shtml"
TARIFF_URL = "https://bhgs.dca.ca.gov/forms_pubs/2026_max_rate_tariff.pdf"
HHM_FAQ = "https://bhgs.dca.ca.gov/licensee/hhm_faqs.shtml"
CONSUMERS = "https://bhgs.dca.ca.gov/consumers/movers.shtml"
HOME = "https://bhgs.dca.ca.gov/"
SEARCH = "https://search.dca.ca.gov/hhm_search"
SWEEP = "https://bhgs.dca.ca.gov/forms_pubs/news_20251223.pdf"
LAWS = "https://bhgs.dca.ca.gov/laws/hhm_law_book_eff_1_1_26.pdf"


def get(url: str, timeout: int = 60) -> tuple[int, bytes]:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, context=CTX, timeout=timeout) as resp:
        return resp.status, resp.read()


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def clean(cell: str) -> str:
    text = re.sub(r"<[^>]+>", " ", cell)
    return re.sub(r"\s+", " ", text).replace("\xa0", " ").strip()


def parse_citations(html: str) -> list[dict]:
    rows = []
    for tr in re.findall(r"<tr[^>]*>(.*?)</tr>", html, flags=re.I | re.S):
        tds = re.findall(r"<td[^>]*>(.*?)</td>", tr, flags=re.I | re.S)
        if len(tds) < 7:
            continue
        vals = [clean(td) for td in tds[:7]]
        name, _owner, city, license, section, date, fine = vals
        if not name or name.lower() in {"business name"}:
            continue
        if "19237" not in section.replace(" ", ""):
            continue
        lic = license.upper()
        licensed = lic not in {"UNLICENSED", "", "N/A"}
        cal_t = None
        m = re.search(r"(?:CAL-T|T)[-\s]*(\d{4,8})", lic) or re.fullmatch(r"(\d{4,8})", lic)
        if m:
            cal_t = m.group(1)
        rows.append(
            {
                "business_name": name,
                "city": city,
                "license": license,
                "cal_t": cal_t,
                "unlicensed": not licensed,
                "violation_section": section,
                "citation_date": date,
                "fine_amount": fine,
                "identity_tier": "EXACT" if cal_t else "UNSAFE",
            }
        )
    return rows


def main() -> None:
    RAW.mkdir(parents=True, exist_ok=True)
    ART.mkdir(parents=True, exist_ok=True)
    report: dict = {"ticket": "CA-MOVE-001", "generated_at": datetime.now(timezone.utc).isoformat()}

    print("BHGS home", flush=True)
    st, home = get(HOME)
    report["bhgs_home"] = {"status": st, "bytes": len(home), "sha256": sha256(home), "url": HOME}

    print("enforcement table", flush=True)
    st, enf = get(ENF_URL)
    (RAW / "bhgs-enforcement.html").write_bytes(enf)
    html = enf.decode("utf-8", errors="replace")
    hhm = parse_citations(html)
    unlicensed = sum(1 for r in hhm if r["unlicensed"])
    exact = sum(1 for r in hhm if r["cal_t"])
    years = Counter()
    for r in hhm:
        m = re.search(r"(20\d{2})", r["citation_date"])
        if m:
            years[m.group(1)] += 1
    report["enforcement"] = {
        "source": ENF_URL,
        "agency": "Bureau of Household Goods and Services",
        "http_status": st,
        "bytes": len(enf),
        "sha256": sha256(enf),
        "filter": "Violation Section contains 19237 (household-mover operating without/against permit)",
        "rows": len(hhm),
        "unlicensed_rows": unlicensed,
        "exact_cal_t_rows": exact,
        "year_counts": dict(sorted(years.items())),
        "grain": "citation row on official BHGS HTML table",
        "citation_is_not_revocation": True,
        "fine_is_not_confirmed_paid": True,
        "name_only_is_unsafe": True,
        "profile_attachments": 0,
        "other_bhgs_industries_excluded": True,
        "rows_sample": hhm[:8],
        "inventory": hhm,
    }
    print("  hhm 19237 rows", len(hhm), "unlicensed", unlicensed, "cal-t", exact, flush=True)

    print("max rate tariff pdf", flush=True)
    st, pdf = get(TARIFF_URL)
    (RAW / "2026_max_rate_tariff.pdf").write_bytes(pdf)
    report["tariff"] = {
        "source": TARIFF_URL,
        "title": "Maximum Rate Tariff, effective January 1, 2026",
        "effective": "2026-01-01",
        "http_status": st,
        "bytes": len(pdf),
        "sha256": sha256(pdf),
        "pdf": pdf[:4] == b"%PDF",
        "tariff_is_not_invoice": True,
        "tariff_is_not_quality": True,
    }
    print("  tariff", st, len(pdf), report["tariff"]["sha256"][:16], flush=True)

    print("faq/consumers", flush=True)
    st, faq = get(HHM_FAQ)
    st2, cons = get(CONSUMERS)
    report["authority_pages"] = {
        "faq": {"url": HHM_FAQ, "status": st, "sha256": sha256(faq)},
        "consumers": {"url": CONSUMERS, "status": st2, "sha256": sha256(cons)},
        "search": SEARCH,
    }

    try:
        st, sweep = get(SWEEP)
        report["unlicensed_sweep"] = {
            "source": SWEEP,
            "status": st,
            "bytes": len(sweep),
            "sha256": sha256(sweep),
            "as_of": "2025-12-23",
            "title": "Bureau of Household Goods and Services Conducts Statewide Sweep of Unlicensed Movers",
        }
    except Exception as exc:  # noqa: BLE001
        report["unlicensed_sweep"] = {"error": str(exc)}

    dest = ART / "acquisition-report.json"
    dest.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print("wrote", dest, flush=True)


if __name__ == "__main__":
    main()
