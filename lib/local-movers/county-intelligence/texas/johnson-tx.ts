import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTxTier2Pack,
  TX_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/texas/tx-tier2-shared';

/**
 * Johnson County — Texas Tier 2 (FW south — Cleburne / Burleson edge).
 * Secondary-market contract vs Tarrant Tier 1 parent — Burleson-edge growth and
 * Cleburne county-seat product, not Fort Worth core elevators or renamed Tarrant scripts.
 */
export const johnsonCountyIntelligence: CountyIntelligencePack = finalizeTxTier2Pack({
  countySlug: 'johnson',
  hubTitle: 'Johnson County Moving Intelligence Hub',
  eyebrow: 'Johnson · FW south collar · Cleburne / Burleson edge',
  h1: 'Moving in Johnson County: Fort Worth South Collar — Cleburne, Burleson Edge & I-35W',
  heroOpener:
    'Johnson County is Fort Worth’s southern collar — Cleburne’s county-seat grid, Burleson-edge and Joshua family growth on the Tarrant line, and I-35W / US-67 freeflow — not downtown Fort Worth elevators with a different nameplate. Burleson-edge product runs on metro-spillover HOA logistics and FW commute timing; Cleburne still carries historic-grid and US-67 character; Alvarado and Godley rewrite empty-mile assumptions. A Burleson-edge HOA two-story, a Joshua tract, a Cleburne bungalow, and a Keene small-town home do not share truck access. Compared with Tarrant, you get freer mid-day freeflow than FW inner loops, denser long-local empty miles than many mid-cities jobs, and almost no vertical tower product. This guide is for people moving in Johnson as a south-collar market with its own role — not a recycled Fort Worth core script.',
  heroCredibility:
    'FW south collar · Cleburne / Burleson edge · TxDMV household goods (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-35W · US-67 · SH-174 · SH-171 · local Cleburne–Burleson grid',
  parentCompare: {
    parentLabel: 'Tarrant County',
    parentHref: '/local-movers/texas/tarrant',
    title: 'Compared with Tarrant County',
    intro:
      'Johnson is the Fort Worth south growth collar — Cleburne, Burleson-edge / Joshua, Alvarado, and Godley edges — not a drop-in template for downtown Fort Worth elevators, Cultural District docks, or dense mid-cities multi-family. Use Tarrant as the dense metro parent contrast.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Tarrant crews fight I-30, I-35W through town, Loop 820, and multi-hour cross-county pairs into downtown Fort Worth and mid-cities job centers. Johnson pairs ride I-35W, US-67, SH-174, SH-171, and the local Cleburne–Burleson grid — freer mid-day than FW inner loops, still peak-heavy on Burleson-edge ↔ south Tarrant and Cleburne ↔ Fort Worth hauls. Portal-to-portal time is real; it is not a 45-minute downtown dock job.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Tarrant mixes towers, historic urban grids, mid-cities multi-family, and sprawling suburban HOAs under one county label. Johnson’s ladder is Burleson-edge and Joshua family SFH growth, Cleburne historic and mid-century stock, Alvarado I-35W corridor product, and Keene / Godley small-town and western edges — far less elevator density, far more driveway and long-local empty-mile work.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Tarrant core needs COI elevators and curb permits; many Tarrant suburbs still allow freer driveway work. Johnson’s Burleson-edge and Joshua belt defaults to HOA packets and cul-de-sac staging, while Cleburne stages more historic-grid and driveway work. Expect access photos and I-35W timing first, then the truck.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Johnson quotes often sit near or slightly below dense Tarrant urban rates for comparable square footage when access is a simple driveway — HOA soft costs, I-35W / US-67 portal time, heat windows, and Cleburne long locals still push prices up. Expect secondary-collar labor rates with empty-mile and planned-community friction as the main premium, not downtown dock scarcity.',
      },
      {
        title: 'Role difference',
        detail:
          'Johnson is Fort Worth’s south bedroom and growth collar — schools, I-35W commutes, and Cleburne/Burleson-edge inventory — not Tarrant’s job-center core and not Parker’s west Weatherford product. Treat it as its own south-collar market when matching crews and rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Johnson County different',
    intro:
      'South-collar realities — Burleson-edge HOA density, Cleburne county-seat grids, I-35W freeflow that still bills, and freer mid-day than Tarrant core — that change estimates.',
    bullets: [
      {
        title: 'Burleson edge, Cleburne, and Alvarado are different products',
        detail:
          'A metro-edge HOA two-story, a Cleburne bungalow, and an Alvarado corridor tract do not share truck access. Put both communities on the estimate — “Johnson County local” fails across I-35W vs county-seat last-mile.',
      },
      {
        title: 'I-35W / US-67 / SH-174 timing is a line item',
        detail:
          'Burleson-edge ↔ south Fort Worth or Cleburne ↔ Tarrant pairs freer than FW inner loops still burn billable time at school and commute peaks. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'Metro-edge growth vs county-seat access',
        detail:
          'Joshua / Burleson-edge cul-de-sacs and Cleburne historic grids rewrite truck size and staging assumptions. Access photos prevent underquotes that pure mid-cities scripts miss.',
      },
      {
        title: 'North Texas heat on open suburban staging',
        detail:
          'June–September afternoons on asphalt cul-de-sacs and exposed southern lots stress crews and sealed goods. Prefer early starts; treat mid-afternoon load-outs as high risk even when the map looks short.',
      },
      TX_TIER2_REG_BULLET,
    ],
  },
  zonesHeading:
    'Johnson zones: Burleson edge / Joshua, Cleburne core, Alvarado / I-35W & western edges',
  zonesIntro:
    'Three to four sharp products — not a six-zone dump. Burleson-edge/Joshua metro growth, Cleburne county seat, Alvarado I-35W corridor, and Keene/Godley western edges price and stage differently under the same south collar.',
  zones: [
    {
      id: 'burleson-joshua-edge',
      name: 'Burleson Edge & Joshua Growth',
      shortName: 'Burleson edge / Joshua',
      neighborhoods: [
        'Burleson-edge Johnson tracts',
        'Joshua',
        'Master-planned HOA villages',
        'SH-174 corridors',
        'Tarrant border residential pockets',
      ],
      housingTypes:
        'Family HOA SFH, newer two-story product, townhomes, multi-family pockets, metro-edge growth stock',
      challenges: [
        'HOA COI, approved hours, and gate lists on many villages',
        'I-35W / SH-174 peak congestion toward Fort Worth',
        'High school-calendar Saturday demand',
        'Cul-de-sac and truck-length constraints in newer phases',
      ],
      moverTips:
        'Collect HOA packets early. Price Joshua/Burleson-edge ↔ south Tarrant with honest I-35W portal time. Inventory family-volume SFH carefully. Prefer mid-week early starts over peak Saturday school traffic.',
      cityKeywords: [
        'joshua',
        'burleson',
        'joshua tx',
        'burleson tx',
        'sh 174',
      ],
    },
    {
      id: 'cleburne-core',
      name: 'Cleburne County Seat',
      shortName: 'Cleburne',
      neighborhoods: [
        'Downtown / historic Cleburne',
        'Local Cleburne grid',
        'US-67 corridors',
        'Mid-century tracts',
        'South and west Cleburne growth',
      ],
      housingTypes:
        'Historic-grid SFH, mid-century tracts, some newer subdivisions, mixed multi-family',
      challenges: [
        'Older street grids and tighter parking near historic cores',
        'US-67 / SH-171 approach timing',
        'Varied access vs pure Burleson-edge HOA product',
        'Heat on open lots with limited shade',
      ],
      moverTips:
        'Do not price Cleburne bungalows like Joshua HOA villages — access and inventory differ. Confirm street width and parking. Early starts still win in summer heat. Cleburne ↔ Joshua is a classic underquoted local.',
      cityKeywords: [
        'cleburne',
        'cleburne tx',
        'us 67 cleburne',
        'johnson cleburne',
      ],
    },
    {
      id: 'alvarado-i35w',
      name: 'Alvarado & I-35W Corridor',
      shortName: 'Alvarado / I-35W',
      neighborhoods: [
        'Alvarado',
        'I-35W corridor multi-family',
        'Corridor new-construction phases',
        'Grandview edges',
        'North Johnson I-35W approaches',
      ],
      housingTypes:
        'New-construction SFH, multi-family, corridor growth product, some established small-town stock',
      challenges: [
        'I-35W peak congestion toward Fort Worth and Dallas-direction pairs',
        'HOA and builder access rules in newest phases',
        'Long empty miles from Cleburne staging on some pairs',
        'Incomplete roads and truck-turn constraints',
      ],
      moverTips:
        'Treat I-35W corridor jobs as long locals. Ask whether pure local rate cards still apply. Confirm builder access the week of the move. Prefer mid-week starts over peak Friday evening I-35W traffic.',
      cityKeywords: [
        'alvarado',
        'alvarado tx',
        'i-35w johnson',
        'grandview tx',
      ],
    },
    {
      id: 'keene-godley-west',
      name: 'Keene, Godley & Western Edges',
      shortName: 'Keene / Godley west',
      neighborhoods: [
        'Keene',
        'Godley',
        'Western Johnson small-town pockets',
        'Larger-lot and rural edges',
        'SH-171 western approaches',
      ],
      housingTypes:
        'Small-town SFH, larger-lot edges, some newer subdivisions, limited multi-unit',
      challenges: [
        'Long empty miles from Burleson-edge or Cleburne staging',
        'Narrow approaches and limited turnaround on some lots',
        'Not interchangeable with metro-edge HOA cul-de-sacs',
        'Weather-sensitive outdoor packing on open lots',
      ],
      moverTips:
        'Send driveway and turnaround photos before booking. Never assume Joshua HOA truck assumptions transfer. Price western pairs as long locals with honest empty-mile time.',
      cityKeywords: [
        'keene',
        'godley',
        'keene tx',
        'godley tx',
        'west johnson',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Johnson County',
    intro:
      'Same square footage prices differently by HOA soft costs, I-35W corridor time, and whether the job is Burleson-edge metro stock or Cleburne / western long-local.',
    drivers: [
      {
        title: 'I-35W / US-67 / SH-174 corridor time',
        detail:
          'Joshua ↔ south Fort Worth, Cleburne ↔ Tarrant, or any peak corridor leg can burn far more clock than map miles suggest. Hourly billing follows the clock.',
      },
      {
        title: 'HOA soft costs on the Burleson-edge / Joshua belt',
        detail:
          'COI processing, approved hours, and gate lists add soft costs and can force weekday-only windows before labor starts.',
      },
      {
        title: 'Western & Alvarado empty-mile access',
        detail:
          'Long approaches, limited turnaround, and corridor last-mile add labor and vehicle risk versus pure metro-edge HOA jobs.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$500–$1,350+',
        note: 'Higher with multi-unit carries or peak heat windows',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,500–$3,700+',
        note: 'HOA soft costs and I-35W corridor hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / western / long-local)',
        value: '$2,300–$5,700+',
        note: 'Western edges and cross-county Tarrant pairs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal & heat calendar intelligence',
    intro:
      'Johnson peaks follow extreme heat, school calendars, and Fort Worth south spillover — not downtown lease density alone.',
    items: [
      {
        title: 'Summer heat peak: roughly June – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon moves in peak heat are high risk for people and property.',
      },
      {
        title: 'School & family calendars (Joshua / Burleson edge / Cleburne)',
        detail:
          'Late spring through early fall weekends fill first for family SFH moves. Book 2–4 weeks ahead for popular Saturdays in metro-edge villages.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Still plan around HOA weekday windows when applicable. Early starts win even in shoulder seasons when heat and I-35W peaks are the real constraints.',
      },
    ],
  },
  specialized: [
    {
      id: 'burleson-joshua-hoa',
      title: 'Burleson-edge & Joshua HOA logistics',
      intro:
        'Johnson’s defining metro product is Burleson-edge / Joshua family HOA access — gate lists, COI, and school-calendar volume that Tarrant core elevator jobs do not share.',
      bullets: [
        'Send HOA management packets, COI requirements, and gate lists with the estimate.',
        'Confirm approved move hours before booking Saturday crews.',
        'Inventory family-volume SFH carefully — suburban loads often exceed older urban condos.',
        'Share driveway, cul-de-sac, and truck-length constraints for newer villages.',
      ],
    },
    {
      id: 'i35w-south-freeflow',
      title: 'I-35W south freeflow into Tarrant',
      intro:
        'I-35W, US-67, SH-174, and SH-171 turn “local” Johnson pairs into corridor-timed jobs.',
      bullets: [
        'Price portal-to-portal time honestly for Joshua/Burleson-edge/Cleburne ↔ south Tarrant pairs.',
        'Build buffer for school and commute peaks on I-35W and SH-174.',
        'Ask whether cross-county pairs still use a pure local rate card or a long-local schedule.',
        'Note construction detours on Alvarado and corridor growth sections.',
      ],
    },
    {
      id: 'cleburne-western-access',
      title: 'Cleburne county-seat & western access',
      intro:
        'Cleburne historic grids and Keene/Godley edges are not Joshua cul-de-sacs renamed.',
      bullets: [
        'Confirm street width and parking near historic Cleburne cores.',
        'Verify approaches and turnaround on western small-town and larger-lot homes.',
        'Price Cleburne ↔ Joshua as a real cross-zone local with honest clock time.',
        'Prefer early starts for heat on open southern staging.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'FW south-collar value, Burleson-edge growth, and Cleburne county-seat product are different bets — validate schools and healthcare by pocket, then plan for heat and HOA calendars.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Major systems include Cleburne ISD, Joshua ISD, Burleson ISD spillover, Alvarado ISD, Godley ISD, Keene ISD, and other local districts. Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'Joshua / Burleson-edge vs Cleburne ISD',
            detail:
              'Joshua and many Burleson-edge addresses often fall in Joshua ISD or Burleson-area systems; Cleburne and many southern/central pockets use Cleburne ISD. Marketing names and new tracts can span feeders — verify with official boundary tools.',
          },
          {
            title: 'Alvarado, Godley & Keene systems',
            detail:
              'I-35W and western edges use Alvarado ISD, Godley ISD, Keene ISD, and smaller systems. Do not treat county averages as neighborhood truth.',
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
              'Texas Health Harris Methodist Hospital Cleburne and other regional campuses serve greater Johnson. Map ER drive times at rush hour from your target pocket — especially Joshua and Alvarado edges.',
          },
          {
            title: 'Tarrant specialty spillover',
            detail:
              'Fort Worth medical campuses remain common for complex needs from the south collar. Confirm insurer networks and realistic I-35W appointment drive times.',
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
    title: 'Useful Johnson resources',
    intro:
      'Local official links first; directory listings are independent. Verify Texas TxDMV for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'City of Cleburne',
        href: 'https://www.cleburne.net/',
        note: 'County seat services; HOA rules are separate',
        external: true,
      },
      {
        label: 'City of Joshua',
        href: 'https://www.cityofjoshuatx.us/',
        external: true,
      },
      {
        label: 'Johnson County — official site',
        href: 'https://www.johnsoncountytx.org/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Burleson edge/Joshua, Cleburne, Alvarado/I-35W, Keene/Godley west) when available. Confirm HOA packets on the metro edge, Cleburne grid access, and honest I-35W drive assumptions — this is a FW south collar, not Tarrant core.',
  lastReviewed: '2026-07-24',
});
