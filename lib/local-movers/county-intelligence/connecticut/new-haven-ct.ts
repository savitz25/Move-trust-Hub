import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeCtPack } from '@/lib/local-movers/county-intelligence/connecticut/ct-shared';

export const newHavenCountyCtIntelligence: CountyIntelligencePack = finalizeCtPack({
  countySlug: 'new-haven',
  hubTitle: 'New Haven County Moving Intelligence Hub',
  eyebrow: 'New Haven · Yale university, shoreline multi-unit & I-95 / I-91 logistics',
  h1: 'Moving in New Haven County: Yale Corridor, Shoreline Access & I-95 / I-91 Logistics',
  heroOpener:
    'New Haven County is Connecticut\'s university and shoreline hub — not Fairfield Gold Coast defaults and not Hartford insurance towers: Yale-adjacent multi-unit elevators, East Rock and Westville neighborhood stock, I-95 and I-91 portal time, and coastal towns that are not NYC-metro estate or capital-region product. A downtown New Haven walk-up, a Yale-area freight elevator, a Milford two-story, and a Waterbury multi-family unit do not share truck access or empty-mile risk. This hub is for New Haven County (Yale–shoreline–Naugatuck Valley) — not a renamed Fairfield or Hartford page.',
  heroCredibility:
    'CTDOT household goods carrier certificate for intrastate CT moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-95 · I-91 · CT-15 · US-1',
  whatMakesDifferent: {
    title: 'What makes moving in New Haven County different',
    intro:
      'These are New Haven university and shoreline realities — elevators, neighborhood stairs, and I-95/I-91 timing — not Fairfield Gold Coast estate or Hartford capital defaults.',
    bullets: [
      {
        title: 'Yale-adjacent elevators and multi-unit stairs rewrite labor hours',
        detail:
          'Building packets, tight curb, and stair flights dominate downtown and campus-edge jobs.',
      },
      {
        title: 'I-95, I-91, and CT-15 define portal-to-portal time',
        detail: 'Shoreline and valley pairs look local on maps and regional at peak.',
      },
      {
        title: 'Shoreline vs Naugatuck Valley micro-markets differ',
        detail:
          'Milford/Branford coastal stock is not Waterbury multi-family or Hamden suburban product.',
      },
      {
        title: 'US-1 coastal approaches add curb and congestion friction',
        detail: 'Shoreline towns stack limited staging and peak arterial delays.',
      },
      {
        title: 'Not Fairfield NYC-metro or Hartford capital product as the default',
        detail:
          'Survey each New Haven address — university density is not Gold Coast estate or insurance-tower defaults.',
      },
      {
        title: 'Intrastate CTDOT HHG certificate vs interstate FMCSA',
        detail:
          'Moves entirely within Connecticut by for-hire household goods carriers generally require a Household Goods Carrier Certificate from the Connecticut Department of Transportation (CTDOT) Bureau of Public Transportation / Regulatory Compliance. Match the legal name on the estimate to CTDOT certificate status before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
    ],
  },
  zonesHeading: 'New Haven access zones',
  zonesIntro:
    'Plan by downtown/Yale elevators, Hamden/North Haven suburbs, shoreline towns, and Waterbury/Naugatuck Valley edges.',
  zones: [
    {
      id: 'downtown-yale',
      name: 'Downtown New Haven, Yale & East Rock multi-unit',
      shortName: 'Downtown / Yale',
      neighborhoods: ['Downtown New Haven', 'Yale edges', 'East Rock', 'Westville edges'],
      housingTypes: 'High-rises, mid-rises, walk-ups, renovated multi-unit',
      challenges: ['Elevators and COI', 'Scarce curb staging', 'Stairs and long carries'],
      moverTips:
        'Get building packets early. Prefer mid-week morning freight windows away from campus move-in peaks.',
      cityKeywords: ['new haven', 'yale', 'east rock'],
    },
    {
      id: 'hamden-north-haven',
      name: 'Hamden, North Haven & northern suburbs',
      shortName: 'Hamden / North Haven',
      neighborhoods: ['Hamden', 'North Haven', 'Cheshire edges', 'Wallingford edges'],
      housingTypes: 'SFH, multi-family, HOA pockets',
      challenges: ['I-91 congestion', 'HOA rules', 'Basement and stair access'],
      moverTips: 'Collect HOA packets. Price I-91 pairs portal-to-portal.',
      cityKeywords: ['hamden', 'north haven', 'wallingford'],
    },
    {
      id: 'shoreline',
      name: 'Milford, Branford, Guilford & shoreline corridor',
      shortName: 'Shoreline',
      neighborhoods: ['Milford', 'Branford', 'Guilford', 'Madison edges'],
      housingTypes: 'SFH, multi-family, coastal cottages',
      challenges: ['US-1 / I-95 congestion', 'Tight coastal curb', 'Seasonal tourism peaks'],
      moverTips:
        'Confirm driveway and street parking rules. Avoid peak shoreline weekends when flexible.',
      cityKeywords: ['milford', 'branford', 'guilford'],
    },
    {
      id: 'waterbury-valley',
      name: 'Waterbury, Naugatuck & valley multi-unit',
      shortName: 'Waterbury / valley',
      neighborhoods: ['Waterbury', 'Naugatuck', 'Ansonia edges', 'Derby edges'],
      housingTypes: 'Multi-family, older SFH, industrial-adjacent stock',
      challenges: ['CT-8 / CT-15 links', 'Older multi-unit stairs', 'Longer portal time to shore'],
      moverTips: 'Survey stair width carefully. Price valley-to-shore pairs honestly.',
      cityKeywords: ['waterbury', 'naugatuck', 'ansonia'],
    },
  ],
  costDrivers: {
    title: 'What drives New Haven County moving costs',
    intro:
      'Elevator friction, shoreline access, and I-95/I-91 portal time drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'Yale/downtown elevator & curb friction', detail: 'Core labor hours spike.' },
      { title: 'I-95 / I-91 / CT-15 congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'Walk-up stairs & long carries', detail: 'Older multi-unit raises labor hours.' },
      { title: 'Shore-to-valley empty miles', detail: 'Waterbury pairs punish odometer optimism.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$450–$1,550+', note: 'Higher with elevators' },
      { label: '2–3BR condo or modest SFH', value: '$1,350–$4,000+', note: 'Core friction trends up' },
      {
        label: '3–4+ BR / tower / cross-corridor',
        value: '$2,500–$7,900+',
        note: 'Towers and long pairs highest',
      },
      { label: 'Typical 2-person crew rate', value: '$105–$185+/hr', note: 'Portal-to-portal' },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in New Haven County',
    intro:
      'Summer family peaks, university move-in waves, shoreline tourism, and winter ice reshape New Haven windows.',
    items: [
      { title: 'Best windows: mid-week early mornings', detail: 'Clear curb and reduce I-95/I-91 pain.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book suburban Saturdays early.' },
      { title: 'University move-in / move-out waves', detail: 'Yale-adjacent elevators fill first.' },
      { title: 'Winter ice and snow', detail: 'Confirm driveway contingency.' },
    ],
  },
  specialized: [
    {
      id: 'new-haven-yale-shoreline-i95-i91',
      title: 'Yale corridor, shoreline & I-95 / I-91 module',
      intro:
        'New Haven estimates fail when building packets, campus calendars, or I-95/I-91 empty miles are ignored.',
      bullets: [
        'Request downtown/Yale building packets early.',
        'Photo curb and stair access for multi-unit and walk-up jobs.',
        'Price I-95, I-91, CT-15, and US-1 pairs portal-to-portal.',
        'Clarify New Haven vs Fairfield or Middlesex destinations on multi-county estimates.',
        'Verify CTDOT household goods carrier certificate for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to New Haven County?',
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
              'New Haven Public Schools and suburban municipal districts serve different addresses. Confirm zoning carefully.',
          },
          {
            title: 'Research sources',
            detail:
              'District tools and Connecticut State Department of Education data beat ranking screenshots. Yale and other higher-ed calendars affect housing demand.',
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
              'Yale New Haven Health, Griffin Hospital, Waterbury Hospital, and other campuses serve county corridors. Confirm networks.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from valley and shoreline edges into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core multi-unit vs shoreline SFH stock',
            detail: 'Downtown/Yale product differs sharply from Milford/Branford two-stories.',
          },
          {
            title: 'Cost variation',
            detail:
              'Near-campus renovated stock often prices differently from valley multi-family.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown / Yale lifestyle',
            detail: 'Walkable amenities with elevator and curb tradeoffs.',
          },
          {
            title: 'Shoreline pattern',
            detail: 'Coastal SFH/multi-unit with US-1 and I-95 logistics.',
          },
          {
            title: 'Valley pattern',
            detail: 'Waterbury multi-unit density with longer portal time to shore jobs.',
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
              'Higher education, healthcare, manufacturing, logistics, and professional services shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-95 and I-91 peaks are real. Test drive peak routes from shoreline and valley edges.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'New Haven identity',
            detail:
              'New Haven County is university and shoreline Connecticut — not Fairfield Gold Coast or Hartford capital product as the default.',
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
    title: 'Useful New Haven County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify CTDOT household goods carrier certificate for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'City of New Haven — official site', href: 'https://www.newhavenct.gov/', external: true },
      { label: 'CTDOT traffic & travel', href: 'https://portal.ct.gov/dot', external: true },
    ],
  },
  directoryHint:
    'Prefer Yale-corridor elevator and shoreline access experience with honest I-95/I-91 pricing. Verify CTDOT HHG certificate in-state and FMCSA interstate.',
  lastReviewed: '2026-07-24',
});
