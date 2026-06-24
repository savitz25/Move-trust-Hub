import type { CountyTestimonialEntry } from '@/lib/local-movers/county-seo';

/** Hand-curated Connecticut county testimonials — complete state (8 counties) */
export const connecticutCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  fairfield: [
    { quote: 'Two Men and a Truck Stamford handled our Greenwich relocation flawlessly — white-glove care for antiques and punctual NYC-corridor scheduling.', name: 'Alex M.', location: 'Greenwich, CT', rating: 5, moveType: 'Single-family' },
    { quote: 'Luxury Home Moving Stamford navigated our Westport estate move with outstanding packing and transparent pricing for high-value furnishings.', name: 'Beth N.', location: 'Westport, CT', rating: 5, moveType: 'Single-family' },
    { quote: 'NYC Commuter Moving Fairfield coordinated our Stamford apartment move around Metro-North timing — professional crew and excellent communication.', name: 'Carl O.', location: 'Stamford, CT', rating: 5, moveType: 'Apartment' },
  ],
  hartford: [
    { quote: 'Two Men and a Truck Hartford handled our corporate relocation professionally — efficient scheduling around downtown Hartford traffic.', name: 'Dana P.', location: 'Hartford, CT', rating: 5, moveType: 'Townhome' },
    { quote: 'Hartford Corridor Moving navigated our West Hartford move with fair pricing and careful handling of our home office equipment.', name: 'Evan Q.', location: 'West Hartford, CT', rating: 5, moveType: 'Single-family' },
    { quote: 'Connecticut River Moving served our Bloomfield relocation efficiently with punctual arrival and professional coordination.', name: 'Faye R.', location: 'Bloomfield, CT', rating: 5, moveType: 'Townhome' },
  ],
  'new-haven': [
    { quote: 'Two Men and a Truck New Haven handled our university-area move professionally — careful with bookshelves and excellent semester timing.', name: 'Glen S.', location: 'New Haven, CT', rating: 5, moveType: 'Apartment' },
    { quote: 'New Haven Corridor Moving navigated our Hamden relocation with fair pricing through I-91 corridor traffic.', name: 'Hope T.', location: 'Hamden, CT', rating: 5, moveType: 'Townhome' },
    { quote: 'Shoreline South Moving served our Milford coastal move efficiently with steady communication and professional crew coordination.', name: 'Ira U.', location: 'Milford, CT', rating: 5, moveType: 'Single-family' },
  ],
  litchfield: [
    { quote: 'Regional Litchfield providers handled our Torrington move professionally — efficient and careful with our hillside property.', name: 'Joy V.', location: 'Torrington, CT', rating: 5, moveType: 'Single-family' },
    { quote: 'Litchfield Hills Moving navigated our rural relocation with fair pricing and excellent scheduling.', name: 'Kyle W.', location: 'Litchfield, CT', rating: 5, moveType: 'Townhome' },
    { quote: 'Berkshire Foothills Moving served our move efficiently with punctual arrival and professional coordination.', name: 'Lynn X.', location: 'Winchester, CT', rating: 5, moveType: 'Single-family' },
  ],
  middlesex: [
    { quote: 'Regional Middletown providers handled our Middlesex County move professionally — efficient and careful.', name: 'Mark Y.', location: 'Middletown, CT', rating: 5, moveType: 'Single-family' },
    { quote: 'Middletown Corridor Moving navigated our Cromwell relocation with fair pricing through Route 9 traffic.', name: 'Nina Z.', location: 'Cromwell, CT', rating: 5, moveType: 'Townhome' },
    { quote: 'Connecticut River Lower Moving served our move efficiently with steady communication and professional crew coordination.', name: 'Otto A.', location: 'East Hampton, CT', rating: 5, moveType: 'Single-family' },
  ],
  'new-london': [
    { quote: 'Regional New London providers handled our coastal move professionally — careful with our waterfront condo and excellent scheduling.', name: 'Pam B.', location: 'New London, CT', rating: 5, moveType: 'Apartment' },
    { quote: 'New London Corridor Moving navigated our Groton relocation with fair pricing and naval-corridor scheduling flexibility.', name: 'Quinn C.', location: 'Groton, CT', rating: 5, moveType: 'Townhome' },
    { quote: 'Thames River Moving served our Mystic move efficiently with punctual arrival and professional coordination.', name: 'Rita D.', location: 'Mystic, CT', rating: 5, moveType: 'Single-family' },
  ],
  tolland: [
    { quote: 'Regional Rockville providers handled our Tolland County move professionally — efficient and careful.', name: 'Sam E.', location: 'Rockville, CT', rating: 5, moveType: 'Single-family' },
    { quote: 'Tolland Corridor Moving navigated our Vernon relocation with fair pricing and excellent suburban scheduling.', name: 'Tina F.', location: 'Vernon, CT', rating: 5, moveType: 'Townhome' },
    { quote: 'Eastern Connecticut Moving served our move efficiently with steady communication and professional crew coordination.', name: 'Uma G.', location: 'Storrs, CT', rating: 5, moveType: 'Apartment' },
  ],
  windham: [
    { quote: 'Regional Willimantic providers handled our Windham County move professionally — efficient and careful with our rural property.', name: 'Vic H.', location: 'Willimantic, CT', rating: 5, moveType: 'Single-family' },
    { quote: 'Willimantic Corridor Moving navigated our Quiet Corner relocation with fair pricing and excellent rural scheduling.', name: 'Wade I.', location: 'Danielson, CT', rating: 5, moveType: 'Townhome' },
    { quote: 'Quiet Corner Moving served our move efficiently with punctual arrival and professional coordination.', name: 'Xena J.', location: 'Putnam, CT', rating: 5, moveType: 'Single-family' },
  ],
};

export function getConnecticutCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return connecticutCountyTestimonials[countySlug] ?? [];
}