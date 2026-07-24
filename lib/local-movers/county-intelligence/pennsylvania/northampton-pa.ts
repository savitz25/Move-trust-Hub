import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizePaPack } from '@/lib/local-movers/county-intelligence/pennsylvania/pa-shared';

export const northamptonCountyPaIntelligence: CountyIntelligencePack = finalizePaPack({
  countySlug: "northampton",
  hubTitle: "Northampton County Moving Intelligence Hub",
  eyebrow: "Northampton · Bethlehem/Easton Lehigh Valley partner (not Allentown clone)",
  h1: "Moving in Northampton County: Bethlehem Access, Easton Edges & I-78 Logistics",
  heroOpener: "Northampton County is the Bethlehem–Easton half of the Lehigh Valley: Bethlehem multi-unit and older stock, Easton river-edge logistics, suburban multi-family along US-22/I-78, and patterns that complement Lehigh without cloning Allentown. A Bethlehem multi-family unit, an Easton twin, a Bethlehem Township HOA home, and a Bangor-edge lot do not share truck access or portal time. This hub is for Northampton — not a Lehigh County rename.",
  heroCredibility:
    'PA PUC household goods authority for intrastate moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-78 · PA-33 · US-22 · PA-611 · PA-248",
  whatMakesDifferent: {
    title: "What makes moving in Northampton County different",
    intro: "Bethlehem/Easton micro-markets — not Allentown defaults or Philly collar patterns.",
    bullets: [
      {
        title: "Bethlehem and Easton are different access products",
        detail: "Do not price river-edge Easton like Bethlehem multi-family.",
      },
      {
        title: "I-78 / US-22 define portal time",
        detail: "Cross-county pairs burn clock at peak.",
      },
      {
        title: "Lehigh pairs are everyday Valley logistics",
        detail: "Keep county lines clear for drive time and authority assumptions.",
      },
      {
        title: "New Jersey adjacency exists on eastern edges",
        detail: "Clarify PA PUC vs FMCSA for destinations outside Pennsylvania.",
      },
      {
        title: "Northampton is not Lehigh",
        detail: "Bethlehem/Easton patterns differ from Allentown industrial/residential mix.",
      },
      {
        title: 'Intrastate PA rules vs interstate authority',
        detail:
          'Moves entirely within Pennsylvania are generally subject to Pennsylvania Public Utility Commission (PUC) household goods authority. Interstate legs need active FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: "Northampton access zones",
  zonesIntro: "Plan by Bethlehem, Easton, township growth, and northern rural edges.",
  zones: [
    {
      id: "bethlehem",
      name: "Bethlehem multi-unit & older stock",
      shortName: "Bethlehem",
      neighborhoods: ["Downtown Bethlehem","South Bethlehem edges","City multi-family","Older SFH pockets"],
      housingTypes: "Multi-family, twins, older SFH",
      challenges: ["Tight streets","Mixed stairs and elevators","Event-day curb pressure"],
      moverTips: "Photo curb. Confirm unit access type. Prefer mid-week mornings.",
      cityKeywords: ["bethlehem","south bethlehem"],
    },
    {
      id: "easton",
      name: "Easton river-edge & multi-family",
      shortName: "Easton",
      neighborhoods: ["Downtown Easton","West Ward edges","River-edge multi-family","PA-611 corridors"],
      housingTypes: "Multi-family, twins, older SFH",
      challenges: ["River-edge curb limits","Bridge approach congestion","NJ-adjacent empty miles"],
      moverTips: "Survey curb width. Clarify Pennsylvania vs New Jersey destinations.",
      cityKeywords: ["easton","forks township edges"],
    },
    {
      id: "township-growth",
      name: "Bethlehem Township & suburban multi-family",
      shortName: "Township growth",
      neighborhoods: ["Bethlehem Township","Palmer edges","US-22 multi-family","HOA villages"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["HOA rules","US-22 congestion","Long portal time to city cores"],
      moverTips: "Collect HOA packets. Build freeway buffer.",
      cityKeywords: ["bethlehem township","palmer","hanover township"],
    },
    {
      id: "north-rural",
      name: "Northern rural edges",
      shortName: "North rural",
      neighborhoods: ["Bangor edges","Wind Gap edges","Rural driveway lots"],
      housingTypes: "SFH, rural-edge lots",
      challenges: ["Long empty miles","PA-33 congestion","Limited alternate routes"],
      moverTips: "Survey driveway access. Prefer early starts for long pairs.",
      cityKeywords: ["bangor","wind gap","pen argyl"],
    }
  ],
  costDrivers: {
    title: "What drives Northampton County moving costs",
    intro: "Valley freeways and dual-city access patterns drive quotes.",
    drivers: [
      { title: "I-78 / US-22 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "Bethlehem vs Easton access differences", detail: "Surveys must match the correct micro-market." },
      { title: "HOA soft costs in township growth", detail: "Gate lists push demand into peak windows." },
      { title: "Cross-state empty miles", detail: "New Jersey destinations change staging and authority assumptions." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$400–$1,250+", note: "Higher with elevators" },
      { label: "2–3BR condo or modest SFH", value: "$1,250–$3,500+", note: "I-78 pairs trend up" },
      { label: "3–4+ BR / long Valley / cross-state", value: "$2,300–$6,600+", note: "NJ pairs price highest" },
      { label: "Typical 2-person crew rate", value: "$100–$170+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Northampton County",
    intro: "Family seasons and multi-family lease turns reshape Valley access.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Reduce I-78/US-22 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "Month-end multi-family turns", detail: "Bethlehem and township multi-unit fill first." },
      { title: "Winter ice and snow", detail: "Confirm contingency for driveway access." }
    ],
  },
  specialized: [
    {
      id: "northampton-bethlehem-easton",
      title: "Bethlehem/Easton Valley partner module",
      intro: "Northampton estimates fail when Bethlehem and Easton are treated as identical.",
      bullets: ["Survey Bethlehem multi-unit and Easton river-edge access as different products.","Price I-78/US-22 pairs portal-to-portal.","Clarify Northampton vs Lehigh and Pennsylvania vs New Jersey destinations.","Do not reuse Allentown assumptions as Bethlehem defaults.","Verify PA PUC authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Northampton County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Bethlehem Area, Easton Area, and numerous township districts serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools, PDE data, and campus visits beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "St. Luke’s University Health Network, Lehigh Valley Health Network, and regional facilities serve residents. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times across Bethlehem–Easton corridors. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Dual-city stock", detail: "Bethlehem and Easton multi-unit/older stock differ; townships show more HOA multi-family." },
          { title: "Cost variation", detail: "Township growth often prices differently from river-edge older stock." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Bethlehem lifestyle", detail: "City amenities with multi-unit logistics." },
          { title: "Easton pattern", detail: "River-edge living with curb and bridge tradeoffs." },
          { title: "Township growth pattern", detail: "HOA product with freeway commute risk." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Healthcare, logistics, manufacturing, education, and professional services shape employment." },
          { title: "Commute realism", detail: "I-78 and US-22 peaks are real. Test drive peak routes across the Valley and into NJ when relevant." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "Lehigh Valley partner identity", detail: "Northampton complements Lehigh without cloning Allentown." },
          { title: "Climate", detail: "Hot humid summers and winter ice/snow. Plan staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Northampton County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify PA PUC authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Northampton County — official site", href: "https://www.northamptoncounty.org/", external: true },
      { label: "City of Bethlehem", href: "https://www.bethlehem-pa.gov/", external: true },
      { label: "City of Easton", href: "https://www.easton-pa.com/", external: true },
      { label: "PennDOT 511PA traffic", href: "https://www.511pa.com/", external: true }
    ],
  },
  directoryHint: "Prefer Bethlehem multi-unit and Easton river-edge surveys; Valley freeway honesty. Verify PA PUC in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
