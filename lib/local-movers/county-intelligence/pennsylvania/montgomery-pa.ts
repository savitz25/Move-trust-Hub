import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizePaPack } from '@/lib/local-movers/county-intelligence/pennsylvania/pa-shared';

export const montgomeryCountyPaIntelligence: CountyIntelligencePack = finalizePaPack({
  countySlug: "montgomery",
  hubTitle: "Montgomery County Moving Intelligence Hub",
  eyebrow: "Montgomery · Main Line, King of Prussia & Philly collar logistics",
  h1: "Moving in Montgomery County: Main Line Access, KOP Corridors & I-76 Logistics",
  heroOpener: "Montgomery County is Philadelphia’s northwest collar: Main Line multi-unit and older SFH, King of Prussia retail and multi-family density, Abington and Willow Grove corridors, and I-76/I-476 portal time that is not Center City rowhomes and not Chester far-west HOA growth alone. A Main Line twin, a KOP mid-rise, an Abington ranch, and a Lansdale multi-family unit do not share truck access or empty-mile risk. This hub is for Montgomery — not a Philadelphia city clone.",
  heroCredibility:
    'PA PUC household goods authority for intrastate moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-76 · I-476 · US-202 · PA-309 · PA-611",
  whatMakesDifferent: {
    title: "What makes moving in Montgomery County different",
    intro: "Collar-county density and Main Line access — not Philly Center City elevators as the default product.",
    bullets: [
      {
        title: "Main Line stock mixes older SFH, twins, and multi-unit",
        detail: "Access surveys matter more than “suburb” labels.",
      },
      {
        title: "I-76 / I-476 define portal-to-portal time",
        detail: "Philly-linked pairs burn clock at peak.",
      },
      {
        title: "King of Prussia multi-family is elevator-heavy",
        detail: "Building packets still apply outside Center City.",
      },
      {
        title: "HOA growth appears in pockets, not county-wide",
        detail: "Collect gate lists where planned communities apply.",
      },
      {
        title: "Montgomery is not Bucks or Delaware",
        detail: "Northwest collar logistics differ from north-river Bucks and I-95 Delaware inner ring.",
      },
      {
        title: 'Intrastate PA rules vs interstate authority',
        detail:
          'Moves entirely within Pennsylvania are generally subject to Pennsylvania Public Utility Commission (PUC) household goods authority. Interstate legs need active FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: "Montgomery access zones",
  zonesIntro: "Plan by Main Line, King of Prussia, Abington/Willow Grove, and northern growth edges.",
  zones: [
    {
      id: "main-line",
      name: "Main Line towns & multi-unit",
      shortName: "Main Line",
      neighborhoods: ["Ardmore","Bryn Mawr","Narberth edges","Wayne edges","Lower Merion corridors"],
      housingTypes: "Older SFH, twins, multi-unit, some elevators",
      challenges: ["Tight streets","Mixed access types","I-76 congestion"],
      moverTips: "Photo curb. Confirm elevator rules. Prefer mid-week mornings.",
      cityKeywords: ["ardmore","bryn mawr","wayne","lower merion","main line"],
    },
    {
      id: "kop",
      name: "King of Prussia multi-family & retail corridors",
      shortName: "King of Prussia",
      neighborhoods: ["King of Prussia","US-202 multi-family","Gulph Road corridors"],
      housingTypes: "Mid-rise multi-family, townhomes, HOA product",
      challenges: ["Elevators and COI","Retail congestion","Lease-end waves"],
      moverTips: "Reserve elevators in writing. Build US-202 buffer.",
      cityKeywords: ["king of prussia","kop","upper merion"],
    },
    {
      id: "abington-wg",
      name: "Abington, Willow Grove & eastern corridors",
      shortName: "Abington / WG",
      neighborhoods: ["Abington","Willow Grove","Jenkintown edges","PA-611 multi-family"],
      housingTypes: "SFH, multi-family, twins",
      challenges: ["PA-611 congestion","Mixed stock access","Longer empty miles to Main Line"],
      moverTips: "Prefer early starts. Confirm unit access type.",
      cityKeywords: ["abington","willow grove","jenkintown"],
    },
    {
      id: "north-growth",
      name: "Lansdale, North Wales & northern growth",
      shortName: "North growth",
      neighborhoods: ["Lansdale","North Wales","PA-309 corridors","HOA villages"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["HOA rules","PA-309 congestion","Long portal time to Philly core"],
      moverTips: "Collect HOA packets. Price long north-county pairs honestly.",
      cityKeywords: ["lansdale","north wales","montgomeryville"],
    }
  ],
  costDrivers: {
    title: "What drives Montgomery County moving costs",
    intro: "Collar freeway portal time and mixed multi-unit access drive quotes.",
    drivers: [
      { title: "I-76 / I-476 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "Main Line curb and multi-unit mix", detail: "Access type varies block by block." },
      { title: "KOP elevator buildings", detail: "COI and wait time add cost." },
      { title: "Philly-linked empty miles", detail: "City destinations raise staging distance." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$450–$1,350+", note: "Higher with elevators" },
      { label: "2–3BR condo or modest SFH", value: "$1,350–$3,800+", note: "Collar congestion trends up" },
      { label: "3–4+ BR / long Philly-linked", value: "$2,500–$7,200+", note: "Cross-county pairs price highest" },
      { label: "Typical 2-person crew rate", value: "$110–$180+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Montgomery County",
    intro: "Family seasons and multi-family lease turns reshape collar access.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Reduce I-76/I-476 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "Month-end multi-family turns", detail: "KOP and corridor apartments fill crews first." },
      { title: "Winter ice and snow", detail: "Confirm contingency for driveway and arterial access." }
    ],
  },
  specialized: [
    {
      id: "montgomery-collar-mainline",
      title: "Main Line & King of Prussia collar module",
      intro: "Montgomery estimates fail when Philly empty miles or multi-unit rules are ignored.",
      bullets: ["Collect KOP building packets early.","Price I-76/I-476 pairs portal-to-portal.","Clarify Montgomery vs Philadelphia destinations.","Do not reuse Center City rowhome assumptions for Main Line SFH.","Verify PA PUC authority for in-state-only jobs and FMCSA for interstate legs."],
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
          { title: "How districts work here", detail: "Multiple independent school districts serve Montgomery addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools, PDE data, and campus visits beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Main Line Health, Jefferson, Abington/Jefferson, and Philly-metro systems serve residents. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour times into city specialty care. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Main Line vs northern growth stock", detail: "Older multi-unit and SFH on the Main Line; more HOA multi-family north." },
          { title: "Cost variation", detail: "Main Line corridors often price differently from northern growth towns." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Main Line lifestyle", detail: "Rail-oriented towns with mixed multi-unit logistics." },
          { title: "KOP multi-unit pattern", detail: "Elevator product with retail-corridor congestion." },
          { title: "Northern growth pattern", detail: "HOA product with longer Philly commute risk." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Many residents commute into Philadelphia; KOP corporate, healthcare, and retail also employ locals." },
          { title: "Commute realism", detail: "I-76 and I-476 peaks are real. Test drive peak routes into the city." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "Northwest collar identity", detail: "Montgomery is distinct from Philly city, Bucks north suburbs, and Delaware I-95 inner ring." },
          { title: "Climate", detail: "Hot humid summers and winter ice/snow. Plan staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Montgomery County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify PA PUC authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Montgomery County, PA — official site", href: "https://www.montgomerycountypa.gov/", external: true },
      { label: "PennDOT 511PA traffic", href: "https://www.511pa.com/", external: true }
    ],
  },
  directoryHint: "Prefer Main Line multi-unit and KOP elevator experience; honest I-76/I-476 pricing. Verify PA PUC in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
