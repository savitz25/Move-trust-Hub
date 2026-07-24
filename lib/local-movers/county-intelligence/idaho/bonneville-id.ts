import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeIdPack } from '@/lib/local-movers/county-intelligence/idaho/id-shared';

/**
 * Bonneville County, ID — Idaho Falls regional / Snake River plain (Eastern ID ≠ Treasure Valley east).
 */
export const bonnevilleCountyIdIntelligence: CountyIntelligencePack = finalizeIdPack({
  countySlug: 'bonneville',
  hubTitle: 'Bonneville County Moving Intelligence Hub',
  eyebrow:
    'Bonneville · Idaho Falls Eastern ID · I-15 · US-20 · US-26 · Snake River plain',
  h1: 'Moving in Bonneville County: Idaho Falls Neighborhoods, Snake River Plain Access & Eastern Idaho Corridor Logistics',
  heroOpener:
    'Bonneville County, Idaho is Eastern Idaho regional hub — Idaho Falls river-city core, Ammon and Iona growth belts, Snake River plain elevation (~4,700+ ft), cold-winter mountain approaches toward Teton and Yellowstone corridors — not a Boise Treasure Valley rename, not “Ada east,” and not a Salt Lake or Rexburg-only template. High-elevation winter ice, wind on the plain, multi-family and older SFH mix, and I-15 / US-20 / US-26 freeflow rewrite “local” estimates. A downtown Idaho Falls elevator job, an Ammon HOA cul-de-sac, a river-adjacent character home, and an Idaho Falls–Ammon pair do not share truck access or empty-mile risk. This hub is for people moving in Bonneville County, Idaho — Idaho Falls market realities, not a renamed Treasure Valley or out-of-state page.',
  heroCredibility:
    'IPUC household goods / motor carrier frameworks · FMCSA · Curated directory listings',
  majorCorridors: 'I-15 · US-20 · US-26 · local Idaho Falls grid',
  whatMakesDifferent: {
    title: 'What makes moving in Bonneville County different',
    intro:
      'These are Eastern Idaho Snake River plain realities — high-elevation winter, Idaho Falls core multi-unit, Ammon growth HOAs, and I-15 corridor timing — not Treasure Valley defaults or a generic Mountain West template.',
    bullets: [
      {
        title: 'High-elevation winter and plain wind rewrite labor hours',
        detail:
          'Idaho Falls sits near ~4,700 ft with cold, snowy winters, ice, and wind that affect outdoor staging and truck freeflow. Mild-winter suburb optimism underprices Nov–Mar jobs — survey weather windows and driveway access.',
      },
      {
        title: 'Idaho Falls core multi-unit differs from Ammon growth SFH',
        detail:
          'Elevators, COI packets, scarce curb staging, and stair-heavy product dominate denser core jobs. A downtown loft is not an Ammon garage-friendly HOA two-story.',
      },
      {
        title: 'I-15, US-20, US-26, and the local grid define portal-to-portal time',
        detail:
          'Ammon ↔ core, Iona ↔ US-20, or Idaho Falls ↔ regional pairs look local on maps and regional at peak. Price honestly — empty miles, winter mountain approaches, and construction stack fast.',
      },
      {
        title: 'Growth HOAs and outer belts are not river-core product',
        detail:
          'Ammon, Iona, and newer tracts mix HOA packets, truck-length limits, and different curb rules than older Idaho Falls character streets or multi-unit cores.',
      },
      {
        title: 'Not Treasure Valley Ada/Canyon and not a Salt Lake or Boise rename',
        detail:
          'This is Bonneville County, Idaho — Idaho Falls Eastern Idaho. Boise foothills, Nampa growth, and Wasatch Front pages use different access rules and corridors — survey each Bonneville address on its own terms.',
      },
      {
        title: 'Intrastate IPUC household goods / motor carrier frameworks vs interstate FMCSA',
        detail:
          'Moves entirely within Idaho by for-hire household goods carriers generally fall under Idaho Public Utilities Commission (IPUC) household goods / motor carrier frameworks — not Washington UTC, Oregon, Utah, Montana, Nevada NTA, or New Jersey rules. Match the legal name on the estimate to applicable IPUC authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
    ],
  },
  zonesHeading: 'Bonneville County access zones',
  zonesIntro:
    'Plan by Idaho Falls core / river-adjacent, established midtown & south belts, Ammon–Iona growth HOAs, and I-15 / US-20 / US-26 corridors — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'idaho-falls-core-river',
      name: 'Idaho Falls core, river-adjacent & downtown multi-unit',
      shortName: 'IF core / river',
      neighborhoods: [
        'Downtown Idaho Falls',
        'Snake River / greenbelt edges',
        'Historic / midtown multi-unit',
        'River Walk approaches',
        'Local Idaho Falls arterial grid',
      ],
      housingTypes: 'Multi-unit, renovated stock, denser walk-ups, some older SFH',
      challenges: [
        'Elevators, COI, and timed building windows',
        'Scarce curb staging near denser corridors',
        'Winter ice and wind on outdoor staging',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week morning freight windows. Photo curb options and stair counts; build winter weather buffers.',
      cityKeywords: [
        'idaho falls',
        'downtown idaho falls',
        'snake river',
        'river walk',
        'idaho falls idaho',
      ],
    },
    {
      id: 'if-established-south-midtown',
      name: 'Established midtown, south IF & character SFH belts',
      shortName: 'IF midtown / south',
      neighborhoods: [
        'Established Idaho Falls neighborhoods',
        'South Idaho Falls edges',
        'Character SFH grids',
        '17th Street / corridor approaches',
        'Older tree-canopy streets',
      ],
      housingTypes: 'Older SFH, some multi-family, mixed renovation stock',
      challenges: [
        'Stairs, long carries, and limited turnaround on older lots',
        'Tree canopy and narrower street staging',
        'Peak arterial congestion toward core and I-15',
      ],
      moverTips:
        'Survey driveway and stair width. Build arterial buffers for cross-zone pairs. Confirm winter ice on shaded streets.',
      cityKeywords: [
        'idaho falls',
        'south idaho falls',
        '17th street',
        'midtown',
        'bonneville',
      ],
    },
    {
      id: 'ammon-iona-growth-hoas',
      name: 'Ammon, Iona & growth HOA belts',
      shortName: 'Ammon / Iona',
      neighborhoods: [
        'Ammon',
        'Iona',
        'Newer HOA tracts',
        'East-side growth corridors',
        'US-26 east approaches',
      ],
      housingTypes: 'Newer SFH, HOA tracts, some townhome and multi-family edges',
      challenges: [
        'HOA gate lists and truck-length limits',
        'Longer portal time toward Idaho Falls core and I-15',
        'Winter plain wind and unfinished-tract staging on new builds',
      ],
      moverTips:
        'Collect HOA packets early. Price Ammon–core pairs portal-to-portal. Avoid peak corridor windows when flexible.',
      cityKeywords: [
        'ammon',
        'iona',
        'ammon idaho',
        'iona idaho',
        'hoa',
      ],
    },
    {
      id: 'i15-us20-us26-corridors',
      name: 'I-15, US-20, US-26 & regional mountain approaches',
      shortName: 'I-15 / corridors',
      neighborhoods: [
        'I-15 corridor approaches',
        'US-20 west approaches (INL / Arco context)',
        'US-26 east mountain-approach context',
        'Ucon / Lincoln edges',
        'Regional freeflow into Eastern Idaho',
      ],
      housingTypes: 'Mixed corridor SFH, rural-edge, and growth stock',
      challenges: [
        'Interstate freeflow and empty-mile risk on regional pairs',
        'Winter mountain approaches and high-elevation ice',
        'Rural long drives and limited staging on edge lots',
      ],
      moverTips:
        'Price I-15 / US-20 / US-26 pairs portal-to-portal. Build winter mountain-approach buffers. Survey rural drive surfaces.',
      cityKeywords: [
        'i-15',
        'us-20',
        'us-26',
        'ucon',
        'lincoln idaho',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Bonneville County moving costs',
    intro:
      'High-elevation winter access, core multi-unit friction, growth HOA rules, and I-15 / US-20 / US-26 portal time drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Winter ice, wind & high-elevation staging',
        detail: 'Cold-season outdoor labor and freeflow delays spike hours Nov–Mar.',
      },
      {
        title: 'Idaho Falls core elevator & curb friction',
        detail: 'Building packets and scarce staging dominate denser jobs.',
      },
      {
        title: 'I-15 / US-20 / US-26 congestion',
        detail: 'Portal-to-portal spikes at peak and winter mountain windows.',
      },
      {
        title: 'Cross-zone empty miles (Ammon–core and corridor pairs)',
        detail: 'Map-short pairs still bill regional time across the Snake River plain grid.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,700+',
        note: 'Higher with elevators or winter friction',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,350–$4,100+',
        note: 'Core and winter friction trends up',
      },
      {
        label: '3–4+ BR / growth HOA / cross-corridor',
        value: '$2,400–$7,900+',
        note: 'Winter and multi-corridor pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$185+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Bonneville County',
    intro:
      'Summer family peaks, multi-family lease turns, long cold winters, and mountain-approach windows reshape Idaho Falls schedules.',
    items: [
      {
        title: 'Best windows: mid-week early mornings in shoulder seasons',
        detail: 'Clear curb and reduce arterial / I-15 pain before peak.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book Ammon, Iona, and core Saturdays early.',
      },
      {
        title: 'Month-end multi-family turns',
        detail: 'Idaho Falls denser product fills first.',
      },
      {
        title: 'Long winter ice, snow & mountain approaches',
        detail: 'Nov–Mar high-elevation jobs need weather buffers; US-20 / US-26 mountain context can delay regional trucks.',
      },
    ],
  },
  specialized: [
    {
      id: 'idaho-falls-bonneville-snake-river-plain',
      title: 'Idaho Falls Snake River plain & Eastern Idaho module',
      intro:
        'Bonneville ID estimates fail when high-elevation winter access, core building packets, or I-15 / US-20 / US-26 empty miles are ignored — and when crews treat this as a Boise Treasure Valley east rename page.',
      bullets: [
        'Request downtown multi-unit building packets early.',
        'Photo driveway ice risk, turnaround, and wind staging on winter jobs.',
        'Price I-15 / US-20 / US-26 pairs portal-to-portal.',
        'Clarify Bonneville vs Madison/Jefferson or out-of-state destinations on multi-county estimates.',
        'Verify IPUC-applicable authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Bonneville County?',
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
              'Idaho Falls, Bonneville Joint, Ammon-area, and other systems serve different addresses. Confirm zoning carefully — district lines shift across growth tracts.',
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
              'Eastern Idaho Regional Medical Center, Mountain View Hospital, and related campuses anchor regional care. Confirm networks and specialist access.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour and winter drive times from Ammon, Iona, and corridor edges into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core multi-unit vs established SFH vs growth HOA stock',
            detail:
              'Downtown multi-unit, older IF character homes, and Ammon/Iona product price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Growth tracts often price differently from river-core denser product — Eastern Idaho cost structure is not Treasure Valley pricing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'IF core / river lifestyle',
            detail: 'More central amenities with elevator, curb, and winter staging tradeoffs.',
          },
          {
            title: 'Established midtown / south pattern',
            detail: 'Character SFH and older-street logistics.',
          },
          {
            title: 'Ammon / Iona growth pattern',
            detail: 'More space, HOA rules, and different commute math to core and I-15 jobs.',
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
              'Healthcare, energy and INL-related professional work, agriculture and food processing, education, retail, and regional services shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-15, US-20, and US-26 peaks and winter conditions are real. Test drive peak and cold-weather routes between your zone and work anchors.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Eastern Idaho regional identity',
            detail:
              'Bonneville is Idaho Falls Snake River plain hub — not Treasure Valley east product, and not a Salt Lake or Boise rename.',
          },
          {
            title: 'Climate & elevation',
            detail:
              'High-elevation semi-arid climate with cold snowy winters, warm dry summers, ~4,700+ ft. Plan outdoor staging and winter mountain-approach contingency.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Bonneville County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify IPUC-applicable Idaho household goods / motor carrier authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Bonneville County, Idaho — official site',
        href: 'https://www.bonnevillecountyidaho.gov/',
        external: true,
      },
      {
        label: 'City of Idaho Falls — official site',
        href: 'https://www.idahofallsidaho.gov/',
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
    'Prefer high-elevation winter access and core multi-unit experience with honest I-15 / US-20 / US-26 pricing. Verify IPUC frameworks in-state and FMCSA interstate. This is Bonneville County ID (Idaho Falls) — not Treasure Valley east.',
  lastReviewed: '2026-07-24',
});
