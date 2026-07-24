import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeCoPack,
  CO_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/colorado/co-shared';

/**
 * El Paso County, CO — Colorado Springs + Fort Carson / Academy / Peterson military PCS
 * (not Denver south metro, not Douglas HOA clone).
 */
export const elPasoCountyCoIntelligence: CountyIntelligencePack = finalizeCoPack({
  countySlug: 'el-paso',
  hubTitle: 'El Paso County Moving Intelligence Hub',
  eyebrow: 'El Paso · Colorado Springs, Fort Carson PCS & Pikes Peak corridor logistics',
  h1: 'Moving in El Paso County: Colorado Springs Access, Military PCS & Pikes Peak Logistics',
  heroOpener:
    'El Paso County is Colorado Springs and the military-installation ring around it — Fort Carson PCS timelines, Air Force Academy and Peterson Space Force Base workforce turnover, Broadmoor and north-end family product, and Powers / Academy corridor congestion that rewrites “local” portal time. A Fort Carson–adjacent apartment, a Briargate HOA two-story, a downtown Colorado Springs walk-up, and a Monument foothills driveway do not share truck access or crew skill. I-25, US-24, Powers Blvd, and Academy Blvd turn short map miles into billable hours when peak commute and base-gate windows collide. This hub is for people moving in El Paso County — not a renamed Denver south-metro page or generic Front Range template.',
  heroCredibility:
    'Colorado PUC household goods (HHG) permit for intrastate moves · FMCSA for interstate · Colorado Springs military PCS & Pikes Peak corridor awareness · Curated listings',
  majorCorridors: 'I-25 · US-24 · Powers Blvd · Academy Blvd',
  whatMakesDifferent: {
    title: 'What makes moving in El Paso County different',
    intro:
      'These are El Paso and Colorado Springs realities — military PCS calendars, base-adjacent multifamily, and Pikes Peak arterial congestion — not Denver high-rise elevators or Douglas County Castle Rock HOA sprawl.',
    bullets: [
      {
        title: 'Military PCS orders rewrite booking lead time',
        detail:
          'Fort Carson, Peterson SFB, and Air Force Academy–linked households often have fixed report dates, weight tickets, and inventory expectations. Flexible civilian Saturday windows are not the default on PCS peaks.',
      },
      {
        title: 'Base-adjacent multifamily and gate timing dominate south/central jobs',
        detail:
          'Fountain, Security-Widefield edges, and Fort Carson–corridor apartments stack tight guest parking, elevator/stair carries, and lease-end waves that civilian SFH quotes underprice.',
      },
      {
        title: 'I-25, Powers Blvd, and Academy Blvd turn short miles into portal hours',
        detail:
          'Northgate ↔ downtown, Briargate ↔ Fort Carson, or Academy ↔ US-24 pairs look local and still burn 40–75+ minutes at peak. Price portal-to-portal honestly, not odometer optimism.',
      },
      {
        title: 'North-end HOA product vs central/older Springs stock is not one market',
        detail:
          'Briargate, Northgate, and Monument-area planned tracts need gate lists and truck-length rules; Old Colorado City, downtown, and midtown grids need curb surveys and stair photos — not a single “Springs rate.”',
      },
      {
        title: 'Elevation, wind, and winter freeze–thaw reshape open carries',
        detail:
          'Pikes Peak corridor wind, snow, and ice shrink curb and slow exterior paths November–March. Prefer early starts, flexible weather windows, and contingency for mats and tarps.',
      },
      {
        title: 'El Paso is not Denver south metro',
        detail:
          'Military PCS volume, Academy Boulevard logistics, and Colorado Springs micro-markets differ from Arapahoe/Douglas spillover. Do not reuse Denver high-rise or Castle Rock master-plan copy here.',
      },
      {
        title: 'Cross-county southern Front Range pairs are routine',
        detail:
          'Households regularly move El Paso ↔ Pueblo, Teller (Woodland Park edges), Fremont, or north toward Douglas. Clarify addresses so Colorado PUC HHG vs FMCSA interstate assumptions stay accurate when any leg leaves Colorado.',
      },
      CO_REG_BULLET,
    ],
  },
  zonesHeading: 'El Paso County access zones',
  zonesIntro:
    'Plan by central Colorado Springs, north-end growth (Briargate/Northgate), military-adjacent south corridors, Powers/east-side arterials, and Monument–northern foothills — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'central-springs',
      name: 'Central Colorado Springs, downtown & midtown grids',
      shortName: 'Central Springs',
      neighborhoods: [
        'Downtown Colorado Springs',
        'Old Colorado City edges',
        'Shooks Run',
        'Patton Park edges',
        'Midtown multifamily',
      ],
      housingTypes: 'Older SFH, walk-ups, mid-rise multifamily, mixed commercial-edge product',
      challenges: [
        'Limited curb and one-way staging near core blocks',
        'Stairs and long interior carries on older stock',
        'I-25 / US-24 approach congestion into the core',
      ],
      moverTips:
        'Photo curb options and stair counts. Prefer mid-week early starts. Confirm elevator or dock rules on denser product before the crew day.',
      cityKeywords: [
        'colorado springs',
        'downtown',
        'old colorado city',
        'shooks run',
        'midtown',
      ],
    },
    {
      id: 'north-end-hoa',
      name: 'North end: Briargate, Northgate & Interquest growth',
      shortName: 'North end / HOA',
      neighborhoods: [
        'Briargate',
        'Northgate',
        'Interquest edges',
        'Cordera edges',
        'Flying Horse edges',
      ],
      housingTypes: 'Master-planned HOA SFH, townhomes, larger family inventories',
      challenges: [
        'HOA gate lists, truck limits, and approved hours',
        'I-25 / Academy Blvd peak freeflow collapse',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Collect HOA packets and gate codes first. Book peak Saturdays early. Share driveway turn-radius photos with the estimate.',
      cityKeywords: [
        'briargate',
        'northgate',
        'interquest',
        'cordera',
        'flying horse',
      ],
    },
    {
      id: 'military-south',
      name: 'Fort Carson–adjacent, Fountain & Security-Widefield',
      shortName: 'Military / south',
      neighborhoods: [
        'Fort Carson–adjacent rentals',
        'Fountain',
        'Security',
        'Widefield',
        'South Academy corridors',
      ],
      housingTypes: 'Multifamily, townhomes, military-workforce SFH and rentals',
      challenges: [
        'PCS lease-end waves and hard report dates',
        'Tight guest parking and stair/elevator stacks',
        'I-25 south and Academy approach timing',
      ],
      moverTips:
        'Book to order dates, not only preferred Saturdays. Confirm base-adjacent access IDs and inventory documentation expectations early.',
      cityKeywords: [
        'fort carson',
        'fountain',
        'security',
        'widefield',
        'academy',
      ],
    },
    {
      id: 'powers-east',
      name: 'Powers Blvd, east side & airport-adjacent corridors',
      shortName: 'Powers / east',
      neighborhoods: [
        'Powers Blvd corridors',
        'Stetson Hills edges',
        'Indiano Bluffs edges',
        'Airport-adjacent multifamily',
        'East Colorado Springs growth',
      ],
      housingTypes: 'Newer SFH, townhomes, garden apartments, retail-edge multifamily',
      challenges: [
        'Powers Blvd signal density and retail congestion',
        'Cul-de-sac geometry and HOA rules on newer tracts',
        'Cross-town pairs to Academy or Fort Carson burn clock',
      ],
      moverTips:
        'Build Powers corridor buffers for any east–west pair. Survey HOA and driveway constraints. Price empty miles to western unload addresses honestly.',
      cityKeywords: [
        'powers',
        'stetson hills',
        'east colorado springs',
        'airport',
        'cimarron hills',
      ],
    },
    {
      id: 'broadmoor-southwest',
      name: 'Broadmoor, southwest foothills & Cheyenne Mountain edges',
      shortName: 'Broadmoor / SW',
      neighborhoods: [
        'Broadmoor',
        'Cheyenne Mountain edges',
        'Skyway',
        'Ivywild edges',
        'Southwest foothills SFH',
      ],
      housingTypes: 'Established SFH, hillside lots, higher-value inventories',
      challenges: [
        'Steep driveways and limited truck turn radius',
        'Tree-lined curb with long exterior carries',
        'Wind and weather exposure on open hillside paths',
      ],
      moverTips:
        'Survey driveway grade and truck length before finalizing crew size. Prefer early starts. Inventory high-value items with photo documentation.',
      cityKeywords: [
        'broadmoor',
        'cheyenne mountain',
        'skyway',
        'ivywild',
        'southwest',
      ],
    },
    {
      id: 'monument-north',
      name: 'Monument, Tri-Lakes & northern El Paso foothills',
      shortName: 'Monument / north',
      neighborhoods: [
        'Monument',
        'Palmer Lake edges',
        'Woodmoor',
        'Gleneagle edges',
        'Tri-Lakes corridors',
      ],
      housingTypes: 'Foothills SFH, acreage edges, HOA tracts, some multifamily',
      challenges: [
        'I-25 north peak congestion toward Douglas spillover',
        'Longer empty miles from central Springs yards',
        'Winter access and foothills driveway geometry',
      ],
      moverTips:
        'Price I-25 portal time to Colorado Springs destinations. Confirm HOA and long-driveway access. Build winter contingency November–March.',
      cityKeywords: [
        'monument',
        'palmer lake',
        'woodmoor',
        'gleneagle',
        'tri-lakes',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives El Paso County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Military PCS soft costs, HOA friction, foothills access, and I-25 / Powers / Academy portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'PCS timelines, inventories & documentation expectations',
        detail:
          'Hard report dates, weight/inventory discipline, and base-adjacent access raise schedule risk before packing skill matters.',
      },
      {
        title: 'HOA gates, truck limits & approved hours',
        detail:
          'North-end and east-side planned tracts add packet lead time and can force smaller trucks or shuttle setups.',
      },
      {
        title: 'I-25 · Powers Blvd · Academy Blvd congestion',
        detail:
          'Cross-metro pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Foothills driveways, stairs & older central stock',
        detail:
          'Broadmoor grades, Monument lots, and downtown walk-ups add labor that flat-rate optimism underprices.',
      },
      {
        title: 'Elevation weather & multi-county empty miles',
        detail:
          'Wind, snow, and ice slow exterior work; Pueblo, Teller, and Douglas destinations raise staging distance and authority complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$550–$1,900+',
        note: 'Higher with PCS hard dates, stairs, or peak I-25 pairs',
      },
      {
        label: '2–3BR apartment, townhome, or modest SFH',
        value: '$1,400–$4,200+',
        note: 'HOA soft costs and Academy/Powers buffers trend up',
      },
      {
        label: '3–4+ BR / foothills / cross-zone SFH',
        value: '$2,800–$8,500+',
        note: 'Hillside access and long I-25 or military-corridor pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$125–$190+/hr',
        note: 'Portal-to-portal; packing, HOA admin, and PCS documentation scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule an El Paso County move',
    intro:
      'Military PCS waves, school calendars, summer family demand, and Pikes Peak winter weather reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease HOA hour rules, and reduce I-25 / Powers / Academy pain. Avoid month-end Fridays when leases and PCS windows collide.',
      },
      {
        title: 'Peak season: late May–mid-September (and PCS cycle clusters)',
        detail:
          'Summer family SFH Saturdays and installation turnover fill first. Book 2–4 weeks ahead for peak weekends; PCS hard dates may need earlier inventory and packing slots.',
      },
      {
        title: 'Winter: wind, snow, and freeze–thaw on foothills paths',
        detail:
          'November–March adds curb shrinkage, icy driveways, and weather cancellations — especially Broadmoor, Monument, and open hillside product. Prefer flexible dates and early starts.',
      },
      {
        title: 'Academy, Fort Carson & Peterson workforce pulses',
        detail:
          'Training calendars, permanent-change cycles, and contractor turnover create short-notice spikes. Confirm hard move-in dates and storage-in-transit early.',
      },
    ],
  },
  specialized: [
    {
      id: 'military-pcs-el-paso',
      title: 'Military PCS & base-adjacent logistics module',
      intro:
        'El Paso estimates fail more often on PCS hard dates, base-corridor access, and documentation quality than on packing skill alone.',
      bullets: [
        'Align survey, pack, and delivery to report dates — not only preferred Saturdays.',
        'Confirm access IDs, guest-parking rules, and elevator/stair photos for Fort Carson–adjacent multifamily.',
        'Expect inventory and weight-ticket discipline on military-linked jobs; document high-value items with photos.',
        'Price portal-to-portal time for any pair that rides I-25, Academy Blvd, or Powers Blvd at peak.',
        'Clarify whether the job is Colorado-only (PUC HHG) or crosses state lines (FMCSA) when PCS orders send households out of state.',
        'Build contingency for gate delays and last-minute order changes common on installation calendars.',
      ],
    },
    {
      id: 'pikes-peak-access',
      title: 'Colorado Springs micro-market & Pikes Peak access module',
      intro:
        'A single “Colorado Springs rate” collapses when north HOA product, central grids, military south corridors, and foothills lots diverge.',
      bullets: [
        'Survey by zone product — HOA SFH, multifamily, hillside lot, or older central walk-up — not by city name alone.',
        'Collect HOA packets and truck-length limits for Briargate, Northgate, and east-side planned tracts.',
        'Photo driveway grade and turn radius for Broadmoor, Cheyenne Mountain, and Monument foothills addresses.',
        'Build winter weather contingency for open hillside and north-county lots November–March.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to El Paso County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, military lifestyle, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Colorado Springs-area families encounter multiple districts (including District 11, Academy District 20, Falcon District 49, and others by address). Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Military-connected and transfer families',
            detail:
              'PCS households often need mid-year enrollment flexibility and records transfer speed. Confirm timelines with the receiving district early in the orders window.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Colorado Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'UCHealth Memorial, CommonSpirit / Penrose-St. Francis, and other campuses anchor care across Colorado Springs. Military families may also coordinate TRICARE network and installation clinics — confirm your plan’s in-network sites.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from your target neighborhood to preferred campuses — I-25 and Academy realities change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'HOA growth, central grids & military-adjacent product',
            detail:
              'Expect north-end master-planned SFH, east Powers growth, central older grids, Broadmoor hillside estates, and high multifamily turnover near Fort Carson corridors.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply from Monument and Broadmoor to Fountain and Security-Widefield. Budget for HOA dues, older-building repair risk, and insurance on higher-value inventories.',
          },
          {
            title: 'HOA and multifamily governance',
            detail:
              'Associations and apartment managers often control move hours, truck size, elevators, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which El Paso areas fit whom',
        bullets: [
          {
            title: 'North-end HOA family lifestyle',
            detail:
              'Suits households prioritizing newer schools corridors and planned amenities — with gate packets and Saturday demand on move day.',
          },
          {
            title: 'Military-adjacent south corridors',
            detail:
              'Often appeals for commute proximity to Fort Carson — with PCS lease waves and multifamily staging constraints.',
          },
          {
            title: 'Central Springs urban/near-urban mix',
            detail:
              'Attracts people seeking walkable edges and older character — with curb, stair, and I-25 approach friction.',
          },
          {
            title: 'Monument and foothills space',
            detail:
              'Fits buyers chasing views, quieter streets, or acreage edges — with winter access and longer empty-mile pricing to central yards.',
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
              'Fort Carson, Peterson SFB, Air Force Academy, healthcare systems, aerospace/defense contractors, tourism and hospitality, and Colorado Springs professional services concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-25, Powers Blvd, Academy Blvd, and US-24 peaks are real. Test-drive peak routes before choosing solely on rent or purchase price — especially north–south pairs.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Pikes Peak outdoor culture with military rhythm',
            detail:
              'El Paso stacks trail access, military installation calendars, and a full mid-size metro — different from Denver high-rise density or southern Colorado’s Pueblo industrial-plains character.',
          },
          {
            title: 'Climate',
            detail:
              'High-desert sun, strong wind, cold snowy winters, and rapid shoulder-season swings. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Downtown and Old Colorado City culture, north-end family sports calendars, and base-community rhythms coexist. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful El Paso County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Colorado PUC household goods (HHG) permit status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'El Paso County — official site',
        href: 'https://www.elpasoco.com/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Colorado Springs',
        href: 'https://coloradosprings.gov/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'Fort Carson — official site',
        href: 'https://www.carson.army.mil/',
        external: true,
        note: 'Installation info for PCS planning',
      },
      {
        label: 'CDOT traveler information (COtrip)',
        href: 'https://www.cotrip.org/',
        external: true,
        note: 'I-25 and state highway conditions before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with military PCS timeline experience for Fort Carson / Academy / Peterson–linked jobs; HOA packet fluency for Briargate and north-end tracts; foothills driveway surveys for Broadmoor and Monument; honest I-25 · Powers Blvd · Academy Blvd timing for cross-zone pairs; winter readiness November–March. Verify Colorado PUC household goods (HHG) permit for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
