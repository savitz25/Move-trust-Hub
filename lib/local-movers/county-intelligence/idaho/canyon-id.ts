import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeIdPack } from '@/lib/local-movers/county-intelligence/idaho/id-shared';

/**
 * Canyon County, ID — Nampa/Caldwell Treasure Valley west growth (not Ada/Boise rename).
 */
export const canyonCountyIdIntelligence: CountyIntelligencePack = finalizeIdPack({
  countySlug: 'canyon',
  hubTitle: 'Canyon County Moving Intelligence Hub',
  eyebrow:
    'Canyon · Nampa/Caldwell Treasure Valley west · I-84 · US-20/26 · ID-45',
  h1: 'Moving in Canyon County: Nampa–Caldwell Growth, Valley West Access & HOA Corridor Logistics',
  heroOpener:
    'Canyon County, Idaho is Treasure Valley west — Nampa and Caldwell growth corridors, Middleton and Star edges, agricultural-to-suburban conversion tracts, and I-84 freeflow into Ada — not a Boise North End rename, not Meridian product with a new label, and not a Spokane or Portland template. Newer HOA packets, longer empty miles toward Boise job centers, elevation still in the ~2,300–2,600 ft valley floor band, and winter fog/ice on I-84 rewrite “local” estimates. A Nampa multi-family lease-turn, a Caldwell older SFH stair job, a Middleton cul-de-sac HOA gate, and a Caldwell–Boise cross-county pair do not share truck access or portal risk. This hub is for people moving in Canyon County, Idaho — Nampa/Caldwell market realities, not a renamed Ada County page.',
  heroCredibility:
    'IPUC household goods / motor carrier frameworks · FMCSA · Curated directory listings',
  majorCorridors: 'I-84 · US-20/26 · ID-45 · local Nampa/Caldwell grid',
  whatMakesDifferent: {
    title: 'What makes moving in Canyon County different',
    intro:
      'These are Treasure Valley west realities — growth HOAs, Nampa/Caldwell multi-unit turns, farm-edge access, and I-84 eastbound freeflow into Ada — not Boise foothills defaults or a generic Idaho template.',
    bullets: [
      {
        title: 'Nampa and Caldwell multi-unit lease turns differ from outer SFH',
        detail:
          'Elevators or stair-heavy product, scarce curb staging, and month-end pileups dominate core multi-family. A downtown Nampa walk-up is not a Middleton garage-friendly tract home.',
      },
      {
        title: 'Growth HOAs and conversion tracts rewrite access rules',
        detail:
          'Gate lists, truck-length limits, unfinished curb, and HOA packet delays are common on newer product across Nampa, Caldwell, and Middleton belts. Flat “bedroom count” quotes miss these frictions.',
      },
      {
        title: 'I-84, US-20/26, ID-45, and local grids define portal-to-portal time',
        detail:
          'Caldwell ↔ Nampa, Middleton ↔ I-84, or Canyon ↔ Ada pairs look local on maps and regional at peak. Price honestly — empty miles, construction, and winter valley fog/ice stack fast.',
      },
      {
        title: 'Agricultural edges and older grids are not growth-tract product',
        detail:
          'Rural-edge long drives, soft shoulders, irrigation-adjacent approaches, and older Caldwell/Nampa character streets use different staging than new HOA cul-de-sacs.',
      },
      {
        title: 'Not Ada County Boise and not a Spokane/WA or Salt Lake rename',
        detail:
          'This is Canyon County, Idaho — Treasure Valley west. Boise foothills elevation, North End canopy, and Meridian-as-Boise-suburb templates use different access rules — survey each Canyon address on its own terms.',
      },
      {
        title: 'Intrastate IPUC household goods / motor carrier frameworks vs interstate FMCSA',
        detail:
          'Moves entirely within Idaho by for-hire household goods carriers generally fall under Idaho Public Utilities Commission (IPUC) household goods / motor carrier frameworks — not Washington UTC, Oregon, Utah, Montana, Nevada NTA, or New Jersey rules. Match the legal name on the estimate to applicable IPUC authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
    ],
  },
  zonesHeading: 'Canyon County access zones',
  zonesIntro:
    'Plan by Nampa core / multi-unit, Caldwell core & older grids, Middleton–Star growth HOAs, and I-84 / agricultural-edge corridors — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'nampa-core-multifamily',
      name: 'Nampa core, multi-family & local arterial product',
      shortName: 'Nampa core',
      neighborhoods: [
        'Downtown Nampa',
        'Nampa multi-family belts',
        'Garrity / I-84 approaches',
        'Midland / Northside edges',
        'Local Nampa arterial grid',
      ],
      housingTypes: 'Multi-family, mixed older SFH, some renovated and mid-density product',
      challenges: [
        'Stair-heavy or elevator multi-unit and lease-turn timing',
        'Scarce curb staging near denser corridors',
        'I-84 freeflow spikes toward Ada and Caldwell',
      ],
      moverTips:
        'Photo stair counts and curb options early. Prefer mid-week mornings for multi-family. Price Nampa–Boise pairs portal-to-portal.',
      cityKeywords: [
        'nampa',
        'downtown nampa',
        'garrity',
        'midland',
        'nampa idaho',
      ],
    },
    {
      id: 'caldwell-core-older-grids',
      name: 'Caldwell core, older grids & west valley stock',
      shortName: 'Caldwell core',
      neighborhoods: [
        'Downtown Caldwell',
        'Caldwell established neighborhoods',
        'College of Idaho edges',
        'US-20/26 / ID-45 approaches',
        'West valley character streets',
      ],
      housingTypes: 'Older SFH, some multi-family, mixed renovation stock',
      challenges: [
        'Narrower streets, trees, and limited turnaround on older grids',
        'Stairs and long carries on character homes',
        'Peak congestion on local arterials into Nampa / I-84',
      ],
      moverTips:
        'Survey driveway and street width. Build arterial buffers for Caldwell–Nampa pairs. Confirm stair width on older stock.',
      cityKeywords: [
        'caldwell',
        'downtown caldwell',
        'college of idaho',
        'id-45',
        'caldwell idaho',
      ],
    },
    {
      id: 'middleton-star-growth-hoas',
      name: 'Middleton, Star edges & growth HOA belts',
      shortName: 'Middleton / Star',
      neighborhoods: [
        'Middleton',
        'Star edges (Canyon-adjacent)',
        'Newer HOA tracts',
        'Growth conversion corridors',
        'US-20/26 west growth approaches',
      ],
      housingTypes: 'Newer SFH, HOA tracts, some townhome and multi-family edges',
      challenges: [
        'HOA gate lists and truck-length limits',
        'Unfinished curb and construction staging on new tracts',
        'Longer portal time toward Boise employment anchors',
      ],
      moverTips:
        'Collect HOA packets early. Price growth–Ada pairs honestly. Avoid peak I-84 eastbound windows when flexible.',
      cityKeywords: [
        'middleton',
        'star',
        'middleton idaho',
        'star idaho',
        'hoa',
      ],
    },
    {
      id: 'i84-ag-edge-corridors',
      name: 'I-84 freeflow, Parma edges & agricultural corridors',
      shortName: 'I-84 / ag edge',
      neighborhoods: [
        'I-84 corridor approaches',
        'Parma edges',
        'Greenleaf / Notus edges',
        'Agricultural long-drive lots',
        'Rural Canyon County approaches',
      ],
      housingTypes: 'Rural SFH, farm-edge homes, mixed corridor stock',
      challenges: [
        'Long private drives, soft shoulders, limited staging',
        'Irrigation and equipment-adjacent access constraints',
        'Winter fog/ice and empty-mile risk on valley corridors',
      ],
      moverTips:
        'Survey drive surface and turnaround. Price rural legs with empty-mile honesty. Build winter fog/ice buffers on I-84.',
      cityKeywords: [
        'parma',
        'greenleaf',
        'notus',
        'i-84',
        'canyon county',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Canyon County moving costs',
    intro:
      'Multi-unit friction, growth HOA rules, rural-edge access, and I-84 portal time into Ada drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Nampa / Caldwell multi-unit stair & curb friction',
        detail: 'Lease turns and scarce staging dominate denser jobs.',
      },
      {
        title: 'Growth HOA gate & truck-length rules',
        detail: 'Packet delays and access limits spike labor on new tracts.',
      },
      {
        title: 'I-84 / US-20/26 / ID-45 congestion',
        detail: 'Portal-to-portal spikes at peak and winter fog/ice windows.',
      },
      {
        title: 'Cross-county empty miles (Canyon–Ada)',
        detail: 'Map-short pairs still bill regional time into Boise employment belts.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,700+',
        note: 'Higher with multi-unit stairs or HOA friction',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,350–$4,000+',
        note: 'Growth HOA and multi-unit friction trends up',
      },
      {
        label: '3–4+ BR / rural-edge / cross-county to Ada',
        value: '$2,400–$7,800+',
        note: 'Long drives and I-84 pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$185+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Canyon County',
    intro:
      'Summer family peaks, multi-family lease turns, harvest-adjacent rural windows, and winter valley fog/ice reshape Nampa/Caldwell schedules.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear curb and reduce I-84 / arterial pain before peak.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book Nampa, Caldwell, and Middleton Saturdays early.',
      },
      {
        title: 'Month-end multi-family turns',
        detail: 'Nampa and Caldwell denser product fills first.',
      },
      {
        title: 'Winter fog, ice & valley-floor conditions',
        detail: 'Nov–Mar I-84 and low-lying approaches need weather buffers — not foothills elevation, but still real delay risk.',
      },
    ],
  },
  specialized: [
    {
      id: 'nampa-caldwell-treasure-valley-west',
      title: 'Nampa–Caldwell Treasure Valley west module',
      intro:
        'Canyon ID estimates fail when growth HOA packets, multi-unit lease timing, or I-84 empty miles into Ada are ignored — and when crews treat this as a Boise North End or Meridian rename page.',
      bullets: [
        'Request multi-family and HOA packets early.',
        'Photo curb, stairs, and unfinished-tract access on growth jobs.',
        'Price I-84 / US-20/26 / ID-45 pairs portal-to-portal.',
        'Clarify Canyon vs Ada destinations on multi-county estimates.',
        'Verify IPUC-applicable authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Canyon County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Nampa, Caldwell, Vallivue, Middleton, and other systems serve different addresses. Confirm zoning carefully — district lines shift across growth tracts.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools and Idaho State Department of Education data beat ranking screenshots.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare access',
        bullets: [
          {
            title: 'Major systems',
            detail:
              'St. Luke’s Nampa, West Valley Medical Center (Caldwell), and Treasure Valley campuses (including Ada) anchor care. Confirm networks and specialist access.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Middleton and rural edges into Nampa/Caldwell campuses and Ada tertiary care. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Multi-unit vs older SFH vs growth HOA stock',
            detail:
              'Nampa denser product, Caldwell character homes, and Middleton tracts price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Newer growth stock often prices differently from older Caldwell grids or rural-edge product — and typically below comparable Ada foothills stock.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Nampa core / multi-family lifestyle',
            detail: 'More density and lease-turn logistics with curb and stair tradeoffs.',
          },
          {
            title: 'Caldwell established pattern',
            detail: 'Older SFH character with narrower-street logistics.',
          },
          {
            title: 'Middleton / growth HOA pattern',
            detail: 'More space, HOA rules, and longer commute math toward Ada jobs.',
          },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute patterns',
        bullets: [
          {
            title: 'Employment anchors',
            detail:
              'Manufacturing, logistics, agriculture-related industry, healthcare, education, and many Ada-bound professional commutes shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-84, US-20/26, and ID-45 peaks into Ada are real. Test drive peak routes between your zone and work anchors.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Treasure Valley west identity',
            detail:
              'Canyon is Nampa/Caldwell growth and agricultural-edge product — not Boise foothills capital-metro alone, and not a Spokane or Salt Lake rename.',
          },
          {
            title: 'Climate & elevation',
            detail:
              'Semi-arid summers, cold winters with valley fog/ice, elevation typically ~2,300–2,600 ft. Plan outdoor staging and winter contingency.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Canyon County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify IPUC-applicable Idaho household goods / motor carrier authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Canyon County, Idaho — official site',
        href: 'https://www.canyoncounty.id.gov/',
        external: true,
      },
      {
        label: 'City of Nampa — official site',
        href: 'https://www.cityofnampa.us/',
        external: true,
      },
      {
        label: 'ITD traffic & road conditions',
        href: 'https://511.idaho.gov/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Prefer multi-unit and growth HOA experience with honest I-84 / US-20/26 / ID-45 pricing into Ada. Verify IPUC frameworks in-state and FMCSA interstate. This is Canyon County ID (Nampa/Caldwell) — not Ada/Boise rename.',
  lastReviewed: '2026-07-24',
});
