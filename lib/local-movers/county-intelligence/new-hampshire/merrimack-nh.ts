import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNhPack,
  NH_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-hampshire/nh-shared';

/**
 * Merrimack County, NH — Concord capital / I-93 · I-89 hub.
 * NOT Manchester north clone only; capital workforce & rural township mix.
 */
export const merrimackCountyNhIntelligence: CountyIntelligencePack = finalizeNhPack({
  countySlug: 'merrimack',
  hubTitle: 'Merrimack County Moving Intelligence Hub',
  eyebrow:
    'Merrimack County, NH · Concord capital / I-93 · I-89 logistics',
  h1: 'Moving in Merrimack County: Concord Capital Access, I-93 / I-89 Freeflow & Central NH Logistics',
  heroOpener:
    'Merrimack County is New Hampshire’s capital region — downtown Concord multi-unit and state-government freeflow, west and south Concord suburbs, Hopkinton–Warner village and rural belts, Pembroke–Allenstown edges, Franklin–Northfield northern approaches, and wide rural townships between I-93 and I-89. Capital workforce mid-month calendars, older multi-unit stairs, school peaks, and winter ice rewrite “local” estimates when portal time on I-93, I-89, US-4, and US-202 stacks on mixed access product. A downtown Concord walk-up, a Concord suburban ranch, a Hopkinton farmhouse driveway, and a Franklin multi-unit do not share truck access or crew skill. This hub is for people moving in Merrimack County — not a Manchester north rename and not a seacoast tourism page.',
  heroCredibility:
    'NH DOS / Bureau Household Goods Carrier authority (RSA 359-T) for intrastate · FMCSA for interstate · Concord capital & I-93 / I-89 logistics awareness · Curated listings',
  majorCorridors: 'I-93 · I-89 · US-4 · US-202 · local Concord grid',
  whatMakesDifferent: {
    title: 'What makes moving in Merrimack County different',
    intro:
      'These are Merrimack / Concord capital realities — government workforce calendars, mixed multi-unit and suburban product, I-93 / I-89 freeflow, and central NH winter ice — not Manchester mill density alone and not Upper Valley Dartmouth logistics.',
    bullets: [
      {
        title: 'This is Merrimack — Concord capital, not Manchester north defaults',
        detail:
          'Ignore Manchester mill-only templates and seacoast tourism scripts. Merrimack is capital employment density, Concord multi-unit and suburbs, and rural townships tied to I-93 and I-89. Match estimates to Concord, Hopkinton, Pembroke, Franklin, and township addresses — not a generic “central NH” rate.',
      },
      {
        title: 'Downtown Concord multi-unit underprices flat-rate optimism',
        detail:
          'Older walk-ups, scarce curb near capital corridors, elevator buildings with COIs, and winter ice on exterior flights rewrite labor before packing skill matters. Suburban ranches west and south of Concord do not share that stack.',
      },
      {
        title: 'Capital workforce mid-month calendars reshape peaks',
        detail:
          'State and professional employment cycles, lease turnovers, and school calendars compress mid-month and summer windows. Mid-week early starts clear curb better than month-end Fridays near government cores.',
      },
      {
        title: 'Hopkinton–Warner and rural townships are not capital-simple',
        detail:
          'Longer empty miles, gravel drives, low clearances, and winter unplowed approaches fail estimates written for downtown Concord only. Photo driveway turnarounds early.',
      },
      {
        title: 'I-93, I-89, US-4, and US-202 burn portal-to-portal hours',
        detail:
          'Concord ↔ Franklin, Concord ↔ Hopkinton, or Pembroke ↔ west-suburb pairs look short and still burn 20–50+ minutes at peak — longer in winter weather. Price portal-to-portal honestly.',
      },
      {
        title: 'Winter ice and snow are operational constraints, not footnotes',
        detail:
          'December–March ice on multi-unit stairs, plow-dependent rural belts, and I-93 / I-89 delays reshape access and crew availability. Prefer early starts, flexible dates, and weather contingency on older stock.',
      },
      NH_REG_BULLET,
    ],
  },
  zonesHeading: 'Merrimack County access zones',
  zonesIntro:
    'Plan by downtown Concord / capital multi-unit, Concord west and south suburbs, Hopkinton–Warner belts, Pembroke–Allenstown edges, Franklin–Northfield northern approaches, and rural townships — access rules cluster by capital density vs rural product more than ZIP alone.',
  zones: [
    {
      id: 'downtown-concord-capital',
      name: 'Downtown Concord, capital multi-unit & core freeflow',
      shortName: 'Concord / capital',
      neighborhoods: [
        'Downtown Concord',
        'State House corridors',
        'Main Street multi-unit pockets',
        'North Main / South Main edges',
        'Capital district freeflow',
        'Older walk-up belts',
      ],
      housingTypes: 'Walk-up multifamily, limited elevators, mixed older SFH, condo',
      challenges: [
        'Scarce curb, truck-length limits, and capital-corridor freeflow',
        'Elevator reservations and building COIs where present',
        'Winter ice on exterior stairs and tight residential blocks',
      ],
      moverTips:
        'Photo curb staging options early. Book elevators and COIs in writing when required. Prefer mid-week early freight windows away from month-end lease collisions.',
      cityKeywords: [
        'concord',
        'concord nh',
      ],
    },
    {
      id: 'concord-west-south-suburbs',
      name: 'Concord west / south suburbs & residential belts',
      shortName: 'Concord suburbs',
      neighborhoods: [
        'West Concord residential',
        'South Concord belts',
        'Penacook edges',
        'Heights and cul-de-sac product',
        'School-campus adjacent pockets',
        'Local arterial grid edges',
      ],
      housingTypes: 'SFH, townhomes, multi-unit limited, ranch and two-story stock',
      challenges: [
        'Mixed municipal and driveway access product',
        'I-93 / local grid freeflow into capital unload pairs',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Clarify exact Concord address vs neighboring towns. Survey driveway geometry. Align with school calendars when family moves dominate.',
      cityKeywords: [
        'concord',
        'penacook',
      ],
    },
    {
      id: 'hopkinton-warner',
      name: 'Hopkinton, Warner, Henniker & western village belts',
      shortName: 'Hopkinton / Warner',
      neighborhoods: [
        'Hopkinton',
        'Warner',
        'Henniker edges',
        'Contoocook village pockets',
        'US-202 / I-89 approach corridors',
        'Western rural-residential',
      ],
      housingTypes: 'Character SFH, village multi-unit limited, rural-residential',
      challenges: [
        'Longer empty miles to downtown Concord docks',
        'Village curb limits and older farmhouse access',
        'I-89 / US-202 freeflow and winter secondary roads',
      ],
      moverTips:
        'Price empty miles honestly. Photo driveway turnarounds and village staging. Protect older interiors and long carries.',
      cityKeywords: [
        'hopkinton',
        'warner',
        'henniker',
      ],
    },
    {
      id: 'pembroke-allenstown',
      name: 'Pembroke, Allenstown, Suncook & eastern edges',
      shortName: 'Pembroke / Allenstown',
      neighborhoods: [
        'Pembroke',
        'Allenstown',
        'Suncook village edges',
        'US-3 / I-93 approach corridors',
        'Eastern residential belts',
        'Multi-unit limited pockets',
      ],
      housingTypes: 'SFH, multi-unit limited, mixed older stock',
      challenges: [
        'I-93 freeflow and empty miles to capital core',
        'Village curb and older stair product',
        'Cross-zone pairs into Hillsborough southern density',
      ],
      moverTips:
        'Confirm Pembroke vs Allenstown vs Concord addresses. Survey stairs and curb. Price I-93 portal time honestly.',
      cityKeywords: [
        'pembroke',
        'allenstown',
        'suncook',
      ],
    },
    {
      id: 'franklin-northfield',
      name: 'Franklin, Northfield, Boscawen & northern approaches',
      shortName: 'Franklin / Northfield',
      neighborhoods: [
        'Franklin',
        'Northfield',
        'Boscawen edges',
        'I-93 northern corridors',
        'Winnipesaukee-approach belts',
        'Northern multi-unit pockets',
      ],
      housingTypes: 'Multi-unit limited, SFH, mixed older stock, rural-residential',
      challenges: [
        'Longer empty miles to Concord capital multi-unit',
        'Mixed driveway and winter-access product',
        'I-93 freeflow at peak and in storms',
      ],
      moverTips:
        'Price empty miles and winter contingency. Survey multi-unit stairs where present. Clarify Franklin vs Northfield addresses.',
      cityKeywords: [
        'franklin',
        'northfield',
        'boscawen',
      ],
    },
    {
      id: 'rural-townships',
      name: 'Andover, Danbury, Salisbury & rural townships',
      shortName: 'Rural townships',
      neighborhoods: [
        'Andover edges',
        'Danbury edges',
        'Salisbury edges',
        'Wilmot / New London approach pockets',
        'Rural township belts',
        'Secondary road networks',
      ],
      housingTypes: 'SFH, rural-residential, limited multi-unit',
      challenges: [
        'Long empty miles to Concord staging',
        'Gravel drives, low clearances, and winter unplowed approaches',
        'US-4 / secondary road freeflow and weather risk',
      ],
      moverTips:
        'Survey rural driveway width, bridge limits, and plow status. Price empty miles and weather contingency honestly.',
      cityKeywords: [
        'andover',
        'danbury',
        'salisbury',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Merrimack County moving costs',
    intro:
      'Capital multi-unit stairs, suburban driveway mix, rural empty miles, and I-93 / I-89 freeflow move the number more than packing skill alone — this is Concord capital logistics, not Manchester mill defaults.',
    drivers: [
      {
        title: 'Downtown multi-unit stairs, curb limits & winter ice',
        detail:
          'Concord walk-ups add flight counts and weather risk that flat-rate optimism underprices.',
      },
      {
        title: 'Elevator reservations, docks & building COIs',
        detail:
          'Capital-core multi-unit product adds labor and schedule risk before packing skill matters.',
      },
      {
        title: 'Suburban driveway mix & school-calendar peaks',
        detail:
          'West and south Concord residential packets rewrite jobs that look simple on a map.',
      },
      {
        title: 'I-93 · I-89 · US-4 · US-202 congestion',
        detail:
          'Cross-county pairs burn portal-to-portal hours even when map miles look short — worse in winter.',
      },
      {
        title: 'Rural township empty miles',
        detail:
          'Hopkinton–Warner, Franklin, and remote township destinations raise staging distance and winter access complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,800+',
        note: 'Higher with capital multi-unit stairs, elevators, or peak I-93 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,400–$4,200+',
        note: 'Stairs, driveway geometry, and winter soft costs trend up',
      },
      {
        label: '3–4+ BR / rural / cross-zone',
        value: '$2,800–$9,000+',
        note: 'Long rural pairs and capital multi-unit complexity price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$200+/hr',
        note: 'Portal-to-portal; packing, stairs, and empty miles scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Merrimack County move',
    intro:
      'Capital workforce calendars, school peaks, apartment turnover, and long New Hampshire winters reshape access and crew availability across Concord and the rural township grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear capital curb, ease multi-unit freight windows, and reduce I-93 / I-89 pain. Avoid month-end Fridays when leases and workforce move dates collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family school calendars and apartment turnover fill first. Book 2–4 weeks ahead for peak weekends and elevator slots near downtown Concord.',
      },
      {
        title: 'Winter ice, snow & corridor delays',
        detail:
          'December–March ice on multi-unit stairs, plow-dependent rural townships, and I-93 / I-89 weather slowdowns raise cancellation and labor risk. Prefer flexible dates, early starts, and covered staging when forecasts allow.',
      },
      {
        title: 'Shoulder seasons & capital mid-month patterns',
        detail:
          'October–April (outside holiday weeks) often improves crew availability if winter access is planned honestly. Capital workforce mid-month windows still compress some calendars year-round.',
      },
    ],
  },
  specialized: [
    {
      id: 'concord-capital-corridor',
      title: 'Concord capital multi-unit, suburban & I-93 / I-89 logistics module',
      intro:
        'Merrimack estimates fail more often on capital stair surveys, multi-unit COIs, rural driveway access, and I-93 / I-89 freeflow than on packing skill alone.',
      bullets: [
        'Survey stair counts, curb options, and winter exterior access for downtown Concord multi-unit with photos.',
        'Book elevators and building COIs for capital-core product before the survey is final.',
        'Clarify Concord vs Penacook vs neighboring town addresses on every estimate.',
        'Price portal-to-portal time for any pair that rides I-93, I-89, US-4, or US-202 at peak — longer in winter.',
        'Survey rural driveway width, plow status, and turnaround for Hopkinton–Warner, Franklin, and township product early.',
        'For in-state jobs verify New Hampshire household goods carrier authority under RSA 359-T frameworks; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-manchester-not-upper-valley',
      title: 'Not Manchester density · not Upper Valley / Dartmouth module',
      intro:
        'A single “central NH rate” collapses when Concord capital product is confused with Manchester mill logistics or Grafton Upper Valley Dartmouth calendars alone.',
      bullets: [
        'Do not price downtown Concord walk-ups like Manchester mill conversions or like Hanover–Lebanon Dartmouth multi-unit as interchangeable defaults.',
        'State the market as Merrimack County / Concord capital on every estimate — disambiguate from Hillsborough density and Grafton Upper Valley product.',
        'Match capital workforce mid-month peaks separately from pure school-calendar summer waves.',
        'Keep rural township empty miles and winter access explicit — do not underwrite farmhouse drives as suburban ranch defaults.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Merrimack County?',
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
              'Merrimack spans Concord and multiple SAU systems serving Hopkinton, Pembroke, Franklin, Henniker, and rural townships. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive near capital and suburban growth. Confirm enrollment windows early when relocating mid-year.',
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
              'Concord Hospital and regional specialty campuses anchor care for the capital region and surrounding townships. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-93, I-89, and US-4 freeflow change “nearby” on paper from rural belts. Transfer records early.',
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
              'Expect downtown Concord multi-unit and older SFH; west and south Concord suburbs; Hopkinton–Warner village character; Pembroke–Allenstown edges; Franklin multi-unit limited; wide rural-residential townships.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by capital-core vs township product. Budget for older-building repair risk, heating costs, and competitive rental seasons near government and healthcare employment.',
          },
          {
            title: 'Building and multi-unit governance',
            detail:
              'Multi-unit management often controls move hours, truck size, elevators, and deposits near downtown Concord. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown Concord / capital lifestyle',
            detail:
              'Suits people prioritizing government and professional access — with multi-unit curb, stair, and winter-access tradeoffs on move day.',
          },
          {
            title: 'Concord suburban living',
            detail:
              'Often appeals for schools and residential quiet — with driveway geometry and corridor freeflow into the capital core.',
          },
          {
            title: 'Hopkinton–Warner / western village living',
            detail:
              'Fits households seeking character and space — with longer portal time and winter secondary-road logistics.',
          },
          {
            title: 'Franklin / northern & rural living',
            detail:
              'Attracts buyers chasing relative value and northern access — with empty miles and plow-dependent approaches.',
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
              'State government, healthcare (Concord Hospital), professional services, education, retail, and logistics concentrate demand across the capital region.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-93, I-89, US-4, and US-202 freeflow is real — including reverse pairs into Hillsborough southern employment. Test peak routes before choosing solely on rent or purchase price.',
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
              'Merrimack is New Hampshire’s capital region — Concord government density, suburban belts, and rural townships on I-93 / I-89 — not Manchester mill-only density and not seacoast tourism rhythm.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental climate with warm summers, long freeze-thaw winters, ice, and snow that reshape outdoor staging and multi-unit exterior access. Plan winter contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — capital workforce calendars, school peaks, and winter storms reshape daily rhythm across the county.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Merrimack County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify New Hampshire household goods carrier authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Merrimack County, New Hampshire',
        href: 'https://www.merrimackcounty.net/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Concord',
        href: 'https://www.concordnh.gov/',
        external: true,
        note: 'Capital city municipality context',
      },
      {
        label: '511 NH — traveler information',
        href: 'https://www.511nh.com/',
        external: true,
        note: 'I-93 / I-89 / US-4 / US-202 before load windows',
      },
      {
        label: 'New Hampshire Department of Transportation',
        href: 'https://www.nh.gov/dot/',
        external: true,
        note: 'State transportation context',
      },
    ],
  },
  directoryHint:
    'Prefer crews with capital multi-unit and stair fluency for downtown Concord; suburban driveway survey skill for west/south residential belts; rural empty-mile and winter plow fluency for Hopkinton–Warner, Franklin, and township product; honest I-93 · I-89 · US-4 · US-202 timing for cross-zone pairs. Verify New Hampshire household goods carrier authority under RSA 359-T frameworks for intrastate moves and FMCSA for interstate legs before deposits. This is Merrimack County / Concord capital — not Manchester density and not Upper Valley Dartmouth defaults.',
  lastReviewed: '2026-07-24',
});
