import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 9):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: outbound_dominant
 * - Regulation mode: limited_or_none
 */
export const maineStateResourceHub: StateResourceHubPack = {
  "stateSlug": "maine",
  "stateCode": "ME",
  "h1": "Maine Moving Resource Hub: Costs, FMCSA Checks & 16 County Guides",
  "metaTitle": "Maine Movers Guide 2026 — Costs, Insurance Checks & 16 County Guides",
  "metaDescription": "Plan a move within, to, or from Maine. Compare local and intrastate costs, understand Maine’s limited dedicated HHG licensing versus FMCSA interstate rules, browse 16 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Maine moves in 2026 — typical costs, FMCSA-first verification for interstate work, Portland-to-Aroostook regional guides, and tools to compare movers without paid placements.",
  "trustBar": [
    "16 County Guides",
    "Verified Movers",
    "FMCSA-Focused Checks",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Maine",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Maine",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Maine",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Maine markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Maine Moving Cost",
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
    "title": "Why moving in Maine is different",
    "paragraphs": [
      "Maine is not one moving market. Portland multi-unit and coastal access, midcoast tourism peaks, Bangor corridors, and long Aroostook hauls produce different access and labor profiles under one state name — with only 16 counties but huge distances north to south.",
      "Maine does not require a separate intrastate household goods mover license comparable to Massachusetts DPU or New Hampshire frameworks in many consumer sources. Interstate jobs need FMCSA authority. For in-state work, insist on insurance certificates, written estimates, and clear legal names. Winter ice, ferry logistics, and thin northern coverage are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Maine moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Maine local and intrastate patterns; they are not bids. Always compare written estimates and confirm FMCSA authority for any out-of-state leg.",
    "stats": [
      {
        "label": "Typical Portland studio / 1BR",
        "value": "$550–$2,400+",
        "note": "Stairs, elevators, and winter staging"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$1,700–$5,200+",
        "note": "Coastal access and HOAs vary"
      },
      {
        "label": "Intrastate long (e.g. Portland ↔ Bangor or Aroostook)",
        "value": "$2,000–$7,500+",
        "note": "Distance and weather drive hours"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Coastal tourism compresses summer crews"
      },
      {
        "label": "Top outbound destinations",
        "value": "FL · NH · MA · NC · SC · TX",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "16",
        "note": "Southern Maine emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "limited_or_none",
    "title": "Maine moving regulations & consumer protection",
    "intro": "Maine does not maintain a dedicated household-goods consumer permit board for most local movers according to commonly cited BMV and industry summaries. Interstate work still requires FMCSA authority. Verify insurance and contracts carefully before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Maine)",
      "body": "If origin or destination is outside Maine, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A Maine business registration alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Maine)",
      "body": "Without a strong state HHG permit directory, consumers should insist on written estimates, cargo and liability insurance certificates, and a clear legal business name for pure in-state jobs. Confirm any municipal parking or street-permit rules in Portland and coastal towns separately."
    },
    "verifySteps": [
      "Classify the job: entirely in Maine vs any out-of-state leg (FMCSA / USDOT required).",
      "Copy the exact legal name from the written estimate.",
      "Interstate: look up USDOT / MC on FMCSA SAFER before deposits.",
      "Intrastate: request insurance certificates, written inventory estimates, and business credentials.",
      "Confirm coastal, ferry, and northern driveway access for your addresses.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "No separate intrastate HHG license (typical guidance)",
        "detail": "Consumer sources commonly state Maine does not require a separate intrastate household goods mover license — do not invent a permit number that does not exist."
      },
      {
        "title": "FMCSA for interstate moves",
        "detail": "Any move that crosses a state line is generally under federal household goods rules — verify active FMCSA authority on SAFER."
      },
      {
        "title": "Written estimates and insurance",
        "detail": "Without a strong state HHG license lookup, written estimates and cargo/liability insurance certificates are your primary consumer controls on local jobs."
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
    "disclaimer": "Regulatory frameworks can change. Always verify current commercial credentials and FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "southern-me",
      "name": "Southern Maine",
      "shortName": "Southern ME",
      "blurb": "Cumberland, York, and southern counties with Portland multi-unit logistics and NH-border hops.",
      "challenges": [
        "Elevators, tight streets, and winter ice",
        "Short NH hops need FMCSA authority"
      ],
      "countySlugs": [
        "cumberland",
        "york",
        "sagadahoc",
        "androscoggin"
      ],
      "ctaLabel": "Explore Southern Maine"
    },
    {
      "id": "midcoast-central",
      "name": "Midcoast & Central Maine",
      "shortName": "Midcoast / Central",
      "blurb": "Kennebec, midcoast, and central counties with tourism peaks and mixed rural access.",
      "challenges": [
        "Summer tourism congestion",
        "Confirm coverage for rural addresses"
      ],
      "countySlugs": [
        "kennebec",
        "knox",
        "lincoln",
        "waldo",
        "somerset",
        "franklin",
        "oxford"
      ],
      "ctaLabel": "Explore Midcoast / Central"
    },
    {
      "id": "downeast-north",
      "name": "Downeast & Northern Maine",
      "shortName": "Downeast / North",
      "blurb": "Penobscot, Hancock, Washington, and Aroostook with long hauls and thinner fleets.",
      "challenges": [
        "Long empty miles from Portland fleets",
        "Winter weather and remote access"
      ],
      "countySlugs": [
        "penobscot",
        "hancock",
        "washington",
        "piscataquis",
        "aroostook"
      ],
      "ctaLabel": "Explore Downeast / North"
    }
  ],
  "costs": {
    "title": "Maine moving costs",
    "intro": "Maine pricing reflects Portland labor markets, winter weather, coastal access, and long north–south hauls. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Maine moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical Maine local and intrastate patterns: home size, distance, stairs/elevators, parking, winter weather, coastal access, and regional labor. Actual bids vary with season and tourism peaks. Always compare written estimates and confirm FMCSA authority for any out-of-state leg."
    },
    "ranges": [
      {
        "label": "Portland studio / 1BR",
        "value": "$550–$2,400+",
        "note": "Stairs and winter access dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,700–$5,000+",
        "note": "Coastal access varies"
      },
      {
        "label": "Intrastate mid-size (e.g. Portland ↔ Augusta)",
        "value": "$1,600–$5,000+",
        "note": "Season matters"
      },
      {
        "label": "Intrastate long (e.g. Portland ↔ Bangor or Aroostook)",
        "value": "$2,200–$7,500+",
        "note": "Distance and weather push hours"
      },
      {
        "label": "Typical 2–3 person crew (Portland metro)",
        "value": "$125–$230+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Winter ice and snow force flexible dates statewide.",
      "Portland multi-unit buildings add stair and elevator time.",
      "Coastal tourism compresses summer crews.",
      "Northern and Downeast jobs include long empty miles.",
      "Short hops into NH, MA, or Canada-adjacent logistics need careful authority checks."
    ]
  },
  "routes": {
    "title": "Popular Maine moving routes",
    "intro": "Maine sees strong outbound Sun Belt and New England flows, short interstate hops into New Hampshire and Massachusetts, and large Portland–Bangor internal traffic. Interstate jobs need FMCSA authority; local jobs need careful insurance and contract verification.",
    "migrationProfile": "outbound_dominant",
    "outbound": [
      {
        "label": "Maine → Florida / Carolinas",
        "href": "/moving-to/florida",
        "origins": "Portland, midcoast",
        "transit": "Multi-day I-95",
        "planningNote": "Book early for winter arrivals.",
        "note": "High-volume Northeast snowbird corridor."
      },
      {
        "label": "Maine → New Hampshire / Massachusetts",
        "href": "/local-movers/new-hampshire",
        "origins": "York, Cumberland",
        "transit": "Often same-day interstate",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Common short cross-border metro moves."
      },
      {
        "label": "Maine → Texas / Arizona",
        "href": "/local-movers/texas",
        "origins": "Statewide",
        "transit": "Multi-day interstate",
        "planningNote": "Confirm FMCSA authority end-to-end.",
        "note": "Popular long-haul outbound destinations."
      }
    ],
    "inbound": [
      {
        "label": "Moving to Cumberland County (Portland)",
        "href": "/local-movers/maine/cumberland",
        "note": "Multi-unit access and coastal logistics."
      },
      {
        "label": "Moving to York County",
        "href": "/local-movers/maine/york",
        "note": "Southern suburbs and NH-border patterns."
      },
      {
        "label": "Moving to Penobscot County (Bangor)",
        "href": "/local-movers/maine/penobscot",
        "note": "Central hub for Downeast and northern approaches."
      }
    ]
  },
  "challenges": {
    "title": "Maine-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Maine moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Winter ice and snow",
        "detail": "Driveways and coastal roads can ice over for days. Build weather buffers November–March."
      },
      {
        "title": "Portland multi-unit access",
        "detail": "Stairs, elevators, and tight streets dominate. Share approach photos early."
      },
      {
        "title": "Limited state HHG permit regime",
        "detail": "Without a dedicated consumer HHG license lookup, demand insurance certificates, written estimates, and FMCSA checks for any border hop."
      },
      {
        "title": "Coastal tourism peaks",
        "detail": "Summer congestion can double transit time midcoast. Avoid Friday arrivals when possible."
      },
      {
        "title": "Northern empty miles",
        "detail": "Aroostook and Downeast jobs create long empty miles from Portland fleets. Confirm coverage early."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Maine moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Maine local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do Maine movers need a special household goods license?",
      "answer": "Consumer sources commonly state Maine does not require a separate intrastate household goods mover license. Consumers should still verify insurance, written contracts, and FMCSA authority for any out-of-state leg."
    },
    {
      "question": "How do I verify a Maine mover for an interstate move?",
      "answer": "Look up USDOT / MC authority on FMCSA SAFER for the legal name on your estimate. Also request certificates of insurance and written inventory estimates."
    },
    {
      "question": "How much does a local Portland move cost?",
      "answer": "Planning ranges often fall around $550–$2,400+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is a Portland-to-Bangor move interstate?",
      "answer": "No — both ends are in Maine. Focus on weather windows, packing, and inventory-based written estimates for the haul."
    },
    {
      "question": "When is peak moving season in Maine?",
      "answer": "Statewide peak is typically May–September. Coastal tourism can create additional summer demand."
    },
    {
      "question": "Does a Kittery-to-Portsmouth move need FMCSA authority?",
      "answer": "Yes. Crossing into New Hampshire is interstate even for short hops. Confirm active FMCSA operating authority."
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
