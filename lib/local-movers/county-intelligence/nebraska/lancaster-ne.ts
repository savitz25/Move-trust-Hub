import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeNePack } from '@/lib/local-movers/county-intelligence/nebraska/ne-shared';

/**
 * Lancaster County, NE — Lincoln capital + university (not Lancaster PA, not Omaha rename).
 */
export const lancasterCountyNeIntelligence: CountyIntelligencePack = finalizeNePack({
  countySlug: 'lancaster',
  hubTitle: 'Lancaster County Moving Intelligence Hub',
  eyebrow:
    'Lancaster · Lincoln NE capital metro · I-80 · US-77 · US-34',
  h1: 'Moving in Lancaster County: Lincoln Capital Access, University Cycles & I-80 Corridor Logistics',
  heroOpener:
    'Lancaster County, Nebraska is Lincoln capital metro — state government core, University of Nebraska–Lincoln student and faculty cycles, established neighborhood grids, and south/east growth belts — not Lancaster County Pennsylvania, not an Omaha Douglas rename, and not a generic Plains template. A downtown Capitol District elevator job, a Near South walk-up, a UNL-area lease turn, and a south Lincoln HOA cul-de-sac do not share truck access, curb rules, or empty-mile risk. I-80, US-77, and US-34 freeflow rewrite “local” estimates, and winter ice on arterials can erase schedule optimism overnight. This hub is for people moving in Lancaster County, Nebraska — Lincoln market realities, not a renamed Pennsylvania or Omaha page.',
  heroCredibility:
    'Nebraska PSC Household Goods Mover License · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-80 · US-77 · US-34 · local Lincoln grid',
  whatMakesDifferent: {
    title: 'What makes moving in Lancaster County different',
    intro:
      'These are Lincoln capital-metro realities — government and campus calendars, neighborhood stairs, growth-belt HOAs, and I-80 freeflow — not Lancaster PA Amish-country product, not Omaha river-city density, and not a Grand Island clone.',
    bullets: [
      {
        title: 'Capitol District and downtown multi-unit rewrite labor hours',
        detail:
          'Elevators, COI packets, scarce curb staging, and event-day freeflow dominate core jobs. A downtown loft is not a south Lincoln garage-friendly two-story.',
      },
      {
        title: 'UNL lease turns and academic calendars stack demand',
        detail:
          'University of Nebraska–Lincoln move-in/move-out waves, faculty relocations, and near-campus multi-family turns create schedule pressure that pure SFH suburbs do not share. Book early around semester boundaries.',
      },
      {
        title: 'Established neighborhood grids underprice flat-suburb optimism',
        detail:
          'Near South, Clinton, Hartley, and older midtown stock bring tight curb, basement stairs, and limited truck turnaround. Survey photos beat bedroom-count quotes.',
      },
      {
        title: 'I-80, US-77, and US-34 define portal-to-portal time',
        detail:
          'North Lincoln ↔ downtown, south growth belts ↔ UNL, or east corridor ↔ Capitol pairs look local on maps and regional at peak. Price honestly — empty miles and construction windows stack fast.',
      },
      {
        title: 'Winter logistics are real schedule risk on the capital grid',
        detail:
          'Ice, wind, and snow events reshape morning windows across Lincoln. Build weather contingency into outdoor staging and cross-zone pairs — especially December–March.',
      },
      {
        title: 'Intrastate Nebraska PSC Household Goods Mover License vs interstate FMCSA',
        detail:
          'Moves entirely within Nebraska by for-hire household goods carriers generally require a Nebraska Public Service Commission Household Goods Mover License. Match the legal name on the estimate to the PSC licensee list before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. This is not Iowa DOT, Kansas KCC, or Colorado PUC product.',
      },
    ],
  },
  zonesHeading: 'Lancaster County access zones',
  zonesIntro:
    'Plan by downtown–Capitol multi-unit, UNL campus belts, established midtown grids, and south/east growth corridors — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'downtown-capitol-district',
      name: 'Downtown Lincoln, Capitol District & Haymarket edges',
      shortName: 'Downtown / Capitol',
      neighborhoods: [
        'Downtown Lincoln',
        'Capitol District',
        'Haymarket edges',
        'Antelope Valley edges',
        'Civic / government corridors',
      ],
      housingTypes: 'Lofts, mid-rises, renovated multi-unit, denser walk-ups',
      challenges: [
        'Elevators, COI, and timed building windows',
        'Scarce curb staging and event-day congestion',
        'US-77 / O Street freeflow into core',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week morning freight windows. Photo curb options and elevator size before final pricing.',
      cityKeywords: [
        'lincoln',
        'downtown lincoln',
        'capitol',
        'haymarket',
        'o street',
      ],
    },
    {
      id: 'unl-campus-near-south',
      name: 'UNL campus, Near South & student multi-family belts',
      shortName: 'UNL / Near South',
      neighborhoods: [
        'University of Nebraska–Lincoln campus edges',
        'Near South',
        'Clinton edges',
        'Student multi-family corridors',
        'R Street / Holdrege approaches',
      ],
      housingTypes: 'Multi-family, student apartments, some established SFH',
      challenges: [
        'Semester lease-turn stacking and tight curb',
        'Stairs, long carries, and limited truck turnaround',
        'Campus event and game-day freeflow',
      ],
      moverTips:
        'Book around semester boundaries early. Survey stair width and staging length. Avoid game-day windows when flexible.',
      cityKeywords: [
        'unl',
        'university of nebraska',
        'near south',
        'clinton',
        'holdrege',
      ],
    },
    {
      id: 'south-east-lincoln-growth',
      name: 'South Lincoln, east growth & HOA belts',
      shortName: 'South / East Lincoln',
      neighborhoods: [
        'South Lincoln growth belts',
        'East Lincoln corridors',
        'HOA tract edges',
        'US-77 south approaches',
        'Pine Lake / Yankee Hill edges',
      ],
      housingTypes: 'Newer SFH, HOA tracts, some multi-family and townhome product',
      challenges: [
        'HOA gate lists and truck-length limits',
        'US-77 / I-80 congestion toward core',
        'Longer portal time on south–core pairs',
      ],
      moverTips:
        'Collect HOA packets early. Price south–core pairs portal-to-portal. Avoid peak US-77 windows when flexible.',
      cityKeywords: [
        'south lincoln',
        'east lincoln',
        'pine lake',
        'yankee hill',
        'us-77',
      ],
    },
    {
      id: 'north-west-lincoln-corridors',
      name: 'North Lincoln, west edges & I-80 approaches',
      shortName: 'North / West Lincoln',
      neighborhoods: [
        'North Lincoln',
        'West Lincoln edges',
        'I-80 corridor approaches',
        'Air Park edges',
        'Mixed industrial-residential belts',
      ],
      housingTypes: 'Mixed older SFH, multi-family, and corridor stock',
      challenges: [
        'I-80 peak freeflow into metro pairs',
        'Mix of older stair product and newer multi-unit',
        'Cross-zone empty miles into downtown and campus',
      ],
      moverTips:
        'Price I-80 and north–core pairs with freeflow buffers. Survey multi-family lease-turn timing. Clarify curb rules on older streets.',
      cityKeywords: [
        'north lincoln',
        'west lincoln',
        'i-80',
        'air park',
        'us-34',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Lancaster County moving costs',
    intro:
      'Core multi-unit friction, campus lease turns, neighborhood carries, and corridor portal time drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Downtown / Capitol elevator & curb friction',
        detail: 'Building packets and scarce staging dominate core jobs.',
      },
      {
        title: 'UNL semester lease-turn demand',
        detail: 'Calendar stacking spikes crew availability and rates near campus.',
      },
      {
        title: 'I-80 / US-77 / US-34 congestion',
        detail: 'Portal-to-portal spikes at peak and construction windows.',
      },
      {
        title: 'South–core empty miles and winter delays',
        detail: 'Map-short pairs still bill regional time; ice rewrites schedules.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,700+',
        note: 'Higher with elevators or campus peak weeks',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,350–$4,100+',
        note: 'Core and near-campus friction trends up',
      },
      {
        label: '3–4+ BR / HOA / cross-metro',
        value: '$2,500–$8,000+',
        note: 'Long carries and corridor pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$185+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Lancaster County',
    intro:
      'Summer family peaks, UNL semester turns, Capitol-area event windows, and Plains winter ice reshape Lincoln schedules.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear curb and reduce US-77 / O Street pain before peak.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book south Lincoln and midtown Saturdays early.',
      },
      {
        title: 'UNL move-in / move-out waves',
        detail: 'Campus multi-family elevators and curb fill first near semester starts.',
      },
      {
        title: 'Winter ice, wind & arterial risk',
        detail: 'Plan outdoor staging contingency and flexible start times December–March.',
      },
    ],
  },
  specialized: [
    {
      id: 'lincoln-lancaster-capital-university-grid',
      title: 'Lincoln capital & university-grid module',
      intro:
        'Lancaster NE estimates fail when Capitol building packets, UNL lease calendars, neighborhood stairs, or I-80/US-77 empty miles are ignored — and when crews treat this as Lancaster PA or an Omaha rename page.',
      bullets: [
        'Request downtown/Capitol building packets early.',
        'Plan around UNL semester move-in/move-out peaks.',
        'Photo stair access, basement entries, and curb staging on Near South jobs.',
        'Price I-80 / US-77 / US-34 pairs portal-to-portal.',
        'Verify Nebraska PSC Household Goods Mover License for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Lancaster County?',
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
              'Lincoln Public Schools and surrounding systems serve different addresses. Confirm zoning carefully — attendance areas can shift block by block.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools and Nebraska Department of Education data beat ranking screenshots. UNL and other higher-ed options shape adult education access.',
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
              'Bryan Health, CHI Health St. Elizabeth, and other campuses anchor capital-metro care. Confirm networks and specialist access.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from south, east, and north belts into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core multi-unit vs campus stock vs south growth SFH',
            detail:
              'Downtown lofts, near-UNL apartments, and south Lincoln HOA product price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'South and east new-build stock often prices differently from older midtown product or student multi-family.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown / Capitol lifestyle',
            detail: 'Walkable amenities with elevator, curb, and density tradeoffs.',
          },
          {
            title: 'UNL / Near South pattern',
            detail: 'Campus proximity with multi-family and lease-turn logistics.',
          },
          {
            title: 'South / east growth pattern',
            detail: 'More space, HOA rules, and different commute math to core jobs.',
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
              'State government, University of Nebraska–Lincoln, healthcare, insurance, professional services, and regional retail shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-80, US-77, and US-34 peaks are real. Test drive peak routes between your zone and work anchors.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Lincoln capital-metro identity',
            detail:
              'Lancaster is Nebraska’s capital and university metro — not Lancaster PA, and not an Omaha Missouri River rename.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, strong thunderstorms, and cold winters with ice and wind. Plan outdoor staging contingency year-round.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Lancaster County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Nebraska PSC Household Goods Mover License for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Lancaster County, Nebraska — official site',
        href: 'https://www.lancaster.ne.gov/',
        external: true,
      },
      {
        label: 'City of Lincoln — official site',
        href: 'https://www.lincoln.ne.gov/',
        external: true,
      },
      {
        label: 'Nebraska Department of Transportation — traffic',
        href: 'https://dot.nebraska.gov/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Prefer Capitol multi-unit and campus-calendar experience with honest I-80 / US-77 pricing. Verify Nebraska PSC Household Goods Mover License in-state and FMCSA interstate. This is Lancaster County NE (Lincoln) — not Lancaster PA or Omaha.',
  lastReviewed: '2026-07-24',
});
