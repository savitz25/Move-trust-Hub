import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMnPack,
  MN_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/minnesota/mn-shared';

/**
 * Hennepin County, MN — Minneapolis neighborhoods, lakes, elevators/high-rises, west metro corporate (not St. Paul/Ramsey, not south-metro Dakota, not east-metro Washington MN).
 */
export const hennepinCountyMnIntelligence: CountyIntelligencePack = finalizeMnPack({
  countySlug: 'hennepin',
  hubTitle: 'Hennepin County Moving Intelligence Hub',
  eyebrow: 'Hennepin · Minneapolis elevators, lakeside stock & west-metro corporate logistics',
  h1: 'Moving in Hennepin County: Minneapolis Neighborhoods, Elevator Towers & West Metro Corridors',
  heroOpener:
    'Hennepin County is not a St. Paul capital clone and not a south-metro HOA template — it is Minneapolis neighborhood micro-markets with lakeside stairs and curb limits, downtown and Uptown elevator towers with building COIs and dock slots, west-metro corporate suburbs from Edina to Minnetonka, and I-94 / I-35W / I-394 / I-494 freeflow that rewrites “local” estimates. A North Loop loft freight elevator, a Whittier walk-up, a lakeside bungalow with winter driveway ice, and an Edina HOA driveway do not share truck access or crew skill. Winter staging, skyway-adjacent loading rules, and Fortune 500 relocation calendars are real inputs. This hub is for people moving in Hennepin County — not a renamed Ramsey page or generic Twin Cities script.',
  heroCredibility:
    'MnDOT household goods mover permit for intrastate moves · FMCSA for interstate · Minneapolis elevator, lakeside & west-metro logistics awareness · Curated listings',
  majorCorridors: 'I-94 · I-35W · I-394 · I-494 · MN-100 · local arterial grid',
  whatMakesDifferent: {
    title: 'What makes moving in Hennepin County different',
    intro:
      'These are Minneapolis and west-metro realities — elevator/COI stacks, lakeside access, neighborhood micro-markets, and I-35W / I-394 freeflow — not St. Paul capital patterns, Dakota south-metro HOAs, or Anoka north-metro growth alone.',
    bullets: [
      {
        title: 'Elevators, docks, and building COIs dominate vertical Minneapolis product',
        detail:
          'Downtown, North Loop, Uptown towers, and newer riverfront multi-unit require elevator reservations, certificate-of-insurance naming, padded protection, and timed dock slots. A Whittier walk-up does not share that logistics stack.',
      },
      {
        title: 'Lakeside and neighborhood micro-markets rewrite labor a few miles apart',
        detail:
          'Loring Park, Linden Hills, Northeast, North Minneapolis, and Chain of Lakes edges stack different curb widths, stair counts, and winter driveway grades. Flat-rate optimism from suburban driveways underprices urban carries.',
      },
      {
        title: 'West-metro corporate and HOA product is not downtown elevator product',
        detail:
          'Edina, Minnetonka, Plymouth, and Bloomington multi-family and executive SFH often need HOA certificates, timed windows, and longer empty miles on I-394 / I-494 — different from North Loop loft moves.',
      },
      {
        title: 'I-94, I-35W, I-394, and I-494 turn short map miles into billable hours',
        detail:
          'Downtown ↔ Edina, Uptown ↔ Bloomington, or Northeast ↔ Minnetonka pairs look local and still burn 30–70+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Winter ice, snow bans, and heated-garage logistics reshape outdoor carries',
        detail:
          'December–March adds street parking bans, icy stoops, and weather cancellations. Prefer flexible dates, early starts, and contingency for melt and tarps on older stock.',
      },
      {
        title: 'University and young-professional lease waves spike Uptown and campus-adjacent volume',
        detail:
          'University of Minnesota-adjacent and dense multi-unit belts compress demand into late summer and month-end windows. Elevators and street staging fill early.',
      },
      {
        title: 'Multi-county Twin Cities pairs are routine',
        detail:
          'Households regularly move Hennepin ↔ Ramsey, Dakota, Anoka, or Washington County, MN. Clarify city and county addresses so MnDOT HHG permit vs FMCSA interstate assumptions stay accurate when any leg leaves Minnesota.',
      },
      MN_REG_BULLET,
    ],
  },
  zonesHeading: 'Hennepin County access zones',
  zonesIntro:
    'Plan by downtown and riverfront vertical product, central Minneapolis neighborhood stock, Chain of Lakes / southwest residential, west-metro corporate suburbs, and southern Bloomington multi-family — access rules cluster by product more than ZIP alone.',
  zones: [
    {
      id: 'downtown-north-loop-vertical',
      name: 'Downtown, North Loop & riverfront towers',
      shortName: 'Downtown / North Loop',
      neighborhoods: [
        'Downtown Minneapolis',
        'North Loop',
        'Mill District edges',
        'Warehouse District',
        'Elliot Park edges',
        'Loring Park edges',
      ],
      housingTypes: 'High-rise condo, mid-rise multifamily, loft conversions',
      challenges: [
        'Elevator reservations, dock slots, and building COIs',
        'Limited legal curb and event-day freeflow collapse',
        'I-35W / I-94 approach congestion into the core',
      ],
      moverTips:
        'Book elevators and COIs in writing before the crew day. Prefer mid-week early freight windows. Photo dock or curb staging options.',
      cityKeywords: [
        'minneapolis',
        'downtown minneapolis',
        'north loop',
        'warehouse district',
      ],
    },
    {
      id: 'central-neighborhood-walkups',
      name: 'Uptown, Whittier, Northeast & central neighborhood stock',
      shortName: 'Central neighborhoods',
      neighborhoods: [
        'Uptown',
        'Whittier',
        'Lyndale',
        'Northeast Minneapolis',
        'Seward',
        'Longfellow edges',
      ],
      housingTypes: 'Walk-up multifamily, older duplexes, renovated single-family, limited elevators',
      challenges: [
        'Multi-flight stairs and long interior carries',
        'Scarce truck length on residential streets',
        'Winter curb shrinkage and ice on stoops',
      ],
      moverTips:
        'Survey stair counts and curb options with photos. Confirm smaller-truck needs on tight blocks. Inventory basements carefully.',
      cityKeywords: [
        'uptown',
        'whittier',
        'northeast minneapolis',
        'longfellow',
        'minneapolis',
      ],
    },
    {
      id: 'lakes-southwest',
      name: 'Chain of Lakes, Linden Hills & southwest residential',
      shortName: 'Lakes / southwest',
      neighborhoods: [
        'Linden Hills',
        'Lake Harriet edges',
        'Lake Calhoun / Bde Maka Ska edges',
        'Fulton',
        'Armatage edges',
        'Tangletown',
      ],
      housingTypes: 'Older SFH, renovated bungalows, limited multi-unit',
      challenges: [
        'Lakeside staging and weekend tourist traffic',
        'Driveway grades and winter ice',
        'Long carries on lake-adjacent lots',
      ],
      moverTips:
        'Prefer mid-week starts near lake corridors. Photo driveway pitch and stair entries. Plan winter ice contingency.',
      cityKeywords: [
        'linden hills',
        'fulton',
        'southwest minneapolis',
        'minneapolis',
      ],
    },
    {
      id: 'west-metro-corporate',
      name: 'Edina, Minnetonka, Plymouth & west-metro corporate suburbs',
      shortName: 'West metro',
      neighborhoods: [
        'Edina',
        'Minnetonka',
        'Plymouth',
        'Hopkins',
        'St. Louis Park',
        'Golden Valley',
      ],
      housingTypes: 'Executive SFH, townhomes, HOA multi-family, some mid-rise',
      challenges: [
        'HOA COI packets and timed move windows',
        'I-394 / I-494 / MN-100 portal time',
        'Longer empty miles vs core Minneapolis',
      ],
      moverTips:
        'Collect HOA packets before dispatch. Price I-394 / I-494 honestly for west-metro pairs. Confirm truck size on cul-de-sacs.',
      cityKeywords: [
        'edina',
        'minnetonka',
        'plymouth',
        'hopkins',
        'st louis park',
        'golden valley',
      ],
    },
    {
      id: 'bloomington-south',
      name: 'Bloomington, Richfield & south Hennepin multi-family',
      shortName: 'Bloomington / south',
      neighborhoods: [
        'Bloomington',
        'Richfield',
        'Airport-adjacent edges',
        'Mall of America corridor',
        'South Loop edges',
        'Fort Snelling edges',
      ],
      housingTypes: 'Multi-family, townhomes, SFH, hotel-adjacent apartments',
      challenges: [
        'I-494 / MN-77 congestion near airport and mall corridors',
        'Elevator multi-unit and HOA rules',
        'Event and visitor traffic spikes',
      ],
      moverTips:
        'Avoid peak airport and mall windows when flexible. Book elevators early on multi-unit stock. Clarify Bloomington vs Edina addresses.',
      cityKeywords: [
        'bloomington',
        'richfield',
        'minneapolis',
      ],
    },
    {
      id: 'north-minneapolis-brooklyn',
      name: 'North Minneapolis, Brooklyn Center & northwest approaches',
      shortName: 'North / northwest',
      neighborhoods: [
        'North Minneapolis',
        'Camden edges',
        'Brooklyn Center',
        'Brooklyn Park edges',
        'Crystal',
        'Robbinsdale',
      ],
      housingTypes: 'Older SFH, multi-unit, suburban growth multi-family',
      challenges: [
        'I-94 / MN-100 freeflow into northwest belts',
        'Mixed stair and driveway product',
        'Winter access on older stock',
      ],
      moverTips:
        'Survey by product not city name alone. Price portal time for northwest pairs. Photo curb and driveway ice risk in winter.',
      cityKeywords: [
        'brooklyn center',
        'brooklyn park',
        'crystal',
        'robbinsdale',
        'north minneapolis',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Hennepin County moving costs',
    intro:
      'Access product, elevator/COI admin, winter staging, and I-35W / I-394 freeflow move the number more than packing skill alone.',
    drivers: [
      {
        title: 'Elevator reservations, docks & building COIs',
        detail:
          'Downtown, North Loop, and tower multi-unit add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'Walk-up stairs, lakeside carries & tight curb',
        detail:
          'Central neighborhood and Chain of Lakes stock add flight counts and long outdoor walks that flat-rate optimism underprices.',
      },
      {
        title: 'West-metro HOA windows & empty miles',
        detail:
          'Edina–Minnetonka–Plymouth product adds admin soft costs and longer I-394 / I-494 staging distance.',
      },
      {
        title: 'I-94 · I-35W · I-394 · I-494 congestion',
        detail:
          'Cross-city and city–suburb pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Winter ice, snow bans & weather contingency',
        detail:
          'December–March adds parking bans, icy carries, and cancellation risk that flexible dates reduce.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$550–$2,000+',
        note: 'Higher with elevators, walk-ups, or peak I-35W pairs',
      },
      {
        label: '2–3BR condo or walk-up flat',
        value: '$1,600–$4,800+',
        note: 'Stairs, COI, and dock soft costs trend up',
      },
      {
        label: '3–4+ BR / high-rise / west-metro executive',
        value: '$3,200–$10,000+',
        note: 'Tower moves and long I-394 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$125–$220+/hr',
        note: 'Portal-to-portal; packing, COI admin, and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Hennepin County move',
    intro:
      'Lease cycles, corporate calendars, winter curb friction, and elevator windows reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease downtown freight windows, and reduce I-35W / I-394 pain. Avoid month-end Fridays when leases and elevators collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Apartment turnover and corporate relo waves fill first. Book 2–4 weeks ahead for peak weekends and elevator slots.',
      },
      {
        title: 'Winter: snow, ice, and curb shrinkage',
        detail:
          'December–March adds parking bans, icy stoops, and weather cancellations. Prefer flexible dates and early starts.',
      },
      {
        title: 'Corporate mid-month employer spikes',
        detail:
          'Fortune 500 and professional relocations often land mid-month rather than only on Saturday peaks. Confirm hard move-in dates early.',
      },
    ],
  },
  specialized: [
    {
      id: 'minneapolis-elevator-lakeside',
      title: 'Minneapolis elevator, lakeside & neighborhood logistics module',
      intro:
        'Hennepin estimates fail more often on stair surveys, elevator packets, winter curb, and I-35W freeflow than on packing skill alone.',
      bullets: [
        'Collect building COI, elevator reservations, and dock rules before the survey is final.',
        'Photo stair counts, curb options, and truck length for walk-up and lakeside stock.',
        'Price portal-to-portal time for any pair that rides I-94, I-35W, I-394, or I-494 at peak.',
        'Plan winter ice contingency and snow-emergency parking rules into outdoor carries.',
        'Clarify Minneapolis neighborhood vs Edina / Bloomington / St. Louis Park addresses on every estimate.',
        'Verify MnDOT household goods mover permit for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'west-metro-corporate-hoa',
      title: 'West-metro corporate & HOA logistics module',
      intro:
        'A single “Minneapolis rate” collapses when tower, walk-up, and west-metro HOA product diverge a few miles apart.',
      bullets: [
        'Collect HOA packets and timed windows for Edina, Minnetonka, and Plymouth multi-family before dispatch.',
        'Match executive inventories to crews experienced with high-value packing and long empty miles.',
        'Do not price west-metro driveway SFH like North Loop loft elevators.',
        'Ask which approach corridors the crew will actually use at load and unload.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Hennepin County?',
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
              'Minneapolis Public Schools covers most City of Minneapolis addresses; suburban cities such as Edina, Minnetonka, Bloomington, and St. Louis Park operate separate systems. Assignment is address-based — marketing names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows and transportation early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Minnesota Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Hennepin Healthcare, Allina Health, M Health Fairview, Park Nicollet / HealthPartners, and other campuses anchor care across Minneapolis and west metro. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Uptown, Edina, or Brooklyn Park to preferred campuses — I-35W and I-394 congestion change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Towers, walk-ups, lakeside SFH & west-metro product',
            detail:
              'Expect high-rise downtown and riverfront; walk-up multifamily in central neighborhoods; lakeside SFH southwest; and executive SFH / HOA multi-family west.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by neighborhood. Budget for condo dues, older-building repair risk, parking, and insurance on higher-value inventories.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Condo and HOA rules often control move hours, truck size, elevators, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Hennepin areas fit whom',
        bullets: [
          {
            title: 'Downtown / North Loop urban lifestyle',
            detail:
              'Suits people prioritizing walkability and amenities — with elevator, parking, and event-day tradeoffs on move day.',
          },
          {
            title: 'Central neighborhoods and lakeside character',
            detail:
              'Often appeals for neighborhood feel and lake access — with stairs, curb limits, and winter staging constraints.',
          },
          {
            title: 'West-metro corporate suburbs',
            detail:
              'Attracts households seeking schools, space, and corporate campuses — with HOA logistics and longer I-394 days.',
          },
          {
            title: 'Bloomington and south multi-family',
            detail:
              'Fits buyers chasing relative value or airport-adjacent access — with I-494 freeflow and multi-unit elevator norms.',
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
              'Downtown professional services, Fortune 500 headquarters, healthcare systems, University of Minnesota-adjacent research, and west-metro corporate campuses concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households mix driving, Metro Transit light rail and bus, and biking. I-94, I-35W, I-394, and I-494 peaks are real. Test peak routes before choosing solely on rent or purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, many Minneapolises',
            detail:
              'Hennepin stacks tower living, neighborhood walk-ups, lakeside SFH, and west-metro suburbs — different from Ramsey’s capital-city rhythm or Dakota’s south-metro HOA growth.',
          },
          {
            title: 'Climate',
            detail:
              'Continental four-season climate: humid summers, long cold winters with snow and ice, and rapid weather swings. Plan outdoor staging and ice contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Arts, lakes, sports, dining, and corporate culture concentrate heavily; outer suburbs feel more school-calendar driven. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Hennepin County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify MnDOT household goods mover permit status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'City of Minneapolis — official site',
        href: 'https://www.minneapolismn.gov/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'Minneapolis Public Schools',
        href: 'https://mpschools.org/',
        external: true,
        note: 'Boundaries & calendars (Minneapolis addresses)',
      },
      {
        label: 'Metro Transit',
        href: 'https://www.metrotransit.org/',
        external: true,
        note: 'Commute planning for core addresses',
      },
      {
        label: '511mn — traffic conditions',
        href: 'https://511mn.org/',
        external: true,
        note: 'I-94 / I-35W / I-394 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with elevator/COI experience for downtown and North Loop product; walk-up and lakeside stair fluency for central neighborhoods; HOA readiness for Edina–Minnetonka west metro; honest I-94 · I-35W · I-394 · I-494 timing for cross-zone pairs. Verify MnDOT household goods mover permit for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
