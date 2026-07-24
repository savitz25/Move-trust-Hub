import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeMiPack } from '@/lib/local-movers/county-intelligence/michigan/mi-shared';

export const washtenawCountyMiIntelligence: CountyIntelligencePack = finalizeMiPack({
  countySlug: "washtenaw",
  hubTitle: "Washtenaw County Moving Intelligence Hub",
  eyebrow: "Washtenaw · Ann Arbor university/tech & I-94/US-23 logistics",
  h1: "Moving in Washtenaw County: Ann Arbor University Cycles, Tech/Medical Access & I-94/US-23 Logistics",
  heroOpener: "Washtenaw County is university/tech metro, not Detroit spillover: Ann Arbor campus multi-family and lease waves, medical/research corridors, Ypsilanti mixed stock, and I-94/US-23/M-14 portal time that is not Wayne industrial logistics and not Lansing capital patterns. A central Ann Arbor condo, a student multi-unit turn, a Pittsfield HOA two-story, and a Ypsilanti walk-up do not share truck access or empty-mile risk. This hub is for Washtenaw — not a renamed Oakland or Detroit page.",
  heroCredibility:
    'Michigan motor carrier / household goods authority (MSP CVED) for intrastate MI moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-94 · US-23 · M-14 · State Street corridors",
  whatMakesDifferent: {
    title: "What makes moving in Washtenaw County different",
    intro: "These are Ann Arbor / Washtenaw realities — university calendars, tech/medical density, and constrained city access — not SE Michigan collar defaults.",
    bullets: [
      {
        title: "University of Michigan lease cycles cluster crews",
        detail: "August/May and academic turns fill elevators and street parking first.",
      },
      {
        title: "Central Ann Arbor curb limits rewrite labor hours",
        detail: "Limited staging and multi-unit stairs dominate near campus and downtown.",
      },
      {
        title: "Tech and medical relo calendars differ from pure family suburb moves",
        detail: "Hard report dates appear on research and hospital-adjacent transfers.",
      },
      {
        title: "I-94 / US-23 / M-14 define portal-to-portal time",
        detail: "Pairs toward Detroit metro look regional at peak despite map distance.",
      },
      {
        title: "Not a Detroit neighborhood clone",
        detail: "University multi-unit and research-corridor product differs from Wayne city stock.",
      },
      {
        title: "Intrastate Michigan motor carrier authority vs interstate FMCSA",
        detail: "Moves entirely within Michigan by household goods carriers are generally subject to Michigan motor carrier / household goods operating authority under the Motor Carrier Act, administered through MSP CVED. Match the legal name on the estimate to Michigan authority search tools before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "Washtenaw access zones",
  zonesIntro: "Plan by central Ann Arbor/campus, south/west A2 growth, Ypsilanti, and township edges toward I-94/US-23.",
  zones: [
    {
      id: "a2-campus",
      name: "Central Ann Arbor & campus multi-family",
      shortName: "Central A2 / campus",
      neighborhoods: ["Downtown Ann Arbor","Central Campus edges","Kerrytown edges","Old West Side edges"],
      housingTypes: "Student multi-family, condos, older SFH, mid-rises",
      challenges: ["Lease-end waves","Scarce curb staging","Elevators and stairs"],
      moverTips: "Book academic peaks early. Confirm elevator reservations and truck length.",
      cityKeywords: ["ann arbor","campus","kerrytown"],
    },
    {
      id: "a2-south-west",
      name: "South/west Ann Arbor & Pittsfield growth",
      shortName: "South/west A2",
      neighborhoods: ["Pittsfield Twp","Scio Twp edges","South State corridors","Briarwood edges"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["I-94 / State Street congestion","HOA rules","Longer portal time to campus"],
      moverTips: "Collect HOA packets. Price south/west pairs portal-to-portal.",
      cityKeywords: ["pittsfield","scio","ann arbor south"],
    },
    {
      id: "ypsilanti",
      name: "Ypsilanti city & EMU-adjacent stock",
      shortName: "Ypsilanti",
      neighborhoods: ["Ypsilanti","Depot Town edges","EMU campus edges","Superior Twp edges"],
      housingTypes: "Older multi-unit, SFH, student-adjacent stock",
      challenges: ["Stairs and tight streets","Student lease waves","I-94 timing"],
      moverTips: "Survey stair width and curb. Align with academic calendars when possible.",
      cityKeywords: ["ypsilanti","emu","depot town"],
    },
    {
      id: "washtenaw-edges",
      name: "Saline, Chelsea & outer township edges",
      shortName: "Outer Washtenaw",
      neighborhoods: ["Saline","Chelsea","Dexter edges","Manchester edges"],
      housingTypes: "SFH, multi-family, small-town stock",
      challenges: ["Longer empty miles","US-12 / I-94 timing","Winter access"],
      moverTips: "Price outer-township pairs honestly. Photo driveway and street width.",
      cityKeywords: ["saline","chelsea","dexter"],
    }
  ],
  costDrivers: {
    title: "What drives Washtenaw County moving costs",
    intro: "Campus multi-unit access and I-94/US-23 portal time drive quotes more than bedroom count alone.",
    drivers: [
      { title: "Campus multi-unit & curb friction", detail: "Academic peaks spike labor hours." },
      { title: "I-94 / US-23 / M-14 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "HOA soft costs on growth edges", detail: "Gate lists push demand into peak windows." },
      { title: "Winter ice contingency", detail: "Confirm driveway and curb access on storm days." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$500–$1,650+", note: "Higher near campus elevators" },
      { label: "2–3BR condo or modest SFH", value: "$1,500–$4,300+", note: "Campus friction trends up" },
      { label: "3–4+ BR / cross-metro", value: "$2,700–$8,000+", note: "Detroit-metro pairs and peaks highest" },
      { label: "Typical 2-person crew rate", value: "$115–$190+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Washtenaw County",
    intro: "University calendars dominate more than pure suburban family peaks — plan August/May carefully.",
    items: [
      { title: "Best windows: mid-week outside academic peaks", detail: "Clear curb near campus and State Street." },
      { title: "Academic peaks: August and May", detail: "Book multi-unit and elevators far ahead." },
      { title: "Peak family season still matters in townships", detail: "Book suburban Saturdays early." },
      { title: "Winter ice and snow", detail: "Confirm contingency for driveway access." }
    ],
  },
  specialized: [
    {
      id: "ann-arbor-university-tech-medical",
      title: "Ann Arbor university, tech & medical module",
      intro: "Washtenaw estimates fail when academic lease waves, campus curb limits, or I-94/US-23 empty miles are ignored.",
      bullets: ["Align multi-unit moves with U-M and EMU calendars when possible.","Request elevator packets early in central Ann Arbor.","Price I-94/US-23/M-14 pairs portal-to-portal toward Detroit metro.","Do not treat Washtenaw as a Detroit neighborhood clone.","Verify Michigan motor carrier authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Washtenaw County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Ann Arbor, Ypsilanti Community, Saline, Chelsea, Dexter, and other districts serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools and Michigan Department of Education data beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Michigan Medicine (U-M), Trinity Health Ann Arbor, and other systems dominate local care. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from township edges into medical campuses. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Campus multi-unit vs township HOA stock", detail: "Central Ann Arbor product differs sharply from Pittsfield and Saline two-stories." },
          { title: "Cost variation", detail: "Near-campus renovated stock often prices differently from outer-township SFH." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Central Ann Arbor lifestyle", detail: "Walkable university/tech amenities with curb tradeoffs." },
          { title: "South/west growth pattern", detail: "HOA product with I-94/State Street logistics." },
          { title: "Ypsilanti pattern", detail: "Mixed older stock with student-adjacent multi-unit." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "University of Michigan, healthcare/research, tech/startups, and education shape employment." },
          { title: "Commute realism", detail: "I-94, US-23, and M-14 peaks are real — especially toward Detroit metro employment." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "University/tech identity", detail: "Washtenaw is Ann Arbor metro — not Detroit industrial-suburban defaults or Lansing capital patterns." },
          { title: "Climate", detail: "Hot humid summers and winter ice/snow. Plan outdoor staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Washtenaw County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Michigan motor carrier / household goods authority (MSP CVED) for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Washtenaw County — official site", href: "https://www.washtenaw.org/", external: true },
      { label: "City of Ann Arbor", href: "https://www.a2gov.org/", external: true },
      { label: "MiDrive traffic (MDOT)", href: "https://mdotjboss.state.mi.us/MiDrive/", external: true }
    ],
  },
  directoryHint: "Prefer campus multi-unit and Ann Arbor curb experience with honest I-94/US-23 pricing. Verify Michigan motor carrier authority in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
