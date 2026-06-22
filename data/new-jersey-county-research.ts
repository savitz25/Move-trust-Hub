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
      'Bergen County is one of New Jersey’s most populous and affluent counties with dense suburban communities, proximity to NYC, and diverse residential moves. Moves often involve high-rises, family homes, and cross-river logistics.',
    costs: {
      studioRange: '$500–$1,100',
      familyRange: '$2,000–$4,500+',
      avgHourly: '$125–$185/hr for a 2-person crew',
      note: 'Hackensack, Paramus, and Ridgewood moves often reflect parking permits, elevator reservations, and George Washington Bridge traffic windows.',
    },
    tips: [
      'Many communities have tight parking and HOA rules; confirm building requirements early.',
      'Proximity to NYC and George Washington Bridge affects traffic and timing.',
      'High-value suburban homes common; verify insurance coverage.',
      'Obtain multiple estimates due to competitive market.',
      'Confirm service for specific towns (Hackensack, Paramus, Ridgewood, etc.).',
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
      'Essex County is densely populated with urban Newark, affluent suburbs (Millburn, Montclair), and diverse communities. Moves often involve high-rises, family homes, and cross-river logistics to NYC with significant traffic considerations.',
    costs: {
      studioRange: '$500–$1,100',
      familyRange: '$2,000–$4,500+',
      avgHourly: '$125–$185/hr for a 2-person crew',
      note: 'Newark high-rises and Millburn/Montclair suburban moves often reflect elevator fees, parking permits, and Garden State Parkway or I-280 traffic windows.',
    },
    tips: [
      'Urban high-rises and Newark areas require elevator reservations and building approvals.',
      'Suburban towns have HOA rules and parking restrictions.',
      'Heavy traffic on I-280, Garden State Parkway, and bridges to NYC.',
      'Diverse neighborhoods benefit from multilingual crews.',
      'Verify insurance for high-value urban/suburban properties.',
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
      'Middlesex County is densely populated with university towns (New Brunswick/Rutgers), suburban areas (Edison, Woodbridge), and industrial/commercial hubs. Moves often involve student, family, and corporate relocations with strong regional support.',
    costs: {
      studioRange: '$500–$1,000',
      familyRange: '$1,900–$4,000',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'New Brunswick, Edison, and Woodbridge moves may reflect Rutgers student peaks, Turnpike traffic, and suburban HOA move-in rules.',
    },
    tips: [
      'University areas (Rutgers) have seasonal student move peaks (Aug/May).',
      'Suburban HOAs and new developments have move-in rules.',
      'Heavy traffic on NJ Turnpike, Garden State Parkway, and Route 1.',
      'Diverse communities benefit from multilingual crews.',
      'Verify coverage for New Brunswick, Edison, and Woodbridge.',
    ],
  },
  monmouth: {
    marketNotes:
      'Monmouth County features shore communities (Asbury Park, Long Branch), suburban areas, and historic towns. Moves often involve coastal properties, family residential, and seasonal shore relocations with tourism considerations.',
    costs: {
      studioRange: '$500–$1,000',
      familyRange: '$1,900–$4,000',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Freehold, Asbury Park, and coastal moves may reflect summer tourism demand, Route 35 traffic, and HOA move-in timing.',
    },
    tips: [
      'Shore and beach properties require sand protection and access planning.',
      'Summer tourism increases demand; book early.',
      'Many communities have HOA rules for move timing.',
      'Traffic on Garden State Parkway and Route 35 can delay moves.',
      'Verify coverage for Freehold, Asbury Park, and coastal towns.',
    ],
  },
};

export function getNewJerseyCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return newJerseyCountyResearch[countySlug];
}