import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Rhode Island county research — complete state (5/5 counties) */
export const rhodeIslandCountyResearch: Record<string, CuratedCountyResearch> = {
  providence: {
    marketNotes:
      'Providence County is Rhode Island’s most populous county with strong urban, suburban, and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$125–$180/hr for a 2-person crew',
      note: 'Providence County pricing reflects urban and suburban Rhode Island demand, I-95 and Route 6 corridor traffic, and competition among full-service agents serving Providence and surrounding communities.',
    },
    tips: [
      'Treat Providence County as capital density (East Side, triple-deckers, I-95 freeflow) — not Warwick suburban or Newport peninsula defaults.',
      'Survey triple-decker stairs and elevator COIs separately from Cranston–Johnston suburban product.',
      'Price I-95 · I-195 · US-6 · RI-10 portal time honestly for dense small-state pairs.',
      'Verify RI DPUC household goods certificate for pure in-state jobs; FMCSA for MA and other interstate legs.',
      'Prefer mid-week early starts; scarce curb and I-95 freeflow dominate capital cores.',
    ],
  },
  kent: {
    marketNotes:
      'Kent County is a suburban county in central Rhode Island with strong residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Kent County pricing reflects Providence-metro suburban demand, I-95 and Route 2 corridor traffic, and competition among regional full-service agents serving Warwick and Coventry.',
    },
    tips: [
      'Treat Kent as Warwick / airport / West Warwick suburban product — not a Providence capital south clone.',
      'Price I-95 · RI-4 · US-1 portal time honestly; T.F. Green freeflow reshapes local hours.',
      'Collect HOA packets for Coventry and East Greenwich growth early.',
      'Verify RI DPUC household goods certificate for pure in-state jobs; FMCSA for interstate legs.',
      'Survey multi-unit and airport-adjacent curb separately from inland Coventry stock.',
    ],
  },
  washington: {
    marketNotes:
      'Washington County is a coastal county in southern Rhode Island with strong residential and tourism demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Washington County pricing reflects southern Rhode Island coastal demand, Route 1 and tourist-corridor traffic, and competition among regional full-service agents serving South Kingstown and Narragansett.',
    },
    tips: [
      'Label every job Washington County, Rhode Island / South County — never apply Washington State, Washington County AR, or Washington County UT templates.',
      'Price US-1 · RI-4 · RI-138 portal time honestly; summer tourism compresses Narragansett curb windows.',
      'URI semester and peak tourism calendars pack South County fleets first.',
      'Verify RI DPUC household goods certificate for pure in-state jobs; FMCSA for CT/MA legs.',
      'Photo coastal driveway and multi-unit curb options early; protect older seacoast interiors.',
    ],
  },
  newport: {
    marketNotes:
      'Newport County includes the historic city of Newport with strong tourism, waterfront, and residential demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$130–$190/hr for a 2-person crew',
      note: 'Newport County pricing reflects historic waterfront and tourism demand, Aquidneck Island corridor traffic, and competition among regional full-service agents serving Newport and Middletown-area communities.',
    },
    tips: [
      'Treat Newport as Aquidneck peninsula / historic access product — not a Providence coastal clone.',
      'Price RI-138 · RI-114 portal time honestly; bridge and tourism freeflow rewrite local hours.',
      'Tight historic streets and scarce staging dominate estimate risk more than packing skill alone.',
      'Verify RI DPUC household goods certificate for pure in-state jobs; FMCSA for interstate legs.',
      'Book around peak summer tourism; prefer mid-week early starts on the peninsula.',
    ],
  },
  bristol: {
    marketNotes:
      'Bristol County is Rhode Island’s smallest county with strong waterfront and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Bristol County pricing reflects East Bay waterfront demand, Route 114 and I-195 corridor traffic, and competition among regional full-service agents serving Bristol and Barrington-area communities.',
    },
    tips: [
      'Treat Bristol County, RI as East Bay (Bristol / Barrington / Warren) — not Providence east clones and not Bristol County MA.',
      'Price RI-114 · RI-136 portal time honestly for East Bay twin-town pairs.',
      'Short Massachusetts hops need FMCSA even when map miles look local.',
      'Verify RI DPUC household goods certificate for pure in-state jobs; FMCSA for interstate legs.',
      'Survey waterfront driveway geometry and multi-unit curb separately from inland edges.',
    ],
  },
};

export function getRhodeIslandCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return rhodeIslandCountyResearch[countySlug];
}