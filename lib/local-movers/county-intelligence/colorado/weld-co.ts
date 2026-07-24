import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeCoPack,
  CO_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/colorado/co-shared';

/**
 * Weld County, CO — Greeley / plains growth, energy & ag
 * (not Boulder constrained-city clone, not Fort Collins university clone).
 */
export const weldCountyCoIntelligence: CountyIntelligencePack = finalizeCoPack({
  countySlug: 'weld',
  hubTitle: 'Weld County Moving Intelligence Hub',
  eyebrow: 'Weld · Greeley growth, energy/ag corridors & north plains logistics',
  h1: 'Moving in Weld County: Greeley Access, Plains Growth & Energy/Ag Corridor Logistics',
  heroOpener:
    'Weld County is Greeley and the high-plains growth machine — energy and agricultural workforce turnover, US-85 and I-25 industrial-residential mix, Windsor–Firestone–Frederick family expansion, and long empty miles between farm-edge addresses that Front Range urban quotes underprice. A downtown Greeley multifamily unit, a west Greeley HOA two-story, a Windsor master-plan home, and a rural acreage with outbuildings do not share truck access or crew skill. I-25, US-34, US-85, and CO-257 corridors turn short map miles into billable hours when shift changes and commute peaks collide. This hub is for people moving in Weld County — not a renamed Boulder premium-city page or generic northern Colorado template.',
  heroCredibility:
    'Colorado PUC household goods (HHG) permit for intrastate moves · FMCSA for interstate · Greeley plains growth & energy/ag corridor awareness · Curated listings',
  majorCorridors: 'I-25 · US-34 · US-85 · CO-257 corridors',
  whatMakesDifferent: {
    title: 'What makes moving in Weld County different',
    intro:
      'These are Weld and Greeley realities — plains growth tracts, energy/ag workforce calendars, and long-distance rural access — not Boulder’s constrained core or Fort Collins’ CSU/Harmony university-tech pattern.',
    bullets: [
      {
        title: 'Energy, ag, and industrial workforce calendars reshape demand',
        detail:
          'Shift-based and project-based households create mid-week and short-notice moves that do not match pure Saturday family SFH assumptions. Confirm hard report dates early.',
      },
      {
        title: 'Greeley core multifamily vs west/south growth HOA product is not one job',
        detail:
          'Older grids and student-adjacent rentals near UNC need curb and stair surveys; west Greeley and southern growth tracts need HOA packets and cul-de-sac geometry.',
      },
      {
        title: 'I-25, US-34, US-85, and CO-257 rewrite portal time',
        detail:
          'Greeley ↔ Windsor, Firestone ↔ Evans, or US-85 north–south pairs look local and still burn 35–70+ minutes at peak or around industrial traffic. Price portal-to-portal honestly.',
      },
      {
        title: 'Rural acreage, long driveways, and outbuildings are routine',
        detail:
          'Eastern and northern Weld jobs often include shops, barns, and dirt/gravel approaches. Flat-rate “standard SFH” scopes fail when outbuilding inventories appear on load day.',
      },
      {
        title: 'I-25 growth towns are not Greeley clones',
        detail:
          'Windsor, Firestone, Frederick, Dacono, and Mead behave like planned suburban rings with HOA rules and Denver-north commute patterns — different from Greeley industrial-residential mix.',
      },
      {
        title: 'Weld is not Boulder and not Larimer university core',
        detail:
          'Plains energy/ag logistics and rapid I-25 town growth differ from Flatirons constrained parking and CSU Old Town spikes. Do not reuse those packs with a city rename.',
      },
      {
        title: 'Cross-county north Front Range and plains pairs are routine',
        detail:
          'Households regularly move Weld ↔ Larimer, Adams, Boulder County edges, or east toward Morgan. Clarify addresses so Colorado PUC HHG vs FMCSA interstate assumptions stay accurate when any leg leaves Colorado.',
      },
      CO_REG_BULLET,
    ],
  },
  zonesHeading: 'Weld County access zones',
  zonesIntro:
    'Plan by central Greeley, west/south Greeley growth, Evans–Garden City industrial edges, I-25 town ring (Windsor–Firestone–Frederick), and eastern/rural plains pockets — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'central-greeley',
      name: 'Central Greeley, downtown & UNC-adjacent product',
      shortName: 'Central Greeley',
      neighborhoods: [
        'Downtown Greeley',
        'UNC-adjacent multifamily',
        'Central grids',
        'Near-downtown SFH',
        'Campus-edge rentals',
      ],
      housingTypes: 'Older SFH, walk-ups, multifamily, student and workforce rentals',
      challenges: [
        'Stairs, limited curb, and mixed older stock',
        'Semester and workforce lease clusters',
        'US-34 / US-85 approach congestion into the core',
      ],
      moverTips:
        'Photo stairs and curb options. Prefer mid-week early starts. Confirm unit access type on multifamily before the crew day.',
      cityKeywords: [
        'greeley',
        'downtown greeley',
        'unc',
        'university of northern colorado',
        'campus',
      ],
    },
    {
      id: 'west-south-greeley-growth',
      name: 'West & south Greeley growth tracts & HOA product',
      shortName: 'West / south Greeley',
      neighborhoods: [
        'West Greeley HOA tracts',
        'South Greeley growth',
        'Promontory edges',
        'Family SFH corridors',
        'Newer townhome product',
      ],
      housingTypes: 'Master-planned HOA SFH, townhomes, larger family inventories',
      challenges: [
        'HOA gate lists, truck limits, and approved hours',
        'US-34 / CO-257 peak freeflow collapse',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Collect HOA packets first. Book peak Saturdays early. Share driveway and cul-de-sac photos with the estimate.',
      cityKeywords: [
        'west greeley',
        'south greeley',
        'promontory',
        'greeley hoa',
      ],
    },
    {
      id: 'evans-industrial-edges',
      name: 'Evans, Garden City edges & industrial-residential mix',
      shortName: 'Evans / industrial',
      neighborhoods: [
        'Evans',
        'Garden City edges',
        'US-85 industrial-adjacent residential',
        'South Greeley–Evans corridors',
        'Workforce multifamily',
      ],
      housingTypes: 'Multifamily, modest SFH, workforce rentals, mixed industrial-edge product',
      challenges: [
        'US-85 truck traffic and shift-change congestion',
        'Tight parking on multifamily product',
        'Cross-town pairs to west Greeley or I-25 towns burn clock',
      ],
      moverTips:
        'Build US-85 buffers around industrial peaks. Confirm parking and stair photos. Price empty miles to I-25 destinations honestly.',
      cityKeywords: [
        'evans',
        'garden city',
        'us-85',
        'us 85',
        'industrial',
      ],
    },
    {
      id: 'i25-town-ring',
      name: 'I-25 town ring: Windsor, Firestone, Frederick, Dacono & Mead edges',
      shortName: 'I-25 towns',
      neighborhoods: [
        'Windsor (Weld edges)',
        'Firestone',
        'Frederick',
        'Dacono',
        'Mead edges',
      ],
      housingTypes: 'Master-planned HOA SFH, townhomes, newer family inventories',
      challenges: [
        'I-25 peak congestion and construction pulses',
        'HOA rules on rapid-growth tracts',
        'Longer empty miles from Greeley yards on some jobs',
      ],
      moverTips:
        'Collect HOA packets first. Build I-25 buffers for any north–south pair. Confirm county-line nuances on Windsor addresses.',
      cityKeywords: [
        'windsor',
        'firestone',
        'frederick',
        'dacono',
        'mead',
      ],
    },
    {
      id: 'johnstown-milliken',
      name: 'Johnstown, Milliken & US-34 growth corridors',
      shortName: 'Johnstown / Milliken',
      neighborhoods: [
        'Johnstown',
        'Milliken',
        'US-34 corridors',
        'Crossroads commercial edges',
        'Southern Weld growth',
      ],
      housingTypes: 'Newer SFH, townhomes, HOA tracts, some multifamily',
      challenges: [
        'US-34 and I-25 interchange congestion',
        'HOA and new-construction access rules',
        'Commuter peaks toward Larimer and Adams',
      ],
      moverTips:
        'Price US-34 / I-25 portal time for Fort Collins or metro-linked pairs. Survey HOA constraints. Prefer early starts on retail-corridor days.',
      cityKeywords: [
        'johnstown',
        'milliken',
        'us-34',
        'us 34',
        'crossroads',
      ],
    },
    {
      id: 'eastern-rural-plains',
      name: 'Eastern & northern rural plains, acreage & outbuildings',
      shortName: 'Rural plains',
      neighborhoods: [
        'Eastern Weld acreage',
        'Northern rural pockets',
        'Farm and ranch edges',
        'Outbuilding-heavy properties',
        'Small plains towns',
      ],
      housingTypes: 'Rural SFH, acreage, farmhouses, shops and outbuildings',
      challenges: [
        'Long empty miles and limited crew density',
        'Dirt/gravel drives and soft-shoulder staging',
        'Outbuilding inventories and equipment access',
      ],
      moverTips:
        'Inventory outbuildings explicitly. Confirm driveway surface and truck length. Price travel time and weather risk honestly — do not use Greeley city flat rates.',
      cityKeywords: [
        'rural',
        'acreage',
        'farm',
        'ranch',
        'plains',
        'outbuilding',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Weld County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. HOA friction, industrial-corridor timing, rural empty miles, and I-25 / US-85 / US-34 portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'HOA growth tracts & new-construction access rules',
        detail:
          'West Greeley and I-25 towns add packet lead time and can force smaller trucks or delayed load windows.',
      },
      {
        title: 'I-25 · US-34 · US-85 · CO-257 congestion',
        detail:
          'Cross-county and Greeley–town-ring pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Rural acreage, long drives & outbuildings',
        detail:
          'Eastern/northern plains jobs add travel, staging risk, and inventory volume that city flat rates underprice.',
      },
      {
        title: 'Workforce multifamily & stairs in core Greeley / Evans',
        detail:
          'Older multifamily and tight parking raise labor before packing skill matters.',
      },
      {
        title: 'Weather & multi-county north Front Range pairs',
        detail:
          'Wind, snow, and ice slow exterior work; Larimer, Adams, and Boulder County destinations raise staging distance and authority complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,700+',
        note: 'Higher with stairs, industrial-corridor peaks, or long rural pairs',
      },
      {
        label: '2–3BR apartment, townhome, or modest SFH',
        value: '$1,300–$3,800+',
        note: 'HOA soft costs and I-25/US-85 buffers trend up',
      },
      {
        label: '3–4+ BR / acreage / cross-zone SFH',
        value: '$2,500–$7,500+',
        note: 'Outbuildings and long plains empty miles price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$180+/hr',
        note: 'Portal-to-portal; packing, HOA admin, and rural travel scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Weld County move',
    intro:
      'School calendars, summer family demand, energy/ag project pulses, and plains winter weather reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease HOA hour rules, and reduce I-25 / US-85 / US-34 pain. Avoid month-end Fridays when leases and shift-change clusters collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family SFH Saturdays in growth towns and Greeley lease turnover fill first. Book 2–4 weeks ahead for peak weekends.',
      },
      {
        title: 'Winter: wind, snow, and plains freeze–thaw',
        detail:
          'November–March adds curb shrinkage, icy rural drives, and weather cancellations. Prefer flexible dates, early starts, and contingency for soft shoulders and ice.',
      },
      {
        title: 'Industrial and project-based workforce pulses',
        detail:
          'Energy, construction, and ag-season calendars create short-notice mid-week spikes. Confirm hard move-in dates and storage-in-transit early.',
      },
    ],
  },
  specialized: [
    {
      id: 'plains-growth-weld',
      title: 'Plains growth, HOA & I-25 town-ring module',
      intro:
        'Weld estimates fail more often on HOA packets, I-25 timing, and town-ring vs Greeley product mismatch than on packing skill alone.',
      bullets: [
        'Survey by zone — Greeley core, west growth, Evans industrial edges, or I-25 towns — not by “Weld” alone.',
        'Collect HOA packets for Windsor, Firestone, Frederick, Johnstown, and west Greeley tracts.',
        'Price portal-to-portal time for any pair that rides I-25, US-34, US-85, or CO-257 at peak.',
        'Confirm county-line addresses (especially Windsor) so estimates and authority assumptions stay accurate.',
        'Book peak Saturdays early for family growth-town product May–August.',
      ],
    },
    {
      id: 'rural-energy-ag-weld',
      title: 'Rural acreage, outbuildings & energy/ag workforce module',
      intro:
        'Plains and workforce jobs break city flat rates when travel, outbuildings, and shift calendars dominate.',
      bullets: [
        'Inventory shops, barns, and detached structures explicitly on the survey.',
        'Confirm driveway surface, length, and soft-shoulder staging before sending full-size trucks.',
        'Align mid-week workforce moves to report dates — not only preferred Saturdays.',
        'Build weather contingency for open plains wind and winter ice on rural approaches.',
        'Price empty miles from Greeley or I-25 staging yards honestly for eastern/northern addresses.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Weld County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, jobs, and commute realism — then verify on district and hospital sites. No single ranking captures town fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Greeley-Evans District 6, Windsor-area districts, and multiple smaller systems cover Weld municipalities and growth towns. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Higher education presence',
            detail:
              'University of Northern Colorado in Greeley shapes some housing demand and cultural life. Align leases with academic calendars if campus-adjacent.',
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
              'Banner and UCHealth-affiliated campuses and other providers anchor care in Greeley and nearby Front Range cities. Some specialty care pulls toward Fort Collins or Denver metro.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from your target town to preferred campuses — US-34, US-85, and I-25 realities change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Greeley mix, I-25 town growth & rural acreage',
            detail:
              'Expect older core multifamily and SFH in Greeley; HOA growth west and south; master-planned product in Windsor–Firestone–Frederick; and acreage with outbuildings on the plains.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary from Greeley workforce product to I-25 town family SFH and rural land packages. Budget for HOA dues, well/septic on rural lots, and insurance on higher-value inventories.',
          },
          {
            title: 'HOA and multifamily governance',
            detail:
              'Associations and apartment managers often control move hours, truck size, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Weld areas fit whom',
        bullets: [
          {
            title: 'Central Greeley urban/near-urban mix',
            detail:
              'Suits people prioritizing value, services, and UNC-adjacent living — with curb, stair, and multifamily logistics.',
          },
          {
            title: 'West/south Greeley family growth',
            detail:
              'Often appeals for newer housing stock — with HOA packets and US-34 timing.',
          },
          {
            title: 'I-25 town-ring suburban lifestyle',
            detail:
              'Attracts households seeking planned amenities and Front Range commute options — with I-25 congestion realism.',
          },
          {
            title: 'Rural plains and acreage living',
            detail:
              'Fits buyers chasing space, shops, and agricultural adjacency — with long-driveway access and weather exposure on move day.',
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
              'Energy and related services, agriculture and food processing, logistics and manufacturing along US-85/I-25, healthcare, education (UNC), and commuters into Larimer or Denver-north job centers.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-25, US-34, US-85, and CO-257 peaks are real. Test-drive peak routes before choosing solely on rent or purchase price — especially growth-town to metro pairs.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'High-plains growth with industrial and ag roots',
            detail:
              'Weld stacks rapid residential expansion, energy/ag employment, and wide-open land — different from Boulder’s constrained premium city or Fort Collins’ university-tech brand.',
          },
          {
            title: 'Climate',
            detail:
              'High-plains wind, hot summers, cold snowy winters, and rapid shoulder-season swings. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Greeley services and events, growth-town family sports calendars, and rural community rhythms coexist. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Weld County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Colorado PUC household goods (HHG) permit status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Weld County — official site',
        href: 'https://www.weld.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Greeley',
        href: 'https://greeleygov.com/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'Town of Windsor',
        href: 'https://www.windsorgov.com/',
        external: true,
        note: 'Windsor services & info',
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
    'Prefer crews with HOA growth-town experience for Windsor–Firestone–Frederick and west Greeley; rural acreage and outbuilding fluency for eastern/northern plains; honest I-25 · US-34 · US-85 · CO-257 timing for cross-zone pairs; industrial-corridor awareness for Evans/US-85 edges; winter readiness November–March. Verify Colorado PUC household goods (HHG) permit for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
