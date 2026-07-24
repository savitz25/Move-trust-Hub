import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTxTier2Pack,
  TX_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/texas/tx-tier2-shared';

/**
 * Brazos County — Texas Tier 2 (independent Bryan–College Station university metro).
 * Secondary-market contract vs Travis / Harris Tier 1 density defaults — Texas A&M
 * move cycles, not an Austin collar clone and not a Houston bedroom dump.
 */
export const brazosCountyIntelligence: CountyIntelligencePack = finalizeTxTier2Pack({
  countySlug: 'brazos',
  hubTitle: 'Brazos County Moving Intelligence Hub',
  eyebrow: 'Brazos County · Independent Bryan–College Station university metro',
  h1: 'Moving in Brazos County: Independent Bryan–College Station Metro & Texas A&M Move Cycles',
  heroOpener:
    'Brazos County is an independent Bryan–College Station university metro — not Austin with freer freeways, and not a Houston HOA growth collar. Texas A&M student and faculty churn, College Station multi-family and planned growth, Bryan historic-plus-suburban stock, and rural Brazos edges form their own housing ladder under Central Texas heat. Compared with Travis or Harris Tier 1 density defaults, SH-6 and FM-2818 freeflow replace downtown elevator grids, university calendar peaks are first-class demand, and almost no vertical tower product is the norm. This guide is for people moving in Brazos County as a secondary market with its own role — not recycled Travis or Harris scripts.',
  heroCredibility:
    'Independent Bryan–College Station metro · Texas A&M move cycles · TxDMV household goods (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'SH-6 · US-190 · FM-2818 · SH-21 · local Bryan–College Station grid',
  parentCompare: {
    parentLabel: 'Independent Central Texas university metro (Travis density contrast)',
    parentHref: '/local-movers/texas/travis',
    title: 'Compared with Travis County (Austin) Tier 1 density defaults',
    intro:
      'Brazos is a freestanding Bryan–College Station university metro between Houston and Austin — not a Travis suburb and not a Harris collar. Use Travis County as the high-density parent contrast — it is not a drop-in template for Texas A&M semester churn, College Station multi-family peaks, or Bryan mid-county product. Harris remains a distant employment and specialty-care contrast only.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Travis crews fight downtown elevators, MoPac / I-35 basin congestion, and multi-pocket Austin pairs. Brazos pairs ride SH-6, US-190, FM-2818, SH-21, and the local Bryan–College Station grid with freer mid-day flow — College Station ↔ Bryan still burns portal-to-portal time at peak, but it is not a Domain ↔ South Austin job. Isolation from Triangle cores means long-haul deadhead, not short-hop collar spillover.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Travis mixes dense elevators, central multi-unit, and north/south HOA growth. Brazos’s ladder is College Station student and faculty multi-family, planned suburban SFH, Bryan historic grids and mid-century tracts, and rural Brazos edges — more university turnover inventory, less Austin tech-HOA default.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Brazos stages more driveway, apartment elevator, and campus-adjacent work than Travis tower corridors. HOAs exist in College Station growth pockets but are not the Round Rock operating system. Apartment COI and semester windows replace dense curb-staging fights in Austin core.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Brazos quotes often sit below Travis/Austin rates for comparable square footage when access is simple — heat windows, A&M move-in/move-out peaks, and Bryan ↔ College Station portal time still push prices up. Expect secondary-market labor rates with university seasonality and heat as the main premiums, not downtown scarcity fees.',
      },
      {
        title: 'Role difference',
        detail:
          'Brazos is an independent university-research metro with its own employment base (Texas A&M, healthcare, education, retail, logistics) — not an Austin bedroom collar and not a Houston spillover market. Treat it as its own market when matching crews and rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Brazos County different',
    intro:
      'Independent university-metro realities — Texas A&M calendar peaks, Bryan vs College Station split, Central Texas heat, and freer SH-6 corridors than Travis parents — that change estimates.',
    bullets: [
      {
        title: 'Texas A&M move cycles rewrite demand',
        detail:
          'Semester start/end, graduation, and faculty turnover pack College Station multi-family, short-notice inventory, and storage needs. Peak A&M windows require earlier booking than civilian-only Austin suburb calendars.',
      },
      {
        title: 'College Station vs Bryan vs rural edges',
        detail:
          'Campus-adjacent apartments, College Station planned SFH, Bryan historic and mid-county stock, and rural Brazos edges are different jobs under one county label. “Brazos local” is too vague — name both cities and access type on the estimate.',
      },
      {
        title: 'SH-6 / FM-2818 freeflow is not Austin basin — still a line item',
        detail:
          'Cross-city pairs freer than Travis still burn billable time at school, game-day, and commute peaks. Ask whether quotes are portal-to-portal, especially College Station ↔ Bryan.',
      },
      {
        title: 'Central Texas heat is an operational constraint',
        detail:
          'Summer afternoons stress crews and open staging. Prefer earliest morning load windows in peak summer — mild shoulder-season Austin habits do not cancel heat risk on asphalt lots.',
      },
      TX_TIER2_REG_BULLET,
    ],
  },
  zonesHeading:
    'Brazos County zones: College Station / A&M, Bryan core, planned growth & rural edges',
  zonesIntro:
    'Four sharp products — not a six-zone dump. College Station/A&M multi-family, Bryan core, planned suburban growth, and rural Brazos edges price and stage differently under the same university calendar.',
  zones: [
    {
      id: 'college-station-am',
      name: 'College Station / Texas A&M-adjacent',
      shortName: 'College Station / A&M',
      neighborhoods: [
        'College Station multi-family corridors',
        'Texas A&M-adjacent apartments',
        'Northgate / campus-edge residential',
        'University Drive corridors',
        'Student and faculty housing belts',
      ],
      housingTypes:
        'Apartments, townhomes, student multi-family, modest SFH near campus edges',
      challenges: [
        'Semester move-in/move-out peak volume',
        'Apartment elevator windows and COI',
        'Game-day and campus traffic peaks',
        'High turnover inventory profiles and short notice',
      ],
      moverTips:
        'Book A&M peak windows early. Collect apartment COI and elevator reservations before the survey is final. Inventory carefully for partial loads and storage common in student moves. Prefer non-game-day and mid-week starts near campus.',
      cityKeywords: [
        'college station',
        'texas a&m',
        'college station tx',
        'northgate',
        'aggie',
        'university drive',
      ],
    },
    {
      id: 'bryan-core',
      name: 'Bryan Core',
      shortName: 'Bryan',
      neighborhoods: [
        'Downtown Bryan edges',
        'Historic Bryan grids',
        'Texas Avenue corridors',
        'Mid-century residential belts',
        'Central multi-family clusters',
      ],
      housingTypes:
        'Older SFH, historic-grid bungalows, mid-century stock, multi-unit buildings',
      challenges: [
        'Tighter street parking near historic cores',
        'Older porches, stairs, and long carries',
        'SH-6 / Texas Avenue approach timing',
        'Heat on asphalt staging without shade',
      ],
      moverTips:
        'Do not price Bryan historic stock like College Station apartments — access and inventory differ. Confirm street width and parking. Weekday mornings beat heat and commute peaks. Share photos for stairs and tight drives.',
      cityKeywords: [
        'bryan',
        'bryan tx',
        'downtown bryan',
        'texas avenue bryan',
        'brazos bryan',
      ],
    },
    {
      id: 'planned-growth-bcs',
      name: 'Planned Growth (BCS suburbs)',
      shortName: 'Planned growth',
      neighborhoods: [
        'College Station planned villages',
        'South and west growth tracts',
        'FM-2818 / SH-6 growth corridors',
        'Family HOA SFH pockets',
        'Newer multi-family growth',
      ],
      housingTypes:
        'Master-planned HOA SFH, new-construction tracts, townhomes, multi-family growth',
      challenges: [
        'HOA COI, approved hours, and gate lists',
        'Cul-de-sac and truck-length constraints',
        'SH-6 / FM-2818 peak congestion',
        'Family-volume inventory on summer weekends',
      ],
      moverTips:
        'Send HOA packets with the estimate. Mid-week early starts beat heat and school traffic. Inventory family-volume SFH carefully. Clarify growth-pocket ↔ campus multi-family drive assumptions.',
      cityKeywords: [
        'college station suburbs',
        'fm 2818',
        'sh 6 college station',
        'bcs growth',
        'planned college station',
      ],
    },
    {
      id: 'rural-brazos-edges',
      name: 'Rural Brazos Edges',
      shortName: 'Rural edges',
      neighborhoods: [
        'Wellborn-edge pockets',
        'Kurten / north edges',
        'Acreage and ranch-edge residential',
        'SH-21 corridor edges',
        'Open-lot rural tracts',
      ],
      housingTypes:
        'Acreage homes, manufactured and site-built mix, farm-edge SFH, limited multi-family',
      challenges: [
        'Soft driveways, gates, and long private approaches',
        'Outbuildings and mixed inventory volume',
        'Long empty miles from College Station staging',
        'Incomplete roads and truck-turn constraints',
      ],
      moverTips:
        'Treat rural edges as long-local jobs. Ask whether pure local rate cards still apply. Confirm driveway surface, gate width, and outbuilding inventory. Prefer mid-week starts over peak A&M weekend traffic.',
      cityKeywords: [
        'wellborn',
        'kurten',
        'rural brazos',
        'sh 21',
        'brazos acreage',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Brazos County',
    intro:
      'Same square footage prices differently by A&M calendar peaks, multi-unit COI, heat windows, and whether the job is campus multi-family or rural long local.',
    drivers: [
      {
        title: 'Texas A&M semester capacity',
        detail:
          'Move-in/move-out and graduation windows tighten crews near College Station multi-family and can push rates or lead times — book early for known A&M peaks.',
      },
      {
        title: 'Bryan ↔ College Station portal time',
        detail:
          'Cross-city pairs on SH-6 / FM-2818 can burn more clock than map miles suggest at peak — freer than Austin basin, still billable.',
      },
      {
        title: 'Heat-constrained work windows',
        detail:
          'Summer heat compresses productive hours into mornings. Jobs that slip into peak afternoon heat may need more labor days or premium scheduling.',
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
        value: '$400–$1,250+',
        note: 'Higher with elevators, A&M peaks, or long portal time',
      },
      {
        label: '2–3BR house / apartment',
        value: '$1,100–$3,400+',
        note: 'Cross-city hauls and multi-unit access trend up',
      },
      {
        label: '3–4+ BR (cross-zone / rural edge)',
        value: '$1,900–$5,600+',
        note: 'Rural edges and peak A&M windows price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, heat & university-calendar intelligence',
    intro:
      'Brazos peaks follow Texas A&M move cycles, school calendars, and Central Texas heat — not Travis downtown lease density alone.',
    items: [
      {
        title: 'Texas A&M peak windows (semester & graduation)',
        detail:
          'Move-in/move-out seasons and graduation weeks fill crews near College Station multi-family. Book as soon as housing dates are firm.',
      },
      {
        title: 'Summer heat: roughly May – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon moves in peak heat are high risk for people and property.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start outside A&M crush',
        detail:
          'Still plan around apartment elevator windows when applicable. Dawn starts win even in shoulder seasons when heat and arterials are the real constraints.',
      },
    ],
  },
  specialized: [
    {
      id: 'texas-am-move-cycles',
      title: 'Texas A&M move cycles & student logistics',
      intro:
        'Brazos County’s volume problem is often university turnover, short notice, and apartment access — not Austin HOA paperwork alone.',
      bullets: [
        'Book as soon as lease and semester dates allow; peak capacity disappears first near College Station multi-family corridors.',
        'Collect apartment COI and elevator reservations before the survey is final.',
        'Inventory carefully for partial loads, storage, and roommate-split inventories common in student moves.',
        'Avoid game-day and major campus-event windows for campus-edge addresses when possible.',
      ],
    },
    {
      id: 'bryan-college-station-routing',
      title: 'Bryan–College Station polycentric routing',
      intro:
        'Bryan vs College Station routing on SH-6, FM-2818, US-190, and SH-21 is not interchangeable with a single Austin neighborhood move.',
      bullets: [
        'Name both cities on every estimate (e.g. Bryan → College Station); “Brazos local” hides portal time.',
        'Price peak SH-6 / FM-2818 pairs honestly — map miles understate school and commute congestion.',
        'Clarify whether long locals toward rural edges still use a pure local rate card.',
        'Build buffer when households also stage storage or partial loads common in semester transitions.',
      ],
    },
    {
      id: 'heat-apartment-operations',
      title: 'Heat & multi-unit operations',
      intro:
        'Central Texas heat plus apartment elevator rules need operational plans that pure single-family jobs never write.',
      bullets: [
        'Prefer earliest morning starts in peak summer; treat mid-afternoon loads as high risk.',
        'Request shaded staging and heat-safe packing for electronics and sealed goods.',
        'Confirm elevator reservations and COI for multi-unit before dispatch.',
        'Plan water, rotation, and realistic crew endurance on open apartment lots.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Independent university-metro value, Texas A&M adjacency, and Central Texas heat are different bets — validate schools and healthcare by pocket, then plan for semester calendars.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Major systems include College Station ISD, Bryan ISD, and others, plus Texas A&M University for higher education. Match every K–12 listing address to the correct boundary.',
        bullets: [
          {
            title: 'Multiple districts under one county',
            detail:
              'College Station and Bryan addresses often fall in different systems. Marketing names and new tracts can span feeders — verify with official boundary tools and TEA data.',
          },
          {
            title: 'University vs family calendars',
            detail:
              'Faculty and family households face different timing than pure student multi-family turnover. Coordinate school enrollment early when mid-year moves are required.',
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
              'CHI St. Joseph Health and other Bryan–College Station campuses serve the metro. Map ER drive times from rural edges and campus multi-family at peak traffic.',
          },
          {
            title: 'Specialty & regional reality',
            detail:
              'Some specialties may require travel toward Houston, Austin, or Temple. Confirm insurer networks and realistic SH-6 / US-190 appointment times before relocating mid-treatment.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if mid-treatment; book first appointments before peak A&M move-in chaos.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Brazos resources',
    intro:
      'Local official links first; directory listings are independent. Verify TxDMV household goods authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Brazos County',
        href: 'https://www.brazoscountytx.gov/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of College Station',
        href: 'https://www.cstx.gov/',
        external: true,
      },
      {
        label: 'City of Bryan',
        href: 'https://www.bryantx.gov/',
        external: true,
      },
      {
        label: 'Texas A&M University',
        href: 'https://www.tamu.edu/',
        note: 'Campus calendar and housing context for A&M-affiliated moves',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (College Station/A&M, Bryan core, Planned growth, Rural edges) when available. Confirm A&M peak timing, apartment COI near campus, heat-aware start times, and honest Bryan–College Station drive assumptions — this is an independent university metro, not a Travis collar clone.',
  lastReviewed: '2026-07-24',
});
