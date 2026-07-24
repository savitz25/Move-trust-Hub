import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeArPack } from '@/lib/local-movers/county-intelligence/arkansas/ar-shared';

/**
 * Washington County, AR — Fayetteville / University of Arkansas NWA (NOT Washington State, NOT Washington County UT).
 */
export const washingtonCountyArIntelligence: CountyIntelligencePack = finalizeArPack({
  countySlug: 'washington',
  hubTitle: 'Washington County Moving Intelligence Hub',
  eyebrow:
    'Washington · Fayetteville AR / University of Arkansas · I-49 · US-71 · AR-16',
  h1: 'Moving in Washington County, Arkansas: Fayetteville Neighborhoods, University Cycles & NWA Grid Logistics',
  heroOpener:
    'Washington County, Arkansas is Fayetteville and University of Arkansas NWA — not Washington State, not Washington County Utah, not Benton County Bentonville corporate product alone, and not a Little Rock capital-metro rename. Student and academic calendar waves, downtown and Dickson Street multi-unit, hillside Ozark approaches, Springdale and Farmington growth belts, and I-49 / US-71 freeflow rewrite “local” estimates. A campus-adjacent walk-up, a Mount Sequoyah long-carry driveway, a Springdale multi-family turn, and a Farmington HOA two-story do not share truck access or empty-mile risk. This hub is for people moving in Washington County, Arkansas — Fayetteville / U of A market realities — clearly Arkansas NWA, not a Pacific Northwest or Utah Washington page.',
  heroCredibility:
    'ArDOT Intrastate Authority for intrastate AR moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-49 · US-71 · AR-16 · local Fayetteville grid',
  whatMakesDifferent: {
    title: 'What makes moving in Washington County different',
    intro:
      'These are Fayetteville, Arkansas university-metro realities — academic calendars, hillside access, and I-49 freeflow — not Bentonville HOA-only defaults and not a Washington State or Utah rename.',
    bullets: [
      {
        title: 'University of Arkansas cycles compress booking windows',
        detail:
          'Semester starts, lease turns, graduation weeks, and faculty relocations stack Fayetteville inventory. Mid-month and mid-week mornings beat move-in-weekend optimism near campus.',
      },
      {
        title: 'Downtown, Dickson, and campus multi-unit differ from outer SFH',
        detail:
          'Stairs, scarce curb, elevators, and COI packets dominate core jobs. A campus walk-up is not a Farmington garage-friendly two-story.',
      },
      {
        title: 'Ozark hillside approaches rewrite labor hours',
        detail:
          'Mount Sequoyah edges, ridge lots, and pitchy driveways mean long carries, tight turnarounds, and soft-shoulder risk. Survey photos beat bedroom-count quotes.',
      },
      {
        title: 'I-49, US-71, and AR-16 define portal-to-portal time',
        detail:
          'Fayetteville ↔ Springdale, campus ↔ Farmington, or west hills ↔ I-49 pairs look local on maps and regional at peak. Price honestly — empty miles and game-day congestion stack fast.',
      },
      {
        title: 'Arkansas Fayetteville NWA — not Washington State or Washington County UT',
        detail:
          'This is Washington County, Arkansas. Seattle-area product, Utah desert-fringe markets, and Benton County Bentonville corporate defaults use different access rules and corridors — survey each Fayetteville AR address on its own terms.',
      },
      {
        title: 'Intrastate ArDOT household goods authority vs interstate FMCSA',
        detail:
          'Moves entirely within Arkansas by for-hire household goods carriers generally require ArDOT Arkansas Intrastate Operating Authority. Match the legal name on the estimate to ArDOT authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
    ],
  },
  zonesHeading: 'Washington County access zones',
  zonesIntro:
    'Plan by Fayetteville core / campus, hillside and west ridge belts, Springdale corridors, and Farmington / outer growth — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'fayetteville-core-campus',
      name: 'Fayetteville core, Dickson Street & University of Arkansas campus',
      shortName: 'Core / campus',
      neighborhoods: [
        'Downtown Fayetteville',
        'Dickson Street',
        'University of Arkansas campus edges',
        'Uptown / midtown multi-unit',
        'Razorback Road approaches',
      ],
      housingTypes: 'Walk-ups, student multi-unit, lofts, denser mid-rises',
      challenges: [
        'Elevators, COI, and timed building windows',
        'Scarce curb staging and game-day / event congestion',
        'Stairs, long carries, and tight alley approaches',
      ],
      moverTips:
        'Get building packets early. Avoid home-game and move-in weekends when flexible. Photo stair counts and curb options before final pricing.',
      cityKeywords: [
        'fayetteville',
        'fayetteville ar',
        'dickson street',
        'university of arkansas',
        'u of a',
        'downtown fayetteville',
      ],
    },
    {
      id: 'fayetteville-hills-west',
      name: 'Fayetteville hills, Mount Sequoyah & west ridge stock',
      shortName: 'Hills / west ridge',
      neighborhoods: [
        'Mount Sequoyah edges',
        'West Fayetteville hillside',
        'College Avenue corridor edges',
        'Tree-canopy ridge lots',
        'AR-16 west approaches',
      ],
      housingTypes: 'Established SFH, hillside lots, some multi-family pockets',
      challenges: [
        'Hillside driveways and limited truck turnaround',
        'Long carries and soft-shoulder risk',
        'Tree canopy and winding residential approaches',
      ],
      moverTips:
        'Survey driveway pitch and staging length. Prefer smaller trucks on tight ridge turns. Build weather contingency for leaf and ice seasons.',
      cityKeywords: [
        'mount sequoyah',
        'west fayetteville',
        'college avenue',
        'ar-16',
      ],
    },
    {
      id: 'springdale-corridors',
      name: 'Springdale corridors & north Washington County belts',
      shortName: 'Springdale',
      neighborhoods: [
        'Springdale',
        'US-71B / I-49 Springdale approaches',
        'East Springdale multi-family',
        'Industrial-adjacent stock edges',
        'North county growth pockets',
      ],
      housingTypes: 'Mixed SFH, multi-family, and growth-corridor stock',
      challenges: [
        'I-49 / US-71 peak congestion',
        'Lease-turn multi-family waves',
        'Longer portal time on Springdale–Fayetteville pairs',
      ],
      moverTips:
        'Price Springdale–Fayetteville pairs portal-to-portal. Clarify multi-family lease-turn timing. Avoid peak I-49 windows when flexible.',
      cityKeywords: [
        'springdale',
        'springdale ar',
        'us-71',
        'i-49 springdale',
      ],
    },
    {
      id: 'farmington-outer-growth',
      name: 'Farmington, Greenland edges & outer growth HOAs',
      shortName: 'Farmington / outer',
      neighborhoods: [
        'Farmington',
        'Greenland edges',
        'West and south growth tracts',
        'HOA cul-de-sac grids',
        'School-calendar family stock',
      ],
      housingTypes: 'Newer SFH, HOA tracts, some townhomes',
      challenges: [
        'HOA gate lists and truck-length limits',
        'Longer empty miles into campus core',
        'Summer family move-in compression',
      ],
      moverTips:
        'Collect HOA packets early. Price outer–campus pairs honestly. Book late-May through August Saturdays early.',
      cityKeywords: [
        'farmington',
        'farmington ar',
        'greenland',
        'west fayetteville growth',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Washington County moving costs',
    intro:
      'Campus multi-unit friction, hillside access, academic calendar peaks, and I-49 portal time drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Campus / Dickson multi-unit & curb friction',
        detail: 'Stairs, elevators, and scarce staging dominate core jobs.',
      },
      {
        title: 'Ozark hillside long carries',
        detail: 'Pitch, turnaround limits, and carry distance spike labor hours.',
      },
      {
        title: 'I-49 / US-71 / AR-16 congestion',
        detail: 'Portal-to-portal spikes at peak, construction, and game days.',
      },
      {
        title: 'Semester lease-turn & cross-zone empty miles',
        detail: 'Map-short pairs still bill regional time across the NWA grid.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,700+',
        note: 'Higher with campus stairs or elevators',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,350–$4,200+',
        note: 'Core and hillside friction trends up',
      },
      {
        label: '3–4+ BR / hillside / cross-NWA',
        value: '$2,500–$8,300+',
        note: 'Long carries and multi-corridor pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$185+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Washington County',
    intro:
      'University lease turns, graduation and move-in weekends, summer family peaks, and humid storm afternoons reshape Fayetteville, Arkansas windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear curb and reduce I-49 / campus-area pain before peak.',
      },
      {
        title: 'University peaks: semester start / end weeks',
        detail: 'Book campus-adjacent elevators and curb slots early.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Farmington and outer growth Saturdays fill first.',
      },
      {
        title: 'Summer heat, humidity & afternoon storms',
        detail: 'Plan outdoor staging shade and weather contingency.',
      },
    ],
  },
  specialized: [
    {
      id: 'fayetteville-washington-ar-university-nwa',
      title: 'Fayetteville AR university & NWA hillside module',
      intro:
        'Washington County AR estimates fail when campus calendars, hillside access, or I-49 empty miles are ignored — and when crews treat this as Washington State, Washington County UT, or Bentonville-only NWA.',
      bullets: [
        'Align crew days with U of A lease turns and avoid game-day curb conflicts when possible.',
        'Photo driveway pitch and stair access on hillside Fayetteville jobs.',
        'Price I-49 / US-71 / AR-16 pairs portal-to-portal.',
        'Clarify Washington County AR vs Benton County AR destinations on multi-county estimates.',
        'Verify ArDOT Intrastate Authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Washington County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit. This is Washington County, Arkansas (Fayetteville / NWA).',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Fayetteville, Springdale, Farmington, Greenland, Prairie Grove, Elkins, West Fork, and other systems serve different addresses. Confirm zoning carefully — growth tracts shift boundaries.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools and Arkansas Department of Education data beat ranking screenshots. University of Arkansas is a separate higher-ed planning input.',
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
              'Washington Regional Medical Center, Northwest Health campuses, and other NWA facilities anchor Fayetteville/Springdale care. Confirm networks and specialist access.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Farmington, Springdale, and west hills into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Campus multi-unit vs hillside SFH vs outer growth stock',
            detail:
              'Dickson walk-ups, ridge two-stories, and Farmington HOA product price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Campus-adjacent demand often prices differently from outer western tracts or Springdale multi-family product.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Core / campus lifestyle',
            detail: 'Walkable amenities with density, stairs, and event-day tradeoffs.',
          },
          {
            title: 'Hills / west ridge pattern',
            detail: 'Established SFH and hillside logistics near AR-16 corridors.',
          },
          {
            title: 'Springdale and Farmington pattern',
            detail: 'More space, different school calendars, and I-49 commute math.',
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
              'University of Arkansas and education, healthcare, professional services, logistics, and regional retail shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-49, US-71, and AR-16 peaks are real. Test drive peak routes between your zone and work anchors — this is Arkansas NWA freeflow, not Seattle or Utah patterns.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Fayetteville Arkansas / NWA identity',
            detail:
              'Washington County AR is Fayetteville university metro — not Washington State, not Washington County UT, and not Bentonville corporate product alone.',
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
    title: 'Useful Washington County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify ArDOT Intrastate Authority for in-state moves and FMCSA for interstate legs before deposits. This is Washington County, Arkansas.',
    items: [
      {
        label: 'Washington County, Arkansas — official site',
        href: 'https://www.washingtoncountyar.gov/',
        external: true,
      },
      {
        label: 'City of Fayetteville, Arkansas — official site',
        href: 'https://www.fayetteville-ar.gov/',
        external: true,
      },
      {
        label: 'ArDOT traffic & road conditions',
        href: 'https://www.ardot.gov/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Prefer campus multi-unit and hillside experience with honest I-49 / US-71 pricing. Verify ArDOT Intrastate Authority in-state and FMCSA interstate. This is Washington County AR (Fayetteville / NWA) — not Washington State or Washington County UT.',
  lastReviewed: '2026-07-24',
});
