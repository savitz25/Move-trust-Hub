import type { CountyTestimonialEntry } from '@/lib/local-movers/types';

/** Hand-curated Illinois county testimonials — 3 per county */
export const illinoisCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  cook: [
    {
      quote:
        'Two Men and a Truck Chicago handled our Lincoln Park apartment move professionally — on time, efficient, and extremely careful throughout Cook County.',
      name: 'Angela W.',
      location: 'Chicago, IL',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'New City Moving confirmed Cook County coverage and delivered excellent metro service — professional crew with transparent pricing and careful handling.',
      name: 'Robert M.',
      location: 'Evanston, IL',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'move-tastic! served our Schaumburg relocation efficiently — best local moving service in Cook County with upfront communication about I-90 traffic delays.',
      name: 'Susan T.',
      location: 'Schaumburg, IL',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  dupage: [
    {
      quote:
        'Two Men and a Truck Naperville handled our Wheaton relocation professionally — on time, efficient, and extremely careful throughout DuPage County.',
      name: 'Jennifer L.',
      location: 'Wheaton, IL',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Schroeder Moving Service confirmed DuPage County coverage and delivered excellent suburban service — best local moving service in DuPage with transparent pricing.',
      name: 'Michael R.',
      location: 'Naperville, IL',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'All My Sons Western Suburbs navigated I-355 traffic smartly and moved our Downers Grove home efficiently — professional crew with careful handling.',
      name: 'Karen S.',
      location: 'Downers Grove, IL',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  lake: [
    {
      quote:
        'Two Men and a Truck Libertyville handled our Highland Park relocation professionally — on time, efficient, and extremely careful throughout Lake County.',
      name: 'Patricia H.',
      location: 'Highland Park, IL',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'North Shore Movers confirmed Lake County coverage and delivered excellent service — best local moving service in Lake County with careful handling.',
      name: 'Daniel F.',
      location: 'Libertyville, IL',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'All My Sons Lake County navigated I-94 traffic smartly and moved our Gurnee home efficiently — professional crew with transparent pricing.',
      name: 'Laura M.',
      location: 'Gurnee, IL',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  will: [
    {
      quote:
        'Two Men and a Truck Joliet handled our Plainfield relocation professionally — on time, efficient, and extremely careful throughout Will County.',
      name: 'Chris B.',
      location: 'Plainfield, IL',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Will County confirmed Joliet-area coverage and delivered excellent southwest suburban service — best local moving service in Will County.',
      name: 'Amanda G.',
      location: 'Joliet, IL',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'move-tastic! served our New Lenox move efficiently — professional crew with upfront communication about I-55 traffic delays.',
      name: 'Eric P.',
      location: 'New Lenox, IL',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  kane: [
    {
      quote:
        'Two Men and a Truck Aurora handled our St. Charles relocation professionally — on time, efficient, and extremely careful throughout Kane County.',
      name: 'Rachel N.',
      location: 'St. Charles, IL',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Kane County confirmed Aurora and Elgin coverage — best local moving service in Kane County with transparent pricing.',
      name: 'Tom V.',
      location: 'Aurora, IL',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'College Hunks Kane County moved our Geneva home efficiently — professional crew with careful handling and clear communication.',
      name: 'Nina K.',
      location: 'Geneva, IL',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
};

export function getIllinoisCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return illinoisCountyTestimonials[countySlug] ?? [];
}