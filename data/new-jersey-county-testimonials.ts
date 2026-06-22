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
  'cape-may': [
    {
      quote:
        'SeaCure handled our Cape May beach house move with real coastal know-how — on time, careful with elevated porch furniture, and they finished early enough to issue a refund on the estimate.',
      name: 'Linda K.',
      location: 'Cape May, NJ',
      rating: 5,
      moveType: 'Coastal',
    },
    {
      quote:
        'Piece of Cake made our Wildwood seasonal property relocation predictable with flat-fee pricing. The crew protected floors from sand tracked in and coordinated bridge traffic timing perfectly.',
      name: 'Chris D.',
      location: 'Wildwood, NJ',
      rating: 5,
      moveType: 'Seasonal',
    },
    {
      quote:
        'White Glove Moving treated our Ocean City waterfront condo like a premium job — elevator mats, careful wrapping, and everything arrived perfectly despite a busy summer weekend.',
      name: 'Janet R.',
      location: 'Ocean City, NJ',
      rating: 5,
      moveType: 'Condo',
    },
  ],
  cumberland: [
    {
      quote:
        'Piece of Cake handled our Bridgeton family move with flat-fee pricing that stayed transparent. The crew was professional and stress-free even with a long rural driveway and extra farm shed items.',
      name: 'Harold W.',
      location: 'Bridgeton, NJ',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'SeaCure drove out to Vineland and finished faster than estimated — careful with our belongings, polite crew, and we received a refund for the time saved.',
      name: 'Diane C.',
      location: 'Vineland, NJ',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'Booth Movers did an outstanding job on our Cumberland County relocation — professional, on time, and careful with both house furniture and workshop equipment.',
      name: 'Kevin M.',
      location: 'Millville, NJ',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  essex: [
    {
      quote:
        'Booth Movers handled our Montclair colonial with outstanding care — professional, on time, and no damage through a tight suburban street with limited parking near the Parkway.',
      name: 'Priya N.',
      location: 'Montclair, NJ',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Piece of Cake made our Newark high-rise move stress-free with transparent flat-fee pricing. The crew coordinated elevator reservations and building approvals without a hitch.',
      name: 'Andre J.',
      location: 'Newark, NJ',
      rating: 5,
      moveType: 'High-rise',
    },
    {
      quote:
        'Movers 201 quoted one price and stuck to it — no funny business. Professional, courteous, and fast through our Millburn relocation despite heavy I-280 traffic.',
      name: 'Susan L.',
      location: 'Millburn, NJ',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  gloucester: [
    {
      quote:
        'Piece of Cake handled our Mullica Hill townhome with flat-fee pricing that never changed. Professional, stress-free crew through a new development with strict HOA move-in rules.',
      name: 'Brian T.',
      location: 'Mullica Hill, NJ',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'SeaCure drove out to Glassboro and finished ahead of schedule — careful with our belongings, polite crew, and we received a refund for finishing early.',
      name: 'Lisa P.',
      location: 'Glassboro, NJ',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'Booth Movers did an outstanding job near Woodbury — professional, on time, and careful with both house furniture and items from our longer rural driveway.',
      name: 'Mark S.',
      location: 'Deptford, NJ',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  hudson: [
    {
      quote:
        'Piece of Cake made our Jersey City high-rise move stress-free with flat-fee pricing. The crew coordinated elevator reservations and building approvals without delays near the waterfront.',
      name: 'Carlos M.',
      location: 'Jersey City, NJ',
      rating: 5,
      moveType: 'High-rise',
    },
    {
      quote:
        'Booth Movers handled our Hoboken condo relocation with outstanding care — professional, on time, and careful through tight PATH-adjacent streets and limited parking.',
      name: 'Emily F.',
      location: 'Hoboken, NJ',
      rating: 5,
      moveType: 'Condo',
    },
    {
      quote:
        'Movers 201 quoted one price and delivered — no funny business. Professional, courteous, and fast through our Union City apartment move despite heavy Turnpike traffic.',
      name: 'Raj K.',
      location: 'Union City, NJ',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  hunterdon: [
    {
      quote:
        'Piece of Cake handled our Flemington historic home move with flat-fee pricing that stayed predictable. The crew was careful with original hardwood floors and a long gravel driveway.',
      name: 'Catherine B.',
      location: 'Flemington, NJ',
      rating: 5,
      moveType: 'Historic home',
    },
    {
      quote:
        'Booth Movers did an outstanding job on our Clinton family relocation — professional, on time, and careful with both house furniture and barn equipment.',
      name: 'William D.',
      location: 'Clinton, NJ',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Movers 201 quoted one price and stuck to it through our Lambertville-area move. Professional, courteous, and fast despite I-78 commuter traffic.',
      name: 'Helen R.',
      location: 'Lambertville, NJ',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  mercer: [
    {
      quote:
        'Piece of Cake handled our Princeton faculty housing move with flat-fee pricing that stayed predictable. Professional crew coordinated HOA rules and parking near campus without stress.',
      name: 'Dr. Alan W.',
      location: 'Princeton, NJ',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'Booth Movers did an outstanding job on our Trenton family relocation — careful, on time, and professional through a busy capital-city street with limited loading space.',
      name: 'Michelle H.',
      location: 'Trenton, NJ',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Movers 201 quoted one price and delivered — no funny business. Courteous, fast crew through our Hamilton townhome move despite Route 1 traffic.',
      name: 'Jason C.',
      location: 'Hamilton, NJ',
      rating: 5,
      moveType: 'Townhome',
    },
  ],
  middlesex: [
    {
      quote:
        'Piece of Cake handled our Rutgers-area apartment move during August peak with flat-fee pricing that never changed. Professional, stress-free crew through tight New Brunswick streets.',
      name: 'Tyler S.',
      location: 'New Brunswick, NJ',
      rating: 5,
      moveType: 'Student',
    },
    {
      quote:
        'Booth Movers did an outstanding job on our Edison family relocation — careful, on time, and professional despite heavy Turnpike traffic and a strict HOA move-in window.',
      name: 'Anita G.',
      location: 'Edison, NJ',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Movers 201 quoted one price and stuck to it through our Woodbridge townhome move. No funny business — courteous, fast, and the smoothest relocation we have had.',
      name: 'Omar N.',
      location: 'Woodbridge, NJ',
      rating: 5,
      moveType: 'Townhome',
    },
  ],
  monmouth: [
    {
      quote:
        'Piece of Cake handled our Freehold suburban move with flat-fee pricing that stayed predictable. Professional crew navigated HOA rules and Parkway traffic without a hitch.',
      name: 'Laura K.',
      location: 'Freehold, NJ',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Booth Movers did an outstanding job on our Asbury Park shore-area relocation — careful with sand near the boardwalk, on time, and professional through a busy summer weekend.',
      name: 'Mike D.',
      location: 'Asbury Park, NJ',
      rating: 5,
      moveType: 'Coastal',
    },
    {
      quote:
        'Movers 201 quoted one price and delivered through our Long Branch condo move. No funny business — courteous, fast, and the smoothest shore relocation we have had.',
      name: 'Jennifer A.',
      location: 'Long Branch, NJ',
      rating: 5,
      moveType: 'Condo',
    },
  ],
  morris: [
    {
      quote:
        'Piece of Cake handled our Morristown historic home move with flat-fee pricing that never changed. The crew was preservation-sensitive with original moldings and careful through tight downtown streets.',
      name: 'Victoria L.',
      location: 'Morristown, NJ',
      rating: 5,
      moveType: 'Historic home',
    },
    {
      quote:
        'Booth Movers did an outstanding job on our Parsippany family relocation — professional, on time, and careful with high-value furniture through a strict HOA move-in window.',
      name: 'Richard T.',
      location: 'Parsippany, NJ',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Movers 201 quoted one price and stuck to it through our Madison-area move. No funny business — courteous, fast, and smooth despite heavy I-287 traffic.',
      name: 'Nina S.',
      location: 'Madison, NJ',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  ocean: [
    {
      quote:
        'Piece of Cake handled our Toms River family move with flat-fee pricing that stayed predictable. Professional crew navigated Parkway traffic and HOA rules without stress.',
      name: 'Barbara M.',
      location: 'Toms River, NJ',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'SeaCure drove out from Tuckerton for our Lavallette shore house move — on time, careful with sand near the beach, and we received a refund for finishing ahead of schedule.',
      name: 'Frank P.',
      location: 'Lavallette, NJ',
      rating: 5,
      moveType: 'Coastal',
    },
    {
      quote:
        'Booth Movers did an outstanding job on our Lakewood relocation — professional, careful, and on time through a retiree community with strict move-in windows.',
      name: 'Ruth E.',
      location: 'Lakewood, NJ',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  passaic: [
    {
      quote:
        'Top Notch handled our Wayne suburban move with transparent pricing and a careful crew. Professional, efficient, and the best moving experience we have had in North Jersey.',
      name: 'Steven K.',
      location: 'Wayne, NJ',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Unwind Moving earned every five-star review for our Garfield apartment relocation — Sebastian and the team made a stressful Passaic County move genuinely stress-free.',
      name: 'Diana R.',
      location: 'Garfield, NJ',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Movers 201 quoted one price for our Paterson move and stuck to it — no funny business. Professional, courteous, and fast through tight urban streets and limited parking.',
      name: 'Jorge M.',
      location: 'Paterson, NJ',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  salem: [
    {
      quote:
        'Piece of Cake handled our Salem farmhouse move with flat-fee pricing that stayed predictable. The crew navigated a long gravel driveway and extra barn equipment without stress.',
      name: 'Howard B.',
      location: 'Salem, NJ',
      rating: 5,
      moveType: 'Agricultural',
    },
    {
      quote:
        'SeaCure drove out to Pennsville and finished ahead of schedule — careful, polite crew that worked quickly through our riverfront property relocation.',
      name: 'Carol J.',
      location: 'Pennsville, NJ',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'Booth Movers did an outstanding job on our family move in rural Salem County — professional, on time, and careful with both house furniture and workshop tools.',
      name: 'Edward N.',
      location: 'Woodstown, NJ',
      rating: 5,
      moveType: 'Rural',
    },
  ],
  somerset: [
    {
      quote:
        'Piece of Cake handled our Bridgewater townhome move with flat-fee pricing that never changed. Professional crew navigated strict HOA rules and I-287 traffic without stress.',
      name: 'Amanda F.',
      location: 'Bridgewater, NJ',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Booth Movers did an outstanding job on our Somerville family relocation — careful with historic trim work, on time, and professional from start to finish.',
      name: 'Peter W.',
      location: 'Somerville, NJ',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Movers 201 quoted one price for our Bernardsville-area move and stuck to it — no funny business. Courteous, fast, and the smoothest upscale suburban relocation we have had.',
      name: 'Claire H.',
      location: 'Bernardsville, NJ',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  sussex: [
    {
      quote:
        'Piece of Cake handled our Sparta lake house move with flat-fee pricing that stayed predictable. The crew navigated a steep driveway and seasonal property access without a hitch.',
      name: 'George L.',
      location: 'Sparta, NJ',
      rating: 5,
      moveType: 'Lake property',
    },
    {
      quote:
        'Booth Movers did an outstanding job on our Newton family relocation — professional, careful, and on time through rural roads and a long farm driveway.',
      name: 'Patricia A.',
      location: 'Newton, NJ',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Movers 201 quoted one price for our Sussex County move and stuck to it — no funny business. Courteous, fast crew despite limited local infrastructure.',
      name: 'Tim R.',
      location: 'Hopatcong, NJ',
      rating: 5,
      moveType: 'Residential',
    },
  ],
};

export function getNewJerseyCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return newJerseyCountyTestimonials[countySlug] ?? [];
}