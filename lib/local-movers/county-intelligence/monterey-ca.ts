import {
  finalizeCaTier2Pack,
  CA_TIER2_BHGS_BULLET,
} from '@/lib/local-movers/county-intelligence/ca-tier2-shared';

/**
 * Monterey County — California Tier 2 (Central Coast secondary).
 * Parent: Santa Clara County (South Bay). Not a Santa Cruz or Santa Barbara clone.
 */
export const montereyCountyIntelligence = finalizeCaTier2Pack({
  countySlug: 'monterey',
  hubTitle: 'Monterey County Moving Intelligence Hub',
  eyebrow: 'Monterey County · Central Coast secondary · Peninsula & valley',
  h1: 'Moving in Monterey County: Monterey Peninsula / Salinas Valley Secondary',
  heroOpener:
    'Monterey County is a Central Coast secondary split between tourism-coast logistics and inland agricultural valley volume — not a South Bay tech-suburb extension and not a Santa Barbara script with new names. The Monterey Peninsula (Monterey, Pacific Grove, Carmel, Pebble Beach edges) means fog, narrow village streets, visitor peaks, and gated access. Seaside and Marina add multi-unit density, CSUMB turnover, and Defense Language Institute / former Fort Ord–adjacent housing patterns. Salinas runs on US-101 freight rhythm and inland heat. Carmel Valley and Big Sur–approach roads demand careful truck plans — many are not full-size box routes. Quote the pocket: peninsula village, military/university multi-unit, or valley suburban — never “Monterey County local” alone.',
  heroCredibility:
    'Central Coast secondary · Peninsula vs Salinas · Narrow coastal access · BHGS in-state · FMCSA interstate · Curated listings',
  majorCorridors: 'CA-1 · CA-68 · US-101 · CA-156 · CA-183',
  parentCompare: {
    parentLabel: 'Santa Clara County',
    parentHref: '/local-movers/california/santa-clara',
    title: 'How Monterey County differs from Santa Clara County (South Bay)',
    intro:
      'Monterey is a Central Coast secondary south of the South Bay — tourism and ag logistics, not Silicon Valley office-park density. Use this when one address is Santa Clara County and the other is Monterey.',
    bullets: [
      {
        title: 'Corridor & drive time',
        detail:
          'CA-1 and CA-68 serve Peninsula pockets; US-101 is the Salinas Valley spine; CA-156 and CA-183 link valley and coastal approaches. Monterey ↔ San Jose is a long inter-regional haul, not a South Bay city-pair local. Peninsula ↔ Salinas is the in-county long-local that map miles understate in fog and peak traffic.',
      },
      {
        title: 'Housing differences',
        detail:
          'Village cottages, gated Pebble Beach communities, Seaside/Marina multi-unit, and Salinas suburban/ag-edge stock replace South Bay tract and condo products. Premium peninsula inventories and farm-edge outbuildings both appear inside one county label.',
      },
      {
        title: 'Truck access, density & constraints',
        detail:
          'Carmel village grids and Monterey waterfront blocks often need shuttles; gated communities need COI packets. Salinas opens suburban staging but adds ag freight delay. Big Sur–approach and some Carmel Valley roads are access-limited — never assume a 26′ box reaches the door.',
      },
      {
        title: 'Cost posture',
        detail:
          'Peninsula tourism staging and gated soft costs push prices above many South Bay suburban locals of similar bedrooms. Peninsula ↔ valley corridor time and harvest congestion can dominate the bill even when square footage looks ordinary.',
      },
      {
        title: 'Market role',
        detail:
          'Central Coast secondary: tourism and education/military turnover on the Peninsula belt, ag-economy volume in the Salinas Valley. Popular long-haul context points toward Santa Clara/South Bay and other Central Coast secondaries — not a pure Silicon Valley rate card.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Monterey County different',
    intro:
      'Secondary-market realities — peninsula narrow roads, military/university turnover, valley ag timing, and California licensing.',
    bullets: [
      {
        title: 'Peninsula and Salinas Valley are different products',
        detail:
          'Carmel cottages, Monterey condos, Seaside multi-unit, and Salinas suburban homes do not share truck access or climate. Name both cities — “Monterey County local” fails across the 68/1/101 split.',
      },
      {
        title: 'Coastal narrow roads and gated access',
        detail:
          'Village streets, waterfront curb loss, and Pebble Beach gate lists rewrite truck length and hours. Shuttle and long-carry language is common on the Peninsula.',
      },
      {
        title: 'Military, CSUMB & tourism calendars',
        detail:
          'Defense Language Institute / Presidio-adjacent and former Fort Ord–edge housing, CSUMB semester peaks, and visitor weekends concentrate load-outs differently than pure residential South Bay seasons.',
      },
      {
        title: 'Salinas Valley ag freight & inland heat',
        detail:
          'Harvest and packing seasons congest 101 approaches; valley afternoons heat up while the Peninsula stays cool and foggy. Start times should match the pocket.',
      },
      CA_TIER2_BHGS_BULLET,
    ],
  },
  zonesIntro:
    'Four sharp zones — Monterey Peninsula core, Salinas metro, Seaside/Marina belt, and careful Carmel Valley / Big Sur approaches. Do not treat constrained approach roads as standard locals.',
  zones: [
    {
      id: 'monterey-peninsula',
      name: 'Monterey Peninsula — Monterey, Pacific Grove, Carmel & Pebble Beach',
      shortName: 'Peninsula',
      neighborhoods: [
        'Downtown Monterey',
        'New Monterey / Cannery Row corridor',
        'Pacific Grove',
        'Carmel-by-the-Sea',
        'Pebble Beach',
        'Asilomar edge',
      ],
      housingTypes:
        'Coastal multi-unit and condos, village cottages, gated estate communities, hillside SFH',
      challenges: [
        'Visitor traffic and limited curb staging near waterfront and village cores',
        'Pebble Beach gate lists, COI, and truck limits',
        'Fog, damp packing, and tight residential grids',
      ],
      moverTips:
        'Access-first on Carmel and Pebble Beach: photos, gate codes, max truck length, approved hours. Prefer mid-week mornings outside event weekends. Discuss valuation early for premium inventories.',
      cityKeywords: [
        'monterey',
        'pacific grove',
        'carmel',
        'carmel-by-the-sea',
        'pebble beach',
        'cannery row',
        'asilomar',
      ],
    },
    {
      id: 'salinas',
      name: 'Salinas Metro & North Valley',
      shortName: 'Salinas',
      neighborhoods: [
        'Salinas',
        'North / East / South Salinas',
        'Spreckels edge',
        'Prunedale edge',
      ],
      housingTypes:
        'Suburban SFH, multi-family, older urban stock, newer tracts, ag-adjacent edges',
      challenges: [
        'Ag and commercial truck traffic on valley corridors',
        'US-101 peak delays',
        'Inland heat vs Peninsula fog the same day',
      ],
      moverTips:
        'Price Salinas ↔ Peninsula as a timed 68/1 corridor job, not map-mile local. Note ag-corridor adjacency for freight buffer. Early inland starts in summer.',
      cityKeywords: [
        'salinas',
        'spreckels',
        'prunedale',
        'north salinas',
        'east salinas',
      ],
    },
    {
      id: 'seaside-marina',
      name: 'Seaside, Marina & Ord / CSUMB Edge',
      shortName: 'Seaside / Marina',
      neighborhoods: [
        'Seaside',
        'Marina',
        'Sand City',
        'Ord Community / former Fort Ord edges',
        'CSUMB-adjacent',
        'Del Rey Oaks edge',
      ],
      housingTypes:
        'Suburban SFH, multi-family, military- and student-adjacent rentals, newer planned pockets',
      challenges: [
        'Multi-unit load-outs and parking scarcity',
        'PCS and academic calendar peaks',
        'Highway 1 congestion between Peninsula and Marina',
      ],
      moverTips:
        'Share elevator status, parking plan, and lease-end timing. Book early around military PCS and CSUMB semester peaks. Confirm any gate or ID needs on restricted corridors.',
      cityKeywords: [
        'seaside',
        'marina',
        'sand city',
        'del rey oaks',
        'csumb',
        'fort ord',
        'ord community',
      ],
    },
    {
      id: 'carmel-valley-approaches',
      name: 'Carmel Valley & Big Sur Approaches (Access-Careful)',
      shortName: 'Valley / Approaches',
      neighborhoods: [
        'Carmel Valley',
        'Carmel Valley Village edge',
        'Highway 1 south approaches',
        'Big Sur gateway edges (limited access)',
      ],
      housingTypes:
        'Valley SFH, ranch-edge lots, hillside homes, limited multi-unit — many constrained final approaches',
      challenges: [
        'Narrow, winding roads unsuitable for full-size trucks on many segments',
        'Long carries, limited turnaround, and weather-sensitive coastal grades',
        'Not interchangeable with Carmel village or Salinas suburban jobs',
      ],
      moverTips:
        'Never assume a standard box truck reaches the door — measure road width, grades, and turnaround before dispatch. Discuss shuttle or staged transfer for constrained Big Sur–approach and upper valley addresses. Prefer flexible dates when coastal weather or slides affect CA-1.',
      cityKeywords: [
        'carmel valley',
        'big sur',
        'carmel valley village',
        'highway 1 south',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Monterey County',
    intro:
      'Compressed drivers — peninsula↔valley corridor time, coastal staging, and gated or constrained-access soft costs.',
    drivers: [
      {
        title: 'Peninsula ↔ Valley corridor time (CA-1 / CA-68 / US-101)',
        detail:
          'Carmel ↔ Salinas or Monterey ↔ south-valley legs burn 45–120+ minutes depending on fog, visitors, and freight. Hourly billing follows the clock.',
      },
      {
        title: 'Coastal staging, shuttles & village streets',
        detail:
          'Carmel, Pacific Grove, and Monterey waterfront blocks often need smaller trucks or long carries. Get shuttle fees in writing.',
      },
      {
        title: 'Gated / constrained-access soft costs',
        detail:
          'Pebble Beach COI packets, truck-length limits, and Carmel Valley / Big Sur–approach access plans add soft costs and sometimes full day-rate honesty for long carries.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$550–$1,700+',
        note: 'Higher with elevators, village shuttle, or waterfront staging limits',
      },
      {
        label: '2–3BR house / condo',
        value: '$1,700–$4,800+',
        note: 'Gated soft costs and Peninsula↔Valley pairs trend up',
      },
      {
        label: '3–4+ BR (gated / constrained approach / valley corridor)',
        value: '$2,800–$8,500+',
        note: 'Pebble Beach access and coast↔valley pairs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal intelligence',
    intro:
      'Tourism, military/academic peaks, and harvest freight set risk more than mild peninsula temperatures.',
    items: [
      {
        title: 'Peak residential & tourism (late spring – early fall)',
        detail:
          'School calendars, end-of-month leases, and visitor weekends fill Peninsula capacity. Mid-week mornings reduce curb fights when community windows allow.',
      },
      {
        title: 'Military / CSUMB turnover windows',
        detail:
          'PCS cycles and semester transitions concentrate multi-unit moves in Seaside, Marina, and Monterey-adjacent stock. Book early and confirm building rules.',
      },
      {
        title: 'Harvest freight & valley heat (Salinas Valley)',
        detail:
          'Agricultural peaks increase commercial truck volume on valley roads and 101 approaches. Early inland starts protect crews when the Peninsula is still cool and foggy.',
      },
    ],
  },
  specialized: [
    {
      id: 'coastal-narrow-roads',
      title: 'Coastal & narrow-road access logistics',
      intro:
        'Peninsula village grids and constrained valley/coastal approaches are access jobs first.',
      bullets: [
        'Share driveway, street-width, and turnaround photos for Carmel, Pacific Grove, and hillside Monterey homes before booking.',
        'Expect shuttle or long-carry language on village and waterfront streets — price it explicitly.',
        'For Carmel Valley and Big Sur–approach addresses, verify road suitability before dispatching a full-size truck.',
      ],
    },
    {
      id: 'military-ord',
      title: 'Military & former Fort Ord / DLI-adjacent logistics',
      intro:
        'Defense Language Institute / Presidio-adjacent communities and former Fort Ord–edge housing create PCS and multi-unit patterns distinct from Carmel estates.',
      bullets: [
        'Align booking with PCS windows when either household is military-connected.',
        'Confirm elevator reservations, parking plans, and any gate or ID requirements early.',
        'Treat Seaside/Marina multi-unit density as its own product — not a peninsula cottage quote with the city name swapped.',
      ],
    },
    {
      id: 'tourism-csumb',
      title: 'Tourism peaks & CSUMB university turnover',
      intro:
        'Visitor calendars on the Peninsula and CSUMB semester peaks in Marina/Seaside stack on top of ordinary lease ends.',
      bullets: [
        'Avoid major golf, festival, and peak tourist weekends on the Peninsula when flexible.',
        'Book CSUMB-adjacent multi-unit early around semester transitions.',
        'Discuss valuation for premium Peninsula inventories — released-value alone is often inadequate.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Monterey County?',
    intro:
      'Compressed relocator notes — schools and hospitals by pocket, then test Peninsula↔valley commute tolerance before choosing on price alone.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Multiple districts (Monterey Peninsula Unified, Pacific Grove Unified, Carmel Unified, Seaside/Marina-area systems, Salinas-area elementary and high-school systems, South Monterey County districts, and others). Match every listing to the correct boundary.',
        bullets: [
          {
            title: 'Town-first district check',
            detail:
              'Use official district tools and the California School Dashboard. Unincorporated edges can span feeders.',
          },
          {
            title: 'Peninsula vs Salinas Valley',
            detail:
              'Program mix and enrollment pressure differ sharply. CSUMB, Monterey Peninsula College, Naval Postgraduate School, and DLI-related communities shape rental demand near Seaside, Marina, and Monterey.',
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
              'Community Hospital of the Monterey Peninsula (CHOMP) and Salinas Valley Health / Natividad and other valley facilities serve different pockets — map ER drive times at rush hour, especially for Peninsula ↔ Salinas pairs.',
          },
          {
            title: 'Specialty spillover',
            detail:
              'Some residents use Bay Area specialty systems. Confirm insurer networks and realistic drive times on 101 and 156 corridors before choosing a far-valley or constrained-coast address.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Monterey County resources',
    intro:
      'Local official links first. BHGS, FMCSA, and Move Trust Hub tools are added automatically for licensing checks.',
    items: [
      {
        label: 'County of Monterey',
        href: 'https://www.co.monterey.ca.us/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Monterey',
        href: 'https://www.monterey.org/',
        external: true,
      },
      {
        label: 'City of Salinas',
        href: 'https://www.cityofsalinas.org/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter by zone (Peninsula, Salinas, Seaside/Marina, Valley/Approaches) when available. Confirm village/gated access, military or CSUMB timing, Peninsula↔Valley drive time, and never assume full-size trucks on constrained Carmel Valley or Big Sur–approach roads.',
  lastReviewed: '2026-07-24',
});
