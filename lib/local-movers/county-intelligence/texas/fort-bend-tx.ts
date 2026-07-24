import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTxTier2Pack,
  TX_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/texas/tx-tier2-shared';

/**
 * Fort Bend County — Texas Tier 2 (Houston SW collar).
 * Secondary-market contract vs Harris Tier 1 parent — Sugar Land / Missouri City /
 * Rosenberg master-planned growth, not Houston core elevators or Montgomery north scripts.
 */
export const fortBendCountyIntelligence: CountyIntelligencePack = finalizeTxTier2Pack({
  countySlug: 'fort-bend',
  hubTitle: 'Fort Bend County Moving Intelligence Hub',
  eyebrow: 'Fort Bend · Houston SW collar · Sugar Land / Missouri City / Rosenberg',
  h1: 'Moving in Fort Bend County: Houston SW Collar — Sugar Land HOAs, Missouri City & Rosenberg Growth',
  heroOpener:
    'Fort Bend County is Houston’s southwest collar — master-planned villages, strict HOAs, and energy-corridor spillover — not Harris County downtown elevators with a different nameplate. Sugar Land and Missouri City run on planned-community logistics, lake and golf-course edges, and US-59 / I-69 timing. Richmond–Rosenberg still carry historic-grid and Brazos-adjacent character; Katy-edge and Fulshear bring newer tracts and Grand Parkway long locals. Compared with Harris, you get freer SW freeflow than Inner Loop gridlock, denser HOA paperwork than many Houston core SFH blocks, and almost no vertical tower product. This guide is for people moving in Fort Bend as a SW collar market with its own role — not a recycled Houston core or The Woodlands script.',
  heroCredibility:
    'Houston SW collar · Sugar Land / Missouri City master-planned · TxDMV household goods (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-59/I-69 · Grand Parkway (SH-99) · Westpark Tollway · US-90A · SH-6',
  parentCompare: {
    parentLabel: 'Harris County',
    parentHref: '/local-movers/texas/harris',
    title: 'Compared with Harris County',
    intro:
      'Fort Bend is the Houston SW growth collar — Sugar Land, Missouri City, Richmond–Rosenberg, and Katy-edge/Fulshear — not a drop-in template for downtown elevators, Energy Corridor high-rises, or bayou-core flood logistics. Use Harris as the dense metro parent contrast.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Harris crews fight I-10, I-45, Beltway 8, and multi-hour cross-county pairs into Medical Center and downtown. Fort Bend pairs ride US-59/I-69, Westpark Tollway, Grand Parkway (SH-99), US-90A, and SH-6 — freer mid-day than Inner Loop, still peak-heavy on Sugar Land ↔ Energy Corridor and Fulshear ↔ Rosenberg hauls. Portal-to-portal time is real; it is not a 45-minute downtown dock job.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Harris mixes towers, bungalows, bayou ranchers, and west-side HOAs under one county label. Fort Bend’s ladder is overwhelmingly master-planned SFH, golf-course and lake-edge product, historic Richmond–Rosenberg stock, and rapid western new construction — far less elevator density, far more gate lists and cul-de-sac staging.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Harris core needs COI elevators and curb permits; many Harris suburbs still allow freer driveway work. Fort Bend defaults to HOA packets — approved hours, COI, gate lists, and truck-length limits across Sugar Land, Sienna, Fulshear, and Missouri City villages. Expect paperwork first, then the truck.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Fort Bend quotes often sit near or slightly below dense Harris urban rates for comparable square footage when access is a simple driveway — HOA soft costs, tollway last-mile, heat windows, and long SW arterials still push prices up. Expect secondary-collar labor rates with planned-community friction as the main premium, not downtown dock scarcity.',
      },
      {
        title: 'Role difference',
        detail:
          'Fort Bend is Houston’s SW bedroom and planned-growth engine — schools, energy-corridor commutes, and master-planned inventory — not Harris’s job-center core and not Montgomery’s Woodlands/I-45 north product. Treat it as its own collar market when matching crews and rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Fort Bend County different',
    intro:
      'SW collar realities — master-planned HOA density, tollway last-mile, heat on suburban streets, and freer 59/99 corridors than Harris core — that change estimates.',
    bullets: [
      {
        title: 'Master-planned HOA is the default product',
        detail:
          'Sugar Land villages, Sienna, Fulshear tracts, and much of Missouri City treat COI, approved hours, and gate lists as standard. A Richmond bungalow and a guarded two-story are not interchangeable jobs — put both communities on the estimate.',
      },
      {
        title: 'US-59 / Westpark / Grand Parkway timing is a line item',
        detail:
          'Sugar Land ↔ Katy-edge or Rosenberg ↔ Energy Corridor pairs freer than Inner Loop still burn billable time at school and commute peaks. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'Tollway last-mile and incomplete western roads',
        detail:
          'Westpark Tollway and SH-99 approaches plus newer Fulshear/Katy-edge streets can add gates, construction detours, and truck-length constraints that pure Harris core scripts miss.',
      },
      {
        title: 'Gulf Coast heat on open suburban staging',
        detail:
          'June–September afternoons on asphalt cul-de-sacs stress crews and sealed goods. Prefer early starts; treat mid-afternoon load-outs as high risk even when the map looks short.',
      },
      TX_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Fort Bend zones: Sugar Land core, Missouri City / Sienna, Richmond–Rosenberg & Katy-edge',
  zonesIntro:
    'Three to four sharp products — not a six-zone dump. Sugar Land planned core, Missouri City/Sienna east, Richmond–Rosenberg mid-county, and Katy-edge/Fulshear growth price and stage differently under the same SW collar.',
  zones: [
    {
      id: 'sugar-land-planned',
      name: 'Sugar Land Master-Planned Core',
      shortName: 'Sugar Land',
      neighborhoods: [
        'Sugar Land Town Square edge',
        'First Colony area',
        'New Territory / Greatwood edges',
        'Lake / golf-course villages',
        'US-59 / Highway 6 corridors',
      ],
      housingTypes:
        'Master-planned HOA SFH, townhomes, some multi-family, golf-course and lake-edge product',
      challenges: [
        'HOA COI, approved hours, and gate lists as default',
        'Cul-de-sac and truck-length constraints in newer villages',
        'US-59 / SH-6 peak congestion toward Houston',
        'High family-move volume on summer weekends',
      ],
      moverTips:
        'Send HOA management packets with the estimate. Mid-week early starts beat heat and school traffic. Inventory family-volume SFH carefully — suburban loads often exceed older Harris bungalows. Clarify Sugar Land ↔ Energy Corridor drive assumptions.',
      cityKeywords: [
        'sugar land',
        'first colony',
        'new territory',
        'greatwood',
        'sugar land town square',
        'highway 6 sugar land',
      ],
    },
    {
      id: 'missouri-city-sienna',
      name: 'Missouri City & Sienna',
      shortName: 'Missouri City / Sienna',
      neighborhoods: [
        'Missouri City',
        'Sienna',
        'Quail Valley edges',
        'SH-6 / FM corridors',
        'East Fort Bend planned villages',
      ],
      housingTypes:
        'Planned-community SFH, established suburban tracts, golf-edge product, multi-family pockets',
      challenges: [
        'HOA rules across Sienna and many Missouri City villages',
        'SH-6 and Beltway-approach peaks toward Harris',
        'Longer carries on larger-lot and golf-edge homes',
        'Cross-county pairs into southwest Houston',
      ],
      moverTips:
        'Treat Sienna as HOA-first. Confirm gate lists and truck size limits early. Build SH-6 timing into east↔west Fort Bend pairs. Share driveway and cul-de-sac photos for larger two-stories.',
      cityKeywords: [
        'missouri city',
        'sienna',
        'quail valley',
        'sienna plantation',
        'east fort bend',
      ],
    },
    {
      id: 'richmond-rosenberg',
      name: 'Richmond–Rosenberg',
      shortName: 'Richmond–Rosenberg',
      neighborhoods: [
        'Richmond',
        'Rosenberg',
        'Historic downtown edges',
        'US-90A corridors',
        'Brazos-adjacent residential',
      ],
      housingTypes:
        'Historic-grid SFH, mid-century tracts, some newer subdivisions, mixed multi-family',
      challenges: [
        'Older street grids and tighter parking near historic cores',
        'US-90A / US-59 approach timing',
        'Varied access vs pure master-planned product',
        'Heat on open lots with limited shade',
      ],
      moverTips:
        'Do not price Richmond bungalows like Sugar Land HOA villages — access and inventory differ. Confirm street width and parking. Early starts still win in summer heat.',
      cityKeywords: [
        'richmond',
        'rosenberg',
        'richmond tx',
        'rosenberg tx',
        'us 90a',
        'fort bend richmond',
      ],
    },
    {
      id: 'katy-edge-fulshear',
      name: 'Katy-Edge & Fulshear Growth',
      shortName: 'Katy-edge / Fulshear',
      neighborhoods: [
        'Fulshear',
        'Katy-edge Fort Bend tracts',
        'Cross Creek Ranch edge',
        'Grand Parkway west growth',
        'Newer HOA villages',
      ],
      housingTypes:
        'New-construction SFH, large master-planned communities, townhomes, rapid growth product',
      challenges: [
        'HOA gate lists and construction-site approaches',
        'Grand Parkway (SH-99) peak congestion',
        'Long empty miles from Sugar Land or Houston staging',
        'Incomplete roads and truck-turn constraints in newest phases',
      ],
      moverTips:
        'Treat Katy-edge/Fulshear as long-local jobs. Ask whether pure local rate cards still apply. Send HOA packets early and inventory new-build family volume carefully. Prefer mid-week starts over peak Saturday Grand Parkway traffic.',
      cityKeywords: [
        'fulshear',
        'katy',
        'cross creek ranch',
        'grand parkway',
        'katy edge',
        'west fort bend',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Fort Bend County',
    intro:
      'Same square footage prices differently by HOA soft costs, SW corridor time, and whether the job is Sugar Land planned stock or Katy-edge long-local growth.',
    drivers: [
      {
        title: 'HOA soft costs in planned villages',
        detail:
          'COI, approved hours, and gate coordination in Sugar Land, Sienna, and Fulshear add paperwork and can force weekday-only windows.',
      },
      {
        title: 'SW corridor & tollway portal time',
        detail:
          'Sugar Land ↔ Fulshear or Missouri City ↔ Energy Corridor pairs burn more portal-to-portal time than map miles suggest at peak — freer than Harris core, still billable.',
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
        value: '$550–$1,400+',
        note: 'Higher with multi-unit long carries or peak heat windows',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,600–$3,800+',
        note: 'HOA soft costs and SW corridor hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / Katy-edge)',
        value: '$2,400–$5,800+',
        note: 'Fulshear/long-local and multi-HOA jobs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal & heat calendar intelligence',
    intro:
      'Fort Bend peaks follow extreme heat, school calendars, and Houston SW spillover — not downtown lease density alone.',
    items: [
      {
        title: 'Summer heat peak: roughly June – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon moves in peak heat are high risk for people and property.',
      },
      {
        title: 'School & family calendars (Sugar Land / Missouri City)',
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
      id: 'hoa-master-planned',
      title: 'HOA & master-planned logistics',
      intro:
        'Fort Bend’s defining product is planned-community access — gate lists, COI, and family-volume SFH that Harris core elevator jobs do not share.',
      bullets: [
        'Send HOA management packets, COI requirements, and gate lists with the estimate.',
        'Confirm approved move hours and floor-protection rules before booking Saturday crews.',
        'Inventory family-volume SFH carefully — suburban loads often exceed older urban condos.',
        'Share driveway, cul-de-sac, and truck-length constraints for newer villages with tight turns.',
      ],
    },
    {
      id: 'tollway-last-mile',
      title: 'Tollway & SW last-mile (59 / Westpark / 99)',
      intro:
        'US-59/I-69, Westpark Tollway, and Grand Parkway turn “local” Fort Bend pairs into corridor-timed jobs.',
      bullets: [
        'Price portal-to-portal time honestly for Sugar Land ↔ Fulshear/Katy-edge and Missouri City ↔ Harris pairs.',
        'Build buffer for school and commute peaks on SH-6 and US-59.',
        'Note toll approaches and construction detours on western growth corridors.',
        'Ask whether cross-zone pairs still use a pure local rate card or a long-local schedule.',
      ],
    },
    {
      id: 'heat-suburban-density',
      title: 'Heat & suburban density staging',
      intro:
        'Open cul-de-sacs and summer humidity define Fort Bend crew days more than downtown docks.',
      bullets: [
        'Prefer 6–10 a.m. starts in peak summer; treat mid-afternoon loads as high risk.',
        'Request shaded staging where possible and heat-safe packing for electronics and sealed goods.',
        'Plan water, rotation, and realistic crew endurance on long driveway carries.',
        'If the job runs long, discuss split-day options rather than pushing into peak heat.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'SW collar value, Sugar Land planned villages, and Katy-edge growth are different bets — validate schools and healthcare by pocket, then plan for heat and HOA calendars.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Major systems include Fort Bend ISD and Lamar CISD, plus Katy ISD spillover on western edges. Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'Fort Bend ISD vs Lamar CISD',
            detail:
              'Sugar Land / Missouri City addresses often fall in Fort Bend ISD; Richmond–Rosenberg and many southern/western growth pockets use Lamar CISD. Marketing names and new tracts can span feeders — verify with official boundary tools.',
          },
          {
            title: 'Katy ISD edge & growth corridors',
            detail:
              'Western Fort Bend / Katy-edge product may sit in Katy ISD. Do not treat county averages as neighborhood truth.',
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
              'Houston Methodist Sugar Land, Memorial Hermann Sugar Land, OakBend Medical Center (Richmond), and other campuses serve greater Fort Bend. Map ER drive times at rush hour from your target village.',
          },
          {
            title: 'Harris specialty spillover',
            detail:
              'Texas Medical Center and west Houston specialty care remain common for complex needs. Confirm insurer networks and realistic 59/Westpark times.',
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
    title: 'Useful Fort Bend resources',
    intro:
      'Local official links first; directory listings are independent. Verify Texas TxDMV for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'City of Sugar Land',
        href: 'https://www.sugarlandtx.gov/',
        note: 'City services; HOA rules are separate',
        external: true,
      },
      {
        label: 'City of Missouri City',
        href: 'https://www.missouricitytx.gov/',
        external: true,
      },
      {
        label: 'Fort Bend County — official site',
        href: 'https://www.fortbendcountytx.gov/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Sugar Land, Missouri City/Sienna, Richmond–Rosenberg, Katy-edge/Fulshear) when available. Confirm HOA packets, SW corridor drive assumptions, and heat-window plans — this is a Houston SW collar, not Harris core.',
  lastReviewed: '2026-07-24',
});
