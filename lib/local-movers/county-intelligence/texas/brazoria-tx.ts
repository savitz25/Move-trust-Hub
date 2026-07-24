import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTxTier2Pack,
  TX_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/texas/tx-tier2-shared';

/**
 * Brazoria County — Texas Tier 2 (Houston south collar).
 * Secondary-market contract vs Harris Tier 1 parent — Pearland / Angleton /
 * Lake Jackson growth and industrial/petro adjacency, not Houston core elevators.
 */
export const brazoriaCountyIntelligence: CountyIntelligencePack = finalizeTxTier2Pack({
  countySlug: 'brazoria',
  hubTitle: 'Brazoria County Moving Intelligence Hub',
  eyebrow: 'Brazoria · Houston south collar · Pearland / Angleton / Lake Jackson',
  h1: 'Moving in Brazoria County: Houston South Collar — Pearland Growth, Angleton & Lake Jackson',
  heroOpener:
    'Brazoria County is Houston’s south collar — Pearland and Manvel growth on the Harris seam, Angleton mid-county government and residential stock, Lake Jackson / Clute Brazosport communities, and Freeport industrial edges. This is not downtown Houston elevators and not Fort Bend’s Sugar Land script. SH-288 freeflow with real peaks, suburban family volume, and petrochemical adjacency change every crew day. Compared with Harris, you get freer south-corridor rhythm than Inner Loop gridlock, denser new-construction HOA product in Pearland/Manvel, and industrial-edge logistics that pure bedroom collars underweight. This guide is for people moving in Brazoria as a south collar market with its own role — not recycled Houston core tips.',
  heroCredibility:
    'Houston south collar · Pearland / Angleton / Lake Jackson · TxDMV household goods (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'SH-288 · SH-35 · SH-6 · FM-518 · local Pearland grid',
  parentCompare: {
    parentLabel: 'Harris County',
    parentHref: '/local-movers/texas/harris',
    title: 'Compared with Harris County',
    intro:
      'Brazoria is the Houston south growth and industrial-edge collar — Pearland/Manvel, Angleton, Lake Jackson/Clute, and Freeport edges — not a drop-in template for downtown elevators, Energy Corridor towers, or bayou-core flood logistics. Use Harris as the dense metro parent contrast.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Harris crews fight I-10, I-45, Beltway 8, and multi-hour cross-county pairs into downtown and the Medical Center. Brazoria pairs ride SH-288, SH-35, SH-6, FM-518, and the local Pearland grid — freer mid-day than Inner Loop, still peak-heavy on Pearland ↔ Houston Medical Center and Manvel ↔ Angleton hauls. Portal-to-portal time is real; it is not a short downtown dock job.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Harris mixes towers, bungalows, bayou ranchers, and west-side HOAs under one county label. Brazoria’s ladder is Pearland/Manvel master-planned growth, Angleton mid-county SFH, Brazosport suburban stock around Lake Jackson/Clute, and Freeport industrial-adjacent residential — far less elevator density, more new-construction family volume and petro-edge product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Harris core needs COI elevators and curb permits. Brazoria north defaults to HOA cul-de-sacs in Pearland/Manvel growth; mid- and south-county flip to freer driveway work with industrial traffic near Freeport. Expect paperwork in growth suburbs and corridor timing everywhere.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Brazoria quotes often sit at secondary-collar rates for simple driveway access — HOA soft costs in Pearland growth, SH-288 peak time, and Freeport-edge empty miles still push prices up. Expect growth-suburb friction and distance premiums, not downtown dock scarcity.',
      },
      {
        title: 'Role difference',
        detail:
          'Brazoria is Houston’s south bedroom and industrial-edge engine — Pearland schools and growth, Brazosport communities, and petro adjacency — not Harris’s job-center core and not Galveston’s island product. Treat it as its own collar market when matching crews and rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Brazoria County different',
    intro:
      'South collar realities — Pearland/Manvel suburban growth, SH-288 freeflow with peaks, industrial/petro adjacency, and mid-county vs Brazosport split — that change estimates.',
    bullets: [
      {
        title: 'Pearland / Manvel growth is not Angleton or Freeport',
        detail:
          'A Pearland HOA two-story, an Angleton mid-county home, a Lake Jackson tract, and a Freeport industrial-edge rental do not share gate rules, truck access, or inventory profiles. Name both origin and destination communities on every estimate.',
      },
      {
        title: 'SH-288 freeflow is not Harris gridlock — still a line item',
        detail:
          'Pearland ↔ Medical Center or Manvel ↔ Lake Jackson pairs freer than Inner Loop still burn billable time at school and commute peaks. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'Industrial and petro adjacency shapes south-county logistics',
        detail:
          'Freeport and plant-adjacent corridors bring freight traffic, shift-change peaks, and longer empty miles that pure bedroom collars miss. Share access notes near industrial edges.',
      },
      {
        title: 'Gulf Coast heat on open suburban and plant-edge staging',
        detail:
          'June–September afternoons stress crews on asphalt cul-de-sacs and open lots. Prefer early starts; treat mid-afternoon load-outs as high risk even when the map looks short.',
      },
      TX_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Brazoria zones: Pearland/Manvel, Angleton mid-county, Lake Jackson/Clute & Freeport edges',
  zonesIntro:
    'Three to four sharp products — not a six-zone dump. North growth on the Harris seam, mid-county seat stock, Brazosport suburbs, and industrial edges price and stage differently under the same south collar.',
  zones: [
    {
      id: 'pearland-manvel-growth',
      name: 'Pearland & Manvel Growth',
      shortName: 'Pearland / Manvel',
      neighborhoods: [
        'Pearland',
        'Manvel',
        'FM-518 corridors',
        'Master-planned north villages',
        'SH-288 north approach',
      ],
      housingTypes:
        'Master-planned HOA SFH, new-construction tracts, townhomes, multi-family growth',
      challenges: [
        'HOA COI, approved hours, and gate lists in newer villages',
        'SH-288 and FM-518 peak congestion toward Houston',
        'High family-move volume on summer weekends',
        'County-line confusion with south Harris edges',
      ],
      moverTips:
        'Pearland/Manvel is HOA-first growth — send management packets with the estimate. Clarify Harris vs Brazoria addresses near the seam. Mid-week early starts beat heat and school traffic. Inventory family-volume SFH carefully.',
      cityKeywords: [
        'pearland',
        'manvel',
        'fm 518',
        'pearland tx',
        'manvel tx',
        'sh 288 pearland',
      ],
    },
    {
      id: 'angleton-mid-county',
      name: 'Angleton Mid-County',
      shortName: 'Angleton',
      neighborhoods: [
        'Angleton',
        'SH-35 / SH-288 mid-county corridors',
        'County-seat residential',
        'Surrounding mid-county tracts',
      ],
      housingTypes:
        'Established SFH, mid-century tracts, some newer subdivisions, multi-family pockets',
      challenges: [
        'Longer empty miles from Pearland or Lake Jackson staging',
        'SH-288 / SH-35 approach timing',
        'Lower HOA density than Pearland growth — different paperwork profile',
        'Heat on open lots with limited shade',
      ],
      moverTips:
        'Do not price Angleton exactly like Pearland HOA villages — access and inventory differ. Build corridor timing into north↔south pairs. Early starts still win in summer heat.',
      cityKeywords: [
        'angleton',
        'angleton tx',
        'sh 35',
        'brazoria county seat',
        'mid brazoria',
      ],
    },
    {
      id: 'lake-jackson-clute',
      name: 'Lake Jackson, Clute & Brazosport',
      shortName: 'Lake Jackson / Clute',
      neighborhoods: [
        'Lake Jackson',
        'Clute',
        'Richwood edges',
        'Brazosport suburban stock',
        'SH-288 / SH-332 corridors',
      ],
      housingTypes:
        'Suburban SFH, established tracts, some multi-family, plant-community residential history',
      challenges: [
        'Distance from Houston core staging',
        'Shift-change and industrial corridor traffic nearby',
        'Cross-zone pairs into Pearland or Freeport',
        'Heat and humidity on open staging',
      ],
      moverTips:
        'Treat Brazosport jobs as south-county product with honest portal time from north Brazoria or Harris. Confirm driveway access and inventory carefully. Prefer mid-week starts over peak SH-288 weekends.',
      cityKeywords: [
        'lake jackson',
        'clute',
        'richwood',
        'brazosport',
        'lake jackson tx',
        'clute tx',
      ],
    },
    {
      id: 'freeport-industrial-edges',
      name: 'Freeport Industrial Edges',
      shortName: 'Freeport edges',
      neighborhoods: [
        'Freeport',
        'Industrial-edge residential',
        'Port / plant corridor approaches',
        'South Brazoria coastal-adjacent stock',
      ],
      housingTypes:
        'Working SFH, multi-family, industrial-adjacent residential, limited coastal-edge product',
      challenges: [
        'Industrial and port freight traffic',
        'Longer empty miles and lower same-day crew density',
        'Shift-change peaks and constrained staging near plants',
        'Storm and humidity risk on open coastal-adjacent lots',
      ],
      moverTips:
        'Treat Freeport-edge pairs as industrial-adjacent long-locals — not pure Pearland driveway rates. Confirm access, parking, and approach constraints. Build buffer for freight traffic and weather.',
      cityKeywords: [
        'freeport',
        'freeport tx',
        'brazosport freeport',
        'south brazoria',
        'port freeport',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Brazoria County',
    intro:
      'Same square footage prices differently by Pearland HOA soft costs, SH-288 portal time, and whether the job is north growth or Freeport/Brazosport long-local.',
    drivers: [
      {
        title: 'HOA soft costs in Pearland / Manvel growth',
        detail:
          'COI, approved hours, and gate coordination in newer villages add paperwork and can force weekday-only windows.',
      },
      {
        title: 'SH-288 & south-corridor portal time',
        detail:
          'Pearland ↔ Lake Jackson or Manvel ↔ Houston pairs burn more portal-to-portal time than map miles suggest at peak — freer than Harris core, still billable.',
      },
      {
        title: 'Industrial-edge & long-local access',
        detail:
          'Freeport freight patterns, mid-county empty miles, and plant-adjacent staging add labor and vehicle risk versus pure suburban driveway jobs.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$500–$1,350+',
        note: 'Higher with multi-unit long carries or peak heat windows',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,500–$3,700+',
        note: 'Pearland HOA soft costs and SH-288 hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / Freeport or Brazosport)',
        value: '$2,300–$5,800+',
        note: 'Long-local and industrial-edge jobs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal & heat calendar intelligence',
    intro:
      'Brazoria peaks follow extreme heat, school calendars on the Pearland growth edge, and south Houston spillover — not downtown lease density alone.',
    items: [
      {
        title: 'Summer heat peak: roughly June – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon moves in peak heat are high risk for people and property.',
      },
      {
        title: 'School & family calendars (Pearland / Manvel)',
        detail:
          'Late spring through early fall weekends fill first for family SFH moves. Book 2–4 weeks ahead for popular Saturdays in north growth villages.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Still plan around HOA weekday windows when applicable. Early starts win even in shoulder seasons when heat and SH-288 peaks are the real constraints.',
      },
    ],
  },
  specialized: [
    {
      id: 'suburban-growth',
      title: 'Suburban growth logistics (Pearland / Manvel)',
      intro:
        'Brazoria’s north signature is rapid HOA growth on the Harris seam — family-volume SFH and gate lists that Freeport-edge jobs do not share.',
      bullets: [
        'Send HOA management packets, COI requirements, and gate lists with the estimate.',
        'Confirm approved move hours before booking Saturday crews.',
        'Inventory family-volume SFH carefully — suburban loads often exceed older mid-county stock.',
        'Clarify Harris vs Brazoria county lines near Pearland edges.',
      ],
    },
    {
      id: 'industrial-petro-adjacency',
      title: 'Industrial & petro adjacency (Freeport / plant corridors)',
      intro:
        'South-county industrial edges are not interchangeable with Pearland cul-de-sacs — freight traffic and empty miles define the job.',
      bullets: [
        'Price portal-to-portal time honestly for Freeport-edge and Brazosport pairs.',
        'Note freight traffic, shift-change peaks, and constrained staging near plants.',
        'Share approach photos and parking limits on industrial-adjacent streets.',
        'Ask whether south-county pairs still use a pure local rate card or a long-local schedule.',
      ],
    },
    {
      id: 'sh288-freeflow',
      title: 'SH-288 freeflow & south-corridor timing',
      intro:
        'SH-288, SH-35, SH-6, and FM-518 turn “local” Brazoria pairs into corridor-timed jobs.',
      bullets: [
        'Price portal-to-portal time honestly for Pearland ↔ Lake Jackson and Manvel ↔ Houston pairs.',
        'Build buffer for school and commute peaks on SH-288 north toward Harris.',
        'Note construction and growth traffic on FM-518 and Manvel corridors.',
        'Prefer mid-week early starts when Medical Center or plant-shift peaks collide with the move window.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'South collar value, Pearland growth, and Brazosport living are different bets — validate schools and healthcare by pocket, then plan for heat and SH-288 times.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Major systems include Pearland ISD, Alvin ISD (Manvel and nearby growth), Angleton ISD, Brazosport ISD, and other local districts. Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'Pearland ISD & Alvin ISD growth',
            detail:
              'North Brazoria addresses often fall in Pearland ISD or Alvin ISD depending on exact parcel. Marketing subdivision names can span feeders — verify with official boundary tools.',
          },
          {
            title: 'Angleton ISD & Brazosport ISD',
            detail:
              'Mid-county and Lake Jackson / Clute / Freeport-area communities use separate systems. Do not treat county averages as neighborhood truth.',
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
              'Campuses serving Pearland / south Houston spillover, UTMB Health Angleton Danbury, and Brazosport Regional / south-county facilities form the local map. Map ER drive times at rush hour from your target neighborhood.',
          },
          {
            title: 'Harris specialty spillover',
            detail:
              'Texas Medical Center and south Houston specialty care remain common for complex needs. Confirm insurer networks and realistic SH-288 times.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if mid-treatment; book first appointments before peak summer move chaos.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Brazoria resources',
    intro:
      'Local official links first; directory listings are independent. Verify Texas TxDMV for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'City of Pearland',
        href: 'https://www.pearlandtx.gov/',
        note: 'City services; HOA rules are separate',
        external: true,
      },
      {
        label: 'City of Lake Jackson',
        href: 'https://www.lakejackson-tx.gov/',
        external: true,
      },
      {
        label: 'Brazoria County — official site',
        href: 'https://www.brazoriacountytx.gov/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Pearland/Manvel, Angleton, Lake Jackson/Clute, Freeport edges) when available. Confirm HOA packets on north growth, SH-288 drive assumptions, and industrial-edge access notes — this is a Houston south collar, not Harris core.',
  lastReviewed: '2026-07-24',
});
