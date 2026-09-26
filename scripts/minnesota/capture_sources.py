#!/usr/bin/env python3
"""MN-MOVE-001 — capture verbatim Minnesota household-goods mover sources into sources.json.

Acquisition helper. Reads the gitignored pages in data/minnesota/mn-move-001/raw/ (MnDOT Commercial
Vehicle Operations pages and 2025 Minnesota Statutes sections from the Office of the Revisor of
Statutes, retrieved 2026-09-26 with ordinary requests) and writes only the verbatim sentences this
product relies on, with the SHA-256 of each page, to data/minnesota/mn-move-001/sources.json.

The MnDOT Carrier Search (mnitservices.my.site.com, "Find a Carrier") was used for one ordinary
name search and one carrier detail view to learn its fields. It searches by MnDOT #, USDOT # or
name, returns no results for an empty search, lists no authority type in results, and shows the
authority type, status and status date only on each carrier's detail page. No carrier rows were
collected, no numbers were enumerated, and no roster was built from it.
"""
from __future__ import annotations

import hashlib
import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
RAW = ROOT / "data/minnesota/mn-move-001/raw"
OUT = ROOT / "data/minnesota/mn-move-001/sources.json"
RETRIEVED_AT = "2026-09-26T13:40:00Z"
REVISOR = "https://www.revisor.mn.gov/statutes/cite/"


def page_text(name: str) -> str:
    raw = (RAW / name).read_text(encoding="utf-8", errors="replace")
    raw = re.sub(r"<script.*?</script>|<style.*?</style>", "", raw, flags=re.S)
    return " ".join(html.unescape(re.sub(r"<[^>]+>", " ", raw)).split())


def sha(name: str) -> str:
    return hashlib.sha256((RAW / name).read_bytes()).hexdigest()


def quote(text: str, start: str, end: str) -> str:
    i = text.find(start)
    if i < 0:
        raise SystemExit(f"missing source sentence: {start!r}")
    j = text.find(end, i)
    if j < 0:
        raise SystemExit(f"missing sentence end: {end!r}")
    return text[i : j + len(end)]


def statute(section: str, pairs: list[tuple[str, str, str]]) -> dict:
    name = f"statute-{section}.html"
    text = page_text(name)
    year = re.search(r"(\d{4}) Minnesota Statutes", (RAW / name).read_text(encoding="utf-8", errors="replace"))
    return {
        "url": REVISOR + section,
        "edition": year.group(0) if year else None,
        "sha256": sha(name),
        "retrieved_at": RETRIEVED_AT,
        "text": {key: quote(text, a, b) for key, a, b in pairs},
    }


def main() -> None:
    hhg = page_text("household-goods.html")
    complaint = page_text("complaint.html")
    body = {
        "ticket": "MN-MOVE-001",
        "mndot_household_goods_page": {
            "url": "https://www.dot.state.mn.us/cvo/household-goods.html",
            "sha256": sha("household-goods.html"),
            "retrieved_at": RETRIEVED_AT,
            "statements": {
                "definition": quote(hhg, "Household goods movers are people", "in the owner's dwelling."),
                "usdot_step": quote(hhg, "Apply for a USDOT number", "website"),
                "usdot_types": quote(hhg, "NOTE: There are two types of USDOT numbers", "(a fee is required)."),
                "insurance_filing": quote(hhg, "Before providing transportation, your insurance underwriter", "with our office."),
                "limit_public_liability": quote(hhg, "Not less than $100,000/$300,000", "(Form E)"),
                "limit_property": quote(hhg, "Not less than $50,000 destruction", "(Form E)"),
                "limit_cargo": quote(hhg, "Not less than $50,000 cargo", "(Form H)"),
                "no_operation_before_permit": quote(hhg, "NOTE: You may not legally operate", "household goods mover permit."),
            },
            "forms": {
                "application_packet": "https://edocs-public.dot.state.mn.us/edocs_public/DMResultSet/download?docId=39041084",
                "vehicle_registration_form": "https://edocs-public.dot.state.mn.us/edocs_public/DMResultSet/download?docId=39041087",
            },
        },
        "mndot_complaint_page": {
            "url": "https://www.dot.state.mn.us/cvo/complaint.html",
            "sha256": sha("complaint.html"),
            "retrieved_at": RETRIEVED_AT,
            "complaint_form": "https://mndotforms.formstack.com/forms/motor_carrier_vehicle_complaint",
            "fmcsa_complaints": "https://nccdb.fmcsa.dot.gov/nccdb/home.aspx",
            "statements": {
                "mndot": quote(complaint, "File a complaint with MnDOT", "for more assistance."),
                "fmcsa_scope": quote(complaint, "Across state lines:", "Motor coach / bus"),
            },
            "latest_published_complaint_report": "2019 Complaint Report (PDF)",
        },
        "mndot_carrier_search": {
            "url": "https://mnitservices.my.site.com/license/MCISSearchBox?AgencyVar=OFCVO",
            "portal_entry": "https://mnitservices.my.site.com/license/communitiesLoginPage?AgencyVar=OFCVO",
            "observed_at": RETRIEVED_AT,
            "search_fields": ["MnDOT #", "USDOT #", "Name"],
            "result_columns": ["Organization Name", "Doing Business As", "MnDOT #", "USDOT #", "City", "State"],
            "detail_fields": ["Authority Type", "Authority Status", "Status Date"],
            "authority_types_observed": ["For Hire Property Carrier", "Household Goods"],
            "empty_search_returns_results": False,
            "authority_type_filter": False,
            "bulk_export": False,
            "rows_collected": 0,
            "note": "Public per-carrier verification. There is no roster, authority-type filter or export, so an active household-goods permit population could only be built by enumerating names or numbers, which was not done.",
        },
        "statutes": {
            "221.121": statute(
                "221.121",
                [
                    ("apply", "(a) A person desiring to operate as a household goods carrier", "the commissioner prescribes."),
                    ("issue", "(b) The commissioner shall issue the permit", "unsatisfactory safety rating."),
                    ("duration", "(c) A permit once granted continues in full force", "governing permit carriers."),
                    ("statewide", "(d) All permits granted to household goods carriers must allow statewide operation.", "may operate statewide."),
                    ("fee", "The petitioner shall pay a fee of $150", "applied for under this section."),
                ],
            ),
            "221.131": statute(
                "221.131",
                [
                    ("renewal", "Permits issued under section 221.121 are effective for a 12-month period.", "held by the holder."),
                    ("vehicle_fee", "(b) A permit holder or motor carrier of passengers shall pay an annual registration fee of $75 on each vehicle", "12-month period."),
                ],
            ),
            "221.141": statute(
                "221.141",
                [
                    ("continuous", "Policies of insurance, surety bonds, other types of security, and endorsements must be continuously in effect", "until canceled."),
                    ("hhg_cargo", "A household goods mover shall maintain in effect cargo insurance or cargo bond in the amount of $50,000", "cargo certificate of insurance or cargo bond."),
                    ("amount_by_order", "the amount of insurance, bond, or other security required for motor carriers is the amount prescribed by order of the commissioner.", "prescribed by order of the commissioner."),
                ],
            ),
            "221.161": statute(
                "221.161",
                [
                    ("tariff", "A household goods mover shall maintain a tariff showing rates and charges for transporting household goods.", "incorporated by reference."),
                    ("availability", "(a) A household goods mover subject to this section must maintain all of its effective tariffs", "open for business."),
                    ("copies", "(b) Upon request, a household goods mover must provide copies of tariffs", "or any interested person."),
                ],
            ),
            "221.171": statute(
                "221.171",
                [("fixed", "A household goods mover must not charge or receive a greater, lesser, or different compensation", "the rates and charges specified in the tariff under section 221.161 .")],
            ),
            "221.172": statute(
                "221.172",
                [
                    ("record", "(a) A household goods mover shall keep a record of each shipment transported under a permit.", "available for inspection together."),
                    ("contents", "(b) A record must show the:", "participating in the transportation."),
                    ("retention", "A shipping document or record described in subdivision 2 or 3, or a copy of it, must be retained by the carrier for at least three years", "on the shipping document or record."),
                ],
            ),
            "221.185": statute(
                "221.185",
                [("suspension", "a household goods mover permit or a motor carrier registration issued under section 221.0251 or 221.0252 is suspended without a hearing", "administrative penalty under section 221.036 .")],
            ),
            "221.036": statute(
                "221.036",
                [
                    ("order", "The commissioner may issue an order requiring violations to be corrected and administratively assessing monetary penalties", "An order must be issued as provided in this section."),
                    ("amount", "(a) The commissioner may issue an order assessing a penalty of up to $5,000", "motor carrier operations or insurance."),
                ],
            ),
            "221.021": statute(
                "221.021",
                [("no_operation", "No person may operate as a motor carrier or advertise or otherwise hold out as a motor carrier without a certificate of registration or permit in effect.", "without a certificate of registration or permit in effect.")],
            ),
        },
        "roster_search": {
            "MN_HHG_PERMIT_ROSTER": "NOT_ACQUIRED",
            "paths_checked": [
                "MnDOT CVO household goods mover page (no roster)",
                "MnDOT CVO Resources / Forms (application packets only)",
                "MnDOT Carrier Search (per-carrier lookup; no roster, filter or export)",
                "Revisor of Statutes chapter 221 (law, not a roster)",
            ],
            "no_login_captcha_or_enumeration": True,
        },
    }
    OUT.write_text(json.dumps(body, indent=2, ensure_ascii=False) + "\n", encoding="utf-8", newline="\n")
    print(json.dumps({k: len(v["text"]) for k, v in body["statutes"].items()}))


if __name__ == "__main__":
    main()
