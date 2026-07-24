import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeIdPack } from '@/lib/local-movers/county-intelligence/idaho/id-shared';

/**
 * Twin Falls County, ID — Magic Valley regional hub (south-central ≠ Boise south).
 */
export const twinFallsCountyIdIntelligence: CountyIntelligencePack = finalizeIdPack({
  countySlug: 'twin-falls',
  hubTitle: 'Twin Falls County Moving Intelligence Hub',
  eyebrow:
    'Twin Falls · Magic Valley south-central ID · I-84 · US-93 · US-30 · canyon rim',
  h1: 'Moving in Twin Falls County: Magic Valley Neighborhoods, Canyon-Rim Access & South-Central Corridor Logistics',
  heroOpener:
    'Twin Falls County, Idaho is Magic Valley regional hub — Twin Falls canyon-rim and core stock, Filer and Buhl corridor edges, Kimberly and Hansen growth belts, Snake River Canyon approaches — not a Boise south rename, not Ada County product with a new label, and not a Salt Lake or Reno template. Elevation typically ~3,600–3,800+ ft, winter ice and wind on the plain, canyon-rim driveway pitch near Perrine Bridge approaches, and I-84 / US-93 / US-30 freeflow rewrite “local” estimates. A downtown Twin Falls multi-unit turn, a canyon-rim long-carry two-story, a Kimberly HOA cul-de-sac, and a Twin Falls–Filer pair do not share truck access or empty-mile risk. This hub is for people moving in Twin Falls County, Idaho — Magic Valley market realities, not a renamed Treasure Valley or out-of-state page.',
  heroCredibility:
    'IPUC household goods / motor carrier frameworks · FMCSA · Curated directory listings',
  majorCorridors: 'I-84 · US-93 · US-30 · local Twin Falls grid',
  whatMakesDifferent: {
    title: 'What makes moving in Twin Falls County different',
    intro:
      'These are Magic Valley south-central realities — canyon-rim access, Twin Falls core multi-unit, growth HOAs east and west, and I-84 corridor timing — not Boise metro defaults or a generic Idaho template.',
    bullets: [
      {
        title: 'Canyon-rim and elevation pitch rewrite labor hours',
        detail:
          'Snake River Canyon rim approaches, limited turnaround, long carries, and wind exposure on rim lots dominate some Twin Falls jobs. Flat-suburb optimism underprices these addresses — survey photos beat bedroom-count quotes.',
      },
      {
        title: 'Twin Falls core multi-unit differs from Kimberly growth SFH',
        detail:
          'Elevators or stair-heavy product, scarce curb staging, and month-end pileups dominate denser core jobs. A downtown walk-up is not a Kimberly garage-friendly HOA two-story.',
      },
      {
        title: 'I-84, US-93, US-30, and the local grid define portal-to-portal time',
        detail:
          'Filer ↔ Twin Falls, Kimberly ↔ core, or Magic Valley regional pairs look local on maps and regional at peak. Price honestly — empty miles, winter ice, and construction stack fast.',
      },
      {
        title: 'Agricultural edges and older grids are not growth-tract product',
        detail:
          'Farm-edge long drives, soft shoulders, irrigation-adjacent approaches, and older Twin Falls character streets use different staging than new HOA cul-de-sacs.',
      },
      {
        title: 'Not Ada/Boise south and not a Salt Lake or Reno rename',
        detail:
          'This is Twin Falls County, Idaho — Magic Valley south-central. Boise foothills, Meridian HOA growth, and Wasatch or Nevada templates use different access rules and corridors — survey each Twin Falls address on its own terms.',
      },
      {
        title: 'Intrastate IPUC household goods / motor carrier frameworks vs interstate FMCSA',
        detail:
          'Moves entirely within Idaho by for-hire household goods carriers generally fall under Idaho Public Utilities Commission (IPUC) household goods / motor carrier frameworks — not Washington UTC, Oregon, Utah, Montana, Nevada NTA, or New Jersey rules. Match the legal name on the estimate to applicable IPUC authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
    ],
  },
  zonesHeading: 'Twin Falls County access zones',
  zonesIntro:
    'Plan by Twin Falls core / multi-unit, canyon-rim & elevation approaches, Kimberly–Hansen growth HOAs, and Filer–Buhl / I-84 agricultural corridors — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'twin-falls-core-multifamily',
      name: 'Twin Falls core, multi-unit & local arterial product',
      shortName: 'TF core',
      neighborhoods: [
        'Downtown Twin Falls',
        'Core multi-family belts',
        'College of Southern Idaho edges',
        'Blue Lakes / arterial approaches',
        'Local Twin Falls arterial grid',
      ],
      housingTypes: 'Multi-family, mixed older SFH, renovated and mid-density product',
      challenges: [
        'Stair-heavy or elevator multi-unit and lease-turn timing',
        'Scarce curb staging near denser corridors',
        'Peak arterial freeflow toward I-84 and US-93',
      ],
      moverTips:
        'Photo stair counts and curb options early. Prefer mid-week mornings for multi-family. Price core–corridor pairs portal-to-portal.',
      cityKeywords: [
        'twin falls',
        'downtown twin falls',
        'blue lakes',
        'csi',
        'twin falls idaho',
      ],
    },
    {
      id: 'canyon-rim-elevation',
      name: 'Canyon rim, Perrine Bridge approaches & elevation stock',
      shortName: 'Canyon rim',
      neighborhoods: [
        'Snake River Canyon rim neighborhoods',
        'Perrine Bridge approaches',
        'Rim-view SFH product',
        'Steep private-drive edges',
        'Wind-exposed elevation lots',
      ],
      housingTypes: 'Hillside/rim SFH, view lots, some custom product',
      challenges: [
        'Pitch, limited truck turnaround, long carries',
        'Wind and winter ice on rim approaches',
        'Narrow private drives and staging constraints',
      ],
      moverTips:
        'Survey driveway pitch, turnaround, and wind exposure. Build winter weather buffers. Confirm truck-length limits before final pricing.',
      cityKeywords: [
        'canyon rim',
        'perrine bridge',
        'snake river canyon',
        'twin falls',
        'rim view',
      ],
    },
    {
      id: 'kimberly-hansen-growth-hoas',
      name: 'Kimberly, Hansen & east growth HOA belts',
      shortName: 'Kimberly / Hansen',
      neighborhoods: [
        'Kimberly',
        'Hansen edges',
        'Newer HOA tracts',
        'East Magic Valley growth corridors',
        'US-30 east approaches',
      ],
      housingTypes: 'Newer SFH, HOA tracts, some townhome and multi-family edges',
      challenges: [
        'HOA gate lists and truck-length limits',
        'Longer portal time toward Twin Falls core',
        'Unfinished curb and construction staging on new tracts',
      ],
      moverTips:
        'Collect HOA packets early. Price east-growth–core pairs portal-to-portal. Avoid peak arterial windows when flexible.',
      cityKeywords: [
        'kimberly',
        'hansen',
        'kimberly idaho',
        'hansen idaho',
        'hoa',
      ],
    },
    {
      id: 'filer-buhl-i84-corridors',
      name: 'Filer, Buhl, I-84 & agricultural west corridors',
      shortName: 'Filer / Buhl / I-84',
      neighborhoods: [
        'Filer',
        'Buhl edges',
        'I-84 corridor approaches',
        'US-93 north/south freeflow',
        'Agricultural long-drive lots',
      ],
      housingTypes: 'Rural SFH, farm-edge homes, mixed corridor and small-town stock',
      challenges: [
        'Long private drives, soft shoulders, limited staging',
        'Irrigation and equipment-adjacent access constraints',
        'Winter ice/wind and empty-mile risk on I-84 / US-93 / US-30',
      ],
      moverTips:
        'Survey drive surface and turnaround. Price rural and corridor legs with empty-mile honesty. Build winter ice buffers on I-84.',
      cityKeywords: [
        'filer',
        'buhl',
        'i-84',
        'us-93',
        'us-30',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Twin Falls County moving costs',
    intro:
      'Canyon-rim access, core multi-unit friction, growth HOA rules, and I-84 / US-93 / US-30 portal time drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Canyon-rim long carries & pitch',
        detail: 'Pitch, wind, turnaround limits, and carry distance spike labor hours.',
      },
      {
        title: 'Twin Falls core multi-unit stair & curb friction',
        detail: 'Lease turns and scarce staging dominate denser jobs.',
      },
      {
        title: 'I-84 / US-93 / US-30 congestion',
        detail: 'Portal-to-portal spikes at peak and winter ice/wind windows.',
      },
      {
        title: 'Cross-zone empty miles (Kimberly–core and Filer–TF)',
        detail: 'Map-short pairs still bill regional time across the Magic Valley grid.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,650+',
        note: 'Higher with multi-unit stairs or rim carries',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,300–$3,900+',
        note: 'Core and rim friction trends up',
      },
      {
        label: '3–4+ BR / canyon-rim / cross-corridor',
        value: '$2,300–$7,500+',
        note: 'Long carries and multi-corridor pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$100–$180+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Twin Falls County',
    intro:
      'Summer family peaks, multi-family lease turns, agricultural windows, and winter plain ice/wind reshape Magic Valley schedules.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear curb and reduce arterial / I-84 pain before peak.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book Twin Falls, Kimberly, and Filer Saturdays early.',
      },
      {
        title: 'Month-end multi-family turns',
        detail: 'Twin Falls denser product fills first.',
      },
      {
        title: 'Winter ice, wind & plain elevation',
        detail: 'Nov–Mar rim and corridor jobs need weather buffers; I-84 freeflow can delay trucks.',
      },
    ],
  },
  specialized: [
    {
      id: 'twin-falls-magic-valley-south-central',
      title: 'Twin Falls Magic Valley & south-central module',
      intro:
        'Twin Falls ID estimates fail when canyon-rim access, multi-unit lease timing, or I-84 / US-93 / US-30 empty miles are ignored — and when crews treat this as a Boise south or Ada rename page.',
      bullets: [
        'Request multi-unit building packets early.',
        'Photo driveway pitch, turnaround, and wind exposure on canyon-rim jobs.',
        'Price I-84 / US-93 / US-30 pairs portal-to-portal.',
        'Clarify Twin Falls vs Jerome/Cassia or out-of-state destinations on multi-county estimates.',
        'Verify IPUC-applicable authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Twin Falls County?',
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
              'Twin Falls, Filer, Buhl, Kimberly, Hansen, and other systems serve different addresses. Confirm zoning carefully — district lines shift across growth and rural edges.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools and Idaho State Department of Education data beat ranking screenshots. College of Southern Idaho is a local higher-ed anchor.',
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
              'St. Luke’s Magic Valley (Twin Falls) and related campuses anchor regional care. Confirm networks and specialist access.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour and winter drive times from Kimberly, Filer, and rural edges into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core multi-unit vs canyon-rim SFH vs growth HOA stock',
            detail:
              'Downtown denser product, rim-view homes, and Kimberly tracts price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Magic Valley pricing is not Boise metro pricing — growth tracts, older grids, and rim product still diverge block by block.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Twin Falls core lifestyle',
            detail: 'More central amenities with multi-unit curb and stair tradeoffs.',
          },
          {
            title: 'Canyon-rim pattern',
            detail: 'Views and elevation logistics near Snake River Canyon approaches.',
          },
          {
            title: 'Kimberly / Filer / agricultural-edge pattern',
            detail: 'More space, HOA or farm-edge rules, and different commute math to core jobs.',
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
              'Agriculture and food processing, healthcare, education (including CSI), retail, logistics, and regional services shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-84, US-93, and US-30 peaks and winter conditions are real. Test drive peak routes between your zone and work anchors.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Magic Valley south-central identity',
            detail:
              'Twin Falls is Magic Valley regional hub with canyon and agricultural character — not Boise south product, and not a Salt Lake or Reno rename.',
          },
          {
            title: 'Climate & elevation',
            detail:
              'Semi-arid Magic Valley climate with cold winters, warm dry summers, elevation ~3,600–3,800+ ft. Plan outdoor staging and winter ice/wind contingency.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Twin Falls County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify IPUC-applicable Idaho household goods / motor carrier authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Twin Falls County, Idaho — official site',
        href: 'https://twinfallscounty.org/',
        external: true,
      },
      {
        label: 'City of Twin Falls — official site',
        href: 'https://www.tfid.org/',
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
    'Prefer canyon-rim access and multi-unit experience with honest I-84 / US-93 / US-30 pricing. Verify IPUC frameworks in-state and FMCSA interstate. This is Twin Falls County ID (Magic Valley) — not Boise south.',
  lastReviewed: '2026-07-24',
});
