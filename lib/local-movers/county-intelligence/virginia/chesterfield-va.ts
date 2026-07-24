import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaPack,
  VA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-shared';

/**
 * Chesterfield County, VA — Richmond southside suburbs & master-planned growth
 * (not Henrico west-end clone, not Richmond City urban core).
 */
export const chesterfieldCountyVaIntelligence: CountyIntelligencePack = finalizeVaPack({
  countySlug: 'chesterfield',
  hubTitle: 'Chesterfield County Moving Intelligence Hub',
  eyebrow: 'Chesterfield · Richmond southside · master-planned suburbs & VA-288 belt',
  h1: 'Moving in Chesterfield County: Southside Suburbs, Master-Planned Growth & VA-288 Logistics',
  heroOpener:
    'Chesterfield County is Richmond’s southside growth engine: master-planned HOA villages from Midlothian to Chester, Chippenham and VA-288 corridors that turn short map miles into portal time, and a mix of newer two-story SFH, townhome product, and older southside stock that does not share curb or driveway access. A Brandermill HOA lot, a Chesterfield Courthouse-edge rental, a Midlothian family two-story, and a US-360 corridor multifamily unit are not the same job. Chippenham Parkway, VA-288, US-60, US-360, and I-95 links rewrite estimates that ignore HOA packets and peak southside congestion. This hub is for people moving in Chesterfield County — not a renamed Henrico page or generic Richmond-metro template.',
  heroCredibility:
    'Virginia DMV household goods / motor-carrier authority for intrastate moves · FMCSA for interstate · Southside HOA & VA-288 corridor awareness · Curated listings',
  majorCorridors: 'Chippenham Pkwy · VA-288 · US-60 · US-360 · I-95 links',
  whatMakesDifferent: {
    title: 'What makes moving in Chesterfield County different',
    intro:
      'These are Chesterfield southside realities — master-planned HOA density, Chippenham/VA-288 congestion, and suburban growth calendars — not Fan District row-home rules or Henrico Short Pump retail logistics.',
    bullets: [
      {
        title: 'Master-planned HOA villages dominate the growth map',
        detail:
          'Midlothian, Brandermill, Woodlake, and newer Chesterfield tracts often require gate lists, COI, truck-length limits, and approved hours. Collect packets before the survey is final.',
      },
      {
        title: 'Chippenham and VA-288 turn short miles into billable time',
        detail:
          'Midlothian ↔ Chester, Chippenham-edge ↔ Courthouse, or southside ↔ Richmond City pairs look local and still burn 35–70+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Southside family inventory is large and stair-heavy',
        detail:
          'Three- and four-bedroom HOA two-stories, finished basements, and garage overflow are common. Inventory photos and stair counts matter more than ZIP alone.',
      },
      {
        title: 'US-60 and US-360 commercial strips shape access',
        detail:
          'Retail and multifamily corridors along Midlothian Turnpike and Hull Street Road create curb competition, signal delay, and mid-day truck traffic that pure residential quotes miss.',
      },
      {
        title: 'I-95 links pull north–south and interstate demand',
        detail:
          'Households regularly stage through Chesterfield for Richmond City, Colonial Heights, Petersburg-edge, and out-of-state I-95 legs. Clarify county lines and state lines on every estimate.',
      },
      {
        title: 'School calendars and peak Saturday demand',
        detail:
          'Family SFH moves cluster late May–mid-August. Peak Saturdays in Midlothian and Chester growth tracts fill first — book 2–4 weeks ahead.',
      },
      {
        title: 'Not Henrico west end, not the capital core',
        detail:
          'Chesterfield’s identity is southside suburban growth and HOA logistics — different curb, different freeways, different housing stock than Short Pump or the Fan/Museum District.',
      },
      VA_REG_BULLET,
    ],
  },
  zonesHeading: 'Chesterfield County access zones',
  zonesIntro:
    'Plan by Midlothian/west growth, Brandermill–Woodlake lakes communities, Chester/I-95 south, US-360/Hull corridor, and Courthouse/central Chesterfield — HOA rules and empty miles cluster by zone.',
  zones: [
    {
      id: 'midlothian-west',
      name: 'Midlothian, west Chesterfield & Chippenham approaches',
      shortName: 'Midlothian / West',
      neighborhoods: [
        'Midlothian',
        'Robious',
        'Huguenot edges',
        'Chippenham corridor residential',
        'Westchester common edges',
      ],
      housingTypes: 'HOA SFH, townhomes, larger family inventories, some multifamily',
      challenges: [
        'Chippenham / Midlothian Turnpike peak congestion',
        'HOA approved hours and truck limits',
        'Long carries on cul-de-sac lots',
      ],
      moverTips:
        'Collect HOA packets first. Build Chippenham buffer for any Richmond-linked pair. Photo driveway turn radius and stair counts.',
      cityKeywords: ['midlothian', 'robious', 'huguenot', 'chippenham', 'west chesterfield'],
    },
    {
      id: 'brandermill-woodlake',
      name: 'Brandermill, Woodlake & lakes-community growth',
      shortName: 'Brandermill / Woodlake',
      neighborhoods: ['Brandermill', 'Woodlake', 'Swift Creek edges', 'Genito corridor'],
      housingTypes: 'Master-planned HOA SFH, townhomes, water-adjacent lots',
      challenges: [
        'Gate lists and community truck rules',
        'VA-288 / Genito timing',
        'Larger inventories and outdoor gear',
      ],
      moverTips:
        'Confirm gate codes and COI early. Price VA-288 pairs honestly. Inventory sheds, docks, and garage overflow carefully.',
      cityKeywords: ['brandermill', 'woodlake', 'swift creek', 'genito'],
    },
    {
      id: 'chester-i95',
      name: 'Chester, I-95 south & Colonial Heights edge',
      shortName: 'Chester / I-95',
      neighborhoods: ['Chester', 'Chester Village edges', 'I-95 corridor multifamily', 'Colonial Heights edge (verify locality)'],
      housingTypes: 'Mix of older SFH, newer tracts, workforce multifamily',
      challenges: [
        'I-95 congestion and crash delay',
        'Cross-locality address confusion',
        'Lease-end waves on multifamily',
      ],
      moverTips:
        'Clarify Chesterfield vs Colonial Heights / Petersburg addresses. Prefer early I-95 starts. Confirm building elevator rules where applicable.',
      cityKeywords: ['chester', 'i-95', 'colonial heights', 'chesterfield south'],
    },
    {
      id: 'hull-us360',
      name: 'US-360 / Hull Street corridor & east-south growth',
      shortName: 'Hull / US-360',
      neighborhoods: ['Hull Street corridor', 'Iron Bridge edges', 'East-south growth tracts', 'US-360 commercial residential'],
      housingTypes: 'Townhomes, multifamily, newer SFH tracts, older strip-adjacent rentals',
      challenges: [
        'US-360 signal and retail congestion',
        'Mixed curb quality near commercial strips',
        'High apartment turn volume',
      ],
      moverTips:
        'Photo curb and loading options near retail. Book month-end multifamily early. Price Hull/US-360 portal time at peak.',
      cityKeywords: ['hull street', 'us-360', 'iron bridge', 'chesterfield east'],
    },
    {
      id: 'courthouse-central',
      name: 'Chesterfield Courthouse & central county',
      shortName: 'Courthouse / Central',
      neighborhoods: [
        'Chesterfield Courthouse',
        'Central county subdivisions',
        'VA-10 corridor edges',
        'Rural-suburban mix parcels',
      ],
      housingTypes: 'SFH, some acreage lots, government-adjacent rentals',
      challenges: [
        'Longer empty miles from north-county yards',
        'Driveway length and soft shoulders',
        'Mix of HOA and non-HOA rules',
      ],
      moverTips:
        'Survey driveway grade and turnaround. Prefer early starts for long cross-county pairs. Clarify Courthouse vs Midlothian access routes.',
      cityKeywords: ['chesterfield courthouse', 'courthouse', 'va-10', 'central chesterfield'],
    },
    {
      id: 'bon-air-north-edge',
      name: 'Bon Air & northern Chesterfield edge',
      shortName: 'Bon Air / North edge',
      neighborhoods: ['Bon Air', 'Forest Hill edge (verify locality)', 'Northern Chippenham approaches'],
      housingTypes: 'Older SFH, tree-canopy lots, denser near-city product',
      challenges: [
        'Narrower streets and canopy clearance',
        'Proximity traffic toward Richmond City',
        'Stairs and unfinished basements common',
      ],
      moverTips:
        'Photo street width and overhead clearance. Confirm city vs county line on the address. Plan long carries where curb is tight.',
      cityKeywords: ['bon air', 'forest hill', 'north chesterfield', 'chippenham north'],
    },
  ],
  costDrivers: {
    title: 'What drives Chesterfield County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. HOA soft costs, Chippenham/VA-288 portal time, and large family inventories separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'HOA master-planned rules',
        detail: 'Gate lists, COI, truck limits, and weekday-only windows push demand into peak pricing.',
      },
      {
        title: 'Chippenham / VA-288 / US-60 congestion',
        detail: 'Cross-zone and Richmond-linked pairs burn portal-to-portal hours at peak.',
      },
      {
        title: 'Large southside family inventories',
        detail: '3–4+ BR two-stories, basements, and garage overflow add labor and packing volume.',
      },
      {
        title: 'US-360 multifamily and lease-end waves',
        detail: 'Apartment turns create month-end competition for crews and trucks.',
      },
      {
        title: 'Cross-locality empty miles',
        detail: 'Richmond City, Henrico, Colonial Heights, and Petersburg-edge destinations raise staging distance.',
      },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$400–$1,300+', note: 'Higher with stairs or peak freeways' },
      { label: '2–3BR townhome or modest SFH', value: '$1,200–$3,500+', note: 'HOA soft costs trend up' },
      { label: '3–4+ BR / HOA / cross-zone', value: '$2,300–$6,800+', note: 'Midlothian–Brandermill SFH and long VA-288 pairs price highest' },
      { label: 'Typical 2-person crew rate', value: '$100–$175+/hr', note: 'Portal-to-portal; packing scales up' },
    ],
  },
  seasonal: {
    title: 'When to schedule a Chesterfield County move',
    intro: 'School calendars, HOA windows, summer heat/humidity, and southside freeway peaks reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear HOA curb rules and reduce Chippenham / VA-288 pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail:
          'Midlothian and Chester SFH Saturday demand fills first. Book 2–4 weeks ahead for peak weekends.',
      },
      {
        title: 'Summer heat and storms',
        detail:
          'Afternoon humidity and pop-up storms slow exterior carries. Prefer early starts and tarp plans.',
      },
      {
        title: 'Holiday and year-end corporate turns',
        detail:
          'Government-adjacent and corporate relocations can create mid-month spikes. Confirm hard report dates early.',
      },
    ],
  },
  specialized: [
    {
      id: 'southside-hoa-va288',
      title: 'Southside HOA & VA-288 logistics module',
      intro:
        'Chesterfield estimates fail more often on HOA packets and Chippenham/VA-288 portal time than on packing skill.',
      bullets: [
        'Collect HOA COI, gate lists, and approved hours before the survey is final.',
        'Price portal-to-portal time for any pair that rides Chippenham, VA-288, US-60, or US-360 at peak.',
        'Photo driveway turn radius, stair counts, and basement access for large family stock.',
        'Clarify Chesterfield vs Richmond City / Henrico / Colonial Heights addresses on every estimate.',
        'Verify Virginia DMV household goods / motor-carrier authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Chesterfield County?',
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
              'Chesterfield County Public Schools is the primary public K–12 system for most addresses. Assignment is address-based — marketing names like Midlothian or Brandermill do not guarantee a campus.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'Western and southern growth corridors can see enrollment pressure. Ask the district about capacity, transfers, and busing when touring.',
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
              'Bon Secours, VCU Health, and other regional facilities serve Chesterfield and greater Richmond corridors. Confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Midlothian or Chester to preferred campuses — Chippenham and VA-288 congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Master-planned product vs older southside stock',
            detail:
              'Expect HOA tracts and family two-stories across Midlothian–Brandermill–Chester growth; older canopy lots and denser product appear nearer the Richmond City line.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by corridor. Budget for HOA dues, larger utility footprints, and insurance on higher-value inventories.',
          },
          {
            title: 'HOA and multifamily governance',
            detail:
              'Planned communities and apartment complexes often control move hours, truck size, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Chesterfield areas fit whom',
        bullets: [
          {
            title: 'Midlothian / west growth',
            detail:
              'Often appeals for newer homes, schools reputation hunting, and retail access — with Chippenham logistics and HOA rules.',
          },
          {
            title: 'Brandermill / Woodlake lakes communities',
            detail:
              'Suits households seeking amenity-heavy planned living — with gate access and larger move inventories.',
          },
          {
            title: 'Chester / I-95 south',
            detail:
              'Attracts value seekers and I-95 corridor workers — with freeway noise and cross-locality address checks.',
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
              'Healthcare, logistics, retail, government, and Richmond metro professional services pull many Chesterfield households into city and Henrico job centers.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households are car-dependent. Chippenham, VA-288, US-60, and I-95 peaks are real. Test drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, multiple southsides',
            detail:
              'Chesterfield stacks master-planned villages, I-95 corridor workforce housing, and near-city older neighborhoods — different from Henrico’s west-end retail core or Richmond’s urban grid.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, frequent storms, and mild winters. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Family and retail corridors dominate daily life; downtown Richmond amenities are a commute away. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Chesterfield County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Virginia DMV motor-carrier / household goods authorization for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Chesterfield County — official site',
        href: 'https://www.chesterfield.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'Chesterfield County Public Schools',
        href: 'https://www.chesterfield.k12.va.us/',
        external: true,
        note: 'Boundaries & calendars',
      },
      {
        label: 'Virginia 511 traffic',
        href: 'https://www.511virginia.org/',
        external: true,
        note: 'Chippenham / VA-288 / I-95 before load windows',
      },
      {
        label: 'Greater Richmond Partnership',
        href: 'https://www.grpva.com/',
        external: true,
        note: 'Regional economic context',
      },
    ],
  },
  directoryHint:
    'Prefer crews with HOA fluency for Midlothian–Brandermill product; honest Chippenham/VA-288 timing for cross-zone pairs; large-inventory and stair experience for family two-stories. Verify Virginia DMV household goods / motor-carrier authority for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
});
