import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeCtPack } from '@/lib/local-movers/county-intelligence/connecticut/ct-shared';

export const newLondonCountyCtIntelligence: CountyIntelligencePack = finalizeCtPack({
  countySlug: 'new-london',
  hubTitle: 'New London County Moving Intelligence Hub',
  eyebrow: 'New London · shoreline/defense Groton & I-95 / CT-2 logistics',
  h1: 'Moving in New London County: Shoreline Towns, Groton Defense & I-95 / CT-2 Logistics',
  heroOpener:
    'New London County is Connecticut\'s southeastern shoreline and defense corridor — not Fairfield NYC-metro product and not Hartford capital stock: Groton submarine and defense adjacency, New London and Norwich multi-unit, I-95 coastal portal time, and CT-2 inland links that are not Gold Coast elevators or insurance-tower defaults. A Groton multi-family PCS-style turn, a New London walk-up, a Mystic cottage approach, and a Norwich two-story do not share truck access or empty-mile risk. This hub is for New London County (shoreline–defense–Norwich) — not a renamed New Haven or Rhode Island clone page.',
  heroCredibility:
    'CTDOT household goods carrier certificate for intrastate CT moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-95 · CT-2 · CT-32 · US-1',
  whatMakesDifferent: {
    title: 'What makes moving in New London County different',
    intro:
      'These are New London shoreline and defense realities — coastal access, military-adjacent calendars, and I-95/CT-2 timing — not Fairfield Gold Coast or Hartford capital defaults.',
    bullets: [
      {
        title: 'Groton defense and multi-unit turns reshape calendars',
        detail:
          'Military-adjacent and contractor housing waves compress flexible windows and raise month-end demand.',
      },
      {
        title: 'I-95, CT-2, and CT-32 define portal-to-portal time',
        detail: 'Shoreline-to-Norwich pairs look local on maps and regional at peak.',
      },
      {
        title: 'Coastal cottage and marina-edge access is not inland SFH',
        detail:
          'Mystic, Stonington, and shoreline stock stack tight curb, driveway geometry, and seasonal tourism.',
      },
      {
        title: 'US-1 coastal approaches add congestion friction',
        detail: 'Summer tourism and limited staging rewrite open-carry plans.',
      },
      {
        title: 'Not Fairfield NYC-metro or Hartford capital product as the default',
        detail:
          'Survey each New London address — shoreline defense density is not Gold Coast estate or insurance-tower defaults.',
      },
      {
        title: 'Intrastate CTDOT HHG certificate vs interstate FMCSA',
        detail:
          'Moves entirely within Connecticut by for-hire household goods carriers generally require a Household Goods Carrier Certificate from the Connecticut Department of Transportation (CTDOT) Bureau of Public Transportation / Regulatory Compliance. Match the legal name on the estimate to CTDOT certificate status before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
    ],
  },
  zonesHeading: 'New London access zones',
  zonesIntro:
    'Plan by New London/Groton shoreline, Norwich/CT-2 inland, Mystic/Stonington coastal, and Colchester/CT-2 north edges.',
  zones: [
    {
      id: 'new-london-groton',
      name: 'New London, Groton & defense shoreline',
      shortName: 'New London / Groton',
      neighborhoods: ['New London', 'Groton', 'City of Groton edges', 'Waterford edges'],
      housingTypes: 'Multi-family, SFH, military-adjacent stock, mid-rises',
      challenges: ['I-95 congestion', 'Tight curb and stairs', 'Defense-calendar spikes'],
      moverTips:
        'Confirm access rules near base-adjacent corridors. Prefer mid-week mornings away from peak PCS weeks when flexible.',
      cityKeywords: ['new london', 'groton', 'waterford'],
    },
    {
      id: 'norwich-inland',
      name: 'Norwich, Montville & CT-2 / CT-32 inland',
      shortName: 'Norwich / inland',
      neighborhoods: ['Norwich', 'Montville', 'Preston edges', 'Lisbon edges'],
      housingTypes: 'SFH, multi-family, older stock',
      challenges: ['CT-2 / CT-32 congestion', 'Stairs and basements', 'Longer portal time to shore'],
      moverTips: 'Survey stair width carefully. Price shore-to-inland pairs portal-to-portal.',
      cityKeywords: ['norwich', 'montville'],
    },
    {
      id: 'mystic-stonington',
      name: 'Mystic, Stonington & tourism shoreline',
      shortName: 'Mystic / Stonington',
      neighborhoods: ['Mystic', 'Stonington', 'Pawcatuck edges', 'Noank edges'],
      housingTypes: 'Coastal SFH, cottages, multi-family',
      challenges: ['US-1 tourism peaks', 'Narrow streets', 'Limited staging'],
      moverTips:
        'Avoid peak tourism weekends when flexible. Confirm driveway and street parking rules.',
      cityKeywords: ['mystic', 'stonington', 'pawcatuck'],
    },
    {
      id: 'colchester-north',
      name: 'Colchester, East Lyme & northern county edges',
      shortName: 'Colchester / East Lyme',
      neighborhoods: ['Colchester', 'East Lyme', 'Salem edges', 'Bozrah edges'],
      housingTypes: 'SFH, multi-family, HOA pockets',
      challenges: ['CT-2 / I-95 links', 'HOA rules', 'Longer empty miles to core'],
      moverTips: 'Collect HOA packets. Price northern pairs honestly.',
      cityKeywords: ['colchester', 'east lyme'],
    },
  ],
  costDrivers: {
    title: 'What drives New London County moving costs',
    intro:
      'Coastal access, defense-calendar demand, and I-95/CT-2 portal time drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'Shoreline curb & cottage access friction', detail: 'Labor hours spike on tight streets.' },
      { title: 'I-95 / CT-2 / CT-32 congestion', detail: 'Portal-to-portal spikes at peak.' },
      {
        title: 'Defense-adjacent calendar premiums',
        detail: 'PCS-style waves compress flexible windows.',
      },
      { title: 'Shore-to-inland empty miles', detail: 'Norwich pairs punish odometer optimism.' },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$425–$1,450+',
        note: 'Higher with tight coastal access',
      },
      { label: '2–3BR condo or modest SFH', value: '$1,250–$3,700+', note: 'Coastal friction trends up' },
      {
        label: '3–4+ BR / multi-unit / cross-corridor',
        value: '$2,300–$7,200+',
        note: 'Long pairs and peak calendars highest',
      },
      { label: 'Typical 2-person crew rate', value: '$100–$175+/hr', note: 'Portal-to-portal' },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in New London County',
    intro:
      'Summer tourism, defense-adjacent turns, family peaks, and winter coastal ice reshape New London windows.',
    items: [
      { title: 'Best windows: mid-week early mornings', detail: 'Clear curb and reduce I-95/US-1 pain.' },
      {
        title: 'Peak family and tourism season: late May–mid-August',
        detail: 'Book shoreline Saturdays early.',
      },
      {
        title: 'Defense-adjacent and multi-family turns',
        detail: 'Groton/New London demand compresses first.',
      },
      { title: 'Winter ice and coastal wind', detail: 'Confirm driveway contingency.' },
    ],
  },
  specialized: [
    {
      id: 'new-london-groton-shoreline-i95-ct2',
      title: 'Groton defense, shoreline & I-95 / CT-2 module',
      intro:
        'New London estimates fail when coastal staging, defense calendars, or I-95/CT-2 empty miles are ignored.',
      bullets: [
        'Confirm access near Groton defense-adjacent corridors early.',
        'Photo curb and driveway access for coastal cottage and multi-unit jobs.',
        'Price I-95, CT-2, CT-32, and US-1 pairs portal-to-portal.',
        'Clarify New London vs Windham or Rhode Island destinations on multi-county estimates.',
        'Verify CTDOT household goods carrier certificate for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to New London County?',
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
              'Municipal school systems and regional arrangements serve different New London towns. Confirm zoning carefully by address.',
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
              'Yale New Haven Health Lawrence + Memorial, Backus Hospital, and other campuses serve county corridors. Confirm networks.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from inland edges into shoreline campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Shoreline multi-unit vs inland SFH stock',
            detail: 'New London/Groton product differs from Colchester and Norwich two-stories.',
          },
          {
            title: 'Cost variation',
            detail:
              'Coastal and tourism-adjacent stock often prices differently from inland multi-family.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'New London / Groton lifestyle',
            detail: 'Shoreline amenities with multi-unit and defense-adjacent tradeoffs.',
          },
          {
            title: 'Mystic / Stonington pattern',
            detail: 'Tourism shoreline with tight staging logistics.',
          },
          {
            title: 'Norwich / inland pattern',
            detail: 'SFH/multi-unit product with longer portal time to shore jobs.',
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
              'Defense/shipbuilding, healthcare, tourism, education, and logistics shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-95 and CT-2 peaks are real. Test drive peak routes between shoreline and inland hubs.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'New London identity',
            detail:
              'New London County is shoreline and defense Connecticut — not Fairfield NYC-metro coast or Hartford capital product as the default.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, coastal storms, and winter ice. Plan outdoor staging contingency.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful New London County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify CTDOT household goods carrier certificate for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'City of New London — official site', href: 'https://newlondonct.org/', external: true },
      { label: 'CTDOT traffic & travel', href: 'https://portal.ct.gov/dot', external: true },
    ],
  },
  directoryHint:
    'Prefer shoreline and defense-adjacent access experience with honest I-95/CT-2 pricing. Verify CTDOT HHG certificate in-state and FMCSA interstate.',
  lastReviewed: '2026-07-24',
});
