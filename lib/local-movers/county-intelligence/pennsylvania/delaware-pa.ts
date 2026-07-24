import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizePaPack } from '@/lib/local-movers/county-intelligence/pennsylvania/pa-shared';

export const delawareCountyPaIntelligence: CountyIntelligencePack = finalizePaPack({
  countySlug: "delaware",
  hubTitle: "Delaware County Moving Intelligence Hub",
  eyebrow: "Delaware · Inner-ring west suburbs, older stock & I-95 corridor",
  h1: "Moving in Delaware County: Inner-Ring Suburbs, Older Stock & I-95 Logistics",
  heroOpener: "Delaware County is Philadelphia’s western inner ring: older twins and multi-family near I-95, Media and western township growth, and short map miles that still burn portal time into the city. This is not Chester far-west HOA sprawl and not Center City elevator product as the default. A Upper Darby multi-family unit, a Media twin, a Springfield ranch, and a Marcus Hook-edge house do not share truck access or empty-mile risk. This hub is for Delaware County, PA — not Delaware the state.",
  heroCredibility:
    'PA PUC household goods authority for intrastate moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-95 · I-476 · US-1 · PA-3 · PA-352",
  whatMakesDifferent: {
    title: "What makes moving in Delaware County different",
    intro: "Inner-ring west Philly suburbs with older stock — not Chester far-west growth or Bucks north-river patterns.",
    bullets: [
      {
        title: "Older twins and multi-family dominate many corridors",
        detail: "Stairs, curb limits, and tight streets are common.",
      },
      {
        title: "I-95 / I-476 define Philly-linked portal time",
        detail: "Cross-county pairs burn clock at peak.",
      },
      {
        title: "Inner-ring density is not far-west HOA sprawl",
        detail: "Do not price Upper Darby like Chester County master plans.",
      },
      {
        title: "State-line adjacency with Delaware/New Jersey edges exists",
        detail: "Clarify destinations for PA PUC vs FMCSA assumptions.",
      },
      {
        title: "Delaware County is not Chester County",
        detail: "Inner-ring logistics differ from far-west growth portal times.",
      },
      {
        title: 'Intrastate PA rules vs interstate authority',
        detail:
          'Moves entirely within Pennsylvania are generally subject to Pennsylvania Public Utility Commission (PUC) household goods authority. Interstate legs need active FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: "Delaware County access zones",
  zonesIntro: "Plan by eastern inner-ring, Media/central, western townships, and I-95 industrial-adjacent edges.",
  zones: [
    {
      id: "east-inner",
      name: "Eastern inner-ring multi-family & twins",
      shortName: "East inner-ring",
      neighborhoods: ["Upper Darby","Yeadon edges","Darby edges","I-95 multi-family"],
      housingTypes: "Multi-family, twins, older SFH",
      challenges: ["Tight streets","I-95 congestion","Mixed stairs and elevators"],
      moverTips: "Photo curb. Confirm unit access type. Build I-95 buffer.",
      cityKeywords: ["upper darby","yeadon","darby"],
    },
    {
      id: "media-central",
      name: "Media & central corridors",
      shortName: "Media / central",
      neighborhoods: ["Media","PA-3 corridors","Swarthmore edges","Springfield"],
      housingTypes: "Twins, SFH, multi-family",
      challenges: ["Arterial congestion","Mixed access types","Longer empty miles to city core"],
      moverTips: "Prefer mid-week mornings. Survey driveway depth.",
      cityKeywords: ["media","springfield","swarthmore"],
    },
    {
      id: "west-townships",
      name: "Western townships & HOA pockets",
      shortName: "West townships",
      neighborhoods: ["Newtown Square edges","Marple","HOA villages","US-1 multi-family"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["HOA rules","US-1 congestion","Portal time to Philly"],
      moverTips: "Collect HOA packets. Price long pairs honestly.",
      cityKeywords: ["newtown square","marple","broomall"],
    },
    {
      id: "i95-south",
      name: "I-95 southern industrial-adjacent edges",
      shortName: "I-95 south",
      neighborhoods: ["Chester city edges","Marcus Hook edges","Industrial-adjacent residential"],
      housingTypes: "Multi-family, older SFH",
      challenges: ["Freight corridor traffic","Varied street widths","Staging friction"],
      moverTips: "Survey truck access carefully. Prefer early starts.",
      cityKeywords: ["chester","marcus hook","trainer"],
    }
  ],
  costDrivers: {
    title: "What drives Delaware County moving costs",
    intro: "Inner-ring access friction and I-95 portal time drive quotes.",
    drivers: [
      { title: "I-95 / I-476 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "Older twin and multi-family access", detail: "Stairs and curb limits raise labor hours." },
      { title: "HOA soft costs in western pockets", detail: "Gate lists push demand into peak windows." },
      { title: "Philly-linked empty miles", detail: "City destinations raise staging distance." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$400–$1,300+", note: "Higher with stairs or elevators" },
      { label: "2–3BR twin or multi-family", value: "$1,300–$3,600+", note: "I-95 pairs trend up" },
      { label: "3–4+ BR / long Philly-linked", value: "$2,400–$6,800+", note: "Cross-county pairs price highest" },
      { label: "Typical 2-person crew rate", value: "$105–$175+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Delaware County",
    intro: "Family seasons and multi-family lease turns reshape access.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Reduce I-95 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "Month-end multi-family turns", detail: "Eastern multi-unit fills crews first." },
      { title: "Winter ice and snow", detail: "Confirm contingency for driveway and curb access." }
    ],
  },
  specialized: [
    {
      id: "delaware-pa-inner-ring",
      title: "Inner-ring west suburbs & I-95 module",
      intro: "Delaware County estimates fail when older-stock access or Philly empty miles are ignored.",
      bullets: ["Survey twin/rowhome curb width carefully.","Price I-95/I-476 pairs portal-to-portal.","Clarify Delaware vs Philadelphia/Chester destinations.","Do not confuse Delaware County, PA with the state of Delaware on estimates.","Verify PA PUC authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Delaware County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Multiple independent school districts serve Delaware County addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools, PDE data, and campus visits beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Main Line Health, Crozer/Prospect-era facilities, and Philly-metro systems serve residents. Confirm networks for your household." },
          { title: "What relocators should do", detail: "Map peak-hour times into city specialty care. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Older inner-ring stock", detail: "Twins and multi-family dominate many eastern corridors; western pockets show more HOA product." },
          { title: "Cost variation", detail: "Eastern multi-family often prices differently from western townships." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Eastern inner-ring lifestyle", detail: "Closer city access with tight-street logistics." },
          { title: "Media / central pattern", detail: "Town amenities with mixed stock access." },
          { title: "Western township pattern", detail: "More HOA product with longer Philly commute risk." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Many residents commute into Philadelphia; local healthcare, education, and logistics also employ residents." },
          { title: "Commute realism", detail: "I-95 and I-476 peaks are real. Test drive peak routes into the city." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "Western inner-ring identity", detail: "Delaware County is distinct from Chester far-west growth and Philly city micro-markets." },
          { title: "Climate", detail: "Hot humid summers and winter ice/snow. Plan staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Delaware County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify PA PUC authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Delaware County, PA — official site", href: "https://www.delcopa.gov/", external: true },
      { label: "PennDOT 511PA traffic", href: "https://www.511pa.com/", external: true }
    ],
  },
  directoryHint: "Prefer older twin/multi-family curb surveys; honest I-95 pricing into Philly. Verify PA PUC in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
