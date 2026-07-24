import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeAlPack } from '@/lib/local-movers/county-intelligence/alabama/al-shared';

/**
 * Jefferson County, AL — Birmingham metro core (not Jefferson KY/MO, not Shelby south-suburb clone).
 */
export const jeffersonCountyAlIntelligence: CountyIntelligencePack = finalizeAlPack({
  countySlug: 'jefferson',
  hubTitle: 'Jefferson County Moving Intelligence Hub',
  eyebrow:
    'Jefferson · Birmingham AL metro core · I-20 · I-65 · I-59 · US-280 · US-31',
  h1: 'Moving in Jefferson County: Birmingham Neighborhoods, Red Mountain Access & Interstate Grid Logistics',
  heroOpener:
    'Jefferson County, Alabama is Birmingham metro core — not a Jefferson County KY Louisville page, not Jefferson County MO south-STL fringe, and not a Shelby Hoover growth clone. Southside and Highland Avenue multi-unit, Crestwood and Forest Park hillside approaches, Vestavia and Homewood edges, Fairfield and western industrial-adjacent stock, and I-20 / I-65 / I-59 / US-280 freeflow rewrite “local” estimates. A downtown loft elevator job, a Red Mountain long-carry driveway, a Trussville newer two-story, and a Bessemer bungalow do not share truck access or empty-mile risk. This hub is for people moving in Jefferson County, Alabama — Birmingham market realities, not a renamed Louisville or St. Louis Jefferson page.',
  heroCredibility:
    'APSC Motor Carrier Services household goods authority for intrastate AL moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-20 · I-65 · I-59 · US-280 · US-31 · local arterial grid',
  whatMakesDifferent: {
    title: 'What makes moving in Jefferson County different',
    intro:
      'These are Birmingham metro core realities — hillside access, multi-unit density, and multi-interstate timing — not Shelby HOA growth defaults or a generic Alabama template.',
    bullets: [
      {
        title: 'Hillside and Red Mountain approaches rewrite labor hours',
        detail:
          'Crestwood, Forest Park, Redmont, and mountain-edge driveways often mean pitch, tight turnarounds, long carries, and soft-shoulder risk that flat-suburb optimism underprices. Survey photos beat bedroom-count quotes.',
      },
      {
        title: 'Downtown, Southside, and midtown multi-unit differ from outer SFH',
        detail:
          'Elevators, COI packets, scarce curb staging, and stair-heavy stock dominate core jobs. A Highland Avenue walk-up is not a Trussville garage-friendly two-story.',
      },
      {
        title: 'I-20, I-65, I-59, and US-280 define portal-to-portal time',
        detail:
          'Southside ↔ Hoover edges, Homewood ↔ Irondale, or western Jefferson ↔ US-280 pairs look local on maps and regional at peak. Price honestly — empty miles and construction windows stack fast.',
      },
      {
        title: 'Western and industrial-adjacent corridors are not Southside product',
        detail:
          'Fairfield, Bessemer edges, and logistics-adjacent stock mix older SFH, multi-family waves, and different curb rules than Over the Mountain HOA assumptions.',
      },
      {
        title: 'Not Jefferson KY, Jefferson MO, or Shelby County AL as the default',
        detail:
          'This is Birmingham’s Alabama Jefferson County. Louisville, St. Louis fringe, and Hoover/Alabaster growth markets use different access rules, corridors, and crew skill — survey each Jefferson AL address on its own terms.',
      },
      {
        title: 'Intrastate APSC household goods authority vs interstate FMCSA',
        detail:
          'Moves entirely within Alabama by for-hire household goods carriers generally require Alabama Public Service Commission (APSC) Motor Carrier Services authority under Title 37, Chapter 3 of the Code of Alabama. Match the legal name on the estimate to APSC authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
    ],
  },
  zonesHeading: 'Jefferson County access zones',
  zonesIntro:
    'Plan by Birmingham core / Southside, Over the Mountain edges, eastern corridors, and western / industrial-adjacent belts — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'birmingham-core-southside',
      name: 'Birmingham core, Southside & Highland midtown',
      shortName: 'Core / Southside',
      neighborhoods: [
        'Downtown Birmingham',
        'Southside',
        'Highland Avenue',
        'Five Points South edges',
        'UAB-adjacent multi-unit',
      ],
      housingTypes: 'Lofts, mid-rises, renovated multi-unit, denser walk-ups',
      challenges: [
        'Elevators, COI, and timed building windows',
        'Scarce curb staging and event-day congestion',
        'Stairs, long carries, and tight alley approaches',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week morning freight windows. Photo curb options and stair counts before final pricing.',
      cityKeywords: [
        'birmingham',
        'southside',
        'highland avenue',
        'five points south',
        'downtown birmingham',
        'uab',
      ],
    },
    {
      id: 'over-mountain-homewood-vestavia',
      name: 'Homewood, Vestavia & Over the Mountain edges',
      shortName: 'Homewood / Vestavia',
      neighborhoods: [
        'Homewood',
        'Vestavia Hills edges',
        'Mountain Brook edges',
        'Crestline / Redmont edges',
        'US-31 / US-280 approaches',
      ],
      housingTypes: 'Established SFH, hillside lots, some multi-family and HOA pockets',
      challenges: [
        'Hillside driveways and limited truck turnaround',
        'US-31 / US-280 peak congestion',
        'Tree canopy, stairs, and long carries on mountain-edge lots',
      ],
      moverTips:
        'Survey driveway pitch and staging length. Build US-280 and US-31 buffers for cross-zone pairs. Confirm HOA rules where applicable.',
      cityKeywords: [
        'homewood',
        'vestavia hills',
        'vestavia',
        'mountain brook',
        'crestline',
        'redmont',
      ],
    },
    {
      id: 'east-irondale-trussville',
      name: 'Irondale, Trussville & eastern I-59 / I-20 corridors',
      shortName: 'East corridors',
      neighborhoods: [
        'Irondale',
        'Trussville',
        'Leeds edges',
        'Center Point edges',
        'I-59 / I-20 eastern approaches',
      ],
      housingTypes: 'Newer SFH, multi-family, mixed older and growth stock',
      challenges: [
        'I-59 / I-20 congestion toward core',
        'Longer portal time on east–west pairs',
        'Mix of HOA packets and older driveway access',
      ],
      moverTips:
        'Price east–core pairs portal-to-portal. Collect HOA packets on newer tracts. Avoid peak I-59 / I-20 windows when flexible.',
      cityKeywords: ['irondale', 'trussville', 'leeds', 'center point'],
    },
    {
      id: 'west-fairfield-bessemer',
      name: 'Fairfield, Bessemer & western industrial-adjacent belts',
      shortName: 'West / Bessemer',
      neighborhoods: [
        'Fairfield',
        'Bessemer',
        'Hueytown edges',
        'Midfield edges',
        'western I-20 / I-59 approaches',
      ],
      housingTypes: 'Older SFH, multi-family, industrial-adjacent stock',
      challenges: [
        'Mixed curb rules and older stair/basement product',
        'I-20 / I-59 logistics traffic',
        'Different access skill set than Over the Mountain HOA jobs',
      ],
      moverTips:
        'Survey stair width and driveway condition carefully. Clarify multi-family lease-turn timing. Price western pairs honestly against core congestion.',
      cityKeywords: ['fairfield', 'bessemer', 'hueytown', 'midfield'],
    },
  ],
  costDrivers: {
    title: 'What drives Jefferson County moving costs',
    intro:
      'Hillside access, core multi-unit friction, and multi-interstate portal time drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Hillside & Red Mountain long carries',
        detail: 'Pitch, turnaround limits, and carry distance spike labor hours.',
      },
      {
        title: 'Downtown / Southside elevator & curb friction',
        detail: 'Building packets and scarce staging dominate core jobs.',
      },
      {
        title: 'I-20 / I-65 / I-59 / US-280 congestion',
        detail: 'Portal-to-portal spikes at peak and construction windows.',
      },
      {
        title: 'Cross-zone empty miles (east–west and core–suburb)',
        detail: 'Map-short pairs still bill regional time across the metro grid.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,550+',
        note: 'Higher with elevators or hillside carries',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,350–$4,000+',
        note: 'Core and mountain-edge friction trends up',
      },
      {
        label: '3–4+ BR / hillside / cross-metro',
        value: '$2,500–$8,000+',
        note: 'Long carries and multi-interstate pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$180+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Jefferson County',
    intro:
      'Summer family peaks, multi-family lease turns, football and event weekends, and humid storm afternoons reshape Birmingham windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear curb and reduce I-65 / US-280 pain before peak.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book Over the Mountain Saturdays early.',
      },
      {
        title: 'Month-end multi-family turns',
        detail: 'Downtown and Southside elevators fill first.',
      },
      {
        title: 'Summer heat, humidity & afternoon storms',
        detail: 'Plan outdoor staging shade and weather contingency.',
      },
    ],
  },
  specialized: [
    {
      id: 'birmingham-jefferson-hillside-interstate-grid',
      title: 'Birmingham hillside & interstate-grid module',
      intro:
        'Jefferson AL estimates fail when mountain-edge access, core building packets, or I-20/I-65/I-59 empty miles are ignored — and when crews treat this as a Louisville or St. Louis Jefferson page.',
      bullets: [
        'Request downtown/Southside building packets early.',
        'Photo driveway pitch, turnaround, and stair access on hillside jobs.',
        'Price I-20 / I-65 / I-59 / US-280 pairs portal-to-portal.',
        'Clarify Jefferson AL vs Shelby destinations on multi-county estimates.',
        'Verify APSC household goods authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Jefferson County?',
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
              'Birmingham City Schools, Homewood, Vestavia Hills, Mountain Brook, Hoover edges, and multiple municipal/county systems serve different addresses. Confirm zoning carefully — district lines shift block by block.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools and Alabama State Department of Education data beat ranking screenshots.',
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
              'UAB Medicine, Ascension St. Vincent’s, Brookwood Baptist, Children’s of Alabama, and other campuses anchor core and corridor care. Confirm networks and specialist access.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from eastern and western edges into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core multi-unit vs hillside SFH vs outer growth stock',
            detail:
              'Downtown lofts, mountain-edge two-stories, and Trussville/Bessemer product price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Over the Mountain renovated stock often prices differently from western multi-family or eastern newer tracts.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Core / Southside lifestyle',
            detail: 'Walkable amenities with elevator, curb, and density tradeoffs.',
          },
          {
            title: 'Homewood / Vestavia / mountain-edge pattern',
            detail: 'Established SFH and hillside logistics near US-31 / US-280.',
          },
          {
            title: 'East and west corridor pattern',
            detail: 'More space and different commute math to core jobs.',
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
              'Healthcare, UAB and education, finance, professional services, logistics, and manufacturing shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-65, I-20, I-59, and US-280 peaks are real. Test drive peak routes between your zone and work anchors.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Birmingham metro identity',
            detail:
              'Jefferson is Birmingham core — not Shelby south-suburb product alone, and not Jefferson KY or Jefferson MO.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, frequent afternoon storms, mild winters with occasional ice. Plan outdoor staging contingency.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Jefferson County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify APSC Motor Carrier Services intrastate authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Jefferson County, Alabama — official site',
        href: 'https://www.jccal.org/',
        external: true,
      },
      {
        label: 'City of Birmingham — official site',
        href: 'https://www.birminghamal.gov/',
        external: true,
      },
      {
        label: 'ALDOT traffic & road conditions',
        href: 'https://www.dot.state.al.us/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Prefer hillside access and core multi-unit experience with honest I-20 / I-65 / I-59 / US-280 pricing. Verify APSC HHG authority in-state and FMCSA interstate. This is Jefferson County AL (Birmingham) — not KY or MO.',
  lastReviewed: '2026-07-24',
});
