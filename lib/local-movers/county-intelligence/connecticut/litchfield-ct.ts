import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeCtPack } from '@/lib/local-movers/county-intelligence/connecticut/ct-shared';

export const litchfieldCountyCtIntelligence: CountyIntelligencePack = finalizeCtPack({
  countySlug: 'litchfield',
  hubTitle: 'Litchfield County Moving Intelligence Hub',
  eyebrow: 'Litchfield · NW hills, rural driveways & US-7 / CT-8 logistics',
  h1: 'Moving in Litchfield County: Northwest Hills, Rural Access & US-7 / CT-8 Logistics',
  heroOpener:
    'Litchfield County is Connecticut\'s northwest hills belt — not Fairfield Gold Coast elevators and not Hartford capital multi-unit: rural and semi-rural driveways, Torrington and Waterbury-edge stock, US-7 and CT-8 portal time, and hillside access that is not NYC-metro curb or shoreline defense defaults. A Litchfield village colonial, a Torrington multi-family unit, a New Milford two-story, and a remote gravel-drive property do not share truck access or empty-mile risk. This hub is for Litchfield County (northwest hills) — not a renamed Fairfield or Berkshires clone page.',
  heroCredibility:
    'CTDOT household goods carrier certificate for intrastate CT moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'US-7 · US-202 · CT-8 · CT-4',
  whatMakesDifferent: {
    title: 'What makes moving in Litchfield County different',
    intro:
      'These are Litchfield northwest-hills realities — rural driveways, hillside geometry, and US-7/CT-8 timing — not Fairfield elevators or Hartford capital defaults.',
    bullets: [
      {
        title: 'Hillside driveways and long carries rewrite labor hours',
        detail:
          'Gravel approaches, steep grades, and limited turnaround dominate many rural and village jobs.',
      },
      {
        title: 'US-7, US-202, CT-8, and CT-4 define portal-to-portal time',
        detail:
          'Cross-county pairs look local on maps and regional on two-lane hills at peak or in weather.',
      },
      {
        title: 'Village vs rural micro-markets are not interchangeable',
        detail:
          'Torrington multi-family differs sharply from Litchfield/Washington estate and remote SFH product.',
      },
      {
        title: 'Winter ice and narrow roads reshape open carries',
        detail:
          'Hill roads and unplowed private drives shrink staging options — plan contingency.',
      },
      {
        title: 'Not Fairfield NYC-metro or Hartford capital product as the default',
        detail:
          'Survey each Litchfield address — hill access is not Gold Coast elevator or insurance-tower defaults.',
      },
      {
        title: 'Intrastate CTDOT HHG certificate vs interstate FMCSA',
        detail:
          'Moves entirely within Connecticut by for-hire household goods carriers generally require a Household Goods Carrier Certificate from the Connecticut Department of Transportation (CTDOT) Bureau of Public Transportation / Regulatory Compliance. Match the legal name on the estimate to CTDOT certificate status before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
    ],
  },
  zonesHeading: 'Litchfield access zones',
  zonesIntro:
    'Plan by Torrington multi-unit, Litchfield/Washington hills villages, New Milford/US-7 corridor, and Winsted/north hills edges.',
  zones: [
    {
      id: 'torrington',
      name: 'Torrington multi-unit & city stock',
      shortName: 'Torrington',
      neighborhoods: ['Torrington', 'Burrville edges', 'Drakeville edges', 'Harwinton edges'],
      housingTypes: 'Multi-family, older SFH, mid-rises',
      challenges: ['Stairs and tight curb', 'CT-8 congestion', 'Mixed access types'],
      moverTips: 'Survey stair width carefully. Confirm parking rules block by block.',
      cityKeywords: ['torrington', 'harwinton'],
    },
    {
      id: 'litchfield-hills',
      name: 'Litchfield, Washington & hills villages',
      shortName: 'Litchfield hills',
      neighborhoods: ['Litchfield', 'Washington', 'Morris edges', 'Goshen edges'],
      housingTypes: 'Village SFH, estate edges, rural driveways',
      challenges: ['Steep driveways', 'Long carries', 'Limited truck turnaround'],
      moverTips:
        'Photo driveway grade and turnaround. Prefer smaller trucks when approach is tight.',
      cityKeywords: ['litchfield', 'washington', 'goshen'],
    },
    {
      id: 'new-milford-us7',
      name: 'New Milford, Brookfield edges & US-7 corridor',
      shortName: 'New Milford / US-7',
      neighborhoods: ['New Milford', 'Bridgewater edges', 'Roxbury edges', 'Sherman edges'],
      housingTypes: 'SFH, multi-family, HOA pockets',
      challenges: ['US-7 congestion', 'HOA rules', 'Longer portal time to hills villages'],
      moverTips: 'Collect HOA packets. Price US-7 pairs portal-to-portal.',
      cityKeywords: ['new milford', 'bridgewater'],
    },
    {
      id: 'winsted-north',
      name: 'Winsted, Winchester & northern hills edges',
      shortName: 'Winsted / north',
      neighborhoods: ['Winsted', 'Winchester', 'Barkhamsted edges', 'Colebrook edges'],
      housingTypes: 'SFH, multi-family, rural stock',
      challenges: ['CT-8 / CT-4 links', 'Winter access', 'Remote empty miles'],
      moverTips: 'Confirm winter driveway contingency. Price northern pairs honestly.',
      cityKeywords: ['winsted', 'winchester', 'barkhamsted'],
    },
  ],
  costDrivers: {
    title: 'What drives Litchfield County moving costs',
    intro:
      'Hillside access, long carries, and US-7/CT-8 portal time drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'Steep driveway & long-carry friction', detail: 'Rural labor hours spike.' },
      {
        title: 'US-7 / US-202 / CT-8 congestion and two-lane delays',
        detail: 'Portal-to-portal spikes at peak and in weather.',
      },
      { title: 'Older multi-unit stairs in Torrington', detail: 'City stock raises labor hours.' },
      { title: 'Remote empty miles', detail: 'North hills pairs punish odometer optimism.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$425–$1,400+', note: 'Higher with long carries' },
      { label: '2–3BR condo or modest SFH', value: '$1,250–$3,600+', note: 'Hill access trends up' },
      {
        label: '3–4+ BR / estate / remote pair',
        value: '$2,300–$7,000+',
        note: 'Long carries and remote pairs highest',
      },
      { label: 'Typical 2-person crew rate', value: '$100–$175+/hr', note: 'Portal-to-portal' },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Litchfield County',
    intro:
      'Summer family peaks, fall foliage tourism, and winter hill ice reshape Litchfield windows.',
    items: [
      { title: 'Best windows: mid-week early mornings', detail: 'Clear curb and reduce corridor pain.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book village Saturdays early.' },
      { title: 'Fall foliage tourism weeks', detail: 'US-7 and village staging compress.' },
      {
        title: 'Winter ice and snow on hills',
        detail: 'Confirm driveway contingency and plow status.',
      },
    ],
  },
  specialized: [
    {
      id: 'litchfield-nw-hills-us7-ct8',
      title: 'Northwest hills, rural access & US-7 / CT-8 module',
      intro:
        'Litchfield estimates fail when driveway geometry, winter contingency, or US-7/CT-8 empty miles are ignored.',
      bullets: [
        'Photo driveway grade, surface, and turnaround early.',
        'Survey stair and curb access for Torrington multi-unit jobs.',
        'Price US-7, US-202, CT-8, and CT-4 pairs portal-to-portal.',
        'Clarify Litchfield vs Hartford or Fairfield destinations on multi-county estimates.',
        'Verify CTDOT household goods carrier certificate for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Litchfield County?',
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
              'Regional and municipal school systems serve different Litchfield towns. Confirm zoning carefully by address.',
          },
          {
            title: 'Research sources',
            detail:
              'District tools and Connecticut State Department of Education data beat ranking screenshots.',
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
              'Charlotte Hungerford Hospital, New Milford Hospital, and campuses in neighboring counties serve residents. Confirm networks.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour and weather drive times from remote hills into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Village estate vs Torrington multi-unit stock',
            detail: 'Hills villages differ sharply from city multi-family and remote SFH.',
          },
          {
            title: 'Cost variation',
            detail:
              'Scenic and estate-adjacent stock often prices differently from industrial-edge multi-family.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Hills village lifestyle',
            detail: 'Quiet amenities with driveway and long-carry tradeoffs.',
          },
          {
            title: 'Torrington city pattern',
            detail: 'Multi-unit density with CT-8 logistics.',
          },
          {
            title: 'US-7 corridor pattern',
            detail: 'New Milford SFH/HOA product with corridor portal time.',
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
              'Healthcare, manufacturing, tourism, education, and reverse commute to larger metros shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'US-7 and CT-8 peaks and weather delays are real. Test drive peak routes to Waterbury, Danbury, and Hartford approaches.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Litchfield identity',
            detail:
              'Litchfield County is northwest hills Connecticut — not Fairfield Gold Coast or Hartford capital product as the default.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers and serious winter ice/snow on hills. Plan outdoor staging contingency.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Litchfield County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify CTDOT household goods carrier certificate for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Litchfield County — town / regional portals',
        href: 'https://portal.ct.gov/',
        external: true,
      },
      { label: 'CTDOT traffic & travel', href: 'https://portal.ct.gov/dot', external: true },
    ],
  },
  directoryHint:
    'Prefer hills driveway and rural access experience with honest US-7/CT-8 pricing. Verify CTDOT HHG certificate in-state and FMCSA interstate.',
  lastReviewed: '2026-07-24',
});
