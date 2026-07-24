import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeOhPack } from '@/lib/local-movers/county-intelligence/ohio/oh-shared';

export const butlerCountyOhIntelligence: CountyIntelligencePack = finalizeOhPack({
  countySlug: "butler",
  hubTitle: "Butler County Moving Intelligence Hub",
  eyebrow: "Butler · West/north Cincinnati collar (Hamilton city ≠ Cincinnati)",
  h1: "Moving in Butler County: West/North Collar Towns, Hamilton City & I-75 Logistics",
  heroOpener: "Butler County is Cincinnati’s west/north collar: Fairfield and West Chester multi-family, Hamilton city (the county seat — not Cincinnati) older stock, Middletown corridors, and I-75/I-275 portal time that is not urban Cincinnati hillside stairs and not Warren’s Mason/Lebanon northeast growth alone. A West Chester HOA two-story, a Hamilton city multi-family unit, a Fairfield condo, and an Oxford college-town rental do not share truck access. This hub is for Butler — not a Hamilton County rename and not “Hamilton” confused with Cincinnati.",
  heroCredibility:
    'PUCO household goods authority for intrastate OH moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-75 · I-275 · SR-4 · US-127 · SR-129 · Cincinnati-Dayton Rd",
  whatMakesDifferent: {
    title: "What makes moving in Butler County different",
    intro: "West/north Cincinnati collar towns — not downtown Cincinnati hills and not Hamilton County urban product as the default.",
    bullets: [
      {
        title: "Hamilton city is not Cincinnati",
        detail: "County-seat multi-unit and older stock differ from Over-the-Rhine elevators and Mount Adams stairs.",
      },
      {
        title: "I-75 / I-275 define portal time to Cincinnati jobs",
        detail: "Collar pairs burn clock at peak.",
      },
      {
        title: "West Chester multi-family is elevator- and HOA-heavy",
        detail: "Building packets still apply outside the city core.",
      },
      {
        title: "Oxford college-town pulses cluster crews",
        detail: "Academic calendars differ from pure suburban lease turns.",
      },
      {
        title: "Butler is not Hamilton County or Warren",
        detail: "West/north collar logistics differ from urban hills and NE Mason growth.",
      },
      {
        title: 'Intrastate OH rules vs interstate authority',
        detail:
          'Moves entirely within Ohio are generally subject to Public Utilities Commission of Ohio (PUCO) household goods authority. Interstate legs need active FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: "Butler access zones",
  zonesIntro: "Plan by West Chester/Liberty, Hamilton city, Fairfield/SR-4, and northern Middletown/Oxford corridors.",
  zones: [
    {
      id: "west-chester",
      name: "West Chester, Liberty & I-75 multi-family",
      shortName: "West Chester",
      neighborhoods: ["West Chester","Liberty Township","I-75 multi-family","HOA master plans"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["HOA rules","I-75 congestion","Elevator buildings"],
      moverTips: "Collect HOA packets. Reserve elevators in writing. Build I-75 buffer.",
      cityKeywords: ["west chester","liberty township","butler county"],
    },
    {
      id: "hamilton-city",
      name: "Hamilton city multi-unit & older stock",
      shortName: "Hamilton city",
      neighborhoods: ["Downtown Hamilton","City multi-family","Older SFH pockets"],
      housingTypes: "Multi-family, twins, older SFH",
      challenges: ["Tight streets","Mixed stairs and elevators","SR-4 / US-127 congestion"],
      moverTips: "Photo curb. Confirm unit access type. Do not price as Cincinnati downtown.",
      cityKeywords: ["hamilton ohio","hamilton city","downtown hamilton"],
    },
    {
      id: "fairfield-sr4",
      name: "Fairfield & SR-4 corridors",
      shortName: "Fairfield / SR-4",
      neighborhoods: ["Fairfield","SR-4 multi-family","Cincinnati-Dayton Rd corridors"],
      housingTypes: "Multi-family, SFH, townhomes",
      challenges: ["Arterial congestion","Lease-end waves","Long portal time to Cincinnati core"],
      moverTips: "Prefer early starts. Confirm elevator reservations.",
      cityKeywords: ["fairfield","sr-4","cincinnati-dayton"],
    },
    {
      id: "north-middletown-oxford",
      name: "Middletown, Oxford & northern corridors",
      shortName: "North corridors",
      neighborhoods: ["Middletown","Oxford","Monroe edges","US-127 multi-family"],
      housingTypes: "Multi-family, SFH, student housing near Oxford",
      challenges: ["Long empty miles","College lease waves","I-75 northern congestion"],
      moverTips: "Book academic peaks early near Oxford. Survey driveway access on longer pairs.",
      cityKeywords: ["middletown","oxford","monroe"],
    }
  ],
  costDrivers: {
    title: "What drives Butler County moving costs",
    intro: "Collar freeway portal time and mixed HOA/multi-unit access drive quotes.",
    drivers: [
      { title: "I-75 / I-275 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "West Chester HOA and elevator soft costs", detail: "Gate lists and wait time add cost." },
      { title: "Hamilton city multi-unit access", detail: "Stairs and curb limits raise labor hours." },
      { title: "Cincinnati-linked empty miles", detail: "Urban destinations raise staging distance." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$400–$1,300+", note: "Higher with elevators" },
      { label: "2–3BR HOA SFH or multi-family", value: "$1,300–$3,700+", note: "I-75 pairs trend up" },
      { label: "3–4+ BR / long Cincinnati-linked", value: "$2,400–$7,000+", note: "Cross-county pairs price highest" },
      { label: "Typical 2-person crew rate", value: "$105–$175+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Butler County",
    intro: "Family seasons, multi-family lease turns, and Oxford academic calendars reshape access.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Reduce I-75 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "Oxford / college lease waves", detail: "May/August clusters near campus multi-family." },
      { title: "Winter ice and snow", detail: "Confirm contingency for driveway access." }
    ],
  },
  specialized: [
    {
      id: "butler-cincy-collar-hamilton-city",
      title: "West/north Cincinnati collar & Hamilton city module",
      intro: "Butler estimates fail when Hamilton city is confused with Cincinnati or collar empty miles are ignored.",
      bullets: ["Never price Hamilton city as Cincinnati downtown or Mount Adams product.","Collect West Chester HOA and elevator packets early.","Price I-75/I-275 pairs portal-to-portal.","Clarify Butler vs Hamilton County destinations.","Verify PUCO authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Butler County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Multiple independent school districts (Lakota, Fairfield, Hamilton, Middletown, Talawanda/Oxford, and others) serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools, Ohio Department of Education data, and campus visits beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "TriHealth, UC Health facilities, Kettering Health Hamilton, and Cincinnati-metro systems serve residents. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour times into Cincinnati specialty care. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Collar HOA vs Hamilton city stock", detail: "West Chester master plans differ sharply from Hamilton city multi-unit and Oxford student housing." },
          { title: "Cost variation", detail: "I-75 growth corridors often price differently from northern Middletown edges." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "West Chester lifestyle", detail: "Growth amenities with HOA logistics and I-75 commute risk." },
          { title: "Hamilton city pattern", detail: "County-seat multi-unit with curb logistics — not Cincinnati hills." },
          { title: "Oxford pattern", detail: "College-town living with academic lease pulses." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Many residents commute into Cincinnati; local manufacturing, healthcare, education (including Miami University), and logistics also employ residents." },
          { title: "Commute realism", detail: "I-75 and I-275 peaks are real. Test drive peak routes into the city." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "West/north collar identity", detail: "Butler is distinct from urban Hamilton County hills and Warren NE growth towns." },
          { title: "Climate", detail: "Hot humid summers and winter ice/snow. Plan staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Butler County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify PUCO household goods authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Butler County, OH — official site", href: "https://www.butlercountyohio.org/", external: true },
      { label: "City of Hamilton, OH", href: "https://www.hamilton-oh.gov/", external: true },
      { label: "OHGO traffic (ODOT)", href: "https://ohgo.com/", external: true }
    ],
  },
  directoryHint: "Prefer West Chester HOA fluency and Hamilton-city-not-Cincinnati clarity; honest I-75 pricing. Verify PUCO in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
