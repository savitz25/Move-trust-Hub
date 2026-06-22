export type CountyTestimonialEntry = {
  quote: string;
  name: string;
  location: string;
  rating: number;
  moveType?: string;
};

export const newJerseyCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {};

export function getNewJerseyCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return newJerseyCountyTestimonials[countySlug] ?? [];
}