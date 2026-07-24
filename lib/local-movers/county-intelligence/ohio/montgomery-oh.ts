import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeOhPack } from '@/lib/local-movers/county-intelligence/ohio/oh-shared';

export const montgomeryCountyOhIntelligence: CountyIntelligencePack = finalizeOhPack({
  countySlug: "montgomery",
  hubTitle: "Montgomery County Moving Intelligence Hub",
  eyebrow: "Montgomery · Dayton core & Wright-Patt adjacency",
  h1: "Moving in Montgomery County: Dayton Access, Wright-Patt Adjacency & I-75 Logistics",
  heroOpener: "Montgomery County is Dayton’s metro core: downtown and near-core multi-unit, suburban rings toward Kettering and Beavercreek edges, Wright-Patterson Air Force Base adjacency that pulses housing demand, and I-75/I-70 logistics that are not Cincinnati hillside stairs and not Columbus I-270 product. A downtown Dayton loft, an Oakwood twin, a Huber Heights multi-family unit, and a rural-edge lot do not share truck access. This hub is for Montgomery County, Ohio — not Pennsylvania Montgomery and not Butler Cincinnati collar.",
  heroCredibility:
    'PUCO household goods authority for intrastate OH moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-70 · I-75 · US-35 · SR-4 · SR-48 · Needmore Rd corridors",
  whatMakesDifferent: {
    title: "What makes moving in Montgomery County different",
    intro: "Dayton metro and Wright-Patt adjacency — not Cincinnati hills or Columbus ring freeways as the default product.",
    bullets: [
      {
        title: "Wright-Patt adjacency reshapes housing demand pulses",
        detail: "PCS and base-related moves cluster crews outside pure civilian lease calendars.",
      },
      {
        title: "I-75 / I-70 / US-35 define portal time",
        detail: "Cross-metro pairs burn clock at peak.",
      },
      {
        title: "Dayton multi-unit differs from southern suburban HOA product",
        detail: "Access surveys matter more than county-wide rates.",
      },
      {
        title: "Needmore Rd and SR-4 corridors change staging",
        detail: "Arterial congestion differs from pure freeway-only pricing.",
      },
      {
        title: "Montgomery OH is not Cincinnati or Columbus",
        detail: "Do not reuse Hamilton hills or Franklin I-270 assumptions here.",
      },
      {
        title: 'Intrastate OH rules vs interstate authority',
        detail:
          'Moves entirely within Ohio are generally subject to Public Utilities Commission of Ohio (PUCO) household goods authority. Interstate legs need active FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: "Montgomery access zones",
  zonesIntro: "Plan by Dayton core, southern suburbs, northern I-75 corridors, and eastern Wright-Patt approaches.",
  zones: [
    {
      id: "dayton-core",
      name: "Dayton core multi-unit & older stock",
      shortName: "Dayton core",
      neighborhoods: ["Downtown Dayton","Oregon District edges","City multi-family","Older SFH pockets"],
      housingTypes: "Multi-family, lofts, older SFH",
      challenges: ["Tight streets","Mixed stairs and elevators","US-35 congestion"],
      moverTips: "Photo curb. Confirm unit access type. Prefer mid-week mornings.",
      cityKeywords: ["dayton","downtown dayton","oregon district"],
    },
    {
      id: "south-suburbs",
      name: "Southern suburbs & Oakwood/Kettering",
      shortName: "South suburbs",
      neighborhoods: ["Kettering","Oakwood","Centerville edges","Miamisburg edges"],
      housingTypes: "SFH, twins, multi-family, HOA pockets",
      challenges: ["HOA rules in pockets","SR-48 congestion","Mixed access types"],
      moverTips: "Collect HOA packets where applicable. Prefer early starts.",
      cityKeywords: ["kettering","oakwood","centerville","miamisburg"],
    },
    {
      id: "north-i75",
      name: "Northern I-75 corridors",
      shortName: "North I-75",
      neighborhoods: ["Huber Heights","Vandalia edges","Englewood edges","I-75 multi-family"],
      housingTypes: "Multi-family, SFH, townhomes",
      challenges: ["I-75 congestion","Lease-end waves","Long portal time to core"],
      moverTips: "Build I-75 buffer. Confirm elevator reservations.",
      cityKeywords: ["huber heights","vandalia","englewood"],
    },
    {
      id: "wright-patt-east",
      name: "Eastern approaches toward Wright-Patt",
      shortName: "Wright-Patt east",
      neighborhoods: ["Riverside","Fairborn edges (verify county)","Needmore Rd corridors","Base-adjacent multi-family"],
      housingTypes: "Multi-family, SFH, townhomes",
      challenges: ["Base-related demand pulses","Arterial congestion","Cross-county confusion with Greene"],
      moverTips: "Clarify Montgomery vs Greene addresses. Ask about PCS timing windows.",
      cityKeywords: ["riverside","needmore","wright-patt","fairborn edges"],
    }
  ],
  costDrivers: {
    title: "What drives Montgomery County moving costs",
    intro: "I-75 portal time, multi-unit access, and base-adjacent demand pulses drive quotes.",
    drivers: [
      { title: "I-75 / I-70 / US-35 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "Dayton multi-unit access", detail: "Stairs and elevators raise labor hours." },
      { title: "Wright-Patt demand clustering", detail: "PCS windows fill crews faster than average civilian months." },
      { title: "Suburban HOA soft costs", detail: "Gate lists push demand into peak windows." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$400–$1,250+", note: "Higher with elevators" },
      { label: "2–3BR condo or modest SFH", value: "$1,250–$3,500+", note: "I-75 pairs trend up" },
      { label: "3–4+ BR / long regional / PCS peak", value: "$2,300–$6,500+", note: "Base-season peaks price highest" },
      { label: "Typical 2-person crew rate", value: "$100–$170+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Montgomery County",
    intro: "Family seasons, multi-family turns, and military PCS windows reshape access.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Reduce I-75/US-35 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "PCS / base-related peaks", detail: "Late spring–summer military moves cluster crews near eastern corridors." },
      { title: "Winter ice and snow", detail: "Confirm contingency for driveway access." }
    ],
  },
  specialized: [
    {
      id: "dayton-wright-patt",
      title: "Dayton & Wright-Patt adjacency module",
      intro: "Montgomery estimates fail when I-75 empty miles or base-related demand pulses are ignored.",
      bullets: ["Price I-75/I-70/US-35 pairs portal-to-portal.","Ask about PCS timing for base-adjacent multi-family.","Clarify Montgomery vs Greene destinations near Wright-Patt.","Do not reuse Cincinnati hillside or Columbus I-270 assumptions here.","Verify PUCO authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Montgomery County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Dayton Public Schools and numerous suburban districts (Kettering, Centerville, Huber Heights, and others) serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools, Ohio Department of Education data, and campus visits beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Premier Health, Kettering Health, Dayton VA, and regional facilities serve residents. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from northern and eastern corridors. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Core multi-unit vs southern suburban stock", detail: "Downtown and near-core product differs from Kettering/Centerville SFH and base-adjacent multi-family." },
          { title: "Cost variation", detail: "Southern suburbs often price differently from northern I-75 multi-family." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Dayton core lifestyle", detail: "Multi-unit amenities with curb logistics." },
          { title: "Southern suburb pattern", detail: "Family SFH with arterial congestion." },
          { title: "Wright-Patt adjacent pattern", detail: "Base-linked housing with PCS-season move logistics." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Wright-Patterson and defense contracting, healthcare, manufacturing, education, and logistics shape employment." },
          { title: "Commute realism", detail: "I-75 and US-35 peaks are real. Test drive peak routes." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "Dayton metro identity", detail: "Montgomery is distinct from Cincinnati hills and Columbus ring freeways." },
          { title: "Climate", detail: "Hot humid summers and winter ice/snow. Plan staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Montgomery County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify PUCO household goods authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Montgomery County, OH — official site", href: "https://www.mcohio.org/", external: true },
      { label: "City of Dayton", href: "https://www.daytonohio.gov/", external: true },
      { label: "OHGO traffic (ODOT)", href: "https://ohgo.com/", external: true }
    ],
  },
  directoryHint: "Prefer Dayton multi-unit experience and Wright-Patt PCS-season honesty; clear I-75 pricing. Verify PUCO in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
