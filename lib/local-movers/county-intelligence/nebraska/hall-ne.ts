import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeNePack } from '@/lib/local-movers/county-intelligence/nebraska/ne-shared';

/**
 * Hall County, NE — Grand Island regional hub (not Omaha west clone, not Kearney rename).
 */
export const hallCountyNeIntelligence: CountyIntelligencePack = finalizeNePack({
  countySlug: 'hall',
  hubTitle: 'Hall County Moving Intelligence Hub',
  eyebrow:
    'Hall · Grand Island NE regional hub · I-80 · US-34 · US-281',
  h1: 'Moving in Hall County: Grand Island Regional Access, Platte Valley Stock & I-80 Corridor Logistics',
  heroOpener:
    'Hall County, Nebraska is Grand Island regional hub — Platte Valley industry and ag corridors, established neighborhood grids, multi-family belts, and I-80 freeflow — not an Omaha west-suburb clone, not a Kearney Buffalo rename, and not a Lincoln capital template. A downtown Grand Island walk-up, a south-side ranch, a multi-family lease turn, and a rural-edge acreage job do not share truck access, curb rules, or empty-mile risk. I-80, US-34, and US-281 rewrite “local” estimates across the valley, and winter ice and wind on open approaches can erase schedule optimism overnight. This hub is for people moving in Hall County, Nebraska — Grand Island market realities, not a renamed Omaha or Kearney page.',
  heroCredibility:
    'Nebraska PSC Household Goods Mover License · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-80 · US-34 · US-281 · local Grand Island grid',
  whatMakesDifferent: {
    title: 'What makes moving in Hall County different',
    intro:
      'These are central Nebraska regional-hub realities — Platte Valley industry, neighborhood grids, corridor freeflow, and winter exposure — not Omaha river-city density, not west Omaha HOA growth, and not a Kearney university-town template.',
    bullets: [
      {
        title: 'Grand Island is a regional hub — not an Omaha west clone',
        detail:
          'Ag processing, manufacturing, logistics, and regional retail drive mid-week demand that Elkhorn HOA scripts and Old Market elevators do not describe. Survey each Grand Island address on its own terms.',
      },
      {
        title: 'Established grids and multi-family stock underprice ranch optimism',
        detail:
          'Older downtown and mid-grid product bring tight curb, basement stairs, and limited truck turnaround. Multi-family lease turns stack differently than rural-edge SFH.',
      },
      {
        title: 'I-80, US-34, and US-281 define portal-to-portal time',
        detail:
          'North side ↔ south industrial belts, Grand Island ↔ I-80, or Hall ↔ neighboring Platte Valley pairs look local on maps and regional at peak. Price honestly — empty miles and construction windows stack fast.',
      },
      {
        title: 'Rural-edge and acreage jobs are not city-grid product',
        detail:
          'Long driveways, soft shoulders, outbuildings, and limited turnaround rewrite labor hours. Flat-suburb estimates fail on farm-edge and acreage stock.',
      },
      {
        title: 'Winter logistics and open-valley wind are real schedule risk',
        detail:
          'Ice, wind, and snow events reshape morning windows across the Platte Valley. Build weather contingency into outdoor staging and I-80 pairs — especially December–March.',
      },
      {
        title: 'Intrastate Nebraska PSC Household Goods Mover License vs interstate FMCSA',
        detail:
          'Moves entirely within Nebraska by for-hire household goods carriers generally require a Nebraska Public Service Commission Household Goods Mover License. Match the legal name on the estimate to the PSC licensee list before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. This is not Iowa DOT, Kansas KCC, or Colorado PUC product.',
      },
    ],
  },
  zonesHeading: 'Hall County access zones',
  zonesIntro:
    'Plan by Grand Island core grids, south/industrial corridor belts, north residential growth, and rural-edge Platte Valley stock — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'grand-island-core',
      name: 'Grand Island core, downtown & established grids',
      shortName: 'GI Core',
      neighborhoods: [
        'Downtown Grand Island',
        'Established mid-grid neighborhoods',
        'Locust Street corridor edges',
        'Older multi-family belts',
        'Central business approaches',
      ],
      housingTypes: 'Older SFH, walk-ups, renovated multi-unit, denser core stock',
      challenges: [
        'Tight curb and limited truck turnaround',
        'Stairs, basements, and long carries on older stock',
        'Core arterial peak freeflow',
      ],
      moverTips:
        'Survey stair width and curb staging early. Prefer mid-week morning windows. Photo basement access before final pricing.',
      cityKeywords: [
        'grand island',
        'downtown grand island',
        'locust street',
        'grand island nebraska',
        'hall county',
      ],
    },
    {
      id: 'south-industrial-corridors',
      name: 'South Grand Island industrial & US-281 corridors',
      shortName: 'South / Industrial',
      neighborhoods: [
        'South Grand Island',
        'US-281 corridor approaches',
        'Industrial-residential edges',
        'Warehouse and plant-adjacent housing',
        'Shift-worker multi-family belts',
      ],
      housingTypes: 'Mixed SFH, multi-family, corridor and industrial-edge stock',
      challenges: [
        'US-281 truck freeflow and shift-change congestion',
        'Mix of older stair product and multi-unit turns',
        'Cross-zone empty miles into core and I-80',
      ],
      moverTips:
        'Price south–core pairs with freeflow buffers. Avoid shift-change peaks when flexible. Clarify multi-family lease-turn timing.',
      cityKeywords: [
        'south grand island',
        'us-281',
        'grand island industrial',
        'hall',
        'platte valley',
      ],
    },
    {
      id: 'north-residential-growth',
      name: 'North Grand Island residential & growth belts',
      shortName: 'North GI',
      neighborhoods: [
        'North Grand Island',
        'Newer residential tracts',
        'US-34 corridor edges',
        'Family SFH belts',
        'School-corridor neighborhoods',
      ],
      housingTypes: 'Newer SFH, some multi-family and townhome product',
      challenges: [
        'Longer portal time into core and industrial belts',
        'HOA or subdivision curb rules on newer tracts',
        'US-34 peak freeflow',
      ],
      moverTips:
        'Collect subdivision rules early when present. Price north–core pairs portal-to-portal. Prefer mid-week mornings around school calendars.',
      cityKeywords: [
        'north grand island',
        'us-34',
        'grand island growth',
        'hall county ne',
        'grand island',
      ],
    },
    {
      id: 'rural-edge-i80',
      name: 'Rural-edge Platte Valley & I-80 approaches',
      shortName: 'Rural / I-80',
      neighborhoods: [
        'Rural Hall County edges',
        'I-80 interchange approaches',
        'Acreage and farm-edge lots',
        'Small-community satellite stock',
        'Open-valley approaches',
      ],
      housingTypes: 'Acreage SFH, outbuildings, farm-edge and small-town stock',
      challenges: [
        'Long driveways, soft shoulders, and limited turnaround',
        'I-80 freeflow and winter wind exposure',
        'Outbuilding and equipment staging complexity',
      ],
      moverTips:
        'Survey driveway length, soft ground, and outbuilding access. Price I-80 pairs portal-to-portal. Build winter contingency on open approaches.',
      cityKeywords: [
        'i-80',
        'hall county rural',
        'grand island i-80',
        'acreage',
        'platte valley',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Hall County moving costs',
    intro:
      'Core-grid carries, multi-family turns, rural-edge access, and corridor portal time drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Older-grid stairs & curb friction',
        detail: 'Basements and tight staging spike labor hours in core stock.',
      },
      {
        title: 'Multi-family lease-turn stacking',
        detail: 'Corridor apartments fill crew calendars around month-end.',
      },
      {
        title: 'I-80 / US-34 / US-281 congestion',
        detail: 'Portal-to-portal spikes at peak and construction windows.',
      },
      {
        title: 'Rural-edge empty miles and winter delays',
        detail: 'Acreage pairs bill regional time; ice and wind rewrite schedules.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$400–$1,500+',
        note: 'Higher with stairs or winter weather',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,200–$3,700+',
        note: 'Core-grid friction trends up',
      },
      {
        label: '3–4+ BR / acreage / cross-corridor',
        value: '$2,200–$7,200+',
        note: 'Rural access and long carries highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$100–$175+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Hall County',
    intro:
      'Summer family peaks, multi-family lease turns, ag and plant shift calendars, and Plains winter ice reshape Grand Island windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear curb and reduce US-281 / core arterial pain before peak.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book north residential and core Saturdays early.',
      },
      {
        title: 'Month-end multi-family turns',
        detail: 'Corridor apartments and curb fill first.',
      },
      {
        title: 'Winter ice, wind & open-valley risk',
        detail: 'Plan outdoor staging contingency and flexible start times December–March.',
      },
    ],
  },
  specialized: [
    {
      id: 'grand-island-hall-regional-i80',
      title: 'Grand Island regional & I-80 corridor module',
      intro:
        'Hall NE estimates fail when core-grid stairs, multi-family turns, rural-edge access, or I-80/US-34/US-281 empty miles are ignored — and when crews treat this as an Omaha west clone or Kearney rename.',
      bullets: [
        'Photo stair access, basement entries, and curb staging on core jobs.',
        'Survey driveway length and outbuildings on rural-edge stock.',
        'Price I-80 / US-34 / US-281 pairs portal-to-portal.',
        'Clarify Hall vs Buffalo or Adams destinations on multi-county estimates.',
        'Verify Nebraska PSC Household Goods Mover License for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Hall County?',
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
              'Grand Island Public Schools and surrounding Hall County systems serve different addresses. Confirm zoning carefully — attendance areas can shift across city and rural edges.',
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
              'CHI Health St. Francis and other regional campuses anchor Grand Island care. Larger Omaha and Lincoln systems remain referral destinations for some specialties.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map drive times from core, north, south, and rural edges into St. Francis and regional specialists. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core grids vs north growth vs rural-edge acreage',
            detail:
              'Older mid-grid product, newer family tracts, and farm-edge lots price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'North residential new-build stock often prices differently from older core multi-family or rural acreage.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Core / downtown pattern',
            detail: 'Shorter in-city trips with older-stock access tradeoffs.',
          },
          {
            title: 'North residential pattern',
            detail: 'Family tracts with different commute math to industrial belts.',
          },
          {
            title: 'Rural-edge pattern',
            detail: 'More space, longer driveways, and corridor portal time.',
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
              'Ag processing, manufacturing, logistics, healthcare, education, and regional retail shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-80, US-34, and US-281 peaks are real. Test drive peak routes between your zone and plant or core work anchors.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Grand Island regional-hub identity',
            detail:
              'Hall is central Nebraska’s largest regional hub — not an Omaha west-suburb clone and not a Kearney rename.',
          },
          {
            title: 'Climate',
            detail:
              'Hot summers, strong thunderstorms, and cold winters with ice and open-valley wind. Plan outdoor staging contingency year-round.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Hall County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Nebraska PSC Household Goods Mover License for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Hall County, Nebraska — official site',
        href: 'https://www.hallcountyne.gov/',
        external: true,
      },
      {
        label: 'City of Grand Island — official site',
        href: 'https://www.grand-island.com/',
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
    'Prefer Grand Island grid and rural-edge access experience with honest I-80 / US-34 / US-281 pricing. Verify Nebraska PSC Household Goods Mover License in-state and FMCSA interstate. This is Hall County NE (Grand Island) — not an Omaha west clone or Kearney rename.',
  lastReviewed: '2026-07-24',
});
