import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeFlTier2Pack,
  FL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/florida/fl-tier2-shared';

/**
 * Pasco County — Florida Tier 2 (Tampa north collar).
 * Secondary-market contract vs Hillsborough Tier 1 parent — Wesley Chapel /
 * New Port Richey growth collar, not Tampa core elevators or Pinellas beach scripts.
 */
export const pascoCountyIntelligence: CountyIntelligencePack = finalizeFlTier2Pack({
  countySlug: 'pasco',
  hubTitle: 'Pasco County Moving Intelligence Hub',
  eyebrow: 'Pasco · Tampa north collar · New Port Richey / Wesley Chapel',
  h1: 'Moving in Pasco County: Tampa North Collar — Wesley Chapel HOAs & New Port Richey',
  heroOpener:
    'Pasco County is Tampa Bay’s northern growth collar — Wesley Chapel master-planned villages, New Port Richey and west-county older stock, Land O’ Lakes central corridors, and Zephyrhills east inland towns — not Hillsborough downtown elevators with a different nameplate. I-75, US-19, FL-54, FL-52, and the Suncoast Parkway (FL-589) set portal-to-portal time for households still oriented to Tampa jobs. Compared with Hillsborough, you get freer mid-day freeflow than Tampa core gridlock, denser HOA paperwork in east growth pockets, and almost no vertical tower product. This guide is for people moving in Pasco as a north collar market with its own role — not a recycled Tampa core or Pinellas beach script.',
  heroCredibility:
    'Tampa north collar · Wesley Chapel / New Port Richey · FDACS Ch. 507 (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-75 · US-19 · FL-54 · FL-52 · Suncoast Parkway (FL-589)',
  parentCompare: {
    parentLabel: 'Hillsborough County',
    parentHref: '/local-movers/florida/hillsborough',
    title: 'Compared with Hillsborough County',
    intro:
      'Pasco is Tampa’s northern growth collar — Wesley Chapel, New Port Richey/west county, Land O’ Lakes, and Zephyrhills east — not a drop-in template for downtown elevators, Channelside towers, or Southshore scripts. Use Hillsborough as the dense Bay parent contrast.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Hillsborough crews fight I-275, I-4 Tampa approaches, and multi-hour bay-core pairs. Pasco pairs ride I-75, US-19, FL-54, FL-52, and the Suncoast Parkway (FL-589) — freer mid-day than Tampa core, still peak-heavy on Wesley Chapel ↔ New Tampa and west-county US-19 hauls. Portal-to-portal time is real; it is not a 45-minute downtown dock job.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Hillsborough mixes towers, bungalows, Southshore HOAs, and New Tampa growth under one county label. Pasco’s ladder is overwhelmingly master-planned SFH in Wesley Chapel, older mid-century and Gulf-edge stock toward New Port Richey/Hudson/Holiday, Land O’ Lakes suburban product, and smaller-city east inland homes — far less elevator density, far more gate lists and cul-de-sac staging on the growth edge.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Hillsborough core needs COI elevators and curb permits; many Bay suburbs still allow freer driveway work. Pasco east growth defaults to HOA packets — approved hours, COI, gate lists, and truck-length limits across Wesley Chapel and Trinity-area villages. West county often means older streets and flood-aware parcels instead of tower docks.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Pasco quotes often sit near or slightly below dense Tampa urban rates for comparable square footage when access is a simple driveway — HOA soft costs, SR-54/I-75 timing, heat windows, and long empty miles to Zephyrhills still push prices up. Expect secondary-collar labor rates with planned-community friction as the main premium, not downtown dock scarcity.',
      },
      {
        title: 'Role difference',
        detail:
          'Pasco is Tampa’s north bedroom and planned-growth engine — schools, corridor commutes, and master-planned inventory — not Hillsborough’s job-center core and not Pinellas beach product. Treat it as its own collar market when matching crews and rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Pasco County different',
    intro:
      'North collar realities — HOA growth density, SR-54/I-75 freeflow that is still billable, west-county older stock, and heat on open suburban streets — that change estimates.',
    bullets: [
      {
        title: 'Master-planned HOA is the default in east growth',
        detail:
          'Wesley Chapel villages and related tracts treat COI, approved hours, and gate lists as standard. A New Port Richey bungalow and a guarded two-story are not interchangeable jobs — put both communities on the estimate.',
      },
      {
        title: 'SR-54 / I-75 / Suncoast freeflow is not Tampa core — still a line item',
        detail:
          'Wesley Chapel ↔ west county or Land O’ Lakes ↔ Tampa pairs freer than bay core still burn billable time at school and commute peaks. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'West county vs east growth is a different access product',
        detail:
          'New Port Richey, Hudson, and Holiday include older SFH, multi-family, and flood-aware parcels that do not match Wesley Chapel HOA playbooks.',
      },
      {
        title: 'Summer heat on open suburban staging',
        detail:
          'New tracts without mature canopy get hot early. Prefer dawn starts; treat mid-afternoon load-outs as high risk even when the map looks short.',
      },
      FL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Pasco zones: Wesley Chapel growth, west county, Land O’ Lakes & Zephyrhills east',
  zonesIntro:
    'Three to four sharp products — not a six-zone dump. Wesley Chapel growth, New Port Richey/west, Land O’ Lakes central, and Zephyrhills east price and stage differently under the same north collar.',
  zones: [
    {
      id: 'wesley-chapel-growth',
      name: 'Wesley Chapel Growth Corridor',
      shortName: 'Wesley Chapel',
      neighborhoods: [
        'Wesley Chapel',
        'Wiregrass / State Road 56 corridors',
        'Meadow Pointe edges',
        'Epperson / new-village edges',
        'South Wesley Chapel / Hillsborough border approaches',
      ],
      housingTypes:
        'Master-planned SFH, townhomes, HOA villages, multi-family near retail corridors, active new construction',
      challenges: [
        'HOA COI, gates, and approved hours',
        'I-75 / SR-54 / SR-56 congestion',
        'Incomplete roads and temporary access on new streets',
        'High Saturday demand in peak season',
      ],
      moverTips:
        'Collect HOA packets before the survey is final. Confirm street access the week of the move in active construction villages. Book June–August Saturdays early. Start early in heat.',
      cityKeywords: [
        'wesley chapel',
        'wiregrass',
        'meadow pointe',
        'epperson',
      ],
    },
    {
      id: 'west-county-npr',
      name: 'New Port Richey / West County',
      shortName: 'New Port Richey / West',
      neighborhoods: [
        'New Port Richey',
        'Port Richey',
        'Hudson',
        'Holiday',
        'Trinity / Seven Springs edges',
      ],
      housingTypes:
        'Older SFH and mid-century stock, planned HOA villages (Trinity), multi-family, some waterfront and canal homes',
      challenges: [
        'US-19 congestion',
        'Older stairs and tight staging on mid-century lots',
        'Flood-mapped and storm-exposed parcels near the Gulf edge',
        'HOA gate lists in Trinity / Seven Springs',
      ],
      moverTips:
        'Survey curb and driveway access on older lots. Check flood maps for canal and Gulf-edge addresses. Treat Trinity as HOA-first. Do not assume Wesley Chapel playbooks apply to every west-county address.',
      cityKeywords: [
        'new port richey',
        'port richey',
        'hudson',
        'holiday',
        'trinity',
        'seven springs',
      ],
    },
    {
      id: 'land-o-lakes',
      name: 'Land O’ Lakes / Central Corridor',
      shortName: 'Land O’ Lakes',
      neighborhoods: [
        'Land O’ Lakes',
        'Lutz (Pasco side / border)',
        'Odessa edges',
        'Central SR-54 corridor',
        'Connerton / planned edges',
      ],
      housingTypes:
        'Suburban SFH, HOA communities, larger-lot pockets, multi-family along arterials',
      challenges: [
        'County-line address confusion with Hillsborough',
        'SR-54 / Suncoast approach congestion',
        'HOA rules in planned communities',
        'Long carries in large villages',
      ],
      moverTips:
        'Clarify Pasco vs Hillsborough destinations near Lutz / New Tampa edges. Collect gate lists early. Price corridor portal time honestly for pairs toward Tampa.',
      cityKeywords: [
        'land o lakes',
        "land o' lakes",
        'lutz',
        'odessa',
        'connerton',
      ],
    },
    {
      id: 'zephyrhills-east',
      name: 'Zephyrhills / East Inland',
      shortName: 'Zephyrhills east',
      neighborhoods: [
        'Zephyrhills',
        'Dade City',
        'San Antonio edges',
        'St. Leo edges',
        'Rural east-county parcels',
      ],
      housingTypes:
        'Smaller-city SFH, rural-edge properties, manufactured homes, limited multi-family, some historic downtown stock',
      challenges: [
        'Long empty-mile time from Tampa / Wesley Chapel staging',
        'Rural driveway and soft-surface access after rain',
        'Fewer high-rise issues — more distance and access photos needed',
        'Weather-sensitive unpaved approaches',
      ],
      moverTips:
        'Share driveway, gate, and turnaround photos for rural parcels. Confirm whether far-east pairs still use a pure local rate card. Build buffer for two-lane corridor delays.',
      cityKeywords: [
        'zephyrhills',
        'dade city',
        'san antonio',
        'st leo',
        'saint leo',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Pasco County',
    intro:
      'Same square footage prices differently by HOA soft costs, SR-54/I-75 corridor time, and whether the job is Wesley Chapel planned stock or west/east long-local.',
    drivers: [
      {
        title: 'HOA soft costs in growth villages',
        detail:
          'COI, approved hours, and gate coordination in Wesley Chapel, Trinity, and Land O’ Lakes add paperwork and can force weekday-only windows.',
      },
      {
        title: 'SR-54 / I-75 / Suncoast portal time',
        detail:
          'Wesley Chapel ↔ west county or Land O’ Lakes ↔ Tampa pairs burn more portal-to-portal time than map miles suggest at peak — freer than Hillsborough core, still billable.',
      },
      {
        title: 'Heat windows & long empty-mile east legs',
        detail:
          'Summer heat compresses productive hours; Dade City / Zephyrhills pairs add empty miles if crews stage from farther south.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$450–$1,150+',
        note: 'Higher with HOA soft costs or peak corridor windows',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,500–$3,700+',
        note: 'HOA soft costs and SR-54/I-75 hauls trend up',
      },
      {
        label: '3–4+ BR (cross-corridor / long empty-mile)',
        value: '$2,400–$6,000+',
        note: 'Wesley Chapel ↔ west county and far-east pairs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal & heat calendar intelligence',
    intro:
      'Pasco peaks follow growth-corridor closings, school calendars, and summer heat — not downtown lease density alone.',
    items: [
      {
        title: 'Summer heat peak: roughly June – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon moves on open new tracts are high risk for people and property.',
      },
      {
        title: 'School & family calendars (Wesley Chapel / Land O’ Lakes)',
        detail:
          'Late spring through early fall weekends fill first for family SFH moves. Book 2–4 weeks ahead for popular Saturdays in planned villages.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Still plan around HOA weekday windows when applicable. Early starts win when heat and I-75 / SR-54 peaks are the real constraints.',
      },
    ],
  },
  specialized: [
    {
      id: 'hoa-north-bay-growth',
      title: 'HOA & north-bay growth logistics',
      intro:
        'Pasco’s defining product on the east growth edge is planned-community access — gate lists, COI, and family-volume SFH that Tampa core elevator jobs do not share.',
      bullets: [
        'Send HOA management packets, COI requirements, and gate lists with the estimate.',
        'Confirm approved move hours and floor-protection rules before booking Saturday crews.',
        'Reconfirm street access the week of the move in active construction villages — rules change.',
        'Inventory family-volume SFH carefully — suburban loads often exceed older urban condos.',
      ],
    },
    {
      id: 'sr54-i75-freeflow',
      title: 'SR-54 / I-75 freeflow & corridor last-mile',
      intro:
        'I-75, FL-54, US-19, and the Suncoast Parkway turn “local” Pasco pairs into corridor-timed jobs.',
      bullets: [
        'Price portal-to-portal time honestly for Wesley Chapel ↔ west county and Land O’ Lakes ↔ Tampa pairs.',
        'Build buffer for school and commute peaks on SR-54 and I-75.',
        'Clarify Hillsborough addresses near county lines so distance assumptions stay accurate.',
        'Ask whether far-east (Zephyrhills / Dade City) pairs still use a pure local rate card.',
      ],
    },
    {
      id: 'heat-suburban',
      title: 'Heat & suburban density staging',
      intro:
        'Open cul-de-sacs and summer humidity define Pasco crew days more than downtown docks.',
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
      'North collar value, Wesley Chapel planned villages, and west-county living are different bets — validate schools and healthcare by pocket, then plan for heat and corridor commute.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Pasco County Schools serves most public K–12 students. Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'Pasco County Schools boundaries',
            detail:
              'Public K–12 is largely under one county system, but growth zones and feeders still differ by pocket. Marketing names and new tracts can span bus patterns — verify with official tools.',
          },
          {
            title: 'Growth-area capacity',
            detail:
              'Wesley Chapel and related corridors may see enrollment pressure as new tracts open. Do not treat county averages as neighborhood truth.',
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
            title: 'County acute-care anchors',
            detail:
              'AdventHealth Wesley Chapel, HCA Florida facilities in west/north county, and other campuses serve greater Pasco. Map ER drive times at rush hour from your target village.',
          },
          {
            title: 'Hillsborough specialty spillover',
            detail:
              'Larger Tampa Bay specialty care remains common for complex needs. Confirm insurer networks and realistic I-75 / SR-54 times.',
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
    title: 'Useful Pasco resources',
    intro:
      'Local official links first; directory listings are independent. Verify FDACS for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Pasco County — official site',
        href: 'https://www.pascocountyfl.net/',
        note: 'County services & offices',
        external: true,
      },
      {
        label: 'City of New Port Richey',
        href: 'https://www.cityofnewportrichey.org/',
        external: true,
      },
      {
        label: 'City of Zephyrhills',
        href: 'https://www.ci.zephyrhills.fl.us/',
        external: true,
      },
      {
        label: 'Pasco County Schools',
        href: 'https://www.pasco.k12.fl.us/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Wesley Chapel, New Port Richey/West, Land O’ Lakes, Zephyrhills east) when available. Confirm HOA packets, SR-54/I-75 drive assumptions, and heat-window plans — this is a Tampa north collar, not Hillsborough core.',
  lastReviewed: '2026-07-24',
});
