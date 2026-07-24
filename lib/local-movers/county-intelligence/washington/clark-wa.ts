import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWaPack,
  WA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/washington/wa-shared';

/**
 * Clark County, WA — Vancouver WA / Portland-OR adjacent cross-border
 * (NOT Seattle spillover).
 */
export const clarkCountyWaIntelligence: CountyIntelligencePack = finalizeWaPack({
  countySlug: 'clark',
  hubTitle: 'Clark County Moving Intelligence Hub',
  eyebrow: 'Clark · Vancouver WA, Portland-adjacent cross-border & I-5 / I-205 logistics',
  h1: 'Moving in Clark County: Vancouver Access, Portland Cross-Border Logistics & I-5 / I-205 Timing',
  heroOpener:
    'Clark County is Vancouver, Washington and the Portland-adjacent south-bank market — not Seattle spillover. Downtown Vancouver and waterfront denseness, Cascade Park and east-county HOA product, Camas–Washougal mill-town and family stock, Battle Ground north growth, and daily I-5 / I-205 bridge pairs into Multnomah County OR rewrite “local” estimates that ignore interstate authority and bridge congestion. A Vancouver waterfront condo COI, a Cascade Park two-story HOA, a Camas hillside driveway, and a Portland-side unload do not share truck access or crew skill. I-5, I-205, SR-14, and SR-500 turn short map miles into billable hours when bridge peaks and lease calendars collide. This hub is for people moving in Clark County — not a renamed King County page or generic western Washington template.',
  heroCredibility:
    'Washington UTC household goods permit for intrastate moves · FMCSA for interstate · Curated listings',
  majorCorridors: 'I-5 · I-205 · SR-14 · SR-500',
  whatMakesDifferent: {
    title: 'What makes moving in Clark County different',
    intro:
      'These are Clark County and Vancouver WA realities — Portland-metro adjacency, Columbia River bridge congestion, and Washington–Oregon authority splits — not Seattle high-rise elevators or Puget Sound ferry logistics.',
    bullets: [
      {
        title: 'Portland-OR adjacent cross-border is the defining logistics fact',
        detail:
          'Many “local” Vancouver ↔ Portland pairs cross state lines. Washington UTC household goods permission alone does not authorize Oregon delivery — FMCSA interstate authority is required when any leg leaves Washington.',
      },
      {
        title: 'I-5 and I-205 bridges rewrite portal time every weekday',
        detail:
          'Vancouver ↔ downtown Portland, Cascade Park ↔ Beaverton-edge, or SR-14 east pairs look short on a map and still burn 45–90+ minutes at peak. Price portal-to-portal honestly, not odometer optimism.',
      },
      {
        title: 'Clark is not Seattle spillover',
        detail:
          'Housing product, commute culture, and mover density track the Portland metro more than King/Snohomish patterns. Do not reuse Puget Sound ferry-adjacent or Seattle tower copy here.',
      },
      {
        title: 'Vancouver core denseness vs east-county HOA product is not one job',
        detail:
          'Downtown and waterfront multifamily need elevator packets and curb surveys; Cascade Park, Camas, and north-county planned tracts need HOA rules and longer driveway staging — not a single “Vancouver rate.”',
      },
      {
        title: 'Camas–Washougal and north Clark growth add micro-markets',
        detail:
          'Mill-town grids, hillside lots, and Battle Ground / Ridgefield family product diverge from Hazel Dell apartments and Salmon Creek corridors a few miles west.',
      },
      {
        title: 'Rainy-season mud and shoulder-season congestion still matter',
        detail:
          'Maritime-influenced winters soften lawns and shrink curb; summer construction and bridge work can erase staging overnight. Prefer early starts and flexible weather windows.',
      },
      {
        title: 'Multi-county WA and OR pairs are routine',
        detail:
          'Households regularly move Clark ↔ Cowlitz, Clark ↔ Multnomah/Washington/Clackamas OR, or north toward Thurston. Clarify every address so UTC vs FMCSA assumptions stay accurate.',
      },
      WA_REG_BULLET,
    ],
  },
  zonesHeading: 'Clark County access zones',
  zonesIntro:
    'Plan by Vancouver waterfront / downtown denseness, Hazel Dell–Salmon Creek central belts, Cascade Park / east Vancouver HOA growth, Camas–Washougal east edge, and Battle Ground / Ridgefield north corridors — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'vancouver-core-waterfront',
      name: 'Downtown Vancouver, waterfront & core denseness',
      shortName: 'Vancouver core',
      neighborhoods: [
        'Downtown Vancouver',
        'Waterfront / The Waterfront',
        'Uptown Village edges',
        'Arnada edges',
        'Esther Short edges',
      ],
      housingTypes: 'Mid-rise condo, lofts, walk-ups, denser multifamily',
      challenges: [
        'Elevator reservations, building COIs, and limited legal curb',
        'I-5 bridge approach congestion into the core',
        'Event and waterfront-activation freeflow collapse',
      ],
      moverTips:
        'Book elevators and COIs in writing before the crew day. Prefer mid-week early freight windows. Photo docks and street-staging options.',
      cityKeywords: [
        'vancouver',
        'downtown vancouver',
        'waterfront',
        'uptown village',
        'arnada',
        'esther short',
      ],
    },
    {
      id: 'hazel-dell-salmon-creek',
      name: 'Hazel Dell, Salmon Creek & central north Vancouver',
      shortName: 'Hazel Dell / Salmon Creek',
      neighborhoods: [
        'Hazel Dell',
        'Salmon Creek',
        'Felida edges',
        'Lake Shore edges',
        'Highway 99 corridor residential',
      ],
      housingTypes: 'Garden apartments, townhomes, mid-century SFH, mixed multifamily',
      challenges: [
        'I-5 / SR-500 approach timing',
        'Tight guest parking on multifamily stacks',
        'Cross-zone pairs into Cascade Park or Portland',
      ],
      moverTips:
        'Survey stair counts and parking rules on apartments. Price I-5 portal time for any Portland unload. Prefer early starts on Highway 99-adjacent blocks.',
      cityKeywords: [
        'hazel dell',
        'salmon creek',
        'felida',
        'lake shore',
        'vancouver',
      ],
    },
    {
      id: 'cascade-park-east',
      name: 'Cascade Park, east Vancouver & planned HOA tracts',
      shortName: 'Cascade Park / East',
      neighborhoods: [
        'Cascade Park',
        'Fisher’s Landing edges',
        'Mountain View edges',
        'East Vancouver HOA tracts',
        '162nd / 192nd corridor residential',
      ],
      housingTypes: 'Two-story HOA SFH, townhomes, planned-community product',
      challenges: [
        'HOA gates, truck limits, and approved move hours',
        'I-205 / SR-14 approach congestion',
        'School-calendar Saturday demand May–August',
      ],
      moverTips:
        'Collect HOA packets early. Confirm truck length and mat rules. Build I-205 buffers for any west-county or Oregon pair.',
      cityKeywords: [
        'cascade park',
        "fisher's landing",
        'fishers landing',
        'mountain view',
        'east vancouver',
      ],
    },
    {
      id: 'camas-washougal',
      name: 'Camas, Washougal & SR-14 east edge',
      shortName: 'Camas / Washougal',
      neighborhoods: [
        'Camas',
        'Washougal',
        'Prune Hill edges',
        'Camas downtown grids',
        'SR-14 corridor residential',
      ],
      housingTypes: 'Historic mill-town SFH, hillside lots, newer planned tracts',
      challenges: [
        'Hillside driveways and grade on Prune Hill–type product',
        'SR-14 congestion and longer empty miles from west Clark',
        'Mixed older curb and newer HOA rules',
      ],
      moverTips:
        'Survey driveway grade and turn radius. Price SR-14 portal time from Vancouver core. Photo stair and porch geometry on older Camas stock.',
      cityKeywords: [
        'camas',
        'washougal',
        'prune hill',
      ],
    },
    {
      id: 'battle-ground-north',
      name: 'Battle Ground, Ridgefield & north Clark growth',
      shortName: 'Battle Ground / North',
      neighborhoods: [
        'Battle Ground',
        'Ridgefield',
        'La Center edges',
        'North Clark acreage edges',
        'I-5 north corridor residential',
      ],
      housingTypes: 'Family SFH, acreage edges, newer subdivisions, limited multifamily',
      challenges: [
        'Longer empty miles from Vancouver waterfront crews',
        'Soft shoulders and rural-edge driveway access',
        'I-5 peak timing for any Portland-linked pair',
      ],
      moverTips:
        'Price empty miles honestly. Survey soft shoulders and gate access on acreage. Confirm whether the unload is still in Washington before quoting UTC-only authority.',
      cityKeywords: [
        'battle ground',
        'ridgefield',
        'la center',
        'north clark',
      ],
    },
    {
      id: 'or-bridge-pairs',
      name: 'Columbia bridge pairs & Portland-side unload edges',
      shortName: 'Bridge / OR pairs',
      neighborhoods: [
        'I-5 Interstate Bridge approaches',
        'I-205 Glenn Jackson approaches',
        'Hayden Island–adjacent patterns',
        'Portland north/northeast unload edges',
        'Portland westside reverse-commute patterns',
      ],
      housingTypes: 'WA load + OR unload mixes; condo, SFH, and multifamily on either bank',
      challenges: [
        'Interstate authority required when any address is in Oregon',
        'Bridge congestion that can double portal time',
        'Different curb/permit norms by city and state',
      ],
      moverTips:
        'Treat every Oregon address as interstate. Verify FMCSA USDOT/MC before deposit. Build generous bridge buffers and prefer mid-week early windows.',
      cityKeywords: [
        'portland',
        'interstate bridge',
        'i-5',
        'i-205',
        'hayden island',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Clark County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Bridge congestion, elevator/HOA soft costs, hillside access, and interstate authority complexity separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'I-5 · I-205 bridge congestion & portal time',
        detail:
          'Cross-river and cross-county pairs burn hours even when map miles look short — the dominant Clark cost surprise.',
      },
      {
        title: 'Elevators, docks & building COIs',
        detail:
          'Vancouver waterfront and core multifamily add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'HOA gates, truck limits & approved hours',
        detail:
          'Cascade Park and east-county planned tracts add packet lead time and can force smaller trucks.',
      },
      {
        title: 'Camas hillside grade & rural-edge driveways',
        detail:
          'East and north Clark lots add carry distance and truck-access friction that flat-rate optimism underprices.',
      },
      {
        title: 'Interstate WA–OR empty miles & authority',
        detail:
          'Any Portland-metro unload raises staging distance and requires FMCSA — not UTC-only — compliance.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access, WA-only)',
        value: '$500–$1,700+',
        note: 'Higher with elevators, stairs, or peak bridge pairs',
      },
      {
        label: '2–3BR condo, townhome, or modest SFH',
        value: '$1,400–$4,200+',
        note: 'HOA soft costs and I-5/I-205 buffers trend up',
      },
      {
        label: '3–4+ BR / hillside / cross-river SFH',
        value: '$2,800–$8,500+',
        note: 'Bridge peaks and interstate Portland pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$120–$200+/hr',
        note: 'Portal-to-portal; packing, COI/HOA admin, and bridge time scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Clark County move',
    intro:
      'Lease cycles, school calendars, bridge construction seasons, and wet winters reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease HOA hour rules, and reduce I-5 / I-205 bridge pain. Avoid month-end Fridays when leases and elevators collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Apartment turnover and family SFH Saturdays fill first. Book 2–4 weeks ahead for peak weekends and waterfront elevator slots.',
      },
      {
        title: 'Wet season: mud, curb shrinkage, and soft shoulders',
        detail:
          'November–March softens lawns and complicates rural-edge staging. Prefer flexible dates, mats, and early starts.',
      },
      {
        title: 'Cross-border and employer-driven mid-month spikes',
        detail:
          'Portland-metro professional relocations often land mid-month. Confirm hard move-in dates, temporary housing, and storage-in-transit early — and whether either address is in Oregon.',
      },
    ],
  },
  specialized: [
    {
      id: 'wa-or-cross-border',
      title: 'Washington–Oregon cross-border logistics module',
      intro:
        'Clark estimates fail more often on bridge timing and interstate authority mistakes than on packing skill alone.',
      bullets: [
        'Treat any Oregon address as interstate — verify FMCSA USDOT (and usually MC) before deposit.',
        'Match the legal name on the estimate to Washington UTC permitted-mover tools for WA-only legs.',
        'Build generous I-5 and I-205 bridge buffers; peak reverse-commute and construction can double portal time.',
        'Do not quote a single “Portland–Vancouver local rate” without confirming both addresses and authority.',
        'Clarify Multnomah / Washington / Clackamas OR vs Clark WA on every written estimate.',
        'Ask about parking permits and curb rules on both banks — norms differ by city and state.',
      ],
    },
    {
      id: 'vancouver-hoa-waterfront',
      title: 'Vancouver waterfront & east-county HOA module',
      intro:
        'A single “Vancouver rate” collapses when waterfront elevators and Cascade Park HOA product diverge a few miles apart.',
      bullets: [
        'Collect building COI, elevator reservations, and dock rules for waterfront and downtown multifamily.',
        'Collect HOA packets for Cascade Park, Fisher’s Landing edges, and newer east tracts.',
        'Survey Camas hillside grade separately from Hazel Dell garden-apartment stairs.',
        'Price SR-14 and SR-500 approach time honestly for east–west pairs inside the county.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Clark County?',
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
              'Vancouver, Evergreen, Battle Ground, Camas, Washougal, Ridgefield, Hockinson, and other districts cover different address bands. Assignment is address-based — marketing names like Cascade Park do not guarantee a campus.',
          },
          {
            title: 'Cross-border school assumptions',
            detail:
              'Living in Washington and working in Oregon does not auto-enroll students in Oregon districts. Confirm WA district boundaries and any choice programs early.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, OSPI data, and campus visits beat ranking screenshots alone.',
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
              'PeaceHealth Southwest and other Clark campuses anchor local care; many households also use Portland-metro specialty networks. Confirm insurance networks and cross-state coverage rules.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times including bridge delays to preferred campuses. Transfer records early; do not assume “nearby Portland hospital” is a short hop at 5 p.m.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Waterfront denseness, central belts & east growth',
            detail:
              'Expect condo and multifamily near downtown/waterfront; mixed SFH and apartments through Hazel Dell–Salmon Creek; two-story HOA product in Cascade Park; and hillside or mill-town character in Camas–Washougal.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by zone and Oregon-commute premium. Budget for HOA/condo dues, bridge-toll/time costs if commuting south, and older-building repair risk.',
          },
          {
            title: 'HOA and building governance',
            detail:
              'Planned-community associations and multifamily buildings control move hours, truck size, elevators, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Clark County areas fit whom',
        bullets: [
          {
            title: 'Downtown / waterfront urban lifestyle',
            detail:
              'Suits people prioritizing walkability and Portland proximity — with elevator, parking, and bridge-timing tradeoffs.',
          },
          {
            title: 'Hazel Dell–Salmon Creek practical living',
            detail:
              'Often appeals for I-5 access and mixed housing stock — with multifamily parking limits and arterial congestion.',
          },
          {
            title: 'Cascade Park / east Vancouver family product',
            detail:
              'Attracts households seeking planned-community amenities — with HOA rules and I-205 timing.',
          },
          {
            title: 'Camas–Washougal or north Clark',
            detail:
              'Fits buyers chasing small-city character, hillside lots, or more space — with longer empty miles and different commute math.',
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
              'Local healthcare, government, logistics, and manufacturing matter — but a large share of Clark households reverse-commute or work hybrid into the Portland metro.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-5 and I-205 bridge peaks define daily life for many. Test drive peak routes before choosing solely on rent or purchase price. WA no-income-tax vs OR tax structure is a household finance decision — not a moving-day logistics shortcut.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Portland-metro living on the Washington bank',
            detail:
              'Clark offers Oregon-adjacent urban amenities with Washington rules, schools, and tax structure — different from Seattle spillover suburbs or inland eastern WA hubs.',
          },
          {
            title: 'Climate',
            detail:
              'Maritime-influenced wet winters and mild-to-warm summers. Plan outdoor staging for rain and soft ground November–March.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Vancouver waterfront revitalization, east-county family growth, and easy Portland dining/arts access set the tone. Visit at peak bridge times when deciding where to live.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Clark County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Washington UTC household goods permit status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Clark County — official site',
        href: 'https://clark.wa.gov/',
        external: true,
        note: 'County services & permits context',
      },
      {
        label: 'City of Vancouver WA — official site',
        href: 'https://www.cityofvancouver.us/',
        external: true,
        note: 'City services & street-use context',
      },
      {
        label: 'Vancouver Public Schools',
        href: 'https://vansd.org/',
        external: true,
        note: 'Boundaries & calendars (one of several districts)',
      },
      {
        label: 'WSDOT — traffic & road conditions',
        href: 'https://wsdot.com/travel/real-time/',
        external: true,
        note: 'I-5 / I-205 / SR-14 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with Vancouver waterfront elevator/COI experience; Cascade Park HOA fluency; honest I-5 · I-205 · SR-14 · SR-500 timing; proven WA–OR interstate authority for any Portland-side leg. Verify Washington UTC household goods permit for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
