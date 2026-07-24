import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeWyPack } from '@/lib/local-movers/county-intelligence/wyoming/wy-shared';

/**
 * Natrona County, WY — Casper regional hub / energy corridor.
 * Distinct from Cheyenne capital (Laramie County) and Powder River Basin (Campbell).
 */
export const natronaCountyWyIntelligence: CountyIntelligencePack = finalizeWyPack({
  countySlug: 'natrona',
  hubTitle: 'Natrona County Moving Intelligence Hub',
  eyebrow:
    'Natrona County · Casper WY regional hub · energy corridor · I-25 · US-20 · US-26',
  h1: 'Moving in Natrona County: Casper Density, Energy-Hub Access & Casper Mountain Winter Approaches',
  heroOpener:
    'Natrona County, Wyoming is the Casper regional and energy hub — downtown Casper multi-unit and commercial stock, east and west residential belts, Mills and Evansville edge product, Bar Nunn and north-county approaches, and Casper Mountain grades that rewrite winter labor — not a Cheyenne capital-corridor rename and not a Gillette Powder River Basin clone. A downtown Casper third-floor walk-up, a west-side ranch driveway, a Mills industrial-adjacent SFH, and a mountain-approach long-carry do not share truck access, curb rules, or empty-mile risk. I-25, US-20, US-26, and the local Casper grid freeflow rewrite “local” estimates, and energy-sector turnover plus high-plains and mountain winter ice can erase schedule optimism overnight. This hub is for people moving in Natrona County, Wyoming — Casper-market realities — not a recycled Cheyenne or Gillette page.',
  heroCredibility:
    'WYDOT Operating Authority · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-25 · US-20 · US-26 · local Casper grid',
  whatMakesDifferent: {
    title: 'What makes moving in Natrona County different',
    intro:
      'These are Casper regional and energy-hub realities — downtown multi-unit, Mills–Evansville edges, energy-sector turnover, Casper Mountain winter approaches, and I-25 / US-20 / US-26 freeflow — not Cheyenne capital product, not Powder River Basin coal-camp defaults, and not a Colorado or Montana rename.',
    bullets: [
      {
        title: 'Downtown Casper multi-unit rewrites labor hours',
        detail:
          'Scarce curb staging, multi-flight stairs, limited truck length, and building COI packets dominate core jobs. A downtown walk-up is not a west-side garage-friendly ranch or a Bar Nunn edge SFH.',
      },
      {
        title: 'Energy-sector and oilfield-service turnover reshapes demand',
        detail:
          'Project cycles, short-notice housing turns, and mixed industrial-adjacent residential product underprice flat-suburb optimism. Survey photos and flexible windows beat bedroom-count quotes alone.',
      },
      {
        title: 'Mills, Evansville, and Bar Nunn are not core Casper product',
        detail:
          'Edge municipalities, longer portal time into downtown, mixed driveway geometry, and industrial-adjacent approaches reshape estimates that assume a single “Casper flat rate.”',
      },
      {
        title: 'I-25, US-20, and US-26 define portal-to-portal time',
        detail:
          'East Casper ↔ Mills, downtown ↔ Evansville, or Bar Nunn ↔ west-side pairs look local on maps and regional at peak, weather, or construction. Price honestly — empty miles stack fast across the regional hub.',
      },
      {
        title: 'Casper Mountain and high-plains winter approaches are real schedule risk',
        detail:
          'November–March ice, wind, and mountain-approach grades reshape morning windows and outdoor staging. Build weather contingency — especially on mountain and open-county pairs.',
      },
      {
        title:
          'WYDOT Operating Authority for intrastate HHG · FMCSA for interstate',
        detail:
          'Moves entirely within Wyoming by for-hire household goods carriers generally require WYDOT Operating Authority (Letter of Authority). Match the legal name on the estimate to WYDOT authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. Do not apply Colorado PUC, Montana, Idaho, Utah, North Dakota, South Dakota, or New Jersey consumer-mover frameworks as Wyoming intrastate requirements. A Wyoming business registration alone does not authorize interstate delivery, and a USDOT alone is not automatic WYDOT intrastate permission.',
      },
    ],
  },
  zonesHeading: 'Natrona County access zones',
  zonesIntro:
    'Plan by downtown Casper multi-unit, east and west residential belts, Mills–Evansville edges, Bar Nunn / north approaches, and Casper Mountain / rural grades — access rules cluster by density and terrain more than ZIP alone.',
  zones: [
    {
      id: 'casper-downtown-core',
      name: 'Downtown Casper, commercial core & multi-unit',
      shortName: 'Casper core',
      neighborhoods: [
        'Downtown Casper',
        'Central Avenue corridors',
        'Second Street commercial edges',
        'Hospital and medical corridors',
        'Core multi-unit pockets',
      ],
      housingTypes: 'Walk-up multifamily, older SFH, limited elevators, commercial-adjacent stock',
      challenges: [
        'Multi-flight stairs and scarce curb staging',
        'Building COI packets near medical and commercial corridors',
        'I-25 / local-grid freeflow at peak',
      ],
      moverTips:
        'Survey stair counts with photos. Book mid-week early freight windows. Confirm building COIs and curb options in writing.',
      cityKeywords: [
        'casper',
        'downtown casper',
      ],
    },
    {
      id: 'casper-east-west-residential',
      name: 'East & west Casper residential belts',
      shortName: 'East / west Casper',
      neighborhoods: [
        'East Casper residential',
        'West Casper residential',
        'CY Avenue corridors',
        'Outer Drive belts',
        'Suburban SFH and townhome pockets',
      ],
      housingTypes: 'Ranch and two-story SFH, townhomes, multi-family pockets',
      challenges: [
        'Cross-zone freeflow to downtown and medical corridors',
        'Mixed driveway geometry and HOA-lite packets',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Clarify east vs west vs downtown addresses. Price portal-to-portal for cross-belt pairs. Survey driveway width for larger trucks.',
      cityKeywords: [
        'casper',
        'east casper',
        'west casper',
        'cy avenue',
      ],
    },
    {
      id: 'mills-evansville',
      name: 'Mills, Evansville & industrial-adjacent edges',
      shortName: 'Mills / Evansville',
      neighborhoods: [
        'Mills',
        'Evansville',
        'Industrial-adjacent residential',
        'Platte River corridor edges',
        'US-20 / US-26 approach pockets',
      ],
      housingTypes: 'SFH, small multi-unit, manufactured, industrial-adjacent stock',
      challenges: [
        'Longer empty miles into Casper core',
        'Mixed curb, rail-adjacent, and industrial freeflow',
        'Energy-sector short-notice housing turns',
      ],
      moverTips:
        'Price Mills–Casper and Evansville–downtown pairs portal-to-portal. Photo curb and driveway early. Confirm municipal vs unincorporated Natrona addresses.',
      cityKeywords: [
        'mills',
        'evansville',
        'casper',
      ],
    },
    {
      id: 'bar-nunn-mountain-rural',
      name: 'Bar Nunn, Casper Mountain approaches & rural Natrona',
      shortName: 'Bar Nunn / mountain / rural',
      neighborhoods: [
        'Bar Nunn',
        'Casper Mountain approaches',
        'Midwest edges',
        'Edgerton edges',
        'Unincorporated rural-residential',
      ],
      housingTypes: 'SFH, rural-residential, mountain cabin-style stock, manufactured',
      challenges: [
        'Mountain grades, long driveway carries, limited turnaround',
        'Winter ice and wind on open and mountain approaches',
        'I-25 and US-20 / US-26 empty miles into core',
      ],
      moverTips:
        'Photo driveway pitch, grade, and staging length. Build winter contingency on mountain approaches. Price rural–core pairs with freeflow buffers.',
      cityKeywords: [
        'bar nunn',
        'casper mountain',
        'midwest',
        'edgerton',
        'natrona county',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Natrona County moving costs',
    intro:
      'Core multi-unit friction, energy-sector turnover soft costs, Mills–Evansville empty miles, Casper Mountain access, and I-25 / US-20 / US-26 winter logistics drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Downtown Casper stair & curb friction',
        detail: 'Walk-ups, scarce staging, and building packets dominate core jobs.',
      },
      {
        title: 'Energy-hub turnover & short-notice windows',
        detail: 'Project cycles and industrial-adjacent housing spike labor and schedule risk.',
      },
      {
        title: 'I-25 / US-20 / US-26 congestion',
        detail: 'Portal-to-portal spikes at peak, construction, and cross-zone pairs.',
      },
      {
        title: 'Mountain / rural empty miles and winter ice delays',
        detail:
          'Map-short pairs still bill regional time; Casper Mountain grades and high-plains ice rewrite schedules.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,700+',
        note: 'Higher with walk-ups, mountain grades, or winter weather',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,300–$4,200+',
        note: 'Core and edge friction trends up',
      },
      {
        label: '3–4+ BR / mountain / cross-zone / rural',
        value: '$2,600–$8,500+',
        note: 'Long carries and multi-corridor pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$195+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Natrona County',
    intro:
      'Energy-sector project cycles, family school calendars, multi-family lease turns, and Casper Mountain / high-plains winter ice reshape Casper-area windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Clear downtown curb and reduce I-25 / US-20 / US-26 pain before peak.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail:
          'Book Casper multi-unit and residential-belt Saturdays early.',
      },
      {
        title: 'Energy and industrial turnover windows',
        detail:
          'Short-notice Mills–Evansville and industrial-adjacent turns fill crews first — book flexible dates when project calendars shift.',
      },
      {
        title: 'Winter mountain ice, wind & high-plains approach risk',
        detail:
          'Plan outdoor staging contingency and flexible start times November–March — especially Casper Mountain approaches.',
      },
    ],
  },
  specialized: [
    {
      id: 'casper-energy-hub-grid',
      title: 'Casper energy hub, multi-unit & I-25 / US-20 / US-26 logistics module',
      intro:
        'Natrona County estimates fail when core building packets, energy-sector short notice, Mills–Evansville empty miles, or Casper Mountain winter grades are ignored — and when crews treat this as a Cheyenne capital or Gillette Powder River rename.',
      bullets: [
        'Request downtown Casper multi-unit building packets early.',
        'Photo stair access, basement entries, driveway pitch, and mountain grades.',
        'Price I-25 · US-20 · US-26 pairs portal-to-portal.',
        'Clarify Casper vs Mills vs Evansville vs Bar Nunn destinations on multi-town estimates.',
        'Build weather contingency for Casper Mountain and open-county winter approaches.',
        'For pure in-state Wyoming jobs insist on WYDOT Operating Authority (Letter of Authority) matching the legal business name; verify FMCSA for any interstate leg — not CO PUC, MT, ID, UT, ND, SD, or NJ frameworks.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Natrona County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit. This is Casper regional / energy-hub living, not Cheyenne capital product.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Natrona County School District #1 and other systems serve Casper, Mills, Evansville, Bar Nunn, and rural belts. Confirm zoning carefully — assignment is address-based across the regional hub.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools and Wyoming Department of Education data beat ranking screenshots.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare access',
        bullets: [
          {
            title: 'Major systems',
            detail:
              'Wyoming Medical Center and affiliated campuses anchor regional care for central Wyoming. Confirm networks and specialist access for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Mills, Evansville, Bar Nunn, and mountain approaches into Casper medical corridors. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core multi-unit vs residential belts vs edge towns vs mountain stock',
            detail:
              'Downtown Casper walk-ups, east/west SFH belts, Mills–Evansville edge product, and Casper Mountain approaches price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Energy-sector demand cycles can tighten rentals and short-term housing. Budget for older-building repair risk and project-driven turnover near industrial edges.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown Casper lifestyle',
            detail:
              'Walkable amenities with stair, curb, density, and winter ice tradeoffs.',
          },
          {
            title: 'East / west residential pattern',
            detail: 'More space and school corridors with cross-zone commute math to core jobs.',
          },
          {
            title: 'Mills / Evansville pattern',
            detail: 'Edge value and industrial-adjacent logistics near US-20 / US-26.',
          },
          {
            title: 'Bar Nunn / mountain / rural pattern',
            detail: 'Space and quieter approaches with grades, wind, and winter ice survey needs.',
          },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute patterns',
        bullets: [
          {
            title: 'Employment anchors',
            detail:
              'Energy and oilfield services, healthcare, logistics, education, government, and regional retail shape employment across the Casper hub.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-25, US-20, and US-26 peaks are real. Test drive peak routes between your zone and medical / energy / downtown anchors — winter mountain ice changes “nearby.”',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Casper regional / energy-hub identity',
            detail:
              'Natrona County is central Wyoming’s commercial and energy hub — Casper density, mountain approaches, and corridor logistics — not Cheyenne capital product and not a Gillette Powder River Basin rename.',
          },
          {
            title: 'Climate',
            detail:
              'High-plains semi-arid climate with strong wind, cold winters, mountain ice risk, and four-season swings. Plan outdoor staging contingency year-round.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Natrona County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify WYDOT Operating Authority (Letter of Authority) for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Natrona County, Wyoming — official site',
        href: 'https://www.natronacounty-wy.gov/',
        external: true,
      },
      {
        label: 'City of Casper — official site',
        href: 'https://www.casperwy.gov/',
        external: true,
        note: 'Primary municipal context — Casper regional hub',
      },
      {
        label: 'WYDOT — traveler information',
        href: 'https://www.wyoroad.info/',
        external: true,
        note: 'I-25 / US-20 / US-26 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer Casper core multi-unit and Mills–Evansville edge experience with honest I-25 · US-20 · US-26 pricing and Casper Mountain winter awareness. Insist on WYDOT Operating Authority (Letter of Authority) for intrastate WY moves; verify FMCSA interstate. Not CO PUC, MT, ID, UT, ND, SD, or NJ frameworks. This is Natrona County WY (Casper regional / energy hub) — not Cheyenne capital and not Gillette Powder River Basin.',
  lastReviewed: '2026-07-24',
});
