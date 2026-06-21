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