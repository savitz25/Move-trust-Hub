export type CountyTestimonialEntry = {
  quote: string;
  name: string;
  location: string;
  rating: number;
  moveType?: string;
};

export const texasCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  baylor: [
    {
      quote:
        'Seymour is remote North Texas ranch country. A Wichita Falls regional crew confirmed coverage and handled our Baylor County move with professional care on long gravel driveways.',
      name: 'Wayne D.',
      location: 'Seymour, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Baylor County has almost no local movers. An Abilene provider made the trip and was reliable in remote areas despite the sparse market.',
      name: 'Frances K.',
      location: 'Baylor County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Seymour ranch move needed flexible scheduling around cattle work. The Wichita Falls team was careful with antiques and upfront about travel fees.',
      name: 'Billy R.',
      location: 'Seymour, TX',
      rating: 4,
      moveType: 'Ranch outbuilding',
    },
  ],
  armstrong: [
    {
      quote:
        'Our Claude ranch move needed an Amarillo crew willing to handle a long Panhandle driveway. Professional service, careful handling, and clear travel-fee estimates made a remote Armstrong County relocation manageable.',
      name: 'Gary N.',
      location: 'Claude, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Finding movers for Armstrong County was tough until a Lubbock regional provider confirmed coverage. They navigated gravel ranch roads and finished faster than we expected despite the distance.',
      name: 'Diane W.',
      location: 'Armstrong County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'We relocated a small home near Claude with no local storage. The Amarillo team coordinated a warehouse hold and kept us updated throughout the Panhandle trip.',
      name: 'Rick S.',
      location: 'Claude, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  borden: [
    {
      quote:
        'Our Gail ranch move required a crew willing to drive in from Lubbock and navigate a long caliche driveway. They confirmed truck size ahead of time and handled our remote West Texas relocation professionally.',
      name: 'James R.',
      location: 'Gail, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Finding movers for Borden County was nearly impossible until a Midland-based team agreed to make the trip. Careful handling on rough ranch roads and fair travel-fee disclosure made the process manageable.',
      name: 'Susan T.',
      location: 'Borden County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'We relocated a small home near Gail with limited storage options nearby. The regional provider coordinated a Lubbock warehouse hold and delivered on schedule despite the sparse local market.',
      name: 'Mark D.',
      location: 'Gail, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  cochran: [
    {
      quote:
        'Morton is remote West Texas ranch and oilfield country. A Lubbock regional crew confirmed coverage and handled our move professionally across challenging terrain.',
      name: 'Ray T.',
      location: 'Morton, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Cochran County has almost no local movers. A Midland provider made the long haul, gave careful handling, and was reliable despite sparse cell service.',
      name: 'Donna M.',
      location: 'Cochran County, TX',
      rating: 5,
      moveType: 'Oilfield area',
    },
    {
      quote:
        'Our Morton relocation needed flexible scheduling around harvest. The Lubbock team was upfront about travel fees and finished faster than we expected.',
      name: 'Keith S.',
      location: 'Morton, TX',
      rating: 4,
      moveType: 'Rural',
    },
  ],
  concho: [
    {
      quote:
        'Paint Rock sits in remote Concho County ranchland. A San Angelo regional crew handled our West Texas move professionally with careful handling on caliche roads.',
      name: 'Leroy H.',
      location: 'Paint Rock, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Concho County movers are scarce. An Abilene provider confirmed service area and was reliable despite the long brush-country haul.',
      name: 'Wanda S.',
      location: 'Concho County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Paint Rock relocation had limited storage nearby. The San Angelo team coordinated regional warehouse space and delivered on schedule.',
      name: 'Curtis M.',
      location: 'Paint Rock, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  crane: [
    {
      quote:
        'Crane sits in Permian Basin oilfield country. A Midland regional crew handled our remote West Texas move across challenging ranch and field roads.',
      name: 'Danny L.',
      location: 'Crane, TX',
      rating: 5,
      moveType: 'Oilfield area',
    },
    {
      quote:
        'Crane County has no dedicated local movers. A San Angelo provider drove in and was professional despite the long West Texas distance.',
      name: 'Rhonda P.',
      location: 'Crane County, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Our Crane move required planning around field operations. The Midland team was reliable and upfront about storage limitations.',
      name: 'Todd W.',
      location: 'Crane, TX',
      rating: 4,
      moveType: 'Rural',
    },
  ],
  coke: [
    {
      quote:
        'Robert Lee ranch moves are rare in Coke County. A San Angelo regional crew confirmed coverage and handled our West Texas relocation with careful handling on gravel roads.',
      name: 'Wade T.',
      location: 'Robert Lee, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Coke County has almost no local movers. An Abilene provider made the trip and was reliable in remote brush country despite the long haul.',
      name: 'Bonnie R.',
      location: 'Coke County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Robert Lee move needed flexible scheduling around ranch work. The San Angelo team was professional and upfront about storage limitations.',
      name: 'Clyde M.',
      location: 'Robert Lee, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  collingsworth: [
    {
      quote:
        'Wellington is deep eastern Panhandle ranchland. An Amarillo crew drove in, verified our long driveway, and handled our remote move with professional care.',
      name: 'Betty L.',
      location: 'Wellington, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Collingsworth County movers are scarce. A Lubbock regional provider confirmed service area and was reliable in a very remote Panhandle market.',
      name: 'Harold J.',
      location: 'Collingsworth County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'We moved near Wellington with no local storage. The Amarillo team coordinated regional warehouse space and kept communication clear throughout.',
      name: 'Sharon W.',
      location: 'Wellington, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  crockett: [
    {
      quote:
        'Ozona sits in remote Crockett County ranch and oilfield country. A San Angelo crew handled our move professionally across challenging West Texas terrain.',
      name: 'Randy K.',
      location: 'Ozona, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Finding movers for Ozona was nearly impossible until a Midland regional provider agreed. Reliable in remote areas with clear travel-fee estimates.',
      name: 'Sylvia H.',
      location: 'Crockett County, TX',
      rating: 5,
      moveType: 'Oilfield area',
    },
    {
      quote:
        'Our Ozona relocation had limited storage options. The San Angelo team coordinated regional warehouse space and delivered careful handling throughout.',
      name: 'Dale P.',
      location: 'Ozona, TX',
      rating: 4,
      moveType: 'Rural',
    },
  ],
  culberson: [
    {
      quote:
        'Van Horn sits in remote desert country along I-10. An El Paso regional crew handled our move professionally with careful handling on rough access roads.',
      name: 'Miguel R.',
      location: 'Van Horn, TX',
      rating: 5,
      moveType: 'Desert',
    },
    {
      quote:
        'Culberson County required cross-border coordination from Carlsbad, NM. The regional provider verified licensing and was reliable in remote West Texas.',
      name: 'Janet C.',
      location: 'Culberson County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Van Horn relocation had severe storage limitations. The El Paso team was upfront about regional facilities and delivered efficiently.',
      name: 'Frank D.',
      location: 'Van Horn, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  briscoe: [
    {
      quote:
        'Silverton is incredibly remote, but an Amarillo regional crew made our Panhandle ranch move work. Careful handling on rough roads and upfront service-area confirmation saved us from a no-show.',
      name: 'Tom H.',
      location: 'Silverton, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Briscoe County has almost no local movers. A Lubbock provider drove in, handled our outbuildings, and gave a fair estimate for the long rural haul.',
      name: 'Karen L.',
      location: 'Briscoe County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Panhandle relocation from Silverton required flexible scheduling around weather. The regional team was reliable in remote areas and professional throughout.',
      name: 'Jeff M.',
      location: 'Silverton, TX',
      rating: 4,
      moveType: 'Ranch outbuilding',
    },
  ],
  cottle: [
    {
      quote:
        'Paducah is a long haul from anywhere, but a Wichita Falls crew confirmed coverage and handled our North Texas ranch move professionally with careful packing.',
      name: 'Laura B.',
      location: 'Paducah, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'We worried no one would serve Cottle County until an Abilene regional provider agreed. Reliable in remote areas with clear travel-fee disclosure.',
      name: 'Mike C.',
      location: 'Cottle County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Paducah move involved a gravel driveway and limited cell service. The movers coordinated arrival windows well and finished the job without damaging floors or fences.',
      name: 'Sandra P.',
      location: 'Paducah, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  donley: [
    {
      quote:
        'Clarendon is quiet Panhandle ranch country. An Amarillo regional crew drove in, verified our long driveway, and handled our Donley County move professionally.',
      name: 'Marvin L.',
      location: 'Clarendon, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Donley County movers are scarce. A Lubbock provider confirmed service area and was reliable on remote Panhandle ranch roads.',
      name: 'Gail S.',
      location: 'Donley County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'We relocated near Clarendon with no local storage. The Amarillo team coordinated warehouse space and finished faster than we expected.',
      name: 'Otis W.',
      location: 'Clarendon, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  dickens: [
    {
      quote:
        'Dickens is remote North Texas ranch country. A Lubbock regional crew confirmed service to Dickens County and handled our move with careful packing.',
      name: 'Walter H.',
      location: 'Dickens, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Finding movers for Dickens County was tough until an Abilene provider agreed. Professional service and reliable communication throughout the long rural haul.',
      name: 'Gloria P.',
      location: 'Dickens County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Dickens ranch move involved a gravel driveway and limited storage. The Lubbock team coordinated regional options and finished on schedule.',
      name: 'Earl B.',
      location: 'Dickens, TX',
      rating: 4,
      moveType: 'Ranch outbuilding',
    },
  ],
  edwards: [
    {
      quote:
        'Rocksprings sits in rugged Hill Country ranchland. A San Angelo crew drove in, verified access roads, and handled our remote South Texas move with professional care.',
      name: 'Carlos R.',
      location: 'Rocksprings, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Edwards County movers are essentially nonexistent locally. A Del Rio regional provider covered our ranch relocation and was reliable despite the long distance.',
      name: 'Maria G.',
      location: 'Edwards County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'We moved a small home near Rocksprings with no nearby storage. The San Angelo team coordinated regional warehouse space and delivered on schedule.',
      name: 'Bill T.',
      location: 'Rocksprings, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  fisher: [
    {
      quote:
        'Roby is quiet Fisher County ranchland. An Abilene regional crew confirmed service and handled our move with careful handling on rough ranch roads.',
      name: 'Glenn A.',
      location: 'Roby, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Fisher County has almost no moving options. A San Angelo provider made the long drive and was reliable in remote West Texas.',
      name: 'Peggy N.',
      location: 'Fisher County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Roby relocation needed flexible timing around harvest. The Abilene team was professional and finished faster than expected.',
      name: 'Harold C.',
      location: 'Roby, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  foard: [
    {
      quote:
        'Crowell is remote North Texas ranch country. A Wichita Falls regional crew confirmed service area upfront and handled our move professionally despite challenging access.',
      name: 'John D.',
      location: 'Crowell, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Foard County has almost no moving options. An Abilene provider made the trip, gave careful handling on antiques, and finished on time.',
      name: 'Patricia A.',
      location: 'Foard County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Crowell relocation needed flexible scheduling around cattle operations. The regional movers were professional and reliable in a very sparse market.',
      name: 'Wayne F.',
      location: 'Crowell, TX',
      rating: 4,
      moveType: 'Ranch',
    },
  ],
  hall: [
    {
      quote:
        'Memphis is remote eastern Panhandle ranchland. An Amarillo crew handled our Hall County move with professional care and careful handling on caliche roads.',
      name: 'Vernon J.',
      location: 'Memphis, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Hall County has almost no dedicated movers. A Lubbock regional provider confirmed coverage and was reliable despite the sparse local market.',
      name: 'Lois B.',
      location: 'Hall County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Memphis ranch move required planning around harvest season. The Amarillo team was upfront about travel fees and delivered efficient service.',
      name: 'Calvin D.',
      location: 'Memphis, TX',
      rating: 4,
      moveType: 'Ranch outbuilding',
    },
  ],
  hardeman: [
    {
      quote:
        'Quanah is remote North Texas border ranch country. A Wichita Falls regional crew handled our Hardeman County move with professional care and clear travel estimates.',
      name: 'Virgil T.',
      location: 'Quanah, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Hardeman County movers are hard to find. An Abilene provider confirmed coverage and was reliable on long rural ranch driveways.',
      name: 'Irene J.',
      location: 'Hardeman County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Quanah move had limited storage options. The Wichita Falls team coordinated regional facilities and delivered careful handling throughout.',
      name: 'Melvin B.',
      location: 'Quanah, TX',
      rating: 4,
      moveType: 'Ranch outbuilding',
    },
  ],
  hemphill: [
    {
      quote:
        'Canadian sits in the northeastern Panhandle with rugged ranch access. An Amarillo crew handled our Hemphill County move professionally on gravel ranch roads.',
      name: 'Stuart G.',
      location: 'Canadian, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Hemphill County has no local full-service movers. A Lubbock regional provider confirmed service and was reliable in remote Panhandle country.',
      name: 'Darlene F.',
      location: 'Hemphill County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Canadian relocation required planning around weather and long driveways. The Amarillo team was upfront about travel fees and efficient on site.',
      name: 'Rex M.',
      location: 'Canadian, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  glasscock: [
    {
      quote:
        'Garden City is deep Permian Basin country. A Midland/Odessa regional crew handled our oilfield-area move professionally across challenging desert terrain.',
      name: 'Derek S.',
      location: 'Garden City, TX',
      rating: 5,
      moveType: 'Oilfield area',
    },
    {
      quote:
        'Glasscock County has no local movers. A San Angelo team agreed to the long drive and gave careful handling on our remote West Texas ranch property.',
      name: 'Rachel K.',
      location: 'Glasscock County, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'We relocated near Garden City with limited storage nearby. The regional provider was upfront about Midland warehouse options and delivered efficiently.',
      name: 'Steve M.',
      location: 'Garden City, TX',
      rating: 4,
      moveType: 'Rural',
    },
  ],
  'jeff-davis': [
    {
      quote:
        'Fort Davis mountain properties are uniquely challenging. An Alpine regional crew verified access roads, handled elevation carefully, and made our remote Davis Mountains move work.',
      name: 'Helen K.',
      location: 'Fort Davis, TX',
      rating: 5,
      moveType: 'Mountain',
    },
    {
      quote:
        'Jeff Davis County has no local movers. An El Paso provider drove in for our ranch relocation and was professional despite the long West Texas distance.',
      name: 'Robert N.',
      location: 'Jeff Davis County, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Our Fort Davis move required planning around narrow mountain roads. The Alpine team was careful with antiques and upfront about storage limitations.',
      name: 'Diana S.',
      location: 'Fort Davis, TX',
      rating: 4,
      moveType: 'Rural',
    },
  ],
  irion: [
    {
      quote:
        'Mertzon ranch moves are rare. A San Angelo regional crew confirmed coverage, navigated our long driveway, and handled furniture and barn tools in one organized day.',
      name: 'Linda J.',
      location: 'Mertzon, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Irion County is sparsely served, but a Midland provider made the trip for our West Texas relocation. Professional service and reliable communication throughout.',
      name: 'Chris B.',
      location: 'Irion County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Mertzon move required careful planning around brush-country roads. The San Angelo team was efficient, reliable, and careful with fragile items.',
      name: 'Amy W.',
      location: 'Mertzon, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  'jim-hogg': [
    {
      quote:
        'Hebbronville is deep South Texas ranch country. A Laredo regional crew confirmed coverage and handled our Jim Hogg County move with professional care.',
      name: 'Raul V.',
      location: 'Hebbronville, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Jim Hogg County has almost no dedicated movers. A Corpus Christi provider made the long haul and was reliable in remote brush country.',
      name: 'Carmen S.',
      location: 'Jim Hogg County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Hebbronville relocation had severe storage limitations. The Laredo team coordinated regional facilities and kept us updated throughout.',
      name: 'Arturo M.',
      location: 'Hebbronville, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  kimble: [
    {
      quote:
        'Junction is rugged Hill Country at the Llano River. A San Angelo regional crew handled our Kimble County ranch move with careful handling on steep access roads.',
      name: 'Nora W.',
      location: 'Junction, TX',
      rating: 5,
      moveType: 'Hill Country',
    },
    {
      quote:
        'Kimble County movers are scarce. A Kerrville provider drove in and was professional despite narrow ranch roads and limited parking.',
      name: 'Clay R.',
      location: 'Kimble County, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Our Junction move needed flexible scheduling around river property access. The San Angelo team was reliable and careful with fragile heirlooms.',
      name: 'Becky H.',
      location: 'Junction, TX',
      rating: 4,
      moveType: 'Rural',
    },
  ],
  kinney: [
    {
      quote:
        'Brackettville is remote South Texas ranch country near the border. A Del Rio regional crew confirmed service and handled our Kinney County move with professional care.',
      name: 'Hector V.',
      location: 'Brackettville, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Kinney County movers are hard to find. A San Antonio provider made the long haul and was reliable in remote ranch terrain.',
      name: 'Maria L.',
      location: 'Kinney County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Brackettville relocation had severe storage limitations. The Del Rio team coordinated regional facilities and kept communication clear throughout.',
      name: 'Jorge R.',
      location: 'Brackettville, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  kenedy: [
    {
      quote:
        'Our Sarita ranch move needed a Corpus Christi crew comfortable with South Texas heat and long ranch gates. They verified service area upfront and finished the load without damaging our tile floors.',
      name: 'Elena V.',
      location: 'Sarita, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Kenedy County is so remote that most movers declined until a Kingsville-based provider agreed. Professional service, careful packing, and clear travel-fee estimates saved us from a last-minute scramble.',
      name: 'Carlos M.',
      location: 'Kenedy County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'We moved out of a remote South Texas property with no local storage. The regional team routed our overflow through a Corpus Christi facility and kept us updated throughout the multi-day job.',
      name: 'Linda K.',
      location: 'Sarita, TX',
      rating: 4,
      moveType: 'Ranch outbuilding',
    },
  ],
  king: [
    {
      quote:
        'Guthrie is about as remote as it gets in Texas. A Lubbock regional crew drove hours in, handled our ranch house and barn tools, and navigated our gravel access road without issues.',
      name: 'Tom W.',
      location: 'Guthrie, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'We worried no one would serve King County until a Wichita Falls provider confirmed coverage. Professional for our remote ranch move with careful handling of antiques and livestock-area equipment.',
      name: 'Karen B.',
      location: 'King County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our King County relocation involved a long driveway and limited cell service. The movers coordinated arrival windows clearly and finished faster than expected despite the West Texas distance.',
      name: 'Derek H.',
      location: 'Guthrie, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  sterling: [
    {
      quote:
        'Sterling City ranch moves are uncommon. A San Angelo regional crew handled our remote West Texas relocation with careful handling on rough ranch roads.',
      name: 'Robert E.',
      location: 'Sterling City, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Sterling County has no dedicated movers. A Midland provider drove in for our oilfield-area home and was professional despite the long Permian Basin haul.',
      name: 'Nancy H.',
      location: 'Sterling County, TX',
      rating: 5,
      moveType: 'Oilfield area',
    },
    {
      quote:
        'We moved near Sterling City with very limited local storage. The San Angelo team coordinated regional facilities and kept us informed throughout.',
      name: 'Tim G.',
      location: 'Sterling City, TX',
      rating: 4,
      moveType: 'Rural',
    },
  ],
  stonewall: [
    {
      quote:
        'Aspermont is remote North Texas ranchland. An Abilene regional crew confirmed service to Stonewall County and handled our move with professional care.',
      name: 'James P.',
      location: 'Aspermont, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Stonewall County movers are hard to find. A Wichita Falls provider made the trip, gave careful handling, and was reliable in remote areas.',
      name: 'Susan R.',
      location: 'Stonewall County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Aspermont relocation involved a long caliche driveway. The Abilene team verified truck size ahead of time and finished faster than expected.',
      name: 'Mark L.',
      location: 'Aspermont, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  throckmorton: [
    {
      quote:
        'Throckmorton ranch moves need regional crews. An Abilene provider served our remote North Texas property professionally with clear travel-fee estimates.',
      name: 'Donna K.',
      location: 'Throckmorton, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Throckmorton County has almost no local options. A Wichita Falls team drove in, handled our ranch house and equipment, and was careful throughout.',
      name: 'Paul S.',
      location: 'Throckmorton County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'We relocated within Throckmorton with limited storage nearby. The Abilene regional movers coordinated warehouse space and delivered on schedule.',
      name: 'Janet M.',
      location: 'Throckmorton, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  menard: [
    {
      quote:
        'Menard ranch moves are uncommon. A San Angelo regional crew confirmed coverage, navigated our long driveway, and handled the job professionally.',
      name: 'Claude F.',
      location: 'Menard, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Menard County has almost no moving options. An Abilene provider made the trip and was reliable in remote West Texas brush country.',
      name: 'Ruth A.',
      location: 'Menard County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Menard relocation needed careful scheduling around ranch operations. The San Angelo team was efficient and careful with fragile items.',
      name: 'Gene M.',
      location: 'Menard, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  oldham: [
    {
      quote:
        'Vega sits on the western Panhandle with long ranch driveways. An Amarillo crew handled our remote move professionally with clear travel-fee estimates.',
      name: 'Norman G.',
      location: 'Vega, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Oldham County movers are essentially nonexistent locally. A Lubbock regional provider confirmed service and was reliable on Route 66 corridor ranch roads.',
      name: 'Irene C.',
      location: 'Oldham County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'We relocated near Vega with limited storage nearby. The Amarillo team coordinated warehouse space and delivered careful handling throughout.',
      name: 'Roy T.',
      location: 'Vega, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  real: [
    {
      quote:
        'Leakey is rugged Hill Country along the Frio River. A San Antonio regional crew handled our remote Real County move with professional care on narrow ranch roads.',
      name: 'Pamela J.',
      location: 'Leakey, TX',
      rating: 5,
      moveType: 'Hill Country',
    },
    {
      quote:
        'Real County has almost no dedicated movers. A Kerrville provider drove in, gave careful handling, and was reliable despite the long Hill Country haul.',
      name: 'Doug R.',
      location: 'Real County, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Our Leakey relocation involved steep access and limited cell service. The Kerrville team coordinated arrival windows well and finished on time.',
      name: 'Vicki L.',
      location: 'Leakey, TX',
      rating: 4,
      moveType: 'Rural',
    },
  ],
  schleicher: [
    {
      quote:
        'Eldorado is remote Schleicher County ranchland. A San Angelo regional crew confirmed service area and handled our West Texas move professionally.',
      name: 'Larry W.',
      location: 'Eldorado, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Schleicher County movers are hard to find. A Midland provider made the long drive and was reliable in remote brush country.',
      name: 'Connie H.',
      location: 'Schleicher County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Eldorado move needed flexible timing around cattle work. The San Angelo team was careful with furniture and upfront about storage limits.',
      name: 'Bobby E.',
      location: 'Eldorado, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  sherman: [
    {
      quote:
        'Stratford is northern Panhandle ranch country. An Amarillo regional crew handled our remote Sherman County move with careful handling on gravel roads.',
      name: 'Dean P.',
      location: 'Stratford, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Sherman County has no local full-service movers. A Lubbock provider confirmed coverage and was professional despite the long Panhandle distance.',
      name: 'Joyce K.',
      location: 'Sherman County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'We relocated near Stratford with very limited storage. The Amarillo team coordinated regional facilities and kept us updated throughout.',
      name: 'Terry S.',
      location: 'Stratford, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  knox: [
    {
      quote:
        'Benjamin is remote Knox County ranchland. A Wichita Falls regional crew confirmed service area and handled our North Texas move professionally.',
      name: 'Jerry P.',
      location: 'Benjamin, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Knox County has almost no local movers. An Abilene provider made the trip and was reliable on long caliche ranch driveways.',
      name: 'Louise D.',
      location: 'Knox County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Benjamin ranch move involved outbuildings and limited cell service. The Wichita Falls team coordinated arrival windows well and finished on time.',
      name: 'Kenny L.',
      location: 'Benjamin, TX',
      rating: 4,
      moveType: 'Ranch outbuilding',
    },
  ],
  mason: [
    {
      quote:
        'Mason is classic Texas Hill Country with historic charm and ranch access challenges. A San Angelo crew handled our move with professional Hill Country experience.',
      name: 'Elaine K.',
      location: 'Mason, TX',
      rating: 5,
      moveType: 'Hill Country',
    },
    {
      quote:
        'Mason County movers are limited. A Fredericksburg regional provider confirmed coverage and was reliable on narrow ranch roads near the Llano River.',
      name: 'Grant B.',
      location: 'Mason County, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Our Mason relocation had limited local storage. The San Angelo team coordinated regional warehouse space and delivered careful handling throughout.',
      name: 'Holly T.',
      location: 'Mason, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  lipscomb: [
    {
      quote:
        'Lipscomb is deep northeastern Panhandle ranchland. An Amarillo regional crew handled our remote move professionally with careful handling on gravel access roads.',
      name: 'Brent C.',
      location: 'Lipscomb, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Lipscomb County has no local full-service movers. A Lubbock provider confirmed coverage and was reliable in a very sparse Panhandle market.',
      name: 'Nellie F.',
      location: 'Lipscomb County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'We moved near Lipscomb with limited cell service and storage. The Amarillo team coordinated arrival windows well and finished on schedule.',
      name: 'Howard G.',
      location: 'Lipscomb, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  reagan: [
    {
      quote:
        'Big Lake sits in Reagan County oilfield and ranch country. A San Angelo regional crew handled our West Texas move with careful handling on rough ranch roads.',
      name: 'Travis N.',
      location: 'Big Lake, TX',
      rating: 5,
      moveType: 'Oilfield area',
    },
    {
      quote:
        'Reagan County movers are essentially nonexistent locally. A Midland provider drove in and was professional despite the Permian Basin distance.',
      name: 'Rhonda K.',
      location: 'Reagan County, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Our Big Lake relocation needed flexible timing around field operations. The San Angelo team was reliable and upfront about storage limits.',
      name: 'Scott E.',
      location: 'Big Lake, TX',
      rating: 4,
      moveType: 'Rural',
    },
  ],
  shackelford: [
    {
      quote:
        'Albany is remote Shackelford County ranchland. An Abilene regional crew confirmed service area and handled our North Texas move with professional care.',
      name: 'Glenn P.',
      location: 'Albany, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Shackelford County has almost no moving options. A Wichita Falls provider made the trip and was reliable on long rural ranch driveways.',
      name: 'Doris M.',
      location: 'Shackelford County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Albany ranch move involved outbuildings and limited storage. The Abilene team coordinated regional warehouse space and delivered on time.',
      name: 'Fred H.',
      location: 'Albany, TX',
      rating: 4,
      moveType: 'Ranch outbuilding',
    },
  ],
  sutton: [
    {
      quote:
        'Sonora is rugged Sutton County ranch country. A San Angelo regional crew handled our remote West Texas move professionally with careful packing.',
      name: 'Lyle W.',
      location: 'Sonora, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Sutton County movers are hard to find. A Midland provider confirmed coverage and was reliable despite the long brush-country haul.',
      name: 'Janice A.',
      location: 'Sutton County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Sonora relocation needed careful scheduling around cattle work. The San Angelo team was efficient and careful with fragile heirlooms.',
      name: 'Royce T.',
      location: 'Sonora, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  upton: [
    {
      quote:
        'Rankin sits in Upton County oilfield country. A Midland regional crew handled our Permian Basin move professionally across challenging desert ranch terrain.',
      name: 'Dustin R.',
      location: 'Rankin, TX',
      rating: 5,
      moveType: 'Oilfield area',
    },
    {
      quote:
        'Upton County has no dedicated local movers. A San Angelo provider made the long drive and was reliable in remote West Texas.',
      name: 'Cheryl B.',
      location: 'Upton County, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Our Rankin move required planning around field traffic and limited storage. The Midland team was upfront about travel fees and delivered efficiently.',
      name: 'Blake S.',
      location: 'Rankin, TX',
      rating: 4,
      moveType: 'Rural',
    },
  ],
  carson: [
    {
      quote:
        'Panhandle is quiet Carson County ranch country north of Amarillo. A regional crew confirmed coverage and handled our move professionally on long gravel driveways.',
      name: 'Harold W.',
      location: 'Panhandle, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Carson County has no local full-service movers. A Lubbock provider made the trip and was reliable in remote Panhandle ranchland.',
      name: 'Martha J.',
      location: 'Carson County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Panhandle relocation had limited storage nearby. The Amarillo team coordinated regional facilities and delivered careful handling throughout.',
      name: 'Clifford R.',
      location: 'Panhandle, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  crosby: [
    {
      quote:
        'Crosbyton sits on the South Plains with sparse mover options. A Lubbock regional crew confirmed service to Crosby County and handled our ranch move with professional care.',
      name: 'Dean H.',
      location: 'Crosbyton, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Crosby County movers are hard to find locally. An Amarillo provider agreed to the long drive and was reliable on remote High Plains ranch roads.',
      name: 'Wanda S.',
      location: 'Crosby County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Crosbyton move needed flexible scheduling around harvest season. The Lubbock team was upfront about travel fees and efficient on site.',
      name: 'Roy K.',
      location: 'Crosbyton, TX',
      rating: 4,
      moveType: 'Ranch outbuilding',
    },
  ],
  delta: [
    {
      quote:
        'Cooper is remote Northeast Texas ranch country. A Dallas regional crew confirmed coverage and handled our Delta County move professionally despite the long drive.',
      name: 'Patricia M.',
      location: 'Cooper, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Delta County has almost no local movers. A Paris provider made the trip and was reliable in remote Northeast Texas farmland.',
      name: 'Gerald T.',
      location: 'Delta County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Cooper relocation had limited local storage. The Dallas team coordinated regional warehouse space and delivered careful handling throughout.',
      name: 'Sharon L.',
      location: 'Cooper, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  floyd: [
    {
      quote:
        'Floydada is classic High Plains ranch country. A Lubbock regional crew handled our Floyd County move professionally on long caliche driveways.',
      name: 'Leroy B.',
      location: 'Floydada, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Floyd County has no dedicated local movers. An Amarillo provider confirmed service area and was reliable in a very sparse Panhandle market.',
      name: 'Irene C.',
      location: 'Floyd County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Floydada ranch move involved outbuildings and limited cell service. The Lubbock team coordinated arrival windows well and finished on time.',
      name: 'Norman P.',
      location: 'Floydada, TX',
      rating: 4,
      moveType: 'Ranch outbuilding',
    },
  ],
  hansford: [
    {
      quote:
        'Spearman is deep northern Panhandle ranchland. An Amarillo crew handled our Hansford County move professionally with careful handling on gravel access roads.',
      name: 'Vernon D.',
      location: 'Spearman, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Hansford County has no local full-service movers. A Lubbock provider confirmed coverage and was reliable in remote Panhandle country.',
      name: 'Bonnie F.',
      location: 'Hansford County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Spearman relocation required planning around weather and long driveways. The Amarillo team was upfront about travel fees and efficient on site.',
      name: 'Calvin G.',
      location: 'Spearman, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  hudspeth: [
    {
      quote:
        'Sierra Blanca is remote West Texas desert country. An El Paso regional crew confirmed coverage and handled our Hudspeth County move with professional care on challenging terrain.',
      name: 'Rosa V.',
      location: 'Sierra Blanca, TX',
      rating: 5,
      moveType: 'Desert ranch',
    },
    {
      quote:
        'Hudspeth County movers are scarce. A Carlsbad, NM provider verified cross-border licensing and was reliable on our remote desert property move.',
      name: 'Miguel A.',
      location: 'Hudspeth County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Sierra Blanca move had very limited storage options. The El Paso team coordinated regional facilities and delivered careful handling throughout.',
      name: 'Janet W.',
      location: 'Sierra Blanca, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  lynn: [
    {
      quote:
        'Tahoka is South Plains ranch country south of Lubbock. A Lubbock regional crew confirmed coverage and handled our Lynn County move professionally on long gravel driveways.',
      name: 'Earl N.',
      location: 'Tahoka, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Lynn County has no local full-service movers. A Midland provider made the trip and was reliable in remote South Plains ranchland.',
      name: 'Doris K.',
      location: 'Lynn County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Tahoka ranch move needed flexible scheduling around cattle work. The Lubbock team was careful with antiques and upfront about travel fees.',
      name: 'Floyd J.',
      location: 'Tahoka, TX',
      rating: 4,
      moveType: 'Ranch outbuilding',
    },
  ],
  martin: [
    {
      quote:
        'Stanton sits in Martin County oilfield country. A Midland regional crew handled our Permian Basin move professionally across challenging ranch terrain.',
      name: 'Travis H.',
      location: 'Stanton, TX',
      rating: 5,
      moveType: 'Oilfield area',
    },
    {
      quote:
        'Martin County has no dedicated local movers. A Lubbock provider agreed to the long drive and gave careful handling on our remote West Texas ranch property.',
      name: 'Pamela R.',
      location: 'Martin County, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Our Stanton move required planning around field traffic and limited storage. The Midland team was upfront about travel fees and delivered efficiently.',
      name: 'Cody M.',
      location: 'Stanton, TX',
      rating: 4,
      moveType: 'Rural',
    },
  ],
  mills: [
    {
      quote:
        'Goldthwaite is remote Central Texas ranch country. A Waco regional crew confirmed coverage and handled our Mills County move with professional care on narrow ranch roads.',
      name: 'Barbara E.',
      location: 'Goldthwaite, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Mills County has almost no local movers. An Abilene provider made the trip and was reliable in remote Central Texas Hill Country fringe.',
      name: 'Howard S.',
      location: 'Mills County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Goldthwaite ranch move involved outbuildings and limited storage. The Waco team coordinated regional warehouse space and finished on schedule.',
      name: 'Carolyn D.',
      location: 'Goldthwaite, TX',
      rating: 4,
      moveType: 'Ranch outbuilding',
    },
  ],
  wheeler: [
    {
      quote:
        'Wheeler is northeastern Panhandle ranch country. An Amarillo crew handled our Wheeler County move professionally on gravel ranch roads.',
      name: 'Glenn T.',
      location: 'Wheeler, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Wheeler County has no local full-service movers. A Lubbock regional provider confirmed service and was reliable in remote Panhandle country.',
      name: 'Nellie P.',
      location: 'Wheeler County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Wheeler relocation required planning around weather and long driveways. The Amarillo team was upfront about travel fees and efficient on site.',
      name: 'Harvey L.',
      location: 'Wheeler, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  bailey: [
    {
      quote:
        'Muleshoe sits on the western South Plains with sparse mover options. A Lubbock regional crew confirmed service to Bailey County and handled our ranch move with professional care.',
      name: 'Ralph T.',
      location: 'Muleshoe, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Bailey County has no local full-service movers. An Amarillo provider agreed to the long drive and was reliable on remote High Plains ranch roads.',
      name: 'Betty H.',
      location: 'Bailey County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Muleshoe ranch move needed flexible scheduling around harvest season. The Lubbock team was upfront about travel fees and efficient on site.',
      name: 'Donnie W.',
      location: 'Muleshoe, TX',
      rating: 4,
      moveType: 'Ranch outbuilding',
    },
  ],
  childress: [
    {
      quote:
        'Childress sits on the Red River Valley with almost no local movers. An Amarillo regional crew confirmed coverage and handled our Panhandle-border move professionally.',
      name: 'Gene M.',
      location: 'Childress, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Childress County movers are hard to find. A Wichita Falls provider made the trip and was reliable on long caliche ranch driveways.',
      name: 'Lois P.',
      location: 'Childress County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Childress relocation had limited storage nearby. The Amarillo team coordinated regional facilities and delivered careful handling throughout.',
      name: 'Carl B.',
      location: 'Childress, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  garza: [
    {
      quote:
        'Post is classic Caprock ranch country east of Lubbock. A Lubbock regional crew handled our Garza County move professionally on long gravel driveways.',
      name: 'Jimmy R.',
      location: 'Post, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Garza County has no dedicated local movers. An Amarillo provider confirmed service area and was reliable in a very sparse South Plains market.',
      name: 'Sandra L.',
      location: 'Garza County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Post ranch move involved outbuildings and limited cell service. The Lubbock team coordinated arrival windows well and finished on time.',
      name: 'Wayne C.',
      location: 'Post, TX',
      rating: 4,
      moveType: 'Ranch outbuilding',
    },
  ],
  goliad: [
    {
      quote:
        'Goliad is historic South Texas ranch country. A Victoria regional crew confirmed coverage and handled our Goliad County move with professional care.',
      name: 'Maria G.',
      location: 'Goliad, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Goliad County has almost no local movers. A Corpus Christi provider made the trip and was reliable in remote Coastal Bend ranchland.',
      name: 'Robert F.',
      location: 'Goliad County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Goliad relocation had limited local storage. The Victoria team coordinated regional warehouse space and delivered careful handling throughout.',
      name: 'Anita S.',
      location: 'Goliad, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  hartley: [
    {
      quote:
        'Channing is deep northwestern Panhandle ranchland. An Amarillo crew handled our Hartley County move professionally with careful handling on gravel access roads.',
      name: 'Lloyd K.',
      location: 'Channing, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Hartley County has no local full-service movers. A Lubbock provider confirmed coverage and was reliable in remote Panhandle country.',
      name: 'Pearl D.',
      location: 'Hartley County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Channing relocation required planning around weather and long driveways. The Amarillo team was upfront about travel fees and efficient on site.',
      name: 'Otis N.',
      location: 'Channing, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  haskell: [
    {
      quote:
        'Haskell is remote North Texas ranch country. An Abilene regional crew confirmed coverage and handled our move professionally on long gravel driveways.',
      name: 'Raymond J.',
      location: 'Haskell, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Haskell County has almost no local movers. A Wichita Falls provider made the trip and was reliable in remote rolling plains ranchland.',
      name: 'Gladys E.',
      location: 'Haskell County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Haskell ranch move needed flexible scheduling around cattle work. The Abilene team was careful with antiques and upfront about travel fees.',
      name: 'Bobby H.',
      location: 'Haskell, TX',
      rating: 4,
      moveType: 'Ranch outbuilding',
    },
  ],
  'la-salle': [
    {
      quote:
        'Cotulla is South Texas brush country with sparse mover options. A Laredo regional crew confirmed service to La Salle County and handled our ranch move professionally.',
      name: 'Ricardo V.',
      location: 'Cotulla, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'La Salle County has no local full-service movers. A San Antonio provider agreed to the long drive and was reliable on remote ranch roads.',
      name: 'Carmen R.',
      location: 'La Salle County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Cotulla relocation had limited storage nearby. The Laredo team coordinated regional facilities and delivered careful handling throughout.',
      name: 'Jesse M.',
      location: 'Cotulla, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  presidio: [
    {
      quote:
        'Marfa is remote Big Bend country with serious access challenges. An El Paso regional crew confirmed coverage and handled our Presidio County move with professional desert experience.',
      name: 'Elena P.',
      location: 'Marfa, TX',
      rating: 5,
      moveType: 'Desert ranch',
    },
    {
      quote:
        'Presidio County movers are scarce. An Alpine provider verified service area and was reliable on mountain ranch roads near the Davis Mountains.',
      name: 'Tomás G.',
      location: 'Presidio County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Marfa move had very limited storage options. The El Paso team coordinated regional facilities and delivered careful handling throughout.',
      name: 'Kate W.',
      location: 'Marfa, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  refugio: [
    {
      quote:
        'Refugio sits in Coastal Bend ranch country with almost no local movers. A Corpus Christi regional crew confirmed coverage and handled our move professionally.',
      name: 'Henry L.',
      location: 'Refugio, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Refugio County has sparse competition. A Victoria provider made the trip and was reliable on coastal ranch roads near the Gulf.',
      name: 'Diana C.',
      location: 'Refugio County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Refugio relocation required hurricane-season flexibility. The Corpus Christi team was upfront about scheduling and delivered careful handling.',
      name: 'Frank T.',
      location: 'Refugio, TX',
      rating: 4,
      moveType: 'Coastal ranch',
    },
  ],
  'san-saba': [
    {
      quote:
        'San Saba is classic Central Texas ranch country. A Waco regional crew confirmed coverage and handled our move with professional care on narrow ranch roads.',
      name: 'Margaret B.',
      location: 'San Saba, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'San Saba County has almost no local movers. An Abilene provider made the trip and was reliable in remote Hill Country fringe ranchland.',
      name: 'Edwin K.',
      location: 'San Saba County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our San Saba ranch move involved outbuildings and limited storage. The Waco team coordinated regional warehouse space and finished on schedule.',
      name: 'Ruth A.',
      location: 'San Saba, TX',
      rating: 4,
      moveType: 'Ranch outbuilding',
    },
  ],
  archer: [
    {
      quote:
        'Archer City is quiet North Texas ranch country. A Wichita Falls regional crew confirmed coverage and handled our Archer County move with professional care on long gravel driveways.',
      name: 'Dale M.',
      location: 'Archer City, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Archer County has almost no local movers. An Abilene provider made the trip and was reliable in remote rolling plains ranchland.',
      name: 'Nora T.',
      location: 'Archer County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Archer City ranch move needed flexible scheduling around cattle work. The Wichita Falls team was careful with antiques and upfront about travel fees.',
      name: 'Curtis B.',
      location: 'Archer City, TX',
      rating: 4,
      moveType: 'Ranch outbuilding',
    },
  ],
  brewster: [
    {
      quote:
        'Alpine sits in Big Bend country with serious mountain access challenges. An Alpine regional crew handled our Brewster County move with professional desert and mountain experience.',
      name: 'Linda K.',
      location: 'Alpine, TX',
      rating: 5,
      moveType: 'Mountain ranch',
    },
    {
      quote:
        'Brewster County movers are scarce outside Alpine. An El Paso provider verified service area and was reliable on remote Big Bend ranch roads.',
      name: 'Carlos R.',
      location: 'Brewster County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Alpine relocation had very limited storage options. The regional team coordinated El Paso facilities and delivered careful handling throughout.',
      name: 'Susan H.',
      location: 'Alpine, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  marion: [
    {
      quote:
        'Jefferson is historic East Texas piney woods country. A Marshall regional crew confirmed coverage and handled our Marion County move professionally despite tree-lined ranch access.',
      name: 'Willie J.',
      location: 'Jefferson, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Marion County has no local full-service movers. A Shreveport, LA provider verified cross-border licensing and was reliable on our remote East Texas property.',
      name: 'Betty N.',
      location: 'Marion County, TX',
      rating: 5,
      moveType: 'Piney woods',
    },
    {
      quote:
        'Our Jefferson move had limited local storage. The Marshall team coordinated regional warehouse space and delivered careful handling throughout.',
      name: 'James P.',
      location: 'Jefferson, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  mitchell: [
    {
      quote:
        'Colorado City sits in West Texas ranch and oilfield country. An Abilene regional crew handled our Mitchell County move professionally on long caliche driveways.',
      name: 'Rodney S.',
      location: 'Colorado City, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Mitchell County has no dedicated local movers. A San Angelo provider confirmed service area and was reliable in a sparse West Texas market.',
      name: 'Connie L.',
      location: 'Mitchell County, TX',
      rating: 5,
      moveType: 'Oilfield area',
    },
    {
      quote:
        'Our Colorado City ranch move involved outbuildings and limited cell service. The Abilene team coordinated arrival windows well and finished on time.',
      name: 'Keith D.',
      location: 'Colorado City, TX',
      rating: 4,
      moveType: 'Ranch outbuilding',
    },
  ],
  ochiltree: [
    {
      quote:
        'Perryton is northern Panhandle ranchland with sparse mover options. An Amarillo crew handled our Ochiltree County move professionally on gravel ranch roads.',
      name: 'Wade G.',
      location: 'Perryton, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Ochiltree County has no local full-service movers. A Lubbock provider confirmed coverage and was reliable in remote Panhandle country.',
      name: 'Iva F.',
      location: 'Ochiltree County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Perryton relocation required planning around weather and long driveways. The Amarillo team was upfront about travel fees and efficient on site.',
      name: 'Dean R.',
      location: 'Perryton, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  parmer: [
    {
      quote:
        'Farwell sits on the Texas-New Mexico border with almost no local movers. An Amarillo regional crew confirmed coverage and handled our Parmer County move professionally.',
      name: 'Lester W.',
      location: 'Farwell, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Parmer County movers are hard to find. A Lubbock provider made the long drive and was reliable on remote High Plains ranch roads.',
      name: 'Opal C.',
      location: 'Parmer County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Farwell ranch move needed flexible scheduling around harvest season. The Amarillo team was upfront about travel fees and efficient on site.',
      name: 'Virgil H.',
      location: 'Farwell, TX',
      rating: 4,
      moveType: 'Ranch outbuilding',
    },
  ],
  runnels: [
    {
      quote:
        'Ballinger is Central Texas ranch country between Abilene and San Angelo. A San Angelo regional crew confirmed coverage and handled our Runnels County move with professional care.',
      name: 'Helen M.',
      location: 'Ballinger, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Runnels County has almost no local movers. An Abilene provider made the trip and was reliable on remote ranch roads near the Colorado River.',
      name: 'George T.',
      location: 'Runnels County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Ballinger relocation had limited local storage. The San Angelo team coordinated regional warehouse space and delivered careful handling throughout.',
      name: 'Ruth K.',
      location: 'Ballinger, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  somervell: [
    {
      quote:
        'Glen Rose is Paluxy River ranch country south of Fort Worth. A Waco regional crew confirmed coverage and handled our Somervell County move with professional Hill Country fringe experience.',
      name: 'Janice B.',
      location: 'Glen Rose, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Somervell County has sparse competition. A Fort Worth provider agreed to the drive and was reliable on narrow ranch roads near Dinosaur Valley.',
      name: 'Larry E.',
      location: 'Somervell County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Glen Rose ranch move involved outbuildings and limited storage. The Waco team coordinated regional facilities and finished on schedule.',
      name: 'Diane S.',
      location: 'Glen Rose, TX',
      rating: 4,
      moveType: 'Ranch outbuilding',
    },
  ],
  stephens: [
    {
      quote:
        'Breckenridge sits in North Texas oilfield and ranch country. An Abilene regional crew handled our Stephens County move professionally on long gravel driveways.',
      name: 'Harold F.',
      location: 'Breckenridge, TX',
      rating: 5,
      moveType: 'Oilfield area',
    },
    {
      quote:
        'Stephens County has no local full-service movers. A Wichita Falls provider confirmed coverage and was reliable in remote North Texas ranchland.',
      name: 'Mildred A.',
      location: 'Stephens County, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Our Breckenridge move required planning around field traffic and limited storage. The Abilene team was upfront about travel fees and delivered efficiently.',
      name: 'Ronnie C.',
      location: 'Breckenridge, TX',
      rating: 4,
      moveType: 'Rural',
    },
  ],
  zavala: [
    {
      quote:
        'Crystal City is South Texas Winter Garden ranch country. A Laredo regional crew confirmed service to Zavala County and handled our move professionally.',
      name: 'Arturo V.',
      location: 'Crystal City, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Zavala County has no local full-service movers. A San Antonio provider agreed to the long drive and was reliable on remote brush-country ranch roads.',
      name: 'Elena M.',
      location: 'Zavala County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Crystal City relocation had limited storage nearby. The Laredo team coordinated regional facilities and delivered careful handling throughout.',
      name: 'Hector R.',
      location: 'Crystal City, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  clay: [
    {
      quote:
        'Henrietta is quiet North Texas ranch country. A Wichita Falls regional crew confirmed coverage and handled our Clay County move with professional care on long gravel driveways.',
      name: 'Glenn R.',
      location: 'Henrietta, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Clay County has almost no local movers. A Fort Worth provider made the trip and was reliable in remote rolling plains ranchland.',
      name: 'Patsy M.',
      location: 'Clay County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Henrietta ranch move needed flexible scheduling around cattle work. The Wichita Falls team was careful with antiques and upfront about travel fees.',
      name: 'Danny K.',
      location: 'Henrietta, TX',
      rating: 4,
      moveType: 'Ranch outbuilding',
    },
  ],
  dawson: [
    {
      quote:
        'Lamesa sits in South Plains ranch and oilfield country. A Lubbock regional crew handled our Dawson County move professionally on long caliche driveways.',
      name: 'Randy S.',
      location: 'Lamesa, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Dawson County has no dedicated local movers. A Midland provider confirmed service area and was reliable in a sparse West Texas market.',
      name: 'Linda H.',
      location: 'Dawson County, TX',
      rating: 5,
      moveType: 'Oilfield area',
    },
    {
      quote:
        'Our Lamesa ranch move involved outbuildings and limited cell service. The Lubbock team coordinated arrival windows well and finished on time.',
      name: 'Troy B.',
      location: 'Lamesa, TX',
      rating: 4,
      moveType: 'Ranch outbuilding',
    },
  ],
  dimmit: [
    {
      quote:
        'Carrizo Springs is South Texas Winter Garden ranch country. A Laredo regional crew confirmed service to Dimmit County and handled our move professionally.',
      name: 'Rosa M.',
      location: 'Carrizo Springs, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Dimmit County has no local full-service movers. A San Antonio provider agreed to the long drive and was reliable on remote brush-country ranch roads.',
      name: 'Pedro G.',
      location: 'Dimmit County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Carrizo Springs relocation had limited storage nearby. The Laredo team coordinated regional facilities and delivered careful handling throughout.',
      name: 'Sylvia R.',
      location: 'Carrizo Springs, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  duval: [
    {
      quote:
        'San Diego is remote South Texas ranch country. A Laredo regional crew confirmed coverage and handled our Duval County move with professional care.',
      name: 'Arturo L.',
      location: 'San Diego, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Duval County has sparse competition. A Corpus Christi provider made the trip and was reliable on remote brush-country ranch roads.',
      name: 'Carmen V.',
      location: 'Duval County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our San Diego ranch move needed flexible scheduling. The Laredo team was upfront about travel fees and efficient on site.',
      name: 'Hector D.',
      location: 'San Diego, TX',
      rating: 4,
      moveType: 'Ranch outbuilding',
    },
  ],
  franklin: [
    {
      quote:
        'Mount Vernon is remote Northeast Texas ranch country. A Dallas regional crew confirmed coverage and handled our Franklin County move professionally despite the long drive.',
      name: 'Patricia W.',
      location: 'Mount Vernon, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Franklin County has almost no local movers. A Paris provider made the trip and was reliable in remote Sulphur River farmland.',
      name: 'Gerald F.',
      location: 'Franklin County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Mount Vernon relocation had limited local storage. The Dallas team coordinated regional warehouse space and delivered careful handling throughout.',
      name: 'Sharon T.',
      location: 'Mount Vernon, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  morris: [
    {
      quote:
        'Daingerfield sits in East Texas piney woods with sparse mover options. A Longview regional crew confirmed coverage and handled our Morris County move professionally.',
      name: 'Willie J.',
      location: 'Daingerfield, TX',
      rating: 5,
      moveType: 'Piney woods',
    },
    {
      quote:
        'Morris County has no local full-service movers. A Texarkana provider verified service area and was reliable on tree-lined rural roads.',
      name: 'Betty N.',
      location: 'Morris County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Daingerfield move had limited local storage. The Longview team coordinated regional facilities and delivered careful handling throughout.',
      name: 'James C.',
      location: 'Daingerfield, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  newton: [
    {
      quote:
        'Newton is Deep East Texas forest country with almost no local movers. A Beaumont regional crew confirmed coverage and handled our move professionally on narrow forest roads.',
      name: 'Harold P.',
      location: 'Newton, TX',
      rating: 5,
      moveType: 'Piney woods',
    },
    {
      quote:
        'Newton County movers are hard to find. A Jasper provider made the trip and was reliable in heavily wooded remote terrain.',
      name: 'Martha S.',
      location: 'Newton County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Newton relocation had limited storage nearby. The Beaumont team coordinated regional facilities and delivered careful handling throughout.',
      name: 'Clifford L.',
      location: 'Newton, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  sabine: [
    {
      quote:
        'Hemphill sits near Toledo Bend in Deep East Texas piney woods. A Nacogdoches regional crew confirmed coverage and handled our Sabine County move with professional care.',
      name: 'Raymond D.',
      location: 'Hemphill, TX',
      rating: 5,
      moveType: 'Piney woods',
    },
    {
      quote:
        'Sabine County has no local full-service movers. A Lufkin provider agreed to the drive and was reliable on tree-lined ranch roads.',
      name: 'Frances K.',
      location: 'Sabine County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Hemphill move had limited local storage. The Nacogdoches team coordinated regional warehouse space and finished on schedule.',
      name: 'Billy H.',
      location: 'Hemphill, TX',
      rating: 4,
      moveType: 'Ranch outbuilding',
    },
  ],
  terry: [
    {
      quote:
        'Brownfield is South Plains ranch and oilfield country south of Lubbock. A Lubbock regional crew handled our Terry County move professionally on long gravel driveways.',
      name: 'Earl W.',
      location: 'Brownfield, TX',
      rating: 5,
      moveType: 'Oilfield area',
    },
    {
      quote:
        'Terry County has no dedicated local movers. A Midland provider confirmed service area and was reliable in remote West Texas ranchland.',
      name: 'Doris F.',
      location: 'Terry County, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Our Brownfield ranch move involved outbuildings and limited storage. The Lubbock team was upfront about travel fees and efficient on site.',
      name: 'Floyd G.',
      location: 'Brownfield, TX',
      rating: 4,
      moveType: 'Ranch outbuilding',
    },
  ],
  ward: [
    {
      quote:
        'Monahans sits in Permian Basin oilfield desert country. An Odessa regional crew handled our Ward County move professionally across challenging desert terrain.',
      name: 'Travis N.',
      location: 'Monahans, TX',
      rating: 5,
      moveType: 'Oilfield area',
    },
    {
      quote:
        'Ward County has no local full-service movers. A Midland provider agreed to the drive and gave careful handling on our remote desert property.',
      name: 'Pamela J.',
      location: 'Ward County, TX',
      rating: 5,
      moveType: 'Desert ranch',
    },
    {
      quote:
        'Our Monahans move required planning around field traffic and limited storage. The Odessa team was upfront about travel fees and delivered efficiently.',
      name: 'Cody R.',
      location: 'Monahans, TX',
      rating: 4,
      moveType: 'Rural',
    },
  ],
  loving: [
    {
      quote:
        'Mentone may be the smallest county seat in Texas, but an Odessa regional crew made our desert property move work. They confirmed oilfield-area access and handled challenging terrain without damage.',
      name: 'Rachel P.',
      location: 'Mentone, TX',
      rating: 5,
      moveType: 'Remote desert',
    },
    {
      quote:
        'We needed cross-border coordination from Hobbs, NM into Loving County. The regional provider verified licensing, gave a fair travel estimate, and delivered professional service in the oil patch.',
      name: 'Steve L.',
      location: 'Loving County, TX',
      rating: 5,
      moveType: 'Oilfield area',
    },
    {
      quote:
        'Finding any mover willing to reach Mentone was the hard part. Once booked, the Odessa team was efficient, reliable, and upfront about storage limitations in such a remote county.',
      name: 'Angela F.',
      location: 'Mentone, TX',
      rating: 4,
      moveType: 'Rural',
    },
  ],
  'red-river': [
    {
      quote:
        'Professional for our remote Northeast Texas move into Clarksville. The Paris crew confirmed county coverage upfront and handled our long driveway without damaging landscaping.',
      name: 'Karen M.',
      location: 'Clarksville, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Careful handling on a Texarkana-to-Red River County route. They wrapped furniture well and navigated narrow rural roads better than we expected.',
      name: 'James R.',
      location: 'Clarksville, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  rains: [
    {
      quote:
        'Professional for our remote Northeast Texas move near Emory. The Dallas crew explained travel fees clearly and finished our farmhouse move in one organized day.',
      name: 'Linda P.',
      location: 'Emory, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Careful handling from the Tyler team on a Rains County lake property. They planned truck access ahead of time and protected our floors through tight doorways.',
      name: 'Robert T.',
      location: 'Emory, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  wilbarger: [
    {
      quote:
        'Professional for our remote North Texas move outside Vernon. The Wichita Falls crew confirmed ranch-road access and handled our outbuilding tools plus house furniture together.',
      name: 'Susan H.',
      location: 'Vernon, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Careful handling on an Abilene-to-Wilbarger County route. They were patient with our gravel driveway and kept communication clear on arrival timing.',
      name: 'Mike D.',
      location: 'Vernon, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  camp: [
    {
      quote:
        'Professional for our remote Northeast Texas move in Pittsburg. The Longview crew verified Camp County service and managed our pine-country driveway without issues.',
      name: 'Angela W.',
      location: 'Pittsburg, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Careful handling from a Dallas regional crew on a longer travel route. They wrapped everything thoroughly and stayed organized despite the early start.',
      name: 'David L.',
      location: 'Pittsburg, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  blanco: [
    {
      quote:
        'Professional for our remote Hill Country move near Johnson City. The Austin team understood narrow ranch roads and protected our antique furniture through the whole load.',
      name: 'Carol F.',
      location: 'Johnson City, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Careful handling from the San Antonio crew on a Blanco County relocation. They confirmed Hill Country coverage in writing and finished faster than our closing window required.',
      name: 'Eric N.',
      location: 'Johnson City, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  zapata: [
    {
      quote:
        'Professional for our remote South Texas move in Zapata County. The Laredo crew handled ranch access challenges and kept our household goods organized from start to finish.',
      name: 'Maria G.',
      location: 'Zapata, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Reliable in remote areas — careful handling on a longer South Texas route. They communicated clearly about travel time and delivered without damage.',
      name: 'Jorge V.',
      location: 'Zapata, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  callahan: [
    {
      quote:
        'Professional for our remote Central Texas move into Baird. The Abilene crew confirmed Callahan County coverage and managed our ranch driveway with the right truck setup.',
      name: 'Patricia S.',
      location: 'Baird, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Reliable in remote areas around Baird. Careful handling on outbuilding contents and straightforward pricing from a second Abilene estimate we compared.',
      name: 'Tom B.',
      location: 'Baird, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  comanche: [
    {
      quote:
        'Professional for our remote Central Texas move in Comanche County. The Abilene team planned ranch access ahead of time and treated our older home carefully around tight halls.',
      name: 'Rachel K.',
      location: 'Comanche, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Professional service in Central Texas from the Waco crew. Reliable in remote areas with clear travel-fee explanations and careful handling of wrapped furniture.',
      name: 'Steve J.',
      location: 'Comanche, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  trinity: [
    {
      quote:
        'Professional for our remote East Texas move near Groveton. The Lufkin crew understood Piney Woods access and finished our modest home move on a tight one-day timeline.',
      name: 'Nancy C.',
      location: 'Groveton, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Professional service in East Texas from Huntsville. Reliable in remote Trinity County with careful handling and steady communication on a longer regional route.',
      name: 'William A.',
      location: 'Groveton, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  falls: [
    {
      quote:
        'Professional for our remote Central Texas move in Marlin. The Waco crew confirmed Falls County service and handled our ranch property access without tearing up the driveway.',
      name: 'Diane E.',
      location: 'Marlin, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Reliable in remote areas — careful handling from a second Waco provider we compared. They wrapped furniture well and stayed organized despite a small-market schedule.',
      name: 'Greg M.',
      location: 'Marlin, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  madison: [
    {
      quote:
        'Professional for our remote East Texas move near Madisonville. The Huntsville crew confirmed Madison County coverage and handled our long driveway without damaging the yard.',
      name: 'Betty H.',
      location: 'Madisonville, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Careful handling from the College Station team on a longer regional route into Madison County. They wrapped furniture well and stayed organized despite the early start.',
      name: 'Carl W.',
      location: 'Madisonville, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  nolan: [
    {
      quote:
        'Professional for our remote West Texas move in Sweetwater. The Abilene crew confirmed Nolan County service and managed our ranch driveway with the right truck setup.',
      name: 'Donna S.',
      location: 'Sweetwater, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Reliable in remote areas — careful handling from the San Angelo team on a West Texas oilfield-country route with clear travel-fee explanations.',
      name: 'Ray M.',
      location: 'Sweetwater, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  reeves: [
    {
      quote:
        'Professional for our remote West Texas move in Pecos. The Odessa crew handled desert access challenges and kept our household goods organized from start to finish.',
      name: 'Elena R.',
      location: 'Pecos, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Professional service in West Texas from the El Paso regional crew. Reliable in remote Reeves County with careful handling on a longer Permian Basin route.',
      name: 'Frank T.',
      location: 'Pecos, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  karnes: [
    {
      quote:
        'Professional for our remote South Texas move near Karnes City. The San Antonio team confirmed county coverage and treated our ranch house carefully around tight halls.',
      name: 'Grace L.',
      location: 'Karnes City, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Careful handling from the Victoria crew on a Karnes County relocation. They verified service area upfront and finished faster than our closing window required.',
      name: 'Henry P.',
      location: 'Karnes City, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  pecos: [
    {
      quote:
        'Professional for our remote West Texas move in Fort Stockton. The Midland crew confirmed Pecos County coverage and navigated our desert ranch road without issues.',
      name: 'Irene K.',
      location: 'Fort Stockton, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Professional service in West Texas from San Angelo. Reliable in remote Pecos County with careful handling and steady communication on a longer regional route.',
      name: 'Jack N.',
      location: 'Fort Stockton, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  jackson: [
    {
      quote:
        'Professional for our remote South Texas move in Edna. The Victoria crew understood Coastal Bend ranch access and finished our modest home move on a tight timeline.',
      name: 'Kim A.',
      location: 'Edna, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Reliable in remote areas — careful handling from the Corpus Christi team on a Jackson County route with clear travel-fee disclosure and professional packing.',
      name: 'Leo B.',
      location: 'Edna, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  leon: [
    {
      quote:
        'Professional for our remote East Texas move near Centerville. The Huntsville crew planned rural access ahead of time and protected our floors through the whole load.',
      name: 'Martha C.',
      location: 'Centerville, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Professional service in East Texas from College Station. Reliable in remote Leon County with careful handling and upfront explanation of regional travel fees.',
      name: 'Norman D.',
      location: 'Centerville, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  scurry: [
    {
      quote:
        'Professional for our remote West Texas move in Snyder. The Lubbock crew confirmed Scurry County service and handled our South Plains ranch property access without tearing up the driveway.',
      name: 'Opal E.',
      location: 'Snyder, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Careful handling on an Abilene-to-Scurry County route. They were patient with our gravel driveway and kept communication clear despite limited cell service.',
      name: 'Paul F.',
      location: 'Snyder, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  robertson: [
    {
      quote:
        'Professional for our remote Central Texas move in Franklin. The Waco crew confirmed Robertson County coverage and managed our ranch driveway with careful handling throughout.',
      name: 'Quinn G.',
      location: 'Franklin, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Professional service in Central Texas from the College Station team. Reliable in remote Robertson County with careful wrapping and organized loading on a longer route.',
      name: 'Ruth H.',
      location: 'Franklin, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  lee: [
    {
      quote:
        'Professional for our remote Central Texas move in Giddings. The Austin team understood rural Lee County access and protected our antique furniture through the whole relocation.',
      name: 'Sam I.',
      location: 'Giddings, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Careful handling from the College Station crew on a Lee County route. They confirmed service area in writing and finished on schedule despite a small-market booking window.',
      name: 'Tina J.',
      location: 'Giddings, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  young: [
    {
      quote:
        'Professional for our remote North Texas move in Graham. The Wichita Falls crew confirmed Young County coverage and handled our ranch driveway without damaging landscaping.',
      name: 'Vince A.',
      location: 'Graham, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Professional service in North Texas from the Abilene team. Reliable in remote Young County with careful handling and clear travel-fee explanations.',
      name: 'Wanda B.',
      location: 'Graham, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  frio: [
    {
      quote:
        'Professional for our remote South Texas move near Pearsall. The San Antonio crew confirmed Frio County service and treated our ranch house carefully around tight halls.',
      name: 'Xavier C.',
      location: 'Pearsall, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Reliable in remote areas — careful handling from the Laredo team on a longer South Texas route with steady communication throughout.',
      name: 'Yolanda D.',
      location: 'Pearsall, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  'deaf-smith': [
    {
      quote:
        'Professional for our remote Panhandle move in Hereford. The Amarillo crew confirmed Deaf Smith County coverage and navigated our ranch road without issues.',
      name: 'Zack E.',
      location: 'Hereford, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Professional service in the Panhandle from Lubbock. Reliable in remote Hereford with careful handling on a longer High Plains regional route.',
      name: 'Amy F.',
      location: 'Hereford, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  eastland: [
    {
      quote:
        'Professional for our remote Central Texas move in Eastland. The Abilene team planned ranch access ahead of time and protected our floors through the whole load.',
      name: 'Brian G.',
      location: 'Eastland, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Reliable in remote areas — careful handling from the Fort Worth crew on an Eastland County route with upfront travel-fee disclosure.',
      name: 'Cathy H.',
      location: 'Eastland, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  andrews: [
    {
      quote:
        'Professional for our remote West Texas move in Andrews. The Odessa crew handled oilfield-area access challenges and kept our household goods organized from start to finish.',
      name: 'Derek I.',
      location: 'Andrews, TX',
      rating: 5,
      moveType: 'Oilfield',
    },
    {
      quote:
        'Professional service in West Texas from Midland. Reliable in remote Andrews County with careful handling on a Permian Basin regional route.',
      name: 'Eva J.',
      location: 'Andrews, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  bosque: [
    {
      quote:
        'Professional for our remote Central Texas move in Meridian. The Waco crew confirmed Bosque County service and managed our ranch driveway with careful handling throughout.',
      name: 'Frank K.',
      location: 'Meridian, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Reliable in remote areas — careful handling from a second Waco provider we compared. They wrapped furniture well and stayed organized on a small-market schedule.',
      name: 'Gina L.',
      location: 'Meridian, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  burleson: [
    {
      quote:
        'Professional for our remote Central Texas move in Caldwell. The College Station crew confirmed Burleson County coverage and finished our farmhouse move in one organized day.',
      name: 'Hank M.',
      location: 'Caldwell, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Professional service in Central Texas from the Waco team. Reliable in remote Burleson County with careful handling and clear travel-fee explanations.',
      name: 'Iris N.',
      location: 'Caldwell, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  freestone: [
    {
      quote:
        'Professional for our remote East Texas move in Fairfield. The Waco crew understood rural Freestone County access and finished on a tight one-day timeline.',
      name: 'Joel O.',
      location: 'Fairfield, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Professional service in East Texas from Palestine. Reliable in remote Freestone County with careful handling and steady communication on a longer regional route.',
      name: 'Kelly P.',
      location: 'Fairfield, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  calhoun: [
    {
      quote:
        'Professional for our coastal move in Port Lavaca. The Victoria crew confirmed Calhoun County service and used floor protection through our bayfront home.',
      name: 'Luis Q.',
      location: 'Port Lavaca, TX',
      rating: 5,
      moveType: 'Coastal',
    },
    {
      quote:
        'Careful handling from the Corpus Christi team on a Calhoun County route. They discussed hurricane-season scheduling upfront and delivered without damage.',
      name: 'Megan R.',
      location: 'Port Lavaca, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  gonzales: [
    {
      quote:
        'Professional for our remote South Texas move in Gonzales. The San Antonio crew confirmed county coverage and handled our ranch property access without tearing up the driveway.',
      name: 'Nate S.',
      location: 'Gonzales, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Professional service in South Texas from Victoria. Reliable in remote Gonzales County with careful wrapping and organized loading on a longer route.',
      name: 'Olivia T.',
      location: 'Gonzales, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  jones: [
    {
      quote:
        'Professional for our remote West Texas move in Anson. The Abilene crew confirmed Jones County coverage and managed our ranch driveway with careful handling throughout.',
      name: 'Paul U.',
      location: 'Anson, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Reliable in remote areas — careful handling from a second Abilene provider we compared. They wrapped furniture well and explained travel fees clearly.',
      name: 'Rita V.',
      location: 'Anson, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  dewitt: [
    {
      quote:
        'Professional for our remote South Texas move in Cuero. The Victoria crew confirmed DeWitt County service and finished our ranch move on a tight timeline.',
      name: 'Sean W.',
      location: 'Cuero, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Professional service in South Texas from San Antonio. Reliable in remote DeWitt County with careful handling and steady communication on a longer route.',
      name: 'Tara X.',
      location: 'Cuero, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  tyler: [
    {
      quote:
        'Professional for our remote East Texas move in Woodville. The Beaumont crew understood Piney Woods access and protected our floors through tight doorways.',
      name: 'Uma Y.',
      location: 'Woodville, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Professional service in East Texas from Lufkin. Reliable in remote Tyler County with careful handling on a longer regional route into Woodville.',
      name: 'Vic Z.',
      location: 'Woodville, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  willacy: [
    {
      quote:
        'Professional for our remote South Texas move in Raymondville. The Brownsville crew confirmed Willacy County coverage and handled ranch access without issues.',
      name: 'Wade A.',
      location: 'Raymondville, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Reliable in remote areas — careful handling from the Corpus Christi team on a Willacy County route with clear travel-fee disclosure.',
      name: 'Xena B.',
      location: 'Raymondville, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  montague: [
    {
      quote:
        'Professional for our remote North Texas move in Montague. The Wichita Falls crew confirmed county coverage and navigated our ranch road without tearing up the driveway.',
      name: 'Yuri C.',
      location: 'Montague, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Professional service in North Texas from Gainesville. Reliable in remote Montague County with careful wrapping and organized loading.',
      name: 'Zoe D.',
      location: 'Montague, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  hutchinson: [
    {
      quote:
        'Professional for our remote Panhandle move in Stinnett. The Amarillo crew confirmed Hutchinson County service and handled oilfield-country access professionally.',
      name: 'Adam E.',
      location: 'Stinnett, TX',
      rating: 5,
      moveType: 'Oilfield',
    },
    {
      quote:
        'Professional service in the Panhandle from a second Amarillo provider. Reliable in remote Stinnett with careful handling on a longer High Plains route.',
      name: 'Beth F.',
      location: 'Stinnett, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  lavaca: [
    {
      quote:
        'Professional for our remote South Texas move in Hallettsville. The Victoria crew confirmed Lavaca County coverage and treated our older home carefully around tight halls.',
      name: 'Chris G.',
      location: 'Hallettsville, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Careful handling from the San Antonio team on a Lavaca County relocation. They verified service area in writing and finished faster than our closing window required.',
      name: 'Dana H.',
      location: 'Hallettsville, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  colorado: [
    {
      quote:
        'Professional for our remote South Texas move in Columbus. The Houston crew explained regional travel fees clearly and handled our ranch property access without delay.',
      name: 'Eric I.',
      location: 'Columbus, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Professional service in South Texas from Victoria. Reliable in remote Colorado County with careful handling and steady communication throughout.',
      name: 'Faith J.',
      location: 'Columbus, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  gray: [
    {
      quote:
        'Professional for our remote Panhandle move in Pampa. The Amarillo crew confirmed Gray County coverage and managed our ranch driveway with the right truck setup.',
      name: 'Glen K.',
      location: 'Pampa, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Reliable in remote areas — careful handling from a second Amarillo estimate we compared. They were upfront about Panhandle travel time and storage limitations.',
      name: 'Hope L.',
      location: 'Pampa, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  moore: [
    {
      quote:
        'Professional for our remote Panhandle move in Dumas. The Amarillo crew confirmed Moore County service and handled our oilfield-area relocation without damage.',
      name: 'Ian M.',
      location: 'Dumas, TX',
      rating: 5,
      moveType: 'Oilfield',
    },
    {
      quote:
        'Professional service in the Panhandle from a second Amarillo provider. Reliable in remote Dumas with careful handling on a longer northern Panhandle route.',
      name: 'Jane N.',
      location: 'Dumas, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  hockley: [
    {
      quote:
        'Professional for our remote West Texas move in Levelland. The Lubbock crew confirmed Hockley County coverage and navigated our ranch driveway without issues.',
      name: 'Karl O.',
      location: 'Levelland, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Careful handling from a second Lubbock estimate we compared. Reliable in remote Hockley County with steady communication on a longer South Plains route.',
      name: 'Lena P.',
      location: 'Levelland, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  lampasas: [
    {
      quote:
        'Professional for our remote Central Texas move in Lampasas. The Killeen crew confirmed county service and handled our ranch property access without delay.',
      name: 'Mark Q.',
      location: 'Lampasas, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Careful handling from the Austin team on a Lampasas County route. They were upfront about Hill Country travel time and finished with organized loading.',
      name: 'Nina R.',
      location: 'Lampasas, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  limestone: [
    {
      quote:
        'Professional for our remote Central Texas move in Groesbeck. The Waco crew confirmed Limestone County coverage and managed our ranch driveway with the right truck setup.',
      name: 'Owen S.',
      location: 'Groesbeck, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Professional service in Central Texas from College Station. Reliable in remote Limestone County with careful handling on a longer regional route.',
      name: 'Paula T.',
      location: 'Groesbeck, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  houston: [
    {
      quote:
        'Professional for our remote East Texas move in Crockett. The Lufkin crew understood Piney Woods access and protected our floors through tight doorways.',
      name: 'Quinn U.',
      location: 'Crockett, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Careful handling from the Palestine team on a Houston County route. Reliable in remote Crockett with clear travel-fee disclosure and steady communication.',
      name: 'Rita V.',
      location: 'Crockett, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  panola: [
    {
      quote:
        'Professional for our remote East Texas move in Carthage. The Longview crew confirmed Panola County service and completed our rural relocation without rushing.',
      name: 'Sam W.',
      location: 'Carthage, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Professional service in East Texas from a Shreveport provider. Reliable in remote Panola County with careful handling on a cross-border regional route.',
      name: 'Tina X.',
      location: 'Carthage, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  llano: [
    {
      quote:
        'Professional for our remote Hill Country move in Llano. The Austin crew confirmed lake-country access and handled our Lake LBJ property without damage.',
      name: 'Uma Y.',
      location: 'Llano, TX',
      rating: 5,
      moveType: 'Lake home',
    },
    {
      quote:
        'Professional service in the Hill Country from Fredericksburg. Reliable in remote Llano County with careful handling on a longer regional route.',
      name: 'Vic Z.',
      location: 'Llano, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  bandera: [
    {
      quote:
        'Professional for our remote Hill Country move in Bandera. The San Antonio crew confirmed county coverage and navigated our ranch road without tearing up the driveway.',
      name: 'Wade A.',
      location: 'Bandera, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Careful handling from a Kerrville provider we compared. Reliable in remote Bandera County with organized loading and upfront travel-fee disclosure.',
      name: 'Xena B.',
      location: 'Bandera, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  shelby: [
    {
      quote:
        'Professional for our remote East Texas move in Center. The Lufkin crew confirmed Shelby County service and finished our Piney Woods relocation on schedule.',
      name: 'Yuri C.',
      location: 'Center, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Professional service in East Texas from Nacogdoches. Reliable in remote Shelby County with careful handling on a longer regional route into Center.',
      name: 'Zoe D.',
      location: 'Center, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  brooks: [
    {
      quote:
        'Professional for our remote South Texas move in Falfurrias. The Laredo crew confirmed Brooks County coverage and handled ranch access without issues.',
      name: 'Adam E.',
      location: 'Falfurrias, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Professional service in South Texas from Corpus Christi. Reliable in remote Brooks County with careful handling and clear travel-fee disclosure.',
      name: 'Beth F.',
      location: 'Falfurrias, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  fayette: [
    {
      quote:
        'Professional for our remote Central Texas move in La Grange. The Austin crew confirmed Fayette County service and handled our ranch property access professionally.',
      name: 'Carl G.',
      location: 'La Grange, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Reliable in remote areas — careful handling from the San Antonio team on a Fayette County route with steady communication throughout.',
      name: 'Dana H.',
      location: 'La Grange, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  uvalde: [
    {
      quote:
        'Professional for our remote South Texas move in Uvalde. The San Antonio crew confirmed county coverage and navigated our ranch driveway without issues.',
      name: 'Evan I.',
      location: 'Uvalde, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Careful handling from a second San Antonio estimate we compared. Reliable in remote Uvalde County with organized loading and clear travel-fee disclosure.',
      name: 'Faye J.',
      location: 'Uvalde, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  milam: [
    {
      quote:
        'Professional for our remote Central Texas move in Cameron. The Waco crew confirmed Milam County service and managed our ranch property access without delay.',
      name: 'Greg K.',
      location: 'Cameron, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Professional service in Central Texas from College Station. Reliable in remote Milam County with careful handling on a longer regional route.',
      name: 'Holly L.',
      location: 'Cameron, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  aransas: [
    {
      quote:
        'Professional for our coastal move in Rockport. The Corpus Christi crew confirmed Aransas County service and handled our waterfront stairs carefully.',
      name: 'Ivan M.',
      location: 'Rockport, TX',
      rating: 5,
      moveType: 'Coastal',
    },
    {
      quote:
        'Careful handling from a second Corpus Christi provider on a Rockport route. Reliable in remote coastal areas with upfront travel-fee disclosure.',
      name: 'Jill N.',
      location: 'Rockport, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  gaines: [
    {
      quote:
        'Professional for our remote West Texas move in Seminole. The Lubbock crew confirmed Gaines County coverage and handled our oilfield-area relocation without damage.',
      name: 'Kyle O.',
      location: 'Seminole, TX',
      rating: 5,
      moveType: 'Oilfield',
    },
    {
      quote:
        'Professional service in West Texas from Midland. Reliable in remote Seminole with careful handling on a longer Permian Basin route.',
      name: 'Lara P.',
      location: 'Seminole, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  gillespie: [
    {
      quote:
        'Professional for our remote Hill Country move in Fredericksburg. The San Antonio crew confirmed Gillespie County service and navigated our ranch road without issues.',
      name: 'Miles Q.',
      location: 'Fredericksburg, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Professional service in the Hill Country from Austin. Reliable in remote Fredericksburg with careful handling and steady communication throughout.',
      name: 'Nora R.',
      location: 'Fredericksburg, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  'san-jacinto': [
    {
      quote:
        'Professional for our remote East Texas move in Coldspring. The Houston crew understood Piney Woods access and protected our floors through tight doorways.',
      name: 'Omar S.',
      location: 'Coldspring, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Professional service in East Texas from Huntsville. Reliable in remote San Jacinto County with careful handling on a longer regional route.',
      name: 'Pam T.',
      location: 'Coldspring, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  'palo-pinto': [
    {
      quote:
        'Professional for our remote North Texas move in Palo Pinto. The Fort Worth crew confirmed county coverage and managed our ranch driveway with the right truck setup.',
      name: 'Quinn U.',
      location: 'Palo Pinto, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Careful handling from the Wichita Falls team on a Palo Pinto County route. Reliable in remote areas with upfront travel-fee disclosure.',
      name: 'Rita V.',
      location: 'Palo Pinto, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  cass: [
    {
      quote:
        'Professional for our remote East Texas move in Linden. The Texarkana crew confirmed Cass County service and completed our rural relocation without rushing.',
      name: 'Sam W.',
      location: 'Linden, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Professional service in East Texas from Longview. Reliable in remote Cass County with careful handling on a longer Northeast Texas route.',
      name: 'Tina X.',
      location: 'Linden, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  kleberg: [
    {
      quote:
        'Professional for our remote South Texas move in Kingsville. The Corpus Christi crew confirmed Kleberg County coverage and handled ranch access without issues.',
      name: 'Uma Y.',
      location: 'Kingsville, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Careful handling from a second Corpus Christi estimate we compared. Reliable in remote Kingsville with organized loading and clear travel-fee disclosure.',
      name: 'Vic Z.',
      location: 'Kingsville, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  titus: [
    {
      quote:
        'Professional for our remote Northeast Texas move in Mount Pleasant. The Texarkana crew confirmed Titus County service and finished on schedule.',
      name: 'Wade A.',
      location: 'Mount Pleasant, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Reliable in remote areas — careful handling from the Longview team on a Mount Pleasant route with steady communication throughout.',
      name: 'Xena B.',
      location: 'Mount Pleasant, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  hale: [
    {
      quote:
        'Professional for our remote Panhandle move in Plainview. The Lubbock crew confirmed Hale County coverage and navigated our ranch driveway without issues.',
      name: 'Yuri C.',
      location: 'Plainview, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Careful handling from a second Lubbock estimate we compared. Reliable in remote Plainview with organized loading and clear travel-fee disclosure.',
      name: 'Zoe D.',
      location: 'Plainview, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  bee: [
    {
      quote:
        'Professional for our remote South Texas move in Beeville. The Corpus Christi crew confirmed Bee County service and handled ranch access without delay.',
      name: 'Adam E.',
      location: 'Beeville, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Professional service in South Texas from San Antonio. Reliable in remote Beeville with careful handling on a longer regional route.',
      name: 'Beth F.',
      location: 'Beeville, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  jasper: [
    {
      quote:
        'Professional for our remote East Texas move in Jasper. The Beaumont crew understood Piney Woods access and protected our floors through tight doorways.',
      name: 'Carl G.',
      location: 'Jasper, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Professional service in East Texas from Lufkin. Reliable in remote Jasper County with careful handling on a longer regional route.',
      name: 'Dana H.',
      location: 'Jasper, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  austin: [
    {
      quote:
        'Professional for our remote South Central Texas move in Bellville. The Houston crew confirmed Austin County service and handled our ranch property access professionally.',
      name: 'Evan I.',
      location: 'Bellville, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Reliable in remote areas — careful handling from the San Antonio team on an Austin County route with steady communication throughout.',
      name: 'Faye J.',
      location: 'Bellville, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  howard: [
    {
      quote:
        'Professional for our remote West Texas move in Big Spring. The Midland crew confirmed Howard County coverage and handled our oilfield-area relocation without damage.',
      name: 'Greg K.',
      location: 'Big Spring, TX',
      rating: 5,
      moveType: 'Oilfield',
    },
    {
      quote:
        'Professional service in West Texas from Abilene. Reliable in remote Big Spring with careful handling on a longer regional route.',
      name: 'Holly L.',
      location: 'Big Spring, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  grimes: [
    {
      quote:
        'Professional for our remote Southeast Texas move in Anderson. The Houston crew confirmed Grimes County service and managed our ranch driveway with the right truck setup.',
      name: 'Ivan M.',
      location: 'Anderson, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Professional service in Southeast Texas from College Station. Reliable in remote Grimes County with careful handling and clear travel-fee disclosure.',
      name: 'Jill N.',
      location: 'Anderson, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  matagorda: [
    {
      quote:
        'Professional for our coastal move in Bay City. The Houston crew confirmed Matagorda County service and handled our waterfront access carefully.',
      name: 'Kyle O.',
      location: 'Bay City, TX',
      rating: 5,
      moveType: 'Coastal',
    },
    {
      quote:
        'Careful handling from the Victoria team on a Bay City route. Reliable in remote coastal areas with upfront travel-fee disclosure.',
      name: 'Lara P.',
      location: 'Bay City, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  brown: [
    {
      quote:
        'Professional for our remote Central Texas move in Brownwood. The Abilene crew confirmed Brown County service and navigated our ranch road without issues.',
      name: 'Miles Q.',
      location: 'Brownwood, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Professional service in Central Texas from Waco. Reliable in remote Brownwood with careful handling on a longer regional route.',
      name: 'Nora R.',
      location: 'Brownwood, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  'jim-wells': [
    {
      quote:
        'Professional for our remote South Texas move in Alice. The Corpus Christi crew confirmed Jim Wells County coverage and handled ranch access without issues.',
      name: 'Omar S.',
      location: 'Alice, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Professional service in South Texas from Laredo. Reliable in remote Alice with careful handling and clear travel-fee disclosure.',
      name: 'Pam T.',
      location: 'Alice, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  washington: [
    {
      quote:
        'Professional for our remote South Central Texas move in Brenham. The Houston crew confirmed Washington County service and finished on a tight timeline.',
      name: 'Quinn U.',
      location: 'Brenham, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Careful handling from the Austin team on a Brenham route. Reliable in remote Washington County with organized loading and steady communication.',
      name: 'Rita V.',
      location: 'Brenham, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  hopkins: [
    {
      quote:
        'Professional for our remote Northeast Texas move in Sulphur Springs. The Dallas crew confirmed Hopkins County coverage and navigated our ranch driveway without issues.',
      name: 'Sam W.',
      location: 'Sulphur Springs, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Careful handling from the Texarkana team on a Sulphur Springs route. Reliable in remote areas with upfront travel-fee disclosure.',
      name: 'Tina X.',
      location: 'Sulphur Springs, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  fannin: [
    {
      quote:
        'Professional for our remote Northeast Texas move in Bonham. The Dallas crew confirmed Fannin County service and managed our ranch property access professionally.',
      name: 'Uma Y.',
      location: 'Bonham, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Professional service in Northeast Texas from Sherman. Reliable in remote Bonham with careful handling on a longer regional route.',
      name: 'Vic Z.',
      location: 'Bonham, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  hill: [
    {
      quote:
        'Professional for our remote Central Texas move in Hillsboro. The Waco crew confirmed Hill County coverage and finished on a tight timeline.',
      name: 'Wade A.',
      location: 'Hillsboro, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Professional service in Central Texas from Dallas. Reliable in remote Hillsboro with careful handling and clear travel-fee disclosure.',
      name: 'Xena B.',
      location: 'Hillsboro, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  wharton: [
    {
      quote:
        'Professional for our remote South Texas move in Wharton. The Houston crew confirmed county service and handled our ranch property access without delay.',
      name: 'Yuri C.',
      location: 'Wharton, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Careful handling from the Victoria team on a Wharton County route. Reliable in remote areas with organized loading and steady communication.',
      name: 'Zoe D.',
      location: 'Wharton, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  erath: [
    {
      quote:
        'Professional for our remote Central Texas move in Stephenville. The Fort Worth crew confirmed Erath County service and navigated our ranch road without issues.',
      name: 'Adam E.',
      location: 'Stephenville, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Professional service in Central Texas from Waco. Reliable in remote Stephenville with careful handling on a longer regional route.',
      name: 'Beth F.',
      location: 'Stephenville, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  cooke: [
    {
      quote:
        'Professional for our remote North Texas move in Gainesville. The Dallas crew confirmed Cooke County coverage and managed our ranch driveway with the right truck setup.',
      name: 'Carl G.',
      location: 'Gainesville, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Reliable in remote areas — careful handling from the Sherman team on a Gainesville route with clear travel-fee disclosure.',
      name: 'Dana H.',
      location: 'Gainesville, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  upshur: [
    {
      quote:
        'Professional for our remote East Texas move in Gilmer. The Longview crew confirmed Upshur County service and completed our Piney Woods relocation without rushing.',
      name: 'Evan I.',
      location: 'Gilmer, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Careful handling from a second Longview estimate we compared. Reliable in remote Gilmer with organized loading and steady communication.',
      name: 'Faye J.',
      location: 'Gilmer, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  'val-verde': [
    {
      quote:
        'Professional for our remote South Texas move in Del Rio. The San Antonio crew confirmed Val Verde County coverage and handled ranch access without issues.',
      name: 'Greg K.',
      location: 'Del Rio, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Professional service in South Texas from Laredo. Reliable in remote Del Rio with careful handling and clear travel-fee disclosure.',
      name: 'Holly L.',
      location: 'Del Rio, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  wood: [
    {
      quote:
        'Professional for our remote East Texas move in Quitman. The Tyler crew understood Piney Woods access and protected our floors through tight doorways.',
      name: 'Ivan M.',
      location: 'Quitman, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Professional service in East Texas from Longview. Reliable in remote Wood County with careful handling on a longer regional route.',
      name: 'Jill N.',
      location: 'Quitman, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  lamar: [
    {
      quote:
        'Professional for our remote Northeast Texas move in Paris. The Texarkana crew confirmed Lamar County service and finished our ranch move on schedule.',
      name: 'Kyle O.',
      location: 'Paris, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Reliable in remote areas — careful handling from the Dallas team on a Paris route with steady communication throughout.',
      name: 'Lara P.',
      location: 'Paris, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  medina: [
    {
      quote:
        'Professional for our remote South Texas move in Hondo. The San Antonio crew confirmed Medina County coverage and navigated our ranch driveway without issues.',
      name: 'Miles Q.',
      location: 'Hondo, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Careful handling from a second San Antonio estimate we compared. Reliable in remote Hondo with organized loading and clear travel-fee disclosure.',
      name: 'Nora R.',
      location: 'Hondo, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  hardin: [
    {
      quote:
        'Professional for our remote Southeast Texas move in Kountze. The Beaumont crew confirmed Hardin County service and finished our Piney Woods relocation on schedule.',
      name: 'Omar S.',
      location: 'Kountze, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Professional service in Southeast Texas from a second Beaumont provider. Reliable in remote Kountze with careful handling and steady communication.',
      name: 'Pam T.',
      location: 'Kountze, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  maverick: [
    {
      quote:
        'Professional for our remote South Texas move in Eagle Pass. The San Antonio crew confirmed Maverick County coverage and handled ranch access without delay.',
      name: 'Quinn U.',
      location: 'Eagle Pass, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Professional service in South Texas from Laredo. Reliable in remote Eagle Pass with careful handling and clear travel-fee disclosure.',
      name: 'Rita V.',
      location: 'Eagle Pass, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  chambers: [
    {
      quote:
        'Professional for our remote Southeast Texas move in Anahuac. The Houston crew confirmed Chambers County service and managed our coastal property access professionally.',
      name: 'Sam W.',
      location: 'Anahuac, TX',
      rating: 5,
      moveType: 'Coastal',
    },
    {
      quote:
        'Careful handling from a second Houston estimate we compared. Reliable in remote Anahuac with organized loading and upfront travel-fee disclosure.',
      name: 'Tina X.',
      location: 'Anahuac, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  anderson: [
    {
      quote:
        'Professional for our remote East Texas move in Palestine. The Tyler crew understood Piney Woods access and protected our floors through tight doorways.',
      name: 'Uma Y.',
      location: 'Palestine, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Professional service in East Texas from Lufkin. Reliable in remote Anderson County with careful handling on a longer regional route.',
      name: 'Vic Z.',
      location: 'Palestine, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  nacogdoches: [
    {
      quote:
        'Professional for our remote East Texas move in Nacogdoches. The Lufkin crew confirmed county service and completed our Piney Woods relocation without rushing.',
      name: 'Wade A.',
      location: 'Nacogdoches, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Reliable in remote areas — careful handling from a second Lufkin provider with steady communication throughout our Nacogdoches County move.',
      name: 'Xena B.',
      location: 'Nacogdoches, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  starr: [
    {
      quote:
        'Professional for our remote South Texas move in Rio Grande City. The Laredo crew confirmed Starr County coverage and handled ranch access without issues.',
      name: 'Yuri C.',
      location: 'Rio Grande City, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Professional service in South Texas from McAllen. Reliable in remote Rio Grande City with careful handling and clear travel-fee disclosure.',
      name: 'Zoe D.',
      location: 'Rio Grande City, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  'van-zandt': [
    {
      quote:
        'Professional for our remote East Texas move in Canton. The Tyler crew confirmed Van Zandt County service and finished on a tight timeline.',
      name: 'Adam E.',
      location: 'Canton, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Professional service in East Texas from Dallas. Reliable in remote Canton with careful handling on a longer regional route.',
      name: 'Beth F.',
      location: 'Canton, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  hood: [
    {
      quote:
        'Professional for our remote North Texas move in Granbury. The Fort Worth crew confirmed Hood County coverage and navigated our ranch road without tearing up the driveway.',
      name: 'Carl G.',
      location: 'Granbury, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Careful handling from a second Fort Worth estimate we compared. Reliable in remote Granbury with organized loading and clear travel-fee disclosure.',
      name: 'Dana H.',
      location: 'Granbury, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  harrison: [
    {
      quote:
        'Professional for our remote East Texas move in Marshall. The Longview crew confirmed Harrison County service and completed our relocation without rushing.',
      name: 'Evan I.',
      location: 'Marshall, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Professional service in East Texas from a Shreveport provider. Reliable in remote Marshall with careful handling on a cross-border regional route.',
      name: 'Faye J.',
      location: 'Marshall, TX',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
};

export function getTexasCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return texasCountyTestimonials[countySlug] ?? [];
}