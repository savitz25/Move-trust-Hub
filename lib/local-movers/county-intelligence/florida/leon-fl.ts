import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeFlTier2Pack,
  FL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/florida/fl-tier2-shared';

/**
 * Leon County — Florida Tier 2 (Tallahassee capital independent).
 * Secondary-market contract vs Duval North Florida Tier 1 defaults —
 * government / university cycles, NOT a Jacksonville rename.
 */
export const leonCountyIntelligence: CountyIntelligencePack = finalizeFlTier2Pack({
  countySlug: 'leon',
  hubTitle: 'Leon County Moving Intelligence Hub',
  eyebrow: 'Leon County · Independent capital region · Tallahassee',
  h1: 'Moving in Leon County: Independent Capital Region — Tallahassee, Government & University Cycles',
  heroOpener:
    'Leon County is an independent capital-region hub centered on Tallahassee — not Jacksonville with freer freeways, and not a North Florida river-sprawl script with different labels. Downtown/Capitol stock, Midtown and student multi-family, northeast suburban growth, and rural/south edges form their own housing ladder under inland heat and legislative calendars. Compared with Duval / North Florida Tier 1 density defaults, I-10 freeflow replaces dense Jax river-crossing gridlock, government and FSU/FAMU cycles are first-class demand, and Capital Circle logistics are real. This guide is for people moving in Leon as a secondary market with its own role — not recycled Duval scripts. Not a Jacksonville rename.',
  heroCredibility:
    'Independent capital region · Government / university cycles · I-10 freeflow · FDACS Ch. 507 (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-10 · US-27 · US-90 · Capital Circle · local Tallahassee grid',
  parentCompare: {
    parentLabel: 'Independent capital region (vs Duval North Florida defaults)',
    parentHref: '/local-movers/florida/duval',
    title: 'Compared with Duval County / North Florida Tier 1 defaults',
    intro:
      'Leon is a freestanding capital-region metro on I-10 — not a Jacksonville collar and not a thinner Duval zone dump. Use Duval / North Florida Tier 1 as high-density parent contrast for licensing context and long-haul routing, not as a drop-in template for Tallahassee government and university logistics.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Duval crews fight I-95 / I-10 / bridges and multi-zone river-sprawl pairs. Leon pairs ride I-10, US-27, US-90, Capital Circle, and the local Tallahassee grid with freer mid-day freeflow — downtown/Capitol ↔ NE growth or Midtown ↔ rural south edges still burn portal-to-portal time at peak, but it is not a Jacksonville multi-bridge job. Isolation from Jax means long-haul deadhead across North Florida, not short-hop collar spillover.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Duval mixes urban core, beach towns, and vast suburban sprawl under one large county. Leon’s ladder is downtown/Capitol multi-unit and mid-century stock, Midtown/student housing, NE Tallahassee suburban SFH, and rural/south edges — more government and university turnover, less Jax-scale coastal and multi-bridge density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Leon stages more Capitol-adjacent curb work, student multi-family, and suburban driveway product than Duval river-core elevators alone. HOAs exist in NE growth pockets but are not the sole operating system. Session traffic, campus peaks, and Capital Circle freeflow replace dense downtown multi-bridge dock fights.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Leon quotes often sit below Jacksonville metro rates for comparable square footage when access is simple — legislative and semester peaks, multi-unit long carries, I-10/Capital Circle time, and rural empty miles still push prices up. Expect secondary-market labor rates with capital/university premiums — not Duval core scarcity pricing.',
      },
      {
        title: 'Role difference',
        detail:
          'Leon is an independent capital region with its own employment base (state government, FSU, FAMU, healthcare, education, law) — not a Jacksonville bedroom collar. Treat it as its own market when matching crews and rate cards. Not a Jacksonville rename.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Leon County different',
    intro:
      'Independent capital-region realities — government session cycles, university multi-family, I-10 freeflow, and rural south edges — that change estimates.',
    bullets: [
      {
        title: 'Government and university cycles rewrite demand',
        detail:
          'Legislative session windows, agency relocations, and FSU/FAMU lease ends create inventory spikes that pure civilian suburb calendars miss. Book early around known capital and academic peaks.',
      },
      {
        title: 'Downtown/Capitol vs Midtown/student vs NE growth vs rural south',
        detail:
          'Capitol-adjacent multi-unit, student housing, NE suburban HOA tracts, and rural edges do not share truck access or clock time. Name both pockets on the estimate.',
      },
      {
        title: 'I-10 freeflow is not Jacksonville gridlock — still a line item',
        detail:
          'Cross-town pairs freer than Duval still burn billable time at school, session, and commute peaks. Ask whether quotes are portal-to-portal.',
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
    'Leon zones: Downtown/Capitol, Midtown/student, NE growth & rural/south edges',
  zonesIntro:
    'Four sharp products — not a six-zone dump. Downtown/Capitol, Midtown/student, NE growth, and rural/south edges price and stage differently under the same capital and university calendar.',
  zones: [
    {
      id: 'downtown-capitol',
      name: 'Downtown Tallahassee & Capitol District',
      shortName: 'Downtown / Capitol',
      neighborhoods: [
        'Downtown Tallahassee',
        'Capitol District edges',
        'Central multi-family clusters',
        'US-27 / US-90 core corridors',
        'Established mid-century belts near core',
      ],
      housingTypes:
        'Multi-unit buildings, mid-century SFH, redevelopment product, denser curb staging, some elevator stock',
      challenges: [
        'Session and event traffic near Capitol approaches',
        'Tighter street parking and multi-unit long carries',
        'Elevator/COI rules in some multi-unit buildings',
        'Heat on asphalt staging without shade',
      ],
      moverTips:
        'Confirm building rules for multi-unit. Avoid peak session and event windows when flexible. Weekday mornings beat heat and commute peaks. Share parking constraints on denser blocks.',
      cityKeywords: [
        'tallahassee',
        'downtown tallahassee',
        'capitol',
        'tallahassee fl',
        'capitol district',
      ],
    },
    {
      id: 'midtown-student',
      name: 'Midtown, Student Corridors & University-Adjacent',
      shortName: 'Midtown / student',
      neighborhoods: [
        'Midtown Tallahassee',
        'FSU-adjacent multi-family',
        'FAMU-adjacent corridors',
        'Student housing belts',
        'Central arterial multi-unit',
      ],
      housingTypes:
        'Student apartments and elevators, multi-family, mid-density SFH, lease-churn product, mixed older access',
      challenges: [
        'Semester move-in/out peaks fill capacity first',
        'Elevator/COI and end-of-month lease churn',
        'Limited curb staging near campus corridors',
        'Partial loads and short-notice student inventories',
      ],
      moverTips:
        'Collect apartment COI and elevator reservations early. Avoid peak semester Saturdays when flexible. Inventory student partial loads carefully. Buffer portal time around campus traffic.',
      cityKeywords: [
        'midtown tallahassee',
        'fsu',
        'famu',
        'florida state',
        'student housing tallahassee',
      ],
    },
    {
      id: 'ne-growth',
      name: 'Northeast Tallahassee Growth',
      shortName: 'NE growth',
      neighborhoods: [
        'Northeast Tallahassee suburban tracts',
        'Capital Circle NE corridors',
        'Family HOA SFH pockets',
        'Newer multi-family growth',
        'I-10 NE approach edges',
      ],
      housingTypes:
        'Suburban SFH, planned HOA villages, new-construction tracts, multi-family growth, family-volume stock',
      challenges: [
        'HOA COI and approved hours in some villages',
        'Cul-de-sac and truck-length constraints',
        'Capital Circle / I-10 peak congestion',
        'Family-volume inventory on summer weekends',
      ],
      moverTips:
        'Send HOA packets when applicable. Mid-week early starts beat heat and school traffic. Inventory family-volume SFH carefully. Clarify NE growth ↔ downtown drive assumptions.',
      cityKeywords: [
        'northeast tallahassee',
        'ne tallahassee',
        'killearn',
        'capital circle',
        'tallahassee growth',
      ],
    },
    {
      id: 'rural-south-edges',
      name: 'Rural & South Edges',
      shortName: 'Rural / south',
      neighborhoods: [
        'South Leon rural edges',
        'Woodville edges',
        'Crawfordville Road corridors',
        'Larger-lot and agricultural-adjacent pockets',
        'South and east connector stock',
      ],
      housingTypes:
        'Rural-edge SFH, larger-lot properties, manufactured homes, limited multi-family, agricultural-adjacent product',
      challenges: [
        'Long empty-mile time from core staging',
        'Private roads, gates, and soft approaches after rain',
        'Fewer high-rise issues — more distance and access photos needed',
        'Weather-sensitive unpaved approaches',
      ],
      moverTips:
        'Share driveway, gate, and turnaround photos for rural parcels. Confirm whether far-south pairs still use a pure local rate card. Build buffer for two-lane corridor delays.',
      cityKeywords: [
        'woodville',
        'woodville fl',
        'south tallahassee',
        'leon rural',
        'crawfordville road',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Leon County',
    intro:
      'Same square footage prices differently by multi-unit access, session/semester peaks, Capital Circle/I-10 portal time, and whether the job stays core or runs rural south.',
    drivers: [
      {
        title: 'Government & university peak labor',
        detail:
          'Session windows, agency moves, and semester multi-family churn add coordination and capacity premiums versus quiet mid-month driveway SFH.',
      },
      {
        title: 'I-10 / US-27 / US-90 / Capital Circle portal time',
        detail:
          'Downtown ↔ NE growth or Midtown ↔ rural south pairs can burn more clock than map miles suggest at peak — freer than Duval, still billable.',
      },
      {
        title: 'Multi-unit elevator & long-carry labor',
        detail:
          'Capitol-adjacent and student apartments add elevator waits, parking scarcity, and stair carries suburban SFH quotes miss.',
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
    title: 'Seasonal, capital & university calendar intelligence',
    intro:
      'Leon peaks follow legislative sessions, FSU/FAMU calendars, family school moves, and inland heat — not Jacksonville lease density alone.',
    items: [
      {
        title: 'Legislative session & capital relocation windows',
        detail:
          'Session periods and agency housing changes fill crews near downtown multi-family first. Book as soon as housing dates allow.',
      },
      {
        title: 'University move-in / move-out peaks',
        detail:
          'Semester starts and summer lease turnovers fill multi-family capacity near FSU/FAMU corridors. Avoid peak Saturdays when flexible.',
      },
      {
        title: 'Summer heat peak: roughly June – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon moves on open lots are high risk.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start outside session/semester crush',
        detail:
          'Still plan around apartment elevator windows when applicable. Dawn starts win when heat and Capital Circle peaks are the real constraints.',
      },
    ],
  },
  specialized: [
    {
      id: 'government-university-cycles',
      title: 'Government & university cycle logistics',
      intro:
        'Leon’s defining volume problem is often capital-session and FSU/FAMU multi-family churn — not Jacksonville river-core elevators alone.',
      bullets: [
        'Book as soon as housing, lease, or agency dates allow; peak capacity disappears first near downtown and student corridors.',
        'Collect apartment COI and elevator reservations before the survey is final.',
        'Inventory carefully for partial loads, storage, and short-notice capital/student inventories.',
        'Buffer portal time around session traffic, campus peaks, and Capital Circle congestion.',
      ],
    },
    {
      id: 'capital-region-not-jax',
      title: 'Capital-region logistics without Jacksonville rename assumptions',
      intro:
        'I-10, US-27, US-90, and Capital Circle freeflow is real — but Leon is not a thinner Duval script. Survey the actual pocket and corridor pair.',
      bullets: [
        'Name both pockets on every estimate (e.g. Midtown → NE growth); “Leon local” hides portal time.',
        'Price peak I-10 / Capital Circle / US-27 pairs honestly — map miles understate school and session congestion.',
        'Clarify whether long locals toward rural/south still use a pure local rate card.',
        'Do not import Jacksonville rate cards without naming both cities and access type — this is not a Jacksonville rename.',
      ],
    },
    {
      id: 'inland-heat-capital-circle',
      title: 'Inland heat & Capital Circle work windows',
      intro:
        'Leon’s defining climate and corridor constraints are open-lot inland heat plus Capital Circle / I-10 freeflow that still bills at peak.',
      bullets: [
        'Prefer morning starts; treat mid-afternoon loads as higher risk on growth lots and campus asphalt.',
        'Plan water, rotation, and realistic crew endurance — heat is a labor and quality issue, not just comfort.',
        'Price NE growth ↔ downtown pairs as portal-to-portal jobs on Capital Circle.',
        'Build flexible language for weather delays on outdoor packing in peak summer.',
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
          'Leon County Schools covers most public K–12 students. Match every listing address to the correct boundary; growth and rural pockets differ. University families should confirm academic calendars separately.',
        bullets: [
          {
            title: 'Zone before marketing name',
            detail:
              'Downtown, Midtown, NE growth, and rural south brands span multiple feeders. Verify with official boundary tools and Florida DOE data.',
          },
          {
            title: 'Growth vs campus calendars',
            detail:
              'Family suburban calendars and student multi-family cycles collide in peak windows. Tour campuses when possible for K–12; plan university housing separately.',
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
              'Tallahassee Memorial HealthCare, HCA Florida Capital Hospital, and other campuses serve Leon. Map ER drive times from NE growth and rural/south edges at peak traffic.',
          },
          {
            title: 'Specialty & regional reality',
            detail:
              'Some specialties may require travel toward larger metros. Confirm insurer networks and realistic long-drive plans before relocating mid-treatment.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Leon County resources',
    intro:
      'Local official links first; directory listings are independent. Verify FDACS for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Leon County — official site',
        href: 'https://www.leoncountyfl.gov/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Tallahassee',
        href: 'https://www.talgov.com/',
        external: true,
      },
      {
        label: 'Leon County Schools',
        href: 'https://www.leonschools.net/',
        external: true,
      },
      {
        label: 'FL511 — traffic conditions',
        href: 'https://fl511.com/',
        note: 'I-10, Capital Circle, US-27 before load windows',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Downtown/Capitol, Midtown/student, NE growth, rural/south) when available. Confirm session and semester timing, multi-unit packets, and honest I-10/Capital Circle drive assumptions — this is an independent capital region, not a Jacksonville rename.',
  lastReviewed: '2026-07-24',
});
