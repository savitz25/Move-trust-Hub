export type CountyTestimonialEntry = {
  quote: string;
  name: string;
  location: string;
  rating: number;
  moveType?: string;
};

export const georgiaCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  fulton: [
    {
      quote:
        'Our Buckhead high-rise move required strict elevator booking and concierge rules. Two Men and a Truck Atlanta arrived early, followed every building guideline, and navigated I-75 traffic without missing our loading window.',
      name: 'Marcus T.',
      location: 'Atlanta, GA',
      rating: 5,
      moveType: 'High-rise condo',
    },
    {
      quote:
        'Mark the Mover handled our Midtown apartment relocation with professional crews who protected floors and managed tight street parking on a busy Saturday. Transparent pricing and excellent communication throughout Fulton County.',
      name: 'Elena R.',
      location: 'Atlanta, GA',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'College Hunks made our Sandy Springs family move manageable — careful with antiques, upfront about Atlanta traffic delays, and finished our four-bedroom home faster than the written estimate.',
      name: 'David K.',
      location: 'Sandy Springs, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  gwinnett: [
    {
      quote:
        'Our Lawrenceville townhome HOA required advance gate passes and parking coordination. All My Sons Atlanta submitted paperwork early and handled our Gwinnett County move without a single hallway complaint from neighbors.',
      name: 'Priya S.',
      location: 'Lawrenceville, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Bulldog Movers navigated GA-316 traffic smartly and moved our Duluth home efficiently. The crew wrapped furniture well and was respectful of our driveway pavers in a newer subdivision.',
      name: 'James W.',
      location: 'Duluth, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Zip Moving gave us a clear flat-rate quote for our Suwanee relocation and delivered on time despite heavy I-85 congestion. Great experience for a growing-family move in Gwinnett County.',
      name: 'Nicole H.',
      location: 'Suwanee, GA',
      rating: 5,
      moveType: 'Family home',
    },
  ],
};

export function getGeorgiaCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return georgiaCountyTestimonials[countySlug] ?? [];
}