import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWiPack,
  WI_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/wisconsin/wi-shared';

/**
 * Brown County, WI — Green Bay regional hub, paper/industrial + Packers seasonal pulses (not Fox Cities Outagamie, not Milwaukee).
 */
export const brownCountyWiIntelligence: CountyIntelligencePack = finalizeWiPack({
  countySlug: 'brown',
  hubTitle: 'Brown County Moving Intelligence Hub',
  eyebrow: 'Brown · Green Bay regional hub, Fox River access & I-41 / I-43 logistics',
  h1: 'Moving in Brown County: Green Bay Access, Regional Industry & Northeast Corridors',
  heroOpener:
    'Brown County is not a Milwaukee south clone and not an Appleton Fox Cities template — it is Green Bay regional multi-unit and SFH stock along the Fox River, paper and manufacturing workforce housing, De Pere and Ashwaubenon multi-family, and I-41 / I-43 freeflow that rewrites “local” estimates. A downtown Green Bay walk-up, a Lambeau-adjacent multi-unit on event weekends, a De Pere townhome, and a Howard cul-de-sac do not share truck access or crew calendars. Winter ice and event-weekend freeflow are real inputs. This hub is for people moving in Brown County — not a renamed Outagamie or Milwaukee page.',
  heroCredibility:
    'Wisconsin in-state written estimate & insurance diligence · FMCSA for interstate · Green Bay regional logistics awareness · Curated listings',
  majorCorridors: 'I-41 · I-43 · US-41 · WI-29 · local Green Bay grid',
  whatMakesDifferent: {
    title: 'What makes moving in Brown County different',
    intro:
      'These are Green Bay regional realities — Fox River access, industrial workforce housing, and I-41 freeflow — not Milwaukee elevators or Appleton Fox Cities product alone.',
    bullets: [
      {
        title: 'Regional hub multi-unit and older stock rewrite labor',
        detail:
          'Green Bay near-core walk-ups and multi-unit need stair surveys that suburban Howard driveways do not.',
      },
      {
        title: 'Event weekends and tourism freeflow reshape Lambeau-adjacent staging',
        detail:
          'Home schedules and major weekends can wipe curb and freeflow — prefer mid-week windows when flexible.',
      },
      {
        title: 'I-41, I-43, US-41, and WI-29 burn portal time',
        detail:
          'Green Bay ↔ De Pere looks local; Green Bay ↔ Fox Cities or Milwaukee is a true regional haul. Price portal-to-portal honestly.',
      },
      {
        title: 'Paper, manufacturing, and logistics workforce calendars cluster demand',
        detail:
          'Shift-change windows and plant-adjacent traffic reshape crew timing near industrial corridors.',
      },
      {
        title: 'Winter ice and lake-effect spillover reshape outdoor carries',
        detail:
          'December–March adds cancellation risk — flexible dates reduce soft costs.',
      },
      {
        title: 'Multi-county northeast Wisconsin pairs are routine',
        detail:
          'Households regularly move Brown ↔ Outagamie, Winnebago, or Door. Clarify destinations so Wisconsin consumer controls vs FMCSA assumptions stay accurate when any leg leaves Wisconsin.',
      },
      WI_REG_BULLET,
    ],
  },
  zonesHeading: 'Brown County access zones',
  zonesIntro:
    'Plan by downtown Green Bay multi-unit, near-east and near-west neighborhoods, Ashwaubenon–De Pere multi-family, Howard–Suamico growth, and eastern Bellevue–Ledgeview belts.',
  zones: [
    {
      id: 'downtown-green-bay',
      name: 'Downtown Green Bay multi-unit & riverfront stock',
      shortName: 'Downtown GB',
      neighborhoods: [
        'Downtown Green Bay',
        'Broadway edges',
        'Astor edges',
        'Joannes edges',
        'Fox River corridors',
        'CityDeck edges',
      ],
      housingTypes: 'Multi-unit, older SFH, limited elevators',
      challenges: [
        'Tight curb and stair carries',
        'Event freeflow',
        'I-43 approach congestion',
      ],
      moverTips:
        'Prefer mid-week starts especially near event weekends. Survey stairs carefully. Photo curb options.',
      cityKeywords: [
        'green bay',
      ],
    },
    {
      id: 'near-east-west',
      name: 'Near-east & near-west Green Bay neighborhoods',
      shortName: 'Near-east / west',
      neighborhoods: [
        'Near East Side',
        'Near West Side',
        'Olde North edges',
        'Tank edges',
        'Marquette Park edges',
        'Baird Creek edges',
      ],
      housingTypes: 'Older SFH, duplexes, multi-unit',
      challenges: [
        'Multi-flight stairs',
        'Winter ice',
        'Mixed product',
      ],
      moverTips:
        'Survey stair counts with photos. Plan winter ice contingency. Prefer mid-week starts.',
      cityKeywords: [
        'green bay',
      ],
    },
    {
      id: 'ashwaubenon-de-pere',
      name: 'Ashwaubenon, De Pere & mid-county multi-family',
      shortName: 'Ashwaubenon / De Pere',
      neighborhoods: [
        'Ashwaubenon',
        'De Pere',
        'Lombardi edges',
        'Packerland corridors',
        'Allouez edges',
        'Hobart edges',
      ],
      housingTypes: 'Multi-family, townhomes, SFH',
      challenges: [
        'HOA timed windows',
        'I-41 freeflow',
        'Event-adjacent traffic',
      ],
      moverTips:
        'Collect HOA packets early. Price I-41 honestly. Avoid home-event peaks when flexible.',
      cityKeywords: [
        'ashwaubenon',
        'de pere',
        'allouez',
        'hobart',
      ],
    },
    {
      id: 'howard-suamico',
      name: 'Howard, Suamico & northern growth',
      shortName: 'Howard / Suamico',
      neighborhoods: [
        'Howard',
        'Suamico',
        'Duck Creek edges',
        'Cardinal edges',
        'Lineville edges',
        'Pulaski edges',
      ],
      housingTypes: 'Growth SFH, townhomes, multi-family',
      challenges: [
        'Longer empty miles',
        'Cul-de-sac truck access',
        'Winter driveway ice',
      ],
      moverTips:
        'Price empty miles honestly. Survey cul-de-sacs. Confirm HOA on townhomes.',
      cityKeywords: [
        'howard',
        'suamico',
        'pulaski',
      ],
    },
    {
      id: 'bellevue-ledgeview',
      name: 'Bellevue, Ledgeview & eastern approaches',
      shortName: 'East belt',
      neighborhoods: [
        'Bellevue',
        'Ledgeview',
        'Eaton edges',
        'New Franken edges',
        'Denmark edges',
        'Scott edges',
      ],
      housingTypes: 'Growth SFH, multi-family, rural-edge lots',
      challenges: [
        'WI-29 / I-43 freeflow',
        'Mixed product',
        'School-calendar peaks',
      ],
      moverTips:
        'Price WI-29 / I-43 pairs honestly. Survey rural driveways. Book peak school windows early.',
      cityKeywords: [
        'bellevue',
        'ledgeview',
        'denmark',
        'new franken',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Brown County moving costs',
    intro:
      'Regional empty miles, event freeflow, multi-unit stairs, and winter ice move the number more than packing skill alone.',
    drivers: [
      {
        title: 'Near-core stairs & multi-unit access',
        detail:
          'Green Bay walk-ups add labor before packing skill matters.',
      },
      {
        title: 'Event-weekend freeflow collapse',
        detail:
          'Lambeau-adjacent weekends reshape curb and portal time.',
      },
      {
        title: 'I-41 · I-43 · WI-29 congestion & empty miles',
        detail:
          'Cross-zone and Fox Cities pairs burn portal-to-portal hours.',
      },
      {
        title: 'Suburban HOA admin',
        detail:
          'De Pere and Ashwaubenon multi-family add soft costs.',
      },
      {
        title: 'Winter ice & weather contingency',
        detail:
          'December–March reshapes outdoor labor and cancellation risk.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,700+',
        note: 'Higher with stairs or event-weekend freeflow',
      },
      {
        label: '2–3BR multi-unit or townhome',
        value: '$1,300–$4,000+',
        note: 'Stairs and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR / regional long pair',
        value: '$2,500–$7,500+',
        note: 'Empty miles and high-value stock price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$190+/hr',
        note: 'Portal-to-portal; packing and access scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Brown County move',
    intro:
      'Event weekends, school calendars, winter ice, and I-41 freeflow reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb and ease I-41 / I-43 pain — especially outside home-event weekends.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family and multi-unit turnover fills first. Book 2–4 weeks ahead for peak weekends.',
      },
      {
        title: 'Winter: ice and weather cancellations',
        detail:
          'December–March favors flexible dates and early starts.',
      },
      {
        title: 'Fall event-weekend spikes',
        detail:
          'Major weekends can erase freeflow near Lambeau corridors — prefer mid-week when flexible.',
      },
    ],
  },
  specialized: [
    {
      id: 'green-bay-regional',
      title: 'Green Bay regional hub & event freeflow logistics module',
      intro:
        'Brown estimates fail more often on stair surveys, event freeflow, and I-41 empty miles than on packing skill alone.',
      bullets: [
        'Avoid home-event peak windows for Lambeau-adjacent addresses when flexible.',
        'Survey near-core stairs separately from Howard cul-de-sac SFH.',
        'Price portal-to-portal time for I-41, I-43, US-41, and WI-29 pairs at peak.',
        'Plan winter ice contingency on outdoor carries.',
        'Clarify Green Bay vs De Pere vs Ashwaubenon vs Howard addresses on every estimate.',
        'For in-state jobs insist on written estimates and insurance; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-fox-cities-clone',
      title: 'Green Bay vs Fox Cities micro-market module',
      intro:
        'A single “northeast Wisconsin rate” collapses when Green Bay regional product and Appleton Fox Cities product diverge.',
      bullets: [
        'Do not price Green Bay event freeflow like Appleton manufacturing multi-family as interchangeable.',
        'Ask which I-41 approaches the crew will actually use for Fox Cities pairs.',
        'Match industrial shift calendars separately from Fox Cities suburban growth peaks.',
        'Keep Brown vs Outagamie / Winnebago county lines clear on multi-address estimates.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Brown County?',
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
              'Green Bay Area Public School District and neighboring districts (De Pere, Ashwaubenon, Howard-Suamico, Pulaski, and others) serve the county. Assignment is address-based.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Wisconsin DPI data, and campus visits beat ranking screenshots alone.',
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
              'Bellin Health, HSHS St. Vincent / St. Mary’s, and other campuses anchor care across Green Bay. Confirm insurance networks.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — freeway freeflow changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Housing mix',
            detail:
              'Expect near-core multi-unit and older SFH in Green Bay; multi-family in Ashwaubenon–De Pere; growth SFH in Howard–Suamico and Bellevue–Ledgeview.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by city and product. Budget for condo/HOA dues, older-building repair risk, and parking where relevant.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Associations and multi-unit management often control move hours, truck size, elevators, and deposits. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown / near-core multi-unit',
            detail:
              'Suits people prioritizing amenities and shorter in-city hops — with stairs and event freeflow tradeoffs.',
          },
          {
            title: 'Ashwaubenon / De Pere multi-family',
            detail:
              'Often appeals for newer multi-unit and schools — with HOA logistics and I-41 freeflow.',
          },
          {
            title: 'Howard / Suamico northern growth',
            detail:
              'Attracts households seeking newer SFH — with empty-mile tradeoffs into the core.',
          },
          {
            title: 'Eastern growth belts',
            detail:
              'Fits families seeking space — with WI-29 freeflow norms.',
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
              'Healthcare, paper and manufacturing, logistics, retail, education, and regional services concentrate demand. Tourism and event calendars reshape short-term housing demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak freeway freeflow is real. Test peak routes before choosing solely on rent or purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Local character',
            detail:
              'Brown is a northeast regional hub — different from Milwaukee multi-county logistics, Madison capital patterns, and Fox Cities Appleton product.',
          },
          {
            title: 'Climate',
            detail:
              'Continental four-season climate with cold winters, lake-effect snow near Lake Michigan, and rapid weather swings. Plan outdoor staging and ice contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — school calendars, winter weather, and local events reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Brown County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. For in-state Wisconsin moves insist on written estimates and insurance proof; verify FMCSA for any interstate leg before deposits.',
    items: [
      {
        label: 'City of Green Bay — official site',
        href: 'https://greenbaywi.gov/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'Brown County',
        href: 'https://www.browncountywi.gov/',
        external: true,
        note: 'County services & info',
      },
      {
        label: '511wi — traffic conditions',
        href: 'https://511wi.gov/',
        external: true,
        note: 'I-41 / I-43 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with regional multi-unit experience for Green Bay near-core product; HOA readiness for De Pere–Ashwaubenon; honest I-41 · I-43 · WI-29 timing. For in-state jobs insist on written estimates and insurance; verify FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
