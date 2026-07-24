import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeOrPack } from '@/lib/local-movers/county-intelligence/oregon/or-shared';

export const clackamasCountyOrIntelligence: CountyIntelligencePack = finalizeOrPack({
  countySlug: "clackamas",
  hubTitle: "Clackamas County Moving Intelligence Hub",
  eyebrow: "Clackamas · SE/south metro, Oregon City & I-205 logistics",
  h1: "Moving in Clackamas County: SE Metro Growth, Oregon City Access & I-205 Logistics",
  heroOpener: "Clackamas County is Portland’s SE/south metro collar: Oregon City hills and historic stock, Clackamas Town Center multi-family, Happy Valley/West Linn HOA growth, and I-205/OR-99E portal time that is not downtown Portland elevators and not Beaverton tech campuses. A Oregon City stairs job, a Happy Valley two-story, and a Wilsonville multi-unit do not share truck access or empty-mile risk. This hub is for Clackamas — not a Multnomah clone.",
  heroCredibility:
    'ODOT household goods certificate (ORS 825) for intrastate OR moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-205 · OR-99E · OR-212/224 · OR-43",
  whatMakesDifferent: {
    title: "What makes moving in Clackamas County different",
    intro: "These are SE/south metro realities — suburban growth, river-adjacent towns, and I-205 timing — not Pearl District elevators or Silicon Forest hard dates as the default.",
    bullets: [
      {
        title: "Oregon City hills and older stock rewrite access plans",
        detail: "Stairs, grades, and historic blocks change truck sizing.",
      },
      {
        title: "Happy Valley / West Linn HOA product is not urban Portland",
        detail: "Gate lists and longer empty miles dominate many jobs.",
      },
      {
        title: "I-205 / OR-99E define portal-to-portal time",
        detail: "South-metro pairs look local on maps and regional at peak.",
      },
      {
        title: "Not Multnomah eastside bungalows and not Washington County tech collars",
        detail: "Survey each Clackamas submarket on its own terms.",
      },
      {
        title: "River towns and foothills edges add access friction",
        detail: "Photo driveway grades and street width early.",
      },
      {
        title: "Intrastate ODOT household goods certificate vs interstate FMCSA",
        detail: "Moves entirely within Oregon by for-hire household goods carriers generally require a certificate of authority from the Oregon Department of Transportation (ODOT), administered through the Commerce and Compliance Division under ORS 825. Match the legal name on the estimate to Oregon household goods authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "Clackamas access zones",
  zonesIntro: "Plan by Oregon City core, Clackamas/Happy Valley growth, West Linn/Lake Oswego edges, and Wilsonville/south corridors.",
  zones: [
    {
      id: "oregon-city",
      name: "Oregon City core & hillside stock",
      shortName: "Oregon City",
      neighborhoods: ["Oregon City","Canemah edges","Park Place edges"],
      housingTypes: "Older SFH, multi-level, limited multi-family",
      challenges: ["Hills and stairs","Historic street width","OR-99E congestion"],
      moverTips: "Photo grades and curb. Prefer smaller trucks on tight blocks.",
      cityKeywords: ["oregon city"],
    },
    {
      id: "happy-valley-clackamas",
      name: "Happy Valley, Clackamas & SE growth",
      shortName: "Happy Valley / Clackamas",
      neighborhoods: ["Happy Valley","Clackamas","Damascus edges","Sunnsyside corridors"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["HOA rules","I-205 congestion","Longer portal time to Portland core"],
      moverTips: "Collect HOA packets. Price I-205 pairs portal-to-portal.",
      cityKeywords: ["happy valley","clackamas"],
    },
    {
      id: "west-linn-lo",
      name: "West Linn, Lake Oswego edges & river towns",
      shortName: "West Linn / LO edges",
      neighborhoods: ["West Linn","Lake Oswego edges","OR-43 corridors"],
      housingTypes: "HOA SFH, multi-level, premium stock",
      challenges: ["Hills and driveway grades","OR-43 timing","HOA rules"],
      moverTips: "Survey driveway grades carefully. Confirm HOA access rules.",
      cityKeywords: ["west linn","lake oswego"],
    },
    {
      id: "wilsonville-south",
      name: "Wilsonville, Canby & south corridors",
      shortName: "South Clackamas",
      neighborhoods: ["Wilsonville","Canby edges","Molalla edges","Aurora edges"],
      housingTypes: "SFH, multi-family, small-town stock",
      challenges: ["I-5 / I-205 timing","Longer empty miles","Rain access"],
      moverTips: "Price south pairs honestly. Clarify Clackamas vs Marion destinations.",
      cityKeywords: ["wilsonville","canby","molalla"],
    }
  ],
  costDrivers: {
    title: "What drives Clackamas County moving costs",
    intro: "Hills/HOA friction and I-205 portal time drive quotes more than bedroom count alone.",
    drivers: [
      { title: "Hillside stairs & grades", detail: "Oregon City and river-town labor hours spike." },
      { title: "HOA soft costs", detail: "Gate lists push peak windows." },
      { title: "I-205 / OR-99E congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "Rain staging soft costs", detail: "Wet-weather packing adds labor." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$500–$1,550+", note: "Higher with hills or elevators" },
      { label: "2–3BR condo or modest SFH", value: "$1,450–$4,100+", note: "HOA/hill friction trends up" },
      { label: "3–4+ BR / cross-metro", value: "$2,700–$8,200+", note: "Long I-205 pairs highest" },
      { label: "Typical 2-person crew rate", value: "$115–$190+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Clackamas County",
    intro: "School-year suburb demand, rainy winters, summer peak, and wildfire-smoke days reshape SE-metro windows.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Clear curb and reduce I-205 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book HOA Saturdays early." },
      { title: "Month-end multi-family turns", detail: "Clackamas multi-unit fills first." },
      { title: "Wildfire-smoke contingency", detail: "Confirm outdoor staging flexibility on smoke days." }
    ],
  },
  specialized: [
    {
      id: "clackamas-se-metro-oregon-city",
      title: "SE/south metro & Oregon City module",
      intro: "Clackamas estimates fail when hillside access, HOA packets, or I-205 empty miles are treated like downtown Portland jobs.",
      bullets: ["Photo Oregon City grades and street width before truck sizing.","Collect Happy Valley/West Linn HOA packets early.","Price I-205/OR-99E pairs portal-to-portal.","Clarify Clackamas vs Multnomah/Washington destinations on multi-county estimates.","Verify ODOT household goods authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Clackamas County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Oregon City, North Clackamas, West Linn-Wilsonville, Lake Oswego, Canby, and other districts serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools and Oregon Department of Education data beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Providence Willamette Falls, Kaiser south-metro sites, Legacy affiliates, and Portland systems (via commute) serve the county. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from Happy Valley and Wilsonville into major campuses. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Historic hillside vs HOA growth stock", detail: "Oregon City product differs from Happy Valley two-stories." },
          { title: "Cost variation", detail: "River-town premium stock often prices differently from far-south small-town SFH." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Oregon City pattern", detail: "Historic hills with stair and grade tradeoffs." },
          { title: "Happy Valley / Clackamas growth", detail: "HOA product with I-205 logistics." },
          { title: "West Linn / river-town pattern", detail: "Premium hillside stock with OR-43 timing." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Healthcare, logistics, retail corridors, manufacturing, and Portland-commute professional jobs shape employment." },
          { title: "Commute realism", detail: "I-205 and OR-99E peaks are real for Portland-bound workers." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "SE/south metro identity", detail: "Clackamas is SE Portland metro collar — not Multnomah core elevators or Silicon Forest defaults." },
          { title: "Climate", detail: "Wet winters, warm summers, and occasional wildfire smoke. Plan outdoor staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Clackamas County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify ODOT household goods authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Clackamas County — official site", href: "https://www.clackamas.us/", external: true },
      { label: "TripCheck traffic (ODOT)", href: "https://www.tripcheck.com/", external: true }
    ],
  },
  directoryHint: "Prefer hillside/HOA experience and honest I-205 pricing. Verify ODOT in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
