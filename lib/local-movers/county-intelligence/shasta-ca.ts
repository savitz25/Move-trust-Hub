import {
  finalizeCaTier2Pack,
  CA_TIER2_BHGS_BULLET,
} from '@/lib/local-movers/county-intelligence/ca-tier2-shared';

/**
 * Shasta County — California Tier 2 (Redding Far North hub).
 * Independent north-state market — NOT a Bay collar, NOT a Sacramento suburb clone.
 * Parent: Sacramento as distant regional reference only.
 */
export const shastaCountyIntelligence = finalizeCaTier2Pack({
  countySlug: 'shasta',
  hubTitle: 'Shasta County Moving Intelligence Hub',
  eyebrow: 'Shasta County · Redding Far North hub · Independent north-state',
  h1: 'Moving in Shasta County: Redding Far North Hub, I-5 Logistics & Outdoor-Economy Access',
  heroOpener:
    'Shasta County is the Far North’s Redding-anchored hub — an independent north-state market on the I-5 spine, not a Bay Area collar and not a Sacramento suburb with pine trees. Greater Redding carries multi-unit, mid-century, and hillside stock under a real regional hospital and retail base; Anderson and Shasta Lake ride I-5 and CA-273 as freer small-city pairs; east- and west-county recreation edges (Burney, Lakehead, Whiskeytown approaches, CA-299 / CA-44 corridors) add rural driveways, forest roads, and long empty miles. Outdoor recreation, healthcare, and logistics set the employment rhythm more than tech commute spillover. Crews that paste “Northern California local” rates without naming Redding vs rural last-mile underprice portal time, recreation-season traffic, and fire-edge access.',
  heroCredibility:
    'Independent Far North hub · I-5 logistics · Outdoor / rural last-mile · BHGS in-state · FMCSA interstate · Curated listings',
  majorCorridors: 'I-5 · CA-44 · CA-299 · CA-273 · CA-89 approaches',
  parentCompare: {
    parentLabel: 'Sacramento County (distant north-state reference)',
    parentHref: '/local-movers/california/sacramento',
    title: 'How Shasta County differs from Sacramento — and from Bay collars',
    intro:
      'Shasta is an independent Far North hub, not a capital-region growth collar and not a Bay Area secondary. Use Sacramento only as a distant regional reference for long-haul context; do not import Midtown elevator assumptions or Roseville HOA scripts.',
    bullets: [
      {
        title: 'Corridor & drive time',
        detail:
          'I-5 is the north–south spine through Redding, Anderson, and Shasta Lake; CA-273 serves local Redding pairs; CA-44 and CA-299 feed east- and west-county recreation and rural towns; CA-89 approaches open mountain/recreation edges. Redding ↔ Sacramento is a multi-hour I-5 haul, not a metro local. In-county rural pairs burn empty miles Sac and Bay rate cards never model.',
      },
      {
        title: 'Housing differences',
        detail:
          'Redding multi-unit and hillside SFH, Anderson/Shasta Lake small-city tracts, and recreation-edge cabins or ranch parcels replace capital-core elevators and South Placer master-planned HOA villages. Outbuildings, gravel approaches, and WUI edges are normal outside the Redding bowl.',
      },
      {
        title: 'Truck access, density & constraints',
        detail:
          'Most volume stages on driveways and suburban streets — not Bay curb-permit wars. Hillside grades, forest-edge turnarounds, soft shoulders, and limited rural cell coverage rewrite dispatch. Recreation weekends choke lake and park approaches that weekday maps understate.',
      },
      {
        title: 'Cost posture',
        detail:
          'Same-zone Redding jobs can look mid-market simple until heat, hills, or multi-unit long carries hit. Cross-county rural and recreation-edge pairs price on deadhead and access, not square footage alone. Long-haul context toward Sacramento or Oregon border markets is interstate or long-local honesty — not capital metro pricing.',
      },
      {
        title: 'Market role',
        detail:
          'Independent north-state hub: regional healthcare, outdoor recreation, and I-5 logistics — not Bay spillover and not a renamed Sacramento collar. Popular long-haul framing points to Sacramento as a distant reference and nearby north-state secondaries, never “Bay Area local” rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Shasta County different',
    intro:
      'Far North realities — I-5 spine logistics, outdoor/recreation economy, rural last-mile, and California licensing — that Bay and Sac scripts miss.',
    bullets: [
      {
        title: 'Redding hub vs I-5 towns vs recreation edges',
        detail:
          'Multi-unit Redding, Anderson/Shasta Lake corridor homes, and Burney/Lakehead-style rural parcels are different truck products. Name both cities — “Shasta County local” is too vague across I-5 vs CA-299/44 last-mile.',
      },
      {
        title: 'I-5 freeflow is still billable portal time',
        detail:
          'Mid-day I-5 often freer than Bay or Sac freeways, but Redding ↔ Anderson peaks, freight mix, and long rural deadhead still set the clock. Ask how portal-to-portal time is priced for out-of-bowl addresses.',
      },
      {
        title: 'Outdoor & recreation calendars choke approaches',
        detail:
          'Lake, park, and holiday weekends fill Whiskeytown, Shasta Lake, and mountain approaches. Mid-week mornings often win where lease windows allow.',
      },
      {
        title: 'Fire, smoke & rural access',
        detail:
          'WUI and forest-edge parcels face red-flag and air-quality delays; long driveways, gates, and canopy clearance are survey items, not afterthoughts.',
      },
      CA_TIER2_BHGS_BULLET,
    ],
  },
  zonesIntro:
    'Four sharp zones — Redding metro, south/north I-5 towns, east-county recreation corridors, and west/rural edges. Do not price forest last-mile like a Redding cul-de-sac.',
  zones: [
    {
      id: 'redding-metro',
      name: 'Redding Metro & Greater Redding Bowl',
      shortName: 'Redding',
      neighborhoods: [
        'Downtown Redding',
        'North Redding / Lake Boulevard corridors',
        'West Redding / Buenaventura edge',
        'East Redding / Palo Cedro edge',
        'Multi-unit and medical-adjacent pockets',
      ],
      housingTypes:
        'Mid-century SFH, multi-unit and condos, hillside homes, newer suburban tracts on the bowl edges',
      challenges: [
        'Hillside grades and limited staging on some east/west edges',
        'I-5 / CA-273 / arterial peaks into the core',
        'Multi-unit elevator COI and long carries',
        'Summer heat on open asphalt staging',
      ],
      moverTips:
        'Confirm building rules for multi-unit. Prefer early weekday starts over I-5 peaks and heat. Treat Redding ↔ Burney or Lakehead as timed long locals with rural buffer, not map-mile quotes.',
      cityKeywords: [
        'redding',
        'palo cedro',
        'downtown redding',
        'north redding',
        'west redding',
        'east redding',
      ],
    },
    {
      id: 'i5-corridor-towns',
      name: 'Anderson, Shasta Lake & I-5 Corridor Towns',
      shortName: 'I-5 towns',
      neighborhoods: [
        'Anderson',
        'Shasta Lake',
        'Cottonwood edge',
        'I-5 frontage residential',
      ],
      housingTypes:
        'Small-city SFH, multi-family, mid-century tracts, industrial- and highway-adjacent edges',
      challenges: [
        'I-5 freight and commute congestion at peaks',
        'Varied property access and longer carries on older stock',
        'Cross-town peaks toward Redding core',
      ],
      moverTips:
        'Build I-5 timing into Anderson/Shasta Lake ↔ Redding pairs. Note industrial adjacency for mid-day freight buffer. Early starts beat heat even when the map looks short.',
      cityKeywords: [
        'anderson',
        'shasta lake',
        'cottonwood',
        'i-5',
        'interstate 5',
      ],
    },
    {
      id: 'east-recreation',
      name: 'East County & Recreation Corridors (CA-44 / CA-299 / CA-89)',
      shortName: 'East / Recreation',
      neighborhoods: [
        'Burney',
        'Fall River Mills edge',
        'CA-44 mountain approaches',
        'CA-89 recreation edges',
      ],
      housingTypes:
        'Small-town SFH, recreation-adjacent cabins, ranch and rural-edge parcels, occasional outbuildings',
      challenges: [
        'Long empty miles from Redding staging',
        'Two-lane mountain and forest approaches',
        'Limited turnaround, soft shoulders, canopy clearance',
        'Recreation-season traffic on lake and park routes',
      ],
      moverTips:
        'Access-first: road width, gates, and driveway photos before dispatch. Price portal-to-portal honestly for Burney-class pairs. Build recreation-weekend buffer when either address sits on tourist corridors.',
      cityKeywords: [
        'burney',
        'fall river mills',
        'hat creek',
        'ca-44',
        'ca-89',
        'east shasta',
      ],
    },
    {
      id: 'west-rural-lake',
      name: 'West County, Lakehead & Rural Forest Edges',
      shortName: 'West / Lake',
      neighborhoods: [
        'Lakehead',
        'Whiskeytown approaches',
        'French Gulch edge',
        'West-county rural pockets on CA-299',
      ],
      housingTypes:
        'Lake and forest-edge homes, rural SFH, cabin-style stock, long-driveway parcels',
      challenges: [
        'Narrow forest roads and limited truck turnaround',
        'Fire/smoke contingency on WUI edges',
        'Seasonal recreation congestion near lakes',
        'Cell coverage and dispatch delays on remote parcels',
      ],
      moverTips:
        'Never assume a full-size box reaches the door — measure final approach. Discuss shuttle or staged transfer for constrained lake/forest addresses. Prefer flexible dates in fire season.',
      cityKeywords: [
        'lakehead',
        'whiskeytown',
        'french gulch',
        'west shasta',
        'ca-299',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Shasta County',
    intro:
      'Compressed drivers — I-5 and two-lane cross-zone time, rural/recreation access, and when the pair leaves the Redding bowl.',
    drivers: [
      {
        title: 'I-5 & two-lane long-local time',
        detail:
          'Redding ↔ Anderson can look short; Redding ↔ Burney or Lakehead burns empty miles and mountain-road clock. Hourly billing follows portal-to-portal time.',
      },
      {
        title: 'Rural, forest & recreation-edge access',
        detail:
          'Long driveways, soft shoulders, gates, and limited turnaround add labor before boxes move. Get shuttle and long-carry fees in writing.',
      },
      {
        title: 'Heat, fire/smoke & hillside labor',
        detail:
          'Summer heat on the floor and red-flag risk on WUI parcels raise packing hours and reschedule odds versus flat in-town tracts.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$450–$1,300+',
        note: 'Higher with multi-unit long carries or peak heat windows',
      },
      {
        label: '2–3BR house / small-city tract',
        value: '$1,300–$3,400+',
        note: 'Cross-bowl and I-5 pairs trend up',
      },
      {
        label: '3–4+ BR (rural / recreation-edge / long-local)',
        value: '$2,000–$5,800+',
        note: 'Forest last-mile and east-county empty miles price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal intelligence',
    intro:
      'School calendars, recreation peaks, summer heat, and fire/smoke windows set risk more than mild brochure “Northern California” weather.',
    items: [
      {
        title: 'Peak residential: late spring – early fall weekends',
        detail:
          'School calendars and end-of-month leases fill Saturdays across Redding and I-5 towns. Book 2–4 weeks ahead for popular windows.',
      },
      {
        title: 'Recreation & lake season (summer – early fall)',
        detail:
          'Shasta Lake, Whiskeytown, and mountain approaches tighten on holiday weekends. Prefer mid-week mornings for lake- and park-adjacent addresses.',
      },
      {
        title: 'Fire season & smoke (variable; often summer – fall)',
        detail:
          'Red-flag and poor air-quality days can pause outdoor packing on forest-edge parcels. Build flexibility and written weather/air policies before peak season.',
      },
    ],
  },
  specialized: [
    {
      id: 'i5-logistics',
      title: 'I-5 spine & north-state long-local logistics',
      intro:
        'Shasta’s defining corridor product is I-5 freeflow mixed with long rural deadhead — not Bay gridlock and not capital-region HOA soft costs alone.',
      bullets: [
        'Price Redding ↔ Anderson/Shasta Lake and Redding ↔ east/west rural pairs as portal-to-portal jobs.',
        'Build freight mix and interchange delay into peak I-5 windows even when mid-day freeflow looks easy.',
        'Ask whether long north–south pairs still use a pure local rate card or a long-local schedule.',
      ],
    },
    {
      id: 'outdoor-rural-last-mile',
      title: 'Outdoor, recreation & rural last-mile access',
      intro:
        'Lake, forest, and ranch-edge parcels need truck-access plans city tracts never see.',
      bullets: [
        'Share driveway width, gate codes, canopy clearance, and turnaround photos before booking.',
        'Inventory outbuildings and note soft ground or gravel final approaches.',
        'Discuss shuttle options when a full-size box cannot stage at the door.',
        'Build recreation-weekend buffer on lake and park corridors.',
      ],
    },
    {
      id: 'fire-wui',
      title: 'Fire-edge / WUI contingency logistics',
      intro:
        'Wildland-urban interface edges and smoke days rewrite outdoor packing more than Redding-bowl heat alone.',
      bullets: [
        'Confirm written weather/air-quality policies before peak fire season.',
        'Flag hillside and forest-edge addresses for flexible reschedule language.',
        'Plan heat-safe and smoke-aware packing for electronics and sealed goods on high-risk days.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Shasta County?',
    intro:
      'Compressed relocator notes — validate schools and healthcare by pocket, then test I-5 commute, recreation traffic, and fire-insurance tolerance for the address you actually want.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Multiple systems (Redding-area elementary and high-school networks, Anderson and Shasta Lake feeders, east-county districts, and others). Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'Town-first district check',
            detail:
              'Use official district tools and the California School Dashboard. Unincorporated and recreation-edge pockets can span feeders.',
          },
          {
            title: 'Redding metro vs rural edges',
            detail:
              'Program mix and drive times differ sharply between the Redding bowl and east/west county towns. Do not treat county averages as neighborhood truth.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail:
              'Mercy Medical Center Redding and other Redding-area campuses are the primary acute anchors — map ER drive times at rush hour from east- or west-county addresses, not just in-town Redding.',
          },
          {
            title: 'Specialty spillover',
            detail:
              'Some households use Sacramento or Bay specialty networks for complex care. Confirm insurer networks and realistic multi-hour I-5 appointment times before choosing a far-rural pocket.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Shasta County resources',
    intro:
      'Local official links first. BHGS, FMCSA, and Move Trust Hub tools are added automatically for licensing checks.',
    items: [
      {
        label: 'County of Shasta',
        href: 'https://www.shastacounty.gov/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Redding',
        href: 'https://www.cityofredding.org/',
        external: true,
      },
      {
        label: 'City of Anderson',
        href: 'https://www.ci.anderson.ca.us/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter by zone (Redding, I-5 towns, East/Recreation, West/Lake) when available. Confirm rural access photos, recreation timing, and fire/smoke contingency — this is an independent Far North hub, not a Bay or Sacramento collar. Distant regional reference: Sacramento guide for long-haul context.',
  lastReviewed: '2026-07-24',
});
