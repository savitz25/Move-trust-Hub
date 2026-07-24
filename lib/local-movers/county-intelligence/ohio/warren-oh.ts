import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeOhPack } from '@/lib/local-movers/county-intelligence/ohio/oh-shared';

export const warrenCountyOhIntelligence: CountyIntelligencePack = finalizeOhPack({
  countySlug: "warren",
  hubTitle: "Warren County Moving Intelligence Hub",
  eyebrow: "Warren · NE Cincinnati collar — Mason/Lebanon (not urban Cincinnati)",
  h1: "Moving in Warren County: Mason/Lebanon Growth, HOA Villages & I-71 Logistics",
  heroOpener: "Warren County is Cincinnati’s northeast growth collar: Mason multi-family and HOA density, Lebanon and Springboro town corridors, longer empty miles from urban Cincinnati yards, and I-71/I-75-link logistics that are not Over-the-Rhine elevators and not Mount Adams stairs. A Mason townhome, a Lebanon multi-family unit, a Springboro HOA two-story, and a rural-edge lot do not share truck access. This hub is for Warren — not urban Hamilton County and not Butler’s west/north collar.",
  heroCredibility:
    'PUCO household goods authority for intrastate OH moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-71 · I-75 links · SR-48 · US-22/3 · SR-123 · Mason-Montgomery Rd",
  whatMakesDifferent: {
    title: "What makes moving in Warren County different",
    intro: "Northeast Cincinnati collar growth — not urban Cincinnati hills and not Butler West Chester product as the default.",
    bullets: [
      {
        title: "Mason HOA and multi-family dominate growth corridors",
        detail: "Gate lists, approved hours, and elevator buildings are routine.",
      },
      {
        title: "Empty miles from Cincinnati yards are real",
        detail: "Even “local” Warren pairs can price as distance work for city-based crews.",
      },
      {
        title: "I-71 / Mason-Montgomery Rd define portal time",
        detail: "Cross-county pairs burn clock at peak.",
      },
      {
        title: "Lebanon and Springboro are different from Mason density",
        detail: "Do not price county-seat stock like Mason master plans.",
      },
      {
        title: "Warren is not Hamilton County urban product",
        detail: "NE growth logistics differ from Cincinnati hills/stairs micro-markets.",
      },
      {
        title: 'Intrastate OH rules vs interstate authority',
        detail:
          'Moves entirely within Ohio are generally subject to Public Utilities Commission of Ohio (PUCO) household goods authority. Interstate legs need active FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: "Warren access zones",
  zonesIntro: "Plan by Mason growth, Lebanon core, Springboro/western approaches, and eastern rural edges.",
  zones: [
    {
      id: "mason",
      name: "Mason multi-family & HOA growth",
      shortName: "Mason",
      neighborhoods: ["Mason","Mason-Montgomery Rd multi-family","HOA master plans","Deerfield Township edges"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["HOA rules","I-71 congestion","Elevator buildings"],
      moverTips: "Collect HOA packets. Reserve elevators in writing. Build I-71 buffer.",
      cityKeywords: ["mason","deerfield township","mason-montgomery"],
    },
    {
      id: "lebanon",
      name: "Lebanon core & county-seat corridors",
      shortName: "Lebanon",
      neighborhoods: ["Lebanon","US-42 corridors","City multi-family"],
      housingTypes: "Multi-family, SFH, twins",
      challenges: ["Mixed access types","SR-48 / US-42 congestion","Longer empty miles to Cincinnati"],
      moverTips: "Photo curb. Prefer mid-week mornings. Do not price as Mason HOA default.",
      cityKeywords: ["lebanon","lebanon ohio"],
    },
    {
      id: "springboro-west",
      name: "Springboro & western approaches",
      shortName: "Springboro / west",
      neighborhoods: ["Springboro","Franklin edges (verify county)","SR-73 multi-family","HOA villages"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["HOA rules","I-75 link congestion","Cross-county confusion"],
      moverTips: "Clarify Warren vs Montgomery addresses. Collect HOA packets.",
      cityKeywords: ["springboro","franklin ohio edges"],
    },
    {
      id: "east-rural",
      name: "Eastern rural edges & small towns",
      shortName: "East rural",
      neighborhoods: ["Waynesville edges","Morrow edges","Rural driveway lots"],
      housingTypes: "SFH, rural-edge lots",
      challenges: ["Long empty miles","Soft surfaces after rain","Limited alternate routes"],
      moverTips: "Survey driveway and truck turn radius. Prefer early starts.",
      cityKeywords: ["waynesville","morrow","rural warren"],
    }
  ],
  costDrivers: {
    title: "What drives Warren County moving costs",
    intro: "HOA soft costs and Cincinnati-linked empty miles drive quotes.",
    drivers: [
      { title: "Longer empty miles from Cincinnati yards", detail: "Distance work disguised as “local.”" },
      { title: "Mason HOA gate lists and elevators", detail: "Soft costs push demand into peak windows." },
      { title: "I-71 / Mason-Montgomery Rd congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "Rural-edge access friction", detail: "Driveway surveys matter more than ZIP codes." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$450–$1,350+", note: "Higher with HOA soft costs" },
      { label: "2–3BR HOA SFH or multi-family", value: "$1,400–$3,900+", note: "Long portal times trend up" },
      { label: "3–4+ BR / long Cincinnati-linked", value: "$2,600–$7,500+", note: "Cross-county pairs price highest" },
      { label: "Typical 2-person crew rate", value: "$110–$180+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Warren County",
    intro: "Family seasons and multi-family lease turns reshape growth-corridor access.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Reduce I-71 pain and clear HOA hours." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "Month-end multi-family turns", detail: "Mason multi-unit fills first." },
      { title: "Winter ice and snow", detail: "Confirm contingency for driveway access." }
    ],
  },
  specialized: [
    {
      id: "warren-ne-cincy-collar",
      title: "NE Cincinnati collar Mason/Lebanon module",
      intro: "Warren estimates fail when empty miles or Mason HOA rules are ignored.",
      bullets: ["Collect Mason HOA and elevator packets early.","Price Cincinnati-linked pairs as logistics days.","Do not reuse Over-the-Rhine or Mount Adams assumptions here.","Clarify Warren vs Hamilton/Butler/Montgomery destinations.","Verify PUCO authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Warren County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Multiple independent school districts (Mason, Lebanon, Springboro, Kings, and others) serve different addresses. Confirm zoning carefully." },
          { title: "Growth areas", detail: "Mason and Springboro corridors can see enrollment pressure. Ask about capacity when touring." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "TriHealth, UC Health, Cincinnati Children’s regional access, and local facilities serve residents. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour times into Cincinnati specialty care. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Mason growth product vs Lebanon stock", detail: "Master-planned HOA and multi-family dominate Mason; Lebanon and rural edges remain more mixed or rural." },
          { title: "Cost variation", detail: "Mason corridors often price differently from eastern rural townships." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Mason lifestyle", detail: "Growth amenities with HOA logistics and I-71 commute risk." },
          { title: "Lebanon pattern", detail: "County-seat town living with mixed stock access." },
          { title: "Springboro / rural lifestyle", detail: "Family SFH or space with longer empty-mile move logistics." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Many residents commute into Cincinnati or Dayton; local corporate, healthcare, retail, and logistics also employ residents." },
          { title: "Commute realism", detail: "I-71 and Mason-Montgomery peaks are real. Test drive peak routes into the city." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "NE collar identity", detail: "Warren is distinct from urban Cincinnati hills and Butler west/north collar towns." },
          { title: "Climate", detail: "Hot humid summers and winter ice/snow. Plan staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Warren County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify PUCO household goods authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Warren County, OH — official site", href: "https://www.warrencountyohio.gov/", external: true },
      { label: "City of Mason", href: "https://www.imaginemason.org/", external: true },
      { label: "OHGO traffic (ODOT)", href: "https://ohgo.com/", external: true }
    ],
  },
  directoryHint: "Prefer Mason HOA fluency and honest long-run pricing from Cincinnati yards — not urban hills defaults. Verify PUCO in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
