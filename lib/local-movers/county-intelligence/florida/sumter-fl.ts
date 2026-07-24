import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeFlTier2Pack,
  FL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/florida/fl-tier2-shared';

/**
 * Sumter County — Florida Tier 2 (The Villages / Bushnell — Central FL retirement growth independent).
 * Independent Central Florida retirement/growth vs Orange/Lake collar defaults —
 * active-adult HOA density + golf-cart logistics + I-75 freeflow, NOT an Orlando west-collar rename.
 */
export const sumterCountyIntelligence: CountyIntelligencePack = finalizeFlTier2Pack({
  countySlug: 'sumter',
  hubTitle: 'Sumter County Moving Intelligence Hub',
  eyebrow: 'Sumter County · Independent Central Florida retirement/growth · The Villages',
  h1: 'Moving in Sumter County: Independent Central Florida Retirement Growth — The Villages, Bushnell & I-75 Logistics',
  heroOpener:
    'Sumter County is an independent Central Florida retirement and growth market centered on The Villages active-adult density — not Orlando with freer freeways, and not a Lake County west-collar script with different labels. The Villages core HOA and golf-cart community logistics, Wildwood and Bushnell seat corridors, Coleman/south edges, and rural Sumter product form their own housing ladder under inland heat and I-75 freeflow. Compared with Orlando west-collar / Central Florida defaults, active-adult HOA paperwork and golf-cart path constraints replace theme-park tourist gridlock, retirement peak calendars are first-class demand, and freer I-75 freeflow still cannot erase long-local empty miles. This guide is for people moving in Sumter as a secondary market with its own role — not recycled Orange or Lake packs.',
  heroCredibility:
    'Independent Central FL retirement/growth · The Villages · I-75 freeflow · FDACS Ch. 507 (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-75 · Florida Turnpike · US-301 · FL-44 · The Villages arterial grid',
  parentCompare: {
    parentLabel: 'Independent Central Florida retirement/growth (vs Orange/Lake collars)',
    parentHref: '/local-movers/florida/lake',
    title: 'Compared with Orlando west-collar / Central Florida defaults',
    intro:
      'Sumter is a freestanding Central Florida retirement/growth market — The Villages active-adult density, Wildwood/Bushnell corridors, and rural edges — not a drop-in template for Clermont HOA growth, Leesburg lake-country stock, or Orlando tourist density. Use Lake as the nearer Orlando west-collar parent contrast and Orange as high-density Central Florida Tier 1 reference only.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Lake crews fight US-27 / Turnpike west-collar peaks into Orange jobs; Orange crews fight I-4 tourist multi-zone pairs. Sumter pairs ride I-75, Florida Turnpike, US-301, FL-44, and The Villages arterial grid with freer mid-day freeflow — The Villages core ↔ Wildwood or Bushnell ↔ rural edges still burn portal-to-portal time at peak. Isolation from Orlando means long-haul deadhead, not short-hop Clermont spillover.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Lake mixes Clermont west-metro HOA growth and lake-lot product. Sumter’s ladder is The Villages active-adult SFH and multi-family density, Wildwood/Bushnell seat and corridor stock, Coleman/south edges, and rural Sumter lots — more golf-cart community access and retirement inventory profiles, less family west-metro growth density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'The Villages defaults to dense HOA packets, approved hours, gate coordination, and golf-cart path / narrow-street constraints that standard family suburb playbooks underweight. Bushnell and rural edges stage more open driveway and empty-mile work. Not Clermont hills and not Orange tourist curb fights.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Sumter quotes often sit at secondary-market rates for simple rural driveway access — The Villages HOA soft costs, multi-stop retirement inventories, golf-cart logistics friction, and I-75 peak time still push prices up. Expect active-adult density premiums — not Orlando tourist scarcity or pure Lake collar pricing.',
      },
      {
        title: 'Role difference',
        detail:
          'Sumter is an independent Central Florida retirement/growth hub with its own demand engine (The Villages active-adult volume, healthcare, retail, logistics) — not an Orange bedroom collar and not a Lake rename. Treat it as its own market when matching crews and rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Sumter County different',
    intro:
      'Independent Central Florida retirement/growth realities — active-adult HOA density, golf-cart logistics, I-75 freeflow, and inland heat — that change estimates.',
    bullets: [
      {
        title: 'The Villages active-adult HOA density is the operating system',
        detail:
          'Gate lists, approved hours, COI packets, and high retirement turnover rewrite lead times. Book early around popular move windows; never assume open-street freeflow inside villages.',
      },
      {
        title: 'Golf-cart community access is a real truck constraint',
        detail:
          'Narrow streets, cart-path adjacency, limited staging, and multi-unit or patio-home carries differ from standard suburban driveway plans. Share approach photos and HOA truck rules early.',
      },
      {
        title: 'The Villages vs Wildwood/Bushnell vs Coleman vs rural edges differ',
        detail:
          'Active-adult density, seat corridors, south edges, and rural lots do not share truck access or clock time. Name both pockets on the estimate.',
      },
      {
        title: 'I-75 freeflow is not Orlando gridlock — still a line item',
        detail:
          'Cross-county pairs freer than I-4 still burn billable time at peak. Ask whether quotes are portal-to-portal, especially Villages ↔ Bushnell or Turnpike long locals.',
      },
      FL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading:
    'Sumter zones: The Villages core, Wildwood/Bushnell, Coleman/south & rural edges',
  zonesIntro:
    'Four sharp products — not a six-zone dump. The Villages core, Wildwood/Bushnell, Coleman/south, and rural edges price and stage differently under the same inland heat calendar.',
  zones: [
    {
      id: 'the-villages-core',
      name: 'The Villages Core & Active-Adult Density',
      shortName: 'The Villages',
      neighborhoods: [
        'The Villages core villages',
        'Active-adult SFH and patio homes',
        'Multi-family and villa clusters',
        'Villages arterial grid corridors',
        'Golf-cart community neighborhoods',
      ],
      housingTypes:
        'Active-adult HOA SFH, patio homes, villas, multi-family, golf-cart community product',
      challenges: [
        'HOA COI, approved hours, and gate lists as default',
        'Narrow streets and golf-cart path / staging constraints',
        'High retirement turnover and multi-stop inventory profiles',
        'Peak demand on popular move weeks and weather windows',
      ],
      moverTips:
        'Send HOA packets and truck rules with the estimate. Confirm approved hours early. Inventory carefully for patio-home and villa carries. Share staging and cart-path constraints before dispatch.',
      cityKeywords: [
        'the villages',
        'villages fl',
        'sumter villages',
        'active adult',
        'golf cart community',
      ],
    },
    {
      id: 'wildwood-bushnell',
      name: 'Wildwood, Bushnell & Seat Corridors',
      shortName: 'Wildwood / Bushnell',
      neighborhoods: [
        'Wildwood',
        'Bushnell',
        'I-75 / US-301 / FL-44 corridors',
        'County-seat residential stock',
        'Corridor multi-family and SFH',
      ],
      housingTypes:
        'Smaller-city SFH, modest multi-family, mid-century stock, working-community and corridor product',
      challenges: [
        'Different access profile than The Villages HOA density',
        'I-75 / US-301 peak timing',
        'Longer empty miles from Villages-only staging assumptions',
        'Mix of elevator and non-elevator multi-unit',
      ],
      moverTips:
        'Do not assume Villages HOA playbooks apply. Survey curb and driveway access. Prefer weekday mornings. Clarify Wildwood/Bushnell ↔ Villages drive assumptions.',
      cityKeywords: [
        'wildwood',
        'bushnell',
        'wildwood fl',
        'bushnell fl',
        'sumter seat',
      ],
    },
    {
      id: 'coleman-south',
      name: 'Coleman & South Edges',
      shortName: 'Coleman / south',
      neighborhoods: [
        'Coleman',
        'South Sumter corridors',
        'US-301 south approaches',
        'South residential and small-community stock',
        'South growth and connector edges',
      ],
      housingTypes:
        'Small-community SFH, modest multi-family, rural-edge and corridor product',
      challenges: [
        'Longer empty miles from The Villages core staging',
        'US-301 / arterial peak timing',
        'Varied HOA density vs pure Villages villages',
        'Thinner same-day crew density than Villages core',
      ],
      moverTips:
        'Treat Coleman/south pairs as long-local jobs. Share driveway constraints. Prefer mid-week starts. Ask whether pure Villages rate cards still apply.',
      cityKeywords: [
        'coleman',
        'coleman fl',
        'south sumter',
        'us-301 south',
      ],
    },
    {
      id: 'rural-edges',
      name: 'Rural Edges & Larger-Lot Stock',
      shortName: 'Rural edges',
      neighborhoods: [
        'Rural Sumter edges',
        'Larger-lot residential',
        'Agricultural-adjacent homes',
        'Country-road corridors',
        'Outbuilding and workshop properties',
      ],
      housingTypes:
        'Rural SFH, larger lots, manufactured-home communities, outbuildings, acreage-adjacent product',
      challenges: [
        'Long empty miles from Villages or Bushnell staging',
        'Unpaved or soft driveways after rain',
        'Lower same-day crew density than active-adult core',
        'Heat on open rural approaches',
      ],
      moverTips:
        'Price distance and access explicitly. Share road-width and driveway photos. Inventory sheds and workshops separately. Confirm whether pure local rate cards still apply.',
      cityKeywords: [
        'rural sumter',
        'sumter rural',
        'sumter county rural',
        'larger lot sumter',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Sumter County',
    intro:
      'Same square footage prices differently by The Villages HOA soft costs, golf-cart access friction, and whether the job stays active-adult core or runs Bushnell/rural long-local.',
    drivers: [
      {
        title: 'Active-adult HOA soft costs',
        detail:
          'COI, approved hours, gate coordination, and dense retirement community rules add paperwork and can force weekday-only windows inside The Villages.',
      },
      {
        title: 'Golf-cart community & patio-home labor',
        detail:
          'Narrow staging, cart-path adjacency, villa/patio carries, and multi-stop retirement inventories add labor versus pure open rural driveway jobs.',
      },
      {
        title: 'I-75 / Turnpike / US-301 / FL-44 portal time',
        detail:
          'Villages ↔ Wildwood or Bushnell ↔ rural pairs can burn more clock than map miles suggest at peak — freer than Orange I-4, still billable.',
      },
      {
        title: 'Heat-constrained work windows',
        detail:
          'Inland heat compresses productive outdoor hours. Jobs that slip into peak afternoon windows may need more labor days or premium scheduling.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$400–$1,150+',
        note: 'Higher with HOA soft costs, patio carries, or peak windows',
      },
      {
        label: '2–3BR house / active-adult home',
        value: '$1,200–$3,600+',
        note: 'Villages HOA soft costs and cross-zone hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / rural edge or multi-stop)',
        value: '$2,000–$5,800+',
        note: 'Golf-cart logistics, long-local, and multi-stop retirement jobs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, retirement & heat calendar intelligence',
    intro:
      'Sumter peaks follow retirement move calendars, inland heat, and active-adult community demand — not Orlando park calendars alone.',
    items: [
      {
        title: 'Retirement peak seasons inside The Villages',
        detail:
          'Popular move weeks and seasonal resident turnover fill crews first near active-adult density. Book as soon as closing or community dates firm.',
      },
      {
        title: 'Summer heat peak: roughly June – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon moves on open lots and village streets are high risk.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start outside retirement crush',
        detail:
          'Still plan around HOA weekday windows when applicable. Dawn starts win when heat and gate windows are the real constraints.',
      },
    ],
  },
  specialized: [
    {
      id: 'active-adult-hoa',
      title: 'Active-adult HOA density & The Villages logistics',
      intro:
        'Sumter’s defining volume product is The Villages active-adult HOA density — not Orlando tourist multi-family or Lake Clermont family growth alone.',
      bullets: [
        'Send HOA management packets, COI requirements, gate lists, and approved hours with the estimate.',
        'Inventory carefully for patio homes, villas, and multi-stop retirement profiles.',
        'Confirm truck-length limits and staging rules before booking Saturday crews.',
        'Book early around popular closing and seasonal-resident windows.',
      ],
    },
    {
      id: 'golf-cart-hoa-logistics',
      title: 'Golf-cart community & HOA access logistics',
      intro:
        'Golf-cart paths, narrow village streets, and limited staging change truck plans versus standard suburban driveway jobs.',
      bullets: [
        'Share approach photos, staging locations, and cart-path constraints early.',
        'Plan smaller trucks or shuttles when HOA rules or street width require it.',
        'Budget longer carries in patio-home and villa clusters.',
        'Do not assume open-street freeflow inside active-adult villages.',
      ],
    },
    {
      id: 'i75-freeflow-sumter',
      title: 'I-75 freeflow without Orange/Lake rename assumptions',
      intro:
        'I-75, Florida Turnpike, US-301, FL-44, and The Villages arterial grid freeflow is real — but Sumter is not a thinner Lake or Orange script. Survey the actual pocket and corridor pair.',
      bullets: [
        'Name both pockets on every estimate (e.g. The Villages → Bushnell); “Sumter local” hides portal time.',
        'Price peak I-75 / US-301 / FL-44 pairs honestly — map miles understate school and community traffic.',
        'Clarify whether long locals toward Coleman or rural edges still use a pure local rate card.',
        'Do not import Orlando or Lake rate cards without naming both cities and access type — this is not a west-collar rename.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Independent Central Florida retirement/growth value and inland heat are different bets — validate schools and healthcare by pocket, then plan for HOA and heat calendars.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Sumter District Schools covers most public K–12 students. Active-adult cores have different household profiles than family corridors near Wildwood/Bushnell. Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'Zone before marketing name',
            detail:
              'The Villages brands and Wildwood/Bushnell addresses span multiple feeders. Verify with official boundary tools and Florida DOE data.',
          },
          {
            title: 'Family vs active-adult corridors',
            detail:
              'Households with school-age children concentrate outside pure active-adult cores. Tour campuses and confirm busing when applicable.',
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
              'UF Health The Villages Hospital and other Central Florida campuses serve Sumter. Map ER drive times from Villages villages, Wildwood, Bushnell, and rural edges at peak traffic.',
          },
          {
            title: 'Specialty & regional reality',
            detail:
              'Some specialties may require travel toward Ocala, Orlando, or other regional systems. Confirm insurer networks and realistic long-drive plans before relocating mid-treatment.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer specialty care early if mid-treatment; book first appointments before peak retirement move chaos. Healthcare access is often a primary relocator criterion in active-adult markets.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Sumter County resources',
    intro:
      'Local official links first; directory listings are independent. Verify FDACS for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Sumter County — official site',
        href: 'https://www.sumtercountyfl.gov/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Bushnell',
        href: 'https://www.cityofbushnellfl.com/',
        external: true,
      },
      {
        label: 'City of Wildwood',
        href: 'https://www.wildwood-fl.gov/',
        external: true,
      },
      {
        label: 'Sumter District Schools',
        href: 'https://www.sumter.k12.fl.us/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (The Villages, Wildwood/Bushnell, Coleman/south, Rural edges) when available. Confirm HOA packets and golf-cart access rules for Villages jobs, I-75 drive assumptions, and heat plans — this is independent Central Florida retirement/growth, not an Orange or Lake rename.',
  lastReviewed: '2026-07-24',
});
