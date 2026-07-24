import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWiPack,
  WI_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/wisconsin/wi-shared';

/**
 * Outagamie County, WI — Appleton / Fox Cities manufacturing + suburban growth (not Oshkosh/Winnebago, not Green Bay/Brown).
 */
export const outagamieCountyWiIntelligence: CountyIntelligencePack = finalizeWiPack({
  countySlug: 'outagamie',
  hubTitle: 'Outagamie County Moving Intelligence Hub',
  eyebrow: 'Outagamie · Appleton Fox Cities multi-unit, manufacturing relo & I-41 logistics',
  h1: 'Moving in Outagamie County: Appleton Access, Fox Cities Growth & I-41 Corridors',
  heroOpener:
    'Outagamie County is not an Oshkosh clone and not a Green Bay event-weekend template — it is Appleton and Fox Cities multi-unit and suburban growth with manufacturing workforce housing, Grand Chute multi-family, Kaukauna and Little Chute river-town stock, and I-41 / WI-441 freeflow that rewrites “local” estimates. A downtown Appleton walk-up, a College Avenue multi-unit, a Grand Chute townhome, and a Freedom rural-edge driveway do not share truck access or empty-mile cost. Winter ice and plant shift calendars are real inputs. This hub is for people moving in Outagamie County — not a renamed Winnebago or Brown page.',
  heroCredibility:
    'Wisconsin in-state written estimate & insurance diligence · FMCSA for interstate · Fox Cities logistics awareness · Curated listings',
  majorCorridors: 'I-41 · US-10 · WI-441 · WI-47 · local Fox Cities grid',
  whatMakesDifferent: {
    title: 'What makes moving in Outagamie County different',
    intro:
      'These are Fox Cities realities — Appleton multi-unit, manufacturing relo, and I-41 freeflow — not Oshkosh airshow calendars or Green Bay Lambeau freeflow alone.',
    bullets: [
      {
        title: 'Fox Cities multi-unit and townhome product dominate many jobs',
        detail:
          'Appleton and Grand Chute multi-family often need elevator/COI or HOA packets that rural-edge SFH does not.',
      },
      {
        title: 'I-41, US-10, WI-441, and WI-47 burn portal time',
        detail:
          'Appleton ↔ Kaukauna looks local; Appleton ↔ Green Bay or Oshkosh is a real regional hop. Price portal-to-portal honestly.',
      },
      {
        title: 'Manufacturing workforce calendars cluster demand',
        detail:
          'Shift-change windows reshape crew timing near industrial corridors.',
      },
      {
        title: 'River-town Kaukauna stock is not Grand Chute multi-family',
        detail:
          'Older multi-unit stairs and tight curb differ from suburban HOA driveways.',
      },
      {
        title: 'Winter ice reshapes outdoor carries',
        detail:
          'December–March adds cancellation risk — flexible dates reduce soft costs.',
      },
      {
        title: 'Multi-county Fox Valley pairs are routine',
        detail:
          'Households regularly move Outagamie ↔ Winnebago, Brown, or Calumet. Clarify destinations so Wisconsin consumer controls vs FMCSA assumptions stay accurate when any leg leaves Wisconsin.',
      },
      WI_REG_BULLET,
    ],
  },
  zonesHeading: 'Outagamie County access zones',
  zonesIntro:
    'Plan by downtown Appleton multi-unit, College Avenue multi-family, Grand Chute growth, Kaukauna–Little Chute river towns, and northern/western rural edges.',
  zones: [
    {
      id: 'downtown-appleton',
      name: 'Downtown Appleton multi-unit & near-core stock',
      shortName: 'Downtown Appleton',
      neighborhoods: [
        'Downtown Appleton',
        'College Avenue corridors',
        'Historic districts',
        'Lawrence University edges',
        'City Park edges',
        'Old Third Ward edges',
      ],
      housingTypes: 'Multi-unit, older SFH, limited elevators',
      challenges: [
        'Stairs and tight curb',
        'College Avenue freeflow',
        'Lease-end volume spikes',
      ],
      moverTips:
        'Survey stairs carefully. Prefer mid-week starts. Photo curb options downtown.',
      cityKeywords: [
        'appleton',
      ],
    },
    {
      id: 'grand-chute',
      name: 'Grand Chute multi-family & commercial growth',
      shortName: 'Grand Chute',
      neighborhoods: [
        'Grand Chute',
        'Northland corridors',
        'Casaloma edges',
        'West College edges',
        'Spencer Street edges',
        'Fox River Mall edges',
      ],
      housingTypes: 'Townhomes, multi-family, growth SFH',
      challenges: [
        'HOA timed windows',
        'I-41 / WI-15 freeflow',
        'Commercial traffic spikes',
      ],
      moverTips:
        'Collect HOA packets early. Price I-41 honestly. Do not price Grand Chute like downtown walk-ups.',
      cityKeywords: [
        'grand chute',
        'appleton',
      ],
    },
    {
      id: 'kaukauna-little-chute',
      name: 'Kaukauna, Little Chute & eastern river towns',
      shortName: 'Kaukauna / Little Chute',
      neighborhoods: [
        'Kaukauna',
        'Little Chute',
        'Combined Locks edges',
        'Kimberly edges',
        'Vandenbroek edges',
        'Buchanan edges',
      ],
      housingTypes: 'Older multi-unit, SFH, river-town stock',
      challenges: [
        'WI-441 / US-10 freeflow',
        'Stairs and tight streets',
        'Mixed product',
      ],
      moverTips:
        'Survey river-town stairs carefully. Price WI-441 honestly. Clarify village boundaries.',
      cityKeywords: [
        'kaukauna',
        'little chute',
        'kimberly',
        'combined locks',
      ],
    },
    {
      id: 'north-west-edges',
      name: 'Hortonville, Greenville & northwestern edges',
      shortName: 'NW edges',
      neighborhoods: [
        'Hortonville',
        'Greenville',
        'Dale edges',
        'Ellington edges',
        'Bovina edges',
        'Shiocton edges',
      ],
      housingTypes: 'Growth SFH, multi-family pockets, rural-edge lots',
      challenges: [
        'Longer empty miles',
        'Cul-de-sac truck access',
        'Winter driveway ice',
      ],
      moverTips:
        'Price empty miles honestly. Survey rural driveways. Book peak school windows early.',
      cityKeywords: [
        'hortonville',
        'greenville',
        'shiocton',
      ],
    },
    {
      id: 'seymour-north',
      name: 'Seymour & northern approaches',
      shortName: 'Seymour / north',
      neighborhoods: [
        'Seymour',
        'Black Creek edges',
        'Oneida edges',
        'Osborn edges',
        'Cicero edges',
        'Maine edges',
      ],
      housingTypes: 'Small-city multi-unit, SFH, rural-edge lots',
      challenges: [
        'WI-47 / WI-54 empty miles',
        'Mixed product',
        'Winter weather buffers',
      ],
      moverTips:
        'Price empty miles honestly. Survey small-city stairs. Confirm crew travel day costs in writing.',
      cityKeywords: [
        'seymour',
        'black creek',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Outagamie County moving costs',
    intro:
      'Multi-unit access, I-41 freeflow, manufacturing calendars, and winter ice move the number more than packing skill alone.',
    drivers: [
      {
        title: 'Appleton multi-unit stairs & Grand Chute HOA admin',
        detail:
          'Fox Cities product adds access soft costs before packing skill matters.',
      },
      {
        title: 'I-41 · WI-441 · US-10 congestion',
        detail:
          'Cross-zone Fox Cities pairs burn portal-to-portal hours.',
      },
      {
        title: 'Manufacturing shift windows',
        detail:
          'Industrial corridors reshape crew timing near plant-adjacent housing.',
      },
      {
        title: 'Rural-edge empty miles',
        detail:
          'Hortonville and Seymour pairs raise staging distance.',
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
        note: 'Higher with stairs or peak I-41 pairs',
      },
      {
        label: '2–3BR multi-unit or townhome',
        value: '$1,300–$4,000+',
        note: 'HOA and stair soft costs trend up',
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
    title: 'When to schedule an Outagamie County move',
    intro:
      'Manufacturing calendars, school peaks, winter ice, and I-41 freeflow reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear multi-unit curb and ease I-41 pain.',
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
        title: 'Workforce mid-month spikes',
        detail:
          'Manufacturing and professional relocations often land mid-month rather than only on Saturday peaks.',
      },
    ],
  },
  specialized: [
    {
      id: 'fox-cities-appleton',
      title: 'Appleton Fox Cities multi-unit & manufacturing logistics module',
      intro:
        'Outagamie estimates fail more often on multi-unit surveys, I-41 freeflow, and HOA packets than on packing skill alone.',
      bullets: [
        'Survey downtown Appleton stairs separately from Grand Chute HOA multi-family.',
        'Price portal-to-portal time for I-41, US-10, WI-441, and WI-47 pairs at peak.',
        'Plan around manufacturing shift windows near industrial corridors.',
        'Plan winter ice contingency on outdoor carries.',
        'Clarify Appleton vs Grand Chute vs Kaukauna vs Little Chute addresses on every estimate.',
        'For in-state jobs insist on written estimates and insurance; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-oshkosh-not-green-bay',
      title: 'Fox Cities vs Oshkosh / Green Bay module',
      intro:
        'A single “northeast rate” collapses when Appleton Fox Cities product and Oshkosh or Green Bay products diverge.',
      bullets: [
        'Do not price Appleton multi-family like Oshkosh airshow-weekend freeflow or Green Bay event freeflow as interchangeable.',
        'Ask which I-41 approaches the crew will actually use northbound vs southbound.',
        'Keep Outagamie vs Winnebago / Brown county lines clear on multi-address estimates.',
        'Match manufacturing calendars separately from Green Bay event calendars.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Outagamie County?',
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
              'Appleton Area School District and neighboring districts (including Kimberly, Kaukauna, Little Chute, Hortonville, and others) serve the county. Assignment is address-based.',
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
              'ThedaCare, Ascension, and other Fox Cities campuses anchor care. Confirm insurance networks.',
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
              'Expect multi-unit and older SFH in Appleton; multi-family in Grand Chute; river-town stock in Kaukauna–Little Chute; growth SFH on northwestern edges.',
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
            title: 'Downtown Appleton multi-unit',
            detail:
              'Suits people prioritizing amenities and shorter in-city hops — with stairs and curb tradeoffs.',
          },
          {
            title: 'Grand Chute multi-family growth',
            detail:
              'Often appeals for newer multi-unit and retail access — with HOA logistics and I-41 freeflow.',
          },
          {
            title: 'Kaukauna / Little Chute river-town character',
            detail:
              'Attracts households seeking smaller-city feel — with older stock and WI-441 freeflow.',
          },
          {
            title: 'Northwestern growth edges',
            detail:
              'Fits families seeking newer SFH — with empty-mile tradeoffs into Appleton.',
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
              'Manufacturing, paper, logistics, healthcare, education, and retail along Fox Cities corridors concentrate demand.',
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
              'Outagamie is a Fox Cities manufacturing and growth market — different from Oshkosh/Winnebago, Green Bay/Brown, and Milwaukee multi-county logistics.',
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
    title: 'Useful Outagamie County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. For in-state Wisconsin moves insist on written estimates and insurance proof; verify FMCSA for any interstate leg before deposits.',
    items: [
      {
        label: 'City of Appleton — official site',
        href: 'https://www.appleton.org/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'Outagamie County',
        href: 'https://www.outagamie.org/',
        external: true,
        note: 'County services & info',
      },
      {
        label: '511wi — traffic conditions',
        href: 'https://511wi.gov/',
        external: true,
        note: 'I-41 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with Fox Cities multi-unit experience for Appleton product; HOA readiness for Grand Chute; honest I-41 · US-10 · WI-441 · WI-47 timing. For in-state jobs insist on written estimates and insurance; verify FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
