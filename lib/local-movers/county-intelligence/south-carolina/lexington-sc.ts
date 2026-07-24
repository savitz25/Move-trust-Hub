import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeScPack,
  SC_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/south-carolina/sc-shared';

/**
 * Lexington County, SC — west-Columbia / Midlands growth (not Richland clone).
 * I-20 / I-26 belt, lake-adjacent housing, Cayce–West Columbia–Lexington–Irmo corridors.
 */
export const lexingtonCountyScIntelligence: CountyIntelligencePack = finalizeScPack({
  countySlug: 'lexington',
  hubTitle: 'Lexington County Moving Intelligence Hub',
  eyebrow: 'Lexington · west-Columbia suburbs · lake edges · Midlands I-20 / I-26 growth',
  h1: 'Moving in Lexington County: West-Columbia Suburbs, Lake Living & Midlands Freeway Runs',
  heroOpener:
    'Lexington County is the Midlands’ west-bank growth engine: West Columbia and Cayce river-adjacent fabric, Town of Lexington and Irmo family corridors, Lake Murray shoreline product, and Red Bank–Gilbert acreage that still feels rural. It shares a metro with Richland County but does not share the same curb rules, HOA density, or portal patterns. I-20, I-26, US-1, and US-378 rewrite “local” estimates that treat every Midlands ZIP as interchangeable downtown Columbia access. A Cayce bungalow, a Lake Murray pier-lot, a master-planned Lexington two-story, and a Batesburg-Leesville parcel do not share truck access or crew time. This hub is for people moving in Lexington County — not a renamed Richland page or generic Columbia template.',
  heroCredibility:
    'SC Class E (ORS/PSC) for intrastate moves · FMCSA for interstate · Midlands HOA & lake-corridor awareness · Curated listings',
  majorCorridors: 'I-20 · I-26 · US-1 · US-378 · local arterial grid',
  whatMakesDifferent: {
    title: 'What makes moving in Lexington County different',
    intro:
      'These are Lexington west-Columbia and lake-corridor realities — not Richland peninsula/downtown clone rules, not Upstate manufacturing belts, and not coastal tourism calendars.',
    bullets: [
      {
        title: 'West of the Congaree is its own access map',
        detail:
          'Cayce, West Columbia, and Springdale pairs into Richland destinations look short on a map and still burn bridge and I-26 / I-20 time. Price portal-to-portal honestly across the river.',
      },
      {
        title: 'Lake Murray shoreline product is not suburban flat',
        detail:
          'Chapin, Lake Murray shoreline roads, docks, boats, and grade change inventory and access rules versus inland Lexington HOA tracts.',
      },
      {
        title: 'Family HOA growth dominates Town of Lexington and Irmo edges',
        detail:
          'Newer subdivisions often require COI, approved hours, and truck limits. Soft costs show up before the first box is taped.',
      },
      {
        title: 'I-20 and I-26 are the real “local” meters',
        detail:
          'Cross-suburb runs (Irmo ↔ Lexington, West Columbia ↔ Red Bank, Cayce ↔ Chapin) ride freights that peak with Midlands work and school traffic.',
      },
      {
        title: 'Western rural towns still matter',
        detail:
          'Batesburg-Leesville, Gilbert, and Pelion edges bring longer empty miles, gravel approaches, and fewer HOA packets — survey-driven pricing beats ZIP averages.',
      },
      {
        title: 'Midlands multi-county pairs are routine',
        detail:
          'Households regularly move Lexington ↔ Richland, and sometimes to Calhoun, Newberry, or Aiken. Clarify county lines so Class E vs FMCSA assumptions stay accurate when any leg leaves South Carolina.',
      },
      SC_REG_BULLET,
    ],
  },
  zonesHeading: 'Lexington County access zones',
  zonesIntro:
    'Plan by West Columbia–Cayce river edge, Town of Lexington growth, Irmo / Ballentine, Lake Murray shoreline, and western rural towns — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'west-columbia-cayce',
      name: 'West Columbia, Cayce & Congaree river edge',
      shortName: 'West Cola / Cayce',
      neighborhoods: [
        'West Columbia',
        'Cayce',
        'Springdale edges',
        'Airport / US-321 approaches',
        'River-adjacent older streets',
      ],
      housingTypes: 'Older SFH, bungalows, multifamily, mixed commercial-edge product',
      challenges: [
        'Bridge and I-26 timing into Richland destinations',
        'Limited curb on denser older blocks',
        'Floodplain and weather contingency near low parcels',
      ],
      moverTips:
        'Photo curb options. Build bridge / I-26 buffer for Columbia-side pairs. Ask about ground-floor moisture risk on inventory near low elevations.',
      cityKeywords: ['west columbia', 'cayce', 'springdale', 'congaree', 'us-321'],
    },
    {
      id: 'town-lexington-growth',
      name: 'Town of Lexington, US-1 & family HOA growth',
      shortName: 'Town of Lexington',
      neighborhoods: [
        'Town of Lexington',
        'US-1 corridor',
        'Sunrise / south Lexington growth',
        'Red Bank approaches',
        'Master-planned family tracts',
      ],
      housingTypes: 'HOA SFH, townhomes, larger family inventories',
      challenges: [
        'HOA approved hours and truck limits',
        'US-1 / I-20 peak congestion',
        'High Saturday demand late May–August',
      ],
      moverTips:
        'Collect HOA packets early. Book peak Saturdays 2–4 weeks out. Price US-1 and I-20 portal time for cross-zone pairs.',
      cityKeywords: ['lexington sc', 'town of lexington', 'us-1', 'red bank', 'sunrise'],
    },
    {
      id: 'irmo-ballentine',
      name: 'Irmo, Ballentine & northern suburban corridors',
      shortName: 'Irmo / Ballentine',
      neighborhoods: ['Irmo', 'Ballentine', 'St. Andrews edges (Lexington side)', 'Harbison-adjacent approaches'],
      housingTypes: 'Established SFH, HOA pockets, multifamily near retail',
      challenges: [
        'I-26 peak congestion toward Columbia and Lake Murray',
        'Mixed HOA and non-HOA rules on short blocks',
        'School-calendar move clusters',
      ],
      moverTips:
        'Prefer early mid-week starts for I-26 pairs. Confirm which side of corridor boundaries the address sits on. Share driveway photos for wooded lots.',
      cityKeywords: ['irmo', 'ballentine', 'harbison', 'st andrews', 'i-26'],
    },
    {
      id: 'lake-murray',
      name: 'Lake Murray shoreline, Chapin & SC-6 approaches',
      shortName: 'Lake Murray / Chapin',
      neighborhoods: ['Chapin', 'Lake Murray shoreline roads', 'Marina and cove pockets', 'SC-6 lake approaches'],
      housingTypes: 'Lake-oriented SFH, pier lots, some gated and HOA shoreline product',
      challenges: [
        'Grade, tight drives, and limited truck turn radius',
        'Boat, dock, and outdoor gear spikes',
        'Storm and heat delays on open shoreline carries',
      ],
      moverTips:
        'Survey driveway grade and pier-lot access. Inventory watercraft carefully. Prefer dry early starts and weather contingency plans.',
      cityKeywords: ['chapin', 'lake murray', 'sc-6', 'marina', 'shoreline'],
    },
    {
      id: 'western-rural',
      name: 'Gilbert, Pelion, Batesburg-Leesville & western acreage',
      shortName: 'Western rural',
      neighborhoods: [
        'Gilbert',
        'Pelion',
        'Batesburg-Leesville',
        'US-378 western approaches',
        'Acreage and farm-edge parcels',
      ],
      housingTypes: 'Rural SFH, manufactured homes, outbuildings, modest town centers',
      challenges: [
        'Long empty miles from metro staging yards',
        'Gravel drives and limited turnaround',
        'Outbuilding and equipment inventory often undercounted',
      ],
      moverTips:
        'Require approach and outbuilding photos. Price empty miles from Lexington or West Columbia bases. Confirm power and well-house items on the inventory.',
      cityKeywords: ['gilbert', 'pelion', 'batesburg', 'leesville', 'us-378'],
    },
  ],
  costDrivers: {
    title: 'What drives Lexington County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Lake access, HOA soft costs, and I-20 / I-26 portal time separate cheap Midlands estimates from real bills.',
    drivers: [
      {
        title: 'I-20 / I-26 / US-1 congestion',
        detail: 'Cross-suburb and river-crossing pairs burn portal-to-portal hours at peak.',
      },
      {
        title: 'Lake Murray shoreline access & gear',
        detail: 'Driveway surveys, docks, and outdoor equipment add labor before packing skill matters.',
      },
      {
        title: 'Town of Lexington & Irmo HOA rules',
        detail: 'Gate lists, COI, and weekday-only windows push demand into peak pricing.',
      },
      {
        title: 'West Columbia–Cayce curb and bridge timing',
        detail: 'Older stock plus Columbia-side destinations raise staging friction.',
      },
      {
        title: 'Western rural empty miles',
        detail: 'Batesburg-Leesville and Pelion destinations raise staging distance from metro yards.',
      },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$375–$1,200+', note: 'Higher with stairs or peak freights' },
      { label: '2–3BR condo or modest SFH', value: '$1,150–$3,300+', note: 'HOA soft costs trend up' },
      { label: '3–4+ BR / lake / HOA / cross-zone', value: '$2,100–$6,500+', note: 'Lake lots and long I-20 pairs price highest' },
      { label: 'Typical 2-person crew rate', value: '$95–$165+/hr', note: 'Portal-to-portal; packing scales up' },
    ],
  },
  seasonal: {
    title: 'When to schedule a Lexington County move',
    intro: 'School calendars, lake recreation peaks, heat/humidity, and HOA windows reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb space and reduce I-26 / I-20 pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail:
          'Lexington and Irmo SFH Saturday demand fills first. Book 2–4 weeks ahead for peak weekends.',
      },
      {
        title: 'Summer heat, humidity, and lake storms',
        detail:
          'Afternoon storms slow shoreline carries. Prefer early starts and tarp plans for Lake Murray jobs.',
      },
      {
        title: 'Midlands corporate and government relocation clusters',
        detail:
          'Columbia-metro employers create mid-week spikes. Confirm report dates and any Richland-side storage needs early.',
      },
    ],
  },
  specialized: [
    {
      id: 'lexington-lake-midlands',
      title: 'Lake Murray & Midlands freeway module',
      intro:
        'Lexington estimates fail more often on lake access, HOA packets, and I-20 / I-26 portal time than on packing skill.',
      bullets: [
        'Collect HOA COI, gate lists, and approved hours before the survey is final.',
        'Price portal-to-portal time for any pair that rides I-20, I-26, US-1, or US-378 at peak.',
        'Survey Lake Murray driveways and inventory boats/docks as separate line items.',
        'Clarify Lexington vs Richland addresses on every estimate — river crossings change timing.',
        'Photo curb options for West Columbia / Cayce older stock.',
        'Verify SC Class E (ORS) for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Lexington County?',
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
              'Lexington County is served by multiple public school districts (commonly referenced as Lexington One, Two, Three, Four, Five, and others depending on address). Assignment is address-based — marketing names like Irmo or Lake Murray do not guarantee a campus.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'Town of Lexington, Chapin, and other growth corridors can see enrollment pressure. Ask the assigned district about capacity, transfers, and busing when touring.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, South Carolina Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Lexington Medical Center and affiliated sites serve much of the county, with additional Columbia-metro specialty options across the river. Confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Chapin or Red Bank to preferred campuses — I-20 / I-26 congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'River-edge older stock vs inland HOA growth',
            detail:
              'Expect more bungalows and mixed product in Cayce / West Columbia; larger family HOA tracts dominate much of Town of Lexington growth; lake premiums concentrate on Murray shoreline.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply from western rural towns to lake and Irmo corridors. Budget for HOA dues, lake insurance considerations, and older-home repair risk.',
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
        title: 'Which Lexington areas fit whom',
        bullets: [
          {
            title: 'Town of Lexington / family HOA corridors',
            detail:
              'Often appeals for newer homes and schools access — with freeway and HOA logistics on move day.',
          },
          {
            title: 'Lake Murray / Chapin shoreline lifestyle',
            detail:
              'Attracts recreation-focused households — with driveway grade, gear volume, and weather exposure tradeoffs.',
          },
          {
            title: 'West Columbia / Cayce near-metro edge',
            detail:
              'Suits people prioritizing shorter runs into Columbia amenities — with older curb and bridge timing realities.',
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
              'Healthcare, state and professional services across the Columbia metro, logistics along freights, retail, and local manufacturing/service employers concentrate along I-20, I-26, and US corridors.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households are car-dependent. I-26, I-20, and US-1 peaks are real. Test drive peak routes before choosing solely on purchase price or lake views.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, multiple Midlands lifestyles',
            detail:
              'Lexington stacks river-edge towns, HOA family suburbs, Lake Murray recreation, and western rural communities — related to Richland but not a clone of downtown Columbia patterns.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, frequent storms, mild winters. Plan outdoor staging and weather contingency as part of move-in, especially on the lake.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Lake weekends, high-school sports culture, and Columbia-metro dining/arts access coexist with quieter western towns. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Lexington County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify SC Class E / ORS for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Lexington County — official site',
        href: 'https://www.lex-co.com/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'Town of Lexington',
        href: 'https://www.lexsc.com/',
        external: true,
      },
      {
        label: 'City of West Columbia',
        href: 'https://www.westcolumbiasc.gov/',
        external: true,
      },
      {
        label: 'SCDOT 511 traffic',
        href: 'https://www.511sc.org/',
        external: true,
        note: 'I-20 / I-26 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with Lake Murray driveway and boat-inventory experience for shoreline jobs; HOA fluency for Town of Lexington and Irmo product; honest I-20 / I-26 / bridge timing for West Columbia–Cayce and cross-river pairs. Verify SC Class E (ORS) for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
});
