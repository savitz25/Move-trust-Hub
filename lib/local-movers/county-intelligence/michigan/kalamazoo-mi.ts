import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeMiPack } from '@/lib/local-movers/county-intelligence/michigan/mi-shared';

export const kalamazooCountyMiIntelligence: CountyIntelligencePack = finalizeMiPack({
  countySlug: "kalamazoo",
  hubTitle: "Kalamazoo County Moving Intelligence Hub",
  eyebrow: "Kalamazoo · southwest MI regional hub, university influence & I-94/US-131",
  h1: "Moving in Kalamazoo County: Southwest Michigan Access, University Influence & I-94/US-131 Logistics",
  heroOpener: "Kalamazoo County is a southwest Michigan regional hub: downtown and Vine neighborhood older stock, Western Michigan University multi-unit waves, Portage suburban product, and I-94/US-131 portal time that is not Grand Rapids core logistics and not Detroit SE Michigan. A downtown Kalamazoo condo, a student multi-unit turn, and a Portage HOA two-story do not share truck access or empty-mile risk. This hub is for Kalamazoo — not a renamed Kent or Wayne page.",
  heroCredibility:
    'Michigan motor carrier / household goods authority (MSP CVED) for intrastate MI moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-94 · US-131 · M-43 · Stadium Drive corridors",
  whatMakesDifferent: {
    title: "What makes moving in Kalamazoo County different",
    intro: "These are Kalamazoo regional realities — university cycles, pharma/manufacturing adjacency, and I-94/US-131 logistics — not SE Michigan collars.",
    bullets: [
      {
        title: "WMU and campus-adjacent multi-unit waves cluster demand",
        detail: "Academic turns fill elevators and street parking first.",
      },
      {
        title: "Downtown / Vine older stock mixes stairs and tight streets",
        detail: "Access photos beat verbal promises on near-core blocks.",
      },
      {
        title: "Portage suburban product is not downtown product",
        detail: "HOA packets and longer empty miles rewrite quotes.",
      },
      {
        title: "I-94 / US-131 define portal-to-portal time",
        detail: "Pairs toward Chicago, GR, or Detroit look regional at peak.",
      },
      {
        title: "Southwest MI regional identity — not Detroit spillover",
        detail: "Treat Kalamazoo as its own hub with distinct inventory patterns.",
      },
      {
        title: "Intrastate Michigan motor carrier authority vs interstate FMCSA",
        detail: "Moves entirely within Michigan by household goods carriers are generally subject to Michigan motor carrier / household goods operating authority under the Motor Carrier Act, administered through MSP CVED. Match the legal name on the estimate to Michigan authority search tools before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "Kalamazoo access zones",
  zonesIntro: "Plan by downtown/Vine, WMU multi-family, Portage suburbs, and north/east township edges.",
  zones: [
    {
      id: "kzoo-downtown",
      name: "Downtown Kalamazoo & Vine neighborhood",
      shortName: "Downtown / Vine",
      neighborhoods: ["Downtown Kalamazoo","Vine","Stuart edges","near-core multi-unit"],
      housingTypes: "Multi-unit, older SFH, renovated stock, mid-rises",
      challenges: ["Stairs and tight streets","Scarce curb staging","Event-day congestion"],
      moverTips: "Survey stair width and curb. Prefer mid-week mornings.",
      cityKeywords: ["kalamazoo","vine","downtown"],
    },
    {
      id: "wmu-campus",
      name: "WMU campus multi-family belt",
      shortName: "WMU / campus",
      neighborhoods: ["WMU campus edges","West Main multi-family","student housing belts"],
      housingTypes: "Student multi-family, mid-rises, older SFH",
      challenges: ["Lease-end waves","Elevators and stairs","Stadium Drive congestion"],
      moverTips: "Book academic peaks early. Confirm elevator reservations.",
      cityKeywords: ["wmu","western michigan","stadium drive"],
    },
    {
      id: "portage",
      name: "Portage suburban belt",
      shortName: "Portage",
      neighborhoods: ["Portage","south Kalamazoo edges","Oakland Dr corridors"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["HOA rules","I-94 / US-131 timing","Longer portal time to core"],
      moverTips: "Collect HOA packets. Price Portage pairs portal-to-portal.",
      cityKeywords: ["portage"],
    },
    {
      id: "kzoo-edges",
      name: "Oshtemo, Comstock & outer edges",
      shortName: "Outer Kalamazoo",
      neighborhoods: ["Oshtemo Twp","Comstock Twp","Texas Twp edges","Parchment edges"],
      housingTypes: "SFH, multi-family, growth suburbs",
      challenges: ["Longer empty miles","M-43 timing","Winter access"],
      moverTips: "Price outer-township pairs honestly. Photo driveway access.",
      cityKeywords: ["oshtemo","comstock","parchment"],
    }
  ],
  costDrivers: {
    title: "What drives Kalamazoo County moving costs",
    intro: "Campus multi-unit access and I-94/US-131 portal time drive quotes more than bedroom count alone.",
    drivers: [
      { title: "Campus multi-unit & curb friction", detail: "Academic peaks spike labor hours." },
      { title: "Downtown stairs & tight streets", detail: "Near-core labor hours spike." },
      { title: "I-94 / US-131 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "HOA soft costs in Portage", detail: "Gate lists push demand into peak windows." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$420–$1,400+", note: "Higher near campus elevators" },
      { label: "2–3BR condo or modest SFH", value: "$1,300–$3,700+", note: "Campus/core friction trends up" },
      { label: "3–4+ BR / cross-metro", value: "$2,300–$6,800+", note: "I-94 long pairs highest" },
      { label: "Typical 2-person crew rate", value: "$100–$175+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Kalamazoo County",
    intro: "University calendars, family peaks, and winter ice reshape southwest Michigan windows.",
    items: [
      { title: "Best windows: mid-week outside academic peaks", detail: "Clear curb near WMU and downtown." },
      { title: "Academic peaks: August and May", detail: "Book multi-unit far ahead." },
      { title: "Peak family season: late May–mid-August", detail: "Book Portage Saturdays early." },
      { title: "Winter ice and snow", detail: "Confirm contingency for driveway access." }
    ],
  },
  specialized: [
    {
      id: "kalamazoo-sw-mi-university-regional",
      title: "Kalamazoo southwest MI & university influence module",
      intro: "Kalamazoo estimates fail when WMU lease waves, downtown stairs, or I-94/US-131 empty miles are ignored.",
      bullets: ["Align multi-unit moves with WMU calendars when possible.","Survey Vine/downtown stair width and curb before final quotes.","Price I-94/US-131 pairs portal-to-portal toward Chicago, GR, or Detroit.","Treat Portage HOA product as distinct from downtown stock.","Verify Michigan motor carrier authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Kalamazoo County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Kalamazoo Public Schools, Portage, Comstock, and other districts serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools and Michigan Department of Education data beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Bronson Methodist, Ascension Borgess, and other systems serve southwest Michigan corridors. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from Portage and Oshtemo into major campuses. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Downtown/Vine multi-unit vs Portage HOA stock", detail: "Near-core product differs sharply from south suburban two-stories." },
          { title: "Cost variation", detail: "Campus-adjacent renovated stock often prices differently from outer-township SFH." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Downtown / Vine lifestyle", detail: "Walkable amenities with stair and curb tradeoffs." },
          { title: "WMU multi-unit pattern", detail: "Student density and academic calendars." },
          { title: "Portage suburban pattern", detail: "HOA product with I-94/US-131 logistics." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Healthcare, higher education, manufacturing/pharma adjacency, and logistics shape employment." },
          { title: "Commute realism", detail: "I-94 and US-131 peaks are real for Chicago and GR-bound workers." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "Southwest MI regional identity", detail: "Kalamazoo is its own hub — not Grand Rapids downtown defaults or Detroit SE Michigan collars." },
          { title: "Climate", detail: "Hot humid summers and winter ice/snow. Plan outdoor staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Kalamazoo County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Michigan motor carrier / household goods authority (MSP CVED) for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Kalamazoo County — official site", href: "https://www.kalcounty.com/", external: true },
      { label: "City of Kalamazoo", href: "https://www.kalamazoocity.org/", external: true },
      { label: "MiDrive traffic (MDOT)", href: "https://mdotjboss.state.mi.us/MiDrive/", external: true }
    ],
  },
  directoryHint: "Prefer campus multi-unit and downtown stair experience with honest I-94/US-131 pricing. Verify Michigan motor carrier authority in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
