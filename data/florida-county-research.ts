import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Grok Heavy–researched county content overrides templated SEO sections */
export const floridaCountyResearch: Record<string, CuratedCountyResearch> = {
  alachua: {
    marketNotes:
      'Alachua County is anchored by the University of Florida in Gainesville, creating high seasonal demand for student apartment and dorm relocations in addition to standard residential moves. The market features a mix of apartment complexes, older single-family homes, and growing suburban neighborhoods, with moderate traffic considerations around campus and I-75 corridors. Local movers frequently handle transitional student housing, small-space packing, and storage needs.',
    costs: {
      studioRange: '$400–$900',
      familyRange: '$1,800–$3,500',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'UF move-in/move-out peaks (August and May) can increase demand and pricing around Gainesville campus housing.',
    },
    tips: [
      'Schedule around University of Florida academic calendar peaks (primarily August move-ins and May move-outs) to secure availability and avoid premium pricing.',
      'Many Gainesville apartments and condos require advance elevator reservations, designated move-in days, and proof of insurance; confirm building-specific rules early.',
      'Older neighborhoods and campus-adjacent areas often have parking restrictions or narrow streets; request curb-side or driveway access details in advance and use protective floor coverings for historic properties.',
      'Rural or outlying Alachua County properties may involve longer driveways or gravel access; confirm truck size and shuttle needs with the provider.',
      'Student and transitional moves frequently benefit from flexible storage options; ask about short-term warehouse availability in Gainesville.',
    ],
  },
  baker: {
    marketNotes:
      'Baker County is a small, rural county (population ~28,000) characterized by single-family homes on larger lots, agricultural properties, and proximity to I-10 and the Georgia border. The moving market is thin with limited dedicated local full-service companies; most residents rely on regional providers based in nearby Jacksonville or Lake City. Moves often involve longer driveways, rural access, or farm-related logistics.',
    costs: {
      studioRange: '$350–$750',
      familyRange: '$1,200–$2,800',
      avgHourly: '$90–$130/hr for a 2-person crew',
      note: 'Most full-service providers are Jacksonville-based; confirm travel fees and service-area coverage for Macclenny before booking.',
    },
    tips: [
      'Explicitly confirm service area and any travel fees, as most reputable full-service providers are based in Jacksonville (approximately 30–45 minutes away).',
      'Rural properties frequently feature long or unpaved driveways; request confirmation of appropriate truck size or shuttle service in advance.',
      'Limited local storage options exist; many providers coordinate with Jacksonville-area facilities for short- or long-term needs.',
      'Agricultural or large-lot moves may require specialized equipment or additional labor for outbuildings and outdoor items.',
      'Obtain multiple written estimates, as thinner market competition can lead to greater price variability.',
    ],
  },
  bradford: {
    marketNotes:
      'Bradford County is a small, rural county (population ~28,000) with Starke as its seat. The moving market features primarily residential and agricultural properties on larger lots. Dedicated full-service local movers are limited; residents often rely on regional providers from nearby Gainesville or Jacksonville areas for reliable service.',
    costs: {
      studioRange: '$350–$750',
      familyRange: '$1,200–$2,800',
      avgHourly: '$90–$130/hr for a 2-person crew',
      note: 'Regional providers from Gainesville or Jacksonville may add travel fees for Starke and rural Bradford County routes.',
    },
    tips: [
      'Confirm service coverage and potential travel fees explicitly, as most full-service providers operate regionally from Gainesville or Jacksonville.',
      'Rural properties frequently include long driveways or unpaved access; discuss truck size, shuttle needs, or equipment requirements upfront.',
      'Agricultural or outbuilding moves may require additional labor or specialized handling; provide detailed inventory information.',
      'Storage options are limited locally; coordinate with providers offering facilities in nearby larger cities if needed.',
      'Obtain multiple written estimates due to the thinner market, which can result in variable pricing.',
    ],
  },
  brevard: {
    marketNotes:
      'Brevard County, known as the Space Coast, includes Melbourne, Titusville, Palm Bay, Cocoa Beach, and Viera. It features residential neighborhoods, beachside properties, tech and military relocations near Kennedy Space Center and Patrick SFB, and some commercial moves. Condo and coastal logistics, along with seasonal demand, are common.',
    costs: {
      studioRange: '$450–$950',
      familyRange: '$1,800–$3,800',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Coastal and condo moves on the Space Coast often require elevator reservations, floor protection, and crews experienced with beach-access logistics.',
    },
    tips: [
      'Coastal properties in areas like Cocoa Beach or Melbourne Beach often involve stairs, elevators, or sand protection; confirm crew experience and equipment.',
      'Military or government-related moves are common in Brevard; select providers with relevant documentation and timeline expertise.',
      'Verify HOA and condo association rules for move-in/out windows and parking in Viera or beach communities.',
      'Space Coast traffic and bridge access can impact timing; plan accordingly around major events and peak seasons.',
      'Seasonal tourism and hurricane season may affect storage or scheduling; inquire about flexible options.',
    ],
  },
  broward: {
    marketNotes:
      'Broward County is a major urban and suburban area with high population density, featuring Fort Lauderdale, Hollywood, Pompano Beach, and numerous high-rise condos, beachfront properties, and diverse residential and commercial districts. Snowbird seasonality, HOA and condo rules, and traffic are key factors driving demand for professional moves with elevator and parking coordination.',
    costs: {
      studioRange: '$500–$1,200',
      familyRange: '$2,000–$4,500+',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'High-rise condo and beachfront moves in Fort Lauderdale and coastal Broward often include building fees, parking permits, and peak snowbird-season pricing.',
    },
    tips: [
      'High-rise condos and beach properties require elevator reservations, move-in windows, and protective measures; provide building details early.',
      'Snowbird season (winter) increases demand and pricing; book well in advance for peak periods.',
      'Traffic on I-95, US-1, and local roads can delay moves; select providers familiar with South Florida logistics.',
      'Many communities have strict HOA rules, parking permits, or fees; confirm compliance and insurance coverage.',
      'For interstate or long-distance portions, prioritize carriers with strong FMCSA standing and transparent quoting.',
    ],
  },
  calhoun: {
    marketNotes:
      'Calhoun County is a small, rural county with limited dedicated moving companies. Moves are primarily residential or agricultural on larger properties. Residents typically rely on regional providers from nearby Panama City or other Panhandle areas. The market is thin, with emphasis on reliable local or short-haul service.',
    costs: {
      studioRange: '$350–$700',
      familyRange: '$1,100–$2,500',
      avgHourly: '$85–$125/hr for a 2-person crew',
      note: 'Most full-service crews operate regionally from Panama City or adjacent Panhandle metros; confirm travel fees for Blountstown routes.',
    },
    tips: [
      'Confirm service area and travel fees, as most providers operate regionally from larger nearby cities like Panama City.',
      'Rural properties often feature long driveways or limited access; discuss truck size and equipment needs in advance.',
      'Storage options are scarce locally; coordinate with providers offering facilities in adjacent counties if required.',
      'Obtain multiple written estimates due to limited local competition.',
      'Verify licensing and insurance thoroughly, as smaller markets may have more variable operator quality.',
    ],
  },
  charlotte: {
    marketNotes:
      'Charlotte County features retiree-heavy communities in Punta Gorda and Port Charlotte, with coastal properties, condos, and single-family homes. Moves often involve downsizing or seasonal snowbird transitions. Hurricane preparedness and waterfront logistics are relevant factors.',
    costs: {
      studioRange: '$450–$950',
      familyRange: '$1,700–$3,500',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Coastal and canal-front moves in Punta Gorda and Port Charlotte may include HOA coordination and seasonal snowbird demand.',
    },
    tips: [
      'Coastal and canal-front properties may require special handling for access, stairs, or elevators; confirm crew experience.',
      'Retiree and snowbird moves are common; inquire about flexible scheduling and storage for seasonal residents.',
      'Many communities have HOA rules for move timing and parking; obtain building-specific details early.',
      'Hurricane season considerations may affect storage or timing; ask about weather contingency plans.',
      'Verify flood zone awareness and protective measures for belongings near waterways.',
    ],
  },
  clay: {
    marketNotes:
      'Clay County is a growing suburban area near Jacksonville, including Orange Park, Middleburg, and Green Cove Springs. It features family-oriented residential neighborhoods, some military-related moves near NAS Jacksonville influence, and suburban logistics. Traffic on major corridors and new developments are common considerations.',
    costs: {
      studioRange: '$400–$850',
      familyRange: '$1,600–$3,200',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Suburban Clay County moves near Orange Park and Green Cove Springs often share Jacksonville-area crews; confirm Clay-specific experience and travel fees.',
    },
    tips: [
      'Suburban neighborhoods and new developments often have HOA rules for move timing, parking, and access; confirm early.',
      'Proximity to Jacksonville can mean shared regional providers; verify specific Clay County experience and travel fees.',
      'Military or PCS-related moves are relatively common; seek providers familiar with associated documentation.',
      'Growing areas may have construction-related traffic or restrictions; plan routes accordingly.',
      'Many homes are single-family with garages; discuss truck access and protective measures for driveways and sidewalks.',
    ],
  },
  collier: {
    marketNotes:
      'Collier County is affluent with luxury homes, high-rise condos, and beach communities in Naples and Marco Island. It serves retirees, snowbirds, and high-end residential and commercial clients. Waterfront logistics, HOA rules, and seasonal demand are prominent.',
    costs: {
      studioRange: '$500–$1,100',
      familyRange: '$2,000–$4,500+',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Naples and Marco Island condo and gated-community moves often require elevator reservations, move windows, and white-glove handling for luxury items.',
    },
    tips: [
      'High-rise condos and gated communities in Naples and Marco Island require elevator reservations, move windows, and insurance proof; provide details early.',
      'Snowbird season (winter) drives high demand; book in advance for peak periods.',
      'Waterfront or golf community properties may involve special access, stairs, or golf cart considerations.',
      'Luxury items such as art and pianos are common; confirm white-glove or specialty services.',
      'Hurricane preparedness influences storage and timing; inquire about climate-controlled options and contingencies.',
    ],
  },
  columbia: {
    marketNotes:
      'Columbia County is a mix of rural and small-city Lake City with I-10 access, some military influence, and residential and agricultural properties. Moves are often local or regional, with emphasis on practical logistics in a North Florida setting.',
    costs: {
      studioRange: '$350–$750',
      familyRange: '$1,200–$2,800',
      avgHourly: '$90–$135/hr for a 2-person crew',
      note: 'Lake City and rural Columbia County routes may involve longer driveways or I-10 corridor timing considerations.',
    },
    tips: [
      'Rural or larger-lot properties may involve long driveways or farm access; confirm truck and equipment suitability.',
      'I-10 corridor traffic can affect timing; select providers familiar with regional routes.',
      'Limited local storage; coordinate with Jacksonville or Gainesville facilities if needed.',
      'Military or government-related moves may occur; inquire about relevant experience.',
      'Obtain multiple estimates in this moderate market for best value and availability.',
    ],
  },
  desoto: {
    marketNotes:
      'DeSoto County is a small, rural county centered on Arcadia with agricultural and residential properties. The moving market is thin; most full-service options are regional from larger nearby areas like Sarasota or Fort Myers. Moves often involve single-family homes or farm-related logistics.',
    costs: {
      studioRange: '$350–$750',
      familyRange: '$1,200–$2,700',
      avgHourly: '$90–$130/hr for a 2-person crew',
      note: 'Most full-service providers serve Arcadia regionally from Sarasota or Fort Myers; confirm travel fees and agricultural-property access.',
    },
    tips: [
      'Rural or agricultural properties may have long driveways or limited access; confirm truck size and equipment needs.',
      'Limited local storage; coordinate with providers offering facilities in adjacent counties.',
      'Obtain multiple written estimates due to fewer local operators.',
      'Verify licensing and insurance thoroughly in smaller markets.',
      'Agricultural timing (harvest seasons) may affect availability; plan accordingly.',
    ],
  },
  dixie: {
    marketNotes:
      'Dixie County is rural and sparsely populated with Cross City as its seat. Moves are primarily residential on larger lots or coastal properties. Options are limited; most service comes from regional providers in nearby counties.',
    costs: {
      studioRange: '$350–$700',
      familyRange: '$1,100–$2,500',
      avgHourly: '$90–$125/hr for a 2-person crew',
      note: 'Regional providers from Gainesville or Jacksonville may add travel fees for Cross City and rural Dixie County routes.',
    },
    tips: [
      'Confirm explicit service to Cross City and rural areas, including potential travel fees.',
      'Properties may involve unpaved roads or limited access; discuss logistics in advance.',
      'Storage is limited locally; use providers with facilities in larger nearby towns.',
      'Obtain multiple estimates in this low-volume market.',
      'Verify credentials carefully due to fewer established local operators.',
    ],
  },
  duval: {
    marketNotes:
      'Duval County (primarily Jacksonville) is a major urban area with diverse residential, military (NAS Jax), commercial, and port-related moves. High-rises, suburbs, and beach communities (e.g., Jax Beach) create varied logistics needs. Traffic on I-95 and bridges is a key factor.',
    costs: {
      studioRange: '$450–$1,000',
      familyRange: '$1,800–$4,000+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Downtown high-rises, beach communities, and military PCS moves in Jacksonville often require elevator reservations, parking permits, and experienced crews.',
    },
    tips: [
      'Military PCS moves are common; prioritize experienced providers for documentation and timelines.',
      'Downtown/high-rise and beach areas require elevator reservations and parking plans.',
      'Bridge and I-95 traffic can delay moves; select logistics-savvy teams.',
      'Diverse neighborhoods (suburban vs. urban) affect access and equipment needs.',
      'Book early for peak seasons; confirm insurance for high-value items.',
    ],
  },
  escambia: {
    marketNotes:
      'Escambia County, anchored by Pensacola, features a mix of urban, suburban, military (NAS Pensacola), and beach communities. Moves often include residential, condo, and military relocations with coastal considerations and seasonal snowbird activity.',
    costs: {
      studioRange: '$450–$950',
      familyRange: '$1,700–$3,800',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Pensacola beach condos and NAS Pensacola PCS moves often require military documentation expertise and coastal logistics planning.',
    },
    tips: [
      'Military PCS moves are frequent; select providers experienced with DoD requirements and timelines.',
      'Beach and condo properties require elevator reservations, sand protection, and parking coordination.',
      'I-10 and bridge traffic can impact scheduling; choose logistics-familiar teams.',
      'Snowbird season increases demand; book early for winter peaks.',
      'Confirm hurricane-season storage and protective services for waterfront areas.',
    ],
  },
  flagler: {
    marketNotes:
      'Flagler County features growing suburban and coastal communities like Palm Coast with golf courses, Intracoastal Waterway properties, and retiree appeal. Moves often involve condos, single-family homes, and seasonal transitions.',
    costs: {
      studioRange: '$450–$900',
      familyRange: '$1,700–$3,500',
      avgHourly: '$95–$150/hr for a 2-person crew',
      note: 'Palm Coast gated communities and Intracoastal properties often require HOA move windows and specialized access coordination.',
    },
    tips: [
      'Gated and golf communities have strict move-in rules and access requirements; confirm in advance.',
      'Waterfront/Intracoastal properties may need special handling for docks or elevation.',
      'Growing area traffic on US-1 and I-95 can affect timing.',
      'HOA and condo associations are common; obtain building details early.',
      'Seasonal retiree moves peak in winter; plan accordingly.',
    ],
  },
  franklin: {
    marketNotes:
      'Franklin County is rural and coastal with Apalachicola, Carrabelle, and St. George Island. Moves are primarily residential or seasonal with waterfront considerations and limited local infrastructure. Regional providers from Panama City or Tallahassee are common.',
    costs: {
      studioRange: '$400–$800',
      familyRange: '$1,400–$3,000',
      avgHourly: '$90–$135/hr for a 2-person crew',
      note: 'Forgotten Coast and island properties may involve bridge access, ferries, or travel fees from Panama City or Tallahassee regional providers.',
    },
    tips: [
      'Coastal/island properties (e.g., St. George Island) involve bridges, ferries, or limited access; confirm logistics.',
      'Rural areas may have unpaved roads or long driveways; discuss equipment.',
      'Tourism/seasonal moves are common; plan around peak periods.',
      'Storage is limited; use providers with nearby facilities.',
      'Verify service coverage explicitly due to remote locations.',
    ],
  },
  gadsden: {
    marketNotes:
      'Gadsden County is a small, rural county with Quincy as its seat, featuring agricultural properties and residential areas near the Tallahassee metro. Moves are primarily local or short regional, with limited dedicated full-service companies.',
    costs: {
      studioRange: '$350–$750',
      familyRange: '$1,200–$2,700',
      avgHourly: '$90–$130/hr for a 2-person crew',
      note: 'Most full-service providers operate from Tallahassee; confirm travel fees and Quincy service-area coverage before booking.',
    },
    tips: [
      'Rural and agricultural properties often have long driveways or limited access; confirm truck and equipment suitability.',
      'Proximity to Tallahassee provides regional options; explicitly verify service to Quincy and outlying areas, including any travel fees.',
      'Storage is limited locally; coordinate with providers offering facilities in Tallahassee or nearby.',
      'Obtain multiple written estimates due to thinner local competition.',
      'Verify licensing, insurance, and FMCSA status carefully in smaller markets.',
    ],
  },
  gilchrist: {
    marketNotes:
      'Gilchrist County is small and rural with Trenton as its seat. The moving market is very limited, with most service provided regionally from Gainesville or nearby areas. Moves typically involve single-family homes or larger rural properties.',
    costs: {
      studioRange: '$350–$700',
      familyRange: '$1,100–$2,500',
      avgHourly: '$90–$125/hr for a 2-person crew',
      note: 'Gainesville-based regional providers may add travel fees for Trenton and rural Gilchrist County routes.',
    },
    tips: [
      'Rural properties frequently feature unpaved roads or long driveways; discuss access and shuttle needs upfront.',
      'Confirm explicit coverage for Trenton and outlying areas, as options are sparse.',
      'Local storage is minimal; use providers with facilities in Gainesville or Alachua County.',
      'Obtain multiple estimates and verify credentials due to low volume.',
      'Agricultural or seasonal timing may affect availability.',
    ],
  },
  glades: {
    marketNotes:
      'Glades County is one of Florida’s smallest and most rural counties, centered on Moore Haven near Lake Okeechobee. The moving market is very limited, with agricultural and residential focus and reliance on regional providers from larger nearby areas (e.g., Clewiston or Okeechobee).',
    costs: {
      studioRange: '$350–$700',
      familyRange: '$1,100–$2,500',
      avgHourly: '$90–$125/hr for a 2-person crew',
      note: 'Lake Okeechobee region providers from Okeechobee or Clewiston may add travel fees for Moore Haven and rural Glades County access.',
    },
    tips: [
      'Lake-adjacent or agricultural properties may involve flood considerations, boat ramps, or limited road access; confirm specialized handling.',
      'Service is mostly regional; explicitly verify coverage for Moore Haven and travel fees.',
      'Storage options are scarce locally; coordinate with providers in larger neighboring counties.',
      'Obtain multiple estimates and verify credentials in this low-volume area.',
      'Seasonal or agricultural timing can affect availability.',
    ],
  },
  hendry: {
    marketNotes:
      'Hendry County is rural and agricultural with LaBelle as its seat, featuring farmland, residential properties, and proximity to Lake Okeechobee. The moving market is thin; most service is regional from Fort Myers, Clewiston, or Moore Haven.',
    costs: {
      studioRange: '$350–$750',
      familyRange: '$1,200–$2,700',
      avgHourly: '$90–$130/hr for a 2-person crew',
      note: 'LaBelle and Clewiston routes often rely on Fort Myers or Lake Okeechobee regional providers; confirm travel fees and agricultural-property access.',
    },
    tips: [
      'Agricultural or large-lot properties often require handling of equipment or outbuildings; provide detailed inventory.',
      'Rural roads and access can be limited; confirm truck size and shuttle options.',
      'Lake Okeechobee-area moves may involve flood or waterfront considerations.',
      'Storage is limited locally; coordinate with regional facilities.',
      'Verify service coverage and credentials explicitly due to sparse options.',
    ],
  },
  hernando: {
    marketNotes:
      'Hernando County features a mix of suburban (Spring Hill) and rural areas with Brooksville as the seat. It serves retirees and families with growing residential development. Regional providers from Tampa or nearby support the market.',
    costs: {
      studioRange: '$400–$850',
      familyRange: '$1,500–$3,200',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Spring Hill suburban moves and Brooksville rural routes often share Tampa Bay regional crews; confirm Hernando-specific experience.',
    },
    tips: [
      'Suburban neighborhoods and new developments often have HOA rules for parking and move timing.',
      'Rural or Nature Coast properties may involve longer access or elevation considerations.',
      'Proximity to Tampa Bay area provides good regional options; confirm specific Hernando service.',
      'Retiree moves are common; inquire about senior-friendly services.',
      'Verify credentials and obtain multiple estimates.',
    ],
  },
  highlands: {
    marketNotes:
      'Highlands County features lakes, golf communities, and retiree populations in Sebring and Avon Park. Moves often involve residential downsizing and seasonal snowbirds. Regional providers from Lakeland or Orlando supplement local options.',
    costs: {
      studioRange: '$400–$800',
      familyRange: '$1,500–$3,200',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Golf and lake communities in Sebring and Avon Park often require HOA move windows and crews experienced with seasonal retiree relocations.',
    },
    tips: [
      'Lake and golf communities have HOA rules, cart paths, or restricted access; confirm early.',
      'Snowbird seasonality increases demand in winter; book ahead.',
      'Many properties include lakeside or elevated access; discuss specialized handling.',
      'Storage for seasonal residents is useful; inquire about climate-controlled options.',
      'Verify regional coverage for Sebring and Avon Park.',
    ],
  },
  hillsborough: {
    marketNotes:
      'Hillsborough County is a major urban and suburban area centered on Tampa with diverse residential, commercial, port, and military-related moves. High-rises, suburbs, and growing developments create complex logistics with significant traffic on I-4, I-75, and local roads.',
    costs: {
      studioRange: '$500–$1,100',
      familyRange: '$2,000–$4,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Downtown Tampa high-rises, Ybor City, and Brandon suburban moves often require elevator reservations, HOA coordination, and crews experienced with I-4 and I-75 corridor traffic.',
    },
    tips: [
      'Downtown/high-rise and Ybor City areas require elevator reservations and tight scheduling.',
      'Major interstate traffic (I-4, I-75) can delay moves; select experienced local teams.',
      'Port and airport proximity influences commercial and military moves; confirm specialized capabilities.',
      'Suburban neighborhoods (e.g., Brandon, Riverview) have HOA rules; obtain building details early.',
      'Book well in advance for peak seasons; verify insurance for high-value urban moves.',
    ],
  },
  holmes: {
    marketNotes:
      'Holmes County is small and rural with Bonifay as its seat, featuring agricultural and residential properties. The moving market is very thin; service is primarily regional from Dothan (AL), Panama City, or Chipley.',
    costs: {
      studioRange: '$350–$700',
      familyRange: '$1,100–$2,500',
      avgHourly: '$90–$125/hr for a 2-person crew',
      note: 'Bonifay and rural Holmes County routes often rely on Panama City or cross-border regional providers; confirm travel fees and service-area coverage.',
    },
    tips: [
      'Rural properties often have long driveways or farm access; confirm equipment needs.',
      'Verify explicit service to Bonifay and potential cross-border (AL) logistics.',
      'Storage is limited; use regional facilities.',
      'Obtain multiple estimates due to low local options.',
      'Check credentials carefully in smaller markets.',
    ],
  },
  'indian-river': {
    marketNotes:
      'Indian River County centers on Vero Beach with beach communities, retirees, and agricultural areas. Moves often involve coastal condos, single-family homes, and seasonal snowbirds. Regional support from Melbourne or Stuart is available.',
    costs: {
      studioRange: '$450–$950',
      familyRange: '$1,800–$3,800',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Vero Beach coastal condos and barrier-island properties often require sand protection, elevator reservations, and snowbird-season scheduling.',
    },
    tips: [
      'Beach and condo properties require sand protection, elevators, and HOA coordination.',
      'Snowbird season drives winter demand; book early.',
      'Waterfront or barrier island access (e.g., bridges) needs planning.',
      'Retiree-focused services are common; inquire about senior moves.',
      'Verify insurance for coastal and high-value properties.',
    ],
  },
  jackson: {
    marketNotes:
      'Jackson County is rural with Marianna as its seat, featuring agricultural lands, residential properties, and proximity to military installations. The moving market is thin; service is primarily regional from Dothan (AL), Panama City, or Tallahassee.',
    costs: {
      studioRange: '$350–$750',
      familyRange: '$1,200–$2,700',
      avgHourly: '$90–$130/hr for a 2-person crew',
      note: 'Marianna and rural Jackson County routes often rely on Panama City regional providers; confirm travel fees and cross-border logistics where applicable.',
    },
    tips: [
      'Rural and agricultural properties often require handling of outbuildings or equipment; provide detailed inventory.',
      'Confirm explicit service coverage for Marianna and potential cross-state logistics.',
      'Storage options are limited locally; coordinate with regional facilities.',
      'Obtain multiple estimates due to low local competition.',
      'Verify FMCSA authority and insurance thoroughly.',
    ],
  },
  jefferson: {
    marketNotes:
      'Jefferson County is small and rural with Monticello as its seat, known for historic properties and agriculture. Moves are mostly residential; service draws from Tallahassee or regional providers.',
    costs: {
      studioRange: '$350–$700',
      familyRange: '$1,100–$2,500',
      avgHourly: '$90–$125/hr for a 2-person crew',
      note: 'Monticello and Jefferson County moves typically use Tallahassee-based regional providers; confirm Jefferson-specific service and travel fees.',
    },
    tips: [
      'Historic or rural properties may need special care for older structures or long access roads.',
      'Proximity to Tallahassee provides regional support; confirm specific Jefferson service.',
      'Limited local storage; use Tallahassee-area facilities if needed.',
      'Obtain multiple estimates in this low-volume market.',
      'Verify all credentials carefully.',
    ],
  },
  lafayette: {
    marketNotes:
      'Lafayette County is one of Florida’s smallest and most rural counties with Mayo as its seat. The moving market is very limited, with agricultural and residential focus and heavy reliance on regional providers from Live Oak or Gainesville.',
    costs: {
      studioRange: '$350–$700',
      familyRange: '$1,100–$2,400',
      avgHourly: '$90–$125/hr for a 2-person crew',
      note: 'Mayo and rural Lafayette County routes often rely on Live Oak or Gainesville regional providers; confirm remote-location coverage and travel fees.',
    },
    tips: [
      'Rural properties frequently feature unpaved roads or farm access; discuss logistics in advance.',
      'Confirm explicit service to Mayo due to remote location.',
      'Storage is scarce; use regional facilities in nearby counties.',
      'Obtain multiple estimates and verify credentials.',
      'Agricultural timing may affect availability.',
    ],
  },
  lake: {
    marketNotes:
      'Lake County features lakes, suburban growth (e.g., Clermont, Eustis), and retiree communities. Moves often involve residential, senior, and lakefront properties with growing development. Regional Orlando support is strong.',
    costs: {
      studioRange: '$450–$900',
      familyRange: '$1,700–$3,500',
      avgHourly: '$95–$150/hr for a 2-person crew',
      note: 'Clermont and Tavares lakefront properties often require HOA coordination and crews familiar with US-27 and SR-19 corridor traffic.',
    },
    tips: [
      'Lakefront properties may require special handling for docks, elevation, or water access.',
      'Growing suburban areas have HOA rules for move timing and parking.',
      'Proximity to Orlando influences traffic on US-27 and SR-19; plan accordingly.',
      'Retiree and senior moves are common; inquire about specialized services.',
      'Verify regional coverage for Tavares and outlying communities.',
    ],
  },
  lee: {
    marketNotes:
      'Lee County is a major Southwest Florida area with Fort Myers, Cape Coral, and beach communities. It features a high retiree and snowbird population, condos, and waterfront properties. Seasonal demand and coastal logistics are key.',
    costs: {
      studioRange: '$500–$1,100',
      familyRange: '$2,000–$4,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Fort Myers and Cape Coral condo moves often require elevator reservations, sand protection, and snowbird-season scheduling.',
    },
    tips: [
      'Condo and beachfront properties require elevator reservations, sand protection, and HOA coordination.',
      'Snowbird season (winter) increases demand; book early.',
      'Waterfront and canal access may involve bridges or special equipment.',
      'Hurricane preparedness affects storage and timing; confirm contingencies.',
      'Traffic on US-41 and I-75 can delay moves.',
    ],
  },
  leon: {
    marketNotes:
      'Leon County centers on Tallahassee with government, university (FSU/FAMU), and suburban residential moves. It features a mix of urban, campus-adjacent, and rural properties with significant student and state worker relocations.',
    costs: {
      studioRange: '$450–$950',
      familyRange: '$1,700–$3,600',
      avgHourly: '$95–$150/hr for a 2-person crew',
      note: 'FSU and FAMU student housing peaks (August and May) and downtown Tallahassee access restrictions can affect pricing and availability.',
    },
    tips: [
      'FSU/FAMU academic calendar drives seasonal student apartment moves (peak August and May).',
      'Government and downtown areas have parking and access restrictions.',
      'Suburban neighborhoods have HOA rules; confirm details.',
      'Traffic on major roads (I-10, US-27) can impact timing.',
      'Verify coverage for Tallahassee and outlying Leon areas.',
    ],
  },
  citrus: {
    marketNotes:
      'Citrus County offers a mix of coastal (Crystal River), rural, and retiree communities with nature and tourism appeal. Moves often involve single-family homes, waterfront properties, and downsizing. Seasonal and eco-sensitive logistics are common along the Nature Coast.',
    costs: {
      studioRange: '$400–$850',
      familyRange: '$1,500–$3,200',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Waterfront and Crystal River area properties may require dock access planning and crews familiar with Nature Coast roads.',
    },
    tips: [
      'Waterfront or Crystal River area properties may have dock or limited access challenges; confirm specialized handling.',
      'Many retiree communities have specific move-in rules or age-restricted considerations; verify HOA details.',
      'Nature Coast roads can be narrow or scenic; plan for timing to avoid peak tourist periods.',
      'Storage may be useful for seasonal residents; ask about climate-controlled options.',
      'Obtain detailed estimates accounting for potential stairs or outdoor item handling in rural settings.',
    ],
  },
  bay: {
    marketNotes:
      'Bay County encompasses Panama City and the popular Panama City Beach tourist corridor, featuring a mix of single-family homes, beach condos, and some commercial/military-related relocations near Tyndall AFB. Seasonal tourism, potential hurricane recovery activity, and condo association rules influence move logistics. Demand spikes in summer; beach access, stairs, and sand protection are common considerations.',
    costs: {
      studioRange: '$500–$1,100',
      familyRange: '$2,000–$4,000',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Beach condos and coastal properties often require HOA coordination, floor protection, and crews experienced with stairs and sand exposure.',
    },
    tips: [
      'Panama City Beach condos and beachfront properties often have strict HOA or association moving rules, elevator reservations, and protective flooring requirements; confirm in advance.',
      'Military PCS (Permanent Change of Station) moves are common; prioritize companies experienced with military relocation documentation and timelines.',
      'Beach access, sand, and potential stairs or elevated homes require specialized equipment and crew experience; discuss protection and logistics upfront.',
      'Peak summer tourist season increases demand and may affect pricing/availability; book early and confirm crew experience with coastal properties.',
      'Post-hurricane or storm-season moves may involve road or access considerations; verify current conditions and flexible scheduling options.',
    ],
  },
};

export function getFloridaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return floridaCountyResearch[countySlug];
}