import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 2):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: outbound_dominant
 * - Regulation mode: strong_state_regulator
 */
export const pennsylvaniaStateResourceHub: StateResourceHubPack = {
  "stateSlug": "pennsylvania",
  "stateCode": "PA",
  "h1": "Pennsylvania Moving Resource Hub: Costs, PUC Licensing & 67 County Guides",
  "metaTitle": "Pennsylvania Movers Guide 2026 — Costs, PUC Licensing & 67 County Guides",
  "metaDescription": "Plan a move within, to, or from Pennsylvania. Compare local and intrastate costs, verify Pennsylvania PUC household goods certificates, browse 67 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Pennsylvania moves in 2026 — typical costs, PUC vs FMCSA rules, Philly-to-Pittsburgh regional guides, and tools to compare certificated movers without paid placements.",
  "trustBar": [
    "67 County Guides",
    "Verified Movers",
    "PA PUC & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Pennsylvania",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Pennsylvania",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Pennsylvania",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Pennsylvania markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Pennsylvania Moving Cost",
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
    "title": "Why moving in Pennsylvania is different",
    "paragraphs": [
      "Pennsylvania is not one moving market. Philadelphia row homes and tight streets, Pittsburgh hills, Lehigh Valley growth, and rural northern counties produce different access and labor profiles under one state name.",
      "Intrastate household goods movers must be licensed by the Pennsylvania Public Utility Commission (PUC) and maintain approved insurance and rates. Interstate jobs need FMCSA authority. Winter weather, mountain approaches, and HOA suburbs are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Pennsylvania moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Pennsylvania local and intrastate patterns; they are not bids. Always compare written estimates from PUC-certificated movers for in-state work and FMCSA-authorized carriers for interstate work.",
    "stats": [
      {
        "label": "Typical Philly row-home / 1–2BR",
        "value": "$550–$2,400+",
        "note": "Stairs and street staging dominate"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$1,700–$5,200+",
        "note": "HOAs and hills vary by region"
      },
      {
        "label": "Intrastate corridor (e.g. Philly ↔ Harrisburg)",
        "value": "$2,000–$6,500+",
        "note": "Season and packing drive the spread"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Winter weather can force flexible dates"
      },
      {
        "label": "Top outbound destinations",
        "value": "FL · NC · SC · TX · NJ · DE",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "67",
        "note": "Philly and Pittsburgh emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "Pennsylvania moving regulations & consumer protection",
    "intro": "Pennsylvania requires household goods movers operating within the state to be licensed by the Public Utility Commission (PUC). Match the certificate to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Pennsylvania)",
      "body": "If origin or destination is outside Pennsylvania, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A PA PUC household goods certificate alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Pennsylvania)",
      "body": "Household goods movers operating within Pennsylvania must be licensed by the PUC, maintain required insurance, and charge fees consistent with PUC-approved frameworks. Consumers should ensure the company is PUC-licensed and that the PUC number appears in advertising as required."
    },
    "verifySteps": [
      "Classify the job: entirely in Pennsylvania (PUC) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name and PUC number from the written estimate/ads.",
      "Intrastate: confirm the mover is on PUC household goods operator resources / certificated lists.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Get written estimates, confirm insurance, and keep contracts.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "PUC licensing & insurance",
        "detail": "PUC guidance states in-state household goods movers must be licensed and maintain adequate insurance coverage."
      },
      {
        "title": "Approved fees / rate frameworks",
        "detail": "PUC-regulated movers must charge fees consistent with commission-approved structures. Ask how your price can change."
      },
      {
        "title": "Written contracts",
        "detail": "Insist on written estimates and clarity on stairs, long carries, packing, and storage before signing."
      }
    ],
    "officialLinks": [
      {
        "label": "PA PUC — Limos, taxis & movers",
        "href": "https://www.puc.pa.gov/motor-carrier/limos-taxis-movers/",
        "external": true
      },
      {
        "label": "PA PUC motor carrier overview",
        "href": "https://www.puc.pa.gov/motor-carrier/",
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
    "disclaimer": "Licensing rules and directories can change. Always verify current PUC certification or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "philadelphia-se",
      "name": "Philadelphia & Southeast",
      "shortName": "SE PA",
      "blurb": "Row homes, tight streets, elevators, and dense suburbs across Philadelphia and the collar counties.",
      "challenges": [
        "Stairs, street staging, and parking limits",
        "Building COI and multi-unit rules"
      ],
      "countySlugs": [
        "philadelphia",
        "delaware",
        "chester",
        "montgomery",
        "bucks"
      ],
      "ctaLabel": "Explore Southeast PA"
    },
    {
      "id": "lehigh-valley",
      "name": "Lehigh Valley & Eastern",
      "shortName": "Lehigh Valley",
      "blurb": "Allentown–Bethlehem–Easton growth corridors and eastern mountain approaches.",
      "challenges": [
        "Growth-suburb HOA rules",
        "I-78 / mountain traffic patterns"
      ],
      "countySlugs": [
        "lehigh",
        "northampton",
        "berks",
        "carbon",
        "monroe",
        "schuylkill"
      ],
      "ctaLabel": "Explore Lehigh Valley"
    },
    {
      "id": "central-pa",
      "name": "Central Pennsylvania",
      "shortName": "Central PA",
      "blurb": "Harrisburg, Lancaster, York, and State College corridors with mixed suburban and rural lots.",
      "challenges": [
        "University and government calendars",
        "Winter weather windows"
      ],
      "countySlugs": [
        "dauphin",
        "cumberland",
        "perry",
        "york",
        "lancaster",
        "lebanon",
        "adams",
        "franklin",
        "fulton",
        "huntingdon",
        "mifflin",
        "juniata",
        "snyder",
        "union",
        "northumberland",
        "montour",
        "columbia",
        "lycoming",
        "clinton",
        "centre"
      ],
      "ctaLabel": "Explore Central PA"
    },
    {
      "id": "northeast-pa",
      "name": "Northeast Pennsylvania",
      "shortName": "NE PA",
      "blurb": "Scranton–Wilkes-Barre and Pocono-area counties with tourism seasonality and hill access.",
      "challenges": [
        "Winter weather and hills",
        "Seasonal tourism traffic"
      ],
      "countySlugs": [
        "luzerne",
        "lackawanna",
        "wyoming",
        "susquehanna",
        "wayne",
        "pike",
        "bradford",
        "sullivan",
        "tioga"
      ],
      "ctaLabel": "Explore Northeast PA"
    },
    {
      "id": "pittsburgh-sw",
      "name": "Pittsburgh & Southwest",
      "shortName": "SW PA",
      "blurb": "Hillside homes, bridges, and older multi-story stock across Allegheny and neighboring counties.",
      "challenges": [
        "Steep driveways and tight streets",
        "Bridge and tunnel congestion"
      ],
      "countySlugs": [
        "allegheny",
        "beaver",
        "butler",
        "armstrong",
        "westmoreland",
        "washington",
        "fayette",
        "greene",
        "lawrence",
        "mercer"
      ],
      "ctaLabel": "Explore Pittsburgh region"
    },
    {
      "id": "erie-nw",
      "name": "Erie, Northwest & Laurel Highlands",
      "shortName": "NW / Highlands",
      "blurb": "Lake Erie weather, rural lots, and mountain communities west and north of the major metros.",
      "challenges": [
        "Lake-effect and mountain weather",
        "Longer regional hauls"
      ],
      "countySlugs": [
        "erie",
        "crawford",
        "warren",
        "forest",
        "venango",
        "clarion",
        "mckean",
        "elk",
        "cameron",
        "jefferson",
        "clearfield",
        "indiana",
        "cambria",
        "somerset",
        "bedford",
        "blair"
      ],
      "ctaLabel": "Explore NW / Highlands"
    },
    {
      "id": "rest-pa",
      "name": "Other Pennsylvania Counties",
      "shortName": "Rest of PA",
      "blurb": "Remaining counties outside the primary regional groupings.",
      "challenges": [
        "Confirm mover coverage for remote addresses",
        "Rural driveway access"
      ],
      "countySlugs": [
        "potter"
      ],
      "ctaLabel": "Explore remaining counties"
    }
  ],
  "costs": {
    "title": "Pennsylvania moving costs",
    "intro": "Pennsylvania pricing reflects Philly and Pittsburgh access challenges, suburban HOAs, hills, and winter productivity. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Pennsylvania moving costs",
      "lastReviewed": "2026-07-22",
      "body": "These ranges are planning estimates, not quotes. They combine typical Pennsylvania local and intrastate patterns: home size, distance, stairs/hills, parking, HOAs, seasonality, and regional labor. Actual bids vary. Always compare written estimates from PUC-certificated movers for in-state work and FMCSA-authorized carriers for interstate work."
    },
    "ranges": [
      {
        "label": "Urban 1–2BR (Philly / Pittsburgh)",
        "value": "$550–$2,400+",
        "note": "Stairs and staging dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,600–$4,500+",
        "note": "HOAs and hills vary"
      },
      {
        "label": "Intrastate mid-size (e.g. Philly ↔ Harrisburg)",
        "value": "$1,800–$5,500+",
        "note": "Season matters"
      },
      {
        "label": "Intrastate long (e.g. Philly ↔ Pittsburgh)",
        "value": "$2,500–$7,500+",
        "note": "Full packing pushes the top"
      },
      {
        "label": "Typical 2-person crew (major metros)",
        "value": "$125–$220+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Row homes and hillside properties add stair and carry labor.",
      "Winter weather can slow northern and mountain jobs.",
      "HOA windows are common in growth suburbs.",
      "Turnpike and mountain corridors affect portal-to-portal time.",
      "Peak May–September and month-end leases fill crews early."
    ]
  },
  "routes": {
    "title": "Popular Pennsylvania moving routes",
    "intro": "Pennsylvania sits between Northeast origins and Sun Belt destinations, with large Philly–Pittsburgh internal flows. Interstate jobs need FMCSA authority; in-state corridors need PUC-certificated movers.",
    "migrationProfile": "outbound_dominant",
    "outbound": [
      {
        "label": "Pennsylvania → Florida",
        "href": "/moving-to/florida",
        "origins": "Philly metro, Pittsburgh, Central PA",
        "transit": "Multi-day; snowbird seasonality",
        "planningNote": "Book early for fall/winter FL arrivals.",
        "note": "High-volume Northeast-to-Florida corridor."
      },
      {
        "label": "Pennsylvania → Carolinas",
        "href": "/moving-to/north-carolina",
        "origins": "Philly metro, Central PA",
        "transit": "I-95 / I-81 corridors",
        "planningNote": "HOAs at destination common.",
        "note": "Popular lifestyle outbound destinations."
      },
      {
        "label": "Pennsylvania → New Jersey / New York",
        "href": "/local-movers/new-jersey",
        "origins": "Philly and Lehigh Valley",
        "transit": "Often same-day or next-day interstate",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Short cross-border metro moves are common."
      }
    ],
    "inbound": [
      {
        "label": "Moving to Philadelphia County",
        "href": "/local-movers/pennsylvania/philadelphia",
        "note": "Row homes, stairs, and street logistics dominate."
      },
      {
        "label": "Moving to Allegheny County (Pittsburgh)",
        "href": "/local-movers/pennsylvania/allegheny",
        "note": "Hills, bridges, and older multi-story stock."
      },
      {
        "label": "Moving to Montgomery County",
        "href": "/local-movers/pennsylvania/montgomery",
        "note": "Philly collar suburbs and HOA communities."
      }
    ]
  },
  "challenges": {
    "title": "Pennsylvania-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Pennsylvania moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Row homes and narrow streets",
        "detail": "Philadelphia-area staging often means long carries and limited truck length. Share approach photos early."
      },
      {
        "title": "Pittsburgh hills",
        "detail": "Steep driveways and switchbacks may require smaller trucks or shuttle strategies."
      },
      {
        "title": "Winter weather",
        "detail": "Snow and ice affect mountain and northern counties. Build weather buffer into winter schedules."
      },
      {
        "title": "HOA suburbs",
        "detail": "Growth communities around major metros often require COI and approved hours."
      },
      {
        "title": "Turnpike and mountain corridors",
        "detail": "Philly–Pittsburgh hauls need honest portal-to-portal assumptions across the Turnpike."
      },
      {
        "title": "Rural coverage gaps",
        "detail": "Northern and mountain counties may require regional crews — confirm service to your exact address."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Pennsylvania moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Pennsylvania local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "How are movers regulated in Pennsylvania?",
      "answer": "Household goods movers operating within Pennsylvania must be licensed by the Pennsylvania Public Utility Commission (PUC) and maintain required insurance and rate frameworks. Interstate moves require federal FMCSA operating authority and a USDOT number."
    },
    {
      "question": "How do I verify a Pennsylvania mover is licensed?",
      "answer": "Confirm the company is PUC-licensed for household goods operations (look for PUC numbers in ads and verify via PUC motor carrier / household goods resources). For interstate work, also check FMCSA SAFER for USDOT / MC status."
    },
    {
      "question": "When is the best time to move in Pennsylvania?",
      "answer": "Demand peaks late spring through early fall. Mid-week mornings are often easier. Winter weather can force flexible dates in northern and mountain counties."
    },
    {
      "question": "Why do Philly and Pittsburgh moves cost more?",
      "answer": "Stairs, hills, limited staging, and building access rules increase labor hours even for short distances. Access often matters more than miles."
    },
    {
      "question": "Is a PA PUC license enough for a move to Florida?",
      "answer": "No. Crossing state lines generally requires FMCSA interstate authority. PUC household goods certification covers Pennsylvania intrastate operations — not interstate operating authority."
    },
    {
      "question": "What should I check before hiring any Pennsylvania mover?",
      "answer": "Active PUC certification for in-state work (or FMCSA for interstate), written estimate, insurance/valuation clarity, and contract terms. Avoid large cash deposits to unverified operators."
    }
  ],
  "trust": {
    "byline": "Curated by the Move Trust Hub editorial team",
    "lastReviewed": "2026-07-22",
    "methodology": "County guides combine public licensing checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "PA PUC — Limos, taxis & movers",
        "href": "https://www.puc.pa.gov/motor-carrier/limos-taxis-movers/"
      },
      {
        "label": "PA PUC motor carrier",
        "href": "https://www.puc.pa.gov/motor-carrier/"
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
