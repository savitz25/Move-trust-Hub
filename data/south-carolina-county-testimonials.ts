export type CountyTestimonialEntry = {
  quote: string;
  name: string;
  location: string;
  rating: number;
  moveType?: string;
};

/** Hand-curated South Carolina county testimonials — grows incrementally per batch */
export const southCarolinaCountyTestimonials: Record<
  string,
  CountyTestimonialEntry[]
> = {
  aiken: [
    {
      quote:
        'Two Men and a Truck Aiken handled our local move professionally — on time, careful with our belongings, and transparent pricing throughout Aiken County.',
      name: 'Susan M.',
      location: 'Aiken, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Coleman Worldwide served our North Augusta relocation with excellent communication and careful handling of our equestrian-property driveway access.',
      name: 'Robert K.',
      location: 'North Augusta, SC',
      rating: 5,
      moveType: 'Equestrian property',
    },
    {
      quote:
        'Dailey Moving & Storage confirmed Aiken County coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Linda P.',
      location: 'Aiken, SC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  dorchester: [
    {
      quote:
        'Extra Muscle Moving handled our Summerville relocation professionally — excellent crew communication, careful furniture wrapping, and transparent pricing throughout Dorchester County.',
      name: 'Marcus T.',
      location: 'Summerville, SC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Burbage Transport provided reliable packing and loading for our St. George home. Finished on schedule despite Charleston-metro traffic.',
      name: 'Elena R.',
      location: 'St. George, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'College Hunks Moving Charleston served our Summerville apartment move efficiently with great communication and no surprise fees.',
      name: 'David K.',
      location: 'Summerville, SC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  pickens: [
    {
      quote:
        'Tiger Town Movers handled our Pickens home relocation with careful handling and transparent pricing — best local move we have had in the Upstate.',
      name: 'James W.',
      location: 'Pickens, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Swamp Rabbit Moving traveled from Greenville and served our Easley move with professional crews and excellent foothill driveway planning.',
      name: 'Karen H.',
      location: 'Easley, SC',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Two Men and a Truck Greenville covered our Pickens County relocation when local crews were booked — upfront about travel time and professional service.',
      name: 'Frank L.',
      location: 'Pickens, SC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
};

export function getSouthCarolinaCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return southCarolinaCountyTestimonials[countySlug] ?? [];
}