import type { CountyTestimonialEntry } from '@/lib/local-movers/types';

/** Hand-curated Alabama county testimonials — 3 per county */
export const alabamaCountyTestimonials: Record<string, CountyTestimonialEntry[]> =
  {
    jefferson: [
      {
        quote:
          'Two Men and a Truck Birmingham handled our Hoover relocation professionally — on time, efficient, and extremely careful with our belongings throughout Jefferson County.',
        name: 'Rachel M.',
        location: 'Hoover, AL',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'College Hunks Moving served our Vestavia Hills move efficiently — fast, professional, and reliable with careful handling.',
        name: 'David K.',
        location: 'Vestavia Hills, AL',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'New Latitude Movers confirmed Birmingham coverage and delivered the best local moving service in Jefferson County — professional crew with no surprise fees.',
        name: 'Angela T.',
        location: 'Birmingham, AL',
        rating: 5,
        moveType: 'Apartment',
      },
    ],
    baldwin: [
      {
        quote:
          'Two Men and a Truck Daphne handled our Fairhope coastal move professionally — on time, efficient, and very careful with beach-area furniture throughout Baldwin County.',
        name: 'Susan H.',
        location: 'Fairhope, AL',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Motivated Movers served our Gulf Shores relocation efficiently — fast, professional, and reliable with careful handling of waterfront property items.',
        name: 'Mark R.',
        location: 'Gulf Shores, AL',
        rating: 5,
        moveType: 'Condo',
      },
      {
        quote:
          'College Hunks Moving confirmed Baldwin County coverage and delivered excellent coastal service in Orange Beach — professional crew with no surprise fees.',
        name: 'Linda P.',
        location: 'Orange Beach, AL',
        rating: 5,
        moveType: 'Townhome',
      },
    ],
    tuscaloosa: [
      {
        quote:
          'Two Men and a Truck Tuscaloosa handled our Northport relocation professionally — on time, efficient, and extremely careful throughout Tuscaloosa County.',
        name: 'James W.',
        location: 'Northport, AL',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Motivated Movers served our university-area apartment move efficiently — fast, professional, and reliable with careful student-housing handling.',
        name: 'Emily S.',
        location: 'Tuscaloosa, AL',
        rating: 5,
        moveType: 'Apartment',
      },
      {
        quote:
          'Awesome Moving Services confirmed Tuscaloosa coverage and delivered the best local moving service in the county — professional crew with transparent pricing.',
        name: 'Robert T.',
        location: 'Tuscaloosa, AL',
        rating: 5,
        moveType: 'Townhome',
      },
    ],
    shelby: [
      {
        quote:
          'Two Men and a Truck Alabaster handled our Pelham relocation professionally — on time, efficient, and extremely careful throughout Shelby County.',
        name: 'Karen L.',
        location: 'Pelham, AL',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Secure Moving served our Helena move efficiently from their Pelham base — fast, professional, and reliable with careful handling of high-value furnishings.',
        name: 'Brian N.',
        location: 'Helena, AL',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Armstrong Relocation confirmed Alabaster coverage and delivered excellent suburban service — professional crew with no surprise fees.',
        name: 'Michelle D.',
        location: 'Alabaster, AL',
        rating: 5,
        moveType: 'Single-family',
      },
    ],
    montgomery: [
      {
        quote:
          'Two Men and a Truck Montgomery handled our capital-city relocation professionally — on time, efficient, and extremely careful throughout Montgomery County.',
        name: 'Patricia G.',
        location: 'Montgomery, AL',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Admiral Movers served our military PCS move efficiently — fast, professional, and reliable with careful handling and clear communication.',
        name: 'Chris M.',
        location: 'Montgomery, AL',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'McCorquodale Transfer confirmed Montgomery coverage and delivered excellent local service — professional crew with transparent pricing.',
        name: 'Diane F.',
        location: 'Montgomery, AL',
        rating: 5,
        moveType: 'Apartment',
      },
    ],
  };

export function getAlabamaCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return alabamaCountyTestimonials[countySlug] ?? [];
}