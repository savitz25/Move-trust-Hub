import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 8):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: inbound_dominant
 * - Regulation mode: strong_state_regulator
 */
export const hawaiiStateResourceHub: StateResourceHubPack = {
  "stateSlug": "hawaii",
  "stateCode": "HI",
  "h1": "Hawaii Moving Resource Hub: Costs, PUC Motor Carrier Certificates & 5 County Guides",
  "metaTitle": "Hawaii Movers Guide 2026 — Costs, PUC Certificates & 5 Island County Guides",
  "metaDescription": "Plan a move within, to, or from Hawaii. Compare inter-island and local costs, verify Hawaii PUC household goods motor carrier certificates, browse 5 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Hawaii moves in 2026 — typical costs, PUC vs FMCSA rules, Oahu-to-Neighbor Island guides, and tools to compare certificated movers without paid placements.",
  "trustBar": [
    "5 County Guides",
    "Verified Movers",
    "HI PUC & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Hawaii",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Hawaii",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Hawaii",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Hawaii markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Hawaii Moving Cost",
    "href": "/moving-calculator"
  },
  "secondaryCta": {
    "label": "Find & Compare Movers",
    "href": "/companies"
  },
  "tertiaryCta": {
    "label": "Explore Islands & Counties",
    "href": "#hub-regions"
  },
  "whyDifferent": {
    "title": "Why moving in Hawaii is different",
    "paragraphs": [
      "Hawaii is not one moving market. Honolulu high-rises and tight streets, Maui tourism congestion, Hawaii Island long rural drives, Kauai access constraints, and inter-island barge/air logistics produce different labor profiles under one state name — with only five counties mapping to the major islands.",
      "Companies moving household goods within Hawaii must hold a Hawaii Public Utilities Commission Motor Carrier Certificate of Public Convenience and Necessity for the household goods classification. Interstate (mainland) jobs need FMCSA authority. Humidity, trade-wind rain, military cycles, and pier/air schedules are planning inputs — then open the island and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Hawaii moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Hawaii local and inter-island patterns; they are not bids. Always compare written estimates from PUC-certificated movers for in-state work and FMCSA-authorized carriers for mainland work.",
    "stats": [
      {
        "label": "Typical Honolulu studio / 1BR",
        "value": "$700–$3,200+",
        "note": "Elevators, stairs, and parking dominate"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$2,200–$7,500+",
        "note": "Access and humidity matter"
      },
      {
        "label": "Inter-island mid-size",
        "value": "$2,500–$9,000+",
        "note": "Barge/air and packing drive the spread"
      },
      {
        "label": "Peak season",
        "value": "May–September + winter holidays",
        "note": "Tourism and military cycles also peak"
      },
      {
        "label": "Top mainland origins",
        "value": "CA · WA · TX · AZ · NV",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "5",
        "note": "Oahu emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "Hawaii moving regulations & consumer protection",
    "intro": "Hawaii requires for-hire household goods motor carriers operating within the state to hold a Public Utilities Commission Motor Carrier Certificate of Public Convenience and Necessity covering the household goods classification. Match the certificate to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (mainland or outside Hawaii)",
      "body": "If origin or destination is outside Hawaii, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A Hawaii PUC motor carrier certificate alone does not authorize mainland interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Hawaii, including inter-island)",
      "body": "The Hawaii PUC regulates property motor carriers, including household goods classifications, through certification/licensing, ratemaking, and business regulation. Carriers need appropriate CPCN authority for the islands and commodity classes they serve. Consumers should confirm the PUC certificate and get written estimates before hiring."
    },
    "verifySteps": [
      "Classify the job: entirely in Hawaii / inter-island (PUC motor carrier) vs mainland leg (FMCSA / USDOT).",
      "Copy the exact legal name and PUC number from the written estimate.",
      "Intrastate: confirm Hawaii PUC household goods motor carrier certificate for the islands served.",
      "Mainland: look up USDOT / MC on FMCSA SAFER.",
      "Ask about barge/air schedules, container packing, and humidity-sensitive items early.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "PUC motor carrier CPCN",
        "detail": "Hawaii PUC regulates passenger and property motor carriers, including household goods classifications, through certification and licensing."
      },
      {
        "title": "Ratemaking and business regulation",
        "detail": "The Commission’s motor carrier functions include certification/licensing, ratemaking, and business regulation for regulated carriers."
      },
      {
        "title": "Written estimates",
        "detail": "Insist on written estimates covering stairs, elevators, long carries, packing, and any inter-island freight components before signing."
      }
    ],
    "officialLinks": [
      {
        "label": "Hawaii PUC — Motor carriers",
        "href": "https://puc.hawaii.gov/motor_carriers/",
        "external": true
      },
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
      }
    ],
    "disclaimer": "Licensing rules and certificate directories can change. Always verify current PUC motor carrier status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "oahu",
      "name": "Oahu (Honolulu County)",
      "shortName": "Oahu",
      "blurb": "Honolulu high-rises, military housing, and dense street logistics across Oahu.",
      "challenges": [
        "Elevators, tight streets, and parking",
        "Military and tourism peaks"
      ],
      "countySlugs": [
        "honolulu"
      ],
      "ctaLabel": "Explore Oahu"
    },
    {
      "id": "maui-county",
      "name": "Maui County",
      "shortName": "Maui County",
      "blurb": "Maui, Molokai, and Lanai approaches with tourism congestion and inter-island logistics.",
      "challenges": [
        "Tourism-season road congestion",
        "Confirm inter-island packing plans"
      ],
      "countySlugs": [
        "maui",
        "kalawao"
      ],
      "ctaLabel": "Explore Maui County"
    },
    {
      "id": "hawaii-island",
      "name": "Hawaii Island (Big Island)",
      "shortName": "Hawaii Island",
      "blurb": "Hilo–Kona long drives, lava-zone access questions, and rural approaches.",
      "challenges": [
        "Long portal-to-portal distances on-island",
        "Confirm rural driveway access"
      ],
      "countySlugs": [
        "hawaii"
      ],
      "ctaLabel": "Explore Hawaii Island"
    },
    {
      "id": "kauai",
      "name": "Kauai",
      "shortName": "Kauai",
      "blurb": "Garden Island access with thinner local fleets and weather exposure.",
      "challenges": [
        "Confirm mover coverage early",
        "Rain and narrow road access"
      ],
      "countySlugs": [
        "kauai"
      ],
      "ctaLabel": "Explore Kauai"
    }
  ],
  "costs": {
    "title": "Hawaii moving costs",
    "intro": "Hawaii pricing reflects Honolulu labor markets, elevator buildings, humidity packing, and inter-island freight components. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Hawaii moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical Hawaii local and inter-island patterns: home size, elevators, parking, packing for humidity, barge/air components, and regional labor. Actual bids vary under PUC frameworks. Always compare written estimates from PUC-certificated movers for in-state work and FMCSA-authorized carriers for mainland work."
    },
    "ranges": [
      {
        "label": "Honolulu studio / 1BR",
        "value": "$700–$3,200+",
        "note": "Elevators and parking dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$2,000–$6,500+",
        "note": "Access and packing matter"
      },
      {
        "label": "Inter-island mid-size",
        "value": "$2,500–$9,000+",
        "note": "Barge/air schedules drive timing"
      },
      {
        "label": "Mainland long-distance (planning band)",
        "value": "Highly variable",
        "note": "Confirm FMCSA authority; ocean transit time"
      },
      {
        "label": "Typical 2–3 person crew (Oahu)",
        "value": "$150–$280+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "High-rise elevators and tight Honolulu streets add labor time.",
      "Inter-island moves add barge/air and container packing costs.",
      "Humidity-sensitive packing is often required.",
      "Military and tourism seasons compress available crews.",
      "Mainland moves are interstate and need FMCSA authority."
    ]
  },
  "routes": {
    "title": "Popular Hawaii moving routes",
    "intro": "Hawaii sees strong mainland inbound flows (especially California), constant inter-island traffic, and dense Oahu internal moves. Mainland jobs need FMCSA authority; in-state and inter-island jobs need PUC-certificated household goods motor carriers.",
    "migrationProfile": "inbound_dominant",
    "outbound": [
      {
        "label": "Hawaii → California / Mainland",
        "href": "/local-movers/california",
        "origins": "Oahu, Maui, Hawaii Island",
        "transit": "Ocean + multi-day inland",
        "planningNote": "Confirm FMCSA authority; plan long transit times.",
        "note": "Primary mainland outbound corridor."
      },
      {
        "label": "Inter-island (e.g. Oahu → Maui or Hawaii Island)",
        "href": "/local-movers/hawaii/maui",
        "origins": "Statewide",
        "transit": "Barge/air schedules",
        "planningNote": "Still intrastate — confirm PUC certificate.",
        "note": "Common island-to-island household goods moves."
      }
    ],
    "inbound": [
      {
        "label": "Mainland → Hawaii",
        "href": "/local-movers/hawaii/honolulu",
        "origins": "CA, WA, TX, AZ",
        "transit": "Ocean + local delivery",
        "planningNote": "High-volume inbound into Oahu.",
        "note": "Confirm interstate FMCSA authority."
      },
      {
        "label": "Moving to Honolulu County (Oahu)",
        "href": "/local-movers/hawaii/honolulu",
        "note": "High-rises, elevators, and tight street staging."
      },
      {
        "label": "Moving to Maui County",
        "href": "/local-movers/hawaii/maui",
        "note": "Tourism congestion and inter-island logistics."
      }
    ]
  },
  "challenges": {
    "title": "Hawaii-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Hawaii moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Honolulu high-rise access",
        "detail": "Elevator reservations, certificates of insurance, and tight loading windows are common. Start paperwork early."
      },
      {
        "title": "Inter-island barge and air schedules",
        "detail": "Neighbor Island moves depend on freight calendars. Build extra days into your plan."
      },
      {
        "title": "Humidity packing",
        "detail": "Moisture-sensitive items need better packing materials and sealed containers. Discuss packing options early."
      },
      {
        "title": "Mainland ocean transit",
        "detail": "Moves to/from the continental U.S. are interstate and take longer than lower-48 truck hauls. Confirm FMCSA authority and transit windows."
      },
      {
        "title": "PUC certificate verification",
        "detail": "Confirm the exact legal name holds a Hawaii PUC household goods motor carrier certificate before deposits on pure in-state work."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Hawaii moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Hawaii local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do Hawaii movers need a PUC certificate?",
      "answer": "Yes. For-hire household goods motor carriers operating within Hawaii generally need a Hawaii PUC Motor Carrier Certificate of Public Convenience and Necessity covering household goods. Mainland interstate moves require FMCSA authority."
    },
    {
      "question": "Is an Oahu-to-Maui move interstate?",
      "answer": "No — both ends are in Hawaii, so it is intrastate (inter-island). Confirm the mover’s PUC certificate covers the islands and services you need."
    },
    {
      "question": "How much does a local Honolulu move cost?",
      "answer": "Planning ranges often fall around $700–$3,200+ for a studio/1BR and more for larger homes, driven by elevators and parking. Use the calculator, then compare written estimates."
    },
    {
      "question": "Does a California-to-Hawaii move need FMCSA authority?",
      "answer": "Yes. Mainland-to-Hawaii moves are interstate. Confirm active FMCSA operating authority and a USDOT number."
    },
    {
      "question": "When is peak moving season in Hawaii?",
      "answer": "Demand is often high May–September and around winter holidays, with additional military and tourism-related spikes."
    },
    {
      "question": "Why are inter-island moves more expensive?",
      "answer": "They often include barge or air freight components, extra packing, and schedule constraints — not just truck labor hours."
    }
  ],
  "trust": {
    "byline": "Move Trust Hub editorial research",
    "lastReviewed": "2026-07-23",
    "methodology": "County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "Hawaii PUC — Motor carriers",
        "href": "https://puc.hawaii.gov/motor_carriers/"
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
