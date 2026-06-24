import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Washington county research — 39/39 complete */
export const washingtonCountyResearch: Record<string, CuratedCountyResearch> = {
  king: {
    marketNotes:
      'King County anchors Western Washington’s Seattle metro — the state’s highest-value moving market. Dense urban housing, Amazon and Microsoft tech-corridor relocations, high-rise and Eastside suburban moves, and elevated labor costs distinguish King from Eastern Washington markets.',
    costs: {
      studioRange: '$950–$2,100',
      familyRange: '$4,000–$9,500+',
      avgHourly: '$140–$210/hr for a 2-person crew',
      note: 'King County pricing reflects Seattle metro demand, I-5 and bridge-crossing traffic, elevator and parking constraints, and competition among full-service agents serving urban and Eastside suburban communities.',
    },
    tips: [
      'Verify coverage for Seattle, Bellevue, Redmond, and surrounding cities before booking.',
      'Heavy urban traffic and bridge crossings (520, I-90) significantly impact scheduling — confirm crew arrival windows.',
      'Tech-corridor and high-rise moves may require elevator reservations and loading-zone permits — confirm building coordination experience.',
      'Alaska-bound relocations often stage through Seattle-area ports — distinguish local King County movers from interstate van-line agents.',
      'Confirm insurance for high-value urban and suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pierce: {
    marketNotes:
      'Pierce County is a large and growing county with strong urban, suburban, military, and residential demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$130–$195/hr for a 2-person crew',
      note: 'Pierce County pricing reflects Seattle-Tacoma metro demand, I-5 corridor traffic, Joint Base Lewis-McChord spillover, and competition among full-service agents serving Tacoma and South Sound suburban communities.',
    },
    tips: [
      'Verify coverage for Tacoma, Lakewood, and surrounding cities before booking.',
      'Heavy Seattle-Tacoma metro traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Military PCS moves near JBLM require base access coordination — confirm mover credentials and clearance experience.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  snohomish: {
    marketNotes:
      'Snohomish County is Western Washington’s fast-growing North Sound suburban market — Everett, Lynnwood, and Boeing-corridor communities north of Seattle with strong tech-spillover and residential demand distinct from Eastern Washington’s rural profile.',
    costs: {
      studioRange: '$950–$2,000',
      familyRange: '$3,800–$9,000+',
      avgHourly: '$135–$200/hr for a 2-person crew',
      note: 'Snohomish County pricing reflects North Sound suburban growth, I-5 and US-2 corridor traffic, and competition among full-service agents serving Everett and Lynnwood-area communities.',
    },
    tips: [
      'Verify coverage for Everett, Lynnwood, and surrounding cities before booking.',
      'Heavy Seattle metro traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  spokane: {
    marketNotes:
      'Spokane County anchors Eastern Washington — a more suburban and rural market than the Puget Sound corridor, with lower costs, agricultural spillover, and longer regional hauls to Idaho and central Washington rather than Seattle tech-corridor density.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Spokane County pricing reflects Inland Northwest demand, I-90 corridor traffic, and competition among regional full-service agents serving Spokane and surrounding suburban communities.',
    },
    tips: [
      'Verify coverage for Spokane and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  clark: {
    marketNotes:
      'Clark County is a rapidly growing county across the Columbia River from Portland with strong suburban residential demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,000+',
      avgHourly: '$125–$185/hr for a 2-person crew',
      note: 'Clark County pricing reflects Portland metro spillover demand, I-5 and I-205 bridge-crossing traffic, and competition among full-service agents serving Vancouver and suburban Clark County communities.',
    },
    tips: [
      'Verify coverage for Vancouver and surrounding cities before booking.',
      'Portland metro traffic and Columbia River bridge crossings impact scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  thurston: {
    marketNotes:
      'Thurston County is the state capital county with strong governmental and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Thurston County pricing reflects capital-region demand, I-5 South Sound corridor traffic, and competition among regional full-service agents serving Olympia and surrounding communities.',
    },
    tips: [
      'Verify coverage for Olympia and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Government and legislative session moves create seasonal demand spikes — book early around session changeover.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  kitsap: {
    marketNotes:
      'Kitsap County is a peninsula county with strong naval, suburban, and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Kitsap County pricing reflects peninsula and naval-base demand, ferry-dependent logistics, and competition among regional full-service agents serving Bremerton and Port Orchard-area communities.',
    },
    tips: [
      'Verify coverage for Bremerton and surrounding cities before booking.',
      'Ferry and regional traffic impacts scheduling — confirm crew arrival windows and peninsula access.',
      'Naval base and military moves near Naval Base Kitsap require coordination — confirm credentials.',
      'Confirm insurance for high-value waterfront homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  yakima: {
    marketNotes:
      'Yakima County is a major agricultural county in Central Washington with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Yakima County pricing reflects Central Washington regional demand, agricultural-season traffic patterns, and competition among regional full-service agents serving Yakima and valley communities.',
    },
    tips: [
      'Verify coverage for Yakima and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and harvest-season changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  whatcom: {
    marketNotes:
      'Whatcom County is a northern Washington county with strong residential, educational, and border-related demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Whatcom County pricing reflects Bellingham metro and northern border demand, I-5 corridor traffic, and competition among regional full-service agents serving Bellingham and surrounding communities.',
    },
    tips: [
      'Verify coverage for Bellingham and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and university term changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  benton: {
    marketNotes:
      'Benton County is part of the Tri-Cities area with strong residential and industrial demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Benton County pricing reflects Tri-Cities regional demand, Hanford-area industrial relocations, and competition among regional full-service agents serving Kennewick and Richland communities.',
    },
    tips: [
      'Verify coverage for Kennewick, Richland, and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  skagit: {
    marketNotes:
      'Skagit County is a northwestern Washington county with strong agricultural and residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Skagit County pricing reflects North Sound agricultural and suburban demand, I-5 corridor traffic, and competition among regional full-service agents serving Mount Vernon and valley communities.',
    },
    tips: [
      'Verify coverage for Mount Vernon and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and harvest-season changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cowlitz: {
    marketNotes:
      'Cowlitz County is a southwestern Washington county with residential and industrial demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Cowlitz County pricing reflects Longview-Kelso regional demand, I-5 corridor traffic, and competition among regional full-service agents serving southwestern Washington communities.',
    },
    tips: [
      'Verify coverage for Longview and Kelso before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  grant: {
    marketNotes:
      'Grant County is a central Washington county with strong agricultural and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Grant County pricing reflects Moses Lake and Columbia Basin regional demand, agricultural-season traffic patterns, and competition among regional full-service agents serving central Washington communities.',
    },
    tips: [
      'Verify coverage for Moses Lake and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and harvest-season changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  franklin: {
    marketNotes:
      'Franklin County is part of the Tri-Cities area with strong residential and industrial demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Franklin County pricing reflects Tri-Cities regional demand, agricultural and industrial relocations, and competition among regional full-service agents serving Pasco and surrounding communities.',
    },
    tips: [
      'Verify coverage for Pasco and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lewis: {
    marketNotes:
      'Lewis County is a southwestern Washington county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Lewis County pricing reflects Chehalis-Centralia regional demand, I-5 South Sound corridor traffic, and competition among regional full-service agents serving southwestern Washington communities.',
    },
    tips: [
      'Verify coverage for Chehalis and Centralia before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  island: {
    marketNotes:
      'Island County includes Whidbey Island with strong residential and military demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Island County pricing reflects Whidbey Island and naval-base demand, ferry-dependent logistics, and competition among regional full-service agents serving Oak Harbor and Coupeville-area communities.',
    },
    tips: [
      'Verify coverage for Oak Harbor, Coupeville, and Whidbey Island before booking.',
      'Ferry traffic significantly impacts scheduling — confirm crew arrival windows and island access.',
      'Naval base and military moves near NAS Whidbey require coordination — confirm credentials.',
      'Confirm insurance for high-value island homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  chelan: {
    marketNotes:
      'Chelan County is a central Washington county with strong residential, agricultural, and tourism demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Chelan County pricing reflects Wenatchee and Lake Chelan regional demand, tourism-season traffic, and competition among regional full-service agents serving central Washington communities.',
    },
    tips: [
      'Verify coverage for Wenatchee and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak tourist seasons (June–August) and harvest-season changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  clallam: {
    marketNotes:
      'Clallam County is an Olympic Peninsula county with strong residential and tourism demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Clallam County pricing reflects Olympic Peninsula and coastal demand, ferry and regional traffic, and competition among regional full-service agents serving Port Angeles and surrounding communities.',
    },
    tips: [
      'Verify coverage for Port Angeles and surrounding areas before booking.',
      'Ferry and regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak tourist seasons (June–August) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'grays-harbor': {
    marketNotes:
      'Grays Harbor County is a coastal county with residential and industrial demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Grays Harbor County pricing reflects coastal southwestern Washington demand, industrial and port-related relocations, and competition among regional full-service agents serving Aberdeen and Montesano-area communities.',
    },
    tips: [
      'Verify coverage for Aberdeen and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mason: {
    marketNotes:
      'Mason County is a rural waterfront county on Hood Canal with residential demand centered in Shelton.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Mason County pricing reflects Hood Canal and rural waterfront demand, US-101 corridor traffic, and competition among regional full-service agents serving Shelton and surrounding communities.',
    },
    tips: [
      'Verify coverage for Shelton and Hood Canal communities before booking.',
      'Rural roads and waterfront access impact scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value waterfront and rural homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'walla-walla': {
    marketNotes:
      'Walla Walla County is a southeastern Washington agricultural county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Walla Walla County pricing reflects southeastern Washington agricultural demand, harvest-season traffic patterns, and competition among regional full-service agents serving Walla Walla and valley communities.',
    },
    tips: [
      'Verify coverage for Walla Walla and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and harvest-season changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  stevens: {
    marketNotes:
      'Stevens County is a northeastern Washington rural county with residential demand centered in Colville.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Stevens County pricing reflects northeastern Washington rural demand, mountain-road logistics, and competition among regional full-service agents serving Colville and surrounding communities.',
    },
    tips: [
      'Verify coverage for Colville and surrounding areas before booking.',
      'Rural and mountain-road traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value rural homes.',
      'Book early for peak seasons (May–September) and winter-weather changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  kittitas: {
    marketNotes:
      'Kittitas County is an educational county centered in Ellensburg with residential and university demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Kittitas County pricing reflects Ellensburg university and I-90 corridor demand, student housing turnover, and competition among regional full-service agents serving Kittitas Valley communities.',
    },
    tips: [
      'Verify coverage for Ellensburg and surrounding cities before booking.',
      'I-90 corridor traffic impacts scheduling — confirm crew arrival windows.',
      'University term changeover creates seasonal demand spikes — book early around semester start and end.',
      'Confirm insurance for high-value homes.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  whitman: {
    marketNotes:
      'Whitman County is a university county centered in Pullman with WSU-driven residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Whitman County pricing reflects WSU/Pullman university demand, Palouse-region traffic patterns, and competition among regional full-service agents serving Pullman and Colfax-area communities.',
    },
    tips: [
      'Verify coverage for Pullman and Colfax before booking.',
      'University term changeover creates seasonal demand spikes — book early around semester start and end.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  douglas: {
    marketNotes:
      'Douglas County is a central Washington county with agricultural and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Douglas County pricing reflects central Washington regional demand, agricultural-season traffic patterns, and competition among regional full-service agents serving Waterville and highland communities.',
    },
    tips: [
      'Verify coverage for Waterville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value rural homes.',
      'Book early for peak seasons (May–September) and harvest-season changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  okanogan: {
    marketNotes:
      'Okanogan County is a north central Washington rural county with residential and agricultural demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Okanogan County pricing reflects north central Washington rural demand, US-97 corridor traffic, and competition among regional full-service agents serving Okanogan and Omak-area communities.',
    },
    tips: [
      'Verify coverage for Okanogan and Omak before booking.',
      'Rural and mountain-road traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value rural homes.',
      'Book early for peak seasons (May–September) and harvest-season changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jefferson: {
    marketNotes:
      'Jefferson County is an Olympic Peninsula county with tourism, ferry, and residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Jefferson County pricing reflects Olympic Peninsula tourism and ferry-dependent logistics, waterfront demand, and competition among regional full-service agents serving Port Townsend and surrounding communities.',
    },
    tips: [
      'Verify coverage for Port Townsend and surrounding areas before booking.',
      'Ferry and regional traffic significantly impacts scheduling — confirm crew arrival windows and peninsula access.',
      'Confirm insurance for high-value waterfront and historic homes.',
      'Book early for peak tourist seasons (June–August) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  klickitat: {
    marketNotes:
      'Klickitat County is a Columbia River county with residential and Gorge-area demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Klickitat County pricing reflects Columbia River and Gorge-area demand, US-97 corridor traffic, and competition among regional full-service agents serving Goldendale and river communities.',
    },
    tips: [
      'Verify coverage for Goldendale and surrounding areas before booking.',
      'Gorge and regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value rural and river-view homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pacific: {
    marketNotes:
      'Pacific County is a coastal tourism county with residential demand along the Washington coast.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Pacific County pricing reflects coastal tourism demand, US-101 corridor traffic, and competition among regional full-service agents serving South Bend and Long Beach-area communities.',
    },
    tips: [
      'Verify coverage for South Bend and coastal communities before booking.',
      'Coastal and regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value coastal homes.',
      'Book early for peak tourist seasons (June–August) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  asotin: {
    marketNotes:
      'Asotin County is a southeastern Washington county at the Idaho border with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Asotin County pricing reflects southeastern corner regional demand, Clarkston-Lewiston metro spillover, and competition among regional full-service agents serving Asotin and river communities.',
    },
    tips: [
      'Verify coverage for Asotin and Clarkston-area communities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  adams: {
    marketNotes:
      'Adams County is an agricultural county in eastern Washington with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Adams County pricing reflects eastern Washington agricultural demand, harvest-season traffic patterns, and competition among regional full-service agents serving Ritzville and plateau communities.',
    },
    tips: [
      'Verify coverage for Ritzville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value rural homes.',
      'Book early for peak seasons (May–September) and harvest-season changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'san-juan': {
    marketNotes:
      'San Juan County is an island county with ferry-dependent residential and tourism demand.',
    costs: {
      studioRange: '$950–$2,000',
      familyRange: '$4,000–$9,500+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'San Juan County pricing reflects island and ferry-dependent logistics, waterfront demand, and competition among regional full-service agents serving Friday Harbor and San Juan Islands communities.',
    },
    tips: [
      'Verify coverage for Friday Harbor and island communities before booking.',
      'Ferry schedules significantly impact scheduling — confirm crew arrival windows and inter-island logistics.',
      'Confirm insurance for high-value waterfront and island homes.',
      'Book early for peak tourist seasons (June–August) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'pend-oreille': {
    marketNotes:
      'Pend Oreille County is a northeastern Washington rural county with residential demand centered in Newport.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Pend Oreille County pricing reflects northeastern Washington rural and lake-area demand, US-2 corridor traffic, and competition among regional full-service agents serving Newport and surrounding communities.',
    },
    tips: [
      'Verify coverage for Newport and surrounding areas before booking.',
      'Rural and lake-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value rural and lakefront homes.',
      'Book early for peak seasons (May–September) and winter-weather changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  skamania: {
    marketNotes:
      'Skamania County is a Columbia Gorge county with residential and outdoor-tourism demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Skamania County pricing reflects Columbia Gorge demand, US-14 and I-84 corridor traffic, and competition among regional full-service agents serving Stevenson and Gorge communities.',
    },
    tips: [
      'Verify coverage for Stevenson and surrounding areas before booking.',
      'Gorge and bridge-crossing traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value rural and river-view homes.',
      'Book early for peak tourist seasons (June–August) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lincoln: {
    marketNotes:
      'Lincoln County is an eastern Washington rural county with residential demand centered in Davenport.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Lincoln County pricing reflects eastern Washington rural demand, agricultural-season traffic patterns, and competition among regional full-service agents serving Davenport and plateau communities.',
    },
    tips: [
      'Verify coverage for Davenport and surrounding areas before booking.',
      'Rural-road traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value rural homes.',
      'Book early for peak seasons (May–September) and harvest-season changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  ferry: {
    marketNotes:
      'Ferry County is a remote northeastern Washington county with residential demand centered in Republic.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Ferry County pricing reflects remote northeastern Washington demand, mountain-road logistics, and competition among regional full-service agents serving Republic and highland communities.',
    },
    tips: [
      'Verify coverage for Republic and surrounding areas before booking.',
      'Remote mountain-road access impacts scheduling — confirm crew arrival windows and route feasibility.',
      'Confirm insurance for high-value rural homes.',
      'Book early for peak seasons (May–September) and winter-weather changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wahkiakum: {
    marketNotes:
      'Wahkiakum County is one of Washington’s smallest counties with residential demand along the lower Columbia River.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Wahkiakum County pricing reflects lower Columbia River regional demand, rural-road logistics, and competition among regional full-service agents serving Cathlamet and river communities.',
    },
    tips: [
      'Verify coverage for Cathlamet and surrounding areas before booking.',
      'Rural and river-road traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value rural and waterfront homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  columbia: {
    marketNotes:
      'Columbia County is a southeastern Washington rural county (not Oregon’s Columbia County) with residential demand centered in Dayton.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Columbia County pricing reflects southeastern plateau regional demand, agricultural-season traffic patterns, and competition among regional full-service agents serving Dayton and surrounding communities.',
    },
    tips: [
      'Verify coverage for Dayton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value rural homes.',
      'Book early for peak seasons (May–September) and harvest-season changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  garfield: {
    marketNotes:
      'Garfield County is one of Washington’s smallest counties with residential demand centered in Pomeroy.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Garfield County pricing reflects southeastern Washington rural demand, Palouse-region traffic patterns, and competition among regional full-service agents serving Pomeroy and valley communities.',
    },
    tips: [
      'Verify coverage for Pomeroy and surrounding areas before booking.',
      'Rural-road traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value rural homes.',
      'Book early for peak seasons (May–September) and harvest-season changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getWashingtonCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return washingtonCountyResearch[countySlug];
}