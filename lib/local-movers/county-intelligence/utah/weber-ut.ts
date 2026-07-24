import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeUtPack } from '@/lib/local-movers/county-intelligence/utah/ut-shared';

export const weberCountyUtIntelligence: CountyIntelligencePack = finalizeUtPack({
  countySlug: 'weber',
  hubTitle: 'Weber County Moving Intelligence Hub',
  eyebrow: 'Weber · Ogden hub, canyon approaches & I-15 / I-84 logistics',
  h1: 'Moving in Weber County: Ogden Hub, Canyon Approaches & I-15 / I-84 Logistics',
  heroOpener:
    'Weber County is the Ogden Wasatch Front hub — not Salt Lake downtown elevators and not Davis suburban middle alone: Ogden multi-unit and historic stock, Roy and South Ogden family corridors, I-15 and I-84 portal time, and canyon approaches that are not Provo campus or St. George desert defaults. An Ogden walk-up, a Roy two-story, a North Ogden hillside driveway, and a West Haven multi-family unit do not share truck access or empty-mile risk. This hub is for Weber County (Ogden hub) — not a renamed Davis or Salt Lake page.',
  heroCredibility:
    'UDOT motor carrier credentials for intrastate UT moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-15 · I-84 · US-89',
  whatMakesDifferent: {
    title: 'What makes moving in Weber County different',
    intro:
      'These are Weber Ogden-hub realities — multi-unit stairs, canyon grades, and I-15/I-84 timing — not Salt Lake towers or Utah County Silicon Slopes defaults.',
    bullets: [
      {
        title: 'Ogden multi-unit and historic stairs rewrite labor hours',
        detail: 'Walk-ups, tight curb, and older building access dominate core jobs.',
      },
      {
        title: 'I-15, I-84, and US-89 define portal-to-portal time',
        detail:
          'Cross-metro pairs look local on maps and regional at peak into Davis and Box Elder approaches.',
      },
      {
        title: 'Canyon and hillside driveways change staging rules',
        detail:
          'North Ogden, South Ogden foothills, and canyon approaches stack steep grades and limited turnaround.',
      },
      {
        title: 'West Weber multi-unit is not foothill SFH',
        detail:
          'Roy, West Haven, and plain stock differs sharply from canyon-edge product.',
      },
      {
        title: 'Not Salt Lake downtown or Davis base-suburb product as the default',
        detail:
          'Survey each Weber address — Ogden hub density is not SLC elevators or Layton multi-family defaults.',
      },
      {
        title: 'Intrastate UDOT motor carrier credentials vs interstate FMCSA',
        detail:
          'Moves entirely within Utah by for-hire motor carriers generally require appropriate UDOT Motor Carrier Division registration and insurance credentials. Match the legal name on the estimate to UDOT credentials before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
    ],
  },
  zonesHeading: 'Weber access zones',
  zonesIntro:
    'Plan by Ogden core multi-unit, Roy/west multi-unit, North Ogden foothills, and South Ogden/Washington Terrace edges.',
  zones: [
    {
      id: 'ogden-core',
      name: 'Ogden core, downtown & historic multi-unit',
      shortName: 'Ogden core',
      neighborhoods: [
        'Downtown Ogden',
        'East Central',
        'Jefferson edges',
        'Canyon Road approaches',
      ],
      housingTypes: 'Multi-family, walk-ups, mid-rises, renovated stock',
      challenges: ['Stairs and tight curb', 'Scarce staging', 'I-15 / US-89 congestion'],
      moverTips: 'Get building packets early. Prefer mid-week morning windows.',
      cityKeywords: ['ogden', 'downtown ogden'],
    },
    {
      id: 'roy-west',
      name: 'Roy, West Haven & west multi-unit',
      shortName: 'Roy / west',
      neighborhoods: ['Roy', 'West Haven', 'Hooper edges', 'Marriott-Slaterville edges'],
      housingTypes: 'Multi-family, SFH, mid-rises',
      challenges: ['I-15 / I-84 congestion', 'Curb parking limits', 'Mixed access types'],
      moverTips: 'Confirm parking rules block by block. Price west pairs portal-to-portal.',
      cityKeywords: ['roy', 'west haven'],
    },
    {
      id: 'north-ogden-foothills',
      name: 'North Ogden, Pleasant View & foothill driveways',
      shortName: 'North Ogden / foothills',
      neighborhoods: ['North Ogden', 'Pleasant View', 'Harrisville edges', 'Farr West edges'],
      housingTypes: 'SFH, multi-family, hillside driveways',
      challenges: ['Steep driveways', 'Limited turnaround', 'Winter ice'],
      moverTips:
        'Photo driveway grade and turnaround. Prefer smaller trucks when approach is tight.',
      cityKeywords: ['north ogden', 'pleasant view', 'harrisville'],
    },
    {
      id: 'south-ogden',
      name: 'South Ogden, Washington Terrace & south edges',
      shortName: 'South Ogden',
      neighborhoods: [
        'South Ogden',
        'Washington Terrace',
        'Riverdale edges',
        'Uintah edges',
      ],
      housingTypes: 'SFH, multi-family, HOA pockets',
      challenges: ['I-84 / US-89 links', 'HOA rules', 'Longer portal time to core'],
      moverTips: 'Collect HOA packets. Price south pairs portal-to-portal.',
      cityKeywords: ['south ogden', 'washington terrace', 'riverdale'],
    },
  ],
  costDrivers: {
    title: 'What drives Weber County moving costs',
    intro:
      'Multi-unit stairs, foothill grades, and I-15/I-84 portal time drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'Ogden multi-unit stair & curb friction', detail: 'Core labor hours spike.' },
      { title: 'I-15 / I-84 / US-89 congestion', detail: 'Portal-to-portal spikes at peak.' },
      {
        title: 'Foothill driveway grades & long carries',
        detail: 'Hillside access raises crew time.',
      },
      {
        title: 'Cross-corridor empty miles',
        detail: 'West-to-foothill pairs punish odometer optimism.',
      },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$400–$1,400+', note: 'Higher with stairs' },
      { label: '2–3BR condo or modest SFH', value: '$1,200–$3,500+', note: 'Core friction trends up' },
      {
        label: '3–4+ BR / multi-unit / cross-corridor',
        value: '$2,200–$6,900+',
        note: 'Long pairs and foothill access highest',
      },
      { label: 'Typical 2-person crew rate', value: '$100–$170+/hr', note: 'Portal-to-portal' },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Weber County',
    intro:
      'Summer family peaks, multi-family lease turns, canyon recreation traffic, and winter ice reshape Weber windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear curb and reduce I-15/I-84 pain.',
      },
      { title: 'Peak family season: late May–mid-August', detail: 'Book suburban Saturdays early.' },
      { title: 'Month-end multi-family turns', detail: 'Ogden core fills first.' },
      { title: 'Winter ice and foothill snow', detail: 'Confirm driveway contingency.' },
    ],
  },
  specialized: [
    {
      id: 'weber-ogden-hub-i15-i84',
      title: 'Ogden hub, canyon approaches & I-15 / I-84 module',
      intro:
        'Weber estimates fail when multi-unit stairs, foothill driveway grades, or I-15/I-84 empty miles are ignored.',
      bullets: [
        'Request Ogden multi-unit building packets early.',
        'Photo curb, stair, and driveway grade for core and foothill jobs.',
        'Price I-15, I-84, and US-89 pairs portal-to-portal.',
        'Clarify Weber vs Davis or Box Elder destinations on multi-county estimates.',
        'Verify UDOT motor carrier credentials for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Weber County?',
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
              'Ogden, Weber, and other district systems serve different addresses. Confirm zoning carefully.',
          },
          {
            title: 'Research sources',
            detail:
              'District tools and Utah State Board of Education data beat ranking screenshots. Weber State University calendars affect housing demand.',
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
              'Intermountain McKay-Dee, Ogden Regional, and other campuses serve county corridors. Confirm networks.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from west and foothill edges into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Ogden multi-unit vs foothill SFH stock',
            detail:
              'Core product differs sharply from North Ogden hillsides and Roy multi-family.',
          },
          {
            title: 'Cost variation',
            detail:
              'Near-core renovated stock often prices differently from west plain multi-family.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Ogden core lifestyle',
            detail: 'Urban amenities with multi-unit and curb tradeoffs.',
          },
          {
            title: 'Foothill pattern',
            detail: 'Hillside SFH with driveway logistics.',
          },
          {
            title: 'West multi-unit pattern',
            detail: 'Roy/West Haven density with I-15/I-84 portal time.',
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
              'Healthcare, education, manufacturing, logistics, defense-adjacent, and professional services shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-15 and I-84 peaks are real. Test drive peak routes toward Davis and Box Elder.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Weber identity',
            detail:
              'Weber County is Ogden Wasatch hub — not Salt Lake downtown elevators or Utah County Silicon Slopes as the default.',
          },
          {
            title: 'Climate',
            detail:
              'Hot dry summers and winter ice/snow, especially foothills. Plan outdoor staging contingency.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Weber County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify UDOT motor carrier credentials for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Weber County — official site',
        href: 'https://www.webercountyutah.gov/',
        external: true,
      },
      { label: 'UDOT traffic', href: 'https://www.udot.utah.gov/connect/', external: true },
    ],
  },
  directoryHint:
    'Prefer Ogden multi-unit and foothill access experience with honest I-15/I-84 pricing. Verify UDOT credentials in-state and FMCSA interstate.',
  lastReviewed: '2026-07-24',
});
