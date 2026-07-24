import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTxTier2Pack,
  TX_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/texas/tx-tier2-shared';

/**
 * Kaufman County — Texas Tier 2 (Dallas east collar).
 * Secondary-market contract vs Dallas County Tier 1 parent — Forney / Terrell /
 * Kaufman growth and east-corridor freeflow, not Dallas urban elevators or Collin north scripts.
 */
export const kaufmanCountyIntelligence: CountyIntelligencePack = finalizeTxTier2Pack({
  countySlug: 'kaufman',
  hubTitle: 'Kaufman County Moving Intelligence Hub',
  eyebrow: 'Kaufman · Dallas east — Forney / Terrell / Kaufman',
  h1: 'Moving in Kaufman County: Dallas East Collar — Forney Growth, Terrell & Kaufman',
  heroOpener:
    'Kaufman County is Dallas’s east collar — Forney master-planned and family growth, Terrell mid-county stock, the Kaufman seat, and rural edges along I-20 and US-175 — not Dallas County downtown elevators with a different nameplate. East-corridor freeflow, newer suburban tracts, and longer empty miles into the metro replace Uptown high-rise logistics. Compared with Dallas, you get freer I-20 / US-175 / US-80 rhythm than I-35E core gridlock, more driveway and cul-de-sac product than vertical multi-family, and almost no tower elevators. This guide is for people moving in Kaufman as an east collar market with its own role — not a recycled Dallas-core or Collin-north script.',
  heroCredibility:
    'Dallas east collar · Forney / Terrell / Kaufman · TxDMV household goods (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-20 · US-175 · US-80 · SH-34 · local Forney–Terrell grid',
  parentCompare: {
    parentLabel: 'Dallas County',
    parentHref: '/local-movers/texas/dallas',
    title: 'Compared with Dallas County',
    intro:
      'Kaufman is the Dallas east growth collar — Forney, Terrell, Kaufman seat, and rural edges — not a drop-in template for downtown elevators, Uptown mid-rises, or dense inner-ring SFH logistics. Use Dallas County as the dense metro parent contrast.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Dallas crews fight I-35E, I-30, I-635, and multi-hour urban pairs into downtown and medical cores. Kaufman pairs ride I-20, US-175, US-80, SH-34, and the local Forney–Terrell grid — freer mid-day than Dallas core, still peak-heavy on Forney ↔ Mesquite/Dallas and Terrell ↔ Kaufman hauls. Portal-to-portal time is real; it is not a short downtown dock job.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Dallas mixes vertical multi-family, older urban grids, and inner-ring SFH. Kaufman’s ladder is Forney growth SFH and HOA villages, Terrell mid-century and suburban tracts, Kaufman seat historic-plus-growth product, and rural acreage edges — far less elevator density, more new-construction family volume and open-lot staging.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Dallas core needs COI elevators and curb permits; many Dallas suburbs still allow freer driveway work. Kaufman defaults to driveway, cul-de-sac, and growing HOA packets in Forney villages — freer than Uptown, still paperwork-first in newer planned tracts. Rural edges add soft driveways and long approaches.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Kaufman quotes often sit near or slightly below dense Dallas urban rates for comparable square footage when access is a simple driveway — east-corridor empty miles, heat windows, and Forney growth HOA soft costs still push prices up. Expect secondary-collar labor rates with long-local east hauls as the main premium, not downtown dock scarcity.',
      },
      {
        title: 'Role difference',
        detail:
          'Kaufman is Dallas’s east bedroom and growth engine — Forney schools and tracts, Terrell mid-county, and rural edges — not Dallas’s job-center core and not Collin’s north corporate HOA belt. Treat it as its own collar market when matching crews and rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Kaufman County different',
    intro:
      'East collar realities — Forney growth vs Terrell mid-county, I-20/US-175 freeflow with peaks, heat on open suburban staging, and freer corridors than Dallas core — that change estimates.',
    bullets: [
      {
        title: 'Forney growth is not Terrell or Kaufman seat',
        detail:
          'A Forney HOA two-story, a Terrell mid-century tract, a Kaufman seat bungalow, and a rural acreage home do not share gate rules, truck access, or inventory profiles. Name both origin and destination communities on every estimate.',
      },
      {
        title: 'I-20 / US-175 freeflow is not Dallas gridlock — still a line item',
        detail:
          'Forney ↔ Dallas east or Terrell ↔ Kaufman pairs freer than I-35E still burn billable time at school and commute peaks. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'East empty miles reshape “local” pricing',
        detail:
          'Cross-county pairs into Mesquite, Balch Springs, or Dallas County burn more clock than map miles suggest. Share both city names and corridor assumptions — “Kaufman local” hides long-local reality.',
      },
      {
        title: 'North Texas heat on open suburban and rural staging',
        detail:
          'June–September afternoons on asphalt cul-de-sacs and open lots stress crews and sealed goods. Prefer early starts; treat mid-afternoon load-outs as high risk even when the map looks short.',
      },
      TX_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Kaufman zones: Forney growth, Terrell, Kaufman seat & rural edges',
  zonesIntro:
    'Three to four sharp products — not a six-zone dump. Forney planned growth, Terrell mid-county, Kaufman seat, and rural edges price and stage differently under the same east collar.',
  zones: [
    {
      id: 'forney-growth',
      name: 'Forney Growth',
      shortName: 'Forney',
      neighborhoods: [
        'Forney',
        'Master-planned east villages',
        'US-80 / FM growth corridors',
        'Newer HOA tracts',
        'Forney ISD family corridors',
      ],
      housingTypes:
        'New-construction SFH, master-planned HOA villages, townhomes, multi-family growth pockets',
      challenges: [
        'HOA COI, approved hours, and gate lists in newer villages',
        'Cul-de-sac and truck-length constraints',
        'US-80 / I-20 peak congestion toward Dallas',
        'High family-move volume on summer weekends',
      ],
      moverTips:
        'Send HOA management packets with the estimate. Mid-week early starts beat heat and school traffic. Inventory family-volume SFH carefully — suburban loads often exceed older Dallas bungalows. Clarify Forney ↔ Dallas east drive assumptions.',
      cityKeywords: [
        'forney',
        'forney tx',
        'forney isd',
        'east forney',
        'us 80 forney',
      ],
    },
    {
      id: 'terrell',
      name: 'Terrell',
      shortName: 'Terrell',
      neighborhoods: [
        'Terrell',
        'I-20 / US-80 corridors',
        'Mid-county suburban tracts',
        'Historic downtown edges',
        'Terrell industrial-edge residential',
      ],
      housingTypes:
        'Mid-century SFH, suburban tracts, some newer subdivisions, mixed multi-family',
      challenges: [
        'I-20 approach timing toward Dallas and Forney',
        'Older street grids near historic cores',
        'Varied access vs pure master-planned product',
        'Heat on open lots with limited shade',
      ],
      moverTips:
        'Do not price Terrell bungalows like Forney HOA villages — access and inventory differ. Confirm street width and parking. Early starts still win in summer heat. Build I-20 portal time into east↔west pairs.',
      cityKeywords: [
        'terrell',
        'terrell tx',
        'i-20 terrell',
        'us 80 terrell',
        'kaufman terrell',
      ],
    },
    {
      id: 'kaufman-seat',
      name: 'Kaufman Seat',
      shortName: 'Kaufman',
      neighborhoods: [
        'Kaufman',
        'County seat historic edges',
        'SH-34 corridors',
        'Local residential grids',
        'South/mid-county growth pockets',
      ],
      housingTypes:
        'Historic-grid SFH, mid-century tracts, modest growth product, some multi-family',
      challenges: [
        'Tighter parking near historic cores',
        'SH-34 / local-grid timing to Forney and Terrell',
        'Varied driveway and alley access',
        'Longer empty miles from Dallas staging',
      ],
      moverTips:
        'Treat Kaufman seat as a distinct product from Forney growth. Confirm street width, parking, and any HOA rules in newer edges. Share photos for older porches and stairs. Mid-week mornings beat heat and school peaks.',
      cityKeywords: [
        'kaufman',
        'kaufman tx',
        'kaufman county seat',
        'sh 34 kaufman',
      ],
    },
    {
      id: 'rural-kaufman-edges',
      name: 'Rural Kaufman Edges',
      shortName: 'Rural edges',
      neighborhoods: [
        'Crandall-edge pockets',
        'Kemp / south edges',
        'Acreage and ranch-edge residential',
        'US-175 corridor edges',
        'Open-lot rural tracts',
      ],
      housingTypes:
        'Acreage homes, manufactured and site-built mix, farm-edge SFH, limited multi-family',
      challenges: [
        'Soft driveways, gates, and long private approaches',
        'Outbuildings and mixed inventory volume',
        'Long empty miles from Forney or Dallas staging',
        'Incomplete roads and truck-turn constraints',
      ],
      moverTips:
        'Treat rural edges as long-local jobs. Ask whether pure local rate cards still apply. Confirm driveway surface, gate width, and outbuilding inventory. Prefer mid-week starts over peak Saturday I-20 traffic.',
      cityKeywords: [
        'crandall',
        'kemp',
        'rural kaufman',
        'us 175',
        'kaufman acreage',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Kaufman County',
    intro:
      'Same square footage prices differently by HOA soft costs, east-corridor time, and whether the job is Forney planned stock or rural long-local edges.',
    drivers: [
      {
        title: 'HOA soft costs in Forney growth',
        detail:
          'COI, approved hours, and gate coordination in newer Forney villages add paperwork and can force weekday-only windows.',
      },
      {
        title: 'East corridor portal time (I-20 / US-175 / US-80)',
        detail:
          'Forney ↔ Dallas east or Terrell ↔ Kaufman pairs burn more portal-to-portal time than map miles suggest at peak — freer than Dallas core, still billable.',
      },
      {
        title: 'Heat-constrained work windows',
        detail:
          'Summer heat compresses productive hours into mornings. Jobs that slip into peak afternoon heat may need more labor or premium scheduling.',
      },
      {
        title: 'Rural-edge empty miles',
        detail:
          'Longer approaches, outbuildings, and soft driveways add labor and vehicle risk — price them explicitly versus pure suburban driveway jobs.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$450–$1,300+',
        note: 'Higher with multi-unit long carries or peak heat windows',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,400–$3,600+',
        note: 'HOA soft costs and east corridor hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / rural edge)',
        value: '$2,200–$5,600+',
        note: 'Rural long-local and multi-HOA jobs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal & heat calendar intelligence',
    intro:
      'Kaufman peaks follow extreme heat, school calendars, and Dallas east spillover — not downtown lease density alone.',
    items: [
      {
        title: 'Summer heat peak: roughly June – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon moves in peak heat are high risk for people and property.',
      },
      {
        title: 'School & family calendars (Forney / Terrell)',
        detail:
          'Late spring through early fall weekends fill first for family SFH moves. Book 2–4 weeks ahead for popular Saturdays in growth villages.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Still plan around HOA weekday windows when applicable. Early starts win even in shoulder seasons when heat and arterials are the real constraints.',
      },
    ],
  },
  specialized: [
    {
      id: 'forney-hoa-growth',
      title: 'Forney HOA & growth logistics',
      intro:
        'Kaufman’s defining growth product is Forney planned-community access — gate lists, COI, and family-volume SFH that Dallas core elevator jobs do not share.',
      bullets: [
        'Send HOA management packets, COI requirements, and gate lists with the estimate.',
        'Confirm approved move hours and floor-protection rules before booking Saturday crews.',
        'Inventory family-volume SFH carefully — suburban loads often exceed older urban condos.',
        'Share driveway, cul-de-sac, and truck-length constraints for newer villages with tight turns.',
      ],
    },
    {
      id: 'east-corridor-last-mile',
      title: 'East corridor last-mile (I-20 / US-175 / US-80)',
      intro:
        'I-20, US-175, US-80, and SH-34 turn “local” Kaufman pairs into corridor-timed jobs.',
      bullets: [
        'Price portal-to-portal time honestly for Forney ↔ Dallas east and Terrell ↔ Kaufman pairs.',
        'Build buffer for school and commute peaks on US-80 and I-20.',
        'Note construction detours and incomplete roads on growth corridors.',
        'Ask whether cross-zone pairs still use a pure local rate card or a long-local schedule.',
      ],
    },
    {
      id: 'heat-suburban-rural',
      title: 'Heat & suburban/rural staging',
      intro:
        'Open cul-de-sacs, rural lots, and summer heat define Kaufman crew days more than downtown docks.',
      bullets: [
        'Prefer 6–10 a.m. starts in peak summer; treat mid-afternoon loads as high risk.',
        'Request shaded staging where possible and heat-safe packing for electronics and sealed goods.',
        'Plan water, rotation, and realistic crew endurance on long driveway and acreage carries.',
        'If the job runs long, discuss split-day options rather than pushing into peak heat.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'East collar value, Forney growth, and rural edges are different bets — validate schools and healthcare by pocket, then plan for heat and corridor calendars.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Major systems include Forney ISD, Terrell ISD, Kaufman ISD, and others. Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'Multiple districts under one county',
            detail:
              'Forney, Terrell, Kaufman seat, and rural addresses often fall in different systems. Marketing names and new tracts can span feeders — verify with official boundary tools and TEA data.',
          },
          {
            title: 'Growth vs seat vs rural pockets',
            detail:
              'Forney growth households may face different calendars and commute patterns than Kaufman seat or rural edges. Do not treat county averages as neighborhood truth.',
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
            title: 'County & east-metro acute-care anchors',
            detail:
              'Texas Health Kaufman and other east-metro campuses serve greater Kaufman; many households still use Dallas County specialty and trauma systems. Map ER drive times at rush hour from Forney, Terrell, and rural edges.',
          },
          {
            title: 'Dallas specialty spillover',
            detail:
              'Dallas medical cores remain common for complex needs. Confirm insurer networks and realistic I-20 / US-80 times.',
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
    title: 'Useful Kaufman resources',
    intro:
      'Local official links first; directory listings are independent. Verify Texas TxDMV for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Kaufman County — official site',
        href: 'https://www.kaufmancounty.net/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Forney',
        href: 'https://www.forneytx.gov/',
        external: true,
      },
      {
        label: 'City of Terrell',
        href: 'https://www.cityofterrell.org/',
        external: true,
      },
      {
        label: 'City of Kaufman',
        href: 'https://www.kaufmantx.org/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Forney, Terrell, Kaufman seat, Rural edges) when available. Confirm HOA packets in Forney growth, east-corridor drive assumptions, and heat-window plans — this is a Dallas east collar, not Dallas core.',
  lastReviewed: '2026-07-24',
});
