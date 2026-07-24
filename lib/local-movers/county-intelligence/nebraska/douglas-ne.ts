import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeNePack } from '@/lib/local-movers/county-intelligence/nebraska/ne-shared';

/**
 * Douglas County, NE — Omaha metro core (not Douglas KS, not Douglas NV, not Sarpy rename).
 */
export const douglasCountyNeIntelligence: CountyIntelligencePack = finalizeNePack({
  countySlug: 'douglas',
  hubTitle: 'Douglas County Moving Intelligence Hub',
  eyebrow:
    'Douglas · Omaha NE metro core · I-80 · I-480 · I-680 · US-75 · US-6',
  h1: 'Moving in Douglas County: Omaha Neighborhoods, Downtown–Midtown Density & West Omaha HOA Logistics',
  heroOpener:
    'Douglas County, Nebraska is Omaha metro core — Missouri River riverfront towers, downtown and Midtown multi-unit, established neighborhood grids, and west Omaha HOA growth — not Douglas County Kansas (Lawrence), not Douglas County Nevada, and not a Sarpy Bellevue/Papillion rename. A Old Market loft elevator job, a Dundee bungalow long-carry, a Aksarben mid-rise, and a Elkhorn cul-de-sac do not share truck access, curb rules, or empty-mile risk. I-80, I-480, I-680, US-75, and US-6 freeflow rewrite “local” estimates across the grid, and winter ice on river bridges and west arterials can erase schedule optimism overnight. This hub is for people moving in Douglas County, Nebraska — Omaha market realities, not a renamed Kansas or Nevada page.',
  heroCredibility:
    'Nebraska PSC Household Goods Mover License · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-80 · I-480 · I-680 · US-75 · US-6 · local Omaha grid',
  whatMakesDifferent: {
    title: 'What makes moving in Douglas County different',
    intro:
      'These are Omaha metro-core realities — river-city density, midtown stairs, west-suburb HOAs, interstate freeflow, and Plains winter logistics — not Lawrence KS product, not Nevada desert defaults, and not a Sarpy south-metro template.',
    bullets: [
      {
        title: 'Downtown, Old Market, and Midtown multi-unit rewrite labor hours',
        detail:
          'Elevators, COI packets, scarce curb staging, dock windows, and stair-heavy product dominate core jobs. A Old Market loft is not a west Omaha garage-friendly two-story.',
      },
      {
        title: 'Established neighborhood grids underprice flat-suburb optimism',
        detail:
          'Dundee, Benson, Florence, and older midtown stock bring tight curb, basement stairs, tree canopy, and limited truck turnaround. Survey photos beat bedroom-count quotes.',
      },
      {
        title: 'West Omaha HOA belts are not core product',
        detail:
          'Elkhorn, Millard edges, and west growth tracts mix gate lists, truck-length limits, and longer portal time than downtown elevators or Dundee walk-ups.',
      },
      {
        title: 'I-80, I-480, I-680, US-75, and US-6 define portal-to-portal time',
        detail:
          'West Omaha ↔ downtown, Midtown ↔ Florence, or Aksarben ↔ Elkhorn pairs look local on maps and regional at peak. Price honestly — empty miles and construction windows stack fast.',
      },
      {
        title: 'Missouri River bridges and winter logistics are real schedule risk',
        detail:
          'River-bridge freeflow, ice, wind, and snow events reshape morning windows across Omaha. Build weather contingency into outdoor staging and cross-zone pairs — especially December–March.',
      },
      {
        title: 'Intrastate Nebraska PSC Household Goods Mover License vs interstate FMCSA',
        detail:
          'Moves entirely within Nebraska by for-hire household goods carriers generally require a Nebraska Public Service Commission Household Goods Mover License. Match the legal name on the estimate to the PSC licensee list before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. This is not Iowa DOT, Kansas KCC, or Colorado PUC product.',
      },
    ],
  },
  zonesHeading: 'Douglas County access zones',
  zonesIntro:
    'Plan by downtown–Old Market multi-unit, Midtown–Dundee established grids, west Omaha HOA growth, and north/south corridor belts — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'downtown-old-market-riverfront',
      name: 'Downtown Omaha, Old Market & Missouri River riverfront',
      shortName: 'Downtown / Old Market',
      neighborhoods: [
        'Downtown Omaha',
        'Old Market',
        'Riverfront / Gene Leahy Mall edges',
        'Capitol District edges',
        'NoDo edges',
      ],
      housingTypes: 'Lofts, mid-rises, renovated multi-unit, denser walk-ups',
      challenges: [
        'Elevators, COI, and timed building windows',
        'Scarce curb staging and event-day congestion',
        'Missouri River bridge freeflow and winter ice risk',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week morning freight windows. Photo curb options and elevator size before final pricing. Build winter contingency on river approaches.',
      cityKeywords: [
        'omaha',
        'downtown omaha',
        'old market',
        'nodo',
        'riverfront',
      ],
    },
    {
      id: 'midtown-dundee-benson',
      name: 'Midtown, Dundee, Benson & established neighborhood grids',
      shortName: 'Midtown / Dundee',
      neighborhoods: [
        'Midtown Crossing edges',
        'Dundee',
        'Benson',
        'Blackstone edges',
        'Field Club / Hanscom Park edges',
      ],
      housingTypes: 'Established SFH, bungalows, some multi-family and carriage-house stock',
      challenges: [
        'Tight residential curb and limited truck turnaround',
        'Basement stairs, long carries, and tree canopy',
        'US-6 / Dodge Street peak congestion',
      ],
      moverTips:
        'Survey stair width and staging length. Build Dodge / Farnam buffers for cross-zone pairs. Confirm basement access on older stock.',
      cityKeywords: [
        'midtown omaha',
        'dundee',
        'benson',
        'blackstone',
        'field club',
      ],
    },
    {
      id: 'west-omaha-elkhorn-millard',
      name: 'West Omaha, Elkhorn & Millard growth belts',
      shortName: 'West Omaha / Elkhorn',
      neighborhoods: [
        'West Omaha',
        'Elkhorn',
        'Millard edges',
        'I-680 west approaches',
        'West Dodge / Pacific corridor edges',
      ],
      housingTypes: 'Newer SFH, HOA tracts, some multi-family and townhome product',
      challenges: [
        'HOA gate lists and truck-length limits',
        'I-680 / West Dodge congestion toward core',
        'Longer portal time on west–core pairs',
      ],
      moverTips:
        'Collect HOA packets early. Price west–core pairs portal-to-portal. Avoid peak I-680 / West Dodge windows when flexible.',
      cityKeywords: [
        'west omaha',
        'elkhorn',
        'millard',
        'west dodge',
        'pacific street',
      ],
    },
    {
      id: 'north-south-corridor-belts',
      name: 'North Omaha, South Omaha & US-75 corridor belts',
      shortName: 'North / South Omaha',
      neighborhoods: [
        'North Omaha / Florence edges',
        'South Omaha',
        'US-75 corridor approaches',
        'I-480 south approaches',
        'Mixed industrial-residential edges',
      ],
      housingTypes: 'Mixed older SFH, multi-family, and corridor stock',
      challenges: [
        'US-75 and I-480 peak freeflow',
        'Mix of older stair product and newer multi-unit',
        'Cross-zone empty miles into Midtown and west belts',
      ],
      moverTips:
        'Price north–south and corridor–core pairs with freeflow buffers. Survey multi-family lease-turn timing. Clarify curb rules on older streets.',
      cityKeywords: [
        'north omaha',
        'south omaha',
        'florence',
        'us-75',
        'i-480',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Douglas County moving costs',
    intro:
      'Core multi-unit friction, established-grid carries, west HOA rules, and interstate portal time drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Downtown / Old Market elevator & curb friction',
        detail: 'Building packets and scarce staging dominate core jobs.',
      },
      {
        title: 'Dundee / Midtown long carries & stairs',
        detail: 'Basements, tight curb, and carry distance spike labor hours.',
      },
      {
        title: 'I-80 / I-480 / I-680 / US-75 congestion',
        detail: 'Portal-to-portal spikes at peak and construction windows.',
      },
      {
        title: 'West–core empty miles and winter delays',
        detail: 'Map-short pairs still bill regional time; ice rewrites schedules.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,850+',
        note: 'Higher with elevators or winter weather',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,450–$4,400+',
        note: 'Core and midtown friction trends up',
      },
      {
        label: '3–4+ BR / west HOA / cross-metro',
        value: '$2,700–$8,800+',
        note: 'Long carries and multi-interstate pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$195+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Douglas County',
    intro:
      'Summer family peaks, multi-family lease turns, downtown event weekends, and Plains winter ice reshape Omaha windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear curb and reduce I-480 / West Dodge pain before peak.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book west Omaha and Midtown Saturdays early.',
      },
      {
        title: 'Month-end multi-family turns',
        detail: 'Downtown and Old Market elevators fill first.',
      },
      {
        title: 'Winter ice, wind & Missouri River bridge risk',
        detail: 'Plan outdoor staging contingency and flexible start times December–March.',
      },
    ],
  },
  specialized: [
    {
      id: 'omaha-douglas-river-city-interstate-grid',
      title: 'Omaha river-city & interstate-grid module',
      intro:
        'Douglas NE estimates fail when core building packets, midtown stairs, west HOA rules, or I-80/I-480/I-680 empty miles are ignored — and when crews treat this as Douglas KS, Douglas NV, or a Sarpy rename page.',
      bullets: [
        'Request downtown/Old Market building packets early.',
        'Photo stair access, basement entries, and curb staging on Dundee/Midtown jobs.',
        'Price I-80 / I-480 / I-680 / US-75 / US-6 pairs portal-to-portal.',
        'Clarify Douglas vs Sarpy destinations on multi-county metro estimates.',
        'Verify Nebraska PSC Household Goods Mover License for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Douglas County?',
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
              'Omaha Public Schools, Millard, Elkhorn, Westside, and other systems serve different addresses. Confirm zoning carefully — district lines shift block by block across the metro.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools and Nebraska Department of Education data beat ranking screenshots.',
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
              'Nebraska Medicine / UNMC, CHI Health, Methodist Health System, Children’s Nebraska, and other campuses anchor core and corridor care. Confirm networks and specialist access.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from west Omaha, Midtown, and north/south belts into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core multi-unit vs midtown SFH vs west growth stock',
            detail:
              'Old Market lofts, Dundee bungalows, and Elkhorn/Millard product price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'West Omaha renovated and new-build stock often prices differently from north/south multi-family or older midtown product.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown / Old Market lifestyle',
            detail: 'Walkable amenities with elevator, curb, and density tradeoffs.',
          },
          {
            title: 'Midtown / Dundee pattern',
            detail: 'Established SFH and neighborhood logistics near Dodge corridors.',
          },
          {
            title: 'West Omaha and outer corridor pattern',
            detail: 'More space, HOA rules, and different commute math to core jobs.',
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
              'Finance, insurance, healthcare and UNMC, logistics, professional services, and regional retail shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-80, I-480, I-680, US-75, and US-6 peaks are real. Test drive peak routes between your zone and work anchors.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Omaha Missouri River metro identity',
            detail:
              'Douglas is Nebraska’s largest metro core — not Douglas KS Lawrence product, not Douglas NV, and not a Sarpy south-metro rename.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, strong thunderstorms, and cold winters with ice and wind. Plan outdoor staging contingency year-round.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Douglas County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Nebraska PSC Household Goods Mover License for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Douglas County, Nebraska — official site',
        href: 'https://www.douglascounty-ne.gov/',
        external: true,
      },
      {
        label: 'City of Omaha — official site',
        href: 'https://www.cityofomaha.org/',
        external: true,
      },
      {
        label: 'Nebraska Department of Transportation — traffic',
        href: 'https://dot.nebraska.gov/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Prefer core multi-unit and midtown access experience with honest I-80 / I-480 / I-680 pricing. Verify Nebraska PSC Household Goods Mover License in-state and FMCSA interstate. This is Douglas County NE (Omaha) — not Douglas KS, Douglas NV, or Sarpy.',
  lastReviewed: '2026-07-24',
});
