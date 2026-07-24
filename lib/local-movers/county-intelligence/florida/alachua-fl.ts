import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeFlTier2Pack,
  FL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/florida/fl-tier2-shared';

/**
 * Alachua County — Florida Tier 2 (Gainesville independent university metro).
 * Secondary-market contract vs North Florida / Central Florida Tier 1 density defaults —
 * UF cycles + independent hub, NOT a Duval or Orange collar clone.
 */
export const alachuaCountyIntelligence: CountyIntelligencePack = finalizeFlTier2Pack({
  countySlug: 'alachua',
  hubTitle: 'Alachua County Moving Intelligence Hub',
  eyebrow: 'Alachua County · Independent North Central Florida · Gainesville / UF',
  h1: 'Moving in Alachua County: Independent University Metro — Gainesville, UF Cycles & I-75 Logistics',
  heroOpener:
    'Alachua County is an independent North Central Florida university metro centered on Gainesville — not Jacksonville with freer freeways, and not an Orange collar suburb with different labels. Gainesville core and UF-adjacent multi-family, northwest Gainesville suburban growth, Alachua/High Springs smaller-city stock, and rural edges form their own housing ladder under inland heat and academic calendars. Compared with Duval / Orange Tier 1 density defaults, I-75 freeflow replaces multi-bridge or theme-park gridlock, student move-in/out volume is first-class demand, and family growth pockets share the same Saturday crews. This guide is for people moving in Alachua as a secondary market with its own role — not recycled Duval or Orange scripts.',
  heroCredibility:
    'Independent North Central university metro · Gainesville / UF · I-75 freeflow · FDACS Ch. 507 (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-75 · US-441 · FL-24 · FL-26 · local Gainesville grid',
  parentCompare: {
    parentLabel: 'Independent North Central Florida (vs Duval/Orange density defaults)',
    parentHref: '/local-movers/florida/duval',
    title: 'Compared with North Florida / Central Florida Tier 1 density defaults',
    intro:
      'Alachua is a freestanding North Central Florida university metro on I-75 — not a Jacksonville collar, not an Orlando bedroom, and not a thinner Duval or Orange zone dump. Use North Florida / Central Florida Tier 1 density defaults as high-density parent contrast for licensing context and long-haul routing, not as a drop-in template for UF student cycles and Gainesville logistics.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Duval and Orange crews fight multi-zone metro peaks — river bridges or tourist I-4 density. Alachua pairs ride I-75, US-441, FL-24, FL-26, and the local Gainesville grid with freer mid-day freeflow — Gainesville core ↔ NW growth or Alachua/High Springs edges still burn portal-to-portal time at peak, but it is not a Jax multi-bridge or Orlando tourist-corridor job. Isolation from Tier 1 cores means long-haul deadhead, not short-hop collar spillover.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Duval and Orange mix large metro cores, vast sprawl, and dense multi-family under Tier 1 labels. Alachua’s ladder is Gainesville core/UF multi-unit and mid-century stock, NW Gainesville suburban SFH, Alachua/High Springs smaller-city product, and rural edges — more student turnover and independent-hub empty miles, less mega-metro elevator and guest-corridor density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Alachua stages more student multi-family, driveway SFH, and rural-edge work than Duval river-core or Orange tourist-core elevators alone. HOAs exist in NW growth pockets but are not the Clermont or Nocatee operating system. Campus-adjacent curb fights and open-lot heat replace multi-bridge dock scarcity.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Alachua quotes often sit below Jacksonville and Orlando metro rates for comparable square footage when access is simple — student peak calendars, multi-unit long carries, I-75 peak time, and rural empty miles still push prices up. Expect secondary-market labor rates with university-cycle premiums — not Tier 1 core scarcity pricing.',
      },
      {
        title: 'Role difference',
        detail:
          'Alachua is an independent North Central Florida university metro with its own employment base (UF, healthcare, education, research, retail) — not a Duval or Orange bedroom collar. Treat it as its own market when matching crews and rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Alachua County different',
    intro:
      'Independent university-metro realities — UF move cycles, student-plus-family housing mix, I-75 freeflow, and inland heat — that change estimates.',
    bullets: [
      {
        title: 'UF move-in/out cycles rewrite demand',
        detail:
          'Semester starts, lease ends, and summer turnovers create multi-family volume spikes that pure family-suburb calendars miss. Book early around known academic windows.',
      },
      {
        title: 'Gainesville core/UF vs NW growth vs Alachua/High Springs are different products',
        detail:
          'Campus multi-unit, NW suburban HOA tracts, smaller-city stock, and rural edges do not share truck access or clock time. Name both pockets on the estimate.',
      },
      {
        title: 'I-75 freeflow is not Tier 1 gridlock — still a line item',
        detail:
          'Cross-town pairs freer than Jax or Orlando cores still burn billable time at school and commute peaks. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'Inland heat is operational, not cosmetic',
        detail:
          'Summer afternoons regularly run extreme on open lots and campus asphalt. Prefer early starts, shaded staging, and heat-safe packing.',
      },
      FL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading:
    'Alachua zones: Gainesville core/UF, NW Gainesville growth, Alachua/High Springs & rural edges',
  zonesIntro:
    'Four sharp products — not a six-zone dump. Gainesville core/UF, NW growth, Alachua/High Springs, and rural edges price and stage differently under the same university and inland heat calendar.',
  zones: [
    {
      id: 'gainesville-core-uf',
      name: 'Gainesville Core & UF-Adjacent',
      shortName: 'Gainesville / UF',
      neighborhoods: [
        'Downtown Gainesville edges',
        'UF-adjacent multi-family',
        'Student housing corridors',
        'Central mid-century belts',
        'US-441 / local grid approaches',
      ],
      housingTypes:
        'Apartments and elevators, student multi-unit, mid-century SFH, mixed redevelopment product, denser curb staging',
      challenges: [
        'Elevator/COI rules and semester lease churn',
        'Campus-adjacent parking scarcity and long carries',
        'Peak move-in/out weekends fill capacity first',
        'Heat on asphalt staging without shade',
      ],
      moverTips:
        'Confirm building rules and elevator reservations early. Avoid peak semester move-in Saturdays when flexible. Inventory student partial loads carefully. Share parking constraints on denser blocks.',
      cityKeywords: [
        'gainesville',
        'gainesville fl',
        'university of florida',
        'uf gainesville',
        'downtown gainesville',
      ],
    },
    {
      id: 'nw-gainesville-growth',
      name: 'Northwest Gainesville Growth',
      shortName: 'NW Gainesville',
      neighborhoods: [
        'Northwest Gainesville suburban tracts',
        'Newberry Road corridors',
        'Family HOA SFH pockets',
        'Newer multi-family growth',
        'I-75 NW approach edges',
      ],
      housingTypes:
        'Suburban SFH, planned HOA villages, new-construction tracts, multi-family growth, family-volume stock',
      challenges: [
        'HOA COI and approved hours in some villages',
        'Cul-de-sac and truck-length constraints',
        'I-75 / Newberry Road peak congestion',
        'Family-volume inventory on summer weekends',
      ],
      moverTips:
        'Send HOA packets when applicable. Mid-week early starts beat heat and school traffic. Inventory family-volume SFH carefully. Clarify NW growth ↔ UF-core drive assumptions.',
      cityKeywords: [
        'northwest gainesville',
        'nw gainesville',
        'newberry road',
        'gainesville growth',
        'tioga',
      ],
    },
    {
      id: 'alachua-high-springs',
      name: 'Alachua, High Springs & West Corridors',
      shortName: 'Alachua / High Springs',
      neighborhoods: [
        'City of Alachua',
        'High Springs',
        'US-441 west corridors',
        'Smaller-city residential cores',
        'West Alachua connector stock',
      ],
      housingTypes:
        'Smaller-city SFH, modest multi-family, suburban tracts, working-community stock, some larger-lot edges',
      challenges: [
        'Longer empty miles from Gainesville core staging',
        'US-441 / I-75 peak timing',
        'Varied HOA density vs pure NW growth villages',
        'Thinner same-day crew density than Gainesville core',
      ],
      moverTips:
        'Treat Alachua/High Springs pairs as long-local jobs. Ask whether pure local rate cards still apply. Share driveway constraints. Prefer mid-week starts over peak arterial traffic.',
      cityKeywords: [
        'alachua',
        'alachua fl',
        'high springs',
        'high springs fl',
        'city of alachua',
      ],
    },
    {
      id: 'rural-edges',
      name: 'Rural Edges & Outlying Stock',
      shortName: 'Rural edges',
      neighborhoods: [
        'East and south rural edges',
        'Micanopy edges',
        'Newberry edges',
        'Larger-lot and agricultural-adjacent pockets',
        'Country-road corridors',
      ],
      housingTypes:
        'Rural-edge SFH, larger-lot properties, manufactured homes, limited multi-family, agricultural-adjacent product',
      challenges: [
        'Long empty-mile time from Gainesville staging',
        'Private roads, gates, and soft approaches after rain',
        'Fewer high-rise issues — more distance and access photos needed',
        'Weather-sensitive unpaved approaches',
      ],
      moverTips:
        'Share driveway, gate, and turnaround photos for rural parcels. Confirm whether far-edge pairs still use a pure local rate card. Build buffer for two-lane corridor delays.',
      cityKeywords: [
        'micanopy',
        'newberry',
        'newberry fl',
        'alachua rural',
        'micanopy fl',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Alachua County',
    intro:
      'Same square footage prices differently by student multi-unit access, HOA soft costs, I-75 portal time, and whether the job stays Gainesville core or runs rural edge.',
    drivers: [
      {
        title: 'Student multi-unit & semester peak labor',
        detail:
          'Elevators, COI, parking scarcity, and move-in/out weekends add coordination and labor versus pure suburban driveway SFH.',
      },
      {
        title: 'I-75 / US-441 / FL-24 / FL-26 portal time',
        detail:
          'Core ↔ NW growth or Gainesville ↔ Alachua/High Springs pairs can burn more clock than map miles suggest at peak — freer than Tier 1 cores, still billable.',
      },
      {
        title: 'Heat-constrained work windows',
        detail:
          'Inland heat compresses productive outdoor hours. Jobs that slip into peak afternoon windows may need more labor days or premium scheduling.',
      },
      {
        title: 'Rural empty-mile legs',
        detail:
          'Micanopy, Newberry, and far-edge pairs add empty miles if crews stage from Gainesville core.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$400–$1,200+',
        note: 'Higher with elevators, semester peaks, or heat delays',
      },
      {
        label: '2–3BR house / apartment',
        value: '$1,200–$3,500+',
        note: 'Cross-zone and multi-unit access trend up',
      },
      {
        label: '3–4+ BR (cross-zone / rural edge)',
        value: '$2,000–$5,800+',
        note: 'Rural access and long-local pairs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, UF & heat calendar intelligence',
    intro:
      'Alachua peaks follow UF academic calendars, family school moves, and inland heat — not Jacksonville or Orlando tourist density alone.',
    items: [
      {
        title: 'UF move-in / move-out peaks',
        detail:
          'Semester starts and summer lease turnovers fill multi-family crews first near campus. Book as soon as lease dates allow.',
      },
      {
        title: 'Summer heat peak: roughly June – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon moves on open lots are high risk.',
      },
      {
        title: 'School & family calendars (NW growth)',
        detail:
          'Late spring through early fall weekends fill first for family SFH moves. Book 2–4 weeks ahead for popular Saturdays.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start outside semester crush',
        detail:
          'Still plan around apartment elevator windows when applicable. Dawn starts win when heat and arterials are the real constraints.',
      },
    ],
  },
  specialized: [
    {
      id: 'uf-move-cycles',
      title: 'UF move cycles & student multi-family',
      intro:
        'Alachua’s defining volume problem is often University of Florida semester multi-family churn — not Duval or Orange core elevators alone.',
      bullets: [
        'Book as soon as lease or housing dates allow; peak capacity disappears first near campus multi-family.',
        'Collect apartment COI and elevator reservations before the survey is final.',
        'Inventory carefully for partial loads, storage, and short-notice student inventories.',
        'Buffer portal time around campus traffic and move-in weekend peaks.',
      ],
    },
    {
      id: 'student-family-housing',
      title: 'Student + family housing mix',
      intro:
        'Gainesville pairs campus multi-unit turnover with NW suburban family SFH on the same market calendar — two products, one crew pool.',
      bullets: [
        'Match crews to pocket: UF elevator vs NW HOA driveway vs Alachua/High Springs smaller-city access.',
        'Collect HOA packets for growth villages before booking Saturday crews.',
        'Inventory family-volume SFH carefully — suburban loads often exceed student studio turns.',
        'Name both pockets on the estimate — refuse vague “Gainesville local” language across core vs growth.',
      ],
    },
    {
      id: 'i75-logistics',
      title: 'I-75 freeflow & corridor logistics',
      intro:
        'I-75, US-441, FL-24, FL-26, and the local Gainesville grid turn “local” Alachua pairs into corridor-timed jobs.',
      bullets: [
        'Name both pockets on every estimate (e.g. UF core → NW growth); “Alachua local” hides portal time.',
        'Price peak I-75 / Newberry Road / US-441 pairs honestly — map miles understate school and commute congestion.',
        'Clarify whether long locals toward High Springs or rural edges still use a pure local rate card.',
        'Build buffer for freight and through-traffic on I-75 approaches.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes — primary districts and acute-care access that affect move-in. Not a full Tier 1 lifestyle essay.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Alachua County Public Schools covers most public K–12 students. Match every listing address to the correct boundary; growth and rural pockets differ. UF families should confirm academic calendars separately.',
        bullets: [
          {
            title: 'Zone before marketing name',
            detail:
              'Gainesville core, NW growth, and Alachua/High Springs brands span multiple feeders. Verify with official boundary tools and Florida DOE data.',
          },
          {
            title: 'Growth vs campus calendars',
            detail:
              'Family suburban calendars and student multi-family cycles collide in peak windows. Tour campuses when possible for K–12; plan UF housing separately.',
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
              'UF Health Shands and other regional facilities serve Alachua. Map ER drive times from NW growth, High Springs, and rural edges at peak traffic.',
          },
          {
            title: 'Specialty & regional reality',
            detail:
              'UF Health is a major regional specialty hub. Confirm insurer networks; some residents still travel toward Jacksonville or Orlando for specific care.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Alachua County resources',
    intro:
      'Local official links first; directory listings are independent. Verify FDACS for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Alachua County — official site',
        href: 'https://www.alachuacounty.us/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Gainesville',
        href: 'https://www.gainesvillefl.gov/',
        external: true,
      },
      {
        label: 'Alachua County Public Schools',
        href: 'https://www.sbac.edu/',
        external: true,
      },
      {
        label: 'University of Florida',
        href: 'https://www.ufl.edu/',
        note: 'Campus context for student-adjacent moves — not a mover endorsement',
        external: true,
      },
      {
        label: 'FL511 — traffic conditions',
        href: 'https://fl511.com/',
        note: 'I-75, US-441 before load windows',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Gainesville core/UF, NW Gainesville, Alachua/High Springs, rural edges) when available. Confirm semester timing, multi-unit packets, and honest I-75 drive assumptions — this is an independent university metro, not a Duval or Orange collar.',
  lastReviewed: '2026-07-24',
});
