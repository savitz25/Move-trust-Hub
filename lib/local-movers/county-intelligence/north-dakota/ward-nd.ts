import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeNdPack } from '@/lib/local-movers/county-intelligence/north-dakota/nd-shared';

/**
 * Ward County, ND — Minot regional / Minot AFB military-adjacent / Souris River basin.
 * NOT Fargo Red River Valley. NOT Bismarck capital. NOT a renamed MT Great Falls or MN page.
 */
export const wardCountyNdIntelligence: CountyIntelligencePack = finalizeNdPack({
  countySlug: 'ward',
  hubTitle: 'Ward County Moving Intelligence Hub',
  eyebrow:
    'Ward · Minot regional · Minot AFB–adjacent · US-2 · US-83',
  h1: 'Moving in Ward County: Minot Regional Access, Military-Adjacent Housing & North-Central Winter Logistics',
  heroOpener:
    'Ward County, North Dakota is the north-central regional hub — downtown Minot multi-unit and character stock, north and south residential belts, Minot Air Force Base–adjacent housing, Souris River basin approaches, and rural plains product that rewrite “local” estimates under military PCS calendars, healthcare, and prairie freeflow. This is not Fargo Red River Valley density, not Bismarck capital product, not Grand Forks university-north alone, and not a renamed Montana Great Falls, Minnesota, or South Dakota template. A downtown walk-up, a south Minot HOA driveway, a base-adjacent multi-unit, and a rural Ward farmstead do not share truck access, curb rules, or empty-mile risk. US-2, US-83, and the local Minot grid freeflow rewrite map-short pairs, and north-central winter ice and wind can erase schedule optimism overnight. This hub is for people moving in Ward County, North Dakota — Minot regional / military-adjacent realities, not a recycled Fargo, Bismarck, MN, SD, or MT page.',
  heroCredibility:
    'NDDOT Household Goods Carrier Permit · FMCSA · Curated directory listings',
  majorCorridors: 'US-2 · US-83 · local Minot grid',
  whatMakesDifferent: {
    title: 'What makes moving in Ward County different',
    intro:
      'These are Minot regional / military-adjacent realities — PCS calendars, downtown multi-unit, base-area housing, south and north residential belts, US-2 / US-83 freeflow, and prairie winter logistics — not Fargo corporate defaults, not Bismarck capital product, and not a Montana or Minnesota rename.',
    bullets: [
      {
        title: 'This is Minot regional / military-adjacent — not Fargo or Bismarck',
        detail:
          'Ignore Red River Valley density scripts and capital-session templates as default product. Ward is north-central North Dakota’s commercial, healthcare, and Minot AFB–adjacent hub on the Souris River basin. Match estimates to Minot, base-adjacent belts, and rural Ward addresses.',
      },
      {
        title: 'Minot AFB–adjacent and PCS calendars create hard spikes',
        detail:
          'Military permanent-change-of-station windows compress surveys, curb, and multi-unit capacity near base-adjacent housing. Civilian “any Saturday” assumptions fail during peak PCS waves — coordinate early with orders timelines. Civilian local moves still need matching NDDOT or FMCSA authority for the job type.',
      },
      {
        title: 'Downtown Minot multi-unit differs from south-belt SFH and base-area product',
        detail:
          'Walk-ups, scarce curb, stairs, and older character stock dominate core jobs. A south Minot ranch or base-adjacent multi-unit is not a downtown loft freight window.',
      },
      {
        title: 'US-2 and US-83 define portal-to-portal time',
        detail:
          'Downtown ↔ south belts, base-adjacent ↔ north Minot, or Minot ↔ rural Ward pairs look local on maps and regional at peak. Price honestly — empty miles, construction, and winter freeflow stack fast.',
      },
      {
        title: 'North-central winter, wind, and ice are real schedule risk',
        detail:
          'Prairie snow, freeze-thaw ice on residential grids, Souris basin wind, and rural approach soft shoulders reshape morning windows. Build weather contingency into outdoor labor — especially November–March.',
      },
      {
        title:
          'NDDOT Household Goods Carrier Permit for intrastate ND — not MnDOT, SD, MT, WY, or NJ',
        detail:
          'Moves entirely within North Dakota by for-hire household goods carriers generally require a Household Goods Carrier Permit from the North Dakota Department of Transportation (NDDOT) Motor Vehicle division. Match the legal name on the written estimate to NDDOT permit status before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. Do not accept MnDOT HHG, South Dakota, Montana, Wyoming, or New Jersey credentials as substitutes for pure in-state North Dakota authority. Military HHG entitlement moves may involve contracted carriers — civilian local moves still need matching NDDOT or FMCSA authority.',
      },
    ],
  },
  zonesHeading: 'Ward County access zones',
  zonesIntro:
    'Plan by downtown Minot multi-unit, north and south residential belts, Minot AFB–adjacent housing, and rural Souris / plains approaches — access rules cluster by product more than ZIP alone.',
  zones: [
    {
      id: 'minot-downtown-core',
      name: 'Downtown Minot multi-unit & core character stock',
      shortName: 'Downtown Minot',
      neighborhoods: [
        'Downtown Minot',
        'Core multi-unit and walk-ups',
        'Broadway / Main corridor edges',
        'Historic character grids',
        'Commercial-adjacent residential',
      ],
      housingTypes: 'Walk-up multifamily, condos, character SFH, limited elevators',
      challenges: [
        'Scarce curb staging and tight turning radii',
        'Multi-flight stairs and building packets',
        'US-2 / US-83 freeflow into core at peak',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week morning freight windows. Photo curb options and stair counts — downtown is not south Minot ranch access.',
      cityKeywords: [
        'minot',
        'downtown minot',
        'broadway minot',
        'main street minot',
      ],
    },
    {
      id: 'south-north-minot-belts',
      name: 'South & north Minot residential belts',
      shortName: 'S/N Minot',
      neighborhoods: [
        'South Minot',
        'North Minot',
        '16th Street / 20th Avenue corridors',
        'Established SFH grids',
        'Mixed multi-family pockets',
      ],
      housingTypes: 'Mixed SFH, townhomes, multi-family, some HOA product',
      challenges: [
        'US-83 / arterial freeflow into core at peak',
        'HOA packets on newer multi-family',
        'Longer portal time on belt–downtown pairs',
      ],
      moverTips:
        'Price south/north Minot ↔ downtown pairs portal-to-portal. Collect HOA packets early on growth multi-family. Avoid peak US-83 windows when flexible.',
      cityKeywords: [
        'south minot',
        'north minot',
        '16th street minot',
        '20th avenue minot',
      ],
    },
    {
      id: 'minot-afb-adjacent',
      name: 'Minot AFB–adjacent & military-area housing',
      shortName: 'MAFB-adjacent',
      neighborhoods: [
        'Minot AFB–adjacent residential',
        'Base housing corridor edges',
        'PCS-heavy multi-family pockets',
        'Northern plains approaches toward base',
        'Military-family rental belts',
      ],
      housingTypes: 'Multi-family, townhomes, SFH, military-adjacent rental product',
      challenges: [
        'PCS-wave capacity compression',
        'Gate / access coordination on base-proximate jobs',
        'US-83 empty miles between base edges and downtown Minot',
      ],
      moverTips:
        'Coordinate PCS timelines early. Clarify on-base vs off-base access rules in writing. Price base-adjacent ↔ downtown pairs portal-to-portal. Civilian local moves still need NDDOT or FMCSA authority for the job type.',
      cityKeywords: [
        'minot afb',
        'minot air force base',
        'base housing minot',
        'mafb',
      ],
    },
    {
      id: 'rural-ward-souris',
      name: 'Rural Ward County & Souris River basin approaches',
      shortName: 'Rural Ward / Souris',
      neighborhoods: [
        'Surrey / Burlington edges',
        'Berthold / Kenmare corridor edges',
        'Souris River basin farmsteads',
        'Rural plains acreage',
        'US-2 / US-83 rural pockets',
      ],
      housingTypes: 'Older SFH, farmhouses, rural-residential, acreage lots',
      challenges: [
        'Long driveway carries and limited truck turnaround',
        'Wind-exposed staging and winter ice',
        'US-2 / US-83 empty miles into Minot',
      ],
      moverTips:
        'Photo driveway pitch, soft shoulders, and staging length. Price rural–core pairs with freeflow buffers. Build winter contingency on basin and plains approaches.',
      cityKeywords: [
        'surrey',
        'burlington',
        'berthold',
        'kenmare',
        'rural ward',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Ward County moving costs',
    intro:
      'Core multi-unit friction, PCS-wave density, base-adjacent access rules, US-2 / US-83 portal time, and north-central winter logistics drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Downtown stair & curb friction',
        detail: 'Walk-ups, scarce staging, and building packets dominate core jobs.',
      },
      {
        title: 'PCS-wave & base-adjacent soft costs',
        detail: 'Peak military windows, multi-unit turns, and access coordination spike labor hours.',
      },
      {
        title: 'US-2 / US-83 freeflow',
        detail: 'Portal-to-portal spikes at peak, construction, and winter weather.',
      },
      {
        title: 'Prairie winter ice, wind & rural empty miles',
        detail: 'Map-short pairs still bill regional time; ice and wind rewrite outdoor staging.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,700+',
        note: 'Higher with walk-ups, PCS peaks, or winter weather',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,300–$4,100+',
        note: 'Core and base-adjacent friction trends up',
      },
      {
        label: '3–4+ BR / HOA / base-area / rural',
        value: '$2,400–$8,200+',
        note: 'Long carries and multi-corridor pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$100–$160+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Ward County',
    intro:
      'Military PCS peaks, family season, multi-family month-ends, and north-central winter ice reshape Minot-area windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear core curb and reduce US-2 / US-83 pain before peak.',
      },
      {
        title: 'Peak family & PCS season: late spring–summer',
        detail: 'Book Minot multi-unit and base-adjacent Saturdays early around PCS waves.',
      },
      {
        title: 'Month-end multi-family turns',
        detail: 'Downtown and base-area elevators/curb fill first.',
      },
      {
        title: 'Winter prairie snow, ice & wind risk',
        detail: 'Plan outdoor staging contingency and flexible start times November–March.',
      },
    ],
  },
  specialized: [
    {
      id: 'minot-military-regional-grid',
      title: 'Minot regional / military-adjacent & corridor-grid module',
      intro:
        'Ward County ND estimates fail when core building packets, PCS calendars, base-adjacent access rules, or US-2/US-83 empty miles are ignored — and when crews treat this as a Fargo, Bismarck, Great Falls, or MN rename page.',
      bullets: [
        'Request Minot multi-unit building packets early.',
        'Photo stair access, basement entries, and curb staging on downtown jobs.',
        'Price US-2 · US-83 pairs portal-to-portal.',
        'Clarify downtown vs south/north belts vs base-adjacent vs rural destinations on multi-town estimates.',
        'For pure in-state North Dakota jobs verify NDDOT Household Goods Carrier Permit; verify FMCSA for any interstate leg. Military entitlement moves may use contracted carriers — civilian local moves still need matching authority.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Ward County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Minot Public Schools and surrounding rural Ward systems serve different addresses. Confirm zoning carefully — district lines shift across Minot, base-adjacent belts, and rural towns. Military families should also confirm DoDEA / base schooling options where applicable.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools and North Dakota Department of Public Instruction data beat ranking screenshots.',
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
              'Trinity Health Minot and affiliated campuses anchor regional care. Confirm networks and specialist access for your household; military families should also map TRICARE / base medical options.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from south/north belts, base-adjacent housing, and rural towns into major Minot medical campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core multi-unit vs base-adjacent vs rural stock',
            detail:
              'Downtown walk-ups, south/north belt SFH, Minot AFB–adjacent rentals, and rural Ward farmsteads price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Renovated core and growth multi-family often prices differently from older stock or rural plains product; PCS demand can tighten base-adjacent inventory.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown Minot lifestyle',
            detail: 'Walkable amenities with stair, curb, density, and winter grid tradeoffs.',
          },
          {
            title: 'South / north Minot pattern',
            detail: 'Mixed SFH and multi-family with US-83 corridor logistics.',
          },
          {
            title: 'Base-adjacent pattern',
            detail: 'Military-family convenience with PCS calendars and access coordination tradeoffs.',
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
              'Minot Air Force Base, healthcare, energy and professional services, education, and regional retail shape employment across the Minot MSA.',
          },
          {
            title: 'Commute realism',
            detail:
              'US-2 and US-83 peaks are real. Test drive peak routes between your zone and Minot employment and base-adjacent anchors.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'North-central regional / military identity',
            detail:
              'Ward is Minot’s regional and military-adjacent county — not a Fargo Red River rename, not Bismarck capital product, and not a Montana Great Falls or Minnesota template.',
          },
          {
            title: 'Climate',
            detail:
              'Four-season northern plains climate with deep cold, prairie wind, and basin snow/ice. Plan outdoor staging contingency November–March.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Ward County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify NDDOT Household Goods Carrier Permit for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Ward County, North Dakota — official site',
        href: 'https://www.wardnd.com/',
        external: true,
      },
      {
        label: 'City of Minot — official site',
        href: 'https://www.minotnd.org/',
        external: true,
      },
      {
        label: 'Minot Air Force Base — official site',
        href: 'https://www.minot.af.mil/',
        external: true,
      },
      {
        label: 'North Dakota DOT — traffic & motor vehicle context',
        href: 'https://www.dot.nd.gov/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Prefer downtown multi-unit and Minot AFB–adjacent / PCS experience with honest US-2 · US-83 pricing. Verify NDDOT Household Goods Carrier Permit in-state and FMCSA interstate. This is Ward County ND (Minot regional / military-adjacent) — not Fargo, not Bismarck, not a MN/SD/MT rename.',
  lastReviewed: '2026-07-24',
});
