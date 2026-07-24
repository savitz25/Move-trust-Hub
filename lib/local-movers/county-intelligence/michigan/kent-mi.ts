import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeMiPack } from '@/lib/local-movers/county-intelligence/michigan/mi-shared';

export const kentCountyMiIntelligence: CountyIntelligencePack = finalizeMiPack({
  countySlug: "kent",
  hubTitle: "Kent County Moving Intelligence Hub",
  eyebrow: "Kent · Grand Rapids west-MI hub & US-131/I-96 logistics",
  h1: "Moving in Kent County: Grand Rapids Access, West Michigan Hubs & US-131/I-96 Logistics",
  heroOpener: "Kent County is West Michigan’s metro engine: downtown Grand Rapids elevators, Eastown and Heritage Hill older stock, Wyoming/Kentwood multi-family, and US-131/I-96/I-196 portal time that is not Detroit SE Michigan logistics and not Holland lakeshore product. A downtown GR condo, a Heritage Hill stairs job, a Cascade HOA two-story, and a Wyoming multi-unit turn do not share truck access or empty-mile risk. This hub is for Kent — not a renamed Wayne page or Ottawa lakeshore clone.",
  heroCredibility:
    'Michigan motor carrier / household goods authority (MSP CVED) for intrastate MI moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-96 · I-196 · US-131 · M-6 · 28th Street corridors",
  whatMakesDifferent: {
    title: "What makes moving in Kent County different",
    intro: "These are Grand Rapids / West Michigan realities — furniture/manufacturing adjacency, lake-effect winter, and US-131 logistics — not SE Michigan corporate collars.",
    bullets: [
      {
        title: "Grand Rapids core elevators and Heritage Hill stairs rewrite labor hours",
        detail: "Downtown COIs and older near-core stock differ from suburban HOA product.",
      },
      {
        title: "West Michigan is not Detroit metro logistics",
        detail: "US-131/I-96 patterns and lake-effect timing differ from I-75/I-94 SE Michigan defaults.",
      },
      {
        title: "Wyoming / Kentwood multi-family lease waves cluster crews",
        detail: "Month-end turns fill elevators first along south and east belts.",
      },
      {
        title: "I-96 / I-196 / US-131 define portal-to-portal time",
        detail: "Cross-metro pairs look local on maps and regional at peak.",
      },
      {
        title: "Furniture, manufacturing, and healthcare relo calendars matter",
        detail: "Hard report dates appear on West Michigan employer moves.",
      },
      {
        title: "Intrastate Michigan motor carrier authority vs interstate FMCSA",
        detail: "Moves entirely within Michigan by household goods carriers are generally subject to Michigan motor carrier / household goods operating authority under the Motor Carrier Act, administered through MSP CVED. Match the legal name on the estimate to Michigan authority search tools before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "Kent access zones",
  zonesIntro: "Plan by downtown/Heritage Hill, east GR suburbs, Wyoming/Kentwood multi-family, and north/west township growth.",
  zones: [
    {
      id: "gr-downtown",
      name: "Downtown Grand Rapids & Heritage Hill",
      shortName: "Downtown GR",
      neighborhoods: ["Downtown Grand Rapids","Heritage Hill","Eastown edges","Midtown edges"],
      housingTypes: "High-rises, mid-rises, historic SFH, multi-unit",
      challenges: ["Elevators and COI","Stairs and tight streets","Event-day congestion"],
      moverTips: "Get building packets early. Survey Heritage Hill stair width and curb.",
      cityKeywords: ["grand rapids","heritage hill","eastown","downtown"],
    },
    {
      id: "east-gr",
      name: "East Grand Rapids & Cascade edges",
      shortName: "East GR / Cascade",
      neighborhoods: ["East Grand Rapids","Cascade","Ada edges","Forest Hills corridors"],
      housingTypes: "HOA SFH, multi-family, executive stock",
      challenges: ["HOA rules","I-96 / M-6 timing","Longer portal time to core"],
      moverTips: "Collect HOA packets. Price east-side pairs portal-to-portal.",
      cityKeywords: ["east grand rapids","cascade","ada"],
    },
    {
      id: "wyoming-kentwood",
      name: "Wyoming, Kentwood & south multi-family belt",
      shortName: "Wyoming / Kentwood",
      neighborhoods: ["Wyoming","Kentwood","Byron Center edges","28th Street corridors"],
      housingTypes: "Multi-family, SFH, commercial-adjacent stock",
      challenges: ["28th Street congestion","Lease-end waves","Elevator reservations"],
      moverTips: "Book elevators early for month-end. Avoid peak 28th Street when flexible.",
      cityKeywords: ["wyoming","kentwood","byron center"],
    },
    {
      id: "north-west-kent",
      name: "Walker, Alpine & north/west township edges",
      shortName: "North/west Kent",
      neighborhoods: ["Walker","Alpine Twp edges","Comstock Park edges","Rockford edges"],
      housingTypes: "SFH, multi-family, growth suburbs",
      challenges: ["US-131 congestion","Longer empty miles","Winter lake-effect"],
      moverTips: "Price north/west pairs honestly. Confirm winter driveway access.",
      cityKeywords: ["walker","rockford","comstock park"],
    }
  ],
  costDrivers: {
    title: "What drives Kent County moving costs",
    intro: "Core elevator/stair friction and US-131/I-96 portal time drive quotes more than bedroom count alone.",
    drivers: [
      { title: "Downtown elevator & Heritage Hill stairs", detail: "Labor hours dominate near-core jobs." },
      { title: "US-131 / I-96 / I-196 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "South-belt multi-family lease waves", detail: "Month-end demand clusters." },
      { title: "Lake-effect winter contingency", detail: "West Michigan snow can slip schedules." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$450–$1,500+", note: "Higher with elevators or stairs" },
      { label: "2–3BR condo or modest SFH", value: "$1,400–$3,900+", note: "Core friction trends up" },
      { label: "3–4+ BR / cross-metro", value: "$2,500–$7,200+", note: "Downtown towers and long pairs highest" },
      { label: "Typical 2-person crew rate", value: "$110–$180+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Kent County",
    intro: "West Michigan lake-effect winter, summer peak, and multi-family lease turns reshape windows.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Clear curb and reduce US-131/28th Street pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "Month-end multi-family turns", detail: "Wyoming/Kentwood elevators fill first." },
      { title: "Lake-effect winter", detail: "Confirm contingency for driveway and curb staging." }
    ],
  },
  specialized: [
    {
      id: "grand-rapids-west-mi-hub",
      title: "Grand Rapids west-MI hub module",
      intro: "Kent estimates fail when downtown access, Heritage Hill stairs, or US-131 empty miles are treated like SE Michigan defaults.",
      bullets: ["Request downtown GR building packets early; survey Heritage Hill stairs.","Price US-131/I-96/I-196 pairs portal-to-portal.","Do not reuse Detroit I-75/I-94 timing assumptions for West Michigan.","Clarify Kent vs Ottawa destinations on lakeshore-adjacent estimates.","Verify Michigan motor carrier authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Kent County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Grand Rapids Public Schools and numerous suburban districts (East Grand Rapids, Forest Hills, Kentwood, and others) serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools and Michigan Department of Education data beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Corewell Health (Spectrum legacy), University of Michigan Health-West, and other systems serve West Michigan corridors. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from suburban belts into major campuses. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Core historic/condo vs belt multi-family", detail: "Heritage Hill and downtown product differs from Wyoming/Kentwood multi-unit stock." },
          { title: "Cost variation", detail: "East Grand Rapids and Cascade often price differently from south-belt multi-family." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Downtown / Eastown lifestyle", detail: "Walkable amenities with elevator and stair tradeoffs." },
          { title: "East GR / Cascade pattern", detail: "HOA product with longer portal time to core jobs." },
          { title: "Wyoming / Kentwood pattern", detail: "Multi-family density with 28th Street logistics." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Healthcare, furniture/manufacturing, logistics, education, and professional services shape West Michigan employment." },
          { title: "Commute realism", detail: "US-131, I-96, and 28th Street peaks are real. Test drive peak routes across the belt." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "West Michigan identity", detail: "Kent is Grand Rapids metro — not Detroit SE Michigan collars or pure lakeshore Holland product as the default." },
          { title: "Climate", detail: "Lake-effect snow is a real planning factor. Confirm winter staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Kent County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Michigan motor carrier / household goods authority (MSP CVED) for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Kent County — official site", href: "https://www.accesskent.com/", external: true },
      { label: "City of Grand Rapids", href: "https://www.grandrapidsmi.gov/", external: true },
      { label: "MiDrive traffic (MDOT)", href: "https://mdotjboss.state.mi.us/MiDrive/", external: true }
    ],
  },
  directoryHint: "Prefer downtown GR elevator and Heritage Hill stair experience with honest US-131 pricing. Verify Michigan motor carrier authority in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
