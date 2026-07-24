import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeOkPack,
  OK_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/oklahoma/ok-shared';

/**
 * Cleveland County, OK — Norman / OU / Moore south-metro.
 * NOT Cleveland, Ohio. NOT Oklahoma County downtown OKC rename.
 */
export const clevelandCountyOkIntelligence: CountyIntelligencePack = finalizeOkPack({
  countySlug: 'cleveland',
  hubTitle: 'Cleveland County Moving Intelligence Hub',
  eyebrow:
    'Cleveland County, OK · Norman / OU campus, Moore growth & I-35 logistics',
  h1: 'Moving in Cleveland County, OK: Norman Access, OU Campus Cycles & I-35 South Logistics',
  heroOpener:
    'Cleveland County, Oklahoma is Norman, Moore, and the south OKC metro — not Cleveland, Ohio, not downtown Oklahoma County tower product, and not a Yukon / Canadian County west-growth clone. Expect University of Oklahoma campus multi-unit density, Campus Corner walk-ups, Norman character grids, Moore HOA growth, Noble and Lexington fringe stock, and I-35 / US-77 / OK-9 freeflow that rewrites “local” estimates. A near-campus stair stack, a Lake Thunderbird edge driveway, a Moore townhome gate list, and a rural-edge long carry do not share truck access or crew skill. August and January lease waves are real inputs. This hub is for people moving in Cleveland County, OK — Norman / OU — not Cleveland, Ohio and not a renamed OKC core page.',
  heroCredibility:
    'OCC Household Goods Certificate for intrastate · FMCSA for interstate · Norman / OU campus & I-35 logistics awareness · Curated listings',
  majorCorridors: 'I-35 · US-77 · OK-9 · local Norman grid',
  whatMakesDifferent: {
    title: 'What makes moving in Cleveland County different',
    intro:
      'These are Cleveland County, Oklahoma realities — OU multi-unit, Norman grids, Moore growth, and I-35 freeflow — not Cleveland Ohio lakefront product, not Oklahoma County Bricktown elevators alone, and not Canadian County west-metro HOAs alone.',
    bullets: [
      {
        title: 'This is Cleveland County, Oklahoma — NOT Cleveland, Ohio',
        detail:
          'Ignore Lake Erie, Cuyahoga, and I-90 templates entirely. Cleveland County OK is Norman–Moore south-metro product on I-35 with OU campus density and Oklahoma Corporation Commission authority — not Ohio PUCO scripts or Midwest lakefront logistics.',
      },
      {
        title: 'University of Oklahoma lease waves rewrite calendars and labor',
        detail:
          'Near-campus walk-ups, limited elevators, and August/January turnover compress demand. Flat-rate optimism from Moore HOA driveways underprices stair counts and curb scarcity.',
      },
      {
        title: 'Norman character grids are not Moore growth product',
        detail:
          'Older SFH, Campus Corner multi-unit, and tight curb differ from Moore HOA packets and south growth multi-family. Same-county jobs still need product-specific surveys.',
      },
      {
        title: 'I-35, US-77, and OK-9 burn portal time',
        detail:
          'Norman ↔ Moore, campus ↔ east Norman, or Cleveland County ↔ Oklahoma County pairs look local and still burn 20–50+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'This is not downtown Oklahoma County / OKC core',
        detail:
          'Bricktown tower and Midtown elevator defaults underprice Norman campus stairs and overprice simple Moore cul-de-sacs when applied blindly. Housing mix and freeflow differ.',
      },
      {
        title: 'Multi-county south-metro and interstate pairs are routine',
        detail:
          'Households regularly move Cleveland County ↔ Oklahoma, McClain, or Pottawatomie County, or out-of-state on I-35. An OCC Household Goods Certificate alone does not authorize interstate delivery — verify FMCSA when any leg leaves Oklahoma.',
      },
      OK_REG_BULLET,
    ],
  },
  zonesHeading: 'Cleveland County access zones',
  zonesIntro:
    'Plan by OU campus-adjacent multi-unit, Campus Corner–downtown Norman stock, east Norman residential belts, Moore growth HOAs, Noble–Lexington southern fringe, and west/OK-9 larger-lot edges — access rules cluster by product more than ZIP alone.',
  zones: [
    {
      id: 'ou-campus-belt',
      name: 'University of Oklahoma campus-adjacent multi-unit',
      shortName: 'OU campus belt',
      neighborhoods: [
        'OU campus edges',
        'Lindsey Street corridors',
        'Brooks Street edges',
        'Student multi-unit belts',
        'Asp Avenue corridors',
        'University Boulevard edges',
      ],
      housingTypes: 'Walk-up multifamily, student housing, limited elevators',
      challenges: [
        'August/January lease-wave curb collapse',
        'Stairs, tight parking, and scarce truck length',
        'Campus event and game-day freeflow',
      ],
      moverTips:
        'Book well ahead of semester peaks. Survey stair counts with photos. Prefer early mid-week non-game windows.',
      cityKeywords: [
        'norman',
        'university of oklahoma',
        'ou',
      ],
    },
    {
      id: 'campus-corner-downtown-norman',
      name: 'Campus Corner, downtown Norman & central multi-unit',
      shortName: 'Campus Corner / downtown',
      neighborhoods: [
        'Campus Corner',
        'Downtown Norman',
        'Main Street corridors',
        'Boyd Street edges',
        'Central multi-unit pockets',
        'Historic core residential',
      ],
      housingTypes: 'Walk-up multifamily, older SFH, limited elevators, loft pockets',
      challenges: [
        'Multi-flight stairs and scarce curb',
        'Restaurant and retail corridor freeflow',
        'US-77 / local arterial congestion',
      ],
      moverTips:
        'Photo curb options on commercial-adjacent blocks. Inventory walk-ups carefully. Prefer mid-week starts.',
      cityKeywords: [
        'norman',
        'campus corner',
        'downtown norman',
      ],
    },
    {
      id: 'east-norman-residential',
      name: 'East Norman residential belts & Lake Thunderbird edges',
      shortName: 'East Norman',
      neighborhoods: [
        'East Norman corridors',
        'Lake Thunderbird edges',
        'Alameda corridors',
        '12th Avenue SE belts',
        'Hall Park edges',
        'OK-9 east residential edges',
      ],
      housingTypes: 'SFH, multi-family, lake-adjacent and larger-lot stock',
      challenges: [
        'Longer carries and driveway geometry',
        'OK-9 / local freeflow toward campus',
        'Mixed HOA and non-HOA rules',
      ],
      moverTips:
        'Photo driveway turnarounds. Price empty miles to campus and Moore pairs. Collect HOA packets when present.',
      cityKeywords: [
        'norman',
        'hall park',
        'lake thunderbird',
      ],
    },
    {
      id: 'moore-growth',
      name: 'Moore growth HOAs, multi-family & I-35 belts',
      shortName: 'Moore / growth',
      neighborhoods: [
        'Moore',
        'I-35 Moore corridors',
        'Telephone Road belts',
        'SW 19th corridors',
        'Eastern Moore growth edges',
        'North Moore commercial-residential edges',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family, ranch stock',
      challenges: [
        'HOA gate lists, truck-length limits, and timed windows',
        'I-35 freeflow and OKC-bound peak congestion',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Collect HOA packets and gate codes early. Confirm truck length rules. Price I-35 honestly for Norman and OKC pairs.',
      cityKeywords: [
        'moore',
        'norman',
      ],
    },
    {
      id: 'noble-lexington-south',
      name: 'Noble, Lexington & southern fringe stock',
      shortName: 'Noble / Lexington',
      neighborhoods: [
        'Noble',
        'Lexington',
        'Southern US-77 corridors',
        'Rural-edge residential',
        'I-35 south edges',
        'Larger-lot fringe belts',
      ],
      housingTypes: 'SFH, ranch stock, larger lots, limited multi-unit',
      challenges: [
        'Longer empty miles and soft-shoulder approaches',
        'US-77 / I-35 freeflow',
        'Driveway pitch and turnaround limits',
      ],
      moverTips:
        'Survey approach roads and turnarounds. Price empty miles honestly. Clarify municipal vs county addresses.',
      cityKeywords: [
        'noble',
        'lexington',
        'norman',
      ],
    },
    {
      id: 'west-norman-ok9',
      name: 'West Norman, OK-9 belts & larger-lot edges',
      shortName: 'West Norman / OK-9',
      neighborhoods: [
        'West Norman corridors',
        'OK-9 west belts',
        'Highway 9 commercial-residential edges',
        'Larger-lot west edges',
        'McClain County line edges',
        'West growth multi-family pockets',
      ],
      housingTypes: 'SFH, multi-family pockets, larger-lot and HOA mix',
      challenges: [
        'OK-9 freeflow and cross-county empty miles',
        'Mixed curb and driveway product',
        'Growth construction staging constraints',
      ],
      moverTips:
        'Price OK-9 and I-35 approach honestly. Confirm HOA rules early. Photo long driveway access.',
      cityKeywords: [
        'norman',
        'west norman',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Cleveland County moving costs',
    intro:
      'Access product, campus stairs, HOA admin, and I-35 freeflow move the number more than packing skill alone — this is Cleveland County OK / Norman logistics, not Cleveland Ohio pricing and not downtown OKC tower defaults.',
    drivers: [
      {
        title: 'Campus walk-ups, stairs & lease-wave curb',
        detail:
          'OU-adjacent multi-unit adds flight counts and scarce staging that flat-rate optimism underprices — especially August and January.',
      },
      {
        title: 'Norman character grids & downtown curb',
        detail:
          'Campus Corner and central stock add stair and parking constraints that Moore cul-de-sacs do not share.',
      },
      {
        title: 'I-35 · US-77 · OK-9 congestion',
        detail:
          'Cross-zone and OKC pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Moore HOA gates & truck-length rules',
        detail:
          'Growth packets rewrite jobs that look simple on a map.',
      },
      {
        title: 'Multi-county & interstate empty miles',
        detail:
          'Oklahoma County, McClain, and out-of-state destinations raise staging distance and authority complexity when leaving Cleveland County or Oklahoma.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,800+',
        note: 'Higher with campus stairs, walk-ups, or peak I-35 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,400–$4,200+',
        note: 'Stairs, COI, and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR / campus peak / cross-zone',
        value: '$2,800–$8,500+',
        note: 'Semester peaks and long I-35 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$195+/hr',
        note: 'Portal-to-portal; packing, stairs, and campus timing scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Cleveland County move',
    intro:
      'OU lease cycles, school calendars, summer heat, severe-storm and tornado season, and winter ice reshape access and crew availability across Norman and Moore.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease campus freeflow, and reduce I-35 pain. Avoid month-end Fridays and semester move-in weekends when possible.',
      },
      {
        title: 'Peak season: late May–mid-September + January turnover',
        detail:
          'OU lease waves and family school calendars fill first. Book 2–4 weeks ahead for peak weekends and multi-unit slots — earlier for August campus belts.',
      },
      {
        title: 'Severe-storm & tornado-season risk',
        detail:
          'Spring and early summer storms raise cancellation and staging risk. Prefer flexible dates and covered staging plans.',
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
      id: 'cleveland-ou-campus-hoa',
      title: 'OU campus, Norman grid & I-35 logistics module',
      intro:
        'Cleveland County estimates fail more often on campus stair surveys, lease-wave timing, HOA gates, and I-35 freeflow than on packing skill alone.',
      bullets: [
        'Book campus-adjacent jobs well ahead of August and January lease waves.',
        'Photo stair counts, curb options, and parking for near-campus and Campus Corner stock.',
        'Price portal-to-portal time for any pair that rides I-35, US-77, or OK-9 at peak.',
        'Collect HOA packets early for Moore growth product.',
        'Clarify Norman, Moore, Noble, Lexington, and unincorporated addresses on every estimate.',
        'For in-state jobs verify OCC Household Goods Certificate; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-cleveland-ohio-not-okc-core',
      title: 'Not Cleveland Ohio · not Oklahoma County core module',
      intro:
        'A single “Cleveland” or “OKC metro rate” collapses when Norman / OU product is confused with Cleveland, Ohio lakefront logistics or Oklahoma County downtown tower defaults.',
      bullets: [
        'Never apply Cleveland, Ohio or Cuyahoga County assumptions to Cleveland County, Oklahoma.',
        'Do not price OU walk-ups like Bricktown elevators or like Yukon HOA driveways as interchangeable defaults.',
        'Keep Cleveland vs Oklahoma vs McClain county lines clear on multi-address estimates.',
        'Match campus lease peaks separately from Moore school-calendar waves.',
        'Treat out-of-state legs as interstate authority problems — OCC alone is not enough for interstate delivery.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Cleveland County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit. This is Cleveland County, Oklahoma (Norman / Moore), not Cleveland, Ohio.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Cleveland County spans Norman Public Schools, Moore Public Schools, Noble, Lexington, and other systems, plus University of Oklahoma higher-ed adjacency. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
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
              'Norman Regional Health System, OU Health linkages, and metro OKC campuses (INTEGRIS, Mercy, and others) anchor care for Cleveland County households. Confirm insurance networks.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-35 freeflow changes “nearby” on paper. Transfer records early.',
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
              'Expect OU campus multi-unit; Campus Corner walk-ups; Norman character SFH; Moore HOA growth; Noble–Lexington fringe ranch and larger-lot stock.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by city and product. Budget for multi-unit deposits, HOA dues, and older-building repair risk where relevant.',
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
            title: 'OU campus / Campus Corner lifestyle',
            detail:
              'Suits students, faculty, and people prioritizing campus proximity — with stairs, curb scarcity, and lease-wave tradeoffs on move day.',
          },
          {
            title: 'Central / east Norman character living',
            detail:
              'Often appeals for neighborhood feel and lake-edge space — with longer carries and mixed HOA rules.',
          },
          {
            title: 'Moore growth belts',
            detail:
              'Fits buyers chasing newer product, schools, and OKC access — with HOA rules and I-35 freeflow.',
          },
          {
            title: 'Noble / Lexington fringe',
            detail:
              'Attracts households seeking relative space and value — with empty-mile and approach-road logistics.',
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
              'University of Oklahoma, Norman Regional and healthcare, local retail and professional services, and reverse-commute links into Oklahoma County employment centers concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-35 freeflow into OKC is real. Test peak routes before choosing solely on rent or purchase price.',
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
              'Cleveland County, Oklahoma stacks OU campus energy, Norman neighborhood grids, and Moore growth — different from Cleveland, Ohio, from downtown OKC tower living, and from Canadian County west-metro patterns alone.',
          },
          {
            title: 'Climate',
            detail:
              'Southern plains climate with hot summers, severe-storm and tornado risk, and freeze-thaw winters. Plan outdoor staging, heat, and storm contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — semester calendars, game days, school calendars, and storm season reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Cleveland County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify OCC Household Goods Certificate status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Cleveland County, Oklahoma — official site',
        href: 'https://www.clevelandcountyok.com/',
        external: true,
        note: 'County services & property context (OK — not Cleveland, Ohio)',
      },
      {
        label: 'City of Norman',
        href: 'https://www.normanok.gov/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'City of Moore',
        href: 'https://www.cityofmoore.com/',
        external: true,
        note: 'Growth municipality context',
      },
      {
        label: 'OKGO — Oklahoma 511 traveler info',
        href: 'https://okgo.ok.gov/',
        external: true,
        note: 'I-35 / US-77 / OK-9 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with campus multi-unit and stair fluency for OU–Campus Corner product; HOA gate fluency for Moore growth; honest I-35 · US-77 · OK-9 timing for cross-zone and OKC pairs. This is Cleveland County, Oklahoma — not Cleveland, Ohio. Verify OCC Household Goods Certificate for intrastate moves (even within city limits) and FMCSA for interstate legs before deposits.',
  lastReviewed: '2026-07-24',
});
