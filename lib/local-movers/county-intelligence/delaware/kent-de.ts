import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeDePack } from '@/lib/local-movers/county-intelligence/delaware/de-shared';

/**
 * Kent County, DE — Dover capital / central Delaware (NOT Kent County RI; not New Castle Wilmington; not Sussex beaches).
 */
export const kentCountyDeIntelligence: CountyIntelligencePack = finalizeDePack({
  countySlug: 'kent',
  hubTitle: 'Kent County Moving Intelligence Hub',
  eyebrow:
    'Kent · Dover DE capital · DE-1 · US-13 · DE-8 · central Delaware',
  h1: 'Moving in Kent County: Dover Capital Density, Central DE Corridors & Base–Government Logistics',
  heroOpener:
    'Kent County, Delaware is central Delaware’s capital market — Dover government and downtown product, established residential grids, DE-1 / US-13 corridor freeflow, and military and state-agency churn that rewrites “local” schedules — not Kent County Rhode Island (Warwick/East Greenwich product), not Wilmington I-95 density, and not Rehoboth beach-season volume. A Legislative Mall–adjacent multi-unit job, a Dover Air Force Base household goods window, a Smyrna corridor SFH, and a Magnolia cul-de-sac do not share truck access, curb rules, or empty-mile risk. DE-1, US-13, and DE-8 freeflow rewrite portal-to-portal time across the grid, and many Kent jobs become interstate the moment the second address is in Maryland’s Eastern Shore or Pennsylvania. This hub is for people moving in Kent County, Delaware — Dover capital realities, not a renamed New Castle page, not Sussex beaches, and not Kent County RI.',
  heroCredibility:
    'Written estimates + insurance for intrastate DE moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'DE-1 · US-13 · DE-8 · local Dover grid',
  whatMakesDifferent: {
    title: 'What makes moving in Kent County different',
    intro:
      'These are central Delaware capital-market realities — Dover density, base and agency timing, DE-1 / US-13 freeflow, and cross-state empty miles into MD — not Wilmington I-95 product, not Sussex beach season, and not Kent County Rhode Island.',
    bullets: [
      {
        title: 'Dover capital, downtown, and multi-unit product rewrite labor hours',
        detail:
          'Elevators, COI packets, scarce curb near government campuses, and stair-heavy older stock dominate core jobs. A downtown Dover walk-up is not a suburban garage-friendly two-story off DE-1.',
      },
      {
        title: 'Established Dover residential grids underprice flat-suburb optimism',
        detail:
          'Older Dover neighborhoods bring tight curb, basement stairs, tree canopy, and limited truck turnaround. Survey photos beat bedroom-count quotes.',
      },
      {
        title: 'Military, state-agency, and capital-calendar timing is not civilian-only product',
        detail:
          'Dover Air Force Base PCS windows, state-employee lease turns, and capital-session demand stack differently from pure residential summer peaks. Confirm access windows and ID requirements early.',
      },
      {
        title: 'DE-1, US-13, and DE-8 define portal-to-portal time',
        detail:
          'Dover ↔ Smyrna, Dover ↔ Magnolia, or capital core ↔ DE-1 corridor pairs look local on maps and regional at peak beach-season through-traffic. Price honestly — empty miles stack fast.',
      },
      {
        title: 'Central DE geography means many jobs become interstate into Maryland',
        detail:
          'Eastern Shore MD second addresses are common. Map-short pairs still need FMCSA authority and honest cross-state pricing — not Delaware-only assumptions.',
      },
      {
        title:
          'Delaware has no special statewide HHG certificate — written estimates + insurance in-state; FMCSA cross-state',
        detail:
          'Delaware does not issue a special statewide household-goods certificate for pure intrastate movers. For in-state Kent jobs, insist on insurance and a written estimate before deposits. Any leg into Maryland, Pennsylvania, or New Jersey needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. This is explicitly not Maryland HHG registration product, not Pennsylvania PUC household-goods authority language, and not New Jersey public-mover licensing framing. Kent County DE (Dover) is also not Kent County RI.',
      },
    ],
  },
  zonesHeading: 'Kent County access zones',
  zonesIntro:
    'Plan by Dover capital–downtown multi-unit, established Dover residential grids, DE-1 / US-13 north–south corridor towns, and southern Kent growth belts — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'dover-capital-downtown',
      name: 'Dover capital core, downtown & government campus edges',
      shortName: 'Dover capital',
      neighborhoods: [
        'Downtown Dover',
        'Legislative Hall / capital campus edges',
        'Loockerman Street corridor',
        'Capitol complex approaches',
        'Central multi-unit product',
      ],
      housingTypes: 'Walk-ups, mid-rises, renovated multi-unit, denser capital stock',
      challenges: [
        'Elevators, COI, and timed building windows',
        'Scarce curb near government campuses and events',
        'Session-day and parade/event congestion',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week morning windows away from capital events. Photo curb options and elevator size before final pricing.',
      cityKeywords: [
        'dover',
        'downtown dover',
        'legislative hall',
        'loockerman',
        'capital',
      ],
    },
    {
      id: 'dover-established-residential',
      name: 'Established Dover residential grids & base-adjacent belts',
      shortName: 'Dover residential',
      neighborhoods: [
        'North Dover residential grids',
        'South Dover residential grids',
        'Dover Air Force Base approaches',
        'Established subdivision stock',
        'Mixed multi-family edges',
      ],
      housingTypes: 'Established SFH, some multi-family and base-adjacent stock',
      challenges: [
        'Tight residential curb and limited truck turnaround',
        'Basement stairs, long carries, and tree canopy',
        'PCS and lease-turn pileups near base windows',
      ],
      moverTips:
        'Survey stair width and staging length. Align base-related moves with installation access rules. Confirm basement access on older stock.',
      cityKeywords: [
        'dover residential',
        'dover air force base',
        'north dover',
        'south dover',
        'pcs dover',
      ],
    },
    {
      id: 'smyrna-clayton-us13-north',
      name: 'Smyrna, Clayton & US-13 / DE-1 north corridor',
      shortName: 'Smyrna / north corridor',
      neighborhoods: [
        'Smyrna',
        'Clayton',
        'US-13 corridor approaches',
        'DE-1 north approaches',
        'Corridor multi-family edges',
      ],
      housingTypes: 'Mixed SFH, newer growth product, corridor apartments',
      challenges: [
        'US-13 / DE-1 peak freeflow and beach-season through-traffic',
        'Longer portal time into Dover core',
        'Mix of HOA rules and older stair product',
      ],
      moverTips:
        'Price corridor–Dover pairs portal-to-portal. Avoid peak DE-1 beach-season weekends when flexible. Collect HOA packets on newer tracts.',
      cityKeywords: [
        'smyrna',
        'clayton',
        'us-13',
        'de-1',
        'smyrna de',
      ],
    },
    {
      id: 'magnolia-camden-southern-kent',
      name: 'Camden, Magnolia, Felton & southern Kent growth belts',
      shortName: 'Southern Kent',
      neighborhoods: [
        'Camden',
        'Wyoming edges',
        'Magnolia',
        'Felton edges',
        'Southern Kent cul-de-sac product',
      ],
      housingTypes: 'Newer SFH, HOA tracts, some townhome product',
      challenges: [
        'HOA gate lists and truck-length limits',
        'DE-1 / DE-8 congestion toward Dover',
        'Cross-county empty miles toward Sussex or New Castle',
      ],
      moverTips:
        'Collect HOA packets early. Price southern–core pairs portal-to-portal. Clarify whether the second address stays in Kent or becomes multi-county Delaware.',
      cityKeywords: [
        'camden',
        'magnolia',
        'felton',
        'wyoming',
        'camden wyoming',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Kent County moving costs',
    intro:
      'Capital multi-unit friction, established-grid carries, base and agency timing, and DE-1 / US-13 portal time drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Dover capital elevator & curb friction',
        detail: 'Building packets and scarce staging dominate core jobs.',
      },
      {
        title: 'Established Dover long carries & stairs',
        detail: 'Basements, tight curb, and carry distance spike labor hours.',
      },
      {
        title: 'DE-1 / US-13 / DE-8 congestion',
        detail: 'Portal-to-portal spikes at peak and beach-season through-traffic.',
      },
      {
        title: 'Base PCS windows & MD interstate empty miles',
        detail: 'Timing constraints and map-short cross-state pairs bill regional time.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,750+',
        note: 'Higher with elevators or capital-event windows',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,350–$4,100+',
        note: 'Core and established-grid friction trends up',
      },
      {
        label: '3–4+ BR / HOA / base or interstate',
        value: '$2,400–$8,200+',
        note: 'Long carries and DE-1 / MD pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$185+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Kent County',
    intro:
      'Summer family peaks, multi-family lease turns, base PCS waves, capital-session congestion, and DE-1 beach-season through-traffic reshape central Delaware windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear curb and reduce DE-1 / US-13 pain before peak.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book Dover residential and southern HOA Saturdays early.',
      },
      {
        title: 'Month-end multi-family & PCS turns',
        detail: 'Capital multi-unit and base-adjacent product fill first.',
      },
      {
        title: 'Beach-season DE-1 through-traffic & winter ice',
        detail: 'Plan freeflow buffers summer weekends; outdoor staging contingency December–March.',
      },
    ],
  },
  specialized: [
    {
      id: 'dover-kent-capital-base-corridor-grid',
      title: 'Dover capital, base & central DE corridor module',
      intro:
        'Kent DE estimates fail when capital building packets, established Dover stairs, base access windows, or DE-1 / US-13 empty miles are ignored — and when crews treat this as Kent County RI, Wilmington New Castle product, Sussex beach season, or Maryland HHG framing.',
      bullets: [
        'Request Dover capital multi-unit building packets early.',
        'Photo stair access, basement entries, and curb staging on established Dover jobs.',
        'Price DE-1 / US-13 / DE-8 pairs portal-to-portal.',
        'Align base-related moves with installation access and PCS timing.',
        'For pure in-state jobs: written estimates + insurance — Delaware has no special statewide HHG certificate; FMCSA for any MD/PA/NJ leg.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Kent County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit. This is Kent County Delaware (Dover), not Kent County Rhode Island.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Capital School District, Caesar Rodney, Smyrna, Lake Forest, and other systems serve different addresses. Confirm zoning carefully — district lines shift across Dover and corridor towns.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools and Delaware Department of Education data beat ranking screenshots. Do not confuse with Rhode Island district maps for Kent County RI.',
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
              'Bayhealth (Kent Campus and related facilities) and other central Delaware providers anchor capital-region care. Confirm networks and specialist access; some households still travel north to ChristianaCare for tertiary care.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Smyrna, southern Kent, and Dover residential grids into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Capital multi-unit vs established Dover SFH vs corridor growth stock',
            detail:
              'Downtown Dover product, older residential grids, Smyrna corridor stock, and Camden/Magnolia growth tracts price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Southern and corridor new-build stock often prices differently from capital multi-family or older Dover product — and far differently from Kent County RI coastal-metro pricing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Dover capital / downtown lifestyle',
            detail: 'Government proximity with multi-unit curb and density tradeoffs.',
          },
          {
            title: 'Established Dover residential pattern',
            detail: 'SFH and neighborhood logistics near base and capital corridors.',
          },
          {
            title: 'Smyrna corridor and southern growth pattern',
            detail: 'More space, HOA rules, and DE-1 commute math into Dover jobs.',
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
              'State government, Dover Air Force Base and related logistics, healthcare, education, and regional retail shape employment — plus some northbound commutes toward New Castle County.',
          },
          {
            title: 'Commute realism',
            detail:
              'DE-1, US-13, and DE-8 peaks are real, especially summer beach through-traffic. Test drive peak routes between your zone and work anchors.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Central Delaware capital identity',
            detail:
              'Kent is Delaware’s capital county — Dover government and central DE corridors — not Kent County RI, not Wilmington I-95 density, and not Sussex beach-season product.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, strong thunderstorms, and cold winters with ice. Plan outdoor staging contingency year-round; summer DE-1 freeflow is its own risk category.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Kent County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Delaware does not issue a special statewide household-goods certificate — insist on written estimates and insurance for in-state moves, and FMCSA for any MD/PA/NJ leg before deposits. This is Kent County DE (Dover), not Kent County RI.',
    items: [
      {
        label: 'Kent County, Delaware — official site',
        href: 'https://www.co.kent.de.us/',
        external: true,
      },
      {
        label: 'City of Dover — official site',
        href: 'https://www.cityofdover.com/',
        external: true,
      },
      {
        label: 'DelDOT — traffic & travel',
        href: 'https://deldot.gov/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Prefer Dover capital and base-adjacent access experience with honest DE-1 / US-13 pricing. Written estimates + insurance in-state; FMCSA for interstate. This is Kent County DE (Dover capital) — not Kent County RI, not New Castle Wilmington, not Sussex beaches, not MD HHG or PA PUC product.',
  lastReviewed: '2026-07-24',
});
