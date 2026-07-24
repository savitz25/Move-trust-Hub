import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  CA_TIER2_BHGS_BULLET,
  finalizeCaTier2Pack,
} from '@/lib/local-movers/county-intelligence/ca-tier2-shared';

/**
 * Marin County — California Tier 2 (North Bay collar to San Francisco).
 * Parent: San Francisco. Not a mini-SF; also contrast Sonoma wine-country secondary.
 */
export const marinCountyIntelligence: CountyIntelligencePack = finalizeCaTier2Pack({
  countySlug: 'marin',
  hubTitle: 'Marin County Moving Intelligence Hub',
  eyebrow: 'Marin County · North Bay collar · SF bridge / ferry secondary',
  h1: 'Moving in Marin County: North Bay Collar, Bridge & Ferry Access — Not Mini-SF',
  heroOpener:
    'Marin County is the North Bay collar across the Golden Gate — not San Francisco elevators with a different ZIP and not Sonoma wine country with bay views pasted on. Southern Marin (Sausalito, Mill Valley, Tiburon, Corte Madera) means steep streets, waterfront staging limits, and bridge/ferry timing. Central corridor towns on US-101 (San Rafael, San Anselmo, Fairfax approaches) add multi-unit and arterial volume; Novato absorbs north-county growth; West Marin and Point Reyes edges demand narrow two-lanes, fog, and long rural carries city crews underprice. Affluent inventories need valuation discipline. Quote the pocket: hillside waterfront, 101 corridor multi-unit, Novato tract, or West Marin ranch — never “Marin local” alone.',
  heroCredibility:
    'North Bay collar · Golden Gate approaches · Affluent suburban · BHGS in-state · FMCSA interstate · Curated listings',
  majorCorridors: 'US-101 · CA-1 · Sir Francis Drake · CA-37 · Golden Gate approaches',
  parentCompare: {
    parentLabel: 'San Francisco',
    parentHref: '/local-movers/california/san-francisco',
    title: 'Compared with San Francisco (and Sonoma contrast)',
    intro:
      'Marin is a North Bay collar secondary — bridge/ferry access and affluent suburban stock, not SOMA elevator density. It also differs from Sonoma’s wine-country tourism and harvest product. Use this when one address is San Francisco and the other is Marin; treat Sonoma pairs as a separate North Bay secondary.',
    bullets: [
      {
        title: 'Corridor & drive time',
        detail:
          'US-101 is the spine from the Golden Gate through San Rafael to Novato; Sir Francis Drake and CA-1 feed Ross Valley and West Marin; CA-37 links toward Sonoma/Napa edges. Marin ↔ SF is a timed bridge local with toll plaza and peak delay — not a city-block pair. West Marin legs are long two-lane hauls SF crews never price as “local.”',
      },
      {
        title: 'Housing differences',
        detail:
          'Hillside SFH, waterfront cottages, mid-century suburban tracts, HOA pockets, and limited multi-unit replace Mission/SOMA towers and freight elevators. Premium inventories and stair-heavy hillside homes are common; farm-edge West Marin stock is a different product from either SF or Sonoma plaza towns.',
      },
      {
        title: 'Truck access, steep streets & density',
        detail:
          'Sausalito, Mill Valley, and Tiburon grids often need smaller trucks or shuttles; bridge approaches and ferry-adjacent curb loss rewrite staging. Unlike SF freight elevators or Sonoma plaza tourism, Marin’s signature constraint is grade + narrow affluent streets + 101 collar timing.',
      },
      {
        title: 'Cost posture',
        detail:
          'Same-bedroom jobs often price above flat East Bay or inland suburb locals because of hillside labor, premium packing expectations, and bridge corridor time. West Marin and peak Golden Gate windows push higher still.',
      },
      {
        title: 'Market role',
        detail:
          'North Bay collar to San Francisco: residential volume on the 101 corridor and southern hillside towns, with a rural West Marin secondary product. Popular long-locals bias toward SF/Peninsula and nearby Sonoma/North Bay secondaries — not a mini-SF rate card or a wine-country brochure.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Marin County different',
    intro:
      'Collar-market realities — bridge/ferry access, steep narrow streets, affluent suburban stock, and California licensing.',
    bullets: [
      {
        title: 'Not mini-SF — and not Sonoma',
        detail:
          'Hillside suburbs and 101 corridor multi-unit dominate volume; waterfront villages are not SOMA elevators. Sonoma’s harvest/plaza tourism is a different North Bay product. Name both cities — “Marin local” fails across Sausalito ↔ Novato or West Marin pairs.',
      },
      {
        title: 'Golden Gate, ferry & 101 collar timing',
        detail:
          'Bridge peaks, toll approaches, and US-101 congestion set portal-to-portal bills. Ferry-adjacent and waterfront blocks lose curb space on visitor weekends. Price SF pairs as timed corridor jobs, not map-mile locals.',
      },
      {
        title: 'Steep, narrow streets & hillside access',
        detail:
          'Mill Valley, Sausalito, Tiburon, and many Ross Valley streets limit truck length and turnaround. Shuttle and long-carry language is common — share grade and street-width photos before booking.',
      },
      {
        title: 'Affluent inventory & West Marin edges',
        detail:
          'Premium finishes need valuation and protection discipline. West Marin / Point Reyes approaches add fog, soft shoulders, and long rural carries central-corridor crews underprice.',
      },
      CA_TIER2_BHGS_BULLET,
    ],
  },
  zonesHeading: 'Marin County zones: southern hills, 101 corridor, Novato & West Marin',
  zonesIntro:
    'Four sharp zones — southern Marin hills/waterfront, central 101 / Ross Valley, Novato north growth, and West Marin edges. Grade and bridge timing define the job more than generic SF tips.',
  zones: [
    {
      id: 'southern-marin',
      name: 'Southern Marin — Sausalito, Mill Valley, Tiburon & Corte Madera',
      shortName: 'Southern Marin',
      neighborhoods: [
        'Sausalito',
        'Mill Valley',
        'Tiburon',
        'Belvedere edge',
        'Corte Madera',
        'Larkspur edge',
      ],
      housingTypes:
        'Hillside SFH, waterfront cottages, mid-century homes, limited multi-unit, premium inventories',
      challenges: [
        'Steep, narrow streets and limited truck turnaround',
        'Waterfront and visitor curb scarcity',
        'Golden Gate approach congestion on SF pairs',
      ],
      moverTips:
        'Access-first: street width, grade, and turnaround photos before dispatch. Expect shuttle language on hillside and village blocks. Prefer mid-week mornings; price SF pairs with honest bridge portal time.',
      cityKeywords: [
        'sausalito',
        'mill valley',
        'tiburon',
        'belvedere',
        'corte madera',
        'larkspur',
      ],
    },
    {
      id: 'central-101-ross',
      name: 'Central 101 Corridor & Ross Valley',
      shortName: 'Central / Ross Valley',
      neighborhoods: [
        'San Rafael',
        'San Anselmo',
        'Fairfax',
        'Ross',
        'Kentfield edge',
        'Terra Linda / north San Rafael',
      ],
      housingTypes:
        'Suburban SFH, multi-family, older in-town stock, hillside edges, HOA pockets',
      challenges: [
        'US-101 peak congestion',
        'Multi-unit elevators and reserved windows in San Rafael',
        'Sir Francis Drake corridor delay toward West Marin',
      ],
      moverTips:
        'Early weekday starts for 101 and Drake. Collect building rules for San Rafael multi-unit. Price San Rafael ↔ southern Marin or West Marin with arterial + two-lane buffer.',
      cityKeywords: [
        'san rafael',
        'san anselmo',
        'fairfax',
        'ross',
        'kentfield',
        'terra linda',
      ],
    },
    {
      id: 'novato-north',
      name: 'Novato & North County Growth',
      shortName: 'Novato',
      neighborhoods: [
        'Novato',
        'Hamilton / newer Novato edges',
        'North Novato',
        'Ignacio edge',
        'US-101 north corridor',
      ],
      housingTypes:
        'Suburban SFH tracts, multi-family, planned pockets, some older in-town stock',
      challenges: [
        'Longer 101 haul to southern Marin and SF than map miles suggest at peak',
        'HOA/parking rules in planned communities',
        'CA-37 weather and traffic toward East Bay/Napa edges',
      ],
      moverTips:
        'Price Novato ↔ Sausalito or Novato ↔ SF as full timed 101/bridge locals. Collect HOA packets early. Flag CA-37-dependent pairs for weather and peak delay.',
      cityKeywords: [
        'novato',
        'hamilton',
        'ignacio',
        'north marin',
        'novato ca',
      ],
    },
    {
      id: 'west-marin',
      name: 'West Marin & Point Reyes Approaches',
      shortName: 'West Marin',
      neighborhoods: [
        'Point Reyes Station edge',
        'Inverness edge',
        'Stinson Beach edge',
        'Bolinas edge',
        'CA-1 / Sir Francis Drake west approaches',
      ],
      housingTypes:
        'Rural SFH, coastal cottages, ranch-edge lots, limited multi-unit — many constrained approaches',
      challenges: [
        'Narrow two-lanes, fog, and limited turnaround',
        'Long deadhead from 101 corridor crews',
        'Visitor weekends on coastal gateway roads',
      ],
      moverTips:
        'Never assume a full-size box reaches every West Marin door — measure road width and turnaround. Discuss shuttle and long-carry. Price West Marin ↔ San Rafael with honest two-lane clock; avoid peak visitor Saturdays when flexible.',
      cityKeywords: [
        'point reyes',
        'inverness',
        'stinson beach',
        'bolinas',
        'west marin',
        'point reyes station',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Marin County',
    intro:
      'Compressed drivers — bridge/101 corridor time, hillside staging, and premium or West Marin access soft costs.',
    drivers: [
      {
        title: 'Golden Gate / US-101 / Drake cross-zone time',
        detail:
          'Southern Marin ↔ SF, San Rafael ↔ Novato peak 101, or West Marin two-lane legs burn more clock than map miles. Hourly billing follows the clock.',
      },
      {
        title: 'Steep streets, shuttles & waterfront staging',
        detail:
          'Hillside and village blocks often need smaller trucks or long carries. Get shuttle and long-carry fees in writing.',
      },
      {
        title: 'Premium inventory & rural West Marin access',
        detail:
          'Valuation, finish protection, and constrained coastal/ranch approaches add soft costs and labor before boxes move.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$650–$2,000+',
        note: 'Higher with hills, shuttles, or multi-unit windows',
      },
      {
        label: '2–3BR house / hillside or corridor',
        value: '$2,000–$5,500+',
        note: 'Steep access and bridge pairs trend up',
      },
      {
        label: '3–4+ BR (hillside premium / West Marin / SF corridor)',
        value: '$3,200–$9,500+',
        note: 'Premium inventories and constrained approaches price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal intelligence',
    intro:
      'Bridge peaks, visitor weekends, and coastal fog set risk more than mild North Bay temperatures.',
    items: [
      {
        title: 'Peak residential: late spring – early fall weekends',
        detail:
          'School calendars and end-of-month leases fill Saturdays across southern Marin and the 101 corridor. Book 2–4 weeks ahead for hillside and multi-unit windows.',
      },
      {
        title: 'Tourism & waterfront visitor peaks',
        detail:
          'Sausalito, Tiburon, and coastal gateway roads tighten on visitor weekends. Prefer mid-week mornings for waterfront and West Marin cores when flexible.',
      },
      {
        title: 'Fog, wind & CA-37 / coastal weather',
        detail:
          'Coastal fog and wind affect outdoor packing; CA-37 can add weather and traffic delay on east/north pairs. Build flexibility into West Marin and bridge-dependent schedules.',
      },
    ],
  },
  specialized: [
    {
      id: 'bridge-ferry-access',
      title: 'Golden Gate, ferry & 101 collar access',
      intro:
        'Marin’s SF relationship is a timed bridge/ferry corridor — not a city-block local.',
      bullets: [
        'Price Marin ↔ San Francisco portal-to-portal with peak bridge and 101 buffer.',
        'Flag waterfront and ferry-adjacent curb limits on visitor days.',
        'Confirm whether local rate cards still apply across the county line into SF.',
      ],
    },
    {
      id: 'steep-narrow-streets',
      title: 'Steep, narrow streets & hillside logistics',
      intro:
        'Southern Marin and many Ross Valley addresses are grade-and-width jobs first.',
      bullets: [
        'Share street-width, driveway grade, and turnaround photos before booking.',
        'Expect shuttle or long-carry language on Sausalito, Mill Valley, and Tiburon hillsides.',
        'Discuss stair counts and finish protection for premium hillside inventories early.',
      ],
    },
    {
      id: 'west-marin-rural',
      title: 'West Marin rural & coastal-edge access',
      intro:
        'Point Reyes and CA-1 edges need truck plans the 101 corridor never sees.',
      bullets: [
        'Verify road suitability before dispatching a full-size truck.',
        'Build fog, visitor, and two-lane delay into West Marin ↔ central corridor quotes.',
        'Inventory outbuildings and soft-shoulder final approaches on ranch-edge parcels.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Marin County?',
    intro:
      'Compressed relocator notes — schools and hospitals by pocket, then test Golden Gate / 101 commute and hillside access for the address you want.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Multiple districts (Sausalito Marin City, Mill Valley, Reed Union / Tiburon pathways, Larkspur-Corte Madera, San Rafael City, Ross Valley, Novato Unified, Shoreline/West Marin systems, and others). Match every listing to the correct boundary.',
        bullets: [
          {
            title: 'Town-first district check',
            detail:
              'Use official district tools and the California School Dashboard. Marketing city names and unincorporated pockets can span feeders.',
          },
          {
            title: 'Southern hills vs 101 corridor vs West Marin',
            detail:
              'Program mix and enrollment pressure differ by pocket. College of Marin shapes some campus-adjacent rental and traffic patterns near Kentfield / central corridor.',
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
              'MarinHealth Medical Center (Greenbrae) and Kaiser San Rafael anchor central access; Novato Community and other north-county services cover growth edges — map ER drive times at rush hour and over the bridge from your target neighborhood.',
          },
          {
            title: 'SF specialty spillover',
            detail:
              'Some households use San Francisco specialty networks. Confirm insurer networks and realistic Golden Gate / 101 appointment times before choosing a far-north or West Marin-only address.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Marin County resources',
    intro:
      'Local official links first. BHGS, FMCSA, and Move Trust Hub tools are added automatically for licensing checks.',
    items: [
      {
        label: 'County of Marin',
        href: 'https://www.marincounty.org/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of San Rafael',
        href: 'https://www.cityofsanrafael.org/',
        external: true,
      },
      {
        label: 'City of Novato',
        href: 'https://www.novato.org/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter by zone (Southern Marin, Central/Ross Valley, Novato, West Marin) when available. Confirm hillside access photos, bridge/101 timing, and premium valuation — not mini-SF elevator assumptions. Parent: San Francisco guide; nearby North Bay secondary: Sonoma.',
  lastReviewed: '2026-07-24',
});
