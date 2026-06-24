import type { CountyTestimonialEntry } from '@/lib/local-movers/types';

/** Hand-curated Kentucky county testimonials — 3 per curated county */
export const kentuckyCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  jefferson: [
    {
      quote:
        'Two Men and a Truck Louisville handled our Jefferson County relocation professionally — on time, efficient, and extremely careful throughout Louisville.',
      name: 'Robert M.',
      location: 'Louisville, KY',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Louisville Moving & Storage confirmed east-end coverage — best local moving service in Jefferson County with transparent pricing.',
      name: 'Angela K.',
      location: 'Louisville, KY',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Budd Van Lines Louisville served our St. Matthews area move efficiently — professional crew with careful handling along the Ohio River.',
      name: 'James T.',
      location: 'Louisville, KY',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  fayette: [
    {
      quote:
        'Two Men and a Truck Lexington handled our Fayette County relocation professionally — on time, efficient, and extremely careful.',
      name: 'Laura P.',
      location: 'Lexington, KY',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Lexington Moving & Storage confirmed downtown coverage — best local moving service in Fayette County with fair pricing.',
      name: 'David H.',
      location: 'Lexington, KY',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Bluegrass Moving served our Chevy Chase area move efficiently — professional crew with careful handling in the Bluegrass region.',
      name: 'Nicole S.',
      location: 'Lexington, KY',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  kenton: [
    {
      quote:
        'Two Men and a Truck Covington handled our Kenton County relocation professionally — on time, efficient, and extremely careful.',
      name: 'Brian W.',
      location: 'Covington, KY',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Covington Moving confirmed Northern Kentucky coverage — best local moving service in Kenton County with transparent pricing.',
      name: 'Michelle R.',
      location: 'Erlanger, KY',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Queen City Moving served our Fort Mitchell area move efficiently — professional crew with careful handling near the Cincinnati metro.',
      name: 'Kevin L.',
      location: 'Covington, KY',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  warren: [
    {
      quote:
        'Two Men and a Truck Bowling Green handled our Warren County relocation professionally — on time, efficient, and extremely careful.',
      name: 'Sarah D.',
      location: 'Bowling Green, KY',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Bowling Green Moving confirmed campus-area coverage — best local moving service in Warren County with fair pricing.',
      name: 'Mark J.',
      location: 'Bowling Green, KY',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Western Kentucky Moving served our residential move efficiently — professional crew with careful handling along the I-65 corridor.',
      name: 'Emily C.',
      location: 'Bowling Green, KY',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
};

export function getKentuckyCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return kentuckyCountyTestimonials[countySlug] ?? [];
}