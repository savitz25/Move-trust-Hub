import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 4):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: balanced
 * - Regulation mode: strong_state_regulator
 */
export const marylandStateResourceHub: StateResourceHubPack = {
  "stateSlug": "maryland",
  "stateCode": "MD",
  "h1": "Maryland Moving Resource Hub: Costs, HHG Registration & 23 County Guides",
  "metaTitle": "Maryland Movers Guide 2026 — Costs, Labor HHG Registration & 23 County Guides",
  "metaDescription": "Plan a move within, to, or from Maryland. Compare local and intrastate costs, understand Maryland Department of Labor household goods mover registration, browse county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Maryland moves in 2026 — typical costs, state HHG registration vs FMCSA rules, Baltimore-to-Eastern Shore regional guides, and tools to compare registered movers without paid placements.",
  "trustBar": [
    "23 County Guides",
    "Verified Movers",
    "MD HHG & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Maryland",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Maryland",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Maryland",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Maryland markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Maryland Moving Cost",
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
    "title": "Why moving in Maryland is different",
    "paragraphs": [
      "Maryland is not one moving market. Baltimore row homes and alley staging, Montgomery and Prince George’s HOA suburbs, Annapolis and Anne Arundel waterfront access, Western Maryland mountain approaches, and Eastern Shore bridge logistics produce different access and labor profiles under one state name.",
      "Maryland law requires household goods movers using commercial motor vehicles to register with the Department of Labor Division of Occupational and Professional Licensing. Interstate jobs need FMCSA authority. Beltway congestion, military and federal workforce cycles, and Bay Bridge timing are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Maryland moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Maryland local and intrastate patterns; they are not bids. Always compare written estimates and confirm registration or FMCSA authority for your route.",
    "stats": [
      {
        "label": "Typical Baltimore studio / 1BR",
        "value": "$600–$2,500+",
        "note": "Row homes, stairs, and alley staging"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$1,900–$6,000+",
        "note": "DC-suburb HOAs common"
      },
      {
        "label": "Intrastate corridor (e.g. Montgomery ↔ Baltimore)",
        "value": "$1,800–$5,500+",
        "note": "Beltway timing matters"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Federal/lease cycles can create spikes"
      },
      {
        "label": "Top outbound destinations",
        "value": "FL · NC · VA · PA · SC",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "23",
        "note": "DC suburbs and Baltimore emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "Maryland moving regulations & consumer protection",
    "intro": "Maryland requires household goods movers that provide moving services with a commercial motor vehicle to register with the Department of Labor Division of Occupational and Professional Licensing. Match registration to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Maryland)",
      "body": "If origin or destination is outside Maryland, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. Maryland household goods mover registration alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Maryland)",
      "body": "Under Maryland’s household goods mover registration law, a person may not provide or offer household goods moving services in the state using a commercial motor vehicle (as defined in federal CMV rules) unless registered as a household goods mover with the Department of Labor. Confirm active registration and get written estimates before hiring."
    },
    "verifySteps": [
      "Classify the job: entirely in Maryland (state HHG registration) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name from the written estimate.",
      "Intrastate: confirm Maryland Department of Labor household goods mover registration for the company.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Get written estimates, insurance/valuation clarity, and inventory details.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "Household goods mover registration",
        "detail": "Maryland Department of Labor publishes household goods movers registration requirements covering loading, packing, transporting, and related services for a fee using a commercial motor vehicle."
      },
      {
        "title": "Commercial motor vehicle threshold",
        "detail": "Registration applies to household goods moving services using a commercial motor vehicle as defined in federal motor carrier safety regulations — ask carriers how their vehicles and credentials map to your job."
      },
      {
        "title": "Written estimates",
        "detail": "Insist on written estimates and clarity on stairs, elevators, long carries, and packing before signing — especially on row-home and HOA jobs."
      }
    ],
    "officialLinks": [
      {
        "label": "MD Labor — Household Goods Movers Registration",
        "href": "https://labor.maryland.gov/license/hgm/",
        "external": true
      },
      {
        "label": "MD Labor — Registration information",
        "href": "https://labor.maryland.gov/license/hgm/hhmreginfo.shtml",
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
    "disclaimer": "Licensing rules and enforcement dates can change. Always verify current Maryland household goods mover registration or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "baltimore-central",
      "name": "Baltimore & Central Maryland",
      "shortName": "Baltimore / Central",
      "blurb": "Baltimore City/County, Anne Arundel, Howard, and neighbors with row homes, suburbs, and I-95 corridors.",
      "challenges": [
        "Row homes, stairs, and alley staging",
        "Beltway and harbor congestion"
      ],
      "countySlugs": [
        "baltimore",
        "anne-arundel",
        "howard",
        "harford",
        "carroll"
      ],
      "ctaLabel": "Explore Baltimore / Central"
    },
    {
      "id": "dc-suburbs",
      "name": "DC Suburbs & Southern Maryland",
      "shortName": "DC Suburbs",
      "blurb": "Montgomery, Prince George’s, Charles, Calvert, and St. Mary’s with high-rises, HOAs, and federal workforce cycles.",
      "challenges": [
        "Elevators, HOA windows, and security desks",
        "Capital Beltway timing"
      ],
      "countySlugs": [
        "montgomery",
        "prince-georges",
        "charles",
        "calvert",
        "st-marys"
      ],
      "ctaLabel": "Explore DC Suburbs"
    },
    {
      "id": "western-md",
      "name": "Western Maryland",
      "shortName": "Western MD",
      "blurb": "Frederick, Hagerstown, and mountain counties with longer regional hauls and winter weather.",
      "challenges": [
        "Mountain weather and hill access",
        "Distance from Baltimore–DC fleets"
      ],
      "countySlugs": [
        "frederick",
        "washington",
        "allegany",
        "garrett"
      ],
      "ctaLabel": "Explore Western Maryland"
    },
    {
      "id": "eastern-shore",
      "name": "Eastern Shore",
      "shortName": "Eastern Shore",
      "blurb": "Bay Bridge approaches and Shore counties with seasonal tourism and thinner local coverage in places.",
      "challenges": [
        "Bay Bridge timing and tourism peaks",
        "Confirm coverage for remote Shore addresses"
      ],
      "countySlugs": [
        "cecil",
        "kent",
        "queen-annes",
        "talbot",
        "caroline",
        "dorchester",
        "wicomico",
        "somerset",
        "worcester"
      ],
      "ctaLabel": "Explore Eastern Shore"
    }
  ],
  "costs": {
    "title": "Maryland moving costs",
    "intro": "Maryland pricing reflects DC-suburb labor markets, Baltimore row-home access, HOAs, and Bay Bridge logistics. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Maryland moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical Maryland local and intrastate patterns: home size, distance, stairs/elevators, parking, HOAs, Beltway congestion, and regional labor. Actual bids vary. Always compare written estimates from registered movers for in-state work and FMCSA-authorized carriers for interstate work."
    },
    "ranges": [
      {
        "label": "Baltimore studio / 1BR",
        "value": "$600–$2,500+",
        "note": "Stairs and alley staging dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,800–$5,500+",
        "note": "DC-suburb HOAs common"
      },
      {
        "label": "Intrastate mid-size (e.g. Montgomery ↔ Anne Arundel)",
        "value": "$1,800–$5,500+",
        "note": "Beltway timing matters"
      },
      {
        "label": "Intrastate long (e.g. Montgomery ↔ Eastern Shore or Western MD)",
        "value": "$2,200–$7,000+",
        "note": "Bridge and mountain logistics"
      },
      {
        "label": "Typical 2–3 person crew (DC suburbs)",
        "value": "$140–$250+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Row homes and narrow alleys add carry labor in Baltimore.",
      "HOA windows are common in Montgomery and Prince George’s.",
      "Beltway congestion changes portal-to-portal time.",
      "Bay Bridge timing affects Shore jobs.",
      "Peak May–September and federal lease cycles fill crews early."
    ]
  },
  "routes": {
    "title": "Popular Maryland moving routes",
    "intro": "Maryland sits between Northeast origins and Sun Belt destinations, with heavy DC-metro churn and short interstate hops into Virginia, Pennsylvania, and Delaware. Interstate jobs need FMCSA authority; in-state corridors need properly registered household goods movers.",
    "migrationProfile": "balanced",
    "outbound": [
      {
        "label": "Maryland → Florida",
        "href": "/moving-to/florida",
        "origins": "DC suburbs, Baltimore",
        "transit": "Multi-day I-95",
        "planningNote": "Book early for winter arrivals.",
        "note": "High-volume Mid-Atlantic-to-Florida corridor."
      },
      {
        "label": "Maryland → Carolinas",
        "href": "/local-movers/north-carolina",
        "origins": "Montgomery, Prince George’s, Anne Arundel",
        "transit": "I-95 multi-day",
        "planningNote": "HOAs at destination common.",
        "note": "Popular lifestyle outbound destinations."
      },
      {
        "label": "Maryland → Virginia / Pennsylvania",
        "href": "/local-movers/virginia",
        "origins": "DC suburbs, Baltimore, Western MD",
        "transit": "Often same-day interstate",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Short cross-border metro moves are common."
      }
    ],
    "inbound": [
      {
        "label": "Moving to Montgomery County",
        "href": "/local-movers/maryland/montgomery",
        "note": "HOAs, elevators, and Beltway logistics."
      },
      {
        "label": "Moving to Baltimore County",
        "href": "/local-movers/maryland/baltimore",
        "note": "Suburban mix and older multi-story stock."
      },
      {
        "label": "Moving to Prince George’s County",
        "href": "/local-movers/maryland/prince-georges",
        "note": "DC-adjacent suburbs and multi-unit access."
      }
    ]
  },
  "challenges": {
    "title": "Maryland-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Maryland moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Baltimore row homes",
        "detail": "Narrow streets and alley staging often mean long carries and limited truck length. Share approach photos early."
      },
      {
        "title": "DC-suburb HOA windows",
        "detail": "Montgomery and Prince George’s communities often restrict elevator and loading hours. Get rules in writing before booking."
      },
      {
        "title": "Bay Bridge and Shore timing",
        "detail": "Eastern Shore jobs depend on bridge congestion and tourism peaks. Avoid Friday arrivals when possible."
      },
      {
        "title": "Short interstate hops",
        "detail": "Moves into Virginia, DC, Pennsylvania, or Delaware are interstate. Confirm FMCSA authority even for short hauls."
      },
      {
        "title": "Registration verification",
        "detail": "Confirm the exact legal name holds current Maryland household goods mover registration before deposits on in-state work."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Maryland moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Maryland local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do Maryland movers need to register with the state?",
      "answer": "Yes. Maryland generally requires household goods movers using a commercial motor vehicle to register with the Department of Labor. Interstate moves require FMCSA authority."
    },
    {
      "question": "Is the Maryland PSC the household goods regulator?",
      "answer": "Maryland PSC Transportation primarily oversees passenger-for-hire carriers. Household goods mover registration is handled through the Department of Labor Division of Occupational and Professional Licensing."
    },
    {
      "question": "How much does a local Montgomery County move cost?",
      "answer": "Planning ranges often fall around $600–$2,500+ for smaller units and more for larger suburban homes, driven by elevators, HOAs, and labor markets. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is a Baltimore-to-Ocean City move intrastate?",
      "answer": "Yes — both ends are in Maryland, so you generally need a properly registered household goods mover for commercial CMV operations."
    },
    {
      "question": "When is peak moving season in Maryland?",
      "answer": "Statewide peak is typically May–September. Federal and lease cycles in the DC suburbs can create additional spikes."
    },
    {
      "question": "Does a Bethesda-to-Arlington move need FMCSA authority?",
      "answer": "Yes. Crossing into Virginia is interstate even if the distance is short. Confirm active FMCSA operating authority and a USDOT number."
    }
  ],
  "trust": {
    "byline": "Move Trust Hub editorial research",
    "lastReviewed": "2026-07-23",
    "methodology": "County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "MD Labor — Household Goods Movers Registration",
        "href": "https://labor.maryland.gov/license/hgm/"
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
