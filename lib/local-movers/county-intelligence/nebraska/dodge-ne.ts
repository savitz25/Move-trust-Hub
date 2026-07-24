import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeNePack } from '@/lib/local-movers/county-intelligence/nebraska/ne-shared';

/**
 * Dodge County, NE — Fremont mid-market (not Douglas north rename, not Omaha core clone).
 */
export const dodgeCountyNeIntelligence: CountyIntelligencePack = finalizeNePack({
  countySlug: 'dodge',
  hubTitle: 'Dodge County Moving Intelligence Hub',
  eyebrow:
    'Dodge · Fremont NE mid-market · US-30 · US-77 · US-275',
  h1: 'Moving in Dodge County: Fremont Mid-Market Access, Platte Valley Stock & US-30 Corridor Logistics',
  heroOpener:
    'Dodge County, Nebraska is Fremont mid-market — Platte River valley industry and ag corridors, established neighborhood grids, multi-family belts, and US-30 / US-77 / US-275 freeflow — not a Douglas County north-Omaha rename, not downtown Old Market product, and not a Lincoln capital template. A downtown Fremont walk-up, a north-side ranch, a multi-family lease turn, and a rural-edge acreage job do not share truck access, curb rules, or empty-mile risk. Corridor freeflow rewrites “local” estimates across the valley, and winter ice and wind on open approaches can erase schedule optimism overnight. This hub is for people moving in Dodge County, Nebraska — Fremont market realities, not a renamed Douglas or Omaha page.',
  heroCredibility:
    'Nebraska PSC Household Goods Mover License · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'US-30 · US-77 · US-275 · local Fremont grid',
  whatMakesDifferent: {
    title: 'What makes moving in Dodge County different',
    intro:
      'These are mid-market Platte Valley realities — Fremont industry and neighborhood grids, corridor freeflow, rural-edge stock, and winter exposure — not Omaha river-city density, not west Omaha HOA growth, and not a Douglas County north rename with different ZIP labels.',
    bullets: [
      {
        title: 'Fremont is a mid-market hub — not a Douglas north rename',
        detail:
          'Ag processing, manufacturing, logistics, and regional retail drive mid-week demand that North Omaha scripts and Old Market elevators do not describe. Survey each Fremont address on its own terms.',
      },
      {
        title: 'Established grids and multi-family stock underprice ranch optimism',
        detail:
          'Older downtown and mid-grid product bring tight curb, basement stairs, and limited truck turnaround. Multi-family lease turns stack differently than rural-edge SFH.',
      },
      {
        title: 'US-30, US-77, and US-275 define portal-to-portal time',
        detail:
          'North Fremont ↔ south industrial belts, Fremont ↔ Omaha metro pairs, or Dodge ↔ neighboring Platte Valley pairs look local on maps and regional at peak. Price honestly — empty miles and construction windows stack fast.',
      },
      {
        title: 'Rural-edge and acreage jobs are not city-grid product',
        detail:
          'Long driveways, soft shoulders, outbuildings, and limited turnaround rewrite labor hours. Flat-suburb estimates fail on farm-edge and acreage stock.',
      },
      {
        title: 'Winter logistics and open-valley wind are real schedule risk',
        detail:
          'Ice, wind, and snow events reshape morning windows across the Platte Valley. Build weather contingency into outdoor staging and corridor pairs — especially December–March.',
      },
      {
        title: 'Intrastate Nebraska PSC Household Goods Mover License vs interstate FMCSA',
        detail:
          'Moves entirely within Nebraska by for-hire household goods carriers generally require a Nebraska Public Service Commission Household Goods Mover License. Match the legal name on the estimate to the PSC licensee list before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. This is not Iowa DOT, Kansas KCC, or Colorado PUC product.',
      },
    ],
  },
  zonesHeading: 'Dodge County access zones',
  zonesIntro:
    'Plan by Fremont core grids, industrial corridor belts, residential growth edges, and rural Platte Valley stock — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'fremont-core',
      name: 'Fremont core, downtown & established grids',
      shortName: 'Fremont Core',
      neighborhoods: [
        'Downtown Fremont',
        'Established mid-grid neighborhoods',
        'Broad Street corridor edges',
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
        'fremont',
        'downtown fremont',
        'broad street',
        'fremont nebraska',
        'dodge county',
      ],
    },
    {
      id: 'industrial-corridor-belts',
      name: 'Industrial corridors & US-30 / US-77 approaches',
      shortName: 'Industrial / Corridors',
      neighborhoods: [
        'Industrial-residential edges',
        'US-30 corridor approaches',
        'US-77 corridor approaches',
        'Plant-adjacent housing',
        'Shift-worker multi-family belts',
      ],
      housingTypes: 'Mixed SFH, multi-family, corridor and industrial-edge stock',
      challenges: [
        'US-30 / US-77 truck freeflow and shift-change congestion',
        'Mix of older stair product and multi-unit turns',
        'Cross-zone empty miles into core and Omaha pairs',
      ],
      moverTips:
        'Price industrial–core pairs with freeflow buffers. Avoid shift-change peaks when flexible. Clarify multi-family lease-turn timing.',
      cityKeywords: [
        'fremont industrial',
        'us-30',
        'us-77',
        'dodge county ne',
        'fremont',
      ],
    },
    {
      id: 'residential-growth-edges',
      name: 'Fremont residential growth & family belts',
      shortName: 'Residential Growth',
      neighborhoods: [
        'North and west residential edges',
        'Newer family tracts',
        'School-corridor neighborhoods',
        'US-275 approaches',
        'Subdivision growth belts',
      ],
      housingTypes: 'Newer SFH, some multi-family and townhome product',
      challenges: [
        'Longer portal time into core and industrial belts',
        'Subdivision curb rules on newer tracts',
        'US-275 peak freeflow toward Omaha metro',
      ],
      moverTips:
        'Collect subdivision rules early when present. Price growth–core pairs portal-to-portal. Prefer mid-week mornings around school calendars.',
      cityKeywords: [
        'fremont growth',
        'us-275',
        'north fremont',
        'west fremont',
        'dodge',
      ],
    },
    {
      id: 'rural-platte-valley',
      name: 'Rural Platte Valley & small-community edges',
      shortName: 'Rural / Valley',
      neighborhoods: [
        'Rural Dodge County edges',
        'Small-community satellite stock',
        'Acreage and farm-edge lots',
        'Platte River valley approaches',
        'Open-corridor approaches',
      ],
      housingTypes: 'Acreage SFH, outbuildings, farm-edge and small-town stock',
      challenges: [
        'Long driveways, soft shoulders, and limited turnaround',
        'Corridor freeflow and winter wind exposure',
        'Outbuilding and equipment staging complexity',
      ],
      moverTips:
        'Survey driveway length, soft ground, and outbuilding access. Price rural–core and metro pairs portal-to-portal. Build winter contingency on open approaches.',
      cityKeywords: [
        'dodge county rural',
        'platte valley',
        'acreage',
        'fremont rural',
        'us-30',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Dodge County moving costs',
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
        title: 'US-30 / US-77 / US-275 congestion',
        detail: 'Portal-to-portal spikes at peak and on Omaha-metro pairs.',
      },
      {
        title: 'Rural-edge empty miles and winter delays',
        detail: 'Acreage pairs bill regional time; ice and wind rewrite schedules.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$400–$1,520+',
        note: 'Higher with stairs or winter weather',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,180–$3,650+',
        note: 'Core-grid friction trends up',
      },
      {
        label: '3–4+ BR / acreage / metro-pair',
        value: '$2,150–$7,400+',
        note: 'Rural access and Omaha-pair portal time highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$100–$175+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Dodge County',
    intro:
      'Summer family peaks, multi-family lease turns, plant shift calendars, and Plains winter ice reshape Fremont windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear curb and reduce US-30 / core arterial pain before peak.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book residential growth and core Saturdays early.',
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
      id: 'fremont-dodge-mid-market-corridors',
      title: 'Fremont mid-market & corridor module',
      intro:
        'Dodge NE estimates fail when core-grid stairs, multi-family turns, rural-edge access, or US-30/US-77/US-275 empty miles are ignored — and when crews treat this as a Douglas north-Omaha rename.',
      bullets: [
        'Photo stair access, basement entries, and curb staging on core jobs.',
        'Survey driveway length and outbuildings on rural-edge stock.',
        'Price US-30 / US-77 / US-275 pairs portal-to-portal — including Fremont–Omaha metro pairs.',
        'Clarify Dodge vs Douglas destinations on multi-county estimates.',
        'Verify Nebraska PSC Household Goods Mover License for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Dodge County?',
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
              'Fremont Public Schools and surrounding Dodge County systems serve different addresses. Confirm zoning carefully — attendance areas can shift across city and rural edges.',
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
              'Methodist Fremont Health and other regional campuses anchor local care. Omaha metro systems remain referral destinations for many specialties.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map drive times from core, growth edges, and rural belts into Fremont campuses and Omaha specialists. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core grids vs growth SFH vs rural-edge acreage',
            detail:
              'Older mid-grid product, newer family tracts, and farm-edge lots price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Growth-edge new-build stock often prices differently from older core multi-family or rural acreage — and differently from Omaha metro comps.',
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
            title: 'Residential growth pattern',
            detail: 'Family tracts with different commute math to industrial belts and Omaha.',
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
              'Ag processing, manufacturing, logistics, healthcare, education, and regional retail shape local employment; some households commute into Omaha metro.',
          },
          {
            title: 'Commute realism',
            detail:
              'US-30, US-77, and US-275 peaks are real — especially Fremont–Omaha pairs. Test drive peak routes between your zone and work anchors.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Fremont mid-market identity',
            detail:
              'Dodge is a Platte Valley mid-market around Fremont — not a Douglas County north-Omaha rename and not Lincoln capital product.',
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
    title: 'Useful Dodge County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Nebraska PSC Household Goods Mover License for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Dodge County, Nebraska — official site',
        href: 'https://www.dodgecounty.ne.gov/',
        external: true,
      },
      {
        label: 'City of Fremont — official site',
        href: 'https://www.fremontne.gov/',
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
    'Prefer Fremont grid and rural-edge access experience with honest US-30 / US-77 / US-275 pricing. Verify Nebraska PSC Household Goods Mover License in-state and FMCSA interstate. This is Dodge County NE (Fremont) — not a Douglas north rename.',
  lastReviewed: '2026-07-24',
});
