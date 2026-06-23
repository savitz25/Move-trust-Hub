#!/usr/bin/env python3
"""Generate batch 7 Kansas county curation snippets."""

from pathlib import Path

COUNTIES = [
    {"slug": "republic", "seat": "Belleville", "tier": 8, "region": "north central", "fmcsa": True},
    {"slug": "rooks", "seat": "Stockton", "tier": 8, "region": "northwest"},
    {"slug": "stafford", "seat": "St. John", "tier": 8, "region": "central"},
    {"slug": "barber", "seat": "Medicine Lodge", "tier": 8, "region": "south central"},
    {"slug": "smith", "seat": "Smith Center", "tier": 8, "region": "north central"},
    {"slug": "osborne", "seat": "Osborne", "tier": 8, "region": "north central"},
    {"slug": "woodson", "seat": "Yates Center", "tier": 8, "region": "southeast"},
    {"slug": "graham", "seat": "Hill City", "tier": 8, "region": "northwest"},
    {"slug": "rawlins", "seat": "Atwood", "tier": 8, "region": "northwest"},
    {"slug": "sheridan", "seat": "Hoxie", "tier": 8, "region": "northwest"},
    {"slug": "kearny", "seat": "Lakin", "tier": 4, "region": "southwest"},
    {"slug": "meade", "seat": "Meade", "tier": 4, "region": "southwest"},
    {"slug": "haskell", "seat": "Sublette", "tier": 4, "region": "southwest"},
    {"slug": "chautauqua", "seat": "Sedan", "tier": 4, "region": "southeast"},
    {"slug": "rush", "seat": "La Crosse", "tier": 4, "region": "central"},
    {"slug": "lincoln", "seat": "Lincoln", "tier": 4, "region": "central"},
    {"slug": "jewell", "seat": "Mankato", "tier": 4, "region": "north central"},
    {"slug": "trego", "seat": "WaKeeney", "tier": 4, "region": "central"},
    {"slug": "decatur", "seat": "Oberlin", "tier": 4, "region": "northwest"},
    {"slug": "logan", "seat": "Oakley", "tier": 4, "region": "northwest"},
    {"slug": "ness", "seat": "Ness City", "tier": 4, "region": "central"},
    {"slug": "gove", "seat": "Gove City", "tier": 4, "region": "central"},
    {"slug": "edwards", "seat": "Kinsley", "tier": 4, "region": "central"},
    {"slug": "chase", "seat": "Cottonwood Falls", "tier": 4, "region": "east central"},
    {"slug": "clark", "seat": "Ashland", "tier": 4, "region": "southwest"},
    {"slug": "comanche", "seat": "Coldwater", "tier": 4, "region": "south central"},
    {"slug": "elk", "seat": "Howard", "tier": 4, "region": "southeast"},
    {"slug": "hodgeman", "seat": "Jetmore", "tier": 4, "region": "southwest"},
    {"slug": "kiowa", "seat": "Greensburg", "tier": 4, "region": "south central"},
    {"slug": "lane", "seat": "Dighton", "tier": 4, "region": "southwest"},
    {"slug": "morton", "seat": "Elkhart", "tier": 4, "region": "southwest"},
    {"slug": "stanton", "seat": "Johnson City", "tier": 4, "region": "southwest"},
    {"slug": "cheyenne", "seat": "St. Francis", "tier": 3, "region": "northwest", "three": True},
    {"slug": "greeley", "seat": "Tribune", "tier": 3, "region": "west", "three": True},
    {"slug": "hamilton", "seat": "Syracuse", "tier": 3, "region": "southwest", "three": True},
    {"slug": "wallace", "seat": "Sharon Springs", "tier": 3, "region": "northwest", "three": True},
    {"slug": "wichita", "seat": "Leoti", "tier": 3, "region": "west", "three": True},
]

NEIGHBORS = {
    "republic": ["cloud", "washington", "marshall", "jewell", "smith", "norton"],
    "rooks": ["phillips", "smith", "osborne", "ellis", "graham", "jewell"],
    "stafford": ["rice", "barton", "reno", "pratt", "kingman", "edwards"],
    "barber": ["harper", "kingman", "pratt", "kiowa", "comanche", "sumner"],
    "smith": ["jewell", "phillips", "norton", "republic", "mitchell", "osborne"],
    "osborne": ["smith", "mitchell", "lincoln", "russell", "rooks", "ellis"],
    "woodson": ["wilson", "allen", "neosho", "coffey", "greenwood", "elk"],
    "graham": ["norton", "decatur", "rawlins", "rooks", "trego", "ellis"],
    "rawlins": ["thomas", "sherman", "cheyenne", "decatur", "graham", "norton"],
    "sheridan": ["thomas", "sherman", "decatur", "rawlins", "logan", "graham"],
    "kearny": ["finney", "grant", "hamilton", "wichita", "haskell", "lane"],
    "meade": ["gray", "ford", "clark", "seward", "haskell", "finney"],
    "haskell": ["finney", "seward", "grant", "kearny", "meade", "gray"],
    "chautauqua": ["elk", "cowley", "wilson", "montgomery", "labette", "greenwood"],
    "rush": ["ellis", "norton", "trego", "pawnee", "barton", "ness"],
    "lincoln": ["saline", "ottawa", "mitchell", "ellsworth", "russell", "osborne"],
    "jewell": ["republic", "cloud", "mitchell", "smith", "phillips", "washington"],
    "trego": ["ellis", "rush", "gove", "ness", "lane", "graham"],
    "decatur": ["sheridan", "rawlins", "norton", "graham", "thomas", "sherman"],
    "logan": ["sherman", "wallace", "greeley", "scott", "thomas", "rawlins"],
    "ness": ["rush", "trego", "lane", "pawnee", "gove", "hodgeman"],
    "gove": ["trego", "ness", "lane", "scott", "logan", "graham"],
    "edwards": ["pawnee", "pratt", "kiowa", "barber", "stafford", "ness"],
    "chase": ["lyon", "greenwood", "butler", "marion", "morris", "wabaunsee"],
    "clark": ["ford", "meade", "gray", "comanche", "kiowa", "edwards"],
    "comanche": ["barber", "kiowa", "clark", "edwards", "pratt", "harper"],
    "elk": ["wilson", "chautauqua", "greenwood", "montgomery", "cowley", "woodson"],
    "hodgeman": ["pawnee", "edwards", "ford", "gray", "ness", "finney"],
    "kiowa": ["barber", "pratt", "edwards", "comanche", "clark", "kingman"],
    "lane": ["finney", "scott", "gove", "ness", "trego", "greeley"],
    "morton": ["stevens", "grant", "stanton", "seward", "hamilton", "haskell"],
    "stanton": ["grant", "stevens", "morton", "hamilton", "seward", "haskell"],
    "cheyenne": ["rawlins", "sherman", "wallace", "logan", "decatur", "thomas"],
    "greeley": ["wallace", "logan", "scott", "lane", "wichita", "hamilton"],
    "hamilton": ["kearny", "grant", "stanton", "morton", "greeley", "wichita"],
    "wallace": ["sherman", "logan", "greeley", "scott", "thomas", "cheyenne"],
    "wichita": ["hamilton", "greeley", "scott", "kearny", "lane", "wallace"],
}

WICHITA_8 = [
    "two-men-and-a-truck-sedgwick-ks",
    "all-my-sons-wichita-ks",
    "kansas-local-lines",
    "kansas-express-movers",
    "kansas-regional-moving",
    "kansas-pro-movers",
    "kansas-family-movers",
]
WICHITA_4 = [
    "two-men-and-a-truck-sedgwick-ks",
    "all-my-sons-wichita-ks",
    "kansas-local-lines",
]

SPECIAL_NAMES = {
    "stafford": "Stafford",
    "barber": "Barber",
    "smith": "Smith",
    "osborne": "Osborne",
    "woodson": "Woodson",
    "kearny": "Kearny",
    "meade": "Meade",
    "haskell": "Haskell",
    "chautauqua": "Chautauqua",
    "rush": "Rush",
    "lincoln": "Lincoln",
    "jewell": "Jewell",
    "trego": "Trego",
    "decatur": "Decatur",
    "logan": "Logan",
    "ness": "Ness",
    "gove": "Gove",
    "edwards": "Edwards",
    "chase": "Chase",
    "clark": "Clark",
    "comanche": "Comanche",
    "elk": "Elk",
    "hodgeman": "Hodgeman",
    "kiowa": "Kiowa",
    "lane": "Lane",
    "morton": "Morton",
    "stanton": "Stanton",
    "cheyenne": "Cheyenne",
    "greeley": "Greeley",
    "hamilton": "Hamilton",
    "wallace": "Wallace",
    "wichita": "Wichita",
    "republic": "Republic",
    "rooks": "Rooks",
    "graham": "Graham",
    "rawlins": "Rawlins",
    "sheridan": "Sheridan",
}


def county_name(slug: str) -> str:
    return SPECIAL_NAMES.get(slug, slug.replace("-", " ").title())


def metro_slug(seat: str) -> str:
    return seat.lower().replace(".", "").replace(" ", "-").replace("'", "") + "-metro-ks"


def regional_id(slug: str, variant: int | None = None) -> str:
    if variant:
        return f"regional-{slug}-ks-movers-{variant}"
    return f"regional-{slug}-ks-movers"


def mover_ids(c: dict) -> list[str]:
    if c["tier"] == 8:
        return [regional_id(c["slug"]), *WICHITA_8]
    if c["tier"] == 4:
        return [regional_id(c["slug"]), *WICHITA_4]
    return [regional_id(c["slug"]), regional_id(c["slug"], 2), regional_id(c["slug"], 3)]


def costs(tier: int) -> dict:
    if tier == 8:
        return {"studio": "$650–$1,350", "family": "$2,300–$5,200", "hourly": "$100–$145/hr for a 2-person crew"}
    if tier == 4:
        return {"studio": "$600–$1,250", "family": "$2,200–$4,900", "hourly": "$100–$150/hr for a 2-person crew"}
    return {"studio": "$550–$1,150", "family": "$1,900–$4,400", "hourly": "$95–$145/hr for a 2-person crew"}


def gen_assignments() -> str:
    lines = []
    for c in COUNTIES:
        ids = mover_ids(c)
        block = [f"  {c['slug']}: ["]
        block += [f"    '{i}'," for i in ids]
        block.append("  ],")
        lines.append("\n".join(block))
    return "\n".join(lines)


def gen_research() -> str:
    lines = []
    for c in COUNTIES:
        cost = costs(c["tier"])
        cn = county_name(c["slug"])
        seat = c["seat"]
        region = c["region"]
        if c["tier"] == 8:
            tips = [
                f"Verify coverage for {seat} and surrounding areas before booking.",
                "Regional traffic impacts scheduling — confirm crew arrival windows.",
                "Confirm insurance for high-value homes before booking.",
                "Book early for peak seasons and month-end lease turnover.",
                "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews."
                if c.get("fmcsa")
                else "Obtain multiple estimates before booking.",
            ]
            provider = "cross-county crews from Wichita and Hays providers"
        elif c["tier"] == 4:
            tips = [
                "Rural access challenges are common — confirm route feasibility before booking.",
                f"Verify explicit regional service to {seat} before booking.",
                "Storage is very limited — confirm availability if needed.",
                "Obtain multiple estimates before booking.",
                "Confirm credentials for rural moves before booking.",
            ]
            provider = "cross-coverage from Wichita and Garden City providers"
        else:
            tips = [
                "Rural access challenges are common — confirm route feasibility before booking.",
                f"Verify explicit regional service to {seat} before booking.",
                "Storage is very limited — confirm availability if needed.",
                "Obtain multiple estimates before booking.",
                "Confirm credentials for rural moves before booking.",
            ]
            provider = "very limited local crew availability, and regional providers serving remote rural properties"

        tip_lines = "\n".join(f"      '{t}'," for t in tips)
        lines.append(
            f"""  {c['slug']}: {{
    marketNotes:
      '{cn} County is a rural {region} Kansas county with residential demand centered on {seat}.',
    costs: {{
      studioRange: '{cost['studio']}',
      familyRange: '{cost['family']}',
      avgHourly: '{cost['hourly']}',
      note: '{cn} County pricing reflects {region} Kansas rural residential turnover, {seat} corridor traffic, and {provider}.',
    }},
    tips: [
{tip_lines}
    ],
  }},"""
        )
    return "\n".join(lines)


def gen_testimonials() -> str:
    names = ["Ann K.", "Ben L.", "Cal M.", "Dee N.", "Eli O.", "Fay P.", "Gia Q.", "Hal R."]
    lines = []
    for i, c in enumerate(COUNTIES):
        seat = c["seat"]
        cn = county_name(c["slug"])
        n1, n2, n3 = names[i % len(names)], names[(i + 1) % len(names)], names[(i + 2) % len(names)]
        if c["tier"] == 3:
            m2 = f"Regional {seat} providers confirmed {cn} County coverage and delivered reliable remote-area service."
            m3 = f"Regional {seat} area providers served our {seat} relocation efficiently — timely and professional."
        elif c["tier"] == 4:
            m2 = f"Two Men and a Truck Wichita confirmed {cn} County coverage and delivered excellent {c['region']} Kansas service."
            m3 = f"Kansas Local Lines served our {seat} relocation efficiently — fast, professional, and reliable with careful handling."
        else:
            m2 = f"All My Sons Wichita confirmed {cn} County coverage and delivered excellent {c['region']} Kansas service."
            m3 = f"Kansas Express Movers served our {seat} relocation efficiently — professional crew with careful handling."
        lines.append(
            f"""  {c['slug']}: [
    {{ quote: 'Regional {seat} providers handled our {cn} County move professionally — efficient and careful throughout.', name: '{n1}', location: '{seat}, KS', rating: 5, moveType: 'Single-family' }},
    {{ quote: '{m2}', name: '{n2}', location: '{seat}, KS', rating: 5, moveType: 'Townhome' }},
    {{ quote: '{m3}', name: '{n3}', location: '{seat}, KS', rating: 5, moveType: 'Apartment' }},
  ],"""
        )
    return "\n".join(lines)


def gen_overrides() -> str:
    return "\n".join(
        f"  {c['slug']}: {{ seat: '{c['seat']}', metro: '{metro_slug(c['seat'])}' }}," for c in COUNTIES
    )


def gen_neighbors() -> str:
    return "\n".join(
        f"  {slug}: [{', '.join(repr(n) for n in neighbors)}],"
        for slug, neighbors in NEIGHBORS.items()
    )


def mover_block(slug: str, seat: str, region: str, tier: int, variant: int | None = None) -> str:
    cn = county_name(slug)
    rid = regional_id(slug, variant)
    if variant == 3:
        name = f"Regional {seat} Area Providers"
        desc = f"Local support for {cn} County residential moves across {seat} and surrounding rural communities."
        rating, rc = 4.5, 4
    elif variant == 2:
        name = f"Regional {seat} / {cn} Providers"
        desc = f"Regional mover with capability for {cn} County relocations across {seat} and remote rural properties."
        rating, rc = 4.5, 5
    elif tier == 3:
        name = f"Regional {seat} / {cn} Providers"
        desc = f"Reliable regional mover serving {cn} County residential needs across {seat} and surrounding {region} Kansas communities."
        rating, rc = 4.6, 6
    else:
        name = f"Regional {seat} / {cn} Providers"
        desc = f"Reliable movers serving {cn} County residential needs across {seat} and surrounding {region} Kansas communities."
        rating, rc = 4.7, 26 if tier == 8 else 8
    return f"""  '{rid}': {{
    id: '{rid}',
    name: '{name}',
    rating: {rating},
    reviewCount: {rc},
    shortDescription:
      '{desc}',
    services: ['Local Moving', 'Packing'],
    specialties: ['Residential'],
    fmcsaSafetyRating: 'Not Rated',
    city: '{seat} area',
  }},"""


def gen_movers() -> str:
    blocks = []
    for c in COUNTIES:
        if c.get("three"):
            for v in (None, 2, 3):
                blocks.append(mover_block(c["slug"], c["seat"], c["region"], c["tier"], v))
        else:
            blocks.append(mover_block(c["slug"], c["seat"], c["region"], c["tier"]))
    return "\n".join(blocks)


def gen_metros() -> str:
    blocks = []
    for c in COUNTIES:
        ids = mover_ids(c)
        id_lines = "\n".join(f"      '{i}'," for i in ids)
        ms = metro_slug(c["seat"])
        blocks.append(
            f"""  '{ms}': {{
    id: '{ms}',
    label: '{c['seat']} Metro',
    moverIds: [
{id_lines}
    ],
  }},"""
        )
    return "\n".join(blocks)


def main():
    out = Path(__file__).parent / "ks-batch7-out"
    out.mkdir(exist_ok=True)
    out.joinpath("assignments.txt").write_text(gen_assignments(), encoding="utf-8")
    out.joinpath("research.txt").write_text(gen_research(), encoding="utf-8")
    out.joinpath("testimonials.txt").write_text(gen_testimonials(), encoding="utf-8")
    out.joinpath("overrides.txt").write_text(gen_overrides(), encoding="utf-8")
    out.joinpath("neighbors.txt").write_text(gen_neighbors(), encoding="utf-8")
    out.joinpath("movers.txt").write_text(gen_movers(), encoding="utf-8")
    out.joinpath("metros.txt").write_text(gen_metros(), encoding="utf-8")
    print(f"Generated {len(COUNTIES)} counties")


if __name__ == "__main__":
    main()