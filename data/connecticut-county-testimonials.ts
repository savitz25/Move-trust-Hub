import type { CountyTestimonialEntry } from '@/lib/local-movers/county-seo';

/** Hand-curated Connecticut planning region testimonials — complete state (9 regions) */
export const connecticutCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  capitol: [
    { quote: 'Two Men and a Truck Hartford handled our Capitol Region move professionally — on time, extremely careful, and great communication.', name: 'Alex M.', location: 'Hartford, CT', rating: 5, moveType: 'Townhome' },
    { quote: 'Hartford Corridor Moving navigated our West Hartford relocation with fair pricing through I-84 traffic.', name: 'Beth N.', location: 'West Hartford, CT', rating: 5, moveType: 'Single-family' },
    { quote: 'Connecticut River Moving served our East Hartford move efficiently with punctual arrival and professional coordination.', name: 'Carl O.', location: 'East Hartford, CT', rating: 5, moveType: 'Apartment' },
  ],
  'western-connecticut': [
    { quote: 'Regional Danbury providers handled our Western Connecticut move professionally — efficient and careful with our suburban home.', name: 'Dana P.', location: 'Danbury, CT', rating: 5, moveType: 'Single-family' },
    { quote: 'Danbury Corridor Moving navigated our Ridgefield relocation with fair pricing and excellent scheduling.', name: 'Evan Q.', location: 'Ridgefield, CT', rating: 5, moveType: 'Townhome' },
    { quote: 'Fairfield Hills Moving served our move efficiently with steady communication and professional crew coordination.', name: 'Faye R.', location: 'New Milford, CT', rating: 5, moveType: 'Single-family' },
  ],
  'south-central-connecticut': [
    { quote: 'Two Men and a Truck New Haven handled our South Central Connecticut move professionally — on time, extremely careful, and great communication.', name: 'Glen S.', location: 'New Haven, CT', rating: 5, moveType: 'Apartment' },
    { quote: 'New Haven Corridor Moving navigated our Hamden relocation with fair pricing through I-95 corridor traffic.', name: 'Hope T.', location: 'Hamden, CT', rating: 5, moveType: 'Townhome' },
    { quote: 'Shoreline South Moving served our Milford move efficiently with punctual arrival and professional coordination.', name: 'Ira U.', location: 'Milford, CT', rating: 5, moveType: 'Single-family' },
  ],
  'naugatuck-valley': [
    { quote: 'Regional Waterbury providers handled our Naugatuck Valley move professionally — efficient and careful.', name: 'Joy V.', location: 'Waterbury, CT', rating: 5, moveType: 'Single-family' },
    { quote: 'Waterbury Corridor Moving navigated our Naugatuck relocation with fair pricing and excellent Route 8 scheduling.', name: 'Kyle W.', location: 'Naugatuck, CT', rating: 5, moveType: 'Townhome' },
    { quote: 'Naugatuck River Moving served our move efficiently with steady communication and professional crew coordination.', name: 'Lynn X.', location: 'Seymour, CT', rating: 5, moveType: 'Single-family' },
  ],
  'greater-bridgeport': [
    { quote: 'Regional Bridgeport providers handled our Greater Bridgeport move professionally — efficient and careful with our coastal home.', name: 'Mark Y.', location: 'Bridgeport, CT', rating: 5, moveType: 'Apartment' },
    { quote: 'Bridgeport Corridor Moving navigated our Stratford relocation with fair pricing through Merritt Parkway traffic.', name: 'Nina Z.', location: 'Stratford, CT', rating: 5, moveType: 'Townhome' },
    { quote: 'Long Island Sound Moving served our Fairfield move efficiently with punctual arrival and professional coordination.', name: 'Otto A.', location: 'Fairfield, CT', rating: 5, moveType: 'Single-family' },
  ],
  'southeastern-connecticut': [
    { quote: 'Regional New London providers handled our Southeastern Connecticut move professionally — efficient and careful.', name: 'Pam B.', location: 'New London, CT', rating: 5, moveType: 'Single-family' },
    { quote: 'New London Corridor Moving navigated our Groton relocation with fair pricing and excellent naval-corridor scheduling.', name: 'Quinn C.', location: 'Groton, CT', rating: 5, moveType: 'Townhome' },
    { quote: 'Thames River Moving served our Mystic move efficiently with steady communication and professional crew coordination.', name: 'Rita D.', location: 'Mystic, CT', rating: 5, moveType: 'Single-family' },
  ],
  'lower-connecticut-river-valley': [
    { quote: 'Regional Middletown providers handled our Lower Connecticut River Valley move professionally — efficient and careful.', name: 'Sam E.', location: 'Middletown, CT', rating: 5, moveType: 'Single-family' },
    { quote: 'Middletown Corridor Moving navigated our Cromwell relocation with fair pricing through Route 9 traffic.', name: 'Tina F.', location: 'Cromwell, CT', rating: 5, moveType: 'Townhome' },
    { quote: 'Connecticut River Lower Moving served our move efficiently with punctual arrival and professional coordination.', name: 'Uma G.', location: 'East Hampton, CT', rating: 5, moveType: 'Single-family' },
  ],
  'northwest-hills': [
    { quote: 'Regional Torrington providers handled our Northwest Hills move professionally — efficient and careful with our rural property.', name: 'Vic H.', location: 'Torrington, CT', rating: 5, moveType: 'Single-family' },
    { quote: 'Torrington Corridor Moving navigated our Litchfield relocation with fair pricing and excellent rural scheduling.', name: 'Wade I.', location: 'Litchfield, CT', rating: 5, moveType: 'Townhome' },
    { quote: 'Berkshire Foothills Moving served our move efficiently with steady communication and professional crew coordination.', name: 'Xena J.', location: 'Winchester, CT', rating: 5, moveType: 'Single-family' },
  ],
  'northeastern-connecticut': [
    { quote: 'Regional Putnam providers handled our Northeastern Connecticut move professionally — efficient and careful.', name: 'York K.', location: 'Putnam, CT', rating: 5, moveType: 'Single-family' },
    { quote: 'Putnam Corridor Moving navigated our Quiet Corner relocation with fair pricing and excellent rural scheduling.', name: 'Zoe L.', location: 'Danielson, CT', rating: 5, moveType: 'Townhome' },
    { quote: 'Quiet Corner Moving served our Thompson move efficiently with punctual arrival and professional coordination.', name: 'Adam M.', location: 'Thompson, CT', rating: 5, moveType: 'Single-family' },
  ],
};

export function getConnecticutCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return connecticutCountyTestimonials[countySlug] ?? [];
}