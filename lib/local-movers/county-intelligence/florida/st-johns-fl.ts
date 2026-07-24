import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeFlTier2Pack,
  FL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/florida/fl-tier2-shared';

/**
 * St. Johns County — Florida Tier 2 (Jax south coastal growth).
 * Parent: Duval County. St. Augustine / Nocatee / Ponte Vedra —
 * NOT a renamed Jacksonville-core pack.
 */
export const stJohnsCountyIntelligence: CountyIntelligencePack = finalizeFlTier2Pack({
  countySlug: 'st-johns',
  hubTitle: 'St. Johns County Moving Intelligence Hub',
  eyebrow: 'St. Johns County · Jax south coastal growth · St. Augustine / Nocatee',
  h1: 'Moving in St. Johns County: Jax South Coastal Growth — St. Augustine, Nocatee & Ponte Vedra',
  heroOpener:
    'St. Johns County is Jacksonville’s south coastal growth corridor — St. Augustine historic and A1A coastal stock, Nocatee and north master-planned HOA villages, Ponte Vedra beach-adjacent product, and west/rural edges that freer I-95 freeflow still cannot turn into a short Duval dock job. This is not Jacksonville core elevators with different exit numbers, not a pure tourist-only script, and not a recycled Duval sprawl pack. Historic coastal access, Nocatee-style HOA growth, and I-95 / US-1 / A1A timing define estimates. This guide is for people actually moving in St. Johns as a south coastal growth market — not a renamed Jax core.',
  heroCredibility:
    'Jax south coastal growth · St. Augustine / Nocatee / Ponte Vedra · FDACS Ch. 507 (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-95 · US-1 · FL-16 · A1A · Nocatee Parkway approaches',
  parentCompare: {
    parentLabel: 'Duval County',
    parentHref: '/local-movers/florida/duval',
    title: 'Compared with Duval County',
    intro:
      'St. Johns is Jacksonville’s south coastal growth collar — St. Augustine historic/coastal, Nocatee/north HOA growth, Ponte Vedra, and west rural edges — not a drop-in template for downtown Jacksonville elevators, Arlington river product, or westside sprawl. Use Duval as the dense North Florida Tier 1 parent contrast.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Duval crews fight I-95 / I-10 / bridges and multi-zone river-sprawl pairs. St. Johns pairs ride I-95, US-1, FL-16, A1A, and Nocatee Parkway approaches — freer mid-day freeflow than Jax core gridlock, still peak-heavy on Nocatee ↔ St. Augustine and US-1 coastal hauls. Portal-to-portal time is real; it is not a short downtown dock job.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Duval mixes urban core, beach towns, and vast suburban sprawl under one large county. St. Johns’s ladder is St. Augustine historic and coastal SFH, Nocatee master-planned HOA growth, Ponte Vedra beach-adjacent product, and west/rural larger-lot edges — more historic last-mile and planned-village paperwork, less Jax-scale multi-bridge density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Duval core needs curb permits, elevators, and river-crossing timing. St. Johns defaults to historic-street constraints in St. Augustine, HOA packets across Nocatee growth villages, and coastal-adjacent staging in Ponte Vedra. Gate lists and A1A approaches replace dense downtown dock fights.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local St. Johns quotes often sit near secondary-collar rates for simple driveway access — HOA soft costs, historic long carries, I-95/US-1 peak time, and coastal-adjacent labor still push prices up. Expect planned-community friction and historic-access premiums, not Jacksonville core scarcity pricing alone.',
      },
      {
        title: 'Role difference',
        detail:
          'St. Johns is Jax south’s coastal growth and tourism-adjacent bedroom — St. Augustine identity, Nocatee HOA volume, and Ponte Vedra product — not Duval’s job-center core. Treat it as its own south coastal collar when matching crews and rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in St. Johns County different',
    intro:
      'South coastal growth realities — historic St. Augustine access, Nocatee HOA density, Ponte Vedra coastal product, and I-95/US-1 freeflow that is still billable — that change estimates.',
    bullets: [
      {
        title: 'Historic coastal and Nocatee growth are different products',
        detail:
          'A St. Augustine historic bungalow, a Nocatee HOA two-story, a Ponte Vedra beach-adjacent home, and a west rural edge parcel do not share truck access or gate rules. Name both communities on every estimate.',
      },
      {
        title: 'I-95 / US-1 freeflow is not Jax core gridlock — still a line item',
        detail:
          'Nocatee ↔ St. Augustine or St. Johns ↔ Duval pairs freer than river-core still burn billable time at school and commute peaks. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'HOAs dominate much of the north growth stock',
        detail:
          'Nocatee and related villages treat COI, approved hours, and gate lists as standard. Treat the HOA packet as part of the survey.',
      },
      {
        title: 'Coastal heat and storm windows are operational',
        detail:
          'Summer heat on open growth streets and hurricane season on coastal approaches compress outdoor hours. Prefer early starts; document weather reschedule policies.',
      },
      FL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading:
    'St. Johns zones: St. Augustine historic/coastal, Nocatee growth, Ponte Vedra & west/rural edges',
  zonesIntro:
    'Four sharp products — not a six-zone dump. St. Augustine historic/coastal, Nocatee/north growth, Ponte Vedra, and west/rural edges price and stage differently under the same south coastal collar.',
  zones: [
    {
      id: 'st-augustine-historic-coastal',
      name: 'St. Augustine Historic & Coastal',
      shortName: 'St. Augustine',
      neighborhoods: [
        'Historic St. Augustine',
        'Downtown and colonial-core edges',
        'A1A coastal residential',
        'Anastasia Island approaches',
        'US-1 St. Augustine corridors',
      ],
      housingTypes:
        'Historic SFH, smaller multi-unit, coastal-adjacent homes, established mid-century stock, tourist-edge residential',
      challenges: [
        'Narrow historic streets and constrained curb staging',
        'Tourist traffic peaks on A1A and downtown approaches',
        'Older stairs, long carries, and limited truck swing room',
        'Storm and flood-aware parcels near the coast',
      ],
      moverTips:
        'Survey curb, stairs, and truck length on historic blocks before finalizing the crew plan. Avoid peak tourist weekends when flexible. Share flood-map context for coastal addresses. Price St. Augustine ↔ Nocatee as a timed local.',
      cityKeywords: [
        'st augustine',
        'saint augustine',
        'st augustine fl',
        'anastasia island',
        'historic st augustine',
      ],
    },
    {
      id: 'nocatee-north-growth',
      name: 'Nocatee & North Growth Corridor',
      shortName: 'Nocatee / north',
      neighborhoods: [
        'Nocatee',
        'Nocatee Parkway corridors',
        'North St. Johns HOA villages',
        'Durbin Creek / growth edges',
        'I-95 north St. Johns approaches',
      ],
      housingTypes:
        'Master-planned SFH, HOA villages, townhomes, newer multi-family near retail, active new construction',
      challenges: [
        'HOA COI, gates, and approved hours',
        'I-95 / Nocatee Parkway peak congestion',
        'Incomplete roads on new streets',
        'High Saturday family demand in peak season',
      ],
      moverTips:
        'Collect HOA packets before the survey is final. Confirm street access the week of the move in active construction villages. Book June–August Saturdays early. Start early in heat.',
      cityKeywords: [
        'nocatee',
        'nocatee fl',
        'durbin',
        'north st johns',
        'st johns growth',
      ],
    },
    {
      id: 'ponte-vedra',
      name: 'Ponte Vedra Beach & Coastal North',
      shortName: 'Ponte Vedra',
      neighborhoods: [
        'Ponte Vedra Beach',
        'Ponte Vedra',
        'A1A north coastal pockets',
        'Golf and gated community edges',
        'Coastal-adjacent HOA stock',
      ],
      housingTypes:
        'Beach-adjacent SFH, gated and HOA communities, golf-village product, multi-family near corridors, coastal mid- and upscale stock',
      challenges: [
        'Gate lists and HOA approved hours',
        'A1A congestion and limited coastal staging',
        'Storm-exposed and flood-aware parcels',
        'Cross-zone pairs toward Nocatee or St. Augustine',
      ],
      moverTips:
        'Treat gated and beach-adjacent jobs as HOA-first. Confirm truck limits and sand/moisture protection plans. Price Ponte Vedra ↔ Nocatee portal-to-portal. Prefer mid-week coastal windows over holiday peaks.',
      cityKeywords: [
        'ponte vedra',
        'ponte vedra beach',
        'ponte vedra fl',
        'ponte vedra beach fl',
      ],
    },
    {
      id: 'west-rural-edges',
      name: 'West St. Johns & Rural Edges',
      shortName: 'West / rural',
      neighborhoods: [
        'West St. Johns rural edges',
        'FL-16 west corridors',
        'Larger-lot and agricultural-adjacent pockets',
        'World Golf Village edges',
        'Interior growth and connector stock',
      ],
      housingTypes:
        'Larger-lot SFH, rural-edge properties, planned pockets, limited multi-family, some equestrian-adjacent product',
      challenges: [
        'Long empty-mile time from coastal staging',
        'Private roads, gates, and soft approaches after rain',
        'Fewer high-rise issues — more distance and access photos needed',
        'Weather-sensitive unpaved approaches',
      ],
      moverTips:
        'Share driveway, gate, and turnaround photos for rural parcels. Confirm whether far-west pairs still use a pure local rate card. Build buffer for two-lane corridor delays.',
      cityKeywords: [
        'world golf village',
        'west st johns',
        'st johns rural',
        'fl-16',
        'state road 16',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside St. Johns County',
    intro:
      'Same square footage prices differently by HOA soft costs, historic access labor, I-95/US-1 corridor time, and whether the job is Nocatee growth or coastal historic.',
    drivers: [
      {
        title: 'HOA soft costs (Nocatee / Ponte Vedra growth)',
        detail:
          'COI processing, approved hours, and gate lists add soft costs and can force weekday-only windows.',
      },
      {
        title: 'Historic & coastal long-carry labor',
        detail:
          'St. Augustine narrow streets, stairs, and limited curb staging add labor suburban HOA quotes miss.',
      },
      {
        title: 'I-95 / US-1 / A1A portal time',
        detail:
          'Nocatee ↔ St. Augustine or St. Johns ↔ Duval pairs burn more clock than map miles suggest at peak — freer than Jax core, still billable.',
      },
      {
        title: 'Cross-county pairs into Duval',
        detail:
          'Long locals on I-95 and US-1 raise portal-to-portal time; confirm whether pure local rate cards still apply.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$450–$1,350+',
        note: 'Higher with historic access, HOA windows, or peak I-95',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,500–$3,900+',
        note: 'HOA soft costs and multi-zone hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / coastal / long local)',
        value: '$2,300–$6,500+',
        note: 'Long locals into Duval and large HOA homes price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, tourist & coastal calendar intelligence',
    intro:
      'St. Johns peaks follow school calendars, Nocatee family closings, St. Augustine tourism, and coastal storm season — not Jacksonville lease density alone.',
    items: [
      {
        title: 'Peak residential: late spring – early fall weekends',
        detail:
          'School calendars and growth-village closings fill Saturdays across Nocatee and Ponte Vedra. Book 2–4 weeks ahead for popular HOA windows.',
      },
      {
        title: 'St. Augustine tourist peaks',
        detail:
          'Holiday and festival weekends worsen historic-core and A1A timing even for pure residential addresses near downtown.',
      },
      {
        title: 'Summer heat & hurricane season',
        detail:
          'Open growth streets get hot early; coastal addresses need flexible weather language June–November. Prefer dawn starts.',
      },
      {
        title: 'Best value: mid-month Tue–Thu mornings',
        detail:
          'Still plan around HOA weekday windows. Avoid last Friday/Saturday of the month when leases and family moves collide.',
      },
    ],
  },
  specialized: [
    {
      id: 'historic-coastal',
      title: 'Historic coastal & St. Augustine access',
      intro:
        'St. Johns’s defining coastal product is historic last-mile and A1A-adjacent staging — not Jacksonville river-core elevators alone.',
      bullets: [
        'Survey curb width, stairs, and truck-length limits on historic blocks before booking.',
        'Buffer tourist peaks on A1A and downtown approaches; prefer mid-week residential windows.',
        'Share flood-map and storm-exposure context for coastal and island-approach addresses.',
        'Name both cities — refuse vague “St. Johns local” language for historic ↔ growth pairs.',
      ],
    },
    {
      id: 'nocatee-hoa-growth',
      title: 'Nocatee-style HOA growth logistics',
      intro:
        'North St. Johns master-planned villages treat gate lists, COI, and family-volume SFH as the default operating system.',
      bullets: [
        'Send HOA management packets, COI requirements, and gate lists with the estimate.',
        'Confirm approved move hours and floor-protection rules before booking Saturday crews.',
        'Reconfirm street access the week of the move in active construction villages.',
        'Inventory family-volume SFH carefully — suburban loads often exceed older coastal condos.',
      ],
    },
    {
      id: 'i95-us1-corridors',
      title: 'I-95 / US-1 / A1A corridor timing',
      intro:
        'I-95, US-1, FL-16, A1A, and Nocatee Parkway turn “local” St. Johns pairs into corridor-timed jobs.',
      bullets: [
        'Price portal-to-portal time honestly for Nocatee ↔ St. Augustine and St. Johns ↔ Duval pairs.',
        'Build buffer for school and commute peaks on I-95 and US-1.',
        'Clarify Duval addresses near county lines so distance assumptions stay accurate.',
        'Ask whether far-west rural pairs still use a pure local rate card.',
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
          'St. Johns County School District serves most public K–12 students and is often a relocator focus. Match every listing address to the correct attendance zone.',
        bullets: [
          {
            title: 'Zone before city marketing',
            detail:
              'Use official district boundary tools. St. Augustine, Nocatee, and Ponte Vedra brands can span multiple feeders and choice programs.',
          },
          {
            title: 'Growth vs established systems',
            detail:
              'Enrollment pressures differ between rapid-growth Nocatee edges and longer-established coastal corridors — do not treat county averages as neighborhood truth.',
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
              'Flagler Hospital and other regional facilities cover much of St. Johns; map ER drive times at rush hour from Nocatee and west edges — not only from St. Augustine proper.',
          },
          {
            title: 'Jacksonville specialty spillover',
            detail:
              'Some residents use Duval specialty systems. Confirm insurer networks and realistic I-95 / US-1 appointment drive times.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful St. Johns County resources',
    intro:
      'Local official links first. FDACS, FMCSA, and Move Trust Hub tools are added automatically for licensing checks.',
    items: [
      {
        label: 'St. Johns County',
        href: 'https://www.sjcfl.us/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of St. Augustine',
        href: 'https://www.citystaug.com/',
        external: true,
      },
      {
        label: 'St. Johns County School District',
        href: 'https://www.stjohns.k12.fl.us/',
        external: true,
      },
      {
        label: 'FL511 — traffic conditions',
        href: 'https://fl511.com/',
        note: 'I-95, US-1, A1A before load windows',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter by zone (St. Augustine historic/coastal, Nocatee/north, Ponte Vedra, west/rural) when available. Confirm HOA/COI for growth villages, historic curb access, and honest I-95/US-1 time — this is Jax south coastal growth, not a renamed Duval core pack. Parent market: Duval guide for metro-core context.',
  lastReviewed: '2026-07-24',
});
