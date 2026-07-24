import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaPack,
  VA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-shared';

/**
 * Richmond City, VA — independent city (capital urban core).
 * Fan/Museum District, row homes, downtown — NOT Henrico clone, NOT Richmond County.
 */
export const richmondCityVaIntelligence: CountyIntelligencePack = finalizeVaPack({
  countySlug: 'richmond',
  hubTitle: 'Richmond City Moving Intelligence Hub',
  eyebrow: 'Richmond City · capital urban core · Fan, Museum District & row-home logistics',
  h1: 'Moving in Richmond City: Fan Row Homes, Museum District Access & Capital-Core Logistics',
  heroOpener:
    'Richmond is an independent city — the Virginia capital’s urban core — not a suburb and not Richmond County on the Northern Neck. Fan and Museum District row homes with narrow streets and long carries, Shockoe and downtown multi-story stock, Church Hill hills and stairs, and riverside warehouse conversions do not share truck access with Henrico’s Short Pump HOA villages. I-95, I-64, I-195, the Downtown Expressway, and the Broad Street corridor rewrite estimates that treat the city like a county subdivision. This hub is for people moving in Richmond City — not a renamed Henrico page or generic “greater Richmond” template.',
  heroCredibility:
    'Virginia DMV household goods / motor-carrier authority for intrastate moves · FMCSA for interstate · Capital-core curb & row-home awareness · Curated listings',
  majorCorridors: 'I-95 · I-64 · I-195 · Downtown Expressway · Broad Street corridor',
  whatMakesDifferent: {
    title: 'What makes moving in Richmond City different',
    intro:
      'These are Richmond City realities — row-home curb limits, capital-core density, hills, and independent-city address lines — not Henrico west-end HOA rules or Chesterfield master-planned tracts.',
    bullets: [
      {
        title: 'Fan and Museum District row homes are the signature job',
        detail:
          'Narrow blocks, limited legal truck length, stoops, multi-flight stairs, and long carries define near-core moves. Photos of curb and stair counts beat generic “2BR condo” assumptions.',
      },
      {
        title: 'Downtown, Shockoe, and Scott’s Addition mix elevators and industrial conversions',
        detail:
          'Lofts, mid-rises, and warehouse product often need COI, freight elevators, timed windows, and tight alley staging. Building packets in writing prevent day-of refusals.',
      },
      {
        title: 'Hills, stairs, and older stock compound labor',
        detail:
          'Church Hill, Oregon Hill edges, and many pre-war buildings add elevation and stair flights that flat suburban quotes miss. Survey elevation and landing sizes.',
      },
      {
        title: 'I-95 / I-64 / Downtown Expressway define portal time',
        detail:
          'City ↔ Henrico west end, city ↔ Chesterfield, or northside ↔ southside pairs look short and still burn 30–65+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Capital and university calendars reshape demand',
        detail:
          'State government, VCU, and downtown employers create mid-month apartment turns and hard report dates that compete with weekend family demand in the near-west end.',
      },
      {
        title: 'Independent city — not Henrico, not Richmond County',
        detail:
          'Mailing labels often say “Richmond” for Henrico addresses. Confirm the independent city vs surrounding counties on every estimate so drive time and Virginia DMV frameworks stay accurate.',
      },
      {
        title: 'Event and street-closure friction is real',
        detail:
          'Festivals, sports, and downtown events can erase curb space. Check calendars and prefer mid-week early starts for Fan/downtown pairs.',
      },
      VA_REG_BULLET,
    ],
  },
  zonesHeading: 'Richmond City access zones',
  zonesIntro:
    'Plan by Fan/Museum District, downtown–Shockoe–Scott’s Addition, Church Hill/east end, near-west end/Carytown edges, and southside city neighborhoods — curb rules and housing stock change block by block.',
  zones: [
    {
      id: 'fan-museum',
      name: 'The Fan, Museum District & near-west historic grid',
      shortName: 'Fan / Museum District',
      neighborhoods: [
        'The Fan',
        'Museum District',
        'Monument Avenue edges',
        'Near-west historic blocks',
        'Virginia Museum of Fine Arts edges',
      ],
      housingTypes: 'Row homes, multi-story walk-ups, divided houses, denser SFH',
      challenges: [
        'Narrow streets and limited truck length',
        'Long stair carries and stoops',
        'Permit/event curb competition',
      ],
      moverTips:
        'Photo both curb options and full stair flights. Prefer mid-week early starts. Confirm parking rules and any loading permits in writing.',
      cityKeywords: ['fan', 'museum district', 'monument avenue', 'richmond fan', 'near west'],
    },
    {
      id: 'downtown-shockoe-scotts',
      name: 'Downtown, Shockoe Bottom & Scott’s Addition',
      shortName: 'Downtown / Shockoe / Scott’s',
      neighborhoods: [
        'Downtown',
        'Shockoe Bottom',
        'Shockoe Slip',
        "Scott's Addition",
        'Jackson Ward edges',
      ],
      housingTypes: 'Lofts, mid-rises, warehouse conversions, elevator multifamily',
      challenges: [
        'COI and freight elevator reservations',
        'Scarce curb and alley staging',
        'I-95 / I-64 / Expressway approach congestion',
      ],
      moverTips:
        'Collect building packets early. Reserve elevators mid-week mornings. Photo dock, alley, and height-clearance options.',
      cityKeywords: ['downtown richmond', 'shockoe', "scott's addition", 'jackson ward', 'canal walk'],
    },
    {
      id: 'church-hill-east',
      name: 'Church Hill, east end & river-adjacent neighborhoods',
      shortName: 'Church Hill / East',
      neighborhoods: ['Church Hill', 'Union Hill', 'Fulton edges', 'East End city neighborhoods', 'Rocketts Landing edges'],
      housingTypes: 'Historic SFH, renovated row stock, hills, some new multifamily',
      challenges: [
        'Steep grades and stair counts',
        'Narrow historic streets',
        'Mix of renovation dust and fragile inventories',
      ],
      moverTips:
        'Survey grade and turn radius. Plan extra labor for elevation. Protect floors and stair rails on older stock.',
      cityKeywords: ['church hill', 'union hill', 'fulton', 'east end richmond', 'rocketts'],
    },
    {
      id: 'carytown-near-west',
      name: 'Carytown, near-west commercial & residential mix',
      shortName: 'Carytown / Near-west',
      neighborhoods: ['Carytown', 'Byrd Park edges', 'Near-west apartments', 'Cary Street corridor'],
      housingTypes: 'Walk-ups, small multifamily, denser SFH, above-retail units',
      challenges: [
        'Retail curb competition on Cary Street',
        'Stairs and limited elevators',
        'Weekend shopper congestion',
      ],
      moverTips:
        'Avoid peak retail hours when flexible. Confirm unit access path (stairs vs elevator). Photo loading gaps between storefronts.',
      cityKeywords: ['carytown', 'byrd park', 'cary street', 'near west richmond'],
    },
    {
      id: 'northside-city',
      name: 'Northside Richmond city neighborhoods',
      shortName: 'Northside',
      neighborhoods: ['Northside', 'Battery Park edges', 'Ginter Park edges', 'Chamberlayne city edges'],
      housingTypes: 'Older SFH, some multifamily, tree-canopy lots',
      challenges: [
        'Canopy clearance and narrower residential streets',
        'City/Henrico line confusion on edges',
        'Basements and multi-story carries',
      ],
      moverTips:
        'Confirm independent city vs Henrico address. Photo overhead clearance. Inventory basements carefully.',
      cityKeywords: ['northside richmond', 'ginter park', 'battery park', 'chamberlayne'],
    },
    {
      id: 'southside-city',
      name: 'Southside Richmond city (Manchester, Forest Hill edges)',
      shortName: 'Southside city',
      neighborhoods: ['Manchester', 'Forest Hill', 'Woodland Heights edges', 'Southside city corridors'],
      housingTypes: 'Older SFH, renovated bungalows, multifamily, industrial-edge lofts',
      challenges: [
        'James River / bridge timing into core',
        'Mix of quiet residential and industrial edges',
        'I-95 south approaches',
      ],
      moverTips:
        'Build bridge and I-95 buffer for core-linked pairs. Clarify city southside vs Chesterfield addresses. Photo driveway and curb options.',
      cityKeywords: ['manchester', 'forest hill', 'woodland heights', 'southside richmond'],
    },
  ],
  costDrivers: {
    title: 'What drives Richmond City moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Row-home stairs, elevator COI friction, and freeway portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Row-home stairs, stoops & long carries',
        detail: 'Fan/Museum District access labor often dominates packing skill on the bill.',
      },
      {
        title: 'Elevator buildings & building COI packets',
        detail: 'Downtown and Scott’s Addition multifamily soft costs add scheduling and crew idle time.',
      },
      {
        title: 'I-95 / I-64 / Downtown Expressway congestion',
        detail: 'City–suburb and cross-city pairs burn portal-to-portal hours at peak.',
      },
      {
        title: 'Hills and older fragile stock',
        detail: 'Church Hill grades and pre-war interiors need extra protection and labor.',
      },
      {
        title: 'Cross-locality empty miles',
        detail: 'Henrico and Chesterfield destinations raise staging distance from city-core yards.',
      },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$450–$1,450+', note: 'Higher with stairs or elevator buildings' },
      { label: '2–3BR row home / walk-up', value: '$1,400–$4,000+', note: 'Fan/Museum District stairs trend up' },
      { label: '3–4+ BR / multi-story / cross-zone', value: '$2,500–$7,200+', note: 'Hills + long carries + freeway pairs price highest' },
      { label: 'Typical 2-person crew rate', value: '$110–$185+/hr', note: 'Portal-to-portal; packing scales up' },
    ],
  },
  seasonal: {
    title: 'When to schedule a Richmond City move',
    intro: 'University calendars, state-government turns, summer heat, events, and peak freeways reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear Fan curb space and reduce Expressway/I-95 pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak student and lease season: May, August, and month-ends',
        detail:
          'VCU-adjacent and downtown multifamily demand spikes. Book elevators and crews 2–4 weeks ahead when possible.',
      },
      {
        title: 'Summer heat and storms',
        detail:
          'Afternoon humidity and pop-up storms slow exterior carries on stoops and hills. Prefer early starts and tarp plans.',
      },
      {
        title: 'Capital / event calendar friction',
        detail:
          'Downtown events and government-related turns can erase curb space. Check street-closure notices before load windows.',
      },
    ],
  },
  specialized: [
    {
      id: 'capital-core-rowhome',
      title: 'Capital-core row-home & loft logistics module',
      intro:
        'Richmond City estimates fail more often on stairs, curb length, and building packets than on packing skill alone.',
      bullets: [
        'Photo curb options, truck length limits, and full stair flights for Fan/Museum District stock.',
        'Collect COI and elevator reservations for downtown, Shockoe, and Scott’s Addition buildings before the survey is final.',
        'Price portal-to-portal time for I-95, I-64, I-195, and Downtown Expressway pairs at peak.',
        'Clarify Richmond City vs Henrico vs Chesterfield on every address — independent city lines matter.',
        'Verify Virginia DMV household goods / motor-carrier authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Richmond City?',
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
              'Richmond Public Schools is the primary public K–12 system inside the independent city. Assignment is address-based — Fan or Church Hill marketing names do not guarantee a campus.',
          },
          {
            title: 'City vs county systems',
            detail:
              'Many metro families compare city schools with Henrico and Chesterfield systems. Confirm residency and transfer rules before assuming a district.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Virginia Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'VCU Health, Bon Secours, HCA Virginia, and other campuses serve the capital region. Specialty care often concentrates near the urban core. Confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from your neighborhood to preferred campuses — I-95 and Downtown Expressway congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Row homes and urban product vs suburban tracts',
            detail:
              'Expect multi-story row stock, lofts, and divided houses near Fan/downtown; larger HOA tracts sit outside the city line in Henrico and Chesterfield.',
          },
          {
            title: 'Cost variation inside the city',
            detail:
              'Purchase prices and rents vary by block. Budget for older-home repair risk, parking constraints, and insurance on higher-value inventories.',
          },
          {
            title: 'Building and historic-district rules',
            detail:
              'Multifamily buildings and some historic areas control move hours, truck size, and deposits. Read lease and HOA/condo documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Richmond City areas fit whom',
        bullets: [
          {
            title: 'Fan / Museum District urban lifestyle',
            detail:
              'Suits people prioritizing walkable amenities and historic character — with parking, stairs, and curb tradeoffs on move day.',
          },
          {
            title: 'Downtown / Scott’s Addition / Shockoe',
            detail:
              'Often appeals for lofts and short commutes to core employers — with elevator and COI logistics.',
          },
          {
            title: 'Church Hill / southside city neighborhoods',
            detail:
              'Attracts households seeking neighborhood scale and renovation character — with hills, older stock, and bridge timing.',
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
              'State government, healthcare, higher education, finance, professional services, and downtown employers concentrate in the capital core.',
          },
          {
            title: 'Commute realism',
            detail:
              'Some near-core households walk or short-hop; most metro workers remain car-dependent for Henrico/Chesterfield job sites. Test peak I-95/I-64 routes before choosing solely on rent.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Capital urban core, not a suburban county',
            detail:
              'Richmond City stacks historic districts, university energy, and riverfront redevelopment — different from Henrico’s west-end retail growth or Chesterfield’s master-planned southside.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, frequent storms, and mild winters. Plan outdoor staging on stoops and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Arts, dining, sports, and government life concentrate downtown and near-west; quieter residential pockets sit minutes away. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Richmond City resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Virginia DMV motor-carrier / household goods authorization for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'City of Richmond — official site',
        href: 'https://www.rva.gov/',
        external: true,
        note: 'City services & offices',
      },
      {
        label: 'Richmond Public Schools',
        href: 'https://www.rvaschools.net/',
        external: true,
        note: 'Boundaries & calendars',
      },
      {
        label: 'Virginia Capital Trail / riverfront context',
        href: 'https://www.virginiacapitaltrail.org/',
        external: true,
        note: 'Riverside neighborhood context',
      },
      {
        label: 'Virginia 511 traffic',
        href: 'https://www.511virginia.org/',
        external: true,
        note: 'I-95 / I-64 / Expressway before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with Fan/Museum District row-home and stair experience; elevator and COI fluency for downtown/Scott’s Addition lofts; honest I-95/I-64 timing for city–suburb pairs. Verify Virginia DMV household goods / motor-carrier authority for in-state moves and FMCSA for interstate legs. This page covers Richmond City (independent city), not Richmond County.',
  lastReviewed: '2026-07-23',
});
