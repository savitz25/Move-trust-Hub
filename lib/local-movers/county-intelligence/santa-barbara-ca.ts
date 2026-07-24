import {
  finalizeCaTier2Pack,
  CA_TIER2_BHGS_BULLET,
} from '@/lib/local-movers/county-intelligence/ca-tier2-shared';

/**
 * Santa Barbara County — California Tier 2 (coastal secondary).
 * Parent: Ventura County (coastal corridor neighbor). Not an LA clone; not Ventura-only.
 */
export const santaBarbaraCountyIntelligence = finalizeCaTier2Pack({
  countySlug: 'santa-barbara',
  hubTitle: 'Santa Barbara County Moving Intelligence Hub',
  eyebrow: 'Santa Barbara County · Coastal secondary · 101 corridor',
  h1: 'Moving in Santa Barbara County: Coastal Secondary, Narrow Roads & US-101',
  heroOpener:
    'Santa Barbara County is a coastal secondary market with its own split — not a Los Angeles logistics clone and not Ventura with the city names swapped. The South Coast packs premium housing onto narrow streets, hillside driveways, and estate lanes where full-size trucks often cannot stage at the door. Goleta adds university-adjacent multi-unit density. Santa Ynez Valley mixes tourism towns and ranch edges on CA-154 / CA-246. Santa Maria and North County sit on a longer 101 haul with ag traffic and inland heat. Quote coast access and corridor time explicitly — “Santa Barbara County local” fails when the pair spans Montecito and Santa Maria.',
  heroCredibility:
    'Coastal secondary · Narrow-road access · US-101 spine · BHGS in-state · FMCSA interstate · Curated listings',
  majorCorridors: 'US-101 · CA-154 · CA-1 · CA-246',
  parentCompare: {
    parentLabel: 'Ventura County',
    parentHref: '/local-movers/california/ventura',
    title: 'How Santa Barbara County differs from Ventura County',
    intro:
      'Both sit on the coastal 101 secondary belt north of LA — but Santa Barbara’s constrained South Coast, wine-valley interior, and long North County run are not Oxnard/Ventura/Thousand Oaks products. Use this when one address is Ventura County and the other is Santa Barbara.',
    bullets: [
      {
        title: 'Corridor & drive time',
        detail:
          'US-101 is the spine; CA-154 and CA-246 serve Santa Ynez Valley pairs; CA-1 touches coastal edges. Carpinteria ↔ Ventura can feel neighboring; Santa Barbara city ↔ Santa Maria or Lompoc is a long-local 101 job with Gaviota-area constraints Ventura grid pairs never see.',
      },
      {
        title: 'Housing differences',
        detail:
          'Montecito estates, Riviera hillsides, downtown Santa Barbara multi-unit, Goleta/UCSB stock, Solvang visitor-core cottages, and Santa Maria suburban tracts replace much of Ventura’s suburban plain and Conejo-style planned density. Premium coastal inventory is a larger share of day-to-day work on the South Coast.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Narrow coastal lanes, estate gates, and long carries are default on many South Coast jobs. Shuttle language is common. North County and valley towns reopen suburban staging — but deadhead from coastal yards is the cost. Do not import Ventura arterial assumptions into Riviera or Montecito streets.',
      },
      {
        title: 'Cost posture',
        detail:
          'Coastal staging, estate soft costs, and high-value packing push South Coast prices above many Ventura suburban locals of similar bedrooms. Coast ↔ North County 101 time can dominate the bill even when square footage looks ordinary.',
      },
      {
        title: 'Market role',
        detail:
          'Independent coastal secondary on the 101 belt: tourism and university peaks on the South Coast, ag-influenced North County volume, wine-valley specialty access. Popular routes bias to Ventura/LA corridor context and internal coast–valley pairs — not an LA County rate card alone.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Santa Barbara County different',
    intro:
      'Coastal-secondary realities — narrow-road access, estate soft costs, 101 cross-zone time, and California licensing.',
    bullets: [
      {
        title: 'South Coast narrow roads rewrite truck plans',
        detail:
          'Riviera grades, Montecito lanes, downtown blocks, and beach-adjacent Carpinteria streets often need smaller trucks, shuttles, or long carries. Share approach photos and max truck length before move day.',
      },
      {
        title: 'US-101 makes coast ↔ North County a timed product',
        detail:
          'Santa Barbara ↔ Santa Maria or Buellton is not map-mile “local.” Peak 101 and corridor constraints are billable. Confirm whether cross-zone pairs stay on a local rate card.',
      },
      {
        title: 'Estate / HOA packets and tourism curb fights',
        detail:
          'Gate lists, COI, and approved hours are common on premium South Coast and some valley addresses. Solvang and waterfront visitor peaks steal staging space on weekends.',
      },
      {
        title: 'Goleta / UCSB vs Santa Ynez vs Santa Maria are different climates',
        detail:
          'Student multi-unit peaks, wine-country tourism towns, and inland North County heat do not share Montecito estate timing. Name both pockets on the estimate.',
      },
      CA_TIER2_BHGS_BULLET,
    ],
  },
  zonesIntro:
    'Four sharp zones — city/Goleta coastal core, broader South Coast estates, Santa Ynez Valley, and Santa Maria North County. Access and 101 distance define the job.',
  zones: [
    {
      id: 'sb-goleta',
      name: 'Santa Barbara City & Goleta',
      shortName: 'SB / Goleta',
      neighborhoods: [
        'Downtown Santa Barbara',
        'The Mesa',
        'Riviera / hillside',
        'Goleta',
        'Isla Vista',
        'UCSB-adjacent',
      ],
      housingTypes:
        'Downtown multi-unit and condos, hillside SFH, suburban Goleta tracts, student multi-unit',
      challenges: [
        'Constrained downtown and hillside truck staging',
        'Isla Vista parking scarcity and academic peaks',
        'US-101 congestion through the coastal core',
      ],
      moverTips:
        'Expect shuttle or long-carry on many Riviera and dense downtown blocks. Book early around UCSB quarter ends. Prefer mid-week mornings when building windows allow.',
      cityKeywords: [
        'santa barbara',
        'goleta',
        'isla vista',
        'ucsb',
        'mesa',
        'riviera',
        'ellwood',
      ],
    },
    {
      id: 'south-coast',
      name: 'South Coast — Montecito, Summerland & Carpinteria',
      shortName: 'South Coast',
      neighborhoods: [
        'Montecito',
        'Summerland',
        'Carpinteria',
        'Hope Ranch edge',
        'Toro Canyon edge',
      ],
      housingTypes:
        'Estate and larger-lot SFH, gated HOA communities, coastal cottages, beach-adjacent homes',
      challenges: [
        'Gate lists, COI, and estate access protocols',
        'Narrow lanes and limited turnaround',
        'High-value inventory and finish protection',
      ],
      moverTips:
        'Access-first: driveway photos, gate codes, approved hours. Budget valuation and packing for premium inventories. Carpinteria beach blocks may need smaller trucks.',
      cityKeywords: [
        'montecito',
        'summerland',
        'carpinteria',
        'hope ranch',
        'toro canyon',
      ],
    },
    {
      id: 'santa-ynez-valley',
      name: 'Santa Ynez Valley — Buellton, Solvang & Los Olivos',
      shortName: 'Santa Ynez',
      neighborhoods: [
        'Buellton',
        'Solvang',
        'Los Olivos',
        'Santa Ynez',
        'Los Alamos edge',
      ],
      housingTypes:
        'Valley SFH, wine-country estates, small-town multi-unit, ranch-edge lots',
      challenges: [
        'Narrow tourist-core streets (Solvang)',
        'Estate and ranch long carries',
        '101 / 154 timing to coast or Santa Maria',
      ],
      moverTips:
        'Avoid peak tourist weekends in Solvang when flexible. Ranch jobs need approach photos and outbuilding inventory. Price valley ↔ coast as timed corridor work.',
      cityKeywords: [
        'buellton',
        'solvang',
        'los olivos',
        'santa ynez',
        'los alamos',
        'ballard',
      ],
    },
    {
      id: 'santa-maria-north',
      name: 'Santa Maria & North County',
      shortName: 'Santa Maria North',
      neighborhoods: [
        'Santa Maria',
        'Orcutt',
        'Lompoc',
        'Vandenberg Village edge',
        'Northwest / East Santa Maria',
      ],
      housingTypes:
        'Suburban SFH, multi-family, newer tracts, ag-adjacent edges, base-adjacent housing',
      challenges: [
        'Long 101 haul from South Coast yards',
        'Ag and commercial truck traffic',
        'Inland heat vs marine-layer coast the same day',
      ],
      moverTips:
        'Price Santa Maria or Lompoc ↔ Santa Barbara as timed 101 jobs. Early inland starts in summer. Note base-adjacent access rules near Vandenberg edges when applicable.',
      cityKeywords: [
        'santa maria',
        'orcutt',
        'lompoc',
        'vandenberg',
        'betteravia',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Santa Barbara County',
    intro:
      'Compressed drivers — 101 cross-zone time, coastal narrow-road staging, and estate soft costs.',
    drivers: [
      {
        title: 'US-101 cross-zone time (coast ↔ North County / valley)',
        detail:
          'Santa Barbara ↔ Santa Maria, Goleta ↔ Lompoc, or Montecito ↔ Buellton can burn an hour-plus each way. Hourly billing follows the clock.',
      },
      {
        title: 'Coastal staging, shuttles & long carries',
        detail:
          'Downtown, Riviera, Montecito lanes, and beach blocks often need smaller trucks or long carries. Get shuttle and stair fees in writing.',
      },
      {
        title: 'Estate / HOA soft costs & high-value packing',
        detail:
          'Gate lists, COI, approved hours, and art/wine packing raise soft costs before labor starts on premium South Coast inventories.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$600–$1,800+',
        note: 'Higher with elevators, beach shuttle, or coastal staging limits',
      },
      {
        label: '2–3BR house / condo',
        value: '$1,800–$5,000+',
        note: 'Estate soft costs and 101 cross-zone pairs trend up',
      },
      {
        label: '3–4+ BR (hills / estate / North County corridor)',
        value: '$3,000–$9,000+',
        note: 'Montecito access and coast↔Santa Maria pairs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal intelligence',
    intro:
      'Mild South Coast weather hides tourism, academic, and fire/wind operational risk — plus North County summer heat.',
    items: [
      {
        title: 'Peak residential & UCSB windows',
        detail:
          'Late spring–early fall weekends and quarter-end multi-unit load-outs fill coastal and Goleta capacity. Book 2–4 weeks ahead for popular windows.',
      },
      {
        title: 'Tourism pressure (Solvang, waterfront, downtown)',
        detail:
          'Weekend visitor traffic tightens staging near Solvang and popular beach or downtown corridors. Mid-week mornings win when HOA windows allow.',
      },
      {
        title: 'Fire / wind season & inland heat',
        detail:
          'Red-flag and high-wind days can restrict hillside work on Riviera and Montecito edges. Santa Maria and Lompoc afternoons run hotter — early inland starts protect crews.',
      },
    ],
  },
  specialized: [
    {
      id: 'coastal-narrow-road',
      title: 'Coastal narrow-road & shuttle logistics',
      intro:
        'South Coast access is often the job — not square footage alone.',
      bullets: [
        'Share driveway, street-width, and turnaround photos for Riviera, Montecito, and hillside homes before booking.',
        'Expect shuttle or long-carry language on constrained downtown and estate streets — price it explicitly.',
        'Prefer mid-morning starts that miss the worst 101 commute peaks when building windows allow.',
      ],
    },
    {
      id: 'hoa-estate',
      title: 'HOA, estate & high-value inventory',
      intro:
        'Premium South Coast and gated addresses need paperwork and packing depth suburban North County jobs may not.',
      bullets: [
        'Collect gate lists, COI, approved hours, and floor-protection rules before deposit.',
        'Discuss valuation and specialty packing for art, wine, and finish-sensitive inventories early.',
        'If one address is coastal-premium and the other is North County suburban, confirm local vs long-local rate cards.',
      ],
    },
    {
      id: 'tourism-peaks',
      title: 'Tourism & visitor-core peaks',
      intro:
        'Solvang, waterfront, and downtown visitor calendars steal curb space residential movers want on Saturdays.',
      bullets: [
        'Avoid major festival and peak tourist weekends in Solvang and waterfront corridors when flexible.',
        'Build buffer for event weeks that close or restrict staging near visitor cores.',
        'Align Goleta multi-unit bookings with academic calendars when either party is student- or staff-driven.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Santa Barbara County?',
    intro:
      'Compressed relocator notes — schools and hospitals by pocket, then test 101 commute tolerance between coast and North County.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Multiple districts (Santa Barbara Unified, Goleta Union and related high-school feeders, Carpinteria Unified, Santa Maria-area systems, Lompoc Unified, valley districts, and others). Match every listing to the correct boundary.',
        bullets: [
          {
            title: 'Town-first district check',
            detail:
              'Use official district tools and the California School Dashboard. Unincorporated pockets (Montecito, Isla Vista, Orcutt) can span feeders.',
          },
          {
            title: 'Coast vs Goleta vs North County',
            detail:
              'Program mix and enrollment pressure differ sharply by pocket. UCSB shapes rental demand and traffic near Goleta and Isla Vista.',
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
              'Cottage Health campuses on the South Coast, Marian Regional (Santa Maria), Lompoc Valley Medical Center, and other facilities serve different pockets — map ER drive times at rush hour from your target neighborhood.',
          },
          {
            title: 'Specialty spillover',
            detail:
              'Some residents use larger Southern California systems for specialty care. Confirm insurer networks and realistic 101 appointment times before choosing a far-north or valley-only address.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Santa Barbara County resources',
    intro:
      'Local official links first. BHGS, FMCSA, and Move Trust Hub tools are added automatically for licensing checks.',
    items: [
      {
        label: 'County of Santa Barbara',
        href: 'https://www.countyofsb.org/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Santa Barbara',
        href: 'https://www.santabarbaraca.gov/',
        external: true,
      },
      {
        label: 'City of Santa Maria',
        href: 'https://www.cityofsantamaria.org/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter by zone (SB/Goleta, South Coast, Santa Ynez, Santa Maria North) when available. Confirm narrow-road/shuttle needs, estate COI, and 101 time for coast↔North County pairs — not Ventura or LA assumptions alone.',
  lastReviewed: '2026-07-24',
});
