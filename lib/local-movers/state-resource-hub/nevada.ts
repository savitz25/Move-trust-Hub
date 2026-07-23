import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 7):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: inbound_dominant
 * - Regulation mode: strong_state_regulator
 */
export const nevadaStateResourceHub: StateResourceHubPack = {
  "stateSlug": "nevada",
  "stateCode": "NV",
  "h1": "Nevada Moving Resource Hub: Costs, NTA CPCN Certificates & 17 County Guides",
  "metaTitle": "Nevada Movers Guide 2026 — Costs, NTA Certificates & 17 County Guides",
  "metaDescription": "Plan a move within, to, or from Nevada. Compare local and intrastate costs, verify Nevada Transportation Authority household goods CPCN certificates, browse 17 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Nevada moves in 2026 — typical costs, NTA vs FMCSA rules, Las Vegas-to-Reno regional guides, and tools to compare certificated movers without paid placements.",
  "trustBar": [
    "17 County Guides",
    "Verified Movers",
    "NTA & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Nevada",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Nevada",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Nevada",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Nevada markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Nevada Moving Cost",
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
    "title": "Why moving in Nevada is different",
    "paragraphs": [
      "Nevada is not one moving market. Las Vegas multi-unit elevators and HOA suburbs, Reno–Tahoe high-desert logistics, rural mining-corridor hauls, and extreme summer heat produce different access and labor profiles under one state name.",
      "Intrastate household goods movers must hold a Certificate of Public Convenience and Necessity (CPCN) from the Nevada Transportation Authority (NTA). Interstate jobs need FMCSA authority. Summer heat, monsoon storms, and long empty miles between Las Vegas and Reno are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Nevada moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Nevada local and intrastate patterns; they are not bids. Always compare written estimates from NTA-certificated movers for in-state work and FMCSA-authorized carriers for interstate work.",
    "stats": [
      {
        "label": "Typical Las Vegas studio / 1BR",
        "value": "$500–$2,200+",
        "note": "Elevators, HOAs, and heat matter"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$1,700–$5,200+",
        "note": "Clark County HOAs common"
      },
      {
        "label": "Intrastate corridor (e.g. Las Vegas ↔ Reno)",
        "value": "$2,200–$7,500+",
        "note": "Long desert haul; season matters"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Extreme heat affects productivity"
      },
      {
        "label": "Top inbound origins",
        "value": "CA · AZ · TX · UT · WA",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "17",
        "note": "Clark and Washoe emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "Nevada moving regulations & consumer protection",
    "intro": "Nevada requires intrastate household goods movers to obtain a Certificate of Public Convenience and Necessity (CPCN) from the Nevada Transportation Authority. Match the certificate to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Nevada)",
      "body": "If origin or destination is outside Nevada, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. An NTA household goods CPCN alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Nevada)",
      "body": "NTA regulates household goods movers under NRS/NAC 706. Carriers apply for CPCN authority with insurance, business registration, and proposed tariffs. Consumers can verify active certificates through NTA certificate/tariff resources. Unlicensed operation can trigger impound and significant fines."
    },
    "verifySteps": [
      "Classify the job: entirely in Nevada (NTA CPCN) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name from the written estimate.",
      "Intrastate: confirm an active NTA household goods CPCN for the company.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Get written estimates consistent with posted tariff expectations.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "NTA CPCN requirement",
        "detail": "Intrastate household goods movers in Nevada must hold a Certificate of Public Convenience and Necessity from the Nevada Transportation Authority."
      },
      {
        "title": "Active certificates database",
        "detail": "NTA publishes certificate and tariff resources so consumers can verify certificated local movers before hiring."
      },
      {
        "title": "Enforcement against unlicensed movers",
        "detail": "Nevada law authorizes significant penalties for operating without a CPCN, including vehicle impound and fines."
      }
    ],
    "officialLinks": [
      {
        "label": "Nevada Transportation Authority",
        "href": "https://nta.nv.gov/",
        "external": true
      },
      {
        "label": "NTA — Tariffs and certificates",
        "href": "https://nta.nv.gov/Carriers/Tariffs-Certificates/",
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
    "disclaimer": "Licensing rules and directories can change. Always verify current NTA CPCN status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "las-vegas-south",
      "name": "Las Vegas & Southern Nevada",
      "shortName": "Southern NV",
      "blurb": "Clark County multi-unit elevators, HOA suburbs, and southern desert counties with extreme heat.",
      "challenges": [
        "Elevators, HOAs, and summer heat",
        "Monsoon and dust-storm delays"
      ],
      "countySlugs": [
        "clark",
        "nye",
        "lincoln",
        "esmeralda"
      ],
      "ctaLabel": "Explore Southern Nevada"
    },
    {
      "id": "reno-north",
      "name": "Reno, Carson & Northern Nevada",
      "shortName": "Northern NV",
      "blurb": "Washoe, Carson City, Douglas, and northern corridors with Tahoe approaches and high-desert winters.",
      "challenges": [
        "Mountain weather and Tahoe congestion",
        "Winter ice on higher elevations"
      ],
      "countySlugs": [
        "washoe",
        "storey",
        "carson-city",
        "douglas",
        "lyon",
        "churchill",
        "pershing",
        "humboldt"
      ],
      "ctaLabel": "Explore Northern Nevada"
    },
    {
      "id": "rural-nv",
      "name": "Rural & Eastern Nevada",
      "shortName": "Rural / Eastern NV",
      "blurb": "Elko and rural counties with long portal-to-portal distances and thinner local coverage.",
      "challenges": [
        "Long empty miles between metros",
        "Confirm mover coverage early"
      ],
      "countySlugs": [
        "elko",
        "eureka",
        "lander",
        "white-pine",
        "mineral"
      ],
      "ctaLabel": "Explore Rural / Eastern Nevada"
    }
  ],
  "costs": {
    "title": "Nevada moving costs",
    "intro": "Nevada pricing reflects Las Vegas labor markets, heat, HOAs, and the long Las Vegas–Reno haul. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Nevada moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical Nevada local and intrastate patterns: home size, distance, elevators, parking, HOAs, heat, and regional labor. Actual bids vary under NTA tariff frameworks for certificated carriers. Always compare written estimates from NTA-certificated movers for in-state work and FMCSA-authorized carriers for interstate work."
    },
    "ranges": [
      {
        "label": "Las Vegas studio / 1BR",
        "value": "$500–$2,200+",
        "note": "Elevators and heat dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,700–$5,000+",
        "note": "Clark County HOAs common"
      },
      {
        "label": "Intrastate mid-size (e.g. Las Vegas local long carry)",
        "value": "$1,600–$4,800+",
        "note": "Access drives hours"
      },
      {
        "label": "Intrastate long (e.g. Las Vegas ↔ Reno)",
        "value": "$2,400–$8,000+",
        "note": "Desert distance and season matter"
      },
      {
        "label": "Typical 2–3 person crew (Las Vegas)",
        "value": "$125–$230+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Extreme summer heat slows outdoor labor — prefer early starts.",
      "Clark County HOAs restrict elevator and loading windows.",
      "Las Vegas–Reno is a full-day haul for many crews.",
      "Monsoon storms can force same-day reschedules.",
      "Short hops into CA, AZ, or UT are interstate even when nearby."
    ]
  },
  "routes": {
    "title": "Popular Nevada moving routes",
    "intro": "Nevada is a major inbound West destination with strong California origins into Las Vegas and Reno, plus large internal desert hauls. Interstate jobs need FMCSA authority; in-state corridors need NTA-certificated household goods movers.",
    "migrationProfile": "inbound_dominant",
    "outbound": [
      {
        "label": "Nevada → California",
        "href": "/local-movers/california",
        "origins": "Las Vegas, Reno",
        "transit": "Often same-day or next-day interstate",
        "planningNote": "Still interstate — confirm FMCSA; CA legs may need BHGS.",
        "note": "Highest-volume bi-directional corridor."
      },
      {
        "label": "Nevada → Arizona / Utah",
        "href": "/local-movers/arizona",
        "origins": "Southern NV, Northern NV",
        "transit": "I-15 multi-day or same-day near border",
        "planningNote": "Confirm FMCSA authority end-to-end.",
        "note": "Common regional Sun Belt hops."
      },
      {
        "label": "Nevada → Texas / Colorado",
        "href": "/local-movers/texas",
        "origins": "Las Vegas metro",
        "transit": "Multi-day interstate",
        "planningNote": "Book early for seasonal peaks.",
        "note": "Popular job and lifestyle outbound routes."
      }
    ],
    "inbound": [
      {
        "label": "California → Nevada",
        "href": "/local-movers/nevada/clark",
        "origins": "LA, Bay Area, San Diego",
        "transit": "I-15 / I-80 multi-day or next-day",
        "planningNote": "High-volume inbound into Clark and Washoe.",
        "note": "Confirm interstate FMCSA authority."
      },
      {
        "label": "Moving to Clark County (Las Vegas)",
        "href": "/local-movers/nevada/clark",
        "note": "Multi-unit elevators, HOAs, and extreme heat."
      },
      {
        "label": "Moving to Washoe County (Reno)",
        "href": "/local-movers/nevada/washoe",
        "note": "High-desert logistics and Tahoe approaches."
      }
    ]
  },
  "challenges": {
    "title": "Nevada-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Nevada moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Extreme summer heat",
        "detail": "Las Vegas outdoor labor slows dramatically June–August. Prefer early start times and shade staging."
      },
      {
        "title": "Clark County HOAs",
        "detail": "Many communities restrict elevator and loading hours. Get rules in writing before booking."
      },
      {
        "title": "Las Vegas–Reno distance",
        "detail": "Cross-state-internal hauls are long desert days. Confirm overnight plans and fuel time on estimates."
      },
      {
        "title": "Short interstate hops into California",
        "detail": "Border jobs are still interstate. Confirm FMCSA authority even for a one-hour haul."
      },
      {
        "title": "NTA CPCN verification",
        "detail": "Confirm the exact legal name holds an active NTA household goods CPCN before deposits on pure in-state work."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Nevada moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Nevada local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do Nevada movers need an NTA certificate?",
      "answer": "Yes. Intrastate household goods movers generally need a Certificate of Public Convenience and Necessity (CPCN) from the Nevada Transportation Authority. Interstate moves require FMCSA authority."
    },
    {
      "question": "How do I verify a Nevada mover?",
      "answer": "Use NTA certificate/tariff resources and match the legal name on your written estimate. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER."
    },
    {
      "question": "How much does a local Las Vegas move cost?",
      "answer": "Planning ranges often fall around $500–$2,200+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is a Las Vegas-to-Reno move intrastate?",
      "answer": "Yes — both ends are in Nevada, so you generally need an NTA-certificated household goods mover."
    },
    {
      "question": "When is peak moving season in Nevada?",
      "answer": "Statewide peak is typically May–September. Extreme heat can affect summer productivity."
    },
    {
      "question": "Does a Las Vegas-to-Los Angeles move need FMCSA authority?",
      "answer": "Yes. Crossing into California is interstate. Confirm active FMCSA operating authority and a USDOT number."
    }
  ],
  "trust": {
    "byline": "Move Trust Hub editorial research",
    "lastReviewed": "2026-07-23",
    "methodology": "County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "Nevada Transportation Authority",
        "href": "https://nta.nv.gov/"
      },
      {
        "label": "NTA — Tariffs and certificates",
        "href": "https://nta.nv.gov/Carriers/Tariffs-Certificates/"
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
