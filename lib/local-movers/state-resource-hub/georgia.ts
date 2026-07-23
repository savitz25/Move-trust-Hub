import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 1):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: balanced
 * - Regulation mode: strong_state_regulator
 */
export const georgiaStateResourceHub: StateResourceHubPack = {
  "stateSlug": "georgia",
  "stateCode": "GA",
  "h1": "Georgia Moving Resource Hub: Costs, DPS Household Goods Rules & 159 County Guides",
  "metaTitle": "Georgia Movers Guide 2026 — Costs, DPS Licensing & 159 County Guides",
  "metaDescription": "Plan a move within, to, or from Georgia. Compare local and intrastate costs, verify Georgia DPS household goods certification, browse 159 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Georgia moves in 2026 — typical costs, DPS household goods rules vs FMCSA, Atlanta-to-coastal regional guides, and tools to compare certified movers without paid placements.",
  "trustBar": [
    "159 County Guides",
    "Verified Movers",
    "GA DPS & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Georgia",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Georgia",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Georgia",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Georgia markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Georgia Moving Cost",
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
    "title": "Why moving in Georgia is different",
    "paragraphs": [
      "Georgia is not one moving market. Metro Atlanta HOAs and freeways, North Georgia mountain approaches, Savannah humidity and historic districts, and rural South Georgia driveways produce different access and labor profiles under one state name.",
      "Intrastate household goods movers must be certified by the Georgia Department of Public Safety (DPS) Motor Carrier Compliance Division. Interstate jobs need FMCSA authority. Summer heat, pollen-season calendars, and HOA rules are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Georgia moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Georgia local and intrastate patterns; they are not bids. Always compare written estimates from DPS-certified movers for in-state work and FMCSA-authorized carriers for interstate work.",
    "stats": [
      {
        "label": "Typical local move (studio–2BR)",
        "value": "$450–$2,000+",
        "note": "Atlanta elevators/HOAs push higher"
      },
      {
        "label": "Typical local move (3–4+ BR)",
        "value": "$1,600–$5,200+",
        "note": "Suburban long carries common"
      },
      {
        "label": "Intrastate corridor (e.g. Atlanta ↔ Savannah)",
        "value": "$2,000–$6,500+",
        "note": "Season and packing drive the spread"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Heat + school calendars"
      },
      {
        "label": "Top inbound origins",
        "value": "NY · FL · CA · TX · NC",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "159",
        "note": "Metro Atlanta emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "Georgia moving regulations & consumer protection",
    "intro": "Georgia requires household goods movers operating in the state to hold certification from the Georgia Department of Public Safety (DPS) Motor Carrier Compliance Division. Match certification to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Georgia)",
      "body": "If origin or destination is outside Georgia, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. Georgia DPS household goods certification alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Georgia)",
      "body": "Intrastate household goods movers must obtain required DPS household goods certification / Certificate of Public Convenience and Necessity processes administered through Georgia Motor Carrier Compliance. Consumers can review licensed mover listings and DPS household goods resources on official gamccd.net pages."
    },
    "verifySteps": [
      "Classify the job: entirely in Georgia (DPS HHG) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name from the written estimate.",
      "Intrastate: verify the mover appears on Georgia DPS licensed household goods mover resources / portals.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Get written estimates, clarify tariff/accessorial rules, and keep contracts.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "Certification requirement",
        "detail": "Georgia Attorney General consumer guidance notes movers must hold a Certificate of Public Convenience and Necessity and that DPS enforces intrastate household goods rules and tariffs."
      },
      {
        "title": "Written estimates",
        "detail": "Insist on written estimates and clear accessorial pricing (stairs, long carry, packing, storage)."
      },
      {
        "title": "Complaints",
        "detail": "DPS household goods enforcement and consumer resources may assist for in-state issues; interstate issues may involve FMCSA."
      }
    ],
    "officialLinks": [
      {
        "label": "Georgia DPS — Household Goods",
        "href": "https://gamccd.net/HouseholdGoods.aspx",
        "external": true
      },
      {
        "label": "Georgia AG — Moving companies consumer topic",
        "href": "https://consumer.georgia.gov/consumer-topics/moving-companies",
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
    "disclaimer": "Licensing rules and directories can change. Always verify current DPS household goods certification or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "metro-atlanta",
      "name": "Metro Atlanta",
      "shortName": "Metro Atlanta",
      "blurb": "Perimeter freeways, HOA-heavy suburbs, mid-rises, and high-volume corporate and family moves across core metro counties.",
      "challenges": [
        "I-75 / I-85 / I-285 congestion",
        "HOA windows and new-construction access"
      ],
      "countySlugs": [
        "fulton",
        "dekalb",
        "cobb",
        "gwinnett",
        "clayton",
        "cherokee",
        "forsyth",
        "henry",
        "douglas",
        "fayette",
        "rockdale",
        "paulding",
        "coweta",
        "newton",
        "bartow",
        "walton",
        "barrow",
        "carroll"
      ],
      "ctaLabel": "Explore Metro Atlanta"
    },
    {
      "id": "north-georgia",
      "name": "North Georgia",
      "shortName": "North GA",
      "blurb": "Mountain approaches, tourism towns, and mixed suburban/rural lots north of Atlanta.",
      "challenges": [
        "Hill and mountain driveway access",
        "Seasonal tourism traffic"
      ],
      "countySlugs": [
        "hall",
        "whitfield",
        "catoosa",
        "walker",
        "murray",
        "gordon",
        "floyd",
        "polk",
        "haralson",
        "gilmer",
        "fannin",
        "union",
        "towns",
        "rabun",
        "habersham",
        "white",
        "lumpkin",
        "dawson",
        "pickens",
        "chattooga"
      ],
      "ctaLabel": "Explore North Georgia"
    },
    {
      "id": "coastal-ga",
      "name": "Coastal Georgia",
      "shortName": "Coastal GA",
      "blurb": "Savannah historic districts, humidity, and coastal access across Chatham and neighboring counties.",
      "challenges": [
        "Historic district staging limits",
        "Humidity and storm-season flexibility"
      ],
      "countySlugs": [
        "chatham",
        "glynn",
        "liberty",
        "bryan",
        "effingham",
        "camden",
        "brantley",
        "long",
        "mcintosh"
      ],
      "ctaLabel": "Explore Coastal Georgia"
    },
    {
      "id": "middle-ga",
      "name": "Middle Georgia",
      "shortName": "Middle GA",
      "blurb": "Macon and central corridors with mixed small-metro and rural patterns between Atlanta and South Georgia.",
      "challenges": [
        "Longer regional hauls",
        "Heat and thinner local coverage"
      ],
      "countySlugs": [
        "bibb",
        "houston",
        "peach",
        "crawford",
        "jones",
        "monroe",
        "twiggs",
        "wilkinson",
        "baldwin",
        "putnam",
        "jasper",
        "butts",
        "lamar",
        "pike",
        "spalding",
        "upson"
      ],
      "ctaLabel": "Explore Middle Georgia"
    },
    {
      "id": "augusta-east",
      "name": "Augusta & East Georgia",
      "shortName": "Augusta / East",
      "blurb": "Augusta metro and eastern counties with medical, military, and river-adjacent patterns.",
      "challenges": [
        "Heat and humidity",
        "Cross-state proximity logistics (SC border context)"
      ],
      "countySlugs": [
        "richmond",
        "columbia",
        "burke",
        "mcduffie",
        "warren",
        "glascock",
        "jefferson",
        "jenkins",
        "screven",
        "lincoln",
        "wilkes",
        "taliaferro"
      ],
      "ctaLabel": "Explore Augusta / East"
    },
    {
      "id": "southwest-ga",
      "name": "Southwest & South Georgia",
      "shortName": "SW / South GA",
      "blurb": "Albany, Valdosta, and agricultural counties with rural driveways and longer crew travel times.",
      "challenges": [
        "Rural access and thin coverage",
        "Long distances between towns"
      ],
      "countySlugs": [
        "dougherty",
        "lee",
        "sumter",
        "crisp",
        "colquitt",
        "tift",
        "worth",
        "mitchell",
        "thomas",
        "grady",
        "decatur",
        "seminole",
        "early",
        "miller",
        "baker",
        "calhoun",
        "clay",
        "randolph",
        "terrell",
        "webster",
        "schley",
        "marion",
        "macon",
        "dooly",
        "wilcox",
        "turner",
        "ben-hill",
        "irwin",
        "cook",
        "brooks",
        "lowndes",
        "lanier",
        "echols",
        "clinch",
        "atkinson",
        "coffee",
        "berrien"
      ],
      "ctaLabel": "Explore South Georgia"
    },
    {
      "id": "rest-georgia",
      "name": "Other Georgia Counties",
      "shortName": "Rest of GA",
      "blurb": "Remaining counties outside the primary metro and coastal groupings — small towns and rural lots statewide.",
      "challenges": [
        "Confirm mover coverage for remote addresses",
        "Long driveway and farm-adjacent access"
      ],
      "countySlugs": [
        "appling",
        "bacon",
        "banks",
        "bleckley",
        "bulloch",
        "candler",
        "charlton",
        "chattahoochee",
        "clarke",
        "dade",
        "dodge",
        "elbert",
        "emanuel",
        "evans",
        "franklin",
        "greene",
        "hancock",
        "harris",
        "hart",
        "heard",
        "jackson",
        "jeff-davis",
        "johnson",
        "laurens",
        "madison",
        "meriwether",
        "montgomery",
        "morgan",
        "muscogee",
        "oconee",
        "oglethorpe",
        "pierce",
        "pulaski",
        "quitman",
        "stephens",
        "stewart",
        "talbot",
        "tattnall",
        "taylor",
        "telfair",
        "toombs",
        "treutlen",
        "troup",
        "ware",
        "washington",
        "wayne",
        "wheeler"
      ],
      "ctaLabel": "Explore remaining counties"
    }
  ],
  "costs": {
    "title": "Georgia moving costs",
    "intro": "Georgia pricing reflects Atlanta metro labor and HOAs, coastal humidity accessorials, heat, and long rural distances. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Georgia moving costs",
      "lastReviewed": "2026-07-22",
      "body": "These ranges are planning estimates, not quotes. They combine typical Georgia local and intrastate patterns: home size, distance, HOAs, stairs/long carries, seasonality, and regional labor. Actual bids vary. Always compare written estimates from DPS-certified movers for in-state work and FMCSA-authorized carriers for interstate work."
    },
    "ranges": [
      {
        "label": "Local studio / 1BR",
        "value": "$450–$1,600+",
        "note": "Elevators/HOAs push higher in Atlanta"
      },
      {
        "label": "Local 2–3BR house",
        "value": "$1,400–$4,200+",
        "note": "Suburban long carries common"
      },
      {
        "label": "Intrastate mid-size (e.g. Atlanta ↔ Macon)",
        "value": "$1,600–$5,000+",
        "note": "Season matters"
      },
      {
        "label": "Intrastate long (e.g. Atlanta ↔ Savannah)",
        "value": "$2,000–$6,500+",
        "note": "Full packing pushes the top"
      },
      {
        "label": "Typical 2-person crew (Atlanta metro)",
        "value": "$120–$200+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Metro Atlanta HOAs and freeway time add soft costs and hours.",
      "Summer heat favors early starts statewide.",
      "Coastal historic districts can limit truck staging.",
      "Rural South Georgia jobs may include significant crew travel time.",
      "Peak school-year and end-of-month weekends fill crews early."
    ]
  },
  "routes": {
    "title": "Popular Georgia moving routes",
    "intro": "Georgia is a major Southeast hub with strong Atlanta inbound/outbound flows and Florida–Carolinas corridors. Interstate jobs need FMCSA authority; in-state corridors need DPS-certified household goods movers.",
    "migrationProfile": "balanced",
    "outbound": [
      {
        "label": "Georgia → Florida",
        "href": "/moving-to/florida",
        "origins": "Atlanta, Savannah, South Georgia",
        "transit": "Often 1–2 day interstate",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "High-volume Southeast corridor."
      },
      {
        "label": "Georgia → Carolinas",
        "href": "/moving-to/north-carolina",
        "origins": "Atlanta, North Georgia",
        "transit": "I-85 / I-95 corridors",
        "planningNote": "HOAs at destination common.",
        "note": "Common lifestyle and job-driven moves."
      },
      {
        "label": "Georgia → Texas",
        "href": "/moving-to/texas",
        "origins": "Atlanta metro",
        "transit": "Multi-day",
        "planningNote": "Large inventories and heat planning.",
        "note": "Growing long-haul outbound lane."
      }
    ],
    "inbound": [
      {
        "label": "Northeast / Midwest → Atlanta",
        "href": "/local-movers/georgia/fulton",
        "note": "Corporate and family inbound into Metro Atlanta."
      },
      {
        "label": "Moving to Fulton County",
        "href": "/local-movers/georgia/fulton",
        "note": "Core Atlanta access and multi-unit rules."
      },
      {
        "label": "Moving to Chatham County (Savannah)",
        "href": "/local-movers/georgia/chatham",
        "note": "Historic district staging and humidity."
      }
    ]
  },
  "challenges": {
    "title": "Georgia-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Georgia moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Metro Atlanta traffic",
        "detail": "I-75/I-85/I-285 peaks inflate portal-to-portal time. Prefer mid-week mornings and honest travel assumptions on estimates."
      },
      {
        "title": "HOA-heavy suburbs",
        "detail": "Many Atlanta-area communities require COI, approved hours, and gate lists. Collect packets early."
      },
      {
        "title": "Summer heat and humidity",
        "detail": "Early starts protect crews and belongings. Coastal humidity adds handling considerations for wood and electronics."
      },
      {
        "title": "Historic district access (Savannah and others)",
        "detail": "Narrow streets and limited staging can force smaller trucks or longer carries."
      },
      {
        "title": "North Georgia terrain",
        "detail": "Mountain and hill driveways may need smaller trucks or shuttle strategies."
      },
      {
        "title": "Rural coverage gaps",
        "detail": "South Georgia and remote counties may require regional crews — confirm service to your exact address and travel fees."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Georgia moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Georgia local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "How are movers regulated in Georgia?",
      "answer": "Intrastate household goods movers must be certified through the Georgia Department of Public Safety Motor Carrier Compliance Division (household goods certification / CPCN framework). Interstate moves require federal FMCSA operating authority and a USDOT number. Verify the correct authority for your exact origin and destination."
    },
    {
      "question": "How do I verify a Georgia mover is certified?",
      "answer": "Use Georgia DPS household goods resources and licensed mover listings/portals (gamccd.net). For interstate work, also verify USDOT / MC on FMCSA SAFER. Match the legal name on your estimate to official records before paying a deposit."
    },
    {
      "question": "When is the best time to move in Georgia?",
      "answer": "Demand peaks late spring through early fall and around school calendars. Mid-week mornings outside peak summer heat are often easier. Coastal storm season can require flexible dates."
    },
    {
      "question": "Why do Atlanta moves cost more than rural Georgia moves?",
      "answer": "Metro labor rates, HOA soft costs, elevators, and freeway portal-to-portal time increase hours. Rural jobs may be cheaper per hour but add travel time if crews come from outside the county."
    },
    {
      "question": "Do I need different movers for local vs interstate Georgia moves?",
      "answer": "Not always, but the license must match the job. DPS household goods certification for intrastate work is not a substitute for FMCSA interstate authority."
    },
    {
      "question": "What should I check before hiring any Georgia mover?",
      "answer": "Active DPS certification for in-state work (or FMCSA for interstate), written estimate, insurance/valuation clarity, and references. Avoid large cash deposits to unverified operators."
    }
  ],
  "trust": {
    "byline": "Curated by the Move Trust Hub editorial team",
    "lastReviewed": "2026-07-22",
    "methodology": "County guides combine public certification checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "Georgia DPS — Household Goods",
        "href": "https://gamccd.net/HouseholdGoods.aspx"
      },
      {
        "label": "Georgia AG — Moving companies",
        "href": "https://consumer.georgia.gov/consumer-topics/moving-companies"
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
