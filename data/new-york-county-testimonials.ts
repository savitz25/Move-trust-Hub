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
  chautauqua: [
    {
      quote:
        "Dan's Moving & Storage handled our Chautauqua Lake property with a professional crew — careful with lakefront access and efficient from load to unload.",
      name: 'Richard K.',
      location: 'Bemus Point, NY',
      rating: 5,
      moveType: 'Lakeside',
    },
    {
      quote:
        "Mabey's Moving provided reliable, efficient service for our Jamestown relocation. The crew navigated our rural driveway without issues.",
      name: 'Laura S.',
      location: 'Jamestown, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Busy Bee Movers delivered fair pricing and the most efficient crew we've used in Western NY — a great experience for our Mayville-area move.",
      name: 'Steven C.',
      location: 'Mayville, NY',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  chemung: [
    {
      quote:
        'Naglee Moving handled our Elmira family relocation efficiently — professional crew, careful handling, and great communication from start to finish.',
      name: 'Brian T.',
      location: 'Elmira, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Mabey's Moving provided reliable service for our Horseheads move. The crew was efficient and careful with everything despite our tight timeline.",
      name: 'Diane R.',
      location: 'Horseheads, NY',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        "Busy Bee Movers delivered the best prices and most efficient crew we've used in the Southern Tier — a great experience for our Big Flats relocation.",
      name: 'Kevin M.',
      location: 'Big Flats, NY',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  chenango: [
    {
      quote:
        'Dimon & Bacorn handled our rural Norwich move professionally — careful crew, efficient loading, and great communication despite our long driveway.',
      name: 'Helen P.',
      location: 'Norwich, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Mabey's Moving provided reliable service for our Chenango County relocation. Efficient crews and careful handling throughout.",
      name: 'Frank D.',
      location: 'Sherburne, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Busy Bee Movers delivered fair pricing and efficient service — the best regional option we've found for our Southern Tier move.",
      name: 'Carol B.',
      location: 'Greene, NY',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  clinton: [
    {
      quote:
        'Stafford Moving handled our Plattsburgh relocation with a professional northern crew — careful handling and solid communication despite winter timing.',
      name: 'Scott A.',
      location: 'Plattsburgh, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Mabey's Moving provided reliable service for our Lake Champlain-area move. The crew was efficient and careful with our belongings.",
      name: 'Michelle K.',
      location: 'Champlain, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Don's Moving crew was courteous and efficient with great communication throughout our Clinton County relocation.",
      name: 'Robert N.',
      location: 'Mooers, NY',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  columbia: [
    {
      quote:
        'Triangle Movers handled our historic Hudson home with preservation-sensitive care — professional, efficient, and respectful of original woodwork.',
      name: 'Eleanor W.',
      location: 'Hudson, NY',
      rating: 5,
      moveType: 'Historic home',
    },
    {
      quote:
        "Mabey's Moving provided reliable service for our Columbia County second-home relocation. Careful handling from load to unload.",
      name: 'Philip H.',
      location: 'Kinderhook, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Lamanna's crew was courteous and professional — a pleasant moving experience for our Hudson Valley family home.",
      name: 'Rachel S.',
      location: 'Chatham, NY',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  cortland: [
    {
      quote:
        'Reliable Movers handled our Cortland move professionally — efficient crew and careful handling despite our rural driveway near SUNY Cortland.',
      name: 'Amy L.',
      location: 'Cortland, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Mabey's Moving provided reliable regional service for our Homer relocation. Great communication and efficient crews.",
      name: 'John C.',
      location: 'Homer, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Busy Bee Movers delivered fair pricing and efficient service for our Central NY move — best regional option we've found.",
      name: 'Sandra M.',
      location: 'Marathon, NY',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  delaware: [
    {
      quote:
        'Dimon & Bacorn navigated our rural Delhi property with a professional crew — careful handling despite challenging Catskill access.',
      name: 'Peter W.',
      location: 'Delhi, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Triangle Movers provided solid regional service for our Walton relocation. Professional and efficient throughout.",
      name: 'Linda K.',
      location: 'Walton, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Don's Moving crew was courteous and careful — great communication for our remote Delaware County move.",
      name: 'Henry B.',
      location: 'Margaretville, NY',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  dutchess: [
    {
      quote:
        'Piece of Cake made our Poughkeepsie move stress-free — professional crew, transparent pricing, and excellent care for our belongings.',
      name: 'Victoria N.',
      location: 'Poughkeepsie, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'Booth Movers handled our historic Hyde Park home with outstanding care — professional, careful, and respectful of original details.',
      name: 'Charles E.',
      location: 'Hyde Park, NY',
      rating: 5,
      moveType: 'Historic home',
    },
    {
      quote:
        'Triangle Movers was efficient and professional with great communication throughout our Beacon apartment relocation.',
      name: 'Olivia T.',
      location: 'Beacon, NY',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  erie: [
    {
      quote:
        "Mabey's Moving provided professional, reliable service for our Amherst relocation — efficient crews and careful handling throughout.",
      name: 'David K.',
      location: 'Amherst, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'Corrigan Moving Systems handled our Buffalo high-rise move flawlessly — great communication and careful loading despite building restrictions.',
      name: 'Nicole P.',
      location: 'Buffalo, NY',
      rating: 5,
      moveType: 'High-rise',
    },
    {
      quote:
        "Two Men and a Truck navigated our Cheektowaga family home move with an efficient, courteous crew — easily our best Western NY experience.",
      name: 'James R.',
      location: 'Cheektowaga, NY',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  essex: [
    {
      quote:
        'Stafford Moving handled our Lake Placid seasonal property with a professional crew — careful in challenging mountain conditions.',
      name: 'Barbara F.',
      location: 'Lake Placid, NY',
      rating: 5,
      moveType: 'Lakeside',
    },
    {
      quote:
        "Mabey's Moving provided reliable regional service for our Elizabethtown relocation despite remote Adirondack access.",
      name: 'Greg T.',
      location: 'Elizabethtown, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Busy Bee Movers delivered efficient service and fair pricing for our Essex County move — great regional support.",
      name: 'Anne L.',
      location: 'Keene, NY',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  franklin: [
    {
      quote:
        'Stafford Moving handled our Malone relocation professionally — careful handling in rural northern conditions.',
      name: 'Wayne H.',
      location: 'Malone, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Don's Moving crew was courteous and efficient with great communication for our Franklin County move.",
      name: 'Janet C.',
      location: 'Saranac Lake, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Arnoff Moving provided reliable service and careful handling for our northern Adirondack relocation.",
      name: 'Paul S.',
      location: 'Tupper Lake, NY',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  fulton: [
    {
      quote:
        "Mabey's Moving handled our Johnstown rural move professionally — efficient crew and careful handling despite our long driveway.",
      name: 'Ruth A.',
      location: 'Johnstown, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Lamanna's crew was courteous and right on schedule for our Gloversville relocation — a pleasant Mohawk Valley moving experience.",
      name: 'Edward M.',
      location: 'Gloversville, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Don's Moving provided reliable regional service with great communication throughout our Fulton County move.",
      name: 'Sharon D.',
      location: 'Broadalbin, NY',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  genesee: [
    {
      quote:
        'Corrigan Moving handled our Batavia relocation with a professional crew — careful handling for our rural agricultural property.',
      name: 'Tom G.',
      location: 'Batavia, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Mabey's Moving provided reliable regional service for our Genesee County move — efficient and careful throughout.",
      name: 'Betty N.',
      location: 'Le Roy, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Dan's Moving & Storage drove in from Western NY with fair pricing and professional service for our Batavia-area move.",
      name: 'Carl J.',
      location: 'Bergen, NY',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  greene: [
    {
      quote:
        'Triangle Movers handled our Catskill mountain property with care — professional crew despite steep access and seasonal timing.',
      name: 'Martha W.',
      location: 'Catskill, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Mabey's Moving provided reliable regional service for our Hunter-area second-home relocation.",
      name: 'Richard B.',
      location: 'Hunter, NY',
      rating: 5,
      moveType: 'Seasonal',
    },
    {
      quote:
        "Lamanna's crew was efficient and careful for our Greene County move — great Albany-area regional support.",
      name: 'Diana K.',
      location: 'Coxsackie, NY',
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