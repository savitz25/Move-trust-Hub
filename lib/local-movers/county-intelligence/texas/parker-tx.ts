import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTxTier2Pack,
  TX_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/texas/tx-tier2-shared';

/**
 * Parker County — Texas Tier 2 (FW west — Weatherford / Aledo).
 * Secondary-market contract vs Tarrant Tier 1 parent — Weatherford county-seat and
 * Aledo metro-edge growth, not Fort Worth core elevators or renamed Tarrant scripts.
 */
export const parkerCountyIntelligence: CountyIntelligencePack = finalizeTxTier2Pack({
  countySlug: 'parker',
  hubTitle: 'Parker County Moving Intelligence Hub',
  eyebrow: 'Parker · FW west collar · Weatherford / Aledo',
  h1: 'Moving in Parker County: Fort Worth West Collar — Weatherford, Aledo & I-20 Growth',
  heroOpener:
    'Parker County is Fort Worth’s western collar — Weatherford’s county-seat grid, Aledo and Willow Park / Hudson Oaks metro-edge growth, and I-20 freeflow into Tarrant job centers — not downtown Fort Worth elevators with a different nameplate. Aledo runs on family SFH and school-driven demand; Weatherford still carries historic-grid and US-180 character; Springtown and western ranch edges rewrite empty-mile assumptions. An Aledo HOA two-story, a Weatherford bungalow, a Hudson Oaks cul-de-sac, and a Springtown acreage tract do not share truck access. Compared with Tarrant, you get freer mid-day freeflow than FW inner loops, denser long-local empty miles than many mid-cities jobs, and almost no vertical tower product. This guide is for people moving in Parker as a west-collar market with its own role — not a recycled Fort Worth core script.',
  heroCredibility:
    'FW west collar · Weatherford / Aledo · TxDMV household goods (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-20 · US-180 · SH-171 · FM-5 · local Weatherford grid',
  parentCompare: {
    parentLabel: 'Tarrant County',
    parentHref: '/local-movers/texas/tarrant',
    title: 'Compared with Tarrant County',
    intro:
      'Parker is the Fort Worth west growth collar — Weatherford, Aledo, Willow Park / Hudson Oaks, and Springtown edges — not a drop-in template for downtown Fort Worth elevators, Cultural District docks, or dense mid-cities multi-family. Use Tarrant as the dense metro parent contrast.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Tarrant crews fight I-30, I-35W, Loop 820, and multi-hour cross-county pairs into downtown Fort Worth and mid-cities job centers. Parker pairs ride I-20, US-180, SH-171, FM-5, and the local Weatherford grid — freer mid-day than FW inner loops, still peak-heavy on Aledo ↔ west Tarrant and Weatherford ↔ Fort Worth hauls. Portal-to-portal time is real; it is not a 45-minute downtown dock job.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Tarrant mixes towers, historic urban grids, mid-cities multi-family, and sprawling suburban HOAs under one county label. Parker’s ladder is Weatherford historic and mid-century stock, Aledo family SFH and school-driven growth, Willow Park / Hudson Oaks HOA product, and Springtown / western acreage edges — far less elevator density, far more long driveway and rural approach work.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Tarrant core needs COI elevators and curb permits; many Tarrant suburbs still allow freer driveway work. Parker’s Aledo and Hudson Oaks belt defaults to HOA packets and cul-de-sac staging, while Weatherford stages more historic-grid and driveway work. Expect access photos and I-20 timing first, then the truck.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Parker quotes often sit near or slightly below dense Tarrant urban rates for comparable square footage when access is a simple driveway — HOA soft costs, I-20 portal time, heat windows, and western long locals still push prices up. Expect secondary-collar labor rates with empty-mile and planned-community friction as the main premium, not downtown dock scarcity.',
      },
      {
        title: 'Role difference',
        detail:
          'Parker is Fort Worth’s west bedroom and growth collar — schools, I-20 commutes, and Weatherford/Aledo inventory — not Tarrant’s job-center core and not Johnson’s south Cleburne product. Treat it as its own west-collar market when matching crews and rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Parker County different',
    intro:
      'West-collar realities — Aledo metro-edge HOA density, Weatherford county-seat grids, I-20 freeflow that still bills, and freer mid-day than Tarrant core — that change estimates.',
    bullets: [
      {
        title: 'Weatherford, Aledo, and Springtown are different products',
        detail:
          'A county-seat bungalow, an Aledo family HOA two-story, and a Springtown acreage tract do not share truck access. Put both communities on the estimate — “Parker County local” fails across I-20 vs western rural last-mile.',
      },
      {
        title: 'I-20 / US-180 / SH-171 timing is a line item',
        detail:
          'Aledo ↔ west Fort Worth or Weatherford ↔ Tarrant pairs freer than FW inner loops still burn billable time at school and commute peaks. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'Metro-edge HOA vs western acreage access',
        detail:
          'Hudson Oaks / Willow Park cul-de-sacs and western ranch approaches rewrite truck size and turnaround assumptions. Access photos prevent underquotes that pure mid-cities scripts miss.',
      },
      {
        title: 'North Texas heat on open suburban staging',
        detail:
          'June–September afternoons on asphalt cul-de-sacs and exposed western lots stress crews and sealed goods. Prefer early starts; treat mid-afternoon load-outs as high risk even when the map looks short.',
      },
      TX_TIER2_REG_BULLET,
    ],
  },
  zonesHeading:
    'Parker zones: Weatherford core, Aledo / Willow Park edge, Springtown north & western growth',
  zonesIntro:
    'Three to four sharp products — not a six-zone dump. Weatherford county seat, Aledo metro edge, Springtown north, and western ranch/growth edges price and stage differently under the same west collar.',
  zones: [
    {
      id: 'weatherford-core',
      name: 'Weatherford County Seat',
      shortName: 'Weatherford',
      neighborhoods: [
        'Downtown / historic Weatherford',
        'Local Weatherford grid',
        'US-180 corridors',
        'Mid-century tracts',
        'South and east Weatherford growth',
      ],
      housingTypes:
        'Historic-grid SFH, mid-century tracts, some newer subdivisions, mixed multi-family',
      challenges: [
        'Older street grids and tighter parking near historic cores',
        'US-180 / I-20 approach timing',
        'Varied access vs pure Aledo HOA product',
        'Heat on open lots with limited shade',
      ],
      moverTips:
        'Do not price Weatherford bungalows like Aledo HOA villages — access and inventory differ. Confirm street width and parking. Early starts still win in summer heat. Weatherford ↔ Aledo is a classic underquoted local.',
      cityKeywords: [
        'weatherford',
        'weatherford tx',
        'us 180 weatherford',
        'parker weatherford',
      ],
    },
    {
      id: 'aledo-willow-park',
      name: 'Aledo, Willow Park & Hudson Oaks',
      shortName: 'Aledo / Willow Park edge',
      neighborhoods: [
        'Aledo',
        'Willow Park',
        'Hudson Oaks',
        'I-20 corridor multi-family edges',
        'Master-planned and family HOA villages',
      ],
      housingTypes:
        'Family HOA SFH, newer two-story product, townhomes, multi-family pockets, metro-edge growth stock',
      challenges: [
        'HOA COI, approved hours, and gate lists on many villages',
        'I-20 peak congestion toward Fort Worth',
        'High school-calendar Saturday demand',
        'Cul-de-sac and truck-length constraints in newer phases',
      ],
      moverTips:
        'Collect HOA packets early. Price Aledo/Willow Park ↔ west Tarrant with honest I-20 portal time. Inventory family-volume SFH carefully. Prefer mid-week early starts over peak Saturday school traffic.',
      cityKeywords: [
        'aledo',
        'willow park',
        'hudson oaks',
        'aledo tx',
        'willow park tx',
      ],
    },
    {
      id: 'springtown-north',
      name: 'Springtown & North Parker',
      shortName: 'Springtown north',
      neighborhoods: [
        'Springtown',
        'SH-171 corridors',
        'North Parker small-town pockets',
        'Larger-lot residential edges',
        'Cross-county north approaches',
      ],
      housingTypes:
        'Small-town SFH, larger-lot edges, some newer subdivisions, limited multi-unit',
      challenges: [
        'Long empty miles from Weatherford or I-20 staging',
        'Narrow approaches and limited turnaround on some lots',
        'Not interchangeable with Aledo HOA cul-de-sacs',
        'School-calendar peaks still fill weekends',
      ],
      moverTips:
        'Treat Springtown pairs as long locals. Send approach and turnaround photos. Never assume Aledo truck assumptions transfer. Build SH-171 timing into estimates.',
      cityKeywords: [
        'springtown',
        'springtown tx',
        'sh 171',
        'north parker',
      ],
    },
    {
      id: 'western-ranch-growth',
      name: 'Western Ranch & Growth Edges',
      shortName: 'Western growth',
      neighborhoods: [
        'Brock edges',
        'Western Parker acreage',
        'FM-5 and rural corridors',
        'Ranch and equestrian-edge pockets',
        'New-construction western tracts',
      ],
      housingTypes:
        'Larger-lot SFH, acreage and equestrian-edge product, some HOA villages, new-construction growth',
      challenges: [
        'Long approaches, gates, and limited truck turnaround',
        'Long empty miles from Weatherford or Aledo staging',
        'Incomplete roads in newest phases',
        'Weather-sensitive outdoor packing on open lots',
      ],
      moverTips:
        'Send driveway, gate, and turnaround photos before booking. Price western pairs as long locals with honest empty-mile time. Confirm builder access the week of the move in new sections.',
      cityKeywords: [
        'brock',
        'parker acreage',
        'fm 5',
        'west parker',
        'brock tx',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Parker County',
    intro:
      'Same square footage prices differently by HOA soft costs, I-20 corridor time, and whether the job is Aledo metro-edge stock or Weatherford / western long-local.',
    drivers: [
      {
        title: 'I-20 / US-180 / SH-171 corridor time',
        detail:
          'Aledo ↔ west Fort Worth, Weatherford ↔ Tarrant, or any peak corridor leg can burn far more clock than map miles suggest. Hourly billing follows the clock.',
      },
      {
        title: 'HOA soft costs on the Aledo / Hudson Oaks belt',
        detail:
          'COI processing, approved hours, and gate lists add soft costs and can force weekday-only windows before labor starts.',
      },
      {
        title: 'Western & Springtown empty-mile access',
        detail:
          'Long approaches, limited turnaround, and rural last-mile add labor and vehicle risk versus pure metro-edge HOA jobs.',
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
        note: 'HOA soft costs and I-20 corridor hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / western / long-local)',
        value: '$2,300–$5,700+',
        note: 'Western acreage and cross-county Tarrant pairs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal & heat calendar intelligence',
    intro:
      'Parker peaks follow extreme heat, school calendars (especially Aledo), and Fort Worth west spillover — not downtown lease density alone.',
    items: [
      {
        title: 'Summer heat peak: roughly June – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon moves in peak heat are high risk for people and property.',
      },
      {
        title: 'School & family calendars (Aledo / Weatherford)',
        detail:
          'Late spring through early fall weekends fill first for family SFH moves. Book 2–4 weeks ahead for popular Saturdays in Aledo and Hudson Oaks villages.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Still plan around HOA weekday windows when applicable. Early starts win even in shoulder seasons when heat and I-20 peaks are the real constraints.',
      },
    ],
  },
  specialized: [
    {
      id: 'aledo-metro-edge-hoa',
      title: 'Aledo metro-edge HOA logistics',
      intro:
        'Parker’s defining metro product is Aledo / Willow Park / Hudson Oaks family HOA access — gate lists, COI, and school-calendar volume that Tarrant core elevator jobs do not share.',
      bullets: [
        'Send HOA management packets, COI requirements, and gate lists with the estimate.',
        'Confirm approved move hours before booking Saturday crews.',
        'Inventory family-volume SFH carefully — suburban loads often exceed older urban condos.',
        'Share driveway, cul-de-sac, and truck-length constraints for newer villages.',
      ],
    },
    {
      id: 'i20-west-freeflow',
      title: 'I-20 west freeflow into Tarrant',
      intro:
        'I-20, US-180, SH-171, and FM-5 turn “local” Parker pairs into corridor-timed jobs.',
      bullets: [
        'Price portal-to-portal time honestly for Aledo/Weatherford ↔ west Tarrant pairs.',
        'Build buffer for school and commute peaks on I-20.',
        'Ask whether cross-county pairs still use a pure local rate card or a long-local schedule.',
        'Note construction detours on western growth corridors.',
      ],
    },
    {
      id: 'weatherford-western-access',
      title: 'Weatherford & western ranch access',
      intro:
        'Weatherford historic grids and western acreage product are not Aledo cul-de-sacs renamed.',
      bullets: [
        'Confirm street width and parking near historic Weatherford cores.',
        'Verify gates, grades, and turnaround on western ranch and Brock-edge lots.',
        'Price Weatherford ↔ Aledo as a real cross-zone local with honest clock time.',
        'Prefer early starts for heat on open western staging.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'FW west-collar value, Aledo school-driven growth, and Weatherford county-seat product are different bets — validate schools and healthcare by pocket, then plan for heat and HOA calendars.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Major systems include Weatherford ISD, Aledo ISD, Springtown ISD, Brock ISD, and other local districts. Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'Aledo ISD vs Weatherford ISD',
            detail:
              'Aledo, Willow Park, and many Hudson Oaks addresses often fall in Aledo ISD; Weatherford and many central/western pockets use Weatherford ISD. Marketing names and new tracts can span feeders — verify with official boundary tools.',
          },
          {
            title: 'Springtown & western systems',
            detail:
              'Springtown ISD, Brock ISD, and smaller systems serve north and western edges. Do not treat county averages as neighborhood truth.',
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
              'Medical City Weatherford and other regional campuses serve greater Parker. Map ER drive times at rush hour from your target pocket — especially Aledo and Springtown edges.',
          },
          {
            title: 'Tarrant specialty spillover',
            detail:
              'Fort Worth medical campuses remain common for complex needs from the west collar. Confirm insurer networks and realistic I-20 appointment drive times.',
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
    title: 'Useful Parker resources',
    intro:
      'Local official links first; directory listings are independent. Verify Texas TxDMV for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'City of Weatherford',
        href: 'https://www.weatherfordtx.gov/',
        note: 'County seat services; HOA rules are separate',
        external: true,
      },
      {
        label: 'City of Aledo',
        href: 'https://www.aledo-texas.com/',
        external: true,
      },
      {
        label: 'Parker County — official site',
        href: 'https://www.parkercountytx.com/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Weatherford, Aledo/Willow Park edge, Springtown north, western growth) when available. Confirm HOA packets on the metro edge, Weatherford grid access, and honest I-20 drive assumptions — this is a FW west collar, not Tarrant core.',
  lastReviewed: '2026-07-24',
});
