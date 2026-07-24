import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeFlTier2Pack,
  FL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/florida/fl-tier2-shared';

/**
 * Martin County — Florida Tier 2 (Stuart — Treasure Coast south / Palm Beach edge).
 * Parent: Palm Beach County (+ St. Lucie contrast). Intracoastal/coastal access —
 * NOT a Palm Beach rename.
 */
export const martinCountyIntelligence: CountyIntelligencePack = finalizeFlTier2Pack({
  countySlug: 'martin',
  hubTitle: 'Martin County Moving Intelligence Hub',
  eyebrow: 'Martin County · Stuart — Treasure Coast south / Palm Beach edge',
  h1: 'Moving in Martin County: Stuart, Jensen Beach Coastal & South Treasure Coast Logistics',
  heroOpener:
    'Martin County is south Treasure Coast on the Palm Beach edge — Stuart core and Intracoastal approaches, Jensen Beach / coastal product, Palm City / west inland corridors, and Hobe Sound / south edges — not West Palm high-rises with different street names and not a Port St. Lucie growth rename. I-95 and Florida Turnpike freeflow still bill at peak; US-1, A1A, and the local Stuart grid rewrite portal-to-portal time. Quote the pocket: Stuart multi-unit or SFH, Jensen Beach coastal, Palm City west, or Hobe Sound south — never “Martin County local” as one product.',
  heroCredibility:
    'Treasure Coast south · Stuart / Jensen Beach · FDACS Ch. 507 (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-95 · Florida Turnpike · US-1 · A1A · local Stuart grid',
  parentCompare: {
    parentLabel: 'Palm Beach County',
    parentHref: '/local-movers/florida/palm-beach',
    title: 'Compared with Palm Beach County',
    intro:
      'Martin is Treasure Coast south of Palm Beach — Stuart / Jensen Beach / Palm City / Hobe Sound identity with Intracoastal and coastal product, not West Palm towers, Boca HOA density, or Palm Beach Island logistics. St. Lucie contrast: more coastal Stuart character, less Port St. Lucie / Tradition inland growth volume. Use Palm Beach as the dense South Florida Tier 1 parent contrast.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Palm Beach crews fight I-95 / Florida Turnpike multi-zone congestion, coastal elevator corridors, and snowbird peaks into dense condo cores. Martin pairs ride I-95, Florida Turnpike, US-1, A1A, and the local Stuart grid — freer mid-day freeflow than PBC core, still billable at school, snowbird, and beach peaks. Stuart ↔ Jensen Beach or Palm City ↔ Hobe Sound burns portal-to-portal time map miles understate. Cross-county Martin ↔ Palm Beach (and St. Lucie north) pairs are long locals on the I-95 / Turnpike / US-1 spine.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Palm Beach mixes high-rise condos, gated luxury, and dense coastal multi-family. Martin’s ladder is Stuart bayfront and multi-unit stock, Jensen Beach coastal and Intracoastal product, Palm City west suburban and HOA pockets, and Hobe Sound / south edges — more driveway and Intracoastal-edge work, less vertical elevator density than PBC cores.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Martin stages more Intracoastal approach, coastal multi-level, and mid-market HOA work than Palm Beach Island towers. A1A and bridge timing are real; west Palm City longer arterials replace Boca tower windows as common inland cases. Soft ground and flood-mapped parcels matter on water edges.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Martin quotes often sit below Palm Beach rates for comparable square footage when access is simple — coastal labor, A1A timing, HOA soft costs, and cross-county pairs still push prices up. Expect secondary Treasure Coast friction, not Boca tower scarcity pricing. Do not assume Palm Beach rates transfer without naming both cities and access type.',
      },
      {
        title: 'Role difference',
        detail:
          'Martin is south Treasure Coast’s Stuart market on the Palm Beach edge — not a Palm Beach rename and not a Port St. Lucie growth dump. Match crews to Intracoastal access photos, coastal packing, and honest corridor freeflow time.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Martin County different',
    intro:
      'South Treasure Coast realities — Stuart Intracoastal access, Jensen Beach coastal product, Palm Beach edge freeflow, and Florida licensing — that a renamed Palm Beach pack would miss.',
    bullets: [
      {
        title: 'Stuart, Jensen Beach, Palm City, and Hobe Sound are different products',
        detail:
          'A Stuart multi-unit, a Jensen Beach coastal home, a Palm City HOA tract, and a Hobe Sound south parcel do not share truck access. Name both cities — “Martin County local” fails across coastal vs west last-mile.',
      },
      {
        title: 'Intracoastal / coastal access rewrites timing',
        detail:
          'Bridge approaches, A1A peaks, constrained waterfront staging, and moisture-aware packing are line items. Share approach photos; never quote barrier-edge work as a flat Palm City suburban job.',
      },
      {
        title: 'Not a Palm Beach rename',
        detail:
          'West Palm towers, Boca HOA density, and Palm Beach Island logistics are a different product mix. Martin leans Stuart Intracoastal character and south Treasure Coast mid-market stock — survey the actual street.',
      },
      {
        title: 'I-95 / Turnpike / US-1 freeflow is still clock time',
        detail:
          'Many households pair addresses across Stuart, Palm City, and into Palm Beach or St. Lucie. Peak corridor delays are billable. Ask how portal-to-portal time is priced.',
      },
      FL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading:
    'Martin zones: Stuart, Jensen Beach/coastal, Palm City/west & Hobe Sound/south',
  zonesIntro:
    'Four sharp products — Stuart core, Jensen Beach / coastal, Palm City / west, and Hobe Sound / south. Not a Palm Beach zone dump with Stuart labels.',
  zones: [
    {
      id: 'stuart',
      name: 'Stuart core & Intracoastal approaches',
      shortName: 'Stuart',
      neighborhoods: [
        'Downtown Stuart',
        'Intracoastal and river-edge pockets',
        'US-1 commercial corridors',
        'Established multi-unit and SFH mix',
        'County-seat residential stock',
      ],
      housingTypes:
        'Bayfront and multi-unit stock, mid-century SFH, condos, some redevelopment product',
      challenges: [
        'Constrained curb staging near Intracoastal and downtown',
        'US-1 / arterial peaks into and out of core',
        'Mix of elevator and non-elevator multi-unit',
        'Humidity and storm-season packing awareness',
      ],
      moverTips:
        'Share building and curb photos for multi-unit and older lots. Prefer mid-week mornings over beach-weekend peaks. Price Stuart ↔ Jensen Beach or Palm City as timed locals, not flat same-zone jobs.',
      cityKeywords: [
        'stuart',
        'downtown stuart',
        'stuart fl',
      ],
    },
    {
      id: 'jensen-beach-coastal',
      name: 'Jensen Beach & coastal / Intracoastal edges',
      shortName: 'Jensen Beach / coastal',
      neighborhoods: [
        'Jensen Beach',
        'Coastal and Intracoastal-adjacent homes',
        'A1A approach corridors',
        'Beach and river-edge multi-family',
        'Hutchinson Island influence (Martin side)',
      ],
      housingTypes:
        'Coastal SFH, elevated and flood-aware homes, condos, vacation-oriented multi-family',
      challenges: [
        'A1A / bridge congestion and beach-weekend timing',
        'Narrow approaches, limited turnaround, long carries',
        'Elevator/COI rules in multi-unit buildings',
        'Hurricane-season and moisture risk',
      ],
      moverTips:
        'Access-first: bridge timing, road width, gates, and turnaround photos before dispatch. Avoid peak beach weekends when flexible. Do not quote as a flat Palm City suburban job.',
      cityKeywords: [
        'jensen beach',
        'jensen beach fl',
        'hutchinson island martin',
      ],
    },
    {
      id: 'palm-city-west',
      name: 'Palm City & west inland corridors',
      shortName: 'Palm City / west',
      neighborhoods: [
        'Palm City',
        'West Martin suburban tracts',
        'I-95 / Turnpike approach residential',
        'HOA and planned community pockets',
        'Larger-lot west edges',
      ],
      housingTypes:
        'Suburban SFH, HOA communities, multi-family near arterials, larger-lot edges',
      challenges: [
        'HOA COI, gates, and approved hours in planned pockets',
        'I-95 / Turnpike / arterial peak timing',
        'Cross-zone pairs toward Stuart or Palm Beach edge',
        'High Saturday demand in peak season',
      ],
      moverTips:
        'Collect HOA packets before the survey is final. Price Palm City ↔ Stuart with honest corridor time. Dawn starts beat heat on open tracts. Book summer Saturdays early.',
      cityKeywords: [
        'palm city',
        'palm city fl',
        'west martin',
      ],
    },
    {
      id: 'hobe-sound-south',
      name: 'Hobe Sound & south Palm Beach edge',
      shortName: 'Hobe Sound / south',
      neighborhoods: [
        'Hobe Sound',
        'South Martin residential',
        'US-1 south corridors',
        'Palm Beach County border edges',
        'Coastal-influence and inland mix',
      ],
      housingTypes:
        'Suburban and coastal-influence SFH, multi-family, some HOA pockets, border-edge stock',
      challenges: [
        'County-line address confusion with Palm Beach',
        'US-1 / I-95 approaches at peak',
        'Variable coastal vs inland access profiles',
        'Cross-county long-local assumptions',
      ],
      moverTips:
        'Clarify Martin vs Palm Beach destinations near the border. Share approach photos for coastal-influence parcels. Price Hobe Sound ↔ northern PBC as a long local with honest corridor time.',
      cityKeywords: [
        'hobe sound',
        'hobe sound fl',
        'south martin',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Martin County',
    intro:
      'Same square footage prices differently by coastal access labor, HOA soft costs, I-95 / US-1 portal time, and whether the job is Stuart core or cross-county Palm Beach edge.',
    drivers: [
      {
        title: 'Cross-zone I-95 / Turnpike / US-1 / A1A corridor time',
        detail:
          'Stuart ↔ Jensen Beach, Palm City ↔ Hobe Sound, or peak I-95 legs burn more clock than map miles suggest. Hourly billing follows the clock.',
      },
      {
        title: 'Intracoastal / coastal access labor',
        detail:
          'Bridge delays, elevators, long carries, and moisture protection on waterfront homes raise hours above pure west inland driveway quotes.',
      },
      {
        title: 'HOA soft costs & cross-county Palm Beach pairs',
        detail:
          'COI and approved hours in planned pockets add paperwork; Martin ↔ PBC long locals raise portal-to-portal time above pure in-county quotes.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$450–$1,400+',
        note: 'Higher with elevators, coastal access, or peak corridors',
      },
      {
        label: '2–3BR house / HOA or coastal multi-unit',
        value: '$1,500–$3,900+',
        note: 'Gate/elevator soft costs and multi-zone hauls trend up',
      },
      {
        label: '3–4+ BR (coastal edge / cross-zone / PBC long local)',
        value: '$2,300–$6,800+',
        note: 'Intracoastal access and Palm Beach pairs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, snowbird & coastal calendar intelligence',
    intro:
      'Snowbird shoulders, school calendars, summer heat/humidity, and hurricane season reshape crew availability across Stuart coastal edges and west growth.',
    items: [
      {
        title: 'Snowbird & seasonal coastal turnover',
        detail:
          'Winter and shoulder seasons tighten preferred crews on Jensen Beach and Intracoastal multi-unit. Still quieter than deep Palm Beach towers — not zero. Book elevators early.',
      },
      {
        title: 'Hurricane season: June–November',
        detail:
          'Coastal and flood-mapped parcels need weather contingency language. Confirm reschedule policies before deposits.',
      },
      {
        title: 'Best value: mid-month Tue–Thu mornings',
        detail:
          'Beat I-95 peaks and beach-weekend A1A traffic. Still honor HOA weekday windows and building elevator reservations where required.',
      },
    ],
  },
  specialized: [
    {
      id: 'intracoastal-coastal-access',
      title: 'Intracoastal & coastal access logistics',
      intro:
        'Stuart and Jensen Beach waterfront parcels need truck-access plans flat west tracts never see.',
      bullets: [
        'Share bridge timing expectations, road width, gates, and turnaround photos before booking.',
        'Plan moisture-aware packing and flood-map awareness for Intracoastal and coastal addresses.',
        'Reserve elevators early for multi-unit; avoid peak beach weekends when flexible.',
        'Price empty-mile and long-carry time honestly versus inland Palm City suburban jobs.',
      ],
    },
    {
      id: 'south-treasure-coast',
      title: 'South Treasure Coast / Palm Beach edge identity',
      intro:
        'Martin is Stuart on the Palm Beach edge — not a West Palm or Boca rate-card swap.',
      bullets: [
        'Name both cities and corridors; refuse vague “South Florida local” language across county lines.',
        'Price Martin ↔ Palm Beach and Martin ↔ St. Lucie as long locals with honest I-95 / Turnpike / US-1 time.',
        'Match crews to Stuart core vs Jensen Beach coastal vs Palm City west vs Hobe Sound south — four different playbooks.',
        'Confirm FDACS for pure in-state hops and FMCSA when any leg leaves Florida.',
      ],
    },
    {
      id: 'not-palm-beach-rename',
      title: 'Distinct from Palm Beach tower scripts',
      intro:
        'Coastal product is real — but Martin is not a thinner West Palm or Palm Beach Island pack.',
      bullets: [
        'Do not import Palm Beach Island rate cards without naming both cities and access type.',
        'Expect more Intracoastal mid-market and driveway mix, less pure high-rise tower density than PBC cores.',
        'Clarify Hobe Sound / border addresses so Martin vs Palm Beach distance assumptions stay accurate.',
        'Reconfirm building and HOA rules the week of the move — local rules still apply even when freeflow is freer than PBC.',
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
          'Martin County School District serves most public K–12 students. Match every listing address to the correct attendance zone — coastal marketing names can span feeders.',
        bullets: [
          {
            title: 'Zone before community branding',
            detail:
              'Use official district boundary tools. Stuart, Jensen Beach, Palm City, and Hobe Sound brands can span multiple feeders and choice options.',
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
              'Cleveland Clinic Martin Health system campuses serve much of the county; map ER drive times at rush hour from Jensen Beach, Palm City, and Hobe Sound — not only from Stuart proper.',
          },
          {
            title: 'Palm Beach specialty spillover',
            detail:
              'Some specialties still pull residents south into Palm Beach systems. Confirm insurer networks and realistic I-95 / US-1 times.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Martin County resources',
    intro:
      'Local official links first. FDACS, FMCSA, and Move Trust Hub tools are added automatically for licensing checks.',
    items: [
      {
        label: 'Martin County',
        href: 'https://www.martin.fl.us/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Stuart',
        href: 'https://www.cityofstuart.us/',
        external: true,
      },
      {
        label: 'Martin County School District',
        href: 'https://www.martinschools.org/',
        external: true,
      },
      {
        label: 'FL511 — traffic conditions',
        href: 'https://fl511.com/',
        note: 'I-95, Turnpike, US-1, A1A before load windows',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter by zone (Stuart, Jensen Beach/coastal, Palm City/west, Hobe Sound/south) when available. Confirm Intracoastal/coastal access photos, HOA packets for west planned pockets, and honest I-95 freeflow time — this is south Treasure Coast, not a Palm Beach rename. Parent market: Palm Beach guide for metro-core context.',
  lastReviewed: '2026-07-24',
});
