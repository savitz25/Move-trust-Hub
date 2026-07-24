import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeFlTier2Pack,
  FL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/florida/fl-tier2-shared';

/**
 * Nassau County — Florida Tier 2 (Jax north coastal).
 * Parent: Duval County. Fernandina Beach / Yulee —
 * NOT Jacksonville core.
 */
export const nassauCountyIntelligence: CountyIntelligencePack = finalizeFlTier2Pack({
  countySlug: 'nassau',
  hubTitle: 'Nassau County Moving Intelligence Hub',
  eyebrow: 'Nassau County · Jax north coastal · Fernandina Beach / Yulee',
  h1: 'Moving in Nassau County: Jax North Coastal — Fernandina Beach, Amelia Island & Yulee',
  heroOpener:
    'Nassau County is Jacksonville’s north coastal collar — Fernandina Beach and Amelia Island historic/coastal stock, Yulee mainland growth, Callahan and west corridors, and rural north edges — not Jacksonville core elevators with a different exit number. I-95, A1A, US-17, FL-200, and Amelia Island approaches set portal-to-portal time for households still oriented to Jax jobs or coastal living. Compared with Duval, you get freer mid-day freeflow than river-core gridlock, island/bridge logistics that downtown rate cards miss, and growth-collar HOA product in Yulee that is not a Jax rename. This guide is for people moving in Nassau as a north coastal market with its own role — not recycled Jacksonville core scripts.',
  heroCredibility:
    'Jax north coastal · Fernandina / Amelia Island / Yulee · FDACS Ch. 507 (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-95 · A1A · US-17 · FL-200 · Amelia Island approaches',
  parentCompare: {
    parentLabel: 'Duval County',
    parentHref: '/local-movers/florida/duval',
    title: 'Compared with Duval County',
    intro:
      'Nassau is Jacksonville’s north coastal collar — Fernandina/Amelia Island, Yulee growth, Callahan/west, and rural north edges — not a drop-in template for downtown elevators, Southside sprawl, or Jacksonville Beach product alone. Use Duval as the dense North Florida Tier 1 parent contrast. Not Jacksonville core.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Duval crews fight I-95 / I-10 / bridges and multi-zone river-sprawl pairs. Nassau pairs ride I-95, A1A, US-17, FL-200, and Amelia Island approaches — freer mid-day than Jax core, still peak-heavy on Yulee ↔ island and I-95 north hauls. Island bridge time is real; it is not a short downtown dock job.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Duval mixes urban core, beach towns, and vast suburban sprawl under one large county. Nassau’s ladder is Fernandina/Amelia historic and coastal product, Yulee mainland HOA growth, Callahan smaller-city/west stock, and rural north edges — more island access and north-collar empty miles, less Jax-scale multi-zone density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Duval core needs elevators, curb permits, and multi-bridge timing. Nassau stages more island-approach, historic Fernandina, and Yulee driveway/HOA work. Bridge constraints, coastal storm exposure, and gate lists stack differently than Jacksonville core docks.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Nassau quotes often sit near secondary-collar rates for simple mainland driveway access — island bridge time, historic long carries, I-95 peak, and rural empty miles still push prices up. Expect coastal and island premiums, not Jacksonville core scarcity pricing alone.',
      },
      {
        title: 'Role difference',
        detail:
          'Nassau is Jax north’s coastal and growth collar — Fernandina/Amelia identity and Yulee bedroom volume — not Duval’s job-center core. Treat it as its own north coastal market when matching crews and rate cards. Not Jacksonville core.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Nassau County different',
    intro:
      'North coastal realities — Amelia Island access, Yulee growth HOAs, I-95 freeflow that is still billable, and rural west edges — that change estimates.',
    bullets: [
      {
        title: 'Island/coastal and mainland growth are different products',
        detail:
          'A Fernandina historic bungalow, an Amelia Island coastal home, a Yulee HOA tract, and a Callahan rural edge parcel do not share truck access or bridge rules. Name both communities on every estimate.',
      },
      {
        title: 'I-95 freeflow is not Jax core gridlock — still a line item',
        detail:
          'Yulee ↔ Fernandina or Nassau ↔ Duval pairs freer than river-core still burn billable time at school and commute peaks. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'Amelia Island approaches rewrite last-mile',
        detail:
          'Bridge constraints, tourist peaks, sand protection, and limited staging define island jobs that pure mainland rate cards miss.',
      },
      {
        title: 'North collar is not Jacksonville core',
        detail:
          'Nassau’s coastal tourism, Yulee growth, and rural west edges are their own market — refuse recycled Jax core rate cards without naming both cities and access type.',
      },
      FL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading:
    'Nassau zones: Fernandina/Amelia Island, Yulee growth, Callahan/west & rural north edges',
  zonesIntro:
    'Four sharp products — not a six-zone dump. Fernandina/Amelia Island, Yulee growth, Callahan/west, and rural north edges price and stage differently under the same north coastal collar.',
  zones: [
    {
      id: 'fernandina-amelia',
      name: 'Fernandina Beach & Amelia Island',
      shortName: 'Fernandina / Amelia',
      neighborhoods: [
        'Fernandina Beach',
        'Historic Fernandina',
        'Amelia Island coastal residential',
        'A1A island corridors',
        'Resort and gated coastal edges',
      ],
      housingTypes:
        'Historic SFH, coastal-adjacent homes, gated and HOA product, multi-family near resort corridors, beach-edge stock',
      challenges: [
        'Bridge/causeway constraints and truck limits',
        'Tourist peaks on island approaches',
        'Historic curb staging and long carries',
        'Storm-exposed and flood-aware parcels',
      ],
      moverTips:
        'Confirm bridge and truck constraints before dispatch. Survey historic curb and stairs early. Prefer mid-week island windows over holiday peaks. Document weather reschedule policies in hurricane season.',
      cityKeywords: [
        'fernandina beach',
        'fernandina',
        'amelia island',
        'fernandina beach fl',
        'amelia island fl',
      ],
    },
    {
      id: 'yulee-growth',
      name: 'Yulee Mainland Growth',
      shortName: 'Yulee',
      neighborhoods: [
        'Yulee',
        'FL-200 / A1A mainland corridors',
        'I-95 Yulee approaches',
        'Master-planned and HOA villages',
        'North Duval border edges',
      ],
      housingTypes:
        'Suburban SFH, HOA communities, newer construction, multi-family growth, family-volume tracts',
      challenges: [
        'HOA COI, gates, and approved hours',
        'I-95 / FL-200 peak congestion',
        'School-calendar Saturday demand',
        'Cross-county pairs into Duval',
      ],
      moverTips:
        'Collect HOA packets before the survey is final. Price Yulee ↔ Fernandina as a timed local with bridge buffer. Book peak-season Saturdays early. Start early in heat.',
      cityKeywords: [
        'yulee',
        'yulee fl',
        'nassau growth',
        'fl-200',
      ],
    },
    {
      id: 'callahan-west',
      name: 'Callahan & West Corridors',
      shortName: 'Callahan / west',
      neighborhoods: [
        'Callahan',
        'US-17 west corridors',
        'West Nassau suburban stock',
        'Smaller-city residential cores',
        'I-95 west approach edges',
      ],
      housingTypes:
        'Smaller-city SFH, modest multi-family, suburban tracts, working-community stock, some larger-lot edges',
      challenges: [
        'Longer empty miles from island staging',
        'US-17 / I-95 peak timing',
        'Varied HOA density vs pure Yulee growth villages',
        'Thinner same-day crew density than coastal core',
      ],
      moverTips:
        'Treat Callahan/west pairs as long-local jobs. Ask whether pure local rate cards still apply. Share driveway constraints. Prefer mid-week starts over peak arterial traffic.',
      cityKeywords: [
        'callahan',
        'callahan fl',
        'west nassau',
        'us-17 nassau',
      ],
    },
    {
      id: 'rural-north-edges',
      name: 'Rural North Edges',
      shortName: 'Rural north',
      neighborhoods: [
        'North Nassau rural edges',
        'Georgia-border approaches',
        'Larger-lot and agricultural-adjacent pockets',
        'Country-road corridors',
        'Sparse north connector stock',
      ],
      housingTypes:
        'Rural-edge SFH, larger-lot properties, manufactured homes, limited multi-family, agricultural-adjacent product',
      challenges: [
        'Long empty-mile time from coastal/Yulee staging',
        'Private roads, gates, and soft approaches after rain',
        'Fewer high-rise issues — more distance and access photos needed',
        'Weather-sensitive unpaved approaches',
      ],
      moverTips:
        'Share driveway, gate, and turnaround photos for rural parcels. Confirm whether far-north pairs still use a pure local rate card. Build buffer for two-lane corridor delays.',
      cityKeywords: [
        'nassau rural',
        'north nassau',
        'hilliard',
        'hilliard fl',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Nassau County',
    intro:
      'Same square footage prices differently by island bridge time, HOA soft costs, I-95 corridor time, and whether the job is Amelia coastal or Yulee mainland growth.',
    drivers: [
      {
        title: 'Island / A1A bridge & coastal labor',
        detail:
          'Amelia Island approaches, limited staging, and historic long carries add labor and vehicle constraints mainland driveway quotes miss.',
      },
      {
        title: 'I-95 / US-17 / FL-200 portal time',
        detail:
          'Yulee ↔ Fernandina or Nassau ↔ Duval pairs burn more clock than map miles suggest at peak — freer than Jax core, still billable.',
      },
      {
        title: 'HOA soft costs (Yulee growth)',
        detail:
          'COI processing, approved hours, and gate lists add soft costs and can force weekday-only windows.',
      },
      {
        title: 'Rural empty-mile legs',
        detail:
          'Callahan and far-north pairs add empty miles if crews stage from coastal or Yulee bases.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$450–$1,350+',
        note: 'Higher with island access, HOA windows, or peak I-95',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,500–$3,900+',
        note: 'HOA soft costs and island/bridge hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / island / long local)',
        value: '$2,400–$6,500+',
        note: 'Island jobs and long locals into Duval price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, tourist & coastal calendar intelligence',
    intro:
      'Nassau peaks follow school calendars, Yulee growth closings, Amelia tourism, and coastal storm season — not Jacksonville lease density alone.',
    items: [
      {
        title: 'Peak residential: late spring – early fall weekends',
        detail:
          'School calendars and growth-village closings fill Saturdays across Yulee. Book 2–4 weeks ahead for popular HOA windows.',
      },
      {
        title: 'Amelia Island tourist peaks',
        detail:
          'Holiday and festival weekends worsen island-approach timing even for pure residential addresses near Fernandina.',
      },
      {
        title: 'Summer heat & hurricane season',
        detail:
          'Open growth streets get hot early; coastal and island addresses need flexible weather language June–November. Prefer dawn starts.',
      },
      {
        title: 'Best value: mid-month Tue–Thu mornings',
        detail:
          'Still plan around HOA weekday windows. Avoid peak tourist Saturdays on island approaches when flexible.',
      },
    ],
  },
  specialized: [
    {
      id: 'island-coastal-access',
      title: 'Island & coastal access logistics',
      intro:
        'Nassau’s defining specialty product is Amelia Island / Fernandina coastal access — bridge constraints and historic last-mile that Jacksonville core elevators do not share.',
      bullets: [
        'Confirm bridge/causeway constraints and truck limits before dispatch.',
        'Survey historic curb, stairs, and staging on Fernandina blocks early.',
        'Budget sand protection and limited staging plans for coastal blocks.',
        'Document weather reschedule and storage policies before deposit in hurricane season.',
      ],
    },
    {
      id: 'i95-north-collar',
      title: 'I-95 north collar & corridor timing',
      intro:
        'I-95, A1A, US-17, and FL-200 turn “local” Nassau pairs into corridor-timed north-collar jobs.',
      bullets: [
        'Price portal-to-portal time honestly for Yulee ↔ Fernandina and Nassau ↔ Duval pairs.',
        'Build buffer for school and commute peaks on I-95 and FL-200.',
        'Clarify Duval addresses near county lines so distance assumptions stay accurate.',
        'Ask whether Callahan/rural pairs still use a pure local rate card.',
      ],
    },
    {
      id: 'not-jacksonville-core',
      title: 'North coastal collar without Jacksonville core assumptions',
      intro:
        'I-95 freeflow is real — but Nassau is not a thinner Duval script. Survey the actual pocket: island, Yulee growth, or rural west.',
      bullets: [
        'Name both pockets on every estimate (e.g. Yulee → Amelia Island); “Nassau local” hides portal time.',
        'Match crews to product: island coastal vs Yulee HOA vs Callahan smaller-city access.',
        'Collect HOA packets for Yulee growth before the survey is final.',
        'Do not import Jacksonville rate cards without naming both cities and access type — this is not Jacksonville core.',
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
          'Nassau County School District serves most public K–12 students. Match every listing address to the correct attendance zone.',
        bullets: [
          {
            title: 'Zone before city marketing',
            detail:
              'Use official district boundary tools. Fernandina, Yulee, and Callahan brands can span multiple feeders.',
          },
          {
            title: 'Growth vs island systems',
            detail:
              'Enrollment and bus patterns differ between Yulee growth and island/coastal pockets — do not treat county averages as neighborhood truth.',
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
              'Baptist Medical Center Nassau and other regional facilities cover much of Nassau; map ER drive times at rush hour from Callahan and rural north — not only from Fernandina proper.',
          },
          {
            title: 'Jacksonville specialty spillover',
            detail:
              'Some residents use Duval specialty systems. Confirm insurer networks and realistic I-95 appointment drive times.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Nassau County resources',
    intro:
      'Local official links first. FDACS, FMCSA, and Move Trust Hub tools are added automatically for licensing checks.',
    items: [
      {
        label: 'Nassau County',
        href: 'https://www.nassaucountyfl.com/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Fernandina Beach',
        href: 'https://www.fbfl.us/',
        external: true,
      },
      {
        label: 'Nassau County School District',
        href: 'https://www.nassau.k12.fl.us/',
        external: true,
      },
      {
        label: 'FL511 — traffic conditions',
        href: 'https://fl511.com/',
        note: 'I-95, A1A, FL-200 before load windows',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter by zone (Fernandina/Amelia Island, Yulee, Callahan/west, rural north) when available. Confirm island bridge constraints, Yulee HOA packets, and honest I-95 time — this is Jax’s north coastal collar, not Jacksonville core. Parent market: Duval guide for metro-core context.',
  lastReviewed: '2026-07-24',
});
