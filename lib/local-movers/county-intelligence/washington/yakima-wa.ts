import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWaPack,
  WA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/washington/wa-shared';

/**
 * Yakima County, WA — central WA ag / regional hub
 * (not a Seattle clone).
 */
export const yakimaCountyWaIntelligence: CountyIntelligencePack = finalizeWaPack({
  countySlug: 'yakima',
  hubTitle: 'Yakima County Moving Intelligence Hub',
  eyebrow: 'Yakima · central WA ag hub, valley logistics & I-82 corridor',
  h1: 'Moving in Yakima County: Valley Access, Agricultural-Edge Logistics & I-82 Timing',
  heroOpener:
    'Yakima County is central Washington’s agricultural and regional hub — not a Seattle clone. Yakima city core and Nob Hill denseness, West Valley family product, Selah and Terrace Heights edges, Sunnyside–Grandview lower-valley towns, and orchard/vineyard-edge acreage that rewrites truck access after irrigation season. A downtown walk-up, a West Valley HOA two-story, a Selah hillside driveway, and a lower-valley farmhouse with outbuildings do not share crew skill or staging. I-82, US-12, SR-24, and SR-821 turn short map miles into billable hours when harvest traffic, summer heat, and winter fog collide. This hub is for people moving in Yakima County — not a renamed Puget Sound page or generic Washington template.',
  heroCredibility:
    'Washington UTC household goods permit for intrastate moves · FMCSA for interstate · Curated listings',
  majorCorridors: 'I-82 · US-12 · SR-24 · SR-821',
  whatMakesDifferent: {
    title: 'What makes moving in Yakima County different',
    intro:
      'These are Yakima Valley realities — agricultural calendars, inland climate, multi-town regional scale, and I-82 spine logistics — not Seattle high-rise elevators or Cascades-west rain-only patterns.',
    bullets: [
      {
        title: 'Central WA regional-hub scale, not Seattle-metro denseness',
        detail:
          'Crew density and specialty equipment are thinner than King County markets. Empty miles from Yakima core to Sunnyside, Toppenish, or Naches matter more than west-side micro-market volume.',
      },
      {
        title: 'Agricultural edges and outbuildings rewrite many “house” jobs',
        detail:
          'Orchard, vineyard, and farm-adjacent properties often include shops, cold storage, and long soft-shoulder drives that suburban SFH quotes underprice. Inventory outbuildings as separate scope.',
      },
      {
        title: 'Yakima core vs West Valley vs lower-valley towns is not one market',
        detail:
          'Downtown and Nob Hill access, West Valley planned product, Selah/Terrace Heights edges, and Sunnyside–Grandview small-city stock diverge — not a single “Yakima rate.”',
      },
      {
        title: 'I-82, US-12, SR-24, and SR-821 rewrite portal time',
        detail:
          'West Valley ↔ Selah, downtown ↔ Terrace Heights, or I-82 lower-valley pairs look local and still burn 25–55+ minutes at peak or harvest. Price portal-to-portal honestly.',
      },
      {
        title: 'Inland climate — heat, inversion fog, and valley wind',
        detail:
          'Yakima’s climate differs from maritime western Washington: hot dry summers, winter fog/inversion that slows highways, and dusty shoulder seasons. Prefer early starts and weather contingency.',
      },
      {
        title: 'Harvest and seasonal workforce housing create demand spikes',
        detail:
          'Agricultural calendars stack multifamily turnover and short-notice jobs that pure school-calendar Saturday models miss. Book ahead around peak harvest windows.',
      },
      {
        title: 'Cross-county central WA pairs are routine',
        detail:
          'Households regularly move Yakima ↔ Benton (Tri-Cities), Yakima ↔ Kittitas (Ellensburg), or toward the Cascades and Columbia Basin. Clarify addresses so Washington UTC HHG vs FMCSA interstate assumptions stay accurate when any leg leaves Washington.',
      },
      WA_REG_BULLET,
    ],
  },
  zonesHeading: 'Yakima County access zones',
  zonesIntro:
    'Plan by Yakima downtown / Nob Hill denseness, West Valley family growth, Selah and Terrace Heights edges, Sunnyside–Grandview lower valley, and Naches / canyon-gateway product — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'yakima-core-nob-hill',
      name: 'Yakima core, downtown & Nob Hill denseness',
      shortName: 'Core / Nob Hill',
      neighborhoods: [
        'Downtown Yakima',
        'Nob Hill',
        'Fruitvale edges',
        'Central Yakima grids',
        '16th / 40th corridor residential',
      ],
      housingTypes: 'Older SFH, walk-ups, garden apartments, mixed multifamily',
      challenges: [
        'Limited curb and multi-flight stairs on older stock',
        'I-82 / city arterial approach congestion',
        'Mixed alley and driveway staging by block',
      ],
      moverTips:
        'Photo curb options and stair counts. Prefer mid-week early starts. Confirm elevator or dock rules on denser product before the crew day.',
      cityKeywords: [
        'yakima',
        'nob hill',
        'downtown yakima',
        'fruitvale',
      ],
    },
    {
      id: 'west-valley',
      name: 'West Valley family growth & planned product',
      shortName: 'West Valley',
      neighborhoods: [
        'West Valley',
        'Ahtanum edges',
        'Wide Hollow edges',
        'West Valley HOA tracts',
        'Summitview corridor residential',
      ],
      housingTypes: 'Two-story SFH, townhomes, planned-community product, some acreage edges',
      challenges: [
        'HOA rules and truck limits on newer tracts',
        'School-calendar Saturday demand May–August',
        'Summer heat on open carries',
      ],
      moverTips:
        'Collect HOA packets early. Prefer early morning starts in peak heat. Price portal time back to downtown or Selah honestly.',
      cityKeywords: [
        'west valley',
        'ahtanum',
        'wide hollow',
        'summitview',
        'yakima',
      ],
    },
    {
      id: 'selah-terrace-heights',
      name: 'Selah, Terrace Heights & north/east edges',
      shortName: 'Selah / Terrace Heights',
      neighborhoods: [
        'Selah',
        'Terrace Heights',
        'East Selah edges',
        'Moxee edges',
        'SR-821 / canyon-adjacent residential',
      ],
      housingTypes: 'Family SFH, hillside lots, small-city grids, limited multifamily',
      challenges: [
        'Driveway grade on hillside and bench product',
        'US-12 / I-82 / SR-821 approach timing',
        'Empty miles from West Valley crews',
      ],
      moverTips:
        'Survey driveway grade and turn radius. Build US-12 and I-82 buffers. Photo soft shoulders on bench-edge lots.',
      cityKeywords: [
        'selah',
        'terrace heights',
        'moxee',
        'east selah',
      ],
    },
    {
      id: 'sunnyside-grandview-lower',
      name: 'Sunnyside, Grandview & lower Yakima Valley',
      shortName: 'Lower valley',
      neighborhoods: [
        'Sunnyside',
        'Grandview',
        'Toppenish edges',
        'Zillah edges',
        'I-82 lower-valley exits',
      ],
      housingTypes: 'Small-city SFH, workforce multifamily, agricultural-edge product',
      challenges: [
        'Long empty miles from Yakima core',
        'Harvest traffic on I-82 and local roads',
        'Bilingual communication and short-notice seasonal demand',
      ],
      moverTips:
        'Price empty miles and I-82 time honestly. Book around peak harvest when possible. Survey multifamily parking and rural driveway access carefully.',
      cityKeywords: [
        'sunnyside',
        'grandview',
        'toppenish',
        'zillah',
      ],
    },
    {
      id: 'naches-canyon-west',
      name: 'Naches, Tieton & Cascades-gateway west',
      shortName: 'Naches / Canyon',
      neighborhoods: [
        'Naches',
        'Tieton',
        'Nile edges',
        'US-12 west corridor',
        'Canyon and foothills lots',
      ],
      housingTypes: 'Small-town SFH, acreage, foothills and canyon-edge lots',
      challenges: [
        'Longer empty miles and thinner crew density',
        'US-12 weather and grade toward the Cascades',
        'Soft shoulders and limited truck turn radius',
      ],
      moverTips:
        'Price empty miles honestly. Survey grade and weather risk on US-12 approaches. Confirm winter contingency for mountain-gateway pairs.',
      cityKeywords: [
        'naches',
        'tieton',
        'nile',
        'yakima canyon',
      ],
    },
    {
      id: 'ag-edge-orchard',
      name: 'Orchard, vineyard & agricultural-edge lots',
      shortName: 'Ag edge',
      neighborhoods: [
        'Orchard-edge residential',
        'Vineyard-adjacent lots',
        'Irrigation-district edges',
        'County-road acreage',
        'Packing-shed corridor residential',
      ],
      housingTypes: 'Farmhouses, acreage SFH, shops and cold-storage outbuildings',
      challenges: [
        'Long soft-shoulder drives and gate access',
        'Outbuilding inventories beyond main-house scope',
        'Mud and dust depending on irrigation and harvest season',
      ],
      moverTips:
        'Inventory shops, barns, and cold storage as separate scope. Survey gate width and soft shoulders. Bring mats and confirm equipment for long carries.',
      cityKeywords: [
        'orchard',
        'vineyard',
        'acreage',
        'yakima valley',
        'wapato',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Yakima County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Stairs, HOA soft costs, ag-edge outbuildings, heat, and I-82 empty miles separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'I-82 · US-12 · SR-24 · SR-821 portal time',
        detail:
          'Cross-valley and multi-town pairs burn hours even when map miles look short — harvest traffic amplifies risk.',
      },
      {
        title: 'Core stairs, alleys & older-stock geometry',
        detail:
          'Downtown and Nob Hill product adds flight counts and curb friction that flat-rate optimism underprices.',
      },
      {
        title: 'HOA rules on West Valley growth tracts',
        detail:
          'Packet lead time, truck limits, and approved hours add soft costs before packing skill matters.',
      },
      {
        title: 'Agricultural outbuildings & rural access',
        detail:
          'Shops, cold storage, soft shoulders, and long carries dominate ag-edge jobs beyond main-house assumptions.',
      },
      {
        title: 'Heat, fog & multi-county empty miles',
        detail:
          'Summer heat slows exterior work; winter fog slows highways; Tri-Cities and Ellensburg destinations raise staging distance.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$400–$1,350+',
        note: 'Higher with stairs, heat delays, or peak I-82 pairs',
      },
      {
        label: '2–3BR apartment, townhome, or modest SFH',
        value: '$1,050–$3,400+',
        note: 'HOA soft costs and corridor buffers trend up',
      },
      {
        label: '3–4+ BR / ag-edge / cross-zone SFH',
        value: '$2,100–$6,800+',
        note: 'Outbuildings and long lower-valley pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$100–$170+/hr',
        note: 'Portal-to-portal; packing, HOA admin, and rural access scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Yakima County move',
    intro:
      'School calendars, harvest traffic, extreme summer heat, and winter valley fog reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease HOA hour rules, and reduce I-82 / arterial pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak season: late May–mid-September (watch harvest)',
        detail:
          'Family SFH Saturdays and seasonal housing turnover fill first. Book 2–4 weeks ahead. Summer heat often forces early starts; harvest can clog I-82 and farm roads.',
      },
      {
        title: 'Winter: fog, inversion, and cold snaps',
        detail:
          'November–February valley fog and ice can slow US-12 / I-82 approaches and shrink safe curb. Prefer flexible dates and early starts when visibility allows.',
      },
      {
        title: 'Agricultural and workforce mid-month spikes',
        detail:
          'Seasonal housing and food-processing calendars create short-notice demand outside pure school peaks. Confirm hard dates and storage-in-transit early.',
      },
    ],
  },
  specialized: [
    {
      id: 'yakima-valley-ag-access',
      title: 'Yakima Valley agricultural-edge & outbuilding module',
      intro:
        'Yakima estimates fail more often on rural access, outbuilding scope, and heat/harvest timing than on packing skill alone outside the core.',
      bullets: [
        'Inventory shops, barns, and cold storage as separate labor — not “a few extra boxes.”',
        'Survey gate width, soft shoulders, and irrigation-season mud before finalizing truck size.',
        'Price empty miles to Sunnyside, Grandview, Toppenish, and Naches honestly from Yakima core.',
        'Prefer early starts in peak summer heat; plan dust and tarp protection on open carries.',
        'Build harvest-traffic buffers on I-82 and farm-road approaches late summer into fall.',
        'Verify Washington UTC household goods permit for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'yakima-zone-micro-markets',
      title: 'Core / West Valley / lower-valley micro-market module',
      intro:
        'A single “Yakima rate” collapses when downtown walk-ups, West Valley HOA product, and lower-valley small-city stock diverge.',
      bullets: [
        'Survey by zone product — core stairs, West Valley HOA SFH, Selah hillside, or lower-valley multifamily — not by county name alone.',
        'Ask which approach corridors the crew will actually use (I-82 vs US-12 vs SR-24 vs SR-821).',
        'Collect HOA packets for West Valley planned tracts before the survey is final.',
        'Clarify multi-town destinations so portal time and authority assumptions stay accurate.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Yakima County?',
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
              'Yakima, West Valley, Selah, East Valley, Sunnyside, Grandview, Toppenish, Zillah, and other districts cover different address bands. Assignment is address-based — marketing names like Nob Hill or West Valley do not guarantee a campus.',
          },
          {
            title: 'Higher education anchors',
            detail:
              'Yakima Valley College and other programs shape some multifamily and workforce housing demand near core and corridor addresses.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, OSPI data, and campus visits beat ranking screenshots alone. Confirm enrollment windows early when relocating mid-year.',
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
              'MultiCare Yakima Memorial and Astria/regional networks anchor much of valley care. Specialty referrals may route to the Tri-Cities, Spokane, or Seattle — confirm insurance networks.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from West Valley, Selah, or lower-valley towns to preferred campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core grids, West Valley growth & valley towns',
            detail:
              'Expect older SFH and apartments near downtown/Nob Hill; newer family product in West Valley; hillside and small-city stock in Selah and Terrace Heights; and lower-cost small-city mixes toward Sunnyside and Grandview.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by zone and school district. Budget for irrigation/yard costs, summer cooling, HOA dues on growth tracts, and ag-edge property complexity.',
          },
          {
            title: 'HOA and rural governance',
            detail:
              'Planned-community associations control move hours and truck size in growth areas; rural lots may involve easements and shared access. Read documents carefully before closing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Yakima County areas fit whom',
        bullets: [
          {
            title: 'Yakima core / Nob Hill',
            detail:
              'Suits people prioritizing central amenities and shorter in-city trips — with older-stock stairs and curb tradeoffs.',
          },
          {
            title: 'West Valley family living',
            detail:
              'Often appeals for newer homes and schools — with HOA rules and summer heat on move day.',
          },
          {
            title: 'Selah / Terrace Heights edges',
            detail:
              'Attracts households seeking small-city character or views — with grade and corridor timing.',
          },
          {
            title: 'Lower valley or Naches gateway',
            detail:
              'Fits buyers chasing lower costs, ag-edge space, or Cascades access — with empty miles and different job geography.',
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
              'Agriculture and food processing, healthcare, government, logistics, retail, and regional services concentrate demand. Seasonal agricultural employment shapes housing pressure in lower-valley towns.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-82, US-12, and local arterials define peaks. Test drive routes at rush hour and during harvest — lower-valley to Yakima core is not a trivial hop when freight and farm traffic stack.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Central Washington valley living',
            detail:
              'Yakima stacks regional-city amenities, agricultural landscape, wine and outdoor recreation, and multi-town geography — different from Seattle condo belts or coastal rain cities.',
          },
          {
            title: 'Climate',
            detail:
              'Hot dry summers, cold winters with fog/inversion risk, and abundant sun. Plan outdoor staging for heat and dust — not maritime drizzle alone.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Valley food culture, outdoor access toward the Cascades and river corridors, and a practical agricultural-economy pace. Visit in July heat and during harvest when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Yakima County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Washington UTC household goods permit status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Yakima County — official site',
        href: 'https://www.yakimacounty.us/',
        external: true,
        note: 'County services & permits context',
      },
      {
        label: 'City of Yakima — official site',
        href: 'https://www.yakimawa.gov/',
        external: true,
        note: 'City services & street-use context',
      },
      {
        label: 'Yakima School District',
        href: 'https://www.yakimaschools.org/',
        external: true,
        note: 'Boundaries & calendars (city district)',
      },
      {
        label: 'WSDOT — traffic & road conditions',
        href: 'https://wsdot.com/travel/real-time/',
        external: true,
        note: 'I-82 / US-12 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with Yakima core stair/curb experience; West Valley HOA fluency; ag-edge outbuilding and soft-shoulder readiness; honest I-82 · US-12 · SR-24 · SR-821 timing for multi-town pairs; inland heat/fog awareness. Verify Washington UTC household goods permit for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
