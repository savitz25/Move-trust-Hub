import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeOhPack } from '@/lib/local-movers/county-intelligence/ohio/oh-shared';

export const lucasCountyOhIntelligence: CountyIntelligencePack = finalizeOhPack({
  countySlug: "lucas",
  hubTitle: "Lucas County Moving Intelligence Hub",
  eyebrow: "Lucas · Toledo core, Michigan border & I-75 logistics",
  h1: "Moving in Lucas County: Toledo Access, MI Border Pairs & I-75 Logistics",
  heroOpener: "Lucas County is Toledo’s lake-plain market: downtown and near-core multi-unit, west and south suburban rings, Michigan-border interstate pairs, and I-75/I-280/I-475 logistics that are not Cleveland Shoreway defaults and not Columbus I-270 copy. A downtown Toledo loft, an Ottawa Hills twin, a Sylvania multi-family unit, and a Maumee ranch do not share truck access or empty-mile risk. This hub is for Lucas — not a renamed Cuyahoga page.",
  heroCredibility:
    'PUCO household goods authority for intrastate OH moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-75 · I-280 · I-475 · US-23 · SR-2 · Anthony Wayne Trail",
  whatMakesDifferent: {
    title: "What makes moving in Lucas County different",
    intro: "Toledo metro and Michigan-border adjacency — not Cleveland east/west lake-effect product or Dayton Wright-Patt patterns.",
    bullets: [
      {
        title: "Michigan-border pairs are routine",
        detail: "Clarify Ohio PUCO vs FMCSA for destinations across the state line.",
      },
      {
        title: "I-75 / I-280 / I-475 define portal time",
        detail: "Cross-metro pairs burn clock at peak.",
      },
      {
        title: "Toledo multi-unit differs from western suburban HOA product",
        detail: "Access surveys matter more than county-wide rates.",
      },
      {
        title: "Anthony Wayne Trail and SR-2 corridors change staging",
        detail: "Arterial congestion differs from pure freeway-only pricing.",
      },
      {
        title: "Lucas is not Cuyahoga or Franklin",
        detail: "Do not reuse Cleveland Shoreway or Columbus ring assumptions here.",
      },
      {
        title: 'Intrastate OH rules vs interstate authority',
        detail:
          'Moves entirely within Ohio are generally subject to Public Utilities Commission of Ohio (PUCO) household goods authority. Interstate legs need active FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: "Lucas access zones",
  zonesIntro: "Plan by Toledo core, western suburbs, southern Maumee corridors, and east-side industrial-adjacent edges.",
  zones: [
    {
      id: "toledo-core",
      name: "Toledo core multi-unit & older stock",
      shortName: "Toledo core",
      neighborhoods: ["Downtown Toledo","Warehouse District edges","Old West End edges","City multi-family"],
      housingTypes: "Multi-family, lofts, older SFH",
      challenges: ["Tight streets","Mixed stairs and elevators","I-75 approach congestion"],
      moverTips: "Photo curb. Confirm unit access type. Prefer mid-week mornings.",
      cityKeywords: ["toledo","downtown toledo","old west end"],
    },
    {
      id: "west-suburbs",
      name: "Western suburbs & Sylvania corridors",
      shortName: "West suburbs",
      neighborhoods: ["Sylvania","Ottawa Hills","West Toledo multi-family","HOA villages"],
      housingTypes: "HOA SFH, multi-family, townhomes, twins",
      challenges: ["HOA rules","US-23 / I-475 congestion","Long portal time to core"],
      moverTips: "Collect HOA packets. Build freeway buffer.",
      cityKeywords: ["sylvania","ottawa hills","west toledo"],
    },
    {
      id: "south-maumee",
      name: "Southern Maumee & Perrysburg-edge corridors",
      shortName: "South / Maumee",
      neighborhoods: ["Maumee","Perrysburg edges (verify county)","Anthony Wayne Trail multi-family"],
      housingTypes: "SFH, multi-family, townhomes",
      challenges: ["Cross-county confusion with Wood","I-75 congestion","Mixed access types"],
      moverTips: "Clarify Lucas vs Wood addresses. Prefer early starts.",
      cityKeywords: ["maumee","perrysburg edges","anthony wayne"],
    },
    {
      id: "east-industrial",
      name: "East-side industrial-adjacent residential",
      shortName: "East side",
      neighborhoods: ["East Toledo","Oregon edges","Industrial-adjacent residential"],
      housingTypes: "Multi-family, older SFH",
      challenges: ["Freight corridor traffic","Varied street widths","Staging friction"],
      moverTips: "Survey truck access carefully. Prefer early starts.",
      cityKeywords: ["east toledo","oregon","northwood edges"],
    }
  ],
  costDrivers: {
    title: "What drives Lucas County moving costs",
    intro: "I-75 portal time, multi-unit access, and Michigan-border empty miles drive quotes.",
    drivers: [
      { title: "I-75 / I-280 / I-475 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "Toledo multi-unit access", detail: "Stairs and elevators raise labor hours." },
      { title: "Cross-state empty miles", detail: "Michigan destinations change staging and authority assumptions." },
      { title: "Western HOA soft costs", detail: "Gate lists push demand into peak windows." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$400–$1,250+", note: "Higher with elevators" },
      { label: "2–3BR condo or modest SFH", value: "$1,250–$3,500+", note: "I-75 pairs trend up" },
      { label: "3–4+ BR / long regional / MI-linked", value: "$2,300–$6,600+", note: "Cross-state pairs price highest" },
      { label: "Typical 2-person crew rate", value: "$100–$170+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Lucas County",
    intro: "Family seasons, multi-family lease turns, and lake-plain winter weather reshape access.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Reduce I-75 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "Month-end multi-family turns", detail: "Core and western multi-unit fill first." },
      { title: "Winter ice and snow", detail: "Confirm contingency for driveway and arterial access." }
    ],
  },
  specialized: [
    {
      id: "toledo-mi-border",
      title: "Toledo & Michigan-border logistics module",
      intro: "Lucas estimates fail when I-75 empty miles or Michigan pairs are ignored.",
      bullets: ["Price I-75/I-280/I-475 pairs portal-to-portal.","Clarify Ohio vs Michigan destinations for PUCO vs FMCSA.","Collect HOA packets for western suburban product.","Do not reuse Cleveland Shoreway assumptions as Toledo defaults.","Verify PUCO authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Lucas County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Toledo Public Schools and numerous suburban districts (Sylvania, Maumee, Ottawa Hills, and others) serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools, Ohio Department of Education data, and campus visits beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "ProMedica, Mercy Health, University of Toledo Medical Center, and regional facilities serve residents. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from western and southern corridors. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Core multi-unit vs western suburban stock", detail: "Downtown and near-core product differs from Sylvania HOA and Maumee SFH." },
          { title: "Cost variation", detail: "Western suburbs often price differently from east-side industrial-adjacent stock." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Toledo core lifestyle", detail: "Multi-unit amenities with curb logistics." },
          { title: "Western suburb pattern", detail: "HOA product with freeway commute risk." },
          { title: "Southern Maumee pattern", detail: "Town amenities with I-75 and cross-county logistics." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Healthcare, manufacturing, logistics, education, and automotive-related industry shape employment; some residents commute into Michigan." },
          { title: "Commute realism", detail: "I-75 and I-475 peaks are real. Test drive peak routes and border approaches." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "Toledo lake-plain identity", detail: "Lucas is distinct from Cleveland lake-effect micro-markets and Columbus ring freeways." },
          { title: "Climate", detail: "Lake-plain winters with ice/snow and humid summers. Plan staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Lucas County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify PUCO household goods authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Lucas County — official site", href: "https://www.co.lucas.oh.us/", external: true },
      { label: "City of Toledo", href: "https://toledo.oh.gov/", external: true },
      { label: "OHGO traffic (ODOT)", href: "https://ohgo.com/", external: true }
    ],
  },
  directoryHint: "Prefer Toledo multi-unit experience and honest MI-border pricing; clear I-75 portal times. Verify PUCO in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
