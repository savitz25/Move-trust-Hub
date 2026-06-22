export type CountyTestimonialEntry = {
  quote: string;
  name: string;
  location: string;
  rating: number;
  moveType?: string;
};

export const newJerseyCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  atlantic: [
    {
      quote:
        'Our Egg Harbor Township condo move needed elevator mats and a tight freight-window slot. The crew arrived early, stayed friendly through every flight, and finished the whole loadout with zero damage — easily a 10/10 experience.',
      name: 'Marcus T.',
      location: 'Egg Harbor Township, NJ',
      rating: 5,
      moveType: 'Condo',
    },
    {
      quote:
        'SeaCure handled our Tuckerton-to-Atlantic City relocation and finished faster than the estimate. They wrapped everything carefully, stayed polite the entire day, and even issued a refund for the time saved.',
      name: 'Karen L.',
      location: 'Atlantic City, NJ',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'All My Sons sent a professional crew for our Atlantic City apartment move during peak summer season. They worked hard, communicated clearly, and got us settled without the stress we expected near the boardwalk.',
      name: 'James R.',
      location: 'Atlantic City, NJ',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  bergen: [
    {
      quote:
        'Booth Movers handled our Paramus colonial with real care — professional crew, on-time arrival, and not a scratch on the floors or doorways. Easily the smoothest Bergen County move we have had.',
      name: 'Elena V.',
      location: 'Paramus, NJ',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Movers 201 quoted one price and stuck to it with no surprises. The team was courteous, fast, and careful moving us from Hackensack into a tighter Ridgewood street with limited parking.',
      name: 'David P.',
      location: 'Hackensack, NJ',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'Unwind Moving earned every five-star review — Sebastian and the crew made our Garfield apartment relocation stress-free with clear communication from quote through completion.',
      name: 'Sofia M.',
      location: 'Garfield, NJ',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
};

export function getNewJerseyCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return newJerseyCountyTestimonials[countySlug] ?? [];
}