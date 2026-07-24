import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeWyPack } from '@/lib/local-movers/county-intelligence/wyoming/wy-shared';

/**
 * Laramie County, WY — Cheyenne capital corridor / Front Range adjacency.
 * CRITICAL: Laramie County = CHEYENNE (state capital), NOT the city of Laramie
 * (which is Albany County). H1 and hero must never imply "Laramie city" as seat.
 */
export const laramieCountyWyIntelligence: CountyIntelligencePack = finalizeWyPack({
  countySlug: 'laramie',
  hubTitle: 'Laramie County Moving Intelligence Hub',
  eyebrow:
    'Laramie County · Cheyenne WY capital corridor · I-25 · I-80 · Front Range adjacency',
  h1: 'Moving in Laramie County: Cheyenne Capital Density, Warren AFB Access & Front Range Corridor Logistics',
  heroOpener:
    'Laramie County, Wyoming is the Cheyenne capital corridor — downtown Cheyenne multi-unit and state-government stock, South Cheyenne and I-25 growth belts, F.E. Warren Air Force Base housing approaches, east-county plains edges toward Burns and Pine Bluffs, and Front Range adjacency toward Colorado — not the city of Laramie (that is Albany County) and not a Casper energy-hub rename. A Capitol-adjacent walk-up, a South Cheyenne ranch driveway, a Warren AFB base-housing packet job, and a rural plains long-carry do not share truck access, curb rules, or empty-mile risk. I-25, I-80, US-30, US-85, and the local Cheyenne grid freeflow rewrite “local” estimates, and high-plains winter wind and ice can erase schedule optimism overnight. This hub is for people moving in Laramie County, Wyoming — Cheyenne-market realities — not a recycled Albany County / city-of-Laramie page and not a Colorado Front Range clone.',
  heroCredibility:
    'WYDOT Operating Authority · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-25 · I-80 · US-30 · US-85 · local Cheyenne grid',
  whatMakesDifferent: {
    title: 'What makes moving in Laramie County different',
    intro:
      'These are Cheyenne capital-corridor realities — government multi-unit, base housing, I-25 / I-80 freeflow, Front Range adjacency, and high-plains winter logistics — not Albany County / city-of-Laramie university product, not Casper energy-hub defaults, and not a Colorado PUC rename.',
    bullets: [
      {
        title:
          'Laramie County is Cheyenne — not the city of Laramie (Albany County)',
        detail:
          'County seat and market core is Cheyenne, Wyoming’s capital. The city of Laramie sits in Albany County west on I-80. Estimates that assume “Laramie city” stair geometry, university calendars, or Albany corridors will mis-price Cheyenne curb, government building packets, and Front Range pairs. State Cheyenne / Laramie County on every survey.',
      },
      {
        title: 'Capitol-adjacent multi-unit and downtown Cheyenne rewrite labor hours',
        detail:
          'Scarce curb staging, multi-flight stairs, limited truck length, and building COI packets dominate core jobs. A downtown or Capitol-corridor walk-up is not a South Cheyenne garage-friendly ranch.',
      },
      {
        title: 'Warren AFB and military-adjacent housing add soft costs',
        detail:
          'Base access windows, gate lists, housing-office rules, and PCS calendars reshape labor and schedule risk. Civilian crews need written access plans — not generic “Cheyenne flat rate” assumptions.',
      },
      {
        title: 'South Cheyenne and I-25 growth belts are not core product',
        detail:
          'Newer SFH, townhome pockets, HOA-lite rules, longer portal time into downtown, and mixed driveway product reshape estimates that assume a single Laramie County rate.',
      },
      {
        title: 'I-25, I-80, US-30, and US-85 define portal-to-portal time',
        detail:
          'South Cheyenne ↔ downtown, east-county ↔ Capitol corridor, or Cheyenne ↔ Front Range pairs look local on maps and regional at peak, weather, or construction. Price honestly — empty miles and wind delays stack fast.',
      },
      {
        title: 'High-plains winter wind, ice, and Front Range approaches are real schedule risk',
        detail:
          'November–March wind, freeze-thaw ice on arterial approaches, and I-25 / I-80 freeflow reshape morning windows. Build weather contingency into outdoor staging — especially on open plains edges.',
      },
      {
        title:
          'WYDOT Operating Authority for intrastate HHG · FMCSA for interstate',
        detail:
          'Moves entirely within Wyoming by for-hire household goods carriers generally require WYDOT Operating Authority (Letter of Authority). Match the legal name on the estimate to WYDOT authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. Do not apply Colorado PUC, Montana, Idaho, Utah, North Dakota, South Dakota, or New Jersey consumer-mover frameworks as Wyoming intrastate requirements. A Wyoming business registration alone does not authorize interstate delivery, and a USDOT alone is not automatic WYDOT intrastate permission.',
      },
    ],
  },
  zonesHeading: 'Laramie County access zones',
  zonesIntro:
    'Plan by downtown Cheyenne / Capitol multi-unit, South Cheyenne and I-25 growth belts, Warren AFB and military-adjacent housing, and east-county plains edges — access rules cluster by density and corridor more than ZIP alone. This is Cheyenne, not the city of Laramie.',
  zones: [
    {
      id: 'cheyenne-downtown-capitol',
      name: 'Downtown Cheyenne, Capitol corridor & core multi-unit',
      shortName: 'Cheyenne core',
      neighborhoods: [
        'Downtown Cheyenne',
        'Capitol Avenue corridor',
        'Historic downtown edges',
        'Central multi-unit pockets',
        'Government-adjacent blocks',
      ],
      housingTypes: 'Walk-up multifamily, older SFH, limited elevators, commercial-adjacent stock',
      challenges: [
        'Multi-flight stairs and scarce curb staging',
        'Building COI packets near government corridors',
        'I-25 / local-grid freeflow at peak and event days',
      ],
      moverTips:
        'Survey stair counts with photos. Book mid-week early freight windows. Confirm building COIs and curb options in writing. State Cheyenne addresses — never assume city-of-Laramie product.',
      cityKeywords: [
        'cheyenne',
        'downtown cheyenne',
        'capitol',
        'laramie county',
      ],
    },
    {
      id: 'south-cheyenne-i25',
      name: 'South Cheyenne, I-25 growth belts & suburban SFH',
      shortName: 'South Cheyenne / I-25',
      neighborhoods: [
        'South Cheyenne',
        'I-25 south corridors',
        'Storey Boulevard edges',
        'College Drive corridors',
        'Southern HOA-lite tracts',
      ],
      housingTypes: 'Ranch and two-story SFH, townhomes, multi-family growth pockets',
      challenges: [
        'HOA-lite gate lists and truck-length limits',
        'I-25 peak congestion toward core',
        'Longer portal time on growth–core pairs',
      ],
      moverTips:
        'Collect HOA packets early when present. Price South Cheyenne ↔ downtown pairs portal-to-portal. Avoid peak I-25 windows when flexible.',
      cityKeywords: [
        'south cheyenne',
        'cheyenne',
        'storey',
        'college drive',
      ],
    },
    {
      id: 'warren-afb-east',
      name: 'F.E. Warren AFB approaches & east Cheyenne military-adjacent belts',
      shortName: 'Warren AFB / east',
      neighborhoods: [
        'F.E. Warren AFB edges',
        'Military housing approaches',
        'East Cheyenne residential belts',
        'Missile Drive / base-adjacent corridors',
        'PCS turnover pockets',
      ],
      housingTypes: 'Base-adjacent SFH, multi-family, military housing product',
      challenges: [
        'Base access windows, gate lists, and housing-office rules',
        'PCS calendar peaks and short notice windows',
        'Mixed curb and driveway geometry on adjacent civilian stock',
      ],
      moverTips:
        'Confirm base access, escort rules, and housing-office requirements in writing before load day. Align with PCS calendars when relevant. Do not treat as generic South Cheyenne SFH.',
      cityKeywords: [
        'warren afb',
        'f.e. warren',
        'cheyenne',
        'military housing',
      ],
    },
    {
      id: 'east-county-plains',
      name: 'East-county plains edges — Burns, Pine Bluffs & rural approaches',
      shortName: 'East county / plains',
      neighborhoods: [
        'Burns',
        'Pine Bluffs',
        'Albin edges',
        'I-80 east corridors',
        'Unincorporated plains residential',
      ],
      housingTypes: 'Small-town SFH, rural-residential, manufactured, limited multi-unit',
      challenges: [
        'Long empty miles into Cheyenne core',
        'Wind-exposed staging and winter ice',
        'Gravel or soft-shoulder driveway access',
      ],
      moverTips:
        'Photo driveway pitch, turnaround, and surface condition. Price rural–Cheyenne pairs with freeflow and wind buffers. Build winter contingency on open plains approaches.',
      cityKeywords: [
        'burns',
        'pine bluffs',
        'albin',
        'laramie county',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Laramie County moving costs',
    intro:
      'Cheyenne core multi-unit friction, Warren AFB access soft costs, growth-belt HOA rules, I-25 / I-80 portal time, and high-plains winter logistics drive quotes more than bedroom count alone — this is the capital corridor, not the city of Laramie.',
    drivers: [
      {
        title: 'Downtown Cheyenne stair & curb friction',
        detail: 'Walk-ups, scarce staging, and building packets dominate Capitol-corridor jobs.',
      },
      {
        title: 'Warren AFB access & PCS soft costs',
        detail: 'Gate windows, housing-office rules, and short PCS notice spike labor hours.',
      },
      {
        title: 'I-25 / I-80 / US-30 / US-85 congestion',
        detail: 'Portal-to-portal spikes at peak, construction, and Front Range pairs.',
      },
      {
        title: 'Growth–core empty miles and winter wind / ice delays',
        detail:
          'Map-short pairs still bill regional time; plains wind and freeze-thaw ice rewrite schedules.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,700+',
        note: 'Higher with walk-ups, base access, or winter weather',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,300–$4,200+',
        note: 'Core and military-adjacent friction trends up',
      },
      {
        label: '3–4+ BR / HOA / cross-county / plains',
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
    title: 'When to schedule a move in Laramie County',
    intro:
      'State-government cycles, Warren AFB PCS peaks, family school calendars, Front Range weekend freeflow, and high-plains winter wind reshape Cheyenne-area windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Clear Capitol-corridor curb and reduce I-25 / I-80 pain before peak.',
      },
      {
        title: 'Peak family & PCS season: late May–mid-August',
        detail:
          'Book Cheyenne multi-unit and Warren AFB-adjacent Saturdays early.',
      },
      {
        title: 'Month-end multi-family and lease turns',
        detail: 'Downtown and government-adjacent elevators and curb fill first.',
      },
      {
        title: 'Winter wind, ice & high-plains approach risk',
        detail:
          'Plan outdoor staging contingency and flexible start times November–March.',
      },
    ],
  },
  specialized: [
    {
      id: 'cheyenne-capital-corridor-grid',
      title: 'Cheyenne capital corridor & I-25 / I-80 logistics module',
      intro:
        'Laramie County estimates fail when core building packets, Warren AFB access rules, South Cheyenne empty miles, or I-25/I-80 freeflow are ignored — and when crews confuse this market with the city of Laramie in Albany County.',
      bullets: [
        'State Cheyenne / Laramie County on every estimate — never default to city-of-Laramie (Albany County) product.',
        'Request downtown Cheyenne multi-unit building packets early.',
        'Confirm Warren AFB gate, escort, and housing-office rules in writing for base-adjacent jobs.',
        'Photo stair access, basement entries, and curb staging on core and older stock.',
        'Price I-25 · I-80 · US-30 · US-85 pairs portal-to-portal.',
        'For pure in-state Wyoming jobs insist on WYDOT Operating Authority (Letter of Authority) matching the legal business name; verify FMCSA for any interstate leg — not CO PUC, MT, ID, UT, ND, SD, or NJ frameworks.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Laramie County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit. This is Cheyenne capital living, not the city of Laramie in Albany County.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Laramie County School District #1 and other systems serve Cheyenne, South Cheyenne, east-county towns, and rural belts. Confirm zoning carefully — district lines are address-based, and “Laramie” branding can confuse people looking for Albany County schools.',
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
              'Cheyenne Regional Medical Center and affiliated campuses anchor regional care. Confirm networks and specialist access for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from South Cheyenne, east-county towns, and Warren AFB edges into Cheyenne medical corridors. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core multi-unit vs growth SFH vs base-adjacent vs plains stock',
            detail:
              'Downtown Cheyenne walk-ups, South Cheyenne ranch product, Warren AFB-adjacent housing, and Burns–Pine Bluffs rural homes price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Capitol-adjacent renovated stock often prices differently from outer growth multi-family or older plains product. Budget for military PCS demand cycles.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown Cheyenne / Capitol lifestyle',
            detail:
              'Walkable amenities with stair, curb, density, and winter wind tradeoffs.',
          },
          {
            title: 'South Cheyenne / I-25 pattern',
            detail: 'More space, HOA-lite rules, and different commute math to core jobs.',
          },
          {
            title: 'Warren AFB / military-adjacent pattern',
            detail: 'PCS logistics and base-access rules near employment anchors.',
          },
          {
            title: 'East-county plains pattern',
            detail: 'Small-town and rural space with longer empty miles into Cheyenne.',
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
              'State government, F.E. Warren AFB, healthcare, logistics, energy services, and regional retail shape employment across the Cheyenne corridor.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-25, I-80, US-30, and US-85 peaks are real. Test drive peak routes between your zone and Capitol / medical / base anchors — and distinguish Front Range Colorado pairs from in-county Cheyenne pairs.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Cheyenne capital corridor identity',
            detail:
              'Laramie County is Wyoming’s capital market — Cheyenne density, Front Range adjacency, and high-plains logistics — not the city of Laramie (Albany County), not Casper energy-hub product alone, and not a Colorado Front Range rename.',
          },
          {
            title: 'Climate',
            detail:
              'High-plains semi-arid climate with strong wind, cold winters, and freeze-thaw ice. Plan outdoor staging contingency year-round.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Laramie County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify WYDOT Operating Authority (Letter of Authority) for in-state moves and FMCSA for interstate legs before deposits. This is Cheyenne / Laramie County — not the city of Laramie in Albany County.',
    items: [
      {
        label: 'Laramie County, Wyoming — official site',
        href: 'https://www.laramiecountywy.gov/',
        external: true,
      },
      {
        label: 'City of Cheyenne — official site',
        href: 'https://www.cheyennecity.org/',
        external: true,
        note: 'County seat and capital market core — not city of Laramie',
      },
      {
        label: 'WYDOT — traveler information',
        href: 'https://www.wyoroad.info/',
        external: true,
        note: 'I-25 / I-80 / US-30 / US-85 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer Cheyenne core multi-unit and Warren AFB access experience with honest I-25 · I-80 · US-30 · US-85 pricing. Insist on WYDOT Operating Authority (Letter of Authority) for intrastate WY moves; verify FMCSA interstate. Not CO PUC, MT, ID, UT, ND, SD, or NJ frameworks. This is Laramie County WY (Cheyenne capital corridor) — not the city of Laramie in Albany County.',
  lastReviewed: '2026-07-24',
});
