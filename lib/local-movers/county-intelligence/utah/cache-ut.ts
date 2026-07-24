import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeUtPack } from '@/lib/local-movers/county-intelligence/utah/ut-shared';

export const cacheCountyUtIntelligence: CountyIntelligencePack = finalizeUtPack({
  countySlug: 'cache',
  hubTitle: 'Cache County Moving Intelligence Hub',
  eyebrow: 'Cache · Logan/USU valley, canyon approaches & US-89/91 logistics',
  h1: 'Moving in Cache County: Logan–USU Valley, Canyon Approaches & US-89/91 Logistics',
  heroOpener:
    'Cache County is northern Utah\'s Cache Valley — not Salt Lake metro core and not St. George desert: Logan multi-unit and USU campus waves, North Logan and Hyde Park family corridors, US-89/91 portal time, and valley-floor logistics that are not Wasatch Front I-15 defaults or southern Utah heat product. A Logan walk-up, a USU-adjacent multi-family unit, a Smithfield two-story, and a Wellsville ranch do not share truck access or empty-mile risk. This hub is for Cache County (Logan–USU) — not a renamed Weber or Salt Lake page.',
  heroCredibility:
    'UDOT motor carrier credentials for intrastate UT moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'US-89/91 · US-30',
  whatMakesDifferent: {
    title: 'What makes moving in Cache County different',
    intro:
      'These are Cache Valley realities — USU multi-unit, valley arterials, and US-89/91 timing — not Salt Lake elevators or St. George desert defaults.',
    bullets: [
      {
        title: 'USU campus multi-unit waves rewrite calendars',
        detail:
          'Student-adjacent housing compresses move-in/out windows and raises month-end demand in Logan.',
      },
      {
        title: 'US-89/91 and US-30 define portal-to-portal time',
        detail:
          'Valley pairs look local on maps and regional at peak and in winter canyon weather.',
      },
      {
        title: 'Logan multi-unit is not north-valley SFH',
        detail:
          'Campus-edge stock differs sharply from Smithfield, Richmond, and Wellsville product.',
      },
      {
        title: 'Winter valley ice and canyon approaches reshape open carries',
        detail:
          'Inversion cold, ice, and limited canyon alternatives shrink staging options.',
      },
      {
        title: 'Not Salt Lake metro core or southern Utah desert product as the default',
        detail:
          'Survey each Cache address — valley density is not SLC elevators or St. George HOA growth defaults.',
      },
      {
        title: 'Intrastate UDOT motor carrier credentials vs interstate FMCSA',
        detail:
          'Moves entirely within Utah by for-hire motor carriers generally require appropriate UDOT Motor Carrier Division registration and insurance credentials. Match the legal name on the estimate to UDOT credentials before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
    ],
  },
  zonesHeading: 'Cache access zones',
  zonesIntro:
    'Plan by Logan/USU multi-unit, North Logan/Hyde Park, south valley (Hyrum/Wellsville), and north valley (Smithfield/Richmond) edges.',
  zones: [
    {
      id: 'logan-usu',
      name: 'Logan core, USU edges & multi-unit',
      shortName: 'Logan / USU',
      neighborhoods: [
        'Downtown Logan',
        'USU edges',
        'Island edges',
        'Canyon Road approaches',
      ],
      housingTypes: 'Multi-family, walk-ups, mid-rises, SFH',
      challenges: ['Stairs and tight curb', 'Campus calendar spikes', 'US-89/91 congestion'],
      moverTips:
        'Get building packets early. Prefer mid-week mornings away from semester move peaks when flexible.',
      cityKeywords: ['logan', 'usu', 'utah state'],
    },
    {
      id: 'north-logan-hyde',
      name: 'North Logan, Hyde Park & mid-valley suburbs',
      shortName: 'North Logan / Hyde Park',
      neighborhoods: ['North Logan', 'Hyde Park', 'River Heights edges', 'Providence edges'],
      housingTypes: 'SFH, multi-family, HOA pockets',
      challenges: ['HOA rules', 'Arterial congestion', 'Basement and stair access'],
      moverTips: 'Collect HOA packets. Survey stair width carefully.',
      cityKeywords: ['north logan', 'hyde park', 'providence'],
    },
    {
      id: 'south-valley',
      name: 'Hyrum, Wellsville, Nibley & south valley',
      shortName: 'South valley',
      neighborhoods: ['Hyrum', 'Wellsville', 'Nibley', 'Millville edges'],
      housingTypes: 'SFH, multi-family, rural-edge stock',
      challenges: ['US-89/91 links', 'Longer portal time to Logan core', 'Driveway access'],
      moverTips:
        'Price south valley pairs portal-to-portal. Photo driveway access when rural-edge.',
      cityKeywords: ['hyrum', 'wellsville', 'nibley'],
    },
    {
      id: 'north-valley',
      name: 'Smithfield, Richmond, Lewiston & north valley',
      shortName: 'North valley',
      neighborhoods: ['Smithfield', 'Richmond', 'Lewiston', 'Trenton edges'],
      housingTypes: 'SFH, multi-family, rural stock',
      challenges: ['US-91 congestion', 'Remote empty miles', 'Winter access'],
      moverTips: 'Confirm winter driveway contingency. Price northern pairs honestly.',
      cityKeywords: ['smithfield', 'richmond', 'lewiston'],
    },
  ],
  costDrivers: {
    title: 'What drives Cache County moving costs',
    intro:
      'Campus multi-unit friction, valley portal time, and winter access drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'USU multi-unit stair & curb friction', detail: 'Core labor hours spike.' },
      { title: 'US-89/91 / US-30 congestion', detail: 'Portal-to-portal spikes at peak.' },
      {
        title: 'Campus calendar premiums',
        detail: 'Move-in waves compress flexible windows.',
      },
      {
        title: 'North-south valley empty miles',
        detail: 'Smithfield-to-Hyrum pairs punish odometer optimism.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$400–$1,350+',
        note: 'Higher with multi-unit stairs',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,150–$3,400+',
        note: 'Campus friction trends up',
      },
      {
        label: '3–4+ BR / multi-unit / cross-valley',
        value: '$2,100–$6,500+',
        note: 'Long pairs and peak calendars highest',
      },
      { label: 'Typical 2-person crew rate', value: '$95–$165+/hr', note: 'Portal-to-portal' },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Cache County',
    intro:
      'Summer family peaks, USU move waves, and serious winter valley ice reshape Cache windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear curb and reduce US-89/91 pain.',
      },
      { title: 'Peak family season: late May–mid-August', detail: 'Book suburban Saturdays early.' },
      {
        title: 'University move-in / move-out waves',
        detail: 'Logan multi-unit fills first.',
      },
      {
        title: 'Winter ice and snow',
        detail: 'Confirm driveway contingency — Cache winters are serious.',
      },
    ],
  },
  specialized: [
    {
      id: 'cache-logan-usu-us89-91',
      title: 'Logan–USU valley, campus & US-89/91 module',
      intro:
        'Cache estimates fail when campus calendars, multi-unit access, or US-89/91 empty miles are ignored.',
      bullets: [
        'Request Logan/USU multi-unit building packets early.',
        'Photo curb and stair access for campus-edge jobs.',
        'Price US-89/91 and US-30 pairs portal-to-portal.',
        'Clarify Cache vs Box Elder or Idaho destinations on multi-county estimates.',
        'Verify UDOT motor carrier credentials for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Cache County?',
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
              'Cache and Logan school systems serve different addresses. Confirm zoning carefully.',
          },
          {
            title: 'Research sources',
            detail:
              'District tools and Utah State Board of Education data beat ranking screenshots. USU calendars affect housing demand.',
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
              'Intermountain Cache Valley / Logan Regional and other campuses serve county corridors. Confirm networks.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour and weather drive times from north and south valley edges into Logan campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Campus multi-unit vs north-valley SFH stock',
            detail:
              'Logan/USU product differs sharply from Smithfield and Wellsville two-stories.',
          },
          {
            title: 'Cost variation',
            detail:
              'Near-campus renovated stock often prices differently from rural multi-family.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Logan / USU lifestyle',
            detail: 'University amenities with multi-unit and curb tradeoffs.',
          },
          {
            title: 'Mid-valley suburban pattern',
            detail: 'North Logan/Hyde Park SFH with arterial logistics.',
          },
          {
            title: 'North/south valley pattern',
            detail: 'Smaller-town SFH with longer portal time to Logan jobs.',
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
              'Higher education, healthcare, manufacturing, agriculture-related, and logistics shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'US-89/91 peaks and winter canyon weather are real. Test drive peak routes the length of the valley.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Cache identity',
            detail:
              'Cache County is Logan–USU Cache Valley — not Salt Lake metro core or St. George desert product as the default.',
          },
          {
            title: 'Climate',
            detail:
              'Hot dry summers and cold, icy winters. Plan outdoor staging contingency.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Cache County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify UDOT motor carrier credentials for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Cache County — official site',
        href: 'https://www.cachecounty.gov/',
        external: true,
      },
      { label: 'UDOT traffic', href: 'https://www.udot.utah.gov/connect/', external: true },
    ],
  },
  directoryHint:
    'Prefer Logan multi-unit and campus-calendar experience with honest US-89/91 pricing. Verify UDOT credentials in-state and FMCSA interstate.',
  lastReviewed: '2026-07-24',
});
