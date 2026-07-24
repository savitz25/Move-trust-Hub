import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizePaPack } from '@/lib/local-movers/county-intelligence/pennsylvania/pa-shared';

export const chesterCountyPaIntelligence: CountyIntelligencePack = finalizePaPack({
  countySlug: "chester",
  hubTitle: "Chester County Moving Intelligence Hub",
  eyebrow: "Chester · Far-west growth, HOA subdivisions & longer portal times",
  h1: "Moving in Chester County: Far-West Growth, HOA Villages & US-202 Logistics",
  heroOpener: "Chester County is Philadelphia’s far-west growth collar: master-planned HOA density, longer empty miles from city yards, US-30/US-202 corridors, and township patterns that are not Delaware inner-ring twins and not Center City elevators. A West Chester multi-family unit, an Exton HOA two-story, a Malvern townhome, and a rural-edge lot do not share truck access or portal time. This hub is for Chester — not a Delaware County clone.",
  heroCredibility:
    'PA PUC household goods authority for intrastate moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "US-30 · US-202 · PA-100 · I-76 links · PA-3",
  whatMakesDifferent: {
    title: "What makes moving in Chester County different",
    intro: "Far-west Philly collar growth with longer portal times — not Delaware inner-ring density or Montgomery Main Line.",
    bullets: [
      {
        title: "HOA master plans dominate many growth corridors",
        detail: "Gate lists, approved hours, and long cul-de-sac carries are routine.",
      },
      {
        title: "Empty miles from Philly yards are real",
        detail: "Even “local” Chester pairs can price as distance work for city-based crews.",
      },
      {
        title: "US-202 / US-30 define portal time",
        detail: "Cross-county pairs burn clock at peak.",
      },
      {
        title: "Rural-edge lots still appear in western townships",
        detail: "Survey driveway access carefully.",
      },
      {
        title: "Chester is not Delaware County",
        detail: "Far-west growth logistics differ from inner-ring I-95 twins.",
      },
      {
        title: 'Intrastate PA rules vs interstate authority',
        detail:
          'Moves entirely within Pennsylvania are generally subject to Pennsylvania Public Utility Commission (PUC) household goods authority. Interstate legs need active FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: "Chester access zones",
  zonesIntro: "Plan by West Chester/Exton growth, eastern approaches, southern townships, and western rural edges.",
  zones: [
    {
      id: "west-chester-exton",
      name: "West Chester, Exton & central growth",
      shortName: "West Chester / Exton",
      neighborhoods: ["West Chester","Exton","US-202 multi-family","HOA master plans"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["HOA rules","US-202 congestion","Long portal time to Philly"],
      moverTips: "Collect HOA packets. Build US-202 buffer. Prefer early starts.",
      cityKeywords: ["west chester","exton","chester county"],
    },
    {
      id: "east-approaches",
      name: "Eastern approaches toward Delaware/Montco",
      shortName: "East approaches",
      neighborhoods: ["Malvern edges","Paoli edges","US-30 multi-family","HOA villages"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["Cross-county confusion","Arterial congestion","Elevator buildings"],
      moverTips: "Clarify Chester vs Delaware/Montgomery addresses. Confirm elevator reservations.",
      cityKeywords: ["malvern","paoli","frazer"],
    },
    {
      id: "south-townships",
      name: "Southern township corridors",
      shortName: "South townships",
      neighborhoods: ["Kennett Square edges","Oxford edges","Southern HOA product"],
      housingTypes: "SFH, multi-family, rural-edge lots",
      challenges: ["Long empty miles","US-1 corridor congestion","Varied driveway access"],
      moverTips: "Survey access photos. Prefer early starts for long south-county pairs.",
      cityKeywords: ["kennett square","oxford","southern chester"],
    },
    {
      id: "west-rural",
      name: "Western rural-edge townships",
      shortName: "West rural",
      neighborhoods: ["Coatesville edges","Western tracts","Rural driveway lots"],
      housingTypes: "SFH, rural-edge lots",
      challenges: ["Long empty miles","Soft surfaces after rain","Limited alternate routes"],
      moverTips: "Survey driveway and truck turn radius. Prefer early starts.",
      cityKeywords: ["coatesville","western chester","rural"],
    }
  ],
  costDrivers: {
    title: "What drives Chester County moving costs",
    intro: "HOA soft costs and long Philly-linked empty miles drive quotes.",
    drivers: [
      { title: "Longer empty miles from city yards", detail: "Distance work disguised as “local.”" },
      { title: "HOA gate lists and approved hours", detail: "Soft costs push demand into peak windows." },
      { title: "US-202 / US-30 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "Rural-edge access friction", detail: "Driveway surveys matter more than ZIP codes." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$450–$1,350+", note: "Higher with HOA soft costs" },
      { label: "2–3BR HOA SFH or multi-family", value: "$1,400–$3,900+", note: "Long portal times trend up" },
      { label: "3–4+ BR / long Philly-linked", value: "$2,600–$7,500+", note: "Cross-county pairs price highest" },
      { label: "Typical 2-person crew rate", value: "$110–$180+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Chester County",
    intro: "Family seasons and multi-family lease turns reshape growth-corridor access.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Reduce US-202 pain and clear HOA hours." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "Month-end multi-family turns", detail: "Exton/West Chester multi-unit fills first." },
      { title: "Winter ice and snow", detail: "Confirm contingency for driveway access." }
    ],
  },
  specialized: [
    {
      id: "chester-far-west-growth",
      title: "Far-west growth & HOA logistics module",
      intro: "Chester estimates fail when empty miles or HOA rules are ignored.",
      bullets: ["Collect HOA packets for master-planned villages.","Price Philly-linked pairs as logistics days.","Clarify Chester vs Delaware/Montgomery destinations.","Do not reuse Delaware inner-ring twin assumptions here.","Verify PA PUC authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Chester County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Multiple independent school districts serve Chester County addresses. Confirm zoning carefully." },
          { title: "Growth areas", detail: "Central growth corridors can see enrollment pressure. Ask about capacity when touring." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Chester County Hospital / Penn Medicine and regional systems serve residents. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour times into Philly specialty care. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "HOA growth product", detail: "Master-planned villages dominate many corridors; western edges remain more rural." },
          { title: "Cost variation", detail: "Eastern approaches often price differently from far-west rural townships." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "West Chester / Exton lifestyle", detail: "Growth amenities with long Philly commute risk." },
          { title: "Eastern approach pattern", detail: "Closer collar access with multi-family logistics." },
          { title: "Western rural lifestyle", detail: "Space with long empty-mile move logistics." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Many residents commute into Philly or Montgomery; local corporate, healthcare, and logistics also employ residents." },
          { title: "Commute realism", detail: "US-202 and US-30 peaks are real. Test drive peak routes." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "Far-west collar identity", detail: "Chester is distinct from Delaware inner-ring and Philly city micro-markets." },
          { title: "Climate", detail: "Hot humid summers and winter ice/snow. Plan staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Chester County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify PA PUC authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Chester County — official site", href: "https://www.chesco.org/", external: true },
      { label: "PennDOT 511PA traffic", href: "https://www.511pa.com/", external: true }
    ],
  },
  directoryHint: "Prefer HOA fluency and honest long-run pricing from Philly yards. Verify PA PUC in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
