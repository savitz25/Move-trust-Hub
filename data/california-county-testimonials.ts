export type CountyTestimonialEntry = {
  quote: string;
  name: string;
  location: string;
  rating: number;
  moveType?: string;
};

export const californiaCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  alameda: [
    {
      quote:
        'MorningStar handled our Oakland high-rise move professionally — efficient crew, elevator coordination, and careful handling throughout.',
      name: 'David R.',
      location: 'Oakland, CA',
      rating: 5,
      moveType: 'High-Rise',
    },
    {
      quote:
        'Got2Move provided excellent customer service for our Berkeley apartment move — smooth, efficient, and transparent pricing.',
      name: 'Maria L.',
      location: 'Berkeley, CA',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Roadway Moving exceeded expectations on our Fremont family home relocation — professional team and careful handling of our furnishings.',
      name: 'James K.',
      location: 'Fremont, CA',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  alpine: [
    {
      quote:
        'Mountain Lake Mover handled our Markleeville mountain property with care — professional crew despite challenging Sierra access roads.',
      name: 'Robert T.',
      location: 'Markleeville, CA',
      rating: 5,
      moveType: 'Mountain',
    },
    {
      quote:
        'Tahoe Moving & Storage provided reliable regional service for our Alpine County seasonal relocation — careful planning for winter timing.',
      name: 'Susan M.',
      location: 'Kirkwood, CA',
      rating: 5,
      moveType: 'Seasonal',
    },
    {
      quote:
        "Mother Lode Van drove in from Sacramento with fair pricing and professional service for our remote Alpine County move.",
      name: 'Paul H.',
      location: 'Bear Valley, CA',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  amador: [
    {
      quote:
        'Mother Lode Van & Storage handled our Jackson Gold Country move professionally — preservation-sensitive handling for our historic home.',
      name: 'Linda W.',
      location: 'Jackson, CA',
      rating: 5,
      moveType: 'Historic',
    },
    {
      quote:
        'California Capital Movers provided dependable regional service for our Sutter Creek relocation — efficient crews throughout.',
      name: 'Tom B.',
      location: 'Sutter Creek, CA',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Ernie's Moving crew was courteous and efficient with great communication for our Amador County family home move.",
      name: 'Karen S.',
      location: 'Pioneer, CA',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  butte: [
    {
      quote:
        'Two Men and a Truck Chico handled our university-area move professionally — efficient crew despite Chico State calendar timing.',
      name: 'Alex P.',
      location: 'Chico, CA',
      rating: 5,
      moveType: 'Student',
    },
    {
      quote:
        'D & J Professional Movers provided reliable service for our Oroville relocation — careful handling for our foothill property.',
      name: 'Nancy R.',
      location: 'Oroville, CA',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'California Capital Movers drove in from Sacramento with fair pricing and professional service for our rural Butte County move.',
      name: 'Greg F.',
      location: 'Paradise, CA',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  calaveras: [
    {
      quote:
        'Mother Lode Van & Storage handled our Angels Camp Gold Country move professionally — careful handling for our rural foothill home.',
      name: 'Steve M.',
      location: 'Angels Camp, CA',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'California Capital Movers provided dependable regional service for our San Andreas relocation — efficient crews throughout.',
      name: 'Diane K.',
      location: 'San Andreas, CA',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        "Ernie's Moving crew was courteous and efficient with great communication for our Calaveras County family home move.",
      name: 'Rick T.',
      location: 'Murphys, CA',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  colusa: [
    {
      quote:
        'California Capital Movers handled our Colusa agricultural-property move professionally — efficient crew despite rural access challenges.',
      name: 'John A.',
      location: 'Colusa, CA',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'Mother Lode Van provided reliable regional service for our rural Sacramento Valley relocation — careful and efficient throughout.',
      name: 'Mary L.',
      location: 'Williams, CA',
      rating: 5,
      moveType: 'Agricultural',
    },
    {
      quote:
        'Two Men and a Truck Chico drove in with fair pricing and professional service for our remote Colusa County move.',
      name: 'Dan W.',
      location: 'Arbuckle, CA',
      rating: 5,
      moveType: 'Rural',
    },
  ],
  'contra-costa': [
    {
      quote:
        'MorningStar made our Walnut Creek move stress-free — professional crew, HOA coordination, and excellent handling of our furnishings.',
      name: 'Jennifer H.',
      location: 'Walnut Creek, CA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Got2Move provided outstanding customer service for our Concord relocation — smooth, efficient, and transparent pricing.',
      name: 'Michael D.',
      location: 'Concord, CA',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'Roadway Moving exceeded expectations on our Antioch family home move — professional team and careful handling throughout.',
      name: 'Patricia G.',
      location: 'Antioch, CA',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  'del-norte': [
    {
      quote:
        'Humboldt Moving & Storage handled our Crescent City coastal move professionally — careful planning for our remote North Coast relocation.',
      name: 'Robert N.',
      location: 'Crescent City, CA',
      rating: 5,
      moveType: 'Coastal',
    },
    {
      quote:
        'Meathead Movers Eureka provided dependable regional service for our Del Norte County move — efficient crews despite limited local options.',
      name: 'Susan E.',
      location: 'Klamath, CA',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'California Regional Moving drove in with fair pricing and professional service for our remote coastal property move.',
      name: 'William C.',
      location: 'Smith River, CA',
      rating: 5,
      moveType: 'Remote',
    },
  ],
  'el-dorado': [
    {
      quote:
        'Mother Lode Van & Storage handled our Placerville foothill move professionally — careful handling despite challenging Sierra access roads.',
      name: 'Mark J.',
      location: 'Placerville, CA',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'Mountain Lake Mover provided reliable Tahoe-area service for our El Dorado County lake property relocation — efficient and careful throughout.',
      name: 'Laura S.',
      location: 'South Lake Tahoe, CA',
      rating: 5,
      moveType: 'Lakeside',
    },
    {
      quote:
        "Ernie's Moving crew was courteous and efficient with great communication for our Cameron Park family home move.",
      name: 'Brian T.',
      location: 'Cameron Park, CA',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  fresno: [
    {
      quote:
        'Meathead Movers Fresno handled our Clovis relocation professionally — efficient crew and careful handling of our belongings.',
      name: 'Carlos R.',
      location: 'Clovis, CA',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'Two Men and a Truck Fresno provided excellent service for our Fresno family home move — transparent pricing and professional team.',
      name: 'Angela M.',
      location: 'Fresno, CA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'California Express Movers drove in with fair pricing and dependable service for our Central Valley corporate relocation.',
      name: 'David K.',
      location: 'Fresno, CA',
      rating: 5,
      moveType: 'Corporate',
    },
  ],
  glenn: [
    {
      quote:
        'Two Men and a Truck Chico handled our Willows agricultural-property move professionally — efficient crew despite rural access challenges.',
      name: 'Frank H.',
      location: 'Willows, CA',
      rating: 5,
      moveType: 'Agricultural',
    },
    {
      quote:
        'D & J Professional Movers provided reliable regional service for our Glenn County relocation — careful and efficient throughout.',
      name: 'Helen P.',
      location: 'Orland, CA',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'California Capital Movers drove in from Sacramento with fair pricing and professional service for our rural Glenn County move.',
      name: 'George W.',
      location: 'Willows, CA',
      rating: 5,
      moveType: 'Rural',
    },
  ],
  kern: [
    {
      quote:
        'Hills Moving & Storage handled our Bakersfield family home move professionally — efficient crew and careful handling throughout.',
      name: 'Ricardo M.',
      location: 'Bakersfield, CA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Bakersfield provided excellent service for our Delano relocation — transparent pricing and professional team.',
      name: 'Sandra L.',
      location: 'Delano, CA',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'Meathead Movers Fresno drove in with fair pricing and dependable service for our Kern County agricultural-property move.',
      name: 'Tony G.',
      location: 'Taft, CA',
      rating: 5,
      moveType: 'Agricultural',
    },
  ],
  kings: [
    {
      quote:
        'Meathead Movers Fresno handled our Lemoore military PCS move professionally — efficient crew with great PCS experience.',
      name: 'Jason R.',
      location: 'Lemoore, CA',
      rating: 5,
      moveType: 'Military',
    },
    {
      quote:
        'Two Men and a Truck Fresno provided reliable regional service for our Hanford relocation — careful and efficient throughout.',
      name: 'Maria C.',
      location: 'Hanford, CA',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'California Express Movers drove in with fair pricing and professional service for our Kings County family home move.',
      name: 'Kevin B.',
      location: 'Corcoran, CA',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  lake: [
    {
      quote:
        'Humboldt Moving & Storage handled our Lakeport lakeside move professionally — careful planning for Clear Lake water-adjacent access.',
      name: 'Diana F.',
      location: 'Lakeport, CA',
      rating: 5,
      moveType: 'Lakeside',
    },
    {
      quote:
        'California Regional Moving provided dependable service for our Clear Lake relocation — efficient crews despite seasonal tourism timing.',
      name: 'Eric N.',
      location: 'Clearlake, CA',
      rating: 5,
      moveType: 'Seasonal',
    },
    {
      quote:
        'Mother Lode Van drove in from Sacramento with fair pricing and professional service for our rural Lake County move.',
      name: 'Patricia A.',
      location: 'Middletown, CA',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  humboldt: [
    {
      quote:
        'Humboldt Moving & Storage handled our Eureka coastal move professionally — careful handling for our forested property near Arcata.',
      name: 'Christine L.',
      location: 'Eureka, CA',
      rating: 5,
      moveType: 'Coastal',
    },
    {
      quote:
        'Meathead Movers Eureka provided excellent service for our university-area Arcata relocation — efficient despite Cal Poly Humboldt calendar timing.',
      name: 'Andrew P.',
      location: 'Arcata, CA',
      rating: 5,
      moveType: 'Student',
    },
    {
      quote:
        'California Regional Moving drove in with fair pricing and professional service for our remote Humboldt County family home move.',
      name: 'Helen W.',
      location: 'Fortuna, CA',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  imperial: [
    {
      quote:
        'Moving Masters IV handled our El Centro desert move professionally — efficient crew despite extreme heat and agricultural-property access.',
      name: 'Jorge R.',
      location: 'El Centro, CA',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'California Premier Moving provided dependable regional service from San Diego for our Calexico relocation — careful and efficient throughout.',
      name: 'Ana M.',
      location: 'Calexico, CA',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'California Pro Movers crew was courteous and efficient with great communication for our Imperial County family home move.',
      name: 'Robert D.',
      location: 'Brawley, CA',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  inyo: [
    {
      quote:
        'On Track Moving handled our Bishop Eastern Sierra move professionally — careful planning for our remote high-desert property.',
      name: 'Michael S.',
      location: 'Bishop, CA',
      rating: 5,
      moveType: 'Mountain',
    },
    {
      quote:
        'Mountain Lake Mover provided reliable regional service for our Independence relocation — efficient crews despite challenging Sierra terrain.',
      name: 'Barbara K.',
      location: 'Independence, CA',
      rating: 5,
      moveType: 'Remote',
    },
    {
      quote:
        'Mother Lode Van drove in from Sacramento with fair pricing and professional service for our Inyo County family home move.',
      name: 'James T.',
      location: 'Lone Pine, CA',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  lassen: [
    {
      quote:
        'Two Men and a Truck drove in from Chico for our Susanville move — professional crew and careful handling in challenging high-desert terrain.',
      name: 'Karen H.',
      location: 'Susanville, CA',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'D & J Professional Movers provided reliable regional service for our remote Lassen County relocation — efficient despite limited local options.',
      name: 'Tom W.',
      location: 'Westwood, CA',
      rating: 5,
      moveType: 'Remote',
    },
    {
      quote:
        'Mother Lode Van drove in from Sacramento with fair pricing and professional service for our property near Lassen Volcanic National Park.',
      name: 'Linda M.',
      location: 'Susanville, CA',
      rating: 5,
      moveType: 'Mountain',
    },
  ],
  'los-angeles': [
    {
      quote:
        'Piece of Cake Moving made our Downtown LA high-rise move stress-free — professional elevator coordination and transparent pricing throughout.',
      name: 'Sarah J.',
      location: 'Los Angeles, CA',
      rating: 5,
      moveType: 'High-Rise',
    },
    {
      quote:
        'Booth Movers handled our Santa Monica apartment relocation with outstanding care — careful in tight urban spaces and excellent communication.',
      name: 'Daniel K.',
      location: 'Santa Monica, CA',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Gentle Giant provided white-glove service for our Pasadena family home move — professional crew and careful handling of our furnishings.',
      name: 'Michelle R.',
      location: 'Pasadena, CA',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  madera: [
    {
      quote:
        'Meathead Movers Fresno handled our Madera family home move professionally — efficient crew and careful handling of our agricultural-property belongings.',
      name: 'Carlos G.',
      location: 'Madera, CA',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'Two Men and a Truck provided dependable regional service from Fresno for our Chowchilla relocation — smooth and efficient throughout.',
      name: 'Patricia N.',
      location: 'Chowchilla, CA',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'California Express Movers drove in with fair pricing and professional service for our rural Madera County farm property move.',
      name: 'Rick S.',
      location: 'Oakhurst, CA',
      rating: 5,
      moveType: 'Agricultural',
    },
  ],
  marin: [
    {
      quote:
        'Piece of Cake Moving made our Mill Valley relocation stress-free — professional crew and transparent pricing for our high-value home.',
      name: 'Elizabeth H.',
      location: 'Mill Valley, CA',
      rating: 5,
      moveType: 'High-Value',
    },
    {
      quote:
        'Booth Movers handled our San Rafael move with outstanding care — excellent coordination across the Golden Gate Bridge and HOA parking rules.',
      name: 'David W.',
      location: 'San Rafael, CA',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'MorningStar Moving provided white-glove service for our Sausalito waterfront home — careful handling and great communication throughout.',
      name: 'Jennifer L.',
      location: 'Sausalito, CA',
      rating: 5,
      moveType: 'Lakeside',
    },
  ],
  mariposa: [
    {
      quote:
        'Meathead Movers Fresno handled our Yosemite-area move professionally — careful planning for seasonal access and rural property logistics.',
      name: 'Brian T.',
      location: 'Mariposa, CA',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Two Men and a Truck provided dependable regional service from Fresno for our Mariposa relocation — efficient despite limited local options.',
      name: 'Susan K.',
      location: 'Catheys Valley, CA',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'California Express Movers drove in with fair pricing and professional service for our park-adjacent property move near Yosemite.',
      name: 'Mark D.',
      location: 'El Portal, CA',
      rating: 5,
      moveType: 'Seasonal',
    },
  ],
  mendocino: [
    {
      quote:
        'Humboldt Moving & Storage handled our Mendocino coast move professionally — careful planning for our remote coastal property access.',
      name: 'Laura B.',
      location: 'Mendocino, CA',
      rating: 5,
      moveType: 'Coastal',
    },
    {
      quote:
        'California Regional Moving provided dependable service for our Ukiah winery-property relocation — efficient crews despite seasonal tourism timing.',
      name: 'Steven R.',
      location: 'Ukiah, CA',
      rating: 5,
      moveType: 'Winery',
    },
    {
      quote:
        'Meathead Movers Eureka drove in with fair pricing and professional service for our rural Mendocino County family home move.',
      name: 'Nancy P.',
      location: 'Fort Bragg, CA',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  merced: [
    {
      quote:
        'Meathead Movers Fresno handled our UC Merced-area move professionally — efficient crew with great university-calendar coordination.',
      name: 'Angela V.',
      location: 'Merced, CA',
      rating: 5,
      moveType: 'Student',
    },
    {
      quote:
        'Two Men and a Truck provided dependable regional service for our Los Banos relocation — careful and efficient throughout.',
      name: 'Hector M.',
      location: 'Los Banos, CA',
      rating: 5,
      moveType: 'Residential',
    },
    {
      quote:
        'California County Moving drove in with fair pricing and professional service for our Merced County agricultural-property move.',
      name: 'Diane K.',
      location: 'Atwater, CA',
      rating: 5,
      moveType: 'Agricultural',
    },
  ],
  modoc: [
    {
      quote:
        'Two Men and a Truck drove in from Chico for our Alturas move — professional crew and careful handling in challenging high-desert terrain.',
      name: 'Gary L.',
      location: 'Alturas, CA',
      rating: 5,
      moveType: 'Remote',
    },
    {
      quote:
        'D & J Professional Movers provided reliable regional service for our remote Modoc County relocation — efficient despite extremely limited local options.',
      name: 'Ruth A.',
      location: 'Cedarville, CA',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Mother Lode Van drove in from Sacramento with fair pricing and professional service for our Alturas family home move.',
      name: 'Paul S.',
      location: 'Alturas, CA',
      rating: 5,
      moveType: 'Residential',
    },
  ],
  mono: [
    {
      quote:
        'On Track Moving handled our Mammoth Lakes ski-resort move professionally — careful planning for high-altitude access and seasonal timing.',
      name: 'Chris W.',
      location: 'Mammoth Lakes, CA',
      rating: 5,
      moveType: 'Mountain',
    },
    {
      quote:
        'Mountain Lake Mover provided reliable regional service for our Bridgeport relocation — efficient crews despite challenging Eastern Sierra terrain.',
      name: 'Heather J.',
      location: 'Bridgeport, CA',
      rating: 5,
      moveType: 'High-Altitude',
    },
    {
      quote:
        'Tahoe Moving & Storage drove in with fair pricing and professional service for our seasonal Mono County cabin move.',
      name: 'Scott B.',
      location: 'Lee Vining, CA',
      rating: 5,
      moveType: 'Seasonal',
    },
  ],
};

export function getCaliforniaCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return californiaCountyTestimonials[countySlug] ?? [];
}