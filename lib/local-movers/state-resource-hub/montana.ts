import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 9):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: outbound_dominant
 * - Regulation mode: limited_or_none
 */
export const montanaStateResourceHub: StateResourceHubPack = {
  "stateSlug": "montana",
  "stateCode": "MT",
  "h1": "Montana Moving Resource Hub: Costs, FMCSA Checks & 56 County Guides",
  "metaTitle": "Montana Movers Guide 2026 — Costs, Insurance Checks & 56 County Guides",
  "metaDescription": "Plan a move within, to, or from Montana. Compare local and intrastate costs, understand Montana’s lighter HHG licensing framework versus FMCSA interstate rules, browse 56 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Montana moves in 2026 — typical costs, FMCSA-first verification for interstate work, Missoula-to-Billings regional guides, and tools to compare movers without paid placements.",
  "trustBar": [
    "56 County Guides",
    "Verified Movers",
    "FMCSA-Focused Checks",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Montana",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Montana",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Montana",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Montana markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Montana Moving Cost",
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
    "title": "Why moving in Montana is different",
    "paragraphs": [
      "Montana is not one moving market. Missoula and Flathead valley logistics, Bozeman growth HOAs, Great Falls corridors, Billings eastside hauls, and long empty miles across the Hi-Line produce different access and labor profiles under one state name.",
      "Montana’s household-goods licensing framework is lighter than many states after recent motor-carrier policy changes — there is no California-style dedicated consumer HHG permit directory for most local jobs. Interstate work still needs FMCSA authority. Winter passes, wildfire season, and thin rural coverage are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Montana moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Montana local and intrastate patterns; they are not bids. Always compare written estimates and confirm FMCSA authority for any out-of-state leg.",
    "stats": [
      {
        "label": "Typical Bozeman / Missoula studio / 1BR",
        "value": "$500–$2,300+",
        "note": "Access, stairs, and season matter"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$1,700–$5,500+",
        "note": "Growth-suburb HOAs in the west"
      },
      {
        "label": "Intrastate long (e.g. Missoula ↔ Billings)",
        "value": "$2,400–$8,500+",
        "note": "Distance and mountain weather drive hours"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Winter forces flexible dates"
      },
      {
        "label": "Top outbound destinations",
        "value": "WA · CO · AZ · TX · ID · CA",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "56",
        "note": "Western MT emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "limited_or_none",
    "title": "Montana moving regulations & consumer protection",
    "intro": "Montana does not currently operate a consumer-facing household-goods permit regime comparable to Nebraska PSC or Oregon ODOT. Recent motor-carrier policy changes reduced state HHG-specific licensing for many local operators. Interstate jobs still require FMCSA authority. Verify insurance and contracts carefully before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Montana)",
      "body": "If origin or destination is outside Montana, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A Montana business registration alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Montana)",
      "body": "Montana historically regulated certain motor carriers of household goods through Public Service Commission certificate frameworks; policy changes in recent years have lightened dedicated HHG licensing for many local moves. Consumers should still insist on written estimates, cargo and liability insurance certificates, and a clear legal business name. MDT Motor Carrier Services remains relevant for commercial vehicle safety and permits."
    },
    "verifySteps": [
      "Classify the job: entirely in Montana vs any out-of-state leg (FMCSA / USDOT required).",
      "Copy the exact legal name from the written estimate.",
      "Interstate: look up USDOT / MC on FMCSA SAFER before deposits.",
      "Intrastate: request insurance certificates, written inventory estimates, and business credentials.",
      "Confirm mountain-pass and rural driveway access for your addresses.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "Lighter state HHG framework",
        "detail": "Consumer and compliance sources note Montana eliminated or reduced specific household-goods licensing requirements for many intrastate operators after 2023 policy changes — do not invent a permit number that does not exist."
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
        "label": "MDT — Motor Carrier Services",
        "href": "https://www.mdt.mt.gov/business/mcs/",
        "external": true
      },
      {
        "label": "Move Trust Hub — Verify a USDOT",
        "href": "/verify-dot"
      }
    ],
    "disclaimer": "Regulatory frameworks can change. Always verify current commercial credentials and FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "western-mt",
      "name": "Western Montana",
      "shortName": "Western MT",
      "blurb": "Missoula, Flathead, Bitterroot, and western valleys with mountain access and growth suburbs.",
      "challenges": [
        "Mountain weather and long carries",
        "Seasonal tourism congestion"
      ],
      "countySlugs": [
        "missoula",
        "flathead",
        "ravalli",
        "lake",
        "lincoln",
        "sanders",
        "mineral",
        "granite",
        "powell",
        "deer-lodge",
        "silver-bow",
        "beaverhead",
        "madison"
      ],
      "ctaLabel": "Explore Western Montana"
    },
    {
      "id": "southwestern-mt",
      "name": "Southwestern Montana",
      "shortName": "SW Montana",
      "blurb": "Bozeman, Livingston, and southwest growth corridors with HOAs and recreation peaks.",
      "challenges": [
        "Growth-suburb HOA windows",
        "Winter pass timing toward Yellowstone approaches"
      ],
      "countySlugs": [
        "gallatin",
        "park",
        "sweet-grass",
        "stillwater",
        "carbon",
        "jefferson",
        "broadwater",
        "meagher"
      ],
      "ctaLabel": "Explore Southwestern Montana"
    },
    {
      "id": "north-central-mt",
      "name": "North-Central Montana",
      "shortName": "North-Central",
      "blurb": "Great Falls, Helena, and north-central corridors with longer regional hauls.",
      "challenges": [
        "Wind and winter weather",
        "Confirm coverage for rural addresses"
      ],
      "countySlugs": [
        "cascade",
        "lewis-and-clark",
        "teton",
        "pondera",
        "toole",
        "liberty",
        "hill",
        "chouteau",
        "glacier",
        "blaine",
        "fergus",
        "judith-basin"
      ],
      "ctaLabel": "Explore North-Central Montana"
    },
    {
      "id": "eastern-mt",
      "name": "Eastern Montana",
      "shortName": "Eastern MT",
      "blurb": "Billings and eastern plains counties with long empty miles and thinner local fleets.",
      "challenges": [
        "Long portal-to-portal distances",
        "Confirm mover coverage early"
      ],
      "countySlugs": [
        "yellowstone",
        "big-horn",
        "rosebud",
        "custer",
        "powder-river",
        "carter",
        "fallon",
        "wibaux",
        "dawson",
        "richland",
        "roosevelt",
        "sheridan",
        "daniels",
        "valley",
        "mccone",
        "garfield",
        "phillips",
        "prairie",
        "treasure",
        "musselshell",
        "golden-valley",
        "wheatland",
        "petroleum"
      ],
      "ctaLabel": "Explore Eastern Montana"
    }
  ],
  "costs": {
    "title": "Montana moving costs",
    "intro": "Montana pricing reflects thin fleets, mountain weather, long empty miles, and growth markets in the west. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Montana moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical Montana local and intrastate patterns: home size, distance, stairs, parking, mountain weather, and regional labor. Actual bids vary widely with season and rural access. Always compare written estimates and confirm FMCSA authority for any out-of-state leg."
    },
    "ranges": [
      {
        "label": "Bozeman / Missoula studio / 1BR",
        "value": "$500–$2,300+",
        "note": "Access and season dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,700–$5,200+",
        "note": "HOAs in growth corridors"
      },
      {
        "label": "Intrastate mid-size (e.g. Missoula ↔ Helena)",
        "value": "$1,800–$5,500+",
        "note": "Weather windows matter"
      },
      {
        "label": "Intrastate long (e.g. Missoula ↔ Billings)",
        "value": "$2,500–$8,500+",
        "note": "Distance drives hours"
      },
      {
        "label": "Typical 2–3 person crew (western metros)",
        "value": "$120–$220+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Mountain passes can close or slow trucks in winter.",
      "Rural eastern jobs include long empty miles.",
      "Bozeman and Flathead growth create HOA and peak-season pressure.",
      "Wildfire-season air quality can delay summer outdoor work.",
      "Short hops into ID, WY, ND, or SD are interstate even when nearby."
    ]
  },
  "routes": {
    "title": "Popular Montana moving routes",
    "intro": "Montana sees outbound flows to Sun Belt and coastal states plus strong internal west–east hauls. Interstate jobs need FMCSA authority; local jobs need careful insurance and contract verification.",
    "migrationProfile": "outbound_dominant",
    "outbound": [
      {
        "label": "Montana → Washington / Idaho",
        "href": "/local-movers/washington",
        "origins": "Western MT",
        "transit": "Often next-day interstate",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Common short regional hops."
      },
      {
        "label": "Montana → Colorado / Arizona",
        "href": "/local-movers/colorado",
        "origins": "Bozeman, Missoula, Billings",
        "transit": "Multi-day interstate",
        "planningNote": "Confirm FMCSA authority end-to-end.",
        "note": "Popular lifestyle outbound destinations."
      },
      {
        "label": "Montana → Texas / California",
        "href": "/local-movers/texas",
        "origins": "Statewide metros",
        "transit": "Multi-day interstate",
        "planningNote": "Book early for seasonal peaks.",
        "note": "Long-haul outbound corridors."
      }
    ],
    "inbound": [
      {
        "label": "Moving to Gallatin County (Bozeman)",
        "href": "/local-movers/montana/gallatin",
        "note": "Growth suburbs and recreation-season peaks."
      },
      {
        "label": "Moving to Missoula County",
        "href": "/local-movers/montana/missoula",
        "note": "Valley access and mountain approaches."
      },
      {
        "label": "Moving to Yellowstone County (Billings)",
        "href": "/local-movers/montana/yellowstone",
        "note": "Eastern hub logistics and longer regional hauls."
      }
    ]
  },
  "challenges": {
    "title": "Montana-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Montana moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Mountain weather windows",
        "detail": "Passes and valley ice can shut down trucks. Build weather buffers October–April."
      },
      {
        "title": "Long empty miles",
        "detail": "West–east hauls create expensive empty miles. Get inventory-based written estimates."
      },
      {
        "title": "Lighter state HHG licensing",
        "detail": "Without a dedicated consumer HHG permit lookup, demand insurance certificates, written estimates, and FMCSA checks for any border hop."
      },
      {
        "title": "Growth-market HOAs",
        "detail": "Bozeman and Flathead suburbs often restrict elevator and loading hours. Get rules in writing."
      },
      {
        "title": "Wildfire-season air quality",
        "detail": "Summer smoke can delay outdoor work. Keep a backup date for July–September jobs."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Montana moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Montana local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do Montana movers need a special household goods license?",
      "answer": "Montana’s dedicated HHG licensing framework is lighter than many states after recent policy changes. Consumers should still verify insurance, written contracts, and FMCSA authority for any out-of-state leg."
    },
    {
      "question": "How do I verify a Montana mover for an interstate move?",
      "answer": "Look up USDOT / MC authority on FMCSA SAFER for the legal name on your estimate. Also request certificates of insurance and written inventory estimates."
    },
    {
      "question": "How much does a local Bozeman or Missoula move cost?",
      "answer": "Planning ranges often fall around $500–$2,300+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is a Missoula-to-Billings move interstate?",
      "answer": "No — both ends are in Montana. Focus on weather windows, packing, and inventory-based written estimates for the long haul."
    },
    {
      "question": "When is peak moving season in Montana?",
      "answer": "Statewide peak is typically May–September. Winter weather can force flexible dates for much of the rest of the year."
    },
    {
      "question": "Does a Missoula-to-Spokane move need FMCSA authority?",
      "answer": "Yes. Crossing into Washington is interstate. Confirm active FMCSA operating authority and a USDOT number."
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
        "label": "MDT — Motor Carrier Services",
        "href": "https://www.mdt.mt.gov/business/mcs/"
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
