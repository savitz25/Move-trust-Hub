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
      'Atlantic County pairs a casino/boardwalk high-rise market with Downbeach towns (Ventnor, Margate, Longport), mainland suburbs (Egg Harbor Township, Galloway), and western edges around Hammonton. Logistics swing from freight elevators and COI paperwork in Atlantic City towers to shuttle trucks on narrow beach blocks and standard suburban HOAs inland. Tourism seasons and Atlantic City Expressway congestion change billable time more than raw mileage. Sources: U.S. Census Bureau county profiles; FMCSA licensing database (fmcsa.gov) for interstate legs; Move Trust Hub verified listings.',
    costs: {
      studioRange: '$450–$950',
      familyRange: '$1,800–$4,000',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Atlantic City elevators, Downbeach shuttles, and summer event weekends create wider price bands than inland mainland moves of the same inventory size.',
    },
    tips: [
      'Reserve freight elevators and collect COI templates for Atlantic City condos before locking a crew.',
      'Budget shuttle contingency for Ventnor/Margate/Longport beach blocks where full trailers cannot stage.',
      'Avoid major casino-event weekends when flexible — approaches clog and hourly clocks run.',
      'Mainland Egg Harbor / Galloway moves still need HOA checks, but usually not sand/shuttle adders.',
      'If the job crosses into Pennsylvania, require interstate (FMCSA) authority — not a local-only crew.',
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
      'Gloucester County is a South Jersey growth corridor: Deptford and Washington Township retail arterials, Glassboro’s Rowan University calendar, Mullica Hill new-construction HOAs, and still-rural southern townships with long driveways. Philadelphia job access via bridges and I-295 shapes commuting — and can turn a “local” day expensive at rush hour. Sources: U.S. Census Bureau QuickFacts and county growth patterns; FMCSA licensing database (fmcsa.gov) when either address is out of state; Move Trust Hub verified listings.',
    costs: {
      studioRange: '$450–$900',
      familyRange: '$1,600–$3,500',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'New-construction HOAs and rural deadhead from regional crews matter more than prestige ZIP pricing; NJ↔PA legs require interstate authority.',
    },
    tips: [
      'Collect HOA COI requirements for new townhome and single-family associations before move day.',
      'Glassboro semester peaks fill trucks — avoid late-August student weekends if you can.',
      'Send driveway photos for southern township parcels with gravel or soft shoulders.',
      'Time I-295 / bridge approaches outside peak commute when the inventory is large.',
      'Any Pennsylvania destination changes licensing: ask for USDOT/MC on the estimate.',
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
      'Hunterdon County is lower-density west-central New Jersey: Flemington services, Clinton and High Bridge village streets, Delaware River townships, and agricultural/equestrian edges. Moves fail when estimates ignore long driveways, soft ground, historic stair geometry, and I-78 peak commuting. Cell coverage can drop in valleys — gate codes on paper matter. Sources: U.S. Census Bureau density/population context; FMCSA licensing database (fmcsa.gov); Move Trust Hub verified listings.',
    costs: {
      studioRange: '$450–$950',
      familyRange: '$1,700–$3,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Driveway shuttles and extra stair labor on historic homes push costs more than short map mileage suggests.',
    },
    tips: [
      'Send video of the last quarter-mile of driveway, including gates and overhead wires.',
      'Mark septic lids and wells so trucks do not drive over them.',
      'For older village homes, measure stair turns before accepting a “standard local” quote.',
      'Avoid I-78 eastbound peaks if the crew is billing portal-to-portal.',
      'List barn/workshop items explicitly — they are the usual day-of surprise.',
    ],
  },
  mercer: {
    marketNotes:
      'Mercer County compresses New Jersey’s capital (Trenton), a global university town (Princeton), Route 1 professional parks, Hamilton suburban stock, and Hopewell-area rural lots into one county. Access friction swings from urban stairs and campus streets to HOA townhomes and western long driveways. Academic calendars and state schedules create predictable demand spikes. Sources: U.S. Census Bureau QuickFacts; FMCSA licensing database (fmcsa.gov); Move Trust Hub verified listings.',
    costs: {
      studioRange: '$450–$950',
      familyRange: '$1,700–$3,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Princeton narrow-street shuttles and Trenton multi-story carries widen ranges versus same-inventory Hopewell ranch moves.',
    },
    tips: [
      'Avoid Princeton reunions/alumni weekends and late-August campus turnovers when dates are flexible.',
      'Share street-width photos for borough addresses — many predate modern box trucks.',
      'Collect HOA COI templates for Route 1 corridor townhomes early.',
      'Start mid-morning to miss the worst Route 1 commute crush when moving between office parks and homes.',
      'Western Hopewell parcels need driveway/soft-ground planning after rain.',
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
      'Morris County is an affluent North Jersey market mixing historic towns (Morristown, Madison, Chatham), corporate/pharma corridors (Parsippany–Troy Hills on Routes 10/46), and more spacious single-family communities than denser Bergen/Essex/Hudson. Western townships (Roxbury, Chester, Washington, Mendham edge) add larger lots and wooded access. Higher home values, HOA rules, and I-80/I-287 congestion define most jobs; professional and executive relocations sit beside school-year family moves.',
    costs: {
      studioRange: '$600–$1,500+',
      familyRange: '$1,900–$4,600+',
      avgHourly: '$135–$210+/hr for a 2-person crew',
      note: 'Larger homes, long carries, HOA soft costs, high-value valuation needs, and I-80/I-287 portal-to-portal time often push above denser urban-county base ranges.',
    },
    tips: [
      'Collect HOA packets and confirm approved hours for planned communities before move day.',
      'Historic Morristown/Madison/Chatham blocks often need smaller trucks and careful handling of multi-story inventories.',
      'Share driveway/approach photos for hillside or wooded western and Randolph–Denville properties.',
      'Prefer mid-week mornings to avoid I-80, I-287, Route 10, and Route 24 peaks near Parsippany and Morristown.',
      'Discuss valuation coverage for higher-value shipments; pure NJ legs follow New Jersey household-goods frameworks, while NY-crossing jobs need FMCSA interstate authority.',
    ],
  },
  ocean: {
    marketNotes:
      'Ocean County (~674,000–679,000 residents) pairs barrier-island shore towns (Point Pleasant Beach, Seaside, Lavallette, Long Beach Island) with inland Toms River, Brick, Jackson, and Manchester. Lakewood is denser and demographically distinct from shore cottages or 55+ communities. Summer tourism, causeway timing (Routes 37/72), Parkway congestion, flood-zone logistics, and retirement-community HOA rules define most jobs. Sources: U.S. Census Bureau QuickFacts (Ocean County); FMCSA licensing database (fmcsa.gov); Move Trust Hub verified listings.',
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
      'Somerset County is affluent Central Jersey suburbia: Bridgewater corporate/retail core, Somerville’s walkable downtown stock, Hillsborough/Montgomery family subdivisions, and Bernards-area upscale pockets. HOA certificates, cul-de-sac geometry, and high-value packing tiers drive cost more than beach tourism. I-287 and Route 22 peak hours inflate portal-to-portal billing. Sources: U.S. Census Bureau QuickFacts; FMCSA licensing database (fmcsa.gov); Move Trust Hub verified listings.',
    costs: {
      studioRange: '$500–$1,000',
      familyRange: '$1,900–$4,000',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Executive packing and HOA admin friction are common adders even when mileage is short.',
    },
    tips: [
      'Request the association COI template the day you sign the lease or close.',
      'Measure cul-de-sac turn radius and low wires before accepting a full-trailer plan.',
      'Start midweek mornings to avoid I-287/Route 22 commute crush.',
      'Line-item full packing for fine furniture and wine/storage rooms.',
      'Confirm elevator overtime rules for mid-rise townhome communities.',
    ],
  },
  sussex: {
    marketNotes:
      'Sussex County is northwest New Jersey highlands living: Sparta and lake associations, Newton as a service hub, Vernon recreation belts, and western rural roads. Steep grades, winter ice, association truck limits, and longer crew travel times dominate logistics. Sources: U.S. Census Bureau density/population context for northwest NJ counties; FMCSA licensing database (fmcsa.gov); Move Trust Hub verified listings.',
    costs: {
      studioRange: '$450–$900',
      familyRange: '$1,600–$3,400',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Travel minimums and grade shuttles often exceed what a flat suburban quote assumes.',
    },
    tips: [
      'Photo steep drives and tree tunnels; ask about shuttle from the main road.',
      'Read lake association truck-size and hour limits before booking.',
      'Build a winter weather go/no-go call into December–March closings.',
      'Print gate codes — valley cell coverage can drop.',
      'Clarify travel minimums when crews stage from denser counties.',
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
      'Warren County is northwestern New Jersey with rural and small-town character far lower-density than Bergen, Essex, Hudson, or Middlesex. County seat Belvidere; largest community Phillipsburg on the Delaware River (across from Easton, PA) creates frequent NJ–PA / Lehigh Valley move dimensions. Hackettstown, Washington, Blairstown, and townships feature long driveways, farm-adjacent lots, and thinner local crew coverage. Relative affordability draws outbound movers from higher-cost NJ counties. Elevators/high-rises are rare — access, travel time, and coverage matter most. Sources: U.S. Census Bureau county context; FMCSA licensing database (fmcsa.gov); Move Trust Hub verified listings.',
    costs: {
      studioRange: '$450–$1,200+',
      familyRange: '$1,400–$3,600+',
      avgHourly: '$110–$175+/hr for a 2-person crew',
      note: 'Rural long driveways, regional crew travel fees, and NJ–PA interstate pairs often matter more than urban elevator soft costs; ask if quotes are portal-to-portal.',
    },
    tips: [
      'Share driveway/approach photos for rural and farm-adjacent properties — truck size and turnaround are the main constraints.',
      'Confirm the mover actually serves your specific Warren town or rural road; coverage is thinner than dense counties.',
      'Phillipsburg–Easton / Lehigh Valley jobs may need FMCSA interstate authority — pure NJ legs follow New Jersey household-goods frameworks.',
      'Ask about travel fees and local storage options; crews and warehouses often sit outside the county.',
      'Prefer mid-week mornings for I-80 runs and long rural daylight access; book Saturdays early when crews must travel in.',
    ],
  },
};

export function getNewJerseyCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return newJerseyCountyResearch[countySlug];
}