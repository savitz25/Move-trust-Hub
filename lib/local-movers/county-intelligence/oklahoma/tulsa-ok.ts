import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeOkPack,
  OK_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/oklahoma/ok-shared';

/**
 * Tulsa County, OK — Tulsa metro core / Arkansas River city.
 * Distinct river-city product from OKC — not Oklahoma County clone.
 */
export const tulsaCountyOkIntelligence: CountyIntelligencePack = finalizeOkPack({
  countySlug: 'tulsa',
  hubTitle: 'Tulsa County Moving Intelligence Hub',
  eyebrow:
    'Tulsa County · river-city core, Broken Arrow growth & I-44 / Creek Turnpike logistics',
  h1: 'Moving in Tulsa County: River-City Access, Neighborhood Grids & I-44 / Creek Turnpike Logistics',
  heroOpener:
    'Tulsa County is Oklahoma’s second metro core — a distinct Arkansas River city, not an Oklahoma County / OKC rename and not a Claremore fringe script. Expect downtown and Blue Dome elevator product, Brookside and Cherry Street walk-ups, Midtown character grids, Broken Arrow and Bixby growth HOAs, Jenks and south river stock, Owasso north multi-unit, and I-44 / I-244 / US-75 / US-169 / Creek Turnpike freeflow that rewrites “local” estimates. A Gathering Place–adjacent curb stack, a Brookside stair carry, a Broken Arrow gated driveway, and a south Tulsa ranch do not share truck access or crew skill. Corporate, healthcare, and energy relocation waves are real inputs. This hub is for people moving in Tulsa County — river-city metro — not a renamed OKC page.',
  heroCredibility:
    'OCC Household Goods Certificate for intrastate · FMCSA for interstate · Tulsa river-city access & I-44 / Creek Turnpike logistics awareness · Curated listings',
  majorCorridors: 'I-44 · I-244 · US-75 · US-169 · Creek Turnpike · local arterial grid',
  whatMakesDifferent: {
    title: 'What makes moving in Tulsa County different',
    intro:
      'These are Tulsa river-city realities — downtown elevators, Brookside stairs, Broken Arrow HOAs, and I-44 / Creek Turnpike freeflow — not Oklahoma County capitol product and not Rogers County Claremore-fringe defaults alone.',
    bullets: [
      {
        title: 'Tulsa is a river city — not an OKC clone',
        detail:
          'Ignore Bricktown tower templates and Kilpatrick-only freeflow assumptions. Tulsa stacks Arkansas River bridges, I-244 loops, Creek Turnpike belts, and Midtown character product with different empty-mile and access patterns than Oklahoma County.',
      },
      {
        title: 'Downtown, Blue Dome, and Pearl District vertical product rewrite labor',
        detail:
          'Elevator reservations, building COIs, dock slots, and scarce curb dominate core jobs. A Broken Arrow cul-de-sac does not share that logistics stack.',
      },
      {
        title: 'Brookside, Cherry Street, and Midtown stairs underprice flat-rate optimism',
        detail:
          'Walk-ups, basements, tight residential curb, and Peoria / 15th Street freeflow fail estimates more often than packing skill alone.',
      },
      {
        title: 'Broken Arrow, Bixby, and Jenks growth is HOA- and school-calendar driven',
        detail:
          'Gate lists, truck-length limits, and summer family peaks rewrite jobs that look suburban-simple on paper. Same-county downtown product does not share that stack.',
      },
      {
        title: 'I-44, I-244, US-75, US-169, and Creek Turnpike burn portal time',
        detail:
          'Downtown ↔ Broken Arrow, Brookside ↔ Owasso, or Jenks ↔ Midtown pairs look local and still burn 25–60+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Multi-county NE Oklahoma and interstate pairs are routine',
        detail:
          'Households regularly move Tulsa County ↔ Rogers, Wagoner, Creek, or Osage County, or out-of-state on I-44 / US-75. An OCC Household Goods Certificate alone does not authorize interstate delivery — verify FMCSA when any leg leaves Oklahoma.',
      },
      OK_REG_BULLET,
    ],
  },
  zonesHeading: 'Tulsa County access zones',
  zonesIntro:
    'Plan by downtown–Blue Dome vertical product, Brookside–Cherry Street neighborhood stock, Midtown character grids, Broken Arrow–east growth HOAs, Jenks–Bixby south river belts, and Owasso–north multi-unit — access rules cluster by product more than ZIP alone.',
  zones: [
    {
      id: 'downtown-blue-dome',
      name: 'Downtown Tulsa, Blue Dome, Pearl District & core towers',
      shortName: 'Downtown / Blue Dome',
      neighborhoods: [
        'Downtown Tulsa',
        'Blue Dome District',
        'Pearl District edges',
        'Arts District edges',
        'Guthrie Green edges',
        'Deco District corridors',
      ],
      housingTypes: 'High-rise condo, loft conversions, mid-rise multifamily',
      challenges: [
        'Elevator reservations, dock slots, and building COIs',
        'Limited legal curb and event-day freeflow',
        'I-244 / US-75 approach congestion',
      ],
      moverTips:
        'Book elevators and COIs in writing before the crew day. Prefer mid-week early freight windows. Photo dock or curb staging options.',
      cityKeywords: [
        'tulsa',
        'downtown tulsa',
        'blue dome',
        'pearl district',
      ],
    },
    {
      id: 'brookside-cherry-street',
      name: 'Brookside, Cherry Street, Gathering Place edges & Midtown walk-ups',
      shortName: 'Brookside / Cherry St',
      neighborhoods: [
        'Brookside',
        'Cherry Street',
        'Gathering Place edges',
        'Maple Ridge edges',
        'Swan Lake edges',
        'Peoria Avenue corridors',
      ],
      housingTypes: 'Walk-up multifamily, older SFH, duplexes, limited elevators',
      challenges: [
        'Multi-flight stairs and scarce truck length',
        'Tight residential curb and restaurant-corridor freeflow',
        'Riverside Drive / Peoria congestion',
      ],
      moverTips:
        'Survey stair counts with photos. Prefer mid-week starts near corridor peaks. Inventory basements carefully.',
      cityKeywords: [
        'brookside',
        'cherry street',
        'tulsa',
        'maple ridge',
      ],
    },
    {
      id: 'midtown-utica-corridor',
      name: 'Midtown, Utica Square belts & central character grids',
      shortName: 'Midtown / Utica',
      neighborhoods: [
        'Midtown Tulsa',
        'Utica Square edges',
        'Florence Park edges',
        'Gilcrease edges',
        '21st Street corridors',
        'Lewis Avenue corridors',
      ],
      housingTypes: 'Character SFH, multi-unit pockets, some elevators',
      challenges: [
        'Tree-lined curb, long carries, and driveway geometry',
        'Mixed multi-unit and SFH rules across short distances',
        'I-244 / local arterial freeflow',
      ],
      moverTips:
        'Photo driveway and curb options. Confirm multi-unit rules early. Protect older interiors and landscaping.',
      cityKeywords: [
        'midtown tulsa',
        'utica',
        'tulsa',
      ],
    },
    {
      id: 'broken-arrow-east',
      name: 'Broken Arrow, east growth HOAs & Creek Turnpike belts',
      shortName: 'Broken Arrow / east',
      neighborhoods: [
        'Broken Arrow',
        'East Tulsa corridors',
        'Creek Turnpike belts',
        'Kenwood edges',
        'Lynn Lane corridors',
        'Aspen Creek edges',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family, gated product',
      challenges: [
        'HOA gate lists, truck-length limits, and timed windows',
        'Creek Turnpike / US-169 freeflow and longer empty miles vs downtown',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Collect HOA packets and gate codes early. Confirm truck length rules. Price Creek Turnpike honestly for westbound unload pairs.',
      cityKeywords: [
        'broken arrow',
        'tulsa',
      ],
    },
    {
      id: 'jenks-bixby-south',
      name: 'Jenks, Bixby, Glenpool edges & south river belts',
      shortName: 'Jenks / Bixby',
      neighborhoods: [
        'Jenks',
        'Bixby',
        'Glenpool edges',
        'South Tulsa corridors',
        'Riverfront south edges',
        'US-75 south belts',
      ],
      housingTypes: 'HOA SFH, multi-family, ranch and two-story stock',
      challenges: [
        'US-75 / Creek Turnpike freeflow',
        'Mixed growth product and longer carries',
        'Cross-zone empty miles common',
      ],
      moverTips:
        'Price US-75 honestly. Clarify Jenks, Bixby, Glenpool, and Tulsa addresses. Collect HOA packets when present.',
      cityKeywords: [
        'jenks',
        'bixby',
        'glenpool',
        'tulsa',
      ],
    },
    {
      id: 'owasso-north',
      name: 'Owasso, north Tulsa multi-unit & US-169 belts',
      shortName: 'Owasso / north',
      neighborhoods: [
        'Owasso',
        'North Tulsa corridors',
        'US-169 belts',
        'Sperry edges',
        'Collinsville edges',
        'I-44 north commercial-residential edges',
      ],
      housingTypes: 'Multi-family, HOA SFH, ranch and newer stock',
      challenges: [
        'US-169 / I-44 freeflow',
        'Multi-unit turnover and curb limits',
        'Municipal mix across short distances',
      ],
      moverTips:
        'Confirm municipality on the estimate. Prefer mid-week multi-unit starts. Price north approach freeflow for downtown pairs.',
      cityKeywords: [
        'owasso',
        'tulsa',
        'collinsville',
        'sperry',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Tulsa County moving costs',
    intro:
      'Access product, elevator/HOA admin, and I-44 / Creek Turnpike freeflow move the number more than packing skill alone — this is Tulsa river-city logistics, not Oklahoma County OKC pricing.',
    drivers: [
      {
        title: 'Elevator reservations, docks & building COIs',
        detail:
          'Downtown, Blue Dome, and Pearl District vertical product add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'Walk-up stairs, basements & Brookside-grid curb',
        detail:
          'Brookside, Cherry Street, and Midtown stock add flight counts that flat-rate optimism underprices.',
      },
      {
        title: 'I-44 · I-244 · US-75 · US-169 · Creek Turnpike congestion',
        detail:
          'Cross-metro pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Broken Arrow & south growth HOA gates',
        detail:
          'East and south packets rewrite jobs that look simple on a map.',
      },
      {
        title: 'Multi-county & interstate empty miles',
        detail:
          'Rogers, Wagoner, Creek, and out-of-state destinations raise staging distance and authority complexity when leaving Tulsa County or Oklahoma.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,900+',
        note: 'Higher with elevators, walk-ups, or peak I-44 / Creek pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,500–$4,500+',
        note: 'Stairs, COI, and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR / high-rise / cross-zone',
        value: '$3,000–$9,500+',
        note: 'Tower moves and long US-169 / Creek pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$200+/hr',
        note: 'Portal-to-portal; packing, COI admin, and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Tulsa County move',
    intro:
      'Lease cycles, school calendars, summer heat, severe-storm and tornado season, and winter ice reshape access and crew availability across the Tulsa grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease downtown freight windows, and reduce I-44 / I-244 / Creek pain. Avoid month-end Fridays when leases and elevators collide.',
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
      id: 'tulsa-elevator-hoa',
      title: 'Tulsa elevator, neighborhood & Creek Turnpike logistics module',
      intro:
        'Tulsa County estimates fail more often on stair surveys, elevator packets, HOA gates, and freeway freeflow than on packing skill alone.',
      bullets: [
        'Collect building COI, elevator reservations, and dock rules before the survey is final.',
        'Photo stair counts, curb options, and basement access for Brookside, Cherry Street, and Midtown stock.',
        'Price portal-to-portal time for any pair that rides I-44, I-244, US-75, US-169, or Creek Turnpike at peak.',
        'Collect HOA packets early for Broken Arrow, Bixby, and Jenks product.',
        'Clarify Tulsa, Broken Arrow, Jenks, Bixby, Owasso, and other municipal addresses on every estimate.',
        'For in-state jobs verify OCC Household Goods Certificate; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-okc-not-rogers-fringe',
      title: 'Not Oklahoma County / OKC · not Rogers fringe module',
      intro:
        'A single “Oklahoma metro rate” collapses when Tulsa river-city product is confused with Oklahoma County capitol logistics or Rogers County Claremore–Catoosa fringe alone.',
      bullets: [
        'Do not price Blue Dome elevators like Bricktown defaults or like Claremore ranch driveways as interchangeable.',
        'Keep Tulsa vs Rogers vs Wagoner vs Creek county lines clear on multi-address estimates.',
        'Match downtown lease peaks separately from Broken Arrow school-calendar waves.',
        'Treat out-of-state legs as interstate authority problems — OCC alone is not enough for interstate delivery.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Tulsa County?',
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
              'Tulsa County spans Tulsa Public Schools plus Broken Arrow, Jenks, Bixby, Owasso, Union, and other systems. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
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
              'Saint Francis Health System, Hillcrest, Ascension St. John, and specialty campuses anchor care across Tulsa County. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-44, I-244, and Creek Turnpike freeflow change “nearby” on paper. Transfer records early.',
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
              'Expect downtown and Blue Dome vertical product; Brookside–Cherry Street walk-ups; Midtown character SFH; Broken Arrow–Bixby–Jenks HOA growth; Owasso multi-unit and ranch stock.',
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
            title: 'Downtown / Blue Dome / Midtown urban lifestyle',
            detail:
              'Suits people prioritizing walkability and amenities — with elevator, parking, and event-day tradeoffs on move day.',
          },
          {
            title: 'Brookside / Cherry Street character living',
            detail:
              'Often appeals for neighborhood feel — with stairs, curb limits, and denser staging constraints.',
          },
          {
            title: 'Broken Arrow / east growth belts',
            detail:
              'Fits buyers chasing newer product and schools — with HOA rules and longer empty miles to the core.',
          },
          {
            title: 'Jenks / Bixby south river living',
            detail:
              'Attracts households seeking south growth and schools — with US-75 freeflow and HOA packets where present.',
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
              'Energy and professional services, healthcare systems, aerospace and manufacturing, education, and corporate campuses concentrate demand across the metro.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak freeway freeflow is real — including Rogers and Wagoner reverse commutes. Test peak routes before choosing solely on rent or purchase price.',
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
              'Tulsa County stacks river-city urban cores, classic neighborhood grids, and east/south growth suburbs — different from Oklahoma County OKC product and from Rogers County fringe patterns alone.',
          },
          {
            title: 'Climate',
            detail:
              'Humid subtropical / southern plains climate with hot summers, severe-storm and tornado risk, and freeze-thaw winters. Plan outdoor staging, heat, and storm contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — school calendars, arts and event days, and storm season reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Tulsa County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify OCC Household Goods Certificate status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Tulsa County — official site',
        href: 'https://www.tulsacounty.org/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Tulsa',
        href: 'https://www.cityoftulsa.org/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'City of Broken Arrow',
        href: 'https://www.brokenarrowok.gov/',
        external: true,
        note: 'East growth municipality context',
      },
      {
        label: 'OKGO — Oklahoma 511 traveler info',
        href: 'https://okgo.ok.gov/',
        external: true,
        note: 'I-44 / I-244 / US-75 / US-169 / Creek Turnpike before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with elevator/COI experience for downtown–Blue Dome product; stair and grid fluency for Brookside–Cherry Street and Midtown stock; HOA gate fluency for Broken Arrow–Jenks–Bixby; honest I-44 · I-244 · US-75 · US-169 · Creek Turnpike timing for cross-zone pairs. Verify OCC Household Goods Certificate for intrastate moves (even within city limits) and FMCSA for interstate legs before deposits.',
  lastReviewed: '2026-07-24',
});
