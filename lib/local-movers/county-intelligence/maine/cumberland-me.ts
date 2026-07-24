import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMePack,
  ME_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/maine/me-shared';

/**
 * Cumberland County, ME — Portland / South Portland / lakeside suburbs.
 * NOT York seacoast south (Biddeford–Kittery). NOT Bangor / Penobscot.
 */
export const cumberlandCountyMeIntelligence: CountyIntelligencePack = finalizeMePack({
  countySlug: 'cumberland',
  hubTitle: 'Cumberland County Moving Intelligence Hub',
  eyebrow:
    'Cumberland County, ME · Portland / South Portland / lakeside suburbs & I-295 / coastal logistics',
  h1: 'Moving in Cumberland County: Portland Access, South Portland Grids & I-295 / Coastal Logistics',
  heroOpener:
    'Cumberland County, Maine is the Portland metro core — peninsula multi-unit, West End and Munjoy Hill walk-ups, South Portland grids, Westbrook–Gorham growth, Freeport–Yarmouth coastal edges, and Falmouth–Windham lakeside belts — not York County seacoast south (Biddeford–Kittery) and not Bangor / Penobscot regional density. Expect narrow peninsula curb, older triple-decker stairs, tourism-season congestion on US-1 and the Old Port, winter ice on driveway approaches, and I-295 / I-95 freeflow that rewrites “local” estimates. A Munjoy Hill third-floor walk-up, a South Portland ranch, a Freeport coastal cottage, and a Windham lakeside home do not share truck access or crew skill. This hub is for people moving in Cumberland County, ME — Portland-access logistics — not a renamed Biddeford or Bangor page.',
  heroCredibility:
    'Written estimates + insurance for in-state · FMCSA for interstate · Portland multi-unit & coastal winter logistics · Curated listings',
  majorCorridors: 'I-295 · I-95 · US-1 · ME-25 · local Portland grid',
  whatMakesDifferent: {
    title: 'What makes moving in Cumberland County different',
    intro:
      'These are Cumberland County / Portland metro realities — peninsula multi-unit, South Portland grids, lakeside suburbs, tourism peaks, and I-295 freeflow — not York seacoast twin-city defaults and not Bangor central-Maine rural approaches alone.',
    bullets: [
      {
        title: 'This is Cumberland (Portland metro) — not York seacoast or Bangor',
        detail:
          'Ignore Biddeford–Saco twin-city templates, Kittery NH-border hops, and Bangor / Orono university scripts. Cumberland is Portland peninsula density, South Portland residential grids, Westbrook–Gorham inland growth, Freeport–Yarmouth coastal product, and Falmouth–Windham lakeside edges. Match estimates to Portland-metro addresses and honest Maine consumer controls — not southern seacoast or Penobscot defaults.',
      },
      {
        title: 'Portland peninsula multi-unit rewrites walk-up labor',
        detail:
          'Munjoy Hill, West End, East End, and downtown-adjacent stock bring multi-flight stairs, scarce curb, tight turning radii, and building COIs. A Westbrook ranch or Windham lakeside driveway does not share that packet stack.',
      },
      {
        title: 'South Portland and Westbrook–Gorham grids underprice flat-rate optimism',
        detail:
          'Mixed ranch and two-story stock, school-calendar peaks, and I-295 / ME-25 freeflow fail estimates more often than packing skill alone when crews assume “suburban simple.”',
      },
      {
        title: 'Coastal tourism and Freeport retail congestion burn portal time',
        detail:
          'Summer tourism, cruise-ship days, and Freeport outlet traffic on US-1 and the Portland waterfront rewrite load windows. Price peak-season curb honestly.',
      },
      {
        title: 'I-295, I-95, US-1, and ME-25 freeflow is real',
        detail:
          'Peninsula ↔ Westbrook, South Portland ↔ Freeport, or Falmouth ↔ Gorham pairs look local and still burn 20–50+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Winter ice and older coastal stock reshape outdoor labor',
        detail:
          'Freeze-thaw driveway ice, narrow coastal lots, and older basements raise stair and staging risk from November through March. Prefer early starts and weather contingency.',
      },
      ME_REG_BULLET,
    ],
  },
  zonesHeading: 'Cumberland County access zones',
  zonesIntro:
    'Plan by Portland peninsula multi-unit, West End / Munjoy Hill character grids, South Portland residential belts, Westbrook–Gorham inland growth, Freeport–Yarmouth coastal edges, and lakeside / Falmouth–Windham belts — access rules cluster by density and curb more than ZIP alone.',
  zones: [
    {
      id: 'portland-peninsula',
      name: 'Portland peninsula multi-unit, Old Port & downtown-adjacent stock',
      shortName: 'Portland peninsula',
      neighborhoods: [
        'Old Port edges',
        'Downtown Portland multi-unit',
        'Arts District corridors',
        'India Street edges',
        'Waterfront-adjacent blocks',
        'Peninsula walk-up pockets',
      ],
      housingTypes: 'Walk-up multifamily, condos, mixed commercial-residential, limited elevators',
      challenges: [
        'Multi-flight stairs and scarce truck length',
        'Tourism and waterfront curb competition',
        'Tight turning radii and COI requirements',
      ],
      moverTips:
        'Survey stair counts with photos. Book mid-week early freight windows. Confirm building COIs and curb staging options in writing before load day.',
      cityKeywords: [
        'portland',
        'old port',
      ],
    },
    {
      id: 'west-end-munjoy',
      name: 'West End, Munjoy Hill, East End & character walk-ups',
      shortName: 'West End / Munjoy',
      neighborhoods: [
        'West End',
        'Munjoy Hill',
        'East End',
        'Parkside edges',
        'Deering Oaks edges',
        'Eastern Promenade corridors',
      ],
      housingTypes: 'Triple-deckers, character SFH, condos, walk-up multifamily',
      challenges: [
        'Steep hill approaches and multi-flight stairs',
        'Narrow residential curb and tree-lined carries',
        'Winter ice on pitched streets',
      ],
      moverTips:
        'Photo driveway pitch and stair geometry early. Prefer smaller trucks where curb is tight. Protect older interiors and landscaping.',
      cityKeywords: [
        'munjoy hill',
        'west end',
        'east end',
      ],
    },
    {
      id: 'south-portland',
      name: 'South Portland grids, waterfront edges & residential belts',
      shortName: 'South Portland',
      neighborhoods: [
        'South Portland',
        'Ferry Village edges',
        'Willard Beach edges',
        'Broadway corridors',
        'Maine Mall commercial edges',
        'Thornton Heights edges',
      ],
      housingTypes: 'Ranch and two-story SFH, multi-unit pockets, waterfront stock',
      challenges: [
        'I-295 / US-1 freeflow to peninsula pairs',
        'Mixed municipal rules vs Portland proper',
        'Seasonal beach-area curb pressure',
      ],
      moverTips:
        'Clarify South Portland vs Portland addresses on every estimate. Price I-295 honestly for peninsula unload pairs. Survey waterfront driveway geometry.',
      cityKeywords: [
        'south portland',
      ],
    },
    {
      id: 'westbrook-gorham',
      name: 'Westbrook, Gorham & inland suburban growth',
      shortName: 'Westbrook / Gorham',
      neighborhoods: [
        'Westbrook',
        'Gorham',
        'ME-25 corridors',
        'Downtown Westbrook edges',
        'Gorham village centers',
        'Inland HOA and subdivision pockets',
      ],
      housingTypes: 'SFH, townhomes, multi-family limited, ranch and two-story stock',
      challenges: [
        'ME-25 and I-95 freeflow to Portland core',
        'School-calendar summer peaks',
        'Longer empty miles vs peninsula jobs',
      ],
      moverTips:
        'Collect subdivision access notes early. Price empty miles to peninsula multi-unit honestly. Align with school calendars when relevant.',
      cityKeywords: [
        'westbrook',
        'gorham',
      ],
    },
    {
      id: 'freeport-yarmouth',
      name: 'Freeport, Yarmouth & coastal retail / cottage edges',
      shortName: 'Freeport / Yarmouth',
      neighborhoods: [
        'Freeport',
        'Yarmouth',
        'US-1 outlet corridors',
        'Cousins Island edges',
        'Coastal cottage pockets',
        'I-295 interchange belts',
      ],
      housingTypes: 'Coastal SFH, cottages, mixed retail-adjacent multi-unit, village stock',
      challenges: [
        'Summer tourism and outlet traffic on US-1',
        'Narrow coastal lots and long carries',
        'I-295 freeflow and seasonal congestion',
      ],
      moverTips:
        'Avoid peak Freeport retail weekends when possible. Photo coastal driveway width and turnaround. Confirm seasonal rental turnover windows.',
      cityKeywords: [
        'freeport',
        'yarmouth',
      ],
    },
    {
      id: 'lakeside-falmouth-windham',
      name: 'Falmouth, Windham, lakeside & northern suburban edges',
      shortName: 'Lakeside / north',
      neighborhoods: [
        'Falmouth',
        'Windham',
        'Sebago Lake edges',
        'Raymond edges',
        'Cumberland town edges',
        'Northern county rural-residential belts',
      ],
      housingTypes: 'Lakeside SFH, ranch stock, rural-residential, multi-unit limited',
      challenges: [
        'Longer empty miles to Portland peninsula',
        'Seasonal lake-access and gravel driveway product',
        'Winter ice on rural approaches',
      ],
      moverTips:
        'Price empty miles honestly. Survey rural driveway width, pitch, and turnaround. Prefer weather contingency for winter lake-edge jobs.',
      cityKeywords: [
        'falmouth',
        'windham',
        'raymond',
        'cumberland',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Cumberland County moving costs',
    intro:
      'Peninsula stairs, multi-unit COIs, coastal tourism curb, lakeside empty miles, and I-295 freeflow move the number more than packing skill alone — this is Portland-metro logistics, not York seacoast or Bangor defaults.',
    drivers: [
      {
        title: 'Multi-flight stairs, walk-ups & scarce peninsula curb',
        detail:
          'Munjoy Hill, West End, and downtown-adjacent stock rewrite jobs that look simple on a map.',
      },
      {
        title: 'Building COIs, elevator docks & multi-unit admin',
        detail:
          'Portland condos and managed multi-unit add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'Coastal tourism peaks & Freeport retail congestion',
        detail:
          'Summer US-1 and waterfront pressure fail flat-rate optimism more often than crew speed alone.',
      },
      {
        title: 'I-295 · I-95 · US-1 · ME-25 congestion',
        detail:
          'Cross-county pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Lakeside empty miles & winter ice staging',
        detail:
          'Falmouth–Windham and rural approaches raise staging distance; freeze-thaw ice reshapes outdoor labor.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,800+',
        note: 'Higher with peninsula walk-ups, tourism peaks, or I-295 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,400–$4,200+',
        note: 'Stairs, multi-unit soft costs, and coastal curb trend up',
      },
      {
        label: '3–4+ BR / coastal / cross-zone',
        value: '$2,800–$8,500+',
        note: 'Lakeside empty miles and peninsula multi-unit pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$195+/hr',
        note: 'Portal-to-portal; packing, stairs, and tourism windows scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Cumberland County move',
    intro:
      'Tourism peaks, school calendars, coastal rental turnover, summer congestion, and winter ice reshape access and crew availability across the Portland metro grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear peninsula curb, ease multi-unit freight windows, and reduce I-295 / US-1 pain. Avoid month-end Fridays when leases and tourism collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family school calendars, coastal tourism, and apartment turnover fill first. Book 2–4 weeks ahead for peak weekends and peninsula multi-unit slots.',
      },
      {
        title: 'Tourism & Freeport retail congestion risk',
        detail:
          'Summer waterfront and outlet traffic raise cancellation and staging risk. Prefer flexible dates, covered staging plans, and early starts when forecasts allow.',
      },
      {
        title: 'Winter ice & freeze-thaw labor',
        detail:
          'November–March ice on pitched peninsula streets, coastal lots, and lakeside approaches reshapes outdoor labor. Prefer early starts and weather contingency on older stock.',
      },
    ],
  },
  specialized: [
    {
      id: 'portland-multiunit-coastal',
      title: 'Portland multi-unit, coastal curb & I-295 logistics module',
      intro:
        'Cumberland County estimates fail more often on stair surveys, multi-unit COIs, tourism curb, and freeway freeflow than on packing skill alone.',
      bullets: [
        'Survey stair counts, curb options, and building COIs for peninsula and West End / Munjoy Hill product early.',
        'Book mid-week early freight windows for Old Port-adjacent and downtown multi-unit before the survey is final.',
        'Photo driveway pitch and coastal lot geometry for Freeport–Yarmouth and lakeside stock.',
        'Price portal-to-portal time for any pair that rides I-295, I-95, US-1, or ME-25 at peak.',
        'Clarify Portland, South Portland, Westbrook, Gorham, Freeport, Yarmouth, Falmouth, and Windham addresses on every estimate.',
        'For pure in-state Maine jobs insist on written estimates and insurance certificates; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-york-not-bangor',
      title: 'Not York seacoast · not Bangor module',
      intro:
        'A single “Maine coastal rate” collapses when Portland-metro product is confused with Biddeford–Saco twin cities or Bangor regional density alone.',
      bullets: [
        'Do not price Munjoy Hill walk-ups like Biddeford mill housing or like Bangor suburban ranch as interchangeable defaults.',
        'State the market as Cumberland County / Portland metro on every estimate — disambiguate from York seacoast south and Penobscot / Bangor.',
        'Keep tourism-season Freeport and waterfront windows separate from inland Westbrook–Gorham school-calendar peaks.',
        'Match lakeside empty-mile pricing separately from peninsula multi-unit stair labor.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Cumberland County?',
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
              'Cumberland spans Portland Public Schools, South Portland, Westbrook, Gorham, Falmouth, Windham, Freeport, Yarmouth, and other systems. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and peninsula vs suburban boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Maine Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Maine Medical Center, Northern Light Mercy Hospital, and regional specialty campuses anchor care across the Portland metro. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-295, US-1, and peninsula freeflow change “nearby” on paper. Transfer records early.',
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
              'Expect Portland peninsula multi-unit and character walk-ups; South Portland residential grids; Westbrook–Gorham inland SFH growth; Freeport–Yarmouth coastal cottages; Falmouth–Windham lakeside and rural-residential product.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by peninsula vs inland location and product type. Budget for older-building repair risk, coastal insurance considerations, and competitive rental seasons near employment corridors.',
          },
          {
            title: 'Building and multi-unit governance',
            detail:
              'Condo associations and multi-unit management often control move hours, truck size, elevators, and deposits. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Portland peninsula / multi-unit lifestyle',
            detail:
              'Suits people prioritizing walkability and urban amenities — with stair, curb, and tourism freeflow tradeoffs on move day.',
          },
          {
            title: 'South Portland / Westbrook residential living',
            detail:
              'Often appeals for relative value and grid access — with I-295 freeflow and mixed municipal rules.',
          },
          {
            title: 'Freeport / Yarmouth coastal edges',
            detail:
              'Fits buyers chasing coastal character and village feel — with tourism congestion and narrow-lot logistics.',
          },
          {
            title: 'Falmouth / Windham lakeside living',
            detail:
              'Attracts households seeking lakeside space and northern suburban access — with longer empty miles and winter approach risk.',
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
              'Healthcare systems, professional services, maritime and logistics, education, retail headquarters (including Freeport brands), and hospitality concentrate demand across the Portland metro.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-295, I-95, US-1, and ME-25 freeflow is real — including peninsula choke points and tourism-season US-1. Test peak routes before choosing solely on rent or purchase price.',
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
              'Cumberland County is Portland-metro Maine — peninsula density, coastal tourism, lakeside suburbs, and I-295 freeflow — not York seacoast twin cities and not Bangor central-Maine product.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental / coastal Maine climate with cool summers, tourism peaks, nor’easters, and freeze-thaw winters. Plan outdoor staging, ice, and storm contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak tourism and off-peak times when deciding — school calendars, cruise and Freeport retail cycles, and winter weather reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Cumberland County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. For pure in-state Maine moves insist on written estimates and insurance certificates; verify FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Cumberland County, Maine — official site',
        href: 'https://www.cumberlandcounty.org/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Portland',
        href: 'https://www.portlandmaine.gov/',
        external: true,
        note: 'Peninsula municipality & multi-unit context',
      },
      {
        label: 'City of South Portland',
        href: 'https://www.southportland.org/',
        external: true,
        note: 'South of peninsula residential grids',
      },
      {
        label: 'City of Westbrook',
        href: 'https://www.westbrookmaine.com/',
        external: true,
        note: 'Inland suburban municipality context',
      },
      {
        label: '511 Maine — traveler information',
        href: 'https://www.511maine.gov/',
        external: true,
        note: 'I-295 / I-95 / US-1 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with peninsula multi-unit and stair fluency for Portland West End / Munjoy Hill product; coastal curb awareness for Freeport–Yarmouth; honest I-295 · I-95 · US-1 · ME-25 timing for cross-zone pairs; winter ice staging for lakeside and pitched-street jobs. For pure in-state Maine moves insist on written estimates and insurance certificates; verify FMCSA for interstate legs before deposits. This is Cumberland County (Portland metro) — not York seacoast south and not Bangor / Penobscot.',
  lastReviewed: '2026-07-24',
});
