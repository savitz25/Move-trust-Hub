import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Grok Heavy–researched county content overrides templated SEO sections */
export const newYorkCountyResearch: Record<string, CuratedCountyResearch> = {
  albany: {
    marketNotes:
      'Albany County is the core of the Capital District with urban Albany, suburban areas, and government/university activity. Moves often involve residential, corporate, and student relocations with seasonal academic cycles.',
    costs: {
      studioRange: '$450–$950',
      familyRange: '$1,700–$3,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Albany, Guilderland, and Colonie moves often reflect elevator reservations, state-government timing, and I-87/I-90 traffic windows.',
    },
    tips: [
      'Government and university moves may require specific timing around academic or legislative calendars.',
      'Urban Albany and high-rises have elevator and parking restrictions.',
      'I-87 and I-90 traffic can impact scheduling.',
      'Obtain multiple estimates in this competitive market.',
      'Verify coverage for Albany, Guilderland, and Colonie.',
    ],
  },
  allegany: {
    marketNotes:
      'Allegany County is one of New York’s most rural counties with small towns and agricultural properties. The moving market is thin; most service is regional from nearby areas like Olean, Hornell, or larger hubs such as Rochester or Buffalo.',
    costs: {
      studioRange: '$400–$850',
      familyRange: '$1,500–$3,200',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Belmont and outlying rural moves often reflect long driveways, travel from Olean or Dunkirk crews, and limited local storage options.',
    },
    tips: [
      'Rural properties often have long or unpaved driveways; confirm truck and equipment needs.',
      'Verify explicit regional service coverage for Belmont and outlying areas.',
      'Storage is limited locally; coordinate with providers in larger nearby towns.',
      'Obtain multiple written estimates due to fewer local operators.',
      'Agricultural timing (harvest seasons) may affect availability; plan accordingly.',
    ],
  },
  bronx: {
    marketNotes:
      'The Bronx is a dense urban borough with high-rises, row houses, and diverse neighborhoods. Moves often involve apartment buildings, family homes, and cross-borough logistics with strict building rules and heavy traffic.',
    costs: {
      studioRange: '$550–$1,300',
      familyRange: '$2,200–$5,000+',
      avgHourly: '$130–$195/hr for a 2-person crew',
      note: 'Riverdale, Pelham, and Morris Park moves often reflect co-op move-in fees, elevator reservations, and I-95 / Bronx River Parkway traffic windows.',
    },
    tips: [
      'Many buildings require elevator reservations, certificates of insurance, and move-in fees.',
      'Traffic on major bridges and I-95 / Bronx River Parkway is heavy; select logistics-savvy teams.',
      'Diverse communities benefit from multilingual crews.',
      'Verify coverage for specific neighborhoods (e.g., Riverdale, Pelham, Morris Park).',
      'Confirm insurance for high-value urban items.',
    ],
  },
  broome: {
    marketNotes:
      'Broome County centers on Binghamton with suburban and rural areas. Moves often involve residential, university-related (Binghamton University), and family relocations with regional support from the Southern Tier.',
    costs: {
      studioRange: '$450–$900',
      familyRange: '$1,600–$3,500',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Binghamton, Endicott, and Vestal moves often reflect BU semester timing, I-86 / Route 17 traffic, and suburban driveway access.',
    },
    tips: [
      'University calendar affects seasonal demand around Binghamton University.',
      'Suburban and rural properties may have driveway or access challenges.',
      'I-86 and Route 17 traffic can impact timing.',
      'Obtain multiple estimates in this moderate market.',
      'Verify coverage for Binghamton, Endicott, and Vestal.',
    ],
  },
  cattaraugus: {
    marketNotes:
      'Cattaraugus County is rural with Olean as the primary hub and significant Seneca Nation territory. Moves are primarily residential and agricultural with limited local movers. Service is predominantly regional from Olean, Jamestown, or Buffalo.',
    costs: {
      studioRange: '$400–$850',
      familyRange: '$1,500–$3,200',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Olean and outlying rural moves often reflect long driveways, reservation-area access, and travel from regional Western NY crews.',
    },
    tips: [
      'Rural and reservation-area properties often have long driveways or restricted access.',
      'Confirm explicit regional service to Olean and outlying towns.',
      'Storage is limited locally; use Olean or nearby facilities.',
      'Obtain multiple estimates in this thin market.',
      'Verify credentials for agricultural or culturally sensitive moves.',
    ],
  },
  cayuga: {
    marketNotes:
      'Cayuga County is rural with Auburn as its hub and Finger Lakes influence. Moves are primarily residential and agricultural with limited local movers. Service is regional from Syracuse, Rochester, or Ithaca.',
    costs: {
      studioRange: '$400–$850',
      familyRange: '$1,500–$3,200',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Auburn and lakeside moves often reflect long driveways, Finger Lakes access roads, and travel from Syracuse or Rochester crews.',
    },
    tips: [
      'Rural and lakeside properties may involve long driveways or water-adjacent access.',
      'Confirm explicit regional service to Auburn and outlying areas.',
      'Storage is limited locally; coordinate with Syracuse or Rochester facilities.',
      'Obtain multiple estimates in this low-volume market.',
      'Verify credentials for agricultural or historic home moves.',
    ],
  },
  chautauqua: {
    marketNotes:
      'Chautauqua County is rural with Jamestown as its primary hub and Chautauqua Lake influence. Moves are primarily residential, seasonal lake properties, and agricultural with limited local movers. Service is regional from Jamestown, Buffalo, or Erie, PA.',
    costs: {
      studioRange: '$400–$850',
      familyRange: '$1,500–$3,200',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Jamestown and Chautauqua Lake moves often reflect seasonal lakefront access, rural driveways, and travel from Dunkirk or Buffalo crews.',
    },
    tips: [
      'Lakefront properties require specialized handling and seasonal timing.',
      'Rural areas may have long driveways or limited access.',
      'Confirm explicit regional service to Jamestown and outlying towns.',
      'Storage is limited locally; use Jamestown or Buffalo facilities.',
      'Verify credentials in this low-volume market.',
    ],
  },
  chemung: {
    marketNotes:
      'Chemung County centers on Elmira with suburban and rural areas. Moves often involve residential, university-related (Elmira College), and family relocations with regional Southern Tier support.',
    costs: {
      studioRange: '$400–$850',
      familyRange: '$1,500–$3,300',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Elmira, Horseheads, and Big Flats moves often reflect Elmira College semester timing, I-86 traffic, and suburban driveway access.',
    },
    tips: [
      'University calendar affects seasonal demand around Elmira College.',
      'Rural properties may have access challenges.',
      'I-86 traffic can impact timing.',
      'Obtain multiple estimates in this moderate market.',
      'Verify coverage for Elmira, Horseheads, and Big Flats.',
    ],
  },
  chenango: {
    marketNotes:
      'Chenango County is rural with Norwich as its hub. Moves are primarily residential with limited local infrastructure. Service is regional from Binghamton, Syracuse, or Utica.',
    costs: {
      studioRange: '$400–$850',
      familyRange: '$1,500–$3,200',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Norwich and outlying rural moves often reflect long driveways and travel from Binghamton or Syracuse crews.',
    },
    tips: [
      'Rural properties often have long driveways; confirm access.',
      'Verify explicit regional service to Norwich.',
      'Storage is limited locally; use nearby facilities.',
      'Obtain multiple estimates in this low-volume market.',
      'Verify credentials.',
    ],
  },
  clinton: {
    marketNotes:
      'Clinton County is rural/northern with Plattsburgh as its hub near Lake Champlain. Moves are residential and military-related (Plattsburgh AFB legacy) with regional support from Burlington, VT or Albany.',
    costs: {
      studioRange: '$450–$900',
      familyRange: '$1,600–$3,400',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Plattsburgh and Lake Champlain moves often reflect winter weather windows, cross-border logistics, and military relocation timing.',
    },
    tips: [
      'Lake Champlain properties require water-adjacent planning.',
      'Winter weather affects timing; confirm contingencies.',
      'Verify explicit regional service to Plattsburgh.',
      'Obtain multiple estimates.',
      'Military experience is beneficial.',
    ],
  },
  columbia: {
    marketNotes:
      'Columbia County is rural/historic with Hudson as its hub. Moves often involve historic homes, second homes, and artistic communities with regional support from Albany or NYC.',
    costs: {
      studioRange: '$450–$950',
      familyRange: '$1,700–$3,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Hudson and historic-property moves often reflect preservation-sensitive handling, seasonal second-home demand, and rural access roads.',
    },
    tips: [
      'Historic properties require preservation-sensitive handling.',
      'Rural areas have access challenges.',
      'Confirm regional service to Hudson.',
      'Seasonal demand from second-home owners.',
      'Verify credentials.',
    ],
  },
  cortland: {
    marketNotes:
      'Cortland County is rural with Cortland as its hub and university influence (SUNY Cortland). Moves are primarily residential with regional support from Syracuse or Binghamton.',
    costs: {
      studioRange: '$400–$850',
      familyRange: '$1,500–$3,200',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Cortland and rural moves often reflect SUNY Cortland semester timing and travel from Syracuse or Binghamton crews.',
    },
    tips: [
      'University calendar affects seasonal demand.',
      'Rural properties may have access challenges.',
      'Verify explicit regional service to Cortland.',
      'Obtain multiple estimates.',
      'Confirm credentials.',
    ],
  },
  delaware: {
    marketNotes:
      'Delaware County is very rural with small towns (Delhi, Walton). Moves are residential with very limited local options. Regional service from Oneonta, Binghamton, or Albany is primary.',
    costs: {
      studioRange: '$400–$800',
      familyRange: '$1,400–$3,000',
      avgHourly: '$90–$140/hr for a 2-person crew',
      note: 'Delhi and Walton moves often reflect Catskill access roads, scarce local storage, and travel from Oneonta or Binghamton crews.',
    },
    tips: [
      'Rural and Catskill properties often have challenging access.',
      'Confirm explicit service to Delhi and Walton.',
      'Storage is scarce; use regional facilities.',
      'Obtain multiple estimates.',
      'Verify credentials.',
    ],
  },
  dutchess: {
    marketNotes:
      'Dutchess County includes Poughkeepsie, Beacon, and Hudson Valley estates. Moves often involve residential, historic homes, and IBM/Vassar-related relocations.',
    costs: {
      studioRange: '$500–$1,000',
      familyRange: '$1,900–$4,200',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Poughkeepsie, Beacon, and Hyde Park moves often reflect historic-home handling, Taconic Parkway traffic, and Hudson River logistics.',
    },
    tips: [
      'Historic homes require preservation-sensitive handling.',
      'Hudson River properties need specialized logistics.',
      'Traffic on Taconic State Parkway and I-84.',
      'Verify coverage for Poughkeepsie, Beacon, and Hyde Park.',
      'Confirm insurance for high-value properties.',
    ],
  },
  erie: {
    marketNotes:
      'Erie County is a major urban/suburban county centered on Buffalo with strong industrial, medical, and lakeside communities. Moves frequently involve high-rises, family homes, and cross-border logistics.',
    costs: {
      studioRange: '$500–$1,000',
      familyRange: '$1,900–$4,200',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Buffalo, Amherst, and Cheektowaga moves often reflect lakefront access, winter weather windows, and I-90 / Kensington Expressway traffic.',
    },
    tips: [
      'Lake Erie and waterfront properties require weather and access planning.',
      'Snowy winters impact scheduling; confirm contingencies.',
      'Heavy traffic on I-90, I-290, and Kensington Expressway.',
      'Verify coverage for Buffalo, Amherst, Cheektowaga, and Tonawanda.',
      'Confirm insurance for high-value urban items.',
    ],
  },
  essex: {
    marketNotes:
      'Essex County is very rural with the Adirondack Park and Lake Placid. Moves are residential and seasonal with very limited local options. Regional service from Plattsburgh or Albany is primary.',
    costs: {
      studioRange: '$450–$900',
      familyRange: '$1,600–$3,400',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Lake Placid and Adirondack moves often reflect mountain access roads, winter weather, and travel from Plattsburgh crews.',
    },
    tips: [
      'Adirondack and lake properties require specialized access planning.',
      'Winter weather significantly affects timing.',
      'Verify explicit regional service to Lake Placid and outlying areas.',
      'Storage is limited; use regional facilities.',
      'Obtain multiple estimates.',
    ],
  },
  franklin: {
    marketNotes:
      'Franklin County is rural with Malone as its seat and Adirondack influence. Moves are residential with very limited local options. Regional service from Plattsburgh or Massena is common.',
    costs: {
      studioRange: '$400–$800',
      familyRange: '$1,400–$3,000',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Malone and northern Adirondack moves often reflect harsh winter timing and long rural access roads.',
    },
    tips: [
      'Rural and Adirondack properties have access challenges.',
      'Harsh winters affect scheduling.',
      'Verify explicit regional service to Malone.',
      'Obtain multiple estimates.',
      'Confirm credentials.',
    ],
  },
  fulton: {
    marketNotes:
      'Fulton County is rural with Johnstown and Gloversville as hubs. Moves are primarily residential with limited local options. Regional service from Albany or Utica is common.',
    costs: {
      studioRange: '$400–$850',
      familyRange: '$1,500–$3,200',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Johnstown and Gloversville moves often reflect Mohawk Valley rural driveways and travel from Albany or Utica crews.',
    },
    tips: [
      'Rural properties often have long driveways.',
      'Verify explicit regional service to Johnstown and Gloversville.',
      'Storage is limited; use nearby facilities.',
      'Obtain multiple estimates.',
      'Confirm credentials.',
    ],
  },
  genesee: {
    marketNotes:
      'Genesee County is rural/agricultural with Batavia as its hub. Moves are residential with regional service from Buffalo or Rochester.',
    costs: {
      studioRange: '$400–$850',
      familyRange: '$1,500–$3,200',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Batavia and agricultural-property moves often reflect equipment handling needs and travel from Buffalo or Rochester crews.',
    },
    tips: [
      'Agricultural properties may require equipment handling.',
      'Verify regional service to Batavia.',
      'Storage is limited locally.',
      'Obtain multiple estimates.',
      'Confirm credentials.',
    ],
  },
  greene: {
    marketNotes:
      'Greene County is rural/Catskills with Catskill and Hunter Mountain. Moves involve residential, second homes, and seasonal properties with regional support from Albany.',
    costs: {
      studioRange: '$450–$900',
      familyRange: '$1,600–$3,400',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Catskill and mountain moves often reflect seasonal access, steep roads, and travel from Albany or Hudson Valley crews.',
    },
    tips: [
      'Mountain and Catskill properties have access and seasonal challenges.',
      'Verify regional service to Catskill.',
      'Storage is limited.',
      'Obtain multiple estimates.',
      'Confirm winter contingencies.',
    ],
  },
  hamilton: {
    marketNotes:
      'Hamilton County is one of New York’s least populous and most rural counties in the Adirondack Park. Moves are limited and primarily residential/seasonal with very sparse local infrastructure. Service is regional from Utica, Albany, or Glens Falls.',
    costs: {
      studioRange: '$450–$900',
      familyRange: '$1,600–$3,400',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Lake Pleasant and Indian Lake moves often reflect remote Adirondack access, seasonal roads, and travel from Utica or Albany crews.',
    },
    tips: [
      'Remote Adirondack properties often have challenging access and seasonal road conditions.',
      'Confirm explicit regional service to Lake Pleasant and Indian Lake.',
      'Storage is extremely limited; plan with regional providers.',
      'Book well in advance due to low availability.',
      'Verify credentials for remote/rural moves.',
    ],
  },
  herkimer: {
    marketNotes:
      'Herkimer County is rural with Herkimer and Little Falls as hubs. Moves are residential with regional support from Utica or Syracuse.',
    costs: {
      studioRange: '$400–$850',
      familyRange: '$1,500–$3,200',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Herkimer and Little Falls moves often reflect Mohawk Valley rural access and travel from Utica or Syracuse crews.',
    },
    tips: [
      'Rural properties may have access challenges.',
      'Verify regional service to Herkimer.',
      'Storage is limited locally.',
      'Obtain multiple estimates.',
      'Confirm credentials.',
    ],
  },
  jefferson: {
    marketNotes:
      'Jefferson County includes Watertown and Fort Drum (military). Moves often involve military families, residential, and lakeside properties with regional support from Syracuse or Canada border areas.',
    costs: {
      studioRange: '$450–$900',
      familyRange: '$1,700–$3,600',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Watertown and Fort Drum moves often reflect PCS logistics, lakefront access, and harsh North Country winter scheduling.',
    },
    tips: [
      'Military (Fort Drum) moves require experience with PCS logistics.',
      'Lake Ontario and Thousand Islands properties need water-adjacent planning.',
      'Harsh winters affect scheduling.',
      'Verify coverage for Watertown and Fort Drum.',
      'Confirm insurance for high-value items.',
    ],
  },
  kings: {
    marketNotes:
      'Kings County (Brooklyn) is one of the most densely populated urban areas in the United States with diverse neighborhoods, brownstones, high-rises, and waterfront communities. Moves frequently involve apartments, multi-family buildings, and complex logistics with strict building regulations.',
    costs: {
      studioRange: '$600–$1,400',
      familyRange: '$2,500–$6,000+',
      avgHourly: '$140–$210/hr for a 2-person crew',
      note: 'Williamsburg, Park Slope, and Bay Ridge moves often reflect brownstone stair carries, co-op move-in fees, and BQE / bridge traffic windows.',
    },
    tips: [
      'Most buildings require elevator reservations, move-in fees, and certificates of insurance.',
      'Narrow streets and parking in brownstone neighborhoods create significant challenges.',
      'Heavy traffic on major bridges and expressways; plan for peak avoidance.',
      'Diverse neighborhoods benefit from multilingual crews.',
      'Verify coverage for specific neighborhoods (Williamsburg, Park Slope, Bay Ridge, etc.).',
    ],
  },
  lewis: {
    marketNotes:
      'Lewis County is very rural with Lowville as its hub in the Black River Valley. Moves are primarily residential with extremely limited local options. Service is regional from Watertown or Utica.',
    costs: {
      studioRange: '$400–$800',
      familyRange: '$1,400–$3,000',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Lowville and Black River Valley moves often reflect agricultural access roads, harsh winter timing, and travel from Watertown or Utica crews.',
    },
    tips: [
      'Rural and agricultural properties often have challenging access.',
      'Harsh winters significantly affect scheduling.',
      'Verify explicit regional service to Lowville.',
      'Storage is scarce; plan regionally.',
      'Obtain multiple estimates.',
    ],
  },
  livingston: {
    marketNotes:
      'Livingston County is rural with Geneseo (SUNY Geneseo) and agricultural focus. Moves are residential and university-related with regional support from Rochester.',
    costs: {
      studioRange: '$400–$850',
      familyRange: '$1,500–$3,200',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Geneseo and rural Livingston moves often reflect SUNY semester timing, farm-property access, and travel from Rochester crews.',
    },
    tips: [
      'University calendar affects seasonal demand.',
      'Rural and farm properties may require specialized handling.',
      'Verify regional service to Geneseo.',
      'Obtain multiple estimates.',
      'Confirm credentials.',
    ],
  },
  madison: {
    marketNotes:
      'Madison County is rural with Oneida Lake influence and Hamilton (Colgate University). Moves are residential and university-related with regional support from Syracuse.',
    costs: {
      studioRange: '$400–$850',
      familyRange: '$1,500–$3,200',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Hamilton, Oneida, and Wampsville moves often reflect Colgate semester timing, Oneida Lake access, and travel from Syracuse crews.',
    },
    tips: [
      'University calendar (Colgate) affects seasonal demand.',
      'Rural properties have access challenges.',
      'Verify regional service to Hamilton and Oneida.',
      'Obtain multiple estimates.',
      'Confirm credentials.',
    ],
  },
  monroe: {
    marketNotes:
      'Monroe County is a major urban/suburban county centered on Rochester with strong medical, educational, and lakeside communities. Moves often involve high-rises, family homes, and corporate relocations.',
    costs: {
      studioRange: '$500–$1,000',
      familyRange: '$1,900–$4,000',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Rochester, Greece, and Irondequoit moves often reflect lakefront access, UR/RIT semester timing, and I-90 / I-490 traffic windows.',
    },
    tips: [
      'Lake Ontario properties require weather and access planning.',
      'University and medical center moves have seasonal peaks.',
      'Heavy traffic on I-90, I-490, and Lake Ontario State Parkway.',
      'Verify coverage for Rochester, Greece, Irondequoit, and Henrietta.',
      'Confirm insurance for high-value items.',
    ],
  },
  montgomery: {
    marketNotes:
      'Montgomery County is rural with Amsterdam and Canajoharie. Moves are primarily residential with regional support from Albany or Utica.',
    costs: {
      studioRange: '$400–$850',
      familyRange: '$1,500–$3,200',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Amsterdam, Fonda, and Canajoharie moves often reflect Mohawk Valley rural access and travel from Albany or Utica crews.',
    },
    tips: [
      'Rural properties may have access challenges.',
      'Verify regional service to Amsterdam and Fonda.',
      'Storage is limited locally.',
      'Obtain multiple estimates.',
      'Confirm credentials.',
    ],
  },
  nassau: {
    marketNotes:
      'Nassau County is densely suburban on Long Island with strong residential and commuter communities. Moves often involve single-family homes, condos, and high-value properties.',
    costs: {
      studioRange: '$550–$1,200',
      familyRange: '$2,200–$5,000+',
      avgHourly: '$135–$200/hr for a 2-person crew',
      note: 'Mineola, Hempstead, and North Shore moves often reflect HOA move-in rules, parkway traffic, and summer peak-season demand.',
    },
    tips: [
      'Many HOAs and villages have strict move-in rules.',
      'Long Island Expressway and Northern/Southern State Parkways have heavy traffic.',
      'Verify coverage for specific towns (Hempstead, Oyster Bay, North Hempstead).',
      'Confirm insurance for high-value suburban homes.',
      'Book early for summer peak season.',
    ],
  },
  'new-york': {
    marketNotes:
      'Manhattan is one of the densest urban environments in the world with iconic high-rises, brownstones, and diverse neighborhoods. Moves are highly complex due to building regulations, narrow streets, and elevator requirements.',
    costs: {
      studioRange: '$700–$1,600+',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$150–$225/hr for a 2-person crew',
      note: 'Upper East Side, West Village, and Midtown moves often reflect co-op move-in fees, freight elevator windows, and bridge/tunnel traffic planning.',
    },
    tips: [
      'Almost all buildings require elevator reservations, move-in fees, certificates of insurance, and building-specific rules.',
      'Narrow streets and limited parking create significant logistical challenges.',
      'Heavy traffic on major avenues and bridges/tunnels.',
      'Verify coverage for specific neighborhoods (Upper East Side, West Village, Midtown, Harlem, etc.).',
      'Confirm high-value insurance coverage.',
    ],
  },
  niagara: {
    marketNotes:
      'Niagara County includes Niagara Falls and Lockport with tourism, industrial, and suburban communities. Moves often involve residential, cross-border, and tourist-related properties.',
    costs: {
      studioRange: '$450–$950',
      familyRange: '$1,700–$3,800',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Niagara Falls, Lockport, and North Tonawanda moves often reflect tourist-season peaks, border proximity, and I-190 / Rainbow Bridge traffic.',
    },
    tips: [
      'Niagara Falls tourist areas have seasonal demand peaks.',
      'Border and waterfront properties require specialized planning.',
      'Heavy traffic on I-190 and Rainbow Bridge approaches.',
      'Verify coverage for Niagara Falls, Lockport, and North Tonawanda.',
      'Confirm insurance for high-value items.',
    ],
  },
  oneida: {
    marketNotes:
      'Oneida County centers on Utica and Rome with suburban and rural areas. Moves often involve residential and historic properties with regional Mohawk Valley support.',
    costs: {
      studioRange: '$450–$900',
      familyRange: '$1,700–$3,600',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Utica and Rome moves often reflect historic-district handling needs, rural access roads, and Mohawk Valley regional crew travel.',
    },
    tips: [
      'Historic districts require preservation-sensitive handling.',
      'Rural areas have access challenges.',
      'Verify coverage for Utica and Rome.',
      'Obtain multiple estimates.',
      'Confirm credentials.',
    ],
  },
  onondaga: {
    marketNotes:
      'Onondaga County is a major Central New York hub centered on Syracuse with strong educational, medical, and suburban communities.',
    costs: {
      studioRange: '$500–$1,000',
      familyRange: '$1,900–$4,000',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Syracuse, Cicero, and Clay moves often reflect SU semester timing, suburban HOA rules, and I-81 / I-690 traffic windows.',
    },
    tips: [
      'University calendar affects seasonal demand.',
      'Suburban HOAs have move-in rules.',
      'Heavy traffic on I-81 and I-690.',
      'Verify coverage for Syracuse, Cicero, and Clay.',
      'Confirm insurance for high-value items.',
    ],
  },
  ontario: {
    marketNotes:
      'Ontario County is Finger Lakes wine country with Canandaigua and Geneva. Moves often involve residential, second homes, and winery-related properties with regional support from Rochester.',
    costs: {
      studioRange: '$450–$900',
      familyRange: '$1,700–$3,600',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Canandaigua and Geneva moves often reflect lakeside access, seasonal tourism, and travel from Rochester crews.',
    },
    tips: [
      'Lakeside properties require water-adjacent planning.',
      'Seasonal tourism and winery activity affect demand.',
      'Verify coverage for Canandaigua and Geneva.',
      'Obtain multiple estimates.',
      'Confirm credentials for historic homes.',
    ],
  },
  orange: {
    marketNotes:
      'Orange County is a growing suburban/rural county with Newburgh, Middletown, and West Point. Moves often involve military (West Point), family residential, and commuter properties.',
    costs: {
      studioRange: '$500–$1,000',
      familyRange: '$1,900–$4,200',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Newburgh, Middletown, and New Windsor moves often reflect West Point PCS logistics, HOA rules, and I-87 / Route 17 traffic.',
    },
    tips: [
      'Military (West Point) moves require PCS experience.',
      'Suburban HOAs have strict rules.',
      'I-87 and Route 17 traffic is heavy.',
      'Verify coverage for Newburgh, Middletown, and New Windsor.',
      'Confirm insurance for high-value homes.',
    ],
  },
  orleans: {
    marketNotes:
      'Orleans County is rural/agricultural with Albion and Medina. Moves are primarily residential with regional support from Rochester or Buffalo.',
    costs: {
      studioRange: '$400–$850',
      familyRange: '$1,500–$3,200',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Albion and Medina moves often reflect agricultural-property access and travel from Rochester or Buffalo crews.',
    },
    tips: [
      'Agricultural properties may require equipment handling.',
      'Verify regional service to Albion.',
      'Storage is limited locally.',
      'Obtain multiple estimates.',
      'Confirm credentials.',
    ],
  },
  oswego: {
    marketNotes:
      'Oswego County is rural with Oswego (port city) and Lake Ontario. Moves often involve residential and lakeside properties with regional support from Syracuse.',
    costs: {
      studioRange: '$450–$900',
      familyRange: '$1,700–$3,600',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Oswego and Fulton moves often reflect Lake Ontario access, port-area logistics, and harsh winter scheduling.',
    },
    tips: [
      'Lake Ontario properties require water-adjacent planning.',
      'Winter weather significantly affects scheduling.',
      'Verify coverage for Oswego and Fulton.',
      'Obtain multiple estimates.',
      'Confirm credentials.',
    ],
  },
  otsego: {
    marketNotes:
      'Otsego County is rural with Cooperstown (Baseball Hall of Fame) and Oneonta influence. Moves often involve residential, tourist, and historic properties with regional support from Albany or Syracuse.',
    costs: {
      studioRange: '$400–$850',
      familyRange: '$1,500–$3,200',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Cooperstown and Oneonta moves often reflect historic-home handling, tourist-season timing, and rural access roads.',
    },
    tips: [
      'Historic Cooperstown properties require preservation-sensitive handling.',
      'Rural areas have access challenges.',
      'Verify regional service to Cooperstown.',
      'Obtain multiple estimates.',
      'Confirm credentials.',
    ],
  },
  putnam: {
    marketNotes:
      'Putnam County is suburban/rural in the Hudson Highlands with strong commuter ties to NYC. Moves often involve family homes and upscale properties.',
    costs: {
      studioRange: '$500–$1,000',
      familyRange: '$1,900–$4,000',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Carmel, Brewster, and Mahopac moves often reflect HOA move-in rules, Hudson Highlands terrain, and Taconic / I-84 traffic.',
    },
    tips: [
      'Many HOAs and gated communities have strict move-in rules.',
      'Hudson Highlands terrain can create access challenges.',
      'Taconic State Parkway and I-84 traffic is heavy.',
      'Verify coverage for Carmel, Brewster, and Mahopac.',
      'Confirm insurance for high-value suburban homes.',
    ],
  },
  rensselaer: {
    marketNotes:
      'Rensselaer County includes Troy and suburban/rural areas with strong Capital District ties. Moves often involve residential and historic properties.',
    costs: {
      studioRange: '$450–$950',
      familyRange: '$1,700–$3,600',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Troy, East Greenbush, and Rensselaer moves often reflect historic-district handling, I-90 traffic, and Capital District crew availability.',
    },
    tips: [
      'Historic Troy neighborhoods require preservation-sensitive handling.',
      'Verify coverage for Troy, East Greenbush, and Rensselaer.',
      'I-90 traffic can impact timing.',
      'Obtain multiple estimates.',
      'Confirm credentials.',
    ],
  },
  rockland: {
    marketNotes:
      'Rockland County is densely suburban with strong NYC commuter ties and diverse communities. Moves often involve family homes and high-value properties.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$2,000–$4,500',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'New City, Spring Valley, and Nyack moves often reflect village move-in rules, Palisades Parkway traffic, and summer peak-season demand.',
    },
    tips: [
      'Many HOAs and villages have strict move-in rules.',
      'Palisades Interstate Parkway and I-87 traffic is heavy.',
      'Verify coverage for New City, Spring Valley, and Nyack.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for summer peak season.',
    ],
  },
  queens: {
    marketNotes:
      'Queens is one of the most diverse and expansive boroughs with residential neighborhoods, airports (JFK/LGA), and suburban pockets. Moves often involve apartments, single-family homes, and multi-family buildings with complex logistics.',
    costs: {
      studioRange: '$600–$1,400',
      familyRange: '$2,500–$5,500+',
      avgHourly: '$140–$210/hr for a 2-person crew',
      note: 'Long Island City, Forest Hills, and Bayside moves often reflect co-op move-in fees, airport-corridor traffic, and neighborhood-specific parking limits.',
    },
    tips: [
      'Many buildings require elevator reservations, move-in fees, and certificates of insurance.',
      'Neighborhood-specific parking and access challenges (e.g., Astoria, Flushing, Jamaica).',
      'Heavy traffic near airports and expressways (LIE, Van Wyck, Grand Central).',
      'Verify coverage for specific neighborhoods (Long Island City, Forest Hills, Bayside, etc.).',
      'Confirm high-value insurance coverage.',
    ],
  },
  richmond: {
    marketNotes:
      'Richmond County (Staten Island) is the most suburban borough with single-family homes, large properties, and ferry/bridge logistics to Manhattan and New Jersey. Moves often involve residential homes and family relocations.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$2,000–$4,800',
      avgHourly: '$130–$195/hr for a 2-person crew',
      note: 'St. George, New Dorp, and Tottenville moves often reflect Verrazzano bridge timing, HOA rules, and suburban driveway access.',
    },
    tips: [
      'Ferry and bridge access (Verrazzano-Narrows) can add time and coordination.',
      'Many neighborhoods have HOA or community rules for moves.',
      'Traffic on major arteries and bridges is heavy; plan accordingly.',
      'Verify coverage for specific neighborhoods (St. George, New Dorp, Tottenville, etc.).',
      'Confirm insurance for high-value suburban properties.',
    ],
  },
  saratoga: {
    marketNotes:
      'Saratoga County is growing suburban/rural with Saratoga Springs as its hub. Moves often involve residential, tourist/seasonal, and historic properties with strong Capital District support.',
    costs: {
      studioRange: '$500–$1,000',
      familyRange: '$1,900–$4,000',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Saratoga Springs, Clifton Park, and Ballston Spa moves often reflect racing-season demand, historic-home handling, and I-87 traffic windows.',
    },
    tips: [
      'Seasonal tourism and racing season increase demand in Saratoga Springs.',
      'Historic properties require preservation-sensitive handling.',
      'I-87 traffic can impact timing.',
      'Verify coverage for Saratoga Springs, Clifton Park, and Ballston Spa.',
      'Confirm insurance for high-value homes.',
    ],
  },
  schenectady: {
    marketNotes:
      'Schenectady County centers on Schenectady with suburban and historic areas. Moves often involve residential and historic properties with strong Capital District support.',
    costs: {
      studioRange: '$450–$950',
      familyRange: '$1,700–$3,600',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Schenectady and Niskayuna moves often reflect historic-district handling, I-890 / I-87 traffic, and Capital District crew availability.',
    },
    tips: [
      'Historic districts require preservation-sensitive handling.',
      'Verify coverage for Schenectady and Niskayuna.',
      'I-890 and I-87 traffic can impact timing.',
      'Obtain multiple estimates.',
      'Confirm credentials.',
    ],
  },
  schoharie: {
    marketNotes:
      'Schoharie County is rural with Schoharie and Cobleskill. Moves are primarily residential with regional support from Albany.',
    costs: {
      studioRange: '$400–$850',
      familyRange: '$1,500–$3,200',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Schoharie and Cobleskill moves often reflect rural access roads and travel from Albany Capital District crews.',
    },
    tips: [
      'Rural properties have access challenges.',
      'Verify regional service to Schoharie.',
      'Storage is limited locally.',
      'Obtain multiple estimates.',
      'Confirm credentials.',
    ],
  },
  schuyler: {
    marketNotes:
      'Schuyler County is rural with Watkins Glen (racetrack/tourism). Moves often involve residential and seasonal lake properties with regional support from Ithaca or Elmira.',
    costs: {
      studioRange: '$400–$800',
      familyRange: '$1,400–$3,000',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Watkins Glen and lakeside moves often reflect Seneca Lake access, racing-season timing, and travel from Elmira or Ithaca crews.',
    },
    tips: [
      'Lakeside properties require water-adjacent planning.',
      'Tourism and racing events affect seasonal demand.',
      'Verify regional service to Watkins Glen.',
      'Obtain multiple estimates.',
      'Confirm credentials.',
    ],
  },
};

export function getNewYorkCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return newYorkCountyResearch[countySlug];
}