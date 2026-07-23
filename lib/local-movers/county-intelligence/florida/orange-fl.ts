import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Orange County, Florida (Orlando metro) moving intelligence.
 * Not California Orange County — tourism peaks, attraction corridors, sprawl,
 * student/seasonal turnover, and I-4 / airport logistics.
 */
export const orangeCountyFlIntelligence: CountyIntelligencePack = {
  stateSlug: 'florida',
  countySlug: 'orange',
  hubTitle: 'Orange County FL Orlando-Area Moving Intelligence Hub',
  eyebrow: 'Orange County · Central Florida · Orlando metro guide',
  h1: 'Moving in Orange County, Florida: Theme-Park Traffic, Sprawl Corridors & Zone Guide',
  heroOpener:
    'Orange County, Florida is the Orlando tourism engine plus a wide suburban ring — International Drive and resort corridors, Winter Park and College Park denser pockets, Lake Nona and Horizon West growth, UCF-area student turnover, and OIA flight-path logistics. Theme-park calendars, convention weeks, and I-4 bottlenecks shape truck timing more than map miles. This guide is for Florida Orange County moves — not California Orange County, and not a renamed Miami or Tampa script.',
  heroCredibility:
    'Orlando tourism peaks · Attraction & I-4 corridor-aware · FDACS Ch. 507 (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-4 · FL-408 · FL-417 · US-17/92 · International Drive',
  collapsibleDeepContent: true,
  sectionOrder: [
    'whatMakesDifferent',
    'zones',
    'costDrivers',
    'seasonal',
    'specialized',
    'relocation',
    'resources',
  ],
  whatMakesDifferent: {
    title: 'What makes moving in Orange County, FL different',
    intro:
      'Tourism density, sprawl distances, student waves, and airport/attraction traffic are the local line items — not South Florida high-rise culture or Tampa Bay bridges.',
    bullets: [
      {
        title: 'Tourism calendars are operational inputs',
        detail:
          'School breaks, major park events, and convention weeks pack I-Drive, Universal corridors, and I-4 approaches. A “local” truck hour can double in guest-heavy traffic. Ask crews how they route around peak park ingress/egress.',
      },
      {
        title: 'Sprawl pairs burn portal-to-portal time',
        detail:
          'Winter Garden ↔ Lake Nona, Apopka ↔ Kissimmee-edge, or downtown Orlando ↔ Horizon West can look short on a map and still run long on the clock. Clarify whether quotes are portal-to-portal and which corridors they assume.',
      },
      {
        title: 'Attraction & resort-adjacent housing is its own product',
        detail:
          'Condos, timeshare-adjacent buildings, and short-term rental conversions near parks often mean elevators, guest parking chaos, and building windows that ignore “normal” residential schedules. Survey access photos beat verbal promises.',
      },
      {
        title: 'Student & seasonal lease clusters',
        detail:
          'UCF-area apartments, downtown rentals, and hospitality workforce turnover create August/May and mid-month lease-end waves. Book early if your dates land on those clusters; last-minute Saturday crews vanish first.',
      },
      {
        title: 'HOA growth villages vs older core stock',
        detail:
          'Lake Nona, Horizon West, and many planned communities require COIs, approved hours, and driveway/paver rules. College Park, older Winter Park edges, and multi-unit corridors bring tighter staging and stairs — different estimate shapes.',
      },
      {
        title: 'Airport & logistics corridors matter',
        detail:
          'Orlando International approaches, SR-417/528 loops, and freight-adjacent industrial edges affect morning dispatch. Early starts still win even when the street looks quiet.',
      },
      {
        title: 'Heat and afternoon storms compress productive hours',
        detail:
          'Central Florida summer heat plus pop-up storms can force early-morning load windows and tarp discipline. Mid-afternoon open-lot loads in peak summer are high risk for people and electronics.',
      },
      {
        title: 'Florida licensing: FDACS Ch. 507 vs FMCSA',
        detail:
          'Moves entirely within Florida generally require FDACS household-mover registration under Chapter 507. Any out-of-state leg needs FMCSA authority and a USDOT number. Match the legal name on the estimate to the correct lookup.',
      },
    ],
  },
  zonesHeading: 'Orange County FL zones: tourism core, suburbs & growth edges',
  zonesIntro:
    'Treat each pocket as its own traffic and access problem. I-Drive guest chaos, Winter Park staging, Lake Nona HOAs, and west-side sprawl are not interchangeable “Orlando locals.”',
  zones: [
    {
      id: 'downtown-winter-park',
      name: 'Downtown Orlando, College Park & Winter Park',
      shortName: 'Downtown / Winter Park',
      neighborhoods: [
        'Downtown Orlando',
        'College Park',
        'Winter Park',
        'Audubon Park edge',
        'Mills 50 corridor',
      ],
      housingTypes:
        'High-rises and mid-rises, historic SFH, duplexes, denser street grids, boutique multi-unit',
      challenges: [
        'Elevator/COI windows and limited street staging',
        'I-4 / downtown event congestion',
        'Older homes with tight drives and stairs',
        'Guest and restaurant parking competition near Park Avenue',
      ],
      moverTips:
        'Reserve elevators and get COI naming requirements in writing. Weekday early starts beat event and rush traffic. Inventory stairs and long carries on older multi-unit stock before the truck is sized.',
      cityKeywords: [
        'orlando',
        'downtown orlando',
        'winter park',
        'college park',
        'mills 50',
      ],
    },
    {
      id: 'idrive-tourist',
      name: 'International Drive, Universal corridor & resort edges',
      shortName: 'I-Drive / Resort',
      neighborhoods: [
        'International Drive',
        'Universal / Kirkman corridor',
        'Dr. Phillips edge',
        'Sand Lake Road corridor',
        'Resort condo pockets',
      ],
      housingTypes:
        'High-density condos, resort-adjacent multifamily, timeshare conversions, some SFH behind commercial strips',
      challenges: [
        'Tourist traffic and ride-share congestion all day',
        'Building move windows that conflict with guest operations',
        'Limited truck staging near attractions',
        'Seasonal and event-driven demand spikes',
      ],
      moverTips:
        'Avoid major park opening hours when flexible. Confirm freight elevator times and security desk rules early. Price guest-traffic delay risk into hourly jobs explicitly.',
      cityKeywords: [
        'international drive',
        'i-drive',
        'dr phillips',
        'universal',
        'sand lake',
      ],
    },
    {
      id: 'lake-nona-southeast',
      name: 'Lake Nona, Airport South & southeast growth',
      shortName: 'Lake Nona / SE',
      neighborhoods: [
        'Lake Nona',
        'Medical City edge',
        'Airport South',
        'Moss Park edge',
        'Lake Nona town centers',
      ],
      housingTypes:
        'Master-planned SFH, townhomes, newer apartments, HOA-heavy villages, some medical-staff rentals',
      challenges: [
        'Strict HOA COI and approved-hour rules',
        'SR-417 / airport approach congestion',
        'High family-inventory volume on weekends',
        'Construction traffic in still-growing tracts',
      ],
      moverTips:
        'Send HOA packets with the estimate. Mid-week early starts beat school and medical-shift peaks. Clarify Lake Nona ↔ west Orange pairs as long locals with honest drive time.',
      cityKeywords: [
        'lake nona',
        'moss park',
        'airport',
        'medical city',
        'southeast orlando',
      ],
    },
    {
      id: 'west-orange-horizon',
      name: 'Winter Garden, Horizon West & west Orange',
      shortName: 'West Orange',
      neighborhoods: [
        'Winter Garden',
        'Horizon West',
        'Windermere edge',
        'Ocoee',
        'West Orange growth villages',
      ],
      housingTypes:
        'Suburban SFH, planned communities, lake-adjacent homes, townhomes, larger family inventories',
      challenges: [
        'HOA and gated-community access rules',
        'Long cross-county hauls to east Orange / Lake Nona',
        'School-peak traffic on arterial roads',
        'Lake-lot docks, stairs, and long carries on some parcels',
      ],
      moverTips:
        'Share gate codes and HOA windows before dispatch. Inventory lake-lot access carefully. Do not assume a downtown Orlando staging crew prices west Orange as a short hop.',
      cityKeywords: [
        'winter garden',
        'horizon west',
        'windermere',
        'ocoee',
        'west orange',
      ],
    },
    {
      id: 'ucf-east-apopka',
      name: 'UCF area, east Orange & Apopka north',
      shortName: 'UCF / East / Apopka',
      neighborhoods: [
        'University / UCF area',
        'Alafaya corridor',
        'Waterford Lakes edge',
        'Apopka',
        'East Colonial corridors',
      ],
      housingTypes:
        'Student apartments, garden multifamily, suburban SFH, older tract homes, mixed commercial-adjacent rentals',
      challenges: [
        'Lease-end student move clusters (May / August)',
        'Elevator and parking limits in large complexes',
        'SR-408 / 417 and Colonial congestion',
        'High turnover small-inventory jobs stacked on weekends',
      ],
      moverTips:
        'Book student-peak dates early. Confirm complex loading docks and elevator reservations. Stack-friendly crews matter more than luxury packing for studio/1BR waves.',
      cityKeywords: [
        'ucf',
        'university',
        'alafaya',
        'apopka',
        'waterford lakes',
        'east orlando',
      ],
    },
    {
      id: 'maitland-altamonte-edge',
      name: 'Maitland, Eatonville & north metro edge',
      shortName: 'North metro edge',
      neighborhoods: [
        'Maitland',
        'Eatonville',
        'Lockhart edge',
        'North Orange corridors',
        'I-4 north approaches',
      ],
      housingTypes:
        'Mid-century and updated SFH, townhomes, office-adjacent multifamily, lake neighborhoods',
      challenges: [
        'I-4 north rush-hour friction',
        'Mix of HOA and non-HOA access rules',
        'Cross-county legs into Seminole County often share crews',
        'Lake and tree-canopy lots with limited truck swing room',
      ],
      moverTips:
        'Treat Maitland ↔ Lake Nona or Maitland ↔ Horizon West as long locals. Share driveway photos on canopied lots. Prefer early I-4 avoidance windows.',
      cityKeywords: ['maitland', 'eatonville', 'lockhart', 'north orlando'],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Orange County, FL',
    intro:
      'Two “Orlando locals” of the same square footage can diverge hard once tourism traffic, elevators, HOA soft costs, and sprawl distance enter the survey.',
    drivers: [
      {
        title: 'Tourism & I-4 delay risk',
        detail:
          'Guest traffic near parks and I-4 bottlenecks turn billable hours into real money on hourly jobs. Fixed-price quotes should still document assumed windows.',
      },
      {
        title: 'Elevator / building soft costs',
        detail:
          'Downtown towers, resort condos, and large complexes often need COIs, reserved elevators, and padded common areas — fees and labor time stack.',
      },
      {
        title: 'Cross-sprawl portal-to-portal distance',
        detail:
          'West Orange ↔ southeast growth pairs and north ↔ south metro legs burn empty miles that map apps understate at peak.',
      },
      {
        title: 'HOA approved hours & weekend scarcity',
        detail:
          'Many planned communities force weekday-only moves or narrow windows, concentrating demand and raising crew premiums.',
      },
      {
        title: 'Student / hospitality turnover waves',
        detail:
          'May–August lease clusters and mid-month hospitality churn tighten labor supply; peak Saturdays price first.',
      },
      {
        title: 'Heat, storms & packing labor',
        detail:
          'Summer heat and afternoon storms can add packing time, water breaks, and multi-day splits for large inventories.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$500–$1,200+',
        note: 'Higher with elevators, resort traffic, or student-peak weekends',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,800–$4,200+',
        note: 'HOA soft costs and cross-metro hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / high-rise / resort edge)',
        value: '$2,400–$6,500+',
        note: 'I-Drive towers and long sprawl pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$175+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, tourism & storm intelligence',
    intro:
      'Orange County peaks follow park calendars, student leases, convention weeks, and hurricane season — not Miami snowbird towers alone.',
    items: [
      {
        title: 'Peak guest & family season (roughly spring breaks through summer)',
        detail:
          'Park crowds, family SFH moves, and student transitions overlap. Book 2–4+ weeks ahead for Saturdays near attractions or large planned communities.',
      },
      {
        title: 'Student & lease-end waves (May / August)',
        detail:
          'UCF-area and apartment-heavy corridors fill first. Mid-week slots and early mornings are the realistic backups when weekends sell out.',
      },
      {
        title: 'Convention & special-event spikes',
        detail:
          'Orange County Convention Center weeks and major park events can gridlock I-Drive and nearby arterials. Confirm event calendars against your load window.',
      },
      {
        title: 'Hurricane season (June–November)',
        detail:
          'Build flexible date language into contracts when tropical weather threatens. Storage demand can spike around storm watches — ask about contingency policies early.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Still respect HOA weekday rules. Early starts win against both heat and park ingress traffic even in shoulder seasons.',
      },
    ],
  },
  specialized: [
    {
      id: 'tourism-attraction-logistics',
      title: 'Tourism corridors, resort condos & attraction-week logistics',
      intro:
        'Orange County’s defining friction is guest traffic and building operations near parks — not just “busy Orlando roads.”',
      bullets: [
        'Route around major park opening and closing surges when dates are flexible.',
        'Confirm freight elevator reservations, security desks, and COI naming for resort-adjacent buildings.',
        'Price hourly delay risk near I-Drive and Universal corridors explicitly on the estimate.',
        'Protect floors and elevators for sand, luggage carts, and high guest foot traffic in shared buildings.',
        'Ask whether the crew has run jobs during convention weeks — staging behavior differs from pure residential suburbs.',
      ],
    },
    {
      id: 'sprawl-hoa-student',
      title: 'Sprawl pairs, HOA villages & student turnover module',
      intro:
        'Lake Nona / Horizon West growth and UCF-area lease clusters create two different operational products under one county name.',
      bullets: [
        'Treat west Orange ↔ southeast Orange pairs as long locals with honest portal-to-portal time.',
        'Send HOA management packets, approved hours, and driveway/paver rules with the survey.',
        'Book May and August student peaks early; elevator times in large complexes vanish first.',
        'Inventory stairs, long carries, and parking distance for garden apartments separately from SFH loads.',
        'Clarify whether packing labor is included — student moves often need more boxes than owners expect.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Orange County, Florida?',
    intro:
      'Tourism-core energy, Winter Park walkability, Lake Nona planned living, and west Orange sprawl are different bets — pick the pocket first, then validate schools, commute, and flood/HOA costs.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Orange County Public Schools covers most of the county, with magnets, charters, and private options layered on top. Match every listing address to the correct attendance zone.',
        bullets: [
          {
            title: 'Zone before marketing name',
            detail:
              'Use OCPS boundary tools. “Near Winter Park” or “Lake Nona area” marketing does not guarantee a specific feeder pattern.',
          },
          {
            title: 'Growth pockets & capacity',
            detail:
              'West Orange and southeast growth areas can see enrollment pressure as tracts fill — verify current capacity and construction plans.',
          },
          {
            title: 'Higher education presence',
            detail:
              'UCF, Valencia College campuses, and medical-education nodes shape rental demand and traffic near campus-adjacent corridors.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and Florida DOE reports should lead; third-party rankings are secondary. Tour campuses when possible.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Major metro systems',
            detail:
              'Orlando Health, AdventHealth, and Nemours (pediatric) campuses serve large parts of the metro. Map ER drive times at rush hour from your target neighborhood — I-4 and 417 change the clock.',
          },
          {
            title: 'Medical City / Lake Nona access',
            detail:
              'Southeast residents often orient around Lake Nona medical assets; west Orange households may still drive long arterials for specialty care.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if mid-treatment; book first appointments before peak summer move chaos.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing & cost of living',
        bullets: [
          {
            title: 'Price ladder by pocket',
            detail:
              'Winter Park and lake-adjacent product, resort-area condos, Lake Nona planned homes, and outer suburban tracts price differently. Compare HOA dues, insurance, and utilities — not sticker price alone.',
          },
          {
            title: 'Stock variety',
            detail:
              'High-rises, historic SFH, master-planned villages, student multifamily, and short-term rental conversions each change move-day access rules.',
          },
          {
            title: 'Insurance & storm reality',
            detail:
              'Wind and flood coverage can dominate monthly costs on some parcels. Pull insurance quotes before locking a contract.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit by lifestyle',
        bullets: [
          {
            title: 'Urban / Winter Park lifestyle',
            detail:
              'Walkable pockets, denser housing, and event energy — with parking and elevator tradeoffs on move day.',
          },
          {
            title: 'Tourism-corridor living',
            detail:
              'I-Drive and resort edges for hospitality jobs and high-density living — guest traffic is part of daily life.',
          },
          {
            title: 'Planned growth (Lake Nona / Horizon West)',
            detail:
              'Newer amenities and HOA structure for families who want predictable neighborhoods — longer cross-metro drives common.',
          },
          {
            title: 'North & east edges',
            detail:
              'Maitland / Apopka / UCF corridors for different mixes of suburban scale, student energy, and older stock.',
          },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute',
        bullets: [
          {
            title: 'Local anchors',
            detail:
              'Tourism and hospitality, healthcare, logistics/distribution, tech and simulation, education, and professional services dominate employment themes.',
          },
          {
            title: 'Corridor commute reality',
            detail:
              'I-4, SR-408, SR-417, and SR-528 set day-to-day drive times more than brochure distance. Test peak-hour runs for any west ↔ east pair.',
          },
          {
            title: 'Shift & hybrid work',
            detail:
              'Park, hospital, and airport shift schedules create non-9-to-5 traffic. Hybrid roles still need realistic cross-sprawl plans for office days.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & climate',
        bullets: [
          {
            title: 'Theme-park region culture',
            detail:
              'Attractions, dining, and visitor energy are always nearby — great for entertainment, harder for quiet residential streets near corridors.',
          },
          {
            title: 'Heat, humidity & storms',
            detail:
              'Hot summers, afternoon thunderstorms, and hurricane season are planning facts. Outdoor move days need early starts and weather flexibility.',
          },
          {
            title: 'Lakes & greenbelts',
            detail:
              'Central Florida lakes and trails are lifestyle draws; some lots add stairs, docks, and soft ground that matter on move day.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Practical Orange County FL resources',
    intro:
      'Official links and licensing notes — HOA rules, park event calendars, and FDACS registration change; verify before move day.',
    items: [
      {
        label: 'Orange County, Florida',
        href: 'https://www.orangecountyfl.net/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Orlando',
        href: 'https://www.orlando.gov/',
        external: true,
      },
      {
        label: 'City of Winter Park',
        href: 'https://cityofwinterpark.org/',
        external: true,
      },
      {
        label: 'City of Winter Garden',
        href: 'https://www.cwgdn.com/',
        external: true,
      },
      {
        label: 'Orange County Public Schools',
        href: 'https://www.ocps.net/',
        external: true,
      },
      {
        label: 'FDACS — Moving companies (Ch. 507)',
        href: 'https://www.fdacs.gov/Business-Services/Moving-Companies',
        note: 'Intrastate household mover registration',
        external: true,
      },
      {
        label: 'FDACS — Moving within Florida',
        href: 'https://www.fdacs.gov/Consumer-Resources/Consumer-Rights-and-Responsibilities/Moving-Within-Florida',
        external: true,
      },
      {
        label: 'FDACS business search',
        href: 'https://csapp.fdacs.gov/cspublicapp/businesssearch/businesssearch.aspx',
        external: true,
      },
      {
        label: 'FMCSA SAFER — interstate authority',
        href: 'https://safer.fmcsa.dot.gov/',
        note: 'Required when the move crosses state lines',
        external: true,
      },
      {
        label: 'National Hurricane Center',
        href: 'https://www.nhc.noaa.gov/',
        note: 'Storm timing context for summer–fall moves',
        external: true,
      },
      {
        label: 'Move Trust Hub — verify a USDOT',
        href: '/verify-dot',
        note: 'Cross-check interstate licensing before deposits',
      },
      {
        label: 'Free moving calculator',
        href: '/moving-calculator',
        note: 'Inventory-based volume for local or long-distance',
      },
    ],
  },
  directoryHint:
    'Filter by zone (Downtown/Winter Park, I-Drive/Resort, Lake Nona/SE, West Orange, UCF/East/Apopka, North metro edge). Confirm tourism routing, HOA windows, and FDACS registration for in-state jobs.',
  lastReviewed: '2026-07-23',
};
