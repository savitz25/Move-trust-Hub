import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeTnPack } from '@/lib/local-movers/county-intelligence/tennessee/tn-shared';

export const sevierCountyTnIntelligence: CountyIntelligencePack = finalizeTnPack({
  countySlug: "sevier",
  hubTitle: "Sevier County Moving Intelligence Hub",
  eyebrow: "Sevier · Pigeon Forge/Gatlinburg tourism peaks & cabin logistics",
  h1: "Moving in Sevier County: Tourism Peaks, Cabin Access & US-441 Logistics",
  heroOpener: "Sevier County is a tourism-driven mountain market: Pigeon Forge and Gatlinburg curb competition, cabin and vacation-property logistics on steep or narrow approaches, seasonal congestion on US-441/US-321, and residential pockets in Sevierville that still are not Maryville HOA jobs. A Gatlinburg condo, a Pigeon Forge cabin, a Sevierville multi-family unit, and a rural mountain lot do not share truck access or seasonal timing risk. This hub is for Sevier — not Blount foothill overflow alone and not Knoxville campus density.",
  heroCredibility:
    'TDOR motor carrier intrastate authority for in-state TN moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "US-441 · US-321 · US-411 · Forks of the River Pkwy · tourism spur corridors",
  whatMakesDifferent: {
    title: "What makes moving in Sevier County different",
    intro: "Tourism peaks and cabin/vacation-property access — not standard Knoxville suburb logistics.",
    bullets: [
      {
        title: "Tourism calendars rewrite curb access",
        detail: "Peak visitor weekends can erase “normal” residential staging windows in Pigeon Forge and Gatlinburg.",
      },
      {
        title: "Cabin and vacation-property approaches are grade- and width-sensitive",
        detail: "Survey turn radius, driveway grade, and shuttle needs before final pricing.",
      },
      {
        title: "US-441 / US-321 define portal time",
        detail: "Short map miles can become long hours in peak season.",
      },
      {
        title: "Humidity and mountain weather affect open staging",
        detail: "Protect cardboard and electronics; confirm weather contingency.",
      },
      {
        title: "Sevier is not Blount",
        detail: "Tourism cabin logistics differ from Maryville HOA growth product.",
      },
      {
        title: 'Intrastate TN rules vs interstate authority',
        detail:
          'Moves entirely within Tennessee by for-hire carriers are generally subject to Tennessee Department of Revenue (TDOR) motor carrier intrastate authority requirements as applicable. Interstate legs need active FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: "Sevier access zones",
  zonesIntro: "Plan by Sevierville, Pigeon Forge tourism core, Gatlinburg/park approaches, and rural mountain edges.",
  zones: [
    {
      id: "sevierville",
      name: "Sevierville multi-family & town corridors",
      shortName: "Sevierville",
      neighborhoods: ["Sevierville","Forks of the River multi-family","US-411 corridors","Town SFH"],
      housingTypes: "Multi-family, SFH, townhomes",
      challenges: ["Arterial congestion","Mixed access types","Tourism spillover traffic"],
      moverTips: "Prefer mid-week mornings. Confirm unit access type. Build US-411 buffer in peak season.",
      cityKeywords: ["sevierville","forks of the river"],
    },
    {
      id: "pigeon-forge",
      name: "Pigeon Forge tourism corridors",
      shortName: "Pigeon Forge",
      neighborhoods: ["Pigeon Forge","Parkway multi-unit","Tourism-adjacent rentals","Cabin approaches"],
      housingTypes: "Condos, cabins, multi-unit, vacation rentals",
      challenges: ["Severe peak curb competition","Association rules","Narrow approaches"],
      moverTips: "Avoid peak tourist Saturdays when flexible. Get association packets. Survey cabin approaches carefully.",
      cityKeywords: ["pigeon forge","parkway","cabin"],
    },
    {
      id: "gatlinburg",
      name: "Gatlinburg & park approaches",
      shortName: "Gatlinburg",
      neighborhoods: ["Gatlinburg","Parkway multi-unit","Mountain cabin approaches","Park entrance edges"],
      housingTypes: "Condos, cabins, multi-unit",
      challenges: ["Extreme tourism congestion","Steep/narrow approaches","Limited truck staging"],
      moverTips: "Survey grade and truck length. Prefer mid-week off-peak. Discuss shuttle carries for tight cabins.",
      cityKeywords: ["gatlinburg","smoky","cabin"],
    },
    {
      id: "rural-mountain",
      name: "Rural mountain edges",
      shortName: "Rural mountain",
      neighborhoods: ["Wears Valley edges","Rural cabin lots","Mountain driveway approaches"],
      housingTypes: "Cabins, SFH, rural-edge lots",
      challenges: ["Long empty miles","Soft surfaces after rain","Limited alternate routes"],
      moverTips: "Share approach videos. Build weather delay language.",
      cityKeywords: ["wears valley","rural sevier","cabin"],
    }
  ],
  costDrivers: {
    title: "What drives Sevier County moving costs",
    intro: "Tourism congestion and cabin access drive quotes far above flat-suburb averages.",
    drivers: [
      { title: "Peak tourism curb competition", detail: "Time risk skyrockets on busy weekends." },
      { title: "Cabin grade and shuttle needs", detail: "Labor hours rise when full trucks cannot reach the door." },
      { title: "US-441 / US-321 congestion", detail: "Portal-to-portal spikes in peak season." },
      { title: "Weather contingency", detail: "Mountain fog, ice, and storms can force reschedules." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$450–$1,400+", note: "Higher in peak tourism windows" },
      { label: "2–3BR condo or cabin (moderate access)", value: "$1,500–$4,500+", note: "Cabin approaches trend up sharply" },
      { label: "3–4+ BR / steep cabin / peak tourism", value: "$2,800–$8,500+", note: "Tight mountain access prices highest" },
      { label: "Typical 2-person crew rate", value: "$110–$185+/hr", note: "Portal-to-portal; specialty mountain access scales up" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Sevier County",
    intro: "Tourism peaks dominate more than standard family lease calendars.",
    items: [
      { title: "Best windows: mid-week off-peak tourism mornings", detail: "Clear curb in Pigeon Forge and Gatlinburg." },
      { title: "Summer and leaf-season peaks", detail: "Book early; expect severe congestion on US-441/US-321." },
      { title: "Holiday tourism spikes", detail: "Avoid peak holiday weekends when flexible." },
      { title: "Winter weather risk", detail: "Ice and mountain fog can delay arrivals — confirm contingency language." }
    ],
  },
  specialized: [
    {
      id: "sevier-tourism-cabin",
      title: "Tourism peak & cabin access module",
      intro: "Sevier estimates fail when tourism curb rules or cabin grades are ignored.",
      bullets: ["Survey cabin driveway grade, width, and shuttle needs before final pricing.","Prefer mid-week off-peak windows in Pigeon Forge and Gatlinburg.","Get association packets for condos and multi-unit tourism product.","Build US-441/US-321 seasonal buffer.","Do not reuse Blount Maryville HOA assumptions for cabin tourism jobs.","Verify TDOR intrastate authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Sevier County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Sevier County Schools is the primary public K–12 system. Assignment is address-based." },
          { title: "Tourism economy context", detail: "Housing demand often follows hospitality employment more than school rankings alone." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "LeConte Medical Center and regional East Tennessee facilities serve residents. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour and tourism-affected drive times. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Tourism multi-unit and cabin stock", detail: "Vacation rentals and cabins dominate many corridors; primary residences still exist in Sevierville and edges." },
          { title: "Access realities", detail: "Steep and narrow approaches matter more than square footage alone." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Sevierville lifestyle", detail: "More residential town fabric with tourism spillover traffic." },
          { title: "Pigeon Forge / Gatlinburg pattern", detail: "Tourism density with extreme peak-season logistics." },
          { title: "Cabin / mountain-edge lifestyle", detail: "Scenic access with grade and shuttle tradeoffs on move day." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Tourism, hospitality, retail, and related services dominate; some residents commute toward Knoxville." },
          { title: "Commute realism", detail: "US-441 and US-321 peaks are severe in tourist season. Test drive peak routes." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "Tourism-mountain identity", detail: "Sevier is distinct from Blount foothill towns and Knoxville urban fabric." },
          { title: "Climate", detail: "Mountain weather shifts quickly; plan staging contingency year-round." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Sevier County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify TDOR intrastate authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Sevier County — official site", href: "https://www.seviercountytn.gov/", external: true },
      { label: "City of Sevierville", href: "https://www.seviervilletn.org/", external: true },
      { label: "City of Pigeon Forge", href: "https://www.cityofpigeonforge.com/", external: true },
      { label: "City of Gatlinburg", href: "https://www.gatlinburgtn.gov/", external: true },
      { label: "Sevier County Schools", href: "https://www.sevier.org/", external: true },
      { label: "TDOT traffic resources", href: "https://www.tn.gov/tdot.html", external: true }
    ],
  },
  directoryHint: "Prefer cabin/mountain access experience; tourism-season curb awareness; honest US-441/US-321 seasonal pricing. Verify TDOR intrastate and FMCSA as applicable.",
  lastReviewed: '2026-07-24',
});
