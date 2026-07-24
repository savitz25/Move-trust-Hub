import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeIlPack,
  IL_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/illinois/il-shared';

/**
 * Winnebago County, IL — Rockford regional hub (not Chicago collar spillover).
 * Rock River valley, manufacturing/aerospace, I-39 / I-90 / US-20 logistics.
 */
export const winnebagoCountyIlIntelligence: CountyIntelligencePack = finalizeIlPack({
  countySlug: 'winnebago',
  hubTitle: 'Winnebago County Moving Intelligence Hub',
  eyebrow: 'Winnebago · Rockford regional · Loves Park, Machesney Park, Roscoe & Rock River',
  h1: 'Moving in Winnebago County: Rockford Access, Rock River Suburbs & I-39 / I-90 Logistics',
  heroOpener:
    'Winnebago County is northern Illinois’s Rockford regional market — not a renamed Chicago collar page. Downtown and near-west Rockford stock mixes walk-up multifamily with older SFH; Loves Park and Machesney Park feed US-20 and IL-251 family corridors; Roscoe, Rockton, and Cherry Valley hold larger lots and HOA pockets; South Beloit edges lean industrial and Wisconsin-facing. A Rockford third-floor walk-up, a Machesney Park ranch with tight curb, a Roscoe HOA gate list, and a plant-shift hard date do not share truck access or crew skill. I-39, I-90, US-20, and IL-251 rewrite “local” estimates that ignore portal-to-portal time, winter ice, and interstate authority when any leg crosses into Wisconsin. This hub is for people moving in Winnebago County — Rockford-centric logistics, not Chicagoland template copy.',
  heroCredibility:
    'Illinois Commerce Commission (ICC) Household Goods authority for intrastate moves · FMCSA for interstate · Curated listings',
  majorCorridors: 'I-39 · I-90 · US-20 · IL-251',
  whatMakesDifferent: {
    title: 'What makes moving in Winnebago County different',
    intro:
      'These are Rockford-region realities — Rock River access, manufacturing calendars, and I-39/I-90 portal time — not Chicago collar HOA sprawl or Metro East bridge traffic.',
    bullets: [
      {
        title: 'Rockford core product is walk-up and older stock, not tower clones',
        detail:
          'Near-downtown and west-side multifamily often mean stairs, limited curb, and long carries. Same-ZIP ranches still need driveway photos — not elevator-only checklists.',
      },
      {
        title: 'I-39 and I-90 turn short map miles into billable hours',
        detail:
          'Rockford ↔ Cherry Valley, Loves Park ↔ South Beloit, or Machesney Park ↔ Roscoe pairs look local and still burn portal time at peak, weather events, and construction seasons. Price honestly, not odometer optimism.',
      },
      {
        title: 'Manufacturing and aerospace shift calendars reshape demand',
        detail:
          'Plant report dates and mid-month industrial relocates compete with Saturday family demand. Hard start times need mid-week crew capacity, not only weekend quotes.',
      },
      {
        title: 'North-county HOA and larger-lot product is its own logistics stack',
        detail:
          'Roscoe, Rockton, and parts of Cherry Valley often require gate lists, truck-length limits, and long driveway carries that Rockford walk-ups never see.',
      },
      {
        title: 'Rock River and older street grids still constrain staging',
        detail:
          'Bridge approaches, tree-lined curb, and winter plowing piles shrink legal truck length. Survey real access, not Zillow driveway optimism.',
      },
      {
        title: 'Wisconsin-facing pairs are routine — authority must match the route',
        detail:
          'South Beloit, Beloit WI, and Janesville-bound legs cross state lines. An ICC household goods license alone does not authorize interstate delivery; confirm FMCSA when any stop leaves Illinois.',
      },
      {
        title: 'US-20 and IL-251 define east–west and north–south family corridors',
        detail:
          'Loves Park–Machesney Park–Rockford pairs ride these arterials daily. Freight, retail peaks, and snow events rewrite “twenty-minute” estimates into hour-plus windows.',
      },
      IL_REG_BULLET,
    ],
  },
  zonesHeading: 'Winnebago County access zones',
  zonesIntro:
    'Plan by Rockford core walk-ups, Loves Park–Machesney Park US-20/IL-251 belts, Roscoe–Rockton north suburbs, Cherry Valley east edges, and South Beloit industrial/Wisconsin links — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'rockford-core',
      name: 'Rockford core, near-west & downtown edges',
      shortName: 'Rockford core',
      neighborhoods: [
        'Downtown Rockford',
        'Near-west Rockford',
        'Northwest neighborhoods',
        'East-side Rockford pockets',
      ],
      housingTypes: 'Older SFH, walk-up multifamily, limited mid-rise, mixed commercial-residential',
      challenges: [
        'Stairs, long carries, and limited legal curb',
        'US-20 / IL-251 approach congestion',
        'Older street grids with tight truck turn radius',
      ],
      moverTips:
        'Photo curb and stair counts before the final estimate. Prefer mid-week early starts. Confirm alley vs street staging in writing.',
      cityKeywords: ['rockford', 'downtown rockford', 'west rockford', 'east rockford'],
    },
    {
      id: 'loves-park-machesney',
      name: 'Loves Park, Machesney Park & IL-251 family belt',
      shortName: 'Loves Park / Machesney',
      neighborhoods: [
        'Loves Park',
        'Machesney Park',
        'IL-251 residential corridors',
        'North Rockford edges',
      ],
      housingTypes: 'Ranch and split-level SFH, townhomes, garden multifamily',
      challenges: [
        'IL-251 and US-20 peak retail freight',
        'Basement carries and driveway grade variation',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Survey basements and driveway pitch. Build arterial buffer for any Rockford-core pair. Book peak Saturdays 2–3 weeks ahead.',
      cityKeywords: ['loves park', 'machesney park', 'machesney', 'il-251'],
    },
    {
      id: 'roscoe-rockton',
      name: 'Roscoe, Rockton & north-county larger lots',
      shortName: 'Roscoe / Rockton',
      neighborhoods: ['Roscoe', 'Rockton', 'North-county rural edges', 'Rock River north pockets'],
      housingTypes: 'Larger SFH, some HOA tracts, rural-lot edges',
      challenges: [
        'Long driveways and limited truck turn radius',
        'HOA gate lists and truck-length limits on newer tracts',
        'Longer empty miles from Rockford staging yards',
      ],
      moverTips:
        'Collect HOA packets early. Share driveway photos and gate codes. Price I-90 / IL-251 portal time for south-bound pairs.',
      cityKeywords: ['roscoe', 'rockton', 'north winnebago'],
    },
    {
      id: 'cherry-valley-east',
      name: 'Cherry Valley, east Winnebago & US-20 east',
      shortName: 'Cherry Valley / East',
      neighborhoods: [
        'Cherry Valley',
        'East US-20 residential',
        'Perryville corridor edges',
        'Boone County line pockets',
      ],
      housingTypes: 'Suburban SFH, HOA pockets, mixed commercial-adjacent multifamily',
      challenges: [
        'US-20 and I-39 interchange congestion',
        'HOA rules on growth tracts',
        'Cross-county pairs into Boone and Ogle',
      ],
      moverTips:
        'Build I-39 / US-20 buffer at peak. Clarify Winnebago vs Boone addresses on every estimate. Confirm truck limits for HOA streets.',
      cityKeywords: ['cherry valley', 'perryville', 'east rockford', 'us-20'],
    },
    {
      id: 'south-beloit-industrial',
      name: 'South Beloit, industrial edges & Wisconsin links',
      shortName: 'South Beloit',
      neighborhoods: [
        'South Beloit',
        'Industrial park edges',
        'I-90 Wisconsin approaches',
        'Blackhawk area pockets',
      ],
      housingTypes: 'Modest SFH, multifamily near employment, industrial-adjacent stock',
      challenges: [
        'I-90 peak and border-freight pulses',
        'Interstate authority when any stop is in Wisconsin',
        'Plant-shift hard dates competing for mid-week crews',
      ],
      moverTips:
        'Clarify Illinois-only vs Beloit WI destinations before deposit. Verify FMCSA for any out-of-state leg. Prefer early starts around shift change traffic.',
      cityKeywords: ['south beloit', 'beloit', 'blackhawk', 'i-90'],
    },
    {
      id: 'winnebago-rural-west',
      name: 'West Winnebago rural & township pockets',
      shortName: 'West rural',
      neighborhoods: [
        'Winnebago village edges',
        'West township roads',
        'Rural Rock River west pockets',
        'Stephenson County line edges',
      ],
      housingTypes: 'Rural SFH, acreage lots, limited multifamily',
      challenges: [
        'Soft shoulders and limited truck staging',
        'Longer empty miles and weather-sensitive gravel approaches',
        'Sparse cell coverage for day-of coordination in pockets',
      ],
      moverTips:
        'Pre-walk lane width and turnarounds. Confirm weather contingency for spring thaw. Price empty miles honestly from Rockford yards.',
      cityKeywords: ['winnebago', 'winnebago village', 'west winnebago', 'rural rockford'],
    },
  ],
  costDrivers: {
    title: 'What drives Winnebago County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Stair access, arterial portal time, and HOA or interstate complexity separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Walk-up stairs, basements & limited curb',
        detail:
          'Rockford core and older belts add labor before packing skill matters. Photo access early.',
      },
      {
        title: 'I-39 / I-90 / US-20 / IL-251 congestion',
        detail:
          'Cross-zone pairs burn portal-to-portal hours even when map miles look short — worse in snow and construction season.',
      },
      {
        title: 'North-county HOA and long-driveway product',
        detail:
          'Roscoe–Rockton gate rules and acreage carries push time and truck-size constraints into the quote.',
      },
      {
        title: 'Manufacturing hard dates',
        detail:
          'Plant report-to-duty and mid-month industrial relocates create mid-week competition for crews.',
      },
      {
        title: 'Wisconsin and multi-county empty miles',
        detail:
          'Beloit WI, Boone, and Ogle destinations raise staging distance and authority complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$400–$1,300+',
        note: 'Higher with walk-ups or peak arterial pairs',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,100–$3,400+',
        note: 'Basement and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR / HOA / cross-zone / interstate',
        value: '$2,200–$6,800+',
        note: 'North-county estates and WI pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$100–$170+/hr',
        note: 'Portal-to-portal; packing and access admin scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Winnebago County move',
    intro:
      'School calendars, plant shifts, lake-effect-adjacent winter weather, and summer humidity reshape access and crew availability across the Rockford region.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb and reduce US-20 / IL-251 pain. Avoid month-end Fridays when leases and plant dates collide.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail:
          'Loves Park–Machesney–Roscoe Saturday demand fills first. Book 2–4 weeks ahead for peak weekends.',
      },
      {
        title: 'Winter ice, snow, and freeze–thaw',
        detail:
          'I-39 / I-90 incidents and unplowed curb can erase truck access. Prefer flexible morning windows and confirm driveway clearing the night before.',
      },
      {
        title: 'Plant-shift and industrial relocation clusters',
        detail:
          'Manufacturing calendars create mid-week spikes. Confirm report dates, storage-in-transit, and temporary housing early.',
      },
    ],
  },
  specialized: [
    {
      id: 'rockford-access-corridors',
      title: 'Rockford access, arterials & winter logistics module',
      intro:
        'Winnebago estimates fail more often on curb/stair access, I-39/I-90 portal time, and winter staging than on packing skill alone.',
      bullets: [
        'Photo curb, stair counts, and driveway grade for Rockford core and Loves Park–Machesney stock.',
        'Collect HOA gate lists and truck-length limits for Roscoe–Rockton–Cherry Valley product.',
        'Price portal-to-portal time for any pair that rides I-39, I-90, US-20, or IL-251 at peak.',
        'Build weather buffers for snow, ice, and spring thaw on rural and river-edge approaches.',
        'Clarify Winnebago vs Boone / Ogle / Wisconsin addresses on every estimate.',
        'Verify Illinois Commerce Commission (ICC) Household Goods authorization for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'manufacturing-aerospace-relocation',
      title: 'Manufacturing & aerospace relocation module',
      intro:
        'Many Winnebago households move on plant, aerospace, and logistics timelines that do not flex with Saturday-only crews.',
      bullets: [
        'Ask about hard report-to-duty or start dates at estimate time.',
        'Clarify storage-in-transit and partial-load needs for temporary housing.',
        'Prefer mid-week early windows when industrial shift traffic is lighter post-commute.',
        'Match inventory complexity (tools, home office, specialty equipment) to crew experience.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Winnebago County?',
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
              'Rockford Public Schools serves much of the urban core; Loves Park, Machesney Park, Roscoe, Rockton, Cherry Valley, and other communities feed separate unit districts. Assignment is address-based — marketing names do not guarantee a campus.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'North-county and east growth pockets can see enrollment pressure. Ask districts about capacity, boundaries, and busing when touring.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Illinois State Board of Education data, and campus visits beat ranking screenshots alone.',
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
              'OSF, UW Health Northern Illinois / SwedishAmerican, and related campuses anchor much of Rockford-area care, with additional specialty options metro-wide. Confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Roscoe or Cherry Valley to preferred campuses — arterial congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core Rockford stock vs north-county suburbs',
            detail:
              'Expect older SFH and walk-up multifamily near Rockford core; larger lots and newer tracts dominate Roscoe, Rockton, and parts of Cherry Valley; Loves Park–Machesney lean family ranch and split-level.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by corridor. Budget for older-home repair risk in core stock and HOA dues on north growth tracts.',
          },
          {
            title: 'HOA and multifamily governance',
            detail:
              'Planned communities and some multifamily properties control move hours, truck size, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Winnebago areas fit whom',
        bullets: [
          {
            title: 'Rockford core urban-value lifestyle',
            detail:
              'Suits people prioritizing central location and older-stock prices — with stair, curb, and renovation tradeoffs on move day.',
          },
          {
            title: 'Loves Park–Machesney Park family corridors',
            detail:
              'Often appeals for schools-adjacent SFH and IL-251 access — with arterial timing and basement carries.',
          },
          {
            title: 'Roscoe–Rockton larger-lot living',
            detail:
              'Attracts households seeking space and newer product — with HOA logistics and longer Rockford-bound peaks.',
          },
          {
            title: 'South Beloit employment-edge living',
            detail:
              'Fits buyers chasing industrial and Wisconsin-corridor access — with interstate authority complexity on regional moves.',
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
              'Manufacturing, aerospace, logistics, healthcare, education, and regional retail concentrate demand across Rockford and the north suburbs.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households are car-dependent. I-39, I-90, US-20, and IL-251 peaks are real. Test drive peak routes before choosing solely on purchase price — this is not a Chicago transit market.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, multiple Rockfords',
            detail:
              'Winnebago stacks urban core, IL-251 family belts, north HOA/larger-lot suburbs, east growth edges, and industrial/Wisconsin links — different from Chicago collar sprawl or Metro East bridge living.',
          },
          {
            title: 'Climate',
            detail:
              'Cold snowy winters, freeze–thaw curb issues, humid summers, and severe-storm season. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Dining and events concentrate around Rockford corridors; north and east communities feel more family- and school-oriented. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Winnebago County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Illinois Commerce Commission (ICC) household goods authority for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Winnebago County — official site',
        href: 'https://www.wincoil.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Rockford',
        href: 'https://rockfordil.gov/',
        external: true,
        note: 'Municipal services & permits',
      },
      {
        label: 'Rockford Public Schools',
        href: 'https://www.rps205.com/',
        external: true,
        note: 'Core urban district — confirm address assignment',
      },
      {
        label: 'IDOT travel / traffic conditions',
        href: 'https://www.gettingaroundillinois.com/',
        external: true,
        note: 'I-39 / I-90 / US-20 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with walk-up and basement experience for Rockford core; HOA fluency for Roscoe–Rockton–Cherry Valley product; honest I-39 / I-90 / US-20 / IL-251 timing for cross-zone pairs; FMCSA readiness for Wisconsin legs. Verify Illinois Commerce Commission (ICC) Household Goods authorization for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
