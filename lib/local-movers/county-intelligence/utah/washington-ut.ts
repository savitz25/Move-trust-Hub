import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeUtPack } from '@/lib/local-movers/county-intelligence/utah/ut-shared';

export const washingtonCountyUtIntelligence: CountyIntelligencePack = finalizeUtPack({
  countySlug: 'washington',
  hubTitle: 'Washington County Moving Intelligence Hub',
  eyebrow: 'Washington · St. George southern UT desert & I-15 / UT-9 logistics',
  h1: 'Moving in Washington County: St. George Desert Metro, Red Cliffs Access & I-15 Logistics',
  heroOpener:
    'Washington County, Utah is the St. George southern desert metro — not Seattle, not King County, and not Washington State UTC product: St. George multi-unit and HOA growth, Hurricane and Washington City family corridors, Zion approaches via UT-9, I-15 portal time, and red-rock heat logistics that are not Puget Sound hills or Wasatch Front winter defaults. A St. George mid-rise, a SunRiver HOA two-story, a Hurricane ranch, and a Springdale tourism-edge cottage approach do not share truck access or empty-mile risk. This hub is for Washington County, UT (St. George) — never a renamed King County or Seattle page.',
  heroCredibility:
    'UDOT motor carrier credentials for intrastate UT moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-15 · UT-9 · UT-18',
  whatMakesDifferent: {
    title: 'What makes moving in Washington County different',
    intro:
      'These are St. George southern Utah realities — desert heat, HOA growth, and I-15/UT-9 timing — never Seattle hills, King County elevators, or Washington State UTC defaults.',
    bullets: [
      {
        title: 'Desert heat and sun exposure reshape open carries',
        detail:
          'Extreme summer temperatures demand early starts, hydration plans, and contingency for crew safety — not Pacific Northwest rain defaults.',
      },
      {
        title: 'I-15, UT-9, and UT-18 define portal-to-portal time',
        detail:
          'St. George to Hurricane or Zion-approach pairs look local on maps and regional at peak and in heat.',
      },
      {
        title: 'HOA growth product is not tourism-edge cottage access',
        detail:
          'SunRiver and master-planned gates differ from Springdale/La Verkin tight staging.',
      },
      {
        title: 'Retiree and snowbird calendars compress seasonal windows',
        detail:
          'Winter inbound waves and summer heat avoidance reshape demand differently from Wasatch Front lease turns.',
      },
      {
        title: 'Never Seattle / King County / WA UTC product as the default',
        detail:
          'Survey each Washington County UT address — St. George desert density is not Puget Sound hills, ferry timing, or Washington UTC household goods permit framing.',
      },
      {
        title: 'Intrastate UDOT motor carrier credentials vs interstate FMCSA',
        detail:
          'Moves entirely within Utah by for-hire motor carriers generally require appropriate UDOT Motor Carrier Division registration and insurance credentials. Match the legal name on the estimate to UDOT credentials before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
    ],
  },
  zonesHeading: 'Washington County UT access zones',
  zonesIntro:
    'Plan by St. George core, Washington City/Hurricane growth, Santa Clara/Ivins west edges, and Zion-approach/UT-9 towns.',
  zones: [
    {
      id: 'st-george-core',
      name: 'St. George core, multi-unit & HOA elevators',
      shortName: 'St. George core',
      neighborhoods: [
        'Downtown St. George',
        'Bloomington edges',
        'SunRiver edges',
        'Desert Hills edges',
      ],
      housingTypes: 'Multi-family, mid-rises, HOA SFH, renovated stock',
      challenges: ['Elevators and HOA packets', 'Summer heat staging', 'I-15 congestion'],
      moverTips:
        'Get building and HOA packets early. Prefer very early morning starts in summer heat.',
      cityKeywords: ['st george', 'bloomington', 'sunriver'],
    },
    {
      id: 'washington-hurricane',
      name: 'Washington City, Hurricane & east growth',
      shortName: 'Washington / Hurricane',
      neighborhoods: ['Washington City', 'Hurricane', 'Toquerville edges', 'La Verkin edges'],
      housingTypes: 'SFH, multi-family, HOA pockets',
      challenges: ['I-15 / UT-9 links', 'HOA gates', 'Longer portal time to core'],
      moverTips: 'Collect HOA packets. Price east growth pairs portal-to-portal.',
      cityKeywords: ['washington', 'hurricane', 'la verkin'],
    },
    {
      id: 'santa-clara-ivins',
      name: 'Santa Clara, Ivins & west desert edges',
      shortName: 'Santa Clara / Ivins',
      neighborhoods: ['Santa Clara', 'Ivins', 'Kayenta edges', 'Tuacahn approaches'],
      housingTypes: 'SFH, HOA pockets, desert-edge stock',
      challenges: ['HOA rules', 'Limited arterial options', 'Heat and long carries'],
      moverTips:
        'Confirm HOA access windows. Prefer early starts; photo driveway and curb access.',
      cityKeywords: ['santa clara', 'ivins'],
    },
    {
      id: 'zion-approaches',
      name: 'Springdale, Rockville & UT-9 Zion approaches',
      shortName: 'Zion approaches',
      neighborhoods: ['Springdale', 'Rockville', 'Virgin edges', 'Hildale edges'],
      housingTypes: 'Tourism-edge SFH, cottages, multi-family',
      challenges: ['UT-9 tourism peaks', 'Narrow staging', 'Long empty miles to core'],
      moverTips: 'Avoid peak tourism weekends when flexible. Price UT-9 pairs honestly.',
      cityKeywords: ['springdale', 'rockville', 'zion'],
    },
  ],
  costDrivers: {
    title: 'What drives Washington County moving costs',
    intro:
      'Heat contingency, HOA access, and I-15/UT-9 portal time drive quotes more than bedroom count alone — never Puget Sound hill defaults.',
    drivers: [
      {
        title: 'Summer heat staging premiums',
        detail: 'Early starts and crew safety add labor hours.',
      },
      { title: 'I-15 / UT-9 / UT-18 congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'HOA gates & multi-unit elevators', detail: 'Growth product raises access time.' },
      { title: 'Zion-approach empty miles', detail: 'UT-9 pairs punish odometer optimism.' },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$400–$1,400+',
        note: 'Higher with heat and HOA friction',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,200–$3,500+',
        note: 'Growth-corridor friction trends up',
      },
      {
        label: '3–4+ BR / multi-unit / cross-corridor',
        value: '$2,200–$6,900+',
        note: 'Long pairs and peak heat highest',
      },
      { label: 'Typical 2-person crew rate', value: '$100–$170+/hr', note: 'Portal-to-portal' },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Washington County',
    intro:
      'Extreme summer heat, snowbird winter waves, tourism peaks on UT-9, and mild winter logistics reshape St. George windows — not Seattle rain calendars.',
    items: [
      {
        title: 'Best windows: very early mornings, especially summer',
        detail: 'Beat heat and clear HOA curb.',
      },
      {
        title: 'Peak heat caution: June–September',
        detail: 'Build heat contingency into crew plans.',
      },
      {
        title: 'Snowbird and winter inbound waves',
        detail: 'Seasonal housing demand compresses flexible dates.',
      },
      { title: 'UT-9 tourism peaks', detail: 'Zion-approach staging fills on weekends.' },
    ],
  },
  specialized: [
    {
      id: 'washington-ut-st-george-i15-ut9',
      title: 'St. George desert metro, HOA growth & I-15 / UT-9 module',
      intro:
        'Washington County UT estimates fail when heat contingency, HOA packets, or I-15/UT-9 empty miles are ignored — and when Seattle/King County/WA UTC assumptions are applied.',
      bullets: [
        'Request St. George multi-unit and HOA packets early.',
        'Plan extreme-heat early starts and crew safety for summer jobs.',
        'Price I-15, UT-9, and UT-18 pairs portal-to-portal.',
        'Clarify Washington County UT vs Iron County or Arizona destinations on multi-county estimates.',
        'Verify UDOT motor carrier credentials for in-state-only jobs and FMCSA for interstate legs — never WA UTC framing.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Washington County, UT?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit. This is St. George southern Utah — never Seattle or King County, Washington.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Washington County School District serves most addresses; confirm zoning carefully.',
          },
          {
            title: 'Research sources',
            detail:
              'District tools and Utah State Board of Education data beat ranking screenshots. Utah Tech University calendars affect housing demand.',
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
              'Intermountain St. George Regional and other campuses serve county corridors. Confirm networks.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map drive times from Hurricane and west edges into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'St. George HOA growth vs tourism-edge stock',
            detail:
              'Master-planned product differs sharply from Springdale cottage approaches.',
          },
          {
            title: 'Cost variation',
            detail:
              'Core renovated and HOA stock often prices differently from outlying multi-family.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'St. George core lifestyle',
            detail: 'Desert metro amenities with HOA and heat tradeoffs.',
          },
          {
            title: 'Hurricane / Washington growth pattern',
            detail: 'Family HOA product with I-15/UT-9 logistics.',
          },
          {
            title: 'Zion-approach pattern',
            detail: 'Tourism-edge living with long portal time to core jobs.',
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
              'Healthcare, tourism, education, construction, logistics, and remote/hybrid work shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-15 peaks and heat are real. Test drive peak routes between St. George and Hurricane.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Washington County UT identity',
            detail:
              'Washington County is St. George southern Utah desert metro — never Seattle, King County, or Washington State product.',
          },
          {
            title: 'Climate',
            detail:
              'Extreme hot dry summers and mild winters. Plan heat-safe outdoor staging contingency.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Washington County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify UDOT motor carrier credentials for in-state moves and FMCSA for interstate legs. This is Utah Washington County (St. George), not Washington State.',
    items: [
      {
        label: 'Washington County, UT — official site',
        href: 'https://www.washco.utah.gov/',
        external: true,
      },
      { label: 'UDOT traffic', href: 'https://www.udot.utah.gov/connect/', external: true },
    ],
  },
  directoryHint:
    'Prefer St. George HOA and desert-heat experience with honest I-15/UT-9 pricing. Verify UDOT credentials in-state and FMCSA interstate. Never WA UTC / Seattle framing.',
  lastReviewed: '2026-07-24',
});
