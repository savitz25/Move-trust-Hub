#!/usr/bin/env python3
"""Parse the official DPS Household Goods movers grid. No USDOT inference."""
from __future__ import annotations

import json
import re
from html import unescape
from pathlib import Path

src = Path(r"C:\Users\makei\AppData\Local\Temp\ga-hhgrid.html")
html = src.read_text(encoding="utf-8", errors="replace")
rows = []
for block in re.findall(r"<tr style=\"font-size:small\">([\s\S]*?)</tr>", html):
    cells = [unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", c))).strip() for c in re.findall(r"<td[^>]*>([\s\S]*?)</td>", block)]
    if len(cells) < 8:
        continue
    name, city, state, email, phone, mca, address, zip_code = cells[:8]
    dba = None
    legal = name
    m = re.split(r"\s+d/b/a\s+", name, maxsplit=1, flags=re.I)
    if len(m) == 2:
        legal, dba = m[0].strip(), m[1].strip()
    rows.append({
        "mca": mca,
        "legalName": legal,
        "dba": dba,
        "sourceName": name,
        "city": city,
        "state": state,
        "postalCode": zip_code,
        "address": address,
        "phone": phone or None,
        "email": email or None,
        "status": "LISTED_ON_DPS_LICENSED_HHG_ROSTER",
    })

seen = set()
unique = []
for row in rows:
    key = (row["mca"], row["sourceName"], row["address"], row["city"], row["phone"], row["postalCode"])
    if key in seen:
        continue
    seen.add(key)
    unique.append(row)
rows = unique
mcas = [r["mca"] for r in rows if r["mca"]]
out = {
    "source": "https://regulatorycompliance.gamccd.net/public/Home/_HHgrid",
    "listPage": "https://www.gamccd.net/HouseholdGoods.aspx",
    "portal": "https://regulatorycompliance.gamccd.net/public/",
    "rows": rows,
    "summary": {
        "rawTableRows": len(re.findall(r"<tr style=\"font-size:small\">", html)),
        "rows": len(rows),
        "distinctMca": len(set(mcas)),
        "missingMca": sum(1 for r in rows if not r["mca"]),
        "withDba": sum(1 for r in rows if r["dba"]),
        "withPhone": sum(1 for r in rows if r["phone"]),
        "withEmail": sum(1 for r in rows if r["email"]),
        "states": sorted(set(r["state"] for r in rows)),
    },
}
dest = Path("data/georgia/ga-move-001/roster.json")
dest.parent.mkdir(parents=True, exist_ok=True)
dest.write_text(json.dumps(out, indent=2), encoding="utf-8")
print(json.dumps(out["summary"], indent=2))
