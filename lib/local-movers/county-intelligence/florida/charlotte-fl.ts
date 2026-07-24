import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeFlTier2Pack,
  FL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/florida/fl-tier2-shared';

/**
 * Charlotte County — Florida Tier 2 (Port Charlotte / Punta Gorda — SWFL secondary).
 * Parent: Lee County (+ Sarasota contrast). Harbor/coastal retirement growth —
 * NOT a Fort Myers or Sarasota rename.
 */
export const charlotteCountyIntelligence: CountyIntelligencePack = finalizeFlTier2Pack({
  countySlug: 'charlotte',
  hubTitle: 'Charlotte County Moving Intelligence Hub',
  eyebrow: 'Charlotte County · Port Charlotte / Punta Gorda — SWFL secondary',
  h1: 'Moving in Charlotte County: Port Charlotte, Punta Gorda Harbor & SWFL Secondary Logistics',
  heroOpener:
    'Charlotte County is Southwest Florida’s Port Charlotte / Punta Gorda secondary — harbor and Peace River approaches, coastal-edge retirement growth, Englewood-edge product, and inland/east arterials — not Fort Myers with different harbor names and not a Sarasota tourism-coast rename. I-75 freeflow still bills at peak; US-41, FL-776, and Peace River / harbor approaches rewrite portal-to-portal time; HOA villages and canal-edge staging do not share a truck plan. Quote the pocket: Port Charlotte tract, Punta Gorda harbor/downtown, Englewood edge, or inland east SFH — never “Charlotte County local” as one product.',
  heroCredibility:
    'SWFL secondary · Port Charlotte / Punta Gorda · FDACS Ch. 507 (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-75 · US-41 · FL-776 · Peace River / harbor approaches · local arterial grid',
  parentCompare: {
    parentLabel: 'Lee County',
    parentHref: '/local-movers/florida/lee',
    title: 'Compared with Lee County',
    intro:
      'Charlotte is the Port Charlotte / Punta Gorda secondary between Lee’s Fort Myers / Cape Coral core and Sarasota’s tourism coast — more harbor-retirement and canal HOA product, less Cape bridge density and less Siesta Key intensity. Use Lee as the dense SWFL parent contrast; Sarasota is a secondary contrast for coastal brand, not the rate-card template.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Lee pairs orient to I-75, US-41, Cape Coral bridges, and Fort Myers arterials. Charlotte pairs ride I-75, US-41, FL-776, Peace River / harbor approaches, and the local arterial grid — freer mid-day freeflow than peak Fort Myers bridges, still billable at snowbird and weekend peaks. Port Charlotte ↔ Punta Gorda or Englewood edge ↔ inland burns portal-to-portal time map miles understate. Cross-county Charlotte ↔ Lee (and Sarasota) pairs are long locals on the I-75 / US-41 spine.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Lee mixes Fort Myers multi-family, Cape Coral canal SFH, and mid-market suburban growth. Charlotte’s ladder is Port Charlotte suburban and canal-edge SFH, Punta Gorda harbor/downtown and historic-adjacent stock, Englewood-edge coastal product, and inland/east larger-lot edges — more retirement HOA and harbor density, less Cape canal volume and far less Sarasota barrier-island tourism product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Charlotte stages more driveway, canal-edge, and gated-retirement HOA work than Fort Myers mid-market bridges. Harbor approaches and Peace River parcels add moisture-aware packing and constrained staging. Soft ground and flood-mapped lots replace Cape bridge fights as the hard waterfront cases.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Same-zone Port Charlotte jobs can look secondary-market simple until HOA windows, harbor-edge carries, and peak US-41 / I-75 time hit. Affluent Punta Gorda inventories and cross-zone Englewood legs raise hours above pure inland quotes. Do not assume Fort Myers or Sarasota rates transfer without naming both cities and corridors.',
      },
      {
        title: 'Role difference',
        detail:
          'Charlotte is SWFL’s Port Charlotte / Punta Gorda secondary — harbor and retirement-growth identity — not a Lee Fort Myers bedroom dump and not a Sarasota coastal brand swap. Match crews to HOA packets, harbor access photos, and honest corridor freeflow time.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Charlotte County different',
    intro:
      'SWFL secondary realities — harbor/coastal retirement growth, HOA density, Peace River access, and Florida licensing — that a renamed Fort Myers or Sarasota pack would miss.',
    bullets: [
      {
        title: 'Port Charlotte, Punta Gorda, Englewood edge, and inland are different products',
        detail:
          'A Port Charlotte canal tract, a Punta Gorda harbor multi-level, an Englewood-edge coastal home, and an inland east SFH do not share truck access. Name both cities — “Charlotte County local” fails across harbor vs inland last-mile.',
      },
      {
        title: 'Harbor / coastal retirement HOA is a volume default',
        detail:
          'Certificates of insurance, gate lists, approved hours, and truck limits show up often in planned and gated retirement villages. Collect management rules before locking a crew.',
      },
      {
        title: 'I-75 / US-41 / FL-776 freeflow is still clock time',
        detail:
          'Many households pair addresses across Port Charlotte, Punta Gorda, and into Lee or Sarasota. Peak corridor delays are billable. Ask how portal-to-portal time is priced.',
      },
      {
        title: 'Humidity and storm season are operational',
        detail:
          'Moisture-aware packing, afternoon storm interruptions, and hurricane-season contingency language matter on canal, harbor, and open inland lots alike.',
      },
      FL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading:
    'Charlotte County zones: Port Charlotte, Punta Gorda, Englewood edge & inland/east',
  zonesIntro:
    'Four sharp products — Port Charlotte, Punta Gorda harbor/seat, Englewood edge, and inland/east edges. Not a Fort Myers or Sarasota zone dump with new labels.',
  zones: [
    {
      id: 'port-charlotte',
      name: 'Port Charlotte core & canal-edge suburbs',
      shortName: 'Port Charlotte',
      neighborhoods: [
        'Port Charlotte core',
        'Canal-edge residential tracts',
        'US-41 commercial corridors',
        'Murdock / mid-county approaches',
        'Established HOA and non-HOA SFH',
      ],
      housingTypes:
        'Suburban SFH, canal-edge and flood-aware homes, HOA communities, multi-family near arterials',
      challenges: [
        'HOA COI and approved hours in many tracts',
        'US-41 / I-75 peak congestion',
        'Canal-edge staging and moisture risk',
        'High seasonal retirement-move volume',
      ],
      moverTips:
        'Send HOA packets with the estimate. Survey canal-edge curb and driveway access. Prefer mid-week mornings over peak snowbird windows. Price Port Charlotte ↔ Punta Gorda with honest arterial time.',
      cityKeywords: [
        'port charlotte',
        'murdock',
        'port charlotte fl',
      ],
    },
    {
      id: 'punta-gorda',
      name: 'Punta Gorda harbor, downtown & seat stock',
      shortName: 'Punta Gorda',
      neighborhoods: [
        'Downtown Punta Gorda',
        'Harbor and Peace River edges',
        'Historic and redevelopment pockets',
        'Punta Gorda Isles influence',
        'I-75 / US-41 approach corridors',
      ],
      housingTypes:
        'Harbor and multi-level SFH, downtown multi-unit, canal-edge product, some luxury and elevated stock',
      challenges: [
        'Constrained harbor and downtown staging',
        'Stairs and multi-level carries on waterfront homes',
        'Flood maps and storm-season packing',
        'Different access profile than pure Port Charlotte tracts',
      ],
      moverTips:
        'Share approach photos, stair counts, and truck-length limits early. Do not quote as a flat Port Charlotte suburban job. Prefer non-peak weekend loads near harbor tourism.',
      cityKeywords: [
        'punta gorda',
        'punta gorda isles',
        'punta gorda fl',
      ],
    },
    {
      id: 'englewood-edge',
      name: 'Englewood edge & west coastal influence',
      shortName: 'Englewood edge',
      neighborhoods: [
        'Englewood (Charlotte influence)',
        'West coastal-edge pockets',
        'FL-776 corridors',
        'Gulf-edge and barrier-adjacent approaches',
        'Cross-county Sarasota border edges',
      ],
      housingTypes:
        'Coastal SFH, elevated and flood-aware homes, multi-family pockets, vacation-oriented product',
      challenges: [
        'Coastal access timing and limited staging',
        'County-line address confusion with Sarasota',
        'Humidity and storm exposure',
        'Seasonal tourist and snowbird parking scarcity',
      ],
      moverTips:
        'Clarify Charlotte vs Sarasota destinations near the border. Access-first: road width, gates, and turnaround photos. Avoid peak beach weekends when flexible.',
      cityKeywords: [
        'englewood',
        'englewood fl',
        'fl-776',
      ],
    },
    {
      id: 'inland-east-edges',
      name: 'Inland & east-county edges',
      shortName: 'Inland / east edges',
      neighborhoods: [
        'East Charlotte larger-lot edges',
        'Rural and agricultural approaches',
        'I-75 east inland corridors',
        'Deep Creek / eastern residential pockets',
        'Working-community stock',
      ],
      housingTypes:
        'Larger-lot SFH, rural-edge homes, manufactured-home communities, limited multi-family',
      challenges: [
        'Longer empty miles from harbor staging',
        'Unpaved or soft approaches after rain',
        'Heat on open lots without canopy',
        'Different access profile than coastal HOA product',
      ],
      moverTips:
        'Price distance and access explicitly. Share driveway and road-width photos. Confirm whether far-east pairs still use a pure Port Charlotte local rate card.',
      cityKeywords: [
        'deep creek',
        'east charlotte',
        'charlotte inland',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Charlotte County',
    intro:
      'Same square footage prices differently by HOA soft costs, harbor-edge labor, I-75 / US-41 portal time, and whether the job is Port Charlotte tract or inland empty miles.',
    drivers: [
      {
        title: 'Cross-zone I-75 / US-41 / FL-776 corridor time',
        detail:
          'Port Charlotte ↔ Punta Gorda, Englewood edge ↔ inland, or peak US-41 legs burn more clock than map miles suggest. Hourly billing follows the clock.',
      },
      {
        title: 'HOA soft costs in retirement & planned villages',
        detail:
          'COI processing, approved hours, and gate lists add soft costs and can force weekday-only windows before labor starts.',
      },
      {
        title: 'Harbor / canal-edge access labor',
        detail:
          'Stairs, constrained staging, moisture protection, and flood-aware packing on waterfront homes raise hours above pure dry-driveway quotes.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$450–$1,350+',
        note: 'Higher with HOA windows, harbor access, or peak corridors',
      },
      {
        label: '2–3BR house / HOA or canal community',
        value: '$1,400–$3,800+',
        note: 'Gate rules and multi-zone hauls trend up',
      },
      {
        label: '3–4+ BR (harbor edge / cross-zone / long local)',
        value: '$2,200–$6,500+',
        note: 'Harbor multi-level and Lee/Sarasota pairs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, snowbird & humidity intelligence',
    intro:
      'Snowbird peaks, hurricane season, and SWFL humidity reshape crew availability more than pure inland mid-Florida calendars alone.',
    items: [
      {
        title: 'Snowbird peak: roughly November – April',
        detail:
          'Harbor and retirement-village preferred crews fill first. Book weeks ahead for popular HOA and waterfront windows; mid-week often prices better than peak weekends.',
      },
      {
        title: 'Hurricane season: June–November',
        detail:
          'Canal, harbor, and flood-mapped parcels need weather contingency language. Confirm reschedule policies before deposits.',
      },
      {
        title: 'Best value: mid-month Tue–Thu mornings (shoulder seasons)',
        detail:
          'Still honor HOA weekday windows. Early starts beat heat, humidity, and I-75 / US-41 peaks.',
      },
    ],
  },
  specialized: [
    {
      id: 'harbor-coastal-retirement',
      title: 'Harbor / coastal retirement growth logistics',
      intro:
        'Charlotte’s defining product is harbor-edge and retirement-oriented volume — canal SFH, waterfront multi-level, and seasonal calendars Fort Myers mid-market jobs do not fully share.',
      bullets: [
        'Photo harbor approaches, canal staging, and multi-level stair paths so crews staff correctly.',
        'Plan moisture-aware packing and flood-map awareness for Peace River and canal-edge addresses.',
        'Lock preferred snowbird windows weeks ahead; mid-week often reduces friction and price pressure.',
        'Price empty-mile and long-carry time honestly versus pure inland Port Charlotte jobs.',
      ],
    },
    {
      id: 'hoa-swfl-secondary',
      title: 'HOA & planned-village access (SWFL secondary)',
      intro:
        'Gated and HOA retirement villages concentrate paperwork and truck limits across Port Charlotte growth pockets.',
      bullets: [
        'Collect HOA COI, gate lists, approved hours, and truck limits before the survey is final.',
        'Reconfirm street access the week of the move in active construction or renovated tracts.',
        'Photo cul-de-sac turnarounds so crews bring the right truck length.',
        'Book peak winter Saturdays early; mid-week windows often price better.',
      ],
    },
    {
      id: 'not-fort-myers-sarasota',
      title: 'Distinct from Fort Myers & Sarasota brand',
      intro:
        'Charlotte is Port Charlotte / Punta Gorda — not a Lee or Sarasota rate-card swap.',
      bullets: [
        'Name both cities and corridors on the estimate; refuse vague “SWFL local” language across county lines.',
        'Price Charlotte ↔ Lee and Charlotte ↔ Sarasota as long locals with honest I-75 / US-41 time.',
        'Match crews to harbor access vs HOA tract vs inland edge — three different playbooks.',
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
          'Charlotte County Public Schools serves most public K–12 students. Match every listing address to the correct attendance zone — marketing names can span feeders.',
        bullets: [
          {
            title: 'Zone before community branding',
            detail:
              'Use official district boundary tools. Port Charlotte, Punta Gorda, and Englewood-edge brands can span multiple feeders and choice options.',
          },
          {
            title: 'Growth vs established systems',
            detail:
              'Enrollment pressure differs between growth pockets and longer-established corridors — do not treat county averages as neighborhood truth.',
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
              'ShorePoint Health and other regional campuses cover much of Charlotte demand; map ER drive times at rush hour from Englewood edges and inland east — not only from Port Charlotte core.',
          },
          {
            title: 'SWFL specialty spillover',
            detail:
              'Some residents use Lee or Sarasota specialty systems. Confirm insurer networks and realistic I-75 / US-41 drive times.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Charlotte County resources',
    intro:
      'Local official links first. FDACS, FMCSA, and Move Trust Hub tools are added automatically for licensing checks.',
    items: [
      {
        label: 'Charlotte County',
        href: 'https://www.charlottecountyfl.gov/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Punta Gorda',
        href: 'https://www.ci.punta-gorda.fl.us/',
        external: true,
      },
      {
        label: 'Charlotte County Public Schools',
        href: 'https://www.yourcharlotteschools.net/',
        external: true,
      },
      {
        label: 'FL511 — traffic conditions',
        href: 'https://fl511.com/',
        note: 'I-75, US-41, FL-776 before load windows',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter by zone (Port Charlotte, Punta Gorda, Englewood edge, inland/east) when available. Confirm HOA packets, harbor/canal access photos, and honest I-75 freeflow time — this is a Port Charlotte / Punta Gorda secondary, not a Fort Myers or Sarasota rename. Parent market: Lee guide for Fort Myers/Cape context.',
  lastReviewed: '2026-07-24',
});
