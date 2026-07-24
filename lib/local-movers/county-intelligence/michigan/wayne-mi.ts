import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeMiPack } from '@/lib/local-movers/county-intelligence/michigan/mi-shared';

export const wayneCountyMiIntelligence: CountyIntelligencePack = finalizeMiPack({
  countySlug: "wayne",
  hubTitle: "Wayne County Moving Intelligence Hub",
  eyebrow: "Wayne · Detroit core, Downriver & I-75/I-94 logistics",
  h1: "Moving in Wayne County: Detroit Neighborhoods, Downriver Access & I-75/I-94 Logistics",
  heroOpener: "Wayne County is Detroit metro’s urban core: Midtown and Corktown curb limits, downtown elevators, Grosse Pointe and Dearborn neighborhood micro-markets, Downriver older stock, and I-75/I-94/I-96 portal time that is not Oakland’s north-metro HOA product and not Grand Rapids west-MI logistics. A Detroit walk-up, a Dearborn ranch, a Livonia multi-family unit, and a Downriver two-story do not share truck access or empty-mile risk. This hub is for Wayne — not an Oakland clone or renamed Ann Arbor page.",
  heroCredibility:
    'Michigan motor carrier / household goods authority (MSP CVED) for intrastate MI moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-75 · I-94 · I-96 · I-275 · M-10 · arterial grid",
  whatMakesDifferent: {
    title: "What makes moving in Wayne County different",
    intro: "These are Detroit/Wayne realities — neighborhood micro-markets, older urban stock, winter ice, and interstate access — not Troy corporate campuses or Ann Arbor campus cycles.",
    bullets: [
      {
        title: "Detroit neighborhood micro-markets rewrite access plans",
        detail: "Midtown, Corktown, Southwest, Eastside, and near-west blocks each change curb length, stairs, and staging rules.",
      },
      {
        title: "City vs Downriver vs west-Wayne product are not interchangeable",
        detail: "Downtown elevators and alley carries differ from Dearborn, Livonia, Westland, and Taylor two-stories.",
      },
      {
        title: "Older housing stock and multi-unit stairs raise labor hours",
        detail: "Photo stair width, parking, and long carries before truck sizing.",
      },
      {
        title: "I-75 / I-94 / I-96 define portal-to-portal time",
        detail: "Cross-metro pairs look local on maps and regional at peak or during winter storms.",
      },
      {
        title: "Auto-economy and corporate relo calendars still matter",
        detail: "Hard report dates and storage-in-transit appear on supplier and plant-adjacent moves.",
      },
      {
        title: "Intrastate Michigan motor carrier authority vs interstate FMCSA",
        detail: "Moves entirely within Michigan by household goods carriers are generally subject to Michigan motor carrier / household goods operating authority under the Motor Carrier Act, administered through MSP CVED. Match the legal name on the estimate to Michigan authority search tools before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "Wayne access zones",
  zonesIntro: "Plan by downtown/Midtown, eastside/Grosse Pointe edges, Dearborn/west-Wayne, and Downriver corridors.",
  zones: [
    {
      id: "detroit-core",
      name: "Downtown, Midtown & near-core Detroit",
      shortName: "Detroit core",
      neighborhoods: ["Downtown Detroit","Midtown","Corktown","New Center edges","Woodbridge edges"],
      housingTypes: "High-rises, mid-rises, walk-ups, renovated multi-unit",
      challenges: ["Elevators and COI","Scarce curb staging","Event-day congestion"],
      moverTips: "Get building packets early. Prefer mid-week morning freight windows. Survey alley and truck length.",
      cityKeywords: ["detroit","midtown","corktown","downtown"],
    },
    {
      id: "eastside-gp",
      name: "Eastside & Grosse Pointe edges",
      shortName: "Eastside / GP",
      neighborhoods: ["East English Village edges","Grosse Pointe Park edges","Harper Woods edges","St. Clair Shores edges"],
      housingTypes: "Older SFH, multi-unit, lakeshore-adjacent stock",
      challenges: ["Tree-lined street width","Basement/stairs access","I-94 peak timing"],
      moverTips: "Photo curb and driveway. Price I-94 portal time honestly for west-county pairs.",
      cityKeywords: ["grosse pointe","eastside","harper woods"],
    },
    {
      id: "dearborn-west",
      name: "Dearborn, Livonia & west-Wayne suburbs",
      shortName: "Dearborn / west-Wayne",
      neighborhoods: ["Dearborn","Dearborn Heights","Livonia","Westland","Garden City edges"],
      housingTypes: "SFH, multi-family, mid-century stock",
      challenges: ["I-94 / I-275 congestion","HOA and condo packets","Winter driveway access"],
      moverTips: "Collect building/HOA rules. Book around shift-change and storm forecasts.",
      cityKeywords: ["dearborn","livonia","westland"],
    },
    {
      id: "downriver",
      name: "Downriver corridor",
      shortName: "Downriver",
      neighborhoods: ["Taylor","Southgate","Wyandotte","Trenton edges","Allen Park edges","Lincoln Park edges"],
      housingTypes: "Older SFH, multi-family, industrial-adjacent stock",
      challenges: ["I-75 congestion","Older basements and stairs","Industrial traffic"],
      moverTips: "Clarify Downriver vs Detroit core destinations. Survey older stock access carefully.",
      cityKeywords: ["taylor","wyandotte","southgate","downriver"],
    }
  ],
  costDrivers: {
    title: "What drives Wayne County moving costs",
    intro: "Neighborhood access, multi-unit stairs/elevators, and I-75/I-94 portal time drive quotes more than square footage alone.",
    drivers: [
      { title: "Detroit core elevator & curb friction", detail: "Labor and wait time dominate near-core jobs." },
      { title: "Older stock long carries & stairs", detail: "Basements and walk-ups raise labor hours." },
      { title: "I-75 / I-94 / I-96 congestion", detail: "Portal-to-portal spikes at peak and in storms." },
      { title: "Winter ice & lake-effect contingency", detail: "Driveway and curb access can slip schedules." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$500–$1,600+", note: "Higher with elevators or long carries" },
      { label: "2–3BR condo or modest SFH", value: "$1,500–$4,200+", note: "Core curb friction trends up" },
      { label: "3–4+ BR / tower / cross-metro", value: "$2,800–$8,000+", note: "Downtown towers and long metro pairs highest" },
      { label: "Typical 2-person crew rate", value: "$115–$190+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Wayne County",
    intro: "Auto calendars, multi-family lease turns, summer peak, and lake-effect winter reshape access.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Clear curb and reduce I-75/I-94 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "Month-end multi-family turns", detail: "Elevator buildings fill first near core and west-Wayne." },
      { title: "Winter ice and lake-effect snow", detail: "Confirm contingency for driveway and curb staging." }
    ],
  },
  specialized: [
    {
      id: "detroit-wayne-neighborhoods-downriver",
      title: "Detroit neighborhoods, Downriver & interstate access module",
      intro: "Wayne estimates fail when neighborhood curb rules, older stock access, or I-75/I-94 empty miles are ignored.",
      bullets: ["Request downtown/Midtown building packets at lease signing or escrow.","Survey stair width and curb for older Detroit and Downriver stock.","Price I-75/I-94/I-96 pairs portal-to-portal — city vs Downriver vs west-Wayne differ.","Clarify Wayne vs Oakland/Macomb destinations on multi-county estimates.","Verify Michigan motor carrier authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Wayne County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Detroit Public Schools Community District and numerous suburban districts (Dearborn, Livonia, Grosse Pointe, and others) serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools, Michigan Department of Education data, and campus visits beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Henry Ford, Detroit Medical Center, Beaumont/Corewell sites, and other systems serve county corridors. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from Downriver and west-Wayne into core specialty care. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "City multi-unit vs suburban SFH stock", detail: "Detroit near-core product differs sharply from Livonia/Dearborn and Downriver two-stories." },
          { title: "Cost variation", detail: "Near-core renovated stock often prices differently from far-west multi-family." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Detroit core lifestyle", detail: "Walkable amenities with elevator and curb tradeoffs." },
          { title: "Dearborn / west-Wayne pattern", detail: "Suburban grids with I-94/I-275 commute realism." },
          { title: "Downriver pattern", detail: "Older SFH density with industrial-corridor logistics." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Auto OEMs and suppliers, healthcare, logistics, government, and professional services shape employment." },
          { title: "Commute realism", detail: "I-75, I-94, and I-96 peaks are real. Test drive peak routes across city and suburban pairs." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "SE Michigan identity", detail: "Wayne is Detroit metro core — not Oakland north-metro corporate campuses or Grand Rapids west-MI product as the default." },
          { title: "Climate", detail: "Hot humid summers and lake-effect winter ice/snow. Plan outdoor staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Wayne County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Michigan motor carrier / household goods authority (MSP CVED) for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Wayne County — official site", href: "https://www.waynecounty.com/", external: true },
      { label: "City of Detroit", href: "https://detroitmi.gov/", external: true },
      { label: "MiDrive traffic (MDOT)", href: "https://mdotjboss.state.mi.us/MiDrive/", external: true }
    ],
  },
  directoryHint: "Prefer Detroit neighborhood curb/elevator experience and honest I-75/I-94 pricing. Verify Michigan motor carrier authority in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
