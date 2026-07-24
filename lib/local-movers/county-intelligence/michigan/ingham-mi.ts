import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeMiPack } from '@/lib/local-movers/county-intelligence/michigan/mi-shared';

export const inghamCountyMiIntelligence: CountyIntelligencePack = finalizeMiPack({
  countySlug: "ingham",
  hubTitle: "Ingham County Moving Intelligence Hub",
  eyebrow: "Ingham · Lansing capital, MSU adjacency & I-96/I-69 logistics",
  h1: "Moving in Ingham County: Lansing Capital Access, MSU Cycles & I-96/I-69 Logistics",
  heroOpener: "Ingham County is capital-and-campus logistics: downtown Lansing government multi-unit, East Lansing MSU lease waves, Okemos/Haslett suburban product, and I-96/I-69/US-127 portal time that is not Detroit SE Michigan and not Ann Arbor research-corridor defaults. A downtown Lansing condo, an East Lansing student multi-unit, and an Okemos HOA two-story do not share truck access or empty-mile risk. This hub is for Ingham — not a renamed Washtenaw or Wayne page.",
  heroCredibility:
    'Michigan motor carrier / household goods authority (MSP CVED) for intrastate MI moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-96 · I-69 · US-127 · Saginaw Hwy corridors",
  whatMakesDifferent: {
    title: "What makes moving in Ingham County different",
    intro: "These are Lansing capital / MSU realities — government calendars, student lease waves, and I-96/I-69 logistics — not Detroit collar product.",
    bullets: [
      {
        title: "MSU lease cycles cluster East Lansing multi-unit demand",
        detail: "August/May turns fill elevators and street parking first.",
      },
      {
        title: "Capital and government relo calendars create hard dates",
        detail: "Session timing and agency transfers can compress windows.",
      },
      {
        title: "Okemos / Haslett suburban product differs from campus multi-unit",
        detail: "HOA packets and longer empty miles rewrite quotes.",
      },
      {
        title: "I-96 / I-69 / US-127 define portal-to-portal time",
        detail: "Pairs toward Detroit, Grand Rapids, or Flint look regional at peak.",
      },
      {
        title: "Not Ann Arbor and not Detroit by default",
        detail: "Capital + MSU mix is its own mid-Michigan pattern.",
      },
      {
        title: "Intrastate Michigan motor carrier authority vs interstate FMCSA",
        detail: "Moves entirely within Michigan by household goods carriers are generally subject to Michigan motor carrier / household goods operating authority under the Motor Carrier Act, administered through MSP CVED. Match the legal name on the estimate to Michigan authority search tools before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "Ingham access zones",
  zonesIntro: "Plan by downtown Lansing, East Lansing/MSU, Okemos/Haslett suburbs, and south/west township edges.",
  zones: [
    {
      id: "lansing-core",
      name: "Downtown Lansing & near-core multi-unit",
      shortName: "Downtown Lansing",
      neighborhoods: ["Downtown Lansing","REO Town edges","Old Town edges","near-capitol corridors"],
      housingTypes: "High-rises, mid-rises, multi-unit, renovated stock",
      challenges: ["Elevators and COI","Scarce curb staging","Government event traffic"],
      moverTips: "Get building packets early. Prefer mid-week mornings away from major capitol events.",
      cityKeywords: ["lansing","downtown lansing","old town"],
    },
    {
      id: "east-lansing-msu",
      name: "East Lansing & MSU multi-family",
      shortName: "East Lansing / MSU",
      neighborhoods: ["East Lansing","MSU campus edges","Grand River multi-family","student housing belts"],
      housingTypes: "Student multi-family, mid-rises, older SFH",
      challenges: ["Lease-end waves","Elevators and stairs","Campus congestion"],
      moverTips: "Book academic peaks early. Confirm elevator reservations and unit access type.",
      cityKeywords: ["east lansing","msu"],
    },
    {
      id: "okemos-haslett",
      name: "Okemos, Haslett & east suburban belt",
      shortName: "Okemos / Haslett",
      neighborhoods: ["Okemos","Haslett","Meridian Twp","Williamston edges"],
      housingTypes: "HOA SFH, multi-family, executive stock",
      challenges: ["HOA rules","I-96 / Saginaw Hwy timing","Longer portal time to campus"],
      moverTips: "Collect HOA packets. Price east-suburb pairs portal-to-portal.",
      cityKeywords: ["okemos","haslett","meridian"],
    },
    {
      id: "ingham-south-west",
      name: "Mason, Holt & south/west edges",
      shortName: "South/west Ingham",
      neighborhoods: ["Mason","Holt","Delhi Twp","Leslie edges","Onondaga edges"],
      housingTypes: "SFH, multi-family, small-town stock",
      challenges: ["US-127 timing","Longer empty miles","Winter access"],
      moverTips: "Price south/west pairs honestly. Photo driveway and street width.",
      cityKeywords: ["mason","holt","delhi"],
    }
  ],
  costDrivers: {
    title: "What drives Ingham County moving costs",
    intro: "Campus multi-unit access, capital-core elevators, and I-96/I-69 portal time drive quotes more than bedroom count alone.",
    drivers: [
      { title: "MSU multi-unit & curb friction", detail: "Academic peaks spike labor hours." },
      { title: "Downtown elevator & staging limits", detail: "Capitol-adjacent labor hours spike." },
      { title: "I-96 / I-69 / US-127 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "HOA soft costs on east suburbs", detail: "Gate lists push demand into peak windows." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$450–$1,500+", note: "Higher near campus elevators" },
      { label: "2–3BR condo or modest SFH", value: "$1,350–$3,900+", note: "Campus/core friction trends up" },
      { label: "3–4+ BR / cross-metro", value: "$2,400–$7,000+", note: "Long I-96/I-69 pairs highest" },
      { label: "Typical 2-person crew rate", value: "$105–$180+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Ingham County",
    intro: "MSU calendars, capital session timing, family peaks, and winter ice reshape Lansing-area windows.",
    items: [
      { title: "Best windows: mid-week outside academic peaks", detail: "Clear curb near MSU and downtown." },
      { title: "Academic peaks: August and May", detail: "Book East Lansing multi-unit far ahead." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "Winter ice and snow", detail: "Confirm contingency for driveway access." }
    ],
  },
  specialized: [
    {
      id: "lansing-capital-msu-ingham",
      title: "Lansing capital & MSU adjacency module",
      intro: "Ingham estimates fail when MSU lease waves, capitol-core elevators, or I-96/I-69 empty miles are ignored.",
      bullets: ["Align East Lansing multi-unit moves with MSU calendars when possible.","Request downtown Lansing building packets early.","Price I-96/I-69/US-127 pairs portal-to-portal.","Do not treat Ingham as Ann Arbor or Detroit product by default.","Verify Michigan motor carrier authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Ingham County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Lansing, East Lansing, Okemos, Haslett, Holt, Mason, and other districts serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools and Michigan Department of Education data beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Sparrow/University of Michigan Health-Sparrow, McLaren Greater Lansing, and other systems serve capital corridors. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from Okemos and Mason into major campuses. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Campus multi-unit vs east-suburb HOA stock", detail: "East Lansing product differs sharply from Okemos/Haslett two-stories." },
          { title: "Cost variation", detail: "Near-campus renovated stock often prices differently from south township SFH." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Downtown Lansing capital lifestyle", detail: "Government adjacency with elevator tradeoffs." },
          { title: "East Lansing / MSU pattern", detail: "Student multi-unit density and academic calendars." },
          { title: "Okemos / Haslett pattern", detail: "HOA product with longer portal time to core jobs." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "State government, MSU, healthcare, insurance, and professional services shape employment." },
          { title: "Commute realism", detail: "I-96, I-69, and US-127 peaks are real. Test drive peak routes before choosing a submarket." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "Capital + campus identity", detail: "Ingham is Lansing metro — not Detroit SE Michigan collars or Ann Arbor research-corridor defaults alone." },
          { title: "Climate", detail: "Hot humid summers and winter ice/snow. Plan outdoor staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Ingham County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Michigan motor carrier / household goods authority (MSP CVED) for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Ingham County — official site", href: "https://www.ingham.org/", external: true },
      { label: "City of Lansing", href: "https://www.lansingmi.gov/", external: true },
      { label: "MiDrive traffic (MDOT)", href: "https://mdotjboss.state.mi.us/MiDrive/", external: true }
    ],
  },
  directoryHint: "Prefer MSU multi-unit and downtown elevator experience with honest I-96/I-69 pricing. Verify Michigan motor carrier authority in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
