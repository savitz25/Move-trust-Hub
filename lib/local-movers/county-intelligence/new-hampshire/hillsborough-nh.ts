import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNhPack,
  NH_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-hampshire/nh-shared';

/**
 * Hillsborough County, NH — Manchester + Nashua / I-93 corridor density.
 * Southern NH logistics hub — not Rockingham seacoast, not Concord capital.
 */
export const hillsboroughCountyNhIntelligence: CountyIntelligencePack = finalizeNhPack({
  countySlug: 'hillsborough',
  hubTitle: 'Hillsborough County Moving Intelligence Hub',
  eyebrow:
    'Hillsborough County, NH · Manchester–Nashua / I-93 corridor & southern NH logistics',
  h1: 'Moving in Hillsborough County: Manchester–Nashua Access, I-93 Density & Southern NH Logistics',
  heroOpener:
    'Hillsborough County is New Hampshire’s population core — Manchester mill stock and multi-unit freeflow, Nashua’s Everett Turnpike and Massachusetts-border short hops, Bedford–Merrimack suburban HOA product, Goffstown–Hooksett edges, Amherst–Milford west belts, and rural southern townships. I-93, I-293, NH-101, and US-3 rewrite “local” estimates when peak freeflow and winter ice stack on older mill housing stairs. A Manchester walk-up elevator dock, a Nashua townhome HOA window, a Bedford ranch cul-de-sac, and a Milford farmhouse driveway do not share truck access or crew skill. This hub is for people moving in Hillsborough County — not a Rockingham seacoast page and not a Concord capital rename.',
  heroCredibility:
    'NH DOS / Bureau Household Goods Carrier authority (RSA 359-T) for intrastate · FMCSA for interstate · Manchester–Nashua & I-93 logistics awareness · Curated listings',
  majorCorridors: 'I-93 · I-293 · NH-101 · US-3 · local arterial grid',
  whatMakesDifferent: {
    title: 'What makes moving in Hillsborough County different',
    intro:
      'These are Hillsborough / Manchester–Nashua realities — mill multi-unit density, MA-border Everett Turnpike patterns, I-93 freeflow, and southern NH winter ice — not Rockingham seacoast tourism stock and not Concord capital workforce calendars alone.',
    bullets: [
      {
        title: 'This is Hillsborough — Manchester–Nashua density, not seacoast or capital defaults',
        detail:
          'Ignore Portsmouth coastal tourism templates and Concord mid-month capital-only scripts. Hillsborough is New Hampshire’s densest housing and corridor stack: mill walk-ups, suburban HOAs, and I-93 / US-3 portal time. Match estimates to Manchester, Nashua, Bedford, Merrimack, Goffstown, and Milford addresses — not a generic “southern NH” rate.',
      },
      {
        title: 'Manchester mill multi-unit underprices flat-rate optimism',
        detail:
          'Older mill conversions, walk-up stairs, scarce curb on arterial blocks, and winter ice on exterior flights rewrite labor before packing skill matters. Elevator buildings still need reservations and COIs that ranch suburbs never see.',
      },
      {
        title: 'Nashua and MA-border short hops rewrite authority and timing',
        detail:
          'Everett Turnpike freeflow, Massachusetts-adjacent pairs, and HOA / multi-unit mix look local on a map and still burn portal time. Any leg into Massachusetts needs active FMCSA USDOT (and usually MC) — New Hampshire household goods authority alone does not authorize interstate delivery.',
      },
      {
        title: 'Bedford–Merrimack and west-belt HOA product is not mill-simple',
        detail:
          'Gate lists, truck-length limits, timed move windows, and school-calendar peaks dominate growth suburbs. A Goffstown edge ranch or Amherst driveway does not share that packet stack with downtown Manchester.',
      },
      {
        title: 'I-93, I-293, NH-101, and US-3 burn portal-to-portal hours',
        detail:
          'Manchester ↔ Nashua, Bedford ↔ Hooksett, or Milford ↔ Manchester pairs look short and still burn 25–55+ minutes at peak — longer in winter weather. Price portal-to-portal honestly.',
      },
      {
        title: 'Winter ice and snow are operational constraints, not footnotes',
        detail:
          'December–March ice on mill exterior stairs, unplowed rural southern edges, and I-93 corridor delays reshape access and crew availability. Prefer early starts, flexible dates, and weather contingency on older stock.',
      },
      NH_REG_BULLET,
    ],
  },
  zonesHeading: 'Hillsborough County access zones',
  zonesIntro:
    'Plan by Manchester core multi-unit and mill product, Nashua / Everett Turnpike belts, Bedford–Merrimack suburbs, Goffstown–Hooksett edges, Amherst–Milford west, and rural southern townships — access rules cluster by housing era and corridor more than ZIP alone.',
  zones: [
    {
      id: 'manchester-core',
      name: 'Manchester core multi-unit, mill stock & downtown freeflow',
      shortName: 'Manchester / core',
      neighborhoods: [
        'Downtown Manchester',
        'Mill Yard and mill conversion belts',
        'Elm Street corridors',
        'West Side multi-unit pockets',
        'North End edges',
        'South End / airport-adjacent belts',
      ],
      housingTypes: 'Mill conversions, walk-up multifamily, limited elevators, mixed older SFH',
      challenges: [
        'Multi-flight stairs, scarce curb, and winter ice on exterior access',
        'Elevator reservations and building COIs where present',
        'I-293 / I-93 freeflow into core load windows',
      ],
      moverTips:
        'Survey stair counts with photos. Book elevators and COIs in writing when required. Prefer mid-week early freight windows and photo curb staging options early.',
      cityKeywords: [
        'manchester',
        'manchester nh',
      ],
    },
    {
      id: 'nashua-everett',
      name: 'Nashua, Everett Turnpike corridors & MA-border belts',
      shortName: 'Nashua / Turnpike',
      neighborhoods: [
        'Downtown Nashua',
        'Main Street multi-unit edges',
        'Everett Turnpike corridors',
        'South Nashua growth',
        'Hudson edges',
        'Massachusetts-adjacent pairs',
      ],
      housingTypes: 'Multi-unit, townhomes, HOA SFH, older mill-adjacent stock',
      challenges: [
        'Everett Turnpike / US-3 freeflow and MA-border timing',
        'HOA packets and mixed multi-unit rules',
        'Interstate authority when any leg enters Massachusetts',
      ],
      moverTips:
        'Clarify NH-only vs MA-crossing estimates early. Collect HOA packets and elevator rules. Price Turnpike freeflow and winter delays honestly.',
      cityKeywords: [
        'nashua',
        'hudson',
      ],
    },
    {
      id: 'bedford-merrimack',
      name: 'Bedford, Merrimack & southern suburban HOA belts',
      shortName: 'Bedford / Merrimack',
      neighborhoods: [
        'Bedford',
        'Merrimack',
        'Route 101 corridors',
        'South River Road belts',
        'Suburban HOA cul-de-sacs',
        'School-campus adjacent pockets',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family, ranch and two-story stock',
      challenges: [
        'HOA gate lists, truck-length limits, and timed windows',
        'NH-101 / I-93 freeflow into Manchester or Nashua unload pairs',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Collect HOA packets and gate codes early. Confirm truck length rules. Align with school calendars when family moves dominate.',
      cityKeywords: [
        'bedford',
        'merrimack',
      ],
    },
    {
      id: 'goffstown-hooksett',
      name: 'Goffstown, Hooksett & northern county edges',
      shortName: 'Goffstown / Hooksett',
      neighborhoods: [
        'Goffstown',
        'Hooksett',
        'Pinardville edges',
        'Route 3 / I-93 approach corridors',
        'Northern residential belts',
        'Rural-residential pockets',
      ],
      housingTypes: 'SFH, mixed multi-unit limited, rural-residential',
      challenges: [
        'Longer empty miles to Manchester core multi-unit docks',
        'Mixed driveway and winter-access product',
        'I-93 approach freeflow at peak',
      ],
      moverTips:
        'Price empty miles honestly. Survey driveway width and winter plow status. Confirm Hooksett vs Manchester addresses on every estimate.',
      cityKeywords: [
        'goffstown',
        'hooksett',
      ],
    },
    {
      id: 'amherst-milford-west',
      name: 'Amherst, Milford, Wilton & western belts',
      shortName: 'Amherst / Milford',
      neighborhoods: [
        'Amherst',
        'Milford',
        'Wilton edges',
        'NH-101 west corridors',
        'Souhegan Valley belts',
        'Western rural-residential',
      ],
      housingTypes: 'Character SFH, village multi-unit limited, rural-residential',
      challenges: [
        'Longer portal time to Manchester–Nashua cores',
        'Village curb limits and older farmhouse access',
        'NH-101 freeflow and winter secondary roads',
      ],
      moverTips:
        'Photo driveway turnarounds and village staging. Price NH-101 empty miles. Protect older interiors and long carries.',
      cityKeywords: [
        'amherst',
        'milford',
        'wilton',
      ],
    },
    {
      id: 'rural-southern-edges',
      name: 'New Ipswich, Greenville, Lyndeborough & rural southern edges',
      shortName: 'South / rural edges',
      neighborhoods: [
        'New Ipswich edges',
        'Greenville edges',
        'Lyndeborough edges',
        'Temple / Greenfield pockets',
        'Southern rural townships',
        'MA-border rural pairs',
      ],
      housingTypes: 'SFH, rural-residential, limited multi-unit',
      challenges: [
        'Long empty miles to Manchester or Nashua staging',
        'Gravel drives, low clearances, and winter unplowed approaches',
        'Interstate complexity on MA-border rural pairs',
      ],
      moverTips:
        'Survey rural driveway width, bridge limits, and plow status. Price empty miles and weather contingency. Verify FMCSA when any leg leaves New Hampshire.',
      cityKeywords: [
        'new ipswich',
        'greenville',
        'lyndeborough',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Hillsborough County moving costs',
    intro:
      'Mill stairs, multi-unit elevators, HOA admin, and I-93 / Everett Turnpike freeflow move the number more than packing skill alone — this is Manchester–Nashua southern NH logistics, not seacoast tourism defaults.',
    drivers: [
      {
        title: 'Mill multi-unit stairs, curb limits & winter ice',
        detail:
          'Manchester and older Nashua walk-ups add flight counts and weather risk that flat-rate optimism underprices.',
      },
      {
        title: 'Elevator reservations, docks & building COIs',
        detail:
          'Core multi-unit and conversion product add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'HOA gates, truck-length rules & timed windows',
        detail:
          'Bedford, Merrimack, and suburban growth packets rewrite jobs that look simple on a map.',
      },
      {
        title: 'I-93 · I-293 · NH-101 · US-3 congestion',
        detail:
          'Cross-county pairs burn portal-to-portal hours even when map miles look short — worse in winter.',
      },
      {
        title: 'MA-border & interstate empty miles',
        detail:
          'Massachusetts destinations and long rural southern pairs raise staging distance and FMCSA authority complexity when leaving New Hampshire.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,900+',
        note: 'Higher with mill stairs, elevators, or peak I-93 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,500–$4,500+',
        note: 'Stairs, HOA, multi-unit, and winter soft costs trend up',
      },
      {
        label: '3–4+ BR / HOA / cross-zone',
        value: '$3,000–$9,500+',
        note: 'Suburban HOAs and long I-93 / MA-border pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$205+/hr',
        note: 'Portal-to-portal; packing, HOA admin, and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Hillsborough County move',
    intro:
      'School calendars, apartment turnover, summer heat, and long New Hampshire winters reshape access and crew availability across the Manchester–Nashua grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease multi-unit freight windows, and reduce I-93 / Turnpike pain. Avoid month-end Fridays when leases and HOA slots collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family school calendars and apartment turnover fill first. Book 2–4 weeks ahead for peak weekends and elevator or HOA slots.',
      },
      {
        title: 'Winter ice, snow & corridor delays',
        detail:
          'December–March ice on mill stairs, plow-dependent rural edges, and I-93 weather slowdowns raise cancellation and labor risk. Prefer flexible dates, early starts, and covered staging when forecasts allow.',
      },
      {
        title: 'Summer heat & shoulder-season value',
        detail:
          'June–August heat and humidity reshape outdoor labor on multi-flight stock. October–April (outside holiday weeks) often improves crew availability if winter access is planned honestly.',
      },
    ],
  },
  specialized: [
    {
      id: 'manchester-nashua-corridor',
      title: 'Manchester–Nashua multi-unit, HOA & I-93 logistics module',
      intro:
        'Hillsborough estimates fail more often on mill stair surveys, multi-unit COIs, HOA packets, and I-93 / Everett Turnpike freeflow than on packing skill alone.',
      bullets: [
        'Survey stair counts, curb options, and winter exterior access for Manchester mill and walk-up product with photos.',
        'Book elevators and building COIs for core multi-unit before the survey is final.',
        'Collect HOA packets, gate codes, and truck-length rules for Bedford, Merrimack, and suburban growth early.',
        'Price portal-to-portal time for any pair that rides I-93, I-293, NH-101, or US-3 at peak — longer in winter.',
        'Clarify Manchester, Nashua, Bedford, Merrimack, Goffstown, Hooksett, Amherst, Milford, and unincorporated addresses on every estimate.',
        'For in-state jobs verify New Hampshire household goods carrier authority under RSA 359-T frameworks; verify FMCSA for any out-of-state leg (especially Massachusetts border pairs).',
      ],
    },
    {
      id: 'not-seacoast-not-concord',
      title: 'Not Rockingham seacoast · not Concord capital-only module',
      intro:
        'A single “southern NH rate” collapses when Manchester–Nashua density is confused with Portsmouth coastal tourism logistics or Concord capital workforce calendars alone.',
      bullets: [
        'Do not price Manchester mill walk-ups like Hampton Beach seasonal rentals or like downtown Concord capital multi-unit as interchangeable defaults.',
        'State the market as Hillsborough County / Manchester–Nashua on every estimate — disambiguate from Rockingham seacoast and Merrimack County capital product.',
        'Keep New Hampshire vs Massachusetts addresses clear when Everett Turnpike or MA-border pairs appear — interstate authority applies when any leg leaves New Hampshire.',
        'Match school-calendar peaks separately from corporate and lease mid-month windows across the I-93 corridor.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Hillsborough County?',
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
              'Hillsborough spans Manchester, Nashua, Bedford, Merrimack, Goffstown, Amherst, Milford, and other SAU systems. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive, especially in high-demand suburban SAUs. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, New Hampshire Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Elliot Hospital, Catholic Medical Center, Southern New Hampshire Medical Center, and regional specialty campuses anchor care across the Manchester–Nashua belt. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-93, I-293, and NH-101 freeflow change “nearby” on paper. Transfer records early.',
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
              'Expect Manchester mill multi-unit and older SFH; Nashua multi-unit and HOA mix; Bedford–Merrimack suburban growth; Goffstown–Hooksett edges; Amherst–Milford character and rural-residential west and south.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by municipality and product type. Budget for HOA dues, older-building repair risk, and competitive rental seasons near employment corridors.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Associations and multi-unit management often control move hours, truck size, elevators, and deposits. Read documents carefully — especially on mill conversions.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Manchester core / multi-unit lifestyle',
            detail:
              'Suits people prioritizing urban amenities and employment density — with stair, curb, and winter-access tradeoffs on move day.',
          },
          {
            title: 'Nashua / MA-border access living',
            detail:
              'Often appeals for Turnpike employment and Massachusetts adjacency — with freeflow timing and interstate authority awareness on cross-border pairs.',
          },
          {
            title: 'Bedford / Merrimack suburban belts',
            detail:
              'Fits buyers chasing schools and newer product — with HOA rules and corridor empty miles to cores.',
          },
          {
            title: 'Amherst–Milford / western & rural living',
            detail:
              'Attracts households seeking quieter character and space — with longer portal time and winter secondary-road logistics.',
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
              'Healthcare systems, professional services, manufacturing and logistics, education, retail, and Massachusetts reverse-commute patterns concentrate demand across Manchester–Nashua.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-93, I-293, NH-101, and US-3 freeflow is real — including MA-border reverse pairs. Test peak routes before choosing solely on rent or purchase price.',
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
              'Hillsborough is New Hampshire’s densest southern corridor — Manchester–Nashua employment and housing stack, mill heritage, and suburban growth — not Rockingham seacoast tourism and not Concord capital-only rhythm.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental climate with warm summers, long freeze-thaw winters, ice, and snow that reshape outdoor staging and mill exterior access. Plan winter contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — school calendars, lease turnover, and winter storms reshape daily rhythm across the I-93 belt.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Hillsborough County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify New Hampshire household goods carrier authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Hillsborough County, New Hampshire',
        href: 'https://www.hillsboroughcountynh.org/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Manchester',
        href: 'https://www.manchesternh.gov/',
        external: true,
        note: 'Largest NH city municipality context',
      },
      {
        label: 'City of Nashua',
        href: 'https://www.nashuanh.gov/',
        external: true,
        note: 'Southern Turnpike municipality context',
      },
      {
        label: '511 NH — traveler information',
        href: 'https://www.511nh.com/',
        external: true,
        note: 'I-93 / I-293 / NH-101 / US-3 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with mill multi-unit and stair fluency for Manchester core; Everett Turnpike and HOA fluency for Nashua–Bedford–Merrimack product; honest I-93 · I-293 · NH-101 · US-3 timing for cross-zone pairs; winter ice and driveway survey skill for edge and rural stock. Verify New Hampshire household goods carrier authority under RSA 359-T frameworks for intrastate moves and FMCSA for interstate legs (including Massachusetts border pairs) before deposits. This is Hillsborough County / Manchester–Nashua — not Rockingham seacoast and not Concord capital defaults.',
  lastReviewed: '2026-07-24',
});
