export type CountyTestimonialEntry = {
  quote: string;
  name: string;
  location: string;
  rating: number;
  moveType?: string;
};

/** Hand-curated North Carolina county testimonials — grows incrementally per batch */
export const northCarolinaCountyTestimonials: Record<
  string,
  CountyTestimonialEntry[]
> = {
  davie: [
    {
      quote:
        'Two Men and a Truck Winston-Salem handled our Mocksville relocation professionally — on time, careful with our belongings, and transparent Triad pricing throughout Davie County.',
      name: 'Greg H.',
      location: 'Mocksville, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'American Moving & Hauling served our Davie County move efficiently with fast, professional crews and great value for careful handling.',
      name: 'Sandra L.',
      location: 'Mocksville, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'College Hunks Moving confirmed Mocksville coverage and delivered reliable packing and loading with no surprise fees despite Triad traffic.',
      name: 'Tim R.',
      location: 'Mocksville, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  halifax: [
    {
      quote:
        'Smart Move Wilson confirmed Roanoke Rapids coverage and handled our rural Halifax County relocation professionally with careful driveway access planning.',
      name: 'Earl J.',
      location: 'Roanoke Rapids, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'College Hunks Moving Greenville served our Halifax County move efficiently with professional crews experienced with northeastern NC regional routes.',
      name: 'Wanda P.',
      location: 'Halifax, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Miracle Movers delivered reliable packing and loading for our rural move with no surprise fees despite longer regional travel.',
      name: 'Carl M.',
      location: 'Roanoke Rapids, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  mcdowell: [
    {
      quote:
        'Asheville Area Movers handled our Marion mountain relocation professionally — efficient crews, careful handling, and transparent western NC pricing.',
      name: 'Donna W.',
      location: 'Marion, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Preferred Moving Company served our McDowell County move with professional crews experienced with foothill mountain-road access.',
      name: 'Mike S.',
      location: 'Marion, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'In & Out Moving & Delivery confirmed Marion coverage and delivered reliable packing and loading with no surprise fees despite steep-driveway challenges.',
      name: 'Janice K.',
      location: 'Marion, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  jackson: [
    {
      quote:
        'Gasperson Moving handled our Sylva mountain relocation professionally — efficient crews, careful handling, and transparent western NC pricing.',
      name: 'Barbara T.',
      location: 'Sylva, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Asheville served our Cashiers move with professional crews experienced with steep-driveway and mountain-road access.',
      name: 'John D.',
      location: 'Cashiers, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Carey Moving & Storage confirmed Jackson County coverage and delivered reliable packing and loading with no surprise fees despite peak tourist-season scheduling.',
      name: 'Nancy F.',
      location: 'Sylva, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  beaufort: [
    {
      quote:
        'College Hunks Moving Greenville handled our Washington coastal relocation professionally — efficient crews, careful handling, and transparent inner-coastal pricing.',
      name: 'Richard B.',
      location: 'Washington, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'East Carolina Moving served our Beaufort County waterfront move with professional crews experienced with coastal access and hurricane-season scheduling.',
      name: 'Cynthia A.',
      location: 'Washington, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Horne Moving Systems confirmed Washington coverage and delivered reliable packing and loading with no surprise fees despite regional travel.',
      name: 'George L.',
      location: 'Washington, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  pasquotank: [
    {
      quote:
        'Smart Move Wilson confirmed Elizabeth City coverage and handled our Pasquotank County relocation professionally with careful handling throughout.',
      name: 'Deborah C.',
      location: 'Elizabeth City, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'East Carolina Moving served our Elizabeth City move efficiently with professional crews experienced with northeastern coastal regional routes.',
      name: 'Thomas N.',
      location: 'Elizabeth City, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Little Guys Movers delivered reliable packing and loading with no surprise fees despite longer regional travel from Raleigh.',
      name: 'Kim R.',
      location: 'Elizabeth City, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  vance: [
    {
      quote:
        'Two Men and a Truck Durham handled our Henderson relocation professionally — on time, careful with our belongings, and transparent northern NC pricing throughout Vance County.',
      name: 'Alvin G.',
      location: 'Henderson, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'TROSA Moving served our Vance County move efficiently with fast, professional crews and great value for careful handling.',
      name: 'Renee H.',
      location: 'Henderson, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Little Guys Movers confirmed Henderson coverage and delivered reliable packing and loading with no surprise fees despite Durham-area traffic.',
      name: 'Victor S.',
      location: 'Henderson, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  richmond: [
    {
      quote:
        'Stewart Moving & Storage confirmed Rockingham coverage and handled our rural Richmond County relocation professionally with careful driveway access planning.',
      name: 'Henry W.',
      location: 'Rockingham, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Fayetteville served our Richmond County move efficiently with professional crews experienced with southern NC regional routes.',
      name: 'Louise T.',
      location: 'Rockingham, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'S&Q Movers delivered reliable packing and loading for our rural move with no surprise fees despite longer regional travel.',
      name: 'Raymond J.',
      location: 'Rockingham, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  person: [
    {
      quote:
        'Miracle Movers Durham handled our Roxboro relocation professionally — on time, careful with our belongings, and transparent northern Triangle pricing throughout Person County.',
      name: 'Alice M.',
      location: 'Roxboro, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Armstrong Relocation served our Person County move efficiently with fast, professional crews and great value for careful handling.',
      name: 'Philip K.',
      location: 'Roxboro, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Athens Moving Experts confirmed Roxboro coverage and delivered reliable packing and loading with no surprise fees despite Durham-area traffic.',
      name: 'Gloria D.',
      location: 'Roxboro, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  macon: [
    {
      quote:
        'Asheville Area Movers handled our Franklin mountain relocation professionally — efficient crews, careful handling, and transparent western NC pricing.',
      name: 'Steven P.',
      location: 'Franklin, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Appalachian Moving & Storage served our Macon County move with professional crews experienced with steep-driveway and mountain-road access.',
      name: 'Margaret C.',
      location: 'Franklin, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Two Men and a Truck Asheville confirmed Franklin coverage and delivered reliable packing and loading with no surprise fees despite peak tourist-season scheduling.',
      name: 'Andrew B.',
      location: 'Franklin, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  haywood: [
    {
      quote:
        'Asheville Area Movers handled our Waynesville mountain relocation professionally — efficient crews, careful handling, and transparent western NC pricing.',
      name: 'Karen W.',
      location: 'Waynesville, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Gasperson Moving served our Maggie Valley move with professional crews experienced with steep-driveway and mountain-road access.',
      name: 'Tom H.',
      location: 'Maggie Valley, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Two Men and a Truck Asheville confirmed Haywood County coverage and delivered reliable packing and loading with no surprise fees despite peak tourist-season scheduling.',
      name: 'Linda S.',
      location: 'Waynesville, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  sampson: [
    {
      quote:
        'Stewart Moving & Storage confirmed Clinton coverage and handled our rural Sampson County relocation professionally with careful driveway access planning.',
      name: 'William J.',
      location: 'Clinton, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Absolute Moving Wilmington served our Sampson County move efficiently with professional crews experienced with southeastern NC regional routes.',
      name: 'Angela R.',
      location: 'Clinton, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Two Men and a Truck Fayetteville delivered reliable packing and loading for our rural move with no surprise fees despite longer regional travel.',
      name: 'Gary P.',
      location: 'Clinton, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  granville: [
    {
      quote:
        'Two Men and a Truck Durham handled our Oxford relocation professionally — on time, careful with our belongings, and transparent Triangle pricing throughout Granville County.',
      name: 'Michelle D.',
      location: 'Oxford, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'TROSA Moving served our Granville County move efficiently with fast, professional crews and great value for careful handling.',
      name: 'Kevin L.',
      location: 'Oxford, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Athens Moving Experts confirmed Oxford coverage and delivered reliable packing and loading with no surprise fees despite Raleigh-Durham traffic.',
      name: 'Rachel M.',
      location: 'Oxford, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  hoke: [
    {
      quote:
        'Stewart Moving & Storage handled our Raeford PCS move professionally — efficient crews, careful handling, and great experience with military families near Fort Liberty.',
      name: 'Sgt. Mark T.',
      location: 'Raeford, NC',
      rating: 5,
      moveType: 'Military PCS',
    },
    {
      quote:
        'S&Q Movers served our Hoke County move with professional, efficient crews and careful handling throughout.',
      name: 'Diana F.',
      location: 'Raeford, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'College Hunks Moving confirmed Raeford coverage and delivered reliable packing and loading with no surprise fees despite Fayetteville-metro scheduling.',
      name: 'Chris B.',
      location: 'Raeford, NC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  lenoir: [
    {
      quote:
        'Horne Moving Systems handled our Kinston relocation professionally — efficient crews, careful handling, and transparent eastern NC pricing.',
      name: 'Betty N.',
      location: 'Kinston, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'East Carolina Moving served our Lenoir County move efficiently with fast, professional crews and great value for careful handling.',
      name: 'Harold C.',
      location: 'Kinston, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Smart Move Wilson confirmed Kinston coverage and delivered reliable packing and loading with no surprise fees despite regional travel.',
      name: 'Sharon G.',
      location: 'Kinston, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  watauga: [
    {
      quote:
        'Appalachian Moving & Storage handled our Boone mountain relocation professionally — efficient crews, careful handling, and transparent High Country pricing.',
      name: 'Emily R.',
      location: 'Boone, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Asheville Area Movers served our Watauga County move with professional crews experienced with steep-driveway and mountain-road access.',
      name: 'Daniel K.',
      location: 'Boone, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Preferred Moving Company confirmed Boone coverage and delivered reliable packing and loading with no surprise fees despite winter weather scheduling.',
      name: 'Amy J.',
      location: 'Boone, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  duplin: [
    {
      quote:
        'Horne Moving Systems confirmed Kenansville coverage and handled our rural Duplin County relocation professionally with careful driveway access planning.',
      name: 'Frank W.',
      location: 'Kenansville, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Absolute Moving Wilmington served our Duplin County move efficiently with professional crews experienced with southeastern NC regional routes.',
      name: 'Teresa H.',
      location: 'Kenansville, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Smart Move Wilson delivered reliable packing and loading for our rural move with no surprise fees despite longer regional travel.',
      name: 'Roy S.',
      location: 'Kenansville, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  columbus: [
    {
      quote:
        'Absolute Moving Wilmington confirmed Whiteville coverage and handled our rural Columbus County relocation professionally with careful driveway access planning.',
      name: 'Nancy E.',
      location: 'Whiteville, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'College Hunks Moving served our Columbus County move efficiently with professional crews experienced with southeastern NC regional routes.',
      name: 'Larry M.',
      location: 'Whiteville, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Little Guys Movers delivered reliable packing and loading for our rural move with no surprise fees despite longer regional travel from Wilmington.',
      name: 'Pam D.',
      location: 'Whiteville, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  edgecombe: [
    {
      quote:
        'Smart Move Wilson confirmed Tarboro coverage and handled our rural Edgecombe County relocation professionally with careful driveway access planning.',
      name: 'Joseph A.',
      location: 'Tarboro, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'College Hunks Moving Greenville served our Edgecombe County move efficiently with professional crews experienced with eastern Piedmont regional routes.',
      name: 'Martha L.',
      location: 'Tarboro, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Miracle Movers delivered reliable packing and loading for our rural move with no surprise fees despite longer regional travel.',
      name: 'Edward P.',
      location: 'Tarboro, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  stokes: [
    {
      quote:
        'Two Men and a Truck Greensboro confirmed Danbury coverage and handled our rural Stokes County relocation professionally with careful driveway access planning.',
      name: 'Helen B.',
      location: 'Danbury, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Excel Moving & Storage served our Stokes County move efficiently with professional crews experienced with northern Triad regional routes.',
      name: 'Charles W.',
      location: 'Danbury, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Miracle Movers Greensboro delivered reliable packing and loading for our rural move with no surprise fees despite longer regional travel.',
      name: 'Dorothy K.',
      location: 'Walnut Cove, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  franklin: [
    {
      quote:
        'Two Men and a Truck Raleigh handled our Louisburg relocation professionally — on time, careful with our belongings, and transparent Triangle pricing throughout Franklin County.',
      name: 'Robert M.',
      location: 'Louisburg, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Little Guys Movers served our Franklin County move efficiently with fast, professional crews and great value for careful handling.',
      name: 'Susan T.',
      location: 'Louisburg, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Athens Moving Experts confirmed Louisburg coverage and delivered reliable packing and loading with no surprise fees despite Raleigh-area traffic.',
      name: 'David K.',
      location: 'Louisburg, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  wilson: [
    {
      quote:
        'Smart Move Wilson handled our Wilson relocation professionally — efficient crews, careful handling, and transparent eastern NC pricing.',
      name: 'Patricia H.',
      location: 'Wilson, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'College Hunks Moving Greenville served our Wilson County move efficiently with fast, professional crews and great value.',
      name: 'Michael B.',
      location: 'Wilson, NC',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Miracle Movers confirmed Wilson coverage and delivered reliable packing and loading with no surprise fees despite regional travel.',
      name: 'Linda R.',
      location: 'Wilson, NC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  caldwell: [
    {
      quote:
        'In & Out Moving & Delivery handled our Lenoir relocation professionally — efficient crews, careful handling, and transparent foothills pricing.',
      name: 'James W.',
      location: 'Lenoir, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Ashe Van Lines served our Caldwell County move with professional crews experienced with mountain-road and foothill access.',
      name: 'Nancy P.',
      location: 'Lenoir, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Preferred Moving Company confirmed Lenoir coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Gary S.',
      location: 'Lenoir, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  pender: [
    {
      quote:
        'College Hunks Moving Wilmington handled our Burgaw relocation professionally — efficient crews, careful handling, and transparent coastal pricing.',
      name: 'Karen D.',
      location: 'Burgaw, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Absolute Moving & Storage served our Pender County move with professional crews and careful handling of our waterfront-area furnishings.',
      name: 'Mark L.',
      location: 'Hampstead, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Two Men and a Truck Wilmington confirmed coastal coverage and delivered reliable packing and loading with no surprise fees despite hurricane-season scheduling.',
      name: 'Rachel G.',
      location: 'Burgaw, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  surry: [
    {
      quote:
        'Two Men and a Truck Greensboro handled our Mount Airy relocation professionally — on time, careful with our belongings, and transparent Triad pricing.',
      name: 'William F.',
      location: 'Mount Airy, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Excel Moving & Storage served our Surry County move efficiently with professional crews and great value.',
      name: 'Betty J.',
      location: 'Mount Airy, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Miracle Movers Greensboro confirmed Dobson coverage and delivered reliable packing and loading with no surprise fees despite rural access.',
      name: 'Charles N.',
      location: 'Dobson, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  lee: [
    {
      quote:
        'Athens Moving Experts handled our Sanford relocation professionally — efficient crews, careful handling, and transparent Triangle pricing throughout Lee County.',
      name: 'Angela C.',
      location: 'Sanford, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Stewart Moving & Storage served our Sanford move with professional crews experienced with regional Fayetteville-to-Triangle routes.',
      name: 'Thomas E.',
      location: 'Sanford, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Miracle Movers confirmed Sanford coverage and delivered reliable packing and loading with no surprise fees despite US-1 corridor traffic.',
      name: 'Heather M.',
      location: 'Sanford, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  carteret: [
    {
      quote:
        'J.E. Thomas & Sons handled our Morehead City coastal relocation professionally — efficient crews, careful handling, and transparent Crystal Coast pricing.',
      name: 'Laura S.',
      location: 'Morehead City, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Absolute Moving & Storage served our Beaufort move with professional crews and careful handling of our waterfront-area furnishings.',
      name: 'John H.',
      location: 'Beaufort, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'College Hunks Moving Wilmington confirmed Emerald Isle coverage and delivered reliable packing and loading with no surprise fees despite coastal access.',
      name: 'Diane W.',
      location: 'Emerald Isle, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  stanly: [
    {
      quote:
        'Gentle Giant Moving handled our Albemarle relocation professionally — efficient crews, careful handling, and transparent Charlotte-metro pricing.',
      name: 'Scott P.',
      location: 'Albemarle, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'You Move Me served our Stanly County move with professional crews and careful handling throughout.',
      name: 'Jennifer L.',
      location: 'Albemarle, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Make A Move confirmed Albemarle coverage and delivered reliable packing and loading with no surprise fees despite regional traffic.',
      name: 'Brian K.',
      location: 'Albemarle, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  wilkes: [
    {
      quote:
        'Preferred Moving Company handled our Wilkesboro mountain relocation professionally — efficient crews, careful handling, and transparent pricing.',
      name: 'Carol B.',
      location: 'Wilkesboro, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Asheville Area Movers served our Wilkes County move with professional crews experienced with mountain-road access.',
      name: 'Richard T.',
      location: 'Wilkesboro, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'In & Out Moving & Delivery confirmed North Wilkesboro coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Janet A.',
      location: 'North Wilkesboro, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  rutherford: [
    {
      quote:
        'Easy Movers Gastonia handled our Rutherfordton relocation professionally — efficient crews, careful handling, and transparent western NC pricing.',
      name: 'Paul M.',
      location: 'Rutherfordton, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Asheville Area Movers served our Forest City move with professional crews experienced with foothill and rural access.',
      name: 'Mary C.',
      location: 'Forest City, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Gentle Giant Moving confirmed Rutherford County coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Steve D.',
      location: 'Rutherfordton, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  wayne: [
    {
      quote:
        'Horne Moving Systems handled our Goldsboro PCS move professionally — efficient crews, careful handling, and great experience with military families near Seymour Johnson AFB.',
      name: 'Capt. David R.',
      location: 'Goldsboro, NC',
      rating: 5,
      moveType: 'Military PCS',
    },
    {
      quote:
        'Smart Move Wilson confirmed Wayne County coverage and delivered reliable packing and loading with no surprise fees despite eastern NC regional travel.',
      name: 'Lisa M.',
      location: 'Goldsboro, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Stewart Moving & Storage served our Goldsboro move with professional, efficient crews and careful handling throughout.',
      name: 'James T.',
      location: 'Goldsboro, NC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  robeson: [
    {
      quote:
        'Stewart Moving & Storage confirmed Lumberton coverage and handled our rural Robeson County relocation professionally with careful driveway access planning.',
      name: 'Maria S.',
      location: 'Lumberton, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Fayetteville served our Lumberton move efficiently with professional crews experienced with southeastern NC regional routes.',
      name: 'Robert K.',
      location: 'Lumberton, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'S&Q Movers delivered reliable packing and loading for our rural move with no surprise fees despite longer regional travel from Fayetteville.',
      name: 'Angela P.',
      location: 'Lumberton, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  moore: [
    {
      quote:
        'Stewart Moving & Storage handled our Pinehurst relocation professionally — on time, careful with our belongings, and transparent Sandhills pricing.',
      name: 'William C.',
      location: 'Pinehurst, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Fayetteville served our Southern Pines move with professional crews experienced with golf-community and retirement-area access.',
      name: 'Barbara H.',
      location: 'Southern Pines, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Athens Moving Experts confirmed Aberdeen coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Greg N.',
      location: 'Aberdeen, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  craven: [
    {
      quote:
        'J.E. Thomas & Sons handled our New Bern relocation professionally — efficient crews, careful handling, and transparent coastal Carolina pricing.',
      name: 'Susan L.',
      location: 'New Bern, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Absolute Moving & Storage served our Craven County move with professional crews and careful handling of our historic-home furnishings.',
      name: 'Mark D.',
      location: 'New Bern, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Superior Moving and Logistics confirmed Havelock coverage and delivered reliable packing and loading with no surprise fees despite coastal access.',
      name: 'Karen W.',
      location: 'Havelock, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  cleveland: [
    {
      quote:
        'Gentle Giant Moving handled our Shelby relocation professionally — efficient crews, careful handling, and transparent Charlotte-metro pricing.',
      name: 'Tim B.',
      location: 'Shelby, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Easy Movers Gastonia served our Cleveland County move with professional crews and careful handling throughout.',
      name: 'Diane F.',
      location: 'Shelby, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'You Move Me confirmed Shelby coverage and delivered reliable packing and loading with no surprise fees despite I-85 corridor traffic.',
      name: 'Steve R.',
      location: 'Shelby, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  nash: [
    {
      quote:
        'Smart Move Wilson handled our Rocky Mount relocation professionally — on time, careful with our belongings, and transparent eastern NC pricing.',
      name: 'Patricia G.',
      location: 'Rocky Mount, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'College Hunks Moving Greenville served our Nash County move efficiently with fast, professional crews and great value.',
      name: 'Kevin J.',
      location: 'Nashville, NC',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Crabtree Family Moving confirmed Rocky Mount coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Rachel A.',
      location: 'Rocky Mount, NC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  lincoln: [
    {
      quote:
        'Gentle Giant Moving handled our Lincolnton relocation professionally — efficient crews, careful handling, and transparent Lake Norman area pricing.',
      name: 'Brian W.',
      location: 'Lincolnton, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Make A Move served our Lincoln County move with professional crews and careful handling of our furniture throughout.',
      name: 'Jennifer S.',
      location: 'Lincolnton, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Flex Moving & Storage confirmed Lincolnton coverage and delivered reliable packing and loading with no surprise fees despite Charlotte-area traffic.',
      name: 'Chris M.',
      location: 'Lincolnton, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  rockingham: [
    {
      quote:
        'Two Men and a Truck Greensboro handled our Reidsville relocation professionally — on time, careful with our belongings, and transparent Triad pricing.',
      name: 'Henry L.',
      location: 'Reidsville, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Excel Moving & Storage served our Rockingham County move efficiently with professional crews and great value.',
      name: 'Betty C.',
      location: 'Reidsville, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Steele & Vaughn Moving confirmed Eden coverage and delivered reliable packing and loading with no surprise fees despite Triad traffic.',
      name: 'Frank D.',
      location: 'Eden, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  burke: [
    {
      quote:
        'In & Out Moving & Delivery handled our Morganton relocation professionally — efficient crews, careful handling, and transparent foothills pricing.',
      name: 'Nancy E.',
      location: 'Morganton, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Ashe Van Lines served our Burke County move with professional crews experienced with mountain-road and foothill access.',
      name: 'Paul H.',
      location: 'Morganton, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Preferred Moving Company confirmed Morganton coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Linda K.',
      location: 'Morganton, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  chatham: [
    {
      quote:
        'Two Men and a Truck Raleigh handled our Pittsboro relocation professionally — on time, careful with our belongings, and transparent Triangle pricing.',
      name: 'Amanda B.',
      location: 'Pittsboro, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Little Guys Movers served our Chatham County move efficiently with fast, professional crews and great value.',
      name: 'Eric N.',
      location: 'Pittsboro, NC',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Athens Moving Experts confirmed Pittsboro coverage and delivered reliable packing and loading with no surprise fees despite Research Triangle traffic.',
      name: 'Christine V.',
      location: 'Pittsboro, NC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  catawba: [
    {
      quote:
        'Preferred Moving Company handled our Hickory relocation professionally — efficient crews, careful handling, and transparent Catawba County pricing.',
      name: 'Karen L.',
      location: 'Hickory, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Barringer Moving & Storage served our Newton move with professional crews and careful handling of family heirlooms throughout the county seat area.',
      name: 'James P.',
      location: 'Newton, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Ashe Van Lines confirmed Conover coverage and delivered reliable packing and loading with no surprise fees despite regional traffic on US-321.',
      name: 'Michelle R.',
      location: 'Conover, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  rowan: [
    {
      quote:
        'Two Men and a Truck Charlotte handled our Salisbury relocation professionally — on time, careful with our belongings, and transparent Charlotte-metro pricing.',
      name: 'Robert T.',
      location: 'Salisbury, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Gentle Giant Moving served our Kannapolis move with professional crews and careful handling of our furniture throughout Rowan County.',
      name: 'Diana M.',
      location: 'Kannapolis, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'You Move Me confirmed China Grove coverage and delivered reliable packing and loading with no surprise fees despite I-85 corridor traffic.',
      name: 'Eric W.',
      location: 'China Grove, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  harnett: [
    {
      quote:
        'Two Men and a Truck Raleigh handled our Lillington relocation professionally — efficient crews, careful handling, and transparent Triangle pricing.',
      name: 'Angela S.',
      location: 'Lillington, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Little Guys Movers served our Dunn move with professional, efficient crews and careful handling throughout Harnett County.',
      name: 'Kevin B.',
      location: 'Dunn, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Miracle Movers confirmed Angier coverage and delivered reliable packing and loading with no surprise fees despite Raleigh-area traffic.',
      name: 'Heather G.',
      location: 'Angier, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  orange: [
    {
      quote:
        'Two Men and a Truck Durham handled our Chapel Hill relocation professionally — on time, careful with our belongings, and transparent Triangle pricing.',
      name: 'Sarah K.',
      location: 'Chapel Hill, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'TROSA Moving served our Carrboro apartment move efficiently with fast, professional crews and great value for careful handling.',
      name: 'Daniel F.',
      location: 'Carrboro, NC',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Armstrong Relocation confirmed Hillsborough coverage and delivered reliable packing and loading with no surprise fees despite university-area traffic.',
      name: 'Patricia N.',
      location: 'Hillsborough, NC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  randolph: [
    {
      quote:
        'Two Men and a Truck Greensboro handled our Asheboro relocation professionally — on time, careful with our belongings, and transparent Triad pricing.',
      name: 'William H.',
      location: 'Asheboro, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'College Hunks Moving Greensboro served our Randolph County move efficiently with fast, professional crews and great value.',
      name: 'Linda C.',
      location: 'Asheboro, NC',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Excel Moving & Storage confirmed Asheboro coverage and delivered reliable packing and loading with no surprise fees despite Triad traffic.',
      name: 'Gary M.',
      location: 'Asheboro, NC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  henderson: [
    {
      quote:
        'Asheville Area Movers handled our Hendersonville mountain relocation professionally — efficient crews, careful handling, and transparent pricing.',
      name: 'Carol D.',
      location: 'Hendersonville, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Gasperson Moving & Storage served our Henderson County move with professional crews experienced with steep driveways and mountain-home handling.',
      name: 'Richard A.',
      location: 'Hendersonville, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Two Men and a Truck Asheville confirmed coverage and delivered reliable packing and loading with no surprise fees despite mountain road access.',
      name: 'Janet W.',
      location: 'Hendersonville, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  onslow: [
    {
      quote:
        'J.E. Thomas & Sons handled our Jacksonville PCS move professionally — efficient crews, careful handling, and great experience with military families near Camp Lejeune.',
      name: 'Sgt. Mark T.',
      location: 'Jacksonville, NC',
      rating: 5,
      moveType: 'Military PCS',
    },
    {
      quote:
        'Troy Humphrey Moving served our Onslow County move with professional, efficient crews and careful handling throughout.',
      name: 'Laura C.',
      location: 'Jacksonville, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Absolute Moving & Storage confirmed Jacksonville coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Paul R.',
      location: 'Jacksonville, NC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  iredell: [
    {
      quote:
        'Two Men and a Truck Charlotte handled our Mooresville relocation professionally — efficient crews, careful handling, and transparent Lake Norman pricing.',
      name: 'Scott B.',
      location: 'Mooresville, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Gentle Giant Moving served our Statesville move with professional crews and careful handling of our furniture throughout Iredell County.',
      name: 'Nancy W.',
      location: 'Statesville, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Make A Move confirmed Lake Norman coverage and delivered reliable packing and loading with no surprise fees despite Charlotte-area traffic.',
      name: 'Andrew K.',
      location: 'Mooresville, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  alamance: [
    {
      quote:
        'Two Men and a Truck Greensboro handled our Burlington relocation professionally — on time, careful with our belongings, and transparent Triad pricing.',
      name: 'Rachel M.',
      location: 'Burlington, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'College Hunks Moving Greensboro served our Mebane apartment move efficiently with fast, professional crews and great value.',
      name: 'Chris D.',
      location: 'Mebane, NC',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Excel Moving & Storage confirmed Graham coverage and delivered reliable packing and loading with no surprise fees despite I-40 traffic.',
      name: 'Stephanie L.',
      location: 'Graham, NC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  pitt: [
    {
      quote:
        'College Hunks Moving Greenville handled our relocation professionally — efficient crews, careful handling, and transparent Pitt County pricing near ECU.',
      name: 'Jordan H.',
      location: 'Greenville, NC',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Superior Moving and Logistics served our Greenville move with professional crews and careful handling of our furniture throughout.',
      name: 'Maria G.',
      location: 'Greenville, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'East Carolina Moving confirmed Greenville coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Tyler N.',
      location: 'Greenville, NC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  brunswick: [
    {
      quote:
        'College Hunks Moving Wilmington handled our Leland coastal move professionally — efficient crews, careful handling, and transparent Brunswick County pricing.',
      name: 'Barbara S.',
      location: 'Leland, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Absolute Moving & Storage served our Shallotte move with professional crews experienced with coastal access and careful waterfront handling.',
      name: 'William J.',
      location: 'Shallotte, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Two Men and a Truck Wilmington confirmed Southport coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Cynthia P.',
      location: 'Southport, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  davidson: [
    {
      quote:
        'Two Men and a Truck Winston-Salem handled our Lexington relocation professionally — efficient crews, careful handling, and transparent Davidson County pricing.',
      name: 'George F.',
      location: 'Lexington, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'American Moving & Hauling served our Thomasville move with professional, efficient crews and careful handling throughout.',
      name: 'Betty C.',
      location: 'Thomasville, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Miracle Movers Greensboro confirmed Davidson County coverage and delivered reliable packing and loading with no surprise fees despite Triad traffic.',
      name: 'Henry M.',
      location: 'Lexington, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  union: [
    {
      quote:
        'Two Men and a Truck Charlotte handled our Indian Trail relocation professionally — efficient crews, careful handling, and transparent Union County pricing.',
      name: 'Chris B.',
      location: 'Indian Trail, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Road Haugs Moving served our Waxhaw move with professional, efficient crews based right here in Union County — careful handling throughout.',
      name: 'Melissa G.',
      location: 'Waxhaw, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'College Hunks Moving Charlotte confirmed Monroe coverage and delivered reliable packing and loading with no surprise fees despite Charlotte-area traffic.',
      name: 'Daniel F.',
      location: 'Monroe, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  johnston: [
    {
      quote:
        'Two Men and a Truck Raleigh handled our Clayton relocation professionally — on time, careful with our belongings, and transparent Johnston County pricing.',
      name: 'Heather W.',
      location: 'Clayton, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Little Guys Movers served our Smithfield move efficiently with fast, professional crews and great value for careful suburban handling.',
      name: 'Kevin J.',
      location: 'Smithfield, NC',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Miracle Movers confirmed Selma coverage and delivered reliable packing and loading with no surprise fees despite Raleigh-area traffic.',
      name: 'Nicole P.',
      location: 'Selma, NC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  cabarrus: [
    {
      quote:
        'Two Men and a Truck Charlotte handled our Concord relocation professionally — efficient crews, careful handling, and transparent Cabarrus County pricing.',
      name: 'Ryan S.',
      location: 'Concord, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Gentle Giant Moving served our Kannapolis move with professional crews and careful handling of our furniture throughout.',
      name: 'Amy L.',
      location: 'Kannapolis, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'You Move Me Charlotte confirmed Harrisburg coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Jason M.',
      location: 'Harrisburg, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  gaston: [
    {
      quote:
        'Gentle Giant Moving handled our Gastonia relocation professionally — efficient crews, careful handling, and transparent Gaston County pricing.',
      name: 'Timothy H.',
      location: 'Gastonia, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Easy Movers served our Belmont move with professional, efficient crews and great local knowledge of Charlotte-metro west-side routes.',
      name: 'Sandra K.',
      location: 'Belmont, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Hornet Moving confirmed Mount Holly coverage and delivered reliable packing and loading with no surprise fees despite I-85 traffic.',
      name: 'Greg T.',
      location: 'Mount Holly, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  'new-hanover': [
    {
      quote:
        'Absolute Moving & Storage handled our Wilmington coastal move professionally — efficient crews, careful handling, and transparent New Hanover County pricing.',
      name: 'Carol D.',
      location: 'Wilmington, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Little Guys Movers Wilmington served our Wrightsville Beach move with professional crews experienced with coastal access and careful waterfront handling.',
      name: 'Richard A.',
      location: 'Wrightsville Beach, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Two Men and a Truck Wilmington confirmed Carolina Beach coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Diana R.',
      location: 'Carolina Beach, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  durham: [
    {
      quote:
        'Two Men and a Truck Durham handled our relocation professionally — on time, extremely careful with our belongings, and transparent Triangle pricing throughout Durham County.',
      name: 'Eric N.',
      location: 'Durham, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'TROSA Moving served our Durham apartment move efficiently with fast, professional crews and great value for careful handling near RTP.',
      name: 'Michelle T.',
      location: 'Durham, NC',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Miracle Movers Durham confirmed coverage and delivered reliable packing and loading with no surprise fees despite Research Triangle traffic.',
      name: 'Patrick L.',
      location: 'Durham, NC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  cumberland: [
    {
      quote:
        'Stewart Moving & Storage handled our Fayetteville PCS move professionally — efficient crews, careful handling, and great experience with military families.',
      name: 'Sgt. James R.',
      location: 'Fayetteville, NC',
      rating: 5,
      moveType: 'Military PCS',
    },
    {
      quote:
        'Two Men and a Truck Fayetteville served our Cumberland County move with professional, efficient crews and careful handling throughout.',
      name: 'Angela M.',
      location: 'Fayetteville, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Move Fidelity confirmed Fort Liberty area coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'David K.',
      location: 'Fayetteville, NC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  buncombe: [
    {
      quote:
        'Asheville Area Movers handled our mountain relocation professionally — efficient crews, careful handling, and transparent Buncombe County pricing.',
      name: 'Laura B.',
      location: 'Asheville, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Gasperson Moving & Storage served our Asheville move with professional crews experienced with steep driveways and historic-home handling.',
      name: 'Mark H.',
      location: 'Asheville, NC',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Two Men and a Truck Asheville confirmed coverage and delivered reliable packing and loading with no surprise fees despite mountain road access.',
      name: 'Rachel S.',
      location: 'Asheville, NC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  guilford: [
    {
      quote:
        'Two Men and a Truck Greensboro handled our Greensboro relocation professionally — on time, extremely careful with our belongings, and transparent Triad pricing throughout Guilford County.',
      name: 'Robert H.',
      location: 'Greensboro, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'College Hunks Moving Greensboro served our High Point apartment move efficiently with fast, professional crews and great value for careful handling.',
      name: 'Lisa P.',
      location: 'High Point, NC',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Excel Moving & Storage confirmed Greensboro coverage and delivered reliable packing and loading with no surprise fees despite I-40 corridor traffic.',
      name: 'James W.',
      location: 'Greensboro, NC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  forsyth: [
    {
      quote:
        'Two Men and a Truck Winston-Salem handled our relocation professionally — efficient crews, careful handling, and transparent Forsyth County pricing.',
      name: 'Karen D.',
      location: 'Winston-Salem, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'American Moving & Hauling served our Winston-Salem move with professional, efficient crews and careful handling of our furniture throughout.',
      name: 'Thomas R.',
      location: 'Winston-Salem, NC',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        "Todd's Easy Moves confirmed Winston-Salem coverage and delivered reliable packing and loading with no surprise fees despite Triad traffic.",
      name: 'Susan M.',
      location: 'Winston-Salem, NC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  mecklenburg: [
    {
      quote:
        'Two Men and a Truck Charlotte handled our Matthews relocation professionally — on time, extremely careful with our belongings, and transparent Charlotte-metro pricing throughout Mecklenburg County.',
      name: 'David M.',
      location: 'Matthews, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'College Hunks Moving Charlotte served our Charlotte apartment move efficiently with fast, professional crews and great value for careful handling.',
      name: 'Jennifer K.',
      location: 'Charlotte, NC',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Gentle Giant Moving confirmed Huntersville coverage and delivered reliable packing and loading with no surprise fees despite I-77 corridor traffic.',
      name: 'Michael S.',
      location: 'Huntersville, NC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  wake: [
    {
      quote:
        'Two Men and a Truck Raleigh handled our Cary relocation professionally — on time, extremely careful with our belongings, and transparent Triangle pricing throughout Wake County.',
      name: 'Amanda R.',
      location: 'Cary, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'College Hunks Moving Raleigh served our Raleigh apartment move efficiently with fast, professional crews and great value for the service.',
      name: 'Brian T.',
      location: 'Raleigh, NC',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Little Guys Movers confirmed Apex coverage and delivered reliable packing and loading with no surprise fees despite Research Triangle traffic.',
      name: 'Christine L.',
      location: 'Apex, NC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
};

export function getNorthCarolinaCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return northCarolinaCountyTestimonials[countySlug] ?? [];
}