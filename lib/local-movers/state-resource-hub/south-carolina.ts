import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 4):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: inbound_dominant
 * - Regulation mode: strong_state_regulator
 */
export const southCarolinaStateResourceHub: StateResourceHubPack = {
  "stateSlug": "south-carolina",
  "stateCode": "SC",
  "h1": "South Carolina Moving Resource Hub: Costs, ORS Class E Certificates & 46 County Guides",
  "metaTitle": "South Carolina Movers Guide 2026 — Costs, ORS Class E & 46 County Guides",
  "metaDescription": "Plan a move within, to, or from South Carolina. Compare local and intrastate costs, verify ORS Class E household goods certificates, browse 46 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for South Carolina moves in 2026 — typical costs, ORS Class E vs FMCSA rules, Upstate-to-Lowcountry regional guides, and tools to compare certificated movers without paid placements.",
  "trustBar": [
    "46 County Guides",
    "Verified Movers",
    "SC ORS & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within South Carolina",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To South Carolina",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From South Carolina",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how South Carolina markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My South Carolina Moving Cost",
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
    "title": "Why moving in South Carolina is different",
    "paragraphs": [
      "South Carolina is not one moving market. Greenville–Spartanburg growth corridors, Columbia Midlands logistics, Charleston historic access and humidity, Grand Strand seasonal congestion, and military cycles near Beaufort produce different access and labor profiles under one state name.",
      "Intrastate household goods carriers must hold a Class E Certificate of Public Convenience and Necessity through the Office of Regulatory Staff (ORS) / PSC framework. Interstate jobs need FMCSA authority. Hurricane season, HOA coastal communities, and I-26/I-85 corridors are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "South Carolina moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical South Carolina local and intrastate patterns; they are not bids. Always compare written estimates from Class E certificated movers for in-state work and FMCSA-authorized carriers for interstate work.",
    "stats": [
      {
        "label": "Typical Charleston / Greenville studio / 1BR",
        "value": "$500–$2,200+",
        "note": "Historic access and humidity matter"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$1,600–$5,000+",
        "note": "HOAs common in growth corridors"
      },
      {
        "label": "Intrastate corridor (e.g. Greenville ↔ Charleston)",
        "value": "$1,900–$6,000+",
        "note": "I-26 distance and season matter"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Hurricane season adds date risk"
      },
      {
        "label": "Top inbound origins",
        "value": "NY · NJ · PA · OH · NC · FL",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "46",
        "note": "Upstate and Lowcountry emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "South Carolina moving regulations & consumer protection",
    "intro": "South Carolina requires intrastate household goods carriers to hold a Class E Certificate under the Office of Regulatory Staff (ORS) transportation framework (with PSC certificate structures). Match the certificate to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside South Carolina)",
      "body": "If origin or destination is outside South Carolina, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A South Carolina Class E certificate alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within South Carolina)",
      "body": "Household goods carriers operating within South Carolina need Class E certification. Consumers should ask for the PSC/ORS certificate number, verify it with ORS, and confirm the number appears on vehicles. ORS Consumer Services also handles complaint history inquiries."
    },
    "verifySteps": [
      "Classify the job: entirely in South Carolina (Class E / ORS) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name and PSC/ORS certificate number from the written estimate.",
      "Intrastate: verify the certificate with ORS transportation / consumer services channels.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Get written estimates, insurance/valuation clarity, and inventory details.",
      "Avoid large cash deposits to unverified operators; use ORS complaint channels if needed."
    ],
    "protections": [
      {
        "title": "Class E certificate requirement",
        "detail": "Intrastate household goods carriers in South Carolina must hold Class E certification under the ORS/PSC transportation framework before operating legally."
      },
      {
        "title": "Certificate numbers on vehicles",
        "detail": "ORS consumer FAQs advise that certificate numbers should be located on each side of vehicles and can be verified by calling ORS."
      },
      {
        "title": "Complaint history",
        "detail": "Consumers can contact ORS Consumer Services about moving company complaint history before hiring."
      }
    ],
    "officialLinks": [
      {
        "label": "SC ORS — Class E (household goods)",
        "href": "https://ors.sc.gov/regulated-utilities/transportation/class-e",
        "external": true
      },
      {
        "label": "SC ORS — Transportation FAQs",
        "href": "https://ors.sc.gov/consumers/transportation/transportation-faqs",
        "external": true
      },
      {
        "label": "SC ORS — Transportation",
        "href": "https://ors.sc.gov/regulated-utilities/transportation",
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
    "disclaimer": "Licensing rules and certificate directories can change. Always verify current Class E / ORS status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "upstate",
      "name": "Upstate",
      "shortName": "Upstate",
      "blurb": "Greenville, Spartanburg, Anderson, and neighbors with growth suburbs and I-85 logistics.",
      "challenges": [
        "HOA windows in growth corridors",
        "I-85 congestion near metros"
      ],
      "countySlugs": [
        "greenville",
        "spartanburg",
        "anderson",
        "pickens",
        "oconee",
        "laurens",
        "cherokee",
        "union",
        "greenwood",
        "abbeville"
      ],
      "ctaLabel": "Explore Upstate"
    },
    {
      "id": "midlands",
      "name": "Midlands",
      "shortName": "Midlands",
      "blurb": "Columbia, Lexington, Aiken, and central counties with capital-city and military-adjacent mix.",
      "challenges": [
        "Heat and humidity productivity loss",
        "I-20 / I-26 corridor timing"
      ],
      "countySlugs": [
        "richland",
        "lexington",
        "fairfield",
        "newberry",
        "saluda",
        "edgefield",
        "aiken",
        "calhoun",
        "kershaw",
        "sumter",
        "lee",
        "clarendon",
        "orangeburg",
        "barnwell",
        "bamberg",
        "allendale",
        "mccormick"
      ],
      "ctaLabel": "Explore Midlands"
    },
    {
      "id": "lowcountry",
      "name": "Lowcountry",
      "shortName": "Lowcountry",
      "blurb": "Charleston, Beaufort, and Lowcountry counties with historic access, humidity, and coastal HOAs.",
      "challenges": [
        "Historic district access and parking",
        "Hurricane-season date risk"
      ],
      "countySlugs": [
        "charleston",
        "berkeley",
        "dorchester",
        "beaufort",
        "jasper",
        "colleton",
        "hampton"
      ],
      "ctaLabel": "Explore Lowcountry"
    },
    {
      "id": "pee-dee-grand-strand",
      "name": "Pee Dee & Grand Strand",
      "shortName": "Pee Dee / Grand Strand",
      "blurb": "Myrtle Beach, Florence, and Pee Dee counties with tourism peaks and longer rural approaches.",
      "challenges": [
        "Summer tourism congestion",
        "Confirm coverage for inland addresses"
      ],
      "countySlugs": [
        "horry",
        "georgetown",
        "florence",
        "marion",
        "dillon",
        "marlboro",
        "darlington",
        "chesterfield",
        "williamsburg",
        "lancaster",
        "chester",
        "york"
      ],
      "ctaLabel": "Explore Pee Dee / Grand Strand"
    }
  ],
  "costs": {
    "title": "South Carolina moving costs",
    "intro": "South Carolina pricing reflects Upstate and Charleston labor markets, coastal HOAs, humidity, and long I-26 hauls. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate South Carolina moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical South Carolina local and intrastate patterns: home size, distance, stairs, parking, HOAs, humidity, hurricane-season risk, and regional labor. Actual bids vary under Class E frameworks. Always compare written estimates from certificated movers for in-state work and FMCSA-authorized carriers for interstate work."
    },
    "ranges": [
      {
        "label": "Charleston / Greenville studio / 1BR",
        "value": "$500–$2,200+",
        "note": "Historic and multi-unit access vary"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,600–$4,800+",
        "note": "HOAs common"
      },
      {
        "label": "Intrastate mid-size (e.g. Columbia ↔ Greenville)",
        "value": "$1,700–$5,000+",
        "note": "Season matters"
      },
      {
        "label": "Intrastate long (e.g. Greenville ↔ Charleston)",
        "value": "$2,000–$6,500+",
        "note": "I-26 distance drives hours"
      },
      {
        "label": "Typical 2–3 person crew (major metros)",
        "value": "$115–$210+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Charleston historic districts constrain truck length and parking.",
      "Coastal HOAs restrict elevator and loading windows.",
      "Humidity and heat slow outdoor labor in summer.",
      "Hurricane season can force last-minute date changes.",
      "Tourism peaks on the Grand Strand congest roads and lodging for crews."
    ]
  },
  "routes": {
    "title": "Popular South Carolina moving routes",
    "intro": "South Carolina is a major inbound Southeast destination with strong Northeast origins into Charleston, Greenville, and the Grand Strand, plus large Upstate–Lowcountry internal flows. Interstate jobs need FMCSA authority; in-state corridors need Class E certificated movers.",
    "migrationProfile": "inbound_dominant",
    "outbound": [
      {
        "label": "South Carolina → Florida",
        "href": "/moving-to/florida",
        "origins": "Upstate, Midlands, Lowcountry",
        "transit": "I-95 / I-26 multi-day",
        "planningNote": "Confirm FMCSA authority end-to-end.",
        "note": "Common Southeast lifestyle corridor."
      },
      {
        "label": "South Carolina → North Carolina / Georgia",
        "href": "/local-movers/north-carolina",
        "origins": "Upstate, Lowcountry",
        "transit": "Often same-day or next-day interstate",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Short cross-border metro moves are common."
      },
      {
        "label": "South Carolina → Northeast return trips",
        "href": "/local-movers/new-york",
        "origins": "Charleston, Greenville, Grand Strand",
        "transit": "Multi-day I-95",
        "planningNote": "Bi-directional traffic with strong SC inbound.",
        "note": "Often paired with inbound Northeast origin moves."
      }
    ],
    "inbound": [
      {
        "label": "Northeast → South Carolina",
        "href": "/local-movers/south-carolina/charleston",
        "origins": "NY, NJ, PA, OH",
        "transit": "Multi-day I-95",
        "planningNote": "High-volume inbound into Lowcountry and Upstate.",
        "note": "Confirm interstate FMCSA authority."
      },
      {
        "label": "Moving to Charleston County",
        "href": "/local-movers/south-carolina/charleston",
        "note": "Historic access, humidity, and coastal HOAs."
      },
      {
        "label": "Moving to Greenville County",
        "href": "/local-movers/south-carolina/greenville",
        "note": "Upstate growth suburbs and I-85 logistics."
      },
      {
        "label": "Moving to Horry County (Myrtle Beach)",
        "href": "/local-movers/south-carolina/horry",
        "note": "Tourism peaks and seasonal congestion."
      }
    ]
  },
  "challenges": {
    "title": "South Carolina-specific moving challenges & tips",
    "intro": "These issues show up constantly on real South Carolina moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Charleston historic access",
        "detail": "Narrow streets, limited truck length, and parking rules are common. Share approach photos and request smaller trucks when needed."
      },
      {
        "title": "Hurricane-season risk",
        "detail": "June–November storms can force reschedules. Build flexible dates for coastal moves."
      },
      {
        "title": "Coastal HOA windows",
        "detail": "Beaufort, Charleston, and Horry communities often restrict loading hours. Get rules in writing before booking."
      },
      {
        "title": "Grand Strand tourism peaks",
        "detail": "Summer traffic around Myrtle Beach can double transit time. Avoid Friday arrivals when possible."
      },
      {
        "title": "Class E certificate verification",
        "detail": "Confirm the exact legal name and PSC/ORS Class E certificate before deposits on in-state work."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate South Carolina moves."
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
      "description": "Interstate-ready planning checklist you can adapt for South Carolina local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do South Carolina movers need a Class E certificate?",
      "answer": "Yes. Intrastate household goods carriers generally need a Class E Certificate under the ORS/PSC transportation framework. Interstate moves require FMCSA authority."
    },
    {
      "question": "How do I verify a South Carolina mover?",
      "answer": "Ask for the PSC/ORS certificate number and verify it with ORS. Certificate numbers should also appear on vehicles. For out-of-state legs, verify USDOT / MC on FMCSA SAFER."
    },
    {
      "question": "How much does a local Charleston or Greenville move cost?",
      "answer": "Planning ranges often fall around $500–$2,200+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is a Greenville-to-Charleston move intrastate?",
      "answer": "Yes — both ends are in South Carolina, so you generally need a Class E certificated household goods carrier."
    },
    {
      "question": "When is peak moving season in South Carolina?",
      "answer": "Statewide peak is typically May–September. Hurricane season can add date risk for coastal moves."
    },
    {
      "question": "Does a move from Charlotte, NC into York County need FMCSA authority?",
      "answer": "Yes. Crossing state lines generally requires active FMCSA operating authority even for short hops."
    }
  ],
  "trust": {
    "byline": "Move Trust Hub editorial research",
    "lastReviewed": "2026-07-23",
    "methodology": "County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "SC ORS — Class E household goods",
        "href": "https://ors.sc.gov/regulated-utilities/transportation/class-e"
      },
      {
        "label": "SC ORS — Transportation FAQs",
        "href": "https://ors.sc.gov/consumers/transportation/transportation-faqs"
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
