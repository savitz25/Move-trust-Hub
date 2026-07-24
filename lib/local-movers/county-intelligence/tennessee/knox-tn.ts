import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeTnPack } from '@/lib/local-movers/county-intelligence/tennessee/tn-shared';

export const knoxCountyTnIntelligence: CountyIntelligencePack = finalizeTnPack({
  countySlug: "knox",
  hubTitle: "Knox County Moving Intelligence Hub",
  eyebrow: "Knox · Knoxville core, university influence & foothills access",
  h1: "Moving in Knox County: Knoxville Core, UT Influence & I-40/I-75 Logistics",
  heroOpener: "Knox County is East Tennessee’s regional hub: downtown and Fort Sanders multi-unit near the University of Tennessee, foothill neighborhoods with driveway grades, West Knoxville multi-family and HOA growth, and I-40/I-75 logistics that are not Nashville music-core or Memphis river loops. A Fort Sanders walk-up, a Sequoyah Hills home, a Turkey Creek multi-family unit, and a Halls-edge tract do not share truck access or portal time. This hub is for Knox — not Sevier tourism copy or Blount foothill overflow alone.",
  heroCredibility:
    'TDOR motor carrier intrastate authority for in-state TN moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-40 · I-75 · I-640 · US-129 · Alcoa Hwy · Kingston Pike",
  whatMakesDifferent: {
    title: "What makes moving in Knox County different",
    intro: "These are Knoxville regional realities — university turns, foothill grades, and I-40/I-75 corridors — not Nashville towers or Sevier cabin logistics.",
    bullets: [
      {
        title: "University lease waves reshape multi-family demand",
        detail: "August/May clusters near campus fill crews early.",
      },
      {
        title: "Foothill driveways add grade and turn-radius risk",
        detail: "Survey access photos matter outside flat suburban lots.",
      },
      {
        title: "I-40 / I-75 / I-640 define portal-to-portal time",
        detail: "Cross-county pairs look local on maps and regional at peak.",
      },
      {
        title: "West Knoxville multi-family is HOA-dense growth product",
        detail: "Gate lists and approved hours appear more often than downtown alleys.",
      },
      {
        title: "Knox ↔ Blount pairs are everyday regional logistics",
        detail: "Keep county lines clear for drive time and authority assumptions.",
      },
      {
        title: 'Intrastate TN rules vs interstate authority',
        detail:
          'Moves entirely within Tennessee by for-hire carriers are generally subject to Tennessee Department of Revenue (TDOR) motor carrier intrastate authority requirements as applicable. Interstate legs need active FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: "Knox access zones",
  zonesIntro: "Plan by downtown/Fort Sanders, west Knoxville growth, north/south corridors, and foothill edges.",
  zones: [
    {
      id: "downtown-ut",
      name: "Downtown Knoxville & Fort Sanders / UT edges",
      shortName: "Downtown / UT",
      neighborhoods: ["Downtown","Fort Sanders","UT campus edges","Old City edges"],
      housingTypes: "Multi-unit, older SFH, student rentals",
      challenges: ["Stairs and tight streets","Lease-end waves","Event-day curb pressure"],
      moverTips: "Book academic peaks early. Photo curb and stairs. Prefer mid-week mornings.",
      cityKeywords: ["knoxville","fort sanders","downtown","ut"],
    },
    {
      id: "west-knox",
      name: "West Knoxville multi-family & Kingston Pike",
      shortName: "West Knoxville",
      neighborhoods: ["West Knoxville","Bearden","Turkey Creek edges","Kingston Pike multi-family"],
      housingTypes: "Multi-family, townhomes, HOA SFH",
      challenges: ["Kingston Pike congestion","Elevator buildings","Long portal time to downtown"],
      moverTips: "Collect HOA packets. Build arterial buffer. Confirm elevator reservations.",
      cityKeywords: ["west knoxville","bearden","turkey creek","kingston pike"],
    },
    {
      id: "north-south",
      name: "North & south Knox corridors",
      shortName: "N/S corridors",
      neighborhoods: ["Halls edges","Fountain City","South Knoxville","Chapman Highway edges"],
      housingTypes: "SFH, multi-family, mixed tracts",
      challenges: ["I-640 / arterial congestion","Varied driveway access","Longer empty miles"],
      moverTips: "Prefer early starts. Survey driveway depth. Price long corridor pairs honestly.",
      cityKeywords: ["halls","fountain city","south knoxville","chapman"],
    },
    {
      id: "foothill-edges",
      name: "Foothill edges & Alcoa Hwy approaches",
      shortName: "Foothill edges",
      neighborhoods: ["Sequoyah Hills","Westland edges","Alcoa Hwy approaches","Hillside driveways"],
      housingTypes: "Hillside SFH, some multi-family",
      challenges: ["Grades and turn radius","Weather-sensitive surfaces","Limited alternate routes"],
      moverTips: "Survey grade and truck length. Discuss shuttle carries when needed.",
      cityKeywords: ["sequoyah","alcoa hwy","westland","foothills"],
    }
  ],
  costDrivers: {
    title: "What drives Knox County moving costs",
    intro: "University turns, foothill access, and freeway portal time drive quotes.",
    drivers: [
      { title: "Campus multi-family lease waves", detail: "Peak academic windows raise pricing risk." },
      { title: "Foothill long carries", detail: "Labor hours rise when trucks cannot park at the door." },
      { title: "I-40 / I-75 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "West Knox HOA soft costs", detail: "Gate lists push demand into peak windows." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$400–$1,250+", note: "Higher near campus peaks" },
      { label: "2–3BR condo or modest SFH", value: "$1,250–$3,500+", note: "Foothill access trends up" },
      { label: "3–4+ BR / long local / cross-county", value: "$2,300–$6,600+", note: "Long I-40 pairs price highest" },
      { label: "Typical 2-person crew rate", value: "$100–$175+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Knox County",
    intro: "University calendars, family seasons, and summer storms reshape access.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Reduce Kingston Pike and I-40 pain." },
      { title: "UT move-in/out peaks", detail: "Book August/May clusters early for campus-adjacent product." },
      { title: "Peak family season: late May–mid-August", detail: "Suburban Saturdays fill first." },
      { title: "Summer heat and storms", detail: "Prefer early starts; confirm weather contingency." }
    ],
  },
  specialized: [
    {
      id: "knoxville-ut-foothills",
      title: "Knoxville university & foothills logistics module",
      intro: "Knox estimates fail when UT lease waves or hillside access are ignored.",
      bullets: ["Book academic peaks early for Fort Sanders multi-family.","Survey driveway grade on foothill addresses.","Price I-40/I-75 pairs portal-to-portal.","Clarify Knox vs Blount destinations.","Verify TDOR intrastate authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Knox County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Knox County Schools is the primary public K–12 system. Assignment is address-based." },
          { title: "Research sources", detail: "District tools, Tennessee DOE data, and campus visits beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "University of Tennessee Medical Center, Covenant Health, and other facilities serve Knoxville corridors. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from west Knoxville and foothill edges. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Near-campus vs west growth stock", detail: "Student multi-unit near UT; HOA multi-family and SFH dominate west growth." },
          { title: "Foothill access realities", detail: "Grades and limited turn radius affect move day more than square footage alone." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Downtown / UT lifestyle", detail: "Urban and campus proximity with stair/curb tradeoffs." },
          { title: "West Knoxville pattern", detail: "Retail and multi-family amenities with arterial congestion." },
          { title: "Foothill lifestyle", detail: "Views and grades with driveway logistics." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Education, healthcare, energy/research, logistics, and professional services shape employment." },
          { title: "Commute realism", detail: "I-40, I-75, and Kingston Pike peaks are real. Test drive peak routes." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "East Tennessee regional hub identity", detail: "Knox is distinct from Nashville music-core, Memphis river logistics, and Sevier tourism peaks." },
          { title: "Climate", detail: "Hot humid summers and storms; foothill weather can differ from valley floors." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Knox County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify TDOR intrastate authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Knox County — official site", href: "https://www.knoxcounty.org/", external: true },
      { label: "City of Knoxville", href: "https://www.knoxvilletn.gov/", external: true },
      { label: "Knox County Schools", href: "https://www.knoxschools.org/", external: true, note: "Boundaries & calendars" },
      { label: "TDOT traffic resources", href: "https://www.tn.gov/tdot.html", external: true }
    ],
  },
  directoryHint: "Prefer UT multi-family experience for campus peaks; foothill grade surveys; honest I-40/I-75 pricing. Verify TDOR intrastate and FMCSA as applicable.",
  lastReviewed: '2026-07-24',
});
