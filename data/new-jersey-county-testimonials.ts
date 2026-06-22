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
  burlington: [
    {
      quote:
        'Piece of Cake handled our Mount Laurel townhome with flat-fee pricing that stayed predictable. The crew was professional, stress-free, and careful through a tight HOA move-in window off I-295.',
      name: 'Nicole W.',
      location: 'Mount Laurel, NJ',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Booth Movers did an outstanding job on our family move near Mount Holly — careful with antiques, on time, and professional from start to finish. Exactly what we needed in South Jersey.',
      name: 'Greg F.',
      location: 'Mount Holly, NJ',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'White Glove Moving treated our Marlton relocation like a premium job — everything arrived perfectly wrapped and the crew exceeded expectations despite Philadelphia commuter traffic.',
      name: 'Angela S.',
      location: 'Marlton, NJ',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  camden: [
    {
      quote:
        'Piece of Cake made our Cherry Hill move stress-free with flat-fee pricing that never changed. The crew was professional, communicative, and careful through a busy suburban HOA move-in day.',
      name: 'Rachel B.',
      location: 'Cherry Hill, NJ',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Booth Movers handled our Voorhees relocation with outstanding care — on time, professional, and no damage to furniture or floors. Highly recommend for Camden County family moves.',
      name: 'Tom H.',
      location: 'Voorhees, NJ',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'SeaCure relieved a lot of moving stress for our Camden City apartment transfer. The crew was polite, efficient, and finished early enough that we received a refund on the estimate.',
      name: 'Maria G.',
      location: 'Camden, NJ',
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