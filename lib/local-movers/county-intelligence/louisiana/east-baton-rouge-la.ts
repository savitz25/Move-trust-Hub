import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeLaPack } from '@/lib/local-movers/county-intelligence/louisiana/la-shared';

export const eastBatonRougeParishLaIntelligence: CountyIntelligencePack = finalizeLaPack({
  countySlug: 'east-baton-rouge',
  hubTitle: 'East Baton Rouge Parish Moving Intelligence Hub',
  eyebrow: 'East Baton Rouge · capital core, LSU & I-10 / I-12 logistics',
  h1: 'Moving in East Baton Rouge Parish: Capital Core, LSU Access & Corridor Logistics',
  heroOpener:
    'East Baton Rouge Parish is Louisiana’s capital metro — not New Orleans historic product and not Acadiana Lafayette defaults. Downtown and mid-city elevators, LSU-adjacent multi-family lease turns, south Baton Rouge growth corridors, and industrial/port-adjacent edges do not share truck access or empty-mile risk. I-10, I-12, I-110, and US-61 define portal time across the parish. Humidity, summer storms, and flood-mapped pockets matter on raised and slab stock alike. A downtown condo, a University-area walk-up, and a south-parish HOA two-story are different jobs under one parish name. This hub is for East Baton Rouge (Baton Rouge) — not a renamed Orleans or Houston page.',
  heroCredibility:
    'LPSC household goods common carrier certificate for intrastate LA moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-10 · I-12 · I-110 · US-61',
  whatMakesDifferent: {
    title: 'What makes moving in East Baton Rouge Parish different',
    intro:
      'These are capital-metro realities — government core, LSU density, and I-10/I-12 timing — not New Orleans narrow-street defaults or Northshore product.',
    bullets: [
      {
        title: 'Capital core and mid-city product bring elevators and curb limits',
        detail:
          'Downtown towers, mid-rises, and multi-unit near government and medical corridors often need COI, freight windows, and reserved elevators. Treat building packets as survey inputs.',
      },
      {
        title: 'LSU and student multi-family reshape calendars',
        detail:
          'University-adjacent apartments and lease turns cluster demand around semester edges. Stair-heavy walk-ups and tight parking near campus rewrite labor hours versus south-parish HOA stock.',
      },
      {
        title: 'South and east growth corridors are not downtown clones',
        detail:
          'Perkins, Siegen, Highland, and eastern suburban edges flip to driveway SFH, townhomes, and HOA rules. Same parish label, different truck access and inventory profiles.',
      },
      {
        title: 'I-10 / I-12 / I-110 define portal-to-portal time',
        detail:
          'Cross-parish pairs look local on maps and regional at peak. Downtown ↔ south corridors, airport-edge logistics, and US-61 runs understate congestion if priced as straight-line miles.',
      },
      {
        title: 'Humidity, storms, and flood-mapped pockets affect staging',
        detail:
          'Summer heat and afternoon storms slow exterior carries. Some parcels sit in flood-aware elevation zones — note driveway slope, raised entries, and weather contingency on the survey.',
      },
      {
        title: 'Intrastate LPSC household goods certificate vs interstate FMCSA',
        detail:
          'Moves entirely within Louisiana by for-hire household goods carriers generally require a common carrier certificate from the Louisiana Public Service Commission (LPSC) under La. R.S. 45:164.E before engaging in household goods moving activities. Confirm the company is registered and in good standing, and that you receive a written estimate (or written waiver) matching the legal name on the paperwork before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
    ],
  },
  zonesHeading: 'East Baton Rouge Parish access zones',
  zonesIntro:
    'Plan by downtown/mid-city, LSU/university corridor, south growth belt, and north/east industrial edges — each has its own access and traffic profile.',
  zones: [
    {
      id: 'downtown-midcity',
      name: 'Downtown, mid-city & government / medical core',
      shortName: 'Downtown / mid-city',
      neighborhoods: [
        'Downtown Baton Rouge',
        'Beauregard Town',
        'Spanish Town edges',
        'Mid City',
        'Government Street corridor',
        'Medical corridor edges',
      ],
      housingTypes:
        'High-rises, mid-rises, renovated multi-unit, urban SFH and townhomes',
      challenges: [
        'Elevator/COI and loading constraints',
        'Scarce curb staging near government campuses',
        'Event and session-day congestion',
        'I-110 / I-10 approach timing',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week morning freight windows. Avoid major capitol-event peaks when flexible. Share dock photos and truck height limits.',
      cityKeywords: [
        'downtown baton rouge',
        'mid city',
        'beauregard town',
        'spanish town',
        'baton rouge',
      ],
    },
    {
      id: 'lsu-university',
      name: 'LSU, University area & student multi-family',
      shortName: 'LSU / University',
      neighborhoods: [
        'University area',
        'LSU edges',
        'College Town',
        'Southdowns edges',
        'Highland Road corridor',
        'Nicholson corridor edges',
      ],
      housingTypes:
        'Student multi-family, walk-ups, older SFH, mixed multi-unit and townhome product',
      challenges: [
        'Semester lease-turn peaks',
        'Stairs and tight parking near campus',
        'Highland / Nicholson congestion',
        'High turnover inventory profiles',
      ],
      moverTips:
        'Book early around move-in/move-out weeks. Survey stair width and parking carefully. Price portal-to-portal for university ↔ south-suburb pairs.',
      cityKeywords: [
        'lsu',
        'university',
        'college town',
        'southdowns',
        'highland',
        'nicholson',
      ],
    },
    {
      id: 'south-growth',
      name: 'South Baton Rouge growth: Perkins, Siegen & Bluebonnet edges',
      shortName: 'South growth',
      neighborhoods: [
        'Perkins Road corridor',
        'Siegen Lane corridor',
        'Bluebonnet edges',
        'Bocage edges',
        'Shenandoah edges',
        'South Baton Rouge suburbs',
      ],
      housingTypes: 'Suburban SFH, townhomes, HOA communities, multi-family along arterials',
      challenges: [
        'I-10 / I-12 portal time to core',
        'HOA gate lists and move-hour rules',
        'Long carries in large communities',
        'Peak arterial congestion',
      ],
      moverTips:
        'Collect HOA packets for gated or managed communities. Price south ↔ downtown pairs portal-to-portal. Mid-week mornings reduce corridor peaks.',
      cityKeywords: [
        'perkins',
        'siegen',
        'bluebonnet',
        'bocage',
        'shenandoah',
        'south baton rouge',
      ],
    },
    {
      id: 'north-east-industrial',
      name: 'North Baton Rouge, airport & industrial / US-61 edges',
      shortName: 'North / industrial',
      neighborhoods: [
        'North Baton Rouge',
        'Scotlandville edges',
        'Airport corridor',
        'US-61 corridors',
        'Industrial park edges',
        'Zachary-direction edges',
      ],
      housingTypes:
        'SFH, multi-family, industrial-adjacent stock, mixed older and rebuilt product',
      challenges: [
        'I-110 / US-61 congestion',
        'Industrial and truck traffic mix',
        'Longer portal time to south growth zones',
        'Flood-mapped pockets on some parcels',
      ],
      moverTips:
        'Price industrial-adjacent and airport pairs honestly. Note driveway and fence access. Confirm flood-elevation notes when staging outdoors.',
      cityKeywords: [
        'north baton rouge',
        'scotlandville',
        'airport',
        'zachary',
        'baker edges',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives East Baton Rouge Parish moving costs',
    intro:
      'Elevator friction, LSU lease peaks, HOA access, and I-10/I-12 portal time drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Downtown elevator & curb friction',
        detail: 'Core labor hours spike with COI and freight windows.',
      },
      {
        title: 'LSU multi-family stairs & lease-turn density',
        detail: 'Semester calendars compress crews and raise walk-up hours.',
      },
      {
        title: 'I-10 / I-12 / I-110 congestion',
        detail: 'Portal-to-portal spikes at peak across growth corridors.',
      },
      {
        title: 'HOA rules on south-parish stock',
        detail: 'Gate lists and restricted hours add coordination cost.',
      },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$400–$1,450+', note: 'Higher with elevators or stairs' },
      { label: '2–3BR condo or modest SFH', value: '$1,250–$3,800+', note: 'Core and LSU friction trends up' },
      { label: '3–4+ BR / tower / cross-corridor', value: '$2,400–$7,500+', note: 'Towers and long pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$105–$180+/hr', note: 'Portal-to-portal' },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in East Baton Rouge Parish',
    intro:
      'Summer family peaks, LSU semester turns, humidity and storms, and hurricane-season contingency reshape capital-metro windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear curb downtown and reduce I-10 / I-12 pain.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book suburban Saturdays early; heat slows open staging.',
      },
      {
        title: 'LSU move-in / move-out weeks',
        detail: 'University multi-family fills first — reserve early or shift off peak.',
      },
      {
        title: 'Hurricane season contingency (roughly June–November)',
        detail: 'Build weather buffers; confirm reschedule terms on written estimates.',
      },
    ],
  },
  specialized: [
    {
      id: 'ebr-capital-lsu-i10-i12',
      title: 'Capital core, LSU multi-family & I-10/I-12 module',
      intro:
        'East Baton Rouge estimates fail when building packets, semester calendars, HOA rules, or I-10/I-12 empty miles are ignored.',
      bullets: [
        'Request downtown/mid-city building packets (COI, elevator, freight windows) early.',
        'Plan around LSU lease-turn peaks; survey stair and parking access near campus.',
        'Collect HOA packets for south growth communities.',
        'Price I-10 / I-12 / I-110 / US-61 pairs portal-to-portal.',
        'Note humidity and storm staging contingency on summer jobs.',
        'Verify LPSC household goods common carrier certificate for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to East Baton Rouge Parish?',
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
              'East Baton Rouge Parish School System and nearby municipal or magnet options serve different addresses. Confirm zoning and application paths carefully.',
          },
          {
            title: 'Research sources',
            detail:
              'District tools and Louisiana Department of Education data beat ranking screenshots. LSU and other higher-ed campuses also shape neighborhood demand.',
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
              'Our Lady of the Lake, Baton Rouge General, Ochsner-affiliated campuses, and other systems serve parish corridors. Confirm networks.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from south growth edges and north corridors into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core multi-unit vs south SFH/HOA stock',
            detail:
              'Downtown and LSU-adjacent product differs sharply from Perkins/Siegen two-stories and planned communities.',
          },
          {
            title: 'Cost variation',
            detail:
              'Near-core renovated stock often prices differently from outer multi-family or flood-aware parcels. Survey access before assuming flat local rates.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown / mid-city lifestyle',
            detail: 'Urban amenities with elevator and curb tradeoffs.',
          },
          {
            title: 'LSU / University pattern',
            detail: 'Multi-family density and semester logistics.',
          },
          {
            title: 'South growth suburban pattern',
            detail: 'SFH/HOA product with longer portal time to core jobs.',
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
              'State government, healthcare, higher education (LSU), petrochemical and industrial corridors, and professional services shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-10, I-12, and I-110 peaks are real. Test drive peak routes between housing zones and major campuses.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Capital metro identity',
            detail:
              'East Baton Rouge is Baton Rouge capital product — not New Orleans historic core or Lafayette Acadiana defaults.',
          },
          {
            title: 'Climate & flood awareness',
            detail:
              'Hot humid summers, heavy rain, and hurricane season. Know parcel elevation and drainage; plan outdoor staging contingency.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful East Baton Rouge Parish resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify LPSC household goods common carrier registration for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'City of Baton Rouge / East Baton Rouge Parish — official site',
        href: 'https://www.brla.gov/',
        external: true,
      },
      {
        label: 'Louisiana DOTD traffic',
        href: 'https://wwwsp.dotd.la.gov/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Prefer capital-core elevator, LSU multi-family, and HOA experience with honest I-10/I-12 pricing. Verify LPSC HHG common carrier certificate in-state and FMCSA interstate.',
  lastReviewed: '2026-07-24',
});
