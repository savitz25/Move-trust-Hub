import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeInPack } from '@/lib/local-movers/county-intelligence/indiana/in-shared';

export const tippecanoeCountyInIntelligence: CountyIntelligencePack = finalizeInPack({
  countySlug: "tippecanoe",
  hubTitle: "Tippecanoe County Moving Intelligence Hub",
  eyebrow: "Tippecanoe · Lafayette/West Lafayette, Purdue cycles & I-65",
  h1: "Moving in Tippecanoe County: Lafayette–West Lafayette Access, Purdue Cycles & I-65 Logistics",
  heroOpener: "Tippecanoe County is Purdue university logistics — not Indianapolis collar product: West Lafayette multi-unit and lease waves, Lafayette multi-family, Wabash River access constraints, and I-65/US-52 portal time that is not Carmel HOA density and not Evansville river-city product. A near-campus multi-unit turn, a downtown Lafayette condo, and a south-side HOA two-story do not share truck access or empty-mile risk. This hub is for Tippecanoe — not a Marion clone.",
  heroCredibility:
    'Indiana DOR household goods operating authority (IC 8-2.1-22) for intrastate IN moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-65 · US-52 · US-231 · SR-26",
  whatMakesDifferent: {
    title: "What makes moving in Tippecanoe County different",
    intro: "These are Lafayette / Purdue realities — academic peaks, campus curb limits, and I-65 timing — not Indy north-suburb HOA defaults.",
    bullets: [
      {
        title: "Purdue lease cycles cluster West Lafayette multi-unit demand",
        detail: "August/May turns fill elevators and street parking first.",
      },
      {
        title: "West Lafayette campus access differs from Lafayette multi-family",
        detail: "Curb limits and building packets rewrite labor hours near campus.",
      },
      {
        title: "I-65 / US-52 define portal-to-portal time",
        detail: "Pairs toward Indy look regional at peak despite map distance.",
      },
      {
        title: "Not an Indianapolis collar clone",
        detail: "University multi-unit product differs from Carmel HOA growth.",
      },
      {
        title: "Wabash River and bridge approaches reshape staging plans",
        detail: "Confirm truck routing early for cross-river pairs.",
      },
      {
        title: "Intrastate Indiana DOR HHG authority vs interstate FMCSA",
        detail: "Moves entirely within Indiana by for-hire household goods carriers generally require a Certificate of Public Convenience and Necessity (Indiana Operating Authority) from the Indiana Department of Revenue Motor Carrier Services under IC 8-2.1-22. Match the legal name on the estimate to Indiana authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "Tippecanoe access zones",
  zonesIntro: "Plan by West Lafayette/Purdue, downtown Lafayette, south Lafayette growth, and north/east township edges.",
  zones: [
    {
      id: "west-lafayette-purdue",
      name: "West Lafayette & Purdue multi-family",
      shortName: "West Lafayette / Purdue",
      neighborhoods: ["West Lafayette","Purdue campus edges","Chauncey corridors","student multi-unit belts"],
      housingTypes: "Student multi-family, mid-rises, older SFH",
      challenges: ["Lease-end waves","Scarce curb staging","Elevators and stairs"],
      moverTips: "Book academic peaks early. Confirm elevator reservations and truck length.",
      cityKeywords: ["west lafayette","purdue"],
    },
    {
      id: "lafayette-core",
      name: "Downtown Lafayette & near-core multi-unit",
      shortName: "Downtown Lafayette",
      neighborhoods: ["Downtown Lafayette","near-core multi-family","Main Street corridors"],
      housingTypes: "Multi-unit, renovated stock, mid-rises",
      challenges: ["Curb staging","Elevators and stairs","Bridge approach timing"],
      moverTips: "Prefer mid-week mornings. Survey multi-unit access type.",
      cityKeywords: ["lafayette","downtown lafayette"],
    },
    {
      id: "south-lafayette",
      name: "South Lafayette suburban growth",
      shortName: "South Lafayette",
      neighborhoods: ["South Lafayette","McCutcheon edges","US-231 corridors"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["HOA rules","US-231 congestion","Longer portal time to campus"],
      moverTips: "Collect HOA packets. Price south pairs portal-to-portal.",
      cityKeywords: ["south lafayette"],
    },
    {
      id: "north-east",
      name: "Battle Ground, north/east township edges",
      shortName: "North/east edges",
      neighborhoods: ["Battle Ground edges","Dayton edges","I-65 corridors"],
      housingTypes: "SFH, multi-family, rural-adjacent stock",
      challenges: ["Longer empty miles","I-65 timing","Winter access"],
      moverTips: "Price outer pairs honestly. Photo driveway access.",
      cityKeywords: ["battle ground","dayton"],
    }
  ],
  costDrivers: {
    title: "What drives Tippecanoe County moving costs",
    intro: "Campus multi-unit access and I-65 portal time drive quotes more than bedroom count alone.",
    drivers: [
      { title: "Purdue multi-unit & curb friction", detail: "Academic peaks spike labor hours." },
      { title: "I-65 / US-52 / US-231 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "HOA soft costs on south growth", detail: "Gate lists push peak windows." },
      { title: "Bridge approach timing", detail: "Cross-river pairs add empty miles." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$400–$1,400+", note: "Higher near campus elevators" },
      { label: "2–3BR condo or modest SFH", value: "$1,250–$3,600+", note: "Campus friction trends up" },
      { label: "3–4+ BR / cross-metro", value: "$2,200–$6,800+", note: "Indy pairs highest" },
      { label: "Typical 2-person crew rate", value: "$95–$170+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Tippecanoe County",
    intro: "Purdue calendars dominate more than pure suburban peaks — plan August carefully.",
    items: [
      { title: "Best windows: mid-week outside academic peaks", detail: "Clear curb near Purdue and downtown." },
      { title: "Academic peaks: August and May", detail: "Book West Lafayette multi-unit far ahead." },
      { title: "Peak family season: late May–mid-August", detail: "Book south-side Saturdays early." },
      { title: "Winter ice and snow", detail: "Confirm driveway contingency." }
    ],
  },
  specialized: [
    {
      id: "lafayette-tippecanoe-purdue",
      title: "Lafayette Purdue university module",
      intro: "Tippecanoe estimates fail when academic lease waves or I-65 empty miles are treated like Indianapolis collar defaults.",
      bullets: ["Align multi-unit moves with Purdue calendars when possible.","Request elevator packets early in West Lafayette.","Price I-65 pairs portal-to-portal toward Indianapolis.","Do not treat Tippecanoe as a Marion or Hamilton clone.","Verify Indiana DOR household goods authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Tippecanoe County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      { id: "schools", title: "Schools & education landscape", bullets: [
          { title: "How districts work here", detail: "Lafayette, West Lafayette, Tippecanoe School Corporation, and other districts serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools and Indiana Department of Education data beat ranking screenshots." }
      ]},
      { id: "hospitals", title: "Hospitals & healthcare access", bullets: [
          { title: "Major systems", detail: "IU Health Arnett, Franciscan Health Lafayette, and other systems serve Wabash Valley corridors. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from south growth into major campuses. Transfer records early." }
      ]},
      { id: "housing", title: "Housing character & cost pressures", bullets: [
          { title: "Campus multi-unit vs south HOA stock", detail: "West Lafayette product differs sharply from south Lafayette two-stories." },
          { title: "Cost variation", detail: "Near-campus renovated stock often prices differently from outer multi-family." }
      ]},
      { id: "town-fit", title: "Which areas fit whom", bullets: [
          { title: "West Lafayette campus lifestyle", detail: "University density with curb and elevator tradeoffs." },
          { title: "Downtown Lafayette pattern", detail: "Multi-unit mix with bridge logistics." },
          { title: "South suburban pattern", detail: "HOA product with US-231 timing." }
      ]},
      { id: "jobs", title: "Jobs & commute patterns", bullets: [
          { title: "Employment anchors", detail: "Purdue University, healthcare, manufacturing, and professional services shape employment." },
          { title: "Commute realism", detail: "I-65 peaks toward Indianapolis are first-class planning factors." }
      ]},
      { id: "lifestyle", title: "Lifestyle & practical livability", bullets: [
          { title: "University identity", detail: "Tippecanoe is Lafayette/Purdue metro — not Indianapolis collar or Evansville river-city defaults." },
          { title: "Climate", detail: "Hot humid summers and winter ice/snow. Plan outdoor staging contingency." }
      ]},
    ],
  },
  resources: {
    title: "Useful Tippecanoe County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Indiana DOR household goods operating authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Tippecanoe County — official site", href: "https://www.tippecanoe.in.gov/", external: true },
      { label: "City of Lafayette", href: "https://www.lafayette.in.gov/", external: true },
      { label: "INDOT traffic", href: "https://www.in.gov/indot/", external: true }
    ],
  },
  directoryHint: "Prefer Purdue multi-unit experience and honest I-65 pricing. Verify Indiana DOR HHG authority in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
