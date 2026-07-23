import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 1):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: inbound_dominant
 * - Regulation mode: strong_state_regulator
 */
export const floridaStateResourceHub: StateResourceHubPack = {
  "stateSlug": "florida",
  "stateCode": "FL",
  "h1": "Florida Moving Resource Hub: Costs, FDACS Registration & 67 County Guides",
  "metaTitle": "Florida Movers Guide 2026 — Costs, FDACS Registration & 67 County Guides",
  "metaDescription": "Plan a move within, to, or from Florida. Compare local and intrastate costs, verify FDACS household mover registration, browse 67 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Florida moves in 2026 — typical costs, FDACS vs FMCSA rules, regional county guides, and tools to compare registered movers without paid placements.",
  "trustBar": [
    "67 County Guides",
    "Verified Movers",
    "FDACS & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Florida",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Florida",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Florida",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Florida markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Florida Moving Cost",
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
    "title": "Why moving in Florida is different",
    "paragraphs": [
      "Florida is not one moving market. South Florida high-rises and COIs, Tampa Bay bridges, Orlando tourism calendars, Panhandle storm windows, and inland heat produce different access and labor profiles under one state name.",
      "Intrastate household movers must register with the Florida Department of Agriculture and Consumer Services (FDACS) under Chapter 507, Florida Statutes. Interstate jobs need FMCSA authority. Hurricane season, HOAs, and condo elevators are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Florida moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Florida local and intrastate patterns; they are not bids. Always compare written estimates from FDACS-registered movers for in-state work and FMCSA-authorized carriers for interstate work.",
    "stats": [
      {
        "label": "Typical local move (studio–2BR)",
        "value": "$500–$2,400+",
        "note": "Condos/elevators and parking push higher"
      },
      {
        "label": "Typical local move (3–4+ BR)",
        "value": "$1,800–$5,800+",
        "note": "HOAs and heat-day labor common"
      },
      {
        "label": "Intrastate corridor (e.g. Miami ↔ Orlando)",
        "value": "$2,000–$7,000+",
        "note": "Season and packing drive the spread"
      },
      {
        "label": "Peak season",
        "value": "Oct–Apr (snowbird) + summer leases",
        "note": "Hurricane season needs flexible dates"
      },
      {
        "label": "Top inbound origins",
        "value": "NY · NJ · PA · IL · OH · CA",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "67",
        "note": "Coastal metros emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "Florida moving regulations & consumer protection",
    "intro": "Florida requires intrastate household movers and moving brokers to register with the Florida Department of Agriculture and Consumer Services (FDACS). Match registration to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Florida)",
      "body": "If origin or destination is outside Florida, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. FDACS registration alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Florida)",
      "body": "Intrastate movers of household goods must register with FDACS under Chapter 507, Florida Statutes. Consumers can verify registration through the FDACS business/license lookup or by calling 1-800-HELP-FLA. Local city/county licenses may also apply but do not replace state registration."
    },
    "verifySteps": [
      "Classify the job: entirely in Florida (FDACS) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name from the written estimate and any registration number provided.",
      "Intrastate: verify the mover in the FDACS business search / license lookup.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Ask for required consumer disclosures, written estimates, and valuation options.",
      "Avoid large cash deposits to unverified operators; keep contracts and inventories."
    ],
    "protections": [
      {
        "title": "Written estimates & contracts",
        "detail": "Insist on written estimates and read contracts fully. Clarify stairs, long carries, elevators, and storage fees before signing."
      },
      {
        "title": "Insurance minimums",
        "detail": "FDACS registration involves insurance requirements for household goods. Confirm coverage details and optional valuation upgrades."
      },
      {
        "title": "Complaints",
        "detail": "FDACS consumer resources and 1-800-HELP-FLA can assist with in-state mover issues. Interstate disputes may involve FMCSA."
      }
    ],
    "officialLinks": [
      {
        "label": "FDACS — Moving companies",
        "href": "https://www.fdacs.gov/Business-Services/Moving-Companies",
        "external": true
      },
      {
        "label": "FDACS — Moving within Florida",
        "href": "https://www.fdacs.gov/Consumer-Resources/Consumer-Rights-and-Responsibilities/Moving-Within-Florida",
        "external": true
      },
      {
        "label": "FDACS business search",
        "href": "https://csapp.fdacs.gov/cspublicapp/businesssearch/businesssearch.aspx",
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
    "disclaimer": "Licensing rules and lookup tools can change. Always verify current FDACS registration or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "south-florida",
      "name": "South Florida",
      "shortName": "South FL",
      "blurb": "Miami–Fort Lauderdale–Palm Beach density, condo elevators/COI, parking permits, and international inbound patterns.",
      "challenges": [
        "High-rise elevators and building COI windows",
        "Tight street staging and parking rules"
      ],
      "countySlugs": [
        "miami-dade",
        "broward",
        "palm-beach",
        "monroe"
      ],
      "ctaLabel": "Explore South Florida"
    },
    {
      "id": "tampa-bay",
      "name": "Tampa Bay",
      "shortName": "Tampa Bay",
      "blurb": "Bridges, humidity, suburban HOAs, and mixed coastal/inland access across Hillsborough, Pinellas, and neighbors.",
      "challenges": [
        "Bridge and bay traffic timing",
        "HOA and multi-unit access rules"
      ],
      "countySlugs": [
        "hillsborough",
        "pinellas",
        "pasco",
        "hernando",
        "manatee",
        "sarasota",
        "citrus"
      ],
      "ctaLabel": "Explore Tampa Bay"
    },
    {
      "id": "central-orlando",
      "name": "Central Florida / Orlando",
      "shortName": "Central FL",
      "blurb": "Tourism calendars, theme-park traffic, and fast-growing suburbs in Orange, Seminole, Osceola, and Polk.",
      "challenges": [
        "Tourism-season congestion",
        "New-construction HOA rules"
      ],
      "countySlugs": [
        "orange",
        "seminole",
        "osceola",
        "lake",
        "polk",
        "brevard",
        "volusia",
        "sumter"
      ],
      "ctaLabel": "Explore Central Florida"
    },
    {
      "id": "northeast-jax",
      "name": "Northeast Florida / Jacksonville",
      "shortName": "NE Florida",
      "blurb": "Jacksonville metro sprawl, military presence, and Atlantic coastal communities north of Central Florida.",
      "challenges": [
        "Military PCS calendars",
        "Long suburban portal-to-portal time"
      ],
      "countySlugs": [
        "duval",
        "st-johns",
        "clay",
        "nassau",
        "flagler",
        "putnam",
        "baker"
      ],
      "ctaLabel": "Explore Northeast Florida"
    },
    {
      "id": "southwest",
      "name": "Southwest Florida",
      "shortName": "SW Florida",
      "blurb": "Fort Myers–Naples corridors, seasonal residents, and Gulf Coast HOAs in Lee and Collier.",
      "challenges": [
        "Snowbird-season demand spikes",
        "Gulf storm timing flexibility"
      ],
      "countySlugs": [
        "lee",
        "collier",
        "charlotte",
        "hendry",
        "glades"
      ],
      "ctaLabel": "Explore Southwest Florida"
    },
    {
      "id": "panhandle",
      "name": "Northwest Florida / Panhandle",
      "shortName": "Panhandle",
      "blurb": "Beach towns, military bases, and Tallahassee government calendars from Escambia through Leon.",
      "challenges": [
        "Hurricane-season access risk",
        "Seasonal tourism windows on the coast"
      ],
      "countySlugs": [
        "escambia",
        "santa-rosa",
        "okaloosa",
        "walton",
        "bay",
        "holmes",
        "washington",
        "jackson",
        "calhoun",
        "gulf",
        "franklin",
        "liberty",
        "wakulla",
        "leon",
        "gadsden",
        "jefferson"
      ],
      "ctaLabel": "Explore the Panhandle"
    },
    {
      "id": "north-central",
      "name": "North & Interior Florida",
      "shortName": "North / Interior",
      "blurb": "Gainesville, Ocala, and interior counties with mixed college, rural, and small-metro patterns.",
      "challenges": [
        "Thinner crew coverage outside metros",
        "Heat and longer regional hauls"
      ],
      "countySlugs": [
        "alachua",
        "bradford",
        "columbia",
        "desoto",
        "dixie",
        "gilchrist",
        "hamilton",
        "hardee",
        "highlands",
        "indian-river",
        "lafayette",
        "levy",
        "madison",
        "marion",
        "martin",
        "okeechobee",
        "st-lucie",
        "suwannee",
        "taylor",
        "union"
      ],
      "ctaLabel": "Explore North / Interior Florida"
    }
  ],
  "costs": {
    "title": "Florida moving costs",
    "intro": "Florida pricing reflects condo accessorials, HOAs, heat/humidity, and seasonal demand (snowbirds and summer leases). Use ranges for planning, then run a personalized inventory through the calculator.",
    "methodology": {
      "title": "How we estimate Florida moving costs",
      "lastReviewed": "2026-07-22",
      "body": "These ranges are planning estimates, not quotes. They combine typical Florida local and intrastate patterns: home size, distance, elevators/COI, parking, HOAs, seasonality, and regional labor. Actual bids vary. Always compare written estimates from FDACS-registered movers for in-state work and FMCSA-authorized carriers for interstate work."
    },
    "ranges": [
      {
        "label": "Local studio / 1BR condo",
        "value": "$500–$1,800+",
        "note": "Elevators and COI soft costs common"
      },
      {
        "label": "Local 2–3BR house",
        "value": "$1,500–$4,500+",
        "note": "HOA windows add soft costs"
      },
      {
        "label": "Intrastate mid-size (e.g. Tampa ↔ Orlando)",
        "value": "$1,800–$5,500+",
        "note": "Season matters"
      },
      {
        "label": "Intrastate long (e.g. Miami ↔ Jacksonville)",
        "value": "$2,400–$7,500+",
        "note": "Full packing pushes the top"
      },
      {
        "label": "Typical 2-person crew (major metros)",
        "value": "$125–$210+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "South Florida high-rises often require elevator reservations and COI.",
      "HOA move windows are common across coastal and master-planned suburbs.",
      "Snowbird season (roughly Oct–Apr) can tighten calendars in SWFL and parts of the east coast.",
      "Hurricane season requires flexible load/delivery planning.",
      "Heat and humidity favor early starts most of the year."
    ]
  },
  "routes": {
    "title": "Popular Florida moving routes",
    "intro": "Florida is a major inbound destination with strong Northeast and Midwest origins. Interstate jobs need FMCSA authority; in-state corridors need FDACS-registered movers.",
    "migrationProfile": "inbound_dominant",
    "outbound": [
      {
        "label": "Florida → Georgia / Carolinas",
        "href": "/moving-to/georgia",
        "origins": "Jacksonville, Orlando, Tampa",
        "transit": "Often 1–2 day interstate corridors",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Common shorter outbound hops from North and Central Florida."
      },
      {
        "label": "Florida → Texas",
        "href": "/moving-to/texas",
        "origins": "Tampa, Orlando, South Florida",
        "transit": "Multi-day I-10 corridor",
        "planningNote": "Heat at both ends in summer.",
        "note": "Bi-directional Sun Belt traffic is common."
      }
    ],
    "inbound": [
      {
        "label": "Northeast → Florida",
        "href": "/local-movers/florida",
        "origins": "NY, NJ, PA, New England",
        "transit": "Multi-day; peak in fall/winter snowbird windows",
        "planningNote": "Book early for Oct–Apr coastal arrivals.",
        "note": "One of the highest-volume inbound patterns into Florida."
      },
      {
        "label": "Moving to Miami-Dade County",
        "href": "/local-movers/florida/miami-dade",
        "note": "Condo elevators, parking, and dense urban access."
      },
      {
        "label": "Moving to Orange County (Orlando)",
        "href": "/local-movers/florida/orange",
        "note": "Tourism traffic and fast-growth suburbs."
      },
      {
        "label": "Moving to Hillsborough County (Tampa)",
        "href": "/local-movers/florida/hillsborough",
        "note": "Bay area bridges and suburban HOAs."
      }
    ]
  },
  "challenges": {
    "title": "Florida-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Florida moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Condo elevators & COI",
        "detail": "South Florida and many coastal towers require Certificates of Insurance, reserved freight elevators, and fixed move windows. Collect building packets early."
      },
      {
        "title": "Hurricane season flexibility",
        "detail": "June–November storms can force reschedules. Build buffer into load and delivery dates, especially on barrier islands and coastal zips."
      },
      {
        "title": "Snowbird & seasonal demand",
        "detail": "Fall through spring increases demand in many coastal markets. Book popular windows early."
      },
      {
        "title": "HOA rules statewide",
        "detail": "Master-planned and gated communities often limit truck size, hours, and parking. Confirm rules before move day."
      },
      {
        "title": "Heat and humidity",
        "detail": "Early starts protect crews and belongings. Plan water and AC staging for electronics and wood furniture."
      },
      {
        "title": "Tourism traffic (Orlando / beaches)",
        "detail": "Theme-park and beach traffic can inflate portal-to-portal time. Prefer mid-week mornings when possible."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Florida moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Florida local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "How are movers regulated in Florida?",
      "answer": "Intrastate household movers and moving brokers must register with the Florida Department of Agriculture and Consumer Services (FDACS) under Chapter 507, Florida Statutes. Interstate moves require federal FMCSA operating authority and a USDOT number. Verify FDACS registration for in-state work and FMCSA SAFER for out-of-state work."
    },
    {
      "question": "How do I verify a Florida mover is registered?",
      "answer": "Use the FDACS business/license lookup or call 1-800-HELP-FLA. Match the legal name on your estimate to the registration record. For interstate moves, also verify USDOT / MC on FMCSA SAFER."
    },
    {
      "question": "When is the best time to move in Florida?",
      "answer": "It depends on market: snowbird season tightens coastal calendars roughly October–April, while summer still sees lease-driven peaks and heat. Hurricane season requires flexible dates. Mid-week mornings are often easier for elevators and traffic."
    },
    {
      "question": "Why do condo moves cost more in Florida?",
      "answer": "Elevator reservations, COI requirements, long carries from loading docks, and limited truck staging add labor time and soft costs — especially in South Florida high-rises."
    },
    {
      "question": "Do HOAs affect Florida moves?",
      "answer": "Yes. Many communities require approved hours, insurance certificates, and parking rules. Get the HOA or building packet before you book a crew."
    },
    {
      "question": "Is FDACS registration enough for a move to Georgia or New York?",
      "answer": "No. Crossing state lines generally requires FMCSA interstate authority. FDACS registration covers intrastate Florida household moving registration requirements — not interstate operating authority."
    }
  ],
  "trust": {
    "byline": "Curated by the Move Trust Hub editorial team",
    "lastReviewed": "2026-07-22",
    "methodology": "County guides combine public registration/licensing checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "FDACS — Moving companies",
        "href": "https://www.fdacs.gov/Business-Services/Moving-Companies"
      },
      {
        "label": "FDACS — Moving within Florida",
        "href": "https://www.fdacs.gov/Consumer-Resources/Consumer-Rights-and-Responsibilities/Moving-Within-Florida"
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
