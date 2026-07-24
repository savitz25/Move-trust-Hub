import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeOhPack } from '@/lib/local-movers/county-intelligence/ohio/oh-shared';

export const franklinCountyOhIntelligence: CountyIntelligencePack = finalizeOhPack({
  countySlug: "franklin",
  hubTitle: "Franklin County Moving Intelligence Hub",
  eyebrow: "Franklin · Columbus core, Short North, German Village & I-270 ring",
  h1: "Moving in Franklin County: Columbus Core, Short North Access & I-270 Logistics",
  heroOpener: "Franklin County is Columbus’s metro engine: Short North and German Village curb friction, downtown and Arena District elevators, University District lease waves, and I-270/I-70/I-71 portal time that is not Cleveland lake-effect logistics and not Cincinnati hillside stairs. A Short North condo, a German Village brick rowhouse, a Dublin HOA two-story, and a Reynoldsburg multi-family unit do not share truck access or empty-mile risk. This hub is for Franklin — not a northeast-Ohio clone or renamed Cincinnati page.",
  heroCredibility:
    'PUCO household goods authority for intrastate OH moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-70 · I-71 · I-270 · I-670 · US-23 · US-33",
  whatMakesDifferent: {
    title: "What makes moving in Franklin County different",
    intro: "These are Columbus realities — Short North curb limits, German Village brick stock, OSU lease pulses, and I-270 ring logistics — not Cleveland lakefront or Cincinnati hills.",
    bullets: [
      {
        title: "Short North and near-core curb limits rewrite labor hours",
        detail: "Limited legal truck length, long carries, and event-day staging define many downtown-adjacent jobs.",
      },
      {
        title: "German Village and older brick stock mix stairs and tight alleys",
        detail: "Access photos beat verbal promises on historic blocks.",
      },
      {
        title: "I-270 / I-70 / I-71 define portal-to-portal time",
        detail: "Cross-metro pairs look local on maps and regional at peak.",
      },
      {
        title: "University District and multi-family lease waves cluster crews",
        detail: "May/August and month-end turns fill elevators first.",
      },
      {
        title: "Outer-ring HOA product is not Short North product",
        detail: "Dublin, New Albany, and Hilliard access rules differ from German Village alleys — survey each address.",
      },
      {
        title: 'Intrastate OH rules vs interstate authority',
        detail:
          'Moves entirely within Ohio are generally subject to Public Utilities Commission of Ohio (PUCO) household goods authority. Interstate legs need active FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: "Franklin access zones",
  zonesIntro: "Plan by downtown/Short North, German Village/near-south, University District, and outer I-270 suburbs.",
  zones: [
    {
      id: "downtown-short-north",
      name: "Downtown, Arena District & Short North",
      shortName: "Downtown / Short North",
      neighborhoods: ["Downtown Columbus","Short North","Arena District","Victorian Village edges","Italian Village edges"],
      housingTypes: "High-rises, mid-rises, condos, renovated multi-unit",
      challenges: ["Elevators and COI","Scarce curb staging","Event-day congestion"],
      moverTips: "Get building packets early. Prefer mid-week morning freight windows. Avoid festival peaks when flexible.",
      cityKeywords: ["columbus","short north","downtown","arena district"],
    },
    {
      id: "german-village",
      name: "German Village & near-south brick stock",
      shortName: "German Village",
      neighborhoods: ["German Village","Schumacher Place","Merion Village edges","Brewery District edges"],
      housingTypes: "Brick rowhouses, twins, older SFH, limited multi-family",
      challenges: ["Tight alleys and streets","Stairs and long carries","Limited truck length"],
      moverTips: "Photo alley width and curb. Prefer smaller trucks when required.",
      cityKeywords: ["german village","brewery district","merion village"],
    },
    {
      id: "university-district",
      name: "University District & campus multi-family",
      shortName: "University District",
      neighborhoods: ["University District","OSU campus edges","Clintonville edges","High Street multi-family"],
      housingTypes: "Student multi-family, older SFH, mid-rises",
      challenges: ["Lease-end waves","Mixed elevators and stairs","I-71 / High Street congestion"],
      moverTips: "Book academic peaks early. Confirm unit access type.",
      cityKeywords: ["university district","osu","clintonville"],
    },
    {
      id: "i270-outer",
      name: "I-270 outer suburbs & HOA growth",
      shortName: "I-270 outer ring",
      neighborhoods: ["Dublin","Hilliard","New Albany edges","Reynoldsburg","Westerville edges","Grove City edges"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["HOA rules","I-270 congestion","Long portal time to core jobs"],
      moverTips: "Collect HOA packets. Price outer-ring pairs portal-to-portal.",
      cityKeywords: ["dublin","hilliard","new albany","westerville","reynoldsburg"],
    }
  ],
  costDrivers: {
    title: "What drives Franklin County moving costs",
    intro: "Core curb/elevator access and I-270 ring portal time drive quotes more than square footage alone.",
    drivers: [
      { title: "Short North / downtown elevator & curb friction", detail: "Labor and wait time dominate core jobs." },
      { title: "German Village alley long carries", detail: "Tight streets raise labor hours." },
      { title: "I-270 / I-70 / I-71 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "Outer-ring HOA soft costs", detail: "Gate lists push demand into peak windows." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$450–$1,400+", note: "Higher with elevators or tight alleys" },
      { label: "2–3BR condo or modest SFH", value: "$1,400–$3,900+", note: "Core curb friction trends up" },
      { label: "3–4+ BR / tower / cross-metro", value: "$2,600–$7,500+", note: "Downtown towers and long I-270 pairs highest" },
      { label: "Typical 2-person crew rate", value: "$110–$185+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Franklin County",
    intro: "OSU calendars, multi-family lease turns, heat/humidity, and winter ice reshape access.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Clear curb and reduce I-270/I-71 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "University lease waves", detail: "May/August clusters near University District multi-family." },
      { title: "Winter ice and snow", detail: "Confirm contingency for driveway and alley access." }
    ],
  },
  specialized: [
    {
      id: "columbus-short-north-german-village",
      title: "Columbus Short North, German Village & I-270 module",
      intro: "Franklin estimates fail when curb width, building packets, or I-270 empty miles are ignored.",
      bullets: ["Request downtown/Short North building packets at lease signing or escrow.","Survey alley width and truck length for German Village blocks.","Price I-270/I-70/I-71 pairs portal-to-portal.","Clarify Franklin vs Delaware/Licking/Fairfield destinations.","Verify PUCO authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Franklin County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Columbus City Schools and numerous suburban districts (Dublin, Hilliard, Westerville, New Albany, and others) serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools, Ohio Department of Education data, and campus visits beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "OhioHealth, Ohio State Wexner Medical Center, Nationwide Children’s, and Mount Carmel serve county corridors. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from outer I-270 suburbs into core specialty care. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Core brick/condo vs outer HOA stock", detail: "Short North and German Village product differs sharply from Dublin/New Albany HOA two-stories." },
          { title: "Cost variation", detail: "Near-core renovated stock often prices differently from far-ring multi-family." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Short North / downtown lifestyle", detail: "Walkable amenities with elevator and curb tradeoffs." },
          { title: "German Village pattern", detail: "Historic brick density with alley logistics." },
          { title: "I-270 outer-ring pattern", detail: "HOA product with longer portal time to core jobs." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "State government, OSU, healthcare, insurance, logistics, and tech/professional services shape employment." },
          { title: "Commute realism", detail: "I-270, I-70, and I-71 peaks are real. Test drive peak routes across the ring." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "Central-Ohio identity", detail: "Franklin is Columbus metro — not Cleveland lake-effect winters or Cincinnati hillside stairs as the default product." },
          { title: "Climate", detail: "Hot humid summers and winter ice/snow. Plan outdoor staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Franklin County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify PUCO household goods authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Franklin County — official site", href: "https://www.franklincountyohio.gov/", external: true },
      { label: "City of Columbus", href: "https://www.columbus.gov/", external: true },
      { label: "OHGO traffic (ODOT)", href: "https://ohgo.com/", external: true }
    ],
  },
  directoryHint: "Prefer Short North elevator/curb experience and German Village alley surveys; honest I-270 pricing. Verify PUCO in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
