import {
  finalizeFlTier2Pack,
  FL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/florida/fl-tier2-shared';

/**
 * Collier County — Florida Tier 2 (Naples / Marco Island — SWFL secondary).
 * Parent: Lee County. Naples coastal, North Naples/Golden Gate, Marco Island,
 * Immokalee/east edges — NOT a Fort Myers rename.
 */
export const collierCountyIntelligence = finalizeFlTier2Pack({
  countySlug: 'collier',
  hubTitle: 'Collier County Moving Intelligence Hub',
  eyebrow: 'Collier County · Naples / Marco Island — SWFL secondary',
  h1: 'Moving in Collier County: Naples Coastal, Marco Island & North Naples HOA Logistics',
  heroOpener:
    'Collier County is Southwest Florida’s Naples / Marco Island secondary market — affluent coastal HOA and gated villages, North Naples and Golden Gate growth, Marco Island bridge logistics, and Immokalee / east-county edges — not Fort Myers with different beach names and not a recycled Lee County rate card. I-75 and US-41 freeflow still bill at peak; CR-951, Immokalee Road, and Marco approaches rewrite portal-to-portal time; seasonal snowbird calendars pack preferred crews. Quote the pocket: Old Naples condo or villa, gated North Naples estate, Marco Island multi-level, or east-edge SFH — never “Collier County local” as one product.',
  heroCredibility:
    'SWFL secondary · Naples / Marco / North Naples · FDACS Ch. 507 (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-75 · US-41 · CR-951 · Immokalee Rd · Marco Island approaches',
  parentCompare: {
    parentLabel: 'Lee County',
    parentHref: '/local-movers/florida/lee',
    title: 'Compared with Lee County',
    intro:
      'Collier is the Naples / Marco Island secondary south of Lee’s Fort Myers / Cape Coral core — more affluent coastal HOA and gated product, barrier-island Marco logistics, and east-county Immokalee edges. Use this when one address sits in Lee and the other in Collier; do not treat Naples as a Fort Myers rename.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Lee pairs orient to I-75, US-41, Cape Coral bridges, and Fort Myers arterials. Collier pairs ride I-75, US-41 (Tamiami Trail), CR-951, Immokalee Road, and Marco Island approaches — freer mid-day freeflow than peak Fort Myers bridges, still billable at snowbird and beach weekends. Naples ↔ Marco or North Naples ↔ Golden Gate burns portal-to-portal time map miles understate. Cross-county Collier ↔ Lee pairs are long locals on the I-75 / US-41 spine.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Lee mixes Fort Myers multi-family, Cape Coral canal SFH, and mid-market suburban growth. Collier’s ladder is Old Naples coastal condos and villas, affluent gated/HOA estates, North Naples and Golden Gate planned communities, Marco Island multi-level homes, and Immokalee / east-edge working and rural-adjacent stock — more luxury-coastal and gated density, less Cape canal product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Collier stages more gated entries, COI packets, and coastal multi-level carries than typical Fort Myers mid-market jobs. Marco bridge timing and island constraints are their own playbook. East-county longer empty miles replace Cape bridge fights as the hard inland cases.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Same-zone North Naples jobs can look secondary-market simple until gate windows, elevator/villa rules, and peak US-41 time hit. Affluent coastal inventories and Marco access raise labor hours above pure inland Golden Gate quotes. Do not assume Fort Myers rates transfer without naming both cities and corridors.',
      },
      {
        title: 'Role difference',
        detail:
          'Collier is SWFL’s Naples / Marco secondary — affluent coastal HOA identity and seasonal snowbird demand — not a Lee Fort Myers bedroom dump. Match crews to gated logistics, humidity/storm packing, and honest corridor freeflow time.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Collier County different',
    intro:
      'SWFL secondary realities — affluent coastal HOAs, Marco Island access, snowbird calendars, humidity, and Florida licensing — that a renamed Fort Myers pack would miss.',
    bullets: [
      {
        title: 'Naples coastal, North Naples growth, Marco, and east edges are different products',
        detail:
          'An Old Naples condo, a gated North Naples estate, a Marco multi-level home, and an Immokalee-edge SFH do not share truck access. Name both cities — “Collier County local” fails across island vs inland last-mile.',
      },
      {
        title: 'Affluent HOA and gated communities dominate coastal volume',
        detail:
          'Certificates of insurance, gate lists, approved hours, elevator reservations, and truck length limits are the default in many Naples-area villages. Collect management rules before locking a crew.',
      },
      {
        title: 'Seasonal snowbird calendars pack preferred windows',
        detail:
          'Winter and shoulder peaks fill coastal and gated crews first. Flexible mid-week dates often price better than peak snowbird weekends.',
      },
      {
        title: 'Humidity and storm season are operational',
        detail:
          'Moisture-aware packing, afternoon storm interruptions, and hurricane-season contingency language matter on open coastal and inland lots alike.',
      },
      FL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Collier County zones: Naples coastal, North Naples, Marco & east edges',
  zonesIntro:
    'Four sharp products — Naples coastal core, North Naples/Golden Gate growth, Marco Island, and Immokalee/east edges. Not a Fort Myers zone dump with Naples labels.',
  zones: [
    {
      id: 'naples-coastal',
      name: 'Naples coastal core: Old Naples, beaches & bayfront',
      shortName: 'Naples coastal',
      neighborhoods: [
        'Old Naples',
        'Naples beach and Gulf-edge pockets',
        'Port Royal edges',
        'Bayfront and canal-adjacent homes',
        'Downtown Naples multi-unit',
      ],
      housingTypes:
        'Coastal condos, villas, elevated and flood-aware SFH, luxury multi-level, gated pocket communities',
      challenges: [
        'Constrained curb staging and truck length limits',
        'Elevator / building COI rules in multi-unit',
        'US-41 and beach-corridor congestion',
        'Humidity, flood maps, and storm-season packing',
      ],
      moverTips:
        'Share building packets, elevator status, and truck-height limits early. Prefer mid-week mornings over snowbird beach peaks. Inventory multi-level stairs and moisture-sensitive goods explicitly.',
      cityKeywords: [
        'naples',
        'old naples',
        'port royal',
        'naples fl',
        'downtown naples',
      ],
    },
    {
      id: 'north-naples-golden-gate',
      name: 'North Naples, Golden Gate & inland planned growth',
      shortName: 'North Naples / Golden Gate',
      neighborhoods: [
        'North Naples',
        'Golden Gate',
        'Immokalee Road corridors',
        'CR-951 growth villages',
        'Master-planned and gated communities',
      ],
      housingTypes:
        'HOA SFH, gated estates, townhomes, multi-family near retail, active new construction',
      challenges: [
        'HOA COI, gates, and approved hours',
        'Immokalee Rd / CR-951 / I-75 approach timing',
        'Incomplete roads on new streets',
        'High Saturday demand in peak season',
      ],
      moverTips:
        'Collect HOA packets before the survey is final. Reconfirm access the week of the move in new sections. Price North Naples ↔ Old Naples with honest arterial time. Early starts beat heat and humidity.',
      cityKeywords: [
        'north naples',
        'golden gate',
        'immokalee road',
        'north naples fl',
      ],
    },
    {
      id: 'marco-island',
      name: 'Marco Island & barrier approaches',
      shortName: 'Marco Island',
      neighborhoods: [
        'Marco Island',
        'Marco Island mid-island residential',
        'Beach and bay-edge pockets',
        'Jolley Bridge / approach corridors',
        'Condo and multi-level clusters',
      ],
      housingTypes:
        'Island SFH, multi-level homes, condos, flood-aware and elevated stock, vacation-oriented multi-family',
      challenges: [
        'Bridge congestion and limited island staging',
        'Narrow streets and long carries',
        'Elevator/COI rules in multi-unit buildings',
        'Hurricane-season and moisture risk',
      ],
      moverTips:
        'Access-first: bridge timing, road width, gates, and turnaround photos before dispatch. Avoid peak tourist weekends when flexible. Do not quote as a flat North Naples suburban job.',
      cityKeywords: [
        'marco island',
        'marco',
        'marco island fl',
      ],
    },
    {
      id: 'immokalee-east-edges',
      name: 'Immokalee & east-county edges',
      shortName: 'Immokalee / east edges',
      neighborhoods: [
        'Immokalee',
        'East Collier agricultural edges',
        'Rural and larger-lot parcels',
        'I-75 east approaches',
        'Working-community stock',
      ],
      housingTypes:
        'Small-city SFH, rural-edge homes, manufactured-home communities, larger lots, limited multi-family',
      challenges: [
        'Long empty miles from Naples staging',
        'Unpaved or soft approaches after rain',
        'Heat and humidity on open lots',
        'Different access profile than coastal HOA product',
      ],
      moverTips:
        'Price distance and access explicitly. Share driveway and road-width photos. Confirm whether far-east pairs still use a pure Naples local rate card.',
      cityKeywords: [
        'immokalee',
        'east collier',
        'immokalee fl',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Collier County',
    intro:
      'Same square footage prices differently by gated soft costs, coastal multi-level labor, Marco bridge time, and whether the job is Naples coastal or east-edge empty miles.',
    drivers: [
      {
        title: 'Cross-zone I-75 / US-41 / Immokalee Rd corridor time',
        detail:
          'Naples ↔ Marco, North Naples ↔ Golden Gate, or peak US-41 legs burn more clock than map miles suggest. Hourly billing follows the clock.',
      },
      {
        title: 'Gated / HOA soft costs',
        detail:
          'COI processing, approved hours, gate lists, and elevator reservations add soft costs and can force weekday-only windows.',
      },
      {
        title: 'Coastal multi-level & condo labor',
        detail:
          'Stairs, elevators, tight turns, and moisture protection on affluent coastal inventories raise hours above inland single-story quotes.',
      },
      {
        title: 'Marco Island access & east-edge empty miles',
        detail:
          'Bridge delays, limited staging, and long Immokalee-direction deadhead separate cheap-looking locals from real bills.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$500–$1,600+',
        note: 'Higher with elevators, gates, or peak snowbird windows',
      },
      {
        label: '2–3BR house / gated community',
        value: '$1,600–$4,200+',
        note: 'HOA soft costs and multi-zone hauls trend up',
      },
      {
        label: '3–4+ BR (coastal luxury / Marco / long east edge)',
        value: '$2,500–$7,500+',
        note: 'Island access and large coastal inventories price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, snowbird & humidity intelligence',
    intro:
      'Snowbird peaks, hurricane season, and SWFL humidity reshape crew availability more than inland mid-Florida calendars alone.',
    items: [
      {
        title: 'Snowbird peak: roughly November – April',
        detail:
          'Coastal Naples and Marco preferred crews fill first. Book weeks ahead for popular gated and condo windows; mid-week often prices better than peak weekends.',
      },
      {
        title: 'Hurricane season: June–November',
        detail:
          'Coastal and flood-mapped parcels need weather contingency language. Confirm reschedule policies before deposits.',
      },
      {
        title: 'Summer heat & humidity',
        detail:
          'Open tracts and island asphalt get oppressive early. Prefer dawn starts; plan moisture protection for afternoon storms.',
      },
      {
        title: 'Best value: mid-month Tue–Thu mornings (shoulder seasons)',
        detail:
          'Still honor HOA weekday windows and building elevator reservations. Avoid last-weekend-of-month lease and snowbird turn collisions when flexible.',
      },
    ],
  },
  specialized: [
    {
      id: 'affluent-coastal-hoa-gated',
      title: 'Affluent coastal HOA & gated logistics',
      intro:
        'Collier’s Naples-area volume problem is often paperwork-first gated access plus multi-level coastal inventories — not Fort Myers mid-market canal jobs.',
      bullets: [
        'Collect HOA/gate COI, approved hours, elevator reservations, and truck limits before the survey is final.',
        'Photo gate entries, cul-de-sacs, and multi-level stair paths so crews staff correctly.',
        'Book snowbird-peak Saturdays early; mid-week windows often reduce friction and price pressure.',
        'Treat luxury inventories (art, wine, high-value furnishings) as their own packing line when relevant.',
      ],
    },
    {
      id: 'seasonal-snowbird',
      title: 'Seasonal snowbird & shoulder-season module',
      intro:
        'Winter and shoulder calendars concentrate demand on Naples coastal and Marco product more than pure inland Golden Gate growth.',
      bullets: [
        'Lock preferred coastal windows weeks ahead of peak snowbird months.',
        'Expect short-notice apartment and condo turns at season shoulders — building rules still apply.',
        'Coordinate dual-address timing when households split time between states (FMCSA for interstate legs).',
        'Build written weather and reschedule language into peak-season contracts.',
      ],
    },
    {
      id: 'humidity-storm-ops',
      title: 'Humidity, storm & SWFL climate logistics',
      intro:
        'Humidity and hurricane-season risk are operational constraints — not footnotes on a Fort Myers rename.',
      bullets: [
        'Prefer early starts; treat mid-afternoon open packing as higher risk for people and moisture-sensitive goods.',
        'Request moisture-aware packing for electronics, wood furniture, and sealed boxes on coastal jobs.',
        'Confirm hurricane-season contingency and deposit policies in writing before peak summer and fall.',
        'Share flood-map and elevation context for bay, canal, and island parcels on the survey.',
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
          'Collier County Public Schools serves most public K–12 students. Match every listing address to the correct attendance zone — Naples marketing names can span feeders.',
        bullets: [
          {
            title: 'Zone before community branding',
            detail:
              'Use official district boundary tools. Coastal Naples, North Naples, Golden Gate, and Marco brands can span multiple feeders and choice options.',
          },
          {
            title: 'Growth vs established systems',
            detail:
              'Enrollment pressure differs between rapid inland growth pockets and longer-established coastal corridors — do not treat county averages as neighborhood truth.',
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
              'NCH and other regional campuses cover much of Naples-area demand; map ER drive times at rush hour from Marco, Golden Gate, and Immokalee edges — not only from Old Naples.',
          },
          {
            title: 'SWFL specialty spillover',
            detail:
              'Some residents use Lee County or broader regional specialty systems. Confirm insurer networks and realistic I-75 / US-41 drive times.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Collier County resources',
    intro:
      'Local official links first. FDACS, FMCSA, and Move Trust Hub tools are added automatically for licensing checks.',
    items: [
      {
        label: 'Collier County',
        href: 'https://www.colliercountyfl.gov/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Naples',
        href: 'https://www.naplesgov.com/',
        external: true,
      },
      {
        label: 'City of Marco Island',
        href: 'https://www.cityofmarcoisland.com/',
        external: true,
      },
      {
        label: 'Collier County Public Schools',
        href: 'https://www.collierschools.com/',
        external: true,
      },
      {
        label: 'FL511 — traffic conditions',
        href: 'https://fl511.com/',
        note: 'I-75, US-41, CR-951 before load windows',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter by zone (Naples coastal, North Naples/Golden Gate, Marco Island, Immokalee/east edges) when available. Confirm gated/HOA packets, Marco bridge timing, and humidity/storm packing — this is a Naples/Marco secondary, not a Fort Myers rename. Parent market: Lee guide for Fort Myers/Cape context.',
  lastReviewed: '2026-07-24',
});
