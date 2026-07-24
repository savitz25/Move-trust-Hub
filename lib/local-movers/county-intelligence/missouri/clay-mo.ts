import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMoPack,
  MO_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/missouri/mo-shared';

/**
 * Clay County, MO — north Kansas City metro (Liberty, Gladstone, NKC, Kearney).
 * NOT Jackson County core / Independence / Lee’s Summit clone.
 */
export const clayCountyMoIntelligence: CountyIntelligencePack = finalizeMoPack({
  countySlug: 'clay',
  hubTitle: 'Clay County Moving Intelligence Hub',
  eyebrow:
    'Clay County · north KC, Liberty–Gladstone stock & I-35 / I-29 / I-435 logistics',
  h1: 'Moving in Clay County: North Metro Access, Liberty Grids & I-35 / I-29 Corridor Logistics',
  heroOpener:
    'Clay County, Missouri is not a Jackson County clone — it is Kansas City’s north metro with North Kansas City industrial-adjacent multi-unit, Gladstone and Pleasant Valley mid-ring stock, Liberty character grids and growth HOAs, Kearney and Smithville expansion product, and I-35 / I-29 / I-435 / MO-291 freeflow that rewrites “local” estimates. An NKC walk-up, a Gladstone ranch basement, a Liberty HOA gate list, and a Kearney cul-de-sac do not share truck access or crew skill. Airport approaches and river-crossing pairs add time that south-metro templates miss. This hub is for people moving in Clay County — not a renamed Independence or Lee’s Summit page.',
  heroCredibility:
    'MoDOT Motor Carrier Services household goods authority for intrastate · FMCSA for interstate · North KC access & I-35 logistics awareness · Curated listings',
  majorCorridors: 'I-35 · I-29 · I-435 · MO-291',
  whatMakesDifferent: {
    title: 'What makes moving in Clay County different',
    intro:
      'These are north Kansas City metro realities — NKC multi-unit, Liberty growth, and I-35 / I-29 freeflow — not Jackson downtown elevators, Independence grids, or Lee’s Summit eastern HOAs alone.',
    bullets: [
      {
        title: 'North metro is not Jackson County core product',
        detail:
          'Do not price Clay jobs like Plaza elevators or Independence basements by default. Housing mix, approach corridors, and empty-mile patterns differ north of the river.',
      },
      {
        title: 'North Kansas City and Gladstone rewrite labor a few miles apart',
        detail:
          'Industrial-adjacent multi-unit, tighter curb, and mid-ring ranch stock fail estimates more often than packing skill alone when crews assume only Liberty driveways.',
      },
      {
        title: 'Liberty growth HOAs are not Kearney expansion clones',
        detail:
          'Gate lists, truck-length limits, and school-calendar peaks differ from farther-north larger-lot product. Same-county jobs still need product-specific surveys.',
      },
      {
        title: 'I-35, I-29, I-435, and MO-291 burn portal time',
        detail:
          'NKC ↔ Liberty, Gladstone ↔ Kearney, or Clay ↔ Jackson pairs look local and still burn 20–50+ minutes at peak and airport-approach windows. Price portal-to-portal honestly.',
      },
      {
        title: 'Airport and river-crossing pairs are routine',
        detail:
          'MCI approaches and Missouri River crossings toward Platte or Jackson destinations reshape timing. Confirm load and unload freeflow on the survey.',
      },
      {
        title: 'Kansas-side and multi-county legs need matching authority',
        detail:
          'Households regularly move Clay ↔ Platte, Jackson, or Kansas-side destinations. MoDOT household goods authority alone does not authorize interstate delivery — verify FMCSA when any leg leaves Missouri.',
      },
      MO_REG_BULLET,
    ],
  },
  zonesHeading: 'Clay County access zones',
  zonesIntro:
    'Plan by North Kansas City multi-unit, Gladstone mid-ring stock, Liberty character and growth belts, Kearney–Smithville expansion, and Excelsior Springs eastern edges.',
  zones: [
    {
      id: 'north-kansas-city',
      name: 'North Kansas City multi-unit & industrial-adjacent stock',
      shortName: 'North Kansas City',
      neighborhoods: [
        'North Kansas City',
        'Armour Road corridors',
        'Burlington corridors',
        'Industrial-adjacent residential edges',
        'Riverfront edges',
        'Swift Avenue edges',
      ],
      housingTypes: 'Multi-unit, older SFH, limited elevators, industrial-adjacent product',
      challenges: [
        'Scarce curb and freight traffic',
        'Stairs and tight truck length',
        'I-29 / I-35 approach congestion',
      ],
      moverTips:
        'Prefer mid-week early starts. Photo curb options near commercial corridors. Confirm building rules in writing.',
      cityKeywords: [
        'north kansas city',
        'nkc',
      ],
    },
    {
      id: 'gladstone-pleasant-valley',
      name: 'Gladstone, Pleasant Valley & mid-ring residential',
      shortName: 'Gladstone / PV',
      neighborhoods: [
        'Gladstone',
        'Pleasant Valley',
        'Antioch corridors',
        'North Oak corridors',
        'Englewood edges',
        'Claycomo edges',
      ],
      housingTypes: 'Ranch SFH, multi-unit pockets, split-levels, some townhomes',
      challenges: [
        'Basement stairs and driveway pitch',
        'I-35 / MO-1 freeflow',
        'Mixed municipal rules across short distances',
      ],
      moverTips:
        'Survey basements with photos. Clarify Gladstone vs KCMO addresses where relevant. Price I-35 honestly.',
      cityKeywords: [
        'gladstone',
        'pleasant valley',
        'claycomo',
      ],
    },
    {
      id: 'liberty',
      name: 'Liberty historic grids, multi-unit & growth HOAs',
      shortName: 'Liberty',
      neighborhoods: [
        'Liberty',
        'Historic Liberty edges',
        'South Liberty growth corridors',
        'Withers Road corridors',
        'Kansas Street corridors',
        'Liberty Triangle edges',
      ],
      housingTypes: 'Older SFH, multi-unit, HOA growth product, townhomes',
      challenges: [
        'HOA gate lists and timed windows on growth edges',
        'Historic-grid curb and stairs near downtown Liberty',
        'I-35 / MO-291 freeflow',
      ],
      moverTips:
        'Collect HOA packets for growth belts. Photo downtown Liberty curb options. Price MO-291 / I-35 portal time for cross-zone pairs.',
      cityKeywords: [
        'liberty',
      ],
    },
    {
      id: 'kearney-smithville',
      name: 'Kearney, Smithville & northern expansion',
      shortName: 'Kearney / Smithville',
      neighborhoods: [
        'Kearney',
        'Smithville',
        'I-35 north corridors',
        'Smithville Lake edges',
        'Mosby edges',
        'Holt edges',
      ],
      housingTypes: 'Newer HOA SFH, larger lots, lake-adjacent stock, limited multi-unit',
      challenges: [
        'Longer empty miles vs NKC',
        'HOA and lake-community rules',
        'I-35 freeflow and limited alternate routes',
      ],
      moverTips:
        'Price northern empty miles honestly. Collect HOA and lake rules early. Confirm approach width on larger lots.',
      cityKeywords: [
        'kearney',
        'smithville',
        'holt',
      ],
    },
    {
      id: 'excelsior-springs-east',
      name: 'Excelsior Springs, Lawson edges & eastern Clay',
      shortName: 'Excelsior / east',
      neighborhoods: [
        'Excelsior Springs',
        'Lawson edges',
        'Eastern rural-edge pockets',
        'MO-10 corridors',
        'MO-92 corridors',
        'Prathersville edges',
      ],
      housingTypes: 'Older SFH, small-town multi-unit, larger-lot rural-edge stock',
      challenges: [
        'Longer empty miles and narrower approaches',
        'Mixed small-town curb product',
        'Cross-county pairs common',
      ],
      moverTips:
        'Confirm approach photos and turnarounds. Price empty miles honestly. Clarify small-town addresses carefully.',
      cityKeywords: [
        'excelsior springs',
        'lawson',
      ],
    },
    {
      id: 'riverside-briarcliff',
      name: 'Riverside, Briarcliff & western river-edge belts',
      shortName: 'Riverside / Briarcliff',
      neighborhoods: [
        'Riverside',
        'Briarcliff edges',
        'Western river-edge corridors',
        'Platte County fringe edges',
        'I-635 approach edges',
        'Line Creek edges',
      ],
      housingTypes: 'SFH, multi-unit pockets, hillside and river-edge stock',
      challenges: [
        'Hillside driveways and limited staging width',
        'River-crossing freeflow toward Platte/Jackson',
        'I-29 / I-635 approach congestion',
      ],
      moverTips:
        'Photo driveway pitch and turnarounds. Price river-crossing pairs honestly. Confirm municipality on the estimate.',
      cityKeywords: [
        'riverside',
        'briarcliff',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Clay County moving costs',
    intro:
      'Access product, HOA admin, airport approaches, and I-35 / I-29 freeflow move the number more than packing skill alone — this is north metro logistics, not a Jackson core template.',
    drivers: [
      {
        title: 'NKC multi-unit curb & industrial freeflow',
        detail:
          'North Kansas City product adds scarce staging and freight traffic soft costs before packing skill matters.',
      },
      {
        title: 'Basements, ranch stairs & mid-ring curb',
        detail:
          'Gladstone and Pleasant Valley stock add flight counts that flat-rate optimism underprices.',
      },
      {
        title: 'I-35 · I-29 · I-435 · MO-291 congestion',
        detail:
          'Cross-metro and airport-approach pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Liberty–Kearney HOA & expansion windows',
        detail:
          'Growth packets and longer northern empty miles rewrite jobs that look simple on a map.',
      },
      {
        title: 'River-crossing, Platte, Jackson & Kansas legs',
        detail:
          'Multi-county and interstate destinations raise staging distance and authority complexity when leaving Missouri.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,800+',
        note: 'Higher with stairs, multi-unit, or peak I-35 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,400–$4,200+',
        note: 'Basements, HOA, and portal soft costs trend up',
      },
      {
        label: '3–4+ BR / cross-zone / north expansion',
        value: '$2,800–$8,500+',
        note: 'Northern empty miles and river-crossing pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$200+/hr',
        note: 'Portal-to-portal; packing, HOA admin, and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Clay County move',
    intro:
      'School calendars, growth-suburb peaks, summer heat, severe storms, and winter ice reshape access and crew availability across the north metro.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts ease HOA windows and reduce I-35 / I-29 / airport-approach pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family school moves and multi-family turnover fill first. Book 2–4 weeks ahead for peak weekends and HOA slots.',
      },
      {
        title: 'Summer heat & severe-storm risk',
        detail:
          'June–August heat and thunderstorms raise cancellation and crew-rotation soft costs. Prefer early starts and flexible weather windows.',
      },
      {
        title: 'Winter ice and freeze-thaw',
        detail:
          'December–February adds icy stoops and weather cancellations. Prefer flexible dates and contingency for melt and tarps.',
      },
    ],
  },
  specialized: [
    {
      id: 'clay-north-metro-logistics',
      title: 'Clay County north-metro, HOA & I-35 logistics module',
      intro:
        'Clay County estimates fail more often on product mis-match with Jackson templates, HOA packets, and I-35 freeflow than on packing skill alone.',
      bullets: [
        'Do not default to Independence or Plaza access assumptions for Clay addresses.',
        'Photo curb options for NKC multi-unit and basement access for Gladstone ranch stock.',
        'Collect HOA packets early for Liberty growth and Kearney expansion product.',
        'Price portal-to-portal time for any pair that rides I-35, I-29, I-435, or MO-291 at peak.',
        'Plan airport-approach and river-crossing freeflow into southbound unload pairs.',
        'For in-state jobs verify MoDOT household goods operating authority; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-jackson-clone',
      title: 'Not Jackson County core micro-market module',
      intro:
        'A single “KC metro rate” collapses when north-metro Clay product is treated as interchangeable with Jackson downtown, Independence, or Lee’s Summit eastern growth.',
      bullets: [
        'Keep Clay vs Jackson vs Platte county lines clear on every multi-address estimate.',
        'Match Liberty school-calendar peaks separately from downtown Jackson lease-end waves.',
        'Treat state-line legs as interstate authority problems — MoDOT alone is not enough for Kansas delivery.',
        'Ask which approach corridors the crew will actually use at load and unload north of the river.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Clay County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures town fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Major systems include Liberty, North Kansas City, Smithville, Kearney, Excelsior Springs, and others. Assignment is address-based — marketing subdivision names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and growth-edge boundaries can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Missouri DESE data, and campus visits beat ranking screenshots alone.',
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
              'Liberty Hospital, North Kansas City Hospital, and related campuses anchor north-metro care; many households also use broader Kansas City systems south of the river. Confirm insurance networks.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-35 freeflow and river crossings change “nearby” on paper. Transfer records early.',
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
              'Expect NKC multi-unit and industrial-adjacent product; Gladstone mid-ring ranches; Liberty historic and growth HOA stock; Kearney and Smithville expansion; eastern small-town and rural-edge lots.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by municipality and product. Budget for HOA dues and commute tradeoffs toward the KC core.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Associations often control move hours, truck size, and deposits in growth belts. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'North Kansas City urban-adjacent living',
            detail:
              'Suits people prioritizing short access to the core — with multi-unit curb and industrial freeflow tradeoffs on move day.',
          },
          {
            title: 'Gladstone mid-ring convenience',
            detail:
              'Often appeals for established residential streets — with basements and I-35 freeflow.',
          },
          {
            title: 'Liberty character and growth living',
            detail:
              'Attracts households seeking downtown Liberty feel or newer HOA product — with mixed access rules.',
          },
          {
            title: 'Kearney / Smithville northern space',
            detail:
              'Fits buyers chasing newer lots and relative space — with longer empty miles and HOA packets.',
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
              'Northland healthcare, logistics, industrial corridors, retail, and reverse-commute flows into downtown Kansas City and airport-adjacent employers concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-35 / I-29 freeflow and river crossings are real. Test peak routes before choosing solely on rent or purchase price.',
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
              'Clay County stacks northland multi-unit, mid-ring suburbs, and growth towns — different from Jackson downtown elevators, Independence grids, and Lee’s Summit eastern product alone.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental climate with hot summers, severe-storm risk, and freeze-thaw winters. Plan outdoor staging, heat, and ice contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — school calendars, airport traffic patterns, and winter weather reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Clay County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify MoDOT household goods operating authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Clay County, Missouri — official site',
        href: 'https://www.claycountymo.gov/',
        external: true,
        note: 'County services & unincorporated info',
      },
      {
        label: 'City of Liberty',
        href: 'https://www.libertymo.gov/',
        external: true,
        note: 'North metro municipality context',
      },
      {
        label: 'City of Gladstone',
        href: 'https://www.gladstone.mo.us/',
        external: true,
        note: 'Mid-ring residential context',
      },
      {
        label: 'Traveler Information Map — MoDOT',
        href: 'https://traveler.modot.org/map/',
        external: true,
        note: 'I-35 / I-29 / I-435 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with multi-unit curb fluency for North Kansas City product; basement and ranch access for Gladstone stock; HOA gate fluency for Liberty–Kearney growth; honest I-35 · I-29 · I-435 · MO-291 timing for cross-zone and airport-approach pairs. Verify MoDOT Motor Carrier Services household goods operating authority for intrastate moves and FMCSA for interstate legs before deposits.',
  lastReviewed: '2026-07-24',
});
