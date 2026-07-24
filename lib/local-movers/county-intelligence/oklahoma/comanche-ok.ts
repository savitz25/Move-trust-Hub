import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeOkPack,
  OK_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/oklahoma/ok-shared';

/**
 * Comanche County, OK — Lawton / Fort Sill southwest regional.
 * Not OKC metro clone. Fort Sill adjacency where accurate.
 */
export const comancheCountyOkIntelligence: CountyIntelligencePack = finalizeOkPack({
  countySlug: 'comanche',
  hubTitle: 'Comanche County Moving Intelligence Hub',
  eyebrow:
    'Comanche County · Lawton hub, Fort Sill adjacency & I-44 southwest logistics',
  h1: 'Moving in Comanche County: Lawton Access, Fort Sill Adjacency & I-44 Southwest Logistics',
  heroOpener:
    'Comanche County is southwest Oklahoma’s regional hub — Lawton with Fort Sill adjacency — not an Oklahoma County / OKC metro clone, not Tulsa river-city product, and not a Norman campus script. Expect downtown Lawton multi-unit and older grids, Cache Road commercial-residential belts, Fort Sill off-post multi-family, Cache and Elgin fringe stock, Medicine Park and mountain-edge approaches, and I-44 / US-62 / US-281 freeflow that rewrites “local” estimates. A Lawton townhome curb stack, an off-post PCS multi-unit, a Cache ranch driveway, and a rural mountain-edge approach do not share truck access or crew skill. Military PCS calendars are real inputs where accurate. This hub is for people moving in Comanche County — Lawton / Fort Sill adjacency — not a renamed OKC page.',
  heroCredibility:
    'OCC Household Goods Certificate for intrastate · FMCSA for interstate · Lawton hub & Fort Sill-adjacent logistics awareness · Curated listings',
  majorCorridors: 'I-44 · US-62 · US-281 · local Lawton grid',
  whatMakesDifferent: {
    title: 'What makes moving in Comanche County different',
    intro:
      'These are Comanche County / Lawton realities — Fort Sill-adjacent multi-unit, PCS calendars, regional empty miles, and I-44 freeflow — not OKC metro HOA defaults and not Tulsa Creek Turnpike product.',
    bullets: [
      {
        title: 'Lawton is a southwest regional hub — not an OKC metro clone',
        detail:
          'Ignore Bricktown elevator templates and Edmond HOA freeflow defaults. Comanche stacks Lawton urban grids, Fort Sill adjacency, and longer empty-mile patterns that central-metro scripts underprice.',
      },
      {
        title: 'Fort Sill adjacency and PCS calendars rewrite volume where accurate',
        detail:
          'Permanent change of station waves, off-post multi-unit turnover, and base-adjacent freeflow compress demand. Flat-rate optimism from pure civilian HOA driveways underprices access and timing risk on military-adjacent jobs.',
      },
      {
        title: 'Downtown Lawton grids are not Cache Road growth multi-family',
        detail:
          'Older SFH, walk-ups, and tighter curb differ from commercial-corridor multi-unit and newer stock. Same-county jobs still need product-specific surveys.',
      },
      {
        title: 'I-44, US-62, and US-281 burn portal time',
        detail:
          'Lawton ↔ Cache, downtown ↔ Fort Sill edges, or city ↔ Elgin pairs look local and still burn 15–45+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Medicine Park and mountain-edge approaches rewrite access',
        detail:
          'Narrow approaches, pitch, and limited turnarounds fail estimates that assume flat Lawton ranch driveways.',
      },
      {
        title: 'Multi-county southwest and interstate pairs are routine',
        detail:
          'Households regularly move Comanche County ↔ Stephens, Cotton, or Caddo County, or out-of-state on I-44. An OCC Household Goods Certificate alone does not authorize interstate delivery — verify FMCSA when any leg leaves Oklahoma. Military interstate PCS legs need active FMCSA authority.',
      },
      OK_REG_BULLET,
    ],
  },
  zonesHeading: 'Comanche County access zones',
  zonesIntro:
    'Plan by downtown Lawton stock, Cache Road multi-family belts, Fort Sill off-post multi-unit, Cache–Elgin fringe, Medicine Park mountain edges, and rural larger-lot approaches — access rules cluster by product more than ZIP alone.',
  zones: [
    {
      id: 'lawton-downtown',
      name: 'Downtown Lawton, historic grids & central multi-unit',
      shortName: 'Downtown Lawton',
      neighborhoods: [
        'Downtown Lawton',
        'Central Lawton grids',
        'Gore Boulevard corridors',
        'Historic core residential',
        'Central multi-unit pockets',
        'Courthouse edges',
      ],
      housingTypes: 'Older SFH, walk-up multifamily, limited elevators, bungalows',
      challenges: [
        'Stairs, basements, and tighter residential curb',
        'Local arterial freeflow toward Cache Road',
        'Mixed older stock',
      ],
      moverTips:
        'Survey stair counts with photos. Prefer mid-week starts. Photo curb and driveway options.',
      cityKeywords: [
        'lawton',
        'downtown lawton',
      ],
    },
    {
      id: 'cache-road-belts',
      name: 'Cache Road commercial-residential & mid-Lawton multi-family',
      shortName: 'Cache Road / mid-city',
      neighborhoods: [
        'Cache Road corridors',
        'Mid-Lawton multi-family',
        'NW Lawton commercial-residential',
        'Sheridan Road edges',
        'Retail-corridor multi-unit',
        'I-44 approach residential',
      ],
      housingTypes: 'Multi-family, townhomes, ranch and split-level SFH',
      challenges: [
        'Multi-unit curb limits and turnover peaks',
        'I-44 / Cache Road freeflow',
        'Mixed HOA and apartment rules',
      ],
      moverTips:
        'Collect building rules early. Prefer mid-week multi-unit starts. Price Cache Road freeflow for cross-town pairs.',
      cityKeywords: [
        'lawton',
        'cache road',
      ],
    },
    {
      id: 'fort-sill-offpost',
      name: 'Fort Sill off-post multi-unit & military-adjacent belts',
      shortName: 'Fort Sill off-post',
      neighborhoods: [
        'Fort Sill edges',
        'Off-post multi-unit belts',
        'Military-adjacent residential',
        'Key Gate approach edges',
        'Rogers Lane corridors',
        'Base freeflow residential',
      ],
      housingTypes: 'Multi-family, townhomes, ranch stock near post',
      challenges: [
        'PCS calendar spikes and multi-unit turnover',
        'Base-adjacent traffic and gate freeflow',
        'Inventory timing for military household goods',
      ],
      moverTips:
        'Align crew days with PCS windows when possible. Confirm off-post addresses carefully. Verify authority for interstate PCS legs.',
      cityKeywords: [
        'lawton',
        'fort sill',
        'sill',
      ],
    },
    {
      id: 'cache-elgin-fringe',
      name: 'Cache, Elgin & northern fringe stock',
      shortName: 'Cache / Elgin',
      neighborhoods: [
        'Cache',
        'Elgin',
        'Northern US-62 corridors',
        'I-44 north residential edges',
        'Fringe multi-family pockets',
        'County-line growth edges',
      ],
      housingTypes: 'SFH, multi-family pockets, ranch and newer stock',
      challenges: [
        'US-62 / I-44 freeflow',
        'Longer empty miles vs central Lawton',
        'Mixed municipal rules',
      ],
      moverTips:
        'Clarify Cache, Elgin, and Lawton addresses. Price empty miles honestly. Prefer mid-week starts.',
      cityKeywords: [
        'cache',
        'elgin',
        'lawton',
      ],
    },
    {
      id: 'medicine-park-mountain',
      name: 'Medicine Park, Wichita Mountains edges & scenic approaches',
      shortName: 'Medicine Park / mountains',
      neighborhoods: [
        'Medicine Park',
        'Wichita Mountains edges',
        'Scenic approach roads',
        'Cabin and cottage stock',
        'Park-adjacent residential',
        'Mountain-edge lots',
      ],
      housingTypes: 'Cottage SFH, cabin stock, limited multi-unit, hillside approaches',
      challenges: [
        'Narrow approaches, pitch, and limited truck turnaround',
        'Seasonal tourism freeflow',
        'Weather and soft-shoulder risk',
      ],
      moverTips:
        'Survey approach roads before crew day. Confirm truck length limits. Prefer flexible weather windows.',
      cityKeywords: [
        'medicine park',
        'lawton',
      ],
    },
    {
      id: 'rural-comanche-fringe',
      name: 'Rural Comanche fringe, larger lots & farm-edge approaches',
      shortName: 'Rural fringe',
      neighborhoods: [
        'Rural Comanche County',
        'Farm-edge residential',
        'Larger-lot corridors',
        'Fletcher edges',
        'Geronimo edges',
        'US-281 fringe belts',
      ],
      housingTypes: 'Larger-lot SFH, ranch stock, farm-edge homes',
      challenges: [
        'Soft shoulders, pitch, and turnaround limits',
        'Long empty miles vs Lawton',
        'Gate codes and long driveways',
      ],
      moverTips:
        'Survey approach roads before crew day. Confirm truck length and turnarounds. Price empty miles honestly.',
      cityKeywords: [
        'fletcher',
        'geronimo',
        'lawton',
        'comanche county',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Comanche County moving costs',
    intro:
      'Access product, multi-unit turnover, PCS timing, and I-44 freeflow move the number more than packing skill alone — this is Lawton / Fort Sill-adjacent logistics, not OKC metro HOA pricing.',
    drivers: [
      {
        title: 'Off-post multi-unit & PCS calendar spikes',
        detail:
          'Military-adjacent turnover and timing risk add labor and schedule soft costs before packing skill matters.',
      },
      {
        title: 'Downtown stairs, basements & Lawton-grid curb',
        detail:
          'Older stock adds flight counts that flat-rate ranch optimism underprices.',
      },
      {
        title: 'I-44 · US-62 · US-281 congestion & empty miles',
        detail:
          'Cross-zone and regional pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Medicine Park & mountain-edge access',
        detail:
          'Narrow approaches and turnaround limits rewrite jobs that look simple on a map.',
      },
      {
        title: 'Multi-county & interstate (including PCS) empty miles',
        detail:
          'Regional Oklahoma destinations and out-of-state PCS legs raise staging distance and authority complexity when leaving Comanche County or Oklahoma.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,700+',
        note: 'Higher with multi-unit stairs or peak PCS windows',
      },
      {
        label: '2–3BR multi-unit, duplex, or mid-size SFH',
        value: '$1,300–$4,000+',
        note: 'Stairs and military-adjacent timing soft costs trend up',
      },
      {
        label: '3–4+ BR / cross-zone / mountain edge',
        value: '$2,500–$8,000+',
        note: 'Long approaches and regional pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$185+/hr',
        note: 'Portal-to-portal; packing, stairs, and empty miles scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Comanche County move',
    intro:
      'PCS calendars, school calendars, summer heat, severe-storm and tornado season, and winter ice reshape access and crew availability across Lawton and Fort Sill-adjacent belts.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease multi-unit windows, and reduce I-44 pain. Coordinate around PCS peaks when flexible.',
      },
      {
        title: 'Peak season: late May–mid-September + PCS waves',
        detail:
          'Military PCS seasons and family school calendars fill first. Book 2–4 weeks ahead for peak windows — earlier when orders lock summer dates.',
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
      id: 'comanche-fort-sill-lawton',
      title: 'Lawton grid, Fort Sill off-post & I-44 logistics module',
      intro:
        'Comanche County estimates fail more often on multi-unit surveys, PCS timing, approach roads, and I-44 freeflow than on packing skill alone.',
      bullets: [
        'Align military-adjacent jobs with PCS windows when orders and flexibility allow.',
        'Photo stair counts, curb options, and driveway access for Lawton grid and multi-unit stock.',
        'Price portal-to-portal time for any pair that rides I-44, US-62, or US-281 at peak.',
        'Survey Medicine Park and mountain-edge approaches before committing truck size.',
        'Clarify Lawton, Cache, Elgin, Medicine Park, and unincorporated addresses on every estimate.',
        'For in-state jobs verify OCC Household Goods Certificate; verify FMCSA for any out-of-state or interstate PCS leg.',
      ],
    },
    {
      id: 'not-okc-not-tulsa-southwest-regional',
      title: 'Not OKC metro · not Tulsa · southwest regional module',
      intro:
        'A single “Oklahoma rate” collapses when Lawton / Fort Sill-adjacent product is confused with Oklahoma County tower logistics or Tulsa river-city freeflow.',
      bullets: [
        'Do not price Lawton multi-unit like Bricktown elevators or like Broken Arrow HOA driveways.',
        'Keep Comanche vs Stephens vs Cotton county lines clear on multi-address estimates.',
        'Match PCS waves separately from pure civilian school-calendar peaks.',
        'Treat out-of-state and interstate PCS legs as FMCSA authority problems — OCC alone is not enough for interstate delivery.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Comanche County?',
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
              'Comanche County spans Lawton Public Schools plus Cache, Elgin, Fletcher, Geronimo, and other systems, with military-family enrollment patterns near Fort Sill. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'PCS mid-year arrivals and boundary edges can be competitive or process-heavy. Confirm enrollment windows early when relocating.',
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
              'Comanche County Memorial Hospital, southwestern regional clinics, and military healthcare access patterns near Fort Sill anchor care. Confirm insurance networks and TRICARE rules for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-44 freeflow changes “nearby” on paper. Transfer records early.',
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
              'Expect downtown Lawton older grids; Cache Road multi-family; Fort Sill off-post multi-unit; Cache–Elgin fringe SFH; Medicine Park cottage stock; rural larger lots.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by product and proximity to post. Budget for multi-unit deposits, older-building repair risk, and PCS timing constraints.',
          },
          {
            title: 'Building and multi-unit governance',
            detail:
              'Apartment and multi-unit management often control move hours, truck size, and deposits. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Central Lawton urban lifestyle',
            detail:
              'Suits people prioritizing services and shorter local trips — with older stock and curb tradeoffs on move day.',
          },
          {
            title: 'Fort Sill off-post military-adjacent living',
            detail:
              'Often appeals for post proximity — with multi-unit turnover, PCS calendars, and freeflow constraints.',
          },
          {
            title: 'Cache / Elgin fringe living',
            detail:
              'Fits households seeking relative space and newer stock — with empty miles to central Lawton.',
          },
          {
            title: 'Medicine Park / mountain-edge living',
            detail:
              'Attracts people prioritizing scenery — with approach-road and truck-access limits on move day.',
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
              'Fort Sill and defense-related employment, healthcare, education, retail, and regional services concentrate demand across Comanche County.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-44 and base freeflow are real. Test peak routes before choosing solely on rent or purchase price.',
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
              'Comanche County stacks Lawton urban services, Fort Sill adjacency, and Wichita Mountains scenery — different from OKC metro growth suburbs and Tulsa river-city patterns.',
          },
          {
            title: 'Climate',
            detail:
              'Southern plains climate with hot summers, severe-storm and tornado risk, and freeze-thaw winters. Plan outdoor staging, heat, and storm contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — PCS seasons, school calendars, and storm season reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Comanche County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify OCC Household Goods Certificate status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Comanche County, Oklahoma — official site',
        href: 'https://www.comanchecounty.us/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Lawton',
        href: 'https://www.lawtonok.gov/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'Fort Sill — official site',
        href: 'https://sill-www.army.mil/',
        external: true,
        note: 'Installation context for military-adjacent moves',
      },
      {
        label: 'OKGO — Oklahoma 511 traveler info',
        href: 'https://okgo.ok.gov/',
        external: true,
        note: 'I-44 / US-62 / US-281 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with multi-unit and PCS-window fluency for Fort Sill off-post product; stair and grid fluency for downtown Lawton stock; approach-road fluency for Medicine Park edges; honest I-44 · US-62 · US-281 timing for cross-zone pairs. Verify OCC Household Goods Certificate for intrastate moves (even within city limits) and FMCSA for interstate legs (including PCS) before deposits.',
  lastReviewed: '2026-07-24',
});
