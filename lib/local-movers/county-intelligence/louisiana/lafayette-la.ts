import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeLaPack } from '@/lib/local-movers/county-intelligence/louisiana/la-shared';

/**
 * Lafayette Parish, Louisiana — NOT Lafayette, Indiana (Tippecanoe County).
 * Acadiana hub: Lafayette city, UL area, I-10 / I-49 / US-90 corridors.
 */
export const lafayetteParishLaIntelligence: CountyIntelligencePack = finalizeLaPack({
  countySlug: 'lafayette',
  hubTitle: 'Lafayette Parish Moving Intelligence Hub',
  eyebrow: 'Lafayette Parish LA · Acadiana hub (not Lafayette IN) · I-10 / I-49 / US-90',
  h1: 'Moving in Lafayette Parish: Acadiana Hub Access, UL Corridors & Regional Logistics',
  heroOpener:
    'Lafayette Parish, Louisiana is the Acadiana hub — energy-services density, University of Louisiana at Lafayette multi-family, downtown and mid-city product, and south/east growth along I-10, I-49, and US-90. This page is Lafayette Parish LA only: it is not the same-name city in Indiana. Humidity, flood-mapped pockets, and hurricane-season contingency still apply inland from the coast. A downtown loft, a UL-area walk-up, and a south-parish HOA two-story do not share truck access or empty-mile risk. This hub is for Lafayette Parish, Louisiana — Acadiana realities, not a renamed Baton Rouge shell or a Midwest namesake page.',
  heroCredibility:
    'LPSC household goods common carrier certificate for intrastate LA moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-10 · I-49 · US-90',
  whatMakesDifferent: {
    title: 'What makes moving in Lafayette Parish different',
    intro:
      'These are Acadiana hub realities — energy and university demand, corridor growth, and humid storm-season logistics — not Lafayette Indiana defaults and not New Orleans historic product.',
    bullets: [
      {
        title: 'Disambiguate: Lafayette Parish LA ≠ same-name Midwest city',
        detail:
          'Search results and mover directories often collide on the name “Lafayette.” This hub covers Lafayette, Broussard, Youngsville, Carencro, Scott, and related Louisiana Acadiana communities only — not the Indiana namesake market.',
      },
      {
        title: 'UL Lafayette multi-family reshapes calendars',
        detail:
          'University-adjacent apartments and lease turns cluster demand around semester edges. Stair-heavy walk-ups and tight parking near campus rewrite labor hours versus south-parish HOA stock.',
      },
      {
        title: 'Downtown / mid-city vs south and east growth corridors',
        detail:
          'Core multi-unit and older street grids differ from Broussard, Youngsville, and Amb. Caffery / Verot School growth with driveway SFH and HOA rules. Same parish label, different access profiles.',
      },
      {
        title: 'I-10 / I-49 / US-90 define portal-to-portal time',
        detail:
          'Cross-parish Acadiana pairs and through-traffic on interstate corridors understate peak congestion if priced as straight-line miles. Price empty miles honestly.',
      },
      {
        title: 'Humidity, flood pockets, and hurricane-season contingency',
        detail:
          'Hot humid summers and heavy rain events slow outdoor staging. Some parcels sit in flood-aware zones — note elevation, drainage, and weather buffers on the survey.',
      },
      {
        title: 'Intrastate LPSC household goods certificate vs interstate FMCSA',
        detail:
          'Moves entirely within Louisiana by for-hire household goods carriers generally require a common carrier certificate from the Louisiana Public Service Commission (LPSC) under La. R.S. 45:164.E before engaging in household goods moving activities. Confirm the company is registered and in good standing, and that you receive a written estimate (or written waiver) matching the legal name on the paperwork before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
    ],
  },
  zonesHeading: 'Lafayette Parish access zones',
  zonesIntro:
    'Plan by downtown/mid-city, UL / university corridor, south growth (Youngsville/Broussard), and west/north edges — each has its own access profile. Lafayette Parish LA only.',
  zones: [
    {
      id: 'downtown-midcity',
      name: 'Downtown Lafayette, mid-city & oil-center edges',
      shortName: 'Downtown / mid-city',
      neighborhoods: [
        'Downtown Lafayette',
        'Freetown-Port Rico edges',
        'Sterling Grove edges',
        'Oil Center',
        'River Ranch edges',
        'Johnston Street corridor',
      ],
      housingTypes:
        'Mid-rises, multi-unit, renovated SFH, mixed commercial-adjacent and urban residential product',
      challenges: [
        'Elevator/COI where towers and mid-rises apply',
        'Scarce curb staging downtown',
        'Event and festival congestion',
        'I-10 / I-49 approach timing',
      ],
      moverTips:
        'Get building packets early when elevators apply. Prefer mid-week morning windows. Photo curb and alley access. Avoid major festival peaks when flexible.',
      cityKeywords: [
        'downtown lafayette',
        'oil center',
        'river ranch',
        'lafayette la',
        'lafayette louisiana',
      ],
    },
    {
      id: 'ul-university',
      name: 'UL Lafayette, university multi-family & adjacent neighborhoods',
      shortName: 'UL / University',
      neighborhoods: [
        'University area',
        'UL Lafayette edges',
        'College Town edges',
        'St. Mary Boulevard corridor',
        'Congress Street edges',
        'Student multi-family corridors',
      ],
      housingTypes:
        'Student multi-family, walk-ups, older SFH, mixed multi-unit and townhome product',
      challenges: [
        'Semester lease-turn peaks',
        'Stairs and tight parking near campus',
        'Arterial congestion on university approaches',
        'High turnover inventory profiles',
      ],
      moverTips:
        'Book early around move-in/move-out weeks. Survey stair width and parking carefully. Price portal-to-portal for university ↔ south-suburb pairs.',
      cityKeywords: [
        'ul lafayette',
        'university of louisiana',
        'college',
        'cajun field edges',
        'lafayette university',
      ],
    },
    {
      id: 'south-growth',
      name: 'South growth: Youngsville, Broussard & Verot / Ambassador edges',
      shortName: 'South growth',
      neighborhoods: [
        'Youngsville',
        'Broussard',
        'Verot School Road corridor',
        'Ambassador Caffery edges',
        'Milton edges',
        'South Lafayette suburbs',
      ],
      housingTypes: 'Suburban SFH, townhomes, HOA communities, multi-family along growth arterials',
      challenges: [
        'I-10 / US-90 portal time to core',
        'HOA gate lists and move-hour rules',
        'Long carries in large communities',
        'Peak arterial congestion on growth corridors',
      ],
      moverTips:
        'Collect HOA packets for gated or managed communities. Price south ↔ downtown pairs portal-to-portal. Mid-week mornings reduce corridor peaks.',
      cityKeywords: [
        'youngsville',
        'broussard',
        'verot',
        'ambassador caffery',
        'milton',
      ],
    },
    {
      id: 'west-north-edges',
      name: 'Scott, Carencro, Duson edges & I-10 / I-49 ring',
      shortName: 'West / north edges',
      neighborhoods: [
        'Scott',
        'Carencro',
        'Duson edges',
        'I-10 west corridors',
        'I-49 north corridors',
        'Ossun / Gloria Switch edges',
      ],
      housingTypes:
        'SFH, multi-family, HOA pockets, rural-edge acreage and industrial-adjacent stock',
      challenges: [
        'I-10 / I-49 congestion and through-traffic',
        'Longer empty miles to south growth zones',
        'Rural driveway and gate access',
        'Flood-mapped pockets on some parcels',
      ],
      moverTips:
        'Price interstate-adjacent pairs honestly. Survey long drives and gate codes. Note flood-elevation and humidity staging when relevant.',
      cityKeywords: [
        'scott',
        'carencro',
        'duson',
        'ossun',
        'lafayette parish',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Lafayette Parish moving costs',
    intro:
      'University lease peaks, HOA growth access, corridor congestion, and humidity staging drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'UL multi-family stairs & lease-turn density',
        detail: 'Semester calendars compress crews and raise walk-up hours.',
      },
      {
        title: 'Downtown curb & elevator friction',
        detail: 'Core multi-unit coordination adds labor and window constraints.',
      },
      {
        title: 'I-10 / I-49 / US-90 congestion',
        detail: 'Portal-to-portal spikes at peak across growth corridors.',
      },
      {
        title: 'HOA rules on south-parish stock',
        detail: 'Gate lists and restricted hours add coordination cost in Youngsville/Broussard edges.',
      },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$380–$1,350+', note: 'Higher with stairs or elevators' },
      { label: '2–3BR condo or modest SFH', value: '$1,150–$3,500+', note: 'UL and core friction trends up' },
      { label: '3–4+ BR / HOA / cross-corridor', value: '$2,200–$6,800+', note: 'Growth and long pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$100–$175+/hr', note: 'Portal-to-portal' },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Lafayette Parish',
    intro:
      'Summer family peaks, UL semester turns, humidity and storms, and hurricane-season contingency reshape Acadiana windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear downtown curb and reduce I-10 / I-49 pain.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book suburban Saturdays early; heat slows open staging.',
      },
      {
        title: 'UL move-in / move-out weeks',
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
      id: 'lafayette-la-acadiana-ul-i10-i49',
      title: 'Lafayette Parish LA Acadiana hub, UL & I-10/I-49 module',
      intro:
        'Lafayette Parish LA estimates fail when university calendars, HOA growth rules, corridor empty miles, or Lafayette IN name confusion are ignored.',
      bullets: [
        'Confirm this is Lafayette Parish, Louisiana — not Lafayette, Indiana.',
        'Plan around UL Lafayette lease-turn peaks; survey stair and parking access near campus.',
        'Request downtown building packets when elevators or COI apply.',
        'Collect HOA packets for Youngsville / Broussard growth communities.',
        'Price I-10 / I-49 / US-90 pairs portal-to-portal.',
        'Note humidity, flood elevation, and storm staging contingency on the survey when relevant.',
        'Verify LPSC household goods common carrier certificate for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Lafayette Parish?',
    intro:
      'Use this as a practical fit checklist for Lafayette Parish, Louisiana — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Lafayette Parish School System serves most addresses; private and parochial options are common. Confirm zoning carefully across city and growth-edge communities.',
          },
          {
            title: 'Research sources',
            detail:
              'District tools and Louisiana Department of Education data beat ranking screenshots. UL Lafayette also shapes neighborhood demand near campus.',
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
              'Ochsner Lafayette General, Our Lady of Lourdes, and other systems serve parish corridors. Confirm networks and campus locations.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Youngsville/Broussard edges and north corridors into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core multi-unit vs south HOA growth stock',
            detail:
              'Downtown and UL-adjacent product differs sharply from Youngsville/Broussard two-stories and planned communities. Flood insurance varies by parcel.',
          },
          {
            title: 'Cost variation',
            detail:
              'Near-core renovated stock often prices differently from outer multi-family or rural-edge acreage.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown / mid-city lifestyle',
            detail: 'Urban amenities with curb and multi-unit tradeoffs.',
          },
          {
            title: 'UL / University pattern',
            detail: 'Multi-family density and semester logistics.',
          },
          {
            title: 'South growth suburban pattern',
            detail: 'SFH/HOA product in Youngsville/Broussard edges with longer portal time to core jobs.',
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
              'Energy and oilfield services, healthcare, higher education (UL), logistics, and professional services shape Acadiana employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-10, I-49, and US-90 peaks are real. Test drive peak routes between growth edges and major campuses.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Acadiana hub identity',
            detail:
              'Lafayette Parish LA is the Acadiana regional center — not New Orleans, not Baton Rouge capital product, and not Lafayette, Indiana.',
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
    title: 'Useful Lafayette Parish resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify LPSC household goods common carrier registration for in-state moves and FMCSA for interstate legs before deposits. Lafayette Parish, Louisiana only.',
    items: [
      {
        label: 'Lafayette Consolidated Government — official site',
        href: 'https://www.lafayettela.gov/',
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
    'Prefer Acadiana hub, UL multi-family, and HOA growth experience with honest I-10/I-49 pricing. Confirm Lafayette Parish LA (not Lafayette IN). Verify LPSC HHG common carrier certificate in-state and FMCSA interstate.',
  lastReviewed: '2026-07-24',
});
