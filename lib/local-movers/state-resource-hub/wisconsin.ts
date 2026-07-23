import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 5):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: outbound_dominant
 * - Regulation mode: limited_or_none
 */
export const wisconsinStateResourceHub: StateResourceHubPack = {
  "stateSlug": "wisconsin",
  "stateCode": "WI",
  "h1": "Wisconsin Moving Resource Hub: Costs, FMCSA Checks & 72 County Guides",
  "metaTitle": "Wisconsin Movers Guide 2026 — Costs, Interstate Authority & 72 County Guides",
  "metaDescription": "Plan a move within, to, or from Wisconsin. Compare local and intrastate costs, understand Wisconsin’s limited state HHG framework versus FMCSA interstate rules, browse 72 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Wisconsin moves in 2026 — typical costs, FMCSA-first verification for interstate work, Milwaukee-to-Northwoods regional guides, and tools to compare movers without paid placements.",
  "trustBar": [
    "72 County Guides",
    "Verified Movers",
    "FMCSA-Focused Checks",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Wisconsin",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Wisconsin",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Wisconsin",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Wisconsin markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Wisconsin Moving Cost",
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
    "title": "Why moving in Wisconsin is different",
    "paragraphs": [
      "Wisconsin is not one moving market. Milwaukee multi-unit and lake-effect snow, Madison campus peaks, Fox Valley industrial corridors, Door County seasonal logistics, and Northwoods cabin access produce different access and labor profiles under one state name.",
      "Unlike many states, Wisconsin does not operate a dedicated household-goods permit regime comparable to Minnesota MnDOT or Illinois ICC. Interstate jobs still need FMCSA authority. For in-state work, consumers should still insist on insurance, written estimates, and clear legal names — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Wisconsin moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Wisconsin local and intrastate patterns; they are not bids. Always compare written estimates and confirm FMCSA authority for any out-of-state leg.",
    "stats": [
      {
        "label": "Typical Milwaukee studio / 1BR",
        "value": "$500–$2,300+",
        "note": "Stairs, elevators, and winter staging"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$1,700–$5,000+",
        "note": "SE WI HOAs common"
      },
      {
        "label": "Intrastate corridor (e.g. Milwaukee ↔ Madison)",
        "value": "$1,800–$5,500+",
        "note": "Season and packing drive the spread"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Winter weather forces flexible dates"
      },
      {
        "label": "Top outbound destinations",
        "value": "FL · AZ · IL · MN · TX · CO",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "72",
        "note": "SE Wisconsin emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "limited_or_none",
    "title": "Wisconsin moving regulations & consumer protection",
    "intro": "Wisconsin does not maintain a California-style dedicated household goods state permit directory for most local movers. Consumer protection still depends on insurance, contracts, and — for any out-of-state leg — FMCSA authority. Verify credentials carefully before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Wisconsin)",
      "body": "If origin or destination is outside Wisconsin, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. Do not treat a Wisconsin business registration alone as interstate authority."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Wisconsin)",
      "body": "Wisconsin generally lacks a strong state household-goods certificate program comparable to neighboring Minnesota or Illinois. That does not mean “anything goes”: insist on written estimates, cargo and liability insurance certificates, a clear legal business name, and references. Local municipal rules (parking, street permits) still apply."
    },
    "verifySteps": [
      "Classify the job: entirely in Wisconsin vs any out-of-state leg (FMCSA / USDOT required).",
      "Copy the exact legal name from the written estimate.",
      "Interstate or cross-border: look up USDOT / MC on FMCSA SAFER before deposits.",
      "Intrastate: request certificates of insurance, written inventory estimates, and business registration details.",
      "Confirm parking and street-permit needs with your city or HOA.",
      "Avoid large cash deposits to unverified operators; document all agreements in writing."
    ],
    "protections": [
      {
        "title": "FMCSA for interstate moves",
        "detail": "Any move that crosses a state line is generally under federal household goods rules — verify active FMCSA authority and USDOT numbers on SAFER."
      },
      {
        "title": "Written estimates and insurance",
        "detail": "Without a strong state HHG permit regime, written estimates and proof of cargo/liability insurance become your primary consumer controls on local jobs."
      },
      {
        "title": "Municipal access rules",
        "detail": "Cities and HOAs may still require parking permits, elevator certificates, and loading-window compliance even when state HHG licensing is limited."
      }
    ],
    "officialLinks": [
      {
        "label": "FMCSA SAFER — USDOT lookup",
        "href": "https://safer.fmcsa.dot.gov/",
        "external": true
      },
      {
        "label": "FMCSA — Protect Your Move",
        "href": "https://www.fmcsa.dot.gov/protect-your-move",
        "external": true
      },
      {
        "label": "Move Trust Hub — Verify a USDOT",
        "href": "/verify-dot"
      },
      {
        "label": "Move Trust Hub — How we score movers",
        "href": "/about/how-we-score-movers"
      }
    ],
    "disclaimer": "Regulatory frameworks can change. Always verify current FMCSA authority for interstate work and obtain insurance and written contracts for local work. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "milwaukee-southeast",
      "name": "Milwaukee & Southeast Wisconsin",
      "shortName": "SE Wisconsin",
      "blurb": "Milwaukee, Waukesha, Racine, Kenosha, and neighbors with multi-unit stock, suburbs, and lake-effect weather.",
      "challenges": [
        "Stairs, elevators, and winter staging",
        "Lake-effect snow windows"
      ],
      "countySlugs": [
        "milwaukee",
        "waukesha",
        "ozaukee",
        "washington",
        "racine",
        "kenosha",
        "walworth",
        "jefferson",
        "dodge"
      ],
      "ctaLabel": "Explore SE Wisconsin"
    },
    {
      "id": "madison-south-central",
      "name": "Madison & South Central",
      "shortName": "Madison / South Central",
      "blurb": "Dane County campus peaks, Rock County industrial towns, and south-central agricultural corridors.",
      "challenges": [
        "Campus lease-cycle peaks",
        "Mix of multi-unit and rural access"
      ],
      "countySlugs": [
        "dane",
        "rock",
        "green",
        "iowa",
        "lafayette",
        "grant",
        "sauk",
        "columbia",
        "juneau",
        "adams",
        "marquette",
        "richland",
        "crawford",
        "vernon"
      ],
      "ctaLabel": "Explore Madison / South Central"
    },
    {
      "id": "fox-valley-northeast",
      "name": "Fox Valley & Northeast",
      "shortName": "Fox Valley / NE",
      "blurb": "Green Bay, Appleton, Oshkosh, and Door County approaches with industrial and seasonal tourism mix.",
      "challenges": [
        "Door County seasonal congestion",
        "Industrial-shift timing in Fox cities"
      ],
      "countySlugs": [
        "brown",
        "outagamie",
        "winnebago",
        "calumet",
        "fond-du-lac",
        "sheboygan",
        "manitowoc",
        "kewaunee",
        "door",
        "oconto",
        "marinette",
        "shawano",
        "waupaca",
        "waushara",
        "green-lake"
      ],
      "ctaLabel": "Explore Fox Valley / Northeast"
    },
    {
      "id": "northwoods",
      "name": "Northwoods & Western Wisconsin",
      "shortName": "Northwoods / West",
      "blurb": "Wausau, Eau Claire, La Crosse, and Northwoods counties with cabin access, hills, and long hauls.",
      "challenges": [
        "Seasonal cabin roads and driveways",
        "Confirm mover coverage for remote addresses"
      ],
      "countySlugs": [
        "marathon",
        "wood",
        "portage",
        "lincoln",
        "langlade",
        "oneida",
        "vilas",
        "forest",
        "florence",
        "iron",
        "price",
        "taylor",
        "clark",
        "rusk",
        "sawyer",
        "washburn",
        "burnett",
        "polk",
        "barron",
        "chippewa",
        "eau-claire",
        "dunn",
        "pierce",
        "st-croix",
        "pepin",
        "buffalo",
        "trempealeau",
        "jackson",
        "monroe",
        "la-crosse",
        "ashland",
        "bayfield",
        "douglas",
        "menominee"
      ],
      "ctaLabel": "Explore Northwoods / West"
    }
  ],
  "costs": {
    "title": "Wisconsin moving costs",
    "intro": "Wisconsin pricing reflects Milwaukee and Madison labor markets, winter weather, multi-unit access, and long Northwoods hauls. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Wisconsin moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical Wisconsin local and intrastate patterns: home size, distance, stairs/elevators, parking, HOAs, winter weather, and regional labor. Actual bids vary. Always compare written estimates and confirm FMCSA authority for any out-of-state leg."
    },
    "ranges": [
      {
        "label": "Milwaukee studio / 1BR",
        "value": "$500–$2,300+",
        "note": "Stairs and winter access dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,600–$4,800+",
        "note": "SE WI HOAs common"
      },
      {
        "label": "Intrastate mid-size (e.g. Milwaukee ↔ Madison)",
        "value": "$1,700–$5,000+",
        "note": "Season matters"
      },
      {
        "label": "Intrastate long (e.g. Milwaukee ↔ Superior or Door County)",
        "value": "$2,200–$7,000+",
        "note": "Distance and seasonality push the top"
      },
      {
        "label": "Typical 2–3 person crew (SE Wisconsin)",
        "value": "$120–$220+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Lake-effect snow belts can shut down access with little notice.",
      "Milwaukee multi-unit buildings add stair and elevator time.",
      "Madison campus calendars compress August demand.",
      "Northwoods cabin roads may need smaller trucks or shuttles.",
      "Short hops into IL or MN are interstate even when nearby."
    ]
  },
  "routes": {
    "title": "Popular Wisconsin moving routes",
    "intro": "Wisconsin sees strong outbound Sun Belt flows and constant short interstate hops into Illinois, Minnesota, Michigan, and Iowa, plus large Milwaukee–Madison internal traffic. Interstate jobs need FMCSA authority; local jobs need careful insurance and contract verification.",
    "migrationProfile": "outbound_dominant",
    "outbound": [
      {
        "label": "Wisconsin → Florida",
        "href": "/moving-to/florida",
        "origins": "Milwaukee, Madison, Fox Valley",
        "transit": "Multi-day; snowbird seasonality",
        "planningNote": "Book early for fall/winter FL arrivals.",
        "note": "High-volume Upper Midwest-to-Florida corridor."
      },
      {
        "label": "Wisconsin → Arizona / Texas",
        "href": "/local-movers/arizona",
        "origins": "SE Wisconsin, Madison",
        "transit": "Multi-day interstate",
        "planningNote": "Confirm FMCSA authority end-to-end.",
        "note": "Popular lifestyle outbound destinations."
      },
      {
        "label": "Wisconsin → Illinois / Minnesota",
        "href": "/local-movers/illinois",
        "origins": "Kenosha, Milwaukee, western WI",
        "transit": "Often same-day interstate",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Short cross-border metro moves are common."
      }
    ],
    "inbound": [
      {
        "label": "Moving to Milwaukee County",
        "href": "/local-movers/wisconsin/milwaukee",
        "note": "Multi-unit access and lake-effect weather."
      },
      {
        "label": "Moving to Dane County (Madison)",
        "href": "/local-movers/wisconsin/dane",
        "note": "Campus peaks and mixed suburban stock."
      },
      {
        "label": "Moving to Waukesha County",
        "href": "/local-movers/wisconsin/waukesha",
        "note": "West-metro suburbs and HOA communities."
      }
    ]
  },
  "challenges": {
    "title": "Wisconsin-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Wisconsin moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Lake-effect and deep winter",
        "detail": "Snow belts along Lake Michigan and inland freezes can cancel move days. Build buffers November–March."
      },
      {
        "title": "Limited state HHG permit regime",
        "detail": "Without a strong state permit lookup, demand insurance certificates, written estimates, and FMCSA checks for any border hop."
      },
      {
        "title": "Madison campus peaks",
        "detail": "Late August student turnovers compress crews. Book earlier than a typical civilian calendar."
      },
      {
        "title": "Northwoods cabin access",
        "detail": "Seasonal roads and long driveways may need shuttle trucks. Share GPS pins and photos early."
      },
      {
        "title": "Short interstate hops",
        "detail": "Moves into Illinois, Minnesota, or Michigan are interstate even if short. Confirm FMCSA authority before deposits."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Wisconsin moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Wisconsin local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do Wisconsin movers need a special state household goods license?",
      "answer": "Wisconsin generally does not operate a dedicated household goods permit program comparable to Minnesota or Illinois. Consumers should still verify insurance, written contracts, and FMCSA authority for any out-of-state leg."
    },
    {
      "question": "How do I verify a Wisconsin mover for an interstate move?",
      "answer": "Look up USDOT / MC authority on FMCSA SAFER for the legal name on your estimate. Also request certificates of insurance and written inventory estimates."
    },
    {
      "question": "How much does a local Milwaukee move cost?",
      "answer": "Planning ranges often fall around $500–$2,300+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is a Milwaukee-to-Madison move interstate?",
      "answer": "No — both ends are in Wisconsin. Focus on insurance, written estimates, and access logistics rather than FMCSA authority for pure in-state jobs."
    },
    {
      "question": "When is peak moving season in Wisconsin?",
      "answer": "Statewide peak is typically May–September. Winter weather can force flexible dates even outside peak."
    },
    {
      "question": "Does a Kenosha-to-Chicago move need FMCSA authority?",
      "answer": "Yes. Crossing into Illinois is interstate even for short hops. Confirm active FMCSA operating authority and a USDOT number."
    }
  ],
  "trust": {
    "byline": "Move Trust Hub editorial research",
    "lastReviewed": "2026-07-23",
    "methodology": "County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "FMCSA SAFER",
        "href": "https://safer.fmcsa.dot.gov/"
      },
      {
        "label": "FMCSA — Protect Your Move",
        "href": "https://www.fmcsa.dot.gov/protect-your-move"
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
