import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTxTier2Pack,
  TX_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/texas/tx-tier2-shared';

/**
 * El Paso County — Texas Tier 2 (independent West Texas border metro).
 * Secondary-market contract vs Houston / DFW Tier 1 density defaults — not a
 * Houston/DFW collar and not a thinner Triangle zone dump.
 */
export const elPasoCountyIntelligence: CountyIntelligencePack = finalizeTxTier2Pack({
  countySlug: 'el-paso',
  hubTitle: 'El Paso County Moving Intelligence Hub',
  eyebrow: 'El Paso County · Independent West Texas border metro',
  h1: 'Moving in El Paso County: Independent Border Metro, Fort Bliss & Desert Logistics',
  heroOpener:
    'El Paso County is an independent West Texas border metro — not Houston or DFW with freer freeways, and not a Texas Triangle HOA growth collar. Chihuahuan Desert heat, Franklin Mountains grades, Fort Bliss PCS cycles, and a binational logistics economy form their own housing ladder under extreme summer temperatures. Compared with Houston / DFW Tier 1 density defaults, I-10 and Loop 375 freeflow replace multi-county basin gridlock, HOA villages are thinner, and mountain-edge plus military multi-family product is normal. This guide is for people moving in El Paso County as a secondary market with its own role — not recycled Harris or Dallas scripts.',
  heroCredibility:
    'Independent West Texas border metro · Fort Bliss PCS · Desert / mountain-edge · TxDMV household goods (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-10 · US-54 · Loop 375 · I-110 · Mesa Street corridor',
  parentCompare: {
    parentLabel: 'Texas Triangle Tier 1 metros (Harris / Dallas density defaults)',
    parentHref: '/local-movers/texas/harris',
    title: 'Compared with Houston / DFW Tier 1 density defaults',
    intro:
      'El Paso is a freestanding far-west border metro hundreds of miles from the Texas Triangle. Use Houston and DFW as high-density parent contrasts — neither is a drop-in template for Fort Bliss PCS apartments, Franklin Mountains grades, or desert-heat move days.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Houston and DFW crews fight multi-freeway basins (I-10/I-45/I-69 stacks; I-35/I-635/Tollway walls). El Paso pairs ride I-10, US-54, Loop 375, I-110, and the Mesa Street corridor with freer mid-day flow — Central ↔ Eastside still burns portal-to-portal time at peak, but it is not a Harris-County cross-basin job. Isolation means long-haul deadhead to the Triangle, not short-hop collar spillover.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Harris/Dallas mix dense elevators, master-planned HOA villages, and multi-county suburban product. El Paso’s ladder is Central multi-unit and older grids, Westside mountain-edge SFH, Eastside/Horizon suburban tracts, and Northeast Fort Bliss-adjacent apartments — more military multi-family and desert hillside product, less Triangle HOA density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'El Paso stages more driveway and foothill work than Houston elevator corridors. HOAs exist on Eastside growth but are not the default operating system of a Frisco or Katy village belt. Grade, wind, and limited turnaround on Westside slopes replace dense curb-staging fights.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local El Paso quotes often sit below Houston/DFW rates for comparable square footage when access is simple — heat windows, Westside grades, PCS peaks, and cross-town I-10 time still push prices up. Expect secondary-market labor rates with desert heat, mountain access, and military seasonality as the main premiums — not coastal scarcity or basin gridlock fees.',
      },
      {
        title: 'Role difference',
        detail:
          'El Paso is an independent border metro with its own employment base (military/federal, healthcare, education, logistics, binational trade) — not a Houston bedroom collar and not a DFW spillover suburb. Treat it as its own market when matching crews and rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in El Paso County different',
    intro:
      'Independent border-metro realities — desert heat, Fort Bliss PCS volume, mountain-edge access, and freer I-10/Loop 375 corridors than Triangle parents — that change estimates.',
    bullets: [
      {
        title: 'Desert heat is an operational constraint, not a footnote',
        detail:
          'May–September afternoons regularly hit extreme temperatures. Heat stresses crews, electronics, and sealed packaging. Prefer earliest morning load windows in peak summer, request shaded staging, and treat mid-afternoon starts as high risk — Houston humidity habits and mild-winter DFW scripts do not transfer one-for-one.',
      },
      {
        title: 'Fort Bliss PCS cycles rewrite demand',
        detail:
          'Military permanent change of station windows pack Northeast apartments, short-notice inventory, and storage-in-transit needs. Peak PCS seasons require earlier booking than civilian-only Triangle suburb calendars.',
      },
      {
        title: 'Westside mountain-edge vs Central vs Eastside/Horizon',
        detail:
          'Franklin Mountains grades, Central multi-unit grids, Eastside/Horizon suburban product, and Fort Bliss-adjacent apartments are different jobs under one county label. “El Paso local” is too vague — put both pockets and access type on the estimate.',
      },
      {
        title: 'I-10 / Loop 375 freeflow is not Houston basin — still a line item',
        detail:
          'Cross-town pairs freer than Harris or Dallas still burn billable time at school and commute peaks. Ask whether quotes are portal-to-portal, especially Westside ↔ Horizon or Northeast ↔ Central.',
      },
      TX_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'El Paso County zones: Central, Westside, Eastside/Horizon & Fort Bliss edges',
  zonesIntro:
    'Four sharp products — not a six-zone dump. Central density, Westside mountain-edge, Eastside/Horizon growth, and Northeast/Fort Bliss edges price and stage differently under the same desert heat calendar.',
  zones: [
    {
      id: 'central-el-paso',
      name: 'Central El Paso',
      shortName: 'Central',
      neighborhoods: [
        'Downtown El Paso',
        'Sunset Heights',
        'Manhattan Heights edges',
        'Central multi-unit corridors',
        'Older bungalow grids',
      ],
      housingTypes:
        'Older SFH, multi-unit buildings, mid-century stock, some loft/adaptive reuse, denser street grids',
      challenges: [
        'Tighter street parking and multi-unit long carries',
        'Elevator/COI rules in some multi-unit buildings',
        'I-10 / I-110 approaches and bridge-adjacent peaks',
        'Peak heat on asphalt staging without shade',
      ],
      moverTips:
        'Confirm building rules for multi-unit. Weekday mornings beat heat and commute peaks. Inventory stairs carefully in older multi-story stock. Share parking constraints on denser blocks.',
      cityKeywords: [
        'downtown el paso',
        'sunset heights',
        'central el paso',
        'manhattan heights',
        'el paso',
      ],
    },
    {
      id: 'westside',
      name: 'Westside',
      shortName: 'Westside',
      neighborhoods: [
        'Westside slopes',
        'Coronado area',
        'Mountain-adjacent foothills',
        'Scenic Drive corridor edges',
        'Larger-lot hillside homes',
      ],
      housingTypes:
        'Hillside SFH, larger-lot desert homes, some multi-family lower on the slope',
      challenges: [
        'Grade, limited truck turnaround, and long carries',
        'Wind exposure on open staging',
        'Narrow approaches on some foothill streets',
        'Heat amplification on reflective surfaces',
      ],
      moverTips:
        'Treat Westside as access-first: driveway grade and turnaround photos before booking. Prefer earliest morning starts. Confirm truck size for foothill streets. Price Westside ↔ Eastside as a multi-zone haul.',
      cityKeywords: [
        'westside',
        'coronado',
        'franklin mountains',
        'scenic drive',
        'west el paso',
      ],
    },
    {
      id: 'eastside-horizon',
      name: 'Eastside / Horizon',
      shortName: 'Eastside / Horizon',
      neighborhoods: [
        'East El Paso',
        'Zaragoza corridor residential',
        'Joe Battle / Loop 375 east pockets',
        'Horizon City',
        'Socorro edge',
      ],
      housingTypes:
        'Suburban SFH, HOA tracts, townhomes, multi-family, newer far-east growth',
      challenges: [
        'Peak I-10 / Loop 375 congestion',
        'HOA COI where planned communities apply',
        'Longer deadhead for Westside ↔ Horizon pairs',
        'Summer heat on open streets and new-construction edges',
      ],
      moverTips:
        'Collect HOA packets when applicable. Early starts beat desert heat. Ask whether “local” rate cards still apply for Horizon ↔ Westside pairs. Confirm access the week of the move in new sections.',
      cityKeywords: [
        'eastside',
        'east el paso',
        'horizon',
        'horizon city',
        'socorro',
        'zaragoza',
        'joe battle',
        'loop 375',
      ],
    },
    {
      id: 'northeast-fort-bliss',
      name: 'Northeast / Fort Bliss edges',
      shortName: 'NE / Fort Bliss',
      neighborhoods: [
        'Northeast El Paso',
        'Fort Bliss-adjacent apartments',
        'Dyer / Railroad corridors',
        'Military family housing edges (as applicable)',
        'Multi-family PCS corridors',
      ],
      housingTypes:
        'Apartments, townhomes, modest SFH, military-adjacent multi-family',
      challenges: [
        'PCS peak volume and short-notice moves',
        'Apartment elevator windows and COI',
        'Base access coordination when applicable',
        'High turnover inventory profiles',
      ],
      moverTips:
        'Book PCS windows early. Confirm gate/base access rules if either address requires it. Inventory carefully for partial loads and storage-in-transit common in military moves. Collect apartment COI before the survey is final.',
      cityKeywords: [
        'fort bliss',
        'northeast',
        'dyer',
        'northeast el paso',
        'pcs',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside El Paso County',
    intro:
      'Same square footage prices differently by heat window, Westside grade access, Fort Bliss PCS timing, and whether the job stays Central/Eastside or climbs mountain edges.',
    drivers: [
      {
        title: 'Heat-constrained work windows',
        detail:
          'Summer heat compresses productive hours into mornings. Jobs that slip into peak afternoon heat may need more labor days or premium scheduling.',
      },
      {
        title: 'Mountain-edge / hillside access',
        detail:
          'Grades, limited turnaround, and long carries on Westside lots add labor hours fast — access photos prevent underquotes.',
      },
      {
        title: 'Cross-town I-10 / Loop 375 time',
        detail:
          'Westside ↔ Horizon or Northeast ↔ Central can burn more portal-to-portal time than map miles suggest at peak — freer than Houston basin, still billable.',
      },
      {
        title: 'PCS peak capacity',
        detail:
          'Military move seasons tighten crews near Northeast multi-family and can push rates or lead times — book early for known PCS windows.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$400–$1,300+',
        note: 'Higher with elevators, PCS peaks, or hillside long-carry',
      },
      {
        label: '2–3BR house / apartment',
        value: '$1,200–$3,600+',
        note: 'Cross-town and mountain-edge jobs trend up',
      },
      {
        label: '3–4+ BR (cross-zone / hillside / far east)',
        value: '$2,000–$6,000+',
        note: 'Westside grade pairs and Horizon long locals price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal & desert-heat calendar intelligence',
    intro:
      'El Paso peaks follow extreme desert heat, Fort Bliss PCS cycles, and wind/dust events — not Houston Gulf humidity or DFW school-suburb density alone.',
    items: [
      {
        title: 'Extreme summer heat: roughly May – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon moves in peak heat are high risk for people and property.',
      },
      {
        title: 'PCS peak windows (Fort Bliss)',
        detail:
          'Military permanent change of station seasons (often concentrated in summer) fill crews near Northeast multi-family. Book as soon as orders allow.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start outside PCS crush',
        detail:
          'Still plan around apartment elevator windows when applicable. Dawn starts win even in shoulder seasons when heat and arterials are the real constraints.',
      },
    ],
  },
  specialized: [
    {
      id: 'desert-border-logistics',
      title: 'Desert climate & border logistics',
      intro:
        'El Paso’s defining operational stack is Chihuahuan Desert heat plus border-metro freight timing that Houston/DFW rate cards often underweight.',
      bullets: [
        'Prefer earliest morning starts in peak summer; treat mid-afternoon loads as high risk.',
        'Request shaded staging and heat-safe packing for electronics, candles, and sealed goods.',
        'Buffer time near I-10, bridge approaches, and freight peaks even on “local” map miles.',
        'Protect inventory from dust and wind; have tarps ready for grit-prone days.',
      ],
    },
    {
      id: 'fort-bliss-pcs',
      title: 'Fort Bliss PCS & military household logistics',
      intro:
        'Military turnover, short notice, and apartment access define volume near Northeast corridors more than Triangle HOA paperwork alone.',
      bullets: [
        'Book as soon as PCS orders allow; peak summer capacity disappears first near multi-family corridors.',
        'Confirm base access, gate hours, and escort rules if either address requires installation entry.',
        'Inventory carefully for partial loads, storage-in-transit, and weight-based entitlements when applicable.',
        'Collect apartment COI and elevator reservations before the survey is final.',
      ],
    },
    {
      id: 'mountain-edge-access',
      title: 'Mountain-edge & Westside access',
      intro:
        'Franklin Mountains grades need operational plans that flat Triangle suburbs never write.',
      bullets: [
        'Share driveway grade, width, and turnaround photos for Westside and foothill homes before booking.',
        'Confirm vehicle capability for steep or narrow mountain-edge approaches before dispatching a full-size truck.',
        'Price Westside ↔ Eastside / Horizon pairs as cross-metro jobs with honest I-10 / Loop 375 time.',
        'Plan wind exposure and limited shaded staging on open hillside lots.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Independent border-metro value, Fort Bliss adjacency, and desert heat are different bets — validate schools and healthcare by pocket, then plan for extreme summer temperatures.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Major systems include El Paso ISD, Ysleta ISD, Socorro ISD, Canutillo ISD, Clint ISD, and others. Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'Multiple districts under one county',
            detail:
              'City and unincorporated addresses often fall in different systems. Marketing names and new tracts can span feeders — verify with official boundary tools and TEA data.',
          },
          {
            title: 'Military family considerations',
            detail:
              'PCS timing and school-year midpoints matter for Fort Bliss-affiliated households — coordinate enrollment early with district military liaisons when available.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and TEA data should lead; third-party rankings are secondary. Tour campuses when possible.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Metro acute-care anchors',
            detail:
              'University Medical Center of El Paso, Las Palmas, Del Sol, William Beaumont Army Medical Center (military-eligible), and other campuses serve the metro. Map ER drive times at rush hour from Westside slopes vs Horizon.',
          },
          {
            title: 'Specialty & isolation reality',
            detail:
              'Some specialties require longer travel than Triangle metros offer locally. Confirm insurer networks and realistic appointment times on I-10 / Loop 375.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if mid-treatment; book first appointments before peak summer PCS chaos.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful El Paso resources',
    intro:
      'Local official links first; directory listings are independent. Verify TxDMV household goods authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'El Paso County',
        href: 'https://www.epcounty.com/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of El Paso',
        href: 'https://www.elpasotexas.gov/',
        external: true,
      },
      {
        label: 'Town of Horizon City',
        href: 'https://www.horizoncity.org/',
        external: true,
      },
      {
        label: 'Fort Bliss (official)',
        href: 'https://home.army.mil/bliss/',
        note: 'PCS and installation information for military-affiliated moves',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Central, Westside, Eastside/Horizon, NE/Fort Bliss) when available. Confirm hillside access photos for Westside, PCS/base rules near Fort Bliss, and heat-aware start times — this is an independent border metro, not a Houston/DFW collar.',
  lastReviewed: '2026-07-24',
});
