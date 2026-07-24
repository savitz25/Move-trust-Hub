import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWaPack,
  WA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/washington/wa-shared';

/**
 * Snohomish County, WA — Everett north-metro, Boeing/industrial + suburbs
 * (not Seattle core clone, not King Eastside rename).
 */
export const snohomishCountyWaIntelligence: CountyIntelligencePack = finalizeWaPack({
  countySlug: 'snohomish',
  hubTitle: 'Snohomish County Moving Intelligence Hub',
  eyebrow: 'Snohomish · Everett, Boeing/industrial & north-metro suburb logistics',
  h1: 'Moving in Snohomish County: Everett Access, Boeing Corridors & North-Metro Suburbs',
  heroOpener:
    'Snohomish County is not a Seattle neighborhood clone and not a Bellevue tech rename — it is Everett’s industrial and waterfront-edge product, Boeing and aerospace workforce housing, and fast-growing suburbs from Lynnwood and Mill Creek to Marysville, Lake Stevens, and Monroe. A downtown Everett walk-up, an industrial-edge apartment near the Boeing corridor, a Mill Creek HOA two-story, and a rural-edge acreage near Monroe do not share truck access or crew skill. I-5, SR-9, SR-2, I-405 links, and US-2 rewrite “local” estimates that ignore north-metro freeflow, mountain-pass weather on US-2, and suburb HOA gates. This hub is for people moving in Snohomish County — not a renamed King County page or generic Puget Sound template.',
  heroCredibility:
    'Washington UTC household goods permit for intrastate moves · FMCSA for interstate · Everett industrial & north-metro suburb logistics awareness · Curated listings',
  majorCorridors: 'I-5 · SR-9 · SR-2 · I-405 links · US-2',
  whatMakesDifferent: {
    title: 'What makes moving in Snohomish County different',
    intro:
      'These are Snohomish and north-metro realities — Everett industrial edges, aerospace workforce housing, and suburban growth belts — not Seattle hill elevators or Pierce JBLM PCS calendars.',
    bullets: [
      {
        title: 'Everett core and industrial-edge product is its own logistics stack',
        detail:
          'Downtown Everett, waterfront-adjacent blocks, and Boeing-corridor multifamily need curb surveys, stair or elevator access, and industrial-arterial timing that Mill Creek cul-de-sac quotes underprice.',
      },
      {
        title: 'Aerospace and industrial workforce calendars reshape demand',
        detail:
          'Boeing-linked and industrial shift schedules create mid-week and off-peak move windows that pure school-calendar SFH markets do not mirror. Clarify hard dates when employer or shift changes drive the move.',
      },
      {
        title: 'South Snohomish suburb belts are not Everett clones',
        detail:
          'Lynnwood, Edmonds, Mountlake Terrace, Bothell edges, and Mill Creek stack HOA rules, denser multifamily near light rail, and I-5 / I-405 link congestion different from Marysville or Monroe acreage access.',
      },
      {
        title: 'I-5, SR-9, SR-2, and US-2 turn short map miles into billable hours',
        detail:
          'Everett ↔ Mill Creek, Lynnwood ↔ Lake Stevens, or Monroe ↔ Edmonds pairs look local and still burn 35–80+ minutes at peak. US-2 weather and SR-9 freeflow punish odometer optimism — price portal-to-portal honestly.',
      },
      {
        title: 'East-county foothills and rural edges need different truck plans',
        detail:
          'Monroe, Snohomish (city), Sultan edges, and foothill lots stack long driveways, limited turn radius, and US-2 approach risk. A south-county apartment crew assumption fails on acreage staging.',
      },
      {
        title: 'Light-rail and growth-corridor apartments add COI and parking friction',
        detail:
          'Lynnwood and south-county densification bring elevator packets, guest-parking maps, and lease-end waves. Survey building rules before treating every unit as a simple ground-floor job.',
      },
      {
        title: 'King-linked reverse-commute pairs are routine',
        detail:
          'Households regularly move Snohomish ↔ Seattle, Bellevue, Redmond, or Shoreline. Clarify addresses so Washington UTC household goods permit vs FMCSA interstate assumptions stay accurate when any leg leaves Washington.',
      },
      WA_REG_BULLET,
    ],
  },
  zonesHeading: 'Snohomish County access zones',
  zonesIntro:
    'Plan by Everett core and industrial edges, south Snohomish growth suburbs, Mill Creek and central family belts, Marysville–north corridors, and east-county foothills along US-2 — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'everett-core-industrial',
      name: 'Everett core, waterfront edges & Boeing corridor',
      shortName: 'Everett / industrial',
      neighborhoods: [
        'Downtown Everett',
        'Everett waterfront edges',
        'Boeing corridor multifamily',
        'North Everett',
        'South Everett edges',
      ],
      housingTypes: 'Walk-ups, mid-rise multifamily, older SFH, workforce apartments',
      challenges: [
        'Industrial-arterial and shift-change congestion',
        'Stairs, curb limits, and mixed alley staging',
        'I-5 / SR-529 / US-2 approach clusters',
      ],
      moverTips:
        'Photo curb and stair access. Build I-5 buffers for south-county pairs. Ask about employer-driven hard dates and partial loads.',
      cityKeywords: [
        'everett',
        'downtown everett',
        'boeing',
        'north everett',
        'south everett',
      ],
    },
    {
      id: 'south-snohomish-growth',
      name: 'South Snohomish growth belt (Lynnwood, Edmonds, Mountlake Terrace)',
      shortName: 'South Snohomish',
      neighborhoods: [
        'Lynnwood',
        'Edmonds',
        'Mountlake Terrace',
        'Brier',
        'Bothell edges',
        'Shoreline-adjacent edges',
      ],
      housingTypes: 'Denser multifamily, townhomes, mid-century SFH, transit-adjacent product',
      challenges: [
        'Elevator COIs and guest-parking friction on newer stacks',
        'I-5 / I-405 link congestion into King County',
        'High apartment turnover near transit corridors',
      ],
      moverTips:
        'Collect building packets early. Price portal-to-portal time for Seattle- and Eastside-linked pairs. Clarify King vs Snohomish addresses near Bothell.',
      cityKeywords: [
        'lynnwood',
        'edmonds',
        'mountlake terrace',
        'brier',
        'bothell',
      ],
    },
    {
      id: 'mill-creek-central',
      name: 'Mill Creek, Silver Lake & central family belts',
      shortName: 'Mill Creek / central',
      neighborhoods: [
        'Mill Creek',
        'Silver Lake',
        'Martha Lake edges',
        'Seattle Hill edges',
        'Clearview edges',
      ],
      housingTypes: 'HOA two-story SFH, townhomes, limited multifamily',
      challenges: [
        'HOA gate lists, truck-length rules, and move-hour windows',
        'I-5 / SR-527 / SR-9 approach clusters',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Confirm HOA rules before the crew day. Survey driveway turn radius and cul-de-sac truck length. Book peak Saturdays early for larger SFH.',
      cityKeywords: [
        'mill creek',
        'silver lake',
        'martha lake',
        'clearview',
        'seattle hill',
      ],
    },
    {
      id: 'marysville-north',
      name: 'Marysville, Arlington edges & north I-5 corridor',
      shortName: 'Marysville / North',
      neighborhoods: [
        'Marysville',
        'Arlington edges',
        'Smokey Point edges',
        'Tulalip edges',
        'North I-5 multifamily',
      ],
      housingTypes: 'SFH, townhomes, apartments, tribal-adjacent and corridor rentals',
      challenges: [
        'I-5 freeflow collapse at peak and event windows',
        'Longer empty miles from south-county staging yards',
        'Mixed driveway geometry and apartment parking maps',
      ],
      moverTips:
        'Build I-5 buffers for Everett- and Lynnwood-linked pairs. Survey parking and driveway access. Confirm jurisdiction on tribal-adjacent addresses when applicable.',
      cityKeywords: [
        'marysville',
        'arlington',
        'smokey point',
        'tulalip',
        'north everett',
      ],
    },
    {
      id: 'lake-stevens-east-central',
      name: 'Lake Stevens, Snohomish city & east-central growth',
      shortName: 'Lake Stevens / Snohomish',
      neighborhoods: [
        'Lake Stevens',
        'Snohomish',
        'Lake Stevens waterfront edges',
        'Machias edges',
        'Hartford edges',
      ],
      housingTypes: 'Newer SFH, townhomes, some older downtown stock, limited multifamily',
      challenges: [
        'SR-9 / US-2 connector congestion',
        'HOA rules on newer tracts',
        'Mixed lake-access and hillside driveway grades',
      ],
      moverTips:
        'Photo driveway grade and curb. Price SR-9 and US-2 buffers. Inventory garages and outbuildings on larger lots carefully.',
      cityKeywords: [
        'lake stevens',
        'snohomish',
        'machias',
        'hartford',
      ],
    },
    {
      id: 'monroe-us2-foothills',
      name: 'Monroe, Sultan edges & US-2 foothills',
      shortName: 'Monroe / US-2',
      neighborhoods: [
        'Monroe',
        'Sultan edges',
        'Startup edges',
        'Gold Bar edges',
        'US-2 corridor residential',
      ],
      housingTypes: 'SFH, acreage, manufactured homes, limited multifamily',
      challenges: [
        'US-2 weather, construction, and peak freeflow risk',
        'Long driveways and limited truck turn radius',
        'Longer empty miles from Everett or Lynnwood yards',
      ],
      moverTips:
        'Check US-2 conditions before load windows. Survey driveway length, grade, and turnaround. Prefer flexible weather windows in winter and shoulder seasons.',
      cityKeywords: [
        'monroe',
        'sultan',
        'gold bar',
        'startup',
        'us-2',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Snohomish County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. HOA soft costs, apartment parking, industrial-edge access, and I-5 / SR-9 / US-2 portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'I-5 · SR-9 · SR-2 · US-2 congestion',
        detail:
          'North–south and east–west pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'HOA gates & south-county building packets',
        detail:
          'Mill Creek, Lynnwood, and densifying multifamily add timed windows and admin soft costs.',
      },
      {
        title: 'Everett industrial-edge & workforce multifamily access',
        detail:
          'Curb limits, stairs, and shift-change congestion rewrite labor on corridor apartments.',
      },
      {
        title: 'Foothill driveways & rural-edge staging',
        detail:
          'Monroe and US-2 corridor lots add long carries, turn-radius risk, and weather contingency.',
      },
      {
        title: 'King-linked reverse-commute empty miles',
        detail:
          'Seattle and Eastside destinations raise staging distance and authority complexity when any leg leaves Washington.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,650+',
        note: 'Higher with elevators, apartments, or peak I-5 pairs',
      },
      {
        label: '2–3BR condo, townhome, or walk-up',
        value: '$1,300–$4,100+',
        note: 'HOA, parking, and stairs trend up',
      },
      {
        label: '3–4+ BR / cross-zone SFH / acreage',
        value: '$2,600–$8,500+',
        note: 'Long I-5 or US-2 pairs and rural staging price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$205+/hr',
        note: 'Portal-to-portal; packing, HOA admin, and long carries scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Snohomish County move',
    intro:
      'Lease cycles, school calendars, aerospace workforce shifts, rain, and US-2 weather reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease I-5 / SR-9 pain, and reduce apartment-lot conflict. Avoid month-end Fridays when leases and HOA elevators collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family SFH Saturdays and apartment turnover fill first. Book 2–4 weeks ahead for peak weekends and south-county building windows.',
      },
      {
        title: 'Rain and US-2 winter/shoulder risk',
        detail:
          'Wet staging slows open carries countywide; US-2 foothill weather and closures can wipe east-county load windows. Prefer flexible dates and early condition checks.',
      },
      {
        title: 'Employer and mid-month growth spikes',
        detail:
          'Aerospace, industrial, and reverse-commute relocations often land mid-month. Confirm hard move-in dates, temporary housing, and storage-in-transit early.',
      },
    ],
  },
  specialized: [
    {
      id: 'everett-industrial-north-metro',
      title: 'Everett industrial & north-metro suburb logistics module',
      intro:
        'Snohomish estimates fail more often on industrial-edge access, HOA packets, I-5 freeflow, and US-2 weather than on packing skill alone.',
      bullets: [
        'Photo curb, stairs, and apartment parking maps for Everett corridor multifamily.',
        'Collect HOA and building COI packets for Mill Creek, Lynnwood, and denser south-county product.',
        'Price portal-to-portal time for any pair that rides I-5, SR-9, SR-2, I-405 links, or US-2 at peak.',
        'Check US-2 conditions before Monroe / foothill load windows; build weather contingency.',
        'Clarify Snohomish vs King addresses near Bothell, Edmonds, and Shoreline edges.',
        'Ask aerospace and industrial households about shift-driven hard dates and partial loads.',
        'Verify Washington UTC household goods permit for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Snohomish County?',
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
              'Everett, Edmonds, Mukilteo, Northshore (shared with King edges), Lake Stevens, Marysville, Monroe, Snohomish, Arlington, and other districts cover the county. Assignment is address-based — marketing names do not guarantee a campus.',
          },
          {
            title: 'Growth pressure & boundary edges',
            detail:
              'Fast-growing suburbs can see enrollment pressure and boundary changes. Confirm eligibility windows, transportation, and waitlists early when relocating mid-year.',
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
              'Providence (Everett and regional), Swedish Edmonds, and other campuses anchor care across the county; many households also use King County specialty networks. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Mill Creek, Marysville, or Monroe to preferred campuses — I-5 and US-2 congestion change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Everett stock, south-county density & east-county growth',
            detail:
              'Expect older SFH and multifamily in Everett; densifying apartments and townhomes in Lynnwood and Edmonds; HOA two-stories in Mill Creek and Lake Stevens; and acreage/foothill product toward Monroe.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by city and pocket. Budget for HOA/condo dues, commute tradeoffs, and older-building repair risk.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Condo associations and suburban HOAs often control move hours, truck size, elevators, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Snohomish areas fit whom',
        bullets: [
          {
            title: 'Everett urban-industrial lifestyle',
            detail:
              'Suits people prioritizing employment proximity and city services — with industrial-edge access and older-stock logistics on move day.',
          },
          {
            title: 'South Snohomish transit and reverse-commute living',
            detail:
              'Often appeals for King County job access and denser housing options — with I-5 / I-405 timing and multifamily building rules.',
          },
          {
            title: 'Mill Creek and central family belts',
            detail:
              'Attracts households seeking planned neighborhoods and schools — with HOA rules and Saturday peak demand.',
          },
          {
            title: 'Marysville north and Monroe foothills',
            detail:
              'Fits buyers chasing space or lower density — with longer I-5 or US-2 commutes and different driveway staging needs.',
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
              'Aerospace and advanced manufacturing, Port of Everett logistics, healthcare, education, retail, and reverse-commute into King County tech and professional jobs concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households mix driving and growing transit options. I-5, SR-9, SR-2, I-405 links, and US-2 peaks are real. Test drive peak routes before choosing solely on rent or purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, many Snohomishs',
            detail:
              'Snohomish stacks Everett industrial heritage, south-county densification, planned family suburbs, and foothill edges — different from Seattle tower living or Pierce military-installation rhythm.',
          },
          {
            title: 'Climate',
            detail:
              'Mild wet winters, drier summers, and foothill weather risk along US-2. Plan outdoor staging and wet-weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Waterfront and city amenities in Everett sit beside quieter suburban and foothill living. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Snohomish County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Washington UTC household goods permit status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Snohomish County — official site',
        href: 'https://snohomishcountywa.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Everett',
        href: 'https://everettwa.gov/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'Everett Public Schools',
        href: 'https://www.everettsd.org/',
        external: true,
        note: 'Boundaries & calendars (Everett addresses)',
      },
      {
        label: 'WS-DOT traffic & travel alerts',
        href: 'https://wsdot.com/travel/real-time/',
        external: true,
        note: 'I-5 / SR-9 / US-2 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with Everett industrial-edge and multifamily fluency; HOA readiness for Mill Creek and south-county product; honest I-5 · SR-9 · SR-2 · US-2 timing for cross-zone pairs; US-2 weather contingency for foothill jobs. Verify Washington UTC household goods permit for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
