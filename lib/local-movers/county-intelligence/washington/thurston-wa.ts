import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWaPack,
  WA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/washington/wa-shared';

/**
 * Thurston County, WA — Olympia capital south-Sound (not Seattle, not Tacoma clone).
 */
export const thurstonCountyWaIntelligence: CountyIntelligencePack = finalizeWaPack({
  countySlug: 'thurston',
  hubTitle: 'Thurston County Moving Intelligence Hub',
  eyebrow: 'Thurston · Olympia capital, Lacey–Tumwater & south-Sound logistics',
  h1: 'Moving in Thurston County: Olympia Capital Access, Lacey–Tumwater Corridors & South-Sound Logistics',
  heroOpener:
    'Thurston County is not a Seattle micro-market and not a Tacoma rename — it is Olympia’s capital-city grids and waterfront edges, Lacey and Tumwater family and multifamily belts, state-government workforce calendars, and south-Sound arterials that connect I-5 to US-101 and the Capitol campus. A downtown Olympia walk-up, a West Olympia hillside driveway, a Lacey HOA two-story, and a rural south-county acreage do not share truck access or crew skill. I-5, US-101, SR-510, and Capitol corridors rewrite “local” estimates that ignore government-calendar spikes, legislative-session energy, and south-Sound freeflow. This hub is for people moving in Thurston County — not a renamed King or Pierce page or generic Washington template.',
  heroCredibility:
    'Washington UTC household goods permit for intrastate moves · FMCSA for interstate · Olympia capital & south-Sound corridor logistics awareness · Curated listings',
  majorCorridors: 'I-5 · US-101 · SR-510 · Capitol corridors',
  whatMakesDifferent: {
    title: 'What makes moving in Thurston County different',
    intro:
      'These are Thurston and Olympia capital-region realities — government workforce housing, Lacey–Tumwater growth belts, and south-Sound corridor congestion — not Seattle elevators, Eastside tech HOAs, or JBLM gate logistics as the primary story.',
    bullets: [
      {
        title: 'State government and capital-city calendars reshape demand',
        detail:
          'Legislative session energy, agency hiring waves, and mid-month professional relocations create spikes that pure school-calendar Saturday markets underprice. Clarify hard start dates when government or contractor work drives the move.',
      },
      {
        title: 'Olympia core grids are not Lacey cul-de-sacs',
        detail:
          'Downtown, Eastside, and near-Capitol product need curb surveys, stairs, and tighter staging; Lacey and many Tumwater tracts need HOA rules and different driveway geometry. A single “Olympia rate” collapses across those products.',
      },
      {
        title: 'I-5, US-101, and SR-510 turn short map miles into billable hours',
        detail:
          'West Olympia ↔ Lacey, Tumwater ↔ Capitol campus, or Yelm ↔ downtown pairs look local and still burn 30–70+ minutes at peak. Price portal-to-portal honestly, not odometer optimism.',
      },
      {
        title: 'US-101 west and rural south edges need different truck plans',
        detail:
          'Black Lake, Cooper Point, and south-county acreage stack long driveways, limited turn radius, and rain-soft staging that apartment-crew assumptions fail on.',
      },
      {
        title: 'JBLM-adjacent north edges are secondary, not the whole county',
        detail:
          'Some northern Thurston households feel Pierce/JBLM spillover, but the county’s primary identity is capital south-Sound — do not paste a Tacoma military template over Olympia–Lacey–Tumwater.',
      },
      {
        title: 'Rain, hills, and tree canopy reshape open carries',
        detail:
          'Wet grades on West Olympia and rural lots shrink safe staging. Prefer early starts, mats and tarps, and driveway photos before final labor hours.',
      },
      {
        title: 'Cross-county south-Sound pairs are routine',
        detail:
          'Households regularly move Thurston ↔ Pierce, King, Lewis, or Mason. Clarify addresses so Washington UTC household goods permit vs FMCSA interstate assumptions stay accurate when any leg leaves Washington.',
      },
      WA_REG_BULLET,
    ],
  },
  zonesHeading: 'Thurston County access zones',
  zonesIntro:
    'Plan by Olympia capital core, West Olympia residential hills, Lacey growth belts, Tumwater I-5 edges, and south/east rural corridors (Yelm and beyond) — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'olympia-capital-core',
      name: 'Olympia capital core, downtown & near-Capitol grids',
      shortName: 'Olympia core',
      neighborhoods: [
        'Downtown Olympia',
        'Capitol Campus edges',
        'Eastside Olympia',
        'South Capitol edges',
        'Port of Olympia waterfront edges',
      ],
      housingTypes: 'Walk-ups, mid-rise multifamily, older SFH, denser mixed-use product',
      challenges: [
        'Limited legal curb and event/session-day freeflow',
        'Stairs and long carries on older stock',
        'I-5 / Capitol corridor / US-101 approach clusters',
      ],
      moverTips:
        'Prefer mid-week early starts around the Capitol core. Photo curb and stair access. Build corridor buffers for Lacey- or Tumwater-linked pairs.',
      cityKeywords: [
        'olympia',
        'downtown olympia',
        'capitol',
        'eastside olympia',
        'south capitol',
      ],
    },
    {
      id: 'west-olympia',
      name: 'West Olympia, Cooper Point & hillside residential',
      shortName: 'West Olympia',
      neighborhoods: [
        'West Olympia',
        'Cooper Point edges',
        'Black Lake edges',
        'Evergreen State College edges',
        'Kaiser Road corridor residential',
      ],
      housingTypes: 'SFH, hillside lots, some multifamily, college-adjacent rentals',
      challenges: [
        'Driveway grades and rain-slick approaches',
        'Tree canopy and limited truck length',
        'US-101 / local arterial freeflow at peak',
      ],
      moverTips:
        'Survey driveway grade and turnaround with photos. Inventory basements and garages carefully. Prefer early starts in wet weather.',
      cityKeywords: [
        'west olympia',
        'cooper point',
        'black lake',
        'evergreen',
        'kaiser',
      ],
    },
    {
      id: 'lacey-growth',
      name: 'Lacey growth belts & east Thurston family product',
      shortName: 'Lacey',
      neighborhoods: [
        'Lacey',
        'Hawks Prairie edges',
        'Meridian campus edges',
        'Lacey multifamily corridors',
        'Northeast Lacey residential',
      ],
      housingTypes: 'HOA two-story SFH, townhomes, apartments, newer planned tracts',
      challenges: [
        'HOA gate lists, truck-length rules, and move-hour windows',
        'I-5 / SR-510 approach clusters',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Confirm HOA rules before the crew day. Survey driveway turn radius. Price I-5 buffers for Olympia- or Pierce-linked pairs.',
      cityKeywords: [
        'lacey',
        'hawks prairie',
        'meridian',
        'northeast lacey',
      ],
    },
    {
      id: 'tumwater-i5',
      name: 'Tumwater, I-5 edges & south Olympia connectors',
      shortName: 'Tumwater / I-5',
      neighborhoods: [
        'Tumwater',
        'Tumwater Hill edges',
        'South Olympia edges',
        'Brewery District edges',
        'I-5 corridor multifamily',
      ],
      housingTypes: 'SFH, townhomes, apartments, mixed older and newer product',
      challenges: [
        'I-5 freeflow collapse at peak',
        'Mixed hill and valley driveway geometry',
        'Cross-zone pairs into Olympia core or Lacey',
      ],
      moverTips:
        'Build I-5 portal buffers honestly. Photo curb and driveway options. Clarify Olympia vs Tumwater city jurisdiction on every estimate.',
      cityKeywords: [
        'tumwater',
        'tumwater hill',
        'south olympia',
        'brewery district',
      ],
    },
    {
      id: 'yelm-east-rural',
      name: 'Yelm, Rainier edges & east/south rural corridors',
      shortName: 'Yelm / East rural',
      neighborhoods: [
        'Yelm',
        'Rainier edges',
        'Tenino edges',
        'East rural residential',
        'SR-510 corridor edges',
      ],
      housingTypes: 'SFH, acreage, manufactured homes, limited multifamily',
      challenges: [
        'Longer empty miles from Olympia/Lacey staging',
        'Long driveways and limited turn radius',
        'SR-510 freeflow and school-traffic spikes',
      ],
      moverTips:
        'Survey driveway surface, grade, and turnaround. Price empty miles honestly. Prefer flexible weather windows for soft-driveway risk after rain.',
      cityKeywords: [
        'yelm',
        'rainier',
        'tenino',
        'sr-510',
      ],
    },
    {
      id: 'north-thurston-jblm-edge',
      name: 'North Thurston edges toward Pierce / JBLM spillover',
      shortName: 'North Thurston edges',
      neighborhoods: [
        'North Lacey edges',
        'Martin Way corridor edges',
        'Nisqually-adjacent edges',
        'I-5 north toward Pierce',
      ],
      housingTypes: 'Apartments, townhomes, modest SFH, corridor rentals',
      challenges: [
        'I-5 northbound freeflow into Pierce',
        'Apartment parking and lease-end waves',
        'Occasional military-adjacent calendar spillover',
      ],
      moverTips:
        'Price I-5 portal time for Pierce-linked pairs. Survey apartment access maps. Do not assume full JBLM base-access rules apply to every north-edge address — confirm case by case.',
      cityKeywords: [
        'north lacey',
        'martin way',
        'nisqually',
        'lacey',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Thurston County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. HOA soft costs, hill grades, curb friction, and I-5 / US-101 / SR-510 portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'I-5 · US-101 · SR-510 · Capitol corridor congestion',
        detail:
          'Cross-zone pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'HOA gates & Lacey planned-tract rules',
        detail:
          'Timed windows and truck-length limits add admin soft costs before packing skill matters.',
      },
      {
        title: 'Olympia stairs, curb & older-stock geometry',
        detail:
          'Downtown and near-Capitol product add flight counts and tight staging that flat-rate optimism underprices.',
      },
      {
        title: 'Hill grades, rain & rural driveway staging',
        detail:
          'West Olympia and Yelm-area lots add long carries and weather contingency.',
      },
      {
        title: 'Multi-county south-Sound empty miles',
        detail:
          'Pierce, King, Lewis, and Mason destinations raise staging distance and authority complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$400–$1,500+',
        note: 'Higher with stairs, apartments, or peak I-5 pairs',
      },
      {
        label: '2–3BR condo, townhome, or walk-up',
        value: '$1,200–$3,800+',
        note: 'HOA, parking, and grades trend up',
      },
      {
        label: '3–4+ BR / cross-zone SFH / acreage',
        value: '$2,400–$7,800+',
        note: 'Long I-5 pairs and rural staging price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$195+/hr',
        note: 'Portal-to-portal; packing, HOA admin, and long carries scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Thurston County move',
    intro:
      'Government calendars, lease cycles, school windows, rain, and I-5 freeflow reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb around the Capitol core, ease I-5 / US-101 pain, and reduce apartment-lot conflict. Avoid month-end Fridays when leases and HOA windows collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family SFH Saturdays and apartment turnover fill first. Book 2–4 weeks ahead for peak weekends and Lacey HOA move slots.',
      },
      {
        title: 'Rain season grade and driveway friction',
        detail:
          'Fall–spring wet grades on West Olympia and rural lots slow open carries. Prefer early starts, mats, tarps, and flexible weather windows.',
      },
      {
        title: 'Legislative session and agency mid-month spikes',
        detail:
          'Capital-region professional relocations often land mid-month rather than only on Saturday peaks. Confirm hard move-in dates, temporary housing, and storage-in-transit early.',
      },
    ],
  },
  specialized: [
    {
      id: 'olympia-capital-south-sound',
      title: 'Olympia capital & south-Sound logistics module',
      intro:
        'Thurston estimates fail more often on Capitol-core curb, HOA packets, hill grades, and I-5 / US-101 portal time than on packing skill alone.',
      bullets: [
        'Prefer mid-week early starts for downtown and near-Capitol addresses; photo curb and stair access.',
        'Collect HOA packets and truck-size rules for Lacey planned tracts before the survey is final.',
        'Price portal-to-portal time for any pair that rides I-5, US-101, SR-510, or Capitol corridors at peak.',
        'Survey West Olympia and rural driveway grade, surface, and turnaround with photos.',
        'Clarify Olympia vs Lacey vs Tumwater vs rural Thurston addresses on every estimate.',
        'Ask government and contractor households about hard start dates and partial loads at estimate time.',
        'Verify Washington UTC household goods permit for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Thurston County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures town fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Olympia, North Thurston (Lacey area), Tumwater, Yelm, Rainier, Tenino, and other districts cover the county. Assignment is address-based — marketing names do not guarantee a campus.',
          },
          {
            title: 'Growth and boundary edges',
            detail:
              'Lacey and Yelm growth pockets can see enrollment pressure. Confirm eligibility windows, transportation, and waitlists early when relocating mid-year.',
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
              'Providence St. Peter Hospital and regional clinics anchor much of Thurston care; many households also use Pierce or King specialty networks. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from West Olympia, Lacey, or Yelm to preferred campuses — I-5 and SR-510 congestion change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Capital core, Lacey growth & rural edges',
            detail:
              'Expect denser and older stock near downtown Olympia; HOA two-stories and apartments in Lacey; mixed product in Tumwater; and acreage toward Yelm and south county.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by city and pocket, generally below Seattle–Eastside levels with tradeoffs in commute and inventory type. Budget for HOA dues and older-building or rural systems risk.',
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
        title: 'Which Thurston areas fit whom',
        bullets: [
          {
            title: 'Olympia capital-city lifestyle',
            detail:
              'Suits people prioritizing government employment proximity, walkable pockets, and waterfront access — with curb and stair logistics on move day.',
          },
          {
            title: 'Lacey family and services convenience',
            detail:
              'Often appeals for newer product, schools, and retail access — with HOA rules and I-5 / SR-510 timing.',
          },
          {
            title: 'Tumwater I-5 connector living',
            detail:
              'Attracts households seeking middle-ground access between Olympia core and southbound I-5 — with freeflow realism at peak.',
          },
          {
            title: 'Yelm and rural south/east edges',
            detail:
              'Fits buyers chasing space and quieter streets — with longer empty miles and driveway staging needs.',
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
              'State government and related contractors, healthcare, education (including Evergreen and SPSCC), retail/services, and reverse-commute or northbound pairs into Pierce concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households drive I-5, US-101, SR-510, and local Capitol corridors. Peaks are real around session days and standard rush hours. Test drive peak routes before choosing solely on rent or purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, many Thurstons',
            detail:
              'Thurston stacks capital-city culture, Lacey growth suburbs, Tumwater connectors, and rural edges — different from Seattle–Eastside tech living or Tacoma–JBLM military rhythm as the defining story.',
          },
          {
            title: 'Climate',
            detail:
              'Mild wet winters, drier summers, and year-round rain risk on grades and rural driveways. Plan outdoor staging and wet-weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Capitol politics and civic life, farmers markets, south-Sound outdoor access, and quieter suburban pockets coexist. Visit during session energy and quiet mid-week days when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Thurston County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Washington UTC household goods permit status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Thurston County — official site',
        href: 'https://www.thurstoncountywa.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Olympia',
        href: 'https://www.olympiawa.gov/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'Olympia School District',
        href: 'https://osd.wednet.edu/',
        external: true,
        note: 'Boundaries & calendars (Olympia addresses)',
      },
      {
        label: 'WS-DOT traffic & travel alerts',
        href: 'https://wsdot.com/travel/real-time/',
        external: true,
        note: 'I-5 / US-101 / SR-510 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with Olympia capital-core curb and stair fluency; Lacey HOA readiness; honest I-5 · US-101 · SR-510 · Capitol corridor timing for cross-zone pairs; rural driveway discipline for Yelm and south-county stock. Verify Washington UTC household goods permit for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
