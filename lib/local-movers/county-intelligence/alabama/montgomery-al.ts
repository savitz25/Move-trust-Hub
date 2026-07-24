import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeAlPack } from '@/lib/local-movers/county-intelligence/alabama/al-shared';

/**
 * Montgomery County, AL — state capital metro (not Montgomery County MD).
 */
export const montgomeryCountyAlIntelligence: CountyIntelligencePack = finalizeAlPack({
  countySlug: 'montgomery',
  hubTitle: 'Montgomery County Moving Intelligence Hub',
  eyebrow: 'Montgomery · capital AL · I-65 · I-85 · US-80 · US-231',
  h1: 'Moving in Montgomery County: Capital-City Access, Midtown Elevators & I-65 / I-85 Logistics',
  heroOpener:
    'Montgomery County, Alabama is the state capital metro — not the DC-suburb Montgomery market in Maryland, not a Birmingham clone, and not a generic central-Alabama template. Downtown and Cloverdale multi-unit, east Montgomery growth belts, Maxwell-Gunter and Prattville-edge pairs, and I-65 / I-85 / US-80 / US-231 freeflow rewrite “local” estimates. A downtown loft elevator job, a Cloverdale stair-heavy bungalow, an east Montgomery HOA two-story, and a Pike Road larger-lot approach do not share truck access or empty-mile risk. This hub is for people moving in Montgomery County, Alabama — capital-city realities, not a renamed Maryland page.',
  heroCredibility:
    'APSC Motor Carrier Services household goods authority for intrastate AL moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-65 · I-85 · US-80 · US-231',
  whatMakesDifferent: {
    title: 'What makes moving in Montgomery County different',
    intro:
      'These are capital-city Alabama realities — government calendars, midtown density, and I-65 / I-85 timing — not Maryland DC-suburb defaults or Birmingham hillside product alone. Alabama capital only.',
    bullets: [
      {
        title: 'Capital and military calendars reshape demand',
        detail:
          'State government cycles, Maxwell-Gunter transfer seasons, and multi-family lease turns cluster moves in ways generic Alabama calendars miss. Flexible mid-week windows often beat month-end peaks.',
      },
      {
        title: 'Downtown, Cloverdale, and midtown multi-unit rewrite labor hours',
        detail:
          'Elevators, COI packets, scarce curb, stairs, and historic stock dominate core jobs. A Cloverdale walk-up is not an east Montgomery garage-friendly two-story.',
      },
      {
        title: 'I-65, I-85, US-80, and US-231 define portal-to-portal time',
        detail:
          'East Montgomery ↔ downtown, Prattville-edge ↔ midtown, or Montgomery ↔ Auburn-edge pairs look local on maps and regional at peak. Price interstate and arterial buffers honestly.',
      },
      {
        title: 'Eastern growth and Pike Road differ from historic core product',
        detail:
          'HOA tracts, longer driveways, and newer multi-family waves use different curb rules than Cloverdale or downtown density. Survey each address — do not assume capital-city elevator defaults countywide.',
      },
      {
        title: 'Not Maryland’s Montgomery market or Birmingham as the default',
        detail:
          'This is Alabama’s capital Montgomery County. DC-suburb elevators in Maryland and Jefferson Over-the-Mountain grids are different markets with different corridors and crew skill.',
      },
      {
        title: 'Intrastate APSC household goods authority vs interstate FMCSA',
        detail:
          'Moves entirely within Alabama by for-hire household goods carriers generally require Alabama Public Service Commission (APSC) Motor Carrier Services authority under Title 37, Chapter 3 of the Code of Alabama. Match the legal name on the estimate to APSC authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
    ],
  },
  zonesHeading: 'Montgomery County access zones',
  zonesIntro:
    'Plan by downtown / Cloverdale midtown, east Montgomery growth, southern / US-231 corridors, and western / Prattville-edge belts — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'downtown-cloverdale',
      name: 'Downtown Montgomery, Cloverdale & historic midtown',
      shortName: 'Downtown / Cloverdale',
      neighborhoods: [
        'Downtown Montgomery',
        'Cloverdale',
        'Garden District edges',
        'Capitol heights edges',
        'Old Cloverdale edges',
      ],
      housingTypes: 'Historic SFH, multi-unit, lofts, denser walk-ups',
      challenges: [
        'Elevators, COI, and scarce curb staging',
        'Stairs, long carries, and tight approaches',
        'Capitol and event-day congestion',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week morning starts. Photo curb options and stair counts before final pricing.',
      cityKeywords: [
        'montgomery',
        'downtown montgomery',
        'cloverdale',
        'garden district montgomery',
        'old cloverdale',
      ],
    },
    {
      id: 'east-montgomery-pike-road',
      name: 'East Montgomery, Pike Road & eastern growth',
      shortName: 'East / Pike Road',
      neighborhoods: [
        'East Montgomery',
        'Pike Road',
        'Waugh edges',
        'US-80 / eastern corridors',
        'Taylor Road corridors',
      ],
      housingTypes: 'HOA SFH, townhomes, multi-family, larger-lot growth stock',
      challenges: [
        'HOA gate lists, COI, and truck-length limits',
        'US-80 / eastern arterial congestion',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Collect HOA packets first. Price east–core pairs portal-to-portal. Book peak Saturdays early during school-year transitions.',
      cityKeywords: [
        'east montgomery',
        'pike road',
        'waugh',
        'taylor road',
      ],
    },
    {
      id: 'south-us231',
      name: 'Southern corridors, US-231 & multi-family belts',
      shortName: 'South / US-231',
      neighborhoods: [
        'Southern Montgomery',
        'US-231 corridors',
        'McGehee / southern multi-family edges',
        'Hope Hull edges',
        'I-65 southern approaches',
      ],
      housingTypes: 'Multi-family, modest SFH, mixed older and newer stock',
      challenges: [
        'I-65 / US-231 congestion toward core',
        'Month-end multi-family lease turns',
        'Mixed curb rules and stair product',
      ],
      moverTips:
        'Clarify multi-family elevator and parking rules. Price south–core pairs portal-to-portal. Prefer early starts at month-end.',
      cityKeywords: [
        'montgomery al',
        'us 231 montgomery',
        'hope hull',
        'mcgehee',
      ],
    },
    {
      id: 'west-maxwell-prattville-edge',
      name: 'West Montgomery, Maxwell-Gunter edges & Prattville approaches',
      shortName: 'West / Maxwell',
      neighborhoods: [
        'West Montgomery',
        'Maxwell-Gunter edges',
        'Prattville approach corridors',
        'Millbrook edges',
        'I-65 western approaches',
      ],
      housingTypes: 'SFH, multi-family, military-adjacent and suburban stock',
      challenges: [
        'I-65 congestion and multi-county empty miles',
        'Military transfer calendar clustering',
        'Different access rules than east HOA growth',
      ],
      moverTips:
        'Clarify Autauga / Elmore destination lines on multi-county estimates. Price I-65 pairs honestly. Align flexible windows with transfer calendars when possible.',
      cityKeywords: [
        'maxwell',
        'gunter',
        'prattville',
        'millbrook',
        'west montgomery',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Montgomery County moving costs',
    intro:
      'Core multi-unit friction, eastern HOA packets, and I-65 / I-85 portal time drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Downtown / Cloverdale elevator & curb friction',
        detail: 'Building packets and scarce staging dominate core jobs.',
      },
      {
        title: 'I-65 / I-85 / US-80 / US-231 congestion',
        detail: 'Portal-to-portal spikes at peak and construction windows.',
      },
      {
        title: 'East Montgomery HOA packets & gate rules',
        detail: 'COI and truck limits add pre-move labor on growth tracts.',
      },
      {
        title: 'Military / government calendar clustering',
        detail: 'Transfer and session peaks compress flexible windows and crew availability.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$425–$1,450+',
        note: 'Higher with elevators or historic stairs',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,250–$3,800+',
        note: 'Core and HOA friction trends up',
      },
      {
        label: '3–4+ BR / growth tract / cross-metro',
        value: '$2,300–$7,500+',
        note: 'Long I-65 / I-85 pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$100–$175+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Montgomery County',
    intro:
      'Summer family peaks, military transfer seasons, multi-family lease turns, and humid storm afternoons reshape capital-city windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear curb and reduce I-65 / I-85 pain before peak.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book east Montgomery Saturdays early.',
      },
      {
        title: 'Military transfer & month-end multi-family turns',
        detail: 'Core elevators and popular growth tracts fill first.',
      },
      {
        title: 'Summer heat, humidity & afternoon storms',
        detail: 'Plan outdoor staging shade and weather contingency.',
      },
    ],
  },
  specialized: [
    {
      id: 'montgomery-capital-i65-i85-military',
      title: 'Montgomery capital & I-65 / I-85 military module',
      intro:
        'Montgomery AL estimates fail when core building packets, eastern HOA rules, or I-65/I-85 empty miles are ignored — and when crews treat this as Montgomery County MD.',
      bullets: [
        'Request downtown/Cloverdale building packets early.',
        'Collect east Montgomery and Pike Road HOA packets with the survey.',
        'Price I-65 / I-85 / US-80 / US-231 pairs portal-to-portal.',
        'Clarify Autauga / Elmore destinations on multi-county estimates.',
        'Verify APSC household goods authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Montgomery County?',
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
              'Montgomery Public Schools, Pike Road, and other municipal/county systems serve different addresses. Confirm zoning carefully — growth-edge lines shift with new tracts.',
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
              'Baptist Health, Jackson Hospital, and other campuses serve core and corridor care. Confirm networks and specialist access.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from east growth and western edges into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Historic midtown vs east HOA growth vs multi-family belts',
            detail:
              'Cloverdale bungalows, Pike Road two-stories, and southern multi-unit product price and access differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Eastern growth and renovated midtown stock often price differently from older multi-family corridors.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown / Cloverdale lifestyle',
            detail: 'Historic character and walkable amenities with curb and stair tradeoffs.',
          },
          {
            title: 'East Montgomery / Pike Road pattern',
            detail: 'HOA growth product with arterial commute math into core and I-85.',
          },
          {
            title: 'West / Maxwell-edge pattern',
            detail: 'Military-adjacent and multi-county options with I-65 portal time to core jobs.',
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
              'State government, Maxwell-Gunter and defense-adjacent work, healthcare, education, and professional services shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-65, I-85, US-80, and US-231 peaks are real. Test drive peak routes between your zone and capitol / base corridors.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Capital-city identity',
            detail:
              'Montgomery County AL is Alabama’s capital metro — not Montgomery County MD DC-suburb product and not Birmingham as the default.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, frequent afternoon storms, mild winters. Plan outdoor staging contingency.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Montgomery County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify APSC Motor Carrier Services intrastate authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Montgomery County, Alabama — official site',
        href: 'https://www.mc-ala.org/',
        external: true,
      },
      {
        label: 'City of Montgomery — official site',
        href: 'https://www.montgomeryal.gov/',
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
    'Prefer capital-city multi-unit and eastern HOA experience with honest I-65 / I-85 pricing. Verify APSC HHG authority in-state and FMCSA interstate. This is Montgomery County AL — not MD.',
  lastReviewed: '2026-07-24',
});
