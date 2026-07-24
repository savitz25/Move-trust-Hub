import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTxTier2Pack,
  TX_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/texas/tx-tier2-shared';

/**
 * Ellis County — Texas Tier 2 (Dallas south — Waxahachie / Midlothian / Ennis).
 * Secondary-market contract vs Dallas Tier 1 parent — Midlothian/Red Oak collar growth
 * and Waxahachie county-seat product, not Dallas core elevators or renamed Dallas scripts.
 */
export const ellisCountyIntelligence: CountyIntelligencePack = finalizeTxTier2Pack({
  countySlug: 'ellis',
  hubTitle: 'Ellis County Moving Intelligence Hub',
  eyebrow: 'Ellis · Dallas south collar · Waxahachie / Midlothian / Ennis',
  h1: 'Moving in Ellis County: Dallas South Collar — Midlothian, Waxahachie & Ennis Growth',
  heroOpener:
    'Ellis County is Dallas’s southern collar — Midlothian and Red Oak family growth on the metro edge, Waxahachie’s county-seat grid, and Ennis corridor character on US-287 — not downtown Dallas elevators with a different nameplate. Midlothian runs on planned-community logistics and DFW commute timing; Waxahachie still carries historic-grid and I-35E character; Ennis and southern rural edges rewrite empty-mile assumptions. A Midlothian HOA two-story, a Red Oak tract, a Waxahachie bungalow, and an Ennis corridor home do not share truck access. Compared with Dallas County, you get freer mid-day freeflow than Dallas inner loops, denser HOA paperwork on the Midlothian belt than many older Dallas SFH blocks, and almost no vertical tower product. This guide is for people moving in Ellis as a south-collar market with its own role — not a recycled Dallas core script.',
  heroCredibility:
    'Dallas south collar · Waxahachie / Midlothian / Ennis · TxDMV household goods (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-35E · US-287 · US-77 · SH-34 · local Waxahachie grid',
  parentCompare: {
    parentLabel: 'Dallas County',
    parentHref: '/local-movers/texas/dallas',
    title: 'Compared with Dallas County',
    intro:
      'Ellis is the Dallas south growth collar — Midlothian, Red Oak, Waxahachie, and Ennis — not a drop-in template for downtown Dallas elevators, Uptown high-rises, or dense inner-suburb multi-family. Use Dallas as the dense metro parent contrast.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Dallas County crews fight I-35E through town, I-30, I-45, LBJ/I-635, and multi-hour cross-county pairs into downtown and medical/job centers. Ellis pairs ride I-35E, US-287, US-77, SH-34, and the local Waxahachie grid — freer mid-day than Dallas inner loops, still peak-heavy on Midlothian/Red Oak ↔ south Dallas and Waxahachie ↔ DFW job-center hauls. Portal-to-portal time is real; it is not a 45-minute downtown dock job.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Dallas mixes towers, historic urban grids, and dense inner-suburb multi-family under one county label. Ellis’s ladder is Midlothian/Red Oak master-planned HOA SFH, Waxahachie historic and mid-century stock, Ennis corridor product, and southern rural/agricultural edges — far less elevator density, far more gate lists and long-local empty miles into Dallas.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Dallas core needs COI elevators and curb permits; many Dallas suburbs still allow freer driveway work. Ellis’s Midlothian/Red Oak belt defaults to HOA packets — approved hours, COI, and gate lists — while Waxahachie stages more historic-grid and driveway work. Expect paperwork first on the metro edge, then the truck.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Ellis quotes often sit near or slightly below dense Dallas urban rates for comparable square footage when access is a simple driveway — HOA soft costs, I-35E / US-287 portal time, heat windows, and Ennis long locals still push prices up. Expect secondary-collar labor rates with planned-community and corridor friction as the main premium, not downtown dock scarcity.',
      },
      {
        title: 'Role difference',
        detail:
          'Ellis is Dallas’s south bedroom and growth collar — schools, DFW commutes, and Midlothian/Waxahachie inventory — not Dallas’s job-center core and not Tarrant’s Fort Worth product. Treat it as its own south-collar market when matching crews and rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Ellis County different',
    intro:
      'South-collar realities — Midlothian HOA density, Waxahachie county-seat grids, I-35E / US-287 freeflow that still bills, and freer mid-day than Dallas core — that change estimates.',
    bullets: [
      {
        title: 'Midlothian HOA is the default metro-edge product',
        detail:
          'Midlothian and Red Oak villages treat COI, approved hours, and gate lists as standard. A Waxahachie bungalow and a guarded Midlothian two-story are not interchangeable jobs — put both communities on the estimate.',
      },
      {
        title: 'I-35E / US-287 / US-77 timing is a line item',
        detail:
          'Midlothian ↔ south Dallas or Waxahachie ↔ DFW pairs freer than Dallas inner loops still burn billable time at school and commute peaks. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'Waxahachie county-seat vs Ennis corridor are different products',
        detail:
          'Historic Waxahachie grids, Ennis US-287 corridors, and southern rural edges do not share truck access with Midlothian cul-de-sacs. Name both cities — “Ellis County local” fails across the county.',
      },
      {
        title: 'North Texas heat on open suburban staging',
        detail:
          'June–September afternoons on asphalt cul-de-sacs stress crews and sealed goods. Prefer early starts; treat mid-afternoon load-outs as high risk even when the map looks short.',
      },
      TX_TIER2_REG_BULLET,
    ],
  },
  zonesHeading:
    'Ellis zones: Midlothian / Red Oak belt, Waxahachie core, Ennis corridor & southern edges',
  zonesIntro:
    'Three to four sharp products — not a six-zone dump. Midlothian/Red Oak metro edge, Waxahachie county seat, Ennis corridor, and southern rural edges price and stage differently under the same south collar.',
  zones: [
    {
      id: 'midlothian-red-oak',
      name: 'Midlothian & Red Oak Metro Edge',
      shortName: 'Midlothian / Red Oak',
      neighborhoods: [
        'Midlothian',
        'Red Oak',
        'Master-planned HOA villages',
        'US-287 corridor multi-family edges',
        'Dallas County border residential pockets',
      ],
      housingTypes:
        'Master-planned HOA SFH, newer two-story product, townhomes, multi-family, metro-edge growth stock',
      challenges: [
        'HOA COI, approved hours, and gate lists as default',
        'US-287 / I-35E approach peaks toward Dallas',
        'High family-move volume on summer weekends',
        'Cul-de-sac and truck-length constraints in newer villages',
      ],
      moverTips:
        'Send HOA management packets with the estimate. Mid-week early starts beat heat and school traffic. Inventory family-volume SFH carefully. Clarify Midlothian/Red Oak ↔ south Dallas drive assumptions.',
      cityKeywords: [
        'midlothian',
        'red oak',
        'midlothian tx',
        'red oak tx',
        'ellis midlothian',
      ],
    },
    {
      id: 'waxahachie-core',
      name: 'Waxahachie County Seat',
      shortName: 'Waxahachie',
      neighborhoods: [
        'Downtown / historic Waxahachie',
        'Local Waxahachie grid',
        'I-35E corridors',
        'Mid-century tracts',
        'South and east Waxahachie growth',
      ],
      housingTypes:
        'Historic-grid SFH, mid-century tracts, some newer subdivisions, mixed multi-family',
      challenges: [
        'Older street grids and tighter parking near historic cores',
        'I-35E / US-77 approach timing',
        'Varied access vs pure Midlothian HOA product',
        'Heat on open lots with limited shade',
      ],
      moverTips:
        'Do not price Waxahachie bungalows like Midlothian HOA villages — access and inventory differ. Confirm street width and parking. Early starts still win in summer heat. Waxahachie ↔ Midlothian is a classic underquoted local.',
      cityKeywords: [
        'waxahachie',
        'waxahachie tx',
        'i-35e waxahachie',
        'ellis waxahachie',
      ],
    },
    {
      id: 'ennis-corridor',
      name: 'Ennis & US-287 Corridor',
      shortName: 'Ennis corridor',
      neighborhoods: [
        'Ennis',
        'US-287 corridors',
        'SH-34 residential edges',
        'Mid-century and small-city tracts',
        'East Ellis corridor approaches',
      ],
      housingTypes:
        'Small-city SFH, mid-century tracts, some newer subdivisions, mixed multi-family, corridor product',
      challenges: [
        'US-287 peak timing toward Midlothian and Dallas',
        'Varied access vs pure metro-edge HOA product',
        'Long empty miles from Midlothian or Waxahachie staging on some pairs',
        'Heat on open lots with limited shade',
      ],
      moverTips:
        'Treat Ennis pairs as long locals when staging from Midlothian. Confirm street width and parking. Build US-287 timing into estimates. Do not interchange Ennis inventory with Midlothian family HOA volume.',
      cityKeywords: [
        'ennis',
        'ennis tx',
        'us 287 ennis',
        'ellis ennis',
      ],
    },
    {
      id: 'southern-rural-edges',
      name: 'Southern Rural Edges',
      shortName: 'Southern edges',
      neighborhoods: [
        'Italy and southern small towns',
        'Palmer and Ferris edges',
        'Maypearl and western rural pockets',
        'Agricultural and larger-lot edges',
        'Southern Ellis growth tracts',
      ],
      housingTypes:
        'Small-town SFH, larger-lot and agricultural-edge product, limited multi-unit, some new-construction',
      challenges: [
        'Long approaches and limited truck turnaround',
        'Long empty miles from Midlothian or Waxahachie staging',
        'Not interchangeable with metro-edge HOA cul-de-sacs',
        'Weather-sensitive outdoor packing on open lots',
      ],
      moverTips:
        'Send driveway and turnaround photos before booking. Never assume Midlothian HOA truck assumptions transfer. Price southern pairs as long locals with honest empty-mile time.',
      cityKeywords: [
        'italy tx',
        'palmer tx',
        'ferris tx',
        'maypearl',
        'south ellis',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Ellis County',
    intro:
      'Same square footage prices differently by HOA soft costs, I-35E / US-287 corridor time, and whether the job is Midlothian planned stock or Waxahachie / Ennis long-local.',
    drivers: [
      {
        title: 'HOA soft costs on the Midlothian / Red Oak belt',
        detail:
          'COI, approved hours, and gate coordination add paperwork and can force weekday-only windows before labor starts.',
      },
      {
        title: 'I-35E / US-287 / US-77 portal time',
        detail:
          'Midlothian ↔ south Dallas or Waxahachie ↔ DFW pairs burn more portal-to-portal time than map miles suggest at peak — freer than Dallas core, still billable.',
      },
      {
        title: 'Heat-constrained work windows',
        detail:
          'Summer heat compresses productive hours into mornings. Jobs that slip into peak afternoon heat may need more labor or premium scheduling.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$500–$1,400+',
        note: 'Higher with multi-unit long carries or peak heat windows',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,500–$3,800+',
        note: 'HOA soft costs and Dallas corridor hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / Ennis / long-local)',
        value: '$2,400–$5,800+',
        note: 'Cross-county Dallas and southern-edge jobs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal & heat calendar intelligence',
    intro:
      'Ellis peaks follow extreme heat, school calendars, and Dallas south spillover — not downtown lease density alone.',
    items: [
      {
        title: 'Summer heat peak: roughly June – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon moves in peak heat are high risk for people and property.',
      },
      {
        title: 'School & family calendars (Midlothian / Waxahachie / Ennis)',
        detail:
          'Late spring through early fall weekends fill first for family SFH moves. Book 2–4 weeks ahead for popular Saturdays in planned villages.',
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
      id: 'midlothian-hoa-logistics',
      title: 'Midlothian / Red Oak HOA logistics',
      intro:
        'Ellis’s defining metro product is planned-community access on the Dallas south edge — gate lists, COI, and family-volume SFH that Dallas core elevator jobs do not share.',
      bullets: [
        'Send HOA management packets, COI requirements, and gate lists with the estimate.',
        'Confirm approved move hours and floor-protection rules before booking Saturday crews.',
        'Inventory family-volume SFH carefully — suburban loads often exceed older urban condos.',
        'Share driveway, cul-de-sac, and truck-length constraints for newer villages with tight turns.',
      ],
    },
    {
      id: 'i35e-us287-last-mile',
      title: 'I-35E / US-287 / US-77 last-mile',
      intro:
        'I-35E, US-287, US-77, and SH-34 turn “local” Ellis pairs into corridor-timed jobs.',
      bullets: [
        'Price portal-to-portal time honestly for Midlothian/Red Oak ↔ Dallas and Waxahachie ↔ DFW pairs.',
        'Build buffer for school and commute peaks on I-35E and US-287.',
        'Note construction detours on growth corridors.',
        'Ask whether cross-zone pairs still use a pure local rate card or a long-local schedule.',
      ],
    },
    {
      id: 'waxahachie-ennis-access',
      title: 'Waxahachie county-seat & Ennis corridor access',
      intro:
        'Waxahachie historic grids and Ennis corridor product are not Midlothian cul-de-sacs renamed.',
      bullets: [
        'Confirm street width and parking near historic Waxahachie cores.',
        'Do not interchange Ennis corridor inventory with Midlothian HOA family volume.',
        'Price Waxahachie ↔ Midlothian as a real cross-zone local with honest clock time.',
        'Send approach and turnaround photos for southern rural-edge homes.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Dallas south-collar value, Midlothian planned villages, and Waxahachie county-seat product are different bets — validate schools and healthcare by pocket, then plan for heat and HOA calendars.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Major systems include Midlothian ISD, Waxahachie ISD, Ennis ISD, Red Oak ISD, Ferris ISD, and other local districts. Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'Midlothian / Red Oak vs Waxahachie ISD',
            detail:
              'Midlothian and many Red Oak addresses often fall in Midlothian ISD or Red Oak ISD; Waxahachie and many central pockets use Waxahachie ISD. Marketing names and new tracts can span feeders — verify with official boundary tools.',
          },
          {
            title: 'Ennis & southern systems',
            detail:
              'Ennis ISD, Ferris ISD, and smaller southern systems serve corridor and rural edges. Do not treat county averages as neighborhood truth.',
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
              'Baylor Scott & White Medical Center – Waxahachie, Ennis Regional Medical Center, and other regional campuses serve greater Ellis. Map ER drive times at rush hour from your target pocket — especially Midlothian and southern edges.',
          },
          {
            title: 'Dallas specialty spillover',
            detail:
              'Dallas medical campuses remain common for complex needs from the south collar. Confirm insurer networks and realistic I-35E / US-287 appointment drive times.',
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
    title: 'Useful Ellis resources',
    intro:
      'Local official links first; directory listings are independent. Verify Texas TxDMV for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'City of Waxahachie',
        href: 'https://www.waxahachie.com/',
        note: 'County seat services; HOA rules are separate',
        external: true,
      },
      {
        label: 'City of Midlothian',
        href: 'https://www.midlothian.tx.us/',
        external: true,
      },
      {
        label: 'City of Ennis',
        href: 'https://www.ennistx.gov/',
        external: true,
      },
      {
        label: 'Ellis County — official site',
        href: 'https://www.co.ellis.tx.us/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Midlothian/Red Oak, Waxahachie, Ennis corridor, southern edges) when available. Confirm HOA packets on the metro edge, Waxahachie grid access, and honest I-35E / US-287 drive assumptions — this is a Dallas south collar, not Dallas core.',
  lastReviewed: '2026-07-24',
});
