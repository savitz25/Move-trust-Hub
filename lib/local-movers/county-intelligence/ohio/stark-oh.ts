import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeOhPack } from '@/lib/local-movers/county-intelligence/ohio/oh-shared';

export const starkCountyOhIntelligence: CountyIntelligencePack = finalizeOhPack({
  countySlug: "stark",
  hubTitle: "Stark County Moving Intelligence Hub",
  eyebrow: "Stark · Canton regional market (not Akron or Cleveland clone)",
  h1: "Moving in Stark County: Canton Access, Township Runs & I-77/US-30 Logistics",
  heroOpener: "Stark County is a Canton-centered regional market: city multi-unit and older stock, North Canton and Jackson Township growth, Massillon corridors, and I-77/US-30 logistics that are not Akron SR-8 defaults and not Cleveland lake-effect micro-markets. A Canton multi-family unit, a North Canton HOA home, a Massillon twin, and a rural-edge lot do not share truck access or empty-mile risk. This hub is for Stark — not a Summit rename.",
  heroCredibility:
    'PUCO household goods authority for intrastate OH moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-77 · US-30 · US-62 · I-76 links · SR-43 · Tuscarawas St",
  whatMakesDifferent: {
    title: "What makes moving in Stark County different",
    intro: "Canton regional city-and-township fabric — not Akron industrial mix or Cleveland Shoreway product.",
    bullets: [
      {
        title: "Canton multi-unit differs from northern suburban HOA product",
        detail: "Access surveys matter more than “northeast Ohio” labels.",
      },
      {
        title: "I-77 / US-30 define portal time",
        detail: "Cross-county pairs burn clock at peak.",
      },
      {
        title: "Tuscarawas St and city arterials change staging",
        detail: "Event and retail congestion differ from pure freeway pricing.",
      },
      {
        title: "Akron- and Cleveland-linked pairs are regional",
        detail: "Keep county lines clear for drive time assumptions.",
      },
      {
        title: "Stark is not Summit or Cuyahoga",
        detail: "Do not reuse Akron or Cleveland assumptions as Canton defaults.",
      },
      {
        title: 'Intrastate OH rules vs interstate authority',
        detail:
          'Moves entirely within Ohio are generally subject to Public Utilities Commission of Ohio (PUCO) household goods authority. Interstate legs need active FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: "Stark access zones",
  zonesIntro: "Plan by Canton city, North Canton/Jackson growth, Massillon corridors, and rural edges.",
  zones: [
    {
      id: "canton-city",
      name: "Canton city multi-unit & older stock",
      shortName: "Canton city",
      neighborhoods: ["Downtown Canton","City multi-family","Tuscarawas St corridors","Older SFH pockets"],
      housingTypes: "Multi-family, twins, older SFH",
      challenges: ["Tight streets","Mixed stairs and elevators","Arterial congestion"],
      moverTips: "Photo curb. Confirm unit access type. Prefer mid-week mornings.",
      cityKeywords: ["canton","downtown canton","tuscarawas"],
    },
    {
      id: "north-canton-jackson",
      name: "North Canton, Jackson & northern growth",
      shortName: "North Canton / Jackson",
      neighborhoods: ["North Canton","Jackson Township","HOA villages","US-62 multi-family"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["HOA rules","I-77 congestion","Long portal time to Canton core"],
      moverTips: "Collect HOA packets. Build I-77 buffer.",
      cityKeywords: ["north canton","jackson township","green edges"],
    },
    {
      id: "massillon",
      name: "Massillon & western corridors",
      shortName: "Massillon",
      neighborhoods: ["Massillon","Perry edges","US-30 multi-family"],
      housingTypes: "SFH, multi-family, twins",
      challenges: ["US-30 congestion","Mixed access types","Longer empty miles"],
      moverTips: "Prefer early starts. Survey driveway depth.",
      cityKeywords: ["massillon","perry","us-30"],
    },
    {
      id: "rural-edges",
      name: "Southern & eastern rural edges",
      shortName: "Rural edges",
      neighborhoods: ["Alliance edges","Louisville edges","Rural driveway lots"],
      housingTypes: "SFH, rural-edge lots",
      challenges: ["Long empty miles","Soft surfaces after rain","Limited alternate routes"],
      moverTips: "Survey truck access. Prefer early starts for long pairs.",
      cityKeywords: ["alliance","louisville","rural stark"],
    }
  ],
  costDrivers: {
    title: "What drives Stark County moving costs",
    intro: "City multi-unit access and regional freeway portal time drive quotes.",
    drivers: [
      { title: "Canton multi-unit stairs and curb friction", detail: "Labor hours rise without elevators." },
      { title: "I-77 / US-30 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "Northern HOA soft costs", detail: "Gate lists push demand into peak windows." },
      { title: "Regional empty miles", detail: "Akron/Cleveland-linked pairs raise staging distance." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$400–$1,200+", note: "Higher with stairs" },
      { label: "2–3BR condo or modest SFH", value: "$1,200–$3,400+", note: "I-77 pairs trend up" },
      { label: "3–4+ BR / long regional", value: "$2,200–$6,200+", note: "Cross-county pairs price highest" },
      { label: "Typical 2-person crew rate", value: "$100–$165+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Stark County",
    intro: "Family seasons, multi-family lease turns, and winter ice/snow reshape access.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Reduce I-77/US-30 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "Month-end multi-family turns", detail: "Canton and North Canton multi-unit fill first." },
      { title: "Winter ice and snow", detail: "Confirm contingency for driveway access." }
    ],
  },
  specialized: [
    {
      id: "canton-regional-not-akron",
      title: "Canton regional (not Akron/Cleveland) module",
      intro: "Stark estimates fail when Canton is treated as an Akron or Cleveland clone.",
      bullets: ["Survey Canton multi-unit access carefully — not Akron SR-8 defaults.","Price I-77/US-30 pairs portal-to-portal.","Collect HOA packets for North Canton/Jackson growth product.","Clarify Stark vs Summit/Cuyahoga destinations.","Verify PUCO authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Stark County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Canton City Schools and numerous suburban districts (North Canton, Jackson, Massillon, and others) serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools, Ohio Department of Education data, and campus visits beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Aultman, Cleveland Clinic Mercy, and regional facilities serve residents. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from outer townships. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "City vs northern suburban stock", detail: "Older multi-unit in Canton; more HOA SFH in North Canton/Jackson corridors." },
          { title: "Cost variation", detail: "Northern suburbs often price differently from rural edges." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Canton city lifestyle", detail: "Multi-unit amenities with curb logistics." },
          { title: "North Canton / Jackson pattern", detail: "HOA growth with I-77 commute risk." },
          { title: "Massillon / rural lifestyle", detail: "Town or space living with longer empty-mile move logistics." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Healthcare, manufacturing, logistics, education, and retail shape employment." },
          { title: "Commute realism", detail: "I-77 and US-30 peaks are real. Test drive peak routes." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "Canton regional identity", detail: "Stark is distinct from Akron Summit fabric and Cleveland lake-effect micro-markets." },
          { title: "Climate", detail: "Four seasons with meaningful winter snow/ice. Plan staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Stark County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify PUCO household goods authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Stark County — official site", href: "https://www.starkcountyohio.gov/", external: true },
      { label: "City of Canton", href: "https://www.cantonohio.gov/", external: true },
      { label: "OHGO traffic (ODOT)", href: "https://ohgo.com/", external: true }
    ],
  },
  directoryHint: "Prefer Canton multi-unit experience and I-77 honesty — not Akron/Cleveland clone pricing. Verify PUCO in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
