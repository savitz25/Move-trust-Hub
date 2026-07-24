import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeCtPack } from '@/lib/local-movers/county-intelligence/connecticut/ct-shared';

export const middlesexCountyCtIntelligence: CountyIntelligencePack = finalizeCtPack({
  countySlug: 'middlesex',
  hubTitle: 'Middlesex County Moving Intelligence Hub',
  eyebrow: 'Middlesex · Middletown CT River, shoreline approaches & CT-9 logistics',
  h1: 'Moving in Middlesex County: Middletown River Corridor, Shoreline Approaches & CT-9 Logistics',
  heroOpener:
    'Middlesex County, Connecticut is the lower Connecticut River and shoreline-approach belt — not Massachusetts Middlesex (Cambridge/Boston) and not Hartford capital towers: Middletown multi-unit and Wesleyan-adjacent stock, CT-9 corridor logistics, shoreline towns toward Old Saybrook, and river-crossing portal time that is not Gold Coast elevators or northwest hills rural defaults. A Middletown walk-up, a Cromwell two-story, a Clinton coastal cottage approach, and an East Haddam hillside driveway do not share truck access or empty-mile risk. This hub is for Middlesex County, CT (Middletown–river–shore approaches) — not a renamed Massachusetts Middlesex or New Haven page.',
  heroCredibility:
    'CTDOT household goods carrier certificate for intrastate CT moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'CT-9 · CT-66 · I-91 links · US-1 approaches',
  whatMakesDifferent: {
    title: 'What makes moving in Middlesex County different',
    intro:
      'These are Middlesex CT river and shoreline-approach realities — Middletown multi-unit, CT-9 timing, and coastal edges — not Massachusetts Middlesex product or Hartford capital defaults.',
    bullets: [
      {
        title: 'Middletown multi-unit and campus-edge access rewrite labor hours',
        detail:
          'Stairs, tight curb, and building packets dominate core jobs near Wesleyan and downtown stock.',
      },
      {
        title: 'CT-9, CT-66, and I-91 links define portal-to-portal time',
        detail:
          'River-corridor pairs look local on maps and regional at peak into Hartford and shoreline approaches.',
      },
      {
        title: 'River towns vs shoreline approaches are not interchangeable',
        detail:
          'Middletown/Cromwell product differs from Clinton/Westbrook coastal and East Haddam hillside stock.',
      },
      {
        title: 'US-1 approaches add seasonal shoreline friction',
        detail: 'Tourism peaks and limited coastal staging reshape open-carry plans.',
      },
      {
        title: 'Not Massachusetts Middlesex and not Hartford capital product as the default',
        detail:
          'Survey each Middlesex CT address — river density is not Cambridge/Boston multi-unit or insurance-tower defaults.',
      },
      {
        title: 'Intrastate CTDOT HHG certificate vs interstate FMCSA',
        detail:
          'Moves entirely within Connecticut by for-hire household goods carriers generally require a Household Goods Carrier Certificate from the Connecticut Department of Transportation (CTDOT) Bureau of Public Transportation / Regulatory Compliance. Match the legal name on the estimate to CTDOT certificate status before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
    ],
  },
  zonesHeading: 'Middlesex CT access zones',
  zonesIntro:
    'Plan by Middletown core, Cromwell/Portland river towns, shoreline approaches, and East Haddam/hills edges.',
  zones: [
    {
      id: 'middletown-core',
      name: 'Middletown core, Wesleyan edges & multi-unit',
      shortName: 'Middletown',
      neighborhoods: [
        'Downtown Middletown',
        'Wesleyan edges',
        'South Farms edges',
        'Westfield edges',
      ],
      housingTypes: 'Multi-family, walk-ups, SFH, mid-rises',
      challenges: ['Stairs and tight curb', 'CT-9 congestion', 'Campus calendar spikes'],
      moverTips:
        'Get building packets early. Prefer mid-week mornings away from campus move waves when flexible.',
      cityKeywords: ['middletown', 'wesleyan'],
    },
    {
      id: 'cromwell-portland',
      name: 'Cromwell, Portland & upper river towns',
      shortName: 'Cromwell / Portland',
      neighborhoods: ['Cromwell', 'Portland', 'Rocky Hill edges', 'Middlefield edges'],
      housingTypes: 'SFH, multi-family, HOA pockets',
      challenges: ['I-91 / CT-9 links', 'HOA rules', 'River-crossing portal time'],
      moverTips: 'Collect HOA packets. Price river-corridor pairs portal-to-portal.',
      cityKeywords: ['cromwell', 'portland', 'middlefield'],
    },
    {
      id: 'shore-approaches',
      name: 'Clinton, Westbrook, Old Saybrook approaches',
      shortName: 'Shore approaches',
      neighborhoods: ['Clinton', 'Westbrook', 'Old Saybrook edges', 'Killingworth edges'],
      housingTypes: 'Coastal SFH, cottages, multi-family',
      challenges: ['US-1 tourism peaks', 'Tight coastal curb', 'Seasonal congestion'],
      moverTips:
        'Avoid peak shoreline weekends when flexible. Confirm driveway and street parking rules.',
      cityKeywords: ['clinton', 'westbrook', 'old saybrook'],
    },
    {
      id: 'east-haddam-hills',
      name: 'East Haddam, Haddam & river hills edges',
      shortName: 'East Haddam / hills',
      neighborhoods: ['East Haddam', 'Haddam', 'Durham edges', 'Chester edges'],
      housingTypes: 'SFH, rural driveways, village stock',
      challenges: ['Steep driveways', 'Long carries', 'Longer empty miles to core'],
      moverTips: 'Photo driveway grade and turnaround. Price hills pairs honestly.',
      cityKeywords: ['east haddam', 'haddam', 'chester'],
    },
  ],
  costDrivers: {
    title: 'What drives Middlesex County moving costs',
    intro:
      'Multi-unit stairs, shoreline approaches, and CT-9 portal time drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'Middletown multi-unit stair & curb friction', detail: 'Core labor hours spike.' },
      { title: 'CT-9 / CT-66 / I-91 link congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'Coastal cottage access', detail: 'Shore approaches raise staging time.' },
      { title: 'River-to-hills empty miles', detail: 'East Haddam pairs punish odometer optimism.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$425–$1,450+', note: 'Higher with stairs' },
      { label: '2–3BR condo or modest SFH', value: '$1,250–$3,700+', note: 'Core friction trends up' },
      {
        label: '3–4+ BR / multi-unit / cross-corridor',
        value: '$2,300–$7,200+',
        note: 'Long pairs and coastal access highest',
      },
      { label: 'Typical 2-person crew rate', value: '$100–$175+/hr', note: 'Portal-to-portal' },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Middlesex County',
    intro:
      'Summer family peaks, campus calendars, shoreline tourism, and winter ice reshape Middlesex CT windows.',
    items: [
      { title: 'Best windows: mid-week early mornings', detail: 'Clear curb and reduce CT-9 pain.' },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book suburban and shore Saturdays early.',
      },
      {
        title: 'Campus and multi-family turns',
        detail: 'Middletown elevators and walk-ups fill first.',
      },
      {
        title: 'Winter ice and snow',
        detail: 'Confirm driveway contingency on hills and river towns.',
      },
    ],
  },
  specialized: [
    {
      id: 'middlesex-ct-middletown-river-ct9',
      title: 'Middletown river corridor, shore approaches & CT-9 module',
      intro:
        'Middlesex CT estimates fail when multi-unit access, shoreline staging, or CT-9 empty miles are ignored — and when MA Middlesex assumptions are applied.',
      bullets: [
        'Request Middletown building packets early.',
        'Photo curb, stair, and driveway access for multi-unit and coastal jobs.',
        'Price CT-9, CT-66, I-91 links, and US-1 approach pairs portal-to-portal.',
        'Clarify Middlesex CT vs New Haven, Hartford, or New London destinations on multi-county estimates.',
        'Verify CTDOT household goods carrier certificate for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Middlesex County, CT?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit. This is Connecticut Middlesex, not Massachusetts Middlesex.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Municipal and regional school systems serve different Middlesex CT towns. Confirm zoning carefully by address.',
          },
          {
            title: 'Research sources',
            detail:
              'District tools and Connecticut State Department of Education data beat ranking screenshots. Wesleyan and other higher-ed calendars affect housing demand.',
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
              'Middlesex Health and neighboring-system campuses serve county corridors. Confirm networks.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from shore approaches and hills into Middletown campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Middletown multi-unit vs shore SFH stock',
            detail:
              'Core product differs sharply from Clinton/Westbrook coastal and East Haddam hills stock.',
          },
          {
            title: 'Cost variation',
            detail:
              'River-adjacent renovated stock often prices differently from rural multi-family.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Middletown lifestyle',
            detail: 'River-city amenities with multi-unit and curb tradeoffs.',
          },
          {
            title: 'Shore approach pattern',
            detail: 'Coastal SFH/cottage product with US-1 logistics.',
          },
          {
            title: 'Hills / river pattern',
            detail: 'East Haddam SFH with longer portal time to core jobs.',
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
              'Healthcare, education, manufacturing, logistics, and reverse commute to Hartford/New Haven shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'CT-9 and I-91 peaks are real. Test drive peak routes toward Hartford and shoreline hubs.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Middlesex CT identity',
            detail:
              'Middlesex County CT is lower river and shore-approach Connecticut — not Massachusetts Middlesex Cambridge/Boston product and not Hartford capital towers as the default.',
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
    title: 'Useful Middlesex County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify CTDOT household goods carrier certificate for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'City of Middletown — official site',
        href: 'https://www.middletownct.gov/',
        external: true,
      },
      { label: 'CTDOT traffic & travel', href: 'https://portal.ct.gov/dot', external: true },
    ],
  },
  directoryHint:
    'Prefer Middletown multi-unit and CT-9 corridor experience with honest portal pricing. Verify CTDOT HHG certificate in-state and FMCSA interstate. This is CT Middlesex, not MA.',
  lastReviewed: '2026-07-24',
});
