import type { DestinationResourceLink } from '@/lib/destinations/types';

export type GeorgiaCorridorCity = {
  slug: string;
  displayName: string;
  zip: string;
  tagline: string;
};

export type GeorgiaClusterContent = {
  h1: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonicalPath: string;
  };
  heroSubheadline: string;
  introParagraphs: string[];
  northFultonCorridor: GeorgiaCorridorCity[];
  metroAtlantaCorridor: GeorgiaCorridorCity[];
  coastalCorridor: GeorgiaCorridorCity[];
  heartlandCorridor: GeorgiaCorridorCity[];
  bodySections: { heading: string; paragraphs: string[] }[];
  resourceLinks: DestinationResourceLink[];
};

export const georgiaClusterContent: GeorgiaClusterContent = {
  h1: 'Moving to Georgia: North Fulton Elite Suburbs, Metro Atlanta, Coastal Growth & Heartland City Guides & Trusted Movers',
  seo: {
    title:
      'Moving to Georgia (2026) — Destination Guides, Costs & Free Quotes | Move Trust Hub',
    description:
      'Explore Georgia inbound moving guides for Johns Creek, Alpharetta, Roswell, Atlanta, Decatur, Smyrna, Cumming, Savannah, Warner Robins, and Pooler. Tech expansions, elite suburban schools, booming coastal infrastructure, Metro Atlanta and Savannah growth. FMCSA-verified movers, free calculator. Independent directory.',
    keywords: [
      'moving to georgia',
      'georgia movers',
      'johns creek ga relocation',
      'alpharetta ga moving',
      'atlanta ga movers',
      'savannah ga coastal relocation',
      'best cities to move to in georgia 2026',
      'georgia interstate moving costs',
      'moving from florida to georgia',
      'moving from new york to georgia',
      'metro atlanta relocation',
    ],
    canonicalPath: '/moving-to/georgia',
  },
  heroSubheadline:
    'Georgia ranks among the Southeast\'s most strategically attractive inbound relocation markets for 2026 — a Peach State where major tech and corporate expansions, elite suburban school districts, booming coastal port infrastructure, and Metro Atlanta employment density coexist with distinct lifestyle corridors from Johns Creek\'s #1-in-Georgia prestige and Alpharetta\'s Technology City of the South energy to Atlanta\'s BeltLine cultural capital, Decatur\'s progressive MARTA-connected walkability, Smyrna\'s Truist Park convenience, Cumming\'s Lake Lanier exurban growth, Savannah\'s historic coastal jewel character, Pooler\'s Hyundai EV plant boomtown momentum, and Warner Robins\' Robins Air Force Base affordability. Whether you prioritize North Fulton elite schools, capital-city tech employment, coastal port growth, or defense-aerospace heartland value, our independent directory covers FMCSA-licensed interstate movers, county-level local directories, and city-specific guides with cost tables and free quote matching.',
  introParagraphs: [
    'Whether you are accepting a tech role along Alpharetta\'s Avalon corridor, settling Johns Creek\'s #1-ranked elite school inventory, joining Roswell\'s Canton Street walkable river community, relocating into Atlanta\'s BeltLine and Midtown cultural density, targeting Decatur\'s progressive MARTA-connected neighborhoods, moving to Smyrna\'s Jonquil City retail growth near Truist Park, choosing Cumming\'s Lake Lanier exurban acreage, enrolling in Savannah\'s historic coastal port economy, settling Pooler\'s rapidly expanding Hyundai EV plant spillover, or downsizing to Warner Robins\' defense-aerospace affordability corridor, the relocation fundamentals are identical: document your inventory with our free calculator, verify every carrier on FMCSA.gov, and compare multiple quotes on equal cubic footage before signing.',
    'Move Trust Hub is an independent informational directory — we are not affiliated with, endorsed by, or a partner of the moving companies listed. Georgia moves involve Southeast corridor logistics that generic relocation guides overlook: I-285 Perimeter peak scheduling, North Fulton cul-de-sac shuttle staging, Atlanta high-rise COI and elevator reservations, MARTA-adjacent Decatur walk-up constraints, Truist Park event-traffic peaks in Smyrna, Lake Lanier seasonal driveway access in Cumming, Savannah historic-district narrow-street deliveries, Pooler I-95 closing clusters, and Robins AFB relocation windows in Warner Robins — factors our city guides surface so you can plan with confidence.',
    'Ten live Georgia city guides span North Fulton Elite Suburbs (Johns Creek, Alpharetta, Roswell), Metro Atlanta (Atlanta, Decatur, Smyrna, Cumming), Coastal Growth (Savannah, Pooler), and Heartland (Warner Robins). Browse each city guide below for 2026–2027 cost tables, calculator prefill by ZIP, and county-level mover directories.',
  ],
  northFultonCorridor: [
    {
      slug: 'johns-creek-ga',
      displayName: 'Johns Creek',
      zip: '30097',
      tagline: '#1 in Georgia · elite schools · high incomes · medical facilities',
    },
    {
      slug: 'alpharetta-ga',
      displayName: 'Alpharetta',
      zip: '30009',
      tagline: 'Technology City of the South · Avalon · tech jobs',
    },
    {
      slug: 'roswell-ga',
      displayName: 'Roswell',
      zip: '30075',
      tagline: 'Historic river community · Canton Street · Chattahoochee access',
    },
  ],
  metroAtlantaCorridor: [
    {
      slug: 'atlanta-ga',
      displayName: 'Atlanta',
      zip: '30303',
      tagline: 'Cultural & economic heart · BeltLine · airline hub · entertainment',
    },
    {
      slug: 'decatur-ga',
      displayName: 'Decatur',
      zip: '30030',
      tagline: 'Progressive college-town feel · MARTA · tight-knit community',
    },
    {
      slug: 'smyrna-ga',
      displayName: 'Smyrna',
      zip: '30080',
      tagline: 'Truist Park convenience · Jonquil City · retail growth',
    },
    {
      slug: 'cumming-ga',
      displayName: 'Cumming',
      zip: '30040',
      tagline: 'Fast-growing exurban · Lake Lanier · low taxes',
    },
  ],
  coastalCorridor: [
    {
      slug: 'savannah-ga',
      displayName: 'Savannah',
      zip: '31401',
      tagline: 'Historic coastal jewel · port growth · tourism economy',
    },
    {
      slug: 'pooler-ga',
      displayName: 'Pooler',
      zip: '31322',
      tagline: 'Coastal boomtown · Hyundai EV plant · rapid expansion',
    },
  ],
  heartlandCorridor: [
    {
      slug: 'warner-robins-ga',
      displayName: 'Warner Robins',
      zip: '31088',
      tagline: 'Defense & aerospace hub · Robins AFB · affordability',
    },
  ],
  bodySections: [
    {
      heading: 'Why families and professionals are moving to Georgia in 2026',
      paragraphs: [
        'Georgia\'s inbound migration story is defined by Southeast growth fundamentals that compete on corporate opportunity and suburban quality of life — families and remote workers from Florida, New York, California, Texas, and the Carolinas choose Georgia for elite North Fulton school districts, major tech and corporate expansion corridors, Hartsfield-Jackson airline hub connectivity, and housing inventory that often undercuts Northeast and West Coast premiums while preserving genuine Southern character. North Fulton captures the state\'s highest-intent inbound volume: Johns Creek\'s #1-in-Georgia ranking with elite schools and medical-facility employment, Alpharetta\'s Technology City of the South prestige with Avalon mixed-use density, and Roswell\'s historic Canton Street river-community walkability each serve distinct household profiles united by Atlanta employment within a practical daily commute.',
        'Metro Atlanta extends Georgia\'s appeal beyond North Fulton suburbs. Atlanta\'s Fulton County capital anchors BeltLine cultural density, Fortune 500 headquarters corridors, Delta airline hub employment, and entertainment-industry spillover for households wanting capital-city amenities. Decatur\'s DeKalb County progressive walkability — MARTA connectivity, tight-knit village character, and Agnes Scott-adjacent cultural energy — attracts urban professionals priced out of intown Atlanta premiums. Smyrna\'s Cobb County Jonquil City retail growth and Truist Park convenience capture Braves-corridor families. Cumming\'s Forsyth County Lake Lanier exurban acreage and low-tax appeal draw households prioritizing space over intown density.',
        'Coastal and heartland corridors round out Georgia\'s lifestyle spectrum. Savannah\'s Chatham County historic port economy — tourism, logistics growth, and Forsyth Park walkability — attracts households seeking genuine coastal character with Southeast affordability. Pooler\'s adjacent boomtown momentum, accelerated by Hyundai EV plant investment and I-95 corridor expansion, delivers among Georgia\'s fastest-growing inventory for families priced out of Savannah\'s historic premiums. Warner Robins\' Houston County Robins Air Force Base stability offers defense-aerospace employment with among the state\'s strongest affordability-to-amenity ratios for households prioritizing heartland value over Metro Atlanta job density.',
        'No two Georgia corridors move alike. North Fulton estate driveways need shuttle staging. Atlanta high-rises require COI coordination. Savannah historic districts cannot accommodate 53-foot trailers. Pooler new-construction closing clusters compress I-95 schedules. Compare quotes on identical inventory rather than choosing the lowest phone estimate.',
      ],
    },
    {
      heading: 'How to choose an interstate mover for a Georgia delivery',
      paragraphs: [
        'Start with FMCSA verification. Every interstate carrier must have a USDOT number and, if operating as a for-hire carrier, an MC number. Look up both on FMCSA.gov and confirm acceptable safety ratings and low complaint ratios. Move Trust Hub surfaces this data alongside Google, BBB, and Trustpilot reviews so you can research before anyone calls you.',
        'Demand inventory-based quotes. Lowball estimates based on phone guesses are the leading cause of moving-day price disputes on I-75, I-85, and I-285 corridors into Georgia. Use our room-by-room calculator to document cubic feet and estimated weight, then send the same inventory to every carrier you compare.',
        'Ask about Georgia-specific accessorials. North Fulton cul-de-sacs frequently require shuttle trucks. Atlanta condo towers need elevator reservations and COI filings. Savannah historic districts may need long carries from street parking. Summer school-year closing clusters (May–August) and corporate relocation peaks compress schedules — confirm these line items in writing.',
        'Read our scam avoidance guide before paying more than a modest booking deposit. Reputable interstate carriers do not demand large upfront cash payments via wire transfer or cryptocurrency.',
      ],
    },
    {
      heading: 'Regional Georgia moving corridors at a glance',
      paragraphs: [
        'North Fulton Elite Suburbs (Johns Creek, Alpharetta, and Roswell) handles Georgia\'s highest school-and-tech inbound volume with distinct final-mile planning between estate subdivisions, Avalon mixed-use, and Canton Street walkability.',
        'Metro Atlanta (Atlanta, Decatur, Smyrna, and Cumming) serves capital-city cultural density, MARTA-connected progressive neighborhoods, Braves-corridor convenience, and Lake Lanier exurban growth.',
        'Coastal Growth (Savannah and Pooler) captures historic port tourism, logistics expansion, and Hyundai EV plant boomtown momentum along the I-95 corridor.',
        'Heartland (Warner Robins) anchors Robins Air Force Base defense-aerospace stability and Houston County affordability.',
      ],
    },
  ],
  resourceLinks: [
    {
      title: 'Verify any mover\'s USDOT & MC number',
      description: 'Step-by-step FMCSA lookup and complaint-ratio interpretation.',
      href: '/resources/fmcsa',
    },
    {
      title: 'Common moving scams & how to avoid them',
      description: 'Eight red flags and deposit best practices before booking.',
      href: '/resources/scams',
    },
    {
      title: 'Browse Fulton County local movers',
      description: 'Johns Creek, Alpharetta, Roswell, and Atlanta mover directory.',
      href: '/local-movers/georgia/fulton',
    },
    {
      title: 'Browse DeKalb County local movers',
      description: 'Decatur progressive metro mover directory.',
      href: '/local-movers/georgia/dekalb',
    },
    {
      title: 'Browse Cobb County local movers',
      description: 'Smyrna Jonquil City corridor mover directory.',
      href: '/local-movers/georgia/cobb',
    },
    {
      title: 'Browse Forsyth County local movers',
      description: 'Cumming Lake Lanier exurban mover directory.',
      href: '/local-movers/georgia/forsyth',
    },
    {
      title: 'Browse Chatham County local movers',
      description: 'Savannah and Pooler coastal mover directory.',
      href: '/local-movers/georgia/chatham',
    },
    {
      title: 'Browse Houston County local movers',
      description: 'Warner Robins Robins AFB corridor mover directory.',
      href: '/local-movers/georgia/houston',
    },
    {
      title: 'South Carolina moving destinations hub',
      description: 'Compare GA corridors with Grand Strand and Upstate SC guides.',
      href: '/moving-to/south-carolina',
    },
    {
      title: 'North Carolina moving destinations hub',
      description: 'Compare GA corridors with Charlotte and Raleigh-Durham guides.',
      href: '/moving-to/north-carolina',
    },
    {
      title: 'Florida moving destinations hub',
      description: 'Compare FL origin markets and Southeast spillover into Georgia.',
      href: '/moving-to/florida',
    },
    {
      title: 'Room-by-room packing checklist',
      description: 'Prepare your inventory before requesting fair quotes.',
      href: '/resources/packing-checklist',
    },
    {
      title: 'Compare movers side-by-side',
      description: 'Select up to 4 carriers and compare reputation and services.',
      href: '/compare',
    },
  ],
};