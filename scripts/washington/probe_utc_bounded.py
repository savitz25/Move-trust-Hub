"""WA-MOVE-001 bounded UTC access test. First directory page + 3 detail records. No pagination crawl."""
from __future__ import annotations

import json
import re
import ssl
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

CTX = ssl.create_default_context()
UA = {"User-Agent": "MoveTrustHub/0.1 (research; no crawl)"}
ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "data" / "washington" / "wa-move-001"
DIR_URL = (
    "https://www.utc.wa.gov/companies?combine=&usdot="
    "&exposed_select_industry=568&regulatory_status=1"
)


def get(url: str, timeout: int = 45) -> tuple[bytes, dict, str]:
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=timeout, context=CTX) as resp:
        return resp.read(), dict(resp.headers), resp.geturl()


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    report: dict = {
        "ticket": "WA-MOVE-001",
        "retrieved_at": datetime.now(timezone.utc).isoformat(),
        "no_pagination_crawl": True,
        "no_id_bruteforce": True,
    }

    body, hdr, final = get(DIR_URL)
    text = body.decode("utf-8", "replace")
    (OUT / "directory-first-page.html").write_text(text, encoding="utf-8")
    m = re.search(r"Displaying\s+(\d+)\s*-\s*(\d+)\s+of\s+(\d+)", text, re.I)
    csv_like = re.findall(r'href=["\']([^"\']+\.(?:csv|json|xlsx|zip))["\']', text, re.I)
    api_like = [h for h in re.findall(r'href=["\']([^"\']+)["\']', text, re.I) if any(x in h.lower() for x in ("/api/", "export", "download", "csv", "json"))]
    detail_hrefs = re.findall(r'href=["\']([^"\']*companies/[^"\']+)["\']', text, re.I)
    # also node paths
    node_hrefs = re.findall(r'href=["\'](/node/\d+)["\']', text)
    report["directory"] = {
        "requested_url": DIR_URL,
        "final_url": final,
        "filter": "exposed_select_industry=568 (Household Goods Carriers), regulatory_status=1 (Active)",
        "bytes": len(body),
        "content_type": hdr.get("Content-Type"),
        "displaying": m.groups() if m else None,
        "active_result_count": int(m.group(3)) if m else None,
        "csv_links": csv_like[:20],
        "api_like_links": api_like[:30],
        "sample_company_hrefs": (detail_hrefs or node_hrefs)[:8],
        "has_csv_export": bool(csv_like),
    }

    # data.wa.gov catalog needle
    try:
        cat_body, _, _ = get("https://data.wa.gov/api/views.json")
        items = json.loads(cat_body.decode("utf-8"))
        hits = []
        for it in items:
            blob = f"{it.get('name','')} {it.get('description','')} {it.get('category','')}".lower()
            if any(n in blob for n in ("household good", "utc", "utilities and transportation", "moving compan")):
                hits.append({"id": it.get("id"), "name": it.get("name"), "category": it.get("category")})
        report["data_wa_hits"] = hits[:30]
    except Exception as e:
        report["data_wa_hits_error"] = str(e)[:240]

    # 3 company-detail samples from first page only
    samples = []
    hrefs = detail_hrefs or node_hrefs
    seen = []
    for h in hrefs:
        if h in seen:
            continue
        seen.append(h)
        if len(seen) > 12:
            break
    # Prefer paths that look like company ids
    picks = []
    for h in seen:
        if re.search(r"/\d{3,}", h):
            picks.append(h)
        if len(picks) >= 3:
            break
    if not picks:
        picks = seen[:3]
    for h in picks:
        url = h if h.startswith("http") else urllib.request.urljoin(final, h)
        try:
            b, hd, u = get(url)
            html = b.decode("utf-8", "replace")
            samples.append(
                {
                    "url": u,
                    "bytes": len(b),
                    "has_phone": bool(re.search(r"phone|tel:", html, re.I)),
                    "has_email": bool(re.search(r"mailto:|@", html)),
                    "has_ubi": "UBI" in html,
                    "has_usdot": "USDOT" in html or "US DOT" in html,
                    "has_permit": bool(re.search(r"permit|certificate|authority", html, re.I)),
                    "has_address": bool(re.search(r"physical address|mailing address|street", html, re.I)),
                    "status_mentions": re.findall(r"(Active|Inactive|Unregulated|Temporary|Permanent|Cancelled|Suspended)", html)[:12],
                    "title": (re.search(r"<title>([^<]+)</title>", html, re.I).group(1).strip() if re.search(r"<title>([^<]+)</title>", html, re.I) else None),
                }
            )
        except Exception as e:
            samples.append({"url": url, "error": str(e)[:200]})
    report["detail_samples"] = samples
    report["utc_hhg_bulk_roster"] = "SOURCE_NOT_ACQUIRED" if not report["directory"]["has_csv_export"] else "CHECK"
    report["utc_active_directory"] = "OPEN_HTML_TABLE / OPEN_SEARCH_ONLY"
    (OUT / "utc-bounded-probe.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(json.dumps({k: report[k] for k in report if k != "data_wa_hits"}, indent=2)[:5000])
    print("data_wa_hits", len(report.get("data_wa_hits") or []))


if __name__ == "__main__":
    main()
