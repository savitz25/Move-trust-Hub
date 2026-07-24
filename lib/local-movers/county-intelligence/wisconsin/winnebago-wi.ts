import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWiPack,
  WI_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/wisconsin/wi-shared';

/**
 * Winnebago County, WI — Oshkosh regional mix, university/airshow calendars (not Appleton/Outagamie clone; not Winnebago IL/IA).
 */
export const winnebagoCountyWiIntelligence: CountyIntelligencePack = finalizeWiPack({
  countySlug: 'winnebago',
  hubTitle: 'Winnebago County (Wisconsin) Moving Intelligence Hub',
  eyebrow: 'Winnebago County, WI · Oshkosh multi-unit, UW Oshkosh cycles & I-41 logistics',
  h1: 'Moving in Winnebago County, WI: Oshkosh Access, Regional Mix & Lake Winnebago Corridors',
  heroOpener:
    'Winnebago County, Wisconsin is not an Appleton Fox Cities clone and not Winnebago County in Illinois or Iowa — it is Oshkosh multi-unit and SFH stock with UW Oshkosh lease waves, EAA AirVenture seasonal freeflow, Neenah–Menasha northern edges, and I-41 / US-45 logistics that rewrite “local” estimates. A downtown Oshkosh walk-up, a campus multi-unit elevator week, a Neenah multi-family, and a western rural-edge driveway do not share truck access or crew calendars. Winter ice and airshow week congestion are real inputs. This hub is for people moving in Winnebago County, WI — not a renamed Outagamie page.',
  heroCredibility:
    'Wisconsin in-state written estimate & insurance diligence · FMCSA for interstate · Oshkosh regional logistics awareness · Curated listings',
  majorCorridors: 'I-41 · US-45 · WI-21 · WI-44 · local Oshkosh grid',
  whatMakesDifferent: {
    title: 'What makes moving in Winnebago County, WI different',
    intro:
      'These are Oshkosh regional realities — campus multi-unit, airshow freeflow, and Lake Winnebago approaches — not Appleton manufacturing multi-family alone, and not Winnebago County in other states.',
    bullets: [
      {
        title: 'This is Wisconsin’s Winnebago County — not Illinois or Iowa',
        detail:
          'Ignore other-state assumptions. Corridors, climate, and consumer controls are Wisconsin-specific.',
      },
      {
        title: 'UW Oshkosh lease waves compress multi-unit demand',
        detail:
          'Semester peaks fill elevators and curb first. Book early for August and January windows.',
      },
      {
        title: 'EAA AirVenture week rewrites freeflow and lodging-adjacent staging',
        detail:
          'Late July congestion can erase “local” portal times — prefer other weeks when flexible.',
      },
      {
        title: 'I-41, US-45, WI-21, and WI-44 burn portal time',
        detail:
          'Oshkosh ↔ Neenah looks local; Oshkosh ↔ Appleton or Fond du Lac is a real regional hop. Price portal-to-portal honestly.',
      },
      {
        title: 'Neenah–Menasha product is not downtown Oshkosh product',
        detail:
          'Northern multi-family and river-town stock differ from campus walk-ups.',
      },
      {
        title: 'Winter ice reshapes outdoor carries',
        detail:
          'December–March adds cancellation risk — flexible dates reduce soft costs.',
      },
      {
        title: 'Multi-county Fox Valley pairs are routine',
        detail:
          'Households regularly move Winnebago ↔ Outagamie, Fond du Lac, or Brown. Clarify destinations so Wisconsin consumer controls vs FMCSA assumptions stay accurate when any leg leaves Wisconsin.',
      },
      WI_REG_BULLET,
    ],
  },
  zonesHeading: 'Winnebago County, WI access zones',
  zonesIntro:
    'Plan by downtown Oshkosh multi-unit, campus-adjacent stock, Neenah–Menasha northern edges, western rural approaches, and southern Omro–Winneconne lake edges.',
  zones: [
    {
      id: 'downtown-oshkosh',
      name: 'Downtown Oshkosh multi-unit & near-core stock',
      shortName: 'Downtown Oshkosh',
      neighborhoods: [
        'Downtown Oshkosh',
        'Main Street corridors',
        'Riverwalk edges',
        'Opera House edges',
        'Algoma edges',
        'Menominee Park edges',
      ],
      housingTypes: 'Multi-unit, older SFH, limited elevators',
      challenges: [
        'Stairs and tight curb',
        'Local freeflow',
        'Event and airshow spillover',
      ],
      moverTips:
        'Survey stairs carefully. Prefer mid-week starts outside AirVenture week. Photo curb options.',
      cityKeywords: [
        'oshkosh',
      ],
    },
    {
      id: 'uw-oshkosh-campus',
      name: 'UW Oshkosh campus-adjacent multi-unit',
      shortName: 'Campus belt',
      neighborhoods: [
        'UW Oshkosh edges',
        'Algoma Boulevard corridors',
        'High Avenue edges',
        'Ohio Street edges',
        'Campus multi-unit belts',
        'Near South campus edges',
      ],
      housingTypes: 'Student multi-unit, walk-ups, limited elevators',
      challenges: [
        'Semester lease waves',
        'Scarce curb at move-in peaks',
        'Long stair carries',
      ],
      moverTips:
        'Book crews early for August and January. Prefer mid-week starts. Confirm building rules in writing.',
      cityKeywords: [
        'oshkosh',
      ],
    },
    {
      id: 'neenah-menasha',
      name: 'Neenah, Menasha & northern Winnebago edges',
      shortName: 'Neenah / Menasha',
      neighborhoods: [
        'Neenah',
        'Menasha',
        'Doty Island edges',
        'Fox Crossing edges',
        'Tullar corridors',
        'Harrison edges',
      ],
      housingTypes: 'Multi-family, SFH, river-town stock',
      challenges: [
        'I-41 freeflow',
        'HOA multi-family mix',
        'Cross-county Fox Cities pairs',
      ],
      moverTips:
        'Clarify Winnebago vs Outagamie addresses on Fox Crossing edges. Price I-41 honestly. Collect HOA packets early.',
      cityKeywords: [
        'neenah',
        'menasha',
        'fox crossing',
      ],
    },
    {
      id: 'west-rural',
      name: 'Western rural & small-town approaches',
      shortName: 'West rural',
      neighborhoods: [
        'Omro edges',
        'Winneconne edges',
        'Poygan edges',
        'Rushford edges',
        'Utica edges',
        'Nepuskun edges',
      ],
      housingTypes: 'Small-town multi-unit, SFH, lake and rural-edge lots',
      challenges: [
        'WI-21 / WI-116 empty miles',
        'Lake-adjacent staging',
        'Winter weather buffers',
      ],
      moverTips:
        'Price empty miles honestly. Survey lake driveways. Confirm crew travel day costs in writing.',
      cityKeywords: [
        'omro',
        'winneconne',
      ],
    },
    {
      id: 'south-oshkosh',
      name: 'Southern Oshkosh & WI-44 approaches',
      shortName: 'South Oshkosh',
      neighborhoods: [
        'South Oshkosh',
        'WI-44 corridors',
        'Fisk edges',
        'Black Wolf edges',
        'Nekimi edges',
        'Algoma town edges',
      ],
      housingTypes: 'SFH, multi-family, rural-edge lots',
      challenges: [
        'WI-44 freeflow',
        'Mixed product',
        'School-calendar peaks',
      ],
      moverTips:
        'Price WI-44 pairs honestly. Survey cul-de-sacs. Prefer mid-week starts.',
      cityKeywords: [
        'oshkosh',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Winnebago County, WI moving costs',
    intro:
      'Campus peaks, airshow freeflow, multi-unit stairs, and winter ice move the number more than packing skill alone.',
    drivers: [
      {
        title: 'Campus multi-unit stairs & semester peaks',
        detail:
          'UW Oshkosh windows premium-price crews and elevators.',
      },
      {
        title: 'AirVenture week freeflow collapse',
        detail:
          'Late July congestion rewrites portal time near Oshkosh.',
      },
      {
        title: 'I-41 · US-45 · WI-21 congestion & empty miles',
        detail:
          'Fox Valley pairs burn portal-to-portal hours.',
      },
      {
        title: 'Neenah–Menasha multi-family admin',
        detail:
          'Northern multi-unit soft costs trend up vs rural edges.',
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
        note: 'Higher with stairs, semester peaks, or AirVenture week',
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
    title: 'When to schedule a Winnebago County, WI move',
    intro:
      'UW calendars, AirVenture week, winter ice, and I-41 freeflow reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings outside AirVenture and semester peaks',
        detail:
          'Tuesday–Thursday starts clear curb and ease I-41 pain.',
      },
      {
        title: 'Peak UW: mid-August and early January',
        detail:
          'Student multi-unit turnover fills fleets first. Book 2–4 weeks ahead.',
      },
      {
        title: 'Avoid or premium-price AirVenture week when flexible',
        detail:
          'Late July freeflow and lodging demand reshape crew availability.',
      },
      {
        title: 'Winter: ice and weather cancellations',
        detail:
          'December–March favors flexible dates and early starts.',
      },
    ],
  },
  specialized: [
    {
      id: 'oshkosh-regional',
      title: 'Oshkosh regional, campus & AirVenture logistics module',
      intro:
        'Winnebago County, WI estimates fail more often on semester multi-unit waves, AirVenture freeflow, and I-41 empty miles than on packing skill alone.',
      bullets: [
        'Book elevators and crews early for August and January campus peaks.',
        'Avoid AirVenture week for non-urgent moves when flexible — freeflow collapses.',
        'Survey downtown Oshkosh stairs separately from Neenah multi-family.',
        'Price portal-to-portal time for I-41, US-45, WI-21, and WI-44 pairs at peak.',
        'Label every estimate as Winnebago County, Wisconsin — never assume Illinois or Iowa.',
        'For in-state jobs insist on written estimates and insurance; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-appleton-clone',
      title: 'Oshkosh vs Appleton Fox Cities micro-market module',
      intro:
        'A single “Fox Valley rate” collapses when Oshkosh regional product and Appleton Fox Cities product diverge.',
      bullets: [
        'Do not price Oshkosh campus multi-unit like Grand Chute HOA townhomes as interchangeable.',
        'Ask which I-41 approaches the crew will actually use northbound toward Appleton.',
        'Match AirVenture calendars separately from Appleton manufacturing peaks.',
        'Keep Winnebago vs Outagamie county lines clear on multi-address estimates — especially Fox Crossing edges.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Winnebago County, Wisconsin?',
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
              'Oshkosh Area School District and neighboring districts (including Neenah, Menasha, Omro, Winneconne, and others) serve the county. Assignment is address-based.',
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
              'Advocate Aurora, ThedaCare, and other regional campuses serve Oshkosh and Neenah–Menasha. Confirm insurance networks.',
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
              'Expect multi-unit and older SFH in Oshkosh; campus multi-unit; multi-family in Neenah–Menasha; lake and rural-edge stock west and south.',
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
            title: 'Downtown Oshkosh multi-unit',
            detail:
              'Suits people prioritizing mid-size city amenities — with stairs and event freeflow tradeoffs.',
          },
          {
            title: 'Campus-adjacent multi-unit',
            detail:
              'Often appeals for short UW Oshkosh commutes — with semester competition and stair logistics.',
          },
          {
            title: 'Neenah / Menasha northern edges',
            detail:
              'Attracts households seeking Fox Cities adjacency — with I-41 freeflow and multi-family logistics.',
          },
          {
            title: 'Western lake and rural edges',
            detail:
              'Fits buyers chasing quieter living — with empty-mile tradeoffs into Oshkosh.',
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
              'Manufacturing, aviation-adjacent industry, healthcare, education (UW Oshkosh), and Fox Valley logistics concentrate demand. Tourism peaks around AirVenture reshape short-term housing demand.',
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
              'Winnebago County, WI is an Oshkosh regional market — different from Appleton/Outagamie Fox Cities product, Green Bay/Brown event freeflow, and never equivalent to Winnebago counties in other states.',
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
    title: 'Useful Winnebago County, WI resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. For in-state Wisconsin moves insist on written estimates and insurance proof; verify FMCSA for any interstate leg before deposits. This page covers Winnebago County, Wisconsin — not Illinois or Iowa.',
    items: [
      {
        label: 'City of Oshkosh — official site',
        href: 'https://www.oshkoshwi.gov/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'Winnebago County, WI',
        href: 'https://www.co.winnebago.wi.us/',
        external: true,
        note: 'County services (Wisconsin)',
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
    'Prefer crews with campus multi-unit experience for UW Oshkosh product; AirVenture freeflow awareness; honest I-41 · US-45 · WI-21 · WI-44 timing. Never apply Illinois/Iowa Winnebago assumptions. For in-state jobs insist on written estimates and insurance; verify FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
