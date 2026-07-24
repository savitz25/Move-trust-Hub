import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeOhPack } from '@/lib/local-movers/county-intelligence/ohio/oh-shared';

export const mahoningCountyOhIntelligence: CountyIntelligencePack = finalizeOhPack({
  countySlug: "mahoning",
  hubTitle: "Mahoning County Moving Intelligence Hub",
  eyebrow: "Mahoning · Youngstown regional market (not Cleveland or Akron)",
  h1: "Moving in Mahoning County: Youngstown Access, Valley Towns & I-80/I-680 Logistics",
  heroOpener: "Mahoning County is a Youngstown-centered regional market: city multi-unit and older stock, Boardman and Austintown corridors, Poland and Canfield suburban edges, and I-80/I-680 logistics that are not Cleveland lake-effect defaults and not Akron SR-8 product. A Youngstown multi-family unit, a Boardman HOA home, a Poland twin, and a rural-edge lot do not share truck access or empty-mile risk. This hub is for Mahoning — not a Cuyahoga or Summit rename.",
  heroCredibility:
    'PUCO household goods authority for intrastate OH moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-80 · I-680 · US-62 · SR-11 · Market St · Belmont Ave",
  whatMakesDifferent: {
    title: "What makes moving in Mahoning County different",
    intro: "Youngstown Valley city-and-suburb fabric — not Cleveland Shoreway logistics or Akron industrial mix as the default product.",
    bullets: [
      {
        title: "Youngstown multi-unit differs from Boardman suburban product",
        detail: "Access surveys matter more than “northeast Ohio” labels.",
      },
      {
        title: "I-80 / I-680 define portal time",
        detail: "Cross-county and PA-adjacent pairs burn clock at peak.",
      },
      {
        title: "Pennsylvania adjacency exists on eastern edges",
        detail: "Clarify Ohio PUCO vs FMCSA for destinations outside Ohio.",
      },
      {
        title: "Market St and Belmont Ave corridors change staging",
        detail: "Arterial congestion differs from pure freeway pricing.",
      },
      {
        title: "Mahoning is not Cuyahoga or Summit",
        detail: "Do not reuse Cleveland or Akron assumptions as Youngstown defaults.",
      },
      {
        title: 'Intrastate OH rules vs interstate authority',
        detail:
          'Moves entirely within Ohio are generally subject to Public Utilities Commission of Ohio (PUCO) household goods authority. Interstate legs need active FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: "Mahoning access zones",
  zonesIntro: "Plan by Youngstown city, Boardman/Austintown, southern Poland/Canfield, and eastern PA-adjacent edges.",
  zones: [
    {
      id: "youngstown-city",
      name: "Youngstown city multi-unit & older stock",
      shortName: "Youngstown city",
      neighborhoods: ["Downtown Youngstown","City multi-family","Market St corridors","Older SFH pockets"],
      housingTypes: "Multi-family, twins, older SFH",
      challenges: ["Tight streets","Mixed stairs and elevators","Arterial congestion"],
      moverTips: "Photo curb. Confirm unit access type. Prefer mid-week mornings.",
      cityKeywords: ["youngstown","downtown youngstown","market street"],
    },
    {
      id: "boardman-austintown",
      name: "Boardman, Austintown & commercial corridors",
      shortName: "Boardman / Austintown",
      neighborhoods: ["Boardman","Austintown","Belmont Ave multi-family","HOA villages"],
      housingTypes: "Multi-family, SFH, townhomes, HOA pockets",
      challenges: ["Belmont Ave congestion","HOA rules in pockets","Long portal time to city core"],
      moverTips: "Collect HOA packets where applicable. Prefer early starts.",
      cityKeywords: ["boardman","austintown","belmont"],
    },
    {
      id: "south-suburbs",
      name: "Poland, Canfield & southern suburbs",
      shortName: "South suburbs",
      neighborhoods: ["Poland","Canfield","Southern SFH tracts"],
      housingTypes: "SFH, multi-family, twins",
      challenges: ["Long empty miles","SR-11 congestion","Varied driveway access"],
      moverTips: "Prefer early starts. Survey driveway depth.",
      cityKeywords: ["poland","canfield","southern mahoning"],
    },
    {
      id: "east-pa-edge",
      name: "Eastern PA-adjacent edges",
      shortName: "East PA edge",
      neighborhoods: ["Struthers edges","Campbell edges","Eastern industrial-adjacent residential"],
      housingTypes: "Multi-family, older SFH",
      challenges: ["Cross-state empty miles","Freight corridor traffic","Staging friction"],
      moverTips: "Clarify Ohio vs Pennsylvania destinations. Survey truck access carefully.",
      cityKeywords: ["struthers","campbell","east youngstown"],
    }
  ],
  costDrivers: {
    title: "What drives Mahoning County moving costs",
    intro: "City multi-unit access and I-80/I-680 portal time drive quotes.",
    drivers: [
      { title: "Youngstown multi-unit stairs and curb friction", detail: "Labor hours rise without elevators." },
      { title: "I-80 / I-680 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "Suburban HOA soft costs", detail: "Gate lists push demand into peak windows." },
      { title: "Cross-state empty miles", detail: "Pennsylvania destinations change staging and authority assumptions." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$400–$1,200+", note: "Higher with stairs" },
      { label: "2–3BR condo or modest SFH", value: "$1,200–$3,400+", note: "I-80 pairs trend up" },
      { label: "3–4+ BR / long regional / PA-linked", value: "$2,200–$6,400+", note: "Cross-state pairs price highest" },
      { label: "Typical 2-person crew rate", value: "$100–$165+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Mahoning County",
    intro: "Family seasons, multi-family lease turns, and winter ice/snow reshape access.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Reduce I-80/I-680 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "Month-end multi-family turns", detail: "City and Boardman multi-unit fill first." },
      { title: "Winter ice and snow", detail: "Confirm contingency for driveway access." }
    ],
  },
  specialized: [
    {
      id: "youngstown-not-cleveland-akron",
      title: "Youngstown regional (not Cleveland/Akron) module",
      intro: "Mahoning estimates fail when Youngstown is treated as a Cleveland or Akron clone.",
      bullets: ["Survey Youngstown multi-unit access carefully — not Cleveland Shoreway defaults.","Price I-80/I-680 pairs portal-to-portal.","Clarify Ohio vs Pennsylvania destinations for PUCO vs FMCSA.","Do not reuse Akron SR-8 or Cleveland east/west assumptions here.","Verify PUCO authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Mahoning County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Youngstown City Schools and numerous suburban districts (Boardman, Austintown, Poland, Canfield, and others) serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools, Ohio Department of Education data, and campus visits beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Mercy Health Youngstown, Cleveland Clinic facilities, and regional systems serve residents. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from outer suburbs. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "City vs Boardman suburban stock", detail: "Older multi-unit in Youngstown; more multi-family and SFH along Boardman/Austintown corridors." },
          { title: "Cost variation", detail: "Southern suburbs often price differently from eastern industrial-adjacent edges." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Youngstown city lifestyle", detail: "Multi-unit amenities with curb logistics." },
          { title: "Boardman / Austintown pattern", detail: "Suburban commercial corridors with multi-family logistics." },
          { title: "Poland / Canfield pattern", detail: "Family SFH with longer empty-mile move logistics." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Healthcare, manufacturing, logistics, education, and retail shape employment; some residents commute toward Pennsylvania or Cleveland." },
          { title: "Commute realism", detail: "I-80 and I-680 peaks are real. Test drive peak routes." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "Youngstown Valley identity", detail: "Mahoning is distinct from Cleveland lake-effect micro-markets and Akron regional fabric." },
          { title: "Climate", detail: "Four seasons with meaningful winter snow/ice. Plan staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Mahoning County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify PUCO household goods authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Mahoning County — official site", href: "https://www.mahoningcountyoh.gov/", external: true },
      { label: "City of Youngstown", href: "https://youngstownohio.gov/", external: true },
      { label: "OHGO traffic (ODOT)", href: "https://ohgo.com/", external: true }
    ],
  },
  directoryHint: "Prefer Youngstown multi-unit experience and I-80 honesty — not Cleveland/Akron clone pricing. Verify PUCO in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
