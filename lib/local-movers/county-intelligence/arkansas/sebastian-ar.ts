import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeArPack } from '@/lib/local-movers/county-intelligence/arkansas/ar-shared';

/**
 * Sebastian County, AR — Fort Smith regional / Arkansas River / OK adjacency (not Little Rock west).
 */
export const sebastianCountyArIntelligence: CountyIntelligencePack = finalizeArPack({
  countySlug: 'sebastian',
  hubTitle: 'Sebastian County Moving Intelligence Hub',
  eyebrow:
    'Sebastian · Fort Smith AR regional · Arkansas River · I-40 · I-49 · US-71',
  h1: 'Moving in Sebastian County: Fort Smith Regional Access, Arkansas River Logistics & OK-Border Corridors',
  heroOpener:
    'Sebastian County, Arkansas is Fort Smith regional metro — Arkansas River city, Greenwood and Barling belts, and Oklahoma-border freeflow — not Little Rock west-suburb product, not NWA Bentonville growth, and not a pure Oklahoma Fort Smith rename without Arkansas authority rules. Downtown and midtown multi-unit, river-adjacent older stock, south and east growth tracts, and I-40 / I-49 / US-71 timing rewrite “local” estimates. A Garrison Avenue elevator job, a Fort Smith hillside ranch, a Greenwood HOA two-story, and an interstate-adjacent multi-family turn do not share truck access or empty-mile risk. This hub is for people moving in Sebastian County, Arkansas — Fort Smith market realities with real OK adjacency, not a Little Rock west clone.',
  heroCredibility:
    'ArDOT Intrastate Authority for intrastate AR moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-40 · I-49 · US-71 · local Fort Smith grid',
  whatMakesDifferent: {
    title: 'What makes moving in Sebastian County different',
    intro:
      'These are Fort Smith regional realities — river bridges, Oklahoma adjacency, and I-40/I-49 freeflow — not Little Rock capital-metro defaults or a generic Arkansas template.',
    bullets: [
      {
        title: 'Fort Smith is a river regional hub — not Little Rock west',
        detail:
          'Ignore Chenal HOA templates and I-630-only freeflow assumptions. Sebastian stacks Arkansas River approaches, older midtown grids, and border-metro traffic with different empty-mile patterns than Pulaski County.',
      },
      {
        title: 'Downtown, midtown, and multi-unit stock rewrite labor hours',
        detail:
          'Elevators, COI packets, scarce curb staging, and stair-heavy older product dominate core jobs. A Garrison corridor walk-up is not a Greenwood garage-friendly two-story.',
      },
      {
        title: 'I-40, I-49, and US-71 define portal-to-portal time',
        detail:
          'Fort Smith ↔ Greenwood, river core ↔ Barling, or east Sebastian ↔ I-40 pairs look local on maps and regional at peak. Price honestly — logistics traffic and construction windows stack fast.',
      },
      {
        title: 'Oklahoma adjacency makes interstate authority routine',
        detail:
          'Households regularly cross into Oklahoma on short map distances. ArDOT Intrastate Authority alone does not authorize out-of-state delivery — verify FMCSA when any leg leaves Arkansas.',
      },
      {
        title: 'Not Little Rock west and not NWA corporate-growth defaults',
        detail:
          'This is Sebastian County, Arkansas — Fort Smith regional. Pulaski west-suburb product and Bentonville HOA growth use different access rules and corridors — survey each Sebastian address on its own terms.',
      },
      {
        title: 'Intrastate ArDOT household goods authority vs interstate FMCSA',
        detail:
          'Moves entirely within Arkansas by for-hire household goods carriers generally require ArDOT Arkansas Intrastate Operating Authority. Match the legal name on the estimate to ArDOT authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
    ],
  },
  zonesHeading: 'Sebastian County access zones',
  zonesIntro:
    'Plan by Fort Smith core / midtown, south and east growth, Greenwood / outer belts, and river / industrial-adjacent corridors — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'fort-smith-core-midtown',
      name: 'Fort Smith core, downtown & midtown grids',
      shortName: 'Core / midtown',
      neighborhoods: [
        'Downtown Fort Smith',
        'Garrison Avenue edges',
        'Midtown character grids',
        'Rogers Avenue corridor edges',
        'Arkansas River bridge approaches',
      ],
      housingTypes: 'Older SFH, multi-unit, renovated walk-ups, some loft product',
      challenges: [
        'Elevators, COI, and timed building windows',
        'Scarce curb staging and event-day congestion',
        'Stairs, long carries, and tight alley approaches',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week morning freight windows. Photo curb options and stair counts before final pricing.',
      cityKeywords: [
        'fort smith',
        'downtown fort smith',
        'garrison avenue',
        'midtown fort smith',
        'rogers avenue',
      ],
    },
    {
      id: 'fort-smith-south-east',
      name: 'South & east Fort Smith growth and multi-family belts',
      shortName: 'South / east FS',
      neighborhoods: [
        'South Fort Smith',
        'East Fort Smith multi-family',
        'Zero Street / Phoenix corridor edges',
        'I-540 / US-71 approaches',
        'Newer tract pockets',
      ],
      housingTypes: 'Mixed SFH, multi-family, and growth-corridor stock',
      challenges: [
        'Lease-turn multi-family waves',
        'US-71 peak congestion',
        'Mix of older driveway access and newer HOA rules',
      ],
      moverTips:
        'Clarify multi-family lease-turn timing. Price south–core pairs portal-to-portal. Survey driveway width on mixed stock.',
      cityKeywords: [
        'south fort smith',
        'east fort smith',
        'zero street',
        'phoenix avenue',
      ],
    },
    {
      id: 'greenwood-barling-outer',
      name: 'Greenwood, Barling & outer Sebastian growth',
      shortName: 'Greenwood / outer',
      neighborhoods: [
        'Greenwood',
        'Barling',
        'Lavaca edges',
        'School-calendar family stock',
        'Outer county HOA and ranch product',
      ],
      housingTypes: 'Newer SFH, HOA tracts, ranch and acreage-edge stock',
      challenges: [
        'Longer empty miles into Fort Smith core',
        'HOA packets on newer tracts',
        'Soft shoulders and longer driveway carries on rural edges',
      ],
      moverTips:
        'Collect HOA packets early. Price outer–core pairs honestly. Confirm driveway condition on acreage-edge jobs.',
      cityKeywords: [
        'greenwood',
        'greenwood ar',
        'barling',
        'lavaca',
      ],
    },
    {
      id: 'river-industrial-ok-edge',
      name: 'River, industrial-adjacent & Oklahoma-edge corridors',
      shortName: 'River / OK edge',
      neighborhoods: [
        'Arkansas River industrial edges',
        'Port and logistics-adjacent stock',
        'West and border approaches',
        'Older worker-housing multi-family',
        'I-40 / I-49 portal belts',
      ],
      housingTypes: 'Older SFH, multi-family, industrial-adjacent stock',
      challenges: [
        'Mixed curb rules and older stair/basement product',
        'I-40 / logistics traffic freeflow',
        'Short-map OK pairs that are still interstate legally',
      ],
      moverTips:
        'Survey stair width and driveway condition carefully. Flag any Oklahoma destination for FMCSA authority. Price logistics-corridor pairs at peak honestly.',
      cityKeywords: [
        'arkansas river fort smith',
        'industrial fort smith',
        'i-40 fort smith',
        'oklahoma border',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Sebastian County moving costs',
    intro:
      'Core multi-unit friction, outer empty miles, river/logistics freeflow, and interstate OK adjacency drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Downtown / midtown stair & curb friction',
        detail: 'Building packets and scarce staging dominate core jobs.',
      },
      {
        title: 'I-40 / I-49 / US-71 congestion',
        detail: 'Portal-to-portal spikes at peak and construction windows.',
      },
      {
        title: 'Outer Greenwood / Barling empty miles',
        detail: 'Map-short pairs still bill regional time into core.',
      },
      {
        title: 'OK-border interstate authority risk',
        detail: 'Short Oklahoma legs still require FMCSA — not ArDOT-only.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$425–$1,550+',
        note: 'Higher with elevators or older stairs',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,250–$3,900+',
        note: 'Core and outer-corridor friction trends up',
      },
      {
        label: '3–4+ BR / cross-metro / OK-adjacent',
        value: '$2,300–$7,800+',
        note: 'Empty miles and interstate pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$100–$175+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Sebastian County',
    intro:
      'Summer family peaks, multi-family lease turns, river-corridor heat, and humid storm afternoons reshape Fort Smith windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear curb and reduce US-71 / I-40 pain before peak.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book Greenwood and south Fort Smith Saturdays early.',
      },
      {
        title: 'Month-end multi-family turns',
        detail: 'Core and east multi-unit elevators fill first.',
      },
      {
        title: 'Summer heat, humidity & afternoon storms',
        detail: 'Plan outdoor staging shade and weather contingency.',
      },
    ],
  },
  specialized: [
    {
      id: 'fort-smith-sebastian-river-ok-border',
      title: 'Fort Smith river regional & OK-border module',
      intro:
        'Sebastian AR estimates fail when core building access, I-40/I-49 empty miles, or Oklahoma-border interstate rules are ignored — and when crews treat this as Little Rock west.',
      bullets: [
        'Request downtown/midtown building packets early.',
        'Price I-40 / I-49 / US-71 pairs portal-to-portal.',
        'Flag any Oklahoma destination for FMCSA authority before deposit.',
        'Clarify Sebastian vs Crawford or Pulaski destinations on multi-county estimates.',
        'Verify ArDOT Intrastate Authority for pure in-state jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Sebastian County?',
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
              'Fort Smith, Greenwood, Lavaca, Hackett, and other systems serve different addresses. Confirm zoning carefully — municipal and county lines shift block by block.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools and Arkansas Department of Education data beat ranking screenshots.',
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
              'Baptist Health Fort Smith, Mercy Fort Smith, and other regional campuses anchor river-metro care. Confirm networks and specialist access.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Greenwood, Barling, and south Fort Smith into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core multi-unit vs south growth vs outer ranch stock',
            detail:
              'Downtown walk-ups, south multi-family, and Greenwood two-stories price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Outer growth and established midtown product often price differently from industrial-adjacent multi-family.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Core / midtown lifestyle',
            detail: 'River-city amenities with density, stairs, and curb tradeoffs.',
          },
          {
            title: 'South / east Fort Smith pattern',
            detail: 'Mixed multi-family and SFH near US-71 freeflow.',
          },
          {
            title: 'Greenwood / outer pattern',
            detail: 'More space, school-calendar peaks, and longer core commutes.',
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
              'Manufacturing, logistics, healthcare, regional retail, and professional services shape employment — with Oklahoma adjacency as a real commute input.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-40, I-49, and US-71 peaks are real. Test drive peak routes between your zone and work anchors on both sides of the river corridor.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Fort Smith regional identity',
            detail:
              'Sebastian is Arkansas River regional metro — not Little Rock west product, and not NWA corporate-growth alone.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, frequent afternoon storms, mild winters with occasional ice. Plan outdoor staging contingency.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Sebastian County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify ArDOT Intrastate Authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Sebastian County, Arkansas — official site',
        href: 'https://www.sebastiancountyar.gov/',
        external: true,
      },
      {
        label: 'City of Fort Smith — official site',
        href: 'https://www.fortsmithar.gov/',
        external: true,
      },
      {
        label: 'ArDOT traffic & road conditions',
        href: 'https://www.ardot.gov/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Prefer Fort Smith core multi-unit and OK-border experience with honest I-40 / I-49 / US-71 pricing. Verify ArDOT Intrastate Authority in-state and FMCSA interstate. This is Sebastian County AR (Fort Smith) — not Little Rock west.',
  lastReviewed: '2026-07-24',
});
