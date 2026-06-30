/** Bidirectional county ↔ destination hub links for internal linking SEO */

export type DestinationHubLink = {
  label: string;
  href: string;
  description: string;
};

const COUNTY_DESTINATION_HUBS: Record<string, Record<string, DestinationHubLink>> = {
  'south-carolina': {
    horry: {
      label: 'Moving to South Carolina',
      href: '/moving-to/south-carolina',
      description: 'Grand Strand inbound guide — costs, routes, and interstate movers',
    },
    georgetown: {
      label: 'Moving to the Grand Strand',
      href: '/moving-to/south-carolina/myrtle-beach-sc',
      description: 'Myrtle Beach, Murrells Inlet, and Georgetown County coastal guides',
    },
    beaufort: {
      label: 'Moving to Hilton Head',
      href: '/moving-to/south-carolina/hilton-head-sc',
      description: 'Premier Lowcountry island and resort inbound moving guide',
    },
    greenville: {
      label: 'Moving to Greenville',
      href: '/moving-to/south-carolina/greenville-sc',
      description: 'Upstate SC economic powerhouse inbound moving guide',
    },
    spartanburg: {
      label: 'Moving to Spartanburg',
      href: '/moving-to/south-carolina/spartanburg-sc',
      description: 'Automotive and logistics Upstate SC inbound guide',
    },
  },
  'north-carolina': {
    brunswick: {
      label: 'Moving to Wilmington & Leland',
      href: '/moving-to/north-carolina/wilmington-leland-nc',
      description: 'Wilmington–Brunswick corridor inbound moving guide',
    },
    'new-hanover': {
      label: 'Moving to Wilmington & Leland',
      href: '/moving-to/north-carolina/wilmington-leland-nc',
      description: 'Wilmington-area inbound moving guide and cost data',
    },
    mecklenburg: {
      label: 'Moving to Charlotte',
      href: '/moving-to/north-carolina/charlotte-nc',
      description: 'Charlotte metro inbound guide — banking, corporate, and lakefront suburbs',
    },
    wake: {
      label: 'Moving to the Research Triangle',
      href: '/moving-to/north-carolina/raleigh-durham-nc',
      description: 'Raleigh, Durham, and Triangle tech/biotech relocation guides',
    },
    iredell: {
      label: 'Moving to Mooresville',
      href: '/moving-to/north-carolina/mooresville-nc',
      description: 'Lake Norman lifestyle and Charlotte-commute inbound guide',
    },
    catawba: {
      label: 'Moving to Hickory',
      href: '/moving-to/north-carolina/hickory-nc',
      description: 'Blue Ridge foothills affordable alternative near Charlotte',
    },
  },
  idaho: {
    ada: {
      label: 'Moving to Idaho',
      href: '/moving-to/idaho',
      description: 'Treasure Valley inbound guide — Boise, Meridian, Eagle city hubs',
    },
    canyon: {
      label: 'Moving to Nampa & Caldwell',
      href: '/moving-to/idaho/nampa-caldwell-id',
      description: 'Affordable Treasure Valley corridor with Boise job access',
    },
    kootenai: {
      label: "Moving to Coeur d'Alene",
      href: '/moving-to/idaho/coeur-dalene-id',
      description: 'Panhandle lakeside inbound moving guide',
    },
    bonner: {
      label: 'Moving to Sandpoint',
      href: '/moving-to/idaho/sandpoint-id',
      description: 'Lake Pend Oreille and Schweitzer Mountain relocation guide',
    },
    bonneville: {
      label: 'Moving to Idaho Falls',
      href: '/moving-to/idaho/idaho-falls-id',
      description: 'Eastern Idaho INL corridor inbound guide',
    },
    'twin-falls': {
      label: 'Moving to Twin Falls',
      href: '/moving-to/idaho/twin-falls-id',
      description: 'Snake River Canyon affordable outdoor living guide',
    },
  },
  oregon: {
    multnomah: {
      label: 'Moving to Portland',
      href: '/moving-to/oregon/portland-or',
      description: 'Portland metro inbound moving guide — creative urban neighborhoods',
    },
    washington: {
      label: 'Moving to Hillsboro & Beaverton',
      href: '/moving-to/oregon/hillsboro-beaverton-or',
      description: 'Silicon Forest tech corridor inbound guide with MAX light-rail access',
    },
    clackamas: {
      label: 'Moving to Oregon',
      href: '/moving-to/oregon',
      description: 'Portland metro spillover — Oregon inbound cluster overview',
    },
    deschutes: {
      label: 'Moving to Bend',
      href: '/moving-to/oregon/bend-or',
      description: 'Central Oregon outdoor capital inbound moving guide',
    },
    lane: {
      label: 'Moving to Eugene',
      href: '/moving-to/oregon/eugene-or',
      description: 'University of Oregon Willamette Valley inbound guide',
    },
    benton: {
      label: 'Moving to Corvallis',
      href: '/moving-to/oregon/corvallis-or',
      description: 'Oregon State University research corridor inbound guide',
    },
    marion: {
      label: 'Moving to Salem',
      href: '/moving-to/oregon/salem-or',
      description: 'Affordable Oregon state capital inbound moving guide',
    },
    polk: {
      label: 'Moving to Salem',
      href: '/moving-to/oregon/salem-or',
      description: 'West Salem and Polk County — state capital corridor guide',
    },
  },
  oklahoma: {
    oklahoma: {
      label: 'Moving to Oklahoma City',
      href: '/moving-to/oklahoma/oklahoma-city-ok',
      description: 'OKC metro inbound guide — MAPS revitalization and aerospace corridor',
    },
    canadian: {
      label: 'Moving to Edmond',
      href: '/moving-to/oklahoma/edmond-ok',
      description: 'Premier OKC suburb with top schools and family neighborhoods',
    },
    cleveland: {
      label: 'Moving to Norman',
      href: '/moving-to/oklahoma/norman-ok',
      description: 'University of Oklahoma college-town inbound moving guide',
    },
    tulsa: {
      label: 'Moving to Tulsa',
      href: '/moving-to/oklahoma/tulsa-ok',
      description: 'Tulsa metro cultural hub — Art Deco, Gathering Place, arts scene',
    },
    wagoner: {
      label: 'Moving to Oklahoma',
      href: '/moving-to/oklahoma',
      description: 'Tulsa metro spillover — Oklahoma inbound cluster overview',
    },
    payne: {
      label: 'Moving to Stillwater',
      href: '/moving-to/oklahoma/stillwater-ok',
      description: 'Oklahoma State University affordable college-town guide',
    },
  },
  arizona: {
    maricopa: {
      label: 'Moving to Phoenix',
      href: '/moving-to/arizona/phoenix-az',
      description: 'Valley of the Sun flagship metro inbound moving guide',
    },
    pinal: {
      label: 'Moving to Maricopa & Casa Grande',
      href: '/moving-to/arizona/maricopa-casa-grande-az',
      description: 'Pinal County affordable Phoenix commute corridor guide',
    },
    pima: {
      label: 'Moving to Tucson & Marana',
      href: '/moving-to/arizona/tucson-marana-az',
      description: 'Southern Arizona mountain lifestyle inbound guide',
    },
  },
  alabama: {
    madison: {
      label: 'Moving to Huntsville & Madison',
      href: '/moving-to/alabama/huntsville-al',
      description: 'Rocket City NASA and Redstone Arsenal inbound moving guide',
    },
    limestone: {
      label: 'Moving to Athens',
      href: '/moving-to/alabama/athens-al',
      description: 'Limestone County Huntsville spillover inbound guide',
    },
    baldwin: {
      label: 'Moving to Baldwin County',
      href: '/moving-to/alabama/fairhope-gulf-shores-al',
      description: 'Coastal South Foley, Daphne, Fairhope and Gulf Shores guide',
    },
    jefferson: {
      label: 'Moving to Hoover',
      href: '/moving-to/alabama/hoover-al',
      description: 'Upscale Birmingham-metro Hoover inbound moving guide',
    },
    shelby: {
      label: 'Moving to Hoover',
      href: '/moving-to/alabama/hoover-al',
      description: 'Shelby County Hoover master-planned suburb guide',
    },
    lee: {
      label: 'Moving to Auburn & Opelika',
      href: '/moving-to/alabama/auburn-opelika-al',
      description: 'Auburn University Lee County inbound moving guide',
    },
  },
  california: {
    sacramento: {
      label: 'Moving to Sacramento',
      href: '/moving-to/california/sacramento-ca',
      description: 'Capital region tech and government inbound moving guide',
    },
    riverside: {
      label: 'Moving to Inland Empire',
      href: '/moving-to/california/riverside-san-bernardino-ca',
      description: 'Riverside and San Bernardino affordable SoCal corridor guide',
    },
    'san-bernardino': {
      label: 'Moving to Inland Empire',
      href: '/moving-to/california/riverside-san-bernardino-ca',
      description: 'Inland Empire logistics and suburban growth inbound guide',
    },
    kern: {
      label: 'Moving to Bakersfield',
      href: '/moving-to/california/bakersfield-ca',
      description: 'Kern County Central Valley affordability inbound guide',
    },
    fresno: {
      label: 'Moving to Fresno',
      href: '/moving-to/california/fresno-ca',
      description: 'Central Valley agriculture hub inbound moving guide',
    },
    'san-joaquin': {
      label: 'Moving to Stockton',
      href: '/moving-to/california/stockton-ca',
      description: 'San Joaquin County port logistics inbound guide',
    },
    stanislaus: {
      label: 'Moving to Modesto',
      href: '/moving-to/california/modesto-ca',
      description: 'Stanislaus County agribusiness inbound moving guide',
    },
    'san-diego': {
      label: 'Moving to San Diego',
      href: '/moving-to/california/san-diego-ca',
      description: 'San Diego and North County biotech corridor inbound guide',
    },
    ventura: {
      label: 'Moving to Ventura & Oxnard',
      href: '/moving-to/california/ventura-oxnard-ca',
      description: 'Ventura County coastal corridor inbound guide',
    },
    'los-angeles': {
      label: 'Moving to Palmdale & Lancaster',
      href: '/moving-to/california/palmdale-lancaster-ca',
      description: 'Antelope Valley high-desert affordability inbound guide',
    },
    shasta: {
      label: 'Moving to Redding',
      href: '/moving-to/california/redding-ca',
      description: 'Shasta County Northern California outdoor gateway guide',
    },
  },
  arkansas: {
    benton: {
      label: 'Moving to Rogers & NWA',
      href: '/moving-to/arkansas/rogers-ar',
      description: '#1 Arkansas inbound city with Beaver Lake and Benton County NWA guides',
    },
    washington: {
      label: 'Moving to Fayetteville',
      href: '/moving-to/arkansas/fayetteville-ar',
      description: 'University of Arkansas NWA college-town inbound guide',
    },
    faulkner: {
      label: 'Moving to Conway',
      href: '/moving-to/arkansas/conway-ar',
      description: 'City of Colleges central Arkansas inbound guide',
    },
    pulaski: {
      label: 'Moving to Little Rock',
      href: '/moving-to/arkansas/little-rock-ar',
      description: 'Arkansas state capital riverfront inbound guide',
    },
    sebastian: {
      label: 'Moving to Fort Smith',
      href: '/moving-to/arkansas/fort-smith-ar',
      description: 'Western border logistics and historic downtown inbound guide',
    },
    craighead: {
      label: 'Moving to Jonesboro',
      href: '/moving-to/arkansas/jonesboro-ar',
      description: 'Northeast Arkansas hub with Arkansas State University guide',
    },
  },
  tennessee: {
    davidson: {
      label: 'Moving to Nashville',
      href: '/moving-to/tennessee/nashville-tn',
      description: 'Music City inbound guide — corporate, healthcare, and suburban growth corridors',
    },
    williamson: {
      label: 'Moving to Franklin & Brentwood',
      href: '/moving-to/tennessee/franklin-brentwood-tn',
      description: 'Williamson County premium Nashville suburb inbound guide',
    },
    rutherford: {
      label: 'Moving to Murfreesboro',
      href: '/moving-to/tennessee/murfreesboro-tn',
      description: 'Murfreesboro and Rutherford County Nashville spillover guide',
    },
    knox: {
      label: 'Moving to Knoxville',
      href: '/moving-to/tennessee/knoxville-tn',
      description: 'East Tennessee university and Oak Ridge corridor inbound guide',
    },
    hamilton: {
      label: 'Moving to Chattanooga',
      href: '/moving-to/tennessee/chattanooga-tn',
      description: 'Chattanooga riverfront and Lookout Mountain inbound guide',
    },
    montgomery: {
      label: 'Moving to Clarksville',
      href: '/moving-to/tennessee/clarksville-tn',
      description: 'Fort Campbell and Austin Peay corridor inbound guide',
    },
    wilson: {
      label: 'Moving to Mount Juliet',
      href: '/moving-to/tennessee/mount-juliet-tn',
      description: 'Wilson County Nashville eastern suburb inbound guide',
    },
  },
  texas: {
    harris: {
      label: 'Moving to Houston',
      href: '/moving-to/texas/houston-tx',
      description: 'Houston metro energy and medical corridor inbound guide',
    },
    travis: {
      label: 'Moving to Austin',
      href: '/moving-to/texas/austin-tx',
      description: 'Austin tech corridor inbound moving guide and cost data',
    },
    dallas: {
      label: 'Moving to Dallas–Fort Worth',
      href: '/moving-to/texas/dallas-fort-worth-tx',
      description: 'DFW corporate and suburban growth inbound guide',
    },
    tarrant: {
      label: 'Moving to Dallas–Fort Worth',
      href: '/moving-to/texas/dallas-fort-worth-tx',
      description: 'Fort Worth and Arlington metro inbound relocation guide',
    },
    bexar: {
      label: 'Moving to San Antonio',
      href: '/moving-to/texas/san-antonio-tx',
      description: 'San Antonio military and healthcare corridor inbound guide',
    },
    'el-paso': {
      label: 'Moving to El Paso',
      href: '/moving-to/texas/el-paso-tx',
      description: 'West Texas border metro inbound moving guide',
    },
    lubbock: {
      label: 'Moving to Lubbock',
      href: '/moving-to/texas/lubbock-tx',
      description: 'South Plains university and agriculture hub inbound guide',
    },
    midland: {
      label: 'Moving to Midland & Odessa',
      href: '/moving-to/texas/midland-odessa-tx',
      description: 'Permian Basin energy corridor inbound guide',
    },
    denton: {
      label: 'Moving to Dallas–Fort Worth',
      href: '/moving-to/texas/dallas-fort-worth-tx',
      description: 'Denton County DFW northern growth corridor guide',
    },
    collin: {
      label: 'Moving to Dallas–Fort Worth',
      href: '/moving-to/texas/dallas-fort-worth-tx',
      description: 'Collin County Plano–Frisco corporate suburb guide',
    },
  },
  'new-york': {
    nassau: {
      label: 'Moving to Nassau County',
      href: '/moving-to/new-york/massapequa-park-ny',
      description: 'Massapequa Park and Hicksville Long Island LIRR suburb guides',
    },
    suffolk: {
      label: 'Moving to Lindenhurst',
      href: '/moving-to/new-york/lindenhurst-ny',
      description: 'Suffolk County South Shore maritime village inbound guide',
    },
    westchester: {
      label: 'Moving to Westchester County',
      href: '/moving-to/new-york/white-plains-ny',
      description: 'White Plains and New Rochelle corporate-coastal inbound guides',
    },
    monroe: {
      label: 'Moving to Greece',
      href: '/moving-to/new-york/greece-ny',
      description: 'Monroe County Rochester-area affordable suburb guide',
    },
    erie: {
      label: 'Moving to Buffalo suburbs',
      href: '/moving-to/new-york/cheektowaga-ny',
      description: 'Cheektowaga and Tonawanda Erie County affordability guides',
    },
    warren: {
      label: 'Moving to Glens Falls',
      href: '/moving-to/new-york/glens-falls-ny',
      description: 'Warren County Adirondacks gateway arts and outdoor guide',
    },
    chemung: {
      label: 'Moving to Elmira',
      href: '/moving-to/new-york/elmira-ny',
      description: 'Chemung County Southern Tier affordability inbound guide',
    },
  },
  'new-jersey': {
    hudson: {
      label: 'Moving to the Hudson Waterfront',
      href: '/moving-to/new-jersey/jersey-city-nj',
      description: 'Jersey City, Hoboken, Bayonne, and Union City Manhattan-adjacent guides',
    },
    passaic: {
      label: 'Moving to Clifton & Passaic',
      href: '/moving-to/new-jersey/clifton-nj',
      description: 'Passaic County gateway-city and suburban inbound moving guides',
    },
    union: {
      label: 'Moving to Elizabeth & Union County',
      href: '/moving-to/new-jersey/passaic-elizabeth-nj',
      description: 'Elizabeth NJ Transit hub and Union County gateway inbound guide',
    },
    morris: {
      label: 'Moving to Morristown',
      href: '/moving-to/new-jersey/morristown-nj',
      description: 'Morris County premier suburb with Midtown Direct commuter rail',
    },
    essex: {
      label: 'Moving to Montclair',
      href: '/moving-to/new-jersey/montclair-nj',
      description: 'Montclair arts corridor and Essex County walkable downtown guide',
    },
    mercer: {
      label: 'Moving to Princeton',
      href: '/moving-to/new-jersey/princeton-nj',
      description: 'Princeton Ivy League campus town and Mercer County inbound guide',
    },
    cumberland: {
      label: 'Moving to Vineland',
      href: '/moving-to/new-jersey/vineland-nj',
      description: 'Cumberland County South Jersey affordability and farm-country guide',
    },
  },
  'new-mexico': {
    sandoval: {
      label: 'Moving to Rio Rancho',
      href: '/moving-to/new-mexico/rio-rancho-nm',
      description: 'Sandoval County #1 New Mexico inbound master-planned guide',
    },
    bernalillo: {
      label: 'Moving to Albuquerque',
      href: '/moving-to/new-mexico/albuquerque-nm',
      description: 'Bernalillo County Rio Grande metro and Corrales inbound guides',
    },
    'santa-fe': {
      label: 'Moving to Santa Fe',
      href: '/moving-to/new-mexico/santa-fe-nm',
      description: 'Santa Fe County arts capital inbound guide',
    },
    'los-alamos': {
      label: 'Moving to Los Alamos',
      href: '/moving-to/new-mexico/los-alamos-nm',
      description: 'Los Alamos national laboratory mesa community inbound guide',
    },
    'doa-ana': {
      label: 'Moving to Las Cruces',
      href: '/moving-to/new-mexico/las-cruces-nm',
      description: 'Doña Ana County southern college-town inbound guide',
    },
    'san-juan': {
      label: 'Moving to Farmington',
      href: '/moving-to/new-mexico/farmington-nm',
      description: 'San Juan County Four Corners inbound guide',
    },
    otero: {
      label: 'Moving to Alamogordo',
      href: '/moving-to/new-mexico/alamogordo-nm',
      description: 'Otero County White Sands military corridor inbound guide',
    },
    taos: {
      label: 'Moving to Taos',
      href: '/moving-to/new-mexico/taos-nm',
      description: 'Taos County artistic mountain-town inbound guide',
    },
    lincoln: {
      label: 'Moving to Ruidoso',
      href: '/moving-to/new-mexico/ruidoso-nm',
      description: 'Lincoln County Sierra Blanca resort inbound guide',
    },
  },
  alaska: {
    anchorage: {
      label: 'Moving to Anchorage',
      href: '/moving-to/alaska/anchorage-ak',
      description: 'Anchorage Borough largest-city economic and defense hub inbound guide',
    },
    'matanuska-susitna': {
      label: 'Moving to Wasilla & Palmer',
      href: '/moving-to/alaska/wasilla-ak',
      description: 'Mat-Su Valley fastest-growing family corridor inbound guides',
    },
    'fairbanks-north-star': {
      label: 'Moving to Fairbanks',
      href: '/moving-to/alaska/fairbanks-ak',
      description: 'Interior Alaska university and Northern Lights inbound guide',
    },
    juneau: {
      label: 'Moving to Juneau',
      href: '/moving-to/alaska/juneau-ak',
      description: 'Alaska state capital island-community inbound guide',
    },
    'kenai-peninsula': {
      label: 'Moving to Soldotna & Kenai',
      href: '/moving-to/alaska/soldotna-ak',
      description: 'Kenai Peninsula fishing and recreation inbound guides',
    },
    sitka: {
      label: 'Moving to Sitka',
      href: '/moving-to/alaska/sitka-ak',
      description: 'Sitka maritime heritage safest-city inbound guide',
    },
    'ketchikan-gateway': {
      label: 'Moving to Ketchikan',
      href: '/moving-to/alaska/ketchikan-ak',
      description: 'Ketchikan Inside Passage rainforest inbound guide',
    },
  },
  hawaii: {
    honolulu: {
      label: 'Moving to Honolulu',
      href: '/moving-to/hawaii/honolulu-hi',
      description: 'Honolulu County Oʻahu urban capital and suburb inbound guides',
    },
    maui: {
      label: 'Moving to Kihei & Wailuku',
      href: '/moving-to/hawaii/kihei-hi',
      description: 'Maui County south-shore and historic county-seat inbound guides',
    },
    hawaii: {
      label: 'Moving to Hilo & Kailua-Kona',
      href: '/moving-to/hawaii/hilo-hi',
      description: 'Hawaiʻi County Big Island rainforest and leeward coast inbound guides',
    },
    kauai: {
      label: 'Moving to Lihue',
      href: '/moving-to/hawaii/lihue-hi',
      description: 'Kauaʻi County Garden Isle commercial capital inbound guide',
    },
  },
  louisiana: {
    jefferson: {
      label: 'Moving to Metairie',
      href: '/moving-to/louisiana/metairie-la',
      description: 'Jefferson Parish #1 Louisiana inbound suburb guides',
    },
    'st-tammany': {
      label: 'Moving to Mandeville',
      href: '/moving-to/louisiana/mandeville-la',
      description: 'St. Tammany Northshore waterfront and Slidell inbound guides',
    },
    lafayette: {
      label: 'Moving to Lafayette',
      href: '/moving-to/louisiana/lafayette-la',
      description: 'Lafayette Parish Cajun Country cultural capital inbound guide',
    },
    calcasieu: {
      label: 'Moving to Lake Charles',
      href: '/moving-to/louisiana/lake-charles-la',
      description: 'Calcasieu Parish industrial and energy boom inbound guide',
    },
    terrebonne: {
      label: 'Moving to Houma',
      href: '/moving-to/louisiana/houma-la',
      description: 'Terrebonne Parish authentic bayou country inbound guide',
    },
    'east-baton-rouge': {
      label: 'Moving to Baton Rouge',
      href: '/moving-to/louisiana/baton-rouge-la',
      description: 'East Baton Rouge state capital and LSU inbound guide',
    },
    ascension: {
      label: 'Moving to Prairieville',
      href: '/moving-to/louisiana/prairieville-la',
      description: 'Ascension Parish fast-growing Baton Rouge suburb inbound guide',
    },
    bossier: {
      label: 'Moving to Bossier City',
      href: '/moving-to/louisiana/bossier-city-la',
      description: 'Bossier Parish tech-forward Shreveport spillover inbound guide',
    },
  },
  mississippi: {
    harrison: {
      label: 'Moving to Gulfport',
      href: '/moving-to/mississippi/gulfport-ms',
      description: 'Harrison County #1 Mississippi Gulf Coast port and beach inbound guide',
    },
    jackson: {
      label: 'Moving to Ocean Springs',
      href: '/moving-to/mississippi/ocean-springs-ms',
      description: 'Jackson County artistic coastal community inbound guide',
    },
    madison: {
      label: 'Moving to Madison',
      href: '/moving-to/mississippi/madison-ms',
      description: 'Madison County affluent A+ school Jackson Metro suburb inbound guides',
    },
    rankin: {
      label: 'Moving to Flowood',
      href: '/moving-to/mississippi/flowood-ms',
      description: 'Rankin County healthcare-commercial Jackson Metro suburb inbound guides',
    },
    hinds: {
      label: 'Moving to Jackson',
      href: '/moving-to/mississippi/jackson-ms',
      description: 'Hinds County state capital government and healthcare inbound guide',
    },
    forrest: {
      label: 'Moving to Hattiesburg',
      href: '/moving-to/mississippi/hattiesburg-ms',
      description: 'Forrest County Hub City USM university economy inbound guide',
    },
    lafayette: {
      label: 'Moving to Oxford',
      href: '/moving-to/mississippi/oxford-ms',
      description: 'Lafayette County Ole Miss college-town inbound guide',
    },
    desoto: {
      label: 'Moving to Olive Branch',
      href: '/moving-to/mississippi/olive-branch-ms',
      description: 'DeSoto County Memphis-border fastest-growing boomtown inbound guide',
    },
  },
  georgia: {
    fulton: {
      label: 'Moving to Johns Creek',
      href: '/moving-to/georgia/johns-creek-ga',
      description: 'Fulton County North Fulton elite suburb inbound guides',
    },
    dekalb: {
      label: 'Moving to Decatur',
      href: '/moving-to/georgia/decatur-ga',
      description: 'DeKalb County progressive MARTA-connected inbound guide',
    },
    cobb: {
      label: 'Moving to Smyrna',
      href: '/moving-to/georgia/smyrna-ga',
      description: 'Cobb County Jonquil City Truist Park corridor inbound guide',
    },
    forsyth: {
      label: 'Moving to Cumming',
      href: '/moving-to/georgia/cumming-ga',
      description: 'Forsyth County Lake Lanier exurban inbound guide',
    },
    chatham: {
      label: 'Moving to Savannah',
      href: '/moving-to/georgia/savannah-ga',
      description: 'Chatham County historic coastal and Pooler boomtown inbound guides',
    },
    houston: {
      label: 'Moving to Warner Robins',
      href: '/moving-to/georgia/warner-robins-ga',
      description: 'Houston County Robins AFB defense-aerospace inbound guide',
    },
  },
  indiana: {
    hamilton: {
      label: 'Moving to Carmel',
      href: '/moving-to/indiana/carmel-in',
      description: 'Hamilton County #1 and #2 ranked suburb inbound guides',
    },
    marion: {
      label: 'Moving to Indianapolis',
      href: '/moving-to/indiana/indianapolis-in',
      description: 'Marion County capital metro and Silicon Heartland inbound guide',
    },
    johnson: {
      label: 'Moving to Greenwood',
      href: '/moving-to/indiana/greenwood-in',
      description: 'Johnson County southside Indy corridor inbound guide',
    },
    bartholomew: {
      label: 'Moving to Columbus',
      href: '/moving-to/indiana/columbus-in',
      description: 'Bartholomew County Cummins architectural gem inbound guide',
    },
    allen: {
      label: 'Moving to Fort Wayne',
      href: '/moving-to/indiana/fort-wayne-in',
      description: 'Allen County riverfront redevelopment inbound guide',
    },
    monroe: {
      label: 'Moving to Bloomington',
      href: '/moving-to/indiana/bloomington-in',
      description: 'Monroe County Indiana University college-town inbound guide',
    },
    delaware: {
      label: 'Moving to Muncie',
      href: '/moving-to/indiana/muncie-in',
      description: 'Delaware County Ball State affordability inbound guide',
    },
    vanderburgh: {
      label: 'Moving to Evansville',
      href: '/moving-to/indiana/evansville-in',
      description: 'Vanderburgh County tri-state river city inbound guide',
    },
  },
  illinois: {
    cook: {
      label: 'Moving to Chicago',
      href: '/moving-to/illinois/chicago-il',
      description: 'Cook County flagship urban hub — Loop, Lincoln Park, and Lakeview inbound guide',
    },
  },
  maine: {
    cumberland: {
      label: 'Moving to Portland',
      href: '/moving-to/maine/portland-me',
      description: 'Cumberland County Greater Portland and suburban inbound guides',
    },
    york: {
      label: 'Moving to Kittery',
      href: '/moving-to/maine/kittery-me',
      description: 'York County border-town and Seacoast corridor inbound guide',
    },
    androscoggin: {
      label: 'Moving to Lewiston',
      href: '/moving-to/maine/lewiston-me',
      description: 'Androscoggin County twin-city affordability inbound guides',
    },
    penobscot: {
      label: 'Moving to Bangor',
      href: '/moving-to/maine/bangor-me',
      description: 'Penobscot County Central Maine hub inbound guide',
    },
  },
  vermont: {
    chittenden: {
      label: 'Moving to Burlington',
      href: '/moving-to/vermont/burlington-vt',
      description: 'Chittenden County Champlain Valley Burlington metro inbound guides',
    },
    washington: {
      label: 'Moving to Montpelier',
      href: '/moving-to/vermont/montpelier-vt',
      description: 'Washington County state capital inbound guide',
    },
    rutland: {
      label: 'Moving to Rutland',
      href: '/moving-to/vermont/rutland-vt',
      description: 'Rutland County central Vermont affordability inbound guide',
    },
    caledonia: {
      label: 'Moving to St. Johnsbury',
      href: '/moving-to/vermont/st-johnsbury-vt',
      description: 'Caledonia County Northeast Kingdom gateway inbound guide',
    },
    addison: {
      label: 'Moving to Middlebury',
      href: '/moving-to/vermont/middlebury-vt',
      description: 'Addison County college-town inbound guide',
    },
    windham: {
      label: 'Moving to Brattleboro',
      href: '/moving-to/vermont/brattleboro-vt',
      description: 'Windham County southern gateway inbound guide',
    },
  },
  'rhode-island': {
    providence: {
      label: 'Moving to Providence',
      href: '/moving-to/rhode-island/providence-ri',
      description: 'Providence County capital and Cranston urban-suburb inbound guides',
    },
    kent: {
      label: 'Moving to Warwick',
      href: '/moving-to/rhode-island/warwick-ri',
      description: 'Kent County Warwick and East Greenwich airport-corridor inbound guides',
    },
    bristol: {
      label: 'Moving to Barrington',
      href: '/moving-to/rhode-island/barrington-ri',
      description: 'Bristol County East Bay coastal Barrington and Bristol inbound guides',
    },
    washington: {
      label: 'Moving to North Kingstown',
      href: '/moving-to/rhode-island/north-kingstown-ri',
      description: 'Washington County Wickford and South County coastal inbound guide',
    },
    newport: {
      label: 'Moving to Newport',
      href: '/moving-to/rhode-island/newport-ri',
      description: 'Newport County luxury coastal resort inbound guide',
    },
  },
  massachusetts: {
    middlesex: {
      label: 'Moving to Cambridge',
      href: '/moving-to/massachusetts/cambridge-ma',
      description: 'Middlesex County Greater Boston innovation and elite suburb inbound guides',
    },
    norfolk: {
      label: 'Moving to Brookline',
      href: '/moving-to/massachusetts/brookline-ma',
      description: 'Norfolk County Brookline and Quincy coastal corridor inbound guides',
    },
    worcester: {
      label: 'Moving to Worcester',
      href: '/moving-to/massachusetts/worcester-ma',
      description: 'Worcester County central Massachusetts affordability inbound guide',
    },
  },
  pennsylvania: {
    allegheny: {
      label: 'Moving to Pittsburgh',
      href: '/moving-to/pennsylvania/pittsburgh-pa',
      description: 'Pittsburgh tech, robotics, and healthcare corridor inbound guide',
    },
    erie: {
      label: 'Moving to Erie',
      href: '/moving-to/pennsylvania/erie-pa',
      description: 'Erie County Great Lakes waterfront inbound moving guide',
    },
    cambria: {
      label: 'Moving to Johnstown',
      href: '/moving-to/pennsylvania/johnstown-pa',
      description: 'Cambria County affordable riverfront inbound guide',
    },
    blair: {
      label: 'Moving to Altoona',
      href: '/moving-to/pennsylvania/altoona-pa',
      description: 'Blair County Allegheny Mountains budget-friendly inbound guide',
    },
    northampton: {
      label: 'Moving to Bethlehem',
      href: '/moving-to/pennsylvania/bethlehem-pa',
      description: 'Bethlehem Lehigh Valley innovation and arts inbound guide',
    },
    lackawanna: {
      label: 'Moving to Scranton',
      href: '/moving-to/pennsylvania/scranton-pa',
      description: 'Scranton Electric City revitalization inbound guide',
    },
    lancaster: {
      label: 'Moving to Lancaster',
      href: '/moving-to/pennsylvania/lancaster-pa',
      description: 'Lancaster County arts-and-farmland inbound guide',
    },
    franklin: {
      label: 'Moving to Chambersburg',
      href: '/moving-to/pennsylvania/chambersburg-pa',
      description: 'Franklin County Cumberland Valley inbound guide',
    },
    centre: {
      label: 'Moving to State College',
      href: '/moving-to/pennsylvania/state-college-pa',
      description: 'Centre County Penn State college-town inbound guide',
    },
    lycoming: {
      label: 'Moving to Williamsport',
      href: '/moving-to/pennsylvania/williamsport-pa',
      description: 'Lycoming County north-central PA affordability inbound guide',
    },
  },
  'west-virginia': {
    berkeley: {
      label: 'Moving to Martinsburg',
      href: '/moving-to/west-virginia/martinsburg-wv',
      description: 'Berkeley County Eastern Panhandle DC commuter inbound guide',
    },
    jefferson: {
      label: 'Moving to the Eastern Panhandle',
      href: '/moving-to/west-virginia/charles-town-ranson-wv',
      description: 'Charles Town, Ranson, and Shepherdstown Jefferson County guides',
    },
    monongalia: {
      label: 'Moving to Morgantown',
      href: '/moving-to/west-virginia/morgantown-wv',
      description: 'WVU and Monongalia County tech/healthcare inbound guide',
    },
    harrison: {
      label: 'Moving to Bridgeport',
      href: '/moving-to/west-virginia/bridgeport-wv',
      description: 'Bridgeport North Central WV suburban inbound guide',
    },
    kanawha: {
      label: 'Moving to Charleston',
      href: '/moving-to/west-virginia/charleston-wv',
      description: 'West Virginia capital Kanawha County inbound guide',
    },
    putnam: {
      label: 'Moving to Hurricane & Teays Valley',
      href: '/moving-to/west-virginia/hurricane-teays-valley-wv',
      description: 'Putnam County I-64 suburban family growth inbound guide',
    },
    greenbrier: {
      label: 'Moving to Lewisburg',
      href: '/moving-to/west-virginia/lewisburg-wv',
      description: 'Greenbrier Valley arts and resort corridor inbound guide',
    },
    randolph: {
      label: 'Moving to Elkins',
      href: '/moving-to/west-virginia/elkins-wv',
      description: 'Randolph County mountain town affordable inbound guide',
    },
  },
  virginia: {
    arlington: {
      label: 'Moving to Arlington & Alexandria',
      href: '/moving-to/virginia/arlington-alexandria-va',
      description: 'Urban D.C. suburb inbound guide — federal contractors and Metro access',
    },
    alexandria: {
      label: 'Moving to Arlington & Alexandria',
      href: '/moving-to/virginia/arlington-alexandria-va',
      description: 'Old Town Alexandria and National Landing inbound moving guide',
    },
    loudoun: {
      label: 'Moving to Leesburg & Fairfax',
      href: '/moving-to/virginia/leesburg-fairfax-va',
      description: 'Dulles corridor Loudoun County suburban inbound guide',
    },
    fairfax: {
      label: 'Moving to Leesburg & Fairfax',
      href: '/moving-to/virginia/leesburg-fairfax-va',
      description: 'Fairfax County NoVA schools and defense contractor suburb guide',
    },
    frederick: {
      label: 'Moving to Winchester',
      href: '/moving-to/virginia/winchester-va',
      description: 'Shenandoah Valley fastest-growing metro inbound guide',
    },
    fredericksburg: {
      label: 'Moving to Fredericksburg & Culpeper',
      href: '/moving-to/virginia/fredericksburg-culpeper-va',
      description: 'I-95 corridor commuter-belt inbound moving guide',
    },
    culpeper: {
      label: 'Moving to Fredericksburg & Culpeper',
      href: '/moving-to/virginia/fredericksburg-culpeper-va',
      description: 'Culpeper wine-country and I-95 spillover inbound guide',
    },
    richmond: {
      label: 'Moving to Richmond',
      href: '/moving-to/virginia/richmond-va',
      description: 'Virginia capital revitalized downtown inbound moving guide',
    },
    suffolk: {
      label: 'Moving to Suffolk & Chesapeake',
      href: '/moving-to/virginia/suffolk-chesapeake-va',
      description: 'Hampton Roads fastest-growing coastal corridor inbound guide',
    },
    chesapeake: {
      label: 'Moving to Suffolk & Chesapeake',
      href: '/moving-to/virginia/suffolk-chesapeake-va',
      description: 'Chesapeake suburban Hampton Roads inbound moving guide',
    },
    albemarle: {
      label: 'Moving to Charlottesville',
      href: '/moving-to/virginia/charlottesville-va',
      description: 'UVA and Blue Ridge foothill college-town inbound guide',
    },
    charlottesville: {
      label: 'Moving to Charlottesville',
      href: '/moving-to/virginia/charlottesville-va',
      description: 'Charlottesville UVA Health and Downtown Mall inbound guide',
    },
    roanoke: {
      label: 'Moving to Roanoke',
      href: '/moving-to/virginia/roanoke-va',
      description: 'Blue Ridge valley outdoor recreation inbound moving guide',
    },
  },
  washington: {
    king: {
      label: 'Moving to Seattle',
      href: '/moving-to/washington/seattle-wa',
      description: 'King County Puget Sound flagship metro inbound moving guide',
    },
  },
  florida: {
    'miami-dade': {
      label: 'Moving to Miami',
      href: '/moving-to/florida/miami',
      description: 'Miami-Dade inbound guide — high-rise, condo, and corporate moves',
    },
    broward: {
      label: 'Moving to South Florida',
      href: '/moving-to/florida',
      description: 'Broward County corridor guides — Fort Lauderdale, Hollywood, Pompano',
    },
    'palm-beach': {
      label: 'Moving to Palm Beach County',
      href: '/moving-to/florida',
      description: 'Boca Raton, Delray, Boynton, and Deerfield Beach city guides',
    },
  },
};

export function getDestinationHubLinkForCounty(
  stateSlug: string,
  countySlug: string
): DestinationHubLink | undefined {
  return COUNTY_DESTINATION_HUBS[stateSlug]?.[countySlug];
}