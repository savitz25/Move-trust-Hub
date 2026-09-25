#!/usr/bin/env python3
"""NV-MOVE-001 — parse the Nevada Transportation Authority (NTA) household-goods mover evidence.

Acquisition helper (needs pdfplumber; raw files are gitignored under data/nevada/nv-move-001/raw/).
Sources, retrieved 2026-09-25 with an ordinary browser User-Agent and throttled requests:
  - NTA Active Certificates, category "5 Mover" (tsa1.nv.gov/ActiveCertificatesTable.asp?nNo=5):
    Certificate No, Status, Carrier Name, Carrier DBA, Phone, Fax. This is NTA's own class for
    household-goods movers and is the primary classification evidence.
  - NTA Tariffs & Certificates directory (nta.nv.gov/Carriers/Tariffs-Certificates/): every
    transportation class, sorted by corporate name; Corporate Name, DBA, CPCN/Permit (with any
    status text), Tariff link. It has no class column, so it is never counted as movers.
  - Certificate and tariff PDFs for the 3xxx-series directory rows (bounded document pass), used
    only to find the words "household goods" in NTA-filed documents for rows that are not on the
    Active Mover list. A company name is never classification evidence.
  - 2026 public notices (bounded): application notices whose NTA notice text says household goods.
Phones, faxes, addresses and people named in documents are not written. Output (committed):
  data/nevada/nv-move-001/roster.json
"""
from __future__ import annotations

import hashlib
import html
import json
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
RAW = ROOT / "data/nevada/nv-move-001/raw"
DEST = ROOT / "data/nevada/nv-move-001/roster.json"
NTA = "https://nta.nv.gov"
DIRECTORY = "https://nta.nv.gov/Carriers/Tariffs-Certificates/"
ACTIVE_INDEX = "http://tsa1.nv.gov/ActiveCertificates.asp"
ACTIVE_MOVER = "http://tsa1.nv.gov/ActiveCertificatesTable.asp?nNo=5"
ACTIVE_WAREHOUSE = "http://tsa1.nv.gov/ActiveCertificatesTable.asp?nNo=10"
COMPLAINTS = "https://nta.nv.gov/Forms/Complaints/"
NOTICES_2026 = "https://nta.nv.gov/About/Notices/2026/2026_Notices/"
RETRIEVED_AT = "2026-09-25T15:05:00Z"
HHG = re.compile(r"household goods", re.I)


def text(fragment: str) -> str:
    return " ".join(html.unescape(re.sub(r"<[^>]+>", " ", fragment)).replace("\xa0", " ").split())


def cells(row: str) -> list[str]:
    return re.findall(r"<t[dh][^>]*>(.*?)</t[dh]>", row, re.S | re.I)


def sha_file(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def absolute(href: str | None) -> str | None:
    if not href:
        return None
    url = href if href.startswith("http") else NTA + href
    return url.replace(" ", "%20")


def base(cpcn: str) -> str:
    return re.split(r"[.\s]", cpcn, maxsplit=1)[0]


def parse_directory() -> list[dict]:
    page = (RAW / "tariffs-certificates.html").read_text(encoding="utf-8", errors="replace")
    rows = []
    for row in re.findall(r"<tr[^>]*>(.*?)</tr>", page, re.S | re.I):
        c = cells(row)
        if len(c) != 4 or "Corporate Name" in c[0]:
            continue
        cell = text(c[2])
        m = re.match(r"((?:[A-Z]{2,4}\s?)?\d[\dA-Za-z.\-]*)\s*(.*)$", cell)
        rows.append(
            {
                "corporateName": text(c[0]),
                "dba": text(c[1]) or None,
                "cpcnPermitCell": cell,
                "cpcnPermit": m.group(1) if m else None,
                "statusText": (m.group(2) if m else cell) or None,
                "certificateUrl": absolute((re.findall(r'href="([^"]+)"', c[2]) or [None])[0]),
                "tariffLinkText": text(c[3]) or None,
                "tariffUrl": absolute((re.findall(r'href="([^"]+)"', c[3]) or [None])[0]),
            }
        )
    return rows


def parse_active(name: str) -> list[dict]:
    page = (RAW / name).read_text(encoding="utf-8", errors="replace")
    body = [[text(x) for x in cells(r)] for r in re.findall(r"<tr[^>]*>(.*?)</tr>", page, re.S | re.I)]
    header, data = body[0], body[1:]
    if header[:4] != ["Certificate No", "Status", "Carrier Name", "Carrier DBA"]:
        raise SystemExit(f"{name} header drifted: {header}")
    return [{"certificate": r[0], "statusAsPrinted": r[1], "carrierName": r[2], "dba": r[3] or None} for r in data]


def pdf_text(manifest: dict, url: str | None) -> tuple[str, dict | None]:
    import pdfplumber

    if not url or url not in manifest:
        return "", None
    meta = manifest[url]
    path = RAW / meta["file"]
    with pdfplumber.open(path) as pdf:
        pages = len(pdf.pages)
        body = " ".join(" ".join((p.extract_text() or "") for p in pdf.pages[:3]).split())
    return body, {"sha256": sha_file(path), "pages": pages, "textChars": len(body)}


def main() -> None:
    directory = parse_directory()
    movers = parse_active("active-mover.html")
    warehouse = parse_active("active-warehouse.html")
    raw_manifest = json.loads((RAW / "pdf-manifest.json").read_text(encoding="utf-8"))
    manifest = {k.replace(" ", "%20"): v for k, v in raw_manifest.items()}

    by_exact: dict[str, list[dict]] = {}
    by_base: dict[str, list[dict]] = {}
    for row in directory:
        if row["cpcnPermit"]:
            by_exact.setdefault(row["cpcnPermit"], []).append(row)
            by_base.setdefault(base(row["cpcnPermit"]), []).append(row)

    def documents(row: dict | None) -> dict:
        if not row:
            return {"tariffUrl": None, "tariffTitleSaysHouseholdGoods": None, "tariffPdf": None, "certificateTextSaysHouseholdGoods": None}
        t_text, t_meta = pdf_text(manifest, row["tariffUrl"])
        c_text, _ = pdf_text(manifest, row["certificateUrl"])
        return {
            "tariffUrl": row["tariffUrl"],
            "tariffTitleSaysHouseholdGoods": bool(HHG.search(t_text)) if t_meta and t_meta["textChars"] > 200 else None,
            "tariffPdf": t_meta,
            "certificateTextSaysHouseholdGoods": bool(HHG.search(c_text)) if len(c_text) > 200 else None,
        }

    out = []
    for m in movers:
        exact = by_exact.get(m["certificate"], [])
        near = [] if exact else by_base.get(base(m["certificate"]), [])
        if len(exact) + len(near) > 1:
            raise SystemExit(f"ambiguous directory match for {m['certificate']}")
        d = (exact or near or [None])[0]
        out.append(
            {
                "cpcn": m["certificate"],
                "carrierName": m["carrierName"],
                "dba": m["dba"],
                "classificationEvidence": "NTA_ACTIVE_CERTIFICATES_CATEGORY_MOVER",
                "ntaActiveListStatus": m["statusAsPrinted"],
                "directoryMatch": "EXACT_CPCN" if exact else ("CPCN_BASE_NUMBER_REVISION_DIFFERS" if near else "NOT_IN_DIRECTORY"),
                "directoryCpcnAsPrinted": d["cpcnPermit"] if d else None,
                "directoryStatusText": d["statusText"] if d else None,
                "directoryCorporateName": d["corporateName"] if d else None,
                "certificateUrl": d["certificateUrl"] if d else None,
                **documents(d),
            }
        )
    listed_bases = {base(m["certificate"]) for m in movers}
    for d in directory:
        cp = d["cpcnPermit"]
        if not cp or not re.fullmatch(r"3\d{3}(?:\.\d+)?", cp) or base(cp) in listed_bases:
            continue
        docs = documents(d)
        c_text, _ = pdf_text(manifest, d["certificateUrl"])
        t_text, _ = pdf_text(manifest, d["tariffUrl"])
        if not (HHG.search(c_text) or HHG.search(t_text)):
            continue
        out.append(
            {
                "cpcn": cp,
                "carrierName": d["corporateName"],
                "dba": d["dba"],
                "classificationEvidence": "NTA_FILED_DOCUMENT_SAYS_HOUSEHOLD_GOODS_NOT_ON_ACTIVE_MOVER_LIST",
                "ntaActiveListStatus": None,
                "directoryMatch": "EXACT_CPCN",
                "directoryCpcnAsPrinted": cp,
                "directoryStatusText": d["statusText"],
                "directoryCorporateName": d["corporateName"],
                "certificateUrl": d["certificateUrl"],
                **docs,
            }
        )
    out.sort(key=lambda r: (r["classificationEvidence"], r["carrierName"].lower(), r["cpcn"]))

    notices = json.loads((RAW / "notices-2026-classified.json").read_text(encoding="utf-8"))
    hhg_notices = [
        {
            "docket": n["docket"],
            "type": n["type"],
            "noticeDate": n["date"],
            "applicant": re.split(r",? filed an? ", n["description"])[0],
            "noticeSaysHouseholdGoods": True,
            "noticeUrl": n["url"],
            "noticeSha256": n["sha256"],
        }
        for n in notices
        if n.get("hhg")
    ]
    ev = Counter(r["classificationEvidence"] for r in out)
    summary = {
        "directoryRows": len(directory),
        "directoryRowsWithCpcn": sum(1 for r in directory if r["cpcnPermit"]),
        "directoryStatusTexts": dict(sorted(Counter(r["statusText"] for r in directory if r["statusText"] and not re.match(r"^\d", r["statusText"])).items())),
        "activeMoverCategoryRows": len(movers),
        "activeMoverStatusAsPrinted": dict(Counter(m["statusAsPrinted"] for m in movers)),
        "activeWarehousePermitRows": len(warehouse),
        "hhgRows": len(out),
        "hhgDistinctCpcnBase": len({base(r["cpcn"]) for r in out}),
        "hhgByEvidence": dict(sorted(ev.items())),
        "activeMoverDirectoryMatch": dict(sorted(Counter(r["directoryMatch"] for r in out if r["ntaActiveListStatus"]).items())),
        "hhgDirectoryStatusText": dict(sorted(Counter(r["directoryStatusText"] or "(none printed)" for r in out).items())),
        "hhgWithTariffLink": sum(1 for r in out if r["tariffUrl"]),
        "hhgTariffTitleSaysHouseholdGoods": sum(1 for r in out if r["tariffTitleSaysHouseholdGoods"]),
        "hhgTariffScannedWithoutText": sum(1 for r in out if r["tariffUrl"] and r["tariffTitleSaysHouseholdGoods"] is None),
        "directory3xxxRowsExcludedAsNotHhg": sum(
            1
            for d in directory
            if d["cpcnPermit"] and re.fullmatch(r"3\d{3}(?:\.\d+)?", d["cpcnPermit"]) and base(d["cpcnPermit"]) not in {base(r["cpcn"]) for r in out}
        ),
        "notices2026Rows": len(notices),
        "notices2026HhgApplications": len(hhg_notices),
        "federalIdentifiersOnSource": False,
        "exactUsdotJoins": 0,
        "exactMcJoins": 0,
    }
    body = {
        "source": {
            "agency": "Nevada Transportation Authority",
            "directory": DIRECTORY,
            "directorySha256": sha_file(RAW / "tariffs-certificates.html"),
            "activeCertificatesIndex": ACTIVE_INDEX,
            "activeMoverCategory": ACTIVE_MOVER,
            "activeMoverSha256": sha_file(RAW / "active-mover.html"),
            "activeWarehousePermitCategory": ACTIVE_WAREHOUSE,
            "complaints": COMPLAINTS,
            "complaintsSha256": sha_file(RAW / "complaints.html"),
            "notices2026": NOTICES_2026,
            "retrievedAt": RETRIEVED_AT,
            "fieldsNotWritten": ["Phone", "Fax", "addresses", "people named in tariffs or notices"],
        },
        "rows": out,
        "notices2026Hhg": hhg_notices,
        "summary": summary,
    }
    DEST.write_text(json.dumps(body, indent=2, ensure_ascii=False) + "\n", encoding="utf-8", newline="\n")
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
