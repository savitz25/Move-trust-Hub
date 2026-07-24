import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNvPack,
  NV_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/nevada/nv-shared';

/**
 * Washoe County, NV — Reno / Sparks industrial + residential / CA border.
 * NOT Clark (Las Vegas Valley), NOT Carson City capital grid, NOT Tahoe-only Douglas.
 */
export const washoeCountyNvIntelligence: CountyIntelligencePack = finalizeNvPack({
  countySlug: 'washoe',
  hubTitle: 'Washoe County Moving Intelligence Hub',
  eyebrow:
    'Washoe County, NV · Reno/Sparks industrial-residential & CA-border logistics',
  h1: 'Moving in Washoe County: Reno–Sparks Access, Industrial Corridors & CA-Border Logistics',
  heroOpener:
    'Washoe County, Nevada is not a Las Vegas Valley heat-and-HOA clone and not a Carson City capital-scale template — it is Reno and Sparks stacked with downtown multi-unit density, industrial-residential edges, Truckee Meadows HOA growth, Incline Village / Tahoe approaches, and California-border freeflow that rewrites authority and portal-time assumptions. A Midtown walk-up, a Sparks industrial-adjacent ranch, a Damonte Ranch HOA driveway, and a North Valleys desert lot do not share truck access or crew skill. I-80, US-395, and I-580 freeflow turn short pairs into billable hours, and any California leg is an interstate job. This hub is for people moving in Washoe County, NV — not a renamed Clark County page.',
  heroCredibility:
    'NTA household goods CPCN for intrastate · FMCSA for interstate (including CA border) · Reno/Sparks access & corridor logistics awareness · Curated listings',
  majorCorridors: 'I-80 · US-395 · I-580 · local Reno/Sparks grid',
  whatMakesDifferent: {
    title: 'What makes moving in Washoe County different',
    intro:
      'These are Reno/Sparks and Truckee Meadows realities — industrial-residential mix, CA-border authority risk, and mountain-edge product — not Strip-adjacent Valley heat logistics and not capital-city scale alone.',
    bullets: [
      {
        title: 'Reno downtown / Midtown multi-unit is not Sparks tract product',
        detail:
          'Walk-ups, older multi-unit, limited elevators, and scarce curb stack labor that Damonte Ranch cul-de-sacs and Spanish Springs driveways do not share. Flat-rate optimism from open suburban lots underprices stair and curb surveys.',
      },
      {
        title: 'Industrial-residential edges rewrite staging and empty miles',
        detail:
          'Sparks warehouse belts, East Reno industrial-adjacent housing, and logistics corridors mix freight traffic with residential curb. Crews must price approach freeflow and limited staging honestly.',
      },
      {
        title: 'Truckee Meadows growth HOAs are not North Valleys open lots',
        detail:
          'Damonte Ranch, Double Diamond, Somersett edges, and planned villages enforce gate lists, truck limits, and timed windows. North Valleys and desert-edge product flips to long carries and heat exposure without HOA admin.',
      },
      {
        title: 'California-border pairs are routine interstate jobs',
        detail:
          'Households regularly move Washoe ↔ Truckee, Tahoe CA, Sacramento approaches, or broader Northern California. An NTA household goods CPCN alone does not authorize California delivery — verify FMCSA USDOT/MC when any leg leaves Nevada.',
      },
      {
        title: 'I-80, US-395 & I-580 freeflow rewrite “local” estimates',
        detail:
          'Reno ↔ Sparks, South Meadows ↔ North Valleys, or Incline approaches look local and still burn 25–60+ minutes at peak — longer with Sierra weather. Price portal-to-portal honestly.',
      },
      {
        title: 'This is not Clark County and not Carson City alone',
        detail:
          'Ignore Strip-adjacent COI heat scripts and do not treat the capital’s smaller urban grid as interchangeable with Reno/Sparks industrial-residential product. Corridors and housing mix differ.',
      },
      {
        title: 'Four-season weather is real — including Sierra snow risk',
        detail:
          'Summer heat, winter ice and snow (especially Incline / mountain approaches), and wind reshape open carries and cancellation soft costs. Vegas-only heat templates miss Washoe’s seasonal stack.',
      },
      NV_REG_BULLET,
    ],
  },
  zonesHeading: 'Washoe County / Reno–Sparks access zones',
  zonesIntro:
    'Plan by Reno core multi-unit, Sparks industrial-residential, South Meadows growth, North Valleys desert product, and Incline / Tahoe approaches — access rules cluster by product and elevation more than ZIP alone.',
  zones: [
    {
      id: 'reno-core-midtown',
      name: 'Reno core, Midtown, downtown & walk-up multi-unit',
      shortName: 'Reno core',
      neighborhoods: [
        'Downtown Reno',
        'Midtown',
        'University of Nevada, Reno edges',
        'Old Southwest edges',
        'Wells Avenue corridors',
        'Riverwalk multi-unit edges',
      ],
      housingTypes: 'Walk-up multifamily, older SFH, limited mid-rise, student-adjacent multi-unit',
      challenges: [
        'Stairs, scarce curb, and building access rules',
        'I-80 / Virginia Street freeflow at peak',
        'Campus lease-turnover spikes near UNR',
      ],
      moverTips:
        'Survey stair counts with photos. Prefer mid-week early starts. Avoid peak student move-in weekends near UNR when flexible. Confirm building COI rules where elevators exist.',
      cityKeywords: [
        'reno',
        'midtown',
        'downtown reno',
        'university',
        'unr',
      ],
    },
    {
      id: 'sparks-industrial-residential',
      name: 'Sparks, Victorian Square edges & industrial-residential belts',
      shortName: 'Sparks',
      neighborhoods: [
        'Sparks',
        'Victorian Square edges',
        'Spanish Springs approaches',
        'East Sparks industrial edges',
        'Prater Way corridors',
        'Pyramid Highway residential edges',
      ],
      housingTypes: 'SFH, multi-unit, industrial-adjacent residential, newer tract pockets',
      challenges: [
        'Freight traffic mixed with residential curb',
        'I-80 / US-395 freeflow',
        'Longer empty miles vs Reno core for some pairs',
      ],
      moverTips:
        'Price industrial-corridor freeflow honestly. Photo driveway and curb staging. Clarify Sparks vs Reno addresses on every estimate.',
      cityKeywords: [
        'sparks',
        'spanish springs',
        'pyramid',
        'prater',
      ],
    },
    {
      id: 'south-meadows-growth',
      name: 'South Meadows, Damonte Ranch & southern HOA growth',
      shortName: 'South Meadows',
      neighborhoods: [
        'South Meadows',
        'Damonte Ranch',
        'Double Diamond edges',
        'Steamboat edges',
        'South Reno planned villages',
        'I-580 south residential edges',
      ],
      housingTypes: 'HOA SFH, townhomes, master-planned communities, newer multi-family',
      challenges: [
        'HOA gate lists, truck-length limits, and timed windows',
        'I-580 / US-395 freeflow to core and Sparks pairs',
        'Longer empty miles vs downtown Reno',
      ],
      moverTips:
        'Collect HOA packets and gate codes early. Confirm truck length rules. Price I-580 portal time for northbound unload pairs.',
      cityKeywords: [
        'south meadows',
        'damonte ranch',
        'double diamond',
        'reno',
      ],
    },
    {
      id: 'northwest-somersett',
      name: 'Northwest Reno, Somersett & hillside HOA product',
      shortName: 'NW Reno / Somersett',
      neighborhoods: [
        'Somersett edges',
        'Northwest Reno corridors',
        'Mogul edges',
        'Verdi approaches',
        'Hillside planned pockets',
        'I-80 west residential edges',
      ],
      housingTypes: 'HOA SFH, hillside custom homes, gated pockets, limited multi-family',
      challenges: [
        'Driveway grade, turnaround, and truck-length limits',
        'HOA and private-road access rules',
        'I-80 west freeflow and winter weather risk',
      ],
      moverTips:
        'Photo driveway pitch and turnarounds. Collect HOA/private-road rules early. Build weather contingency for winter west approaches toward Verdi / CA border.',
      cityKeywords: [
        'somersett',
        'verdi',
        'mogul',
        'reno',
      ],
    },
    {
      id: 'north-valleys',
      name: 'North Valleys, Lemmon Valley & desert-edge product',
      shortName: 'North Valleys',
      neighborhoods: [
        'North Valleys',
        'Lemmon Valley edges',
        'Golden Valley edges',
        'Stead edges',
        'Cold Springs approaches',
        'US-395 north residential edges',
      ],
      housingTypes: 'Ranch SFH, desert-lot homes, multi-acre pockets, limited multi-family',
      challenges: [
        'Long portal time to South Meadows and Sparks pairs',
        'Open heat exposure and long driveway carries',
        'Dust, wind, and limited staging width',
      ],
      moverTips:
        'Never price North Valleys ↔ Damonte Ranch as a short hop without buffer. Plan early starts in summer heat. Confirm driveway photos and turnaround space.',
      cityKeywords: [
        'north valleys',
        'lemmon valley',
        'stead',
        'cold springs',
        'reno',
      ],
    },
    {
      id: 'incline-tahoe-approaches',
      name: 'Incline Village, Crystal Bay & Tahoe NV approaches',
      shortName: 'Incline / Tahoe NV',
      neighborhoods: [
        'Incline Village',
        'Crystal Bay edges',
        'Mount Rose approaches',
        'Lake Tahoe NV shoreline pockets',
        'Mountain-cabin product edges',
      ],
      housingTypes: 'Mountain SFH, cabins, condo multi-unit, seasonal second homes',
      challenges: [
        'Steep grades, narrow roads, and truck-length limits',
        'Winter snow/ice and seasonal access windows',
        'CA-side Tahoe pairs as interstate legs',
      ],
      moverTips:
        'Survey grades and turnarounds with photos. Prefer non-peak tourist windows when flexible. Treat any CA unload as FMCSA interstate. Build winter contingency into every mountain estimate.',
      cityKeywords: [
        'incline village',
        'crystal bay',
        'incline',
        'tahoe',
        'mount rose',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Washoe County moving costs',
    intro:
      'Access product, HOA/mountain grades, industrial freeflow, and I-80 / US-395 portal time move the number more than packing skill alone — this is Reno/Sparks logistics, not Las Vegas Valley pricing.',
    drivers: [
      {
        title: 'Walk-up stairs, curb scarcity & older multi-unit',
        detail:
          'Reno core and Midtown product add flight counts that suburban driveway jobs do not share.',
      },
      {
        title: 'HOA gates & southern growth windows',
        detail:
          'South Meadows and planned villages rewrite jobs that look simple on a map.',
      },
      {
        title: 'I-80 · US-395 · I-580 congestion',
        detail:
          'Cross-metro and valley-to-mountain pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Mountain grades, snow risk & Incline access',
        detail:
          'Tahoe approaches add truck limits, weather contingency, and careful-handling soft costs.',
      },
      {
        title: 'CA-border & multi-county empty miles',
        detail:
          'Truckee, Tahoe CA, Carson City, and Douglas destinations raise staging distance and FMCSA complexity when leaving Nevada.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,900+',
        note: 'Higher with walk-ups, HOA gates, or mountain approaches',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,500–$4,600+',
        note: 'Stairs, HOA, freeflow, and weather soft costs trend up',
      },
      {
        label: '3–4+ BR / mountain / cross-zone',
        value: '$3,000–$9,500+',
        note: 'Incline grades and long I-80 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$120–$220+/hr',
        note: 'Portal-to-portal; packing, HOA admin, grades, and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Washoe County move',
    intro:
      'Lease cycles, campus calendars, summer heat, Sierra snow risk, and CA-border tourism reshape access and crew availability across Reno, Sparks, and mountain approaches.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease industrial freeflow, and reduce I-80 / US-395 pain. Avoid month-end Fridays when leases and campus turnover collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Apartment turnover, family school calendars, and summer heat fill first. Book 2–4 weeks ahead for peak weekends and HOA slots.',
      },
      {
        title: 'Winter ice, snow & mountain approaches',
        detail:
          'December–March adds icy stoops, mountain pass risk, and Incline access limits. Prefer flexible dates and contingency for snow and melt on grades.',
      },
      {
        title: 'Campus & CA-border tourism spikes',
        detail:
          'UNR lease waves and Tahoe tourism weekends shrink curb and crew availability. Avoid unbuffered load windows near known peaks when flexible.',
      },
    ],
  },
  specialized: [
    {
      id: 'washoe-reno-sparks-border',
      title: 'Washoe County Reno–Sparks, HOA & CA-border logistics module',
      intro:
        'Washoe estimates fail more often on stair surveys, industrial freeflow, mountain grades, and interstate authority than on packing skill alone.',
      bullets: [
        'Photo stair counts, curb options, and driveway grades before the survey is final.',
        'Collect HOA packets early for South Meadows, Somersett, and planned-village product.',
        'Price portal-to-portal time for any pair that rides I-80, US-395, or I-580 at peak.',
        'Build weather contingency for Incline / mountain approaches and winter west I-80 legs.',
        'Clarify Reno, Sparks, unincorporated Washoe, and Incline addresses on every estimate.',
        'For in-state jobs verify NTA household goods CPCN; verify FMCSA for any out-of-state leg — especially California-border pairs.',
      ],
    },
    {
      id: 'not-clark-not-carson-clone',
      title: 'Not Clark Valley · not Carson City capital clone module',
      intro:
        'A single “Northern Nevada rate” collapses when Reno/Sparks industrial-residential product is confused with Las Vegas Valley heat logistics or Carson City capital-scale grids alone.',
      bullets: [
        'Do not price Midtown walk-ups like Strip elevators or like Minden ranch driveways.',
        'Keep Washoe vs Carson City vs Douglas county lines clear on every multi-address estimate.',
        'Match campus lease peaks separately from suburban school-calendar waves and Tahoe tourism.',
        'Treat California legs as interstate authority problems — NTA CPCN alone is not enough for CA delivery.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Washoe County?',
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
              'Washoe County School District covers Reno, Sparks, Incline Village, and unincorporated communities with address-based assignment. Marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs, charters, and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year — including Incline / mountain schools.',
          },
          {
            title: 'Research sources',
            detail:
              'WCSD boundary tools, Nevada Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Renown Health, Saint Mary’s, Northern Nevada Medical Center (Sparks), and related campuses anchor care across the Truckee Meadows. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-80 and US-395 freeflow change “nearby” on paper, especially from North Valleys or Incline. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Housing mix',
            detail:
              'Expect Reno core walk-ups and older SFH; Sparks industrial-adjacent product; South Meadows HOA growth; North Valleys desert lots; Incline mountain and second-home stock.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by elevation and product. Budget for HOA dues, winter heating, and mountain-access risk where relevant.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Associations and multi-unit management often control move hours, truck size, and deposits. Read documents carefully before locking a crew day.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Reno core / Midtown urban lifestyle',
            detail:
              'Suits people prioritizing walkability and amenities — with stairs, curb limits, and denser staging constraints.',
          },
          {
            title: 'Sparks industrial-residential living',
            detail:
              'Often appeals for relative value and logistics-job proximity — with freight freeflow and mixed curb product.',
          },
          {
            title: 'South Meadows growth belts',
            detail:
              'Fits buyers chasing newer product and schools — with HOA rules and longer empty miles to the core.',
          },
          {
            title: 'Incline / Tahoe NV mountain living',
            detail:
              'Attracts households seeking lake access and second-home character — with grades, weather, and tourism tradeoffs.',
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
              'Logistics and warehousing, manufacturing, healthcare, university/education, gaming/hospitality, tech/professional services, and public sector concentrate demand across Reno and Sparks.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak freeway freeflow is real — including reverse industrial commutes and CA-border workers. Test peak routes before choosing solely on rent or purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Local character',
            detail:
              'Washoe County stacks urban Reno cores, Sparks industrial belts, Truckee Meadows growth, and Tahoe mountain edges — different from Las Vegas Valley product and from capital-scale Carson City alone.',
          },
          {
            title: 'Climate',
            detail:
              'High-desert four-season climate with hot summers, cold winters, Sierra snow risk at elevation, and wind. Plan outdoor staging, heat, ice, and mountain contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — campus calendars, industrial shifts, and Tahoe tourism reshape daily rhythm by zone.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Washoe County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify NTA household goods CPCN status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Washoe County, Nevada — official site',
        href: 'https://www.washoecounty.gov/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Reno',
        href: 'https://www.reno.gov/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'City of Sparks',
        href: 'https://www.cityofsparks.us/',
        external: true,
        note: 'Industrial-residential municipality context',
      },
      {
        label: 'NDOT — traveler information',
        href: 'https://nvroads.com/',
        external: true,
        note: 'I-80 / US-395 / I-580 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with stair and multi-unit fluency for Reno core/Midtown; industrial freeflow awareness for Sparks; HOA gate fluency for South Meadows growth; mountain-grade and weather discipline for Incline approaches. Verify Nevada Transportation Authority (NTA) household goods CPCN for intrastate moves and FMCSA for interstate legs (including California-border pairs) before deposits.',
  lastReviewed: '2026-07-24',
});
