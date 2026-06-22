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
  hamilton: [
    {
      quote:
        'Stafford Moving handled our remote Indian Lake property professionally — careful service despite challenging Adirondack access and winter timing.',
      name: 'Glen M.',
      location: 'Indian Lake, NY',
      rating: 5,
      moveType: 'Seasonal',
    },
    {
      quote:
        'Reliable Movers drove in from the Utica corridor with efficient crews and fair pricing for our Lake Pleasant relocation.',
      name: 'Nancy F.',
      location: 'Lake Pleasant, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Mabey's Moving provided dependable regional support for our Hamilton County move — great communication throughout.",
      name: 'Harold J.',
      location: 'Long Lake, NY',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  herkimer: [
    {
      quote:
        'Reliable Movers handled our Herkimer rural move professionally — efficient crew and careful handling despite our long driveway.',
      name: 'Karen S.',
      location: 'Herkimer, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Mabey's Moving provided reliable regional service for our Little Falls relocation — courteous crews and solid communication.",
      name: 'Frank D.',
      location: 'Little Falls, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Don's Moving crew was efficient and careful for our Mohawk Valley move — a pleasant experience from estimate to unload.",
      name: 'Sandra P.',
      location: 'Mohawk, NY',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  jefferson: [
    {
      quote:
        'Pinnacle Moving handled our Fort Drum PCS move flawlessly — professional military logistics and careful handling throughout.',
      name: 'Jason W.',
      location: 'Fort Drum, NY',
      rating: 5,
      moveType: 'Military',
    },
    {
      quote:
        'Reliable Movers provided dependable regional service for our Watertown lakeside relocation despite harsh winter conditions.',
      name: 'Melissa R.',
      location: 'Watertown, NY',
      rating: 5,
      moveType: 'Lakeside',
    },
    {
      quote:
        "Mabey's Moving crew was courteous and efficient with great communication for our Jefferson County family home move.",
      name: 'Brian T.',
      location: 'Carthage, NY',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  kings: [
    {
      quote:
        'Piece of Cake navigated our Park Slope brownstone move flawlessly — professional crew, transparent pricing, and careful handling on a tight stair carry.',
      name: 'Rachel M.',
      location: 'Park Slope, NY',
      rating: 5,
      moveType: 'Brownstone',
    },
    {
      quote:
        'Booth Movers handled our Williamsburg high-rise with outstanding care — building COI, elevator reservation, and freight timing all coordinated perfectly.',
      name: 'David L.',
      location: 'Williamsburg, NY',
      rating: 5,
      moveType: 'High-rise',
    },
    {
      quote:
        'Gentle Giant exceeded expectations on our Bay Ridge apartment move — careful in tight urban spaces and efficient from quote through completion.',
      name: 'Priya S.',
      location: 'Bay Ridge, NY',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  lewis: [
    {
      quote:
        'Pinnacle Moving handled our Lowville rural relocation professionally — careful handling despite challenging northern access and winter timing.',
      name: 'Roger H.',
      location: 'Lowville, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'Reliable Movers drove in from the Utica corridor with efficient crews and fair pricing for our Lewis County move.',
      name: 'Donna W.',
      location: 'Castorland, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Mabey's Moving provided dependable regional service for our Black River Valley relocation — great communication throughout.",
      name: 'Keith B.',
      location: 'Turin, NY',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  livingston: [
    {
      quote:
        'Rochester Moving & Storage handled our Geneseo move professionally — efficient crew and careful handling for our rural property near SUNY Geneseo.',
      name: 'Laura P.',
      location: 'Geneseo, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Mabey's Moving provided reliable regional service for our Livingston County farm-property relocation.",
      name: 'George F.',
      location: 'Dansville, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Don's Moving crew was courteous and efficient with great communication for our Mount Morris move.",
      name: 'Helen C.',
      location: 'Mount Morris, NY',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  madison: [
    {
      quote:
        'Reliable Movers handled our Hamilton Colgate-area move professionally — efficient crew despite rural access and semester timing.',
      name: 'Chris A.',
      location: 'Hamilton, NY',
      rating: 5,
      moveType: 'University',
    },
    {
      quote:
        "Mabey's Moving provided dependable regional service for our Oneida Lake-area relocation.",
      name: 'Patricia N.',
      location: 'Oneida, NY',
      rating: 5,
      moveType: 'Lakeside',
    },
    {
      quote:
        "Dimon & Bacorn's crew was careful and efficient for our Madison County rural move — solid regional support from Central New York.",
      name: 'Mark R.',
      location: 'Cazenovia, NY',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  monroe: [
    {
      quote:
        "Mabey's Moving provided professional, reliable service for our Rochester suburban relocation — efficient crews and careful handling throughout.",
      name: 'Steven K.',
      location: 'Henrietta, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'Rochester Moving & Storage handled our Greece family home move flawlessly — great communication and careful loading despite lakefront access planning.',
      name: 'Nicole D.',
      location: 'Greece, NY',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        "Don's Moving crew was courteous and efficient with outstanding communication for our Irondequoit apartment relocation.",
      name: 'Andrew M.',
      location: 'Irondequoit, NY',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  montgomery: [
    {
      quote:
        "Mabey's Moving handled our Amsterdam rural move professionally — efficient crew despite Mohawk Valley access challenges.",
      name: 'Betty L.',
      location: 'Amsterdam, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'Reliable Movers provided dependable regional service for our Canajoharie relocation — fair pricing and careful handling.',
      name: 'Donald S.',
      location: 'Canajoharie, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Lamanna's crew was courteous and right on schedule for our Montgomery County move — pleasant Albany-area regional support.",
      name: 'Janice R.',
      location: 'Fonda, NY',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  nassau: [
    {
      quote:
        'Piece of Cake made our Garden City move stress-free — professional crew, transparent pricing, and excellent HOA coordination.',
      name: 'Jennifer H.',
      location: 'Garden City, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'Booth Movers handled our Oyster Bay colonial with outstanding care — professional, careful, and respectful of our high-value furnishings.',
      name: 'Robert F.',
      location: 'Oyster Bay, NY',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Gentle Giant exceeded expectations on our Great Neck condo move — careful in tight suburban spaces and efficient from quote through completion.',
      name: 'Sandra W.',
      location: 'Great Neck, NY',
      rating: 5,
      moveType: 'Condo',
    },
  ],
  'new-york': [
    {
      quote:
        'Piece of Cake navigated our Upper East Side co-op flawlessly — COI, elevator reservation, and freight timing all handled professionally.',
      name: 'Catherine B.',
      location: 'Upper East Side, NY',
      rating: 5,
      moveType: 'High-rise',
    },
    {
      quote:
        'Booth Movers handled our West Village brownstone with outstanding care — professional crew in tight urban spaces and transparent pricing throughout.',
      name: 'Michael T.',
      location: 'West Village, NY',
      rating: 5,
      moveType: 'Brownstone',
    },
    {
      quote:
        'Gentle Giant exceeded expectations on our Midtown high-rise move — careful handling and efficient from quote through completion despite building restrictions.',
      name: 'Aisha K.',
      location: 'Midtown, NY',
      rating: 5,
      moveType: 'High-rise',
    },
  ],
  niagara: [
    {
      quote:
        "Mabey's Moving provided professional, reliable service for our Lockport suburban relocation — efficient crews and careful handling throughout.",
      name: 'Gary P.',
      location: 'Lockport, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'Corrigan Moving handled our Niagara Falls move flawlessly — great communication and careful loading despite tourist-area traffic and seasonal timing.',
      name: 'Linda M.',
      location: 'Niagara Falls, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Two Men and a Truck navigated our North Tonawanda family home move with an efficient, courteous crew — easily our best Western NY experience.",
      name: 'Kevin R.',
      location: 'North Tonawanda, NY',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  oneida: [
    {
      quote:
        'Reliable Movers handled our Utica historic-district move professionally — careful handling of original woodwork and efficient loading throughout.',
      name: 'Maria S.',
      location: 'Utica, NY',
      rating: 5,
      moveType: 'Historic home',
    },
    {
      quote:
        "Mabey's Moving provided dependable regional service for our Rome relocation — courteous crews and solid communication.",
      name: 'James W.',
      location: 'Rome, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Don's Moving crew was efficient and careful for our Oneida County rural move — pleasant Mohawk Valley experience from estimate to unload.",
      name: 'Susan T.',
      location: 'New Hartford, NY',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  onondaga: [
    {
      quote:
        'Reliable Movers handled our Syracuse suburban move flawlessly — professional crew, fair pricing, and careful handling near the university area.',
      name: 'Daniel F.',
      location: 'Syracuse, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Mabey's Moving provided reliable regional service for our Cicero relocation — efficient crews and great communication throughout.",
      name: 'Amy B.',
      location: 'Cicero, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Lamanna's crew was courteous and right on schedule for our Clay family home move — solid Capital District regional support.",
      name: 'Robert H.',
      location: 'Clay, NY',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  ontario: [
    {
      quote:
        'Rochester Moving & Storage handled our Canandaigua lakeside property with care — professional crew despite water-adjacent access and seasonal timing.',
      name: 'Elizabeth C.',
      location: 'Canandaigua, NY',
      rating: 5,
      moveType: 'Lakeside',
    },
    {
      quote:
        "Mabey's Moving provided reliable regional service for our Geneva winery-area relocation — careful handling throughout.",
      name: 'Thomas N.',
      location: 'Geneva, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Don's Moving crew was courteous and efficient with great communication for our Ontario County second-home move.",
      name: 'Carol D.',
      location: 'Victor, NY',
      rating: 5,
      moveType: 'Seasonal',
    },
  ],
  orange: [
    {
      quote:
        'Piece of Cake made our Newburgh move stress-free — professional crew, transparent pricing, and excellent coordination for our suburban HOA.',
      name: 'Victoria L.',
      location: 'Newburgh, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'Booth Movers handled our Middletown family home with outstanding care — professional, efficient, and respectful of our high-value furnishings.',
      name: 'Charles M.',
      location: 'Middletown, NY',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Triangle Movers provided solid Hudson Valley regional service for our Goshen relocation — careful handling near West Point commuter corridors.',
      name: 'Nancy J.',
      location: 'Goshen, NY',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  orleans: [
    {
      quote:
        'Rochester Moving & Storage handled our Albion rural move professionally — efficient crew despite agricultural-property access challenges.',
      name: 'Wayne G.',
      location: 'Albion, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'Corrigan Moving provided reliable Western NY service for our Medina relocation — courteous crews and careful handling throughout.',
      name: 'Diane P.',
      location: 'Medina, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Mabey's Moving crew was efficient and careful for our Orleans County move — great regional support from the Capital District.",
      name: 'Raymond K.',
      location: 'Holley, NY',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  oswego: [
    {
      quote:
        'Reliable Movers handled our Oswego lakeside move professionally — careful planning for Lake Ontario access and winter weather windows.',
      name: 'Barbara S.',
      location: 'Oswego, NY',
      rating: 5,
      moveType: 'Lakeside',
    },
    {
      quote:
        "Mabey's Moving provided dependable regional service for our Fulton port-area relocation — efficient crews and solid communication.",
      name: 'Donald E.',
      location: 'Fulton, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Don's Moving crew was courteous and careful for our Oswego County rural move — pleasant experience from estimate to unload.",
      name: 'Janet W.',
      location: 'Mexico, NY',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  otsego: [
    {
      quote:
        'Dimon & Bacorn handled our Cooperstown historic home with preservation-sensitive care — professional crew despite tight village access.',
      name: 'Eleanor R.',
      location: 'Cooperstown, NY',
      rating: 5,
      moveType: 'Historic home',
    },
    {
      quote:
        'Reliable Movers provided dependable regional service for our Oneonta-area relocation — efficient and careful throughout.',
      name: 'Philip A.',
      location: 'Oneonta, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Mabey's Moving crew was courteous and efficient with great communication for our Otsego County tourist-season move.",
      name: 'Margaret T.',
      location: 'Milford, NY',
      rating: 5,
      moveType: 'Seasonal',
    },
  ],
  putnam: [
    {
      quote:
        'Piece of Cake made our Carmel move stress-free — professional crew, transparent pricing, and excellent HOA coordination in the Hudson Highlands.',
      name: 'Laura B.',
      location: 'Carmel, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'Booth Movers handled our Mahopac family home with outstanding care — professional, careful, and respectful of our upscale suburban property.',
      name: 'Richard G.',
      location: 'Mahopac, NY',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Triangle Movers provided solid Hudson Valley regional service for our Brewster relocation despite Taconic Parkway traffic windows.',
      name: 'Karen M.',
      location: 'Brewster, NY',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  rensselaer: [
    {
      quote:
        "Mabey's Moving handled our Troy historic neighborhood move with preservation-sensitive care — professional crew and efficient loading throughout.",
      name: 'William S.',
      location: 'Troy, NY',
      rating: 5,
      moveType: 'Historic home',
    },
    {
      quote:
        "Lamanna's crew was courteous and right on schedule for our East Greenbush relocation — a pleasant Capital District moving experience.",
      name: 'Diane H.',
      location: 'East Greenbush, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Don's Moving provided reliable service with great communication for our Rensselaer County family home move.",
      name: 'Paul J.',
      location: 'Brunswick, NY',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  rockland: [
    {
      quote:
        'Piece of Cake made our New City move stress-free — professional crew, transparent pricing, and excellent village move-in coordination.',
      name: 'Michelle A.',
      location: 'New City, NY',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'Booth Movers handled our Nyack home with outstanding care — professional, efficient, and respectful of our high-value furnishings.',
      name: 'Steven C.',
      location: 'Nyack, NY',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Optimum Moving exceeded expectations on our Spring Valley condo move — five-star service from quote through completion.',
      name: 'Angela R.',
      location: 'Spring Valley, NY',
      rating: 5,
      moveType: 'Condo',
    },
  ],
  queens: [
    {
      quote:
        'Piece of Cake navigated our Long Island City high-rise flawlessly — COI, elevator reservation, and freight timing all handled professionally.',
      name: 'Maria G.',
      location: 'Long Island City, NY',
      rating: 5,
      moveType: 'High-rise',
    },
    {
      quote:
        'Booth Movers handled our Forest Hills single-family home with outstanding care — professional crew despite tight street parking and building access rules.',
      name: 'James L.',
      location: 'Forest Hills, NY',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Gentle Giant exceeded expectations on our Bayside apartment move — careful in tight urban spaces and efficient from quote through completion.',
      name: 'Priya N.',
      location: 'Bayside, NY',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
};

export function getNewYorkCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return newYorkCountyTestimonials[countySlug] ?? [];
}