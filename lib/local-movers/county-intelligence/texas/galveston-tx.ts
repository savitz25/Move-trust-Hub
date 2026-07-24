import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTxTier2Pack,
  TX_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/texas/tx-tier2-shared';

/**
 * Galveston County — Texas Tier 2 (Houston coastal / island + mainland collar).
 * Secondary-market contract vs Harris Tier 1 parent — island causeway access,
 * mainland north growth, and coastal humidity — not Houston core elevators.
 */
export const galvestonCountyIntelligence: CountyIntelligencePack = finalizeTxTier2Pack({
  countySlug: 'galveston',
  hubTitle: 'Galveston County Moving Intelligence Hub',
  eyebrow: 'Galveston · Houston coastal collar · Island + mainland',
  h1: 'Moving in Galveston County: Houston Coastal Collar — Island Causeway, League City & Mainland',
  heroOpener:
    'Galveston County is Houston’s coastal collar — Galveston Island residential and vacation stock on one side, League City and mainland north growth on the other, plus Texas City / La Marque industrial-adjacent neighborhoods and careful Bolivar/coastal edges. This is not Harris downtown elevators and not a pure Pearland suburb script. Causeway timing, humidity and salt air, island grid streets, and a vacation-plus-residential mix change every crew day. Compared with Harris, you trade Medical Center dock density for I-45 south freeflow that still clogs on beach weekends, mainland HOA growth that feels suburban, and island access that no inland collar shares. This guide is for people moving in Galveston County as a coastal market with its own role — not recycled Houston core tips.',
  heroCredibility:
    'Houston coastal collar · Island + mainland access · TxDMV household goods (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-45 · SH-87 · SH-146 · Broadway / Seawall approaches · local island grid',
  parentCompare: {
    parentLabel: 'Harris County',
    parentHref: '/local-movers/texas/harris',
    title: 'Compared with Harris County',
    intro:
      'Galveston is the Houston coastal collar — island, League City/mainland north, Texas City/La Marque, and limited Bolivar/coastal edges — not a drop-in template for downtown elevators, Energy Corridor towers, or pure inland sprawl. Use Harris as the dense metro parent contrast.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Harris crews fight I-10, Beltway 8, and multi-hour cross-county pairs into downtown and the Medical Center. Galveston pairs ride I-45 south, SH-146, SH-87, Broadway/Seawall approaches, and the local island grid — freer mid-week mid-day than Inner Loop, but beach weekends, causeway incidents, and storm closures rewrite ETAs Harris inland jobs never see.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Harris mixes towers, bungalows, bayou ranchers, and west-side HOAs. Galveston’s ladder splits island historic and coastal multi-unit, League City master-planned SFH, Texas City / La Marque working stock, and limited coastal-edge product — vacation rentals and second homes appear far more often than in Harris core.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Harris core needs elevators and curb permits; many Harris suburbs allow freer driveway work. Galveston Island adds narrow grids, seawall approaches, ferry/causeway constraints, and salt-air staging. Mainland League City flips to HOA cul-de-sacs more like other collars — still not interchangeable with island jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Mainland League City driveway jobs often price like other Houston collars. Island pairs add causeway portal time, parking constraints, humidity risk, and vacation-calendar spikes — expect coastal access premiums over simple Harris suburban driveway rates when the job is island-bound.',
      },
      {
        title: 'Role difference',
        detail:
          'Galveston is Houston’s coastal and island market — tourism calendar, humidity, and causeway logistics — not Harris’s job-center core and not Fort Bend’s inland master-planned SW product. Treat it as its own collar when matching crews and rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Galveston County different',
    intro:
      'Coastal collar realities — island/causeway access, humidity and salt air, vacation-residential mix, and mainland growth that is not the island — that change estimates.',
    bullets: [
      {
        title: 'Island and causeway access rewrite “local”',
        detail:
          'Galveston Island pairs depend on I-45 causeway timing, weather, and incident risk. Map miles from League City understate peak weekend and storm windows. Put island vs mainland on every estimate.',
      },
      {
        title: 'Humidity, salt air, and storm season are operational',
        detail:
          'Coastal humidity stresses packing and electronics; tropical systems can cancel outdoor work and close approaches. Build weather contingency Harris inland crews underweight.',
      },
      {
        title: 'Vacation + residential mix changes inventory and calendars',
        detail:
          'Second homes, short-term rentals, and primary residences share island streets. Turnover spikes around holidays and beach season — not pure school-calendar suburban rhythm.',
      },
      {
        title: 'Mainland north is a different product than the island',
        detail:
          'League City HOA growth and Texas City industrial-adjacent stock stage like suburbs and working neighborhoods — not Broadway/Seawall grids. Do not use one rate card for both without access notes.',
      },
      TX_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Galveston zones: Island, League City mainland, Texas City / La Marque & coastal edges',
  zonesIntro:
    'Three to four sharp products — not a six-zone dump. Island access, mainland north growth, industrial-adjacent mid-county, and careful coastal edges price and stage differently under the same coastal collar.',
  zones: [
    {
      id: 'galveston-island',
      name: 'Galveston Island',
      shortName: 'Island',
      neighborhoods: [
        'Downtown / Strand edges',
        'Seawall Boulevard corridors',
        'East End Historic District edges',
        'West End residential',
        'Broadway approaches',
      ],
      housingTypes:
        'Historic SFH, coastal multi-unit, condos, vacation/second-home product, elevated and older stock',
      challenges: [
        'Causeway timing and weekend beach traffic',
        'Narrow island grid streets and limited truck staging',
        'Humidity, salt air, and storm reschedule risk',
        'Vacation turnover calendars vs pure residential rhythm',
      ],
      moverTips:
        'Treat island jobs as access-first. Confirm parking, street width, and elevator/condo rules. Avoid peak beach-weekend arrivals when flexible. Share stairs, elevation, and approach photos. Build weather contingency into tropical season.',
      cityKeywords: [
        'galveston',
        'galveston island',
        'seawall',
        'strand',
        'east end galveston',
        'west end galveston',
        'broadway galveston',
      ],
    },
    {
      id: 'league-city-mainland-north',
      name: 'League City & Mainland North',
      shortName: 'League City / north',
      neighborhoods: [
        'League City',
        'Friendswood-edge Galveston County pockets',
        'I-45 mainland corridors',
        'Master-planned north villages',
        'Clear Creek-adjacent residential',
      ],
      housingTypes:
        'Master-planned HOA SFH, established suburban tracts, townhomes, multi-family growth',
      challenges: [
        'HOA COI and approved hours in newer villages',
        'I-45 peaks toward Houston and south toward the island',
        'High family-move volume on summer weekends',
        'County-line confusion with Harris Clear Lake edges',
      ],
      moverTips:
        'League City is HOA-first growth — send management packets with the estimate. Clarify Harris vs Galveston addresses near Clear Lake. Mid-week early starts beat heat and school traffic. Do not assume island access rules apply on mainland cul-de-sacs.',
      cityKeywords: [
        'league city',
        'friendswood',
        'clear creek',
        'i-45 league city',
        'mainland galveston',
        'league city tx',
      ],
    },
    {
      id: 'texas-city-la-marque',
      name: 'Texas City & La Marque',
      shortName: 'Texas City / La Marque',
      neighborhoods: [
        'Texas City',
        'La Marque',
        'SH-146 corridors',
        'Industrial-edge residential',
        'Mainland mid-county tracts',
      ],
      housingTypes:
        'Working SFH, mid-century tracts, multi-family, industrial-adjacent residential',
      challenges: [
        'Industrial and port-adjacent traffic patterns',
        'SH-146 and I-45 approach timing',
        'Varied access vs pure League City HOA product',
        'Heat on open lots with limited shade',
      ],
      moverTips:
        'Price Texas City / La Marque as working suburban and industrial-edge stock — not island vacation product. Confirm parking and long-carry needs. Build corridor timing into north↔island pairs.',
      cityKeywords: [
        'texas city',
        'la marque',
        'sh 146',
        'texas city tx',
        'la marque tx',
      ],
    },
    {
      id: 'bolivar-coastal-edges',
      name: 'Bolivar & Coastal Edges (limited service density)',
      shortName: 'Bolivar / coastal edges',
      neighborhoods: [
        'Bolivar Peninsula communities',
        'Crystal Beach edges',
        'Ferry / SH-87 approaches',
        'Sparse coastal residential',
      ],
      housingTypes:
        'Coastal SFH, elevated homes, vacation and storm-rebuild stock, limited multi-unit',
      challenges: [
        'Ferry and long coastal approach logistics',
        'Lower same-day crew density and longer empty miles',
        'Storm vulnerability and access closures',
        'Soft shoulders and constrained staging',
      ],
      moverTips:
        'Treat Bolivar/coastal-edge pairs as specialized long-local or coastal jobs — not standard League City driveway rates. Confirm ferry schedules, weather windows, and approach photos before dispatch. Book extra buffer in storm season.',
      cityKeywords: [
        'bolivar',
        'crystal beach',
        'bolivar peninsula',
        'sh 87',
        'port bolivar',
        'gilchrist',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Galveston County',
    intro:
      'Same square footage prices differently by island/causeway access, humidity risk, and whether the job is League City HOA stock or coastal-edge long-local.',
    drivers: [
      {
        title: 'Island / causeway portal time & access',
        detail:
          'Mainland ↔ island pairs burn more portal-to-portal time than map miles suggest on beach weekends, incidents, or storm windows — freer mid-week, still billable.',
      },
      {
        title: 'HOA soft costs on mainland north growth',
        detail:
          'COI and approved hours in League City planned villages add paperwork and can force weekday-only windows.',
      },
      {
        title: 'Humidity, salt air & storm contingency',
        detail:
          'Coastal weather compresses outdoor work windows and can force reschedules. Packing and electronics need humidity-aware handling that inland Harris jobs underweight.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$550–$1,500+',
        note: 'Higher on island grids, multi-unit, or peak beach weekends',
      },
      {
        label: '2–3BR house / mainland planned community',
        value: '$1,600–$3,900+',
        note: 'HOA soft costs and I-45 hauls trend up',
      },
      {
        label: '3–4+ BR (island / cross-zone / coastal edge)',
        value: '$2,500–$6,200+',
        note: 'Causeway, Bolivar, and multi-stop coastal jobs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal & coastal calendar intelligence',
    intro:
      'Galveston peaks follow heat, beach/vacation calendars, school seasons on the mainland, and tropical storm risk — not downtown lease density alone.',
    items: [
      {
        title: 'Summer heat & beach peak: roughly May – September',
        detail:
          'Plan early-morning loads and heat-safe packing. Avoid peak beach-weekend island arrivals when flexible. Mid-afternoon moves in peak heat are high risk.',
      },
      {
        title: 'Tropical storm & hurricane window',
        detail:
          'Late summer through fall can force reschedules and approach closures. Discuss weather contingency and flexible dates for island and coastal-edge jobs.',
      },
      {
        title: 'Best value: mid-month mid-week, early start',
        detail:
          'Still plan around HOA weekday windows on mainland growth. Early starts win even in shoulder seasons when humidity and I-45 peaks are the real constraints.',
      },
    ],
  },
  specialized: [
    {
      id: 'island-causeway-access',
      title: 'Island & causeway access logistics',
      intro:
        'Galveston’s defining constraint is island access — causeway timing, grid staging, and weather risk that pure Harris inland jobs never see.',
      bullets: [
        'Price portal-to-portal time honestly for mainland ↔ island pairs, especially beach weekends.',
        'Confirm street width, parking, elevator/condo rules, and truck-turn constraints on the island grid.',
        'Build buffer for causeway incidents and storm-related delays.',
        'Share approach photos and elevation/stair notes before dispatch.',
      ],
    },
    {
      id: 'humidity-coastal',
      title: 'Humidity, salt air & coastal weather',
      intro:
        'Coastal humidity and tropical systems are operational constraints, not footnotes.',
      bullets: [
        'Prefer early starts; treat mid-afternoon loads in peak heat and humidity as high risk.',
        'Request humidity-aware packing for electronics, metal goods, and sealed boxes.',
        'Discuss storm contingency and flexible dates for island and coastal-edge work.',
        'Plan water, rotation, and realistic crew endurance on open coastal staging.',
      ],
    },
    {
      id: 'vacation-residential-mix',
      title: 'Vacation + residential mix',
      intro:
        'Second homes, short-term rentals, and primary residences share island corridors with different calendars and inventory profiles.',
      bullets: [
        'Clarify primary residence vs vacation/second-home inventory on the survey.',
        'Book around holiday and beach-season turnover spikes when possible.',
        'Confirm lockbox, HOA, and condo rules that pure suburban SFH jobs may not share.',
        'Do not apply League City driveway assumptions to Seawall multi-unit without a walkthrough.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Coastal collar living, island vs mainland, and League City growth are different bets — validate schools and healthcare by pocket, then plan for humidity and causeway times.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Major systems include Clear Creek ISD (large mainland north footprint), Galveston ISD on the island, Texas City ISD, and other local districts. Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'Clear Creek ISD & mainland north',
            detail:
              'Many League City and north mainland addresses fall in Clear Creek ISD, which also spans parts of adjacent counties. Marketing subdivision names can span feeders — verify with official boundary tools.',
          },
          {
            title: 'Galveston ISD & mid-county systems',
            detail:
              'Island addresses typically use Galveston ISD; Texas City / La Marque and other communities use their own districts. Do not treat county averages as neighborhood truth.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and state data should lead; third-party rankings are secondary. Tour campuses when possible.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'County acute-care anchors',
            detail:
              'UTMB Health (Galveston), campuses serving League City / mainland north, and facilities in Texas City form the local acute-care map. Map ER drive times at rush hour — and causeway time from the island.',
          },
          {
            title: 'Harris specialty spillover',
            detail:
              'Houston Medical Center and Clear Lake-area specialty care remain common for complex needs. Confirm insurer networks and realistic I-45 times.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if mid-treatment; book first appointments before peak summer and beach-season move chaos.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Galveston resources',
    intro:
      'Local official links first; directory listings are independent. Verify Texas TxDMV for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'City of Galveston',
        href: 'https://www.galvestontx.gov/',
        note: 'City services; condo/HOA rules are separate',
        external: true,
      },
      {
        label: 'City of League City',
        href: 'https://www.leaguecitytx.gov/',
        external: true,
      },
      {
        label: 'Galveston County — official site',
        href: 'https://www.galvestoncountytx.gov/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Island, League City/mainland north, Texas City/La Marque, Bolivar/coastal edges) when available. Confirm causeway timing for island jobs, HOA packets on mainland growth, and weather contingency — this is a Houston coastal collar, not Harris core.',
  lastReviewed: '2026-07-24',
});
