import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWaPack,
  WA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/washington/wa-shared';

/**
 * Benton County, WA — Tri-Cities / Kennewick focus, inland
 * (not Puget Sound, not Seattle clone).
 */
export const bentonCountyWaIntelligence: CountyIntelligencePack = finalizeWaPack({
  countySlug: 'benton',
  hubTitle: 'Benton County Moving Intelligence Hub',
  eyebrow: 'Benton · Tri-Cities Kennewick focus, inland climate & I-82 logistics',
  h1: 'Moving in Benton County: Kennewick Access, Tri-Cities Logistics & Inland I-82 Timing',
  heroOpener:
    'Benton County is the Kennewick-heavy half of the Tri-Cities inland hub — not a Puget Sound suburb and not a Seattle clone. Kennewick core and Southridge growth, Richland professional and research-adjacent product, West Richland family tracts, Prosser wine-country edges, and Columbia River / I-82 pairs that connect Pasco (Franklin County) and the broader mid-Columbia rewrite “local” estimates that ignore river bridges and empty miles. A Kennewick HOA two-story, a Richland mid-century ranch, a West Richland hillside driveway, and a Prosser small-town load do not share truck access or crew skill. I-82, US-395, SR-240, and SR-224 turn short map miles into billable hours when summer heat, wind, and peak commute windows collide. This hub is for people moving in Benton County — not a renamed west-side template or generic Washington page.',
  heroCredibility:
    'Washington UTC household goods permit for intrastate moves · FMCSA for interstate · Curated listings',
  majorCorridors: 'I-82 · US-395 · SR-240 · SR-224',
  whatMakesDifferent: {
    title: 'What makes moving in Benton County different',
    intro:
      'These are Benton and Tri-Cities realities — inland desert climate, Kennewick–Richland micro-markets, Hanford/research workforce turnover, and river-bridge portal time — not Seattle elevators or Cascades-west rain patterns.',
    bullets: [
      {
        title: 'Inland Tri-Cities hub scale, not Puget Sound denseness',
        detail:
          'Crew density and specialty options are thinner than King County markets. Same-day multi-stop flexibility is limited; empty miles across the Columbia and to Prosser matter more than west-side micro-market volume.',
      },
      {
        title: 'Kennewick growth vs Richland / West Richland product is not one job',
        detail:
          'Southridge HOA tracts, older Kennewick grids, Richland mid-century stock, and West Richland hillside lots diverge a few miles apart — not a single “Tri-Cities rate.”',
      },
      {
        title: 'I-82, US-395, SR-240, and SR-224 rewrite portal time',
        detail:
          'Kennewick ↔ Richland, West Richland ↔ Southridge, or US-395 Pasco pairs look local and still burn 25–50+ minutes at peak. Price portal-to-portal honestly, not odometer optimism.',
      },
      {
        title: 'Desert climate — heat, wind, and dust reshape open carries',
        detail:
          'Benton’s inland climate differs sharply from maritime western Washington: triple-digit summer heat, Columbia Gorge–linked wind, and dusty shoulder seasons. Prefer early starts, hydration planning, and inventory protection.',
      },
      {
        title: 'Research, lab, and energy workforce turnover is routine',
        detail:
          'Hanford/Pacific Northwest National Laboratory–linked households and contractor rotations create mid-month report-date spikes that pure Saturday SFH quotes underprice.',
      },
      {
        title: 'Tri-Cities cross-county pairs are the default, not the exception',
        detail:
          'Households regularly move Benton ↔ Franklin (Pasco), Benton ↔ Walla Walla, or toward Yakima and Spokane. Clarify addresses so Washington UTC HHG vs FMCSA interstate assumptions stay accurate when any leg leaves Washington.',
      },
      {
        title: 'Benton is not a Seattle clone',
        detail:
          'Inland desert product, river-bridge logistics, and mid-Columbia job anchors differ from King County towers and Sound-side HOA belts. Do not reuse Puget Sound copy here.',
      },
      WA_REG_BULLET,
    ],
  },
  zonesHeading: 'Benton County access zones',
  zonesIntro:
    'Plan by Kennewick core and Southridge growth, Richland central grids, West Richland hillside family product, Prosser / west Benton wine-country edges, and Columbia bridge pairs into Pasco — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'kennewick-core',
      name: 'Kennewick core, downtown edges & central grids',
      shortName: 'Kennewick core',
      neighborhoods: [
        'Downtown Kennewick edges',
        'Central Kennewick',
        'Canyon Lakes edges',
        'Columbia Center–adjacent residential',
        'Clearwater corridor residential',
      ],
      housingTypes: 'Mid-century SFH, townhomes, garden apartments, mixed multifamily',
      challenges: [
        'I-82 / US-395 approach congestion',
        'Tight multifamily parking on denser product',
        'Cross-river pairs into Pasco',
      ],
      moverTips:
        'Photo curb and stair counts on apartments. Prefer mid-week early starts. Price bridge and I-82 buffers for any Pasco unload.',
      cityKeywords: [
        'kennewick',
        'canyon lakes',
        'columbia center',
        'clearwater',
      ],
    },
    {
      id: 'southridge-south-kennewick',
      name: 'Southridge & south Kennewick growth',
      shortName: 'Southridge',
      neighborhoods: [
        'Southridge',
        'South Kennewick growth tracts',
        'Zintel Canyon edges',
        'HOA planned communities',
        'Southridge sports complex–adjacent residential',
      ],
      housingTypes: 'Two-story HOA SFH, townhomes, newer planned-community product',
      challenges: [
        'HOA gates, truck limits, and approved move hours',
        'School-calendar Saturday demand May–August',
        'Heat exposure on open carries in peak summer',
      ],
      moverTips:
        'Collect HOA packets early. Prefer early morning starts in July–August heat. Confirm truck length and driveway mat rules.',
      cityKeywords: [
        'southridge',
        'south kennewick',
        'zintel',
        'kennewick',
      ],
    },
    {
      id: 'richland-central',
      name: 'Richland central, south Richland & research-adjacent belts',
      shortName: 'Richland',
      neighborhoods: [
        'Central Richland',
        'South Richland',
        'Horn Rapids edges',
        'Queensgate edges',
        'Research/lab-adjacent residential',
      ],
      housingTypes: 'Mid-century ranch and bi-level SFH, townhomes, professional multifamily',
      challenges: [
        'SR-240 congestion at peak',
        'Basement and garage inventories on older stock',
        'Report-date waves linked to lab and contractor calendars',
      ],
      moverTips:
        'Survey basement access and garage clearance. Confirm hard move-in dates for workforce relocations. Price SR-240 portal time to Kennewick or West Richland.',
      cityKeywords: [
        'richland',
        'horn rapids',
        'queensgate',
        'south richland',
      ],
    },
    {
      id: 'west-richland',
      name: 'West Richland hillside & family growth',
      shortName: 'West Richland',
      neighborhoods: [
        'West Richland',
        'Bombing Range Road corridor residential',
        'West Richland hillside tracts',
        'Yakima River–adjacent edges',
        'Newer west-side subdivisions',
      ],
      housingTypes: 'Family SFH, hillside lots, acreage edges, limited multifamily',
      challenges: [
        'Driveway grade and longer carries on hillside product',
        'Empty miles from Kennewick core crews',
        'Wind exposure on elevated open paths',
      ],
      moverTips:
        'Survey driveway grade and turn radius. Price empty miles honestly. Prefer early starts when summer heat and afternoon wind stack.',
      cityKeywords: [
        'west richland',
        'bombing range',
        'westrichland',
      ],
    },
    {
      id: 'prosser-west-benton',
      name: 'Prosser, Benton City & west Benton edges',
      shortName: 'Prosser / West Benton',
      neighborhoods: [
        'Prosser',
        'Benton City',
        'Wine-country corridor residential',
        'I-82 west Benton exits',
        'Yakima Valley–edge lots',
      ],
      housingTypes: 'Small-town SFH, acreage, agricultural-edge product',
      challenges: [
        'Long empty miles from Tri-Cities core',
        'Soft shoulders and rural driveway access',
        'Outbuilding and equipment inventories',
      ],
      moverTips:
        'Price empty miles and I-82 time honestly. Survey soft shoulders and gate access. Inventory outbuildings separately from main-house scope.',
      cityKeywords: [
        'prosser',
        'benton city',
        'benton',
      ],
    },
    {
      id: 'columbia-bridge-pasco-pairs',
      name: 'Columbia River bridge pairs & Pasco-linked edges',
      shortName: 'Bridge / Pasco pairs',
      neighborhoods: [
        'Cable Bridge approaches',
        'Blue Bridge approaches',
        'Kennewick riverfront edges',
        'Pasco unload patterns (Franklin County)',
        'US-395 river crossing residential edges',
      ],
      housingTypes: 'Benton load + Franklin unload mixes; SFH and multifamily on both banks',
      challenges: [
        'Bridge congestion that reshapes portal windows',
        'Cross-county pairs that still stay in-state (UTC) but burn time',
        'Different curb norms by city',
      ],
      moverTips:
        'Still verify both addresses are in Washington for UTC-only jobs. Build bridge buffers. Prefer mid-week early windows for any Kennewick ↔ Pasco pair.',
      cityKeywords: [
        'pasco',
        'cable bridge',
        'blue bridge',
        'tri-cities',
        'us-395',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Benton County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. HOA soft costs, hillside grade, river-bridge portal time, and summer heat slowdowns separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'I-82 · US-395 · SR-240 · SR-224 congestion',
        detail:
          'Cross-city and bridge pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'HOA gates, truck limits & approved hours',
        detail:
          'Southridge and newer planned tracts add packet lead time and can force smaller trucks.',
      },
      {
        title: 'Hillside driveways & West Richland grade',
        detail:
          'Elevated lots add carry distance and truck-access friction that flat-rate optimism underprices.',
      },
      {
        title: 'Summer heat, wind & dust',
        detail:
          'Inland climate slows exterior work, stresses crews, and can force early-start-only windows July–August.',
      },
      {
        title: 'Prosser empty miles & multi-county Tri-Cities pairs',
        detail:
          'West Benton and Franklin/Yakima destinations raise staging distance and authority complexity when any leg leaves Washington.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$400–$1,400+',
        note: 'Higher with stairs, heat delays, or peak bridge pairs',
      },
      {
        label: '2–3BR apartment, townhome, or modest SFH',
        value: '$1,100–$3,500+',
        note: 'HOA soft costs and corridor buffers trend up',
      },
      {
        label: '3–4+ BR / hillside / cross-zone SFH',
        value: '$2,200–$7,000+',
        note: 'West Richland grade and long I-82 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$100–$175+/hr',
        note: 'Portal-to-portal; packing, HOA admin, and heat slowdowns scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Benton County move',
    intro:
      'School calendars, lab/contractor report dates, extreme summer heat, and windy shoulder seasons reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease HOA hour rules, and reduce I-82 / SR-240 / bridge pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family SFH Saturdays fill first. Book 2–4 weeks ahead for peak weekends. Summer heat often forces 6–7 a.m. starts — plan hydration and inventory protection.',
      },
      {
        title: 'Shoulder seasons: wind and dust',
        detail:
          'Spring and fall wind events can pause open carries and scatter light materials. Prefer flexible dates and tarp plans.',
      },
      {
        title: 'Lab, contractor & employer report-date spikes',
        detail:
          'Hanford/PNNL-linked and professional relocations often land mid-month. Confirm hard move-in dates and storage-in-transit early.',
      },
    ],
  },
  specialized: [
    {
      id: 'tri-cities-inland-climate',
      title: 'Tri-Cities inland climate & bridge logistics module',
      intro:
        'Benton estimates fail more often on heat windows, bridge timing, and zone-product mismatches than on packing skill alone.',
      bullets: [
        'Prefer early morning starts May–September; price heat slowdowns into labor honestly.',
        'Build I-82 / US-395 / SR-240 / bridge buffers for any Kennewick–Richland–Pasco pair.',
        'Protect inventories from dust and wind; confirm tarp and pad plans on open carries.',
        'Collect HOA packets for Southridge and newer planned tracts before the survey is final.',
        'Clarify Benton vs Franklin (Pasco) addresses on every estimate — same metro, different county.',
        'Verify Washington UTC household goods permit for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'kennewick-richland-micro-markets',
      title: 'Kennewick / Richland / West Richland micro-market module',
      intro:
        'A single “Tri-Cities rate” collapses when Southridge HOA product, Richland mid-century stock, and West Richland hillside lots diverge.',
      bullets: [
        'Survey by zone product — core multifamily, HOA two-story, mid-century ranch, or hillside lot — not by “Tri-Cities” alone.',
        'Ask which approach corridors the crew will actually use (I-82 vs SR-240 vs US-395).',
        'Match workforce partial loads and storage-in-transit needs at estimate time for lab/contractor moves.',
        'Price Prosser and west Benton empty miles separately from core Kennewick jobs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Benton County?',
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
              'Kennewick, Richland, Kiona-Benton, Prosser, and other districts cover different address bands. Assignment is address-based — marketing names like Southridge do not guarantee a campus.',
          },
          {
            title: 'Higher education anchors',
            detail:
              'Washington State University Tri-Cities and community-college programs shape some multifamily and professional relocation demand across the metro.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, OSPI data, and campus visits beat ranking screenshots alone. Confirm enrollment windows early when relocating mid-year.',
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
              'Trios Health, Kadlec (Richland), and Lourdes networks anchor much of Tri-Cities care. Specialty referrals may route to Spokane or Seattle — confirm insurance networks.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times including bridge delays from Kennewick, Richland, or West Richland to preferred campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core grids, Southridge growth & hillside product',
            detail:
              'Expect mid-century SFH and apartments through central Kennewick and Richland; newer HOA two-stories in Southridge; hillside family lots in West Richland; and small-town/acreage product toward Prosser.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by zone and school-district band. Budget for HOA dues, summer cooling costs, and irrigation/yard maintenance common in the inland climate.',
          },
          {
            title: 'HOA and building governance',
            detail:
              'Planned-community associations control move hours, truck size, and deposits in growth tracts. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Benton County areas fit whom',
        bullets: [
          {
            title: 'Kennewick core & retail-corridor living',
            detail:
              'Suits people prioritizing central Tri-Cities access and amenities — with arterial congestion and multifamily parking tradeoffs.',
          },
          {
            title: 'Southridge family growth',
            detail:
              'Often appeals for newer homes and schools — with HOA rules and summer heat exposure on move day.',
          },
          {
            title: 'Richland professional / research-adjacent',
            detail:
              'Attracts lab and contractor households — with SR-240 timing and mid-century access patterns.',
          },
          {
            title: 'West Richland or Prosser edges',
            detail:
              'Fits buyers chasing space, views, or wine-country character — with grade, empty miles, and different commute math.',
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
              'Hanford site and cleanup contractors, Pacific Northwest National Laboratory, healthcare, agriculture/food processing, logistics, and regional services concentrate demand across the Tri-Cities.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households cross the Columbia daily. Test drive peak routes over I-82, US-395, and SR-240 before choosing solely on rent or purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Inland mid-Columbia living',
            detail:
              'Benton stacks desert climate, river recreation, wine-country edges, and research-economy housing pressure — different from Puget Sound rain cities or Spokane’s continental winters.',
          },
          {
            title: 'Climate',
            detail:
              'Hot dry summers, cold snaps in winter, wind, and abundant sun. Plan outdoor staging for heat and dust — not maritime drizzle.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Outdoor recreation on the Columbia and Yakima rivers, wine tourism toward Prosser, and a practical regional-hub pace. Visit in July heat and during weekday bridge peaks when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Benton County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Washington UTC household goods permit status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Benton County — official site',
        href: 'https://www.co.benton.wa.us/',
        external: true,
        note: 'County services & permits context',
      },
      {
        label: 'City of Kennewick — official site',
        href: 'https://www.go2kennewick.com/',
        external: true,
        note: 'City services & street-use context',
      },
      {
        label: 'City of Richland — official site',
        href: 'https://www.ci.richland.wa.us/',
        external: true,
        note: 'City services context',
      },
      {
        label: 'WSDOT — traffic & road conditions',
        href: 'https://wsdot.com/travel/real-time/',
        external: true,
        note: 'I-82 / US-395 / SR-240 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with Kennewick HOA and Richland mid-century access experience; West Richland grade fluency; honest I-82 · US-395 · SR-240 · SR-224 and bridge timing; inland heat/wind readiness. Verify Washington UTC household goods permit for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
