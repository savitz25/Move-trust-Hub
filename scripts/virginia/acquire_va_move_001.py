"""VA-MOVE-001A: acquire official DMV authorized-carrier listings.

Bounded traversal of the public Authorized Motor Carriers directory with
carrier-type filters. No authority-number guessing. No login.
"""
from __future__ import annotations

import hashlib
import json
import re
import ssl
import time
import urllib.parse
import urllib.request
from collections import Counter
from datetime import datetime, timezone
from html import unescape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
RAW = ROOT / "data" / "raw" / "virginia"
STAGE = ROOT / "data" / "virginia" / "va-move-001"
UA = "MoveTrustHub/VA-MOVE-001 research (official public directory)"
CTX = ssl.create_default_context()
BASE = "https://www.dmv.virginia.gov/businesses/motor-carriers/auth-mc/authorized-motor-carriers"
APPLICANTS = "https://www.dmv.virginia.gov/businesses/motor-carriers/auth-mc"
HHG_TID = "476"
PROP_TID = "456"
EXPECTED = {
    HHG_TID: "Household goods carrier",
    PROP_TID: "Property carrier",
}

ROW_RE = re.compile(
    r'views-field-field-contact-information">(.*?)</td>.*?'
    r'views-field-field-locality">(.*?)</td>.*?'
    r'views-field-field-ct-permit-number">(.*?)</td>',
    re.S | re.I,
)


def fetch(url: str) -> tuple[int, bytes, str]:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "text/html"})
    with urllib.request.urlopen(req, context=CTX, timeout=60) as resp:
        return resp.status, resp.read(), resp.headers.get("Last-Modified") or ""


def last_page(html: str) -> int:
    m = re.search(r"Go to last page \((\d+)\)", html)
    if m:
        return int(m.group(1))
    nums = [int(x) for x in re.findall(r"href=\"\?[^\"']*pg=(\d+)", html)]
    return max(nums) if nums else 1


def clean(text: str) -> str:
    text = re.sub(r"<br\s*/?>", "\n", text, flags=re.I)
    text = re.sub(r"<[^>]+>", "", text)
    return unescape(re.sub(r"[ \t]+", " ", text)).strip()


def parse_rows(html: str, expected_type: str) -> list[dict]:
    rows = []
    leaks = []
    for m in ROW_RE.finditer(html):
        contact = clean(m.group(1))
        locality = clean(m.group(2))
        type_permit = clean(m.group(3))
        lines = [ln.strip() for ln in contact.split("\n") if ln.strip()]
        type_lines = [ln.strip() for ln in type_permit.split("\n") if ln.strip()]
        carrier_type = type_lines[0] if type_lines else ""
        number = type_lines[1] if len(type_lines) > 1 else ""
        if carrier_type.casefold() != expected_type.casefold():
            leaks.append(carrier_type)
        phone = ""
        name = lines[0] if lines else ""
        dba = ""
        addr_lines = []
        for ln in lines[1:]:
            if re.match(r"^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}", ln):
                phone = ln
            elif not addr_lines and not re.search(r"\d", ln) and ln.upper() == ln:
                dba = ln
            else:
                addr_lines.append(ln)
        rows.append(
            {
                "name": name,
                "dba": dba,
                "address_lines": addr_lines,
                "phone": phone,
                "locality": locality,
                "source_carrier_type": carrier_type,
                "source_displayed_authority_number": re.sub(r"\D", "", number) or number,
                "source_display_label": "Permit Number",
            }
        )
    if leaks:
        raise SystemExit(f"FILTER LEAK: expected {expected_type}, saw {Counter(leaks)}")
    return rows


def crawl(tid: str, expected_type: str, sleep_s: float = 0.2) -> dict:
    query = {"field_carrier_type_target_id": tid}
    url0 = BASE + "?" + urllib.parse.urlencode(query)
    status, body, last_mod = fetch(url0)
    html = body.decode("utf-8", "replace")
    last = last_page(html)
    all_rows = parse_rows(html, expected_type)
    pages = [{"pg": 1, "status": status, "bytes": len(body), "rows": len(all_rows)}]
    RAW.mkdir(parents=True, exist_ok=True)
    (RAW / f"auth-{tid}-pg1.html").write_bytes(body)
    for pg in range(2, last + 1):
        time.sleep(sleep_s)
        q = dict(query)
        q["pg"] = str(pg)
        url = BASE + "?" + urllib.parse.urlencode(q)
        st, data, _ = fetch(url)
        page_html = data.decode("utf-8", "replace")
        page_rows = parse_rows(page_html, expected_type)
        pages.append({"pg": pg, "status": st, "bytes": len(data), "rows": len(page_rows)})
        all_rows.extend(page_rows)
        if pg == last:
            (RAW / f"auth-{tid}-pg{pg}.html").write_bytes(data)
        print(expected_type, "pg", pg, "/", last, "rows", len(page_rows), flush=True)
    ids = [r["source_displayed_authority_number"] for r in all_rows]
    names = [r["name"] for r in all_rows]
    dup_ids = [i for i, n in Counter(ids).items() if n > 1]
    return {
        "filter": query,
        "expected_type": expected_type,
        "url": url0,
        "http_last_modified": last_mod,
        "pages_traversed": last,
        "page_log": pages,
        "rows": len(all_rows),
        "distinct_authority_numbers": len(set(ids)),
        "duplicate_authority_numbers": dup_ids,
        "null_identifiers": sum(1 for i in ids if not i),
        "distinct_labels": len(set(names)),
        "out_of_state": sum(1 for r in all_rows if not any(", VA" in a or ",VA" in a for a in r["address_lines"])),
        "records": all_rows,
    }


def parse_applicants(html: str) -> list[dict]:
    rows = []
    # Date | Applicant | Authority Requested
    for m in re.finditer(
        r"<tr>\s*<td[^>]*>(.*?)</td>\s*<td[^>]*>(.*?)</td>\s*<td[^>]*>(.*?)</td>",
        html,
        re.S | re.I,
    ):
        posted, applicant, authority = (clean(m.group(i)) for i in (1, 2, 3))
        if not re.match(r"\d{2}/\d{2}/\d{4}", posted):
            continue
        rows.append(
            {
                "posted": posted,
                "applicant": applicant,
                "authority_requested": authority,
                "is_household_goods": "Household Goods" in authority or ": HG" in authority,
            }
        )
    return rows


def main() -> None:
    retrieved = datetime.now(timezone.utc).isoformat()
    RAW.mkdir(parents=True, exist_ok=True)
    STAGE.mkdir(parents=True, exist_ok=True)
    print("crawling HHG", flush=True)
    hhg = crawl(HHG_TID, EXPECTED[HHG_TID])
    print("crawling Property", flush=True)
    prop = crawl(PROP_TID, EXPECTED[PROP_TID], sleep_s=0.15)
    st, app_html, _ = fetch(APPLICANTS)
    (RAW / "applicants.html").write_bytes(app_html)
    apps = parse_applicants(app_html.decode("utf-8", "replace"))
    hhg_ids = {r["source_displayed_authority_number"] for r in hhg["records"]}
    prop_ids = {r["source_displayed_authority_number"] for r in prop["records"]}

    def norm(name: str) -> str:
        return re.sub(r"[^A-Z0-9]+", " ", name.upper()).strip()

    hhg_names = {norm(r["name"]) for r in hhg["records"] if r["name"]}
    prop_names = {norm(r["name"]) for r in prop["records"] if r["name"]}
    report = {
        "ticket": "VA-MOVE-001A",
        "retrieved_at": retrieved,
        "sourceAsOf": None,
        "sourceAsOf_reason": "Authorized Motor Carriers listing has no published source date. retrievedAt is not sourceAsOf.",
        "listing_term": "Authorized Motor Carriers",
        "no_authority_bruteforce": True,
        "household_goods_carrier": {k: v for k, v in hhg.items() if k != "records"},
        "property_carrier": {k: v for k, v in prop.items() if k != "records"},
        "cross_authority": {
            "exact_authority_number_overlap": sorted(hhg_ids & prop_ids),
            "normalized_name_overlap_review_only": sorted(hhg_names & prop_names),
            "no_unsafe_auto_merge": True,
        },
        "applications": {
            "url": APPLICANTS,
            "http_status": st,
            "notice_rows": len(apps),
            "household_goods_notices": sum(1 for a in apps if a["is_household_goods"]),
            "records": apps,
            "not_added_to_authorized_roster": True,
        },
    }
    (STAGE / "hhg-records.json").write_text(json.dumps(hhg["records"], indent=2) + "\n", encoding="utf-8")
    (STAGE / "property-records.json").write_text(json.dumps(prop["records"], indent=2) + "\n", encoding="utf-8")
    (STAGE / "acquire-report.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({
        "hhg_rows": hhg["rows"],
        "hhg_ids": hhg["distinct_authority_numbers"],
        "hhg_pages": hhg["pages_traversed"],
        "prop_rows": prop["rows"],
        "prop_ids": prop["distinct_authority_numbers"],
        "prop_pages": prop["pages_traversed"],
        "overlap_ids": report["cross_authority"]["exact_authority_number_overlap"],
        "name_overlap": len(report["cross_authority"]["normalized_name_overlap_review_only"]),
        "apps": len(apps),
        "hhg_apps": report["applications"]["household_goods_notices"],
    }, indent=2))


if __name__ == "__main__":
    main()
