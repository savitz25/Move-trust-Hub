import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeOkPack,
  OK_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/oklahoma/ok-shared';

/**
 * Oklahoma County, OK — Oklahoma City metro core.
 * County-clear OKC product — not a statewide Oklahoma rename, not Tulsa, not Norman.
 */
export const oklahomaCountyOkIntelligence: CountyIntelligencePack = finalizeOkPack({
  countySlug: 'oklahoma',
  hubTitle: 'Oklahoma County Moving Intelligence Hub',
  eyebrow:
    'Oklahoma County · OKC core, Edmond growth & I-35 / I-40 / I-44 logistics',
  h1: 'Moving in Oklahoma County: OKC Access, Neighborhood Grids & I-35 / I-40 / I-44 Logistics',
  heroOpener:
    'Oklahoma County is the Oklahoma City metro core — not a statewide “Moving in Oklahoma” rename, not Tulsa river-city stock, and not Norman / Cleveland County campus product. Expect downtown and Midtown elevator towers, Bricktown and Deep Deuce multi-unit, Nichols Hills and The Village character grids, Edmond and Deer Creek growth HOAs, Midwest City and Del City eastern ranch stock, and I-35 / I-40 / I-44 / I-235 / Kilpatrick freeflow that rewrites “local” estimates. A Classen Curve walk-up stair stack, a Capitol-area dock slot, an Edmond gated driveway, and a Tinker-adjacent multi-family curb do not share truck access or crew skill. State-government, healthcare, and metro lease waves are real inputs. This hub is for people moving in Oklahoma County — OKC metro core — not a Tulsa or Norman script.',
  heroCredibility:
    'OCC Household Goods Certificate for intrastate · FMCSA for interstate · OKC metro access & I-35 / I-40 / I-44 logistics awareness · Curated listings',
  majorCorridors: 'I-35 · I-40 · I-44 · I-235 · Kilpatrick Turnpike · local arterial grid',
  whatMakesDifferent: {
    title: 'What makes moving in Oklahoma County different',
    intro:
      'These are Oklahoma County / OKC core realities — downtown elevators, Edmond HOAs, eastern military-adjacent stock, and I-35 / I-40 / I-44 freeflow — not Tulsa river-city product, not Norman campus defaults, and not a generic statewide Oklahoma template.',
    bullets: [
      {
        title: 'This is Oklahoma County / OKC — not statewide Oklahoma, not Tulsa',
        detail:
          'Ignore Tulsa Greenwood–Brookside templates and statewide rural defaults. Oklahoma County stacks state capitol density, Midtown multi-unit, Edmond growth HOAs, and cross-town freeflow that Tulsa or Norman scripts underprice. Match estimates to Oklahoma County addresses and OCC authority.',
      },
      {
        title: 'Downtown, Midtown, and Bricktown vertical product rewrite labor',
        detail:
          'Elevator reservations, building COIs, dock slots, and scarce curb dominate core jobs. An Edmond cul-de-sac or Midwest City ranch does not share that logistics stack.',
      },
      {
        title: 'Edmond and north-metro HOA growth is not south or east product',
        detail:
          'Gate lists, truck-length limits, and school-calendar peaks rewrite jobs that look suburban-simple on paper. Same-county downtown and eastern stock do not share that packet stack.',
      },
      {
        title: 'Eastern Midwest City–Del City–Tinker belts differ from Nichols Hills grids',
        detail:
          'Military-adjacent multi-unit, older ranch stock, and base freeflow fail estimates differently than tree-lined character neighborhoods and walk-up stairs.',
      },
      {
        title: 'I-35, I-40, I-44, I-235, and Kilpatrick burn portal time',
        detail:
          'Downtown ↔ Edmond, Midtown ↔ Midwest City, or west-side ↔ Bricktown pairs look local and still burn 25–60+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Multi-county metro and interstate pairs are routine',
        detail:
          'Households regularly move Oklahoma County ↔ Cleveland, Canadian, Logan, or Pottawatomie County, or out-of-state on I-35 / I-40 / I-44. An OCC Household Goods Certificate alone does not authorize interstate delivery — verify FMCSA when any leg leaves Oklahoma.',
      },
      OK_REG_BULLET,
    ],
  },
  zonesHeading: 'Oklahoma County access zones',
  zonesIntro:
    'Plan by downtown–Bricktown vertical product, Midtown–Uptown multi-unit, Nichols Hills–Village character grids, Edmond–north growth HOAs, Midwest City–Del City eastern belts, and west/northwest arterial growth — access rules cluster by product more than ZIP alone.',
  zones: [
    {
      id: 'downtown-bricktown-okc',
      name: 'Downtown OKC, Bricktown, Deep Deuce & core towers',
      shortName: 'Downtown / Bricktown',
      neighborhoods: [
        'Downtown Oklahoma City',
        'Bricktown',
        'Deep Deuce',
        'Automobile Alley edges',
        'Film Row edges',
        'Capitol corridors',
      ],
      housingTypes: 'High-rise condo, loft conversions, mid-rise multifamily',
      challenges: [
        'Elevator reservations, dock slots, and building COIs',
        'Limited legal curb and event-day freeflow',
        'I-40 / I-235 / I-35 approach congestion',
      ],
      moverTips:
        'Book elevators and COIs in writing before the crew day. Prefer mid-week early freight windows. Photo dock or curb staging options.',
      cityKeywords: [
        'oklahoma city',
        'okc',
        'downtown oklahoma city',
        'bricktown',
        'deep deuce',
      ],
    },
    {
      id: 'midtown-uptown-plaza',
      name: 'Midtown, Uptown, Plaza District & Classen corridors',
      shortName: 'Midtown / Uptown',
      neighborhoods: [
        'Midtown',
        'Uptown',
        'Plaza District',
        'Classen Curve edges',
        'Paseo edges',
        'NW 23rd corridors',
      ],
      housingTypes: 'Walk-up multifamily, loft, older SFH, limited elevators',
      challenges: [
        'Multi-flight stairs and scarce truck length',
        'Tight residential curb and restaurant-corridor freeflow',
        'I-235 / Classen Boulevard congestion',
      ],
      moverTips:
        'Survey stair counts with photos. Prefer mid-week starts near corridor peaks. Inventory basements carefully.',
      cityKeywords: [
        'midtown',
        'uptown',
        'plaza district',
        'oklahoma city',
        'paseo',
      ],
    },
    {
      id: 'nichols-hills-village',
      name: 'Nichols Hills, The Village & north-central character grids',
      shortName: 'Nichols Hills / Village',
      neighborhoods: [
        'Nichols Hills',
        'The Village',
        'Nichols Hills edges',
        'Heritage Hills edges',
        'Crown Heights edges',
        'May Avenue corridors',
      ],
      housingTypes: 'Character SFH, estate lots, some multi-unit pockets',
      challenges: [
        'Tree-lined curb, long carries, and driveway geometry',
        'Municipal and HOA rule mix across short distances',
        'Northwest Expressway / May freeflow',
      ],
      moverTips:
        'Confirm municipality on the estimate. Photo driveway turnarounds. Protect landscaping and older interiors.',
      cityKeywords: [
        'nichols hills',
        'the village',
        'oklahoma city',
        'heritage hills',
      ],
    },
    {
      id: 'edmond-north-growth',
      name: 'Edmond, Deer Creek edges & north-metro growth HOAs',
      shortName: 'Edmond / north',
      neighborhoods: [
        'Edmond',
        'Deer Creek edges',
        'Coffee Creek corridors',
        'Memorial Road belts',
        'Covell corridors',
        'I-35 north commercial-residential edges',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family, gated product',
      challenges: [
        'HOA gate lists, truck-length limits, and timed windows',
        'I-35 / Kilpatrick freeflow and longer empty miles vs downtown',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Collect HOA packets and gate codes early. Confirm truck length rules. Price I-35 honestly for southbound unload pairs.',
      cityKeywords: [
        'edmond',
        'deer creek',
        'oklahoma city',
      ],
    },
    {
      id: 'midwest-city-del-city',
      name: 'Midwest City, Del City & eastern Tinker-adjacent belts',
      shortName: 'Midwest City / Del City',
      neighborhoods: [
        'Midwest City',
        'Del City',
        'Tinker edges',
        'Sooner Road corridors',
        'SE 29th corridors',
        'I-40 east residential belts',
      ],
      housingTypes: 'Ranch and split-level SFH, multi-unit, military-adjacent stock',
      challenges: [
        'I-40 / I-35 freeflow and base-adjacent traffic spikes',
        'Mixed older stock and long carries',
        'Multi-unit turnover near military and retail corridors',
      ],
      moverTips:
        'Avoid peak base windows when flexible. Survey older stock carefully. Clarify Midwest City, Del City, and OKC addresses.',
      cityKeywords: [
        'midwest city',
        'del city',
        'oklahoma city',
        'tinker',
      ],
    },
    {
      id: 'west-northwest-okc',
      name: 'West / northwest OKC arterial growth & Lake Hefner belts',
      shortName: 'West / NW OKC',
      neighborhoods: [
        'Northwest Expressway corridors',
        'Lake Hefner edges',
        'Quail Creek edges',
        'Bethany edges',
        'Warr Acres edges',
        'Kilpatrick west links',
      ],
      housingTypes: 'SFH, multi-family, HOA pockets, ranch and two-story stock',
      challenges: [
        'Kilpatrick / I-44 / Northwest Expressway freeflow',
        'Mixed municipal rules (Bethany, Warr Acres, OKC)',
        'Cross-zone empty miles common',
      ],
      moverTips:
        'Price Kilpatrick and I-44 honestly. Confirm city limits on every estimate. Photo driveway and garage access.',
      cityKeywords: [
        'oklahoma city',
        'bethany',
        'warr acres',
        'quail creek',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Oklahoma County moving costs',
    intro:
      'Access product, elevator/HOA admin, and I-35 / I-40 / I-44 freeflow move the number more than packing skill alone — this is Oklahoma County / OKC logistics, not Tulsa river-city pricing and not Norman campus defaults.',
    drivers: [
      {
        title: 'Elevator reservations, docks & building COIs',
        detail:
          'Downtown, Bricktown, and Midtown vertical product add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'Walk-up stairs, basements & character-grid curb',
        detail:
          'Uptown, Paseo, Heritage Hills, and older multi-unit stock add flight counts that flat-rate optimism underprices.',
      },
      {
        title: 'I-35 · I-40 · I-44 · I-235 · Kilpatrick congestion',
        detail:
          'Cross-metro pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Edmond HOA gates & truck-length rules',
        detail:
          'North growth packets rewrite jobs that look simple on a map.',
      },
      {
        title: 'Multi-county & interstate empty miles',
        detail:
          'Cleveland, Canadian, Logan, and out-of-state destinations raise staging distance and authority complexity when leaving Oklahoma County or Oklahoma.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,900+',
        note: 'Higher with elevators, walk-ups, or peak I-40 / I-35 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,500–$4,500+',
        note: 'Stairs, COI, and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR / high-rise / cross-zone',
        value: '$3,000–$9,500+',
        note: 'Tower moves and long Kilpatrick / I-35 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$200+/hr',
        note: 'Portal-to-portal; packing, COI admin, and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule an Oklahoma County move',
    intro:
      'Lease cycles, school calendars, summer heat, severe-storm and tornado season, and winter ice reshape access and crew availability across the OKC grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease downtown freight windows, and reduce I-35 / I-40 / I-44 pain. Avoid month-end Fridays when leases and elevators collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Apartment turnover and family school calendars fill first. Book 2–4 weeks ahead for peak weekends and elevator or HOA slots.',
      },
      {
        title: 'Severe-storm & tornado-season risk',
        detail:
          'Spring and early summer storms raise cancellation and staging risk. Prefer flexible dates, covered staging plans, and early starts when forecasts allow.',
      },
      {
        title: 'Summer heat & winter ice',
        detail:
          'June–August heat and freeze-thaw winters reshape outdoor labor. Prefer early starts and weather contingency on older stock.',
      },
    ],
  },
  specialized: [
    {
      id: 'oklahoma-county-elevator-hoa',
      title: 'OKC elevator, neighborhood & I-35 / I-40 logistics module',
      intro:
        'Oklahoma County estimates fail more often on stair surveys, elevator packets, HOA gates, and freeway freeflow than on packing skill alone.',
      bullets: [
        'Collect building COI, elevator reservations, and dock rules before the survey is final.',
        'Photo stair counts, curb options, and basement access for Midtown, Uptown, and character-grid stock.',
        'Price portal-to-portal time for any pair that rides I-35, I-40, I-44, I-235, or Kilpatrick at peak.',
        'Collect HOA packets early for Edmond and north-metro growth product.',
        'Clarify Oklahoma City, Edmond, Midwest City, Del City, Nichols Hills, and other municipal addresses on every estimate.',
        'For in-state jobs verify OCC Household Goods Certificate; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-statewide-not-tulsa-not-norman',
      title: 'Not statewide Oklahoma · not Tulsa · not Norman module',
      intro:
        'A single “Oklahoma rate” collapses when Oklahoma County core product is confused with statewide rural defaults, Tulsa river-city logistics, or Cleveland County OU campus calendars.',
      bullets: [
        'Do not price Bricktown elevators like Claremore cul-de-sacs or like Norman near-campus walk-ups as interchangeable defaults.',
        'Keep Oklahoma vs Cleveland vs Canadian county lines clear on multi-address estimates.',
        'Match downtown lease peaks separately from Edmond school-calendar waves.',
        'Treat out-of-state legs as interstate authority problems — OCC alone is not enough for interstate delivery.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Oklahoma County?',
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
              'Oklahoma County spans Oklahoma City Public Schools plus Edmond, Midwest City-Del City, Putnam City, Deer Creek, and other systems. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Oklahoma State Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'OU Health, INTEGRIS, Mercy, SSM Health St. Anthony, and specialty campuses anchor care across Oklahoma County. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-35, I-40, and I-235 freeflow change “nearby” on paper. Transfer records early.',
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
              'Expect downtown and Bricktown vertical product; Midtown–Uptown walk-ups; Nichols Hills character SFH; Edmond HOA growth; Midwest City–Del City ranch and multi-unit stock.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by neighborhood and product. Budget for condo/HOA dues, older-building repair risk, and parking where relevant.',
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
            title: 'Downtown / Bricktown / Midtown urban lifestyle',
            detail:
              'Suits people prioritizing walkability and amenities — with elevator, parking, and event-day tradeoffs on move day.',
          },
          {
            title: 'Nichols Hills / Village character living',
            detail:
              'Often appeals for neighborhood feel and larger lots — with driveway geometry and municipal rule mix.',
          },
          {
            title: 'Edmond / north growth belts',
            detail:
              'Fits buyers chasing newer product and schools — with HOA rules and longer empty miles to the core.',
          },
          {
            title: 'Midwest City / Del City eastern living',
            detail:
              'Attracts households seeking relative value and eastern access — with older stock logistics and I-40 freeflow.',
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
              'State government, energy and professional services, healthcare systems, aviation and Tinker-adjacent logistics, education, and corporate campuses concentrate demand across the metro.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak freeway freeflow is real — including Canadian and Cleveland reverse commutes. Test peak routes before choosing solely on rent or purchase price.',
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
              'Oklahoma County stacks OKC urban cores, character neighborhoods, and north/east growth belts — different from Tulsa river-city patterns, Norman campus product, and statewide rural defaults.',
          },
          {
            title: 'Climate',
            detail:
              'Humid subtropical / southern plains climate with hot summers, severe-storm and tornado risk, and freeze-thaw winters. Plan outdoor staging, heat, and storm contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — school calendars, sports and event days, and storm season reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Oklahoma County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify OCC Household Goods Certificate status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Oklahoma County — official site',
        href: 'https://www.oklahomacounty.org/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Oklahoma City',
        href: 'https://www.okc.gov/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'City of Edmond',
        href: 'https://www.edmondok.gov/',
        external: true,
        note: 'North-metro growth municipality context',
      },
      {
        label: 'OKGO — Oklahoma 511 traveler info',
        href: 'https://okgo.ok.gov/',
        external: true,
        note: 'I-35 / I-40 / I-44 / I-235 / Kilpatrick before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with elevator/COI experience for downtown–Bricktown–Midtown product; stair and character-grid fluency for Uptown and Nichols Hills stock; HOA gate fluency for Edmond growth; honest I-35 · I-40 · I-44 · I-235 · Kilpatrick timing for cross-zone pairs. Verify OCC Household Goods Certificate for intrastate moves (even within city limits) and FMCSA for interstate legs before deposits.',
  lastReviewed: '2026-07-24',
});
