import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWaPack,
  WA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/washington/wa-shared';

/**
 * Kitsap County, WA — peninsula + ferry timing (not King Eastside, not Seattle hills clone).
 */
export const kitsapCountyWaIntelligence: CountyIntelligencePack = finalizeWaPack({
  countySlug: 'kitsap',
  hubTitle: 'Kitsap County Moving Intelligence Hub',
  eyebrow: 'Kitsap · peninsula access, ferry timing & naval-corridor logistics',
  h1: 'Moving in Kitsap County: Peninsula Access, Ferry Timing & Naval Corridor Logistics',
  heroOpener:
    'Kitsap County is not an Eastside HOA rename and not a Seattle hill-street clone — it is a peninsula market defined by ferry schedules, SR-3 and SR-16 bridge approaches, naval and defense-adjacent workforce housing, and town clusters from Bremerton and Silverdale to Poulsbo, Port Orchard, and Bainbridge Island. A Bremerton multifamily near the waterfront, a Bainbridge ferry-timed load, a Silverdale HOA two-story, and a rural-north Kitsap long driveway do not share truck access or crew skill. SR-3, SR-16, SR-303, and ferry approaches rewrite “local” estimates that ignore sailing windows, bridge freeflow, and peninsula empty miles. This hub is for people moving in Kitsap County — not a renamed King County page or generic Puget Sound template.',
  heroCredibility:
    'Washington UTC household goods permit for intrastate moves · FMCSA for interstate · Peninsula ferry timing & naval-corridor logistics awareness · Curated listings',
  majorCorridors: 'SR-3 · SR-16 · SR-303 · ferry approaches',
  whatMakesDifferent: {
    title: 'What makes moving in Kitsap County different',
    intro:
      'These are Kitsap peninsula realities — ferry sailing windows, bridge approaches, and naval-corridor housing — not Bellevue elevators, Seattle hill walk-ups, or Tacoma JBLM inland PCS grids.',
    bullets: [
      {
        title: 'Ferry schedules can become the critical path',
        detail:
          'Bainbridge, Bremerton, Kingston, and Southworth-linked jobs live or die on sailing windows, terminal traffic, and vehicle reservations when required. A quote that ignores ferry timing is not a Kitsap quote — it is a mainland fantasy.',
      },
      {
        title: 'Peninsula empty miles and bridge approaches rewrite portal time',
        detail:
          'Port Orchard ↔ Poulsbo, Silverdale ↔ Bainbridge, or Bremerton ↔ Gig Harbor pairs look short on a state map and still burn hours when SR-16, SR-3, or terminal approaches collapse. Price portal-to-portal honestly.',
      },
      {
        title: 'Naval and defense-adjacent housing has its own calendar',
        detail:
          'Puget Sound Naval Shipyard and regional defense workforce turnover create mid-month spikes, apartment turnover near Bremerton/Silverdale, and inventory patterns that pure civilian Saturday SFH markets underprice.',
      },
      {
        title: 'Island and waterfront product is not inland Silverdale product',
        detail:
          'Bainbridge Island, waterfront lots, and narrow residential approaches need different truck length, grade, and staging plans than Silverdale or Central Kitsap HOA tracts. Do not reuse one “Kitsap rate.”',
      },
      {
        title: 'Rain, grades, and long driveways reshape open carries',
        detail:
          'Wet grades, forested lots, and limited turn radius are common outside commercial cores. Prefer early starts, mats and tarps, and driveway photos before final labor hours.',
      },
      {
        title: 'Cross-Sound pairs into King or Pierce need dual logistics plans',
        detail:
          'Households regularly combine a peninsula load with a Seattle, Bellevue, or Tacoma unload (or the reverse). Build ferry or bridge buffers on both ends and clarify which address drives the schedule.',
      },
      {
        title: 'Multi-county Puget Sound pairs are routine',
        detail:
          'Moves Kitsap ↔ King, Pierce, Snohomish, or Thurston are common. Clarify addresses so Washington UTC household goods permit vs FMCSA interstate assumptions stay accurate when any leg leaves Washington.',
      },
      WA_REG_BULLET,
    ],
  },
  zonesHeading: 'Kitsap County access zones',
  zonesIntro:
    'Plan by Bremerton naval and waterfront product, Silverdale central commercial/residential, Bainbridge Island ferry logistics, north Kitsap (Poulsbo/Kingston), and south Kitsap (Port Orchard) — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'bremerton-naval',
      name: 'Bremerton, naval corridor & waterfront edges',
      shortName: 'Bremerton / naval',
      neighborhoods: [
        'Downtown Bremerton',
        'Manette edges',
        'West Bremerton',
        'East Bremerton',
        'Naval-adjacent multifamily',
      ],
      housingTypes: 'Apartments, older SFH, mid-rise multifamily, workforce rentals',
      challenges: [
        'Ferry terminal and waterfront approach congestion',
        'Stairs, curb limits, and guest-parking friction',
        'Defense workforce mid-month turnover spikes',
      ],
      moverTips:
        'Align crew start with ferry or shift windows when either address is terminal-adjacent. Photo curb and apartment access. Ask about hard report or lease dates early.',
      cityKeywords: [
        'bremerton',
        'manette',
        'west bremerton',
        'east bremerton',
        'naval',
      ],
    },
    {
      id: 'silverdale-central',
      name: 'Silverdale, Central Kitsap & commercial-residential core',
      shortName: 'Silverdale / Central',
      neighborhoods: [
        'Silverdale',
        'Central Kitsap',
        'Tracyton edges',
        'Chico edges',
        'Illahee edges',
      ],
      housingTypes: 'HOA SFH, townhomes, apartments, commercial-edge multifamily',
      challenges: [
        'SR-3 / SR-303 congestion clusters',
        'HOA gate lists and truck-length rules',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Confirm HOA rules before the crew day. Price SR-3 and SR-303 buffers for Bremerton- or north-county pairs. Survey driveway turn radius.',
      cityKeywords: [
        'silverdale',
        'central kitsap',
        'tracyton',
        'chico',
        'illahee',
      ],
    },
    {
      id: 'bainbridge-island',
      name: 'Bainbridge Island & ferry-timed product',
      shortName: 'Bainbridge',
      neighborhoods: [
        'Winslow',
        'Bainbridge Island',
        'Ferry terminal approaches',
        'Island residential neighborhoods',
      ],
      housingTypes: 'SFH, water-view lots, limited multifamily, higher-value inventories',
      challenges: [
        'Ferry sailing windows and terminal vehicle queues',
        'Narrow residential approaches and tree-lined curb',
        'Longer empty miles and schedule rigidity',
      ],
      moverTips:
        'Build the estimate around sailings, not odometer miles. Confirm truck length and reservation needs. Photo driveway grade and curb before finalizing labor.',
      cityKeywords: [
        'bainbridge',
        'bainbridge island',
        'winslow',
        'ferry',
      ],
    },
    {
      id: 'north-kitsap',
      name: 'North Kitsap (Poulsbo, Kingston, Suquamish edges)',
      shortName: 'North Kitsap',
      neighborhoods: [
        'Poulsbo',
        'Kingston',
        'Suquamish edges',
        'Hansville edges',
        'Keyport edges',
      ],
      housingTypes: 'SFH, townhomes, limited multifamily, waterfront and rural-edge lots',
      challenges: [
        'Kingston ferry approach timing',
        'SR-3 / SR-104 links and longer peninsula runs',
        'Long driveways and rain-slick residential streets',
      ],
      moverTips:
        'Align Kingston-linked jobs with sailing windows. Survey driveway length and turnaround. Price empty miles from Bremerton or Silverdale yards honestly.',
      cityKeywords: [
        'poulsbo',
        'kingston',
        'suquamish',
        'hansville',
        'keyport',
      ],
    },
    {
      id: 'south-kitsap',
      name: 'South Kitsap (Port Orchard, Manchester, Southworth edges)',
      shortName: 'South Kitsap',
      neighborhoods: [
        'Port Orchard',
        'Manchester edges',
        'Southworth edges',
        'Olalla edges',
        'Bethel edges',
      ],
      housingTypes: 'SFH, townhomes, apartments, rural-edge lots',
      challenges: [
        'SR-16 bridge approaches toward Pierce',
        'Southworth ferry timing when used',
        'Mixed hillside driveway grades',
      ],
      moverTips:
        'Price SR-16 portal time for Tacoma-linked pairs. Confirm ferry vs bridge routing with the customer. Photo driveway grade and curb options.',
      cityKeywords: [
        'port orchard',
        'manchester',
        'southworth',
        'olalla',
        'bethel',
      ],
    },
    {
      id: 'west-sound-rural',
      name: 'West Sound rural edges & long-driveway stock',
      shortName: 'Rural edges',
      neighborhoods: [
        'Seabeck edges',
        'Holly edges',
        'Tahuya-adjacent edges',
        'Interior forested residential',
        'Long-driveway acreage pockets',
      ],
      housingTypes: 'Acreage SFH, manufactured homes, limited multifamily',
      challenges: [
        'Long carries and limited truck turn radius',
        'Unimproved or soft driveway risk after rain',
        'Longer empty miles from commercial cores',
      ],
      moverTips:
        'Survey driveway surface, grade, and turnaround with photos or video. Prefer smaller trucks or shuttle plans when full-size access fails. Build weather contingency.',
      cityKeywords: [
        'seabeck',
        'holly',
        'tahuya',
        'kitsap rural',
        'west sound',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Kitsap County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Ferry timing soft costs, peninsula empty miles, driveway friction, and SR-3 / SR-16 portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Ferry sailing windows & terminal queues',
        detail:
          'Missed sailings, wait times, and reservation friction rewrite crew hours before packing skill matters.',
      },
      {
        title: 'SR-3 · SR-16 · SR-303 bridge and arterial congestion',
        detail:
          'Cross-peninsula and Pierce-linked pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Long driveways, grades & rural staging',
        detail:
          'Forested lots and limited turn radius add carries and shuttle risk that flat-rate optimism underprices.',
      },
      {
        title: 'Naval-corridor apartment & HOA packets',
        detail:
          'Bremerton multifamily and Silverdale HOAs add timed windows and parking friction.',
      },
      {
        title: 'Cross-Sound empty miles into King or Pierce',
        detail:
          'Seattle, Bellevue, and Tacoma destinations raise staging distance, ferry/bridge buffers, and authority complexity when any leg leaves Washington.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,700+',
        note: 'Higher with ferry timing, stairs, or peak SR-16 pairs',
      },
      {
        label: '2–3BR condo, apartment, or townhome',
        value: '$1,300–$4,200+',
        note: 'Ferry buffers and parking friction trend up',
      },
      {
        label: '3–4+ BR / island / cross-Sound SFH',
        value: '$2,700–$9,000+',
        note: 'Ferry-timed and long peninsula pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$210+/hr',
        note: 'Portal-to-portal; ferry wait, packing, and long carries scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Kitsap County move',
    intro:
      'Ferry demand, tourist peaks, naval calendars, school windows, and rain reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early sailings and early starts',
        detail:
          'Tuesday–Thursday early ferry or road starts reduce terminal queues and SR-3 / SR-16 pain. Avoid holiday weekends when tourist ferry demand peaks.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family SFH Saturdays and summer ferry congestion fill first. Book 2–4 weeks ahead for peak weekends and island jobs; align ferry-timed moves with sailings early.',
      },
      {
        title: 'Rain season driveway and grade friction',
        detail:
          'Fall–spring wet grades and soft rural driveways slow open carries. Prefer early starts, mats, tarps, and flexible weather windows on long-driveway stock.',
      },
      {
        title: 'Naval and mid-month workforce spikes',
        detail:
          'Defense-linked and shipyard-adjacent relocations often land mid-month. Confirm hard dates, temporary housing, and storage-in-transit early.',
      },
    ],
  },
  specialized: [
    {
      id: 'ferry-peninsula-logistics',
      title: 'Ferry timing & peninsula logistics module',
      intro:
        'Kitsap estimates fail more often on ferry windows, bridge freeflow, and long-driveway access than on packing skill alone.',
      bullets: [
        'Build the schedule around sailings and terminal approaches — not map miles alone — for Bainbridge, Bremerton, Kingston, and Southworth-linked jobs.',
        'Confirm truck length, vehicle reservation needs, and ferry vs SR-16 bridge routing in writing.',
        'Price portal-to-portal time for any pair that rides SR-3, SR-16, SR-303, or ferry approaches at peak.',
        'Photo driveway grade, surface, and turnaround for rural and island stock; plan shuttle trucks when full-size access fails.',
        'Clarify Kitsap vs King vs Pierce addresses on every cross-Sound estimate.',
        'Ask naval and defense-adjacent households about hard dates and partial loads at estimate time.',
        'Verify Washington UTC household goods permit for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'kitsap-micro-markets',
      title: 'Island / naval / inland micro-market module',
      intro:
        'A single “Kitsap rate” collapses when ferry-island, Bremerton multifamily, and Silverdale HOA product diverge.',
      bullets: [
        'Survey by product — island SFH, naval-corridor apartment, or inland HOA two-story — not by county name alone.',
        'Ask which ferry or highway approach the crew will actually use at load and unload.',
        'Match higher-value waterfront inventories and workforce multifamily inventories to different crew experience.',
        'Expect different staging norms a few towns apart; do not assume one truck plan covers both addresses.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Kitsap County?',
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
              'Bremerton, Central Kitsap, North Kitsap, South Kitsap, Bainbridge Island, and other districts cover the county. Assignment is address-based — marketing names do not guarantee a campus.',
          },
          {
            title: 'Peninsula geography & transportation',
            detail:
              'Distances between towns matter more than in dense Seattle grids. Confirm bus routes, drive times, and enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, OSPI data, and campus visits beat ranking screenshots alone.',
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
              'Virginia Mason Franciscan (St. Michael Medical Center and related campuses), naval medical options for eligible beneficiaries, and Seattle specialty care via ferry or bridge are common patterns. Confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive and ferry times from Poulsbo, Port Orchard, or Bainbridge to preferred campuses — sailing windows change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Island SFH, naval multifamily & inland HOA product',
            detail:
              'Expect higher-value and water-view stock on Bainbridge and waterfront pockets; apartments and older SFH near Bremerton; HOA and commercial-edge product in Silverdale; and rural lots outside the cores.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by town and water access. Budget for ferry costs in lifestyle math, HOA dues, and older-building or septic/well realities on rural lots.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Condo associations and suburban HOAs often control move hours, truck size, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Kitsap areas fit whom',
        bullets: [
          {
            title: 'Bremerton urban-naval lifestyle',
            detail:
              'Suits people prioritizing employment proximity and ferry access to Seattle — with multifamily access and terminal congestion on move day.',
          },
          {
            title: 'Silverdale and Central Kitsap convenience',
            detail:
              'Often appeals for services, retail, and mid-peninsula location — with HOA rules and SR-3 / SR-303 timing.',
          },
          {
            title: 'Bainbridge Island character living',
            detail:
              'Attracts households seeking island amenities and Seattle ferry access — with sailing-window rigidity and higher inventory complexity.',
          },
          {
            title: 'North and south Kitsap quieter towns',
            detail:
              'Fits buyers chasing Poulsbo, Kingston, or Port Orchard scale — with longer peninsula runs and ferry or bridge commute realism.',
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
              'Naval shipyard and defense-adjacent work, healthcare, education, retail/services in Silverdale, and ferry-commute professional jobs in Seattle concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households mix driving and ferries. SR-3, SR-16, SR-303, and ferry peaks are real. Test drive or ride peak routes and sailings before choosing solely on rent or purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, many Kitsaps',
            detail:
              'Kitsap stacks island living, naval-corridor energy, commercial central Kitsap, and rural forested edges — different from King County’s Seattle–Eastside tech stack or Pierce’s Tacoma–JBLM inland rhythm.',
          },
          {
            title: 'Climate',
            detail:
              'Mild wet winters, drier summers, and year-round rain risk on grades and rural driveways. Plan outdoor staging and wet-weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Ferry-commute professional culture, naval workforce rhythm, small-town Main Streets, and outdoor access coexist. Visit at peak ferry times and quiet mid-week days when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Kitsap County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Washington UTC household goods permit status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Kitsap County — official site',
        href: 'https://www.kitsapgov.com/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'Washington State Ferries',
        href: 'https://wsdot.wa.gov/travel/washington-state-ferries',
        external: true,
        note: 'Schedules & terminal info for timed moves',
      },
      {
        label: 'City of Bremerton',
        href: 'https://www.bremertonwa.gov/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'WS-DOT traffic & travel alerts',
        href: 'https://wsdot.com/travel/real-time/',
        external: true,
        note: 'SR-3 / SR-16 / ferry approaches before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with ferry-window discipline for Bainbridge, Bremerton, Kingston, and Southworth-linked jobs; peninsula empty-mile honesty on SR-3 · SR-16 · SR-303; long-driveway and grade fluency for rural stock; naval-corridor apartment readiness. Verify Washington UTC household goods permit for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
