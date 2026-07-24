import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeNmPack } from '@/lib/local-movers/county-intelligence/new-mexico/nm-shared';

/**
 * Santa Fe County, NM — capital / higher-elevation market (not Albuquerque metro rename).
 */
export const santaFeCountyNmIntelligence: CountyIntelligencePack = finalizeNmPack({
  countySlug: 'santa-fe',
  hubTitle: 'Santa Fe County Moving Intelligence Hub',
  eyebrow:
    'Santa Fe · NM capital · higher elevation · I-25 · US-84/285 · NM-599 · historic core',
  h1: 'Moving in Santa Fe County: Historic Core Access, Higher-Elevation Logistics & Capital-City Housing Patterns',
  heroOpener:
    'Santa Fe County, New Mexico is the state capital market at roughly 7,000 feet — not an Albuquerque Heights rename, not a Taos mountain clone, and not a generic high-desert template. Plaza-adjacent adobe compounds, Canyon Road and Eastside hillside approaches, South Capitol and midtown multi-unit curb friction, Eldorado and southern growth tracts, and I-25 / US-84/285 / NM-599 freeflow rewrite “local” estimates. A historic-core long-carry with limited truck proximity, a foothills driveway with pitch, a midtown condo elevator job, and an Eldorado two-story do not share access rules or empty-mile risk. This hub is for people moving in Santa Fe County, New Mexico — capital-city and higher-elevation realities, not a renamed Bernalillo page.',
  heroCredibility:
    'NMDOT TRB / New Mexico household goods framework for intrastate NM moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-25 · US-84/285 · NM-599 · local Santa Fe grid',
  whatMakesDifferent: {
    title: 'What makes moving in Santa Fe County different',
    intro:
      'These are capital-city and higher-elevation realities — historic-core access, adobe compounds, foothills pitch, and NM-599 bypass timing — not Albuquerque interstate-grid defaults or a generic New Mexico template.',
    bullets: [
      {
        title: 'Historic core and adobe compounds rewrite labor hours',
        detail:
          'Plaza-adjacent, Canyon Road, and Eastside stock often means narrow approaches, courtyard entries, limited truck proximity, and long carries that flat-suburb optimism underprices. Survey photos beat bedroom-count quotes.',
      },
      {
        title: 'Higher elevation changes crew endurance and weather windows',
        detail:
          'At roughly 7,000 feet, summer sun, winter freezes, and wind events reshape outdoor staging. A “mild” day still demands hydration, altitude-aware pacing, and weather contingency that lowland playbooks miss.',
      },
      {
        title: 'I-25, US-84/285, and NM-599 define portal-to-portal time',
        detail:
          'Core ↔ Eldorado, Eastside ↔ Airport Road, or Santa Fe ↔ Albuquerque pairs look regional on maps and expensive at peak. Price honestly — empty miles, tourist-season congestion, and construction windows stack fast.',
      },
      {
        title: 'Midtown multi-unit and southern growth stock are not Plaza product',
        detail:
          'South Capitol, St. Michael’s Drive corridors, and Eldorado HOA tracts mix elevators, curb rules, and garage-friendly access that differ sharply from historic-core long carries.',
      },
      {
        title: 'Not Albuquerque Bernalillo or a Taos ski-town default',
        detail:
          'This is Santa Fe County’s capital market. Albuquerque heights–valley logistics, Rio Rancho growth suburbs, and north-mountain resort patterns use different access rules and corridors — survey each Santa Fe address on its own terms.',
      },
      {
        title: 'Intrastate NMDOT TRB household goods authority vs interstate FMCSA',
        detail:
          'Moves entirely within New Mexico by for-hire household goods carriers generally fall under the New Mexico Department of Transportation Transportation Regulation Bureau (NMDOT TRB) household goods / motor carrier framework. Match the legal name on the estimate to NMDOT TRB authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. Do not substitute TX, AZ, CO PUC, UT, or NJ credentials for New Mexico intrastate work.',
      },
    ],
  },
  zonesHeading: 'Santa Fe County access zones',
  zonesIntro:
    'Plan by historic core / Eastside, midtown corridors, southern growth (Eldorado / Airport Road), and northern / rural-edge belts — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'santa-fe-historic-core-eastside',
      name: 'Historic core, Plaza edges & Eastside foothills',
      shortName: 'Core / Eastside',
      neighborhoods: [
        'Downtown / Plaza edges',
        'Canyon Road corridor',
        'Eastside foothills',
        'Museum Hill edges',
        'historic adobe compounds',
      ],
      housingTypes: 'Adobe compounds, renovated historic SFH, hillside lots, limited multi-unit',
      challenges: [
        'Narrow streets, courtyard entries, and limited truck proximity',
        'Long carries, stairs, and soft or gravel staging',
        'Tourist-season curb and event congestion',
      ],
      moverTips:
        'Photo gate width, courtyard depth, and carry distance. Prefer mid-week early windows. Price historic-core jobs as access-first, not bedroom-count-first.',
      cityKeywords: [
        'santa fe',
        'plaza',
        'canyon road',
        'eastside santa fe',
        'museum hill',
        'downtown santa fe',
      ],
    },
    {
      id: 'santa-fe-midtown-south-capitol',
      name: 'Midtown, South Capitol & St. Michael’s corridors',
      shortName: 'Midtown',
      neighborhoods: [
        'South Capitol',
        'Midtown Santa Fe',
        'St. Michael’s Drive corridor',
        'Cerrillos Road edges',
        'state government-adjacent multi-unit',
      ],
      housingTypes: 'Condos, multi-unit, mixed SFH, renovated mid-century stock',
      challenges: [
        'Elevators, COI, and timed building windows',
        'Scarce curb staging near employment and retail corridors',
        'Stairs and long carries on denser parcels',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week morning freight windows. Photo curb options and stair counts before final pricing.',
      cityKeywords: [
        'south capitol',
        'midtown santa fe',
        'st michaels drive',
        'cerrillos road',
        'santa fe midtown',
      ],
    },
    {
      id: 'eldorado-airport-road-south',
      name: 'Eldorado, Airport Road & southern growth belts',
      shortName: 'South / Eldorado',
      neighborhoods: [
        'Eldorado at Santa Fe',
        'Airport Road corridor',
        'southern SFH tracts',
        'HOA growth pockets',
        'I-25 southern approaches',
      ],
      housingTypes: 'Newer SFH, HOA tracts, some multi-family',
      challenges: [
        'HOA gate and packet rules on many tracts',
        'Longer portal time to historic core',
        'I-25 / NM-599 peak congestion on core pairs',
      ],
      moverTips:
        'Collect HOA packets early. Price south–core pairs portal-to-portal. Avoid peak I-25 and NM-599 windows when flexible.',
      cityKeywords: [
        'eldorado',
        'eldorado at santa fe',
        'airport road',
        'southern santa fe',
      ],
    },
    {
      id: 'north-rural-edge-tesuque',
      name: 'Tesuque edges, northern corridors & rural-edge stock',
      shortName: 'North / rural edge',
      neighborhoods: [
        'Tesuque edges',
        'US-84/285 northern approaches',
        'rural-edge compounds',
        'foothills acreage pockets',
        'northern county fringe',
      ],
      housingTypes: 'Adobe compounds, acreage SFH, limited multi-family',
      challenges: [
        'Long driveways, soft shoulders, and limited turnaround',
        'Elevation and weather exposure on outdoor staging',
        'Different access skill set than midtown elevator jobs',
      ],
      moverTips:
        'Survey driveway length, ground condition, and gate clearance. Price northern pairs honestly against core congestion and altitude weather.',
      cityKeywords: ['tesuque', 'us-84', 'us-285', 'northern santa fe county'],
    },
  ],
  costDrivers: {
    title: 'What drives Santa Fe County moving costs',
    intro:
      'Historic-core access, higher-elevation weather, adobe compounds, and I-25 / US-84/285 / NM-599 portal time drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Historic-core long carries & courtyard entries',
        detail: 'Limited truck proximity and compound access spike labor hours.',
      },
      {
        title: 'Midtown elevator & curb friction',
        detail: 'Building packets and scarce staging dominate denser jobs.',
      },
      {
        title: 'I-25 / US-84/285 / NM-599 congestion',
        detail: 'Portal-to-portal spikes at peak, tourist, and construction windows.',
      },
      {
        title: 'Higher-elevation weather & empty miles to outer tracts',
        detail: 'Altitude, wind, and south/north fringe pairs bill regional time.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,750+',
        note: 'Higher with historic-core carries or elevators',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,450–$4,500+',
        note: 'Core compound and midtown friction trends up',
      },
      {
        label: '3–4+ BR / hillside / cross-corridor',
        value: '$2,700–$9,000+',
        note: 'Long carries and multi-corridor pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$190+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Santa Fe County',
    intro:
      'Summer family peaks, tourist-season congestion, multi-family lease turns, winter freezes, and higher-elevation wind reshape Santa Fe windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear curb in the core and reduce I-25 / NM-599 pain before peak.',
      },
      {
        title: 'Peak family & visitor season: late May–mid-August',
        detail: 'Book historic-core and Eastside Saturdays early.',
      },
      {
        title: 'Month-end multi-family turns',
        detail: 'Midtown and South Capitol elevators fill first.',
      },
      {
        title: 'Higher-elevation heat, wind & winter freezes',
        detail: 'Plan outdoor staging shade, wind protection, and cold-weather contingency.',
      },
    ],
  },
  specialized: [
    {
      id: 'santa-fe-historic-core-elevation-module',
      title: 'Santa Fe historic-core & higher-elevation module',
      intro:
        'Santa Fe estimates fail when adobe compound access, altitude weather, or I-25/US-84/285/NM-599 empty miles are ignored — and when crews treat this as an Albuquerque rename.',
      bullets: [
        'Request midtown building packets early; photo courtyard and carry distance on historic-core jobs.',
        'Plan altitude-aware crew pacing, hydration, and weather contingency.',
        'Price I-25 / US-84/285 / NM-599 pairs portal-to-portal.',
        'Clarify Santa Fe vs Bernalillo destinations on multi-county estimates.',
        'Verify NMDOT TRB household goods authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Santa Fe County?',
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
              'Santa Fe Public Schools serve most city addresses, with charter, private, and outlying options across the county. Confirm zoning carefully — lines shift between core, midtown, and southern growth areas.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools and New Mexico Public Education Department data beat ranking screenshots.',
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
              'CHRISTUS St. Vincent and other regional campuses anchor capital-area care; Albuquerque systems remain a specialist referral path for some relocators. Confirm networks and specialist access.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Eldorado and northern edges into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Historic adobe vs midtown multi-unit vs southern growth SFH',
            detail:
              'Plaza-edge compounds, South Capitol condos, and Eldorado tracts price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Eastside and historic renovated stock often prices differently from southern HOA growth or rural-edge acreage.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Historic core / Eastside lifestyle',
            detail: 'Walkable culture and adobe character with long-carry and curb tradeoffs.',
          },
          {
            title: 'Midtown / South Capitol pattern',
            detail: 'Employment-adjacent multi-unit and mixed SFH near Cerrillos corridors.',
          },
          {
            title: 'Southern growth pattern',
            detail: 'More space and HOA stock with longer portal time to the Plaza.',
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
              'State government, tourism and hospitality, healthcare, arts, professional services, and labs/contractors shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-25, US-84/285, and NM-599 peaks are real — including Santa Fe ↔ Albuquerque pairs. Test drive peak routes between your zone and work anchors.',
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
              'Santa Fe County is the capital market — not Albuquerque metro product alone, and not a north-mountain resort default.',
          },
          {
            title: 'Climate & elevation',
            detail:
              'Higher-elevation sun, wind, cool nights, winter freezes, and monsoon afternoons. Plan outdoor staging contingency.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Santa Fe County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify NMDOT TRB household goods authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Santa Fe County, New Mexico — official site',
        href: 'https://www.santafecountynm.gov/',
        external: true,
      },
      {
        label: 'City of Santa Fe — official site',
        href: 'https://www.santafenm.gov/',
        external: true,
      },
      {
        label: 'NMDOT traffic & road conditions',
        href: 'https://www.dot.nm.gov/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Prefer historic-core adobe access and higher-elevation experience with honest I-25 / US-84/285 / NM-599 pricing. Verify NMDOT TRB HHG authority in-state and FMCSA interstate. This is Santa Fe County NM — not Albuquerque.',
  lastReviewed: '2026-07-24',
});
