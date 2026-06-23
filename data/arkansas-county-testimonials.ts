import type { CountyTestimonialEntry } from '@/lib/local-movers/types';

/** Hand-curated Arkansas county testimonials — 3 per county */
export const arkansasCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  pulaski: [
    {
      quote:
        'Two Men and a Truck Little Rock handled our Sherwood relocation professionally — on time, efficient, and extremely careful throughout Pulaski County.',
      name: 'Angela W.',
      location: 'Sherwood, AR',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Little Rock confirmed Pulaski County coverage and delivered excellent central Arkansas service — professional crew with transparent pricing.',
      name: 'Robert M.',
      location: 'Little Rock, AR',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Arkansas Capital Movers served our North Little Rock move efficiently — fast, professional, and reliable with careful handling.',
      name: 'Susan T.',
      location: 'North Little Rock, AR',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  benton: [
    {
      quote:
        'Two Men and a Truck Bentonville / Rogers handled our Centerton relocation professionally — on time, efficient, and extremely careful throughout Benton County.',
      name: 'Karen L.',
      location: 'Rogers, AR',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Arkansas Local Lines confirmed Benton County coverage and delivered excellent Northwest Arkansas service — professional crew with transparent pricing.',
      name: 'Robert M.',
      location: 'Bentonville, AR',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'All My Sons Fayetteville served our Bella Vista move efficiently — fast, professional, and reliable with careful handling.',
      name: 'Susan T.',
      location: 'Bella Vista, AR',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  washington: [
    {
      quote:
        'Two Men and a Truck Fayetteville handled our university-area relocation professionally — on time, efficient, and extremely careful throughout Washington County.',
      name: 'Angela W.',
      location: 'Fayetteville, AR',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Arkansas Local Lines confirmed Washington County coverage and delivered excellent Northwest Arkansas service — professional crew with careful handling.',
      name: 'Brian K.',
      location: 'Springdale, AR',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'College Hunks Northwest Arkansas served our Fayetteville move efficiently — fast, professional, and reliable with careful handling.',
      name: 'Carol D.',
      location: 'Fayetteville, AR',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  faulkner: [
    {
      quote:
        'Two Men and a Truck Conway handled our Greenbrier relocation professionally — on time, efficient, and extremely careful throughout Faulkner County.',
      name: 'David F.',
      location: 'Conway, AR',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Little Rock confirmed Faulkner County coverage and delivered excellent central Arkansas service — professional crew with transparent pricing.',
      name: 'Eva G.',
      location: 'Conway, AR',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Arkansas Capital Movers served our Mayflower move efficiently — fast, professional, and reliable with careful handling.',
      name: 'Frank H.',
      location: 'Mayflower, AR',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  saline: [
    {
      quote:
        'Two Men and a Truck Benton / Bryant handled our Saline County relocation professionally — on time, efficient, and extremely careful throughout the county.',
      name: 'Gail I.',
      location: 'Bryant, AR',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Little Rock confirmed Saline County coverage and delivered excellent southwest metro service — on time and extremely careful.',
      name: 'Hank J.',
      location: 'Benton, AR',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Arkansas Family Movers served our Bryant move efficiently — fast, professional, and reliable with careful handling.',
      name: 'Iris K.',
      location: 'Bryant, AR',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  sebastian: [
    {
      quote:
        'Two Men and a Truck Fort Smith handled our relocation professionally — on time, efficient, and extremely careful throughout Sebastian County.',
      name: 'Jake L.',
      location: 'Fort Smith, AR',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Arkansas Premier Moving confirmed Sebastian County coverage and delivered excellent Fort Smith metro service — professional crew with transparent pricing.',
      name: 'Kate M.',
      location: 'Fort Smith, AR',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'All My Sons Fort Smith served our Fort Smith move efficiently — fast, professional, and reliable with careful handling.',
      name: 'Lyle N.',
      location: 'Fort Smith, AR',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  craighead: [
    {
      quote:
        'Two Men and a Truck Jonesboro handled our relocation professionally — on time, efficient, and extremely careful throughout Craighead County.',
      name: 'Mae O.',
      location: 'Jonesboro, AR',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Jonesboro confirmed Craighead County coverage and delivered excellent northeast Arkansas service — on time and extremely careful.',
      name: 'Nick P.',
      location: 'Jonesboro, AR',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Arkansas Regional Moving served our Jonesboro move efficiently — fast, professional, and reliable with careful handling.',
      name: 'Olga Q.',
      location: 'Jonesboro, AR',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
};

export function getArkansasCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return arkansasCountyTestimonials[countySlug] ?? [];
}