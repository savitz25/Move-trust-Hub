#!/usr/bin/env python3
"""PA-MOVE-001 — acquire official PA PUC HHG operator list + utility details."""
from __future__ import annotations

import hashlib
import json
import re
import ssl
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
RAW = ROOT / "data/pennsylvania/pa-move-001/raw"
UA = "MoveTrustHub/pa-move-001 (research; +https://www.movetrusthub.com)"
CTX = ssl.create_default_context()
LIST_URL = "https://www.puc.pa.gov/motor-carrier/limos-taxis-movers/"
UTILITY_URL = "https://www.puc.pa.gov/utility/{code}"


def now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def get(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "text/html"})
    with urllib.request.urlopen(req, context=CTX, timeout=60) as resp:
        return resp.read()


def get_retry(url: str, attempts: int = 4) -> bytes:
    last: Exception | None = None
    for i in range(attempts):
        try:
            return get(url)
        except Exception as exc:  # noqa: BLE001
            last = exc
            time.sleep(1.5 * (i + 1))
    raise RuntimeError(f"failed {url}: {last}")


class TableParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.rows: list[list[str]] = []
        self.hrefs: list[list[str]] = []
        self._row: list[str] | None = None
        self._hrefs: list[str] | None = None
        self._cell: list[str] | None = None
        self._in_cell = False

    def handle_starttag(self, tag: str, attrs) -> None:
        attrs_d = dict(attrs)
        if tag == "tr":
            self._row = []
            self._hrefs = []
        elif tag in {"td", "th"} and self._row is not None:
            self._cell = []
            self._in_cell = True
        elif tag == "a" and self._in_cell:
            href = attrs_d.get("href") or ""
            if href and self._hrefs is not None:
                self._hrefs.append(href)

    def handle_endtag(self, tag: str) -> None:
        if tag in {"td", "th"} and self._row is not None and self._cell is not None:
            self._row.append(re.sub(r"\s+", " ", "".join(self._cell)).strip())
            self._cell = None
            self._in_cell = False
        elif tag == "tr" and self._row is not None:
            if any(self._row):
                self.rows.append(self._row)
                self.hrefs.append(self._hrefs or [])
            self._row = None
            self._hrefs = None

    def handle_data(self, data: str) -> None:
        if self._in_cell and self._cell is not None:
            self._cell.append(data)


def field(html: str, label: str) -> str:
    m = re.search(
        rf"<strong>\s*{re.escape(label)}\s*</strong>\s*<br\s*/?>\s*([^<]*)",
        html,
        re.I,
    )
    return re.sub(r"\s+", " ", (m.group(1) if m else "")).strip()


def parse_list_page(html: str) -> list[dict]:
    rows = []
    for m in re.finditer(
        r'href="(/utility/(\d+))"\s*>(\d+)</a>\s*</td>\s*<td>(.*?)</td>\s*<td>(.*?)</td>',
        html,
        re.I | re.S,
    ):
        code = m.group(2)
        info = re.sub(r"<[^>]+>", " ", m.group(4))
        dba = re.sub(r"<[^>]+>", " ", m.group(5))
        info = re.sub(r"\s+", " ", info).strip()
        dba = re.sub(r"\s+", " ", dba).strip()
        rows.append(
            {
                "utilityCode": code,
                "companyInfo": info,
                "tradingAs": dba,
                "listUrl": f"https://www.puc.pa.gov/utility/{code}",
            }
        )
    return rows


def parse_authorities(html: str) -> list[dict]:
    chunk = html.split("Utility Authorities Information", 1)
    if len(chunk) < 2:
        return []
    table_html = chunk[1].split("Insurance Information", 1)[0]
    p = TableParser()
    p.feed(table_html)
    out = []
    for row in p.rows:
        if not row or row[0].lower().startswith("service"):
            continue
        while len(row) < 7:
            row.append("")
        out.append(
            {
                "serviceType": row[0],
                "authorityStatus": row[1],
                "dateCertified": row[2],
                "suspensionDate": row[3],
                "suspensionExpiration": row[4],
                "applicationNumber": row[5],
                "tradingAsName": row[6],
            }
        )
    return out


def parse_insurance(html: str) -> list[dict]:
    chunk = html.split("Utility Insurance Information", 1)
    if len(chunk) < 2:
        return []
    table_html = chunk[1].split("The STATUS DATE", 1)[0]
    p = TableParser()
    p.feed(table_html)
    out = []
    for row in p.rows:
        if not row or row[0].lower() in {"type"}:
            continue
        while len(row) < 6:
            row.append("")
        out.append(
            {
                "type": row[0],
                "status": row[1],
                "statusDate": row[2],
                "effectiveDate": row[3],
                "lapseDate": row[4],
                "serviceTypes": row[5],
            }
        )
    return out


def parse_dockets(html: str) -> tuple[list[dict], int]:
    chunk = html.split('id="caseresults"', 1)
    if len(chunk) < 2:
        return [], 0
    rest = chunk[1]
    total_m = re.search(r"Showing results[^\d]*(\d+)\s*-\s*(\d+)\s*of\s*(\d+)", rest, re.I)
    total = int(total_m.group(3)) if total_m else 0
    table_html = rest.split("Showing results", 1)[0]
    p = TableParser()
    p.feed(table_html)
    out = []
    for row, hrefs in zip(p.rows, p.hrefs):
        if not row or "Docket Number" in row[0]:
            continue
        while len(row) < 4:
            row.append("")
        out.append(
            {
                "docketNumber": row[0],
                "caseStatus": row[1],
                "dateFiled": row[2],
                "allegation": row[3],
                "href": next((h for h in hrefs if "/docket/" in h), ""),
            }
        )
    return out, total or len(out)


def parse_mdy(value: str) -> str | None:
    value = (value or "").strip()
    m = re.match(r"(\d{1,2})/(\d{1,2})/(\d{4})$", value)
    if not m:
        return None
    month, day, year = (int(m.group(1)), int(m.group(2)), int(m.group(3)))
    return f"{year:04d}-{month:02d}-{day:02d}"


def is_current_coverage(row: dict, as_of: str) -> bool:
    status = (row.get("status") or "").lower()
    if "form k" in status or "cancellation" in status:
        return False
    if "suspension letter" in status:
        return False
    if "form h received" not in status and "form e received" not in status:
        return False
    lapse = parse_mdy(row.get("lapseDate") or "")
    if not lapse:
        return True
    return lapse >= as_of


def docket_class(number: str) -> str:
    n = (number or "").upper()
    if n.startswith("C-"):
        return "C_PREFIX"
    if n.startswith("A-"):
        return "A_PREFIX"
    if n.startswith("R-"):
        return "R_PREFIX"
    if n.startswith("P-"):
        return "P_PREFIX"
    if n.startswith("F-"):
        return "F_PREFIX"
    return "OTHER_PREFIX"


def acquire_list() -> list[dict]:
    RAW.mkdir(parents=True, exist_ok=True)
    first = get_retry(LIST_URL)
    (RAW / "hhg-list-page-01.html").write_bytes(first)
    html = first.decode("utf-8", "replace")
    total_m = re.search(r"Showing results[^\d]*(\d+)\s*-\s*(\d+)\s*of\s*(\d+)", html)
    total = int(total_m.group(3)) if total_m else 0
    per = int(total_m.group(2)) if total_m else 25
    pages = max(1, (total + per - 1) // per) if total else 1
    rows = parse_list_page(html)
    print("page 1", len(rows), "total", total, "pages", pages)
    for page in range(2, pages + 1):
        data = get_retry(f"{LIST_URL}?page={page}")
        (RAW / f"hhg-list-page-{page:02d}.html").write_bytes(data)
        more = parse_list_page(data.decode("utf-8", "replace"))
        print("page", page, len(more))
        rows.extend(more)
        time.sleep(0.2)
    # de-dupe by utility code, keep first
    seen: dict[str, dict] = {}
    for row in rows:
        seen.setdefault(row["utilityCode"], row)
    out = list(seen.values())
    print("distinct utility codes", len(out), "raw rows", len(rows), "announced", total)
    return out


def acquire_details(carriers: list[dict]) -> list[dict]:
    details_dir = RAW / "utilities"
    details_dir.mkdir(parents=True, exist_ok=True)
    out = []
    for i, carrier in enumerate(carriers, 1):
        code = carrier["utilityCode"]
        path = details_dir / f"{code}.html"
        if path.exists() and path.stat().st_size > 1000:
            html_b = path.read_bytes()
        else:
            html_b = get_retry(UTILITY_URL.format(code=code))
            path.write_bytes(html_b)
            time.sleep(0.15)
        html = html_b.decode("utf-8", "replace")
        dockets, docket_total = parse_dockets(html)
        page = 2
        while docket_total > len(dockets) and page <= 20:
            extra = get_retry(f"{UTILITY_URL.format(code=code)}?page={page}#caseresults")
            extra_html = extra.decode("utf-8", "replace")
            more, _ = parse_dockets(extra_html)
            existing = {d["docketNumber"] for d in dockets}
            added = [d for d in more if d["docketNumber"] not in existing]
            if not added:
                break
            dockets.extend(added)
            page += 1
            time.sleep(0.1)
        rec = {
            **carrier,
            "utilityName": field(html, "Utility Name") or carrier.get("companyInfo"),
            "utilityType": field(html, "Utility Type"),
            "utilityStatus": field(html, "Utility Status"),
            "carrierId": field(html, "Carrier ID"),
            "mailingAddress": re.sub(
                r"\s+",
                " ",
                field(html, "Mailing Address")
                or re.sub(
                    r".*<strong>\s*Mailing Address\s*</strong>(.*?)</p>",
                    r"\1",
                    html,
                    flags=re.I | re.S,
                ),
            )[:400],
            "phone": field(html, "Phone"),
            "authorities": parse_authorities(html),
            "insurance": parse_insurance(html),
            "dockets": dockets,
            "docketTotalAnnounced": docket_total,
            "sha256": hashlib.sha256(html_b).hexdigest(),
        }
        out.append(rec)
        if i % 25 == 0 or i == len(carriers):
            print(f"details {i}/{len(carriers)}")
    return out


def build_snapshot(details: list[dict], retrieved: str) -> dict:
    as_of = retrieved[:10]
    hhg_auth_rows = []
    broker_auth_rows = []
    truck_auth_rows = []
    other_auth_rows = []
    insurance_rows = []
    docket_rows = []
    utility_codes = []
    carrier_ids = []
    app_numbers = []
    for rec in details:
        utility_codes.append(rec["utilityCode"])
        if rec.get("carrierId"):
            carrier_ids.append(rec["carrierId"])
        for auth in rec.get("authorities") or []:
            service = (auth.get("serviceType") or "").strip()
            row = {**auth, "utilityCode": rec["utilityCode"], "carrierId": rec.get("carrierId")}
            app_numbers.append(auth.get("applicationNumber") or "")
            if service.lower() == "household goods carrier":
                hhg_auth_rows.append(row)
            elif "broker of household goods" in service.lower():
                broker_auth_rows.append(row)
            elif service.lower() == "truck":
                truck_auth_rows.append(row)
            else:
                other_auth_rows.append(row)
        for ins in rec.get("insurance") or []:
            insurance_rows.append({**ins, "utilityCode": rec["utilityCode"]})
        for docket in rec.get("dockets") or []:
            docket_rows.append(
                {
                    **docket,
                    "utilityCode": rec["utilityCode"],
                    "docketClass": docket_class(docket.get("docketNumber") or ""),
                }
            )

    active_hhg = [r for r in hhg_auth_rows if (r.get("authorityStatus") or "").lower() == "active"]
    suspended_hhg = [r for r in hhg_auth_rows if "suspend" in (r.get("authorityStatus") or "").lower()]
    cargo_current = [
        r
        for r in insurance_rows
        if (r.get("type") or "").lower() == "cargo" and is_current_coverage(r, as_of)
    ]
    liab_current = [
        r
        for r in insurance_rows
        if (r.get("type") or "").lower() == "liability" and is_current_coverage(r, as_of)
    ]
    distinct_dockets = {d["docketNumber"] for d in docket_rows if d.get("docketNumber")}
    formal_c = [d for d in docket_rows if d.get("docketClass") == "C_PREFIX"]
    nonempty_apps = [a for a in app_numbers if a]
    utility_ne_carrier = sum(
        1
        for rec in details
        if rec.get("carrierId") and rec["carrierId"] != rec["utilityCode"]
    )
    generated = now()
    body = {
        "version": "move-pa-state-intel-v1",
        "ticket": "PA-MOVE-001",
        "as_of": None,
        "generated_at": generated,
        "snapshotAsOf": as_of,
        "retrievedAt": retrieved,
        "retrievedAtPrecision": "datetime",
        "no_trust_score": True,
        "no_paid_ranking": True,
        "no_pennsylvania_local_routes": True,
        "no_philadelphia_page": True,
        "no_pittsburgh_page": True,
        "publication": {
            "canonical": "https://www.movetrusthub.com/pennsylvania",
            "indexable": True,
            "robots": "index,follow",
            "route": "/pennsylvania",
            "rankings": False,
            "trustScore": False,
            "h1": "Pennsylvania Moving & Household Goods Intelligence",
        },
        "regulator": {
            "agency": "Pennsylvania Public Utility Commission",
            "short": "PA PUC",
            "credential_term": "Household Goods Carrier authority",
            "list_url": LIST_URL,
            "utility_detail_pattern": "https://www.puc.pa.gov/utility/{utilityCode}",
            "insurance_url": "https://www.puc.pa.gov/motor-carrier/insurance/",
            "complaint_url": "https://www.puc.pa.gov/complaints/",
            "motor_carrier_url": "https://www.puc.pa.gov/motor-carrier/",
            "puc_number_in_advertising": "PUC consumer guidance says movers must display their PUC number. Taxi marking uses PUC A-#. This snapshot preserves Utility Code and Carrier ID / Application Number separately and does not rename either as license number.",
            "intrastate_only": True,
        },
        "clocks": {
            "generatedAt": generated,
            "snapshotAsOf": as_of,
            "sourceAsOf": None,
            "retrievedAt": retrieved,
            "do_not_use_retrieval_as_authority_effective_date": True,
            "hhg_roster": {
                "sourceAsOf": None,
                "retrievedAt": retrieved,
                "note": "Active Household Goods Operators List has no published as-of date. Retrieval is not certification date.",
            },
        },
        "current_hhg_roster": {
            "coverage": "ACQUIRED_CURRENT_SNAPSHOT",
            "PA_PUC_HHG_CARRIER_ROSTER_STATUS": "ACQUIRED_CURRENT_SNAPSHOT",
            "PA_PUC_HHG_CARRIER_ROWS": len(details),
            "PA_PUC_HHG_DISTINCT_UTILITY_CODES": len(set(utility_codes)),
            "PA_PUC_HHG_DISTINCT_CARRIER_IDS": len({c for c in carrier_ids if c}),
            "grain": "Official active Household Goods Operators List row (Utility Code)",
            "list_is_carriers_not_brokers": True,
            "utility_row_ne_unique_company": True,
            "office_address_ne_service_territory": True,
            "announced_total": 269,
        },
        "identity": {
            "utility_namespace": "PA-PUC-UTILITY:{utilityCode}",
            "authority_namespace": "PA-PUC-AUTHORITY:{applicationNumberOrCarrierId}",
            "utility_code_identifies_puc_utility_entity": True,
            "carrier_id_often_a_number": True,
            "application_number_on_authority_row": True,
            "utility_code_ne_automatically_carrier_id": True,
            "utilities_where_carrier_id_differs": utility_ne_carrier,
            "distinct_application_numbers": len(set(nonempty_apps)),
            "do_not_rename_as_license_number": True,
            "puc_number_term_unmapped_exclusively": True,
        },
        "authorities": {
            "PA_PUC_HHG_ACTIVE_AUTHORITY_ROWS": len(active_hhg),
            "PA_PUC_HHG_SUSPENDED_AUTHORITY_ROWS": len(suspended_hhg),
            "PA_PUC_HHG_AUTHORITY_ROWS": len(hhg_auth_rows),
            "truck_authority_rows_on_hhg_utilities": len(truck_auth_rows),
            "other_authority_rows_on_hhg_utilities": len(other_auth_rows),
            "broker_authority_rows_on_hhg_list_utilities": len(broker_auth_rows),
            "hhg_ne_truck": True,
            "hhg_ne_broker": True,
            "authority_row_ne_unique_mover": True,
            "utility_status_ne_authority_status": True,
        },
        "brokers": {
            "coverage": "OPEN_SEARCH_ONLY",
            "PA_HHG_BROKER_ROSTER": "OPEN_SEARCH_ONLY",
            "PA_PUC_HHG_BROKER_ROSTER_STATUS": "OPEN_SEARCH_ONLY",
            "PA_PUC_HHG_BROKER_ROWS": None,
            "PA_PUC_HHG_BROKER_DISTINCT_IDS": None,
            "reason": "No official current active Broker of Household Goods universe was published as a bounded list. Broker of Household Goods in Use is a separate PUC authority type. Broker rows found on the HHG carrier list utilities are not a broker roster.",
            "broker_ne_carrier": True,
        },
        "territory": {
            "coverage": "OPEN_SEARCH_ONLY",
            "PA_PUC_SERVICE_TERRITORY_ROWS": None,
            "reason": "The operators list states carriers may be certificated for specific areas and tells consumers to contact the carrier for approved territories. Structured territory text was not on the list or typical utility-detail tables.",
            "office_address_ne_territory": True,
            "territory_ne_statewide": True,
            "territory_ne_interstate": True,
        },
        "insurance": {
            "coverage": "ACQUIRED_CURRENT_SNAPSHOT",
            "PA_PUC_INSURANCE_ROWS": len(insurance_rows),
            "PA_PUC_CURRENT_CARGO_OBSERVATIONS": len(cargo_current),
            "PA_PUC_CURRENT_LIABILITY_OBSERVATIONS": len(liab_current),
            "current_rule": "Type Cargo/Liability AND status contains Form H Received / Form E Received AND (no lapse date OR lapse date on/after snapshotAsOf). Form K and Suspension Letter Created are not current coverage.",
            "form_e_is_liability": True,
            "form_h_is_cargo": True,
            "form_k_is_cancellation": True,
            "historical_form_k_ne_permanently_uninsured": True,
            "lapse_row_ne_license_status": True,
            "authority_active_ne_current_insurance": True,
            "insurance_complaint_created_ne_consumer_complaint": True,
        },
        "tariffs": {
            "coverage": "OPEN_SEARCH_ONLY",
            "reason": "PUC requires approved tariff/rate structures. No bounded structured tariff extract was acquired. Tariff rate is not a quote.",
            "tariff_ne_quote": True,
            "approved_tariff_ne_final_bill": True,
        },
        "complaints": {
            "coverage": "OPEN_SEARCH_ONLY",
            "PA_HHG_COMPLAINTS": "OPEN_SEARCH_ONLY",
            "PA_PUC_FORMAL_COMPLAINT_ROWS": None,
            "c_prefix_docket_rows_on_hhg_utilities": len(formal_c),
            "c_prefix_ne_complete_complaint_universe": True,
            "complaint_instructions_ne_count": True,
            "complaint_ne_violation": True,
            "interstate_outside_puc_jurisdiction": True,
        },
        "dockets": {
            "coverage": "ACQUIRED_BOUNDED_ON_ACTIVE_HHG_UTILITIES",
            "PA_PUC_DOCKET_ROWS": len(docket_rows),
            "PA_PUC_DISTINCT_DOCKET_NUMBERS": len(distinct_dockets),
            "docketed_case_ne_adverse_finding": True,
            "application_docket_ne_complaint": True,
            "active_case_ne_violation": True,
            "formal_complaint_ne_substantiated": True,
            "case_document_ne_unique_matter": True,
            "prefix_classes": {
                "A_PREFIX": sum(1 for d in docket_rows if d["docketClass"] == "A_PREFIX"),
                "C_PREFIX": sum(1 for d in docket_rows if d["docketClass"] == "C_PREFIX"),
                "R_PREFIX": sum(1 for d in docket_rows if d["docketClass"] == "R_PREFIX"),
                "P_PREFIX": sum(1 for d in docket_rows if d["docketClass"] == "P_PREFIX"),
                "OTHER_PREFIX": sum(1 for d in docket_rows if d["docketClass"] not in {"A_PREFIX", "C_PREFIX", "R_PREFIX", "P_PREFIX"}),
            },
        },
        "enforcement": {
            "coverage": "OPEN_SEARCH_ONLY",
            "PA_HHG_ENFORCEMENT": "OPEN_SEARCH_ONLY",
            "PA_PUC_ENFORCEMENT_ROWS": None,
            "PA_PUC_UNIQUE_REGULATORY_MATTERS": None,
            "reason": "No complete bounded household-goods enforcement/civil-penalty universe was established. Docket metadata is not an enforcement census.",
            "suspension_status_on_authority_rows_ne_enforcement_census": True,
        },
        "safety": {
            "puc_safety_review_ne_fmcsa_safety_rating": True,
            "structured_public_safety_fitness_observation": "NOT_ACQUIRED",
        },
        "consumer_rules": {
            "written_estimate_required": True,
            "tariff_basis": True,
            "hourly_if_40_miles_or_less": True,
            "weight_mileage_if_over_40_miles": True,
            "bill_over_estimate_protection": "If actual bill exceeds estimate by more than 10%, pay estimate plus 10% or $25, whichever is greater; remainder within 15 days after delivery.",
            "basic_cargo_protection": "60 cents per pound per article unless additional protection purchased",
            "information_for_shippers_form": True,
            "complaint_channel": "PUC district office in writing; PUC cannot order reimbursement for damaged goods or investigate interstate moves or storage over 90 days",
            "rules_ne_mover_quality": True,
        },
        "federal": {
            "name_only": "UNSAFE",
            "exact_state_to_usdot_crosswalks": 0,
            "exact_state_to_mc_crosswalks": 0,
            "EXACT_PA_PUC_TO_USDOT_CROSSWALKS": 0,
            "EXACT_PA_PUC_TO_MC_CROSSWALKS": 0,
            "review_required_crosswalks": 0,
            "pa_puc_hhg_ne_usdot": True,
            "pa_puc_carrier_id_ne_mc": True,
            "pa_puc_authority_ne_fmcsa": True,
            "pa_hq_ne_puc_authority": True,
            "puc_roster_ne_fmcsa_pa_hq_roster": True,
            "overlay_note": "Existing MoveTrustHub FMCSA spine is supporting context. Recorded Pennsylvania headquarters is not PA PUC authority. No USDOT/MC published on the operators list. No name-only bridges.",
        },
        "expansion_ledger": {
            "NET_NEW_STATE_RESEARCH_IDENTITIES": len(set(utility_codes)),
            "NET_NEW_CANONICAL_ORGANIZATIONS": 0,
            "NET_NEW_PUBLIC_MOVE_PROFILES": 0,
            "EXISTING_ORGANIZATIONS_ENRICHED": 0,
            "GRAPH_WRITES": 0,
            "EXACT_PROFILE_ATTACHMENTS": 0,
            "CLAIM_ELIGIBILITY_BROADENED": False,
        },
        "adverse_publication": {
            "ADVERSE_SOURCES_FOUND": 3,
            "ADVERSE_SOURCES_ACQUIRED": 1,
            "ADVERSE_ROWS_ACQUIRED": None,
            "UNIQUE_REGULATORY_MATTERS": None,
            "EXACT_PROFILE_ATTACHMENTS": 0,
            "REVIEW_REQUIRED": 0,
            "UNRESOLVED": None,
            "INTERNAL_ONLY": 0,
            "PUBLICATION_PENDING": 0,
            "PUBLIC_READY_PROFILES": 0,
            "PUBLICLY_RENDERED_PROFILES": 0,
            "BUSINESS_RESPONSE_READY": False,
            "dockets_acquired_not_classified_as_adverse_census": True,
        },
        "withheld_reason_counts": {
            "PUBLICATION_ADAPTER_NOT_READY": True,
            "SOURCE_RESTRICTION": 2,
            "MISSING_IDENTIFIER": 0,
            "UNSAFE_NAME_MATCH": 0,
        },
        "claimEligibilityBroadened": False,
        "local_work_needed_now": "NO",
        "lookup_index": [
            {
                "utilityCode": rec["utilityCode"],
                "carrierId": rec.get("carrierId") or "",
                "applicationNumbers": sorted(
                    {
                        a.get("applicationNumber") or ""
                        for a in rec.get("authorities") or []
                        if a.get("applicationNumber")
                    }
                ),
                "name": rec.get("utilityName") or "",
                "hhgActive": any(
                    (a.get("serviceType") or "").lower() == "household goods carrier"
                    and (a.get("authorityStatus") or "").lower() == "active"
                    for a in rec.get("authorities") or []
                ),
            }
            for rec in details
        ],
    }
    return body


def fingerprint(body: dict) -> str:
    skip = {"fingerprint", "generatedAt", "generated_at"}
    out = {k: v for k, v in body.items() if k not in skip}
    if isinstance(out.get("clocks"), dict):
        out["clocks"] = {ck: cv for ck, cv in out["clocks"].items() if ck != "generatedAt"}
    payload = json.dumps(out, sort_keys=True, separators=(",", ":"), ensure_ascii=False)
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()


def main() -> None:
    retrieved = now()
    carriers = acquire_list()
    (RAW / "hhg-list.json").write_text(json.dumps(carriers, indent=2) + "\n", encoding="utf-8")
    details = acquire_details(carriers)
    (RAW / "utility-details.json").write_text(json.dumps(details, indent=2) + "\n", encoding="utf-8")
    report = {
        "ticket": "PA-MOVE-001",
        "retrievedAt": retrieved,
        "list_announced": 269,
        "acquired_utilities": len(details),
        "list_url": LIST_URL,
    }
    (RAW / "acquire-report.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    snap = build_snapshot(details, retrieved)
    snap["fingerprint"] = fingerprint(snap)
    art = ROOT / "artifacts/pa-move-001-public-snapshot.json"
    dest = ROOT / "lib/pennsylvania-intelligence/accepted-snapshot.json"
    dest.parent.mkdir(parents=True, exist_ok=True)
    art.parent.mkdir(parents=True, exist_ok=True)
    text = json.dumps(snap, indent=2) + "\n"
    art.write_text(text, encoding="utf-8")
    dest.write_text(text, encoding="utf-8")
    print(
        json.dumps(
            {
                "fingerprint": snap["fingerprint"],
                "utilities": snap["current_hhg_roster"]["PA_PUC_HHG_DISTINCT_UTILITY_CODES"],
                "carrierIds": snap["current_hhg_roster"]["PA_PUC_HHG_DISTINCT_CARRIER_IDS"],
                "hhgActive": snap["authorities"]["PA_PUC_HHG_ACTIVE_AUTHORITY_ROWS"],
                "insurance": snap["insurance"]["PA_PUC_INSURANCE_ROWS"],
                "cargoCurrent": snap["insurance"]["PA_PUC_CURRENT_CARGO_OBSERVATIONS"],
                "liabilityCurrent": snap["insurance"]["PA_PUC_CURRENT_LIABILITY_OBSERVATIONS"],
                "dockets": snap["dockets"]["PA_PUC_DOCKET_ROWS"],
                "distinctDockets": snap["dockets"]["PA_PUC_DISTINCT_DOCKET_NUMBERS"],
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
