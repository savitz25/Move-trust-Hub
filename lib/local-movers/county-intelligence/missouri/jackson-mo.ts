import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMoPack,
  MO_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/missouri/mo-shared';

/**
 * Jackson County, MO — Kansas City core / Independence / Lee’s Summit / Blue Springs.
 * NOT St. Louis County. NOT Clay County (north KC).
 */
export const jacksonCountyMoIntelligence: CountyIntelligencePack = finalizeMoPack({
  countySlug: 'jackson',
  hubTitle: 'Jackson County Moving Intelligence Hub',
  eyebrow:
    'Jackson County, MO · Kansas City core, Independence stock & I-70 / I-435 freeflow',
  h1: 'Moving in Jackson County: Kansas City Access, Independence Grids & I-70 / I-435 Logistics',
  heroOpener:
    'Jackson County, Missouri is not a St. Louis County loop clone and not a Clay County north-metro template — it is Kansas City’s eastern and southern core with downtown and midtown multi-unit density, Independence and Raytown older grids, Lee’s Summit and Blue Springs HOA growth, and I-70 / I-35 / I-29 / I-435 freeflow that rewrites “local” estimates. A Plaza-area elevator condo, a Westport walk-up stair stack, an Independence bungalow basement, and a Lee’s Summit gated driveway do not share truck access or crew skill. Kansas-side Wyandotte and Johnson County pairs add interstate authority risk. This hub is for people moving in Jackson County, MO — not a renamed St. Louis page or Clay County north-KC script.',
  heroCredibility:
    'MoDOT Motor Carrier Services household goods authority for intrastate · FMCSA for interstate · KC metro access & I-435 logistics awareness · Curated listings',
  majorCorridors: 'I-70 · I-35 · I-29 · I-435 · US-71 · local KC grid',
  whatMakesDifferent: {
    title: 'What makes moving in Jackson County different',
    intro:
      'These are Kansas City core and eastern Jackson realities — downtown elevators, Independence grids, Lee’s Summit growth, and I-70 / I-435 freeflow — not St. Louis I-270 product and not Clay County north-metro HOAs alone.',
    bullets: [
      {
        title: 'Kansas City core multi-unit is not eastern suburb product',
        detail:
          'Downtown towers, Crossroads lofts, Plaza and midtown elevators, and Westport walk-ups stack COIs, dock slots, and scarce curb that Lee’s Summit cul-de-sacs do not share.',
      },
      {
        title: 'Independence, Raytown, and Grandview grids rewrite labor',
        detail:
          'Older SFH, basements, and tighter residential curb fail estimates more often than packing skill alone. Flat-rate optimism from new HOA driveways underprices carries.',
      },
      {
        title: 'Lee’s Summit and Blue Springs growth is HOA- and school-calendar driven',
        detail:
          'Gate lists, truck-length limits, and summer family peaks rewrite jobs that look “suburban simple” on paper. Same-county downtown product does not share that stack.',
      },
      {
        title: 'I-70, I-35, I-29, I-435, and US-71 burn portal time',
        detail:
          'Downtown ↔ Lee’s Summit, Independence ↔ Plaza, or Grandview ↔ Blue Springs pairs look local and still burn 25–60+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'This is not St. Louis County and not Clay County',
        detail:
          'Ignore I-270 Chesterfield assumptions and do not treat Liberty / Gladstone north-metro product as interchangeable with Independence or Lee’s Summit. Corridors and housing mix differ.',
      },
      {
        title: 'Kansas-side pairs are routine interstate jobs',
        detail:
          'Households regularly move Jackson ↔ Johnson County, KS or Wyandotte County, KS. MoDOT household goods authority alone does not authorize Kansas delivery — verify FMCSA when any leg leaves Missouri.',
      },
      MO_REG_BULLET,
    ],
  },
  zonesHeading: 'Jackson County access zones',
  zonesIntro:
    'Plan by downtown–midtown vertical product, Plaza–Westport neighborhood stock, Independence–Raytown grids, Lee’s Summit–Blue Springs growth, and southern Grandview–US-71 belts.',
  zones: [
    {
      id: 'downtown-midtown-kc',
      name: 'Downtown Kansas City, Crossroads & midtown multi-unit',
      shortName: 'Downtown / midtown',
      neighborhoods: [
        'Downtown Kansas City',
        'Crossroads',
        'Power & Light edges',
        'River Market edges',
        'Midtown corridors',
        'Hospital Hill edges',
      ],
      housingTypes: 'High-rise condo, loft conversions, mid-rise multifamily',
      challenges: [
        'Elevator reservations, dock slots, and building COIs',
        'Limited legal curb and event-day freeflow',
        'I-35 / I-70 / US-71 approach congestion',
      ],
      moverTips:
        'Book elevators and COIs in writing before the crew day. Prefer mid-week early freight windows. Photo dock or curb staging options.',
      cityKeywords: [
        'kansas city',
        'downtown kansas city',
        'crossroads',
        'midtown',
      ],
    },
    {
      id: 'plaza-westport',
      name: 'Country Club Plaza, Westport & south midtown stock',
      shortName: 'Plaza / Westport',
      neighborhoods: [
        'Country Club Plaza',
        'Westport',
        'Brookside edges',
        'Waldo edges',
        'Hyde Park edges',
        'South Plaza edges',
      ],
      housingTypes: 'Walk-up multifamily, condo, older SFH, limited elevators',
      challenges: [
        'Multi-flight stairs and scarce truck length',
        'Tourism and event curb shrinkage',
        'Wornall / Main / Ward Parkway freeflow',
      ],
      moverTips:
        'Survey stair counts with photos. Prefer mid-week starts near Plaza peaks. Inventory basements carefully.',
      cityKeywords: [
        'plaza',
        'westport',
        'brookside',
        'waldo',
        'kansas city',
      ],
    },
    {
      id: 'independence-raytown',
      name: 'Independence, Raytown & eastern grid stock',
      shortName: 'Independence / Raytown',
      neighborhoods: [
        'Independence',
        'Raytown',
        'Sugar Creek edges',
        'Eastern KC corridors',
        'Truman corridors',
        'Blue Ridge edges',
      ],
      housingTypes: 'Older SFH, bungalows, multi-unit pockets, ranch stock',
      challenges: [
        'Basement stairs and tight residential curb',
        'I-70 / I-435 freeflow at peak',
        'Mixed municipal rules across short distances',
      ],
      moverTips:
        'Confirm municipality on the estimate. Photo driveway and basement access. Price I-70 honestly for downtown pairs.',
      cityKeywords: [
        'independence',
        'raytown',
        'sugar creek',
      ],
    },
    {
      id: 'lees-summit-blue-springs',
      name: "Lee's Summit, Blue Springs & eastern growth HOAs",
      shortName: "Lee's Summit / Blue Springs",
      neighborhoods: [
        "Lee's Summit",
        'Blue Springs',
        'Lake Lotawana edges',
        'Greenwood edges',
        'Lake Tapawingo edges',
        'Unity Village edges',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family, lake-adjacent stock',
      challenges: [
        'HOA gate lists, truck-length limits, and timed windows',
        'I-470 / US-50 / I-70 freeflow',
        'Longer empty miles vs downtown',
      ],
      moverTips:
        'Collect HOA packets and gate codes early. Confirm truck length rules. Price eastern approach freeflow for westbound unload pairs.',
      cityKeywords: [
        "lee's summit",
        'lees summit',
        'blue springs',
        'greenwood',
      ],
    },
    {
      id: 'south-grandview-us71',
      name: 'Grandview, south KC & US-71 corridor belts',
      shortName: 'Grandview / south',
      neighborhoods: [
        'Grandview',
        'South Kansas City corridors',
        'Hickman Mills edges',
        'Martin City edges',
        'Bannister corridors',
        'Red Bridge edges',
      ],
      housingTypes: 'SFH, multi-unit, ranch and split-level stock',
      challenges: [
        'US-71 / I-435 / I-49 freeflow',
        'Mixed older stock and long carries',
        'Airport-adjacent traffic spikes on some approaches',
      ],
      moverTips:
        'Avoid peak US-71 windows when flexible. Survey older stock carefully. Clarify KC city vs Grandview addresses.',
      cityKeywords: [
        'grandview',
        'kansas city',
        'hickman mills',
        'red bridge',
      ],
    },
    {
      id: 'east-blue-ridge-cutter',
      name: 'Eastern industrial-residential & Blue Ridge cutters',
      shortName: 'East / Blue Ridge',
      neighborhoods: [
        'Blue Ridge corridors',
        'Eastern industrial edges',
        'Kansas City east corridors',
        'Independence west edges',
        'Raytown north edges',
        'I-435 belt edges',
      ],
      housingTypes: 'Mixed SFH, multi-unit, industrial-adjacent residential',
      challenges: [
        'I-435 / I-70 freeflow and freight traffic',
        'Mixed curb and driveway product',
        'Cross-zone empty miles common',
      ],
      moverTips:
        'Price I-435 honestly. Confirm industrial-adjacent staging limits. Clarify load and unload city lines.',
      cityKeywords: [
        'kansas city',
        'independence',
        'raytown',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Jackson County moving costs',
    intro:
      'Access product, elevator/HOA admin, and I-70 / I-435 freeflow move the number more than packing skill alone — this is KC core logistics, not St. Louis loop pricing.',
    drivers: [
      {
        title: 'Elevator reservations, docks & building COIs',
        detail:
          'Downtown, Crossroads, and Plaza vertical product add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'Walk-up stairs, basements & Independence-grid curb',
        detail:
          'Westport, Independence, and Raytown stock add flight counts that flat-rate optimism underprices.',
      },
      {
        title: 'I-70 · I-35 · I-29 · I-435 · US-71 congestion',
        detail:
          'Cross-metro pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'HOA gates & eastern growth windows',
        detail:
          "Lee's Summit and Blue Springs packets rewrite jobs that look simple on a map.",
      },
      {
        title: 'Kansas-side & multi-county empty miles',
        detail:
          'Johnson County KS, Wyandotte KS, Clay, and Platte destinations raise staging distance and authority complexity when leaving Missouri.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,900+',
        note: 'Higher with elevators, walk-ups, or peak I-435 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,500–$4,500+',
        note: 'Stairs, COI, and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR / high-rise / cross-zone',
        value: '$3,000–$9,500+',
        note: 'Tower moves and long I-70 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$120–$210+/hr',
        note: 'Portal-to-portal; packing, COI admin, and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Jackson County move',
    intro:
      'Lease cycles, school calendars, summer heat, severe-storm season, and winter ice reshape access and crew availability across the KC grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease downtown freight windows, and reduce I-70 / I-435 pain. Avoid month-end Fridays when leases and elevators collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Apartment turnover and family school calendars fill first. Book 2–4 weeks ahead for peak weekends and elevator or HOA slots.',
      },
      {
        title: 'Summer heat & severe-storm risk',
        detail:
          'June–August heat and thunderstorms raise cancellation and crew-rotation soft costs. Prefer early starts and flexible weather windows.',
      },
      {
        title: 'Winter ice, freeze-thaw, and holiday freeflow',
        detail:
          'December–February adds icy stoops and weather cancellations. Prefer flexible dates and contingency for melt and tarps on older stock.',
      },
    ],
  },
  specialized: [
    {
      id: 'jackson-kc-elevator-hoa',
      title: 'Jackson County elevator, neighborhood & I-435 logistics module',
      intro:
        'Jackson County estimates fail more often on stair surveys, elevator packets, HOA gates, and freeway freeflow than on packing skill alone.',
      bullets: [
        'Collect building COI, elevator reservations, and dock rules before the survey is final.',
        'Photo stair counts, curb options, and basement access for Independence, Raytown, and Westport stock.',
        'Price portal-to-portal time for any pair that rides I-70, I-35, I-29, I-435, or US-71 at peak.',
        'Collect HOA packets early for Lee’s Summit and Blue Springs product.',
        'Clarify Kansas City, Independence, Grandview, and eastern city addresses on every estimate.',
        'For in-state jobs verify MoDOT household goods operating authority; verify FMCSA for any out-of-state leg — especially Kansas-side pairs.',
      ],
    },
    {
      id: 'not-stl-not-clay',
      title: 'Not St. Louis · not Clay County north-metro module',
      intro:
        'A single “KC metro rate” collapses when Jackson core product is confused with St. Louis County loop logistics or Clay County north-KC growth alone.',
      bullets: [
        'Do not price Plaza elevators like Chesterfield HOAs or like Liberty north-metro driveways.',
        'Keep Jackson vs Clay vs Platte county lines clear on every multi-address estimate.',
        'Match downtown lease peaks separately from eastern suburb school-calendar waves.',
        'Treat state-line legs as interstate authority problems — MoDOT alone is not enough for Kansas delivery.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Jackson County?',
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
              'Jackson County spans Kansas City Public Schools plus Independence, Raytown, Grandview, Lee’s Summit R-7, Blue Springs, and other systems. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
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
              'University Health, Saint Luke’s, Research Medical Center, Children’s Mercy, and Centerpoint (Independence) campuses anchor care across Jackson County. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-70 and I-435 freeflow change “nearby” on paper. Transfer records early.',
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
              'Expect downtown and midtown vertical product; Plaza–Westport walk-ups; Independence and Raytown older SFH; Lee’s Summit and Blue Springs HOA growth; southern mixed ranch stock.',
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
            title: 'Downtown / midtown urban lifestyle',
            detail:
              'Suits people prioritizing walkability and amenities — with elevator, parking, and event-day tradeoffs on move day.',
          },
          {
            title: 'Plaza / Westport / Brookside character living',
            detail:
              'Often appeals for neighborhood feel — with stairs, curb limits, and denser staging constraints.',
          },
          {
            title: 'Independence and eastern grid living',
            detail:
              'Attracts households seeking relative space and value — with basement logistics and I-70 freeflow.',
          },
          {
            title: "Lee's Summit / Blue Springs growth belts",
            detail:
              'Fits buyers chasing newer product and schools — with HOA rules and longer empty miles to the core.',
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
              'Downtown professional services, healthcare systems, logistics and industrial corridors, education, and corporate campuses on both sides of the state line concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak freeway freeflow is real — including Kansas-side reverse commutes. Test peak routes before choosing solely on rent or purchase price.',
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
              'Jackson County stacks KC urban cores, eastern grids, and growth suburbs — different from St. Louis County I-270 product and from Clay County north-metro patterns alone.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental climate with hot summers, severe-storm risk, and freeze-thaw winters. Plan outdoor staging, heat, and ice contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — school calendars, sports and event days, and winter weather reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Jackson County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify MoDOT household goods operating authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Jackson County, Missouri — official site',
        href: 'https://www.jacksongov.org/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Kansas City, Missouri',
        href: 'https://www.kcmo.gov/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: "City of Lee's Summit",
        href: 'https://cityofls.net/',
        external: true,
        note: 'Eastern growth municipality context',
      },
      {
        label: 'Traveler Information Map — MoDOT',
        href: 'https://traveler.modot.org/map/',
        external: true,
        note: 'I-70 / I-35 / I-435 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with elevator/COI experience for downtown–midtown and Plaza product; basement and grid fluency for Independence–Raytown stock; HOA gate fluency for Lee’s Summit–Blue Springs; honest I-70 · I-35 · I-29 · I-435 · US-71 timing for cross-zone pairs. Verify MoDOT Motor Carrier Services household goods operating authority for intrastate moves and FMCSA for interstate legs (including Kansas-side pairs) before deposits.',
  lastReviewed: '2026-07-24',
});
