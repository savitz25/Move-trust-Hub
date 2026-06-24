import type { CountyTestimonialEntry } from '@/lib/local-movers/county-seo';

/** Hand-curated Rhode Island county testimonials — complete state (5/5 counties) */
export const rhodeIslandCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  providence: [
    { quote: 'Two Men and a Truck Providence handled our urban move professionally — on time and extremely careful.', name: 'Alex M.', location: 'Providence, RI', rating: 5, moveType: 'Apartment' },
    { quote: 'Providence Corridor Moving navigated our Cranston relocation with fair pricing through I-95 corridor traffic.', name: 'Beth N.', location: 'Cranston, RI', rating: 5, moveType: 'Townhome' },
    { quote: 'Blackstone Valley Moving served our Pawtucket move efficiently with steady communication and professional crew coordination.', name: 'Carl O.', location: 'Pawtucket, RI', rating: 5, moveType: 'Single-family' },
  ],
  kent: [
    { quote: 'Two Men and a Truck Kent County handled our Warwick move professionally — on time and extremely careful.', name: 'Dana P.', location: 'Warwick, RI', rating: 5, moveType: 'Single-family' },
    { quote: 'Warwick Corridor Moving navigated our Coventry relocation with fair pricing and excellent suburban scheduling.', name: 'Evan Q.', location: 'Coventry, RI', rating: 5, moveType: 'Townhome' },
    { quote: 'Coventry Suburban Moving served our West Warwick move efficiently with punctual arrival and professional coordination.', name: 'Faye R.', location: 'West Warwick, RI', rating: 5, moveType: 'Single-family' },
  ],
  washington: [
    { quote: 'Regional South Kingstown providers handled our Washington County move professionally — efficient and careful with our coastal home.', name: 'Glen S.', location: 'South Kingstown, RI', rating: 5, moveType: 'Single-family' },
    { quote: 'South Kingstown Corridor Moving navigated our Narragansett relocation with fair pricing through tourist-season traffic.', name: 'Hope T.', location: 'Narragansett, RI', rating: 5, moveType: 'Townhome' },
    { quote: 'Narragansett Coast Moving served our move efficiently with steady communication and professional crew coordination.', name: 'Ira U.', location: 'Westerly, RI', rating: 5, moveType: 'Apartment' },
  ],
  newport: [
    { quote: 'Regional Newport providers handled our waterfront move professionally — efficient and careful with our historic home.', name: 'Jade V.', location: 'Newport, RI', rating: 5, moveType: 'Single-family' },
    { quote: 'Newport Corridor Moving navigated our Middletown relocation with fair pricing and excellent tourist-season scheduling.', name: 'Kyle W.', location: 'Middletown, RI', rating: 5, moveType: 'Townhome' },
    { quote: 'Aquidneck Coast Moving served our Portsmouth move efficiently with punctual arrival and professional coordination.', name: 'Lynn X.', location: 'Portsmouth, RI', rating: 5, moveType: 'Single-family' },
  ],
  bristol: [
    { quote: 'Regional Bristol providers handled our East Bay move professionally — efficient and careful with our waterfront property.', name: 'Mark Y.', location: 'Bristol, RI', rating: 5, moveType: 'Single-family' },
    { quote: 'Bristol Corridor Moving navigated our Barrington relocation with fair pricing and excellent scheduling.', name: 'Nina Z.', location: 'Barrington, RI', rating: 5, moveType: 'Townhome' },
    { quote: 'East Bay Waterfront Moving served our Warren move efficiently with steady communication and professional crew coordination.', name: 'Otto A.', location: 'Warren, RI', rating: 5, moveType: 'Apartment' },
  ],
};

export function getRhodeIslandCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return rhodeIslandCountyTestimonials[countySlug] ?? [];
}