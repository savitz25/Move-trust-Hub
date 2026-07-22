import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Alameda County moving intelligence.
 * Used by /local-movers/california/alameda and the shared intelligence template.
 *
 * Differentiators vs SF / Santa Clara / generic Bay Area: East Bay urban core
 * (Oakland hills, Berkeley), I-880 industrial corridor, Alameda island access,
 * Tri-Valley suburban contrast, Port of Oakland + UC Berkeley seasonal patterns.
 */
export const alamedaCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'california',
  countySlug: 'alameda',
  hubTitle: 'Alameda County Moving Intelligence Hub',
  eyebrow: 'Alameda County · East Bay guide',
  h1: 'Moving in Alameda County: Oakland Hills, East Bay Corridors & Zone Guide',
  heroOpener:
    'Alameda County is a major East Bay county (~1.64 million residents) with a hard split between dense urban core and outlying suburbs. County seat Oakland plus Berkeley, Fremont, Hayward, San Leandro, Livermore, Pleasanton, Dublin, and the City of Alameda are different logistics problems under one name. Victorians and Craftsman walk-ups meet hillside driveways, mid-century tracts, high-rise elevators, and Tri-Valley HOAs. Certificates of Insurance and elevator windows are routine in Oakland and Berkeley multi-unit buildings. I-880, I-580, I-80, I-680, SR-24, and SR-13 — plus Bay Bridge influence — turn short map miles into long billable hours. UC Berkeley calendars and Port of Oakland freight patterns add seasonal and corridor pressure. This guide is for people moving in Alameda County — not generic Bay Area tips recycled from San Francisco or Silicon Valley.',
  heroCredibility:
    'East Bay urban & hills · Tri-Valley suburbs · HOA/elevator-aware · Intrastate CA (BHGS) · FMCSA when interstate · Curated listings',
  whatMakesDifferent: {
    title: 'What makes moving in Alameda County different',
    intro:
      'These are the East Bay realities that change estimates and schedules — hills, older housing stock, building paperwork, and corridor distance.',
    bullets: [
      {
        title: 'Urban core vs Tri-Valley is two different jobs',
        detail:
          'An Oakland high-rise or Berkeley hillside walk-up is not a Livermore planned-community move. Density, truck size, elevators, and HOA culture diverge sharply. Get origin and destination cities into the estimate assumptions — “Alameda County local” is too vague.',
      },
      {
        title: 'Hills rewrite truck access',
        detail:
          'Oakland hills and Berkeley hills often mean steep driveways, limited turnaround, low branches, and no 26′ truck at the door. Shuttle trucks or long carries are common. Share approach photos and max truck length before move day.',
      },
      {
        title: 'COI and elevators are the default in multi-unit buildings',
        detail:
          'Oakland, Berkeley, Emeryville, and many southern-county apartments require Certificates of Insurance naming the building or HOA, elevator reservations, padding, and approved hours (often weekdays). Treat the building packet as part of the survey.',
      },
      {
        title: 'Older housing stock means stairs and tight streets',
        detail:
          'Victorians, Craftsman homes, and dense multi-unit blocks bring narrow streets, limited staging, street-sweeping rules, and multi-flight carries. Parking permits or temporary no-parking may be required in denser cities — confirm who pulls them.',
      },
      {
        title: 'I-880 corridor industrial traffic',
        detail:
          'The southern I-880 spine (San Leandro, Hayward, Union City, Newark, Fremont) shares space with freight and warehouse traffic. Mid-day mid-week can stall “short” locals. Build buffer into load/unload windows near industrial clusters.',
      },
      {
        title: 'Bay Bridge & cross-bay spillover',
        detail:
          'Moves that touch Oakland–Emeryville–Berkeley corridors feel Bay Bridge and I-80 pressure even when you never cross the bridge. Event days and peak commute windows compound delays on SR-24 and I-580 approaches.',
      },
      {
        title: 'UC Berkeley & Port of Oakland calendars',
        detail:
          'Student and faculty move-in/out peaks (late August, mid-December, late May) spike demand near Berkeley and student-heavy neighborhoods. Port and warehouse rhythms affect I-880 and maritime-adjacent streets — plan residential windows away from the worst freight surges when possible.',
      },
      {
        title: 'California intrastate rules (BHGS)',
        detail:
          'Moves entirely within California are generally overseen by the California Bureau of Household Goods and Services (BHGS). Interstate legs need FMCSA authority. Confirm which license applies to your exact origin and destination.',
      },
    ],
  },
  zonesIntro:
    'Treat each zone as its own access problem. Oakland/Berkeley hills and high-rises, I-880 corridor density, Alameda island approaches, and Tri-Valley suburbs are not interchangeable — East Bay geography defines the job more than generic Bay Area advice.',
  zones: [
    {
      id: 'oakland-core',
      name: 'Oakland & Inner East Bay Urban Core',
      shortName: 'Oakland Core',
      neighborhoods: [
        'Downtown Oakland',
        'Uptown',
        'Lake Merritt',
        'Temescal',
        'Rockridge',
        'Piedmont',
        'Emeryville',
        'West Oakland',
        'East Oakland flats',
      ],
      housingTypes:
        'High-rises, mid-rise condos, Victorians, multi-unit walk-ups, flats, some hillside SFH on the edges',
      challenges: [
        'Elevator COI and reservation windows',
        'Limited curb staging and street restrictions',
        'I-580 / I-880 / I-980 weave and event traffic',
        'Transition to hills within a few blocks in many neighborhoods',
      ],
      moverTips:
        'Send building rules + COI early. Confirm dock or freight-elevator numbers the day before. Weekday mornings are usually cleanest. For flats-to-hills moves inside Oakland, budget shuttle or long-carry if the upper address cannot take a full-size truck.',
      cityKeywords: [
        'oakland',
        'piedmont',
        'emeryville',
        'temescal',
        'rockridge',
        'lake merritt',
        'uptown',
        'west oakland',
        'fruitvale',
        'dimond',
      ],
    },
    {
      id: 'berkeley-hills',
      name: 'Berkeley & North Hills',
      shortName: 'Berkeley / Hills',
      neighborhoods: [
        'Berkeley flats',
        'North Berkeley',
        'Berkeley hills',
        'Elmwood',
        'Claremont',
        'North Oakland hills',
        'Montclair',
      ],
      housingTypes:
        'Craftsman and brown-shingle SFH, hillside multi-level homes, dense apartments near campus, some co-ops',
      challenges: [
        'Steep grades, tight switchbacks, limited turnaround',
        'UC Berkeley move-in/out peaks and street congestion',
        'Permit parking and narrow residential streets',
        'Long carries on multi-story hillside homes',
      ],
      moverTips:
        'Share driveway and approach videos for hillside homes. Prefer smaller trucks or shuttles when the street cannot hold a 26′. Avoid peak student move weeks when possible. Inventory stairs and fragile finishes carefully.',
      cityKeywords: [
        'berkeley',
        'north berkeley',
        'elmwood',
        'claremont',
        'montclair',
        'berkeley hills',
        'north oakland',
        'rockridge',
        'uc berkeley',
      ],
    },
    {
      id: 'south-880',
      name: 'Southern Alameda / I-880 Corridor',
      shortName: 'I-880 Corridor',
      neighborhoods: [
        'San Leandro',
        'Hayward',
        'Union City',
        'Newark',
        'Fremont',
        'Castro Valley (edge)',
      ],
      housingTypes:
        'Suburban SFH, multi-family, mid-century tracts, newer planned pockets (esp. Fremont), industrial-adjacent housing',
      challenges: [
        'I-880 freight and commute congestion',
        'Longer “local” pairs along the corridor',
        'Mix of HOA tracts and open-street neighborhoods',
        'Cross-county spills into Santa Clara (Fremont/Milpitas edge)',
      ],
      moverTips:
        'Clarify city-to-city pairs (e.g. San Leandro → Fremont vs Hayward → Oakland). Near industrial clusters, avoid mid-day peaks. Fremont HOAs increasingly want COI — send packets early. Warm inland afternoons still favor earlier starts in summer.',
      cityKeywords: [
        'san leandro',
        'hayward',
        'union city',
        'newark',
        'fremont',
        'castro valley',
        'centerville',
        'niles',
        'irvington',
      ],
    },
    {
      id: 'alameda-island',
      name: 'Island & Waterfront (City of Alameda)',
      shortName: 'Alameda Island',
      neighborhoods: [
        'Alameda',
        'West End',
        'East End',
        'Bay Farm Island',
        'Alameda Point',
      ],
      housingTypes:
        'Victorian and mid-century SFH, multi-unit, waterfront condos, former base housing areas',
      challenges: [
        'Bridge and tube access constraints at peak times',
        'Limited through-routes; staging can be tight on residential streets',
        'Waterfront multi-unit COI and elevator rules',
        'Weekend recreational traffic on island approaches',
      ],
      moverTips:
        'Plan approach timing around tube/bridge peaks. Confirm parking and building rules for waterfront condos. Residential streets may need temporary no-parking for truck space — decide who arranges it before move day.',
      cityKeywords: [
        'alameda',
        'bay farm',
        'alameda point',
        'west end alameda',
        'east end alameda',
      ],
    },
    {
      id: 'tri-valley',
      name: 'Tri-Valley',
      shortName: 'Tri-Valley',
      neighborhoods: [
        'Livermore',
        'Pleasanton',
        'Dublin',
        'Sunol',
        'East Dublin',
        'Downtown Pleasanton',
      ],
      housingTypes:
        'Suburban SFH, master-planned communities, townhomes, newer HOA tracts, some hillside estates',
      challenges: [
        'I-580 / I-680 congestion to the urban core',
        'HOA COI and gate rules in many planned communities',
        'Longer hauls to Oakland/Berkeley (often 45–75+ minutes peak)',
        'Heat inland vs cooler bayfront days',
      ],
      moverTips:
        'Treat Tri-Valley ↔ Oakland/Berkeley as a long East Bay local with honest portal-to-portal time. Collect HOA move packets for planned communities. Mid-week mid-month mornings usually price best. Summer inland heat favors early starts.',
      cityKeywords: [
        'livermore',
        'pleasanton',
        'dublin',
        'sunol',
        'tri-valley',
        'dougherty',
        'east dublin',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Alameda County',
    intro:
      'Two “local” moves of the same square footage can differ sharply depending on hills, elevators, corridor distance, and whether the pair is urban core or Tri-Valley suburban.',
    drivers: [
      {
        title: 'Hillside access & shuttles',
        detail:
          'Berkeley/Oakland hills often need smaller trucks, long carries, or shuttles. Access complexity can exceed the cost of a same-size flatland home.',
      },
      {
        title: 'COI, elevator & building soft costs',
        detail:
          'High-rise and multi-unit buildings add COI processing, elevator deposits, reserved windows, and weekday-only constraints — common in Oakland, Berkeley, and Emeryville.',
      },
      {
        title: 'Cross-corridor distance',
        detail:
          'Oakland ↔ Livermore or Berkeley ↔ Fremont can burn 45–90+ minutes each way at peak. Hourly billing follows portal-to-portal time, not crow-flies miles.',
      },
      {
        title: 'I-880 / I-580 freight & commute peaks',
        detail:
          'Industrial and bridge-approach congestion stalls crews mid-day. Realistic ETAs prevent overtime surprises.',
      },
      {
        title: 'UC and lease-turn calendars',
        detail:
          'Late summer and academic turnovers spike demand near Berkeley and dense multi-unit stock. End-of-month Saturdays fill first countywide.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$650–$1,700+',
        note: 'Higher with elevators, COI windows, or hillside long-carry',
      },
      {
        label: '2–3BR apartment / condo / flats home',
        value: '$1,900–$4,600+',
        note: 'Building paperwork and stairs common in urban core',
      },
      {
        label: '3–4+ BR (hills / cross-zone)',
        value: '$2,800–$7,500+',
        note: 'Hills shuttles and Oakland ↔ Tri-Valley hauls price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$140–$215+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, campus & calendar intelligence',
    intro:
      'East Bay peaks follow school/university calendars, lease turns, and freeways — weather is milder than inland valleys but hills stay access-sensitive year-round.',
    items: [
      {
        title: 'UC Berkeley & student peaks',
        detail:
          'Late August move-in, mid-December and late May move-out weeks jam campus-adjacent streets. Book early or choose mid-month mid-week if flexible.',
      },
      {
        title: 'Peak residential: late spring – early fall weekends',
        detail:
          'School calendars and end-of-month leases fill Saturdays. Urban multi-unit elevators book out — reserve building windows with the HOA first.',
      },
      {
        title: 'Summer inland heat (Tri-Valley)',
        detail:
          'Livermore/Pleasanton/Dublin heat favors early starts even when Oakland is cool. Protect electronics in sealed trucks.',
      },
      {
        title: 'Bridge & event congestion',
        detail:
          'Major Oakland events and peak bridge periods spill into I-580/I-80 approaches. Check local calendars if either address is event-adjacent.',
      },
      {
        title: 'Best value: mid-month Tue–Thu mornings',
        detail:
          'Still plan around elevator weekday rules. Avoid last Friday/Saturday of the month when leases and campus calendars collide.',
      },
    ],
  },
  resources: {
    title: 'Practical Alameda County resources',
    intro:
      'Official links and licensing notes — building, parking, and city rules change; verify before move day.',
    items: [
      {
        label: 'City of Oakland — parking & transportation context',
        href: 'https://www.oaklandca.gov/',
        note: 'City services; building HOA rules are separate',
        external: true,
      },
      {
        label: 'City of Berkeley',
        href: 'https://berkeleyca.gov/',
        external: true,
      },
      {
        label: 'City of Fremont',
        href: 'https://www.fremont.gov/',
        external: true,
      },
      {
        label: 'City of Alameda',
        href: 'https://www.alamedaca.gov/',
        external: true,
      },
      {
        label: 'City of Livermore',
        href: 'https://www.livermoreca.gov/',
        external: true,
      },
      {
        label: 'Alameda County — official site',
        href: 'https://www.acgov.org/',
        external: true,
      },
      {
        label: '511 SF Bay — traffic conditions',
        href: 'https://511.org/',
        note: 'Check 880/580/80/680/24 before locking load windows',
        external: true,
      },
      {
        label: 'Port of Oakland — awareness',
        href: 'https://www.oaklandseaport.com/',
        note: 'Freight patterns can affect nearby corridors',
        external: true,
      },
      {
        label: 'CA BHGS — household movers (intrastate)',
        href: 'https://bhgs.dca.ca.gov/',
        note: 'California Bureau of Household Goods and Services',
        external: true,
      },
      {
        label: 'FMCSA SAFER — interstate authority',
        href: 'https://safer.fmcsa.dot.gov/',
        note: 'Required when the move crosses state lines',
        external: true,
      },
      {
        label: 'PG&E — start/stop service',
        href: 'https://www.pge.com/',
        note: 'Electric & gas for most of the county',
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
    'Filter listings by zone (Oakland Core, Berkeley/Hills, I-880 Corridor, Alameda Island, Tri-Valley) when available. Confirm elevator/COI rules and hillside access — especially for Oakland/Berkeley multi-unit and hills homes.',
  lastReviewed: '2026-07-22',
};
