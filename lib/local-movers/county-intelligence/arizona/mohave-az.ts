import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Mohave County, Arizona moving intelligence.
 * Differentiators: northwest Arizona scale, longer regional hauls between dispersed
 * communities, desert heat, river/recreation edges — NOT Phoenix Valley or
 * Prescott elevation scripts.
 */
export const mohaveCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'arizona',
  countySlug: 'mohave',
  hubTitle: 'Mohave County Moving Intelligence Hub',
  eyebrow: 'Mohave County · Northwest Arizona dispersed communities',
  h1: 'Moving in Mohave County: Northwest Arizona Distance, Heat & Dispersed Town Logistics',
  heroOpener:
    'Mohave County is not a single metro with suburbs. It is northwest Arizona at scale — Kingman along the I-40/I-40 corridor spine, Lake Havasu City and Colorado River recreation edges, Bullhead City across from Laughlin, and far-flung communities separated by long desert highway miles. A “local” move often is not local at all: crew deadhead, heat exposure, and equipment availability track dispersed towns more than continuous suburban fabric. Summer heat is extreme on river and low-desert floors; wind and dust punish open staging; interstate and state-line legs toward Nevada, California, or Utah are common. This guide is for people actually moving in Mohave — longer regional hauls, heat discipline, and town-by-town access — not a recycled Valley or high-country pack.',
  heroCredibility:
    'Arizona Corporation Commission (ACC) entity verification · FMCSA USDOT for interstate legs · Dispersed NW Arizona logistics · Curated directory listings',
  collapsibleDeepContent: true,
  sectionOrder: [
    'whatMakesDifferent',
    'zones',
    'costDrivers',
    'seasonal',
    'specialized',
    'relocation',
    'resources',
  ],
  whatMakesDifferent: {
    title: 'What makes moving in Mohave County different',
    intro:
      'Distance between towns, extreme low-desert heat, and multi-state edge logistics define estimates here — not continuous metro density.',
    bullets: [
      {
        title: 'Dispersed communities break “local” pricing',
        detail:
          'Kingman, Lake Havasu City, Bullhead City, and smaller towns sit far enough apart that same-county pairs can bill like regional hauls. Always name exact origin and destination cities — never accept a vague “Mohave local” rate without miles and portal time.',
      },
      {
        title: 'Northwest Arizona is a long-haul geography',
        detail:
          'I-40, US-93, and river corridors create long deadhead. Crew density is lower than Phoenix; equipment may stage from the nearest town, not from a central metro warehouse.',
      },
      {
        title: 'Extreme heat is a first-order operational risk',
        detail:
          'River and low-desert floors run very hot for much of the year. Early starts, hydration, electronics protection, and shaded staging are safety requirements — not optional polish.',
      },
      {
        title: 'River / recreation markets have their own calendars',
        detail:
          'Lake Havasu and Colorado River edges spike with snowbird, second-home, and holiday visitor demand. Waterfront, hillside, and HOA lake communities need access plans Valley suburbs never write.',
      },
      {
        title: 'State-line adjacency is routine',
        detail:
          'Bullhead City–Laughlin, California desert approaches, and Nevada corridors mean interstate authority questions appear more often than in interior Arizona counties. Confirm FMCSA when any leg crosses a state line.',
      },
      {
        title: 'Wind, dust, and monsoons affect outdoor packing',
        detail:
          'Open desert staging is grit-prone; monsoon bursts and dust events can pause work. Flexible dates beat rigid Saturday-only plans in windy stretches.',
      },
      {
        title: 'Smaller towns and rural parcels need access surveys',
        detail:
          'Manufactured-home parks, long dirt drives, and limited turnaround appear frequently outside core retail corridors. Share photos before booking.',
      },
      {
        title: 'ACC entity checks + FMCSA when interstate',
        detail:
          'Arizona does not operate a separate statewide household-goods mover license program like some states. Verify business entity status via the Arizona Corporation Commission (ACC), and confirm active FMCSA USDOT (and usually MC) authority for interstate legs. ACC registration alone is not a household-goods operating license.',
      },
    ],
  },
  zonesHeading: 'Mohave County zones: corridor towns, river edges & dispersed pockets',
  zonesIntro:
    'Plan by Kingman / I-40, Lake Havasu City, Bullhead City / river, Golden Valley / rural west, and far north or remote communities — each is a logistics island more than a continuous suburb.',
  zones: [
    {
      id: 'kingman-corridor',
      name: 'Kingman & I-40 / US-93 corridor',
      shortName: 'Kingman',
      neighborhoods: [
        'Kingman core',
        'I-40 corridor residential',
        'Hualapai Mountain approaches',
        'Industrial and multi-family edges',
        'Corridor-adjacent growth tracts',
      ],
      housingTypes:
        'SFH, manufactured homes, apartments, some hillside and larger-lot edges',
      challenges: [
        'Freight and interstate traffic timing',
        'Elevation transitions toward mountain edges',
        'Heat and wind on open staging',
        'Long deadhead to river cities',
      ],
      moverTips:
        'Price Kingman ↔ Havasu or Bullhead as regional hauls, not neighborhood locals. Share mountain-approach photos when applicable. Prefer earliest summer starts.',
      cityKeywords: [
        'kingman',
        'hualapai',
        'i-40',
        'us-93',
        'mohave valley kingman',
      ],
    },
    {
      id: 'lake-havasu',
      name: 'Lake Havasu City & lake recreation edge',
      shortName: 'Lake Havasu',
      neighborhoods: [
        'Lake Havasu City core',
        'Channel and lake-adjacent neighborhoods',
        'Hillside / view lots',
        'HOA and planned lake communities',
        'Multi-family and snowbird corridors',
      ],
      housingTypes:
        'SFH, lake-view custom, condos, townhomes, seasonal/second-home stock',
      challenges: [
        'Hillside grades and limited turnaround',
        'HOA and gate rules near lake communities',
        'Extreme heat and reflective waterfront staging',
        'Snowbird and holiday demand spikes',
      ],
      moverTips:
        'Treat lake-view and hillside addresses as access-first jobs. Collect HOA packets early. Book snowbird season and holiday weekends far ahead.',
      cityKeywords: [
        'lake havasu',
        'lake havasu city',
        'havasu',
        'london bridge',
      ],
    },
    {
      id: 'bullhead-river',
      name: 'Bullhead City, Mohave Valley & river corridor',
      shortName: 'Bullhead / River',
      neighborhoods: [
        'Bullhead City',
        'Mohave Valley',
        'River-adjacent residential',
        'Fort Mohave edges',
        'Cross-river Laughlin-oriented corridors',
      ],
      housingTypes:
        'SFH, manufactured homes, multi-family, retirement and casino-economy rentals',
      challenges: [
        'Extreme summer heat on the river floor',
        'State-line and casino-corridor traffic patterns',
        'Mixed park and older-grid access',
        'Interstate authority when Nevada addresses appear',
      ],
      moverTips:
        'Confirm whether either address is AZ-only or crosses into Nevada. Plan dawn starts May–September. Inventory carefully for heat-sensitive goods.',
      cityKeywords: [
        'bullhead',
        'bullhead city',
        'mohave valley',
        'fort mohave',
        'laughlin',
      ],
    },
    {
      id: 'golden-valley-rural-west',
      name: 'Golden Valley, Dolan Springs edge & rural west',
      shortName: 'Golden Valley / Rural',
      neighborhoods: [
        'Golden Valley',
        'Dolan Springs edge',
        'Rural large-lot parcels',
        'Long private drives',
        'Dispersed unincorporated homes',
      ],
      housingTypes:
        'Manufactured and modular, larger-lot SFH, off-grid-leaning and rural stock',
      challenges: [
        'Long dirt or imperfect approaches',
        'Limited truck turnaround and soft shoulders',
        'Lower crew density and longer response times',
        'Wind, dust, and heat on open lots',
      ],
      moverTips:
        'Send driveway surface, width, and gate photos. Ask about shuttle plans. Do not assume Kingman “local” rates cover far rural parcels without mileage.',
      cityKeywords: [
        'golden valley',
        'dolan springs',
        'rural mohave',
        'unincorporated mohave',
      ],
    },
    {
      id: 'colorado-city-north',
      name: 'Colorado City, far north & remote Mohave pockets',
      shortName: 'Far North / Remote',
      neighborhoods: [
        'Colorado City area',
        'Far north corridor communities',
        'Remote highway-adjacent parcels',
        'Utah-line approaches (as applicable)',
        'Low-density residential clusters',
      ],
      housingTypes:
        'Community SFH, larger-lot and rural product, limited multi-unit',
      challenges: [
        'Very long deadhead from Kingman or river crews',
        'Limited equipment availability',
        'Weather and highway-only access risk',
        'Interstate adjacency toward Utah',
      ],
      moverTips:
        'Treat far-north jobs as regional or long-distance style planning. Confirm crew origin, overnight needs, and FMCSA if any Utah address is involved.',
      cityKeywords: [
        'colorado city',
        'centennial park',
        'far north mohave',
        'utah line',
      ],
    },
    {
      id: 'havasu-outlying',
      name: 'Desert Hills, Topock edge & outlying river/desert',
      shortName: 'Outlying river/desert',
      neighborhoods: [
        'Desert Hills',
        'Topock / Golden Shores edges',
        'Parker Strip approaches (as applicable)',
        'Highway-adjacent desert tracts',
        'Recreation-oriented parcels',
      ],
      housingTypes:
        'Manufactured homes, vacation/recreation stock, larger-lot desert SFH',
      challenges: [
        'Longer hauls from primary town cores',
        'Recreation traffic on peak weekends',
        'Heat and limited shade for staging',
        'Variable road quality into parcels',
      ],
      moverTips:
        'Price outlying river/desert pairs with honest deadhead. Share approach photos. Avoid holiday river weekends when possible.',
      cityKeywords: [
        'desert hills',
        'topock',
        'golden shores',
        'parker strip',
        'outlying havasu',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Mohave County',
    intro:
      'Distance between towns, heat pacing, hillside/lake access, and interstate edges move the quote more than square footage alone — this is dispersed northwest Arizona logistics.',
    drivers: [
      {
        title: 'Inter-town deadhead and regional “locals”',
        detail:
          'Kingman ↔ Lake Havasu ↔ Bullhead pairs can burn hours of empty or loaded highway time. Portal-to-portal language matters.',
      },
      {
        title: 'Extreme heat labor and scheduling',
        detail:
          'Safe summer pacing may require earlier starts, extra crew, or multi-day plans on large inventories.',
      },
      {
        title: 'Hillside / lake / HOA access',
        detail:
          'Grades, gates, and limited staging on Havasu view lots add carry labor that flat desert lots do not.',
      },
      {
        title: 'Rural and manufactured-park access',
        detail:
          'Long drives, soft surfaces, and tight park streets require surveys and sometimes smaller equipment.',
      },
      {
        title: 'Interstate and multi-state edges',
        detail:
          'Nevada/California/Utah legs change authority, pricing, and transit assumptions — confirm FMCSA before deposit.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same town, simple access)',
        value: '$350–$1,200+',
        note: 'Higher with heat peaks, parks, or hillside carries',
      },
      {
        label: '2–3BR house / apartment (same town)',
        value: '$1,000–$3,400+',
        note: 'Lake-view and HOA access trend up',
      },
      {
        label: '3–4+ BR or inter-town / regional Mohave',
        value: '$1,900–$6,500+',
        note: 'Cross-town desert hauls and remote jobs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$95–$170+/hr',
        note: 'Portal-to-portal; long deadhead may bill as travel or flat regional',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, heat, wind & snowbird-calendar intelligence',
    intro:
      'Extreme summer heat, snowbird and recreation peaks, and wind/dust events set demand more than school-suburb calendars alone.',
    items: [
      {
        title: 'Extreme summer heat (primary constraint)',
        detail:
          'River and low-desert afternoons can make open staging unsafe. Prefer earliest morning starts roughly May–September; protect electronics and sealed goods.',
      },
      {
        title: 'Snowbird and second-home windows',
        detail:
          'Fall through spring fills lake and river communities with seasonal arrivals and departures. Book early for known seasonal transitions.',
      },
      {
        title: 'Holiday and recreation weekends',
        detail:
          'Lake and river holiday peaks crush access and lodging-adjacent curb space. Mid-week moves save clock time.',
      },
      {
        title: 'Wind and dust events',
        detail:
          'High winds can pause outdoor packing and grit-contaminate inventory. Keep flexible date language.',
      },
      {
        title: 'Best value: mid-week dawn starts outside holiday crush',
        detail:
          'Avoid major river holiday weekends and month-end Saturday peaks when possible.',
      },
    ],
  },
  specialized: [
    {
      id: 'dispersed-nw-regional-hauls',
      title: 'Dispersed northwest Arizona regional haul module',
      intro:
        'Mohave’s core logistics problem is distance between communities — treat multi-town pairs as regional jobs with honest deadhead.',
      bullets: [
        'Never accept a single “Mohave local” price without exact cities, loaded miles, and portal-time rules.',
        'Ask where the crew and truck stage overnight when origin and destination are hours apart.',
        'Confirm fuel, travel, and multi-day labor policies in writing for Kingman–Havasu–Bullhead triangles.',
        'Build heat contingency into long highway days — early departures matter more than on short metro hops.',
        'When Nevada, California, or Utah addresses appear, verify FMCSA USDOT/MC before any deposit.',
      ],
    },
    {
      id: 'river-heat-recreation-access',
      title: 'River heat, recreation & lake-access module',
      intro:
        'Lake Havasu and Colorado River edges combine extreme heat with hillside, HOA, and visitor-calendar constraints.',
      bullets: [
        'Share driveway grade, gate, and turnaround photos for lake-view and hillside homes.',
        'Collect HOA COI and parking rules early for planned lake communities.',
        'Prefer dawn starts; discuss heat policies and crew pacing for summer inventories.',
        'Avoid peak holiday river weekends when curb and bridge-adjacent traffic explode.',
        'Protect inventory from dust and sun; limit long outdoor sits on reflective surfaces.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Mohave County?',
    intro:
      'Northwest Arizona living is town-by-town: Kingman corridor practicality, Lake Havasu recreation lifestyle, Bullhead river economy, or true rural dispersion. Pick the community first — distances between them are real lifestyle decisions.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Mohave spans multiple districts and communities (e.g., Kingman Unified, Lake Havasu Unified, Colorado River Union / Bullhead-area schools, and others). Match every listing address to the correct district.',
        bullets: [
          {
            title: 'Town-first district check',
            detail:
              'Do not assume county-wide feeders. Rural and unincorporated addresses need official boundary confirmation.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and Arizona Department of Education data should lead; third-party rankings are secondary only.',
          },
          {
            title: 'Distance to activities',
            detail:
              'In dispersed towns, sports and extracurriculars may mean long drives — factor family logistics, not only classroom metrics.',
          },
          {
            title: 'Seasonal population swings',
            detail:
              'Snowbird and tourism markets can change traffic and housing pressure even when school calendars are stable.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Community acute-care anchors',
            detail:
              'Kingman Regional Medical Center, Havasu Regional Medical Center, Western Arizona Regional Medical Center (Bullhead area), and other campuses serve different poles of the county — map ER drive times from your exact town.',
          },
          {
            title: 'Specialty travel reality',
            detail:
              'Some specialties require travel to larger metros (Las Vegas, Phoenix, or elsewhere). Confirm networks before relocating mid-treatment.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer records early; summer heat and long highway distances affect appointment reliability.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing & cost of living',
        bullets: [
          {
            title: 'Price ladder by town',
            detail:
              'Lake-view Havasu product, river-floor Bullhead stock, Kingman corridor homes, and rural parcels price and insure differently. Compare cooling costs and insurance, not sticker price alone.',
          },
          {
            title: 'Manufactured and seasonal stock',
            detail:
              'Manufactured-home parks and second-home inventory are common. Lease rules, park access, and seasonal occupancy affect move-day logistics.',
          },
          {
            title: 'Desert utility reality',
            detail:
              'Peak summer cooling is a major budget line on river and low-desert floors. Factor utilities into “affordable.”',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit by lifestyle',
        bullets: [
          {
            title: 'Kingman / corridor',
            detail:
              'Practical highway-hub living with freight and travel influence — more “work and through-traffic” than lake lifestyle.',
          },
          {
            title: 'Lake Havasu City',
            detail:
              'Recreation, water, and view-lot living — with heat, HOA access, and visitor-calendar intensity.',
          },
          {
            title: 'Bullhead / river',
            detail:
              'River economy and state-line adjacency — extreme heat and multi-state daily life patterns.',
          },
          {
            title: 'Rural / Golden Valley / remote',
            detail:
              'Space and lower density — with long service distances and self-sufficiency expectations.',
          },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute',
        bullets: [
          {
            title: 'Local anchors',
            detail:
              'Healthcare, tourism/hospitality, retail, government, trades, logistics/freight, and casino-adjacent employment near the river — not Phoenix metro spillover.',
          },
          {
            title: 'Inter-town commute rarity',
            detail:
              'Many people live and work in the same town because highway distances are real. Choosing housing far from the job is a daily desert drive commitment.',
          },
          {
            title: 'Multi-state labor sheds',
            detail:
              'Some river households work patterns that touch Nevada. Factor border timing and interstate realities into lifestyle fit.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & climate',
        bullets: [
          {
            title: 'Low-desert and river climate',
            detail:
              'Very hot summers, mild winters, high sun, and windy stretches define daily life and move planning.',
          },
          {
            title: 'Recreation identity',
            detail:
              'Boating, lake, and river culture are central around Havasu and the Colorado — visit in peak heat and on a quiet weekday before deciding.',
          },
          {
            title: 'Dispersion mindset',
            detail:
              'Services, friends, and specialists may be a long drive away. Comfort with highway miles is part of Mohave fit.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Practical Mohave County resources',
    intro:
      'Official links and verification notes — heat, highway conditions, and town rules change; verify before move day.',
    items: [
      {
        label: 'Mohave County',
        href: 'https://www.mohave.gov/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Kingman',
        href: 'https://www.cityofkingman.gov/',
        external: true,
      },
      {
        label: 'City of Lake Havasu City',
        href: 'https://www.lhcaz.gov/',
        external: true,
      },
      {
        label: 'City of Bullhead City',
        href: 'https://www.bullheadcity.com/',
        external: true,
      },
      {
        label: 'ADOT — road conditions & construction',
        href: 'https://azdot.gov/',
        note: 'Check I-40, US-93, and river corridor delays',
        external: true,
      },
      {
        label: 'National Weather Service — Las Vegas office (regional desert coverage)',
        href: 'https://www.weather.gov/vef/',
        note: 'Heat, wind, and dust alerts for move planning',
        external: true,
      },
      {
        label: 'Arizona Corporation Commission (ACC) — entity search',
        href: 'https://www.azcc.gov/',
        note: 'Verify business entity status (not a household-goods mover license)',
        external: true,
      },
      {
        label: 'FMCSA SAFER — interstate authority',
        href: 'https://safer.fmcsa.dot.gov/',
        note: 'Required when the move crosses state lines',
        external: true,
      },
      {
        label: 'Move Trust Hub — verify a USDOT',
        href: '/verify-dot',
        note: 'Cross-check interstate licensing before deposits',
      },
      {
        label: 'Free moving calculator',
        href: '/moving-calculator',
        note: 'Inventory-based volume for local or long-distance',
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Kingman, Lake Havasu, Bullhead/River, Golden Valley/Rural, Far North, Outlying river/desert) when available. Confirm inter-town mileage, heat-aware starts, and ACC + FMCSA checks — not continuous metro assumptions.',
  lastReviewed: '2026-07-23',
};
