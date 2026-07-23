import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 2):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: inbound_dominant
 * - Regulation mode: strong_state_regulator
 */
export const northCarolinaStateResourceHub: StateResourceHubPack = {
  "stateSlug": "north-carolina",
  "stateCode": "NC",
  "h1": "North Carolina Moving Resource Hub: Costs, NCUC Certificates & 100 County Guides",
  "metaTitle": "North Carolina Movers Guide 2026 — Costs, NCUC Licensing & 100 County Guides",
  "metaDescription": "Plan a move within, to, or from North Carolina. Compare local and intrastate costs, verify NCUC household goods certificates, browse 100 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for North Carolina moves in 2026 — typical costs, NCUC vs FMCSA rules, Triangle-to-coast regional guides, and tools to compare certificated movers without paid placements.",
  "trustBar": [
    "100 County Guides",
    "Verified Movers",
    "NCUC & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within North Carolina",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To North Carolina",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From North Carolina",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how North Carolina markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My North Carolina Moving Cost",
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
    "title": "Why moving in North Carolina is different",
    "paragraphs": [
      "North Carolina is not one moving market. Charlotte freeways, Triangle university calendars, Triad logistics, Asheville mountain approaches, and Outer Banks storm windows produce different access and labor profiles under one state name.",
      "Intrastate household goods movers must hold a certificate (C-number) from the North Carolina Utilities Commission (NCUC) and follow Maximum Rate Tariff rules. Interstate jobs need FMCSA authority. Humidity, HOAs, and hurricane-season flexibility are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "North Carolina moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical North Carolina local and intrastate patterns; they are not bids. Always compare written estimates from NCUC-certificated movers for in-state work and FMCSA-authorized carriers for interstate work.",
    "stats": [
      {
        "label": "Typical local move (studio–2BR)",
        "value": "$450–$2,000+",
        "note": "HOAs and heat push higher in metros"
      },
      {
        "label": "Typical local move (3–4+ BR)",
        "value": "$1,600–$5,000+",
        "note": "Suburban long carries common"
      },
      {
        "label": "Intrastate corridor (e.g. Charlotte ↔ Raleigh)",
        "value": "$1,800–$6,000+",
        "note": "Season and packing drive the spread"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Hurricane season needs flexible dates"
      },
      {
        "label": "Top inbound origins",
        "value": "NY · NJ · FL · VA · CA · PA",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "100",
        "note": "Major metros emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "North Carolina moving regulations & consumer protection",
    "intro": "North Carolina requires intrastate household goods movers to obtain a certificate (C-number) from the North Carolina Utilities Commission (NCUC) and abide by the Maximum Rate Tariff. Match certification to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside North Carolina)",
      "body": "If origin or destination is outside North Carolina, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. An NCUC certificate alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within North Carolina)",
      "body": "Intrastate household goods movers must hold an NCUC certificate (commonly a “C” number / Certificate of Exemption authorizing HHG transportation within NC). The Maximum Rate Tariff sets maximum charges, required forms, and the consumer booklet “Moving in North Carolina, Your Rights and Responsibilities,” which movers must provide."
    },
    "verifySteps": [
      "Classify the job: entirely in North Carolina (NCUC) vs any out-of-state leg (FMCSA / USDOT).",
      "Ask for the mover’s NCUC certificate (C-number) and match it to the legal name on your estimate.",
      "Intrastate: check the NCUC certified carriers list / call Public Staff (919) 733-7766 for current status.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Require the consumer rights booklet, written estimate, and proper forms.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "Maximum Rate Tariff",
        "detail": "NCUC’s Maximum Rate Tariff governs maximum rates, rules, and required forms for certificated intrastate HHG moves. Ask how your estimate relates to tariff rules."
      },
      {
        "title": "Consumer booklet",
        "detail": "Certificated movers must provide the informational booklet describing your rights and responsibilities for moves within North Carolina."
      },
      {
        "title": "Certificate display",
        "detail": "Legitimate movers should be able to provide their C-number; it is commonly expected on trucks and in advertising."
      }
    ],
    "officialLinks": [
      {
        "label": "NCUC — Moving guide",
        "href": "https://www.ncuc.gov/industries/transportation/movingguide.html",
        "external": true
      },
      {
        "label": "NCUC — Transportation / HHG overview",
        "href": "https://www.ncuc.gov/Industries/transportation/transportation.html",
        "external": true
      },
      {
        "label": "NC DOJ — Moving consumer tips",
        "href": "https://ncdoj.gov/protecting-consumers/home-repair-and-products/moving/",
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
    "disclaimer": "Licensing rules and carrier lists can change. Always verify current NCUC certificate status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "charlotte-metro",
      "name": "Charlotte Metro",
      "shortName": "Charlotte",
      "blurb": "Banking and corporate growth, HOA suburbs, and freeway density across Mecklenburg and neighboring counties.",
      "challenges": [
        "I-77 / I-85 congestion",
        "HOA windows in master-planned communities"
      ],
      "countySlugs": [
        "mecklenburg",
        "union",
        "cabarrus",
        "gaston",
        "iredell",
        "rowan",
        "lincoln",
        "cleveland",
        "stanly",
        "anson"
      ],
      "ctaLabel": "Explore Charlotte metro"
    },
    {
      "id": "triangle",
      "name": "Research Triangle",
      "shortName": "Triangle",
      "blurb": "Raleigh–Durham–Chapel Hill university and tech calendars with fast-growing suburbs.",
      "challenges": [
        "University move-in peaks",
        "New-construction HOA rules"
      ],
      "countySlugs": [
        "wake",
        "durham",
        "orange",
        "chatham",
        "johnston",
        "franklin",
        "granville",
        "person",
        "lee",
        "harnett"
      ],
      "ctaLabel": "Explore the Triangle"
    },
    {
      "id": "triad",
      "name": "Piedmont Triad",
      "shortName": "Triad",
      "blurb": "Greensboro–Winston-Salem–High Point logistics and mixed urban/suburban stock.",
      "challenges": [
        "Heat and humidity pacing",
        "Cross-metro portal-to-portal time"
      ],
      "countySlugs": [
        "guilford",
        "forsyth",
        "alamance",
        "davidson",
        "randolph",
        "rockingham",
        "stokes",
        "surry",
        "yadkin",
        "davie"
      ],
      "ctaLabel": "Explore the Triad"
    },
    {
      "id": "asheville-west",
      "name": "Asheville & Western NC",
      "shortName": "Western NC",
      "blurb": "Mountain approaches, tourism towns, and elevation weather from Asheville across the western counties.",
      "challenges": [
        "Steep driveways and mountain access",
        "Winter weather at elevation"
      ],
      "countySlugs": [
        "buncombe",
        "henderson",
        "haywood",
        "madison",
        "yancey",
        "mitchell",
        "avery",
        "watauga",
        "ashe",
        "alleghany",
        "wilkes",
        "caldwell",
        "burke",
        "mcdowell",
        "rutherford",
        "polk",
        "transylvania",
        "jackson",
        "swain",
        "macon",
        "clay",
        "graham",
        "cherokee"
      ],
      "ctaLabel": "Explore Western NC"
    },
    {
      "id": "coastal-east",
      "name": "Coastal & Eastern NC",
      "shortName": "Coastal / East",
      "blurb": "Wilmington, military bases, Outer Banks approaches, and hurricane-season logistics across eastern counties.",
      "challenges": [
        "Hurricane-season flexibility",
        "Military PCS calendars"
      ],
      "countySlugs": [
        "new-hanover",
        "brunswick",
        "pender",
        "onslow",
        "carteret",
        "craven",
        "pamlico",
        "beaufort",
        "hyde",
        "dare",
        "currituck",
        "camden",
        "pasquotank",
        "perquimans",
        "chowan",
        "bertie",
        "washington",
        "tyrrell",
        "martin",
        "pitt",
        "greene",
        "lenoir",
        "jones",
        "duplin",
        "sampson",
        "wayne",
        "wilson",
        "edgecombe",
        "nash",
        "halifax",
        "northampton",
        "hertford",
        "gates"
      ],
      "ctaLabel": "Explore Coastal / East NC"
    },
    {
      "id": "rest-nc",
      "name": "Other North Carolina Counties",
      "shortName": "Rest of NC",
      "blurb": "Remaining Piedmont and rural counties outside the primary metro groupings.",
      "challenges": [
        "Confirm mover coverage for remote addresses",
        "Longer regional hauls"
      ],
      "countySlugs": [
        "alexander",
        "bladen",
        "caswell",
        "catawba",
        "columbus",
        "cumberland",
        "hoke",
        "montgomery",
        "moore",
        "richmond",
        "robeson",
        "scotland",
        "vance",
        "warren"
      ],
      "ctaLabel": "Explore remaining counties"
    }
  ],
  "costs": {
    "title": "North Carolina moving costs",
    "intro": "North Carolina pricing reflects metro growth, HOAs, humidity/heat, mountain access, and coastal storm flexibility. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate North Carolina moving costs",
      "lastReviewed": "2026-07-22",
      "body": "These ranges are planning estimates, not quotes. They combine typical North Carolina local and intrastate patterns: home size, distance, HOAs, stairs/long carries, seasonality, and regional labor. Actual bids vary and must respect NCUC Maximum Rate Tariff rules for certificated intrastate moves. Always compare written estimates from NCUC-certificated movers for in-state work and FMCSA-authorized carriers for interstate work."
    },
    "ranges": [
      {
        "label": "Local studio / 1BR",
        "value": "$450–$1,600+",
        "note": "HOAs push higher in metros"
      },
      {
        "label": "Local 2–3BR house",
        "value": "$1,400–$4,200+",
        "note": "Suburban long carries common"
      },
      {
        "label": "Intrastate mid-size (e.g. Charlotte ↔ Greensboro)",
        "value": "$1,600–$5,000+",
        "note": "Season matters"
      },
      {
        "label": "Intrastate long (e.g. Charlotte ↔ Wilmington)",
        "value": "$2,000–$6,500+",
        "note": "Full packing pushes the top"
      },
      {
        "label": "Typical 2-person crew (major metros)",
        "value": "$115–$195+/hr",
        "note": "Portal-to-portal; tariff rules apply in-state"
      }
    ],
    "factors": [
      "Metro HOAs often require COI and approved hours.",
      "Mountain access can force smaller trucks or long carries.",
      "Hurricane season requires flexible coastal dates.",
      "University calendars create May/August peaks in the Triangle.",
      "Heat and humidity favor early starts most of the year."
    ]
  },
  "routes": {
    "title": "Popular North Carolina moving routes",
    "intro": "North Carolina is a major inbound Southeast destination with strong Northeast origins and large Charlotte–Triangle internal flows. Interstate jobs need FMCSA authority; in-state corridors need NCUC-certificated movers.",
    "migrationProfile": "inbound_dominant",
    "outbound": [
      {
        "label": "North Carolina → Florida",
        "href": "/moving-to/florida",
        "origins": "Charlotte, Triangle, Coastal NC",
        "transit": "Often 1–2 day interstate",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Common Southeast corridor."
      },
      {
        "label": "North Carolina → South Carolina / Tennessee",
        "href": "/moving-to/south-carolina",
        "origins": "Charlotte, Western NC",
        "transit": "Short interstate hops",
        "planningNote": "Confirm FMCSA even on short border crossings.",
        "note": "Frequent cross-border metro and mountain moves."
      }
    ],
    "inbound": [
      {
        "label": "Northeast → North Carolina",
        "href": "/local-movers/north-carolina",
        "origins": "NY, NJ, PA, New England",
        "transit": "Multi-day I-95 corridor",
        "planningNote": "High-volume inbound into Charlotte and the Triangle.",
        "note": "Confirm interstate FMCSA authority."
      },
      {
        "label": "Moving to Mecklenburg County (Charlotte)",
        "href": "/local-movers/north-carolina/mecklenburg",
        "note": "HOAs and freeway density define many arrivals."
      },
      {
        "label": "Moving to Wake County (Raleigh)",
        "href": "/local-movers/north-carolina/wake",
        "note": "Tech/university growth and suburban tracts."
      }
    ]
  },
  "challenges": {
    "title": "North Carolina-specific moving challenges & tips",
    "intro": "These issues show up constantly on real North Carolina moves — not generic national checklist filler.",
    "items": [
      {
        "title": "HOA-heavy growth suburbs",
        "detail": "Charlotte and Triangle communities often require COI, approved hours, and gate lists. Collect packets early."
      },
      {
        "title": "Mountain access (Western NC)",
        "detail": "Steep driveways and switchbacks may need smaller trucks or shuttle strategies around Asheville and beyond."
      },
      {
        "title": "Hurricane season (coast)",
        "detail": "Build flexible dates for eastern and barrier-adjacent moves during storm season."
      },
      {
        "title": "University calendars",
        "detail": "Triangle and college towns spike in May and August. Book early for those windows."
      },
      {
        "title": "Heat and humidity",
        "detail": "Early starts protect crews and belongings across the Piedmont and coast."
      },
      {
        "title": "Maximum Rate Tariff compliance",
        "detail": "Certificated intrastate movers operate under NCUC tariff rules — ask how estimates and forms map to required paperwork."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate North Carolina moves."
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
      "description": "Interstate-ready planning checklist you can adapt for North Carolina local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "How are movers regulated in North Carolina?",
      "answer": "Intrastate household goods movers must hold a certificate (C-number) from the North Carolina Utilities Commission and follow the Maximum Rate Tariff. Interstate moves require federal FMCSA operating authority and a USDOT number."
    },
    {
      "question": "How do I verify a North Carolina mover is certificated?",
      "answer": "Ask for the NCUC C-number, check the NCUC certified carriers list, or call Public Staff at (919) 733-7766 for current status. For interstate work, also verify USDOT / MC on FMCSA SAFER."
    },
    {
      "question": "What is the Maximum Rate Tariff?",
      "answer": "It is the NCUC framework that sets maximum rates, rules, required forms, and consumer information requirements for certificated intrastate household goods moves in North Carolina."
    },
    {
      "question": "When is the best time to move in North Carolina?",
      "answer": "Demand peaks late spring through early fall. Mid-week mornings are often easier. Coastal storm season and university calendars can force flexible dates."
    },
    {
      "question": "Is an NCUC certificate enough for a move to Florida?",
      "answer": "No. Crossing state lines generally requires FMCSA interstate authority. NCUC certificates authorize intrastate North Carolina household goods transportation — not interstate operating authority."
    },
    {
      "question": "What documents should I receive for an in-state NC move?",
      "answer": "Ask for the consumer rights booklet, a written estimate, and required tariff forms. Keep copies of everything you sign and create your own inventory."
    }
  ],
  "trust": {
    "byline": "Curated by the Move Trust Hub editorial team",
    "lastReviewed": "2026-07-22",
    "methodology": "County guides combine public certification checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "NCUC — Moving guide",
        "href": "https://www.ncuc.gov/industries/transportation/movingguide.html"
      },
      {
        "label": "NCUC — Transportation",
        "href": "https://www.ncuc.gov/Industries/transportation/transportation.html"
      },
      {
        "label": "NC DOJ — Moving",
        "href": "https://ncdoj.gov/protecting-consumers/home-repair-and-products/moving/"
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
