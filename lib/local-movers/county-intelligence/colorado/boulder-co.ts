import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeCoPack,
  CO_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/colorado/co-shared';

/**
 * Boulder County, CO — constrained city, university/tech, foothills
 * (not Fort Collins clone, not Denver northwest spillover boilerplate).
 */
export const boulderCountyCoIntelligence: CountyIntelligencePack = finalizeCoPack({
  countySlug: 'boulder',
  hubTitle: 'Boulder County Moving Intelligence Hub',
  eyebrow: 'Boulder · constrained city, CU/tech & Flatirons foothills logistics',
  h1: 'Moving in Boulder County: Constrained-City Access, CU Cycles & Foothills Logistics',
  heroOpener:
    'Boulder County is a constrained premium market — University of Colorado lease waves, Pearl Street and Mapleton Hill curb limits, tech and lab workforce inventories, and Flatirons foothills grades that punish trucks sized for open Front Range cul-de-sacs. A University Hill walk-up, a Gunbarrel HOA two-story, a Louisville townhome, and a west Boulder hillside driveway do not share truck access or crew skill. US-36, CO-119, CO-93, Foothills Parkway, and canyon corridors turn short map miles into billable hours when peak commute and academic calendars collide. This hub is for people moving in Boulder County — not a renamed Fort Collins growth page or generic northwest-metro template.',
  heroCredibility:
    'Colorado PUC household goods (HHG) permit for intrastate moves · FMCSA for interstate · Boulder constrained-access & foothills logistics awareness · Curated listings',
  majorCorridors: 'US-36 · CO-119 · CO-93 · Foothills Pkwy · Canyon corridors',
  whatMakesDifferent: {
    title: 'What makes moving in Boulder County different',
    intro:
      'These are Boulder County realities — constrained-city parking, CU academic spikes, premium tech inventories, and foothills grades — not Fort Collins Harmony sprawl or Weld plains growth.',
    bullets: [
      {
        title: 'Constrained-city curb and shuttle reality in Boulder core',
        detail:
          'Pearl Street–adjacent, Mapleton Hill, and dense central blocks often need short trucks, long carries, or shuttle setups. Open-yard tractor assumptions from plains suburbs fail here.',
      },
      {
        title: 'CU Boulder lease and faculty calendars create hard spikes',
        detail:
          'August move-in, semester turnover, and academic appointments compress elevators and curb near University Hill. Civilian flexible-weekend assumptions fail during peak student waves.',
      },
      {
        title: 'US-36, CO-119, CO-93, and Foothills Parkway rewrite portal time',
        detail:
          'Boulder ↔ Louisville, Gunbarrel ↔ Table Mesa, or Longmont ↔ Boulder pairs look local and still burn 40–80+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Foothills and canyon-edge product needs grade and weather surveys',
        detail:
          'West Boulder, Chautauqua edges, and canyon approaches add driveway grade, wind, and limited turn radius that east-county HOA quotes underprice.',
      },
      {
        title: 'Premium tech, lab, and outdoor-lifestyle inventories raise claims risk',
        detail:
          'High-value electronics, bikes, outdoor gear, and design furnishings are common. Crew experience and packing scope matter more than lowest hourly alone.',
      },
      {
        title: 'Boulder is not Fort Collins and not Denver northwest boilerplate',
        detail:
          'Constrained parking, Flatirons access, and premium core density differ from Larimer’s I-25 growth ring and Adams/Broomfield spillover. Do not reuse those packs with a city rename.',
      },
      {
        title: 'East-county growth vs mountain-edge product is not one market',
        detail:
          'Louisville, Lafayette, Erie edges, and Longmont corridors behave more like planned suburban jobs; Nederland and canyon pockets do not. Survey by zone, not county label.',
      },
      CO_REG_BULLET,
    ],
  },
  zonesHeading: 'Boulder County access zones',
  zonesIntro:
    'Plan by Boulder core / University Hill, west foothills, Gunbarrel–east Boulder, Louisville–Lafayette–Erie growth, Longmont corridors, and mountain-edge pockets — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'boulder-core-cuhill',
      name: 'Boulder core, Pearl Street edges & University Hill',
      shortName: 'Core / CU Hill',
      neighborhoods: [
        'Pearl Street corridors',
        'University Hill',
        'Mapleton Hill',
        'Downtown Boulder',
        'Central multifamily',
      ],
      housingTypes: 'Walk-ups, denser multifamily, historic SFH, student and professional rentals',
      challenges: [
        'Extremely limited curb and permit/time-window staging',
        'Stairs, narrow halls, and long carries',
        'August CU lease waves and short-notice student moves',
      ],
      moverTips:
        'Assume short-truck or shuttle risk until surveyed. Photo stairs and curb. Book campus peaks weeks ahead. Prefer mid-week early starts.',
      cityKeywords: [
        'boulder',
        'pearl street',
        'university hill',
        'mapleton',
        'downtown boulder',
        'cu',
      ],
    },
    {
      id: 'west-foothills-boulder',
      name: 'West Boulder foothills, Chautauqua & Flatirons edges',
      shortName: 'West foothills',
      neighborhoods: [
        'Chautauqua edges',
        'West Boulder foothills',
        'Table Mesa west edges',
        'Flagstaff approaches',
        'Flatirons-view SFH',
      ],
      housingTypes: 'Hillside SFH, custom homes, higher-value inventories',
      challenges: [
        'Steep driveways and limited truck turn radius',
        'Wind and winter ice on open hillside paths',
        'Long exterior carries from street staging',
      ],
      moverTips:
        'Survey driveway grade and truck length before finalizing crew size. Inventory high-value items with photos. Prefer early starts and winter contingency.',
      cityKeywords: [
        'chautauqua',
        'flagstaff',
        'table mesa',
        'flatirons',
        'west boulder',
      ],
    },
    {
      id: 'gunbarrel-east-boulder',
      name: 'Gunbarrel, east Boulder & Foothills Parkway edges',
      shortName: 'Gunbarrel / east',
      neighborhoods: [
        'Gunbarrel',
        'East Boulder',
        'Foothills Parkway corridors',
        'Twin Lakes edges',
        'North Boulder edges',
      ],
      housingTypes: 'SFH, townhomes, multifamily, tech-corridor product',
      challenges: [
        'Foothills Parkway and US-36 approach congestion',
        'HOA rules on denser planned tracts',
        'Cross-town pairs to west foothills burn clock',
      ],
      moverTips:
        'Build Foothills Parkway / US-36 buffers. Collect HOA packets when applicable. Price east–west Boulder pairs with portal honesty.',
      cityKeywords: [
        'gunbarrel',
        'east boulder',
        'foothills parkway',
        'twin lakes',
        'north boulder',
      ],
    },
    {
      id: 'louisville-lafayette-erie',
      name: 'Louisville, Lafayette, Erie edges & east-county growth',
      shortName: 'East-county growth',
      neighborhoods: [
        'Louisville',
        'Lafayette',
        'Erie edges',
        'Superior edges',
        'East-county HOA tracts',
      ],
      housingTypes: 'Master-planned HOA SFH, townhomes, newer multifamily',
      challenges: [
        'HOA gate lists, truck limits, and approved hours',
        'US-36 / CO-119 peak freeflow collapse',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Collect HOA packets first. Book peak Saturdays early. Build US-36 buffers for Boulder-linked pairs.',
      cityKeywords: [
        'louisville',
        'lafayette',
        'erie',
        'superior',
        'east boulder county',
      ],
    },
    {
      id: 'longmont-corridors',
      name: 'Longmont core, CO-119 corridors & north-county product',
      shortName: 'Longmont',
      neighborhoods: [
        'Downtown Longmont',
        'CO-119 corridors',
        'North Longmont growth',
        'South Longmont edges',
        'Hover / Main commercial edges',
      ],
      housingTypes: 'Established SFH, newer HOA tracts, multifamily, mixed commercial-edge product',
      challenges: [
        'CO-119 and US-287-linked congestion patterns',
        'Mixed older curb and new-construction geometry',
        'Longer empty miles from Boulder core yards on some jobs',
      ],
      moverTips:
        'Survey HOA vs older-stock access separately. Price Longmont ↔ Boulder pairs with CO-119 buffers. Prefer early starts on retail-corridor days.',
      cityKeywords: [
        'longmont',
        'hover',
        'co-119',
        'diagonal',
        'north county',
      ],
    },
    {
      id: 'mountain-edge-canyon',
      name: 'Nederland, canyon corridors & mountain-edge pockets',
      shortName: 'Mountain / canyon',
      neighborhoods: [
        'Nederland',
        'Canyon corridors (CO-119 / Peak to Peak approaches)',
        'Mountain cabin and second-home edges',
        'Western rural pockets',
      ],
      housingTypes: 'Mountain SFH, cabins, second homes, rural lots',
      challenges: [
        'Long empty miles and weather-sensitive approaches',
        'Narrow roads and limited destination staging',
        'Steep drives and winter access risk',
      ],
      moverTips:
        'Confirm road conditions and vehicle size early. Price empty miles and weather risk honestly. Prefer flexible dates outside holiday and peak recreation weekends.',
      cityKeywords: [
        'nederland',
        'canyon',
        'peak to peak',
        'mountain',
        'cabin',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Boulder County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Constrained-city soft costs, CU peaks, foothills grades, premium inventories, and US-36 / Diagonal portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Constrained curb, shuttles & long carries in Boulder core',
        detail:
          'Historic grids and dense multifamily add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'CU lease peaks & elevator/stair product',
        detail:
          'University Hill and near-campus waves compress calendars and raise short-notice demand premiums.',
      },
      {
        title: 'US-36 · CO-119 · CO-93 · Foothills Parkway congestion',
        detail:
          'Cross-county and Boulder–east growth pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Foothills driveways, canyon approaches & premium inventories',
        detail:
          'Hillside grades and high-value outdoor/tech belongings add labor and claims-prevention packing scope.',
      },
      {
        title: 'Weather & multi-county Front Range pairs',
        detail:
          'Snow/ice slow exterior work; Denver metro and Larimer/Weld destinations raise staging distance and authority complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$600–$2,100+',
        note: 'Higher with core curb limits, stairs, or CU peaks',
      },
      {
        label: '2–3BR apartment, townhome, or modest SFH',
        value: '$1,600–$4,800+',
        note: 'Shuttle risk, HOA soft costs, and corridor buffers trend up',
      },
      {
        label: '3–4+ BR / foothills / cross-zone SFH',
        value: '$3,200–$9,500+',
        note: 'Hillside access and long US-36 or canyon pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$130–$200+/hr',
        note: 'Portal-to-portal; packing, shuttle, and premium-market demand scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Boulder County move',
    intro:
      'CU academic calendars, tech hiring windows, summer family demand, and foothills winter weather reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease HOA hour rules, and reduce US-36 / Foothills Parkway pain. Avoid month-end Fridays and peak August campus weekends when possible.',
      },
      {
        title: 'Peak season: late May–mid-September (and August CU move-in)',
        detail:
          'Student turnover, tech relocations, and suburban SFH Saturdays fill first. Book 2–4 weeks ahead for peak weekends; core Boulder jobs may need earlier staging plans.',
      },
      {
        title: 'Winter: snow, ice, and foothills wind',
        detail:
          'November–March adds curb shrinkage, frozen hillside paths, and canyon-approach risk. Prefer flexible dates, early starts, and contingency for salt and tarps.',
      },
      {
        title: 'Tech/lab and faculty appointment waves',
        detail:
          'Hard report dates and short lease gaps create mid-week spikes. Confirm storage-in-transit early when keys and start dates do not align.',
      },
    ],
  },
  specialized: [
    {
      id: 'constrained-city-boulder',
      title: 'Constrained-city & CU access module',
      intro:
        'Boulder core estimates fail more often on curb, shuttle risk, stairs, and campus spikes than on packing skill alone.',
      bullets: [
        'Assume limited truck length until the survey proves otherwise for Pearl Street–adjacent and Mapleton Hill product.',
        'Book August and mid-year CU windows early; photo elevators, stairs, and legal staging options.',
        'Price long carries and shuttle setups as line items, not surprises.',
        'Prefer mid-week early starts to reduce enforcement and congestion friction in the core.',
        'Clarify student self-pack vs full-service scope so inventory surprises do not explode on load day.',
      ],
    },
    {
      id: 'foothills-east-county',
      title: 'Foothills grades & east-county growth module',
      intro:
        'A single “Boulder County rate” collapses when west hillside product, Gunbarrel corridors, east-county HOAs, and mountain pockets diverge.',
      bullets: [
        'Survey driveway grade and turn radius for west Boulder and canyon destinations before finalizing truck size.',
        'Collect HOA packets for Louisville, Lafayette, Erie edges, and denser Gunbarrel tracts.',
        'Build US-36 / CO-119 / Foothills Parkway buffers for any cross-zone pair.',
        'Match premium outdoor and tech inventories to careful packing scopes and experienced crews.',
        'Price Nederland and canyon empty miles and weather risk honestly.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Boulder County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, university/tech lifestyle, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Boulder Valley School District, St. Vrain Valley (Longmont area), and other address-based systems cover the county. Neighborhood marketing names do not guarantee a campus.',
          },
          {
            title: 'Higher education presence',
            detail:
              'University of Colorado Boulder shapes housing demand, traffic, and culture. Faculty, staff, and graduate households should align leases with academic calendars.',
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
              'Boulder Community Health, UCHealth and other Front Range systems, and Longmont-area campuses anchor local care. Specialty services may still pull toward Denver metro for some households.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from your target neighborhood to preferred campuses — US-36 and Foothills Parkway realities change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Premium core, east-county growth & foothills lots',
            detail:
              'Expect constrained historic and multifamily product in Boulder core; hillside custom homes west; Gunbarrel and east-county planned tracts; Longmont mixed stock; and mountain-edge cabins.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Boulder city pricing often leads the Front Range; Louisville/Lafayette and Longmont can trade density for space at different price points. Budget for HOA dues, older-building repair risk, and insurance on high-value inventories.',
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
        title: 'Which Boulder County areas fit whom',
        bullets: [
          {
            title: 'Boulder core / University Hill lifestyle',
            detail:
              'Suits people prioritizing walkability, campus energy, and amenities — with curb, stair, and premium cost tradeoffs on move day.',
          },
          {
            title: 'West foothills outdoor-premium living',
            detail:
              'Often appeals for Flatirons access and views — with driveway grade and weather logistics.',
          },
          {
            title: 'Louisville / Lafayette / Erie family growth',
            detail:
              'Attracts households seeking planned amenities and somewhat more space than the city core — with HOA packets and US-36 commute realism.',
          },
          {
            title: 'Longmont and north-county value mix',
            detail:
              'Fits buyers chasing relatively broader inventory and employment options — with CO-119 timing to Boulder jobs.',
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
              'CU Boulder, federal labs and research, aerospace and tech employers, startups, healthcare, and remote/hybrid professionals concentrating in Boulder–east-county corridors.',
          },
          {
            title: 'Commute realism',
            detail:
              'US-36, CO-119, CO-93, and Foothills Parkway peaks are real. Test-drive peak routes before choosing solely on rent or purchase price — especially Boulder ↔ Denver metro pairs.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Outdoor premium culture with constrained growth',
            detail:
              'Boulder County stacks trail access, progressive city character, and limited in-city expansion — different from Fort Collins’ larger growth ring or Weld’s plains industrial expansion.',
          },
          {
            title: 'Climate',
            detail:
              'Four seasons with cold snowy winters, strong sun, and foothills wind. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Pearl Street and campus energy, east-county family calendars, and mountain-recreation weekends coexist. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Boulder County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Colorado PUC household goods (HHG) permit status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Boulder County — official site',
        href: 'https://www.bouldercounty.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Boulder',
        href: 'https://bouldercolorado.gov/',
        external: true,
        note: 'Permits, parking & city info',
      },
      {
        label: 'City of Longmont',
        href: 'https://www.longmontcolorado.gov/',
        external: true,
        note: 'Longmont services & info',
      },
      {
        label: 'CDOT traveler information (COtrip)',
        href: 'https://www.cotrip.org/',
        external: true,
        note: 'US-36 and state highway conditions before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with constrained-city shuttle and long-carry experience for Boulder core and University Hill; HOA fluency for Louisville/Lafayette/Erie growth; foothills driveway surveys for west Boulder and canyon destinations; honest US-36 · CO-119 · CO-93 · Foothills Pkwy timing for cross-zone pairs; winter readiness November–March. Verify Colorado PUC household goods (HHG) permit for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
