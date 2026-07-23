import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 2):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: outbound_dominant
 * - Regulation mode: strong_state_regulator
 */
export const ohioStateResourceHub: StateResourceHubPack = {
  "stateSlug": "ohio",
  "stateCode": "OH",
  "h1": "Ohio Moving Resource Hub: Costs, PUCO Registration & 88 County Guides",
  "metaTitle": "Ohio Movers Guide 2026 — Costs, PUCO Licensing & 88 County Guides",
  "metaDescription": "Plan a move within, to, or from Ohio. Compare local and intrastate costs, verify PUCO household goods registration, browse 88 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Ohio moves in 2026 — typical costs, PUCO vs FMCSA rules, Cleveland-to-Cincinnati regional guides, and tools to compare registered movers without paid placements.",
  "trustBar": [
    "88 County Guides",
    "Verified Movers",
    "PUCO & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Ohio",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Ohio",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Ohio",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Ohio markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Ohio Moving Cost",
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
    "title": "Why moving in Ohio is different",
    "paragraphs": [
      "Ohio is not one moving market. Cleveland lake-effect weather, Columbus growth corridors, Cincinnati river metro patterns, Dayton logistics, and Appalachian southeastern counties produce different access and labor profiles under one state name.",
      "Intrastate household goods movers must register with the Public Utilities Commission of Ohio (PUCO). Interstate jobs need FMCSA authority. Winter weather, older multi-story homes, and HOA suburbs are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Ohio moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Ohio local and intrastate patterns; they are not bids. Always compare written estimates from PUCO-registered movers for in-state work and FMCSA-authorized carriers for interstate work.",
    "stats": [
      {
        "label": "Typical local move (studio–2BR)",
        "value": "$450–$1,900+",
        "note": "Stairs and winter access push higher"
      },
      {
        "label": "Typical local move (3–4+ BR)",
        "value": "$1,500–$4,800+",
        "note": "Suburban long carries common"
      },
      {
        "label": "Intrastate corridor (e.g. Cleveland ↔ Columbus)",
        "value": "$1,800–$5,800+",
        "note": "Season and packing drive the spread"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Winter weather can force flexible dates"
      },
      {
        "label": "Top outbound destinations",
        "value": "FL · TX · NC · SC · IN · KY",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "88",
        "note": "Major metros emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "Ohio moving regulations & consumer protection",
    "intro": "Ohio requires household goods movers operating within the state to register with the Public Utilities Commission of Ohio (PUCO) and follow PUCO rules. Match registration to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Ohio)",
      "body": "If origin or destination is outside Ohio, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. PUCO household goods registration alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Ohio)",
      "body": "For-hire household goods movers conducting point-to-point moves within Ohio must obtain required PUCO registration / certificate authority for household goods operations. Consumers can verify registered movers using PUCO household goods lists and resources. Certificate numbers should appear in advertisements."
    },
    "verifySteps": [
      "Classify the job: entirely in Ohio (PUCO) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name and PUCO certificate number from ads/estimate.",
      "Intrastate: check the PUCO household goods movers list / resources for registration.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Get written estimates on request and keep contracts and inventories.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "PUCO registration requirement",
        "detail": "PUCO requires household goods movers to be registered and to follow PUCO rules. Display of certificate numbers in advertising helps consumers identify legitimate operators."
      },
      {
        "title": "Written estimates",
        "detail": "Insist on written estimates and clarity on stairs, long carries, packing, and storage before signing."
      },
      {
        "title": "Know your rights resources",
        "detail": "PUCO publishes consumer guidance for hiring moving companies — review rights materials before load day."
      }
    ],
    "officialLinks": [
      {
        "label": "PUCO — Movers",
        "href": "https://puco.ohio.gov/transportation/movers",
        "external": true
      },
      {
        "label": "PUCO — Household goods carriers list",
        "href": "https://puco.ohio.gov/transportation/movers/resources/hhg-list",
        "external": true
      },
      {
        "label": "PUCO — Know your rights when hiring a mover",
        "href": "https://puco.ohio.gov/transportation/movers/resources/know-your-rights-when-hiring-a-moving-company",
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
    "disclaimer": "Licensing rules and directories can change. Always verify current PUCO registration or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "cleveland-ne",
      "name": "Cleveland & Northeast Ohio",
      "shortName": "NE Ohio",
      "blurb": "Lake-effect weather, older multi-story homes, and industrial-edge logistics across Cuyahoga and neighboring counties.",
      "challenges": [
        "Lake-effect snow planning",
        "Older multi-story access"
      ],
      "countySlugs": [
        "cuyahoga",
        "lake",
        "lorain",
        "medina",
        "geauga",
        "ashtabula",
        "summit",
        "portage",
        "trumbull",
        "mahoning",
        "columbiana"
      ],
      "ctaLabel": "Explore Northeast Ohio"
    },
    {
      "id": "columbus-central",
      "name": "Columbus & Central Ohio",
      "shortName": "Central Ohio",
      "blurb": "State capital growth corridors, university calendars, and fast-growing suburban HOAs around Franklin County.",
      "challenges": [
        "University and government calendars",
        "HOA windows in growth suburbs"
      ],
      "countySlugs": [
        "franklin",
        "delaware",
        "licking",
        "fairfield",
        "pickaway",
        "madison",
        "union",
        "morrow",
        "knox",
        "hocking",
        "perry",
        "muskingum"
      ],
      "ctaLabel": "Explore Central Ohio"
    },
    {
      "id": "cincinnati-sw",
      "name": "Cincinnati & Southwest Ohio",
      "shortName": "SW Ohio",
      "blurb": "River metro patterns, hills, and cross-state proximity to Kentucky with mixed urban and suburban stock.",
      "challenges": [
        "Hills and older multi-story homes",
        "Cross-river traffic patterns"
      ],
      "countySlugs": [
        "hamilton",
        "clermont",
        "butler",
        "warren",
        "brown",
        "adams",
        "highland",
        "clinton"
      ],
      "ctaLabel": "Explore Southwest Ohio"
    },
    {
      "id": "dayton-west",
      "name": "Dayton & West Ohio",
      "shortName": "West Ohio",
      "blurb": "Dayton logistics corridors and western agricultural counties with mixed small-metro and rural lots.",
      "challenges": [
        "Heat and winter extremes",
        "Longer regional hauls"
      ],
      "countySlugs": [
        "montgomery",
        "greene",
        "clark",
        "miami",
        "darke",
        "preble",
        "shelby",
        "champaign",
        "logan",
        "auglaize",
        "mercer",
        "van-wert",
        "allen",
        "hardin"
      ],
      "ctaLabel": "Explore West Ohio"
    },
    {
      "id": "toledo-nw",
      "name": "Toledo & Northwest Ohio",
      "shortName": "NW Ohio",
      "blurb": "Toledo metro and northwestern counties with lake-adjacent weather and industrial logistics.",
      "challenges": [
        "Winter weather windows",
        "Confirm coverage outside the metro"
      ],
      "countySlugs": [
        "lucas",
        "wood",
        "ottawa",
        "sandusky",
        "erie",
        "huron",
        "seneca",
        "hancock",
        "putnam",
        "henry",
        "fulton",
        "williams",
        "defiance",
        "paulding",
        "wyandot",
        "crawford"
      ],
      "ctaLabel": "Explore Northwest Ohio"
    },
    {
      "id": "appalachia-se",
      "name": "Southeast & Appalachian Ohio",
      "shortName": "SE / Appalachia",
      "blurb": "Hillier terrain, smaller metros, and rural driveways across southeastern counties including Stark and Appalachian communities.",
      "challenges": [
        "Hill and rural driveway access",
        "Thinner local crew coverage"
      ],
      "countySlugs": [
        "athens",
        "meigs",
        "gallia",
        "lawrence",
        "scioto",
        "pike",
        "jackson",
        "ross",
        "vinton",
        "morgan",
        "washington",
        "noble",
        "monroe",
        "belmont",
        "jefferson",
        "harrison",
        "carroll",
        "tuscarawas",
        "guernsey",
        "coshocton",
        "holmes",
        "wayne",
        "ashland",
        "richland",
        "stark"
      ],
      "ctaLabel": "Explore Southeast Ohio"
    },
    {
      "id": "rest-ohio",
      "name": "Other Ohio Counties",
      "shortName": "Rest of OH",
      "blurb": "Remaining counties outside the primary regional groupings.",
      "challenges": [
        "Confirm mover coverage for remote addresses",
        "Longer crew travel times"
      ],
      "countySlugs": [
        "fayette",
        "marion"
      ],
      "ctaLabel": "Explore remaining counties"
    }
  ],
  "costs": {
    "title": "Ohio moving costs",
    "intro": "Ohio pricing reflects multi-metro labor markets, older housing stock, winter productivity, and suburban HOAs. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Ohio moving costs",
      "lastReviewed": "2026-07-22",
      "body": "These ranges are planning estimates, not quotes. They combine typical Ohio local and intrastate patterns: home size, distance, stairs, HOAs, seasonality, and regional labor. Actual bids vary. Always compare written estimates from PUCO-registered movers for in-state work and FMCSA-authorized carriers for interstate work."
    },
    "ranges": [
      {
        "label": "Local studio / 1BR",
        "value": "$450–$1,600+",
        "note": "Stairs push higher in older stock"
      },
      {
        "label": "Local 2–3BR house",
        "value": "$1,400–$4,200+",
        "note": "Suburban long carries common"
      },
      {
        "label": "Intrastate mid-size (e.g. Columbus ↔ Dayton)",
        "value": "$1,500–$4,800+",
        "note": "Season matters"
      },
      {
        "label": "Intrastate long (e.g. Cleveland ↔ Cincinnati)",
        "value": "$2,000–$6,500+",
        "note": "Full packing pushes the top"
      },
      {
        "label": "Typical 2-person crew (major metros)",
        "value": "$115–$195+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Older multi-story homes add stair labor in many metros.",
      "Winter weather can slow northern Ohio jobs.",
      "HOA windows appear in growth suburbs around Columbus and elsewhere.",
      "Long I-71 / I-75 / I-70 hauls affect portal-to-portal pricing.",
      "Peak May–September and month-end leases fill crews early."
    ]
  },
  "routes": {
    "title": "Popular Ohio moving routes",
    "intro": "Ohio is a Midwest crossroads with strong outbound Sun Belt lanes and large multi-metro internal flows. Interstate jobs need FMCSA authority; in-state corridors need PUCO-registered household goods movers.",
    "migrationProfile": "outbound_dominant",
    "outbound": [
      {
        "label": "Ohio → Florida",
        "href": "/moving-to/florida",
        "origins": "Cleveland, Columbus, Cincinnati",
        "transit": "Multi-day; snowbird seasonality",
        "planningNote": "Book early for fall/winter FL arrivals.",
        "note": "High-volume Midwest-to-Florida corridor."
      },
      {
        "label": "Ohio → Carolinas / South",
        "href": "/moving-to/north-carolina",
        "origins": "Columbus, Cincinnati, Cleveland",
        "transit": "I-75 / I-77 corridors",
        "planningNote": "HOAs at destination common.",
        "note": "Popular lifestyle outbound destinations."
      },
      {
        "label": "Ohio → Indiana / Kentucky",
        "href": "/moving-to/indiana",
        "origins": "Cincinnati, Dayton, Toledo",
        "transit": "Often same-day or next-day interstate",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Short cross-border metro moves are common."
      }
    ],
    "inbound": [
      {
        "label": "Moving to Franklin County (Columbus)",
        "href": "/local-movers/ohio/franklin",
        "note": "Growth suburbs and university calendars."
      },
      {
        "label": "Moving to Cuyahoga County (Cleveland)",
        "href": "/local-movers/ohio/cuyahoga",
        "note": "Older stock and lake-effect weather."
      },
      {
        "label": "Moving to Hamilton County (Cincinnati)",
        "href": "/local-movers/ohio/hamilton",
        "note": "Hills and river-metro logistics."
      }
    ]
  },
  "challenges": {
    "title": "Ohio-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Ohio moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Winter weather (especially northern Ohio)",
        "detail": "Lake-effect snow and ice change driveway access and schedules. Build weather buffer into winter moves."
      },
      {
        "title": "Older multi-story housing stock",
        "detail": "Stairs and tight entries increase labor time in many urban neighborhoods."
      },
      {
        "title": "Multi-metro distances",
        "detail": "Cleveland–Cincinnati is a real haul. Treat long in-state corridors as distance moves with correct PUCO registration."
      },
      {
        "title": "HOA growth suburbs",
        "detail": "Especially around Columbus, confirm COI and approved hours before move day."
      },
      {
        "title": "Appalachian / hill access in the southeast",
        "detail": "Steeper lots may need smaller trucks or longer carries — survey access early."
      },
      {
        "title": "PUCO registration checks",
        "detail": "Verify the mover appears on PUCO household goods resources and that certificate numbers appear in advertising."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Ohio moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Ohio local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "How are movers regulated in Ohio?",
      "answer": "Household goods movers operating within Ohio must register with the Public Utilities Commission of Ohio (PUCO) and follow PUCO rules. Interstate moves require federal FMCSA operating authority and a USDOT number."
    },
    {
      "question": "How do I verify an Ohio mover is registered?",
      "answer": "Check the PUCO household goods movers list / resources and look for the certificate number in advertisements. For interstate work, also verify USDOT / MC on FMCSA SAFER before paying a deposit."
    },
    {
      "question": "When is the best time to move in Ohio?",
      "answer": "Demand peaks late spring through early fall. Mid-week mornings are often easier. Winter weather can force flexible dates, especially in northern counties."
    },
    {
      "question": "Why do Ohio move prices vary so much?",
      "answer": "Metro labor rates, stairs in older homes, HOAs, winter productivity, and long intercity distances all change hours. Access and season often matter as much as miles."
    },
    {
      "question": "Is PUCO registration enough for a move to Florida?",
      "answer": "No. Crossing state lines generally requires FMCSA interstate authority. PUCO household goods registration covers Ohio intrastate operations — not interstate operating authority."
    },
    {
      "question": "What should I check before hiring any Ohio mover?",
      "answer": "Active PUCO registration for in-state work (or FMCSA for interstate), written estimate, insurance/valuation clarity, and contract terms. Avoid large cash deposits to unverified operators."
    }
  ],
  "trust": {
    "byline": "Curated by the Move Trust Hub editorial team",
    "lastReviewed": "2026-07-22",
    "methodology": "County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "PUCO — Movers",
        "href": "https://puco.ohio.gov/transportation/movers"
      },
      {
        "label": "PUCO — HHG list",
        "href": "https://puco.ohio.gov/transportation/movers/resources/hhg-list"
      },
      {
        "label": "PUCO — Know your rights",
        "href": "https://puco.ohio.gov/transportation/movers/resources/know-your-rights-when-hiring-a-moving-company"
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
