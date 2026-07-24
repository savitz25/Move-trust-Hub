import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeOkPack,
  OK_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/oklahoma/ok-shared';

/**
 * Canadian County, OK — Yukon / Mustang west OKC growth.
 * Not a downtown OKC rename; not Edmond north-metro clone.
 */
export const canadianCountyOkIntelligence: CountyIntelligencePack = finalizeOkPack({
  countySlug: 'canadian',
  hubTitle: 'Canadian County Moving Intelligence Hub',
  eyebrow:
    'Canadian County · Yukon–Mustang west OKC growth, El Reno stock & I-40 logistics',
  h1: 'Moving in Canadian County: Yukon & Mustang Growth, West-Metro Access & I-40 Logistics',
  heroOpener:
    'Canadian County is the west Oklahoma City growth engine — Yukon, Mustang, Piedmont, and El Reno — not a downtown Bricktown rename, not Edmond north-metro product, and not Norman campus stock. Expect HOA SFH density, townhome multi-family, El Reno older grids, rural-edge larger lots, and I-40 / Kilpatrick links / OK-4 freeflow that rewrites “local” estimates. A Yukon gated driveway, a Mustang school-calendar peak, a Piedmont long approach, and an El Reno downtown curb stack do not share truck access or crew skill. West-metro reverse commutes into Oklahoma County are real inputs. This hub is for people moving in Canadian County — Yukon / Mustang west growth — not a renamed downtown OKC page.',
  heroCredibility:
    'OCC Household Goods Certificate for intrastate · FMCSA for interstate · West OKC growth & I-40 / Kilpatrick logistics awareness · Curated listings',
  majorCorridors: 'I-40 · Kilpatrick links · OK-4 · local west-metro grid',
  whatMakesDifferent: {
    title: 'What makes moving in Canadian County different',
    intro:
      'These are Canadian County west-metro realities — Yukon–Mustang HOAs, El Reno grids, and I-40 freeflow — not downtown Oklahoma County elevators, not Edmond north growth alone, and not Cleveland County OU campus defaults.',
    bullets: [
      {
        title: 'West OKC growth is not downtown Oklahoma County product',
        detail:
          'Ignore Bricktown tower and Midtown walk-up defaults. Canadian County stacks Yukon and Mustang HOA density, school-calendar peaks, and I-40 / Kilpatrick empty miles that core OKC scripts underprice.',
      },
      {
        title: 'Yukon and Mustang HOA growth rewrites labor calendars',
        detail:
          'Gate lists, truck-length limits, and summer family peaks rewrite jobs that look suburban-simple on paper. Same-county El Reno older stock does not share that packet stack.',
      },
      {
        title: 'El Reno grids are not Piedmont larger-lot product',
        detail:
          'Older SFH, tighter residential curb, and downtown-adjacent staging differ from Piedmont and west fringe driveways. Same-county jobs still need product-specific surveys.',
      },
      {
        title: 'I-40, Kilpatrick links, and OK-4 burn portal time',
        detail:
          'Yukon ↔ Mustang, Piedmont ↔ El Reno, or Canadian County ↔ downtown OKC pairs look local and still burn 20–55+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'This is not Edmond and not Norman',
        detail:
          'North Edmond I-35 growth and Cleveland County OU cycles are different markets. Housing mix, corridors, and reverse-commute patterns into Oklahoma County differ.',
      },
      {
        title: 'Multi-county west-metro and interstate pairs are routine',
        detail:
          'Households regularly move Canadian County ↔ Oklahoma, Kingfisher, or Grady County, or out-of-state on I-40. An OCC Household Goods Certificate alone does not authorize interstate delivery — verify FMCSA when any leg leaves Oklahoma.',
      },
      OK_REG_BULLET,
    ],
  },
  zonesHeading: 'Canadian County access zones',
  zonesIntro:
    'Plan by Yukon growth HOAs, Mustang south-west multi-family, Piedmont larger-lot belts, El Reno grids, I-40 corridor commercial-residential edges, and rural west fringe — access rules cluster by product more than ZIP alone.',
  zones: [
    {
      id: 'yukon-growth',
      name: 'Yukon growth HOAs, multi-family & retail corridors',
      shortName: 'Yukon / growth',
      neighborhoods: [
        'Yukon',
        'Cornwell Drive corridors',
        'Garth Brooks Boulevard belts',
        'East Yukon growth edges',
        'West Yukon residential',
        'I-40 Yukon commercial-residential edges',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family, gated product',
      challenges: [
        'HOA gate lists, truck-length limits, and timed windows',
        'I-40 freeflow and OKC-bound peak congestion',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Collect HOA packets and gate codes early. Confirm truck length rules. Price I-40 honestly for eastbound unload pairs.',
      cityKeywords: [
        'yukon',
        'canadian county',
      ],
    },
    {
      id: 'mustang-southwest',
      name: 'Mustang, south-west growth & OK-4 belts',
      shortName: 'Mustang / SW',
      neighborhoods: [
        'Mustang',
        'OK-4 corridors',
        'South Mustang growth edges',
        'East Mustang multi-family',
        'Sara Road belts',
        'County-line growth edges',
      ],
      housingTypes: 'HOA SFH, multi-family, ranch and two-story stock',
      challenges: [
        'HOA and multi-unit mix across short distances',
        'OK-4 / I-40 freeflow',
        'School-calendar and family-peak volume',
      ],
      moverTips:
        'Collect HOA packets early. Clarify Mustang vs Oklahoma City addresses near edges. Price OK-4 honestly.',
      cityKeywords: [
        'mustang',
        'yukon',
      ],
    },
    {
      id: 'piedmont-north',
      name: 'Piedmont, north growth & larger-lot belts',
      shortName: 'Piedmont / north',
      neighborhoods: [
        'Piedmont',
        'North Canadian County corridors',
        'Larger-lot growth edges',
        'Kilpatrick north links',
        'County-line residential',
        'Northwest fringe stock',
      ],
      housingTypes: 'HOA SFH, larger lots, limited multi-unit',
      challenges: [
        'Longer approaches and driveway geometry',
        'Kilpatrick / local freeflow toward OKC',
        'Empty miles vs Yukon and downtown pairs',
      ],
      moverTips:
        'Photo driveway turnarounds. Price empty miles honestly. Collect HOA packets when present.',
      cityKeywords: [
        'piedmont',
        'yukon',
      ],
    },
    {
      id: 'el-reno-grids',
      name: 'El Reno downtown grids, older SFH & west core stock',
      shortName: 'El Reno / core',
      neighborhoods: [
        'El Reno',
        'Downtown El Reno',
        'Route 66 corridors',
        'Central residential grids',
        'West El Reno edges',
        'I-40 El Reno belts',
      ],
      housingTypes: 'Older SFH, bungalows, multi-unit pockets, ranch stock',
      challenges: [
        'Basement stairs and tighter residential curb',
        'I-40 freeflow and longer empty miles vs Yukon',
        'Mixed older stock and long carries',
      ],
      moverTips:
        'Survey older stock carefully. Photo curb and driveway access. Prefer mid-week starts.',
      cityKeywords: [
        'el reno',
        'elreno',
      ],
    },
    {
      id: 'i40-corridor-edges',
      name: 'I-40 corridor commercial-residential & mid-county belts',
      shortName: 'I-40 corridor',
      neighborhoods: [
        'I-40 mid-county belts',
        'Banner edges',
        'Union City edges',
        'Commercial-residential mix',
        'Service-road residential pockets',
        'Cross-county approach edges',
      ],
      housingTypes: 'Mixed SFH, multi-unit, industrial-adjacent residential',
      challenges: [
        'I-40 freeflow and freight traffic',
        'Mixed curb and driveway product',
        'Cross-zone empty miles common',
      ],
      moverTips:
        'Price I-40 honestly. Confirm industrial-adjacent staging limits. Clarify load and unload city lines.',
      cityKeywords: [
        'yukon',
        'el reno',
        'union city',
        'banner',
      ],
    },
    {
      id: 'west-rural-fringe',
      name: 'West rural fringe, larger lots & farm-edge approaches',
      shortName: 'West rural fringe',
      neighborhoods: [
        'West Canadian County fringe',
        'Farm-edge residential',
        'Larger-lot corridors',
        'Calumet edges',
        'Okarche edges',
        'Rural approach roads',
      ],
      housingTypes: 'Larger-lot SFH, ranch stock, farm-edge homes',
      challenges: [
        'Soft shoulders, pitch, and turnaround limits',
        'Long empty miles vs Yukon and OKC',
        'Gate codes and long driveways',
      ],
      moverTips:
        'Survey approach roads before crew day. Confirm truck length and turnarounds. Price empty miles honestly.',
      cityKeywords: [
        'calumet',
        'okarche',
        'el reno',
        'canadian county',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Canadian County moving costs',
    intro:
      'HOA admin, driveway access, and I-40 / Kilpatrick freeflow move the number more than packing skill alone — this is west-metro growth logistics, not downtown OKC tower pricing.',
    drivers: [
      {
        title: 'HOA gates, truck-length limits & timed windows',
        detail:
          'Yukon and Mustang packets rewrite jobs that look simple on a map.',
      },
      {
        title: 'I-40 · Kilpatrick links · OK-4 congestion',
        detail:
          'West-metro and OKC pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'El Reno older stock & basement stairs',
        detail:
          'Grid product adds flight counts and curb constraints that new HOA driveways do not share.',
      },
      {
        title: 'Piedmont & rural longer approaches',
        detail:
          'Driveway geometry and empty miles raise labor before packing skill matters.',
      },
      {
        title: 'Multi-county & interstate empty miles',
        detail:
          'Oklahoma County, Kingfisher, and out-of-state destinations raise staging distance and authority complexity when leaving Canadian County or Oklahoma.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,800+',
        note: 'Higher with HOA constraints or peak I-40 pairs',
      },
      {
        label: '2–3BR condo, townhome, or mid-size SFH',
        value: '$1,400–$4,200+',
        note: 'HOA soft costs and stairs trend up',
      },
      {
        label: '3–4+ BR / HOA / cross-zone',
        value: '$2,800–$8,500+',
        note: 'Large HOA homes and long I-40 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$195+/hr',
        note: 'Portal-to-portal; packing, HOA admin, and empty miles scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Canadian County move',
    intro:
      'School calendars, summer heat, severe-storm and tornado season, and winter ice reshape access and crew availability across the west metro.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease HOA windows, and reduce I-40 / Kilpatrick pain. Avoid month-end Fridays when leases and family moves collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family school calendars and multi-family turnover fill first. Book 2–4 weeks ahead for peak weekends and HOA slots.',
      },
      {
        title: 'Severe-storm & tornado-season risk',
        detail:
          'Spring and early summer storms raise cancellation and staging risk. Prefer flexible dates and covered staging plans.',
      },
      {
        title: 'Summer heat & winter ice',
        detail:
          'June–August heat and freeze-thaw winters reshape outdoor labor. Prefer early starts and weather contingency.',
      },
    ],
  },
  specialized: [
    {
      id: 'canadian-hoa-i40',
      title: 'West-metro HOA, Yukon–Mustang & I-40 logistics module',
      intro:
        'Canadian County estimates fail more often on HOA packets, driveway surveys, and I-40 freeflow than on packing skill alone.',
      bullets: [
        'Collect HOA packets and gate codes early for Yukon and Mustang product.',
        'Photo driveway geometry, curb options, and approach roads for Piedmont and rural fringe.',
        'Price portal-to-portal time for any pair that rides I-40, Kilpatrick links, or OK-4 at peak.',
        'Survey older El Reno stock carefully for stairs and curb limits.',
        'Clarify Yukon, Mustang, Piedmont, El Reno, and unincorporated addresses on every estimate.',
        'For in-state jobs verify OCC Household Goods Certificate; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-downtown-okc-not-edmond',
      title: 'Not downtown OKC · not Edmond · not Norman module',
      intro:
        'A single “OKC metro rate” collapses when Canadian County west growth is confused with Bricktown elevators, Edmond north I-35 product, or Norman OU campus calendars.',
      bullets: [
        'Do not price Yukon HOAs like downtown OKC towers or like OU near-campus walk-ups.',
        'Keep Canadian vs Oklahoma vs Kingfisher county lines clear on multi-address estimates.',
        'Match school-calendar peaks separately from downtown lease waves.',
        'Treat out-of-state legs as interstate authority problems — OCC alone is not enough for interstate delivery.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Canadian County?',
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
              'Canadian County spans Yukon, Mustang, Piedmont, El Reno, and other systems. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
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
              'Local campuses plus INTEGRIS, Mercy, OU Health, and other Oklahoma County systems anchor care for Canadian County households. Confirm insurance networks.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-40 and Kilpatrick freeflow change “nearby” on paper. Transfer records early.',
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
              'Expect Yukon and Mustang HOA SFH and multi-family; Piedmont larger-lot growth; El Reno older grids; rural west fringe ranch stock — not downtown OKC vertical product.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by city and product. Budget for HOA dues, commute fuel, and older-building repair risk where relevant.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Associations often control move hours, truck size, and deposits. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Yukon growth lifestyle',
            detail:
              'Fits buyers chasing newer product, retail access, and schools — with HOA rules and I-40 freeflow.',
          },
          {
            title: 'Mustang south-west living',
            detail:
              'Attracts households seeking growth product and school communities — with multi-unit and HOA mix.',
          },
          {
            title: 'Piedmont larger-lot living',
            detail:
              'Often appeals for space and north-west positioning — with longer approaches and empty miles.',
          },
          {
            title: 'El Reno core living',
            detail:
              'Suits people prioritizing relative value and historic-grid character — with older stock logistics.',
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
              'Local retail and services, education, logistics along I-40, and reverse-commute links into Oklahoma County employment centers concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-40 and Kilpatrick freeflow into OKC is real. Test peak routes before choosing solely on rent or purchase price.',
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
              'Canadian County stacks west-metro growth suburbs and El Reno grids — different from downtown OKC, Edmond north product, and Norman campus living.',
          },
          {
            title: 'Climate',
            detail:
              'Southern plains climate with hot summers, severe-storm and tornado risk, and freeze-thaw winters. Plan outdoor staging, heat, and storm contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — school calendars, commute peaks, and storm season reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Canadian County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify OCC Household Goods Certificate status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Canadian County, Oklahoma — official site',
        href: 'https://www.canadiancounty.org/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Yukon',
        href: 'https://www.yukonok.gov/',
        external: true,
        note: 'West growth municipality context',
      },
      {
        label: 'City of Mustang',
        href: 'https://www.cityofmustang.org/',
        external: true,
        note: 'South-west growth municipality context',
      },
      {
        label: 'OKGO — Oklahoma 511 traveler info',
        href: 'https://okgo.ok.gov/',
        external: true,
        note: 'I-40 / Kilpatrick / OK-4 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with HOA gate fluency for Yukon–Mustang product; older-grid and stair fluency for El Reno stock; honest I-40 · Kilpatrick links · OK-4 timing for west-metro and OKC pairs. This is west OKC growth — not a downtown Bricktown rename. Verify OCC Household Goods Certificate for intrastate moves (even within city limits) and FMCSA for interstate legs before deposits.',
  lastReviewed: '2026-07-24',
});
