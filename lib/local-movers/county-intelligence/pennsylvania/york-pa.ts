import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizePaPack } from '@/lib/local-movers/county-intelligence/pennsylvania/pa-shared';

export const yorkCountyPaIntelligence: CountyIntelligencePack = finalizePaPack({
  countySlug: "york",
  hubTitle: "York County Moving Intelligence Hub",
  eyebrow: "York · South-central PA, I-83 corridor (Harrisburg/Baltimore adjacency)",
  h1: "Moving in York County: City Access, Township Growth & I-83 Logistics",
  heroOpener: "York County is south-central Pennsylvania: York city multi-unit and older stock, suburban growth along I-83, township SFH, and adjacency patterns toward Harrisburg and Baltimore that are not Lancaster tourism edges and not Philly collar freeways. A York city multi-family unit, a Springettsbury HOA home, a Red Lion twin, and a rural-edge lot do not share truck access or portal time. This hub is for York — not a Lancaster clone.",
  heroCredibility:
    'PA PUC household goods authority for intrastate moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-83 · US-30 · PA-74 · PA-462 · I-76 links",
  whatMakesDifferent: {
    title: "What makes moving in York County different",
    intro: "South-central I-83 corridor market — not Lancaster city-township tourism mix or Philly spillover.",
    bullets: [
      {
        title: "I-83 defines many regional portal times",
        detail: "Harrisburg- and Baltimore-adjacent pairs burn clock at peak.",
      },
      {
        title: "City multi-unit differs from township growth product",
        detail: "Access surveys matter more than ZIP labels.",
      },
      {
        title: "Cross-state Maryland pairs are routine",
        detail: "Clarify PA PUC vs FMCSA for destinations outside Pennsylvania.",
      },
      {
        title: "HOA growth appears along suburban corridors",
        detail: "Collect gate lists where planned communities apply.",
      },
      {
        title: "York is not Lancaster",
        detail: "I-83 south-central logistics differ from US-30 Lancaster patterns.",
      },
      {
        title: 'Intrastate PA rules vs interstate authority',
        detail:
          'Moves entirely within Pennsylvania are generally subject to Pennsylvania Public Utility Commission (PUC) household goods authority. Interstate legs need active FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: "York access zones",
  zonesIntro: "Plan by York city, northern I-83 growth, southern townships, and western/eastern rural edges.",
  zones: [
    {
      id: "york-city",
      name: "York city multi-unit & older stock",
      shortName: "York city",
      neighborhoods: ["Downtown York","City multi-family","Older SFH pockets"],
      housingTypes: "Multi-family, twins, older SFH",
      challenges: ["Tight streets","Mixed stairs and elevators","Arterial congestion"],
      moverTips: "Photo curb. Confirm unit access type. Prefer mid-week mornings.",
      cityKeywords: ["york","downtown york"],
    },
    {
      id: "north-i83",
      name: "Northern I-83 suburban growth",
      shortName: "North I-83",
      neighborhoods: ["Springettsbury","Manchester edges","I-83 multi-family","HOA villages"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["I-83 congestion","HOA rules","Long portal time to city core"],
      moverTips: "Collect HOA packets. Build I-83 buffer.",
      cityKeywords: ["springettsbury","manchester","emigsville"],
    },
    {
      id: "south-townships",
      name: "Southern township corridors",
      shortName: "South townships",
      neighborhoods: ["Red Lion","Dallastown edges","Southern SFH tracts"],
      housingTypes: "SFH, multi-family, twins",
      challenges: ["Long empty miles","PA-74 congestion","Varied driveway access"],
      moverTips: "Prefer early starts. Survey driveway depth.",
      cityKeywords: ["red lion","dallastown","southern york"],
    },
    {
      id: "rural-edges",
      name: "Western & eastern rural edges",
      shortName: "Rural edges",
      neighborhoods: ["Hanover edges","Eastern tracts","Rural driveway lots"],
      housingTypes: "SFH, rural-edge lots",
      challenges: ["Long empty miles","Soft surfaces after rain","Limited alternate routes"],
      moverTips: "Survey truck access. Prefer early starts for long pairs.",
      cityKeywords: ["hanover","rural york"],
    }
  ],
  costDrivers: {
    title: "What drives York County moving costs",
    intro: "I-83 portal time and township empty miles drive quotes.",
    drivers: [
      { title: "I-83 regional congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "Township empty miles", detail: "Distance work disguised as “local.”" },
      { title: "City multi-unit access", detail: "Stairs and elevators raise labor hours." },
      { title: "Cross-state empty miles", detail: "Maryland destinations change staging and authority assumptions." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$400–$1,200+", note: "Higher with elevators" },
      { label: "2–3BR condo or modest SFH", value: "$1,200–$3,400+", note: "I-83 pairs trend up" },
      { label: "3–4+ BR / long regional", value: "$2,200–$6,400+", note: "Cross-county pairs price highest" },
      { label: "Typical 2-person crew rate", value: "$100–$170+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in York County",
    intro: "Family seasons and multi-family lease turns reshape access.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Reduce I-83 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "Month-end multi-family turns", detail: "Northern multi-unit fills first." },
      { title: "Winter ice and snow", detail: "Confirm contingency for driveway access." }
    ],
  },
  specialized: [
    {
      id: "york-i83-corridor",
      title: "I-83 south-central corridor module",
      intro: "York estimates fail when regional empty miles or Maryland pairs are ignored.",
      bullets: ["Price I-83 pairs portal-to-portal.","Clarify Pennsylvania vs Maryland destinations.","Collect HOA packets for northern growth product.","Do not reuse Lancaster tourism-edge assumptions here.","Verify PA PUC authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to York County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "York City School District and numerous township districts serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools, PDE data, and campus visits beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "WellSpan York Hospital and regional facilities serve residents. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from outer townships. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "City vs suburban growth stock", detail: "Older multi-unit in the city; more HOA SFH along I-83 growth corridors." },
          { title: "Cost variation", detail: "Northern suburbs often price differently from southern rural edges." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "City lifestyle", detail: "Multi-unit amenities with curb logistics." },
          { title: "Northern I-83 growth pattern", detail: "HOA product with freeway commute risk." },
          { title: "Southern/rural lifestyle", detail: "Space with long empty-mile move logistics." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Healthcare, manufacturing, logistics, and education shape employment; some residents commute toward Harrisburg or Maryland." },
          { title: "Commute realism", detail: "I-83 peaks are real. Test drive peak routes." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "South-central identity", detail: "York is distinct from Lancaster mid-state tourism edges and Philly collar counties." },
          { title: "Climate", detail: "Hot humid summers and winter ice/snow. Plan staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful York County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify PA PUC authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "York County — official site", href: "https://yorkcountypa.gov/", external: true },
      { label: "City of York", href: "https://www.yorkcity.org/", external: true },
      { label: "PennDOT 511PA traffic", href: "https://www.511pa.com/", external: true }
    ],
  },
  directoryHint: "Prefer I-83 portal-time honesty and city multi-unit access surveys. Verify PA PUC in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
