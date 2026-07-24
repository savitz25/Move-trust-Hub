import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizePaPack } from '@/lib/local-movers/county-intelligence/pennsylvania/pa-shared';

export const lehighCountyPaIntelligence: CountyIntelligencePack = finalizePaPack({
  countySlug: "lehigh",
  hubTitle: "Lehigh County Moving Intelligence Hub",
  eyebrow: "Lehigh · Allentown core & Lehigh Valley industrial/residential mix",
  h1: "Moving in Lehigh County: Allentown Access, Valley Multi-Family & I-78 Logistics",
  heroOpener: "Lehigh County is the Allentown half of the Lehigh Valley: city multi-unit and older stock, suburban multi-family along PA-22/I-78, industrial-adjacent residential edges, and logistics that are not Northampton’s Bethlehem/Easton patterns alone and not Philly collar freeways. An Allentown multi-family unit, a South Whitehall HOA home, an Emmaus twin, and a rural-edge lot do not share truck access or portal time. This hub is for Lehigh — not a Northampton clone.",
  heroCredibility:
    'PA PUC household goods authority for intrastate moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-78 · PA-22 · PA-309 · US-22 · PA-100",
  whatMakesDifferent: {
    title: "What makes moving in Lehigh County different",
    intro: "Allentown-centered Valley mix — not Bethlehem/Easton Northampton product or Philly spillover.",
    bullets: [
      {
        title: "Allentown multi-unit differs from western township growth",
        detail: "Access surveys matter more than Valley-wide rates.",
      },
      {
        title: "I-78 / PA-22 define portal time",
        detail: "Cross-county pairs burn clock at peak.",
      },
      {
        title: "Industrial-adjacent corridors change staging",
        detail: "Freight traffic and curb competition differ from pure bedroom HOAs.",
      },
      {
        title: "Northampton pairs are everyday Valley logistics",
        detail: "Keep county lines clear for drive time and authority assumptions.",
      },
      {
        title: "Lehigh is not Northampton",
        detail: "Allentown patterns differ from Bethlehem/Easton micro-markets.",
      },
      {
        title: 'Intrastate PA rules vs interstate authority',
        detail:
          'Moves entirely within Pennsylvania are generally subject to Pennsylvania Public Utility Commission (PUC) household goods authority. Interstate legs need active FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: "Lehigh access zones",
  zonesIntro: "Plan by Allentown city, western suburbs, southern corridors, and northern approaches toward Northampton.",
  zones: [
    {
      id: "allentown-city",
      name: "Allentown city multi-unit & older stock",
      shortName: "Allentown city",
      neighborhoods: ["Downtown Allentown","City multi-family","Older SFH pockets"],
      housingTypes: "Multi-family, twins, older SFH",
      challenges: ["Tight streets","Mixed stairs and elevators","Arterial congestion"],
      moverTips: "Photo curb. Confirm unit access type. Prefer mid-week mornings.",
      cityKeywords: ["allentown","downtown allentown"],
    },
    {
      id: "west-suburbs",
      name: "Western suburban multi-family & HOA",
      shortName: "West suburbs",
      neighborhoods: ["South Whitehall","Upper Macungie edges","PA-22 multi-family","HOA villages"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["HOA rules","PA-22 / I-78 congestion","Long portal time to city core"],
      moverTips: "Collect HOA packets. Build freeway buffer.",
      cityKeywords: ["south whitehall","upper macungie","wescosville"],
    },
    {
      id: "south-corridors",
      name: "Southern corridors & Emmaus edges",
      shortName: "South corridors",
      neighborhoods: ["Emmaus","Salisbury edges","PA-29 multi-family"],
      housingTypes: "SFH, multi-family, twins",
      challenges: ["Arterial congestion","Mixed access types","Longer empty miles"],
      moverTips: "Prefer early starts. Survey driveway depth.",
      cityKeywords: ["emmaus","salisbury","fountain hill edges"],
    },
    {
      id: "north-valley",
      name: "Northern approaches toward Northampton",
      shortName: "North Valley",
      neighborhoods: ["Whitehall","Catasauqua edges","US-22 multi-family"],
      housingTypes: "Multi-family, SFH, townhomes",
      challenges: ["US-22 congestion","Cross-county confusion","Elevator buildings"],
      moverTips: "Clarify Lehigh vs Northampton addresses. Confirm elevator reservations.",
      cityKeywords: ["whitehall","catasauqua","coplay"],
    }
  ],
  costDrivers: {
    title: "What drives Lehigh County moving costs",
    intro: "Valley freeway portal time and multi-unit access drive quotes.",
    drivers: [
      { title: "I-78 / PA-22 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "City multi-unit access", detail: "Stairs and elevators raise labor hours." },
      { title: "HOA soft costs in western suburbs", detail: "Gate lists push demand into peak windows." },
      { title: "Cross-county empty miles", detail: "Northampton destinations raise staging distance." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$400–$1,250+", note: "Higher with elevators" },
      { label: "2–3BR condo or modest SFH", value: "$1,250–$3,500+", note: "I-78 pairs trend up" },
      { label: "3–4+ BR / long Valley", value: "$2,300–$6,500+", note: "Cross-county pairs price highest" },
      { label: "Typical 2-person crew rate", value: "$100–$170+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Lehigh County",
    intro: "Family seasons and multi-family lease turns reshape Valley access.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Reduce I-78/PA-22 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "Month-end multi-family turns", detail: "Western multi-unit fills first." },
      { title: "Winter ice and snow", detail: "Confirm contingency for driveway access." }
    ],
  },
  specialized: [
    {
      id: "lehigh-allentown-valley",
      title: "Allentown & Lehigh Valley logistics module",
      intro: "Lehigh estimates fail when Valley freeways or Northampton pairs are ignored.",
      bullets: ["Price I-78/PA-22 pairs portal-to-portal.","Clarify Lehigh vs Northampton destinations.","Collect HOA packets for western suburban product.","Do not reuse Bethlehem/Easton assumptions as Allentown defaults.","Verify PA PUC authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Lehigh County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Allentown School District and numerous township districts serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools, PDE data, and campus visits beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Lehigh Valley Health Network and regional facilities serve residents. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times across the Valley. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "City vs western suburban stock", detail: "Multi-unit and older stock in Allentown; more HOA multi-family west." },
          { title: "Cost variation", detail: "Western suburbs often price differently from city multi-family." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Allentown city lifestyle", detail: "Multi-unit amenities with curb logistics." },
          { title: "Western suburb pattern", detail: "HOA product with freeway commute risk." },
          { title: "Southern corridor pattern", detail: "Town amenities with mixed stock access." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Healthcare, logistics, manufacturing, education, and professional services shape employment." },
          { title: "Commute realism", detail: "I-78 and PA-22 peaks are real. Test drive peak routes." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "Lehigh Valley identity", detail: "Lehigh is distinct from Northampton partner towns and Philly collar counties." },
          { title: "Climate", detail: "Hot humid summers and winter ice/snow. Plan staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Lehigh County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify PA PUC authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Lehigh County — official site", href: "https://www.lehighcounty.org/", external: true },
      { label: "City of Allentown", href: "https://www.allentownpa.gov/", external: true },
      { label: "PennDOT 511PA traffic", href: "https://www.511pa.com/", external: true }
    ],
  },
  directoryHint: "Prefer Allentown multi-unit experience and Valley freeway honesty. Verify PA PUC in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
