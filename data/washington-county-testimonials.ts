import type { CountyTestimonialEntry } from '@/lib/local-movers/county-seo';

/** Hand-curated Washington county testimonials — premium hubs (expanding) */
export const washingtonCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  king: [
    { quote: 'Two Men and a Truck Seattle handled our Capitol Hill move professionally — on time and extremely careful with our urban apartment.', name: 'Alex M.', location: 'Seattle, WA', rating: 5, moveType: 'Apartment' },
    { quote: 'All My Sons Seattle navigated our Bellevue relocation with fair pricing through bridge-crossing traffic scheduling.', name: 'Beth N.', location: 'Bellevue, WA', rating: 5, moveType: 'Townhome' },
    { quote: 'Seattle Moving served our Redmond tech-corridor move efficiently with steady communication and professional crew coordination.', name: 'Carl O.', location: 'Redmond, WA', rating: 5, moveType: 'Single-family' },
  ],
};

export function getWashingtonCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return washingtonCountyTestimonials[countySlug] ?? [];
}