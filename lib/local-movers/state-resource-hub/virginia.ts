import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 3):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: balanced
 * - Regulation mode: partial_state_regulation
 */
export const virginiaStateResourceHub: StateResourceHubPack = {
  "stateSlug": "virginia",
  "stateCode": "VA",
  "h1": "Virginia Moving Resource Hub: Costs, DMV HHG Authority & 129 Local Guides",
  "metaTitle": "Virginia Movers Guide 2026 — Costs, DMV HHG Authority & 129 Local Guides",
  "metaDescription": "Plan a move within, to, or from Virginia. Compare local and intrastate costs, understand DMV household goods carrier rules (including the 31-mile framework), browse local guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Virginia moves in 2026 — typical costs, DMV household goods vs FMCSA rules, NoVA-to-Hampton Roads regional guides, and tools to compare authorized movers without paid placements.",
  "trustBar": [
    "129 Local Guides",
    "Verified Movers",
    "VA DMV & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Virginia",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Virginia",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Virginia",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Virginia markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Virginia Moving Cost",
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
    "title": "Why moving in Virginia is different",
    "paragraphs": [
      "Virginia is not one moving market. Northern Virginia high-rises and Pentagon-area traffic, Richmond row and suburban stock, Hampton Roads bridges and military cycles, Southwest mountain towns, and independent cities with their own logistics produce different access and labor profiles under one state name.",
      "Virginia DMV regulates household goods carriers for longer in-state hauls (generally 31+ road miles under Code of Virginia frameworks), while shorter local moves may fall outside full household-goods certificate requirements. Interstate jobs need FMCSA authority. Military PCS peaks, HOA suburbs, and bridge/tunnel congestion are planning inputs — then open the region and locality that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Virginia moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Virginia local and intrastate patterns; they are not bids. Always compare written estimates and confirm the right authority for distance and state lines.",
    "stats": [
      {
        "label": "Typical NoVA studio / 1BR",
        "value": "$700–$2,800+",
        "note": "Elevators and parking dominate"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$2,000–$6,500+",
        "note": "HOAs common in growth corridors"
      },
      {
        "label": "Intrastate corridor (e.g. NoVA ↔ Richmond)",
        "value": "$2,200–$7,000+",
        "note": "Confirm DMV HHG rules by distance"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Military PCS can create second peaks"
      },
      {
        "label": "Top inbound origins",
        "value": "DC · MD · NY · PA · NC",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "Local guides",
        "value": "129",
        "note": "NoVA and Hampton Roads emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "partial_state_regulation",
    "title": "Virginia moving regulations & consumer protection",
    "intro": "Virginia regulates household goods carriers through DMV Motor Carrier Services for qualifying in-state household goods operations. Distance matters: Code of Virginia frameworks treat shorter hauls differently from certificated longer household-goods moves. Always match authority to the actual origin, destination, and road miles.",
    "interstate": {
      "title": "Interstate (any leg outside Virginia)",
      "body": "If origin or destination is outside Virginia, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. Virginia household goods authority alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Virginia)",
      "body": "Virginia DMV issues household goods carrier authority for for-hire household goods transportation under state motor-carrier rules. Household goods carriers for longer in-state distances (commonly framed around 31 road miles and above) face certificate, insurance/bond, and related requirements; shorter local hauls may be treated differently under Code of Virginia Article 4 exemptions. Confirm with DMV materials and your written estimate which framework applies to your job."
    },
    "verifySteps": [
      "Classify the job: entirely in Virginia vs any out-of-state leg (FMCSA / USDOT).",
      "Estimate road miles between origin and destination — distance can change which Virginia rules apply.",
      "Copy the exact legal name from the written estimate.",
      "Intrastate: confirm appropriate Virginia DMV motor carrier / household goods credentials for the company and job type.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Get written estimates, insurance/valuation clarity, and avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "DMV household goods carrier framework",
        "detail": "Virginia DMV publishes household goods carrier requirements for qualifying intrastate operators, including financial responsibility expectations such as surety bond or letter of credit where applicable."
      },
      {
        "title": "Distance-based rules",
        "detail": "Code of Virginia materials distinguish shorter household goods hauls from certificated longer in-state household goods carriage — ask carriers which authority covers your exact addresses."
      },
      {
        "title": "Written estimates",
        "detail": "Insist on written estimates and clarity on stairs, elevators, long carries, and packing before signing — especially on NoVA and military moves."
      }
    ],
    "officialLinks": [
      {
        "label": "Virginia DMV — Household goods carrier",
        "href": "https://www.dmv.virginia.gov/businesses/motor-carriers/intrastate/house-goods",
        "external": true
      },
      {
        "label": "Virginia DMV — Motor carriers",
        "href": "https://www.dmv.virginia.gov/businesses/motor-carriers",
        "external": true
      },
      {
        "label": "Code of Virginia — Household goods carriers",
        "href": "https://law.lis.virginia.gov/vacodefull/title46.2/chapter21/article4/",
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
    "disclaimer": "Licensing rules, distance thresholds, and lookup tools can change. Always verify current Virginia DMV credentials or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "northern-va",
      "name": "Northern Virginia",
      "shortName": "NoVA",
      "blurb": "Arlington, Fairfax, Loudoun, Prince William, and neighbors with high-rises, HOAs, and DC-adjacent traffic.",
      "challenges": [
        "Elevators, parking, and security desks",
        "Beltway and HOA move windows"
      ],
      "countySlugs": [
        "arlington",
        "alexandria",
        "fairfax",
        "falls-church",
        "loudoun",
        "prince-william",
        "manassas",
        "manassas-park",
        "fauquier",
        "clarke",
        "warren",
        "culpeper",
        "stafford",
        "fredericksburg",
        "spotsylvania",
        "king-george",
        "rappahannock",
        "madison",
        "orange",
        "page",
        "shenandoah",
        "frederick",
        "winchester"
      ],
      "ctaLabel": "Explore Northern Virginia"
    },
    {
      "id": "richmond-central",
      "name": "Richmond & Central Virginia",
      "shortName": "Richmond / Central",
      "blurb": "Richmond independent city and Central Virginia suburbs with mixed historic and growth-corridor stock.",
      "challenges": [
        "Historic homes and stairs",
        "I-95 corridor congestion"
      ],
      "countySlugs": [
        "richmond",
        "henrico",
        "chesterfield",
        "hanover",
        "goochland",
        "powhatan",
        "new-kent",
        "charles-city",
        "petersburg",
        "hopewell",
        "colonial-heights",
        "dinwiddie",
        "prince-george",
        "amelia",
        "caroline",
        "louisa",
        "fluvanna",
        "cumberland",
        "buckingham",
        "prince-edward",
        "nottoway",
        "lunenburg",
        "brunswick",
        "mecklenburg",
        "halifax",
        "charlotte",
        "appomattox",
        "amherst",
        "campbell",
        "lynchburg",
        "bedford",
        "nelson",
        "albemarle",
        "charlottesville",
        "greene"
      ],
      "ctaLabel": "Explore Richmond / Central"
    },
    {
      "id": "hampton-roads",
      "name": "Hampton Roads",
      "shortName": "Hampton Roads",
      "blurb": "Virginia Beach, Norfolk, Chesapeake, Newport News, and neighbors with bridges, tunnels, and military cycles.",
      "challenges": [
        "Bridge/tunnel timing and military PCS peaks",
        "Coastal humidity and parking constraints"
      ],
      "countySlugs": [
        "virginia-beach",
        "norfolk",
        "chesapeake",
        "portsmouth",
        "suffolk",
        "newport-news",
        "hampton",
        "james-city",
        "williamsburg",
        "york",
        "poquoson",
        "gloucester",
        "mathews",
        "isle-of-wight",
        "southampton",
        "surry",
        "sussex",
        "emporia",
        "greensville"
      ],
      "ctaLabel": "Explore Hampton Roads"
    },
    {
      "id": "southwest-va",
      "name": "Southwest Virginia",
      "shortName": "Southwest VA",
      "blurb": "Roanoke, New River Valley, and mountain communities with longer regional hauls and hill access.",
      "challenges": [
        "Hill and mountain driveway access",
        "Confirm mover coverage for remote addresses"
      ],
      "countySlugs": [
        "roanoke",
        "salem",
        "botetourt",
        "craig",
        "giles",
        "montgomery",
        "radford",
        "pulaski",
        "floyd",
        "carroll",
        "galax",
        "grayson",
        "smyth",
        "wythe",
        "bland",
        "tazewell",
        "buchanan",
        "dickenson",
        "wise",
        "norton",
        "lee",
        "scott",
        "russell",
        "washington",
        "bristol",
        "patrick",
        "henry",
        "martinsville",
        "pittsylvania",
        "danville",
        "franklin"
      ],
      "ctaLabel": "Explore Southwest Virginia"
    },
    {
      "id": "shenandoah-valley",
      "name": "Shenandoah Valley",
      "shortName": "Shenandoah Valley",
      "blurb": "Harrisonburg, Staunton, and valley communities along I-81 with college towns and rural lots.",
      "challenges": [
        "I-81 weather and truck traffic",
        "Mix of campus and rural access"
      ],
      "countySlugs": [
        "rockingham",
        "harrisonburg",
        "staunton",
        "waynesboro",
        "augusta",
        "rockbridge",
        "lexington",
        "buena-vista",
        "bath",
        "highland",
        "alleghany",
        "covington"
      ],
      "ctaLabel": "Explore Shenandoah Valley"
    },
    {
      "id": "eastern-shore",
      "name": "Eastern Shore",
      "shortName": "Eastern Shore",
      "blurb": "Accomack and Northampton with bridge-tunnel approaches and thinner local coverage.",
      "challenges": [
        "Bridge-tunnel timing",
        "Confirm mover coverage early"
      ],
      "countySlugs": [
        "accomack",
        "northampton"
      ],
      "ctaLabel": "Explore Eastern Shore"
    },
    {
      "id": "northern-neck",
      "name": "Northern Neck & Middle Peninsula",
      "shortName": "Northern Neck",
      "blurb": "Riverside and peninsula counties with longer driveway approaches and seasonal patterns.",
      "challenges": [
        "Rural access and longer carries",
        "Confirm coverage for waterfront addresses"
      ],
      "countySlugs": [
        "essex",
        "king-and-queen",
        "king-william",
        "lancaster",
        "middlesex",
        "northumberland",
        "westmoreland"
      ],
      "ctaLabel": "Explore Northern Neck"
    }
  ],
  "costs": {
    "title": "Virginia moving costs",
    "intro": "Virginia pricing reflects NoVA labor markets, HOAs, bridges/tunnels, military timing, and long I-81/I-95 corridors. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Virginia moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical Virginia local and intrastate patterns: home size, distance, stairs/elevators, parking, HOAs, military windows, bridges/tunnels, and regional labor. Actual bids vary. Always compare written estimates and confirm the correct Virginia or FMCSA authority for your route."
    },
    "ranges": [
      {
        "label": "NoVA studio / 1BR",
        "value": "$700–$2,800+",
        "note": "Elevators and parking dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,900–$5,500+",
        "note": "HOAs common"
      },
      {
        "label": "Intrastate mid-size (e.g. NoVA ↔ Richmond)",
        "value": "$2,000–$6,500+",
        "note": "Distance rules may apply"
      },
      {
        "label": "Intrastate long (e.g. NoVA ↔ Hampton Roads or Southwest)",
        "value": "$2,500–$8,000+",
        "note": "Full packing pushes the top"
      },
      {
        "label": "Typical 2–3 person crew (NoVA)",
        "value": "$145–$260+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "NoVA elevators and security desks add labor time.",
      "HOA windows are common in Loudoun, Fairfax, and Prince William suburbs.",
      "Hampton Roads bridges and tunnels affect truck timing.",
      "Military PCS seasons can compress available crews.",
      "I-81 and mountain approaches change portal-to-portal hours in the west."
    ]
  },
  "routes": {
    "title": "Popular Virginia moving routes",
    "intro": "Virginia sits between Northeast origins and Sun Belt destinations, with heavy NoVA–DC churn and strong Hampton Roads military flows. Interstate jobs need FMCSA authority; longer in-state household goods jobs need the correct Virginia credentials.",
    "migrationProfile": "balanced",
    "outbound": [
      {
        "label": "Virginia → North Carolina",
        "href": "/local-movers/north-carolina",
        "origins": "NoVA, Richmond, Hampton Roads",
        "transit": "I-95 / I-85 corridors",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Popular lifestyle and job-driven outbound route."
      },
      {
        "label": "Virginia → Florida",
        "href": "/moving-to/florida",
        "origins": "NoVA, Richmond",
        "transit": "Multi-day I-95",
        "planningNote": "Book early for winter arrivals.",
        "note": "High-volume Northeast-to-Florida corridor."
      },
      {
        "label": "Virginia → Maryland / DC area",
        "href": "/local-movers/maryland",
        "origins": "Northern Virginia",
        "transit": "Often same-day interstate metro hop",
        "planningNote": "Still interstate if crossing state lines.",
        "note": "Common short cross-border metro moves."
      }
    ],
    "inbound": [
      {
        "label": "Moving to Fairfax County",
        "href": "/local-movers/virginia/fairfax",
        "note": "Elevators, HOAs, and Beltway logistics."
      },
      {
        "label": "Moving to Virginia Beach",
        "href": "/local-movers/virginia/virginia-beach",
        "note": "Coastal access and military timing."
      },
      {
        "label": "Moving to Loudoun County",
        "href": "/local-movers/virginia/loudoun",
        "note": "Growth suburbs and HOA calendars."
      }
    ]
  },
  "challenges": {
    "title": "Virginia-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Virginia moves — not generic national checklist filler.",
    "items": [
      {
        "title": "NoVA multi-unit access",
        "detail": "Arlington and Fairfax buildings often need certificates of insurance, elevator reservations, and strict loading windows. Start paperwork early."
      },
      {
        "title": "Distance-based in-state rules",
        "detail": "Ask whether your in-state haul falls under full household goods carrier rules or a shorter local framework — road miles matter in Virginia."
      },
      {
        "title": "Hampton Roads bridges and tunnels",
        "detail": "Truck timing through bridges and tunnels can add hours. Share exact addresses and preferred windows with estimators."
      },
      {
        "title": "Military PCS peaks",
        "detail": "Hampton Roads and Northern Virginia see compressed demand around PCS cycles. Book earlier than a typical civilian calendar."
      },
      {
        "title": "Independent cities vs counties",
        "detail": "Virginia’s independent cities can change tax, parking, and address logic. Confirm the exact locality name on estimates and guides."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Virginia moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Virginia local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do Virginia movers need state authority?",
      "answer": "Many for-hire household goods moves within Virginia require appropriate DMV motor carrier / household goods credentials, especially for longer in-state distances. Short local hauls may be treated differently. Interstate jobs require FMCSA authority."
    },
    {
      "question": "What is the 31-mile rule people mention in Virginia?",
      "answer": "Virginia Code frameworks have long distinguished household goods carriage under certain distance thresholds (commonly discussed around 31 road miles). Confirm with DMV materials and your carrier which rules apply to your exact origin and destination."
    },
    {
      "question": "How much does a local Northern Virginia move cost?",
      "answer": "Planning ranges often fall around $700–$2,800+ for a studio/1BR and more for larger homes, driven by elevators, parking, and HOAs. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is a Fairfax-to-Richmond move interstate?",
      "answer": "No — both ends are in Virginia, so it is intrastate. Confirm the mover holds the correct Virginia credentials for that distance and job type."
    },
    {
      "question": "When is peak moving season in Virginia?",
      "answer": "Statewide peak is typically May–September. Military PCS cycles in Hampton Roads and NoVA can create additional demand spikes."
    },
    {
      "question": "Do I need FMCSA authority for a Virginia-to-Maryland move?",
      "answer": "Yes. Crossing state lines generally requires active FMCSA operating authority and a USDOT number, even for short metro hops."
    }
  ],
  "trust": {
    "byline": "Move Trust Hub editorial research",
    "lastReviewed": "2026-07-23",
    "methodology": "County and independent-city guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "Virginia DMV — Household goods carrier",
        "href": "https://www.dmv.virginia.gov/businesses/motor-carriers/intrastate/house-goods"
      },
      {
        "label": "Code of Virginia — Household goods carriers",
        "href": "https://law.lis.virginia.gov/vacodefull/title46.2/chapter21/article4/"
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
