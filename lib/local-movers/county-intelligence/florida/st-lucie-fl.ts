import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeFlTier2Pack,
  FL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/florida/fl-tier2-shared';

/**
 * St. Lucie County — Florida Tier 2 (Treasure Coast growth).
 * Parent: Palm Beach County. Port St. Lucie growth north of PBC —
 * NOT a Palm Beach rename or coastal condo script copy.
 */
export const stLucieCountyIntelligence: CountyIntelligencePack = finalizeFlTier2Pack({
  countySlug: 'st-lucie',
  hubTitle: 'St. Lucie County Moving Intelligence Hub',
  eyebrow: 'St. Lucie · Treasure Coast growth · Port St. Lucie',
  h1: 'Moving in St. Lucie County: Treasure Coast Growth — Port St. Lucie, Fort Pierce & I-95 Freeflow',
  heroOpener:
    'St. Lucie County is the Treasure Coast growth market north of Palm Beach — Port St. Lucie core and western expansion, Fort Pierce seat and coastal edges, Tradition and west-growth villages, and A1A / Intracoastal approaches that freer I-95 freeflow still cannot turn into a short Palm Beach dock job. This is not West Palm high-rises, not Boca HOA density, and not a renamed Palm Beach pack. North-of-PBC suburban growth, Turnpike / I-95 / US-1 timing, and coastal-edge access define estimates. This guide is for people actually moving in St. Lucie as a Treasure Coast growth market — not a recycled Palm Beach core pack.',
  heroCredibility:
    'Treasure Coast growth · Port St. Lucie · I-95 freeflow · FDACS Ch. 507 (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-95 · Florida Turnpike · US-1 · FL-70 · A1A approaches',
  parentCompare: {
    parentLabel: 'Palm Beach County',
    parentHref: '/local-movers/florida/palm-beach',
    title: 'Compared with Palm Beach County',
    intro:
      'St. Lucie is Treasure Coast growth north of Palm Beach — Port St. Lucie, Fort Pierce, Tradition/west growth, and coastal edges — not a drop-in template for West Palm towers, Boca HOA density, or Palm Beach Island logistics. Use Palm Beach as the dense South Florida Tier 1 parent contrast.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Palm Beach crews fight I-95 / Florida Turnpike multi-zone congestion, coastal elevator corridors, and snowbird peaks into dense condo cores. St. Lucie pairs ride I-95, Florida Turnpike, US-1, FL-70, and A1A approaches with freer mid-day freeflow than PBC core — Port St. Lucie ↔ Fort Pierce or Tradition ↔ coastal still burns portal-to-portal time at school and commute peaks. It is not a short West Palm dock job.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Palm Beach mixes high-rise condos, gated luxury, and dense coastal multi-family. St. Lucie’s ladder is Port St. Lucie suburban SFH and multi-family growth, Fort Pierce older and coastal stock, Tradition/west master-planned villages, and coastal-edge product — more driveway HOA work, less vertical elevator density than PBC cores.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Palm Beach core needs elevator COI and beach-tower windows. St. Lucie defaults to growth-village HOA packets, longer west arterials into Tradition, and coastal-edge staging that is real but not Palm Beach Island intensity. Gate lists and truck limits concentrate in planned west growth more than county-wide towers.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local St. Lucie quotes often sit below Palm Beach rates for comparable square footage when access is simple — HOA soft costs, I-95 peak time, coastal-edge labor, and west-growth empty miles still push prices up. Expect secondary-growth friction, not Boca tower scarcity pricing.',
      },
      {
        title: 'Role difference',
        detail:
          'St. Lucie is the Treasure Coast’s growth engine north of PBC — Port St. Lucie volume, Fort Pierce seat logistics, and western expansion — not Palm Beach’s coastal job and luxury core. Treat it as its own market when matching crews and rate cards. Not a Palm Beach rename.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in St. Lucie County different',
    intro:
      'Treasure Coast growth realities — Port St. Lucie volume, I-95 freeflow with real peaks, Tradition west growth, and coastal edges — that change estimates.',
    bullets: [
      {
        title: 'Port St. Lucie core is a different product than Fort Pierce or Tradition',
        detail:
          'A PSL suburban tract, a Fort Pierce coastal or older-grid home, a Tradition planned village, and an A1A-edge condo do not share gate rules, truck access, or inventory profiles. Name both origin and destination communities on every estimate.',
      },
      {
        title: 'I-95 freeflow is not Palm Beach gridlock — still a line item',
        detail:
          'PSL ↔ Fort Pierce or Tradition ↔ coastal pairs freer than dense PBC still burn billable time at school and commute peaks. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'West growth vs coastal edges stack differently',
        detail:
          'Tradition and west-growth HOAs bring gate lists and new-construction quirks; coastal edges add sand, elevators, and A1A timing. Share approach photos early.',
      },
      {
        title: 'Heat and storm season are operational',
        detail:
          'Summer heat on open growth streets and hurricane-window flexibility matter as much as in PBC — sometimes more on unfinished west tracts without canopy.',
      },
      FL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading:
    'St. Lucie zones: Port St. Lucie core, Fort Pierce, Tradition/west growth & coastal edges',
  zonesIntro:
    'Four sharp products — not a six-zone dump. Port St. Lucie core/growth, Fort Pierce, Tradition/west growth, and coastal edges price and stage differently under the same Treasure Coast market.',
  zones: [
    {
      id: 'port-st-lucie-core',
      name: 'Port St. Lucie Core & Established Growth',
      shortName: 'Port St. Lucie',
      neighborhoods: [
        'Port St. Lucie core',
        'St. Lucie West edges',
        'Midtown / PGA Village influence',
        'US-1 / Crosstown corridors',
        'Established PSL suburban tracts',
      ],
      housingTypes:
        'Suburban SFH, HOA communities, multi-family, townhomes, established planned villages',
      challenges: [
        'HOA COI and approved hours in many tracts',
        'I-95 / US-1 peak congestion',
        'High family-move volume on summer weekends',
        'Long carries in large village layouts',
      ],
      moverTips:
        'Send HOA packets with the estimate. Mid-week early starts beat heat and school traffic. Inventory family-volume SFH carefully. Clarify PSL ↔ Fort Pierce or Tradition drive assumptions.',
      cityKeywords: [
        'port st lucie',
        'port saint lucie',
        'st lucie west',
        'psl',
        'crosstown',
      ],
    },
    {
      id: 'fort-pierce',
      name: 'Fort Pierce Seat & Established Stock',
      shortName: 'Fort Pierce',
      neighborhoods: [
        'Fort Pierce',
        'Downtown / historic edges',
        'Fort Pierce mainland suburbs',
        'US-1 commercial corridors',
        'County-seat residential stock',
      ],
      housingTypes:
        'Older SFH, historic stock, multi-family, modest suburban tracts, working-community product',
      challenges: [
        'Tighter older streets and limited staging',
        'Different access profile than west PSL growth HOAs',
        'I-95 / US-1 approaches at peak',
        'Mix of elevator and non-elevator multi-unit',
      ],
      moverTips:
        'Survey curb and driveway access on older lots. Do not assume Tradition HOA playbooks apply. Prefer weekday mornings; share parking constraints on denser blocks.',
      cityKeywords: [
        'fort pierce',
        'ft pierce',
        'downtown fort pierce',
        'st lucie seat',
      ],
    },
    {
      id: 'tradition-west-growth',
      name: 'Tradition & West Growth Corridors',
      shortName: 'Tradition / west',
      neighborhoods: [
        'Tradition',
        'Western Port St. Lucie growth',
        'FL-70 / west arterial corridors',
        'Newer master-planned villages',
        'Active new-construction edges',
      ],
      housingTypes:
        'Master-planned SFH, HOA villages, townhomes, new multi-family, incomplete-street phases',
      challenges: [
        'HOA gate lists, COI, and approved hours as default',
        'Incomplete roads and temporary access on new streets',
        'Longer empty miles from coastal or Fort Pierce staging',
        'FL-70 / I-95 peak timing into west growth',
      ],
      moverTips:
        'Reconfirm street access the week of the move in active construction. Collect gate lists early. Book peak summer Saturdays early. Treat Tradition ↔ Fort Pierce as a long local with arterial timing.',
      cityKeywords: [
        'tradition',
        'west port st lucie',
        'fl-70',
        'tradition fl',
        'west growth st lucie',
      ],
    },
    {
      id: 'coastal-edges',
      name: 'Coastal Edges & A1A Approaches',
      shortName: 'Coastal edges',
      neighborhoods: [
        'Hutchinson Island / coastal influence',
        'A1A approach corridors',
        'Intracoastal-adjacent multi-family',
        'Beachside and barrier-edge pockets',
        'Coastal condo and elevated stock',
      ],
      housingTypes:
        'Coastal condos, elevated SFH, multi-family near water, snowbird-oriented product',
      challenges: [
        'Elevator/COI windows and limited staging',
        'A1A / bridge approach timing',
        'Sand protection and storm exposure',
        'Seasonal tourist and snowbird parking scarcity',
      ],
      moverTips:
        'Reserve elevators early. Budget sand protection. Prefer non-peak weekend loads on A1A when flexible. Confirm flood and building rules before dispatch.',
      cityKeywords: [
        'hutchinson island',
        'a1a st lucie',
        'fort pierce beach',
        'coastal st lucie',
        'intracoastal',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside St. Lucie County',
    intro:
      'Same square footage prices differently by growth HOA soft costs, I-95 portal time, and whether the job is PSL suburban stock or coastal/west long-local.',
    drivers: [
      {
        title: 'HOA soft costs in PSL and Tradition growth',
        detail:
          'COI, approved hours, and gate coordination in planned villages add paperwork and can force weekday-only windows.',
      },
      {
        title: 'I-95 / Turnpike / US-1 corridor portal time',
        detail:
          'PSL ↔ Fort Pierce or Tradition ↔ coastal pairs burn more portal-to-portal time than map miles suggest at peak — freer than PBC core, still billable.',
      },
      {
        title: 'Coastal-edge & new-construction access',
        detail:
          'Elevators, sand protection, incomplete west streets, and longer empty miles add labor and vehicle risk versus pure dry driveway jobs.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$450–$1,200+',
        note: 'Higher with elevators, HOA soft costs, or peak corridor windows',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,500–$3,700+',
        note: 'Tradition/PSL HOA soft costs and I-95 hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / coastal or west growth)',
        value: '$2,300–$6,000+',
        note: 'Long-local, coastal elevator, and multi-HOA jobs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, snowbird & heat calendar intelligence',
    intro:
      'St. Lucie peaks follow family growth closings, milder snowbird winter demand than PBC towers, summer heat, and hurricane season.',
    items: [
      {
        title: 'Summer heat & family peak: roughly June – August',
        detail:
          'Plan early-morning loads and heat-safe packing. Growth-village Saturdays fill first — book 2–4 weeks ahead.',
      },
      {
        title: 'Winter snowbird-adjacent demand',
        detail:
          'Coastal multi-family and some planned communities see higher winter turnover — still quieter than Palm Beach towers, but not zero. Book elevators early.',
      },
      {
        title: 'Hurricane season (June–November)',
        detail:
          'Build flexible date language for coastal and low-lying addresses. Confirm storage and reschedule policies before deposit.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Still plan around HOA weekday windows when applicable. Early starts beat heat and I-95 peaks.',
      },
    ],
  },
  specialized: [
    {
      id: 'north-of-pbc-growth',
      title: 'North-of-PBC growth HOA & Port St. Lucie logistics',
      intro:
        'St. Lucie’s signature volume product is Port St. Lucie and Tradition planned-village access — not Palm Beach tower elevators.',
      bullets: [
        'Send HOA management packets, COI requirements, and gate lists with the estimate.',
        'Reconfirm street access the week of the move in active Tradition/west construction.',
        'Confirm approved move hours and truck-length limits before booking Saturday crews.',
        'Inventory family-volume SFH carefully; share driveway and cul-de-sac constraints.',
      ],
    },
    {
      id: 'i95-freeflow',
      title: 'I-95 freeflow & Treasure Coast corridor timing',
      intro:
        'I-95, Florida Turnpike, US-1, FL-70, and A1A approaches turn “local” St. Lucie pairs into corridor-timed jobs.',
      bullets: [
        'Price portal-to-portal time honestly for PSL ↔ Fort Pierce and Tradition ↔ coastal pairs.',
        'Build buffer for school and commute peaks on I-95 and US-1.',
        'Note FL-70 west-growth traffic and incomplete-road delays.',
        'Ask whether cross-zone pairs still use a pure local rate card or a long-local schedule.',
      ],
    },
    {
      id: 'not-palm-beach-rename',
      title: 'Coastal edges without Palm Beach rename assumptions',
      intro:
        'Coastal and A1A product is real — but St. Lucie is not a thinner West Palm or Boca script. Survey the actual building and approach.',
      bullets: [
        'Reserve elevators and get COI naming in writing for coastal multi-unit.',
        'Budget sand protection and limited staging plans for A1A-edge blocks.',
        'Do not import Palm Beach Island rate cards without naming both cities and access type.',
        'Confirm flood maps and storm-season flexibility before deposit on waterfront parcels.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Treasure Coast growth value, Port St. Lucie suburbs, and coastal living are different bets — validate schools and healthcare by pocket, then plan for heat and HOA calendars.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'St. Lucie Public Schools covers most public K–12 students. Growth areas can see enrollment pressure as new tracts open. Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'Zone before marketing name',
            detail:
              'Port St. Lucie, Tradition, and Fort Pierce brands span multiple feeders. Verify with official boundary tools — not community marketing alone.',
          },
          {
            title: 'Growth-area capacity',
            detail:
              'West growth and Tradition corridors may see school capacity and busing changes as development continues. Ask current questions when touring.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and Florida DOE data should lead; third-party rankings are secondary. Tour campuses when possible.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'In-county acute-care anchors',
            detail:
              'HCA Florida Lawnwood, Cleveland Clinic Martin Health system access, and other Treasure Coast campuses serve St. Lucie. Map ER drive times at rush hour from Tradition, PSL west, and coastal edges.',
          },
          {
            title: 'Palm Beach specialty spillover',
            detail:
              'Some specialties still pull residents south into Palm Beach systems. Confirm insurer networks and realistic I-95 times.',
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
    title: 'Useful St. Lucie County resources',
    intro:
      'Local official links first; directory listings are independent. Verify FDACS for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'St. Lucie County — official site',
        href: 'https://www.stlucieco.gov/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Port St. Lucie',
        href: 'https://www.cityofpsl.com/',
        external: true,
      },
      {
        label: 'City of Fort Pierce',
        href: 'https://www.cityoffortpierce.com/',
        external: true,
      },
      {
        label: 'St. Lucie Public Schools',
        href: 'https://www.stlucieschools.org/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Port St. Lucie, Fort Pierce, Tradition/west, Coastal edges) when available. Confirm HOA packets for growth villages, I-95 drive assumptions, and coastal access notes — this is Treasure Coast growth north of PBC, not a Palm Beach rename.',
  lastReviewed: '2026-07-24',
});
