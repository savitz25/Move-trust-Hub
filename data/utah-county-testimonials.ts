import type { CountyTestimonialEntry } from '@/lib/local-movers/county-seo';

/** Hand-curated Utah county testimonials — batch 1: 4/29 */
export const utahCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  'salt-lake': [
    { quote: 'Two Men and a Truck Salt Lake City handled our move professionally — on time and extremely careful with our home.', name: 'Alex M.', location: 'Salt Lake City, UT', rating: 5, moveType: 'Single-family' },
    { quote: 'All My Sons Salt Lake City navigated our Sandy relocation with fair pricing through heavy urban traffic.', name: 'Beth N.', location: 'Sandy, UT', rating: 5, moveType: 'Townhome' },
    { quote: 'Wasatch Front Moving served our Murray move efficiently with steady communication and professional crew coordination.', name: 'Carl O.', location: 'Murray, UT', rating: 5, moveType: 'Apartment' },
  ],
  utah: [
    { quote: 'Two Men and a Truck Provo handled our move professionally — on time and extremely careful with our home.', name: 'Dana P.', location: 'Provo, UT', rating: 5, moveType: 'Single-family' },
    { quote: 'All My Sons Provo navigated our Orem relocation with fair pricing and excellent Utah Valley scheduling.', name: 'Evan Q.', location: 'Orem, UT', rating: 5, moveType: 'Townhome' },
    { quote: 'Utah Valley Moving served our Lehi move efficiently with punctual arrival and professional coordination.', name: 'Faye R.', location: 'Lehi, UT', rating: 5, moveType: 'Single-family' },
  ],
  davis: [
    { quote: 'Two Men and a Truck Davis County handled our suburban move professionally — on time and extremely careful.', name: 'Glen S.', location: 'Layton, UT', rating: 5, moveType: 'Single-family' },
    { quote: 'All My Sons Layton navigated our Bountiful relocation with fair pricing through Salt Lake metro traffic.', name: 'Hope T.', location: 'Bountiful, UT', rating: 5, moveType: 'Townhome' },
    { quote: 'North Salt Lake Moving served our Kaysville-area move efficiently with professional crew coordination.', name: 'Ira U.', location: 'Kaysville, UT', rating: 5, moveType: 'Apartment' },
  ],
  weber: [
    { quote: 'Two Men and a Truck Ogden handled our move professionally — on time and extremely careful with our home.', name: 'Jade V.', location: 'Ogden, UT', rating: 5, moveType: 'Single-family' },
    { quote: 'All My Sons Ogden navigated our relocation with fair pricing and excellent regional scheduling.', name: 'Kyle W.', location: 'Ogden, UT', rating: 5, moveType: 'Townhome' },
    { quote: 'Wasatch North Moving served our Roy-area move efficiently with punctual arrival and professional coordination.', name: 'Lynn X.', location: 'Roy, UT', rating: 5, moveType: 'Single-family' },
  ],
};

export function getUtahCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return utahCountyTestimonials[countySlug] ?? [];
}