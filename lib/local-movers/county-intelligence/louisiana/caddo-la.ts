import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeLaPack } from '@/lib/local-movers/county-intelligence/louisiana/la-shared';

export const caddoParishLaIntelligence: CountyIntelligencePack = finalizeLaPack({
  countySlug: 'caddo',
  hubTitle: 'Caddo Parish Moving Intelligence Hub',
  eyebrow: 'Caddo · Shreveport neighborhoods, I-20 / I-49 & Ark-La-Tex logistics',
  h1: 'Moving in Caddo Parish: Shreveport Neighborhoods, I-20 / I-49 Access & Regional Logistics',
  heroOpener:
    'Caddo Parish is Shreveport metro core for northwest Louisiana — not New Orleans product and not Baton Rouge capital defaults. Downtown and midtown elevators, older Highland and South Highlands stock, south and east suburban growth, and industrial/port-adjacent edges along the Red River do not share truck access. I-20, I-49, and US-71 define portal time across the Ark-La-Tex; interstate pairs into Texas or Arkansas need FMCSA, not LPSC alone. Humidity and summer storms still matter inland. A downtown condo, a Highland two-story, and a southern HOA home are different jobs under one parish name. This hub is for Caddo Parish (Shreveport) — not a renamed Dallas or Houston page.',
  heroCredibility:
    'LPSC household goods common carrier certificate for intrastate LA moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-20 · I-49 · US-71',
  whatMakesDifferent: {
    title: 'What makes moving in Caddo Parish different',
    intro:
      'These are Shreveport / Ark-La-Tex realities — urban core access, suburban growth, and interstate portal time — not South Louisiana historic or coastal defaults.',
    bullets: [
      {
        title: 'Shreveport core and suburbs are different jobs under one parish label',
        detail:
          'Downtown towers, midtown multi-unit, Highland older SFH, and southern growth HOAs do not share curb rules, stairs, or inventory profiles. Name both origin and destination zones on every estimate.',
      },
      {
        title: 'I-20 / I-49 / US-71 define portal-to-portal time',
        detail:
          'Cross-metro and Ark-La-Tex pairs look local on maps and regional at peak. Price interstate-adjacent empty miles honestly; do not treat Bossier-edge or Texas-bound legs as in-town hops.',
      },
      {
        title: 'Interstate legs leave Louisiana LPSC-only coverage',
        detail:
          'Shreveport households often move across the Texas or Arkansas line. Any out-of-state leg needs FMCSA authority; LPSC household goods certificates cover intrastate Louisiana work.',
      },
      {
        title: 'Older urban stock vs southern HOA growth',
        detail:
          'Highland stairs, narrow lots, and midtown elevators rewrite labor hours versus Youree, Ellerbe, and southern planned communities with driveway staging.',
      },
      {
        title: 'Humidity, storms, and industrial-edge staging',
        detail:
          'Summer heat and thunderstorms slow open carries. Port and industrial corridors add truck traffic mix that pure residential cul-de-sacs never see.',
      },
      {
        title: 'Intrastate LPSC household goods certificate vs interstate FMCSA',
        detail:
          'Moves entirely within Louisiana by for-hire household goods carriers generally require a common carrier certificate from the Louisiana Public Service Commission (LPSC) under La. R.S. 45:164.E before engaging in household goods moving activities. Confirm the company is registered and in good standing, and that you receive a written estimate (or written waiver) matching the legal name on the paperwork before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
    ],
  },
  zonesHeading: 'Caddo Parish access zones',
  zonesIntro:
    'Plan by downtown/midtown, Highland/south-central neighborhoods, southern growth corridors, and north/west industrial edges — each has its own access profile.',
  zones: [
    {
      id: 'downtown-midtown',
      name: 'Downtown Shreveport, midtown & riverfront edges',
      shortName: 'Downtown / midtown',
      neighborhoods: [
        'Downtown Shreveport',
        'Midtown',
        'Riverfront edges',
        'Ledbetter Heights edges',
        'Civic / medical corridor edges',
        'Texas Street approaches',
      ],
      housingTypes:
        'High-rises, mid-rises, renovated multi-unit, loft and redevelopment product',
      challenges: [
        'Elevator/COI and loading constraints',
        'Scarce curb staging',
        'Event and casino-corridor congestion',
        'I-20 approach timing',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week morning freight windows. Share dock photos and truck height limits. Avoid major event peaks when flexible.',
      cityKeywords: [
        'downtown shreveport',
        'midtown',
        'shreveport',
        'riverfront',
        'caddo',
      ],
    },
    {
      id: 'highland-southcentral',
      name: 'Highland, South Highlands & Broadmoor edges',
      shortName: 'Highland / south-central',
      neighborhoods: [
        'Highland',
        'South Highlands',
        'Broadmoor',
        'Anderson Island edges',
        'Cedar Grove edges',
        'Queensborough edges',
      ],
      housingTypes:
        'Older SFH, multi-story homes, multi-family, mixed renovated and classic stock',
      challenges: [
        'Stairs, basements, and narrow lots',
        'Tree-lined streets with limited staging',
        'Arterial congestion on Youree / Line / Kings approaches',
        'Mixed inventory values and careful-handling norms',
      ],
      moverTips:
        'Survey stair width and driveway clearance carefully. Photo curb access. Prefer early starts near school corridors.',
      cityKeywords: [
        'highland',
        'south highlands',
        'broadmoor',
        'cedar grove',
        'shreveport neighborhoods',
      ],
    },
    {
      id: 'south-growth',
      name: 'Southern growth: Youree, Ellerbe, Provence & HOA edges',
      shortName: 'South growth',
      neighborhoods: [
        'Youree Drive corridor',
        'Ellerbe Road corridor',
        'Provence edges',
        'Southern Hills edges',
        'Forbing edges',
        'South Shreveport suburbs',
      ],
      housingTypes: 'Suburban SFH, townhomes, HOA communities, multi-family along arterials',
      challenges: [
        'I-49 / arterial portal time to core',
        'HOA gate lists and move-hour rules',
        'Long carries in large communities',
        'Peak Youree / Ellerbe congestion',
      ],
      moverTips:
        'Collect HOA packets for gated or managed communities. Price south ↔ downtown pairs portal-to-portal. Mid-week mornings reduce corridor peaks.',
      cityKeywords: [
        'youree',
        'ellerbe',
        'provence',
        'southern hills',
        'forbing',
        'south shreveport',
      ],
    },
    {
      id: 'north-west-industrial',
      name: 'North Shreveport, Blanchard edges & I-20 / industrial corridors',
      shortName: 'North / industrial',
      neighborhoods: [
        'North Shreveport',
        'Blanchard edges',
        'Oil City-direction edges',
        'I-20 west corridors',
        'Industrial park edges',
        'Vivian-direction edges',
      ],
      housingTypes:
        'SFH, multi-family, industrial-adjacent stock, rural-edge acreage pockets',
      challenges: [
        'I-20 congestion and truck traffic mix',
        'Longer empty miles to south growth zones',
        'Rural driveway and gate access',
        'Cross-state pairs toward Texas',
      ],
      moverTips:
        'Price industrial-adjacent and I-20 pairs honestly. Confirm FMCSA when any leg leaves Louisiana. Survey long drives and gate codes on rural-edge jobs.',
      cityKeywords: [
        'north shreveport',
        'blanchard',
        'oil city',
        'vivian',
        'i-20',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Caddo Parish moving costs',
    intro:
      'Elevator friction, older-neighborhood stairs, HOA access, and I-20/I-49 portal time drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Downtown elevator & curb friction',
        detail: 'Core labor hours spike with COI and freight windows.',
      },
      {
        title: 'Highland stairs & narrow-lot carries',
        detail: 'Older urban SFH raises crew time beyond bedroom count.',
      },
      {
        title: 'I-20 / I-49 / US-71 congestion',
        detail: 'Portal-to-portal spikes at peak; Ark-La-Tex pairs understate map miles.',
      },
      {
        title: 'HOA rules on southern growth stock',
        detail: 'Gate lists and restricted hours add coordination cost.',
      },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$380–$1,350+', note: 'Higher with elevators or stairs' },
      { label: '2–3BR condo or modest SFH', value: '$1,150–$3,500+', note: 'Core friction trends up' },
      { label: '3–4+ BR / tower / cross-metro', value: '$2,200–$7,000+', note: 'Towers and interstate pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$100–$175+/hr', note: 'Portal-to-portal' },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Caddo Parish',
    intro:
      'Summer family peaks, multi-family lease turns, humidity and storms, and winter cold snaps reshape Shreveport windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear downtown curb and reduce I-20 / I-49 pain.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book suburban Saturdays early; heat slows open staging.',
      },
      {
        title: 'Month-end multi-family turns',
        detail: 'Downtown elevators and midtown multi-unit fill first.',
      },
      {
        title: 'Summer storms and winter freezes',
        detail: 'Confirm outdoor staging contingency and driveway ice/freeze plans when relevant.',
      },
    ],
  },
  specialized: [
    {
      id: 'caddo-shreveport-i20-i49-arklatex',
      title: 'Shreveport neighborhoods, I-20/I-49 & Ark-La-Tex module',
      intro:
        'Caddo estimates fail when building packets, Highland access, HOA rules, or interstate empty miles are ignored.',
      bullets: [
        'Request downtown/midtown building packets (COI, elevator, freight windows) early.',
        'Photo stair and curb access for Highland / South Highlands jobs.',
        'Collect HOA packets for southern growth communities.',
        'Price I-20 / I-49 / US-71 pairs portal-to-portal.',
        'Clarify Louisiana-only vs Texas/Arkansas destinations — FMCSA required for any out-of-state leg.',
        'Verify LPSC household goods common carrier certificate for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Caddo Parish?',
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
              'Caddo Parish Public Schools and magnet/optional programs serve different addresses. Confirm zoning carefully across Shreveport neighborhoods and outer communities.',
          },
          {
            title: 'Research sources',
            detail:
              'District tools and Louisiana Department of Education data beat ranking screenshots. Higher-ed campuses also shape some neighborhood demand.',
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
              'Ochsner LSU Health Shreveport, Willis-Knighton, CHRISTUS, and other systems serve parish corridors. Confirm networks and campus locations.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from southern growth edges and north corridors into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core multi-unit vs Highland SFH vs south HOA stock',
            detail:
              'Downtown product differs sharply from Highland two-stories and southern planned communities.',
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
            title: 'Downtown / midtown lifestyle',
            detail: 'Urban amenities with elevator and curb tradeoffs.',
          },
          {
            title: 'Highland / established neighborhood pattern',
            detail: 'Older SFH character with stair and staging logistics.',
          },
          {
            title: 'Southern growth suburban pattern',
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
              'Healthcare, energy and industrial corridors, logistics, education, gaming/hospitality, and professional services shape employment across the Ark-La-Tex.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-20 and I-49 peaks are real. Test drive peak routes; clarify if your job sits in Bossier, Texas, or another out-of-parish location.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Northwest Louisiana identity',
            detail:
              'Caddo is Shreveport / Ark-La-Tex product — not New Orleans, Baton Rouge, or Lafayette Acadiana defaults.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, thunderstorms, and occasional winter freezes. Plan outdoor staging contingency.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Caddo Parish resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify LPSC household goods common carrier registration for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Caddo Parish — official site',
        href: 'https://www.caddo.org/',
        external: true,
      },
      {
        label: 'City of Shreveport — official site',
        href: 'https://www.shreveportla.gov/',
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
    'Prefer Shreveport core elevator, Highland access, and honest I-20/I-49 pricing — including FMCSA for Texas/Arkansas legs. Verify LPSC HHG common carrier certificate in-state.',
  lastReviewed: '2026-07-24',
});
