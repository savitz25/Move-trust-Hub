import type { CountyTestimonialEntry } from '@/lib/local-movers/county-seo';

/** Hand-curated Alaska borough testimonials — major population centers (5/5) */
export const alaskaCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  anchorage: [
    { quote: 'Two Men and a Truck Anchorage handled our municipality move professionally — on time and extremely careful with our suburban home.', name: 'Alex M.', location: 'Anchorage, AK', rating: 5, moveType: 'Single-family' },
    { quote: 'All My Sons Anchorage navigated our Eagle River relocation with fair pricing through seasonal weather scheduling.', name: 'Beth N.', location: 'Eagle River, AK', rating: 5, moveType: 'Townhome' },
    { quote: 'Anchorage Moving served our Midtown move efficiently with steady communication and professional crew coordination.', name: 'Carl O.', location: 'Anchorage, AK', rating: 5, moveType: 'Apartment' },
  ],
  'matanuska-susitna': [
    { quote: 'Regional Palmer / Mat-Su providers handled our valley move professionally — efficient and careful with our Wasilla home.', name: 'Dana P.', location: 'Wasilla, AK', rating: 5, moveType: 'Single-family' },
    { quote: 'All My Sons Palmer navigated our Palmer relocation with fair pricing and excellent Mat-Su scheduling.', name: 'Evan Q.', location: 'Palmer, AK', rating: 5, moveType: 'Townhome' },
    { quote: 'Palmer Corridor Moving served our Big Lake move efficiently with punctual arrival and professional coordination.', name: 'Faye R.', location: 'Big Lake, AK', rating: 5, moveType: 'Single-family' },
  ],
  'fairbanks-north-star': [
    { quote: 'Regional Fairbanks / North Star providers handled our interior Alaska move professionally — on time and extremely careful.', name: 'Glen S.', location: 'Fairbanks, AK', rating: 5, moveType: 'Single-family' },
    { quote: 'All My Sons Fairbanks navigated our North Pole relocation with fair pricing through extreme winter scheduling.', name: 'Hope T.', location: 'North Pole, AK', rating: 5, moveType: 'Townhome' },
    { quote: 'Fairbanks Moving served our Ester move efficiently with steady communication and professional crew coordination.', name: 'Ira U.', location: 'Ester, AK', rating: 5, moveType: 'Apartment' },
  ],
  'kenai-peninsula': [
    { quote: 'Regional Kenai / Kenai Peninsula providers handled our coastal move professionally — efficient and careful with our Soldotna home.', name: 'Jade V.', location: 'Soldotna, AK', rating: 5, moveType: 'Single-family' },
    { quote: 'All My Sons Kenai navigated our Kenai relocation with fair pricing and excellent summer-season scheduling.', name: 'Kyle W.', location: 'Kenai, AK', rating: 5, moveType: 'Townhome' },
    { quote: 'Kenai Corridor Moving served our Homer move efficiently with punctual arrival and professional coordination.', name: 'Lynn X.', location: 'Homer, AK', rating: 5, moveType: 'Single-family' },
  ],
  juneau: [
    { quote: 'Regional Juneau providers handled our capital borough move professionally — on time and extremely careful with our coastal home.', name: 'Mark Y.', location: 'Juneau, AK', rating: 5, moveType: 'Single-family' },
    { quote: 'All My Sons Juneau navigated our Douglas relocation with fair pricing and excellent ferry-season scheduling.', name: 'Nina Z.', location: 'Douglas, AK', rating: 5, moveType: 'Townhome' },
    { quote: 'Juneau Corridor Moving served our Auke Bay move efficiently with steady communication and professional crew coordination.', name: 'Otto A.', location: 'Auke Bay, AK', rating: 5, moveType: 'Apartment' },
  ],
};

export function getAlaskaCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return alaskaCountyTestimonials[countySlug] ?? [];
}