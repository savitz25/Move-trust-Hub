import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeFlTier2Pack,
  FL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/florida/fl-tier2-shared';

/**
 * Bay County — Florida Tier 2 (Panama City / PCB — central Panhandle independent).
 * Independent Gulf Panhandle secondary market vs Escambia / Duval density defaults —
 * beach tourism + Tyndall-adjacent + coastal rebuild logistics, NOT a Pensacola or Jax rename.
 */
export const bayCountyIntelligence: CountyIntelligencePack = finalizeFlTier2Pack({
  countySlug: 'bay',
  hubTitle: 'Bay County Moving Intelligence Hub',
  eyebrow: 'Bay County · Central Gulf Panhandle independent · Panama City / PCB',
  h1: 'Moving in Bay County: Independent Central Panhandle — Panama City, PCB & Tyndall-Adjacent Logistics',
  heroOpener:
    'Bay County is an independent central Gulf Panhandle hub centered on Panama City and Panama City Beach — not Pensacola with different beach labels, and not a North Florida river-sprawl script with freer freeways. Panama City core stock, PCB tourism and coastal product, Lynn Haven and north residential growth, and Callaway/east mainland edges form their own housing ladder under Gulf heat, humidity, and post-storm rebuild windows. Compared with western Panhandle / North Florida density defaults, US-98 beach approaches and US-231 inland connectors replace I-10 Navy-core or Duval multi-bridge gridlock, beach tourism peaks are first-class demand, and coastal rebuild and humidity logistics are real. This guide is for people moving in Bay as a secondary market with its own role — not recycled Escambia or Duval scripts.',
  heroCredibility:
    'Independent central Panhandle · PCB tourism · Tyndall-adjacent · FDACS Ch. 507 (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-98 · US-231 · FL-79 · FL-77 · Panama City Beach approaches',
  parentCompare: {
    parentLabel: 'Independent Gulf Panhandle (vs Escambia / Duval defaults)',
    parentHref: '/local-movers/florida/escambia',
    title: 'Compared with western Panhandle / North Florida density defaults',
    intro:
      'Bay is a freestanding central Gulf Panhandle market on Panama City Bay and the PCB strip — not an Escambia rename and not a thinner Duval zone dump. Use Escambia / western Panhandle and Duval / North Florida as parent contrast for licensing context and long-haul routing, not as drop-in templates for Panama City beach tourism and coastal rebuild logistics.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Escambia crews stage I-10 / I-110 / US-98 Navy and beach pairs; Duval crews fight multi-bridge river sprawl. Bay pairs ride US-98, US-231, FL-79, FL-77, and PCB approaches with freer mid-day freeflow than Jax — Panama City core ↔ PCB or Lynn Haven ↔ Callaway still burn portal-to-portal time at tourist and commute peaks. Isolation from Pensacola and Jacksonville means long-haul deadhead across the Panhandle, not short-hop collar spillover.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Escambia mixes Pensacola core, Navy-adjacent multi-family, and Perdido beach product. Bay’s ladder is Panama City core multi-unit and mid-century stock, PCB tourism condos and elevated coastal SFH, Lynn Haven/north family tracts, and Callaway/east mainland edges — more beach-tourism elevator volume and post-storm rebuild product, less Navy PCS density than Pensacola.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Bay stages more beach-strip elevators, tourist-peak curb scarcity, and humidity/rebuild access work than pure inland Escambia driveway jobs. HOAs exist in planned north pockets but are not the sole operating system. Sand protection, limited PCB staging, and Tyndall-area traffic replace Duval river-core curb fights.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Bay quotes often sit at secondary-Panhandle rates for simple mainland driveway access — beach-bridge time, elevator soft costs, tourist peaks, humidity labor, and rebuild-site access still push prices up. Expect tourism and coastal premiums — not Duval core scarcity or Pensacola Navy PCS crush alone.',
      },
      {
        title: 'Role difference',
        detail:
          'Bay is an independent central Gulf Panhandle hub with its own employment base (tourism, healthcare, Tyndall-adjacent defense, logistics, retail) — not a Pensacola bedroom collar and not a Jacksonville rename. Treat it as its own market when matching crews and rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Bay County different',
    intro:
      'Independent central Panhandle realities — PCB tourism peaks, Tyndall-adjacent cycles, coastal rebuild/humidity logistics, and US-98 freeflow — that change estimates.',
    bullets: [
      {
        title: 'PCB tourism and beach elevators rewrite summer calendars',
        detail:
          'Panama City Beach condos, short-term rental turnover, and tourist parking scarcity create peak-season capacity crunches that pure mainland suburb calendars miss. Book elevators early; avoid peak weekend beach loads when flexible.',
      },
      {
        title: 'Panama City core vs PCB vs Lynn Haven vs Callaway are different products',
        detail:
          'Core multi-unit, beach tourism stock, north family tracts, and east mainland edges do not share truck access or clock time. Name both pockets on the estimate.',
      },
      {
        title: 'Tyndall-adjacent and military turnover where accurate',
        detail:
          'Tyndall AFB–adjacent households create PCS and multi-family turnover that civilian-only calendars underweight. Book early around known military windows without inventing base access the crew cannot use.',
      },
      {
        title: 'Coastal rebuild, humidity, and storm season are operational',
        detail:
          'Post-storm rebuild sites, salt air, and hurricane windows compress outdoor hours and require flexible coastal contracts. Prefer early starts; document weather reschedule policies.',
      },
      FL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading:
    'Bay zones: Panama City core, Panama City Beach, Lynn Haven/north & Callaway/east',
  zonesIntro:
    'Four sharp products — not a six-zone dump. Panama City core, Panama City Beach, Lynn Haven/north, and Callaway/east price and stage differently under the same Gulf Coast calendar.',
  zones: [
    {
      id: 'panama-city-core',
      name: 'Panama City Core & Established Grid',
      shortName: 'Panama City core',
      neighborhoods: [
        'Downtown Panama City edges',
        'Central multi-family clusters',
        'Established mid-century neighborhoods',
        'US-98 / US-231 core corridors',
        'Hospital-adjacent residential',
      ],
      housingTypes:
        'Older SFH, multi-unit buildings, mid-century stock, some redevelopment and rebuild product',
      challenges: [
        'Tighter street parking and multi-unit long carries',
        'Elevator/COI rules in some multi-unit buildings',
        'US-98 / arterial approaches into the core',
        'Heat and humidity on asphalt staging without shade',
      ],
      moverTips:
        'Confirm building rules for multi-unit. Weekday mornings beat heat and commute peaks. Inventory stairs carefully in older multi-story stock. Share parking constraints on denser blocks.',
      cityKeywords: [
        'panama city',
        'downtown panama city',
        'panama city core',
        'bay county',
      ],
    },
    {
      id: 'panama-city-beach',
      name: 'Panama City Beach & Gulf Approaches',
      shortName: 'PCB',
      neighborhoods: [
        'Panama City Beach strip',
        'Coastal condo towers and mid-rises',
        'US-98 beach corridors',
        'Elevated coastal SFH pockets',
        'Tourism and short-term rental belts',
      ],
      housingTypes:
        'Beach condos, elevated coastal SFH, multi-family near water, tourism-oriented product',
      challenges: [
        'Elevator/COI windows and limited beach staging',
        'Tourist peak parking scarcity and curb fights',
        'Sand protection and storm exposure',
        'Seasonal short-term rental turnover volume',
      ],
      moverTips:
        'Reserve elevators early. Budget sand protection. Prefer non-peak weekday loads on the beach strip when flexible. Confirm building rules and truck limits before dispatch.',
      cityKeywords: [
        'panama city beach',
        'pcb',
        'pcb fl',
        'beach bay county',
        'us-98 beach',
      ],
    },
    {
      id: 'lynn-haven-north',
      name: 'Lynn Haven & North Residential',
      shortName: 'Lynn Haven / north',
      neighborhoods: [
        'Lynn Haven',
        'North Bay residential growth',
        'FL-77 / north arterial corridors',
        'Family SFH tracts',
        'Newer planned pockets',
      ],
      housingTypes:
        'Suburban SFH, modest HOA tracts, multi-family growth, family-oriented product',
      challenges: [
        'HOA COI and approved hours in some planned pockets',
        'FL-77 / US-231 peak timing into north growth',
        'Family-volume inventory on summer weekends',
        'Different access profile than PCB elevators',
      ],
      moverTips:
        'Send HOA packets when applicable. Mid-week early starts beat heat and school traffic. Inventory family-volume SFH carefully. Clarify north ↔ PCB or core drive assumptions.',
      cityKeywords: [
        'lynn haven',
        'north panama city',
        'lynn haven fl',
        'fl-77',
        'north bay',
      ],
    },
    {
      id: 'callaway-east',
      name: 'Callaway & East Mainland Edges',
      shortName: 'Callaway / east',
      neighborhoods: [
        'Callaway',
        'East Bay mainland corridors',
        'US-98 east approaches',
        'Tyndall-adjacent residential influence',
        'Working-community and east-edge stock',
      ],
      housingTypes:
        'Mainland SFH, modest multi-family, working-community product, some military-adjacent housing',
      challenges: [
        'Longer empty miles from PCB staging',
        'US-98 east peak timing',
        'Military-adjacent turnover where applicable',
        'Thinner same-day crew density than beach strip',
      ],
      moverTips:
        'Treat Callaway/east pairs as long-local jobs when staging from PCB. Share driveway constraints. Prefer mid-week starts. Ask whether pure local rate cards still apply for east edges.',
      cityKeywords: [
        'callaway',
        'callaway fl',
        'east panama city',
        'tyndall',
        'east bay',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Bay County',
    intro:
      'Same square footage prices differently by beach elevators, tourist peaks, humidity/rebuild access, and whether the job stays mainland or runs PCB long-local.',
    drivers: [
      {
        title: 'PCB beach elevator & tourism soft costs',
        detail:
          'Elevator reservations, COI, sand protection, and tourist-peak curb scarcity add labor versus pure mainland driveway jobs.',
      },
      {
        title: 'US-98 / US-231 / FL-77 portal time',
        detail:
          'Core ↔ PCB or Lynn Haven ↔ Callaway pairs can burn more clock than map miles suggest at peak — freer than Duval, still billable.',
      },
      {
        title: 'Humidity, rebuild sites & storm flexibility',
        detail:
          'Coastal humidity, rebuild-site access, and hurricane windows compress outdoor hours and can require multi-day or contingent pricing.',
      },
      {
        title: 'Military-adjacent peak capacity',
        detail:
          'Tyndall-adjacent multi-family turnover can tighten crews around known PCS windows — book early when orders and housing dates firm.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$400–$1,150+',
        note: 'Higher with elevators, tourist peaks, or beach-strip windows',
      },
      {
        label: '2–3BR house / apartment',
        value: '$1,200–$3,500+',
        note: 'Cross-zone and multi-unit access trend up',
      },
      {
        label: '3–4+ BR (cross-zone / PCB or east edge)',
        value: '$2,000–$5,800+',
        note: 'Beach elevators, tourism peaks, and long-local pairs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, tourism & storm calendar intelligence',
    intro:
      'Bay peaks follow PCB tourism, military-adjacent cycles, Gulf summer heat, and hurricane season — not Jacksonville lease density alone.',
    items: [
      {
        title: 'Beach tourism peak: roughly spring break through Labor Day',
        detail:
          'PCB elevators and curb space fill first. Book early; prefer weekday non-event loads on the beach strip when flexible.',
      },
      {
        title: 'Military-adjacent PCS windows',
        detail:
          'Where Tyndall-adjacent households move, peak PCS seasons tighten multi-family capacity. Book as soon as orders and housing dates allow.',
      },
      {
        title: 'Hurricane season (June–November)',
        detail:
          'Build flexible date language for coastal and low-lying addresses. Confirm storage and reschedule policies before deposit.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start outside tourism crush',
        detail:
          'Still plan around apartment elevator windows when applicable. Dawn starts win when heat and beach arterials are the real constraints.',
      },
    ],
  },
  specialized: [
    {
      id: 'beach-tourism-pcb',
      title: 'Beach tourism & Panama City Beach logistics',
      intro:
        'Bay’s defining coastal product is PCB tourism elevators and US-98 beach approaches — not Pensacola Navy multi-family alone.',
      bullets: [
        'Reserve elevators early; get COI naming and protection requirements in writing.',
        'Budget sand protection and limited staging plans for beach-strip blocks.',
        'Avoid peak tourist weekend loads on PCB when flexible; price curb scarcity honestly.',
        'Document weather reschedule and storage policies before deposit in hurricane season.',
      ],
    },
    {
      id: 'military-tyndall-adjacent',
      title: 'Military-adjacent (Tyndall) logistics',
      intro:
        'Tyndall-adjacent demand is real for multi-family turnover and PCS calendars — survey the actual pocket without inventing base-gate access crews cannot use.',
      bullets: [
        'Book as soon as orders, lease, or housing dates allow around known military windows.',
        'Collect apartment COI and elevator reservations before the survey is final.',
        'Inventory carefully for partial loads, storage, and short-notice PCS inventories.',
        'Buffer portal time around base-area traffic and shift peaks where applicable.',
      ],
    },
    {
      id: 'coastal-rebuild-humidity',
      title: 'Coastal rebuild & humidity logistics',
      intro:
        'Post-storm rebuild sites, salt air, and Gulf humidity change packing labor and vehicle risk versus pure inland dry-driveway jobs.',
      bullets: [
        'Share rebuild-site photos, driveway condition, and incomplete-access notes early.',
        'Budget humidity-safe packing and protection for coastal and elevated stock.',
        'Confirm flood maps and storm-season flexibility before deposit on waterfront parcels.',
        'Do not import Escambia or Duval rate cards without naming both cities and access type — this is not a western Panhandle or Jax rename.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Independent central Panhandle value, beach living, and Tyndall-adjacent calendars are different bets — validate schools and healthcare by pocket, then plan for tourism and storm seasons.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Bay District Schools covers most public K–12 students. Match every listing address to the correct boundary; beach brands and mainland feeders differ.',
        bullets: [
          {
            title: 'Zone before marketing name',
            detail:
              'Panama City, PCB, Lynn Haven, and Callaway brands span multiple feeders. Verify with official boundary tools and Florida DOE data.',
          },
          {
            title: 'Military family considerations',
            detail:
              'Tyndall-adjacent PCS mid-year moves are common. Coordinate school enrollment early and ask about military family support processes at the district.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites should lead; third-party rankings are secondary. Tour campuses when possible.',
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
              'Ascension Sacred Heart Bay, HCA Florida Gulf Coast Hospital, and other campuses serve Bay. Map ER drive times from PCB, Lynn Haven, and Callaway at peak tourist traffic.',
          },
          {
            title: 'Military & specialty reality',
            detail:
              'Military families may use base medical resources plus civilian systems. Some specialties may require travel toward larger metros — confirm insurer networks before relocating mid-treatment.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if mid-treatment; book first appointments before peak tourism move chaos.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Bay County resources',
    intro:
      'Local official links first; directory listings are independent. Verify FDACS for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Bay County — official site',
        href: 'https://www.baycountyfl.gov/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Panama City',
        href: 'https://www.panamacity.gov/',
        external: true,
      },
      {
        label: 'City of Panama City Beach',
        href: 'https://www.pcbfl.gov/',
        external: true,
      },
      {
        label: 'Bay District Schools',
        href: 'https://www.bay.k12.fl.us/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Panama City core, PCB, Lynn Haven/north, Callaway/east) when available. Confirm beach elevator windows, tourism calendars, and honest US-98 drive assumptions — this is an independent central Panhandle hub, not an Escambia or Duval rename.',
  lastReviewed: '2026-07-24',
});
