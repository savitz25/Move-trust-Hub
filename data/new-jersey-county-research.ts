import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Grok Heavy–researched county content overrides templated SEO sections */
export const newJerseyCountyResearch: Record<string, CuratedCountyResearch> = {
  atlantic: {
    marketNotes:
      'Atlantic County centers on Atlantic City tourism, coastal properties, and suburban/rural areas. Moves often involve condos, seasonal properties, and residential relocations with casino/hospitality considerations.',
    costs: {
      studioRange: '$450–$950',
      familyRange: '$1,800–$4,000',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Atlantic City, Egg Harbor, and shore-area moves often reflect condo elevator fees, summer tourism-season demand, and parking restrictions near the boardwalk.',
    },
    tips: [
      'Coastal/boardwalk properties require sand protection and elevator coordination.',
      'Summer tourism peaks demand; book early.',
      'Condos/HOAs have strict rules—obtain approvals early.',
      'Verify coverage for Atlantic City, Egg Harbor, and outlying areas.',
      'Confirm insurance for waterfront/high-value items.',
    ],
  },
  bergen: {
    marketNotes:
      'Bergen County is New Jersey’s most populous county (~955,000–980,000 residents) and one of the densest U.S. suburban markets. Fort Lee–Edgewater Hudson waterfront high-rises (COI/elevators) contrast sharply with affluent inland towns (Ridgewood, Wyckoff, Saddle River, Tenafly). George Washington Bridge adjacency drives Manhattan-oriented relocations; Route 17/Paramus, Route 4, I-80, and the Parkway control portal-to-portal time. High home values and tight older street grids define most jobs.',
    costs: {
      studioRange: '$600–$1,600+',
      familyRange: '$1,900–$4,600+',
      avgHourly: '$135–$210+/hr for a 2-person crew',
      note: 'Fort Lee elevators/permits, Ridgewood–Wyckoff high-value homes, and GWB/Route 17 congestion often push above base ranges; cross-zone pairs add labor time.',
    },
    tips: [
      'Fort Lee and Edgewater high-rises almost always need COI, elevator reservations, and early curb staging or parking permits.',
      'Ridgewood, Wyckoff, and Saddle River jobs need careful-handling inventories and realistic long-carry labor on village streets.',
      'Avoid GWB and Route 17 peaks (7–9 a.m., 3–7 p.m., Paramus weekend retail) when scheduling trucks.',
      'Collect building or HOA packets before move day for multi-unit and planned communities.',
      'NYC-oriented moves need interstate authority when state lines are crossed; pure NJ legs follow New Jersey household-goods frameworks.',
    ],
  },
  burlington: {
    marketNotes:
      'Burlington County features suburban growth (Mount Laurel, Marlton), historic towns, and proximity to Philadelphia. Moves often involve family residential, military (near Joint Base McGuire-Dix-Lakehurst), and commuter properties.',
    costs: {
      studioRange: '$450–$950',
      familyRange: '$1,700–$3,800',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Mount Holly, Mount Laurel, and Burlington City moves may reflect HOA move-in rules, I-295 traffic windows, and Philadelphia commuter timing.',
    },
    tips: [
      'Suburban HOAs and new developments often have move-in rules and parking restrictions.',
      'Proximity to Philadelphia and I-295/I-95 can affect traffic and timing.',
      'Military-related moves are common; confirm experience with base logistics.',
      'Rural/eastern areas may involve longer access roads.',
      'Verify coverage for Mount Holly, Mount Laurel, and Burlington City.',
    ],
  },
  camden: {
    marketNotes:
      'Camden County includes urban Camden, suburban areas (Cherry Hill, Voorhees), and growing residential communities. Moves often involve family relocations, cross-river to Philadelphia, and suburban properties with good regional support.',
    costs: {
      studioRange: '$450–$950',
      familyRange: '$1,700–$3,800',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Cherry Hill, Voorhees, and Camden City moves may reflect HOA rules, Benjamin Franklin Bridge traffic, and Philadelphia cross-river timing.',
    },
    tips: [
      'Suburban HOAs and new developments have move-in rules and parking restrictions.',
      'Proximity to Philadelphia and bridges (e.g., Benjamin Franklin) affects traffic and timing.',
      'Verify coverage for Cherry Hill, Voorhees, and Camden City.',
      'Obtain multiple estimates in this competitive South Jersey market.',
      'Confirm insurance for high-value suburban homes.',
    ],
  },
  'cape-may': {
    marketNotes:
      'Cape May County is a coastal/tourism county with beach communities (Cape May, Wildwood, Ocean City). Moves often involve seasonal properties, vacation homes, and residential relocations with hurricane and coastal logistics.',
    costs: {
      studioRange: '$450–$950',
      familyRange: '$1,800–$4,000',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Cape May, Wildwood, and Ocean City moves often reflect summer tourism demand, bridge access, and elevated or waterfront property handling.',
    },
    tips: [
      'Beach and barrier island properties require sand protection, elevators, and bridge access planning.',
      'Tourism season (summer) increases demand; book early.',
      'Many properties are elevated or waterfront; discuss specialized handling.',
      'Hurricane season affects storage and timing; confirm contingencies.',
      'Verify explicit service to Cape May, Wildwood, and outlying areas.',
    ],
  },
  cumberland: {
    marketNotes:
      'Cumberland County is rural/agricultural with Bridgeton and Vineland as key hubs. Moves often involve residential, farm-related, and family relocations with some industrial/commercial activity. Regional South Jersey support is common.',
    costs: {
      studioRange: '$400–$850',
      familyRange: '$1,500–$3,200',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Bridgeton and Vineland moves may reflect rural driveways, farm equipment handling, and travel from regional South Jersey crews.',
    },
    tips: [
      'Agricultural or rural properties may involve long driveways or equipment handling; provide detailed inventory.',
      'Confirm explicit regional service to Bridgeton and Vineland.',
      'Storage is limited locally; use South Jersey facilities if needed.',
      'Obtain multiple estimates in this moderate-volume market.',
      'Verify credentials and insurance for farm or high-value items.',
    ],
  },
  essex: {
    marketNotes:
      'Essex County is one of the densest U.S. counties: Newark’s multi-family and high-rise core contrasts sharply with Montclair, South Orange, Maplewood, Livingston, Millburn, and Short Hills. Moves routinely need COI/elevator windows, municipal parking permits, and honest portal-to-portal time on the Garden State Parkway, I-280, Route 21, Route 24, and Route 10 — plus frequent NYC-oriented relocations between the city and Essex suburbs.',
    costs: {
      studioRange: '$550–$1,500+',
      familyRange: '$1,700–$4,200+',
      avgHourly: '$130–$200+/hr for a 2-person crew',
      note: 'Newark elevators/permits, Victorian long carries in Montclair/Maplewood, and Livingston–Short Hills high-value homes often push above base ranges; cross-zone Parkway/I-280 pairs add labor time.',
    },
    tips: [
      'Newark high-rises and multi-family buildings almost always need COI, elevator reservations, and early curb staging or parking permits.',
      'Montclair, Glen Ridge, and Maplewood Victorians often mean narrow stairs and long carries — smaller trucks beat forcing a full trailer onto side streets.',
      'Garden State Parkway, I-280, Route 21, Route 24, and Route 10 control billable hours; ask if quotes are portal-to-portal.',
      'Livingston, Millburn, and Short Hills frequently involve higher-value contents and HOA or neighborhood rules — collect packets before move day.',
      'NYC-oriented moves (Manhattan/Brooklyn ↔ Essex) need interstate authority when state lines are crossed; pure NJ legs follow New Jersey household-goods frameworks.',
    ],
  },
  gloucester: {
    marketNotes:
      'Gloucester County is suburban/rural with growing communities (Mullica Hill, Glassboro, Deptford). Moves often involve family residential, agricultural properties, and commuter relocations to Philadelphia/Camden.',
    costs: {
      studioRange: '$450–$900',
      familyRange: '$1,600–$3,500',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Woodbury, Glassboro, and Deptford moves may reflect HOA rules, I-295 traffic, and rural driveway access for agricultural properties.',
    },
    tips: [
      'Suburban developments and HOAs have move-in rules and parking restrictions.',
      'Rural/agricultural areas may require longer driveways or equipment handling.',
      'Proximity to I-295 and Philadelphia influences traffic.',
      'Obtain multiple estimates in this moderate South Jersey market.',
      'Verify coverage for Woodbury, Glassboro, and outlying towns.',
    ],
  },
  hudson: {
    marketNotes:
      'Hudson County is densely urban with Jersey City, Hoboken, and waterfront high-rises. Moves often involve condos, high-rises, and cross-Hudson logistics to NYC with heavy traffic and building restrictions.',
    costs: {
      studioRange: '$550–$1,200',
      familyRange: '$2,200–$5,000+',
      avgHourly: '$130–$195/hr for a 2-person crew',
      note: 'Jersey City and Hoboken high-rise moves often reflect elevator reservations, parking permits, and Holland/Lincoln Tunnel traffic windows.',
    },
    tips: [
      'High-rises and Jersey City/Hoboken buildings require elevator reservations and strict scheduling.',
      'Waterfront and PATH-adjacent areas have parking and access challenges.',
      'Heavy traffic on I-78, NJ Turnpike, and bridges/tunnels to NYC.',
      'Diverse neighborhoods benefit from multilingual crews.',
      'Verify insurance for high-value urban properties.',
    ],
  },
  hunterdon: {
    marketNotes:
      'Hunterdon County is suburban/rural with historic towns (Flemington, Clinton) and affluent residential areas. Moves often involve family homes, equestrian/farm properties, and commuter relocations to NYC/Philadelphia.',
    costs: {
      studioRange: '$450–$950',
      familyRange: '$1,700–$3,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Flemington and Clinton moves may reflect historic home preservation, long rural driveways, and I-78 commuter traffic windows.',
    },
    tips: [
      'Rural or equestrian properties may require long driveways or specialized equipment handling.',
      'Historic districts have preservation considerations for older homes.',
      'Commuter traffic on I-78 and US-22 can affect timing.',
      'Obtain multiple estimates in this moderate-volume market.',
      'Verify coverage for Flemington, Clinton, and outlying towns.',
    ],
  },
  mercer: {
    marketNotes:
      'Mercer County includes Trenton (capital), affluent Princeton, and suburban/rural areas. Moves often involve government, university (Princeton), family residential, and commuter properties with strong regional support.',
    costs: {
      studioRange: '$450–$950',
      familyRange: '$1,700–$3,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Trenton, Princeton, and Hamilton moves may reflect university timing, Route 1 traffic, and suburban HOA move-in rules.',
    },
    tips: [
      'Princeton and suburban HOAs have move-in rules and parking restrictions.',
      'Government and university moves may require specific timing.',
      'I-95 and Route 1 traffic can affect scheduling.',
      'Rural western areas may involve longer driveways.',
      'Verify coverage for Trenton, Princeton, and Hamilton.',
    ],
  },
  middlesex: {
    marketNotes:
      'Middlesex County is a large, diverse central New Jersey market between NYC-metro gravity and Shore corridors. County seat New Brunswick (Rutgers) drives May/August student and faculty peaks; dense townships (Edison, Woodbridge, Piscataway), older urban cores (Perth Amboy), and suburbs (East Brunswick, Old Bridge, South Brunswick) mix multi-family COI jobs with HOA townhomes and SFH. Turnpike, Parkway, Routes 1/9/18/27, and logistics corridors control portal-to-portal time.',
    costs: {
      studioRange: '$550–$1,450+',
      familyRange: '$1,700–$4,200+',
      avgHourly: '$125–$195+/hr for a 2-person crew',
      note: 'Rutgers peak weeks, multi-family COI/elevators, and Turnpike/Route 1 congestion often push above base ranges; cross-township pairs add labor time.',
    },
    tips: [
      'Book New Brunswick / Highland Park multi-family early for May and August Rutgers peaks — or target mid-week off-peak windows.',
      'Collect COI and elevator packets for garden apartments and condo/townhome communities in Edison, Woodbridge, and Piscataway.',
      'Prefer mid-week mornings to avoid Turnpike, Parkway, Route 1, and Route 18 peaks.',
      'Perth Amboy and downtown New Brunswick often need smaller trucks and early curb staging.',
      'Multilingual crews and clear written inventories help across one of NJ’s most diverse counties; confirm interstate authority if the job crosses into New York.',
    ],
  },
  monmouth: {
    marketNotes:
      'Monmouth County (~651,000 residents) pairs classic Jersey Shore towns (Asbury Park, Long Branch, Belmar, Manasquan, Ocean Grove) with large inland suburban townships (Freehold, Middletown, Marlboro, Manalapan, Howell). Summer tourism spikes demand and congests the Garden State Parkway, Routes 35/36/18/9; shore blocks mean narrow streets and tight staging while inland planned communities add HOA/COI rules. NYC and regional commute relocations sit beside true shore-oriented and second-home style moves.',
    costs: {
      studioRange: '$550–$1,450+',
      familyRange: '$1,700–$4,200+',
      avgHourly: '$125–$195+/hr for a 2-person crew',
      note: 'Shore staging/shuttles, peak summer weekends, and Freehold–Marlboro–Manalapan HOA soft costs often push above base ranges; inland↔shore pairs add Parkway portal-to-portal time.',
    },
    tips: [
      'Prefer mid-week morning windows for shore towns May–September — Saturday curb space and Parkway exits fill early.',
      'Ocean Grove, Spring Lake, Belmar, and similar grids often need smaller trucks or shuttles; share street approach photos.',
      'Collect HOA packets for Freehold Township, Marlboro, Manalapan, and Howell planned communities before move day.',
      'Build sand/floor protection and humidity-aware packing into beach-block inventories.',
      'Ask whether quotes are portal-to-portal on GSP / Routes 35–36–18–9, especially Freehold ↔ central shore pairs.',
    ],
  },
  morris: {
    marketNotes:
      'Morris County is affluent suburban with Morristown, Parsippany, and historic towns. Moves often involve family residential, corporate, and upscale properties with strong commuter ties to NYC.',
    costs: {
      studioRange: '$500–$1,000',
      familyRange: '$1,900–$4,000',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Morristown and Parsippany moves may reflect upscale HOA rules, historic home handling, and I-287 commuter traffic.',
    },
    tips: [
      'Affluent suburbs and HOAs have strict move-in rules and parking restrictions.',
      'Historic districts require preservation-sensitive handling for older homes.',
      'Heavy commuter traffic on I-287, I-80, and Route 10.',
      'Obtain multiple estimates in this competitive market.',
      'Verify coverage for Morristown, Parsippany, and outlying towns.',
    ],
  },
  ocean: {
    marketNotes:
      'Ocean County (~674,000–679,000 residents) pairs barrier-island shore towns (Point Pleasant Beach, Seaside, Lavallette, Long Beach Island) with inland Toms River, Brick, Jackson, and Manchester. Lakewood is denser and demographically distinct from shore cottages or 55+ communities. Summer tourism, causeway timing (Routes 37/72), Parkway congestion, flood-zone logistics, and retirement-community HOA rules define most jobs.',
    costs: {
      studioRange: '$500–$1,350+',
      familyRange: '$1,600–$4,000+',
      avgHourly: '$120–$190+/hr for a 2-person crew',
      note: 'LBI/Seaside staging, peak summer weekends, Lakewood density labor, and Jackson/Manchester 55+ HOA soft costs often push above base ranges; inland↔island pairs add Parkway/Route 37–72 time.',
    },
    tips: [
      'Prefer mid-week morning windows for barrier islands May–September — Saturday curb space and causeways fill early.',
      'Do not price Lakewood like a bayfront cottage; survey density, multi-unit access, and local calendars separately.',
      'Collect HOA packets for Jackson, Manchester, and other 55+ / planned communities before move day.',
      'Build sand protection, humidity-aware packing, and weather flexibility into LBI and flood-zone inventories.',
      'Ask whether quotes are portal-to-portal on GSP / Routes 9–37–70–72, especially Toms River ↔ island pairs.',
    ],
  },
  passaic: {
    marketNotes:
      'Passaic County includes urban Paterson, suburban Wayne, and diverse communities. Moves often involve family residential, high-density urban, and suburban properties with strong local and regional options.',
    costs: {
      studioRange: '$500–$1,000',
      familyRange: '$1,900–$4,000',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Paterson, Wayne, and Clifton moves may reflect urban parking limits, HOA rules, and Route 46 or I-80 traffic windows.',
    },
    tips: [
      'Urban Paterson areas have tight parking and building restrictions.',
      'Suburban towns have HOA rules for new developments.',
      'Heavy traffic on Route 46, I-80, and Garden State Parkway.',
      'Diverse communities benefit from multilingual crews.',
      'Verify coverage for Paterson, Wayne, and Clifton.',
    ],
  },
  salem: {
    marketNotes:
      'Salem County is rural/agricultural with small towns (Salem, Pennsville) and riverfront areas. Moves are primarily residential and farm-related with limited local infrastructure. Regional South Jersey support is common.',
    costs: {
      studioRange: '$400–$850',
      familyRange: '$1,400–$3,000',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Salem and Pennsville moves may reflect rural driveways, farm equipment handling, and travel from regional South Jersey crews.',
    },
    tips: [
      'Rural or agricultural properties may involve long driveways or equipment handling.',
      'Confirm explicit regional service to Salem and Pennsville.',
      'Storage is limited locally; use South Jersey facilities.',
      'Obtain multiple estimates in this low-volume market.',
      'Verify credentials and insurance for farm or riverfront properties.',
    ],
  },
  somerset: {
    marketNotes:
      'Somerset County is affluent suburban with Bridgewater, Somerville, and historic towns. Moves often involve family residential, corporate, and upscale properties with strong commuter ties to NYC.',
    costs: {
      studioRange: '$500–$1,000',
      familyRange: '$1,900–$4,000',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Somerville and Bridgewater moves may reflect upscale HOA rules, historic home handling, and I-287 commuter traffic.',
    },
    tips: [
      'Suburban HOAs and new developments have strict move-in rules.',
      'Historic districts require preservation-sensitive handling.',
      'Heavy commuter traffic on I-287 and Route 22.',
      'Obtain multiple estimates in this competitive market.',
      'Verify coverage for Somerville, Bridgewater, and outlying towns.',
    ],
  },
  sussex: {
    marketNotes:
      'Sussex County is rural and scenic with lakes, mountains, and small towns (Newton, Sparta). Moves often involve residential, farm/equestrian, and seasonal properties with limited local infrastructure.',
    costs: {
      studioRange: '$450–$900',
      familyRange: '$1,600–$3,400',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Newton and Sparta moves may reflect lake-property access, long rural driveways, and travel from regional North Jersey crews.',
    },
    tips: [
      'Rural or lake properties may involve long driveways or specialized access.',
      'Confirm explicit regional service to Newton and outlying areas.',
      'Storage is limited locally; use nearby facilities.',
      'Obtain multiple estimates in this low-volume market.',
      'Verify credentials for farm or high-value rural properties.',
    ],
  },
  union: {
    marketNotes:
      'Union County is densely populated with urban Elizabeth, suburban towns (Westfield, Cranford), and diverse communities. Moves often involve family residential, high-density urban, and commuter properties.',
    costs: {
      studioRange: '$500–$1,000',
      familyRange: '$1,900–$4,000',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Elizabeth, Westfield, and Union Township moves may reflect urban parking limits, HOA rules, and Parkway or I-78 traffic windows.',
    },
    tips: [
      'Urban Elizabeth areas have tight parking and building restrictions.',
      'Suburban towns have HOA rules for new developments.',
      'Heavy traffic on Garden State Parkway, I-78, and Route 22.',
      'Diverse neighborhoods benefit from multilingual crews.',
      'Verify coverage for Elizabeth, Westfield, and Union Township.',
    ],
  },
  warren: {
    marketNotes:
      'Warren County is rural and scenic with small towns (Phillipsburg, Belvidere) and Delaware River frontage. Moves often involve residential, farm, and commuter properties with limited local infrastructure.',
    costs: {
      studioRange: '$450–$900',
      familyRange: '$1,600–$3,400',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Belvidere and Phillipsburg moves may reflect rural driveways, riverfront access, and travel from regional North Jersey crews.',
    },
    tips: [
      'Rural properties may involve long driveways or specialized access.',
      'Confirm explicit regional service to Belvidere and Phillipsburg.',
      'Storage is limited locally; use nearby facilities.',
      'Obtain multiple estimates in this low-volume market.',
      'Verify credentials for farm or riverfront properties.',
    ],
  },
};

export function getNewJerseyCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return newJerseyCountyResearch[countySlug];
}