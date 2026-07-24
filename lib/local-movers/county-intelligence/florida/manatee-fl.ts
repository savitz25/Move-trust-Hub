import {
  finalizeFlTier2Pack,
  FL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/florida/fl-tier2-shared';

/**
 * Manatee County — Florida Tier 2 (Bradenton — Tampa Bay south).
 * Parent: Hillsborough County (Sarasota contrast). Bradenton / Lakewood Ranch /
 * Palmetto / Anna Maria — NOT a renamed Tampa-core or Sarasota pack.
 */
export const manateeCountyIntelligence = finalizeFlTier2Pack({
  countySlug: 'manatee',
  hubTitle: 'Manatee County Moving Intelligence Hub',
  eyebrow: 'Manatee County · Bradenton — Tampa Bay south',
  h1: 'Moving in Manatee County: Bradenton, Lakewood Ranch Growth & Anna Maria Coastal Logistics',
  heroOpener:
    'Manatee County is Tampa Bay’s southern edge — Bradenton core and bayfront stock, Lakewood Ranch master-planned growth, Palmetto and Ellenton river/US-301 corridors, and Anna Maria Island / coastal-edge access — not Hillsborough Tampa-core elevators and not a Sarasota Siesta Key rename. I-75 freeflow still bills at peak; US-41, US-301, FL-64, and causeway approaches rewrite portal-to-portal time; HOA villages and barrier-island constraints do not share a truck plan. Quote the pocket: downtown Bradenton multi-unit, Lakewood Ranch cul-de-sac, Palmetto SFH, or Anna Maria coastal edge — never “Manatee County local” as one rate card.',
  heroCredibility:
    'Tampa Bay south · Bradenton / Lakewood Ranch / Anna Maria · FDACS Ch. 507 (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-75 · US-41 · US-301 · FL-64 · Anna Maria approaches',
  parentCompare: {
    parentLabel: 'Hillsborough County',
    parentHref: '/local-movers/florida/hillsborough',
    title: 'Compared with Hillsborough County',
    intro:
      'Manatee is Tampa Bay south of Hillsborough — Bradenton / Lakewood Ranch identity with bay and barrier-island product, not Tampa urban-core elevators or Channelside density. Sarasota contrast: more Bradenton bayfront and Lakewood Ranch HOA growth, less Siesta Key / downtown Sarasota tourism density. Use this when one address sits in Hillsborough (or Sarasota) and the other in Manatee.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Hillsborough crews fight I-275, downtown Tampa arterials, and bay-bridge peaks into Pinellas. Manatee pairs ride I-75, US-41, US-301, FL-64, and Anna Maria causeway approaches — freer mid-day freeflow than Tampa core, still billable at rush and beach weekends. Bradenton ↔ Lakewood Ranch or Palmetto ↔ coastal edges burn portal-to-portal time map miles understate. Cross-county Manatee ↔ Hillsborough (and Sarasota) pairs are long locals on the I-75 spine.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Hillsborough mixes Tampa vertical multi-family, South Tampa SFH, and New Tampa HOA growth. Manatee’s ladder is Bradenton bayfront and mid-century stock, Lakewood Ranch master-planned HOA villages, Palmetto/Ellenton river-corridor SFH, and Anna Maria / coastal-edge constrained approaches — more barrier-island and ranch-growth product, less downtown high-rise.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Manatee stages more driveway, cul-de-sac, and coastal-edge curb work than Tampa core elevators. Lakewood Ranch HOAs dominate growth logistics; island and bayfront pockets add bridge timing, narrow approaches, and moisture-aware packing. Soft ground and flood-mapped parcels replace freight-dock fights as the hard coastal cases.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Same-zone Bradenton jobs can look secondary-market simple until HOA windows, causeway timing, and peak I-75 time hit. Cross-zone pairs into Hillsborough or Sarasota raise the bill above pure in-town quotes. Do not assume Tampa-core rates transfer without naming both cities and corridors.',
      },
      {
        title: 'Role difference',
        detail:
          'Manatee is Tampa Bay’s southern Bradenton / Lakewood Ranch / Anna Maria market — distinct from Tampa-core Hillsborough and from Sarasota’s tourism-coast brand. Match crews to HOA packets, coastal access photos, and honest corridor freeflow time.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Manatee County different',
    intro:
      'Tampa Bay south realities — Bradenton bay logistics, Lakewood Ranch HOA growth, coastal-edge access, and Florida licensing — that a renamed Tampa or Sarasota pack would miss.',
    bullets: [
      {
        title: 'Bradenton core, ranch growth, and island edges are different products',
        detail:
          'A downtown Bradenton multi-unit, a Lakewood Ranch HOA two-story, a Palmetto river-corridor SFH, and an Anna Maria coastal home do not share truck access. Name both cities — “Manatee County local” fails across bay vs growth last-mile.',
      },
      {
        title: 'Lakewood Ranch HOA density is the growth default',
        detail:
          'Master-planned villages require COI, approved hours, gate lists, and truck limits. Treat the HOA packet as part of the survey — not an afterthought on move morning.',
      },
      {
        title: 'Anna Maria and coastal approaches rewrite timing',
        detail:
          'Causeway congestion, beach weekends, and constrained island staging are line items. Share approach photos; never quote barrier-edge work as a flat Bradenton suburban job.',
      },
      {
        title: 'I-75 / US-41 / US-301 freeflow is still clock time',
        detail:
          'Many households pair addresses across Bradenton, Lakewood Ranch, Palmetto, and into Hillsborough or Sarasota. Peak corridor delays are billable. Ask how portal-to-portal time is priced.',
      },
      FL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Manatee County zones: Bradenton, ranch growth & coastal edges',
  zonesIntro:
    'Four sharp products — Bradenton core, Lakewood Ranch growth, Palmetto/Ellenton corridor, and Anna Maria / coastal edges. Not a Tampa zone dump with new labels.',
  zones: [
    {
      id: 'bradenton-core',
      name: 'Bradenton core & bayfront',
      shortName: 'Bradenton core',
      neighborhoods: [
        'Downtown Bradenton',
        'West Bradenton / bayfront edges',
        'East Bradenton residential',
        'Manatee Avenue corridors',
        'Older SFH and multi-unit pockets',
      ],
      housingTypes:
        'Bayfront and mid-century SFH, multi-family, downtown multi-unit, some redevelopment product',
      challenges: [
        'Constrained curb staging near bayfront and older grids',
        'US-41 / arterial peaks into and out of core',
        'Mix of HOA and non-HOA rules',
        'Humidity and storm-season packing awareness',
      ],
      moverTips:
        'Share building and curb photos for multi-unit and older lots. Prefer mid-week mornings over beach-weekend peaks. Price Bradenton ↔ Lakewood Ranch as a timed local, not a flat same-zone job.',
      cityKeywords: [
        'bradenton',
        'downtown bradenton',
        'west bradenton',
        'bradenton fl',
      ],
    },
    {
      id: 'lakewood-ranch-growth',
      name: 'Lakewood Ranch & eastern HOA growth',
      shortName: 'Lakewood Ranch',
      neighborhoods: [
        'Lakewood Ranch',
        'University Park edges',
        'Lakewood Ranch Main Street corridors',
        'Newer master-planned villages',
        'I-75 east growth pockets',
      ],
      housingTypes:
        'Master-planned SFH, townhomes, HOA villages, multi-family near retail, active new construction',
      challenges: [
        'HOA COI, gates, and approved hours',
        'I-75 / FL-70 / local arterial congestion',
        'Incomplete roads on active construction streets',
        'High Saturday demand in peak season',
      ],
      moverTips:
        'Collect HOA packets before the survey is final. Reconfirm street access the week of the move in new sections. Book summer Saturdays early. Dawn starts beat heat on open tracts.',
      cityKeywords: [
        'lakewood ranch',
        'university park',
        'lakewood ranch fl',
      ],
    },
    {
      id: 'palmetto-ellenton',
      name: 'Palmetto, Ellenton & US-301 / river corridor',
      shortName: 'Palmetto / Ellenton',
      neighborhoods: [
        'Palmetto',
        'Ellenton',
        'US-301 corridor',
        'River-edge and outlet-area approaches',
        'North Manatee suburban pockets',
      ],
      housingTypes:
        'Suburban SFH, older small-city stock, multi-family, larger-lot edges',
      challenges: [
        'US-301 / I-75 approach timing',
        'Cross-zone pairs toward Bradenton or Hillsborough edges',
        'Variable driveway and older-street access',
        'Retail/tourist spillover near outlet corridors',
      ],
      moverTips:
        'Price Palmetto ↔ Bradenton and Ellenton ↔ Lakewood Ranch with honest arterial time. Survey older lots for curb and driveway constraints. Mid-week starts reduce corridor pain.',
      cityKeywords: [
        'palmetto',
        'ellenton',
        'palmetto fl',
        'ellenton fl',
      ],
    },
    {
      id: 'anna-maria-coastal',
      name: 'Anna Maria Island & coastal / bay edges',
      shortName: 'Anna Maria / coastal',
      neighborhoods: [
        'Anna Maria',
        'Holmes Beach',
        'Bradenton Beach',
        'Bayfront and canal-edge pockets',
        'Causeway approach corridors',
      ],
      housingTypes:
        'Coastal SFH, elevated and flood-aware homes, vacation and multi-family pockets, constrained lots',
      challenges: [
        'Causeway congestion and beach-weekend timing',
        'Narrow roads, limited turnaround, and long carries',
        'Flood-mapped parcels and moisture-aware packing',
        'Hurricane-season contingency needs',
      ],
      moverTips:
        'Access-first: bridge timing, road width, gates, and turnaround photos before dispatch. Avoid peak beach weekends when flexible. Do not quote as a flat Bradenton suburban job.',
      cityKeywords: [
        'anna maria',
        'holmes beach',
        'bradenton beach',
        'anna maria island',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Manatee County',
    intro:
      'Same square footage prices differently by HOA soft costs, coastal access, I-75 / US-41 portal time, and whether the job is ranch growth or island edge.',
    drivers: [
      {
        title: 'Cross-zone I-75 / US-41 / US-301 corridor time',
        detail:
          'Bradenton ↔ Lakewood Ranch, Palmetto ↔ coastal edges, or peak I-75 legs burn more clock than map miles suggest. Hourly billing follows the clock.',
      },
      {
        title: 'HOA soft costs (Lakewood Ranch & planned villages)',
        detail:
          'COI processing, approved hours, and gate lists add soft costs and can force weekday-only windows before labor starts.',
      },
      {
        title: 'Coastal / island access labor',
        detail:
          'Causeway delays, narrow approaches, long carries, and moisture protection on bay and barrier-edge homes add hours not visible in inland square footage.',
      },
      {
        title: 'Cross-county pairs into Hillsborough or Sarasota',
        detail:
          'Long locals on the I-75 spine raise portal-to-portal time; confirm whether pure local rate cards still apply.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$450–$1,400+',
        note: 'Higher with HOA windows, coastal access, or peak corridors',
      },
      {
        label: '2–3BR house / HOA village',
        value: '$1,400–$3,800+',
        note: 'Gate rules and multi-zone hauls trend up',
      },
      {
        label: '3–4+ BR (coastal edge / cross-zone / long local)',
        value: '$2,200–$6,500+',
        note: 'Island access and Hillsborough/Sarasota pairs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, coastal & growth-calendar intelligence',
    intro:
      'Snowbird shoulders, school calendars, summer heat/humidity, and hurricane season reshape crew availability across Bradenton growth and coastal edges.',
    items: [
      {
        title: 'Peak residential: late spring – early fall weekends',
        detail:
          'Family and HOA growth moves fill Lakewood Ranch and Bradenton Saturdays first. Book 2–4 weeks ahead for popular windows.',
      },
      {
        title: 'Snowbird & seasonal coastal turnover',
        detail:
          'Winter and shoulder seasons tighten preferred crews on bay and island edges. Still quieter than deep South Florida peaks — not zero.',
      },
      {
        title: 'Hurricane season: June–November',
        detail:
          'Coastal and flood-mapped parcels need weather contingency language. Confirm reschedule policies before deposits.',
      },
      {
        title: 'Best value: mid-month Tue–Thu mornings',
        detail:
          'Beat I-75 peaks and beach-weekend causeway traffic. Still honor HOA weekday windows where required.',
      },
    ],
  },
  specialized: [
    {
      id: 'coastal-bay-access',
      title: 'Coastal & bay access logistics',
      intro:
        'Anna Maria approaches and bayfront/canal parcels need truck-access plans flat inland tracts never see.',
      bullets: [
        'Share causeway timing expectations, road width, gates, and turnaround photos before booking.',
        'Plan moisture-aware packing and flood-map awareness for coastal and canal-edge addresses.',
        'Avoid peak beach weekends when flexible; build buffer for bridge delays.',
        'Price empty-mile and long-carry time honestly versus inland Bradenton suburban jobs.',
      ],
    },
    {
      id: 'hoa-growth-lakewood-ranch',
      title: 'Lakewood Ranch HOA & growth-village logistics',
      intro:
        'Manatee’s inland volume problem is often master-planned access plus unfinished streets — not Tampa elevators.',
      bullets: [
        'Collect HOA COI, gate lists, approved hours, and truck limits before the survey is final.',
        'Reconfirm street access the week of the move in active construction villages.',
        'Photo cul-de-sac turnarounds so crews bring the right truck length.',
        'Book peak summer Saturdays early; mid-week windows often reduce friction and price pressure.',
      ],
    },
    {
      id: 'tampa-bay-south-identity',
      title: 'Distinct from Tampa core & Sarasota brand',
      intro:
        'Manatee is Bradenton / Lakewood Ranch / Anna Maria — not a Hillsborough or Sarasota rate-card swap.',
      bullets: [
        'Name both cities and corridors on the estimate; refuse vague “Tampa Bay local” language across county lines.',
        'Price Manatee ↔ Hillsborough and Manatee ↔ Sarasota as long locals with honest I-75 time.',
        'Match crews to coastal access vs HOA growth vs Bradenton core — three different playbooks.',
        'Confirm FDACS for pure in-state hops and FMCSA when any leg leaves Florida.',
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
          'Manatee County Schools serves most public K–12 students. Match every listing address to the correct attendance zone — city marketing names can span feeders.',
        bullets: [
          {
            title: 'Zone before community branding',
            detail:
              'Use official district boundary tools. Bradenton, Lakewood Ranch, and island-area brands can span multiple feeders and choice programs.',
          },
          {
            title: 'Growth-area capacity',
            detail:
              'Eastern HOA growth can pressure enrollment as new tracts open. Verify current capacity and construction plans when touring.',
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
              'Manatee Memorial and other regional campuses serve much of the county; map ER drive times at rush hour from Lakewood Ranch and coastal edges — not only from Bradenton proper.',
          },
          {
            title: 'Tampa Bay specialty spillover',
            detail:
              'Some residents use Hillsborough or Sarasota specialty systems. Confirm insurer networks and realistic I-75 / arterial drive times.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Manatee County resources',
    intro:
      'Local official links first. FDACS, FMCSA, and Move Trust Hub tools are added automatically for licensing checks.',
    items: [
      {
        label: 'Manatee County',
        href: 'https://www.mymanatee.org/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Bradenton',
        href: 'https://www.cityofbradenton.com/',
        external: true,
      },
      {
        label: 'City of Palmetto',
        href: 'https://www.palmettofl.org/',
        external: true,
      },
      {
        label: 'Manatee County Schools',
        href: 'https://www.manateeschools.net/',
        external: true,
      },
      {
        label: 'FL511 — traffic conditions',
        href: 'https://fl511.com/',
        note: 'I-75, US-41, US-301, FL-64 before load windows',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter by zone (Bradenton core, Lakewood Ranch, Palmetto/Ellenton, Anna Maria/coastal) when available. Confirm HOA/COI for growth villages, coastal access photos for island/bay edges, and honest I-75 freeflow time — this is Tampa Bay south, not a renamed Tampa or Sarasota pack. Parent market: Hillsborough guide for metro-core context.',
  lastReviewed: '2026-07-24',
});
