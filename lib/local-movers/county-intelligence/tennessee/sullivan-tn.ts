import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeTnPack } from '@/lib/local-movers/county-intelligence/tennessee/tn-shared';

export const sullivanCountyTnIntelligence: CountyIntelligencePack = finalizeTnPack({
  countySlug: "sullivan",
  hubTitle: "Sullivan County Moving Intelligence Hub",
  eyebrow: "Sullivan · Kingsport/Bristol Tri-Cities regional patterns",
  h1: "Moving in Sullivan County: Kingsport Access, Bristol Edges & I-81 Logistics",
  heroOpener: "Sullivan County is a Tri-Cities regional market: Kingsport industrial-and-residential mix, Bristol edges that straddle state lines, Blountville and corridor multi-family, and I-81/I-26 logistics that are not Nashville suburb rings and not Knoxville campus density. A Kingsport multi-family unit, a Bristol TN home, a Blountville HOA two-story, and a rural-edge lot do not share truck access or empty-mile risk. This hub is for Sullivan — not a renamed Davidson or Knox page.",
  heroCredibility:
    'TDOR motor carrier intrastate authority for in-state TN moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-81 · I-26 · US-11W · US-23 · State of Franklin Rd corridors",
  whatMakesDifferent: {
    title: "What makes moving in Sullivan County different",
    intro: "Tri-Cities regional fabric with state-line edges — not Middle Tennessee growth rings or Sevier tourism peaks.",
    bullets: [
      {
        title: "I-81 / I-26 define regional portal time",
        detail: "Cross-town and cross-state pairs burn clock at peak.",
      },
      {
        title: "Kingsport mixes industrial-adjacent and residential stock",
        detail: "Access surveys matter more than ZIP labels.",
      },
      {
        title: "Bristol edges can mean Virginia border logistics",
        detail: "Clarify Tennessee vs Virginia destinations for TDOR vs FMCSA assumptions.",
      },
      {
        title: "Tri-Cities pairs are everyday regional work",
        detail: "Washington County TN and nearby markets change empty miles.",
      },
      {
        title: "Sullivan is not Nashville or Knoxville",
        detail: "Do not reuse music-core or UT campus copy here.",
      },
      {
        title: 'Intrastate TN rules vs interstate authority',
        detail:
          'Moves entirely within Tennessee by for-hire carriers are generally subject to Tennessee Department of Revenue (TDOR) motor carrier intrastate authority requirements as applicable. Interstate legs need active FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: "Sullivan access zones",
  zonesIntro: "Plan by Kingsport core, Bristol TN edges, Blountville/corridor multi-family, and rural edges.",
  zones: [
    {
      id: "kingsport",
      name: "Kingsport multi-family & residential corridors",
      shortName: "Kingsport",
      neighborhoods: ["Kingsport","Downtown Kingsport edges","Fort Henry Dr multi-family","Industrial-adjacent residential"],
      housingTypes: "SFH, multi-family, townhomes",
      challenges: ["Mixed access types","Arterial congestion","Industrial truck corridors"],
      moverTips: "Confirm unit access type. Prefer mid-week mornings. Survey industrial-edge staging carefully.",
      cityKeywords: ["kingsport","fort henry"],
    },
    {
      id: "bristol-tn",
      name: "Bristol TN edges & state-line approaches",
      shortName: "Bristol TN",
      neighborhoods: ["Bristol","State Street edges","Volunteer Pkwy multi-family","State-line residential"],
      housingTypes: "SFH, multi-family, townhomes",
      challenges: ["State-line address confusion","Cross-border portal time","Mixed access types"],
      moverTips: "Clarify Tennessee vs Virginia destinations on every estimate. Build border-pair buffer.",
      cityKeywords: ["bristol","volunteer pkwy","state street"],
    },
    {
      id: "blountville-corridor",
      name: "Blountville & airport/corridor multi-family",
      shortName: "Blountville / corridor",
      neighborhoods: ["Blountville","Airport-adjacent multi-family","US-11W corridors","HOA villages"],
      housingTypes: "Multi-family, HOA SFH, townhomes",
      challenges: ["Corridor congestion","HOA rules","Longer empty miles between cities"],
      moverTips: "Collect HOA packets. Prefer early starts for long inter-city pairs.",
      cityKeywords: ["blountville","tri-cities airport","us-11w"],
    },
    {
      id: "rural-edges",
      name: "Rural Sullivan edges",
      shortName: "Rural edges",
      neighborhoods: ["Rural driveway lots","Northern and eastern tracts"],
      housingTypes: "SFH, rural-edge lots",
      challenges: ["Long empty miles","Soft surfaces after rain","Limited alternate routes"],
      moverTips: "Survey driveway access. Prefer early starts for long pairs.",
      cityKeywords: ["rural sullivan"],
    }
  ],
  costDrivers: {
    title: "What drives Sullivan County moving costs",
    intro: "Regional empty miles and mixed industrial-residential access drive quotes.",
    drivers: [
      { title: "I-81 / I-26 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "Industrial-adjacent staging friction", detail: "Time risk near commercial corridors." },
      { title: "Cross-border empty miles", detail: "Virginia destinations change staging and authority assumptions." },
      { title: "Inter-city Tri-Cities pairs", detail: "Kingsport–Bristol–Johnson City-area logistics raise distance." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$400–$1,200+", note: "Higher with peak freeways" },
      { label: "2–3BR condo or modest SFH", value: "$1,200–$3,400+", note: "Regional pairs trend up" },
      { label: "3–4+ BR / long regional / cross-border", value: "$2,200–$6,400+", note: "Long I-81 pairs price highest" },
      { label: "Typical 2-person crew rate", value: "$100–$170+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Sullivan County",
    intro: "Family seasons and regional employment calendars reshape access.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Reduce I-81 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "Month-end multi-family turns", detail: "Lease clusters fill crews in corridor multi-unit." },
      { title: "Summer heat and storms", detail: "Prefer early starts; confirm weather contingency." }
    ],
  },
  specialized: [
    {
      id: "sullivan-tri-cities",
      title: "Tri-Cities regional & state-line logistics module",
      intro: "Sullivan estimates fail when border destinations or industrial-adjacent access are ignored.",
      bullets: ["Clarify Tennessee vs Virginia destinations on every estimate.","Price I-81/I-26 pairs portal-to-portal.","Survey industrial-adjacent staging carefully in Kingsport corridors.","Do not reuse Nashville or Knoxville campus assumptions here.","Verify TDOR for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Sullivan County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Sullivan County Schools, Kingsport City Schools, and Bristol Tennessee City Schools serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools, Tennessee DOE data, and campus visits beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Ballad Health and other regional facilities serve Tri-Cities corridors. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times across Kingsport–Bristol corridors. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Industrial-residential mix", detail: "Kingsport corridors can sit near commercial logistics; Bristol edges may involve state-line complexity." },
          { title: "Cost variation", detail: "Prices vary by city and corridor within the county." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Kingsport lifestyle", detail: "Regional employment access with mixed stock logistics." },
          { title: "Bristol TN pattern", detail: "State-line living with cross-border commute options." },
          { title: "Blountville / corridor pattern", detail: "Multi-family and HOA product between cities." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Manufacturing, healthcare, logistics, education, and regional services shape employment." },
          { title: "Commute realism", detail: "I-81, I-26, and US-11W peaks are real. Test drive peak routes across Tri-Cities." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "Tri-Cities identity", detail: "Sullivan is distinct from Nashville suburb rings, Memphis river logistics, and Sevier tourism peaks." },
          { title: "Climate", detail: "Four seasons with hot humid summers and winter weather risk. Plan staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Sullivan County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify TDOR intrastate authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Sullivan County — official site", href: "https://www.sullivancountytn.gov/", external: true },
      { label: "City of Kingsport", href: "https://www.kingsporttn.gov/", external: true },
      { label: "City of Bristol Tennessee", href: "https://www.bristoltn.org/", external: true },
      { label: "Sullivan County Schools", href: "https://www.scde.k12.tn.us/", external: true },
      { label: "TDOT traffic resources", href: "https://www.tn.gov/tdot.html", external: true }
    ],
  },
  directoryHint: "Prefer mixed industrial-residential access experience; honest I-81 pricing; clarify TN vs VA destinations. Verify TDOR for in-state legs and FMCSA for interstate.",
  lastReviewed: '2026-07-24',
});
