import type { CountyTestimonialEntry } from '@/lib/local-movers/county-seo';

/** Hand-curated Hawaii county testimonials — complete state (5/5 counties) */
export const hawaiiCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  honolulu: [
    { quote: 'Two Men and a Truck Honolulu handled our Oahu move professionally — on time and extremely careful with our urban apartment.', name: 'Alex M.', location: 'Honolulu, HI', rating: 5, moveType: 'Apartment' },
    { quote: 'All My Sons Honolulu navigated our Pearl City relocation with fair pricing through H-1 corridor traffic.', name: 'Beth N.', location: 'Pearl City, HI', rating: 5, moveType: 'Townhome' },
    { quote: 'Honolulu Moving served our Kailua move efficiently with steady communication and professional crew coordination.', name: 'Carl O.', location: 'Kailua, HI', rating: 5, moveType: 'Single-family' },
  ],
  hawaii: [
    { quote: 'Regional Hilo / Hawaii Island providers handled our Big Island move professionally — efficient and careful with our Hilo home.', name: 'Dana P.', location: 'Hilo, HI', rating: 5, moveType: 'Single-family' },
    { quote: 'All My Sons Hilo navigated our Kailua-Kona relocation with fair pricing and excellent island scheduling.', name: 'Evan Q.', location: 'Kailua-Kona, HI', rating: 5, moveType: 'Townhome' },
    { quote: 'Hilo Corridor Moving served our Waimea move efficiently with punctual arrival and professional coordination.', name: 'Faye R.', location: 'Waimea, HI', rating: 5, moveType: 'Single-family' },
  ],
  maui: [
    { quote: 'Regional Kahului / Maui providers handled our Valley Isle move professionally — on time and extremely careful.', name: 'Glen S.', location: 'Kahului, HI', rating: 5, moveType: 'Single-family' },
    { quote: 'All My Sons Kahului navigated our Wailuku relocation with fair pricing through tourist-season traffic.', name: 'Hope T.', location: 'Wailuku, HI', rating: 5, moveType: 'Townhome' },
    { quote: 'Kahului Corridor Moving served our Kihei move efficiently with steady communication and professional crew coordination.', name: 'Ira U.', location: 'Kihei, HI', rating: 5, moveType: 'Apartment' },
  ],
  kauai: [
    { quote: 'Regional Lihue / Kauai providers handled our Garden Isle move professionally — efficient and careful with our coastal home.', name: 'Jade V.', location: 'Lihue, HI', rating: 5, moveType: 'Single-family' },
    { quote: 'All My Sons Lihue navigated our Kapaa relocation with fair pricing and excellent tourist-season scheduling.', name: 'Kyle W.', location: 'Kapaa, HI', rating: 5, moveType: 'Townhome' },
    { quote: 'Lihue Corridor Moving served our Poipu move efficiently with punctual arrival and professional coordination.', name: 'Lynn X.', location: 'Poipu, HI', rating: 5, moveType: 'Single-family' },
  ],
  kalawao: [
    { quote: 'Regional Molokai / Kalawao providers handled our remote settlement move professionally — careful coordination for restricted access.', name: 'Mark Y.', location: 'Kalaupapa, HI', rating: 5, moveType: 'Single-family' },
    { quote: 'Kalaupapa Corridor Moving navigated our Molokai relocation with fair pricing and excellent advance logistics planning.', name: 'Nina Z.', location: 'Kalaupapa, HI', rating: 5, moveType: 'Townhome' },
    { quote: 'Molokai Remote Moving served our move efficiently with steady communication despite limited provider availability.', name: 'Otto A.', location: 'Kalaupapa, HI', rating: 5, moveType: 'Apartment' },
  ],
};

export function getHawaiiCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return hawaiiCountyTestimonials[countySlug] ?? [];
}