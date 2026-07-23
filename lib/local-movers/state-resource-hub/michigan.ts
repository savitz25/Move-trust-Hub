import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 3):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: outbound_dominant
 * - Regulation mode: strong_state_regulator
 */
export const michiganStateResourceHub: StateResourceHubPack = {
  "stateSlug": "michigan",
  "stateCode": "MI",
  "h1": "Michigan Moving Resource Hub: Costs, MSP CVED Authority & 83 County Guides",
  "metaTitle": "Michigan Movers Guide 2026 — Costs, MSP CVED Authority & 83 County Guides",
  "metaDescription": "Plan a move within, to, or from Michigan. Compare local and intrastate costs, verify Michigan State Police CVED household goods authority, browse 83 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Michigan moves in 2026 — typical costs, MSP CVED vs FMCSA rules, Detroit-to-UP regional guides, and tools to compare authorized movers without paid placements.",
  "trustBar": [
    "83 County Guides",
    "Verified Movers",
    "MSP CVED & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Michigan",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Michigan",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Michigan",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Michigan markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Michigan Moving Cost",
    "href": "/moving-calculator"
  },
  "secondaryCta": {
    "label": "Find & Compare Movers",
    "href": "/companies"
  },
  "tertiaryCta": {
    "label": "Explore Regions & Counties",
    "href": "#hub-regions"
  },
  "whyDifferent": {
    "title": "Why moving in Michigan is different",
    "paragraphs": [
      "Michigan is not one moving market. Detroit multi-unit and street staging, Oakland/Washtenaw suburbs, Grand Rapids growth corridors, lake-effect snow belts, northern Lower Peninsula seasonal homes, and Upper Peninsula long hauls produce different access and labor profiles under one state name.",
      "Intrastate household goods carriers need active authority through the Michigan State Police Commercial Vehicle Enforcement Division (MSP CVED). Interstate jobs need FMCSA authority. Winter weather, bridge and ferry logistics to the UP, and college-town lease cycles are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Michigan moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Michigan local and intrastate patterns; they are not bids. Always compare written estimates from CVED-authorized movers for in-state work and FMCSA-authorized carriers for interstate work.",
    "stats": [
      {
        "label": "Typical Detroit studio / 1BR",
        "value": "$550–$2,300+",
        "note": "Stairs, elevators, and street staging"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$1,800–$5,500+",
        "note": "Metro Detroit HOAs common"
      },
      {
        "label": "Intrastate corridor (e.g. Detroit ↔ Grand Rapids)",
        "value": "$2,000–$6,500+",
        "note": "Season and packing drive the spread"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Winter weather forces flexible dates"
      },
      {
        "label": "Top outbound destinations",
        "value": "FL · TX · AZ · OH · IN · IL",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "83",
        "note": "Metro Detroit emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "Michigan moving regulations & consumer protection",
    "intro": "Michigan requires household goods movers operating for hire within the state to hold active MSP CVED authority. Match authority to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Michigan)",
      "body": "If origin or destination is outside Michigan, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. Michigan CVED household goods authority alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Michigan)",
      "body": "For-hire household goods transportation within Michigan generally requires active authority through the Michigan State Police Commercial Vehicle Enforcement Division (CVED). Consumers can search carriers with active authority using the CVED Authority Carrier Search (mspcapsearch) tools."
    },
    "verifySteps": [
      "Classify the job: entirely in Michigan (MSP CVED) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name from the written estimate.",
      "Intrastate: search CVED Authority Carrier Search for active household goods authority.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Get an onsite estimate when possible and insist on written terms.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "MSP CVED authority requirement",
        "detail": "Michigan State Police CVED regulates household goods mover authority and publishes consumer tips for protecting your move, including verifying active authority online."
      },
      {
        "title": "Online authority search",
        "detail": "Active Michigan authority can be checked via the CVED Authority Carrier Search portal before you hire."
      },
      {
        "title": "Onsite estimates",
        "detail": "CVED consumer guidance encourages obtaining onsite estimates so access issues are priced before move day."
      }
    ],
    "officialLinks": [
      {
        "label": "MSP CVED — Key tips for household goods moves",
        "href": "https://www.michigan.gov/msp/divisions/cved/regulatory/key-tips-to-protecting-your-household-goods-move",
        "external": true
      },
      {
        "label": "CVED Authority Carrier Search",
        "href": "https://mspcapsearch.state.mi.us/",
        "external": true
      },
      {
        "label": "MSP CVED — Regulatory & credentialing",
        "href": "https://www.michigan.gov/msp/divisions/cved/regulatory",
        "external": true
      },
      {
        "label": "FMCSA SAFER — USDOT lookup",
        "href": "https://safer.fmcsa.dot.gov/",
        "external": true
      },
      {
        "label": "Move Trust Hub — Verify a USDOT",
        "href": "/verify-dot"
      }
    ],
    "disclaimer": "Licensing rules and lookup tools can change. Always verify current MSP CVED authority or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "metro-detroit",
      "name": "Metro Detroit",
      "shortName": "Metro Detroit",
      "blurb": "Wayne, Oakland, Macomb, Washtenaw, and neighbors with multi-unit access, suburbs, and dense street logistics.",
      "challenges": [
        "Stairs, elevators, and street staging",
        "Suburban HOA windows"
      ],
      "countySlugs": [
        "wayne",
        "oakland",
        "macomb",
        "washtenaw",
        "livingston",
        "st-clair",
        "monroe"
      ],
      "ctaLabel": "Explore Metro Detroit"
    },
    {
      "id": "west-michigan",
      "name": "West Michigan",
      "shortName": "West Michigan",
      "blurb": "Grand Rapids, lakeshore counties, and growth corridors with suburban HOAs and lake-effect weather.",
      "challenges": [
        "Lake-effect snow windows",
        "Growth-suburb HOA calendars"
      ],
      "countySlugs": [
        "kent",
        "ottawa",
        "muskegon",
        "allegan",
        "barry",
        "ionia",
        "newaygo",
        "oceana",
        "montcalm"
      ],
      "ctaLabel": "Explore West Michigan"
    },
    {
      "id": "mid-michigan",
      "name": "Mid-Michigan",
      "shortName": "Mid-Michigan",
      "blurb": "Lansing capital region and central counties with college towns and mixed suburban-rural stock.",
      "challenges": [
        "Campus lease-cycle peaks",
        "Winter weather productivity loss"
      ],
      "countySlugs": [
        "ingham",
        "eaton",
        "clinton",
        "jackson",
        "calhoun",
        "shiawassee",
        "gratiot",
        "isabella",
        "clare",
        "mecosta"
      ],
      "ctaLabel": "Explore Mid-Michigan"
    },
    {
      "id": "thumb-saginaw",
      "name": "Thumb & Saginaw Bay",
      "shortName": "Thumb / Saginaw",
      "blurb": "Flint, Saginaw, Bay City, and Thumb counties with industrial towns and longer rural approaches.",
      "challenges": [
        "Older multi-story stock and stairs",
        "Confirm coverage for rural addresses"
      ],
      "countySlugs": [
        "genesee",
        "lapeer",
        "saginaw",
        "bay",
        "midland",
        "tuscola",
        "huron",
        "sanilac",
        "arenac",
        "gladwin"
      ],
      "ctaLabel": "Explore Thumb / Saginaw"
    },
    {
      "id": "southwest-mi",
      "name": "Southwest Michigan",
      "shortName": "Southwest MI",
      "blurb": "Kalamazoo, Benton Harbor–St. Joseph, and Indiana-border counties with short interstate hops nearby.",
      "challenges": [
        "Cross-border job classification (still interstate if leaving MI)",
        "Lake-effect weather"
      ],
      "countySlugs": [
        "berrien",
        "cass",
        "van-buren",
        "kalamazoo",
        "st-joseph",
        "branch",
        "hillsdale",
        "lenawee"
      ],
      "ctaLabel": "Explore Southwest Michigan"
    },
    {
      "id": "northern-lower",
      "name": "Northern Lower Peninsula",
      "shortName": "Northern Lower",
      "blurb": "Traverse City and northern Lower counties with seasonal homes, tourist peaks, and longer hauls.",
      "challenges": [
        "Seasonal cottage access and driveways",
        "Thinner winter mover density"
      ],
      "countySlugs": [
        "grand-traverse",
        "leelanau",
        "benzie",
        "manistee",
        "wexford",
        "missaukee",
        "roscommon",
        "osceola",
        "lake",
        "kalkaska",
        "antrim",
        "charlevoix",
        "emmet",
        "cheboygan",
        "otsego",
        "crawford",
        "oscoda",
        "alcona",
        "iosco",
        "ogemaw",
        "alpena",
        "montmorency",
        "presque-isle",
        "mason"
      ],
      "ctaLabel": "Explore Northern Lower"
    },
    {
      "id": "upper-peninsula",
      "name": "Upper Peninsula",
      "shortName": "Upper Peninsula",
      "blurb": "Marquette and UP counties with long portal-to-portal distances, bridge logistics, and severe winters.",
      "challenges": [
        "Mackinac Bridge and long regional hauls",
        "Severe winter weather windows"
      ],
      "countySlugs": [
        "marquette",
        "houghton",
        "keweenaw",
        "baraga",
        "ontonagon",
        "gogebic",
        "iron",
        "dickinson",
        "menominee",
        "delta",
        "schoolcraft",
        "alger",
        "luce",
        "mackinac",
        "chippewa"
      ],
      "ctaLabel": "Explore Upper Peninsula"
    }
  ],
  "costs": {
    "title": "Michigan moving costs",
    "intro": "Michigan pricing reflects Metro Detroit labor markets, winter weather, lake-effect delays, and long peninsula hauls. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Michigan moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical Michigan local and intrastate patterns: home size, distance, stairs/elevators, parking, HOAs, winter weather, and regional labor. Actual bids vary. Always compare written estimates from CVED-authorized movers for in-state work and FMCSA-authorized carriers for interstate work."
    },
    "ranges": [
      {
        "label": "Detroit studio / 1BR",
        "value": "$550–$2,300+",
        "note": "Stairs and staging dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,700–$5,000+",
        "note": "HOAs vary by suburb"
      },
      {
        "label": "Intrastate mid-size (e.g. Detroit ↔ Lansing)",
        "value": "$1,800–$5,500+",
        "note": "Season matters"
      },
      {
        "label": "Intrastate long (e.g. Detroit ↔ Marquette)",
        "value": "$2,800–$9,000+",
        "note": "Bridge and weather matter"
      },
      {
        "label": "Typical 2–3 person crew (Metro Detroit)",
        "value": "$125–$230+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Winter weather can erase productivity and force reschedules.",
      "Metro Detroit multi-unit buildings add stair and elevator time.",
      "UP moves include bridge logistics and long empty miles.",
      "College towns create concentrated lease-end demand.",
      "Lake-effect snow belts need flexible dates November–March."
    ]
  },
  "routes": {
    "title": "Popular Michigan moving routes",
    "intro": "Michigan sees strong outbound flows to Sun Belt states and short interstate hops into Ohio, Indiana, and Illinois, plus large Detroit–Grand Rapids internal traffic. Interstate jobs need FMCSA authority; in-state corridors need CVED-authorized movers.",
    "migrationProfile": "outbound_dominant",
    "outbound": [
      {
        "label": "Michigan → Florida",
        "href": "/moving-to/florida",
        "origins": "Metro Detroit, West Michigan",
        "transit": "Multi-day; snowbird seasonality",
        "planningNote": "Book early for fall/winter FL arrivals.",
        "note": "High-volume Midwest-to-Florida corridor."
      },
      {
        "label": "Michigan → Texas / Arizona",
        "href": "/local-movers/texas",
        "origins": "Metro Detroit, Grand Rapids",
        "transit": "Multi-day interstate",
        "planningNote": "Confirm FMCSA authority end-to-end.",
        "note": "Popular job and lifestyle outbound destinations."
      },
      {
        "label": "Michigan → Ohio / Indiana / Illinois",
        "href": "/local-movers/ohio",
        "origins": "Southeast and Southwest MI",
        "transit": "Often same-day or next-day interstate",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Short cross-border metro moves are common."
      }
    ],
    "inbound": [
      {
        "label": "Moving to Wayne County (Detroit)",
        "href": "/local-movers/michigan/wayne",
        "note": "Street logistics and multi-unit access dominate."
      },
      {
        "label": "Moving to Oakland County",
        "href": "/local-movers/michigan/oakland",
        "note": "Suburban HOAs and larger home inventories."
      },
      {
        "label": "Moving to Kent County (Grand Rapids)",
        "href": "/local-movers/michigan/kent",
        "note": "West Michigan growth corridors."
      }
    ]
  },
  "challenges": {
    "title": "Michigan-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Michigan moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Winter weather windows",
        "detail": "Snow and ice can shut down driveway access and slow crews. Build weather buffers November–March, especially in snow belts and the UP."
      },
      {
        "title": "Metro Detroit multi-unit logistics",
        "detail": "Older buildings mean stairs, limited elevators, and street permits. Share photos of approaches with estimators."
      },
      {
        "title": "Upper Peninsula distance",
        "detail": "Detroit- or GR-based crews face long empty miles and Mackinac Bridge timing. Confirm coverage and overnight plans early."
      },
      {
        "title": "College lease peaks",
        "detail": "Ann Arbor, East Lansing, and other campus markets compress demand around August move-in. Book early."
      },
      {
        "title": "Authority verification",
        "detail": "Confirm active MSP CVED household goods authority on the carrier search before deposits for in-state work."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Michigan moves."
    },
    {
      "label": "Verify a USDOT",
      "href": "/verify-dot",
      "description": "Look up interstate authority before you pay a deposit on a cross-state move."
    },
    {
      "label": "Interstate mover directory",
      "href": "/companies",
      "description": "Search licensed carriers nationwide — same tools used across Move Trust Hub."
    },
    {
      "label": "How we score movers",
      "href": "/about/how-we-score-movers",
      "description": "Independent methodology — no lead fees, no paid placement for rankings."
    },
    {
      "label": "Moving timeline checklist",
      "href": "/resources/checklist",
      "description": "Interstate-ready planning checklist you can adapt for Michigan local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do Michigan movers need state authority?",
      "answer": "Yes. For-hire household goods movers operating within Michigan generally need active MSP CVED authority. Interstate moves require FMCSA authority."
    },
    {
      "question": "How do I verify a Michigan mover?",
      "answer": "Use the CVED Authority Carrier Search (mspcapsearch.state.mi.us) and match the legal name on your estimate. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER."
    },
    {
      "question": "How much does a local Detroit-area move cost?",
      "answer": "Planning ranges often fall around $550–$2,300+ for a studio/1BR and more for larger homes, driven by stairs, elevators, and season. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is a Detroit-to-Grand Rapids move intrastate?",
      "answer": "Yes — both ends are in Michigan, so you generally need a CVED-authorized household goods mover."
    },
    {
      "question": "When is peak moving season in Michigan?",
      "answer": "Statewide peak is typically May–September. Winter weather can force flexible dates even outside peak."
    },
    {
      "question": "Do short moves into Ohio or Indiana still need FMCSA authority?",
      "answer": "Yes. Crossing state lines generally requires active FMCSA operating authority even for short metro hops."
    }
  ],
  "trust": {
    "byline": "Move Trust Hub editorial research",
    "lastReviewed": "2026-07-23",
    "methodology": "County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "MSP CVED — Key tips for HHG moves",
        "href": "https://www.michigan.gov/msp/divisions/cved/regulatory/key-tips-to-protecting-your-household-goods-move"
      },
      {
        "label": "CVED Authority Carrier Search",
        "href": "https://mspcapsearch.state.mi.us/"
      },
      {
        "label": "FMCSA SAFER",
        "href": "https://safer.fmcsa.dot.gov/"
      },
      {
        "label": "How we score movers",
        "href": "/about/how-we-score-movers"
      }
    ]
  },
  "stickyNav": [
    {
      "id": "hub-intent",
      "label": "Start"
    },
    {
      "id": "hub-why-different",
      "label": "Why here"
    },
    {
      "id": "hub-snapshot",
      "label": "Snapshot"
    },
    {
      "id": "hub-regulations",
      "label": "Regulations"
    },
    {
      "id": "hub-regions",
      "label": "Regions"
    },
    {
      "id": "hub-map",
      "label": "Map"
    },
    {
      "id": "hub-costs",
      "label": "Costs"
    },
    {
      "id": "hub-routes",
      "label": "Routes"
    },
    {
      "id": "hub-challenges",
      "label": "Tips"
    },
    {
      "id": "hub-counties",
      "label": "Counties"
    },
    {
      "id": "hub-tools",
      "label": "Tools"
    },
    {
      "id": "hub-faq",
      "label": "FAQ"
    }
  ]
};
