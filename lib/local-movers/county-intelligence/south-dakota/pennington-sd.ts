import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeSdPack } from '@/lib/local-movers/county-intelligence/south-dakota/sd-shared';

/**
 * Pennington County, SD — Rapid City / Black Hills tourism + residential gateway.
 * NOT Sioux Falls west. NOT Minnehaha rename. NOT ND, MN, IA, NE, or WY product.
 */
export const penningtonCountySdIntelligence: CountyIntelligencePack = finalizeSdPack({
  countySlug: 'pennington',
  hubTitle: 'Pennington County Moving Intelligence Hub',
  eyebrow:
    'Pennington · Rapid City SD · Black Hills gateway · I-90 · US-16 · SD-44',
  h1: 'Moving in Pennington County: Rapid City Density, Black Hills Access & Tourism-Season Logistics',
  heroOpener:
    'Pennington County, South Dakota is western South Dakota’s Black Hills gateway — Rapid City core multi-unit and neighborhood grids, Box Elder and Ellsworth AFB corridor product, hills approaches toward Keystone and Hill City edges, and tourism-driven second-home stock — not Sioux Falls west, not a Minnehaha metro rename, and not a recycled Wyoming or Nebraska page. A downtown Rapid City walk-up, a west-side HOA two-story, an Ellsworth PCS job, and a hills-grade driveway long-carry do not share truck access, curb rules, or empty-mile risk. I-90, US-16, SD-44, and the local Rapid City grid freeflow rewrite “local” estimates, and hills grades plus winter ice can erase schedule optimism overnight. This hub is for people moving in Pennington County, South Dakota — Rapid City and Black Hills-market realities, not a Sioux Falls product page.',
  heroCredibility:
    'Written estimates + insurance for intrastate SD · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-90 · US-16 · SD-44 · local Rapid City grid',
  whatMakesDifferent: {
    title: 'What makes moving in Pennington County different',
    intro:
      'These are Rapid City–Black Hills realities — core multi-unit, hills grades, military PCS corridors, tourism-season freeflow, and western SD winter logistics — not Sioux Falls metro defaults, not Minnehaha growth product, and not a Wyoming or Nebraska rename.',
    bullets: [
      {
        title: 'Rapid City core multi-unit and grid product rewrite labor hours',
        detail:
          'Scarce curb staging, multi-flight stairs, limited truck length, and building COI packets dominate core jobs. A downtown walk-up is not a west Rapid City garage-friendly two-story.',
      },
      {
        title: 'Black Hills grades and driveway geometry underprice flat-metro optimism',
        detail:
          'Hills approaches, limited turnaround, long carries, and tree canopy fail bedroom-count quotes. Survey photos of grade and staging length beat inventory lists alone.',
      },
      {
        title: 'Box Elder–Ellsworth AFB corridor is not tourism-second-home product',
        detail:
          'Military PCS windows, base-adjacent logistics, and different portal math reshape estimates that assume “Pennington flat rate” or pure hills vacation stock.',
      },
      {
        title: 'I-90, US-16, and SD-44 define portal-to-portal time',
        detail:
          'Box Elder ↔ downtown, west Rapid City ↔ hills edges, or core ↔ Keystone-approach pairs look local on maps and regional at peak tourism. Price honestly — empty miles and construction windows stack fast.',
      },
      {
        title: 'Tourism peaks, Sturgis-adjacent freeflow, and hills winter ice are real schedule risk',
        detail:
          'Summer tourism congestion, rally-season spillover on western corridors, and freeze–thaw ice on grades reshape morning windows. Build weather and tourism contingency into outdoor staging — especially May–September peaks and November–March ice.',
      },
      {
        title:
          'South Dakota has no dedicated HHG permit board like ND NDDOT or NE PSC — written estimates, insurance, FMCSA interstate',
        detail:
          'South Dakota does not maintain a dedicated household-goods permit or certificate board comparable to North Dakota’s NDDOT HHG permit, Nebraska PSC Household Goods Mover License, Iowa, Minnesota, Wyoming, or New Jersey consumer-mover frameworks. For pure in-state South Dakota jobs, insist on written estimates matching the legal business name, cargo and liability insurance certificates, and clear inventory terms before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. Do not invent a South Dakota HHG certificate number that does not exist.',
      },
    ],
  },
  zonesHeading: 'Pennington County access zones',
  zonesIntro:
    'Plan by Rapid City core multi-unit, established neighborhood grids, Box Elder–Ellsworth corridor, and Black Hills grade approaches — access rules cluster by terrain and tourism freeflow more than ZIP alone.',
  zones: [
    {
      id: 'rapid-city-core',
      name: 'Rapid City downtown, near-core multi-unit & local grid',
      shortName: 'Rapid City core',
      neighborhoods: [
        'Downtown Rapid City',
        'Near-core multi-unit edges',
        'Main Street / corridor blocks',
        'Older walk-up and character SFH pockets',
        'Local arterial grid approaches',
      ],
      housingTypes: 'Walk-up multifamily, condos, character SFH, limited elevators',
      challenges: [
        'Multi-flight stairs and scarce curb staging',
        'Tourism-weekend congestion and event freeflow',
        'Tight turning radii and building COI packets',
      ],
      moverTips:
        'Survey stair counts with photos. Book mid-week early freight windows. Confirm building COIs and curb options in writing. Avoid peak tourism Saturdays when flexible.',
      cityKeywords: [
        'rapid city',
        'downtown rapid city',
        'rapid city sd',
        'main street rapid city',
      ],
    },
    {
      id: 'west-south-rapid-city-grids',
      name: 'West & south Rapid City established grids & growth edges',
      shortName: 'West / south Rapid City',
      neighborhoods: [
        'West Rapid City',
        'South Rapid City edges',
        'HOA and townhome growth pockets',
        'Canyon Lake / residential edges',
        'US-16 corridor residential stock',
      ],
      housingTypes: 'Established SFH, newer HOA tracts, some multi-family growth product',
      challenges: [
        'HOA gate lists and truck-length limits on growth product',
        'US-16 freeflow toward hills approaches',
        'Longer portal time on growth–core pairs',
      ],
      moverTips:
        'Collect HOA packets early. Price west/south–core pairs portal-to-portal. Photo driveway and curb geometry on established stock.',
      cityKeywords: [
        'west rapid city',
        'south rapid city',
        'canyon lake',
        'us-16',
      ],
    },
    {
      id: 'box-elder-ellsworth',
      name: 'Box Elder, Ellsworth AFB corridor & I-90 east edges',
      shortName: 'Box Elder / Ellsworth',
      neighborhoods: [
        'Box Elder',
        'Ellsworth AFB approaches',
        'I-90 east corridor pockets',
        'Base-adjacent residential stock',
        'New-construction growth edges',
      ],
      housingTypes: 'Newer SFH, multi-family, military-adjacent residential product',
      challenges: [
        'PCS window clustering and peak military demand',
        'I-90 freeflow into Rapid City core',
        'Different access rules than hills vacation stock',
      ],
      moverTips:
        'Book early around PCS windows. Price Box Elder–Rapid City pairs portal-to-portal. Clarify base-adjacent access and timing constraints in writing.',
      cityKeywords: [
        'box elder',
        'ellsworth',
        'ellsworth afb',
        'box elder sd',
        'i-90',
      ],
    },
    {
      id: 'black-hills-approaches',
      name: 'Black Hills grade approaches & tourism-edge residential',
      shortName: 'Hills approaches',
      neighborhoods: [
        'Keystone approach edges',
        'Hill City approach edges',
        'US-16 / SD-44 hills corridors',
        'Second-home and vacation stock pockets',
        'Rural-residential grade properties',
      ],
      housingTypes: 'Cabin and second-home stock, rural-residential, some village SFH',
      challenges: [
        'Steep grades, limited truck turnaround, long carries',
        'Tourism-season congestion on US-16 and SD-44',
        'Winter ice on hills approaches',
      ],
      moverTips:
        'Photo driveway pitch, staging length, and turnaround. Price hills–core pairs with freeflow buffers. Build winter and tourism contingency on grade approaches.',
      cityKeywords: [
        'keystone',
        'hill city',
        'black hills',
        'sd-44',
        'us-16 hills',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Pennington County moving costs',
    intro:
      'Core multi-unit friction, hills grades, military PCS clustering, tourism freeflow, and winter ice logistics drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Rapid City core stair & curb friction',
        detail: 'Walk-ups, scarce staging, and building packets dominate core jobs.',
      },
      {
        title: 'Black Hills grade long carries & limited turnaround',
        detail: 'Driveway pitch, carry distance, and staging geometry spike labor hours.',
      },
      {
        title: 'I-90 / US-16 / SD-44 congestion',
        detail: 'Portal-to-portal spikes at tourism peak and construction windows.',
      },
      {
        title: 'PCS / tourism empty miles and winter ice delays',
        detail: 'Map-short pairs still bill regional time; hills ice rewrites schedules.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$550–$2,000+',
        note: 'Higher with walk-ups, grades, or winter weather',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,600–$4,900+',
        note: 'Core and hills-approach friction trends up',
      },
      {
        label: '3–4+ BR / HOA / hills / PCS cross-corridor',
        value: '$3,000–$9,800+',
        note: 'Long carries and multi-corridor pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$120–$200+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Pennington County',
    intro:
      'Summer tourism peaks, military PCS windows, multi-family lease turns, and Black Hills winter ice reshape Rapid City-area windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear core curb and reduce US-16 / I-90 tourism freeflow before peak.',
      },
      {
        title: 'Peak tourism & family season: late May–mid-September',
        detail: 'Book Rapid City multi-unit and hills-approach Saturdays early.',
      },
      {
        title: 'Military PCS clustering',
        detail: 'Ellsworth corridor demand tightens around common PCS windows — book early.',
      },
      {
        title: 'Winter hills ice, wind & grade risk',
        detail: 'Plan outdoor staging contingency and flexible start times November–March.',
      },
    ],
  },
  specialized: [
    {
      id: 'rapid-city-black-hills-module',
      title: 'Rapid City–Black Hills & corridor-grid module',
      intro:
        'Pennington SD estimates fail when core building packets, hills grades, Ellsworth PCS windows, or I-90/US-16/SD-44 empty miles are ignored — and when crews treat this as Sioux Falls west or an ND/MN/IA/NE/WY rename page.',
      bullets: [
        'Request Rapid City multi-unit building packets early.',
        'Photo stair access, driveway grade, and curb staging on core and hills jobs.',
        'Price I-90 · US-16 · SD-44 pairs portal-to-portal.',
        'Clarify Rapid City vs Box Elder vs hills-approach destinations on multi-zone estimates.',
        'For pure in-state South Dakota jobs insist on written estimates and insurance; verify FMCSA for any interstate leg — South Dakota has no ND NDDOT- or NE PSC-style HHG permit board.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Pennington County?',
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
              'Rapid City Area Schools, Douglas (Box Elder / Ellsworth area), and other systems serve different addresses. Confirm zoning carefully — district lines shift across core, corridor, and hills edges.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools and South Dakota Department of Education data beat ranking screenshots.',
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
              'Monument Health and affiliated campuses anchor regional care in Rapid City. Confirm networks and specialist access for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Box Elder, west Rapid City, and hills edges into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core multi-unit vs growth SFH vs hills stock',
            detail:
              'Rapid City walk-ups, west/south HOA product, Box Elder military-adjacent homes, and hills second-home stock price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Hills-view and renovated core stock often prices differently from corridor multi-family or older grid product.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Rapid City core lifestyle',
            detail: 'Walkable amenities with stair, curb, density, and tourism freeflow tradeoffs.',
          },
          {
            title: 'Box Elder / Ellsworth pattern',
            detail: 'Military-adjacent residential logistics near I-90 with PCS seasonality.',
          },
          {
            title: 'Hills-approach pattern',
            detail: 'More space and scenery with grade access, tourism congestion, and winter ice tradeoffs.',
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
              'Healthcare, Ellsworth AFB and defense support, tourism and hospitality, government, professional services, and regional retail shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-90, US-16, SD-44, and local grid peaks are real — especially tourism season. Test drive peak routes between your zone and Rapid City anchors.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Black Hills gateway identity',
            detail:
              'Pennington is western South Dakota’s Rapid City–Black Hills core — not Sioux Falls west, not Minnehaha metro product, and not an ND, MN, IA, NE, or WY rename.',
          },
          {
            title: 'Climate',
            detail:
              'Four-season western Plains and hills climate with tourism summers, cold winters, wind, and grade ice. Plan outdoor staging contingency year-round.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Pennington County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. South Dakota does not use a dedicated HHG permit board like ND NDDOT or NE PSC — insist on written estimates and insurance for in-state jobs, and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Pennington County, South Dakota — official site',
        href: 'https://www.pennco.org/',
        external: true,
      },
      {
        label: 'City of Rapid City — official site',
        href: 'https://www.rcgov.org/',
        external: true,
      },
      {
        label: 'South Dakota Department of Transportation — traffic',
        href: 'https://dot.sd.gov/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Prefer core multi-unit, hills-grade, and Ellsworth-corridor experience with honest I-90 · US-16 · SD-44 pricing. Insist on written estimates and insurance for intrastate SD moves; verify FMCSA interstate. South Dakota has no ND NDDOT- or NE PSC-style HHG permit board. This is Pennington County SD (Rapid City / Black Hills) — not Sioux Falls west and not ND/MN/IA/NE/WY product.',
  lastReviewed: '2026-07-24',
});
