#!/usr/bin/env python3
"""Generate CT Core 6 + UT Core 6 county intelligence packs."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CT_DIR = ROOT / "lib/local-movers/county-intelligence/connecticut"
UT_DIR = ROOT / "lib/local-movers/county-intelligence/utah"
CT_DIR.mkdir(parents=True, exist_ok=True)
UT_DIR.mkdir(parents=True, exist_ok=True)

CT_REG = {
    "title": "Intrastate CTDOT HHG certificate vs interstate FMCSA",
    "detail": "Moves entirely within Connecticut by for-hire household goods carriers generally require a Household Goods Carrier Certificate from the Connecticut Department of Transportation (CTDOT) Bureau of Public Transportation / Regulatory Compliance. Match the legal name on the estimate to CTDOT certificate status before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
}
CT_HERO = "CTDOT household goods carrier certificate for intrastate CT moves · FMCSA for interstate · Curated directory listings"

UT_REG = {
    "title": "Intrastate UDOT motor carrier credentials vs interstate FMCSA",
    "detail": "Moves entirely within Utah by for-hire motor carriers generally require appropriate UDOT Motor Carrier Division registration and insurance credentials. Match the legal name on the estimate to UDOT credentials before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
}
UT_HERO = "UDOT motor carrier credentials for intrastate UT moves · FMCSA for interstate · Curated directory listings"

LAST = "2026-07-24"


def esc(s: str) -> str:
    return s.replace("\\", "\\\\").replace("'", "\\'")


def q(s: str) -> str:
    return f"'{esc(s)}'"


def dq(s: str) -> str:
    return json_string(s)


def json_string(s: str) -> str:
    # Prefer double-quoted TS strings for content with apostrophes
    out = s.replace("\\", "\\\\").replace('"', '\\"')
    return f'"{out}"'


def arr_str(items):
    return "[" + ",".join(json_string(x) for x in items) + "]"


def bullet(title, detail):
    return f"""      {{
        title: {json_string(title)},
        detail: {json_string(detail)},
      }}"""


def zone(z):
    return f"""    {{
      id: {json_string(z['id'])},
      name: {json_string(z['name'])},
      shortName: {json_string(z['shortName'])},
      neighborhoods: {arr_str(z['neighborhoods'])},
      housingTypes: {json_string(z['housingTypes'])},
      challenges: {arr_str(z['challenges'])},
      moverTips: {json_string(z['moverTips'])},
      cityKeywords: {arr_str(z['cityKeywords'])},
    }}"""


def driver(title, detail):
    return f"""      {{ title: {json_string(title)}, detail: {json_string(detail)} }}"""


def range_item(label, value, note):
    return f"""      {{ label: {json_string(label)}, value: {json_string(value)}, note: {json_string(note)} }}"""


def seasonal_item(title, detail):
    return f"""      {{ title: {json_string(title)}, detail: {json_string(detail)} }}"""


def module(m):
    bullets = ",\n".join(
        f"""          {{ title: {json_string(b['title'])}, detail: {json_string(b['detail'])} }}"""
        for b in m["bullets"]
    )
    return f"""      {{ id: {json_string(m['id'])}, title: {json_string(m['title'])}, bullets: [
{bullets}
      ]}}"""


def resource(label, href, external=True):
    ext = ", external: true" if external else ""
    return f"""      {{ label: {json_string(label)}, href: {json_string(href)}{ext} }}"""


def render_pack(
    *,
    finalize_fn,
    import_path,
    export_name,
    county_slug,
    hub_title,
    eyebrow,
    h1,
    hero_opener,
    hero_cred,
    corridors,
    wmd_title,
    wmd_intro,
    wmd_bullets,
    zones_heading,
    zones_intro,
    zones,
    cost_title,
    cost_intro,
    drivers,
    ranges,
    seasonal_title,
    seasonal_intro,
    seasonal_items,
    specialized,
    reloc_title,
    reloc_intro,
    modules,
    resources_title,
    resources_intro,
    resource_items,
    directory_hint,
):
    bullets_ts = ",\n".join(bullet(b["title"], b["detail"]) for b in wmd_bullets)
    zones_ts = ",\n".join(zone(z) for z in zones)
    drivers_ts = ",\n".join(driver(d["title"], d["detail"]) for d in drivers)
    ranges_ts = ",\n".join(range_item(r["label"], r["value"], r["note"]) for r in ranges)
    seasonal_ts = ",\n".join(seasonal_item(s["title"], s["detail"]) for s in seasonal_items)
    modules_ts = ",\n".join(module(m) for m in modules)
    resources_ts = ",\n".join(
        resource(r["label"], r["href"], r.get("external", True)) for r in resource_items
    )
    spec_bullets = ",\n".join(json_string(b) for b in specialized["bullets"])

    return f"""import type {{ CountyIntelligencePack }} from '@/lib/local-movers/county-intelligence/types';
import {{ {finalize_fn} }} from '{import_path}';

export const {export_name}: CountyIntelligencePack = {finalize_fn}({{
  countySlug: {json_string(county_slug)},
  hubTitle: {json_string(hub_title)},
  eyebrow: {json_string(eyebrow)},
  h1: {json_string(h1)},
  heroOpener: {json_string(hero_opener)},
  heroCredibility:
    {json_string(hero_cred)},
  majorCorridors: {json_string(corridors)},
  whatMakesDifferent: {{
    title: {json_string(wmd_title)},
    intro: {json_string(wmd_intro)},
    bullets: [
{bullets_ts},
    ],
  }},
  zonesHeading: {json_string(zones_heading)},
  zonesIntro: {json_string(zones_intro)},
  zones: [
{zones_ts}
  ],
  costDrivers: {{
    title: {json_string(cost_title)},
    intro: {json_string(cost_intro)},
    drivers: [
{drivers_ts}
    ],
    ranges: [
{ranges_ts}
    ],
  }},
  seasonal: {{
    title: {json_string(seasonal_title)},
    intro: {json_string(seasonal_intro)},
    items: [
{seasonal_ts}
    ],
  }},
  specialized: [
    {{
      id: {json_string(specialized['id'])},
      title: {json_string(specialized['title'])},
      intro: {json_string(specialized['intro'])},
      bullets: [{spec_bullets}],
    }},
  ],
  relocation: {{
    title: {json_string(reloc_title)},
    intro:
      {json_string(reloc_intro)},
    modules: [
{modules_ts},
    ],
  }},
  resources: {{
    title: {json_string(resources_title)},
    intro:
      {json_string(resources_intro)},
    items: [
{resources_ts}
    ],
  }},
  directoryHint: {json_string(directory_hint)},
  lastReviewed: {json_string(LAST)},
}});
"""


# ---------------------------------------------------------------------------
# CONNECTICUT PACKS
# ---------------------------------------------------------------------------

ct_packs = []

# 1. Fairfield
ct_packs.append(
    dict(
        finalize_fn="finalizeCtPack",
        import_path="@/lib/local-movers/county-intelligence/connecticut/ct-shared",
        export_name="fairfieldCountyCtIntelligence",
        county_slug="fairfield",
        hub_title="Fairfield County Moving Intelligence Hub",
        eyebrow="Fairfield · NYC metro Stamford/Greenwich & I-95 / Merritt logistics",
        h1="Moving in Fairfield County: Stamford–Greenwich Metro, Coastal Access & I-95 / Merritt Logistics",
        hero_opener="Fairfield County is Connecticut's NYC-metro coastal belt — not Hartford insurance product and not New Haven university stock: Stamford and Greenwich multi-unit elevators, coastal and Merritt Parkway (CT-15) approaches, I-95 corridor congestion into New York, and Gold Coast curb rules that are not inland capital or shoreline defense defaults. A Stamford high-rise freight window, a Greenwich estate driveway, a Bridgeport multi-family walk-up, and a Danbury two-story do not share truck access or empty-mile risk. This hub is for Fairfield (Stamford–Greenwich–Bridgeport–Danbury) — not a renamed Hartford or Westchester clone page.",
        hero_cred=CT_HERO,
        corridors="I-95 · Merritt Parkway (CT-15) · I-84 · US-1 · US-7",
        wmd_title="What makes moving in Fairfield County different",
        wmd_intro="These are Fairfield NYC-metro realities — coastal elevators, Gold Coast access, and I-95/Merritt timing — not Hartford capital product or New London defense corridors.",
        wmd_bullets=[
            {
                "title": "Stamford and Greenwich elevators rewrite labor hours",
                "detail": "Building packets, COI naming, and freight windows dominate downtown Stamford and multi-unit Gold Coast jobs.",
            },
            {
                "title": "I-95 and Merritt Parkway (CT-15) define portal-to-portal time",
                "detail": "Coastal pairs look local on maps and regional at peak into Westchester and New York approaches.",
            },
            {
                "title": "Coastal vs inland micro-markets are not interchangeable",
                "detail": "Greenwich/Stamford stock differs sharply from Bridgeport multi-family and Danbury/I-84 product.",
            },
            {
                "title": "Estate driveways and tight coastal curb change staging rules",
                "detail": "Long carries, HOA gates, and limited legal curb reshape crew size and truck choice.",
            },
            {
                "title": "Not Hartford capital or New Haven university product as the default",
                "detail": "Survey each Fairfield address — NYC-metro density is not insurance-tower or Yale multi-unit defaults.",
            },
            CT_REG,
        ],
        zones_heading="Fairfield access zones",
        zones_intro="Plan by Stamford/Greenwich elevators, Bridgeport/coastal multi-unit, Norwalk/Westport coastal, and Danbury/I-84 inland edges.",
        zones=[
            {
                "id": "stamford-greenwich",
                "name": "Stamford, Greenwich & Gold Coast elevators",
                "shortName": "Stamford / Greenwich",
                "neighborhoods": ["Downtown Stamford", "Greenwich", "Riverside edges", "Cos Cob edges"],
                "housingTypes": "High-rises, mid-rises, estate SFH, renovated multi-unit",
                "challenges": ["Elevators and COI", "Scarce curb staging", "I-95 / CT-15 congestion"],
                "moverTips": "Get building packets early. Prefer mid-week morning freight windows away from NYC peak reverse commute.",
                "cityKeywords": ["stamford", "greenwich", "riverside"],
            },
            {
                "id": "bridgeport-coastal",
                "name": "Bridgeport, Stratford & coastal multi-unit",
                "shortName": "Bridgeport / coastal",
                "neighborhoods": ["Bridgeport", "Stratford", "Black Rock edges", "Lordship edges"],
                "housingTypes": "Multi-family, older SFH, mid-rises",
                "challenges": ["Stairs and tight curb", "US-1 / I-95 congestion", "Mixed access types"],
                "moverTips": "Survey stair width carefully. Confirm parking rules block by block near coastal arterials.",
                "cityKeywords": ["bridgeport", "stratford"],
            },
            {
                "id": "norwalk-westport",
                "name": "Norwalk, Westport & mid-coastal corridor",
                "shortName": "Norwalk / Westport",
                "neighborhoods": ["Norwalk", "Westport", "Darien edges", "Wilton edges"],
                "housingTypes": "SFH, multi-family, HOA pockets, waterfront edges",
                "challenges": ["HOA gates", "Coastal driveway geometry", "Merritt / I-95 peak delays"],
                "moverTips": "Collect HOA packets. Price coastal pairs portal-to-portal with Merritt vs I-95 options.",
                "cityKeywords": ["norwalk", "westport", "darien"],
            },
            {
                "id": "danbury-i84",
                "name": "Danbury, Newtown & I-84 inland edges",
                "shortName": "Danbury / I-84",
                "neighborhoods": ["Danbury", "Newtown edges", "Bethel edges", "Brookfield edges"],
                "housingTypes": "SFH, multi-family, commercial-adjacent stock",
                "challenges": ["I-84 congestion", "Longer portal time to coast", "Hill and driveway access"],
                "moverTips": "Price coast-to-inland pairs honestly. Confirm driveway grade and turnaround room.",
                "cityKeywords": ["danbury", "newtown", "bethel"],
            },
        ],
        cost_title="What drives Fairfield County moving costs",
        cost_intro="Elevator friction, coastal access, and I-95/Merritt portal time drive quotes more than bedroom count alone.",
        drivers=[
            {"title": "Stamford/Greenwich elevator & curb friction", "detail": "Core labor hours spike."},
            {"title": "I-95 / Merritt Parkway (CT-15) congestion", "detail": "Portal-to-portal spikes at peak."},
            {"title": "Estate long carries & HOA gates", "detail": "Gold Coast access raises crew time."},
            {"title": "Coast-to-inland empty miles", "detail": "Danbury pairs punish odometer optimism."},
        ],
        ranges=[
            {"label": "Studio / 1BR (simple access)", "value": "$500–$1,700+", "note": "Higher with elevators"},
            {"label": "2–3BR condo or modest SFH", "value": "$1,500–$4,400+", "note": "Coastal friction trends up"},
            {"label": "3–4+ BR / tower / cross-corridor", "value": "$2,800–$8,500+", "note": "Towers and long pairs highest"},
            {"label": "Typical 2-person crew rate", "value": "$120–$200+/hr", "note": "Portal-to-portal"},
        ],
        seasonal_title="When to schedule a move in Fairfield County",
        seasonal_intro="Summer family peaks, multi-family lease turns, NYC-metro reverse commute, and winter coastal ice reshape Fairfield windows.",
        seasonal_items=[
            {"title": "Best windows: mid-week early mornings", "detail": "Clear curb and reduce I-95/Merritt pain."},
            {"title": "Peak family season: late May–mid-August", "detail": "Book coastal Saturdays early."},
            {"title": "Month-end multi-family turns", "detail": "Stamford elevators fill first."},
            {"title": "Winter ice and coastal wind", "detail": "Confirm driveway and walkway contingency."},
        ],
        specialized={
            "id": "fairfield-stamford-greenwich-i95-merritt",
            "title": "Stamford–Greenwich & I-95 / Merritt module",
            "intro": "Fairfield estimates fail when building packets, coastal curb rules, or I-95/Merritt empty miles are ignored.",
            "bullets": [
                "Request Stamford/Greenwich building packets early.",
                "Photo curb and stair access for coastal multi-unit jobs.",
                "Price I-95, Merritt Parkway (CT-15), I-84, US-1, and US-7 pairs portal-to-portal.",
                "Clarify Fairfield vs Westchester or New Haven destinations on multi-county estimates.",
                "Verify CTDOT household goods carrier certificate for in-state-only jobs and FMCSA for interstate legs.",
            ],
        },
        reloc_title="Considering a move to Fairfield County?",
        reloc_intro="Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.",
        modules=[
            {
                "id": "schools",
                "title": "Schools & education landscape",
                "bullets": [
                    {"title": "How districts work here", "detail": "Municipal school systems and regional arrangements serve different Fairfield towns. Confirm zoning carefully by address."},
                    {"title": "Research sources", "detail": "District tools and Connecticut State Department of Education data beat ranking screenshots."},
                ],
            },
            {
                "id": "hospitals",
                "title": "Hospitals & healthcare access",
                "bullets": [
                    {"title": "Major systems", "detail": "Stamford Health, Greenwich Hospital (Yale New Haven Health), Bridgeport Hospital, Danbury Hospital, and other campuses serve county corridors. Confirm networks."},
                    {"title": "What relocators should do", "detail": "Map peak-hour drive times from inland edges into major coastal campuses. Transfer records early."},
                ],
            },
            {
                "id": "housing",
                "title": "Housing character & cost pressures",
                "bullets": [
                    {"title": "Gold Coast condo/estate vs inland SFH stock", "detail": "Stamford/Greenwich product differs sharply from Danbury/I-84 two-stories."},
                    {"title": "Cost variation", "detail": "Coastal renovated and multi-unit stock often prices differently from inland multi-family."},
                ],
            },
            {
                "id": "town-fit",
                "title": "Which areas fit whom",
                "bullets": [
                    {"title": "Stamford / Greenwich lifestyle", "detail": "Metro amenities with elevator and curb tradeoffs."},
                    {"title": "Mid-coastal pattern", "detail": "Norwalk/Westport mix of multi-unit and SFH with arterial logistics."},
                    {"title": "Inland I-84 pattern", "detail": "Danbury SFH/HOA product with longer portal time to coastal jobs."},
                ],
            },
            {
                "id": "jobs",
                "title": "Jobs & commute patterns",
                "bullets": [
                    {"title": "Employment anchors", "detail": "Finance, corporate HQ, healthcare, logistics, and NYC reverse commute shape employment."},
                    {"title": "Commute realism", "detail": "I-95 and Merritt peaks are real. Test drive peak routes toward New York and inland hubs."},
                ],
            },
            {
                "id": "lifestyle",
                "title": "Lifestyle & practical livability",
                "bullets": [
                    {"title": "Fairfield identity", "detail": "Fairfield is NYC-metro Connecticut coast — not Hartford capital product or New London defense shoreline as the default."},
                    {"title": "Climate", "detail": "Hot humid summers and winter ice/coastal storms. Plan outdoor staging contingency."},
                ],
            },
        ],
        resources_title="Useful Fairfield County resources",
        resources_intro="Official links first; directory listings are independent, not endorsements. Verify CTDOT household goods carrier certificate for in-state moves and FMCSA for interstate legs.",
        resource_items=[
            {"label": "Fairfield County — regional / town portals", "href": "https://portal.ct.gov/"},
            {"label": "CTDOT traffic & travel", "href": "https://portal.ct.gov/dot"},
        ],
        directory_hint="Prefer Stamford/Greenwich elevator and coastal access experience with honest I-95/Merritt pricing. Verify CTDOT HHG certificate in-state and FMCSA interstate.",
    )
)

# 2. Hartford
ct_packs.append(
    dict(
        finalize_fn="finalizeCtPack",
        import_path="@/lib/local-movers/county-intelligence/connecticut/ct-shared",
        export_name="hartfordCountyCtIntelligence",
        county_slug="hartford",
        hub_title="Hartford County Moving Intelligence Hub",
        eyebrow="Hartford · capital/insurance core & I-84 / I-91 logistics",
        h1="Moving in Hartford County: Capital Core, Insurance Corridor & I-84 / I-91 Logistics",
        hero_opener="Hartford County is Connecticut's capital and insurance hub — not Fairfield NYC-metro product and not New Haven Yale stock: downtown and Asylum Hill elevators, West Hartford and Glastonbury family corridors, I-84 and I-91 portal time, and capital-region multi-unit that is not Gold Coast curb or shoreline defense defaults. A downtown Hartford condo, a West Hartford two-story, an East Hartford multi-family unit, and a Bristol ranch do not share truck access or empty-mile risk. This hub is for Hartford County (capital metro) — not a renamed Fairfield or Springfield clone page.",
        hero_cred=CT_HERO,
        corridors="I-84 · I-91 · CT-2 · CT-9",
        wmd_title="What makes moving in Hartford County different",
        wmd_intro="These are Hartford capital-region realities — insurance-core elevators, suburban family product, and I-84/I-91 timing — not Fairfield Gold Coast or New London shoreline defaults.",
        wmd_bullets=[
            {
                "title": "Downtown and insurance-corridor elevators rewrite labor hours",
                "detail": "Building packets and freight windows dominate Hartford core and multi-unit jobs near major campuses.",
            },
            {
                "title": "I-84 and I-91 define portal-to-portal time",
                "detail": "Cross-metro pairs look local on maps and regional at peak through the capital interchange complex.",
            },
            {
                "title": "West-of-river vs east-of-river micro-markets differ",
                "detail": "West Hartford/Farmington stock is not East Hartford/Manchester multi-family or Bristol industrial-edge product.",
            },
            {
                "title": "CT-2 and CT-9 feed suburban rings with arterial friction",
                "detail": "Glastonbury, New Britain, and shoreline-link pairs need honest portal pricing.",
            },
            {
                "title": "Not Fairfield NYC-metro or New Haven university product as the default",
                "detail": "Survey each Hartford address — capital density is not Gold Coast estate or Yale multi-unit defaults.",
            },
            CT_REG,
        ],
        zones_heading="Hartford access zones",
        zones_intro="Plan by downtown/insurance core, West Hartford/Farmington, east-of-river multi-unit, and New Britain/Bristol edges.",
        zones=[
            {
                "id": "downtown-insurance",
                "name": "Downtown Hartford, Asylum Hill & insurance elevators",
                "shortName": "Downtown / insurance",
                "neighborhoods": ["Downtown Hartford", "Asylum Hill", "Frog Hollow edges", "Sheldon-Charter Oak edges"],
                "housingTypes": "High-rises, mid-rises, renovated multi-unit",
                "challenges": ["Elevators and COI", "Scarce curb staging", "I-84 / I-91 congestion"],
                "moverTips": "Get building packets early. Prefer mid-week morning freight windows.",
                "cityKeywords": ["hartford", "downtown hartford", "asylum hill"],
            },
            {
                "id": "west-hartford-farmington",
                "name": "West Hartford, Farmington & west-of-river suburbs",
                "shortName": "West Hartford / Farmington",
                "neighborhoods": ["West Hartford", "Farmington", "Avon edges", "Simsbury edges"],
                "housingTypes": "SFH, multi-family, HOA pockets",
                "challenges": ["HOA rules", "Arterial congestion", "Stairs and basements"],
                "moverTips": "Collect HOA packets. Survey stair width and driveway geometry carefully.",
                "cityKeywords": ["west hartford", "farmington", "avon"],
            },
            {
                "id": "east-river",
                "name": "East Hartford, Manchester & east-of-river multi-unit",
                "shortName": "East of river",
                "neighborhoods": ["East Hartford", "Manchester", "South Windsor edges", "Glastonbury edges"],
                "housingTypes": "Multi-family, SFH, mid-rises",
                "challenges": ["I-84 / CT-2 congestion", "Curb parking limits", "Longer portal time to core"],
                "moverTips": "Price river-crossing pairs portal-to-portal. Confirm parking rules block by block.",
                "cityKeywords": ["east hartford", "manchester", "glastonbury"],
            },
            {
                "id": "new-britain-bristol",
                "name": "New Britain, Bristol & southwest county edges",
                "shortName": "New Britain / Bristol",
                "neighborhoods": ["New Britain", "Bristol", "Plainville edges", "Berlin edges"],
                "housingTypes": "SFH, multi-family, industrial-adjacent stock",
                "challenges": ["CT-9 / I-84 links", "Mixed access types", "Older multi-unit stairs"],
                "moverTips": "Survey stair and curb access carefully. Price CT-9 corridor pairs honestly.",
                "cityKeywords": ["new britain", "bristol", "plainville"],
            },
        ],
        cost_title="What drives Hartford County moving costs",
        cost_intro="Elevator friction, river-crossing portal time, and suburban access drive quotes more than bedroom count alone.",
        drivers=[
            {"title": "Downtown elevator & curb friction", "detail": "Core labor hours spike."},
            {"title": "I-84 / I-91 / CT-2 congestion", "detail": "Portal-to-portal spikes at peak."},
            {"title": "Older multi-unit stairs & long carries", "detail": "East-of-river and New Britain stock raises labor hours."},
            {"title": "Cross-metro empty miles", "detail": "West-to-east river pairs punish odometer optimism."},
        ],
        ranges=[
            {"label": "Studio / 1BR (simple access)", "value": "$450–$1,500+", "note": "Higher with elevators"},
            {"label": "2–3BR condo or modest SFH", "value": "$1,350–$3,900+", "note": "Core friction trends up"},
            {"label": "3–4+ BR / tower / cross-metro", "value": "$2,500–$7,800+", "note": "Towers and long pairs highest"},
            {"label": "Typical 2-person crew rate", "value": "$105–$180+/hr", "note": "Portal-to-portal"},
        ],
        seasonal_title="When to schedule a move in Hartford County",
        seasonal_intro="Summer family peaks, multi-family lease turns, capital event calendars, and winter ice reshape Hartford windows.",
        seasonal_items=[
            {"title": "Best windows: mid-week early mornings", "detail": "Clear curb and reduce I-84/I-91 pain."},
            {"title": "Peak family season: late May–mid-August", "detail": "Book suburban Saturdays early."},
            {"title": "Month-end multi-family turns", "detail": "Downtown elevators fill first."},
            {"title": "Winter ice and snow", "detail": "Confirm driveway contingency."},
        ],
        specialized={
            "id": "hartford-capital-insurance-i84-i91",
            "title": "Capital / insurance core & I-84 / I-91 module",
            "intro": "Hartford estimates fail when building packets, river-crossing timing, or I-84/I-91 empty miles are ignored.",
            "bullets": [
                "Request downtown/insurance-corridor building packets early.",
                "Photo curb and stair access for multi-unit jobs.",
                "Price I-84, I-91, CT-2, and CT-9 pairs portal-to-portal.",
                "Clarify Hartford vs Tolland or New Haven destinations on multi-county estimates.",
                "Verify CTDOT household goods carrier certificate for in-state-only jobs and FMCSA for interstate legs.",
            ],
        },
        reloc_title="Considering a move to Hartford County?",
        reloc_intro="Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.",
        modules=[
            {
                "id": "schools",
                "title": "Schools & education landscape",
                "bullets": [
                    {"title": "How districts work here", "detail": "Hartford Public Schools and suburban municipal districts serve different addresses. Confirm zoning carefully."},
                    {"title": "Research sources", "detail": "District tools and Connecticut State Department of Education data beat ranking screenshots."},
                ],
            },
            {
                "id": "hospitals",
                "title": "Hospitals & healthcare access",
                "bullets": [
                    {"title": "Major systems", "detail": "Hartford HealthCare, Trinity Health Of New England, UConn Health, and other campuses serve county corridors. Confirm networks."},
                    {"title": "What relocators should do", "detail": "Map peak-hour drive times from ring edges into major campuses. Transfer records early."},
                ],
            },
            {
                "id": "housing",
                "title": "Housing character & cost pressures",
                "bullets": [
                    {"title": "Core condo/multi-unit vs suburban SFH stock", "detail": "Downtown product differs sharply from West Hartford and Farmington two-stories."},
                    {"title": "Cost variation", "detail": "Near-core renovated stock often prices differently from east-of-river multi-family."},
                ],
            },
            {
                "id": "town-fit",
                "title": "Which areas fit whom",
                "bullets": [
                    {"title": "Downtown / insurance lifestyle", "detail": "Walkable amenities with elevator and curb tradeoffs."},
                    {"title": "West-of-river suburban pattern", "detail": "SFH/HOA product with arterial logistics."},
                    {"title": "East-of-river pattern", "detail": "Multi-unit density with I-84/CT-2 portal time to core jobs."},
                ],
            },
            {
                "id": "jobs",
                "title": "Jobs & commute patterns",
                "bullets": [
                    {"title": "Employment anchors", "detail": "Insurance, government, healthcare, education, and logistics shape employment."},
                    {"title": "Commute realism", "detail": "I-84 and I-91 peaks are real. Test drive peak routes around the capital interchange complex."},
                ],
            },
            {
                "id": "lifestyle",
                "title": "Lifestyle & practical livability",
                "bullets": [
                    {"title": "Hartford identity", "detail": "Hartford County is capital/insurance Connecticut — not Fairfield NYC-metro coast or New London defense shoreline as the default."},
                    {"title": "Climate", "detail": "Hot humid summers and winter ice/snow. Plan outdoor staging contingency."},
                ],
            },
        ],
        resources_title="Useful Hartford County resources",
        resources_intro="Official links first; directory listings are independent, not endorsements. Verify CTDOT household goods carrier certificate for in-state moves and FMCSA for interstate legs.",
        resource_items=[
            {"label": "City of Hartford — official site", "href": "https://www.hartfordct.gov/"},
            {"label": "CTDOT traffic & travel", "href": "https://portal.ct.gov/dot"},
        ],
        directory_hint="Prefer downtown elevator and capital-corridor access experience with honest I-84/I-91 pricing. Verify CTDOT HHG certificate in-state and FMCSA interstate.",
    )
)

# 3. New Haven
ct_packs.append(
    dict(
        finalize_fn="finalizeCtPack",
        import_path="@/lib/local-movers/county-intelligence/connecticut/ct-shared",
        export_name="newHavenCountyCtIntelligence",
        county_slug="new-haven",
        hub_title="New Haven County Moving Intelligence Hub",
        eyebrow="New Haven · Yale university, shoreline multi-unit & I-95 / I-91 logistics",
        h1="Moving in New Haven County: Yale Corridor, Shoreline Access & I-95 / I-91 Logistics",
        hero_opener="New Haven County is Connecticut's university and shoreline hub — not Fairfield Gold Coast defaults and not Hartford insurance towers: Yale-adjacent multi-unit elevators, East Rock and Westville neighborhood stock, I-95 and I-91 portal time, and coastal towns that are not NYC-metro estate or capital-region product. A downtown New Haven walk-up, a Yale-area freight elevator, a Milford two-story, and a Waterbury multi-family unit do not share truck access or empty-mile risk. This hub is for New Haven County (Yale–shoreline–Naugatuck Valley) — not a renamed Fairfield or Hartford page.",
        hero_cred=CT_HERO,
        corridors="I-95 · I-91 · CT-15 · US-1",
        wmd_title="What makes moving in New Haven County different",
        wmd_intro="These are New Haven university and shoreline realities — elevators, neighborhood stairs, and I-95/I-91 timing — not Fairfield Gold Coast estate or Hartford capital defaults.",
        wmd_bullets=[
            {
                "title": "Yale-adjacent elevators and multi-unit stairs rewrite labor hours",
                "detail": "Building packets, tight curb, and stair flights dominate downtown and campus-edge jobs.",
            },
            {
                "title": "I-95, I-91, and CT-15 define portal-to-portal time",
                "detail": "Shoreline and valley pairs look local on maps and regional at peak.",
            },
            {
                "title": "Shoreline vs Naugatuck Valley micro-markets differ",
                "detail": "Milford/Branford coastal stock is not Waterbury multi-family or Hamden suburban product.",
            },
            {
                "title": "US-1 coastal approaches add curb and congestion friction",
                "detail": "Shoreline towns stack limited staging and peak arterial delays.",
            },
            {
                "title": "Not Fairfield NYC-metro or Hartford capital product as the default",
                "detail": "Survey each New Haven address — university density is not Gold Coast estate or insurance-tower defaults.",
            },
            CT_REG,
        ],
        zones_heading="New Haven access zones",
        zones_intro="Plan by downtown/Yale elevators, Hamden/North Haven suburbs, shoreline towns, and Waterbury/Naugatuck Valley edges.",
        zones=[
            {
                "id": "downtown-yale",
                "name": "Downtown New Haven, Yale & East Rock multi-unit",
                "shortName": "Downtown / Yale",
                "neighborhoods": ["Downtown New Haven", "Yale edges", "East Rock", "Westville edges"],
                "housingTypes": "High-rises, mid-rises, walk-ups, renovated multi-unit",
                "challenges": ["Elevators and COI", "Scarce curb staging", "Stairs and long carries"],
                "moverTips": "Get building packets early. Prefer mid-week morning freight windows away from campus move-in peaks.",
                "cityKeywords": ["new haven", "yale", "east rock"],
            },
            {
                "id": "hamden-north-haven",
                "name": "Hamden, North Haven & northern suburbs",
                "shortName": "Hamden / North Haven",
                "neighborhoods": ["Hamden", "North Haven", "Cheshire edges", "Wallingford edges"],
                "housingTypes": "SFH, multi-family, HOA pockets",
                "challenges": ["I-91 congestion", "HOA rules", "Basement and stair access"],
                "moverTips": "Collect HOA packets. Price I-91 pairs portal-to-portal.",
                "cityKeywords": ["hamden", "north haven", "wallingford"],
            },
            {
                "id": "shoreline",
                "name": "Milford, Branford, Guilford & shoreline corridor",
                "shortName": "Shoreline",
                "neighborhoods": ["Milford", "Branford", "Guilford", "Madison edges"],
                "housingTypes": "SFH, multi-family, coastal cottages",
                "challenges": ["US-1 / I-95 congestion", "Tight coastal curb", "Seasonal tourism peaks"],
                "moverTips": "Confirm driveway and street parking rules. Avoid peak shoreline weekends when flexible.",
                "cityKeywords": ["milford", "branford", "guilford"],
            },
            {
                "id": "waterbury-valley",
                "name": "Waterbury, Naugatuck & valley multi-unit",
                "shortName": "Waterbury / valley",
                "neighborhoods": ["Waterbury", "Naugatuck", "Ansonia edges", "Derby edges"],
                "housingTypes": "Multi-family, older SFH, industrial-adjacent stock",
                "challenges": ["CT-8 / CT-15 links", "Older multi-unit stairs", "Longer portal time to shore"],
                "moverTips": "Survey stair width carefully. Price valley-to-shore pairs honestly.",
                "cityKeywords": ["waterbury", "naugatuck", "ansonia"],
            },
        ],
        cost_title="What drives New Haven County moving costs",
        cost_intro="Elevator friction, shoreline access, and I-95/I-91 portal time drive quotes more than bedroom count alone.",
        drivers=[
            {"title": "Yale/downtown elevator & curb friction", "detail": "Core labor hours spike."},
            {"title": "I-95 / I-91 / CT-15 congestion", "detail": "Portal-to-portal spikes at peak."},
            {"title": "Walk-up stairs & long carries", "detail": "Older multi-unit raises labor hours."},
            {"title": "Shore-to-valley empty miles", "detail": "Waterbury pairs punish odometer optimism."},
        ],
        ranges=[
            {"label": "Studio / 1BR (simple access)", "value": "$450–$1,550+", "note": "Higher with elevators"},
            {"label": "2–3BR condo or modest SFH", "value": "$1,350–$4,000+", "note": "Core friction trends up"},
            {"label": "3–4+ BR / tower / cross-corridor", "value": "$2,500–$7,900+", "note": "Towers and long pairs highest"},
            {"label": "Typical 2-person crew rate", "value": "$105–$185+/hr", "note": "Portal-to-portal"},
        ],
        seasonal_title="When to schedule a move in New Haven County",
        seasonal_intro="Summer family peaks, university move-in waves, shoreline tourism, and winter ice reshape New Haven windows.",
        seasonal_items=[
            {"title": "Best windows: mid-week early mornings", "detail": "Clear curb and reduce I-95/I-91 pain."},
            {"title": "Peak family season: late May–mid-August", "detail": "Book suburban Saturdays early."},
            {"title": "University move-in / move-out waves", "detail": "Yale-adjacent elevators fill first."},
            {"title": "Winter ice and snow", "detail": "Confirm driveway contingency."},
        ],
        specialized={
            "id": "new-haven-yale-shoreline-i95-i91",
            "title": "Yale corridor, shoreline & I-95 / I-91 module",
            "intro": "New Haven estimates fail when building packets, campus calendars, or I-95/I-91 empty miles are ignored.",
            "bullets": [
                "Request downtown/Yale building packets early.",
                "Photo curb and stair access for multi-unit and walk-up jobs.",
                "Price I-95, I-91, CT-15, and US-1 pairs portal-to-portal.",
                "Clarify New Haven vs Fairfield or Middlesex destinations on multi-county estimates.",
                "Verify CTDOT household goods carrier certificate for in-state-only jobs and FMCSA for interstate legs.",
            ],
        },
        reloc_title="Considering a move to New Haven County?",
        reloc_intro="Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.",
        modules=[
            {
                "id": "schools",
                "title": "Schools & education landscape",
                "bullets": [
                    {"title": "How districts work here", "detail": "New Haven Public Schools and suburban municipal districts serve different addresses. Confirm zoning carefully."},
                    {"title": "Research sources", "detail": "District tools and Connecticut State Department of Education data beat ranking screenshots. Yale and other higher-ed calendars affect housing demand."},
                ],
            },
            {
                "id": "hospitals",
                "title": "Hospitals & healthcare access",
                "bullets": [
                    {"title": "Major systems", "detail": "Yale New Haven Health, Griffin Hospital, Waterbury Hospital, and other campuses serve county corridors. Confirm networks."},
                    {"title": "What relocators should do", "detail": "Map peak-hour drive times from valley and shoreline edges into major campuses. Transfer records early."},
                ],
            },
            {
                "id": "housing",
                "title": "Housing character & cost pressures",
                "bullets": [
                    {"title": "Core multi-unit vs shoreline SFH stock", "detail": "Downtown/Yale product differs sharply from Milford/Branford two-stories."},
                    {"title": "Cost variation", "detail": "Near-campus renovated stock often prices differently from valley multi-family."},
                ],
            },
            {
                "id": "town-fit",
                "title": "Which areas fit whom",
                "bullets": [
                    {"title": "Downtown / Yale lifestyle", "detail": "Walkable amenities with elevator and curb tradeoffs."},
                    {"title": "Shoreline pattern", "detail": "Coastal SFH/multi-unit with US-1 and I-95 logistics."},
                    {"title": "Valley pattern", "detail": "Waterbury multi-unit density with longer portal time to shore jobs."},
                ],
            },
            {
                "id": "jobs",
                "title": "Jobs & commute patterns",
                "bullets": [
                    {"title": "Employment anchors", "detail": "Higher education, healthcare, manufacturing, logistics, and professional services shape employment."},
                    {"title": "Commute realism", "detail": "I-95 and I-91 peaks are real. Test drive peak routes from shoreline and valley edges."},
                ],
            },
            {
                "id": "lifestyle",
                "title": "Lifestyle & practical livability",
                "bullets": [
                    {"title": "New Haven identity", "detail": "New Haven County is university and shoreline Connecticut — not Fairfield Gold Coast or Hartford capital product as the default."},
                    {"title": "Climate", "detail": "Hot humid summers and winter ice/snow. Plan outdoor staging contingency."},
                ],
            },
        ],
        resources_title="Useful New Haven County resources",
        resources_intro="Official links first; directory listings are independent, not endorsements. Verify CTDOT household goods carrier certificate for in-state moves and FMCSA for interstate legs.",
        resource_items=[
            {"label": "City of New Haven — official site", "href": "https://www.newhavenct.gov/"},
            {"label": "CTDOT traffic & travel", "href": "https://portal.ct.gov/dot"},
        ],
        directory_hint="Prefer Yale-corridor elevator and shoreline access experience with honest I-95/I-91 pricing. Verify CTDOT HHG certificate in-state and FMCSA interstate.",
    )
)

# 4. New London
ct_packs.append(
    dict(
        finalize_fn="finalizeCtPack",
        import_path="@/lib/local-movers/county-intelligence/connecticut/ct-shared",
        export_name="newLondonCountyCtIntelligence",
        county_slug="new-london",
        hub_title="New London County Moving Intelligence Hub",
        eyebrow="New London · shoreline/defense Groton & I-95 / CT-2 logistics",
        h1="Moving in New London County: Shoreline Towns, Groton Defense & I-95 / CT-2 Logistics",
        hero_opener="New London County is Connecticut's southeastern shoreline and defense corridor — not Fairfield NYC-metro product and not Hartford capital stock: Groton submarine and defense adjacency, New London and Norwich multi-unit, I-95 coastal portal time, and CT-2 inland links that are not Gold Coast elevators or insurance-tower defaults. A Groton multi-family PCS-style turn, a New London walk-up, a Mystic cottage approach, and a Norwich two-story do not share truck access or empty-mile risk. This hub is for New London County (shoreline–defense–Norwich) — not a renamed New Haven or Rhode Island clone page.",
        hero_cred=CT_HERO,
        corridors="I-95 · CT-2 · CT-32 · US-1",
        wmd_title="What makes moving in New London County different",
        wmd_intro="These are New London shoreline and defense realities — coastal access, military-adjacent calendars, and I-95/CT-2 timing — not Fairfield Gold Coast or Hartford capital defaults.",
        wmd_bullets=[
            {
                "title": "Groton defense and multi-unit turns reshape calendars",
                "detail": "Military-adjacent and contractor housing waves compress flexible windows and raise month-end demand.",
            },
            {
                "title": "I-95, CT-2, and CT-32 define portal-to-portal time",
                "detail": "Shoreline-to-Norwich pairs look local on maps and regional at peak.",
            },
            {
                "title": "Coastal cottage and marina-edge access is not inland SFH",
                "detail": "Mystic, Stonington, and shoreline stock stack tight curb, driveway geometry, and seasonal tourism.",
            },
            {
                "title": "US-1 coastal approaches add congestion friction",
                "detail": "Summer tourism and limited staging rewrite open-carry plans.",
            },
            {
                "title": "Not Fairfield NYC-metro or Hartford capital product as the default",
                "detail": "Survey each New London address — shoreline defense density is not Gold Coast estate or insurance-tower defaults.",
            },
            CT_REG,
        ],
        zones_heading="New London access zones",
        zones_intro="Plan by New London/Groton shoreline, Norwich/CT-2 inland, Mystic/Stonington coastal, and Colchester/CT-2 north edges.",
        zones=[
            {
                "id": "new-london-groton",
                "name": "New London, Groton & defense shoreline",
                "shortName": "New London / Groton",
                "neighborhoods": ["New London", "Groton", "City of Groton edges", "Waterford edges"],
                "housingTypes": "Multi-family, SFH, military-adjacent stock, mid-rises",
                "challenges": ["I-95 congestion", "Tight curb and stairs", "Defense-calendar spikes"],
                "moverTips": "Confirm access rules near base-adjacent corridors. Prefer mid-week mornings away from peak PCS weeks when flexible.",
                "cityKeywords": ["new london", "groton", "waterford"],
            },
            {
                "id": "norwich-inland",
                "name": "Norwich, Montville & CT-2 / CT-32 inland",
                "shortName": "Norwich / inland",
                "neighborhoods": ["Norwich", "Montville", "Preston edges", "Lisbon edges"],
                "housingTypes": "SFH, multi-family, older stock",
                "challenges": ["CT-2 / CT-32 congestion", "Stairs and basements", "Longer portal time to shore"],
                "moverTips": "Survey stair width carefully. Price shore-to-inland pairs portal-to-portal.",
                "cityKeywords": ["norwich", "montville"],
            },
            {
                "id": "mystic-stonington",
                "name": "Mystic, Stonington & tourism shoreline",
                "shortName": "Mystic / Stonington",
                "neighborhoods": ["Mystic", "Stonington", "Pawcatuck edges", "Noank edges"],
                "housingTypes": "Coastal SFH, cottages, multi-family",
                "challenges": ["US-1 tourism peaks", "Narrow streets", "Limited staging"],
                "moverTips": "Avoid peak tourism weekends when flexible. Confirm driveway and street parking rules.",
                "cityKeywords": ["mystic", "stonington", "pawcatuck"],
            },
            {
                "id": "colchester-north",
                "name": "Colchester, East Lyme & northern county edges",
                "shortName": "Colchester / East Lyme",
                "neighborhoods": ["Colchester", "East Lyme", "Salem edges", "Bozrah edges"],
                "housingTypes": "SFH, multi-family, HOA pockets",
                "challenges": ["CT-2 / I-95 links", "HOA rules", "Longer empty miles to core"],
                "moverTips": "Collect HOA packets. Price northern pairs honestly.",
                "cityKeywords": ["colchester", "east lyme"],
            },
        ],
        cost_title="What drives New London County moving costs",
        cost_intro="Coastal access, defense-calendar demand, and I-95/CT-2 portal time drive quotes more than bedroom count alone.",
        drivers=[
            {"title": "Shoreline curb & cottage access friction", "detail": "Labor hours spike on tight streets."},
            {"title": "I-95 / CT-2 / CT-32 congestion", "detail": "Portal-to-portal spikes at peak."},
            {"title": "Defense-adjacent calendar premiums", "detail": "PCS-style waves compress flexible windows."},
            {"title": "Shore-to-inland empty miles", "detail": "Norwich pairs punish odometer optimism."},
        ],
        ranges=[
            {"label": "Studio / 1BR (simple access)", "value": "$425–$1,450+", "note": "Higher with tight coastal access"},
            {"label": "2–3BR condo or modest SFH", "value": "$1,250–$3,700+", "note": "Coastal friction trends up"},
            {"label": "3–4+ BR / multi-unit / cross-corridor", "value": "$2,300–$7,200+", "note": "Long pairs and peak calendars highest"},
            {"label": "Typical 2-person crew rate", "value": "$100–$175+/hr", "note": "Portal-to-portal"},
        ],
        seasonal_title="When to schedule a move in New London County",
        seasonal_intro="Summer tourism, defense-adjacent turns, family peaks, and winter coastal ice reshape New London windows.",
        seasonal_items=[
            {"title": "Best windows: mid-week early mornings", "detail": "Clear curb and reduce I-95/US-1 pain."},
            {"title": "Peak family and tourism season: late May–mid-August", "detail": "Book shoreline Saturdays early."},
            {"title": "Defense-adjacent and multi-family turns", "detail": "Groton/New London demand compresses first."},
            {"title": "Winter ice and coastal wind", "detail": "Confirm driveway contingency."},
        ],
        specialized={
            "id": "new-london-groton-shoreline-i95-ct2",
            "title": "Groton defense, shoreline & I-95 / CT-2 module",
            "intro": "New London estimates fail when coastal staging, defense calendars, or I-95/CT-2 empty miles are ignored.",
            "bullets": [
                "Confirm access near Groton defense-adjacent corridors early.",
                "Photo curb and driveway access for coastal cottage and multi-unit jobs.",
                "Price I-95, CT-2, CT-32, and US-1 pairs portal-to-portal.",
                "Clarify New London vs Windham or Rhode Island destinations on multi-county estimates.",
                "Verify CTDOT household goods carrier certificate for in-state-only jobs and FMCSA for interstate legs.",
            ],
        },
        reloc_title="Considering a move to New London County?",
        reloc_intro="Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.",
        modules=[
            {
                "id": "schools",
                "title": "Schools & education landscape",
                "bullets": [
                    {"title": "How districts work here", "detail": "Municipal school systems and regional arrangements serve different New London towns. Confirm zoning carefully by address."},
                    {"title": "Research sources", "detail": "District tools and Connecticut State Department of Education data beat ranking screenshots."},
                ],
            },
            {
                "id": "hospitals",
                "title": "Hospitals & healthcare access",
                "bullets": [
                    {"title": "Major systems", "detail": "Yale New Haven Health Lawrence + Memorial, Backus Hospital, and other campuses serve county corridors. Confirm networks."},
                    {"title": "What relocators should do", "detail": "Map peak-hour drive times from inland edges into shoreline campuses. Transfer records early."},
                ],
            },
            {
                "id": "housing",
                "title": "Housing character & cost pressures",
                "bullets": [
                    {"title": "Shoreline multi-unit vs inland SFH stock", "detail": "New London/Groton product differs from Colchester and Norwich two-stories."},
                    {"title": "Cost variation", "detail": "Coastal and tourism-adjacent stock often prices differently from inland multi-family."},
                ],
            },
            {
                "id": "town-fit",
                "title": "Which areas fit whom",
                "bullets": [
                    {"title": "New London / Groton lifestyle", "detail": "Shoreline amenities with multi-unit and defense-adjacent tradeoffs."},
                    {"title": "Mystic / Stonington pattern", "detail": "Tourism shoreline with tight staging logistics."},
                    {"title": "Norwich / inland pattern", "detail": "SFH/multi-unit product with longer portal time to shore jobs."},
                ],
            },
            {
                "id": "jobs",
                "title": "Jobs & commute patterns",
                "bullets": [
                    {"title": "Employment anchors", "detail": "Defense/shipbuilding, healthcare, tourism, education, and logistics shape employment."},
                    {"title": "Commute realism", "detail": "I-95 and CT-2 peaks are real. Test drive peak routes between shoreline and inland hubs."},
                ],
            },
            {
                "id": "lifestyle",
                "title": "Lifestyle & practical livability",
                "bullets": [
                    {"title": "New London identity", "detail": "New London County is shoreline and defense Connecticut — not Fairfield NYC-metro coast or Hartford capital product as the default."},
                    {"title": "Climate", "detail": "Hot humid summers, coastal storms, and winter ice. Plan outdoor staging contingency."},
                ],
            },
        ],
        resources_title="Useful New London County resources",
        resources_intro="Official links first; directory listings are independent, not endorsements. Verify CTDOT household goods carrier certificate for in-state moves and FMCSA for interstate legs.",
        resource_items=[
            {"label": "City of New London — official site", "href": "https://newlondonct.org/"},
            {"label": "CTDOT traffic & travel", "href": "https://portal.ct.gov/dot"},
        ],
        directory_hint="Prefer shoreline and defense-adjacent access experience with honest I-95/CT-2 pricing. Verify CTDOT HHG certificate in-state and FMCSA interstate.",
    )
)

# 5. Litchfield
ct_packs.append(
    dict(
        finalize_fn="finalizeCtPack",
        import_path="@/lib/local-movers/county-intelligence/connecticut/ct-shared",
        export_name="litchfieldCountyCtIntelligence",
        county_slug="litchfield",
        hub_title="Litchfield County Moving Intelligence Hub",
        eyebrow="Litchfield · NW hills, rural driveways & US-7 / CT-8 logistics",
        h1="Moving in Litchfield County: Northwest Hills, Rural Access & US-7 / CT-8 Logistics",
        hero_opener="Litchfield County is Connecticut's northwest hills belt — not Fairfield Gold Coast elevators and not Hartford capital multi-unit: rural and semi-rural driveways, Torington and Waterbury-edge stock, US-7 and CT-8 portal time, and hillside access that is not NYC-metro curb or shoreline defense defaults. A Litchfield village colonial, a Torrington multi-family unit, a New Milford two-story, and a remote gravel-drive property do not share truck access or empty-mile risk. This hub is for Litchfield County (northwest hills) — not a renamed Fairfield or Berkshires clone page.",
        hero_cred=CT_HERO,
        corridors="US-7 · US-202 · CT-8 · CT-4",
        wmd_title="What makes moving in Litchfield County different",
        wmd_intro="These are Litchfield northwest-hills realities — rural driveways, hillside geometry, and US-7/CT-8 timing — not Fairfield elevators or Hartford capital defaults.",
        wmd_bullets=[
            {
                "title": "Hillside driveways and long carries rewrite labor hours",
                "detail": "Gravel approaches, steep grades, and limited turnaround dominate many rural and village jobs.",
            },
            {
                "title": "US-7, US-202, CT-8, and CT-4 define portal-to-portal time",
                "detail": "Cross-county pairs look local on maps and regional on two-lane hills at peak or in weather.",
            },
            {
                "title": "Village vs rural micro-markets are not interchangeable",
                "detail": "Torrington multi-family differs sharply from Litchfield/Washington estate and remote SFH product.",
            },
            {
                "title": "Winter ice and narrow roads reshape open carries",
                "detail": "Hill roads and unplowed private drives shrink staging options — plan contingency.",
            },
            {
                "title": "Not Fairfield NYC-metro or Hartford capital product as the default",
                "detail": "Survey each Litchfield address — hill access is not Gold Coast elevator or insurance-tower defaults.",
            },
            CT_REG,
        ],
        zones_heading="Litchfield access zones",
        zones_intro="Plan by Torrington multi-unit, Litchfield/Washington hills villages, New Milford/US-7 corridor, and Winsted/north hills edges.",
        zones=[
            {
                "id": "torrington",
                "name": "Torrington multi-unit & city stock",
                "shortName": "Torrington",
                "neighborhoods": ["Torrington", "Burrville edges", "Drakeville edges", "Harwinton edges"],
                "housingTypes": "Multi-family, older SFH, mid-rises",
                "challenges": ["Stairs and tight curb", "CT-8 congestion", "Mixed access types"],
                "moverTips": "Survey stair width carefully. Confirm parking rules block by block.",
                "cityKeywords": ["torrington", "harwinton"],
            },
            {
                "id": "litchfield-hills",
                "name": "Litchfield, Washington & hills villages",
                "shortName": "Litchfield hills",
                "neighborhoods": ["Litchfield", "Washington", "Morris edges", "Goshen edges"],
                "housingTypes": "Village SFH, estate edges, rural driveways",
                "challenges": ["Steep driveways", "Long carries", "Limited truck turnaround"],
                "moverTips": "Photo driveway grade and turnaround. Prefer smaller trucks when approach is tight.",
                "cityKeywords": ["litchfield", "washington", "goshen"],
            },
            {
                "id": "new-milford-us7",
                "name": "New Milford, Brookfield edges & US-7 corridor",
                "shortName": "New Milford / US-7",
                "neighborhoods": ["New Milford", "Bridgewater edges", "Roxbury edges", "Sherman edges"],
                "housingTypes": "SFH, multi-family, HOA pockets",
                "challenges": ["US-7 congestion", "HOA rules", "Longer portal time to hills villages"],
                "moverTips": "Collect HOA packets. Price US-7 pairs portal-to-portal.",
                "cityKeywords": ["new milford", "bridgewater"],
            },
            {
                "id": "winsted-north",
                "name": "Winsted, Winchester & northern hills edges",
                "shortName": "Winsted / north",
                "neighborhoods": ["Winsted", "Winchester", "Barkhamsted edges", "Colebrook edges"],
                "housingTypes": "SFH, multi-family, rural stock",
                "challenges": ["CT-8 / CT-4 links", "Winter access", "Remote empty miles"],
                "moverTips": "Confirm winter driveway contingency. Price northern pairs honestly.",
                "cityKeywords": ["winsted", "winchester", "barkhamsted"],
            },
        ],
        cost_title="What drives Litchfield County moving costs",
        cost_intro="Hillside access, long carries, and US-7/CT-8 portal time drive quotes more than bedroom count alone.",
        drivers=[
            {"title": "Steep driveway & long-carry friction", "detail": "Rural labor hours spike."},
            {"title": "US-7 / US-202 / CT-8 congestion and two-lane delays", "detail": "Portal-to-portal spikes at peak and in weather."},
            {"title": "Older multi-unit stairs in Torrington", "detail": "City stock raises labor hours."},
            {"title": "Remote empty miles", "detail": "North hills pairs punish odometer optimism."},
        ],
        ranges=[
            {"label": "Studio / 1BR (simple access)", "value": "$425–$1,400+", "note": "Higher with long carries"},
            {"label": "2–3BR condo or modest SFH", "value": "$1,250–$3,600+", "note": "Hill access trends up"},
            {"label": "3–4+ BR / estate / remote pair", "value": "$2,300–$7,000+", "note": "Long carries and remote pairs highest"},
            {"label": "Typical 2-person crew rate", "value": "$100–$175+/hr", "note": "Portal-to-portal"},
        ],
        seasonal_title="When to schedule a move in Litchfield County",
        seasonal_intro="Summer family peaks, fall foliage tourism, and winter hill ice reshape Litchfield windows.",
        seasonal_items=[
            {"title": "Best windows: mid-week early mornings", "detail": "Clear curb and reduce corridor pain."},
            {"title": "Peak family season: late May–mid-August", "detail": "Book village Saturdays early."},
            {"title": "Fall foliage tourism weeks", "detail": "US-7 and village staging compress."},
            {"title": "Winter ice and snow on hills", "detail": "Confirm driveway contingency and plow status."},
        ],
        specialized={
            "id": "litchfield-nw-hills-us7-ct8",
            "title": "Northwest hills, rural access & US-7 / CT-8 module",
            "intro": "Litchfield estimates fail when driveway geometry, winter contingency, or US-7/CT-8 empty miles are ignored.",
            "bullets": [
                "Photo driveway grade, surface, and turnaround early.",
                "Survey stair and curb access for Torrington multi-unit jobs.",
                "Price US-7, US-202, CT-8, and CT-4 pairs portal-to-portal.",
                "Clarify Litchfield vs Hartford or Fairfield destinations on multi-county estimates.",
                "Verify CTDOT household goods carrier certificate for in-state-only jobs and FMCSA for interstate legs.",
            ],
        },
        reloc_title="Considering a move to Litchfield County?",
        reloc_intro="Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.",
        modules=[
            {
                "id": "schools",
                "title": "Schools & education landscape",
                "bullets": [
                    {"title": "How districts work here", "detail": "Regional and municipal school systems serve different Litchfield towns. Confirm zoning carefully by address."},
                    {"title": "Research sources", "detail": "District tools and Connecticut State Department of Education data beat ranking screenshots."},
                ],
            },
            {
                "id": "hospitals",
                "title": "Hospitals & healthcare access",
                "bullets": [
                    {"title": "Major systems", "detail": "Charlotte Hungerford Hospital, New Milford Hospital, and campuses in neighboring counties serve residents. Confirm networks."},
                    {"title": "What relocators should do", "detail": "Map peak-hour and weather drive times from remote hills into major campuses. Transfer records early."},
                ],
            },
            {
                "id": "housing",
                "title": "Housing character & cost pressures",
                "bullets": [
                    {"title": "Village estate vs Torrington multi-unit stock", "detail": "Hills villages differ sharply from city multi-family and remote SFH."},
                    {"title": "Cost variation", "detail": "Scenic and estate-adjacent stock often prices differently from industrial-edge multi-family."},
                ],
            },
            {
                "id": "town-fit",
                "title": "Which areas fit whom",
                "bullets": [
                    {"title": "Hills village lifestyle", "detail": "Quiet amenities with driveway and long-carry tradeoffs."},
                    {"title": "Torrington city pattern", "detail": "Multi-unit density with CT-8 logistics."},
                    {"title": "US-7 corridor pattern", "detail": "New Milford SFH/HOA product with corridor portal time."},
                ],
            },
            {
                "id": "jobs",
                "title": "Jobs & commute patterns",
                "bullets": [
                    {"title": "Employment anchors", "detail": "Healthcare, manufacturing, tourism, education, and reverse commute to larger metros shape employment."},
                    {"title": "Commute realism", "detail": "US-7 and CT-8 peaks and weather delays are real. Test drive peak routes to Waterbury, Danbury, and Hartford approaches."},
                ],
            },
            {
                "id": "lifestyle",
                "title": "Lifestyle & practical livability",
                "bullets": [
                    {"title": "Litchfield identity", "detail": "Litchfield County is northwest hills Connecticut — not Fairfield Gold Coast or Hartford capital product as the default."},
                    {"title": "Climate", "detail": "Hot humid summers and serious winter ice/snow on hills. Plan outdoor staging contingency."},
                ],
            },
        ],
        resources_title="Useful Litchfield County resources",
        resources_intro="Official links first; directory listings are independent, not endorsements. Verify CTDOT household goods carrier certificate for in-state moves and FMCSA for interstate legs.",
        resource_items=[
            {"label": "Litchfield County — town / regional portals", "href": "https://portal.ct.gov/"},
            {"label": "CTDOT traffic & travel", "href": "https://portal.ct.gov/dot"},
        ],
        directory_hint="Prefer hills driveway and rural access experience with honest US-7/CT-8 pricing. Verify CTDOT HHG certificate in-state and FMCSA interstate.",
    )
)

# 6. Middlesex (CT)
ct_packs.append(
    dict(
        finalize_fn="finalizeCtPack",
        import_path="@/lib/local-movers/county-intelligence/connecticut/ct-shared",
        export_name="middlesexCountyCtIntelligence",
        county_slug="middlesex",
        hub_title="Middlesex County Moving Intelligence Hub",
        eyebrow="Middlesex · Middletown CT River, shoreline approaches & CT-9 logistics",
        h1="Moving in Middlesex County: Middletown River Corridor, Shoreline Approaches & CT-9 Logistics",
        hero_opener="Middlesex County, Connecticut is the lower Connecticut River and shoreline-approach belt — not Massachusetts Middlesex (Cambridge/Boston) and not Hartford capital towers: Middletown multi-unit and Wesleyan-adjacent stock, CT-9 corridor logistics, shoreline towns toward Old Saybrook, and river-crossing portal time that is not Gold Coast elevators or northwest hills rural defaults. A Middletown walk-up, a Cromwell two-story, a Clinton coastal cottage approach, and an East Haddam hillside driveway do not share truck access or empty-mile risk. This hub is for Middlesex County, CT (Middletown–river–shore approaches) — not a renamed Massachusetts Middlesex or New Haven page.",
        hero_cred=CT_HERO,
        corridors="CT-9 · CT-66 · I-91 links · US-1 approaches",
        wmd_title="What makes moving in Middlesex County different",
        wmd_intro="These are Middlesex CT river and shoreline-approach realities — Middletown multi-unit, CT-9 timing, and coastal edges — not Massachusetts Middlesex product or Hartford capital defaults.",
        wmd_bullets=[
            {
                "title": "Middletown multi-unit and campus-edge access rewrite labor hours",
                "detail": "Stairs, tight curb, and building packets dominate core jobs near Wesleyan and downtown stock.",
            },
            {
                "title": "CT-9, CT-66, and I-91 links define portal-to-portal time",
                "detail": "River-corridor pairs look local on maps and regional at peak into Hartford and shoreline approaches.",
            },
            {
                "title": "River towns vs shoreline approaches are not interchangeable",
                "detail": "Middletown/Cromwell product differs from Clinton/Westbrook coastal and East Haddam hillside stock.",
            },
            {
                "title": "US-1 approaches add seasonal shoreline friction",
                "detail": "Tourism peaks and limited coastal staging reshape open-carry plans.",
            },
            {
                "title": "Not Massachusetts Middlesex and not Hartford capital product as the default",
                "detail": "Survey each Middlesex CT address — river density is not Cambridge/Boston multi-unit or insurance-tower defaults.",
            },
            CT_REG,
        ],
        zones_heading="Middlesex CT access zones",
        zones_intro="Plan by Middletown core, Cromwell/Portland river towns, shoreline approaches, and East Haddam/hills edges.",
        zones=[
            {
                "id": "middletown-core",
                "name": "Middletown core, Wesleyan edges & multi-unit",
                "shortName": "Middletown",
                "neighborhoods": ["Downtown Middletown", "Wesleyan edges", "South Farms edges", "Westfield edges"],
                "housingTypes": "Multi-family, walk-ups, SFH, mid-rises",
                "challenges": ["Stairs and tight curb", "CT-9 congestion", "Campus calendar spikes"],
                "moverTips": "Get building packets early. Prefer mid-week mornings away from campus move waves when flexible.",
                "cityKeywords": ["middletown", "wesleyan"],
            },
            {
                "id": "cromwell-portland",
                "name": "Cromwell, Portland & upper river towns",
                "shortName": "Cromwell / Portland",
                "neighborhoods": ["Cromwell", "Portland", "Rocky Hill edges", "Middlefield edges"],
                "housingTypes": "SFH, multi-family, HOA pockets",
                "challenges": ["I-91 / CT-9 links", "HOA rules", "River-crossing portal time"],
                "moverTips": "Collect HOA packets. Price river-corridor pairs portal-to-portal.",
                "cityKeywords": ["cromwell", "portland", "middlefield"],
            },
            {
                "id": "shore-approaches",
                "name": "Clinton, Westbrook, Old Saybrook approaches",
                "shortName": "Shore approaches",
                "neighborhoods": ["Clinton", "Westbrook", "Old Saybrook edges", "Killingworth edges"],
                "housingTypes": "Coastal SFH, cottages, multi-family",
                "challenges": ["US-1 tourism peaks", "Tight coastal curb", "Seasonal congestion"],
                "moverTips": "Avoid peak shoreline weekends when flexible. Confirm driveway and street parking rules.",
                "cityKeywords": ["clinton", "westbrook", "old saybrook"],
            },
            {
                "id": "east-haddam-hills",
                "name": "East Haddam, Haddam & river hills edges",
                "shortName": "East Haddam / hills",
                "neighborhoods": ["East Haddam", "Haddam", "Durham edges", "Chester edges"],
                "housingTypes": "SFH, rural driveways, village stock",
                "challenges": ["Steep driveways", "Long carries", "Longer empty miles to core"],
                "moverTips": "Photo driveway grade and turnaround. Price hills pairs honestly.",
                "cityKeywords": ["east haddam", "haddam", "chester"],
            },
        ],
        cost_title="What drives Middlesex County moving costs",
        cost_intro="Multi-unit stairs, shoreline approaches, and CT-9 portal time drive quotes more than bedroom count alone.",
        drivers=[
            {"title": "Middletown multi-unit stair & curb friction", "detail": "Core labor hours spike."},
            {"title": "CT-9 / CT-66 / I-91 link congestion", "detail": "Portal-to-portal spikes at peak."},
            {"title": "Coastal cottage access", "detail": "Shore approaches raise staging time."},
            {"title": "River-to-hills empty miles", "detail": "East Haddam pairs punish odometer optimism."},
        ],
        ranges=[
            {"label": "Studio / 1BR (simple access)", "value": "$425–$1,450+", "note": "Higher with stairs"},
            {"label": "2–3BR condo or modest SFH", "value": "$1,250–$3,700+", "note": "Core friction trends up"},
            {"label": "3–4+ BR / multi-unit / cross-corridor", "value": "$2,300–$7,200+", "note": "Long pairs and coastal access highest"},
            {"label": "Typical 2-person crew rate", "value": "$100–$175+/hr", "note": "Portal-to-portal"},
        ],
        seasonal_title="When to schedule a move in Middlesex County",
        seasonal_intro="Summer family peaks, campus calendars, shoreline tourism, and winter ice reshape Middlesex CT windows.",
        seasonal_items=[
            {"title": "Best windows: mid-week early mornings", "detail": "Clear curb and reduce CT-9 pain."},
            {"title": "Peak family season: late May–mid-August", "detail": "Book suburban and shore Saturdays early."},
            {"title": "Campus and multi-family turns", "detail": "Middletown elevators and walk-ups fill first."},
            {"title": "Winter ice and snow", "detail": "Confirm driveway contingency on hills and river towns."},
        ],
        specialized={
            "id": "middlesex-ct-middletown-river-ct9",
            "title": "Middletown river corridor, shore approaches & CT-9 module",
            "intro": "Middlesex CT estimates fail when multi-unit access, shoreline staging, or CT-9 empty miles are ignored — and when MA Middlesex assumptions are applied.",
            "bullets": [
                "Request Middletown building packets early.",
                "Photo curb, stair, and driveway access for multi-unit and coastal jobs.",
                "Price CT-9, CT-66, I-91 links, and US-1 approach pairs portal-to-portal.",
                "Clarify Middlesex CT vs New Haven, Hartford, or New London destinations on multi-county estimates.",
                "Verify CTDOT household goods carrier certificate for in-state-only jobs and FMCSA for interstate legs.",
            ],
        },
        reloc_title="Considering a move to Middlesex County, CT?",
        reloc_intro="Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit. This is Connecticut Middlesex, not Massachusetts Middlesex.",
        modules=[
            {
                "id": "schools",
                "title": "Schools & education landscape",
                "bullets": [
                    {"title": "How districts work here", "detail": "Municipal and regional school systems serve different Middlesex CT towns. Confirm zoning carefully by address."},
                    {"title": "Research sources", "detail": "District tools and Connecticut State Department of Education data beat ranking screenshots. Wesleyan and other higher-ed calendars affect housing demand."},
                ],
            },
            {
                "id": "hospitals",
                "title": "Hospitals & healthcare access",
                "bullets": [
                    {"title": "Major systems", "detail": "Middlesex Health and neighboring-system campuses serve county corridors. Confirm networks."},
                    {"title": "What relocators should do", "detail": "Map peak-hour drive times from shore approaches and hills into Middletown campuses. Transfer records early."},
                ],
            },
            {
                "id": "housing",
                "title": "Housing character & cost pressures",
                "bullets": [
                    {"title": "Middletown multi-unit vs shore SFH stock", "detail": "Core product differs sharply from Clinton/Westbrook coastal and East Haddam hills stock."},
                    {"title": "Cost variation", "detail": "River-adjacent renovated stock often prices differently from rural multi-family."},
                ],
            },
            {
                "id": "town-fit",
                "title": "Which areas fit whom",
                "bullets": [
                    {"title": "Middletown lifestyle", "detail": "River-city amenities with multi-unit and curb tradeoffs."},
                    {"title": "Shore approach pattern", "detail": "Coastal SFH/cottage product with US-1 logistics."},
                    {"title": "Hills / river pattern", "detail": "East Haddam SFH with longer portal time to core jobs."},
                ],
            },
            {
                "id": "jobs",
                "title": "Jobs & commute patterns",
                "bullets": [
                    {"title": "Employment anchors", "detail": "Healthcare, education, manufacturing, logistics, and reverse commute to Hartford/New Haven shape employment."},
                    {"title": "Commute realism", "detail": "CT-9 and I-91 peaks are real. Test drive peak routes toward Hartford and shoreline hubs."},
                ],
            },
            {
                "id": "lifestyle",
                "title": "Lifestyle & practical livability",
                "bullets": [
                    {"title": "Middlesex CT identity", "detail": "Middlesex County CT is lower river and shore-approach Connecticut — not Massachusetts Middlesex Cambridge/Boston product and not Hartford capital towers as the default."},
                    {"title": "Climate", "detail": "Hot humid summers and winter ice/snow. Plan outdoor staging contingency."},
                ],
            },
        ],
        resources_title="Useful Middlesex County resources",
        resources_intro="Official links first; directory listings are independent, not endorsements. Verify CTDOT household goods carrier certificate for in-state moves and FMCSA for interstate legs.",
        resource_items=[
            {"label": "City of Middletown — official site", "href": "https://www.middletownct.gov/"},
            {"label": "CTDOT traffic & travel", "href": "https://portal.ct.gov/dot"},
        ],
        directory_hint="Prefer Middletown multi-unit and CT-9 corridor experience with honest portal pricing. Verify CTDOT HHG certificate in-state and FMCSA interstate. This is CT Middlesex, not MA.",
    )
)

# ---------------------------------------------------------------------------
# UTAH PACKS
# ---------------------------------------------------------------------------

ut_packs = []

# 1. Salt Lake
ut_packs.append(
    dict(
        finalize_fn="finalizeUtPack",
        import_path="@/lib/local-movers/county-intelligence/utah/ut-shared",
        export_name="saltLakeCountyUtIntelligence",
        county_slug="salt-lake",
        hub_title="Salt Lake County Moving Intelligence Hub",
        eyebrow="Salt Lake · SLC neighborhoods, east bench & I-15 / I-80 logistics",
        h1="Moving in Salt Lake County: SLC Neighborhoods, East Bench Access & I-15 / I-80 Logistics",
        hero_opener="Salt Lake County is Utah's metro core — not Utah County Provo–Orem product and not St. George desert stock: Salt Lake City neighborhood multi-unit elevators, east bench hillside driveways, Sugar House and Millcreek density, I-15 and I-80 portal time, and valley floor logistics that are not Lehi tech-corridor or southern Utah defaults. A downtown SLC tower, an Avenues walk-up, a Cottonwood Heights two-story, and a West Valley multi-family unit do not share truck access or empty-mile risk. This hub is for Salt Lake County (SLC–east bench–valley) — not a renamed Utah County or Davis page.",
        hero_cred=UT_HERO,
        corridors="I-15 · I-80 · I-215 · US-89",
        wmd_title="What makes moving in Salt Lake County different",
        wmd_intro="These are Salt Lake metro realities — downtown elevators, east bench grades, and I-15/I-80 timing — not Utah County tech growth or St. George desert defaults.",
        wmd_bullets=[
            {
                "title": "Downtown and midtown elevators rewrite labor hours",
                "detail": "Building packets, COI naming, and freight windows dominate SLC core and multi-unit jobs.",
            },
            {
                "title": "East bench hillside driveways change staging rules",
                "detail": "Steep approaches, limited turnaround, and long carries reshape Millcreek, Holladay, and Cottonwood product.",
            },
            {
                "title": "I-15, I-80, and I-215 define portal-to-portal time",
                "detail": "Cross-valley pairs look local on maps and regional at peak.",
            },
            {
                "title": "West valley multi-unit is not east bench SFH",
                "detail": "West Valley, Taylorsville, and South Jordan stock differs sharply from Avenues and foothill product.",
            },
            {
                "title": "Not Utah County Provo–Orem or Davis north Wasatch product as the default",
                "detail": "Survey each Salt Lake address — metro core density is not Silicon Slopes growth or Ogden hub defaults.",
            },
            UT_REG,
        ],
        zones_heading="Salt Lake access zones",
        zones_intro="Plan by downtown/midtown elevators, east bench hills, west valley multi-unit, and south valley/I-15 growth edges.",
        zones=[
            {
                "id": "downtown-midtown",
                "name": "Downtown SLC, Avenues & midtown elevators",
                "shortName": "Downtown / midtown",
                "neighborhoods": ["Downtown Salt Lake", "The Avenues", "Central City", "Sugar House edges"],
                "housingTypes": "High-rises, mid-rises, walk-ups, renovated multi-unit",
                "challenges": ["Elevators and COI", "Scarce curb staging", "Stairs and long carries"],
                "moverTips": "Get building packets early. Prefer mid-week morning freight windows.",
                "cityKeywords": ["salt lake city", "downtown", "avenues", "sugar house"],
            },
            {
                "id": "east-bench",
                "name": "East bench: Millcreek, Holladay & Cottonwood",
                "shortName": "East bench",
                "neighborhoods": ["Millcreek", "Holladay", "Cottonwood Heights", "Olympus Cove edges"],
                "housingTypes": "SFH, multi-family, hillside driveways",
                "challenges": ["Steep driveways", "Limited turnaround", "I-215 congestion"],
                "moverTips": "Photo driveway grade and turnaround. Prefer smaller trucks when approach is tight.",
                "cityKeywords": ["millcreek", "holladay", "cottonwood heights"],
            },
            {
                "id": "west-valley",
                "name": "West Valley, Taylorsville & west multi-unit",
                "shortName": "West valley",
                "neighborhoods": ["West Valley City", "Taylorsville", "Kearns edges", "Magna edges"],
                "housingTypes": "Multi-family, SFH, mid-rises",
                "challenges": ["I-215 / SR-201 congestion", "Curb parking limits", "Mixed access types"],
                "moverTips": "Confirm parking rules block by block. Price west-to-east pairs portal-to-portal.",
                "cityKeywords": ["west valley", "taylorsville", "kearns"],
            },
            {
                "id": "south-valley",
                "name": "South Jordan, Draper & south I-15 growth",
                "shortName": "South valley",
                "neighborhoods": ["South Jordan", "Draper", "Riverton edges", "Sandy edges"],
                "housingTypes": "SFH, multi-family, HOA pockets",
                "challenges": ["I-15 congestion", "HOA gates", "Longer portal time to core"],
                "moverTips": "Collect HOA packets. Price south valley pairs portal-to-portal.",
                "cityKeywords": ["south jordan", "draper", "sandy", "riverton"],
            },
        ],
        cost_title="What drives Salt Lake County moving costs",
        cost_intro="Elevator friction, east bench grades, and I-15/I-80 portal time drive quotes more than bedroom count alone.",
        drivers=[
            {"title": "Downtown elevator & curb friction", "detail": "Core labor hours spike."},
            {"title": "I-15 / I-80 / I-215 congestion", "detail": "Portal-to-portal spikes at peak."},
            {"title": "East bench driveway grades & long carries", "detail": "Hillside access raises crew time."},
            {"title": "Cross-valley empty miles", "detail": "West-to-east pairs punish odometer optimism."},
        ],
        ranges=[
            {"label": "Studio / 1BR (simple access)", "value": "$450–$1,500+", "note": "Higher with elevators"},
            {"label": "2–3BR condo or modest SFH", "value": "$1,350–$3,900+", "note": "Core friction trends up"},
            {"label": "3–4+ BR / tower / cross-valley", "value": "$2,500–$7,800+", "note": "Towers and long pairs highest"},
            {"label": "Typical 2-person crew rate", "value": "$105–$180+/hr", "note": "Portal-to-portal"},
        ],
        seasonal_title="When to schedule a move in Salt Lake County",
        seasonal_intro="Summer family peaks, multi-family lease turns, inversion-season air quality, and winter canyon/bench ice reshape Salt Lake windows.",
        seasonal_items=[
            {"title": "Best windows: mid-week early mornings", "detail": "Clear curb and reduce I-15/I-80 pain."},
            {"title": "Peak family season: late May–mid-August", "detail": "Book suburban Saturdays early."},
            {"title": "Month-end multi-family turns", "detail": "Downtown elevators fill first."},
            {"title": "Winter ice and east bench snow", "detail": "Confirm driveway contingency."},
        ],
        specialized={
            "id": "salt-lake-slc-east-bench-i15-i80",
            "title": "SLC neighborhoods, east bench & I-15 / I-80 module",
            "intro": "Salt Lake estimates fail when building packets, bench driveway grades, or I-15/I-80 empty miles are ignored.",
            "bullets": [
                "Request downtown/midtown building packets early.",
                "Photo curb, stair, and driveway grade for multi-unit and east bench jobs.",
                "Price I-15, I-80, I-215, and US-89 pairs portal-to-portal.",
                "Clarify Salt Lake vs Utah or Davis destinations on multi-county estimates.",
                "Verify UDOT motor carrier credentials for in-state-only jobs and FMCSA for interstate legs.",
            ],
        },
        reloc_title="Considering a move to Salt Lake County?",
        reloc_intro="Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.",
        modules=[
            {
                "id": "schools",
                "title": "Schools & education landscape",
                "bullets": [
                    {"title": "How districts work here", "detail": "Salt Lake City School District, Granite, Jordan, Canyons, and other systems serve different addresses. Confirm zoning carefully."},
                    {"title": "Research sources", "detail": "District tools and Utah State Board of Education data beat ranking screenshots."},
                ],
            },
            {
                "id": "hospitals",
                "title": "Hospitals & healthcare access",
                "bullets": [
                    {"title": "Major systems", "detail": "University of Utah Health, Intermountain, MountainStar, and other campuses serve county corridors. Confirm networks."},
                    {"title": "What relocators should do", "detail": "Map peak-hour drive times from west and south valley edges into major campuses. Transfer records early."},
                ],
            },
            {
                "id": "housing",
                "title": "Housing character & cost pressures",
                "bullets": [
                    {"title": "Core condo/multi-unit vs bench SFH stock", "detail": "Downtown product differs sharply from east bench and south valley two-stories."},
                    {"title": "Cost variation", "detail": "Near-core renovated stock often prices differently from west valley multi-family."},
                ],
            },
            {
                "id": "town-fit",
                "title": "Which areas fit whom",
                "bullets": [
                    {"title": "Downtown / midtown lifestyle", "detail": "Walkable amenities with elevator and curb tradeoffs."},
                    {"title": "East bench pattern", "detail": "Hillside SFH with driveway logistics."},
                    {"title": "South / west valley pattern", "detail": "HOA/multi-unit product with longer portal time to core jobs."},
                ],
            },
            {
                "id": "jobs",
                "title": "Jobs & commute patterns",
                "bullets": [
                    {"title": "Employment anchors", "detail": "Healthcare, government, tech, logistics, finance, and professional services shape employment."},
                    {"title": "Commute realism", "detail": "I-15 and I-80 peaks are real. Test drive peak routes around the valley ring."},
                ],
            },
            {
                "id": "lifestyle",
                "title": "Lifestyle & practical livability",
                "bullets": [
                    {"title": "Salt Lake identity", "detail": "Salt Lake County is Wasatch Front metro core — not Utah County Silicon Slopes growth or St. George desert product as the default."},
                    {"title": "Climate", "detail": "Hot dry summers, inversion winters, and mountain snow. Plan outdoor staging contingency."},
                ],
            },
        ],
        resources_title="Useful Salt Lake County resources",
        resources_intro="Official links first; directory listings are independent, not endorsements. Verify UDOT motor carrier credentials for in-state moves and FMCSA for interstate legs.",
        resource_items=[
            {"label": "Salt Lake County — official site", "href": "https://slco.org/"},
            {"label": "UDOT traffic", "href": "https://www.udot.utah.gov/connect/"},
        ],
        directory_hint="Prefer downtown elevator and east bench access experience with honest I-15/I-80 pricing. Verify UDOT credentials in-state and FMCSA interstate.",
    )
)

# 2. Utah County — CRITICAL H1
ut_packs.append(
    dict(
        finalize_fn="finalizeUtPack",
        import_path="@/lib/local-movers/county-intelligence/utah/ut-shared",
        export_name="utahCountyUtIntelligence",
        county_slug="utah",
        hub_title="Utah County Moving Intelligence Hub",
        eyebrow="Utah County · Provo–Orem–Lehi tech/family growth & I-15 logistics",
        h1="Moving in Utah County: Provo–Orem–Lehi Growth, Campus Access & I-15 Logistics",
        hero_opener="Utah County is the Provo–Orem–Lehi growth belt — not statewide “Moving in Utah” and not Salt Lake City metro core: BYU and UVU campus multi-unit waves, Silicon Slopes family HOA product, I-15 corridor portal time, and south Wasatch Front density that is not downtown SLC elevators or St. George desert defaults. A Provo walk-up, an Orem multi-family unit, a Lehi two-story HOA, and a Spanish Fork ranch do not share truck access or empty-mile risk. This hub is for Utah County (Provo–Orem–Lehi) — not a renamed Salt Lake County page or generic statewide Utah script.",
        hero_cred=UT_HERO,
        corridors="I-15 · US-89 · US-189",
        wmd_title="What makes moving in Utah County different",
        wmd_intro="These are Utah County Provo–Orem–Lehi realities — campus multi-unit, tech-corridor HOA growth, and I-15 timing — not Salt Lake downtown elevators or statewide generic product.",
        wmd_bullets=[
            {
                "title": "Campus multi-unit waves rewrite calendars",
                "detail": "BYU, UVU, and student-adjacent housing compress move-in/out windows and raise month-end demand.",
            },
            {
                "title": "Silicon Slopes HOA and multi-family product differs from Provo core",
                "detail": "Lehi, American Fork, and Eagle Mountain stock stacks gates, curb rules, and newer elevators.",
            },
            {
                "title": "I-15, US-89, and US-189 define portal-to-portal time",
                "detail": "North-county to Provo pairs look local on maps and regional at peak.",
            },
            {
                "title": "South county SFH is not Lehi tech multi-unit",
                "detail": "Spanish Fork, Springville, and Payson product differs from north I-15 growth corridors.",
            },
            {
                "title": "Not Salt Lake County metro core or statewide Utah as the default",
                "detail": "Survey each Utah County address — Provo–Orem–Lehi density is not SLC east bench or St. George desert defaults.",
            },
            UT_REG,
        ],
        zones_heading="Utah County access zones",
        zones_intro="Plan by Provo/campus multi-unit, Orem/UVU corridor, Lehi/Silicon Slopes growth, and south county SFH edges.",
        zones=[
            {
                "id": "provo-campus",
                "name": "Provo core, BYU edges & multi-unit",
                "shortName": "Provo / campus",
                "neighborhoods": ["Downtown Provo", "BYU edges", "Joaquin edges", "Provo Canyon approaches"],
                "housingTypes": "Multi-family, walk-ups, mid-rises, SFH",
                "challenges": ["Stairs and tight curb", "Campus calendar spikes", "US-189 / I-15 congestion"],
                "moverTips": "Get building packets early. Prefer mid-week mornings away from semester move peaks when flexible.",
                "cityKeywords": ["provo", "byu"],
            },
            {
                "id": "orem-uvu",
                "name": "Orem, UVU corridor & mid-county multi-unit",
                "shortName": "Orem / UVU",
                "neighborhoods": ["Orem", "UVU edges", "Lindon edges", "Vineyard edges"],
                "housingTypes": "Multi-family, SFH, mid-rises",
                "challenges": ["I-15 congestion", "Curb parking limits", "Mixed access types"],
                "moverTips": "Confirm parking rules block by block. Price mid-county pairs portal-to-portal.",
                "cityKeywords": ["orem", "lindon", "vineyard"],
            },
            {
                "id": "lehi-silicon-slopes",
                "name": "Lehi, American Fork & Silicon Slopes growth",
                "shortName": "Lehi / Silicon Slopes",
                "neighborhoods": ["Lehi", "American Fork", "Eagle Mountain edges", "Saratoga Springs edges"],
                "housingTypes": "SFH, multi-family, HOA pockets, newer elevators",
                "challenges": ["HOA gates", "I-15 peak delays", "Longer portal time to Provo core"],
                "moverTips": "Collect HOA packets. Price north-county pairs portal-to-portal.",
                "cityKeywords": ["lehi", "american fork", "eagle mountain", "saratoga springs"],
            },
            {
                "id": "south-county",
                "name": "Spanish Fork, Springville, Payson & south edges",
                "shortName": "South county",
                "neighborhoods": ["Spanish Fork", "Springville", "Payson", "Mapleton edges"],
                "housingTypes": "SFH, multi-family, HOA pockets",
                "challenges": ["I-15 / US-89 congestion", "HOA rules", "Longer empty miles to Lehi"],
                "moverTips": "Collect HOA packets. Price south-to-north pairs honestly.",
                "cityKeywords": ["spanish fork", "springville", "payson"],
            },
        ],
        cost_title="What drives Utah County moving costs",
        cost_intro="Campus multi-unit friction, HOA access, and I-15 portal time drive quotes more than bedroom count alone.",
        drivers=[
            {"title": "Campus multi-unit stair & curb friction", "detail": "Core labor hours spike."},
            {"title": "I-15 / US-89 congestion", "detail": "Portal-to-portal spikes at peak."},
            {"title": "HOA gates & long carries", "detail": "Silicon Slopes access raises crew time."},
            {"title": "North-south empty miles", "detail": "Lehi-to-Payson pairs punish odometer optimism."},
        ],
        ranges=[
            {"label": "Studio / 1BR (simple access)", "value": "$425–$1,450+", "note": "Higher with multi-unit stairs"},
            {"label": "2–3BR condo or modest SFH", "value": "$1,250–$3,700+", "note": "Growth-corridor friction trends up"},
            {"label": "3–4+ BR / multi-unit / cross-corridor", "value": "$2,300–$7,200+", "note": "Long pairs and peak calendars highest"},
            {"label": "Typical 2-person crew rate", "value": "$100–$175+/hr", "note": "Portal-to-portal"},
        ],
        seasonal_title="When to schedule a move in Utah County",
        seasonal_intro="Summer family peaks, university move waves, tech-corridor growth turns, and winter valley ice reshape Utah County windows.",
        seasonal_items=[
            {"title": "Best windows: mid-week early mornings", "detail": "Clear curb and reduce I-15 pain."},
            {"title": "Peak family season: late May–mid-August", "detail": "Book suburban Saturdays early."},
            {"title": "University move-in / move-out waves", "detail": "Provo/Orem multi-unit fills first."},
            {"title": "Winter ice and snow", "detail": "Confirm driveway contingency."},
        ],
        specialized={
            "id": "utah-county-provo-orem-lehi-i15",
            "title": "Provo–Orem–Lehi growth, campus & I-15 module",
            "intro": "Utah County estimates fail when campus calendars, HOA packets, or I-15 empty miles are ignored — and when statewide Utah or Salt Lake defaults are applied.",
            "bullets": [
                "Request Provo/Orem multi-unit building packets early.",
                "Collect Silicon Slopes HOA packets for Lehi/American Fork jobs.",
                "Price I-15, US-89, and US-189 pairs portal-to-portal.",
                "Clarify Utah County vs Salt Lake destinations on multi-county estimates.",
                "Verify UDOT motor carrier credentials for in-state-only jobs and FMCSA for interstate legs.",
            ],
        },
        reloc_title="Considering a move to Utah County?",
        reloc_intro="Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit. This is Utah County (Provo–Orem–Lehi), not statewide Utah.",
        modules=[
            {
                "id": "schools",
                "title": "Schools & education landscape",
                "bullets": [
                    {"title": "How districts work here", "detail": "Alpine, Nebo, Provo, and other districts serve different addresses. Confirm zoning carefully."},
                    {"title": "Research sources", "detail": "District tools and Utah State Board of Education data beat ranking screenshots. BYU and UVU calendars affect housing demand."},
                ],
            },
            {
                "id": "hospitals",
                "title": "Hospitals & healthcare access",
                "bullets": [
                    {"title": "Major systems", "detail": "Intermountain Utah Valley, Timpanogos Regional, and other campuses serve county corridors. Confirm networks."},
                    {"title": "What relocators should do", "detail": "Map peak-hour drive times from Lehi and south county edges into major campuses. Transfer records early."},
                ],
            },
            {
                "id": "housing",
                "title": "Housing character & cost pressures",
                "bullets": [
                    {"title": "Campus multi-unit vs Silicon Slopes SFH stock", "detail": "Provo/Orem product differs sharply from Lehi/Eagle Mountain HOA two-stories."},
                    {"title": "Cost variation", "detail": "North-corridor growth stock often prices differently from south county multi-family."},
                ],
            },
            {
                "id": "town-fit",
                "title": "Which areas fit whom",
                "bullets": [
                    {"title": "Provo / campus lifestyle", "detail": "University amenities with multi-unit and curb tradeoffs."},
                    {"title": "Lehi / Silicon Slopes pattern", "detail": "Tech-corridor HOA growth with I-15 logistics."},
                    {"title": "South county pattern", "detail": "SFH/family product with longer portal time to north jobs."},
                ],
            },
            {
                "id": "jobs",
                "title": "Jobs & commute patterns",
                "bullets": [
                    {"title": "Employment anchors", "detail": "Tech, education, healthcare, manufacturing, and logistics shape employment along I-15."},
                    {"title": "Commute realism", "detail": "I-15 peaks are real. Test drive peak routes between Lehi and Provo."},
                ],
            },
            {
                "id": "lifestyle",
                "title": "Lifestyle & practical livability",
                "bullets": [
                    {"title": "Utah County identity", "detail": "Utah County is Provo–Orem–Lehi south Wasatch growth — not Salt Lake downtown metro core or St. George desert product as the default."},
                    {"title": "Climate", "detail": "Hot dry summers and winter valley ice/snow. Plan outdoor staging contingency."},
                ],
            },
        ],
        resources_title="Useful Utah County resources",
        resources_intro="Official links first; directory listings are independent, not endorsements. Verify UDOT motor carrier credentials for in-state moves and FMCSA for interstate legs.",
        resource_items=[
            {"label": "Utah County — official site", "href": "https://www.utahcounty.gov/"},
            {"label": "UDOT traffic", "href": "https://www.udot.utah.gov/connect/"},
        ],
        directory_hint="Prefer Provo–Orem multi-unit and Lehi HOA experience with honest I-15 pricing. Verify UDOT credentials in-state and FMCSA interstate. This is Utah County, not statewide Utah.",
    )
)

# 3. Davis
ut_packs.append(
    dict(
        finalize_fn="finalizeUtPack",
        import_path="@/lib/local-movers/county-intelligence/utah/ut-shared",
        export_name="davisCountyUtIntelligence",
        county_slug="davis",
        hub_title="Davis County Moving Intelligence Hub",
        eyebrow="Davis · north Wasatch between SLC/Ogden & I-15 / Legacy logistics",
        h1="Moving in Davis County: North Wasatch Suburbs, Hill AFB Edges & I-15 / Legacy Logistics",
        hero_opener="Davis County is the north Wasatch Front belt between Salt Lake and Ogden — not Salt Lake downtown elevators and not Weber Ogden core alone: Layton and Clearfield multi-unit, Bountiful and Farmington family corridors, Hill Air Force Base adjacency, I-15 and Legacy Parkway portal time, and suburban density that is not Provo campus or St. George desert defaults. A Bountiful two-story, a Layton multi-family unit, a Farmington HOA, and a Clearfield base-adjacent turn do not share truck access or empty-mile risk. This hub is for Davis County (north Wasatch) — not a renamed Salt Lake or Weber page.",
        hero_cred=UT_HERO,
        corridors="I-15 · US-89 · Legacy Parkway",
        wmd_title="What makes moving in Davis County different",
        wmd_intro="These are Davis north Wasatch realities — suburban multi-unit, base-adjacent calendars, and I-15/Legacy timing — not SLC downtown elevators or Utah County Silicon Slopes defaults.",
        wmd_bullets=[
            {
                "title": "Hill AFB-adjacent calendars reshape demand windows",
                "detail": "Military and contractor housing turns compress flexible dates near Clearfield and Layton corridors.",
            },
            {
                "title": "I-15, US-89, and Legacy Parkway define portal-to-portal time",
                "detail": "North-south pairs look local on maps and regional at peak between SLC and Ogden approaches.",
            },
            {
                "title": "South Davis vs north Davis micro-markets differ",
                "detail": "Bountiful/Centerville stock is not Layton/Clearfield multi-unit or Syracuse growth product.",
            },
            {
                "title": "HOA and multi-family product is not interchangeable",
                "detail": "Farmington and Kaysville gates differ from older multi-unit curb rules.",
            },
            {
                "title": "Not Salt Lake downtown or Weber Ogden core as the default",
                "detail": "Survey each Davis address — north Wasatch suburb density is not SLC elevators or Ogden industrial-edge defaults.",
            },
            UT_REG,
        ],
        zones_heading="Davis access zones",
        zones_intro="Plan by south Davis (Bountiful/Farmington), Layton multi-unit, Clearfield/Hill AFB edges, and Syracuse/west growth.",
        zones=[
            {
                "id": "south-davis",
                "name": "Bountiful, Centerville, Farmington & south Davis",
                "shortName": "South Davis",
                "neighborhoods": ["Bountiful", "Centerville", "Farmington", "North Salt Lake edges"],
                "housingTypes": "SFH, multi-family, HOA pockets",
                "challenges": ["I-15 / US-89 congestion", "HOA rules", "Stairs and basements"],
                "moverTips": "Collect HOA packets. Price south Davis pairs portal-to-portal toward SLC.",
                "cityKeywords": ["bountiful", "centerville", "farmington"],
            },
            {
                "id": "layton",
                "name": "Layton multi-unit & mid-county corridors",
                "shortName": "Layton",
                "neighborhoods": ["Layton", "Kaysville edges", "Fruit Heights edges"],
                "housingTypes": "Multi-family, SFH, mid-rises",
                "challenges": ["I-15 congestion", "Curb parking limits", "Mixed access types"],
                "moverTips": "Confirm parking rules block by block. Survey stair width carefully.",
                "cityKeywords": ["layton", "kaysville"],
            },
            {
                "id": "clearfield-hill",
                "name": "Clearfield, Hill AFB edges & base-adjacent stock",
                "shortName": "Clearfield / Hill",
                "neighborhoods": ["Clearfield", "Hill AFB edges", "Clinton edges", "Sunset edges"],
                "housingTypes": "Multi-family, SFH, military-adjacent stock",
                "challenges": ["Base-calendar spikes", "I-15 congestion", "Tight curb"],
                "moverTips": "Confirm access near base-adjacent corridors. Prefer mid-week mornings away from peak PCS weeks when flexible.",
                "cityKeywords": ["clearfield", "clinton", "hill air force base"],
            },
            {
                "id": "syracuse-west",
                "name": "Syracuse, West Point & west growth edges",
                "shortName": "Syracuse / west",
                "neighborhoods": ["Syracuse", "West Point", "Hooper edges", "West Point edges"],
                "housingTypes": "SFH, multi-family, HOA pockets",
                "challenges": ["HOA gates", "Longer portal time to I-15 core", "Limited arterial options"],
                "moverTips": "Collect HOA packets. Price west growth pairs honestly.",
                "cityKeywords": ["syracuse", "west point"],
            },
        ],
        cost_title="What drives Davis County moving costs",
        cost_intro="Multi-unit access, base-calendar demand, and I-15/Legacy portal time drive quotes more than bedroom count alone.",
        drivers=[
            {"title": "Multi-unit stair & curb friction", "detail": "Labor hours spike on denser corridors."},
            {"title": "I-15 / US-89 / Legacy congestion", "detail": "Portal-to-portal spikes at peak."},
            {"title": "Base-adjacent calendar premiums", "detail": "PCS-style waves compress flexible windows."},
            {"title": "North-south empty miles", "detail": "Bountiful-to-Clearfield pairs punish odometer optimism."},
        ],
        ranges=[
            {"label": "Studio / 1BR (simple access)", "value": "$425–$1,400+", "note": "Higher with multi-unit access"},
            {"label": "2–3BR condo or modest SFH", "value": "$1,250–$3,600+", "note": "Corridor friction trends up"},
            {"label": "3–4+ BR / multi-unit / cross-corridor", "value": "$2,300–$7,000+", "note": "Long pairs and peak calendars highest"},
            {"label": "Typical 2-person crew rate", "value": "$100–$175+/hr", "note": "Portal-to-portal"},
        ],
        seasonal_title="When to schedule a move in Davis County",
        seasonal_intro="Summer family peaks, base-adjacent turns, multi-family lease ends, and winter ice reshape Davis windows.",
        seasonal_items=[
            {"title": "Best windows: mid-week early mornings", "detail": "Clear curb and reduce I-15/Legacy pain."},
            {"title": "Peak family season: late May–mid-August", "detail": "Book suburban Saturdays early."},
            {"title": "Base-adjacent and multi-family turns", "detail": "Clearfield/Layton demand compresses first."},
            {"title": "Winter ice and snow", "detail": "Confirm driveway contingency."},
        ],
        specialized={
            "id": "davis-north-wasatch-i15-legacy",
            "title": "North Wasatch, Hill AFB edges & I-15 / Legacy module",
            "intro": "Davis estimates fail when HOA packets, base calendars, or I-15/Legacy empty miles are ignored.",
            "bullets": [
                "Collect HOA packets for Farmington/Kaysville/Syracuse jobs.",
                "Confirm access near Hill AFB-adjacent corridors early.",
                "Price I-15, US-89, and Legacy Parkway pairs portal-to-portal.",
                "Clarify Davis vs Salt Lake or Weber destinations on multi-county estimates.",
                "Verify UDOT motor carrier credentials for in-state-only jobs and FMCSA for interstate legs.",
            ],
        },
        reloc_title="Considering a move to Davis County?",
        reloc_intro="Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.",
        modules=[
            {
                "id": "schools",
                "title": "Schools & education landscape",
                "bullets": [
                    {"title": "How districts work here", "detail": "Davis School District serves most of the county; confirm zoning carefully by address."},
                    {"title": "Research sources", "detail": "District tools and Utah State Board of Education data beat ranking screenshots."},
                ],
            },
            {
                "id": "hospitals",
                "title": "Hospitals & healthcare access",
                "bullets": [
                    {"title": "Major systems", "detail": "Intermountain Layton, Lakeview, and campuses in neighboring counties serve residents. Confirm networks."},
                    {"title": "What relocators should do", "detail": "Map peak-hour drive times from west growth edges into major campuses. Transfer records early."},
                ],
            },
            {
                "id": "housing",
                "title": "Housing character & cost pressures",
                "bullets": [
                    {"title": "South Davis SFH vs north multi-unit stock", "detail": "Bountiful/Farmington product differs from Clearfield multi-family and Syracuse growth."},
                    {"title": "Cost variation", "detail": "South Davis renovated stock often prices differently from base-adjacent multi-family."},
                ],
            },
            {
                "id": "town-fit",
                "title": "Which areas fit whom",
                "bullets": [
                    {"title": "South Davis lifestyle", "detail": "Family amenities with I-15 portal time to SLC."},
                    {"title": "Layton / Clearfield pattern", "detail": "Multi-unit density with base-adjacent logistics."},
                    {"title": "West growth pattern", "detail": "HOA SFH product with longer portal time to core jobs."},
                ],
            },
            {
                "id": "jobs",
                "title": "Jobs & commute patterns",
                "bullets": [
                    {"title": "Employment anchors", "detail": "Defense/Hill AFB, healthcare, logistics, retail, and reverse commute to SLC/Ogden shape employment."},
                    {"title": "Commute realism", "detail": "I-15 and Legacy peaks are real. Test drive peak routes north and south."},
                ],
            },
            {
                "id": "lifestyle",
                "title": "Lifestyle & practical livability",
                "bullets": [
                    {"title": "Davis identity", "detail": "Davis County is north Wasatch between SLC and Ogden — not Salt Lake downtown elevators or Utah County Silicon Slopes as the default."},
                    {"title": "Climate", "detail": "Hot dry summers and winter ice/snow. Plan outdoor staging contingency."},
                ],
            },
        ],
        resources_title="Useful Davis County resources",
        resources_intro="Official links first; directory listings are independent, not endorsements. Verify UDOT motor carrier credentials for in-state moves and FMCSA for interstate legs.",
        resource_items=[
            {"label": "Davis County — official site", "href": "https://www.daviscountyutah.gov/"},
            {"label": "UDOT traffic", "href": "https://www.udot.utah.gov/connect/"},
        ],
        directory_hint="Prefer multi-unit and base-adjacent access experience with honest I-15/Legacy pricing. Verify UDOT credentials in-state and FMCSA interstate.",
    )
)

# 4. Weber
ut_packs.append(
    dict(
        finalize_fn="finalizeUtPack",
        import_path="@/lib/local-movers/county-intelligence/utah/ut-shared",
        export_name="weberCountyUtIntelligence",
        county_slug="weber",
        hub_title="Weber County Moving Intelligence Hub",
        eyebrow="Weber · Ogden hub, canyon approaches & I-15 / I-84 logistics",
        h1="Moving in Weber County: Ogden Hub, Canyon Approaches & I-15 / I-84 Logistics",
        hero_opener="Weber County is the Ogden Wasatch Front hub — not Salt Lake downtown elevators and not Davis suburban middle alone: Ogden multi-unit and historic stock, Roy and South Ogden family corridors, I-15 and I-84 portal time, and canyon approaches that are not Provo campus or St. George desert defaults. An Ogden walk-up, a Roy two-story, a North Ogden hillside driveway, and a West Haven multi-family unit do not share truck access or empty-mile risk. This hub is for Weber County (Ogden hub) — not a renamed Davis or Salt Lake page.",
        hero_cred=UT_HERO,
        corridors="I-15 · I-84 · US-89",
        wmd_title="What makes moving in Weber County different",
        wmd_intro="These are Weber Ogden-hub realities — multi-unit stairs, canyon grades, and I-15/I-84 timing — not Salt Lake towers or Utah County Silicon Slopes defaults.",
        wmd_bullets=[
            {
                "title": "Ogden multi-unit and historic stairs rewrite labor hours",
                "detail": "Walk-ups, tight curb, and older building access dominate core jobs.",
            },
            {
                "title": "I-15, I-84, and US-89 define portal-to-portal time",
                "detail": "Cross-metro pairs look local on maps and regional at peak into Davis and Box Elder approaches.",
            },
            {
                "title": "Canyon and hillside driveways change staging rules",
                "detail": "North Ogden, South Ogden foothills, and canyon approaches stack steep grades and limited turnaround.",
            },
            {
                "title": "West Weber multi-unit is not foothill SFH",
                "detail": "Roy, West Haven, and plain stock differs sharply from canyon-edge product.",
            },
            {
                "title": "Not Salt Lake downtown or Davis base-suburb product as the default",
                "detail": "Survey each Weber address — Ogden hub density is not SLC elevators or Layton multi-family defaults.",
            },
            UT_REG,
        ],
        zones_heading="Weber access zones",
        zones_intro="Plan by Ogden core multi-unit, Roy/west multi-unit, North Ogden foothills, and South Ogden/Washington Terrace edges.",
        zones=[
            {
                "id": "ogden-core",
                "name": "Ogden core, downtown & historic multi-unit",
                "shortName": "Ogden core",
                "neighborhoods": ["Downtown Ogden", "East Central", "Jefferson edges", "Canyon Road approaches"],
                "housingTypes": "Multi-family, walk-ups, mid-rises, renovated stock",
                "challenges": ["Stairs and tight curb", "Scarce staging", "I-15 / US-89 congestion"],
                "moverTips": "Get building packets early. Prefer mid-week morning windows.",
                "cityKeywords": ["ogden", "downtown ogden"],
            },
            {
                "id": "roy-west",
                "name": "Roy, West Haven & west multi-unit",
                "shortName": "Roy / west",
                "neighborhoods": ["Roy", "West Haven", "Hooper edges", "Marriott-Slaterville edges"],
                "housingTypes": "Multi-family, SFH, mid-rises",
                "challenges": ["I-15 / I-84 congestion", "Curb parking limits", "Mixed access types"],
                "moverTips": "Confirm parking rules block by block. Price west pairs portal-to-portal.",
                "cityKeywords": ["roy", "west haven"],
            },
            {
                "id": "north-ogden-foothills",
                "name": "North Ogden, Pleasant View & foothill driveways",
                "shortName": "North Ogden / foothills",
                "neighborhoods": ["North Ogden", "Pleasant View", "Harrisville edges", "Farr West edges"],
                "housingTypes": "SFH, multi-family, hillside driveways",
                "challenges": ["Steep driveways", "Limited turnaround", "Winter ice"],
                "moverTips": "Photo driveway grade and turnaround. Prefer smaller trucks when approach is tight.",
                "cityKeywords": ["north ogden", "pleasant view", "harrisville"],
            },
            {
                "id": "south-ogden",
                "name": "South Ogden, Washington Terrace & south edges",
                "shortName": "South Ogden",
                "neighborhoods": ["South Ogden", "Washington Terrace", "Riverdale edges", "Uintah edges"],
                "housingTypes": "SFH, multi-family, HOA pockets",
                "challenges": ["I-84 / US-89 links", "HOA rules", "Longer portal time to core"],
                "moverTips": "Collect HOA packets. Price south pairs portal-to-portal.",
                "cityKeywords": ["south ogden", "washington terrace", "riverdale"],
            },
        ],
        cost_title="What drives Weber County moving costs",
        cost_intro="Multi-unit stairs, foothill grades, and I-15/I-84 portal time drive quotes more than bedroom count alone.",
        drivers=[
            {"title": "Ogden multi-unit stair & curb friction", "detail": "Core labor hours spike."},
            {"title": "I-15 / I-84 / US-89 congestion", "detail": "Portal-to-portal spikes at peak."},
            {"title": "Foothill driveway grades & long carries", "detail": "Hillside access raises crew time."},
            {"title": "Cross-corridor empty miles", "detail": "West-to-foothill pairs punish odometer optimism."},
        ],
        ranges=[
            {"label": "Studio / 1BR (simple access)", "value": "$400–$1,400+", "note": "Higher with stairs"},
            {"label": "2–3BR condo or modest SFH", "value": "$1,200–$3,500+", "note": "Core friction trends up"},
            {"label": "3–4+ BR / multi-unit / cross-corridor", "value": "$2,200–$6,900+", "note": "Long pairs and foothill access highest"},
            {"label": "Typical 2-person crew rate", "value": "$100–$170+/hr", "note": "Portal-to-portal"},
        ],
        seasonal_title="When to schedule a move in Weber County",
        seasonal_intro="Summer family peaks, multi-family lease turns, canyon recreation traffic, and winter ice reshape Weber windows.",
        seasonal_items=[
            {"title": "Best windows: mid-week early mornings", "detail": "Clear curb and reduce I-15/I-84 pain."},
            {"title": "Peak family season: late May–mid-August", "detail": "Book suburban Saturdays early."},
            {"title": "Month-end multi-family turns", "detail": "Ogden core fills first."},
            {"title": "Winter ice and foothill snow", "detail": "Confirm driveway contingency."},
        ],
        specialized={
            "id": "weber-ogden-hub-i15-i84",
            "title": "Ogden hub, canyon approaches & I-15 / I-84 module",
            "intro": "Weber estimates fail when multi-unit stairs, foothill driveway grades, or I-15/I-84 empty miles are ignored.",
            "bullets": [
                "Request Ogden multi-unit building packets early.",
                "Photo curb, stair, and driveway grade for core and foothill jobs.",
                "Price I-15, I-84, and US-89 pairs portal-to-portal.",
                "Clarify Weber vs Davis or Box Elder destinations on multi-county estimates.",
                "Verify UDOT motor carrier credentials for in-state-only jobs and FMCSA for interstate legs.",
            ],
        },
        reloc_title="Considering a move to Weber County?",
        reloc_intro="Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.",
        modules=[
            {
                "id": "schools",
                "title": "Schools & education landscape",
                "bullets": [
                    {"title": "How districts work here", "detail": "Ogden, Weber, and other district systems serve different addresses. Confirm zoning carefully."},
                    {"title": "Research sources", "detail": "District tools and Utah State Board of Education data beat ranking screenshots. Weber State University calendars affect housing demand."},
                ],
            },
            {
                "id": "hospitals",
                "title": "Hospitals & healthcare access",
                "bullets": [
                    {"title": "Major systems", "detail": "Intermountain McKay-Dee, Ogden Regional, and other campuses serve county corridors. Confirm networks."},
                    {"title": "What relocators should do", "detail": "Map peak-hour drive times from west and foothill edges into major campuses. Transfer records early."},
                ],
            },
            {
                "id": "housing",
                "title": "Housing character & cost pressures",
                "bullets": [
                    {"title": "Ogden multi-unit vs foothill SFH stock", "detail": "Core product differs sharply from North Ogden hillsides and Roy multi-family."},
                    {"title": "Cost variation", "detail": "Near-core renovated stock often prices differently from west plain multi-family."},
                ],
            },
            {
                "id": "town-fit",
                "title": "Which areas fit whom",
                "bullets": [
                    {"title": "Ogden core lifestyle", "detail": "Urban amenities with multi-unit and curb tradeoffs."},
                    {"title": "Foothill pattern", "detail": "Hillside SFH with driveway logistics."},
                    {"title": "West multi-unit pattern", "detail": "Roy/West Haven density with I-15/I-84 portal time."},
                ],
            },
            {
                "id": "jobs",
                "title": "Jobs & commute patterns",
                "bullets": [
                    {"title": "Employment anchors", "detail": "Healthcare, education, manufacturing, logistics, defense-adjacent, and professional services shape employment."},
                    {"title": "Commute realism", "detail": "I-15 and I-84 peaks are real. Test drive peak routes toward Davis and Box Elder."},
                ],
            },
            {
                "id": "lifestyle",
                "title": "Lifestyle & practical livability",
                "bullets": [
                    {"title": "Weber identity", "detail": "Weber County is Ogden Wasatch hub — not Salt Lake downtown elevators or Utah County Silicon Slopes as the default."},
                    {"title": "Climate", "detail": "Hot dry summers and winter ice/snow, especially foothills. Plan outdoor staging contingency."},
                ],
            },
        ],
        resources_title="Useful Weber County resources",
        resources_intro="Official links first; directory listings are independent, not endorsements. Verify UDOT motor carrier credentials for in-state moves and FMCSA for interstate legs.",
        resource_items=[
            {"label": "Weber County — official site", "href": "https://www.webercountyutah.gov/"},
            {"label": "UDOT traffic", "href": "https://www.udot.utah.gov/connect/"},
        ],
        directory_hint="Prefer Ogden multi-unit and foothill access experience with honest I-15/I-84 pricing. Verify UDOT credentials in-state and FMCSA interstate.",
    )
)

# 5. Washington — CRITICAL St. George, NEVER Seattle
ut_packs.append(
    dict(
        finalize_fn="finalizeUtPack",
        import_path="@/lib/local-movers/county-intelligence/utah/ut-shared",
        export_name="washingtonCountyUtIntelligence",
        county_slug="washington",
        hub_title="Washington County Moving Intelligence Hub",
        eyebrow="Washington · St. George southern UT desert & I-15 / UT-9 logistics",
        h1="Moving in Washington County: St. George Desert Metro, Red Cliffs Access & I-15 Logistics",
        hero_opener="Washington County, Utah is the St. George southern desert metro — not Seattle, not King County, and not Washington State UTC product: St. George multi-unit and HOA growth, Hurricane and Washington City family corridors, Zion approaches via UT-9, I-15 portal time, and red-rock heat logistics that are not Puget Sound hills or Wasatch Front winter defaults. A St. George mid-rise, a SunRiver HOA two-story, a Hurricane ranch, and a Springdale tourism-edge cottage approach do not share truck access or empty-mile risk. This hub is for Washington County, UT (St. George) — never a renamed King County or Seattle page.",
        hero_cred=UT_HERO,
        corridors="I-15 · UT-9 · UT-18",
        wmd_title="What makes moving in Washington County different",
        wmd_intro="These are St. George southern Utah realities — desert heat, HOA growth, and I-15/UT-9 timing — never Seattle hills, King County elevators, or Washington State UTC defaults.",
        wmd_bullets=[
            {
                "title": "Desert heat and sun exposure reshape open carries",
                "detail": "Extreme summer temperatures demand early starts, hydration plans, and contingency for crew safety — not Pacific Northwest rain defaults.",
            },
            {
                "title": "I-15, UT-9, and UT-18 define portal-to-portal time",
                "detail": "St. George to Hurricane or Zion-approach pairs look local on maps and regional at peak and in heat.",
            },
            {
                "title": "HOA growth product is not tourism-edge cottage access",
                "detail": "SunRiver and master-planned gates differ from Springdale/La Verkin tight staging.",
            },
            {
                "title": "Retiree and snowbird calendars compress seasonal windows",
                "detail": "Winter inbound waves and summer heat avoidance reshape demand differently from Wasatch Front lease turns.",
            },
            {
                "title": "Never Seattle / King County / WA UTC product as the default",
                "detail": "Survey each Washington County UT address — St. George desert density is not Puget Sound hills, ferry timing, or Washington UTC household goods permit framing.",
            },
            UT_REG,
        ],
        zones_heading="Washington County UT access zones",
        zones_intro="Plan by St. George core, Washington City/Hurricane growth, Santa Clara/Ivins west edges, and Zion-approach/UT-9 towns.",
        zones=[
            {
                "id": "st-george-core",
                "name": "St. George core, multi-unit & HOA elevators",
                "shortName": "St. George core",
                "neighborhoods": ["Downtown St. George", "Bloomington edges", "SunRiver edges", "Desert Hills edges"],
                "housingTypes": "Multi-family, mid-rises, HOA SFH, renovated stock",
                "challenges": ["Elevators and HOA packets", "Summer heat staging", "I-15 congestion"],
                "moverTips": "Get building and HOA packets early. Prefer very early morning starts in summer heat.",
                "cityKeywords": ["st george", "bloomington", "sunriver"],
            },
            {
                "id": "washington-hurricane",
                "name": "Washington City, Hurricane & east growth",
                "shortName": "Washington / Hurricane",
                "neighborhoods": ["Washington City", "Hurricane", "Toquerville edges", "La Verkin edges"],
                "housingTypes": "SFH, multi-family, HOA pockets",
                "challenges": ["I-15 / UT-9 links", "HOA gates", "Longer portal time to core"],
                "moverTips": "Collect HOA packets. Price east growth pairs portal-to-portal.",
                "cityKeywords": ["washington", "hurricane", "la verkin"],
            },
            {
                "id": "santa-clara-ivins",
                "name": "Santa Clara, Ivins & west desert edges",
                "shortName": "Santa Clara / Ivins",
                "neighborhoods": ["Santa Clara", "Ivins", "Kayenta edges", "Tuacahn approaches"],
                "housingTypes": "SFH, HOA pockets, desert-edge stock",
                "challenges": ["HOA rules", "Limited arterial options", "Heat and long carries"],
                "moverTips": "Confirm HOA access windows. Prefer early starts; photo driveway and curb access.",
                "cityKeywords": ["santa clara", "ivins"],
            },
            {
                "id": "zion-approaches",
                "name": "Springdale, Rockville & UT-9 Zion approaches",
                "shortName": "Zion approaches",
                "neighborhoods": ["Springdale", "Rockville", "Virgin edges", "Hildale edges"],
                "housingTypes": "Tourism-edge SFH, cottages, multi-family",
                "challenges": ["UT-9 tourism peaks", "Narrow staging", "Long empty miles to core"],
                "moverTips": "Avoid peak tourism weekends when flexible. Price UT-9 pairs honestly.",
                "cityKeywords": ["springdale", "rockville", "zion"],
            },
        ],
        cost_title="What drives Washington County moving costs",
        cost_intro="Heat contingency, HOA access, and I-15/UT-9 portal time drive quotes more than bedroom count alone — never Puget Sound hill defaults.",
        drivers=[
            {"title": "Summer heat staging premiums", "detail": "Early starts and crew safety add labor hours."},
            {"title": "I-15 / UT-9 / UT-18 congestion", "detail": "Portal-to-portal spikes at peak."},
            {"title": "HOA gates & multi-unit elevators", "detail": "Growth product raises access time."},
            {"title": "Zion-approach empty miles", "detail": "UT-9 pairs punish odometer optimism."},
        ],
        ranges=[
            {"label": "Studio / 1BR (simple access)", "value": "$400–$1,400+", "note": "Higher with heat and HOA friction"},
            {"label": "2–3BR condo or modest SFH", "value": "$1,200–$3,500+", "note": "Growth-corridor friction trends up"},
            {"label": "3–4+ BR / multi-unit / cross-corridor", "value": "$2,200–$6,900+", "note": "Long pairs and peak heat highest"},
            {"label": "Typical 2-person crew rate", "value": "$100–$170+/hr", "note": "Portal-to-portal"},
        ],
        seasonal_title="When to schedule a move in Washington County",
        seasonal_intro="Extreme summer heat, snowbird winter waves, tourism peaks on UT-9, and mild winter logistics reshape St. George windows — not Seattle rain calendars.",
        seasonal_items=[
            {"title": "Best windows: very early mornings, especially summer", "detail": "Beat heat and clear HOA curb."},
            {"title": "Peak heat caution: June–September", "detail": "Build heat contingency into crew plans."},
            {"title": "Snowbird and winter inbound waves", "detail": "Seasonal housing demand compresses flexible dates."},
            {"title": "UT-9 tourism peaks", "detail": "Zion-approach staging fills on weekends."},
        ],
        specialized={
            "id": "washington-ut-st-george-i15-ut9",
            "title": "St. George desert metro, HOA growth & I-15 / UT-9 module",
            "intro": "Washington County UT estimates fail when heat contingency, HOA packets, or I-15/UT-9 empty miles are ignored — and when Seattle/King County/WA UTC assumptions are applied.",
            "bullets": [
                "Request St. George multi-unit and HOA packets early.",
                "Plan extreme-heat early starts and crew safety for summer jobs.",
                "Price I-15, UT-9, and UT-18 pairs portal-to-portal.",
                "Clarify Washington County UT vs Iron County or Arizona destinations on multi-county estimates.",
                "Verify UDOT motor carrier credentials for in-state-only jobs and FMCSA for interstate legs — never WA UTC framing.",
            ],
        },
        reloc_title="Considering a move to Washington County, UT?",
        reloc_intro="Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit. This is St. George southern Utah — never Seattle or King County, Washington.",
        modules=[
            {
                "id": "schools",
                "title": "Schools & education landscape",
                "bullets": [
                    {"title": "How districts work here", "detail": "Washington County School District serves most addresses; confirm zoning carefully."},
                    {"title": "Research sources", "detail": "District tools and Utah State Board of Education data beat ranking screenshots. Utah Tech University calendars affect housing demand."},
                ],
            },
            {
                "id": "hospitals",
                "title": "Hospitals & healthcare access",
                "bullets": [
                    {"title": "Major systems", "detail": "Intermountain St. George Regional and other campuses serve county corridors. Confirm networks."},
                    {"title": "What relocators should do", "detail": "Map drive times from Hurricane and west edges into major campuses. Transfer records early."},
                ],
            },
            {
                "id": "housing",
                "title": "Housing character & cost pressures",
                "bullets": [
                    {"title": "St. George HOA growth vs tourism-edge stock", "detail": "Master-planned product differs sharply from Springdale cottage approaches."},
                    {"title": "Cost variation", "detail": "Core renovated and HOA stock often prices differently from outlying multi-family."},
                ],
            },
            {
                "id": "town-fit",
                "title": "Which areas fit whom",
                "bullets": [
                    {"title": "St. George core lifestyle", "detail": "Desert metro amenities with HOA and heat tradeoffs."},
                    {"title": "Hurricane / Washington growth pattern", "detail": "Family HOA product with I-15/UT-9 logistics."},
                    {"title": "Zion-approach pattern", "detail": "Tourism-edge living with long portal time to core jobs."},
                ],
            },
            {
                "id": "jobs",
                "title": "Jobs & commute patterns",
                "bullets": [
                    {"title": "Employment anchors", "detail": "Healthcare, tourism, education, construction, logistics, and remote/hybrid work shape employment."},
                    {"title": "Commute realism", "detail": "I-15 peaks and heat are real. Test drive peak routes between St. George and Hurricane."},
                ],
            },
            {
                "id": "lifestyle",
                "title": "Lifestyle & practical livability",
                "bullets": [
                    {"title": "Washington County UT identity", "detail": "Washington County is St. George southern Utah desert metro — never Seattle, King County, or Washington State product."},
                    {"title": "Climate", "detail": "Extreme hot dry summers and mild winters. Plan heat-safe outdoor staging contingency."},
                ],
            },
        ],
        resources_title="Useful Washington County resources",
        resources_intro="Official links first; directory listings are independent, not endorsements. Verify UDOT motor carrier credentials for in-state moves and FMCSA for interstate legs. This is Utah Washington County (St. George), not Washington State.",
        resource_items=[
            {"label": "Washington County, UT — official site", "href": "https://www.washco.utah.gov/"},
            {"label": "UDOT traffic", "href": "https://www.udot.utah.gov/connect/"},
        ],
        directory_hint="Prefer St. George HOA and desert-heat experience with honest I-15/UT-9 pricing. Verify UDOT credentials in-state and FMCSA interstate. Never WA UTC / Seattle framing.",
    )
)

# 6. Cache
ut_packs.append(
    dict(
        finalize_fn="finalizeUtPack",
        import_path="@/lib/local-movers/county-intelligence/utah/ut-shared",
        export_name="cacheCountyUtIntelligence",
        county_slug="cache",
        hub_title="Cache County Moving Intelligence Hub",
        eyebrow="Cache · Logan/USU valley, canyon approaches & US-89/91 logistics",
        h1="Moving in Cache County: Logan–USU Valley, Canyon Approaches & US-89/91 Logistics",
        hero_opener="Cache County is northern Utah's Cache Valley — not Salt Lake metro core and not St. George desert: Logan multi-unit and USU campus waves, North Logan and Hyde Park family corridors, US-89/91 portal time, and valley-floor logistics that are not Wasatch Front I-15 defaults or southern Utah heat product. A Logan walk-up, a USU-adjacent multi-family unit, a Smithfield two-story, and a Wellsville ranch do not share truck access or empty-mile risk. This hub is for Cache County (Logan–USU) — not a renamed Weber or Salt Lake page.",
        hero_cred=UT_HERO,
        corridors="US-89/91 · US-30",
        wmd_title="What makes moving in Cache County different",
        wmd_intro="These are Cache Valley realities — USU multi-unit, valley arterials, and US-89/91 timing — not Salt Lake elevators or St. George desert defaults.",
        wmd_bullets=[
            {
                "title": "USU campus multi-unit waves rewrite calendars",
                "detail": "Student-adjacent housing compresses move-in/out windows and raises month-end demand in Logan.",
            },
            {
                "title": "US-89/91 and US-30 define portal-to-portal time",
                "detail": "Valley pairs look local on maps and regional at peak and in winter canyon weather.",
            },
            {
                "title": "Logan multi-unit is not north-valley SFH",
                "detail": "Campus-edge stock differs sharply from Smithfield, Richmond, and Wellsville product.",
            },
            {
                "title": "Winter valley ice and canyon approaches reshape open carries",
                "detail": "Inversion cold, ice, and limited canyon alternatives shrink staging options.",
            },
            {
                "title": "Not Salt Lake metro core or southern Utah desert product as the default",
                "detail": "Survey each Cache address — valley density is not SLC elevators or St. George HOA growth defaults.",
            },
            UT_REG,
        ],
        zones_heading="Cache access zones",
        zones_intro="Plan by Logan/USU multi-unit, North Logan/Hyde Park, south valley (Hyrum/Wellsville), and north valley (Smithfield/Richmond) edges.",
        zones=[
            {
                "id": "logan-usu",
                "name": "Logan core, USU edges & multi-unit",
                "shortName": "Logan / USU",
                "neighborhoods": ["Downtown Logan", "USU edges", "Island edges", "Canyon Road approaches"],
                "housingTypes": "Multi-family, walk-ups, mid-rises, SFH",
                "challenges": ["Stairs and tight curb", "Campus calendar spikes", "US-89/91 congestion"],
                "moverTips": "Get building packets early. Prefer mid-week mornings away from semester move peaks when flexible.",
                "cityKeywords": ["logan", "usu", "utah state"],
            },
            {
                "id": "north-logan-hyde",
                "name": "North Logan, Hyde Park & mid-valley suburbs",
                "shortName": "North Logan / Hyde Park",
                "neighborhoods": ["North Logan", "Hyde Park", "River Heights edges", "Providence edges"],
                "housingTypes": "SFH, multi-family, HOA pockets",
                "challenges": ["HOA rules", "Arterial congestion", "Basement and stair access"],
                "moverTips": "Collect HOA packets. Survey stair width carefully.",
                "cityKeywords": ["north logan", "hyde park", "providence"],
            },
            {
                "id": "south-valley",
                "name": "Hyrum, Wellsville, Nibley & south valley",
                "shortName": "South valley",
                "neighborhoods": ["Hyrum", "Wellsville", "Nibley", "Millville edges"],
                "housingTypes": "SFH, multi-family, rural-edge stock",
                "challenges": ["US-89/91 links", "Longer portal time to Logan core", "Driveway access"],
                "moverTips": "Price south valley pairs portal-to-portal. Photo driveway access when rural-edge.",
                "cityKeywords": ["hyrum", "wellsville", "nibley"],
            },
            {
                "id": "north-valley",
                "name": "Smithfield, Richmond, Lewiston & north valley",
                "shortName": "North valley",
                "neighborhoods": ["Smithfield", "Richmond", "Lewiston", "Trenton edges"],
                "housingTypes": "SFH, multi-family, rural stock",
                "challenges": ["US-91 congestion", "Remote empty miles", "Winter access"],
                "moverTips": "Confirm winter driveway contingency. Price northern pairs honestly.",
                "cityKeywords": ["smithfield", "richmond", "lewiston"],
            },
        ],
        cost_title="What drives Cache County moving costs",
        cost_intro="Campus multi-unit friction, valley portal time, and winter access drive quotes more than bedroom count alone.",
        drivers=[
            {"title": "USU multi-unit stair & curb friction", "detail": "Core labor hours spike."},
            {"title": "US-89/91 / US-30 congestion", "detail": "Portal-to-portal spikes at peak."},
            {"title": "Campus calendar premiums", "detail": "Move-in waves compress flexible windows."},
            {"title": "North-south valley empty miles", "detail": "Smithfield-to-Hyrum pairs punish odometer optimism."},
        ],
        ranges=[
            {"label": "Studio / 1BR (simple access)", "value": "$400–$1,350+", "note": "Higher with multi-unit stairs"},
            {"label": "2–3BR condo or modest SFH", "value": "$1,150–$3,400+", "note": "Campus friction trends up"},
            {"label": "3–4+ BR / multi-unit / cross-valley", "value": "$2,100–$6,500+", "note": "Long pairs and peak calendars highest"},
            {"label": "Typical 2-person crew rate", "value": "$95–$165+/hr", "note": "Portal-to-portal"},
        ],
        seasonal_title="When to schedule a move in Cache County",
        seasonal_intro="Summer family peaks, USU move waves, and serious winter valley ice reshape Cache windows.",
        seasonal_items=[
            {"title": "Best windows: mid-week early mornings", "detail": "Clear curb and reduce US-89/91 pain."},
            {"title": "Peak family season: late May–mid-August", "detail": "Book suburban Saturdays early."},
            {"title": "University move-in / move-out waves", "detail": "Logan multi-unit fills first."},
            {"title": "Winter ice and snow", "detail": "Confirm driveway contingency — Cache winters are serious."},
        ],
        specialized={
            "id": "cache-logan-usu-us89-91",
            "title": "Logan–USU valley, campus & US-89/91 module",
            "intro": "Cache estimates fail when campus calendars, multi-unit access, or US-89/91 empty miles are ignored.",
            "bullets": [
                "Request Logan/USU multi-unit building packets early.",
                "Photo curb and stair access for campus-edge jobs.",
                "Price US-89/91 and US-30 pairs portal-to-portal.",
                "Clarify Cache vs Box Elder or Idaho destinations on multi-county estimates.",
                "Verify UDOT motor carrier credentials for in-state-only jobs and FMCSA for interstate legs.",
            ],
        },
        reloc_title="Considering a move to Cache County?",
        reloc_intro="Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.",
        modules=[
            {
                "id": "schools",
                "title": "Schools & education landscape",
                "bullets": [
                    {"title": "How districts work here", "detail": "Cache and Logan school systems serve different addresses. Confirm zoning carefully."},
                    {"title": "Research sources", "detail": "District tools and Utah State Board of Education data beat ranking screenshots. USU calendars affect housing demand."},
                ],
            },
            {
                "id": "hospitals",
                "title": "Hospitals & healthcare access",
                "bullets": [
                    {"title": "Major systems", "detail": "Intermountain Cache Valley / Logan Regional and other campuses serve county corridors. Confirm networks."},
                    {"title": "What relocators should do", "detail": "Map peak-hour and weather drive times from north and south valley edges into Logan campuses. Transfer records early."},
                ],
            },
            {
                "id": "housing",
                "title": "Housing character & cost pressures",
                "bullets": [
                    {"title": "Campus multi-unit vs north-valley SFH stock", "detail": "Logan/USU product differs sharply from Smithfield and Wellsville two-stories."},
                    {"title": "Cost variation", "detail": "Near-campus renovated stock often prices differently from rural multi-family."},
                ],
            },
            {
                "id": "town-fit",
                "title": "Which areas fit whom",
                "bullets": [
                    {"title": "Logan / USU lifestyle", "detail": "University amenities with multi-unit and curb tradeoffs."},
                    {"title": "Mid-valley suburban pattern", "detail": "North Logan/Hyde Park SFH with arterial logistics."},
                    {"title": "North/south valley pattern", "detail": "Smaller-town SFH with longer portal time to Logan jobs."},
                ],
            },
            {
                "id": "jobs",
                "title": "Jobs & commute patterns",
                "bullets": [
                    {"title": "Employment anchors", "detail": "Higher education, healthcare, manufacturing, agriculture-related, and logistics shape employment."},
                    {"title": "Commute realism", "detail": "US-89/91 peaks and winter canyon weather are real. Test drive peak routes the length of the valley."},
                ],
            },
            {
                "id": "lifestyle",
                "title": "Lifestyle & practical livability",
                "bullets": [
                    {"title": "Cache identity", "detail": "Cache County is Logan–USU Cache Valley — not Salt Lake metro core or St. George desert product as the default."},
                    {"title": "Climate", "detail": "Hot dry summers and cold, icy winters. Plan outdoor staging contingency."},
                ],
            },
        ],
        resources_title="Useful Cache County resources",
        resources_intro="Official links first; directory listings are independent, not endorsements. Verify UDOT motor carrier credentials for in-state moves and FMCSA for interstate legs.",
        resource_items=[
            {"label": "Cache County — official site", "href": "https://www.cachecounty.gov/"},
            {"label": "UDOT traffic", "href": "https://www.udot.utah.gov/connect/"},
        ],
        directory_hint="Prefer Logan multi-unit and campus-calendar experience with honest US-89/91 pricing. Verify UDOT credentials in-state and FMCSA interstate.",
    )
)

# File name map
CT_FILES = {
    "fairfieldCountyCtIntelligence": "fairfield-ct.ts",
    "hartfordCountyCtIntelligence": "hartford-ct.ts",
    "newHavenCountyCtIntelligence": "new-haven-ct.ts",
    "newLondonCountyCtIntelligence": "new-london-ct.ts",
    "litchfieldCountyCtIntelligence": "litchfield-ct.ts",
    "middlesexCountyCtIntelligence": "middlesex-ct.ts",
}

UT_FILES = {
    "saltLakeCountyUtIntelligence": "salt-lake-ut.ts",
    "utahCountyUtIntelligence": "utah-ut.ts",
    "davisCountyUtIntelligence": "davis-ut.ts",
    "weberCountyUtIntelligence": "weber-ut.ts",
    "washingtonCountyUtIntelligence": "washington-ut.ts",
    "cacheCountyUtIntelligence": "cache-ut.ts",
}


def main():
    written = []
    for pack in ct_packs:
        name = CT_FILES[pack["export_name"]]
        path = CT_DIR / name
        path.write_text(render_pack(**pack), encoding="utf-8")
        written.append(str(path))
        print(f"Wrote {path}")
    for pack in ut_packs:
        name = UT_FILES[pack["export_name"]]
        path = UT_DIR / name
        path.write_text(render_pack(**pack), encoding="utf-8")
        written.append(str(path))
        print(f"Wrote {path}")
    print(f"\nTotal: {len(written)} files")
    for w in written:
        assert Path(w).exists(), w
    print("All 12 exist: OK")


if __name__ == "__main__":
    main()
