import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeCtPack } from '@/lib/local-movers/county-intelligence/connecticut/ct-shared';

export const hartfordCountyCtIntelligence: CountyIntelligencePack = finalizeCtPack({
  countySlug: 'hartford',
  hubTitle: 'Hartford County Moving Intelligence Hub',
  eyebrow: 'Hartford · capital/insurance core & I-84 / I-91 logistics',
  h1: 'Moving in Hartford County: Capital Core, Insurance Corridor & I-84 / I-91 Logistics',
  heroOpener:
    'Hartford County is Connecticut\'s capital and insurance hub — not Fairfield NYC-metro product and not New Haven Yale stock: downtown and Asylum Hill elevators, West Hartford and Glastonbury family corridors, I-84 and I-91 portal time, and capital-region multi-unit that is not Gold Coast curb or shoreline defense defaults. A downtown Hartford condo, a West Hartford two-story, an East Hartford multi-family unit, and a Bristol ranch do not share truck access or empty-mile risk. This hub is for Hartford County (capital metro) — not a renamed Fairfield or Springfield clone page.',
  heroCredibility:
    'CTDOT household goods carrier certificate for intrastate CT moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-84 · I-91 · CT-2 · CT-9',
  whatMakesDifferent: {
    title: 'What makes moving in Hartford County different',
    intro:
      'These are Hartford capital-region realities — insurance-core elevators, suburban family product, and I-84/I-91 timing — not Fairfield Gold Coast or New London shoreline defaults.',
    bullets: [
      {
        title: 'Downtown and insurance-corridor elevators rewrite labor hours',
        detail:
          'Building packets and freight windows dominate Hartford core and multi-unit jobs near major campuses.',
      },
      {
        title: 'I-84 and I-91 define portal-to-portal time',
        detail:
          'Cross-metro pairs look local on maps and regional at peak through the capital interchange complex.',
      },
      {
        title: 'West-of-river vs east-of-river micro-markets differ',
        detail:
          'West Hartford/Farmington stock is not East Hartford/Manchester multi-family or Bristol industrial-edge product.',
      },
      {
        title: 'CT-2 and CT-9 feed suburban rings with arterial friction',
        detail: 'Glastonbury, New Britain, and shoreline-link pairs need honest portal pricing.',
      },
      {
        title: 'Not Fairfield NYC-metro or New Haven university product as the default',
        detail:
          'Survey each Hartford address — capital density is not Gold Coast estate or Yale multi-unit defaults.',
      },
      {
        title: 'Intrastate CTDOT HHG certificate vs interstate FMCSA',
        detail:
          'Moves entirely within Connecticut by for-hire household goods carriers generally require a Household Goods Carrier Certificate from the Connecticut Department of Transportation (CTDOT) Bureau of Public Transportation / Regulatory Compliance. Match the legal name on the estimate to CTDOT certificate status before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
    ],
  },
  zonesHeading: 'Hartford access zones',
  zonesIntro:
    'Plan by downtown/insurance core, West Hartford/Farmington, east-of-river multi-unit, and New Britain/Bristol edges.',
  zones: [
    {
      id: 'downtown-insurance',
      name: 'Downtown Hartford, Asylum Hill & insurance elevators',
      shortName: 'Downtown / insurance',
      neighborhoods: [
        'Downtown Hartford',
        'Asylum Hill',
        'Frog Hollow edges',
        'Sheldon-Charter Oak edges',
      ],
      housingTypes: 'High-rises, mid-rises, renovated multi-unit',
      challenges: ['Elevators and COI', 'Scarce curb staging', 'I-84 / I-91 congestion'],
      moverTips: 'Get building packets early. Prefer mid-week morning freight windows.',
      cityKeywords: ['hartford', 'downtown hartford', 'asylum hill'],
    },
    {
      id: 'west-hartford-farmington',
      name: 'West Hartford, Farmington & west-of-river suburbs',
      shortName: 'West Hartford / Farmington',
      neighborhoods: ['West Hartford', 'Farmington', 'Avon edges', 'Simsbury edges'],
      housingTypes: 'SFH, multi-family, HOA pockets',
      challenges: ['HOA rules', 'Arterial congestion', 'Stairs and basements'],
      moverTips: 'Collect HOA packets. Survey stair width and driveway geometry carefully.',
      cityKeywords: ['west hartford', 'farmington', 'avon'],
    },
    {
      id: 'east-river',
      name: 'East Hartford, Manchester & east-of-river multi-unit',
      shortName: 'East of river',
      neighborhoods: ['East Hartford', 'Manchester', 'South Windsor edges', 'Glastonbury edges'],
      housingTypes: 'Multi-family, SFH, mid-rises',
      challenges: ['I-84 / CT-2 congestion', 'Curb parking limits', 'Longer portal time to core'],
      moverTips: 'Price river-crossing pairs portal-to-portal. Confirm parking rules block by block.',
      cityKeywords: ['east hartford', 'manchester', 'glastonbury'],
    },
    {
      id: 'new-britain-bristol',
      name: 'New Britain, Bristol & southwest county edges',
      shortName: 'New Britain / Bristol',
      neighborhoods: ['New Britain', 'Bristol', 'Plainville edges', 'Berlin edges'],
      housingTypes: 'SFH, multi-family, industrial-adjacent stock',
      challenges: ['CT-9 / I-84 links', 'Mixed access types', 'Older multi-unit stairs'],
      moverTips: 'Survey stair and curb access carefully. Price CT-9 corridor pairs honestly.',
      cityKeywords: ['new britain', 'bristol', 'plainville'],
    },
  ],
  costDrivers: {
    title: 'What drives Hartford County moving costs',
    intro:
      'Elevator friction, river-crossing portal time, and suburban access drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'Downtown elevator & curb friction', detail: 'Core labor hours spike.' },
      { title: 'I-84 / I-91 / CT-2 congestion', detail: 'Portal-to-portal spikes at peak.' },
      {
        title: 'Older multi-unit stairs & long carries',
        detail: 'East-of-river and New Britain stock raises labor hours.',
      },
      { title: 'Cross-metro empty miles', detail: 'West-to-east river pairs punish odometer optimism.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$450–$1,500+', note: 'Higher with elevators' },
      { label: '2–3BR condo or modest SFH', value: '$1,350–$3,900+', note: 'Core friction trends up' },
      {
        label: '3–4+ BR / tower / cross-metro',
        value: '$2,500–$7,800+',
        note: 'Towers and long pairs highest',
      },
      { label: 'Typical 2-person crew rate', value: '$105–$180+/hr', note: 'Portal-to-portal' },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Hartford County',
    intro:
      'Summer family peaks, multi-family lease turns, capital event calendars, and winter ice reshape Hartford windows.',
    items: [
      { title: 'Best windows: mid-week early mornings', detail: 'Clear curb and reduce I-84/I-91 pain.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book suburban Saturdays early.' },
      { title: 'Month-end multi-family turns', detail: 'Downtown elevators fill first.' },
      { title: 'Winter ice and snow', detail: 'Confirm driveway contingency.' },
    ],
  },
  specialized: [
    {
      id: 'hartford-capital-insurance-i84-i91',
      title: 'Capital / insurance core & I-84 / I-91 module',
      intro:
        'Hartford estimates fail when building packets, river-crossing timing, or I-84/I-91 empty miles are ignored.',
      bullets: [
        'Request downtown/insurance-corridor building packets early.',
        'Photo curb and stair access for multi-unit jobs.',
        'Price I-84, I-91, CT-2, and CT-9 pairs portal-to-portal.',
        'Clarify Hartford vs Tolland or New Haven destinations on multi-county estimates.',
        'Verify CTDOT household goods carrier certificate for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Hartford County?',
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
              'Hartford Public Schools and suburban municipal districts serve different addresses. Confirm zoning carefully.',
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
              'Hartford HealthCare, Trinity Health Of New England, UConn Health, and other campuses serve county corridors. Confirm networks.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from ring edges into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core condo/multi-unit vs suburban SFH stock',
            detail:
              'Downtown product differs sharply from West Hartford and Farmington two-stories.',
          },
          {
            title: 'Cost variation',
            detail:
              'Near-core renovated stock often prices differently from east-of-river multi-family.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown / insurance lifestyle',
            detail: 'Walkable amenities with elevator and curb tradeoffs.',
          },
          {
            title: 'West-of-river suburban pattern',
            detail: 'SFH/HOA product with arterial logistics.',
          },
          {
            title: 'East-of-river pattern',
            detail: 'Multi-unit density with I-84/CT-2 portal time to core jobs.',
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
              'Insurance, government, healthcare, education, and logistics shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-84 and I-91 peaks are real. Test drive peak routes around the capital interchange complex.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Hartford identity',
            detail:
              'Hartford County is capital/insurance Connecticut — not Fairfield NYC-metro coast or New London defense shoreline as the default.',
          },
          {
            title: 'Climate',
            detail: 'Hot humid summers and winter ice/snow. Plan outdoor staging contingency.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Hartford County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify CTDOT household goods carrier certificate for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'City of Hartford — official site', href: 'https://www.hartfordct.gov/', external: true },
      { label: 'CTDOT traffic & travel', href: 'https://portal.ct.gov/dot', external: true },
    ],
  },
  directoryHint:
    'Prefer downtown elevator and capital-corridor access experience with honest I-84/I-91 pricing. Verify CTDOT HHG certificate in-state and FMCSA interstate.',
  lastReviewed: '2026-07-24',
});
