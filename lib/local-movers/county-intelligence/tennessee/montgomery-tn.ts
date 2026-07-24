import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeTnPack } from '@/lib/local-movers/county-intelligence/tennessee/tn-shared';

export const montgomeryCountyTnIntelligence: CountyIntelligencePack = finalizeTnPack({
  countySlug: "montgomery",
  hubTitle: "Montgomery County Moving Intelligence Hub",
  eyebrow: "Montgomery · Clarksville, Fort Campbell PCS & military household patterns",
  h1: "Moving in Montgomery County: Fort Campbell PCS Timelines, Clarksville Access & I-24 Logistics",
  heroOpener: "Montgomery County is a military-timeline market: Fort Campbell PCS orders compress surveys and load days; Clarksville multi-family corridors absorb high turnover; and I-24 / US-41A logistics dominate pairs that look local on a map. A base-adjacent apartment, a downtown Clarksville walk-up, a Sango HOA two-story, and a rural-edge house do not share truck access or order-driven timing. This hub is for Montgomery — not Nashville suburb overflow copy and not a renamed Cumberland NC page.",
  heroCredibility:
    'TDOR motor carrier intrastate authority for in-state TN moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-24 · US-41A · TN-374 · 101st Airborne Pkwy · Fort Campbell Blvd",
  whatMakesDifferent: {
    title: "What makes moving in Montgomery County different",
    intro: "PCS-driven calendars and base-adjacent housing turnover — Army installation logistics on the TN/KY border, not Nashville music-core.",
    bullets: [
      {
        title: "PCS orders rewrite booking lead time",
        detail: "Military household moves often have fixed report dates. Flexible civilian weekend windows are not the default.",
      },
      {
        title: "High multi-family turnover near base-access corridors",
        detail: "Elevators, parking, and lease-end clusters stack around permanent-change cycles.",
      },
      {
        title: "I-24 and US-41A define portal time",
        detail: "Cross-town and regional pairs burn clock at peak.",
      },
      {
        title: "Kentucky border pairs are routine",
        detail: "Clarify Tennessee vs Kentucky destinations for TDOR vs FMCSA assumptions.",
      },
      {
        title: "Montgomery is not a Nashville suburb ring county",
        detail: "Military timelines dominate more than HOA-only growth patterns.",
      },
      {
        title: 'Intrastate TN rules vs interstate authority',
        detail:
          'Moves entirely within Tennessee by for-hire carriers are generally subject to Tennessee Department of Revenue (TDOR) motor carrier intrastate authority requirements as applicable. Interstate legs need active FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: "Montgomery access zones",
  zonesIntro: "Plan by base-adjacent multi-family, central Clarksville, Sango/growth edges, and rural approaches.",
  zones: [
    {
      id: "base-adjacent",
      name: "Fort Campbell–adjacent multi-family",
      shortName: "Base-adjacent",
      neighborhoods: ["Fort Campbell Blvd corridors","101st Airborne Pkwy multi-family","Base housing-adjacent rentals"],
      housingTypes: "Multi-family, townhomes, military-workforce rentals",
      challenges: ["PCS lease-end waves","Access/ID rules","Tight parking"],
      moverTips: "Confirm access requirements early. Align to order dates. Photo elevators and parking.",
      cityKeywords: ["fort campbell","clarksville","101st","fort campbell blvd"],
    },
    {
      id: "central-clarksville",
      name: "Central Clarksville corridors",
      shortName: "Central Clarksville",
      neighborhoods: ["Downtown Clarksville","Madison Street corridors","Older SFH pockets","Multi-family near retail"],
      housingTypes: "Older SFH, multi-family, townhomes",
      challenges: ["Mixed access types","Arterial congestion","Month-end turnover"],
      moverTips: "Prefer mid-week early starts when orders allow. Confirm unit access type.",
      cityKeywords: ["clarksville","madison street","downtown"],
    },
    {
      id: "sango-growth",
      name: "Sango & southern growth",
      shortName: "Sango growth",
      neighborhoods: ["Sango","TN-374 multi-family","Southern HOA villages"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["HOA rules","Longer empty miles from base-edge yards","Peak arterial congestion"],
      moverTips: "Collect HOA packets. Price long pairs honestly.",
      cityKeywords: ["sango","south clarksville"],
    },
    {
      id: "rural-edges",
      name: "Rural & eastern Montgomery edges",
      shortName: "Rural edges",
      neighborhoods: ["Woodlawn edges","Rural driveway lots","Eastern tracts"],
      housingTypes: "SFH, rural-edge lots",
      challenges: ["Long empty miles","Soft surfaces after rain","Limited alternate routes"],
      moverTips: "Survey driveway access. Prefer early starts for long pairs.",
      cityKeywords: ["woodlawn","rural montgomery"],
    }
  ],
  costDrivers: {
    title: "What drives Montgomery County moving costs",
    intro: "PCS timing pressure, multi-family access, and I-24 empty miles drive quotes.",
    drivers: [
      { title: "Compressed PCS timelines", detail: "Rush calendars raise peak pricing risk." },
      { title: "Multi-family elevators and parking", detail: "Base-adjacent apartments add labor and wait time." },
      { title: "I-24 / US-41A congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "Cross-border empty miles", detail: "Kentucky destinations change staging and authority assumptions." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$400–$1,200+", note: "Higher near base multi-family peaks" },
      { label: "2–3BR apartment or modest SFH", value: "$1,200–$3,400+", note: "PCS rush windows trend up" },
      { label: "3–4+ BR / long local / interstate start", value: "$2,200–$7,200+", note: "Interstate PCS legs are full household goods jobs" },
      { label: "Typical 2-person crew rate", value: "$100–$170+/hr", note: "Portal-to-portal for local legs" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Montgomery County",
    intro: "Military PCS seasons and family calendars stack demand tightly.",
    items: [
      { title: "PCS peak seasons", detail: "High-volume windows fill crews first. Book to order dates immediately." },
      { title: "Best flexible windows: mid-week early mornings", detail: "Reduce arterial pain when orders allow." },
      { title: "Month-end multi-family turns", detail: "Lease clusters near base corridors fill early." },
      { title: "Summer heat and storms", detail: "Prefer early starts; confirm weather contingency." }
    ],
  },
  specialized: [
    {
      id: "fort-campbell-pcs",
      title: "Fort Campbell PCS logistics module",
      intro: "Montgomery estimates fail when military report dates or base-access rules are ignored.",
      bullets: ["Align survey, pack, and delivery to PCS timelines.","Confirm IDs and access rules for base-adjacent multi-family.","Demand written inventories and valuation discussions early.","Price I-24 and US-41A pairs portal-to-portal.","Clarify Tennessee vs Kentucky destinations.","Verify TDOR for in-state-only legs and FMCSA for interstate PCS shipments."],
    },
  ],
  relocation: {
    title: "Considering a move to Montgomery County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Clarksville-Montgomery County School System is the primary public K–12 system. Assignment is address-based; military families should confirm zoning for off-post housing." },
          { title: "Turnover and capacity", detail: "High military mobility can affect enrollment patterns. Ask about calendars and capacity when touring." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Tennova and other facilities serve Clarksville corridors; military beneficiaries also navigate TRICARE networks. Confirm coverage." },
          { title: "What relocators should do", detail: "Map drive times from base-adjacent housing. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Base-adjacent multi-family density", detail: "High turnover product near major boulevards." },
          { title: "Military housing decisions", detail: "On-post vs off-post choices change access rules and commute patterns." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Base-adjacent convenience", detail: "Short commute with multi-family move-day logistics." },
          { title: "Central Clarksville pattern", detail: "Mixed stock with arterial congestion." },
          { title: "Sango growth pattern", detail: "HOA product with longer portal time toward base gates." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Military installation, healthcare, education, retail, and logistics shape employment." },
          { title: "Commute realism", detail: "I-24, US-41A, and Fort Campbell Blvd peaks are real. Test drive peak routes." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "Military-community identity", detail: "Montgomery rhythms follow installation calendars more than Nashville suburb rings." },
          { title: "Climate", detail: "Hot humid summers and storms. Plan outdoor staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Montgomery County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify TDOR intrastate authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Montgomery County — official site", href: "https://mcgtn.org/", external: true },
      { label: "City of Clarksville", href: "https://www.cityofclarksville.com/", external: true },
      { label: "CMCSS schools", href: "https://www.cmcss.net/", external: true },
      { label: "Fort Campbell (official)", href: "https://home.army.mil/campbell/", external: true, note: "Installation information; confirm contractor access rules" },
      { label: "TDOT traffic resources", href: "https://www.tn.gov/tdot.html", external: true }
    ],
  },
  directoryHint: "Prefer PCS-fluent crews for Fort Campbell timelines; multi-family experience on base-adjacent corridors. Verify TDOR for in-state legs and FMCSA for interstate PCS.",
  lastReviewed: '2026-07-24',
});
