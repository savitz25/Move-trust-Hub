import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeOhPack } from '@/lib/local-movers/county-intelligence/ohio/oh-shared';

export const lorainCountyOhIntelligence: CountyIntelligencePack = finalizeOhPack({
  countySlug: "lorain",
  hubTitle: "Lorain County Moving Intelligence Hub",
  eyebrow: "Lorain · West of Cleveland lake shore & inland towns",
  h1: "Moving in Lorain County: Lake Shore Towns, Inland Growth & I-90/SR-2 Logistics",
  heroOpener: "Lorain County sits west of Cleveland: lake-shore cities (Lorain, Avon Lake, Sheffield Lake edges), inland growth toward Avon, North Ridgeville, and Elyria, Midway Mall-area multi-family, and I-90/SR-2 portal time that is not Cuyahoga east-side heights product and not pure rural Medina. A lake-shore multi-family unit, an Avon HOA two-story, an Elyria twin, and an Oberlin college-town rental do not share truck access. This hub is for Lorain — not a Cleveland city clone.",
  heroCredibility:
    'PUCO household goods authority for intrastate OH moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-90 · SR-2 · SR-57 · US-20 · SR-58 · Midway Mall corridors",
  whatMakesDifferent: {
    title: "What makes moving in Lorain County different",
    intro: "West-of-Cleveland lake shore and inland collar — not downtown Cleveland elevators or east-side heights as the default product.",
    bullets: [
      {
        title: "Lake-shore and inland towns are different products",
        detail: "Do not price Avon Lake like inland Elyria or Oberlin student housing.",
      },
      {
        title: "I-90 / SR-2 define Cleveland-linked portal time",
        detail: "Collar pairs burn clock at peak.",
      },
      {
        title: "Lake-effect snow still matters on shore corridors",
        detail: "Winter access risk is real even west of Cuyahoga.",
      },
      {
        title: "Midway Mall multi-family corridors cluster lease turns",
        detail: "Month-end waves fill crews first.",
      },
      {
        title: "Lorain is not Cuyahoga",
        detail: "West-shore and inland logistics differ from Cleveland core east/west micro-markets.",
      },
      {
        title: 'Intrastate OH rules vs interstate authority',
        detail:
          'Moves entirely within Ohio are generally subject to Public Utilities Commission of Ohio (PUCO) household goods authority. Interstate legs need active FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: "Lorain access zones",
  zonesIntro: "Plan by lake-shore cities, Avon/North Ridgeville growth, Elyria core, and southern inland towns.",
  zones: [
    {
      id: "lake-shore",
      name: "Lake-shore cities & SR-2 corridors",
      shortName: "Lake shore",
      neighborhoods: ["Lorain","Avon Lake","Sheffield Lake edges","SR-2 multi-family"],
      housingTypes: "Multi-family, older SFH, some elevators",
      challenges: ["Lake-effect snow access","Tight streets in older blocks","SR-2 congestion"],
      moverTips: "Photo curb. Write winter contingency language. Prefer early starts.",
      cityKeywords: ["lorain","avon lake","sheffield lake"],
    },
    {
      id: "avon-growth",
      name: "Avon, North Ridgeville & inland growth",
      shortName: "Avon growth",
      neighborhoods: ["Avon","North Ridgeville","HOA villages","I-90 multi-family"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["HOA rules","I-90 congestion","Long portal time to Cleveland core"],
      moverTips: "Collect HOA packets. Build I-90 buffer.",
      cityKeywords: ["avon","north ridgeville","avon ohio"],
    },
    {
      id: "elyria",
      name: "Elyria core & Midway Mall corridors",
      shortName: "Elyria",
      neighborhoods: ["Elyria","Midway Mall corridors","City multi-family"],
      housingTypes: "Multi-family, twins, older SFH",
      challenges: ["Arterial congestion","Mixed stairs and elevators","Lease-end waves"],
      moverTips: "Confirm unit access type. Prefer mid-week mornings near mall corridors.",
      cityKeywords: ["elyria","midway mall"],
    },
    {
      id: "south-inland",
      name: "Southern inland towns & Oberlin",
      shortName: "South inland",
      neighborhoods: ["Oberlin","Amherst edges","Wellington edges","SR-58 corridors"],
      housingTypes: "SFH, multi-family, student housing near Oberlin",
      challenges: ["Long empty miles","College lease waves","Varied driveway access"],
      moverTips: "Book academic peaks early near Oberlin. Survey driveway access on longer pairs.",
      cityKeywords: ["oberlin","amherst","wellington"],
    }
  ],
  costDrivers: {
    title: "What drives Lorain County moving costs",
    intro: "Cleveland-linked portal time and lake-shore vs inland access differences drive quotes.",
    drivers: [
      { title: "I-90 / SR-2 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "Lake-shore winter access risk", detail: "Ice and snow can force reschedules." },
      { title: "Inland HOA soft costs", detail: "Gate lists push demand into peak windows." },
      { title: "Cleveland-linked empty miles", detail: "City destinations raise staging distance." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$400–$1,250+", note: "Higher with elevators or winter access risk" },
      { label: "2–3BR HOA SFH or multi-family", value: "$1,250–$3,500+", note: "I-90 pairs trend up" },
      { label: "3–4+ BR / long Cleveland-linked", value: "$2,300–$6,600+", note: "Cross-county pairs price highest" },
      { label: "Typical 2-person crew rate", value: "$100–$170+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Lorain County",
    intro: "Lake-effect winter, family seasons, multi-family turns, and college calendars reshape access.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Reduce I-90/SR-2 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "College lease waves near Oberlin", detail: "May/August clusters fill multi-family crews." },
      { title: "Lake-effect snow season", detail: "Confirm contingency for shore addresses November–March." }
    ],
  },
  specialized: [
    {
      id: "lorain-west-shore-inland",
      title: "West-of-Cleveland lake shore & inland module",
      intro: "Lorain estimates fail when shore and inland products are treated as identical.",
      bullets: ["Survey lake-shore and inland access as different products.","Price I-90/SR-2 pairs portal-to-portal.","Collect HOA packets for Avon/North Ridgeville growth product.","Do not reuse downtown Cleveland elevator assumptions as county defaults.","Verify PUCO authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Lorain County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Multiple independent school districts (Lorain, Elyria, Avon, Avon Lake, North Ridgeville, Oberlin, and others) serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools, Ohio Department of Education data, and campus visits beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Mercy Health Lorain, University Hospitals facilities, Cleveland Clinic regional sites, and metro systems serve residents. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour times into Cleveland specialty care. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Lake-shore vs inland growth stock", detail: "Older multi-unit and shore product differ from Avon HOA two-stories and Oberlin student housing." },
          { title: "Cost variation", detail: "Inland growth towns often price differently from older lake-shore blocks." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Lake-shore lifestyle", detail: "Water-adjacent living with winter access logistics." },
          { title: "Avon / North Ridgeville pattern", detail: "HOA growth with I-90 commute risk into Cleveland." },
          { title: "Oberlin / inland pattern", detail: "College-town or rural-edge living with longer empty-mile moves." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Many residents commute into Cuyahoga; local manufacturing, healthcare, education, and logistics also employ residents." },
          { title: "Commute realism", detail: "I-90 and SR-2 peaks are real. Test drive peak routes into Cleveland." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "West-of-Cleveland identity", detail: "Lorain complements Cuyahoga without cloning downtown or east-side heights product." },
          { title: "Climate", detail: "Lake-effect snow risk on shore corridors and humid summers. Plan staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Lorain County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify PUCO household goods authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Lorain County — official site", href: "https://www.loraincounty.us/", external: true },
      { label: "City of Lorain", href: "https://www.cityoflorain.org/", external: true },
      { label: "OHGO traffic (ODOT)", href: "https://ohgo.com/", external: true }
    ],
  },
  directoryHint: "Prefer lake-shore vs inland surveys and honest I-90 pricing into Cleveland. Verify PUCO in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
