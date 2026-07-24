import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeWyPack } from '@/lib/local-movers/county-intelligence/wyoming/wy-shared';

/**
 * Campbell County, WY — Gillette / Powder River Basin energy corridor.
 * Distinct from Casper (Natrona) and Cheyenne capital (Laramie County).
 */
export const campbellCountyWyIntelligence: CountyIntelligencePack = finalizeWyPack({
  countySlug: 'campbell',
  hubTitle: 'Campbell County Moving Intelligence Hub',
  eyebrow:
    'Campbell County · Gillette WY · Powder River Basin · I-90 · US-14 · WY-59',
  h1: 'Moving in Campbell County: Gillette Access, Powder River Basin Energy Logistics & I-90 Corridor Freeflow',
  heroOpener:
    'Campbell County, Wyoming is the Gillette / Powder River Basin energy corridor — downtown Gillette multi-unit and commercial stock, residential belts and growth tracts, Wright and south-basin edge product, and I-90 / US-14 / WY-59 freeflow that rewrites “local” estimates across northeastern Wyoming — not a Casper energy-hub rename and not a Cheyenne capital-corridor clone. A downtown Gillette walk-up, a north-side ranch driveway, a Wright coal-camp SFH, and a rural basin long-carry do not share truck access, curb rules, or empty-mile risk. Energy-sector project cycles, short-notice housing turns, and high-plains winter wind and ice can erase schedule optimism overnight. This hub is for people moving in Campbell County, Wyoming — Gillette and Powder River Basin realities — not a recycled Casper or Cheyenne page.',
  heroCredibility:
    'WYDOT Operating Authority · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-90 · US-14 · WY-59 · local Gillette grid',
  whatMakesDifferent: {
    title: 'What makes moving in Campbell County different',
    intro:
      'These are Gillette / Powder River Basin realities — energy-sector turnover, downtown multi-unit, Wright and basin-edge product, I-90 / US-14 / WY-59 freeflow, and high-plains winter logistics — not Casper mountain approaches, not Cheyenne capital product, and not a Montana or Dakota rename.',
    bullets: [
      {
        title: 'Powder River Basin energy cycles reshape demand more than bedroom count',
        detail:
          'Coal, oil, and related service-sector housing turns, short-notice departures, and mixed industrial-adjacent residential product underprice flat-suburb optimism. Flexible windows and survey photos beat inventory lists alone.',
      },
      {
        title: 'Downtown Gillette multi-unit rewrites labor hours',
        detail:
          'Scarce curb staging, multi-flight stairs, limited truck length, and building packets dominate core jobs. A downtown walk-up is not a north-side garage-friendly ranch or a Wright edge SFH.',
      },
      {
        title: 'Wright and south-basin edges are not core Gillette product',
        detail:
          'Longer empty miles on WY-59, small-town curb, mixed driveway geometry, and energy-camp housing stock reshape estimates that assume a single “Gillette flat rate.”',
      },
      {
        title: 'I-90, US-14, and WY-59 define portal-to-portal time',
        detail:
          'North Gillette ↔ downtown, Gillette ↔ Wright, or basin-edge ↔ residential-belt pairs look local on maps and regional at peak, weather, or construction. Price honestly — empty miles and wind delays stack fast.',
      },
      {
        title: 'High-plains winter wind and ice are real schedule risk',
        detail:
          'November–March wind, freeze-thaw ice, and open-basin approaches reshape morning windows. Build weather contingency into outdoor staging — especially on Wright and rural pairs.',
      },
      {
        title:
          'WYDOT Operating Authority for intrastate HHG · FMCSA for interstate',
        detail:
          'Moves entirely within Wyoming by for-hire household goods carriers generally require WYDOT Operating Authority (Letter of Authority). Match the legal name on the estimate to WYDOT authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. Do not apply Colorado PUC, Montana, Idaho, Utah, North Dakota, South Dakota, or New Jersey consumer-mover frameworks as Wyoming intrastate requirements. A Wyoming business registration alone does not authorize interstate delivery, and a USDOT alone is not automatic WYDOT intrastate permission.',
      },
    ],
  },
  zonesHeading: 'Campbell County access zones',
  zonesIntro:
    'Plan by downtown Gillette multi-unit, residential growth belts, Wright and south-basin edges, and rural Powder River Basin approaches — access rules cluster by energy-corridor logistics and density more than ZIP alone.',
  zones: [
    {
      id: 'gillette-downtown-core',
      name: 'Downtown Gillette, commercial core & multi-unit',
      shortName: 'Gillette core',
      neighborhoods: [
        'Downtown Gillette',
        'Main Street commercial corridors',
        'Central multi-unit pockets',
        'Medical and hospital corridors',
        'Commercial-adjacent residential',
      ],
      housingTypes: 'Walk-up multifamily, older SFH, limited elevators, commercial-adjacent stock',
      challenges: [
        'Multi-flight stairs and scarce curb staging',
        'Building packets near medical and commercial corridors',
        'I-90 / local-grid freeflow at peak',
      ],
      moverTips:
        'Survey stair counts with photos. Book mid-week early freight windows. Confirm building COIs and curb options in writing.',
      cityKeywords: [
        'gillette',
        'downtown gillette',
      ],
    },
    {
      id: 'gillette-residential-belts',
      name: 'Gillette residential belts & growth tracts',
      shortName: 'Gillette residential',
      neighborhoods: [
        'North Gillette residential',
        'South Gillette residential',
        'West Gillette belts',
        'School-corridor SFH tracts',
        'Multi-family growth pockets',
      ],
      housingTypes: 'Ranch and two-story SFH, townhomes, multi-family pockets',
      challenges: [
        'Cross-zone freeflow to downtown and medical corridors',
        'Mixed driveway geometry and HOA-lite packets',
        'Energy-sector lease and project-calendar peaks',
      ],
      moverTips:
        'Clarify north vs south vs downtown addresses. Price portal-to-portal for cross-belt pairs. Align with energy project calendars when relevant.',
      cityKeywords: [
        'gillette',
        'north gillette',
        'south gillette',
      ],
    },
    {
      id: 'wright-south-basin',
      name: 'Wright, south-basin edges & WY-59 corridor product',
      shortName: 'Wright / south basin',
      neighborhoods: [
        'Wright',
        'WY-59 south corridors',
        'South-basin residential pockets',
        'Energy-camp adjacent edges',
        'Small-town curb stock',
      ],
      housingTypes: 'Small-town SFH, multi-unit limited, manufactured, energy-adjacent stock',
      challenges: [
        'Long empty miles on WY-59 into Gillette core',
        'Short-notice energy housing turns',
        'Wind-exposed staging and winter ice',
      ],
      moverTips:
        'Price Gillette ↔ Wright pairs as regional, not “local free.” Survey curb and driveway early. Confirm Wright vs unincorporated Campbell addresses.',
      cityKeywords: [
        'wright',
        'campbell county',
        'wy-59',
      ],
    },
    {
      id: 'rural-powder-river',
      name: 'Rural Powder River Basin & outlying Campbell approaches',
      shortName: 'Rural basin',
      neighborhoods: [
        'Unincorporated Campbell County',
        'I-90 east and west edges',
        'US-14 corridor pockets',
        'Rural-residential acreage',
        'Ag and energy-adjacent approaches',
      ],
      housingTypes: 'Rural SFH, acreage lots, manufactured, limited multi-unit',
      challenges: [
        'Long empty miles and soft-shoulder or gravel access',
        'Wind, winter ice, and limited staging space',
        'I-90 / US-14 / WY-59 approach freeflow',
      ],
      moverTips:
        'Survey rural driveway width, turnaround, and surface condition. Price empty miles and weather contingency honestly. Do not treat as downtown Gillette curb jobs.',
      cityKeywords: [
        'campbell county',
        'powder river',
        'rozet',
        'reclus',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Campbell County moving costs',
    intro:
      'Core multi-unit friction, energy-sector short-notice soft costs, Wright empty miles, I-90 / US-14 / WY-59 freeflow, and high-plains winter logistics drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Downtown Gillette stair & curb friction',
        detail: 'Walk-ups, scarce staging, and building packets dominate core jobs.',
      },
      {
        title: 'Energy-basin turnover & short-notice windows',
        detail:
          'Project cycles and industrial-adjacent housing spike labor and schedule risk.',
      },
      {
        title: 'I-90 / US-14 / WY-59 congestion',
        detail: 'Portal-to-portal spikes at peak, construction, and Gillette ↔ Wright pairs.',
      },
      {
        title: 'Basin empty miles and winter wind / ice delays',
        detail:
          'Map-short pairs still bill regional time; open-basin wind and freeze-thaw ice rewrite schedules.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,700+',
        note: 'Higher with walk-ups, Wright pairs, or winter weather',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,300–$4,200+',
        note: 'Core and energy-edge friction trends up',
      },
      {
        label: '3–4+ BR / Wright / rural / cross-zone',
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
    title: 'When to schedule a move in Campbell County',
    intro:
      'Energy-sector project cycles, family school calendars, multi-family lease turns, and high-plains winter wind reshape Gillette and Powder River Basin windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Clear downtown curb and reduce I-90 / US-14 / WY-59 pain before peak.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail:
          'Book Gillette multi-unit and residential-belt Saturdays early.',
      },
      {
        title: 'Energy project and lease-turn windows',
        detail:
          'Short-notice Wright and industrial-adjacent turns fill crews first — book flexible dates when project calendars shift.',
      },
      {
        title: 'Winter wind, ice & open-basin approach risk',
        detail:
          'Plan outdoor staging contingency and flexible start times November–March.',
      },
    ],
  },
  specialized: [
    {
      id: 'gillette-powder-river-grid',
      title: 'Gillette multi-unit, Powder River energy & I-90 / WY-59 logistics module',
      intro:
        'Campbell County estimates fail when core building packets, energy-sector short notice, Wright empty miles, or I-90/US-14/WY-59 freeflow are ignored — and when crews treat this as a Casper or Cheyenne rename.',
      bullets: [
        'Request downtown Gillette multi-unit building packets early.',
        'Photo stair access, driveway geometry, and rural staging on basin-edge jobs.',
        'Price I-90 · US-14 · WY-59 pairs portal-to-portal — especially Gillette ↔ Wright.',
        'Clarify Gillette vs Wright vs unincorporated Campbell destinations on every estimate.',
        'Align with energy project calendars when short-notice housing turns are involved.',
        'For pure in-state Wyoming jobs insist on WYDOT Operating Authority (Letter of Authority) matching the legal business name; verify FMCSA for any interstate leg — not CO PUC, MT, ID, UT, ND, SD, or NJ frameworks.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Campbell County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit. This is Gillette / Powder River Basin living, not Casper or Cheyenne product.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Campbell County School District and other systems serve Gillette, Wright, and rural basin belts. Confirm zoning carefully — assignment is address-based across a large energy county.',
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
              'Campbell County Health and affiliated campuses anchor regional care for the Powder River Basin. Confirm networks and specialist access for your household — complex care may still route to Casper or larger metros.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from residential belts and Wright into Gillette medical corridors. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core multi-unit vs residential belts vs Wright vs rural basin stock',
            detail:
              'Downtown Gillette walk-ups, growth-tract SFH, Wright small-town product, and rural basin homes price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Energy demand cycles can tighten rentals and short-term housing quickly. Budget for project-driven turnover and older-building repair risk near industrial edges.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown Gillette lifestyle',
            detail:
              'Walkable amenities with stair, curb, density, and winter wind tradeoffs.',
          },
          {
            title: 'Residential-belt pattern',
            detail: 'More space and school corridors with cross-zone commute math to core jobs.',
          },
          {
            title: 'Wright / south-basin pattern',
            detail: 'Small-town and energy-adjacent living with longer WY-59 empty miles into Gillette.',
          },
          {
            title: 'Rural basin pattern',
            detail: 'Acreage and quieter approaches with gravel access, wind, and winter ice survey needs.',
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
              'Coal and energy extraction and services, logistics, healthcare, education, government, and regional retail shape employment across the Powder River Basin hub.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-90, US-14, and WY-59 peaks and weather are real. Test drive peak routes between your zone and mine, service, and downtown anchors — winter wind changes “nearby.”',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Gillette / Powder River Basin identity',
            detail:
              'Campbell County is northeastern Wyoming’s energy hub — Gillette density, basin-edge logistics, and project-cycle housing — not Casper mountain product and not Cheyenne capital product.',
          },
          {
            title: 'Climate',
            detail:
              'High-plains semi-arid climate with strong wind, cold winters, and open-basin ice risk. Plan outdoor staging contingency year-round.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Campbell County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify WYDOT Operating Authority (Letter of Authority) for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Campbell County, Wyoming — official site',
        href: 'https://www.ccgov.net/',
        external: true,
      },
      {
        label: 'City of Gillette — official site',
        href: 'https://www.gillettewy.gov/',
        external: true,
        note: 'Primary municipal context — Powder River Basin hub',
      },
      {
        label: 'Town of Wright',
        href: 'https://www.wrightwyoming.com/',
        external: true,
        note: 'South-basin municipality context',
      },
      {
        label: 'WYDOT — traveler information',
        href: 'https://www.wyoroad.info/',
        external: true,
        note: 'I-90 / US-14 / WY-59 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer Gillette core multi-unit and Wright / basin-edge experience with honest I-90 · US-14 · WY-59 pricing and energy-sector short-notice awareness. Insist on WYDOT Operating Authority (Letter of Authority) for intrastate WY moves; verify FMCSA interstate. Not CO PUC, MT, ID, UT, ND, SD, or NJ frameworks. This is Campbell County WY (Gillette / Powder River Basin) — not Casper and not Cheyenne capital.',
  lastReviewed: '2026-07-24',
});
