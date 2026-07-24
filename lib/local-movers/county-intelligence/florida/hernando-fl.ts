import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeFlTier2Pack,
  FL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/florida/fl-tier2-shared';

/**
 * Hernando County — Florida Tier 2 (Spring Hill — Tampa north fringe).
 * Parent: Hillsborough County (+ Pasco contrast). Outer north-bay collar —
 * NOT a Pasco rename.
 */
export const hernandoCountyIntelligence: CountyIntelligencePack = finalizeFlTier2Pack({
  countySlug: 'hernando',
  hubTitle: 'Hernando County Moving Intelligence Hub',
  eyebrow: 'Hernando County · Spring Hill — Tampa north fringe',
  h1: 'Moving in Hernando County: Spring Hill Fringe, Brooksville Seat & US-19 / Suncoast Logistics',
  heroOpener:
    'Hernando County is Tampa Bay’s outer north fringe — Spring Hill suburban volume, Brooksville seat and inland stock, Weeki Wachee / west Gulf-edge approaches, and east/rural edges — not Hillsborough Tampa-core elevators and not a Pasco Wesley Chapel rename. US-19 and the Suncoast Parkway (FL-589) set portal-to-portal time for households still oriented to Tampa jobs; FL-50, I-75 east approaches, and the local Spring Hill grid rewrite last-mile. Quote the pocket: Spring Hill tract, Brooksville seat, Weeki Wachee west, or east rural parcel — never “Hernando County local” as one product.',
  heroCredibility:
    'Tampa north fringe · Spring Hill / Brooksville · FDACS Ch. 507 (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-19 · Suncoast Parkway (FL-589) · FL-50 · I-75 (east approach) · local Spring Hill grid',
  parentCompare: {
    parentLabel: 'Hillsborough County',
    parentHref: '/local-movers/florida/hillsborough',
    title: 'Compared with Hillsborough County',
    intro:
      'Hernando is Tampa’s outer north fringe beyond Pasco — Spring Hill volume, Brooksville seat, Weeki Wachee west, and east rural edges — not a drop-in template for downtown elevators or New Tampa scripts. Use Hillsborough as the dense Bay parent; Pasco is the closer collar contrast, not a renamable twin.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Hillsborough crews fight I-275, I-4 Tampa approaches, and multi-hour bay-core pairs. Hernando pairs ride US-19, the Suncoast Parkway (FL-589), FL-50, I-75 east approaches, and the local Spring Hill grid — freer mid-day than Tampa core, longer empty miles than Pasco’s Wesley Chapel edge. Spring Hill ↔ Brooksville or west ↔ Tampa still burns portal-to-portal time map miles understate. Cross-county Hernando ↔ Hillsborough (and Pasco) pairs are long locals on US-19 / Suncoast / I-75.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Hillsborough mixes towers, bungalows, Southshore HOAs, and New Tampa growth. Hernando’s ladder is Spring Hill mid-market SFH and multi-family, Brooksville smaller-city and historic-adjacent stock, Weeki Wachee / west coastal-influence product, and east/rural larger lots — far less elevator density, more outer-fringe driveway work than Tampa core and less master-planned village density than Pasco’s east growth edge.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Hernando stages more open suburban cul-de-sac and rural driveway work than Tampa core elevators. HOA packets appear in planned pockets but are not the universal Wesley Chapel default. Soft ground, flood-aware west parcels, and long east empty miles replace bay-core dock fights.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Hernando quotes often sit near or slightly below denser north-collar rates for simple driveway access — US-19 / Suncoast timing, heat windows, and long empty miles to east rural edges still push prices up. Expect outer-fringe labor with corridor distance as the main premium, not downtown dock scarcity or Pasco east HOA density alone.',
      },
      {
        title: 'Role difference',
        detail:
          'Hernando is Tampa’s outer north fringe — Spring Hill bedroom volume and Nature Coast adjacency — not Hillsborough’s job-center core and not a Pasco rename. Treat it as its own collar market when matching crews and rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Hernando County different',
    intro:
      'Outer north-bay realities — Spring Hill volume, US-19 / Suncoast freeflow, west Gulf-edge stock, and Florida licensing — that a renamed Pasco or Tampa pack would miss.',
    bullets: [
      {
        title: 'Spring Hill, Brooksville, west, and east rural are different products',
        detail:
          'A Spring Hill HOA tract, a Brooksville seat home, a Weeki Wachee west parcel, and an east rural driveway do not share truck access. Name both cities — “Hernando County local” fails across fringe vs rural last-mile.',
      },
      {
        title: 'US-19 / Suncoast freeflow is not Tampa core — still a line item',
        detail:
          'Spring Hill ↔ west county or Hernando ↔ Tampa pairs freer than bay core still burn billable time at school and commute peaks. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'Not a Pasco rename',
        detail:
          'Pasco’s Wesley Chapel master-planned density and SR-54 spine are a different product mix. Hernando leans Spring Hill grid, US-19, and longer fringe empty miles — survey the actual street, not the neighboring county’s rate card.',
      },
      {
        title: 'Summer heat on open suburban and rural staging',
        detail:
          'Tracts and rural lots without mature canopy get hot early. Prefer dawn starts; treat mid-afternoon load-outs as high risk even when the map looks short.',
      },
      FL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading:
    'Hernando zones: Spring Hill, Brooksville, Weeki Wachee/west & east/rural edges',
  zonesIntro:
    'Four sharp products — Spring Hill volume, Brooksville seat, Weeki Wachee/west, and east/rural edges. Not a Pasco zone dump with Hernando labels.',
  zones: [
    {
      id: 'spring-hill',
      name: 'Spring Hill core & suburban grid',
      shortName: 'Spring Hill',
      neighborhoods: [
        'Spring Hill core',
        'US-19 commercial corridors',
        'Suncoast approach residential',
        'Established HOA and non-HOA tracts',
        'Multi-family near retail nodes',
      ],
      housingTypes:
        'Suburban SFH, HOA communities, multi-family, townhomes, mid-market planned pockets',
      challenges: [
        'US-19 / Suncoast peak congestion',
        'HOA COI and approved hours in planned pockets',
        'High family-move volume on summer weekends',
        'Long carries in large subdivision layouts',
      ],
      moverTips:
        'Send HOA packets when applicable. Mid-week early starts beat heat and school traffic. Inventory family-volume SFH carefully. Clarify Spring Hill ↔ Brooksville or Tampa drive assumptions.',
      cityKeywords: [
        'spring hill',
        'spring hill fl',
        'hernando spring hill',
      ],
    },
    {
      id: 'brooksville',
      name: 'Brooksville seat & inland established stock',
      shortName: 'Brooksville',
      neighborhoods: [
        'Brooksville',
        'Downtown / historic edges',
        'FL-50 corridors',
        'County-seat residential stock',
        'I-75 east approach influence',
      ],
      housingTypes:
        'Smaller-city SFH, historic and mid-century stock, multi-family, modest suburban tracts',
      challenges: [
        'Tighter older streets and limited staging',
        'Different access profile than Spring Hill grid HOAs',
        'FL-50 / I-75 approaches at peak',
        'Mix of elevator and non-elevator multi-unit',
      ],
      moverTips:
        'Survey curb and driveway access on older lots. Do not assume Spring Hill playbooks apply. Prefer weekday mornings; share parking constraints on denser blocks.',
      cityKeywords: [
        'brooksville',
        'brooksville fl',
        'hernando seat',
      ],
    },
    {
      id: 'weeki-wachee-west',
      name: 'Weeki Wachee / west Gulf-edge influence',
      shortName: 'Weeki Wachee / west',
      neighborhoods: [
        'Weeki Wachee',
        'West Hernando coastal-influence pockets',
        'US-19 west corridors',
        'Gulf-edge and flood-aware parcels',
        'Tourism-adjacent residential',
      ],
      housingTypes:
        'Coastal-influence SFH, elevated and flood-aware homes, multi-family pockets, vacation-oriented stock',
      challenges: [
        'US-19 congestion and tourism spillover',
        'Flood-mapped and storm-exposed parcels',
        'Moisture-aware packing needs',
        'Different access profile than inland Spring Hill',
      ],
      moverTips:
        'Check flood maps for west-edge addresses. Share approach and driveway photos. Prefer non-peak tourism windows when flexible. Do not quote as a flat Spring Hill suburban job.',
      cityKeywords: [
        'weeki wachee',
        'weeki wachee fl',
        'hernando west',
      ],
    },
    {
      id: 'east-rural-edges',
      name: 'East / rural edges',
      shortName: 'East / rural',
      neighborhoods: [
        'East Hernando rural parcels',
        'Larger-lot inland edges',
        'I-75 east approaches',
        'Agricultural and working-community stock',
        'Unincorporated east corridors',
      ],
      housingTypes:
        'Rural-edge SFH, larger lots, manufactured homes, limited multi-family',
      challenges: [
        'Long empty-mile time from Spring Hill staging',
        'Rural driveway and soft-surface access after rain',
        'Fewer high-rise issues — more distance and access photos needed',
        'Weather-sensitive unpaved approaches',
      ],
      moverTips:
        'Share driveway, gate, and turnaround photos for rural parcels. Confirm whether far-east pairs still use a pure local rate card. Build buffer for two-lane corridor delays.',
      cityKeywords: [
        'east hernando',
        'hernando rural',
        'i-75 hernando',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Hernando County',
    intro:
      'Same square footage prices differently by US-19 / Suncoast corridor time, HOA soft costs in planned pockets, and whether the job is Spring Hill grid or east long-local.',
    drivers: [
      {
        title: 'US-19 / Suncoast / FL-50 portal time',
        detail:
          'Spring Hill ↔ west, Brooksville ↔ Tampa, or peak Suncoast legs burn more portal-to-portal time than map miles suggest — freer than Hillsborough core, still billable.',
      },
      {
        title: 'HOA soft costs in planned Spring Hill pockets',
        detail:
          'COI, approved hours, and gate coordination add paperwork where HOAs apply — less universal than Pasco east growth, still real on many tracts.',
      },
      {
        title: 'Heat windows & long empty-mile east legs',
        detail:
          'Summer heat compresses productive hours; east rural pairs add empty miles if crews stage from Spring Hill or farther south.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$400–$1,150+',
        note: 'Higher with HOA soft costs or peak corridor windows',
      },
      {
        label: '2–3BR house / suburban tract',
        value: '$1,300–$3,500+',
        note: 'US-19 / Suncoast hauls and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR (cross-corridor / long empty-mile)',
        value: '$2,100–$5,800+',
        note: 'Spring Hill ↔ west and far-east pairs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal & heat calendar intelligence',
    intro:
      'Hernando peaks follow family closings, school calendars, and summer heat — outer fringe, not downtown lease density alone.',
    items: [
      {
        title: 'Summer heat peak: roughly June – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon moves on open tracts and rural lots are high risk for people and property.',
      },
      {
        title: 'School & family calendars (Spring Hill)',
        detail:
          'Late spring through early fall weekends fill first for family SFH moves. Book 2–4 weeks ahead for popular Saturdays.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Still plan around HOA weekday windows when applicable. Early starts win when heat and US-19 / Suncoast peaks are the real constraints.',
      },
    ],
  },
  specialized: [
    {
      id: 'outer-north-bay-collar',
      title: 'Outer north-bay collar logistics',
      intro:
        'Hernando’s role is Tampa’s outer north fringe — longer empty miles and Spring Hill volume — not Hillsborough core and not Pasco’s densest growth edge.',
      bullets: [
        'Name both cities and corridors; refuse vague “Tampa Bay north local” language across Hernando / Pasco / Hillsborough lines.',
        'Price Hernando ↔ Tampa and Hernando ↔ Pasco as long locals with honest US-19 / Suncoast / I-75 time.',
        'Match crews to Spring Hill grid vs Brooksville seat vs west edge vs rural — four different playbooks.',
        'Confirm FDACS for pure in-state hops and FMCSA when any leg leaves Florida.',
      ],
    },
    {
      id: 'us19-suncoast',
      title: 'US-19 / Suncoast Parkway corridor last-mile',
      intro:
        'US-19, FL-589, FL-50, and I-75 east approaches turn “local” Hernando pairs into corridor-timed jobs.',
      bullets: [
        'Price portal-to-portal time honestly for Spring Hill ↔ west and Hernando ↔ Tampa pairs.',
        'Build buffer for school and commute peaks on US-19 and the Suncoast.',
        'Clarify Pasco and Hillsborough addresses near county approaches so distance assumptions stay accurate.',
        'Ask whether far-east rural pairs still use a pure local rate card.',
      ],
    },
    {
      id: 'not-pasco-rename',
      title: 'Distinct from Pasco growth scripts',
      intro:
        'Hernando is Spring Hill / Brooksville fringe — not a Wesley Chapel HOA rate-card swap.',
      bullets: [
        'Do not import Pasco east growth HOA density assumptions without surveying the actual community.',
        'Expect more mid-market driveway work and fewer guarded master-planned villages than Pasco’s densest edge.',
        'Treat Weeki Wachee west and east rural as access-first products, not Spring Hill clones.',
        'Reconfirm street rules the week of the move in any planned pocket that does use gates or COI.',
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
          'Hernando County Schools serves most public K–12 students. Match every listing address to the correct attendance zone.',
        bullets: [
          {
            title: 'Zone before community branding',
            detail:
              'Use official district boundary tools. Spring Hill, Brooksville, and west brands can span multiple feeders and choice options.',
          },
          {
            title: 'Growth-area capacity',
            detail:
              'Spring Hill corridors may see enrollment pressure as tracts fill. Do not treat county averages as neighborhood truth.',
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
              'HCA Florida Oak Hill and other regional campuses serve greater Hernando. Map ER drive times at rush hour from Spring Hill west and east rural edges — not only from Brooksville proper.',
          },
          {
            title: 'Tampa Bay specialty spillover',
            detail:
              'Larger Tampa Bay specialty care remains common for complex needs. Confirm insurer networks and realistic US-19 / Suncoast / I-75 times.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Hernando County resources',
    intro:
      'Local official links first. FDACS, FMCSA, and Move Trust Hub tools are added automatically for licensing checks.',
    items: [
      {
        label: 'Hernando County',
        href: 'https://www.hernandocounty.us/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Brooksville',
        href: 'https://www.cityofbrooksville.us/',
        external: true,
      },
      {
        label: 'Hernando County Schools',
        href: 'https://www.hernandoschools.org/',
        external: true,
      },
      {
        label: 'FL511 — traffic conditions',
        href: 'https://fl511.com/',
        note: 'US-19, Suncoast, FL-50, I-75 before load windows',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter by zone (Spring Hill, Brooksville, Weeki Wachee/west, east/rural) when available. Confirm HOA packets where applicable, US-19 / Suncoast drive assumptions, and heat-window plans — this is Tampa’s outer north fringe, not a Pasco rename. Parent market: Hillsborough guide for metro-core context.',
  lastReviewed: '2026-07-24',
});
