export type CountyTestimonialEntry = {
  quote: string;
  name: string;
  location: string;
  rating: number;
  moveType?: string;
};

export const californiaCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  alameda: [
    {
      quote:
        'MorningStar handled our Oakland high-rise move professionally — efficient crew, elevator coordination, and careful handling throughout.',
      name: 'David R.',
      location: 'Oakland, CA',
      rating: 5,
      moveType: 'High-Rise',
    },
    {
      quote:
        'Got2Move provided excellent customer service for our Berkeley apartment move — smooth, efficient, and transparent pricing.',
      name: 'Maria L.',
      location: 'Berkeley, CA',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Roadway Moving exceeded expectations on our Fremont family home relocation — professional team and careful handling of our furnishings.',
      name: 'James K.',
      location: 'Fremont, CA',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  alpine: [
    {
      quote:
        'Mountain Lake Mover handled our Markleeville mountain property with care — professional crew despite challenging Sierra access roads.',
      name: 'Robert T.',
      location: 'Markleeville, CA',
      rating: 5,
      moveType: 'Mountain',
    },
    {
      quote:
        'Tahoe Moving & Storage provided reliable regional service for our Alpine County seasonal relocation — careful planning for winter timing.',
      name: 'Susan M.',
      location: 'Kirkwood, CA',
      rating: 5,
      moveType: 'Seasonal',
    },
    {
      quote:
        "Mother Lode Van drove in from Sacramento with fair pricing and professional service for our remote Alpine County move.",
      name: 'Paul H.',
      location: 'Bear Valley, CA',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  amador: [
    {
      quote:
        'Mother Lode Van & Storage handled our Jackson Gold Country move professionally — preservation-sensitive handling for our historic home.',
      name: 'Linda W.',
      location: 'Jackson, CA',
      rating: 5,
      moveType: 'Historic',
    },
    {
      quote:
        'California Capital Movers provided dependable regional service for our Sutter Creek relocation — efficient crews throughout.',
      name: 'Tom B.',
      location: 'Sutter Creek, CA',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Ernie's Moving crew was courteous and efficient with great communication for our Amador County family home move.",
      name: 'Karen S.',
      location: 'Pioneer, CA',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
};

export function getCaliforniaCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return californiaCountyTestimonials[countySlug] ?? [];
}