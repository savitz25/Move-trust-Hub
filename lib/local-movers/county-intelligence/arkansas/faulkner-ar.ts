import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeArPack } from '@/lib/local-movers/county-intelligence/arkansas/ar-shared';

/**
 * Faulkner County, AR — Conway / I-40 growth corridor (north-central growth, not LR north clone only).
 */
export const faulknerCountyArIntelligence: CountyIntelligencePack = finalizeArPack({
  countySlug: 'faulkner',
  hubTitle: 'Faulkner County Moving Intelligence Hub',
  eyebrow:
    'Faulkner · Conway AR I-40 growth · US-65 · AR-25 · north-central corridor',
  h1: 'Moving in Faulkner County: Conway Growth Corridors, I-40 Logistics & North-Central Arkansas Access',
  heroOpener:
    'Faulkner County, Arkansas is Conway and the north-central I-40 growth corridor — university and college calendars, Vilonia and Greenbrier belts, Mayflower lake-edge stock — not a Little Rock north-suburb rename alone, not NWA Bentonville product, and not a generic central Arkansas template. Newer HOA tracts, campus-adjacent multi-unit, established midtown Conway grids, and I-40 / US-65 freeflow rewrite “local” estimates. A downtown Conway walk-up, a Dave Ward Drive multi-family turn, a Vilonia family two-story, and a Mayflower long-driveway ranch do not share truck access or empty-mile risk. This hub is for people moving in Faulkner County, Arkansas — Conway growth-corridor realities with distinct north-central identity, not merely “LR north.”',
  heroCredibility:
    'ArDOT Intrastate Authority for intrastate AR moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-40 · US-65 · AR-25 · local Conway grid',
  whatMakesDifferent: {
    title: 'What makes moving in Faulkner County different',
    intro:
      'These are Conway / I-40 north-central growth realities — college calendars, HOA tracts, and corridor freeflow — not Little Rock Heights hillside defaults or a generic Arkansas template.',
    bullets: [
      {
        title: 'Conway is a growth corridor city — not only “LR north”',
        detail:
          'UCA and Hendrix calendars, local employment anchors, and I-40 portal math create a distinct market. Treating every job as a Maumelle or Sherwood clone underprices campus multi-unit and overprices some outer ranch access.',
      },
      {
        title: 'Campus-adjacent and multi-unit stock rewrite labor hours',
        detail:
          'Stairs, scarce curb, elevators, and lease-turn compression dominate core Conway jobs. A Dave Ward multi-family is not a Greenbrier garage-friendly two-story.',
      },
      {
        title: 'I-40, US-65, and AR-25 define portal-to-portal time',
        detail:
          'Conway ↔ Vilonia, core ↔ Mayflower, or Greenbrier ↔ I-40 pairs look local on maps and regional at peak. Price honestly — empty miles and construction windows stack fast.',
      },
      {
        title: 'Outer growth and lake-edge product differ from midtown grids',
        detail:
          'HOA packets, long driveways, soft shoulders, and school-calendar peaks dominate Vilonia, Greenbrier, and Mayflower belts. Midtown curb rules do not transfer automatically.',
      },
      {
        title: 'Not Little Rock core and not NWA corporate-growth defaults',
        detail:
          'This is Faulkner County, Arkansas — Conway north-central growth. Pulaski capital-metro product and Bentonville HOA growth use different access rules and corridors — survey each Faulkner address on its own terms.',
      },
      {
        title: 'Intrastate ArDOT household goods authority vs interstate FMCSA',
        detail:
          'Moves entirely within Arkansas by for-hire household goods carriers generally require ArDOT Arkansas Intrastate Operating Authority. Match the legal name on the estimate to ArDOT authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
    ],
  },
  zonesHeading: 'Faulkner County access zones',
  zonesIntro:
    'Plan by Conway core / campus, west and south Conway growth, Vilonia / Greenbrier belts, and Mayflower / lake-edge corridors — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'conway-core-campus',
      name: 'Conway core, downtown & campus-adjacent belts',
      shortName: 'Core / campus',
      neighborhoods: [
        'Downtown Conway',
        'UCA campus edges',
        'Hendrix-adjacent multi-unit',
        'Oak Street / midtown grids',
        'Dave Ward Drive multi-family edges',
      ],
      housingTypes: 'Walk-ups, student multi-unit, renovated SFH, denser mid-rises',
      challenges: [
        'Elevators, COI, and timed building windows',
        'Scarce curb staging near campus peaks',
        'Stairs, long carries, and tight alley approaches',
      ],
      moverTips:
        'Get building packets early. Avoid semester move-in weekends when flexible. Photo stair counts and curb options before final pricing.',
      cityKeywords: [
        'conway',
        'conway ar',
        'downtown conway',
        'uca',
        'hendrix',
        'dave ward',
      ],
    },
    {
      id: 'conway-west-south-growth',
      name: 'West & south Conway growth HOAs',
      shortName: 'West / south Conway',
      neighborhoods: [
        'West Conway tracts',
        'South Conway growth',
        'Prince Street / Donnell Ridge edges',
        'HOA cul-de-sac grids',
        'I-40 Conway approaches',
      ],
      housingTypes: 'Newer SFH, HOA tracts, some townhomes',
      challenges: [
        'HOA gate lists and truck-length limits',
        'I-40 peak congestion toward LR metro',
        'Summer family move-in compression',
      ],
      moverTips:
        'Collect HOA packets early. Price west–core pairs portal-to-portal. Book late-May through August Saturdays early.',
      cityKeywords: [
        'west conway',
        'south conway',
        'prince street',
        'conway hoa',
      ],
    },
    {
      id: 'vilonia-greenbrier',
      name: 'Vilonia, Greenbrier & east/north growth belts',
      shortName: 'Vilonia / Greenbrier',
      neighborhoods: [
        'Vilonia',
        'Greenbrier',
        'US-65 / AR-25 corridor edges',
        'School-calendar family stock',
        'Outer county ranch pockets',
      ],
      housingTypes: 'Newer SFH, ranch stock, some multi-family pockets',
      challenges: [
        'Longer empty miles into Conway core',
        'US-65 peak freeflow',
        'Soft shoulders and longer driveway carries on rural edges',
      ],
      moverTips:
        'Price outer–core pairs honestly. Survey driveway condition on ranch-edge jobs. Confirm school-calendar blackout weekends.',
      cityKeywords: [
        'vilonia',
        'greenbrier',
        'vilonia ar',
        'greenbrier ar',
        'us-65',
      ],
    },
    {
      id: 'mayflower-lake-edge',
      name: 'Mayflower, lake-edge & south I-40 fringe',
      shortName: 'Mayflower / lake',
      neighborhoods: [
        'Mayflower',
        'Lake Conway edges',
        'South I-40 fringe stock',
        'Waterfront and long-driveway lots',
        'LR-metro commute pockets',
      ],
      housingTypes: 'SFH, lake-edge lots, mixed older and growth stock',
      challenges: [
        'Long driveway carries and limited turnaround',
        'I-40 congestion toward Little Rock',
        'Soft shoulders and weather-sensitive staging',
      ],
      moverTips:
        'Photo driveway length and pitch before pricing. Build I-40 buffers on Mayflower–LR pairs. Plan weather contingency on lake-edge lots.',
      cityKeywords: [
        'mayflower',
        'mayflower ar',
        'lake conway',
        'i-40 mayflower',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Faulkner County moving costs',
    intro:
      'Campus multi-unit friction, HOA access, outer empty miles, and I-40 portal time drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Campus / multi-unit stair & curb friction',
        detail: 'Building packets and scarce staging dominate core jobs.',
      },
      {
        title: 'HOA gate & truck-length limits',
        detail: 'West/south growth tracts spike labor and staging time.',
      },
      {
        title: 'I-40 / US-65 / AR-25 congestion',
        detail: 'Portal-to-portal spikes at peak and construction windows.',
      },
      {
        title: 'Outer Vilonia / Greenbrier / Mayflower empty miles',
        detail: 'Map-short pairs still bill regional corridor time.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$425–$1,600+',
        note: 'Higher with campus stairs or elevators',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,300–$4,000+',
        note: 'HOA and corridor friction trends up',
      },
      {
        label: '3–4+ BR / outer / I-40 cross-corridor',
        value: '$2,400–$7,900+',
        note: 'Empty miles and multi-corridor pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$100–$180+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Faulkner County',
    intro:
      'College lease turns, summer family peaks, I-40 construction seasons, and humid storm afternoons reshape Conway windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear curb and reduce I-40 / Dave Ward pain before peak.',
      },
      {
        title: 'Campus peaks: semester start / end weeks',
        detail: 'Book core multi-unit curb slots early.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'West Conway and Vilonia Saturdays fill first.',
      },
      {
        title: 'Summer heat, humidity & afternoon storms',
        detail: 'Plan outdoor staging shade and weather contingency.',
      },
    ],
  },
  specialized: [
    {
      id: 'conway-faulkner-i40-growth-corridor',
      title: 'Conway I-40 growth-corridor module',
      intro:
        'Faulkner AR estimates fail when campus calendars, HOA packets, or I-40 empty miles are ignored — and when crews treat this as a Little Rock north-suburb clone only.',
      bullets: [
        'Align crew days with UCA/Hendrix lease turns when jobs are campus-adjacent.',
        'Collect HOA packets on west and south Conway growth tracts.',
        'Price I-40 / US-65 / AR-25 pairs portal-to-portal.',
        'Clarify Faulkner vs Pulaski destinations on multi-county estimates.',
        'Verify ArDOT Intrastate Authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Faulkner County?',
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
              'Conway, Vilonia, Greenbrier, Mayflower, Guy-Perkins, and other systems serve different addresses. Confirm zoning carefully — growth tracts shift attendance boundaries.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools and Arkansas Department of Education data beat ranking screenshots. UCA and Hendrix are separate higher-ed planning inputs.',
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
              'Conway Regional Health System and other regional facilities anchor local care, with Little Rock specialty campuses reachable via I-40. Confirm networks and specialist access.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Vilonia, Greenbrier, and Mayflower into Conway and Little Rock campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Campus multi-unit vs HOA growth vs lake-edge stock',
            detail:
              'Core walk-ups, west Conway two-stories, and Mayflower lake-edge product price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Growth HOA neighborhoods often price differently from outer ranch stock or older midtown product.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Core / campus lifestyle',
            detail: 'Walkable amenities with density, stairs, and calendar peaks.',
          },
          {
            title: 'West / south Conway growth pattern',
            detail: 'HOA SFH, school calendars, and I-40 commute math.',
          },
          {
            title: 'Vilonia / Greenbrier / Mayflower pattern',
            detail: 'More space, longer core freeflow, and distinct daily rhythms.',
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
              'Higher education, healthcare, local government, logistics, and Little Rock-metro reverse commutes shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-40, US-65, and AR-25 peaks are real. Test drive peak routes between your zone and work anchors in Conway and toward Pulaski County.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Conway north-central identity',
            detail:
              'Faulkner is Conway / I-40 growth corridor — not only Little Rock north product, and not NWA corporate-growth alone.',
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
    title: 'Useful Faulkner County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify ArDOT Intrastate Authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Faulkner County, Arkansas — official site',
        href: 'https://www.faulknercounty.org/',
        external: true,
      },
      {
        label: 'City of Conway — official site',
        href: 'https://www.conwayarkansas.gov/',
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
    'Prefer campus multi-unit and I-40 growth-corridor experience with honest US-65 / AR-25 pricing. Verify ArDOT Intrastate Authority in-state and FMCSA interstate. This is Faulkner County AR (Conway) — north-central growth, not LR north only.',
  lastReviewed: '2026-07-24',
});
