import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeTnPack } from '@/lib/local-movers/county-intelligence/tennessee/tn-shared';

export const shelbyCountyTnIntelligence: CountyIntelligencePack = finalizeTnPack({
  countySlug: "shelby",
  hubTitle: "Shelby County Moving Intelligence Hub",
  eyebrow: "Shelby · Memphis core, Midtown/East Memphis & river-city logistics",
  h1: "Moving in Shelby County: Memphis Core, Midtown Access & I-40/I-240 Logistics",
  heroOpener: "Shelby County is Memphis’s river-city engine: downtown and Midtown mixed stock, East Memphis multi-family and older SFH, suburban rings toward Germantown and Collierville, and humidity/heat that punishes afternoon open carries. A downtown loft, a Midtown craftsman, an East Memphis ranch, and a Collierville HOA two-story do not share truck access or I-240 portal time. This hub is for Shelby — not Nashville music-core copy or Knoxville foothills tips.",
  heroCredibility:
    'TDOR motor carrier intrastate authority for in-state TN moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-40 · I-55 · I-240 · I-69 links · US-51 · US-61",
  whatMakesDifferent: {
    title: "What makes moving in Shelby County different",
    intro: "These are Memphis river-city realities — heat/humidity, I-240 loops, and Midtown/East Memphis access — not Nashville towers or East Tennessee mountains.",
    bullets: [
      {
        title: "Heat and humidity compress productive outdoor hours",
        detail: "Summer afternoons slow exterior carries. Prefer early starts and tarp discipline.",
      },
      {
        title: "I-40 / I-55 / I-240 define portal-to-portal time",
        detail: "Cross-town pairs look local on maps and regional at peak. Price honestly.",
      },
      {
        title: "Midtown and near-core stock mixes stairs and multi-unit product",
        detail: "Access photos beat verbal promises on older blocks.",
      },
      {
        title: "East Memphis and eastern suburbs flip to HOA and longer empty miles",
        detail: "Gate lists and driveway rules appear more often than downtown alleys.",
      },
      {
        title: "Cross-state Memphis pairs are routine",
        detail: "Arkansas and Mississippi edges change FMCSA vs TDOR assumptions — clarify destinations.",
      },
      {
        title: 'Intrastate TN rules vs interstate authority',
        detail:
          'Moves entirely within Tennessee by for-hire carriers are generally subject to Tennessee Department of Revenue (TDOR) motor carrier intrastate authority requirements as applicable. Interstate legs need active FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: "Shelby access zones",
  zonesIntro: "Plan by downtown/Midtown, East Memphis, southeast suburbs, and north/river-adjacent corridors.",
  zones: [
    {
      id: "downtown-midtown",
      name: "Downtown Memphis & Midtown",
      shortName: "Downtown / Midtown",
      neighborhoods: ["Downtown","Midtown","Cooper-Young","Central Gardens","Victorian Village"],
      housingTypes: "Lofts, multi-unit, older SFH, some mid-rise",
      challenges: ["Stairs and curb friction","Event-day downtown congestion","Heat on open staging"],
      moverTips: "Prefer mid-week early mornings. Photo curb and stairs. Confirm elevator rules on multi-unit.",
      cityKeywords: ["memphis","midtown","downtown","cooper-young"],
    },
    {
      id: "east-memphis",
      name: "East Memphis multi-family & SFH",
      shortName: "East Memphis",
      neighborhoods: ["East Memphis","Poplar corridor","White Station edges","Sea Isle"],
      housingTypes: "SFH, multi-family, townhomes",
      challenges: ["Poplar corridor congestion","Mixed access types","Longer empty miles from river core"],
      moverTips: "Build I-240 buffer. Confirm unit access type. Prefer early starts.",
      cityKeywords: ["east memphis","poplar","white station"],
    },
    {
      id: "se-suburbs",
      name: "Germantown, Collierville & southeast suburbs",
      shortName: "SE suburbs",
      neighborhoods: ["Germantown","Collierville","Cordova edges","HOA villages"],
      housingTypes: "HOA SFH, townhomes, multi-family",
      challenges: ["HOA gate lists","I-240 congestion","Long portal time to downtown"],
      moverTips: "Collect HOA packets first. Price southeast pairs honestly.",
      cityKeywords: ["germantown","collierville","cordova"],
    },
    {
      id: "north-river",
      name: "North Memphis & river-adjacent corridors",
      shortName: "North / river",
      neighborhoods: ["North Memphis","Frayser edges","Mississippi River approaches","Industrial-adjacent residential"],
      housingTypes: "Mixed SFH, multi-family, industrial-adjacent",
      challenges: ["Varied street widths","Industrial truck corridors","Longer empty miles"],
      moverTips: "Survey truck access. Prefer early starts for long north-county pairs.",
      cityKeywords: ["north memphis","frayser","river"],
    }
  ],
  costDrivers: {
    title: "What drives Shelby County moving costs",
    intro: "Heat pacing, loop freeway portal time, and HOA soft costs separate cheap estimates from real bills.",
    drivers: [
      { title: "Heat pacing and storm holds", detail: "Summer labor hours stretch on open suburban streets." },
      { title: "I-40 / I-240 congestion", detail: "Cross-town portal time spikes at peak." },
      { title: "HOA southeast growth product", detail: "Gate lists push demand into peak windows." },
      { title: "Cross-state empty miles", detail: "AR/MS destinations change staging distance and authority assumptions." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$400–$1,250+", note: "Higher with stairs or peak freeways" },
      { label: "2–3BR condo or modest SFH", value: "$1,250–$3,500+", note: "HOA soft costs trend up" },
      { label: "3–4+ BR / cross-loop", value: "$2,300–$6,800+", note: "Long I-240 pairs price highest" },
      { label: "Typical 2-person crew rate", value: "$100–$175+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Shelby County",
    intro: "Heat, storms, and family calendars reshape Memphis access windows.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Beat heat and I-240 peak." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "Summer heat and storms", detail: "Prefer dawn starts; confirm weather contingency." },
      { title: "Month-end multi-family turns", detail: "Lease clusters fill crews in East Memphis and core multi-unit." }
    ],
  },
  specialized: [
    {
      id: "memphis-river-city",
      title: "Memphis river-city heat & loop logistics module",
      intro: "Shelby estimates fail when heat pacing or I-240 distance is ignored.",
      bullets: ["Prefer early starts May–September for open carries.","Price I-40/I-240 pairs portal-to-portal.","Collect HOA packets for Germantown/Collierville product.","Clarify Tennessee vs Arkansas/Mississippi destinations.","Verify TDOR intrastate authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Shelby County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Shelby County Schools and municipal systems (e.g., Germantown, Collierville, Bartlett where applicable) serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District boundary tools, Tennessee DOE data, and campus visits beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Methodist, Baptist Memorial, Regional One, and other facilities serve Memphis corridors. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from southeast suburbs. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Core vs eastern stock", detail: "Mixed multi-unit and older SFH near core; larger HOA tracts dominate eastern suburbs." },
          { title: "Cost variation", detail: "Prices vary sharply by corridor. Budget HOA dues where applicable." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Midtown / near-core lifestyle", detail: "Walkable amenities with stair/curb tradeoffs." },
          { title: "East Memphis pattern", detail: "Established SFH and multi-family with arterial congestion." },
          { title: "Southeast suburb pattern", detail: "HOA product and longer portal time to downtown jobs." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Logistics, healthcare, education, distribution, and professional services shape employment." },
          { title: "Commute realism", detail: "I-40, I-55, and I-240 peaks are real. Test drive peak routes." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "River-city identity", detail: "Shelby is West Tennessee river-metro fabric — not Nashville music-core or East Tennessee mountains." },
          { title: "Climate", detail: "Hot humid summers and storms. Plan outdoor staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Shelby County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify TDOR intrastate authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Shelby County — official site", href: "https://www.shelbycountytn.gov/", external: true },
      { label: "City of Memphis", href: "https://www.memphistn.gov/", external: true },
      { label: "Shelby County Schools", href: "https://www.scsk12.org/", external: true, note: "Boundaries & calendars" },
      { label: "TDOT traffic resources", href: "https://www.tn.gov/tdot.html", external: true }
    ],
  },
  directoryHint: "Prefer heat-aware early starts; Midtown stair/curb experience; HOA fluency for eastern suburbs; honest I-240 pricing. Verify TDOR intrastate and FMCSA as applicable.",
  lastReviewed: '2026-07-24',
});
