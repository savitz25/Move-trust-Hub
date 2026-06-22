export type CountyTestimonialEntry = {
  quote: string;
  name: string;
  location: string;
  rating: number;
  moveType?: string;
};

export const newYorkCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  albany: [
    {
      quote:
        "Lamanna gave me a good price and were right there as scheduled. They moved quickly and efficiently — courteous and professional from start to finish.",
      name: 'Susan K.',
      location: 'Albany, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Don's Moving crew was courteous and efficient with great communication and on-time performance. Our corporate relocation across Colonie went smoother than expected.",
      name: 'Michael R.',
      location: 'Colonie, NY',
      rating: 5,
      moveType: 'Corporate',
    },
    {
      quote:
        "Busy Bee Movers were great in my experience — best prices and the most efficient crew I've hired in the Capital District. Can't recommend them enough.",
      name: 'Jennifer L.',
      location: 'Guilderland, NY',
      rating: 5,
      moveType: 'Residential',
    },
  ],
};

export function getNewYorkCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return newYorkCountyTestimonials[countySlug] ?? [];
}