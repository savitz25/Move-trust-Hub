import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeIdPack } from '@/lib/local-movers/county-intelligence/idaho/id-shared';

/**
 * Kootenai County, ID — Coeur d'Alene / North Idaho lakeside + tourism (not Treasure Valley).
 */
export const kootenaiCountyIdIntelligence: CountyIntelligencePack = finalizeIdPack({
  countySlug: 'kootenai',
  hubTitle: 'Kootenai County Moving Intelligence Hub',
  eyebrow:
    "Kootenai · Coeur d'Alene North Idaho · I-90 · US-95 · ID-41 · lakeside elevation",
  h1: "Moving in Kootenai County: Coeur d'Alene Lakeside Access, Tourism Windows & North Idaho Corridor Logistics",
  heroOpener:
    "Kootenai County, Idaho is North Idaho lakeside metro — Coeur d'Alene waterfront and hillside stock, Post Falls and Rathdrum growth, Hayden and Huetter corridors, tourism-season curb pressure — not a Boise Treasure Valley rename, not Spokane County with a new label alone, and not a Seattle or Portland template. Lakeside approaches, winter mountain freeflow on I-90 (including 4th of July Pass context for regional legs), elevation typically ~2,100–2,800+ ft with steeper hillside product, and US-95 / ID-41 empty miles rewrite “local” estimates. A downtown CdA condo elevator job, a lakeside long-driveway two-story, a Post Falls HOA tract, and a Hayden multi-family turn do not share truck access or seasonal risk. This hub is for people moving in Kootenai County, Idaho — Coeur d'Alene market realities, not a renamed Treasure Valley or out-of-state page.",
  heroCredibility:
    'IPUC household goods / motor carrier frameworks · FMCSA · Curated directory listings',
  majorCorridors: 'I-90 · US-95 · ID-41 · local CdA grid',
  whatMakesDifferent: {
    title: 'What makes moving in Kootenai County different',
    intro:
      "These are North Idaho lakeside realities — waterfront and hillside access, tourism-season congestion, growth HOAs west toward Post Falls, and I-90 mountain-approach timing — not Treasure Valley defaults or a generic Idaho template.",
    bullets: [
      {
        title: "Lakeside and hillside CdA stock rewrites labor hours",
        detail:
          "Steep approaches, tight turnarounds, long carries, docks/retaining walls, and winter ice dominate waterfront and hillside product. Flat-suburb optimism underprices these jobs — survey photos beat bedroom-count quotes.",
      },
      {
        title: "Tourism and event-season curb friction differs from winter quiet",
        detail:
          "Downtown Coeur d'Alene, lake corridors, and peak summer weekends create scarce staging and timed windows. A July waterfront job is not a February Post Falls HOA move.",
      },
      {
        title: 'I-90, US-95, ID-41, and local CdA grids define portal time',
        detail:
          "Post Falls ↔ CdA, Hayden ↔ downtown, or Spokane-border pairs look local on maps and regional at peak. Winter mountain approaches on I-90 and snow/ice on hillside streets stack delay risk.",
      },
      {
        title: 'Post Falls / Rathdrum growth HOAs are not lakeside product',
        detail:
          'Newer tracts mix HOA packets, truck-length limits, and different curb rules than CdA hillside or waterfront multi-unit.',
      },
      {
        title: 'Not Treasure Valley Ada/Canyon and not a Seattle/Portland rename',
        detail:
          "This is Kootenai County, Idaho — Coeur d'Alene North Idaho. Boise foothills, Nampa growth, and Puget Sound or Portland templates use different access rules and corridors — survey each Kootenai address on its own terms.",
      },
      {
        title: 'Intrastate IPUC household goods / motor carrier frameworks vs interstate FMCSA',
        detail:
          'Moves entirely within Idaho by for-hire household goods carriers generally fall under Idaho Public Utilities Commission (IPUC) household goods / motor carrier frameworks — not Washington UTC, Oregon, Utah, Montana, Nevada NTA, or New Jersey rules. Match the legal name on the estimate to applicable IPUC authority before you deposit. Any out-of-state leg (common toward Spokane WA) needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
    ],
  },
  zonesHeading: 'Kootenai County access zones',
  zonesIntro:
    "Plan by Coeur d'Alene lakeside / downtown, hillside & midtown character, Post Falls–Rathdrum growth, and Hayden / US-95 corridors — access rules cluster by zone more than ZIP alone.",
  zones: [
    {
      id: 'cda-lakeside-downtown',
      name: "Coeur d'Alene lakeside, downtown & waterfront multi-unit",
      shortName: 'CdA lakeside',
      neighborhoods: [
        "Downtown Coeur d'Alene",
        'Lake Coeur d\'Alene waterfront edges',
        'Tubbs Hill approaches',
        'Resort / tourism corridor edges',
        'Local CdA arterial grid',
      ],
      housingTypes: 'Condos, mid-rises, multi-unit, denser walk-ups, some waterfront SFH',
      challenges: [
        'Elevators, COI, and timed building windows',
        'Tourism-season curb scarcity and event congestion',
        'Stairs, long carries, and tight waterfront approaches',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week mornings outside peak tourism windows. Photo curb options and stair counts before final pricing.',
      cityKeywords: [
        "coeur d'alene",
        'cda',
        'downtown coeur d alene',
        'tubbs hill',
        'lake coeur d alene',
      ],
    },
    {
      id: 'cda-hillside-midtown',
      name: "CdA hillside, midtown character & elevation approaches",
      shortName: 'CdA hillside',
      neighborhoods: [
        'Hillside Coeur d\'Alene neighborhoods',
        'Midtown character grids',
        'Fernan / east lake edges',
        'Steep private-drive product',
        'Winter ice-prone approaches',
      ],
      housingTypes: 'Hillside SFH, elevation lots, some custom and multi-level product',
      challenges: [
        'Pitch, limited truck turnaround, long carries',
        'Winter ice and snow on hillside streets',
        'Tree canopy and retaining-wall staging constraints',
      ],
      moverTips:
        'Survey driveway pitch and winter access. Build Nov–Mar weather buffers. Confirm truck-length and turnaround before final pricing.',
      cityKeywords: [
        'hillside',
        'fernan',
        "coeur d'alene",
        'midtown',
        'kootenai',
      ],
    },
    {
      id: 'post-falls-rathdrum-growth',
      name: 'Post Falls, Rathdrum & growth HOA belts',
      shortName: 'Post Falls / Rathdrum',
      neighborhoods: [
        'Post Falls',
        'Rathdrum',
        'Newer HOA tracts',
        'I-90 west approaches',
        'Spokane-border corridor edges',
      ],
      housingTypes: 'Newer SFH, HOA tracts, some multi-family and townhome product',
      challenges: [
        'HOA gate lists and truck-length limits',
        'I-90 freeflow toward CdA and Spokane',
        'Interstate-leg authority when destinations cross into Washington',
      ],
      moverTips:
        'Collect HOA packets early. Price Post Falls–CdA pairs portal-to-portal. Clarify ID-only vs WA interstate authority on border-adjacent jobs.',
      cityKeywords: [
        'post falls',
        'rathdrum',
        'i-90',
        'post falls idaho',
        'rathdrum idaho',
      ],
    },
    {
      id: 'hayden-us95-corridors',
      name: 'Hayden, Huetter & US-95 / ID-41 corridors',
      shortName: 'Hayden / US-95',
      neighborhoods: [
        'Hayden',
        'Huetter edges',
        'US-95 corridor approaches',
        'ID-41 corridor approaches',
        'North Kootenai multi-family edges',
      ],
      housingTypes: 'Mixed SFH, multi-family, growth-corridor stock',
      challenges: [
        'US-95 peak congestion into CdA',
        'Mix of older product and newer tract access',
        'Longer portal time on north–lakeside pairs',
      ],
      moverTips:
        'Price Hayden–CdA pairs with US-95 buffers. Survey multi-family lease-turn timing. Avoid peak tourism-weekend arterials when flexible.',
      cityKeywords: [
        'hayden',
        'huetter',
        'us-95',
        'id-41',
        'hayden idaho',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Kootenai County moving costs',
    intro:
      'Lakeside/hillside access, tourism curb friction, growth HOA rules, and I-90 / US-95 portal time drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Lakeside / hillside long carries & elevation pitch',
        detail: 'Pitch, ice, turnaround limits, and carry distance spike labor hours.',
      },
      {
        title: 'Downtown CdA elevator & tourism curb friction',
        detail: 'Building packets and peak-season staging dominate core jobs.',
      },
      {
        title: 'I-90 / US-95 / ID-41 congestion',
        detail: 'Portal-to-portal spikes at peak, tourism, and winter mountain windows.',
      },
      {
        title: 'Cross-zone empty miles (Post Falls–CdA and Hayden–lakeside)',
        detail: 'Map-short pairs still bill regional time across the North Idaho grid.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,900+',
        note: 'Higher with elevators or hillside carries',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,500–$4,600+',
        note: 'Lakeside and tourism friction trends up',
      },
      {
        label: '3–4+ BR / hillside / cross-corridor',
        value: '$2,800–$9,200+',
        note: 'Long carries and winter/tourism pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$200+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Kootenai County',
    intro:
      'Summer tourism peaks, multi-family lease turns, winter hillside ice, and I-90 mountain approaches reshape Coeur d\'Alene windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings (shoulder seasons ideal)',
        detail: 'Clear curb and reduce tourism / arterial pain before peak.',
      },
      {
        title: 'Peak tourism & family season: late May–Labor Day',
        detail: 'Book lakeside and downtown CdA Saturdays early — curb is scarce.',
      },
      {
        title: 'Month-end multi-family turns',
        detail: 'CdA and Hayden denser product fills first.',
      },
      {
        title: 'Winter ice, snow & mountain approaches',
        detail: 'Nov–Mar hillside jobs and I-90 regional freeflow need weather buffers; mountain passes can delay trucks.',
      },
    ],
  },
  specialized: [
    {
      id: 'coeur-dalene-kootenai-lakeside-north-idaho',
      title: "Coeur d'Alene lakeside & North Idaho module",
      intro:
        "Kootenai ID estimates fail when lakeside/hillside access, tourism curb windows, or I-90 / US-95 empty miles are ignored — and when crews treat this as a Boise Treasure Valley or Spokane-only rename page.",
      bullets: [
        'Request downtown/lakeside building packets early.',
        'Photo driveway pitch, turnaround, and winter access on hillside jobs.',
        'Price I-90 / US-95 / ID-41 pairs portal-to-portal.',
        'Clarify Idaho-only vs Spokane WA interstate legs before deposit.',
        'Verify IPUC-applicable authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Kootenai County?',
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
              "Coeur d'Alene, Post Falls, Lakeland (Rathdrum), and other systems serve different addresses. Confirm zoning carefully — district lines shift across growth tracts.",
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
              "Kootenai Health (Coeur d'Alene) and related campuses anchor regional care; Spokane tertiary options are common for some specialties. Confirm networks.",
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour and winter drive times from Post Falls, Hayden, and hillside belts into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Lakeside multi-unit vs hillside SFH vs growth HOA stock',
            detail:
              "CdA waterfront condos, hillside two-stories, and Post Falls/Rathdrum product price and access very differently.",
          },
          {
            title: 'Cost variation',
            detail:
              'Lakeside and view stock often prices differently from inland growth tracts — tourism demand and limited waterfront inventory matter.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'CdA lakeside / downtown lifestyle',
            detail: 'Walkable amenities with elevator, tourism curb, and density tradeoffs.',
          },
          {
            title: 'Hillside / midtown pattern',
            detail: 'Elevation views and winter ice logistics near lake corridors.',
          },
          {
            title: 'Post Falls / Rathdrum / Hayden growth pattern',
            detail: 'More space, HOA rules, and different commute math to CdA and Spokane jobs.',
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
              'Healthcare, tourism and hospitality, retail, light industry/logistics, professional services, and Spokane-metro cross-border employment shape the market.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-90, US-95, and ID-41 peaks are real. Test drive peak and winter routes between your zone and work anchors.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'North Idaho lakeside identity',
            detail:
              "Kootenai is Coeur d'Alene lakeside and inland growth — not Treasure Valley product, and not a Seattle or Portland rename.",
          },
          {
            title: 'Climate & elevation',
            detail:
              'Four-season climate with cold snowy winters, summer tourism heat, elevation ~2,100–2,800+ ft. Plan outdoor staging and winter mountain-approach contingency.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Kootenai County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify IPUC-applicable Idaho household goods / motor carrier authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Kootenai County, Idaho — official site',
        href: 'https://www.kcgov.us/',
        external: true,
      },
      {
        label: "City of Coeur d'Alene — official site",
        href: 'https://www.cdaid.org/',
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
    "Prefer lakeside/hillside access and tourism-window experience with honest I-90 / US-95 / ID-41 pricing. Verify IPUC frameworks in-state and FMCSA interstate (especially Spokane legs). This is Kootenai County ID (CdA) — not Treasure Valley.",
  lastReviewed: '2026-07-24',
});
