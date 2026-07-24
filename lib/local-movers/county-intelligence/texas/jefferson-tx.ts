import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTxTier2Pack,
  TX_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/texas/tx-tier2-shared';

/**
 * Jefferson County — Texas Tier 2 (independent Beaumont–Port Arthur Golden Triangle).
 * Secondary-market contract vs Harris Tier 1 density defaults — petro/industrial,
 * humidity, I-10 logistics — not a Houston collar clone.
 */
export const jeffersonCountyIntelligence: CountyIntelligencePack = finalizeTxTier2Pack({
  countySlug: 'jefferson',
  hubTitle: 'Jefferson County Moving Intelligence Hub',
  eyebrow: 'Jefferson County · Independent Beaumont–Port Arthur Golden Triangle industrial',
  h1: 'Moving in Jefferson County: Independent Golden Triangle — Beaumont, Port Arthur & I-10 Industrial Logistics',
  heroOpener:
    'Jefferson County is an independent Beaumont–Port Arthur Golden Triangle industrial metro — not Houston with freer freeways, and not a Texas Triangle HOA growth collar. Petrochemical and port adjacency, Gulf humidity, Beaumont core multi-unit and mid-century stock, Port Arthur / Nederland / Groves product, and I-10 freeflow form their own housing ladder under industrial traffic and heat. Compared with Harris Tier 1 density defaults, I-10 and US-69 freeflow replace multi-county basin gridlock, industrial-edge logistics are first-class, and almost no vertical tower product is the norm. This guide is for people moving in Jefferson County as a secondary market with its own role — not recycled Harris scripts.',
  heroCredibility:
    'Independent Golden Triangle · Petro / industrial · Gulf humidity · I-10 · TxDMV household goods (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-10 · US-69 · US-96 · SH-73 · local Beaumont–Port Arthur grid',
  parentCompare: {
    parentLabel: 'Independent Golden Triangle (Harris density contrast)',
    parentHref: '/local-movers/texas/harris',
    title: 'Compared with Harris County (Houston) Tier 1 density defaults',
    intro:
      'Jefferson is a freestanding Golden Triangle industrial metro east of Houston on I-10 — not a Harris suburb and not a bedroom collar. Use Harris County as the high-density parent contrast — it is not a drop-in template for petro-edge residential, Port Arthur multi-city pairs, or Gulf humidity calendars.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Harris crews fight I-10, I-45, Beltway 8, and multi-hour cross-county pairs into downtown and the Medical Center. Jefferson pairs ride I-10, US-69, US-96, SH-73, and the local Beaumont–Port Arthur grid with freer mid-day flow — Beaumont ↔ Port Arthur still burns portal-to-portal time at peak, but it is not a Katy ↔ Downtown Houston job. I-10 connectivity to Houston is real; Jefferson is still its own market, not a Harris collar clone.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Harris mixes towers, bungalows, bayou ranchers, and west-side HOAs under one county label. Jefferson’s ladder is Beaumont core multi-unit and mid-century stock, Port Arthur / Nederland / Groves suburban and working product, industrial-edge residential, and rural edges — far less elevator density, more petro-adjacent and Gulf-humidity product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Jefferson stages more driveway, industrial-edge, and multi-city freeflow work than Houston elevator corridors. HOAs exist in some growth pockets but are not the Sugar Land operating system. Plant traffic, freight peaks, and humidity replace dense curb-staging fights.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Jefferson quotes often sit below Houston rates for comparable square footage when access is simple — humidity windows, industrial-edge empty miles, and Beaumont ↔ Port Arthur portal time still push prices up. Expect secondary-market labor rates with petro logistics and Gulf weather as the main premiums, not basin gridlock fees.',
      },
      {
        title: 'Role difference',
        detail:
          'Beaumont–Port Arthur is an independent Golden Triangle industrial metro with its own employment base (petrochemical, port, healthcare, education, logistics) — not a Houston bedroom collar. Treat it as its own market when matching crews and rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Jefferson County different',
    intro:
      'Independent Golden Triangle realities — petro/industrial adjacency, Gulf humidity, Beaumont vs Port Arthur split, and freer I-10 corridors than Harris parents — that change estimates.',
    bullets: [
      {
        title: 'Petro and industrial adjacency reshape timing',
        detail:
          'Plant freight, shift-change peaks, and industrial corridors can delay trucks even when residential addresses look simple. Buffer time on I-10, US-69, US-96, and SH-73 industrial edges.',
      },
      {
        title: 'Humidity and Gulf weather are operational constraints',
        detail:
          'Gulf humidity and summer heat stress crews, electronics, and sealed packaging. Prefer morning load windows in peak summer; protect inventory from moisture — inland Houston HOA habits do not transfer one-for-one to open coastal-adjacent staging.',
      },
      {
        title: 'Beaumont vs Port Arthur / Nederland / Groves',
        detail:
          'Beaumont core multi-unit, Port Arthur product, and Nederland/Groves suburban stock are different jobs under one county label. “Jefferson local” is too vague — name both cities and access type on the estimate.',
      },
      {
        title: 'I-10 freeflow is not Houston basin — still a line item',
        detail:
          'Cross-city pairs freer than Harris still burn billable time at school, shift, and commute peaks. Ask whether quotes are portal-to-portal, especially Beaumont ↔ Port Arthur.',
      },
      TX_TIER2_REG_BULLET,
    ],
  },
  zonesHeading:
    'Jefferson County zones: Beaumont core, Port Arthur, Nederland/Groves & industrial edges',
  zonesIntro:
    'Four sharp products — not a six-zone dump. Beaumont core density, Port Arthur, Nederland/Groves Mid-County, and industrial-edge residential price and stage differently under the same petro and humidity calendar.',
  zones: [
    {
      id: 'beaumont-core',
      name: 'Beaumont Core',
      shortName: 'Beaumont core',
      neighborhoods: [
        'Downtown Beaumont edges',
        'Central multi-family clusters',
        'Mid-century residential belts',
        'I-10 / US-69 approaches',
        'Historic and older grid neighborhoods',
      ],
      housingTypes:
        'Older SFH, multi-unit buildings, mid-century stock, some redevelopment product',
      challenges: [
        'Tighter street parking and multi-unit long carries',
        'Elevator/COI rules in some multi-unit buildings',
        'I-10 / US-69 approaches into the core',
        'Humidity and heat on asphalt staging without shade',
      ],
      moverTips:
        'Confirm building rules for multi-unit. Weekday mornings beat heat, humidity, and commute peaks. Inventory stairs carefully in older multi-story stock. Share parking constraints on denser blocks.',
      cityKeywords: [
        'beaumont',
        'beaumont tx',
        'downtown beaumont',
        'central beaumont',
        'beaumont core',
      ],
    },
    {
      id: 'port-arthur',
      name: 'Port Arthur',
      shortName: 'Port Arthur',
      neighborhoods: [
        'Port Arthur',
        'Port-adjacent residential',
        'SH-73 / industrial approach belts',
        'Working and mid-century SFH',
        'Multi-family pockets',
      ],
      housingTypes:
        'Working SFH, mid-century tracts, multi-family, industrial-edge residential',
      challenges: [
        'Industrial and port freight traffic peaks',
        'Humidity and heat on open staging',
        'Longer empty miles from Beaumont staging',
        'Varied access vs pure suburban product',
      ],
      moverTips:
        'Buffer portal time near industrial peaks on SH-73 and US-69 approaches. Confirm street width and parking. Morning starts beat Gulf heat and shift traffic. Do not price Port Arthur like Beaumont core multi-unit without naming access type.',
      cityKeywords: [
        'port arthur',
        'port arthur tx',
        'sh 73',
        'port arthur industrial',
        'golden triangle port arthur',
      ],
    },
    {
      id: 'nederland-groves',
      name: 'Nederland / Groves (Mid-County)',
      shortName: 'Nederland / Groves',
      neighborhoods: [
        'Nederland',
        'Groves',
        'Port Neches edges',
        'Mid-County suburban tracts',
        'Family SFH corridors',
      ],
      housingTypes:
        'Suburban SFH, mid-century tracts, modest growth product, limited multi-family',
      challenges: [
        'Cross-city peaks toward Beaumont and Port Arthur',
        'Driveway and cul-de-sac access variation',
        'Humidity on open suburban staging',
        'Family-volume inventory on summer weekends',
      ],
      moverTips:
        'Treat Mid-County as its own product between Beaumont and Port Arthur. Mid-week early starts beat heat and school traffic. Inventory family-volume SFH carefully. Clarify Nederland/Groves ↔ Beaumont drive assumptions.',
      cityKeywords: [
        'nederland',
        'groves',
        'port neches',
        'mid-county',
        'nederland tx',
        'groves tx',
      ],
    },
    {
      id: 'industrial-edges',
      name: 'Industrial Edges',
      shortName: 'Industrial edges',
      neighborhoods: [
        'Plant-adjacent residential',
        'I-10 industrial corridors',
        'US-69 / US-96 edge product',
        'Rural Jefferson edges',
        'Open-lot working residential',
      ],
      housingTypes:
        'Working SFH, manufactured and site-built mix, industrial-edge rentals, limited multi-family',
      challenges: [
        'Freight and shift-change congestion',
        'Soft driveways and limited turnarounds',
        'Long empty miles and plant-adjacent access notes',
        'Humidity, heat, and grit on open staging',
      ],
      moverTips:
        'Treat industrial edges as long-local jobs with freight timing. Share access notes near plant corridors. Confirm driveway surface and truck-turn constraints. Prefer early starts outside shift peaks when possible.',
      cityKeywords: [
        'jefferson industrial',
        'i-10 beaumont',
        'plant edge jefferson',
        'golden triangle industrial',
        'rural jefferson',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Jefferson County',
    intro:
      'Same square footage prices differently by humidity windows, industrial-edge timing, multi-unit COI, and whether the job is Beaumont core or Port Arthur/Mid-County long local.',
    drivers: [
      {
        title: 'Humidity & heat-constrained work windows',
        detail:
          'Gulf humidity and heat compress productive outdoor hours. Jobs that slip into peak afternoon humidity may need more labor days or premium scheduling.',
      },
      {
        title: 'Beaumont ↔ Port Arthur portal time',
        detail:
          'Cross-city pairs on I-10 / US-69 / SH-73 can burn more clock than map miles suggest at peak — freer than Houston basin, still billable.',
      },
      {
        title: 'Industrial / petro adjacency delays',
        detail:
          'Freight peaks near plants and port corridors can slow trucks even on short residential legs — buffer time into the estimate.',
      },
      {
        title: 'Multi-unit core access',
        detail:
          'Elevators, COI, and curb staging in Beaumont core multi-unit add coordination soft costs versus pure driveway SFH.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$400–$1,300+',
        note: 'Higher with elevators, humidity delays, or industrial time',
      },
      {
        label: '2–3BR house / apartment',
        value: '$1,200–$3,600+',
        note: 'Cross-city and Mid-County hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / industrial edge)',
        value: '$2,000–$5,800+',
        note: 'Industrial-edge and long locals price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal & Gulf weather calendar intelligence',
    intro:
      'Jefferson peaks follow summer heat/humidity, industrial shift calendars, and storm-season flexibility needs — not Houston basin lease density alone.',
    items: [
      {
        title: 'Summer heat & humidity: roughly May – September',
        detail:
          'Plan early-morning loads, moisture-safe packing, and realistic crew endurance. Mid-afternoon moves in peak humidity are high risk for people and property.',
      },
      {
        title: 'Industrial & family calendars',
        detail:
          'Shift-change peaks and summer family SFH weekends can tighten crews. Book popular Saturdays early when flexible.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Still plan around apartment elevator windows and industrial corridor timing when applicable. Dawn starts win even in shoulder seasons when weather and freight are the real constraints.',
      },
    ],
  },
  specialized: [
    {
      id: 'petro-industrial-adjacency',
      title: 'Petro & industrial adjacency logistics',
      intro:
        'Jefferson’s defining logistics constraint is plant and port freight that pure residential Houston rate cards often underweight.',
      bullets: [
        'Buffer portal time near plant and port peaks on I-10, US-69, US-96, and SH-73.',
        'Share street-width and parking photos for industrial-edge residential grids.',
        'Ask whether Beaumont ↔ Port Arthur pairs still use a pure local rate card.',
        'Inventory carefully when sheds, shops, or mixed-use edges appear on the survey.',
      ],
    },
    {
      id: 'gulf-humidity',
      title: 'Gulf humidity & coastal-adjacent weather',
      intro:
        'Jefferson’s defining climate constraint is Gulf humidity and heat that inland Triangle rate cards often underweight.',
      bullets: [
        'Prefer morning starts in peak summer; treat mid-afternoon humidity loads as higher risk.',
        'Request shaded staging and moisture-safe packing for electronics, paper goods, and sealed items.',
        'Plan water, rotation, and realistic crew endurance — humidity is a labor and quality issue, not just comfort.',
        'Build flexible language for storm-season weather delays on outdoor packing.',
      ],
    },
    {
      id: 'i10-golden-triangle-routing',
      title: 'I-10 Golden Triangle routing',
      intro:
        'Beaumont, Port Arthur, Nederland/Groves, and industrial edges on I-10, US-69, US-96, and SH-73 are not interchangeable with a single Houston neighborhood move.',
      bullets: [
        'Name both cities on every estimate (e.g. Beaumont → Port Arthur); “Jefferson local” hides portal time.',
        'Price peak I-10 / US-69 / SH-73 pairs honestly — map miles understate shift and commute congestion.',
        'Clarify whether long locals toward industrial edges still use a pure local rate card.',
        'Build buffer when households also stage storage or partial loads common in industrial workforce moves.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Independent Golden Triangle value, industrial living, and Gulf humidity are different bets — validate schools and healthcare by pocket, then plan for weather and corridor access.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Major systems include Beaumont ISD, Port Arthur ISD, Nederland ISD, Port Neches-Groves ISD, and others. Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'Multiple districts under one county',
            detail:
              'Beaumont, Port Arthur, and Mid-County addresses often fall in different systems. Marketing names can span feeders — verify with official boundary tools and TEA data.',
          },
          {
            title: 'Core vs Mid-County vs industrial edges',
            detail:
              'Households face different commute patterns and calendars by pocket. Do not treat county averages as neighborhood truth.',
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
              'Baptist Hospitals of Southeast Texas, CHRISTUS Southeast Texas, and other Beaumont–Port Arthur campuses serve the Golden Triangle. Map ER drive times at rush hour from Port Arthur, Nederland/Groves, and industrial edges.',
          },
          {
            title: 'Specialty & regional reality',
            detail:
              'Some specialties may require travel toward Houston. Confirm insurer networks and realistic I-10 appointment times before relocating mid-treatment.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if mid-treatment; book first appointments before peak summer humidity-move chaos.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Jefferson resources',
    intro:
      'Local official links first; directory listings are independent. Verify TxDMV household goods authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Jefferson County',
        href: 'https://co.jefferson.tx.us/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Beaumont',
        href: 'https://beaumonttexas.gov/',
        external: true,
      },
      {
        label: 'City of Port Arthur',
        href: 'https://www.portarthurtx.gov/',
        external: true,
      },
      {
        label: 'City of Nederland',
        href: 'https://www.ci.nederland.tx.us/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Beaumont core, Port Arthur, Nederland/Groves, Industrial edges) when available. Confirm humidity-window plans, industrial corridor timing, and honest Beaumont–Port Arthur drive assumptions — this is an independent Golden Triangle metro, not a Houston collar.',
  lastReviewed: '2026-07-24',
});
