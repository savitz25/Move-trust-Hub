import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMtPack,
  MT_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/montana/mt-shared';

/**
 * Cascade County, MT — Great Falls regional hub / Missouri River.
 * Distinct from Billings (Yellowstone), Bozeman (Gallatin), and Missoula university hubs.
 */
export const cascadeCountyMtIntelligence: CountyIntelligencePack = finalizeMtPack({
  countySlug: 'cascade',
  hubTitle: 'Cascade County Moving Intelligence Hub',
  eyebrow:
    'Cascade County, MT · Great Falls regional / Missouri River · I-15 / US-87 / US-89 logistics',
  h1: 'Moving in Cascade County: Great Falls Regional Access, Missouri River & I-15 / US-87 Logistics',
  heroOpener:
    'Cascade County, Montana is the Great Falls regional hub — downtown Great Falls multi-unit and river-adjacent stock, Northwest and Southwest neighborhood belts, Malmstrom Air Force Base–adjacent housing, Black Eagle edges, rural Cascade County approaches, and Missouri River corridor product that rewrites “local” estimates across north-central Montana. This is not a Billings (Yellowstone County) I-90/I-94 crossroads rename, not Bozeman/Gallatin tech-and-outdoor growth, and not Missoula university-west density. A downtown walk-up, a Northwest ranch driveway, a Malmstrom-adjacent multi-unit, and a rural Missouri River-edge acreage lot do not share truck access or empty-mile risk. Military PCS calendars, winter ice on river-valley approaches, and I-15 / US-87 / US-89 freeflow are real inputs. This hub is for people moving in Cascade County — Great Falls market realities — not a renamed Billings, Bozeman, or Missoula page.',
  heroCredibility:
    'Written estimates & insurance certificates for intrastate Montana · MDT MCS commercial vehicle context · FMCSA for interstate · Great Falls I-15 / Missouri River logistics awareness · Curated listings',
  majorCorridors: 'I-15 · US-87 · US-89 · local Great Falls grid',
  whatMakesDifferent: {
    title: 'What makes moving in Cascade County different',
    intro:
      'These are Cascade County / Great Falls regional realities — Missouri River corridor access, Malmstrom-adjacent military product, Northwest and Southwest neighborhood grids, Black Eagle edges, and I-15 / US-87 / US-89 freeflow — not Billings prairie crossroads, not Bozeman growth, and not Missoula university defaults.',
    bullets: [
      {
        title: 'This is Great Falls regional / Missouri River — not Billings or Bozeman',
        detail:
          'Ignore I-90 Billings crossroads templates and Gallatin Valley growth scripts. Cascade is north-central Montana’s commercial, healthcare, and military hub on the Missouri River with I-15 freeflow. Match estimates to Great Falls, Black Eagle, Malmstrom-adjacent, and rural Cascade addresses.',
      },
      {
        title: 'Malmstrom AFB–adjacent and PCS calendars create hard spikes',
        detail:
          'Military permanent-change-of-station windows compress surveys, curb, and multi-unit capacity near base-adjacent housing. Civilian “any Saturday” assumptions fail during peak PCS waves — coordinate early with orders timelines.',
      },
      {
        title: 'Downtown Great Falls multi-unit differs from Northwest / Southwest SFH',
        detail:
          'Elevator-scarce walk-ups, scarce curb, river-adjacent staging limits, and older stock dominate core jobs. A Northwest ranch or Southwest two-story is not a downtown loft freight window.',
      },
      {
        title: 'I-15, US-87, and US-89 burn portal time',
        detail:
          'Downtown ↔ Northwest, Malmstrom-adjacent ↔ Southwest, or Great Falls ↔ Black Eagle / rural pairs look local and still burn 20–50+ minutes at peak, construction, or winter weather. Price portal-to-portal honestly.',
      },
      {
        title: 'Missouri River edges and rural Cascade rewrite empty miles',
        detail:
          'River-corridor approaches, longer rural driveways, mixed gravel access, and wind-exposed staging are not downtown curb problems. Flat-rate optimism underprices edge product.',
      },
      {
        title: 'Mountain/prairie winter logistics are real',
        detail:
          'November–March ice, wind, and snow reshape outdoor labor, truck traction, and I-15 approaches. Prefer early starts, weather contingency, and honest delay language — not summer-only templates.',
      },
      {
        title: 'Cross-county and interstate pairs are routine',
        detail:
          'Households regularly move Cascade County ↔ Lewis and Clark, Yellowstone, or Hill County, or across state lines into the Dakotas and Canada-bound freight corridors. Written estimates and insurance cover pure in-state jobs; any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
      MT_REG_BULLET,
    ],
  },
  zonesHeading: 'Cascade County access zones',
  zonesIntro:
    'Plan by Downtown Great Falls multi-unit and river core, Northwest and Southwest neighborhood belts, Malmstrom-adjacent housing, Black Eagle edges, rural Cascade County, and Missouri River corridor approaches — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'downtown-great-falls',
      name: 'Downtown Great Falls, river-adjacent & core multi-unit',
      shortName: 'Downtown Great Falls',
      neighborhoods: [
        'Downtown Great Falls',
        'Central Avenue corridors',
        'Riverfront / Missouri River edges',
        'Core multi-unit pockets',
        'Medical and commercial-adjacent stock',
        'Historic character grids',
      ],
      housingTypes: 'Walk-ups, loft conversions, denser multifamily, limited elevators, mixed commercial-residential',
      challenges: [
        'Scarce curb staging and event-day congestion',
        'Multi-flight stairs and elevator-scarce product',
        'I-15 / downtown freeflow and river-corridor limits',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week morning freight windows. Photo curb options and stair counts — downtown Great Falls is not Northwest ranch access.',
      cityKeywords: [
        'great falls',
        'downtown great falls',
      ],
    },
    {
      id: 'northwest-southwest-neighborhoods',
      name: 'Northwest & Southwest Great Falls residential belts',
      shortName: 'NW / SW neighborhoods',
      neighborhoods: [
        'Northwest Great Falls',
        'Southwest Great Falls',
        '10th Avenue South corridors',
        'Northwest residential grids',
        'Southwest multi-unit pockets',
        'School-corridor neighborhoods',
      ],
      housingTypes: 'Ranch SFH, two-story stock, townhomes, multi-family pockets',
      challenges: [
        'Arterial freeflow and cross-zone empty miles to downtown',
        'School-calendar summer peaks',
        'Winter ice on open residential approaches',
      ],
      moverTips:
        'Clarify Northwest vs Southwest vs downtown addresses. Price arterial freeflow honestly. Align with school calendars when relevant.',
      cityKeywords: [
        'great falls',
        'northwest great falls',
        'southwest great falls',
      ],
    },
    {
      id: 'malmstrom-adjacent',
      name: 'Malmstrom AFB–adjacent housing & east-side military belts',
      shortName: 'Malmstrom-adjacent',
      neighborhoods: [
        'Malmstrom Air Force Base adjacent',
        'East-side military-adjacent multi-unit',
        'Base housing approaches',
        'PCS-heavy rental corridors',
        'Eastern arterial edges',
        'Military family residential belts',
      ],
      housingTypes: 'Military-adjacent multi-unit, SFH, duplexes, denser rentals',
      challenges: [
        'PCS calendar spikes and tight survey windows',
        'Base-adjacent access rules and ID/security constraints near gates',
        'Multi-unit stairs and scarce curb at peak PCS',
      ],
      moverTips:
        'Coordinate with PCS orders timelines early. Confirm gate and base-adjacent access rules. Prefer mid-week starts outside peak PCS weekends. Inventory carefully for military inventory lists.',
      cityKeywords: [
        'great falls',
        'malmstrom',
        'malmstrom afb',
      ],
    },
    {
      id: 'black-eagle',
      name: 'Black Eagle edges & river-north approaches',
      shortName: 'Black Eagle',
      neighborhoods: [
        'Black Eagle',
        'Black Eagle residential belts',
        'River-north approaches',
        'Industrial-adjacent edges',
        'Small multi-unit and SFH mix',
        'Northern county edges toward Black Eagle',
      ],
      housingTypes: 'SFH, small multi-unit, older stock, rural-residential edges',
      challenges: [
        'Longer empty miles to southwest Great Falls core',
        'Mixed driveway and industrial-adjacent access',
        'Winter ice and river-corridor freeflow',
      ],
      moverTips:
        'Price Great Falls core ↔ Black Eagle pairs honestly. Survey curb and driveway early. Confirm Black Eagle vs Great Falls municipal addresses.',
      cityKeywords: [
        'black eagle',
      ],
    },
    {
      id: 'rural-cascade',
      name: 'Rural Cascade County & outlying belts',
      shortName: 'Rural Cascade',
      neighborhoods: [
        'Unincorporated Cascade County',
        'Belt edges',
        'Cascade town edges',
        'Simms / Fort Shaw edges',
        'Rural prairie and foothill approaches',
        'Outlying subdivision pockets',
      ],
      housingTypes: 'Rural SFH, acreage lots, manufactured, limited multi-unit',
      challenges: [
        'Long empty miles and soft-shoulder or gravel access',
        'Wind, winter ice, and limited staging space',
        'I-15 / US-87 / US-89 approach freeflow',
      ],
      moverTips:
        'Survey rural driveway width, turnaround, and surface condition. Price empty miles and weather contingency honestly. Do not treat as downtown Great Falls curb jobs.',
      cityKeywords: [
        'cascade',
        'belt',
        'simms',
        'fort shaw',
      ],
    },
    {
      id: 'missouri-river-edges',
      name: 'Missouri River edges & river-corridor residential',
      shortName: 'Missouri River edges',
      neighborhoods: [
        'Missouri River corridor residential',
        'River-edge approaches',
        'Giant Springs / river park edges',
        'Floodplain-aware driveway product',
        'Scenic river-adjacent SFH',
        'Southern and eastern river belts',
      ],
      housingTypes: 'River-adjacent SFH, character lots, limited multi-unit',
      challenges: [
        'Narrow approaches, long carries, and limited truck turnaround',
        'Seasonal weather and soft-ground risk near river edges',
        'Cross-zone freeflow back to I-15 and arterial grid',
      ],
      moverTips:
        'Photo driveway pitch, turnaround, and surface early. Protect landscaping and older interiors. Price river-edge access separately from flat neighborhood ranch jobs.',
      cityKeywords: [
        'great falls',
        'missouri river',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Cascade County moving costs',
    intro:
      'PCS spikes, downtown stairs, Malmstrom-adjacent multi-unit, rural empty miles, and I-15 winter logistics move the number more than packing skill alone — this is Great Falls regional / Missouri River logistics, not Billings or Bozeman defaults.',
    drivers: [
      {
        title: 'Military PCS calendars & Malmstrom-adjacent multi-unit',
        detail:
          'PCS waves compress crews, curb, and stair labor before packing skill matters — coordinate orders timelines early.',
      },
      {
        title: 'Downtown curb scarcity & walk-up labor',
        detail:
          'River-adjacent and core multi-unit product need short-truck staging and stair surveys.',
      },
      {
        title: 'Northwest · Southwest · Black Eagle · rural empty miles',
        detail:
          'Cross-zone pairs burn portal-to-portal hours even when map miles look short — especially on I-15 and arterial freeflow.',
      },
      {
        title: 'Missouri River edge access & driveway geometry',
        detail:
          'Narrow approaches, long carries, and soft-ground risk underprice flat-neighborhood optimism.',
      },
      {
        title: 'I-15 · US-87 · US-89 congestion, weather & interstate authority',
        detail:
          'Crossroads freeflow and winter ice reshape billable time; out-of-state legs need FMCSA — pure in-state jobs need written estimates and insurance, not invented HHG certificate numbers.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$400–$1,600+',
        note: 'Higher with walk-ups, PCS peaks, or peak I-15 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,200–$4,000+',
        note: 'Stairs, multi-unit, and cross-zone soft costs trend up',
      },
      {
        label: '3–4+ BR / rural / river-edge / cross-zone',
        value: '$2,600–$8,000+',
        note: 'Rural access and long I-15 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$190+/hr',
        note: 'Portal-to-portal; packing, stairs, and weather contingency scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Cascade County move',
    intro:
      'Military PCS calendars, school cycles, summer heat and wind, and mountain/prairie winter ice reshape access and crew availability across the Great Falls grid and Missouri River corridor.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease multi-unit freight windows, and reduce I-15 pain. Avoid month-end Fridays and peak PCS weekends when possible.',
      },
      {
        title: 'Peak season: late May–mid-September (plus PCS waves)',
        detail:
          'Family school calendars and military turnover fill first. Book 2–4 weeks ahead for peak weekends; treat PCS order windows as hard capacity constraints near Malmstrom-adjacent stock.',
      },
      {
        title: 'Mountain/prairie winter logistics',
        detail:
          'November–March ice, wind, and snow raise cancellation and staging risk on Northwest/Southwest approaches, Black Eagle, rural Cascade, and river edges. Prefer flexible dates, covered staging plans, and early starts when forecasts allow.',
      },
      {
        title: 'Summer heat, wind & storm contingency',
        detail:
          'June–August heat and prairie wind reshape outdoor labor. Prefer early starts and weather contingency on open rural-residential and river-edge stock.',
      },
    ],
  },
  specialized: [
    {
      id: 'great-falls-i15-logistics',
      title: 'Great Falls multi-unit, Malmstrom PCS & I-15 / Missouri River logistics module',
      intro:
        'Cascade County estimates fail more often on PCS calendars, stair surveys, rural driveway access, and freeflow than on packing skill alone — and when crews treat this as Billings or Bozeman defaults.',
      bullets: [
        'Align surveys and crews with Malmstrom AFB PCS order windows for base-adjacent multi-unit and SFH.',
        'Photo stair counts, curb options, and driveway access for downtown, Northwest, Southwest, and river-edge stock.',
        'Price portal-to-portal time for any pair that rides I-15, US-87, or US-89 at peak or in winter weather.',
        'Survey Black Eagle, rural Cascade, and Missouri River-edge driveway width, turnaround, and surface early.',
        'Clarify Great Falls, Black Eagle, Malmstrom-adjacent, Belt, Cascade town, and unincorporated addresses on every estimate.',
        'For pure in-state Montana jobs insist on written estimates and insurance certificates; verify FMCSA for any out-of-state leg. Do not invent a Montana HHG certificate number.',
      ],
    },
    {
      id: 'not-billings-not-bozeman-missoula',
      title: 'Not Billings · not Bozeman · not Missoula module',
      intro:
        'A single “Cascade County rate” collapses when Great Falls regional product is confused with Yellowstone County prairie logistics, Gallatin growth, or Missoula university defaults.',
      bullets: [
        'Do not price downtown Great Falls multi-unit like Billings Heights ranch product, Bozeman loft growth, or UM campus density as interchangeable defaults.',
        'State the market as Cascade County / Great Falls regional / Missouri River on every estimate.',
        'Keep Yellowstone, Gallatin, Missoula, and capital-Helena product out of Great Falls estimate assumptions unless the pair actually crosses counties.',
        'Match PCS peaks separately from civilian school-calendar and mid-week professional relocation windows.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Cascade County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit. This is Great Falls regional / Missouri River living, not Billings, Bozeman, or Missoula alone.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Cascade County spans Great Falls Public Schools and other systems serving Northwest/Southwest neighborhoods, Black Eagle, Malmstrom-adjacent belts, and rural towns. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year — military families should align with PCS timelines.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Montana Office of Public Instruction data, and campus visits beat ranking screenshots alone.',
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
              'Benefis Health System and regional specialty campuses anchor care across Great Falls. Confirm insurance networks for your household; military families may also use base medical pathways where eligible.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-15 ramps and arterial freeflow change “nearby” on paper. Transfer records early, especially on PCS timelines.',
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
              'Expect downtown multi-unit and river-adjacent product; Northwest and Southwest SFH belts; Malmstrom-adjacent military multi-unit and rentals; Black Eagle edges; rural Cascade acreage; Missouri River-edge character lots.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by school assignment, military demand cycles, and product type. Budget for competitive rental seasons near PCS peaks and older-building repair risk downtown.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Multi-unit management and limited HOA pockets often control move hours, truck size, elevators, and deposits. Read documents carefully; base-adjacent access may add security steps.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown Great Falls / multi-unit lifestyle',
            detail:
              'Suits people prioritizing medical, professional, and amenity access — with curb, stair, and freeflow tradeoffs on move day.',
          },
          {
            title: 'Northwest / Southwest residential living',
            detail:
              'Often appeals for schools, yards, and suburban grids — with cross-zone portal time to downtown employment.',
          },
          {
            title: 'Malmstrom-adjacent / military family living',
            detail:
              'Fits PCS households prioritizing base access — with multi-unit logistics and order-window capacity risk.',
          },
          {
            title: 'Black Eagle / rural Cascade / river-edge living',
            detail:
              'Attracts households seeking relative value or space — with empty miles, mixed access, and winter survey needs.',
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
              'Malmstrom Air Force Base, Benefis and healthcare, professional services, agriculture and logistics, education, and regional government concentrate demand across Cascade County.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-15, US-87, US-89, and arterial freeflow is real. Test peak routes before choosing solely on rent or purchase price — winter ice changes “nearby.”',
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
              'Cascade County, MT is the Great Falls regional hub on the Missouri River — commercial and healthcare density, military-adjacent product, and prairie/foothill edges — not a Billings rename and not Bozeman or Missoula growth defaults.',
          },
          {
            title: 'Climate',
            detail:
              'Semi-arid continental climate with warm summers, strong wind, and cold winters with ice and snow risk. Plan outdoor staging, heat, wind, and winter contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — PCS waves, school calendars, and winter weather reshape daily rhythm across the Great Falls grid.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Cascade County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. For pure in-state Montana moves insist on written estimates and insurance certificates; verify FMCSA for interstate legs before deposits. Do not invent a Montana household goods certificate number.',
    items: [
      {
        label: 'Cascade County, Montana — official site',
        href: 'https://www.cascadecountymt.gov/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Great Falls',
        href: 'https://greatfallsmt.net/',
        external: true,
        note: 'Primary municipal context — Great Falls regional hub',
      },
      {
        label: 'Malmstrom Air Force Base',
        href: 'https://www.malmstrom.af.mil/',
        external: true,
        note: 'Base context for PCS-adjacent logistics (not a mover endorsement)',
      },
      {
        label: 'MDT — Traveler Information',
        href: 'https://www.mdt.mt.gov/travinfo/',
        external: true,
        note: 'I-15 / US-87 / US-89 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with downtown Great Falls multi-unit and stair fluency; Malmstrom PCS calendar capacity for base-adjacent product; Northwest/Southwest residential surveys; Black Eagle and rural empty-mile honesty; Missouri River-edge driveway surveys; winter ice and I-15 · US-87 · US-89 freeflow awareness. For pure in-state Montana jobs insist on written estimates and insurance certificates; verify FMCSA for interstate legs before deposits. Do not invent a Montana HHG certificate. This is Cascade County / Great Falls regional / Missouri River — not Billings, not Bozeman, not Missoula.',
  lastReviewed: '2026-07-24',
});
