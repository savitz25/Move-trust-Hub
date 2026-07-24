import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWaPack,
  WA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/washington/wa-shared';

/**
 * Whatcom County, WA — Bellingham / Canadian border / northern I-5
 * (not Seattle north-metro clone).
 */
export const whatcomCountyWaIntelligence: CountyIntelligencePack = finalizeWaPack({
  countySlug: 'whatcom',
  hubTitle: 'Whatcom County Moving Intelligence Hub',
  eyebrow: 'Whatcom · Bellingham, Canadian border & northern I-5 logistics',
  h1: 'Moving in Whatcom County: Bellingham Access, Border-Corridor Logistics & Northern I-5 Timing',
  heroOpener:
    'Whatcom County is Bellingham and Washington’s northern I-5 gateway — Western Washington University turnover, Fairhaven and downtown denseness, Guide Meridian and north-county growth, Lynden and Ferndale family product, and Blaine / Peace Arch border logistics that are not a Seattle suburb pattern. A Fairhaven walk-up, a WWU-adjacent apartment, a Sudden Valley driveway, and a Blaine border-edge ranch do not share truck access or crew skill. I-5, SR-539, SR-542, and US-11 links turn short map miles into billable hours when campus peaks, border backups, and wet-season weather collide. This hub is for people moving in Whatcom County — not a renamed Snohomish north-metro page or generic Puget Sound template.',
  heroCredibility:
    'Washington UTC household goods permit for intrastate moves · FMCSA for interstate · Curated listings',
  majorCorridors: 'I-5 · SR-539 · SR-542 · US-11 links',
  whatMakesDifferent: {
    title: 'What makes moving in Whatcom County different',
    intro:
      'These are Whatcom and Bellingham realities — northern I-5 scale, Canadian border adjacency, WWU lease waves, and Chuckanut / mountain-gateway edges — not Seattle high-rise elevators or eastside HOA belts.',
    bullets: [
      {
        title: 'Northern I-5 regional hub, not Seattle north-metro spillover',
        detail:
          'Crew density and same-week specialty options are thinner than King/Snohomish markets. Empty miles from Bellingham to Blaine, Lynden, or Mount Baker–highway edges matter more than Puget Sound micro-market volume.',
      },
      {
        title: 'Canadian border adjacency rewrites some “local” jobs',
        detail:
          'Blaine, Sumas, and Peace Arch–corridor households can involve cross-border timing, customs constraints on personal goods, and interstate/international authority questions. Clarify every address and whether any leg leaves the United States before quoting.',
      },
      {
        title: 'WWU and downtown Bellingham denseness is not county-wide product',
        detail:
          'Campus multifamily, Fairhaven walk-ups, and waterfront-edge staging diverge from Ferndale ranches, Lynden family tracts, and Sudden Valley driveways — not a single “Bellingham rate.”',
      },
      {
        title: 'I-5, SR-539, SR-542, and US-11 links rewrite portal time',
        detail:
          'Downtown ↔ Lynden, Fairhaven ↔ Ferndale, or SR-542 east pairs look local and still burn 30–60+ minutes at peak or border backup. Price portal-to-portal honestly.',
      },
      {
        title: 'Maritime wet season and mountain-gateway weather still matter',
        detail:
          'Prolonged rain softens lawns and shrinks curb; SR-542 / Mount Baker approaches add winter risk. Prefer early starts, mats, and flexible weather windows.',
      },
      {
        title: 'Cross-county north Sound and border pairs are routine',
        detail:
          'Households regularly move Whatcom ↔ Skagit, Whatcom ↔ Snohomish, or toward British Columbia. Clarify addresses so Washington UTC HHG vs FMCSA (and any cross-border rules) stay accurate when any leg leaves Washington.',
      },
      {
        title: 'Whatcom is not a Seattle clone',
        detail:
          'University-town scale, border logistics, and agricultural north-county product differ from King County towers and eastside master plans. Do not reuse Seattle high-rise or Bellevue HOA copy here.',
      },
      WA_REG_BULLET,
    ],
  },
  zonesHeading: 'Whatcom County access zones',
  zonesIntro:
    'Plan by downtown Bellingham / Fairhaven denseness, WWU campus belt, Guide Meridian / north Bellingham growth, Ferndale–Lynden north county, Blaine border corridor, and Sudden Valley / lake-edge product — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'bellingham-downtown-fairhaven',
      name: 'Downtown Bellingham, Fairhaven & waterfront denseness',
      shortName: 'Downtown / Fairhaven',
      neighborhoods: [
        'Downtown Bellingham',
        'Fairhaven',
        'Lettered Streets edges',
        'Waterfront / district edges',
        'Sehome edges',
      ],
      housingTypes: 'Walk-ups, denser multifamily, historic SFH, limited mid-rise',
      challenges: [
        'Limited curb, hills, and multi-flight stairs',
        'I-5 approach congestion into the core',
        'Tourism and event-day freeflow collapse near Fairhaven',
      ],
      moverTips:
        'Photo curb options and stair counts. Prefer mid-week early starts. Confirm elevator or dock rules on denser product before the crew day.',
      cityKeywords: [
        'bellingham',
        'fairhaven',
        'lettered streets',
        'sehome',
        'downtown bellingham',
      ],
    },
    {
      id: 'wwu-campus-belt',
      name: 'WWU campus belt & student multifamily',
      shortName: 'WWU / Campus',
      neighborhoods: [
        'Western Washington University edges',
        'College neighborhood',
        'South campus multifamily',
        'Bill McDonald Parkway corridor',
        'Sehome Hill edges',
      ],
      housingTypes: 'Student apartments, shared houses, walk-up multifamily',
      challenges: [
        'August and mid-year lease-end waves',
        'Tight guest parking and stair carries',
        'Self-pack inventory surprises on load day',
      ],
      moverTips:
        'Book campus windows early. Clarify student self-pack vs full-service scope. Confirm storage-in-transit when lease gaps and report dates do not align.',
      cityKeywords: [
        'wwu',
        'western washington',
        'college',
        'sehome',
        'bellingham',
      ],
    },
    {
      id: 'guide-meridian-north',
      name: 'Guide Meridian, Cordata & north Bellingham growth',
      shortName: 'Guide / Cordata',
      neighborhoods: [
        'Cordata',
        'Guide Meridian corridor',
        'Meridian edges',
        'North Bellingham growth tracts',
        'Bakerview corridor residential',
      ],
      housingTypes: 'Newer SFH, townhomes, garden apartments, retail-adjacent multifamily',
      challenges: [
        'SR-539 / Guide congestion at peak',
        'HOA rules on newer tracts',
        'Cross-zone pairs into Lynden or downtown',
      ],
      moverTips:
        'Collect HOA packets when applicable. Price SR-539 portal time honestly. Prefer early starts on retail-corridor blocks.',
      cityKeywords: [
        'cordata',
        'guide meridian',
        'meridian',
        'bakerview',
        'north bellingham',
      ],
    },
    {
      id: 'ferndale-lynden',
      name: 'Ferndale, Lynden & agricultural north county',
      shortName: 'Ferndale / Lynden',
      neighborhoods: [
        'Ferndale',
        'Lynden',
        'Everson edges',
        'Nooksack edges',
        'North county farm-edge residential',
      ],
      housingTypes: 'Family SFH, acreage edges, small-town grids, limited multifamily',
      challenges: [
        'Longer empty miles from Bellingham core crews',
        'Soft shoulders and rural driveway access',
        'Agricultural equipment and outbuilding inventories',
      ],
      moverTips:
        'Price empty miles honestly. Survey soft shoulders and gate access. Inventory barns and outbuildings separately from main-house scope.',
      cityKeywords: [
        'ferndale',
        'lynden',
        'everson',
        'nooksack',
      ],
    },
    {
      id: 'blaine-border',
      name: 'Blaine, Birch Bay & Canadian border corridor',
      shortName: 'Blaine / Border',
      neighborhoods: [
        'Blaine',
        'Birch Bay',
        'Peace Arch corridor residential',
        'Point Roberts access patterns (special case)',
        'US-11 / I-5 north links',
      ],
      housingTypes: 'Coastal and border-edge SFH, condos, seasonal and full-time mixes',
      challenges: [
        'Border backup timing that reshapes portal windows',
        'Cross-border household-goods rules when any leg enters Canada',
        'Longer empty miles and thinner crew density',
      ],
      moverTips:
        'Never assume a Blaine job is a simple “Bellingham local.” Clarify Canada vs US addresses, build border-delay buffers, and verify authority before deposit.',
      cityKeywords: [
        'blaine',
        'birch bay',
        'peace arch',
        'point roberts',
      ],
    },
    {
      id: 'sudden-valley-east',
      name: 'Sudden Valley, Lake Whatcom & SR-542 east edges',
      shortName: 'Sudden Valley / East',
      neighborhoods: [
        'Sudden Valley',
        'Lake Whatcom edges',
        'Geneva edges',
        'SR-542 / Mount Baker Highway corridor',
        'East county lake-edge lots',
      ],
      housingTypes: 'HOA community SFH, lake-edge lots, hillside driveways',
      challenges: [
        'HOA rules, narrow roads, and driveway grade',
        'SR-542 weather and longer portal runs',
        'Tree canopy and limited truck turn radius',
      ],
      moverTips:
        'Collect Sudden Valley / HOA packets early. Survey grade and truck length. Price SR-542 time and winter contingency for mountain-gateway pairs.',
      cityKeywords: [
        'sudden valley',
        'lake whatcom',
        'geneva',
        'mount baker',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Whatcom County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Campus spikes, hillside/HOA access, border timing, and empty miles separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'WWU lease waves & campus multifamily access',
        detail:
          'August and mid-year turnover stack stairs, parking limits, and short-notice demand near campus.',
      },
      {
        title: 'I-5 · SR-539 · SR-542 · US-11 portal time',
        detail:
          'Cross-county and north-county pairs burn hours even when map miles look short — border backups amplify risk.',
      },
      {
        title: 'HOA, lake-edge & hillside driveway geometry',
        detail:
          'Sudden Valley and Lake Whatcom product add packet lead time, grade, and truck-length limits.',
      },
      {
        title: 'Rural-edge empty miles & outbuildings',
        detail:
          'Ferndale, Lynden, and farm-edge inventories raise staging distance and labor beyond main-house scope.',
      },
      {
        title: 'Cross-border and multi-county authority complexity',
        detail:
          'Canada-linked or Skagit/Snohomish destinations raise compliance and travel soft costs.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,550+',
        note: 'Higher with campus peaks, stairs, or peak I-5 pairs',
      },
      {
        label: '2–3BR apartment, townhome, or modest SFH',
        value: '$1,200–$3,900+',
        note: 'HOA soft costs and corridor buffers trend up',
      },
      {
        label: '3–4+ BR / lake-edge / cross-zone SFH',
        value: '$2,400–$7,800+',
        note: 'Hillside access, border delays, and long north-county pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$190+/hr',
        note: 'Portal-to-portal; packing, HOA admin, and campus peaks scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Whatcom County move',
    intro:
      'WWU academic calendars, school years, wet winters, and border-traffic seasons reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease HOA hour rules, and reduce I-5 / Guide Meridian pain. Avoid month-end Fridays and the first two August campus weekends when possible.',
      },
      {
        title: 'Peak season: late May–mid-September (and August WWU move-in)',
        detail:
          'Student turnover and suburban SFH Saturdays fill first. Book 2–4 weeks ahead for peak weekends; campus-adjacent jobs may need earlier packing slots.',
      },
      {
        title: 'Wet season: rain, mud, and soft shoulders',
        detail:
          'November–March softens lawns, shrinks curb, and complicates rural-edge staging. Prefer flexible dates, mats, and early starts.',
      },
      {
        title: 'Border and employer-driven mid-month spikes',
        detail:
          'Cross-border and professional relocations often land mid-month. Confirm hard move-in dates, storage-in-transit, and whether any address is outside Washington early.',
      },
    ],
  },
  specialized: [
    {
      id: 'wwu-bellingham-access',
      title: 'WWU campus & Bellingham core access module',
      intro:
        'Whatcom estimates fail more often on campus lease spikes, curb limits, and stair product than on packing skill alone near Bellingham core.',
      bullets: [
        'Book August and mid-year campus windows early; do not assume last-minute crew availability.',
        'Photo stair counts, curb options, and elevator rules for near-campus multifamily.',
        'Price I-5 and Fairhaven approach time honestly for any core-linked pair.',
        'Clarify student self-pack vs full-service scope so inventory surprises do not explode on load day.',
        'Confirm storage-in-transit options when lease gaps and report dates do not align.',
      ],
    },
    {
      id: 'border-north-county',
      title: 'Border corridor & north-county logistics module',
      intro:
        'A single “Bellingham rate” collapses when campus denseness, agricultural north county, and Blaine border product diverge.',
      bullets: [
        'Survey by zone product — downtown walk-up, WWU apartment, Lynden SFH, Blaine border-edge, or Sudden Valley HOA — not by city name alone.',
        'Build border-delay buffers for Blaine / Peace Arch–corridor timing; never treat backups as free time.',
        'Clarify any Canada-linked leg and required authority before deposit — UTC in-state permission is not a cross-border passport.',
        'Price empty miles to Ferndale, Lynden, and east-lake destinations honestly.',
        'Verify Washington UTC household goods permit for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Whatcom County?',
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
              'Bellingham, Ferndale, Lynden, Blaine, Meridian, Mount Baker, Nooksack Valley, and other districts cover different address bands. Assignment is address-based — marketing names like Cordata or Fairhaven do not guarantee a campus.',
          },
          {
            title: 'Higher education anchors',
            detail:
              'Western Washington University dominates Bellingham multifamily demand and August turnover; Whatcom Community College and other programs add mid-year movement.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, OSPI data, and campus visits beat ranking screenshots alone. Confirm enrollment windows early when relocating mid-year.',
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
              'PeaceHealth St. Joseph and regional clinics anchor much of Whatcom care. Specialty referrals may route to Seattle or Vancouver BC networks — confirm insurance coverage.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Lynden, Blaine, or Sudden Valley to Bellingham campuses. Transfer records early; do not assume border-adjacent living means easy access to BC care without plan coverage.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core denseness, growth belts & north-county towns',
            detail:
              'Expect walk-ups and historic stock near downtown/Fairhaven; student multifamily near WWU; newer tracts along Guide Meridian; and small-town or acreage product in Ferndale, Lynden, and Blaine.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by zone and view/lake premium. Budget for HOA dues (Sudden Valley and planned tracts), wet-climate maintenance, and older-building repair risk.',
          },
          {
            title: 'HOA and building governance',
            detail:
              'Planned communities and some multifamily buildings control move hours, truck size, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Whatcom County areas fit whom',
        bullets: [
          {
            title: 'Downtown / Fairhaven urban lifestyle',
            detail:
              'Suits people prioritizing walkability, dining, and waterfront character — with curb, hills, and stair tradeoffs on move day.',
          },
          {
            title: 'Campus-adjacent living',
            detail:
              'Often appeals for WWU access and rentals — with lease-wave chaos and parking limits.',
          },
          {
            title: 'Ferndale / Lynden small-city and ag edges',
            detail:
              'Attracts households seeking space and quieter towns — with longer empty miles and rural access.',
          },
          {
            title: 'Blaine / Birch Bay border and coastal edges',
            detail:
              'Fits buyers chasing coastal or border-adjacent living — with backup timing and cross-border complexity.',
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
              'Higher education, healthcare, government, agriculture/food processing, logistics, and border-related employers concentrate demand. Some households also link to Skagit or lower BC work patterns.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-5, SR-539, and local arterials define peaks. Test drive routes from your candidate neighborhood at rush hour — Guide Meridian and I-5 interchanges are real bottlenecks.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Northern gateway character',
            detail:
              'Whatcom stacks university-town denseness, agricultural north county, border towns, and mountain/lake recreation — different from Seattle condo belts or inland eastern WA climate.',
          },
          {
            title: 'Climate',
            detail:
              'Maritime wet winters, mild summers, and quick access to alpine weather on SR-542. Plan outdoor staging for rain and soft ground much of the year.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Outdoors culture, campus energy, independent dining, and Canadian day-trip proximity set the tone. Visit in wet season and during campus move-in when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Whatcom County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Washington UTC household goods permit status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Whatcom County — official site',
        href: 'https://www.whatcomcounty.us/',
        external: true,
        note: 'County services & permits context',
      },
      {
        label: 'City of Bellingham — official site',
        href: 'https://cob.org/',
        external: true,
        note: 'City services & street-use context',
      },
      {
        label: 'Bellingham Public Schools',
        href: 'https://bellinghamschools.org/',
        external: true,
        note: 'Boundaries & calendars (city district)',
      },
      {
        label: 'WSDOT — traffic & road conditions',
        href: 'https://wsdot.com/travel/real-time/',
        external: true,
        note: 'I-5 / SR-539 / SR-542 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with Bellingham stair/curb and WWU lease-wave experience; Sudden Valley HOA fluency; honest I-5 · SR-539 · SR-542 · US-11 timing; border-corridor delay awareness for Blaine pairs. Verify Washington UTC household goods permit for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
