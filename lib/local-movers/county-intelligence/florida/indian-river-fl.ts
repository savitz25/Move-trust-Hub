import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeFlTier2Pack,
  FL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/florida/fl-tier2-shared';

/**
 * Indian River County — Florida Tier 2 (Vero Beach — Treasure Coast).
 * Parent: St. Lucie County (+ Palm Beach contrast). Coastal Treasure Coast —
 * NOT a Port St. Lucie growth pattern rename.
 */
export const indianRiverCountyIntelligence: CountyIntelligencePack = finalizeFlTier2Pack({
  countySlug: 'indian-river',
  hubTitle: 'Indian River County Moving Intelligence Hub',
  eyebrow: 'Indian River County · Vero Beach — Treasure Coast',
  h1: 'Moving in Indian River County: Vero Beach Coastal, Sebastian & Treasure Coast Logistics',
  heroOpener:
    'Indian River County is Treasure Coast coastal territory north of St. Lucie — Vero Beach coastal and barrier-edge product, Sebastian mainland and river corridors, Fellsmere / west inland edges, and A1A / Intracoastal approaches — not Port St. Lucie growth villages with different beach names and not a Palm Beach tower rename. I-95 freeflow still bills at peak; US-1, FL-60, A1A, and the local Vero Beach grid rewrite portal-to-portal time. Quote the pocket: Vero Beach coastal condo or villa, Sebastian SFH, Fellsmere west, or barrier-island edge — never “Indian River County local” as one product.',
  heroCredibility:
    'Treasure Coast · Vero Beach / Sebastian · FDACS Ch. 507 (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-95 · US-1 · FL-60 · A1A · local Vero Beach grid',
  parentCompare: {
    parentLabel: 'St. Lucie County',
    parentHref: '/local-movers/florida/st-lucie',
    title: 'Compared with St. Lucie County',
    intro:
      'Indian River is Treasure Coast coastal north of St. Lucie’s Port St. Lucie growth engine — more Vero Beach coastal and barrier-edge product, less Tradition/west master-planned volume. Use St. Lucie as the nearer growth-parent contrast; Palm Beach remains the dense South Florida Tier 1 contrast for towers and snowbird intensity, not the rate-card template.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'St. Lucie pairs orient to I-95, Florida Turnpike, US-1, FL-70, and Port St. Lucie growth arterials. Indian River pairs ride I-95, US-1, FL-60, A1A, and the local Vero Beach grid — freer mid-day freeflow than dense PBC, still billable at school, snowbird, and beach peaks. Vero Beach ↔ Sebastian or coastal ↔ Fellsmere west burns portal-to-portal time map miles understate. Cross-county Indian River ↔ St. Lucie (and Palm Beach farther south) pairs are long locals on the I-95 / US-1 spine.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'St. Lucie mixes Port St. Lucie suburban SFH growth, Tradition HOA villages, Fort Pierce older stock, and coastal edges. Indian River’s ladder is Vero Beach coastal condos, villas, and barrier-edge homes, Sebastian mainland and river-corridor SFH, Fellsmere / west inland product, and island-edge constrained approaches — more coastal multi-level and barrier product, less pure inland growth-village volume than Port St. Lucie / Tradition.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Indian River stages more coastal elevator/COI, A1A timing, and barrier-edge staging than typical PSL driveway growth jobs. West Fellsmere longer empty miles replace Tradition incomplete-street fights as the hard inland cases. Soft ground and flood-mapped parcels are real on water edges.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Same-zone Sebastian jobs can look secondary-market simple until coastal elevators, A1A timing, and peak I-95 time hit. Affluent Vero Beach coastal inventories and barrier-edge access raise labor hours above pure west inland quotes. Do not assume Port St. Lucie growth rates transfer without naming both cities and access type.',
      },
      {
        title: 'Role difference',
        detail:
          'Indian River is Treasure Coast’s Vero Beach coastal market — not a St. Lucie Port St. Lucie growth rename and not a thinner Palm Beach tower script. Match crews to coastal access photos, barrier timing, and honest corridor freeflow time.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Indian River County different',
    intro:
      'Treasure Coast coastal realities — Vero Beach barrier edges, Sebastian mainland, A1A timing, and Florida licensing — that a renamed Port St. Lucie pack would miss.',
    bullets: [
      {
        title: 'Vero Beach coastal, Sebastian, Fellsmere, and barrier edges are different products',
        detail:
          'A Vero Beach coastal condo, a Sebastian river-corridor SFH, a Fellsmere west home, and a barrier-island edge do not share truck access. Name both cities — “Indian River County local” fails across island vs inland last-mile.',
      },
      {
        title: 'Coastal Treasure Coast product is not Port St. Lucie growth pattern',
        detail:
          'Elevators, A1A approaches, sand protection, and barrier staging show up more often than Tradition-style incomplete-street HOA villages. Survey the building and approach — do not import PSL growth playbooks wholesale.',
      },
      {
        title: 'I-95 / US-1 / A1A freeflow is still clock time',
        detail:
          'Many households pair addresses across Vero Beach, Sebastian, and into St. Lucie or Palm Beach. Peak corridor delays are billable. Ask how portal-to-portal time is priced.',
      },
      {
        title: 'Humidity and storm season are operational',
        detail:
          'Moisture-aware packing, afternoon storm interruptions, and hurricane-season contingency language matter on barrier and mainland coastal parcels alike.',
      },
      FL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading:
    'Indian River zones: Vero Beach coastal, Sebastian, Fellsmere/west & barrier edges',
  zonesIntro:
    'Four sharp products — Vero Beach coastal, Sebastian, Fellsmere/west, and barrier island edges. Not a Port St. Lucie growth zone dump with Vero labels.',
  zones: [
    {
      id: 'vero-beach-coastal',
      name: 'Vero Beach coastal core & mainland approaches',
      shortName: 'Vero Beach coastal',
      neighborhoods: [
        'Downtown / central Vero Beach',
        'Beachside and ocean-edge pockets',
        'US-1 commercial corridors',
        'Coastal condos and villas',
        'Mainland Vero residential',
      ],
      housingTypes:
        'Coastal condos, villas, elevated SFH, multi-family, some luxury multi-level',
      challenges: [
        'Elevator / building COI rules in multi-unit',
        'Constrained curb staging near beach corridors',
        'US-1 / A1A peak congestion',
        'Humidity, sand, and storm-season packing',
      ],
      moverTips:
        'Share building packets, elevator status, and truck-height limits early. Prefer mid-week mornings over snowbird beach peaks. Inventory multi-level stairs and moisture-sensitive goods explicitly.',
      cityKeywords: [
        'vero beach',
        'vero beach fl',
        'downtown vero beach',
      ],
    },
    {
      id: 'sebastian',
      name: 'Sebastian & river / US-1 corridor',
      shortName: 'Sebastian',
      neighborhoods: [
        'Sebastian',
        'Sebastian River corridors',
        'US-1 north corridors',
        'Mainland suburban tracts',
        'River-edge and modest multi-family',
      ],
      housingTypes:
        'Suburban SFH, river-edge homes, multi-family, mid-market planned pockets',
      challenges: [
        'US-1 peak timing',
        'Cross-zone pairs toward Vero Beach or St. Lucie',
        'Variable driveway and older-street access',
        'Mix of HOA and non-HOA rules',
      ],
      moverTips:
        'Price Sebastian ↔ Vero Beach with honest arterial time. Survey older lots for curb constraints. Mid-week starts reduce corridor pain.',
      cityKeywords: [
        'sebastian',
        'sebastian fl',
        'sebastian river',
      ],
    },
    {
      id: 'fellsmere-west',
      name: 'Fellsmere & west inland edges',
      shortName: 'Fellsmere / west',
      neighborhoods: [
        'Fellsmere',
        'West Indian River inland corridors',
        'FL-60 west approaches',
        'Agricultural and larger-lot edges',
        'Working-community stock',
      ],
      housingTypes:
        'Small-city SFH, rural-edge homes, manufactured-home communities, larger lots',
      challenges: [
        'Long empty miles from coastal staging',
        'Unpaved or soft approaches after rain',
        'Heat on open lots',
        'Different access profile than Vero coastal product',
      ],
      moverTips:
        'Price distance and access explicitly. Share driveway and road-width photos. Confirm whether far-west pairs still use a pure Vero Beach local rate card.',
      cityKeywords: [
        'fellsmere',
        'fellsmere fl',
        'west indian river',
      ],
    },
    {
      id: 'barrier-island-edges',
      name: 'Barrier island edges & A1A approaches',
      shortName: 'Barrier island edges',
      neighborhoods: [
        'Vero Beach barrier / island edges',
        'A1A approach corridors',
        'Intracoastal-adjacent multi-family',
        'Beachside condo clusters',
        'Bridge approach residential',
      ],
      housingTypes:
        'Barrier SFH, elevated and flood-aware homes, coastal condos, vacation-oriented multi-family',
      challenges: [
        'Bridge / A1A congestion and limited island staging',
        'Narrow streets and long carries',
        'Elevator/COI rules in multi-unit buildings',
        'Hurricane-season and moisture risk',
      ],
      moverTips:
        'Access-first: bridge timing, road width, gates, and turnaround photos before dispatch. Avoid peak tourist weekends when flexible. Do not quote as a flat Sebastian suburban job.',
      cityKeywords: [
        'vero beach island',
        'a1a vero',
        'barrier island vero',
        'intracoastal vero',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Indian River County',
    intro:
      'Same square footage prices differently by coastal elevator labor, A1A timing, I-95 / US-1 portal time, and whether the job is Vero coastal or west empty miles.',
    drivers: [
      {
        title: 'Cross-zone I-95 / US-1 / FL-60 / A1A corridor time',
        detail:
          'Vero Beach ↔ Sebastian, coastal ↔ Fellsmere, or peak A1A legs burn more clock than map miles suggest. Hourly billing follows the clock.',
      },
      {
        title: 'Coastal condo / multi-level labor',
        detail:
          'Elevators, stairs, tight turns, sand protection, and moisture packing on coastal inventories raise hours above pure inland driveway quotes.',
      },
      {
        title: 'Barrier-edge access & west empty miles',
        detail:
          'Bridge delays, limited staging, and long Fellsmere-direction deadhead separate cheap-looking locals from real bills.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$450–$1,400+',
        note: 'Higher with elevators, coastal access, or peak corridors',
      },
      {
        label: '2–3BR house / coastal multi-unit',
        value: '$1,500–$3,900+',
        note: 'Elevator/COI soft costs and multi-zone hauls trend up',
      },
      {
        label: '3–4+ BR (barrier edge / cross-zone / long west)',
        value: '$2,300–$6,500+',
        note: 'Island access and St. Lucie/PBC pairs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, snowbird & coastal calendar intelligence',
    intro:
      'Snowbird peaks, hurricane season, and coastal tourism reshape crew availability more than pure inland Port St. Lucie growth calendars alone.',
    items: [
      {
        title: 'Snowbird peak: roughly November – April',
        detail:
          'Vero Beach coastal and barrier preferred crews fill first. Book weeks ahead for popular condo and HOA windows; mid-week often prices better than peak weekends.',
      },
      {
        title: 'Hurricane season: June–November',
        detail:
          'Coastal and flood-mapped parcels need weather contingency language. Confirm reschedule policies before deposits.',
      },
      {
        title: 'Best value: mid-month Tue–Thu mornings (shoulder seasons)',
        detail:
          'Still honor building elevator reservations and HOA weekday windows. Early starts beat heat, humidity, and A1A peaks.',
      },
    ],
  },
  specialized: [
    {
      id: 'coastal-treasure-coast',
      title: 'Coastal Treasure Coast logistics',
      intro:
        'Indian River’s signature product is Vero Beach coastal and barrier-edge access — not Port St. Lucie inland growth volume.',
      bullets: [
        'Collect building COI, elevator reservations, truck limits, and A1A timing expectations before the survey is final.',
        'Budget sand protection and limited staging plans for barrier and beachside blocks.',
        'Photo multi-level stair paths and approach constraints so crews staff correctly.',
        'Lock snowbird-peak windows early; mid-week often reduces friction and price pressure.',
      ],
    },
    {
      id: 'not-psl-growth',
      title: 'Distinct from Port St. Lucie growth pattern',
      intro:
        'Indian River is Vero Beach coastal Treasure Coast — not a Tradition / PSL rate-card swap.',
      bullets: [
        'Name both cities and access type; refuse vague “Treasure Coast local” language across county lines.',
        'Do not import Tradition incomplete-street HOA density assumptions without surveying the actual community.',
        'Price Indian River ↔ St. Lucie as long locals with honest I-95 / US-1 time.',
        'Match crews to coastal multi-unit vs Sebastian mainland vs west inland — three different playbooks.',
      ],
    },
    {
      id: 'humidity-storm-barrier',
      title: 'Humidity, storm & barrier-edge climate logistics',
      intro:
        'Humidity and hurricane-season risk are operational constraints on barrier and mainland coastal parcels.',
      bullets: [
        'Prefer early starts; treat mid-afternoon open packing as higher risk for people and moisture-sensitive goods.',
        'Request moisture-aware packing for electronics, wood furniture, and sealed boxes on coastal jobs.',
        'Confirm hurricane-season contingency and deposit policies in writing before peak summer and fall.',
        'Share flood-map and elevation context for barrier and Intracoastal parcels on the survey.',
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
          'Indian River County School District serves most public K–12 students. Match every listing address to the correct attendance zone — coastal marketing names can span feeders.',
        bullets: [
          {
            title: 'Zone before community branding',
            detail:
              'Use official district boundary tools. Vero Beach, Sebastian, and barrier-area brands can span multiple feeders and choice options.',
          },
          {
            title: 'Coastal vs west systems',
            detail:
              'Enrollment and bus patterns differ between coastal corridors and west inland pockets — do not treat county averages as neighborhood truth.',
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
              'Cleveland Clinic Indian River and other regional campuses cover much of Vero Beach–area demand; map ER drive times at rush hour from Sebastian, Fellsmere, and barrier edges — not only from central Vero Beach.',
          },
          {
            title: 'Treasure Coast specialty spillover',
            detail:
              'Some residents use St. Lucie / Martin or Palm Beach specialty systems. Confirm insurer networks and realistic I-95 / US-1 drive times.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Indian River County resources',
    intro:
      'Local official links first. FDACS, FMCSA, and Move Trust Hub tools are added automatically for licensing checks.',
    items: [
      {
        label: 'Indian River County',
        href: 'https://www.ircgov.com/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Vero Beach',
        href: 'https://www.covb.org/',
        external: true,
      },
      {
        label: 'City of Sebastian',
        href: 'https://www.cityofsebastian.org/',
        external: true,
      },
      {
        label: 'Indian River County School District',
        href: 'https://www.indianriverschools.org/',
        external: true,
      },
      {
        label: 'FL511 — traffic conditions',
        href: 'https://fl511.com/',
        note: 'I-95, US-1, FL-60, A1A before load windows',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter by zone (Vero Beach coastal, Sebastian, Fellsmere/west, barrier island edges) when available. Confirm building COI/elevators for coastal multi-unit, A1A timing, and honest I-95 freeflow time — this is Treasure Coast coastal, not a Port St. Lucie growth rename. Parent market: St. Lucie guide for growth-corridor context.',
  lastReviewed: '2026-07-24',
});
