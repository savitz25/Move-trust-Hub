import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeFlTier2Pack,
  FL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/florida/fl-tier2-shared';

/**
 * Marion County — Florida Tier 2 (Ocala North Central independent hub).
 * Secondary-market contract vs Central Florida Tier 1 density defaults —
 * horse country + regional hub, not an Orange collar clone.
 */
export const marionCountyIntelligence: CountyIntelligencePack = finalizeFlTier2Pack({
  countySlug: 'marion',
  hubTitle: 'Marion County Moving Intelligence Hub',
  eyebrow: 'Marion County · Independent North Central Florida hub · Ocala',
  h1: 'Moving in Marion County: Independent North Central Hub — Ocala, Horse Country & I-75 Logistics',
  heroOpener:
    'Marion County is an independent North Central Florida hub centered on Ocala — not Orlando with freer freeways, and not a Central Florida HOA growth collar with different labels. Ocala core stock, southwest Ocala suburban growth, Belleview and south corridors, and horse-country rural edges with barns, gates, and long gravel approaches form their own housing ladder under inland heat. Compared with Orange / Central Florida Tier 1 density defaults, I-75 freeflow replaces theme-park tourist gridlock, equestrian and regional medical volume are first-class demand, and open-lot heat exposure is normal. This guide is for people moving in Marion as a secondary market with its own role — not recycled Orange scripts.',
  heroCredibility:
    'Independent North Central hub · Horse country · I-75 freeflow · FDACS Ch. 507 (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-75 · US-27 · US-301 · US-441 · FL-40',
  parentCompare: {
    parentLabel: 'Central Florida Tier 1 (Orange density defaults)',
    parentHref: '/local-movers/florida/orange',
    title: 'Compared with Orange County / Central Florida Tier 1 density defaults',
    intro:
      'Marion is a freestanding North Central Florida regional hub on I-75 — not an Orange collar suburb and not a thinner Orlando zone dump. Use Orange / Central Florida Tier 1 as high-density parent contrast for licensing context and long-haul routing, not as a drop-in template for Ocala horse-country logistics.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Orange crews fight I-4 tourist and multi-zone metro peaks. Marion pairs ride I-75, US-27, US-301, US-441, and FL-40 with freer mid-day freeflow — Ocala core ↔ SW growth or Belleview ↔ horse-country edges still burn portal-to-portal time at peak, but it is not a theme-park corridor job. Isolation from Orlando means long-haul deadhead to Central Florida cores, not short-hop collar spillover.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Orange mixes tourist multi-family, master-planned east/south growth, and dense metro product. Marion’s ladder is Ocala core mid-century and multi-unit, SW Ocala suburban SFH, Belleview/south corridors, and horse-country larger-lot / farm-edge product — more equestrian access and rural empty miles, less elevator and guest-corridor density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Marion stages more driveway, barn-adjacent, and rural-gate work than Orange tourist core. HOAs exist in SW growth pockets but are not the Clermont or Horizon West operating system. Soft shoulders, private roads, and open-lot heat replace dense curb-staging fights.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Marion quotes often sit below Central Florida metro rates for comparable square footage when access is simple — heat windows, horse-property access, I-75 peak time, and rural empty miles still push prices up. Expect secondary-market labor rates with equestrian and rural premiums — not Orlando tourist scarcity pricing.',
      },
      {
        title: 'Role difference',
        detail:
          'Marion is an independent North Central Florida regional hub with its own employment base (healthcare, education, equestrian industry, logistics, retail) — not an Orange bedroom collar. Treat it as its own market when matching crews and rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Marion County different',
    intro:
      'Independent North Central realities — horse-country access, I-75 freeflow, Ocala core vs SW growth, and inland heat — that change estimates.',
    bullets: [
      {
        title: 'Horse-country and farm edges are access jobs',
        detail:
          'Barns, gates, private roads, soft ground, and long gravel approaches define many rural and equestrian parcels. Share approach photos; never assume a standard suburban driveway plan.',
      },
      {
        title: 'Ocala core vs SW growth vs Belleview are different products',
        detail:
          'Core multi-unit and mid-century stock, SW suburban HOA tracts, and south-corridor smaller-city product do not share truck access or clock time. Name both pockets on the estimate.',
      },
      {
        title: 'I-75 freeflow is not Orlando gridlock — still a line item',
        detail:
          'Cross-county pairs freer than I-4 still burn billable time at school and commute peaks. Ask whether quotes are portal-to-portal, especially core ↔ SW growth or Ocala ↔ Belleview.',
      },
      {
        title: 'Inland heat is operational, not cosmetic',
        detail:
          'Summer afternoons regularly run extreme on open lots and farm edges. Prefer early starts, shaded staging, and heat-safe packing.',
      },
      FL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Marion zones: Ocala core, SW growth, Belleview/south & horse-country edges',
  zonesIntro:
    'Four sharp products — not a six-zone dump. Ocala core, SW Ocala growth, Belleview/south corridors, and horse-country rural edges price and stage differently under the same inland heat calendar.',
  zones: [
    {
      id: 'ocala-core',
      name: 'Ocala Core & Established Grid',
      shortName: 'Ocala core',
      neighborhoods: [
        'Downtown Ocala edges',
        'Central multi-family clusters',
        'Established mid-century belts',
        'US-441 / US-27 core corridors',
        'Hospital-adjacent residential',
      ],
      housingTypes:
        'Older SFH, multi-unit buildings, mid-century stock, some redevelopment product',
      challenges: [
        'Tighter street parking and multi-unit long carries',
        'Elevator/COI rules in some multi-unit buildings',
        'I-75 / arterial approaches into the core',
        'Heat on asphalt staging without shade',
      ],
      moverTips:
        'Confirm building rules for multi-unit. Weekday mornings beat heat and commute peaks. Inventory stairs carefully in older multi-story stock. Share parking constraints on denser blocks.',
      cityKeywords: [
        'ocala',
        'downtown ocala',
        'central ocala',
        'ocala core',
      ],
    },
    {
      id: 'sw-ocala-growth',
      name: 'Southwest Ocala Growth',
      shortName: 'SW Ocala',
      neighborhoods: [
        'Southwest Ocala suburban tracts',
        'SR-200 corridor growth',
        'Family HOA SFH pockets',
        'Newer multi-family growth',
        'I-75 SW approach edges',
      ],
      housingTypes:
        'Suburban SFH, planned HOA villages, new-construction tracts, multi-family growth',
      challenges: [
        'HOA COI and approved hours in some villages',
        'Cul-de-sac and truck-length constraints',
        'SR-200 / I-75 peak congestion',
        'Family-volume inventory on summer weekends',
      ],
      moverTips:
        'Send HOA packets when applicable. Mid-week early starts beat heat and school traffic. Inventory family-volume SFH carefully. Clarify SW growth ↔ Ocala core drive assumptions.',
      cityKeywords: [
        'southwest ocala',
        'sr 200',
        'sw ocala',
        'ocala growth',
        'state road 200',
      ],
    },
    {
      id: 'belleview-south',
      name: 'Belleview & South Corridors',
      shortName: 'Belleview / south',
      neighborhoods: [
        'Belleview',
        'South US-27 / US-301 corridors',
        'South Marion suburban stock',
        'Smaller-city residential cores',
        'South growth and connector towns',
      ],
      housingTypes:
        'Smaller-city SFH, modest multi-family, suburban tracts, working-community stock',
      challenges: [
        'Longer empty miles from Ocala core staging',
        'US-27 / US-301 peak timing',
        'Varied HOA density vs pure SW growth villages',
        'Thinner same-day crew density than Ocala core',
      ],
      moverTips:
        'Treat Belleview/south pairs as long-local jobs. Ask whether pure local rate cards still apply. Share driveway constraints. Prefer mid-week starts over peak arterial traffic.',
      cityKeywords: [
        'belleview',
        'south marion',
        'us-27 south',
        'us-301',
        'south ocala',
      ],
    },
    {
      id: 'horse-country-rural',
      name: 'Horse Country & Rural Edges',
      shortName: 'Horse country',
      neighborhoods: [
        'Northwest / northeast horse farms',
        'Larger-lot equestrian properties',
        'Rural Marion edges',
        'FL-40 / country-road corridors',
        'Ranch-style and agricultural-adjacent homes',
      ],
      housingTypes:
        'Equestrian estates, larger-lot SFH, barns and outbuildings, rural-edge and acreage-adjacent product',
      challenges: [
        'Gates, private roads, and long gravel approaches',
        'Soft shoulders and truck-turn constraints',
        'Outbuildings, tack, and equipment inventories',
        'Heat and limited shade on open farm approaches',
      ],
      moverTips:
        'Share gate codes, road-width, and turnaround photos early. Inventory barns and workshops separately from household furniture. Price empty miles honestly. Build heat buffer for open-lot summer loads.',
      cityKeywords: [
        'horse country',
        'ocala horse',
        'marion rural',
        'equestrian ocala',
        'fl-40',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Marion County',
    intro:
      'Same square footage prices differently by horse-property access, heat windows, multi-unit COI, and whether the job stays core or runs SW growth/rural edge.',
    drivers: [
      {
        title: 'Horse-country & rural access premiums',
        detail:
          'Gates, private roads, soft ground, and outbuilding inventories add labor and vehicle risk versus pure suburban driveway jobs.',
      },
      {
        title: 'I-75 / US-27 / US-441 portal time',
        detail:
          'Core ↔ SW growth or Ocala ↔ Belleview pairs can burn more clock than map miles suggest at peak — freer than Orange I-4, still billable.',
      },
      {
        title: 'Heat-constrained work windows',
        detail:
          'Inland heat compresses productive outdoor hours. Jobs that slip into peak afternoon windows may need more labor days or premium scheduling.',
      },
      {
        title: 'Multi-unit & HOA soft costs',
        detail:
          'Elevators, COI, and growth-village gate lists add coordination costs versus pure open rural driveway SFH.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$400–$1,100+',
        note: 'Higher with elevators, heat delays, or peak corridor windows',
      },
      {
        label: '2–3BR house / apartment',
        value: '$1,200–$3,400+',
        note: 'Cross-zone and multi-unit access trend up',
      },
      {
        label: '3–4+ BR (cross-zone / horse-country edge)',
        value: '$2,000–$5,600+',
        note: 'Rural access, barns, and long-local pairs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal & heat calendar intelligence',
    intro:
      'Marion peaks follow inland heat, school calendars, and regional family moves — not Orlando park calendars alone.',
    items: [
      {
        title: 'Summer heat peak: roughly June – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon moves on open farm and growth lots are high risk.',
      },
      {
        title: 'School & family calendars (Ocala / SW growth)',
        detail:
          'Late spring through early fall weekends fill first for family SFH moves. Book 2–4 weeks ahead for popular Saturdays.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Still plan around HOA weekday windows when applicable. Dawn starts win even in shoulder seasons when heat and arterials are the real constraints.',
      },
    ],
  },
  specialized: [
    {
      id: 'horse-country-hub',
      title: 'Horse-country & regional-hub logistics',
      intro:
        'Marion’s defining specialty product is equestrian and rural-edge access alongside a freestanding Ocala regional hub — not Central Florida HOA paperwork alone.',
      bullets: [
        'Share gate codes, private-road rules, road width, and turnaround photos early.',
        'Inventory barns, tack rooms, and outbuildings separately from household furniture.',
        'Budget soft-ground and weather buffer for gravel and unpaved approaches.',
        'Price empty miles honestly when staging from Ocala core to rural edges.',
      ],
    },
    {
      id: 'i75-logistics',
      title: 'I-75 freeflow & corridor logistics',
      intro:
        'I-75, US-27, US-301, US-441, and FL-40 turn “local” Marion pairs into corridor-timed jobs with regional freight context.',
      bullets: [
        'Name both pockets on every estimate (e.g. Ocala core → SW growth); “Marion local” hides portal time.',
        'Price peak I-75 / SR-200 / US-27 pairs honestly — map miles understate school and commute congestion.',
        'Clarify whether long locals toward Belleview or horse-country edges still use a pure local rate card.',
        'Build buffer for freight and through-traffic on I-75 approaches.',
      ],
    },
    {
      id: 'inland-heat',
      title: 'Inland heat & open-lot work windows',
      intro:
        'Marion’s defining climate constraint is open-lot inland heat that coastal or tourist-core rate cards often underweight.',
      bullets: [
        'Prefer morning starts; treat mid-afternoon loads as higher risk on farm and growth lots.',
        'Plan water, rotation, and realistic crew endurance — heat is a labor and quality issue, not just comfort.',
        'Request shaded staging when possible and heat-safe packing for sensitive goods.',
        'Build flexible language for weather delays on outdoor packing in peak summer.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Independent North Central value, horse-country living, and inland heat are different bets — validate schools and healthcare by pocket, then plan for heat calendars.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Marion County Public Schools covers most public K–12 students. Match every listing address to the correct boundary; growth and rural pockets differ.',
        bullets: [
          {
            title: 'Zone before marketing name',
            detail:
              'Ocala, SW growth, and Belleview brands span multiple feeders. Verify with official boundary tools and Florida DOE data.',
          },
          {
            title: 'Growth vs rural calendars',
            detail:
              'SW suburban families and rural horse-country households face different bus and distance realities. Tour campuses when possible.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites should lead; third-party rankings are secondary. Confirm capacity in growth corridors.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Regional acute-care anchors',
            detail:
              'AdventHealth Ocala, HCA Florida Ocala Hospital, and other campuses serve Marion. Map ER drive times from SW growth, Belleview, and horse-country edges at peak traffic.',
          },
          {
            title: 'Specialty & regional reality',
            detail:
              'Some specialties may require travel toward Gainesville or Orlando. Confirm insurer networks and realistic long-drive plans before relocating mid-treatment.',
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
    title: 'Useful Marion County resources',
    intro:
      'Local official links first; directory listings are independent. Verify FDACS for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Marion County — official site',
        href: 'https://www.marionfl.org/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Ocala',
        href: 'https://www.ocalafl.gov/',
        external: true,
      },
      {
        label: 'City of Belleview',
        href: 'https://www.belleviewfl.org/',
        external: true,
      },
      {
        label: 'Marion County Public Schools',
        href: 'https://www.marionschools.net/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Ocala core, SW Ocala, Belleview/south, Horse country) when available. Confirm rural/gate access photos, I-75 drive assumptions, and heat plans — this is an independent North Central hub, not an Orange collar.',
  lastReviewed: '2026-07-24',
});
