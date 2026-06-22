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
  allegany: [
    {
      quote:
        'C K Local Movers handled our Belmont farmhouse move with care — the crew navigated our long gravel driveway without issues and kept everything organized from load to unload.',
      name: 'Robert H.',
      location: 'Belmont, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Dan's Moving & Storage drove in from the Olean area and gave us fair pricing with professional, careful handling. Great experience for a rural Allegany County relocation.",
      name: 'Patricia M.',
      location: 'Wellsville, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Can't recommend Busy Bee enough for our Western NY move — best prices and the most efficient crew we've used in a thin rural market.",
      name: 'Daniel W.',
      location: 'Alfred, NY',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  bronx: [
    {
      quote:
        'Two Men and a Truck navigated our co-op building rules perfectly — professional crew, efficient loading, and careful handling of everything in our high-rise.',
      name: 'Maria G.',
      location: 'Riverdale, NY',
      rating: 5,
      moveType: 'High-rise',
    },
    {
      quote:
        'Gentle Giant handled our Bronx apartment move with outstanding care in tight urban spaces. Easily the smoothest borough relocation we have had.',
      name: 'James T.',
      location: 'Morris Park, NY',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Pure Moving was efficient and professional with great communication from estimate through move day. Highly recommend for Bronx residential moves.',
      name: 'Angela R.',
      location: 'Pelham Bay, NY',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  broome: [
    {
      quote:
        "Mabey's Moving handled our Vestal suburban move with a professional, reliable crew — careful handling and efficient loading from start to finish.",
      name: 'Karen S.',
      location: 'Vestal, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Don's Moving was courteous and efficient with great communication throughout our Binghamton relocation. They worked around our building's access rules without a hitch.",
      name: 'Thomas B.',
      location: 'Binghamton, NY',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        "Lamanna gave us a pleasant moving experience — courteous, professional, and right on schedule for our Endicott family home move.",
      name: 'Lisa M.',
      location: 'Endicott, NY',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  cattaraugus: [
    {
      quote:
        'C K Local Movers navigated our rural Olean-area driveway with ease — professional crew, careful handling, and fair pricing for our Cattaraugus County move.',
      name: 'William J.',
      location: 'Olean, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Mabey's Moving provided reliable, efficient service for our relocation from Little Valley. The crew was careful with everything despite the long access road.",
      name: 'Sandra P.',
      location: 'Little Valley, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Busy Bee Movers delivered the best prices and most efficient crew we've used in rural Western NY — a great experience from estimate to unload.",
      name: 'Mark D.',
      location: 'Salamanca, NY',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  cayuga: [
    {
      quote:
        'Reliable Movers handled our rural Auburn property with a professional crew — careful packing, efficient loading, and great communication throughout.',
      name: 'Christine H.',
      location: 'Auburn, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Mabey's Moving provided reliable, efficient service for our Finger Lakes-area relocation. The crew was careful with everything despite our long lakeside driveway.",
      name: 'George F.',
      location: 'Union Springs, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Busy Bee Movers delivered fair pricing and the most efficient crew we've hired in Central NY — a great experience from estimate through unload.",
      name: 'Nancy W.',
      location: 'Moravia, NY',
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