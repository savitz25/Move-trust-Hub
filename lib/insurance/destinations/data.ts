export interface DestinationCity {
  slug: string;
  name: string;
  state: string;
  stateCode: string;
  population?: string;
  highlights: string[];
  avgAutoPremium?: string;
  avgHomePremium?: string;
}

export interface DestinationState {
  slug: string;
  code: string;
  name: string;
  tagline: string;
  description: string;
  insuranceNotes: string[];
  cities: DestinationCity[];
  relatedLinks: { href: string; label: string }[];
}

export const DESTINATION_STATES: DestinationState[] = [
  {
    slug: 'florida',
    code: 'FL',
    name: 'Florida',
    tagline: 'Coastal coverage, wind, and flood considerations',
    description:
      'Florida homeowners face unique risks from hurricanes, windstorms, and flood damage. Auto rates vary widely between metro and coastal counties. Independent agents help navigate Citizens, private carriers, and wind mitigation credits.',
    insuranceNotes: [
      'Hurricane deductibles and wind mitigation inspections can lower premiums',
      'Flood insurance is typically separate from standard homeowners policies',
      'PIP auto coverage is required; compare bodily injury limits carefully',
      'Condo and HOA master policies affect what unit-owners must insure',
    ],
    cities: [
      {
        slug: 'miami',
        name: 'Miami',
        state: 'Florida',
        stateCode: 'FL',
        population: '450,000+',
        highlights: ['Coastal wind exposure', 'High auto density', 'Condo-heavy market'],
        avgAutoPremium: '$2,800–$3,600/yr',
        avgHomePremium: '$3,200–$5,500/yr',
      },
      {
        slug: 'tampa',
        name: 'Tampa',
        state: 'Florida',
        stateCode: 'FL',
        population: '390,000+',
        highlights: ['Gulf coast storms', 'Growing suburbs', 'Mixed housing stock'],
        avgAutoPremium: '$2,400–$3,100/yr',
        avgHomePremium: '$2,600–$4,200/yr',
      },
      {
        slug: 'orlando',
        name: 'Orlando',
        state: 'Florida',
        stateCode: 'FL',
        population: '310,000+',
        highlights: ['Inland storm risk', 'Rental properties', 'Theme-park workforce'],
        avgAutoPremium: '$2,200–$2,900/yr',
        avgHomePremium: '$2,100–$3,400/yr',
      },
      {
        slug: 'jacksonville',
        name: 'Jacksonville',
        state: 'Florida',
        stateCode: 'FL',
        population: '970,000+',
        highlights: ['River flood zones', 'Large geographic spread', 'Military presence'],
        avgAutoPremium: '$2,100–$2,800/yr',
        avgHomePremium: '$2,000–$3,200/yr',
      },
      {
        slug: 'fort-lauderdale',
        name: 'Fort Lauderdale',
        state: 'Florida',
        stateCode: 'FL',
        population: '185,000+',
        highlights: ['Coastal wind exposure', 'Medicare Advantage hub', 'Broward County core'],
        avgAutoPremium: '$2,500–$3,200/yr',
        avgHomePremium: '$2,800–$4,500/yr',
      },
      {
        slug: 'west-palm-beach',
        name: 'West Palm Beach',
        state: 'Florida',
        stateCode: 'FL',
        population: '120,000+',
        highlights: ['Retiree Medicare market', 'Palm Beach corridor', 'Coastal properties'],
        avgAutoPremium: '$2,400–$3,100/yr',
        avgHomePremium: '$2,600–$4,800/yr',
      },
      {
        slug: 'boca-raton',
        name: 'Boca Raton',
        state: 'Florida',
        stateCode: 'FL',
        population: '100,000+',
        highlights: ['High-value homes', 'Senior health plans', 'Affluent retiree corridor'],
        avgAutoPremium: '$2,300–$3,000/yr',
        avgHomePremium: '$3,000–$5,200/yr',
      },
    ],
    relatedLinks: [
      { href: '/insurance/hubs/south-florida', label: 'South Florida Health Hub' },
      { href: '/insurance/resources/flood-insurance-guide', label: 'Flood Insurance Guide' },
      { href: '/insurance/resources/hurricane-prep-insurance', label: 'Hurricane Prep & Insurance' },
      { href: '/insurance/tools/cost-estimator', label: 'Premium Cost Estimator' },
    ],
  },
  {
    slug: 'texas',
    code: 'TX',
    name: 'Texas',
    tagline: 'Hail, wind, and fast-growing metro markets',
    description:
      'Texas combines large auto markets with significant hail and wind exposure. Deregulated electricity markets do not affect insurance, but rapid suburban growth means many buyers need new construction and flood zone guidance.',
    insuranceNotes: [
      'Hail claims are common in North Texas — roof age affects rates',
      'Coastal wind policies may require separate windstorm pools',
      'Texas minimum auto liability limits are relatively low — consider higher limits',
      'Business insurance demand is strong in energy and tech corridors',
    ],
    cities: [
      {
        slug: 'houston',
        name: 'Houston',
        state: 'Texas',
        stateCode: 'TX',
        population: '2.3M+',
        highlights: ['Flood risk', 'Industrial corridor', 'Sprawling suburbs'],
        avgAutoPremium: '$1,900–$2,600/yr',
        avgHomePremium: '$2,400–$3,800/yr',
      },
      {
        slug: 'dallas',
        name: 'Dallas',
        state: 'Texas',
        stateCode: 'TX',
        population: '1.3M+',
        highlights: ['Hail alley', 'Corporate relocations', 'Dense commuter traffic'],
        avgAutoPremium: '$1,800–$2,500/yr',
        avgHomePremium: '$2,200–$3,400/yr',
      },
      {
        slug: 'austin',
        name: 'Austin',
        state: 'Texas',
        stateCode: 'TX',
        population: '980,000+',
        highlights: ['Tech growth', 'Wildfire fringe zones', 'Rising home values'],
        avgAutoPremium: '$1,700–$2,300/yr',
        avgHomePremium: '$2,000–$3,200/yr',
      },
      {
        slug: 'san-antonio',
        name: 'San Antonio',
        state: 'Texas',
        stateCode: 'TX',
        population: '1.5M+',
        highlights: ['Military families', 'Affordable housing', 'Flash flood zones'],
        avgAutoPremium: '$1,600–$2,200/yr',
        avgHomePremium: '$1,800–$2,900/yr',
      },
    ],
    relatedLinks: [
      { href: '/insurance/resources/texas-auto-insurance', label: 'Texas Auto Insurance Guide' },
      { href: '/insurance/directory?state=TX', label: 'Texas Insurance Agencies' },
    ],
  },
  {
    slug: 'california',
    code: 'CA',
    name: 'California',
    tagline: 'Wildfire, earthquake, and regulated personal lines',
    description:
      'California insurance markets face wildfire moratoriums, FAIR Plan usage, and strict consumer protections. Earthquake coverage is optional but widely recommended. Auto rates reflect dense urban traffic and theft exposure.',
    insuranceNotes: [
      'Defensible space and fire-hardening can affect renewals in wildfire zones',
      'Earthquake policies are separate; consider deductible tradeoffs',
      'Prop 103 regulates rate filings — shop independent agents for options',
      'Gig economy and EV ownership affect auto coverage needs',
    ],
    cities: [
      {
        slug: 'los-angeles',
        name: 'Los Angeles',
        state: 'California',
        stateCode: 'CA',
        population: '3.9M+',
        highlights: ['Earthquake risk', 'Wildfire interface', 'High auto premiums'],
        avgAutoPremium: '$2,400–$3,200/yr',
        avgHomePremium: '$1,800–$3,500/yr',
      },
      {
        slug: 'san-diego',
        name: 'San Diego',
        state: 'California',
        stateCode: 'CA',
        population: '1.4M+',
        highlights: ['Coastal properties', 'Military base coverage', 'Lower wildfire risk'],
        avgAutoPremium: '$2,000–$2,700/yr',
        avgHomePremium: '$1,600–$2,800/yr',
      },
      {
        slug: 'san-francisco',
        name: 'San Francisco',
        state: 'California',
        stateCode: 'CA',
        population: '870,000+',
        highlights: ['Earthquake retrofit', 'Condo HO-6 policies', 'Theft exposure'],
        avgAutoPremium: '$2,300–$3,100/yr',
        avgHomePremium: '$1,400–$2,600/yr',
      },
      {
        slug: 'sacramento',
        name: 'Sacramento',
        state: 'California',
        stateCode: 'CA',
        population: '520,000+',
        highlights: ['State capital workforce', 'River flood zones', 'Suburban growth'],
        avgAutoPremium: '$1,900–$2,500/yr',
        avgHomePremium: '$1,500–$2,400/yr',
      },
    ],
    relatedLinks: [
      { href: '/insurance/resources/california-home-insurance', label: 'California Home Insurance' },
      { href: '/insurance/resources/wildfire-insurance', label: 'Wildfire Insurance Guide' },
    ],
  },
  {
    slug: 'new-york',
    code: 'NY',
    name: 'New York',
    tagline: 'Urban renters, co-ops, and no-fault auto',
    description:
      'New York combines no-fault auto requirements with complex co-op and condo insurance rules in NYC. Upstate markets differ sharply from downstate pricing. Independent brokers help navigate carrier appetite and surcharges.',
    insuranceNotes: [
      'No-fault PIP is mandatory; compare supplemental UM/UIM limits',
      'Co-op policies (walls-in) differ from condo HO-6 coverage',
      'Flood zones affect Long Island and Hudson Valley properties',
      'Workers comp and commercial package policies are common for NYC businesses',
    ],
    cities: [
      {
        slug: 'new-york-city',
        name: 'New York City',
        state: 'New York',
        stateCode: 'NY',
        population: '8.3M+',
        highlights: ['Co-op insurance', 'Renters density', 'High liability limits'],
        avgAutoPremium: '$2,800–$4,200/yr',
        avgHomePremium: '$1,200–$2,800/yr',
      },
      {
        slug: 'buffalo',
        name: 'Buffalo',
        state: 'New York',
        stateCode: 'NY',
        population: '275,000+',
        highlights: ['Lake-effect snow', 'Older housing stock', 'Affordable premiums'],
        avgAutoPremium: '$1,400–$1,900/yr',
        avgHomePremium: '$900–$1,500/yr',
      },
      {
        slug: 'rochester',
        name: 'Rochester',
        state: 'New York',
        stateCode: 'NY',
        population: '210,000+',
        highlights: ['Winter weather claims', 'University market', 'Stable home values'],
        avgAutoPremium: '$1,300–$1,800/yr',
        avgHomePremium: '$850–$1,400/yr',
      },
      {
        slug: 'albany',
        name: 'Albany',
        state: 'New York',
        stateCode: 'NY',
        population: '100,000+',
        highlights: ['Government sector', 'Capital region suburbs', 'Moderate rates'],
        avgAutoPremium: '$1,350–$1,850/yr',
        avgHomePremium: '$900–$1,450/yr',
      },
    ],
    relatedLinks: [
      { href: '/insurance/resources/new-york-auto-insurance', label: 'NY Auto Insurance Guide' },
      { href: '/insurance/resources/renters-insurance', label: 'Renters Insurance Guide' },
    ],
  },
  {
    slug: 'north-carolina',
    code: 'NC',
    name: 'North Carolina',
    tagline: 'Coastal wind pools and Research Triangle growth',
    description:
      'North Carolina balances affordable inland rates with coastal wind exposure. The Research Triangle and Charlotte metro drive strong demand for auto, home, and life coverage. Beach properties may need NCJUA or excess wind policies.',
    insuranceNotes: [
      'Coastal counties may require separate wind/hail coverage',
      'Beach plan and FAIR options exist for hard-to-place risks',
      'Growing suburbs mean new construction discounts may apply',
      'Independent agents compare NC Rate Bureau filings across carriers',
    ],
    cities: [
      {
        slug: 'charlotte',
        name: 'Charlotte',
        state: 'North Carolina',
        stateCode: 'NC',
        population: '880,000+',
        highlights: ['Banking hub', 'Rapid suburban growth', 'Moderate hail risk'],
        avgAutoPremium: '$1,400–$1,900/yr',
        avgHomePremium: '$1,200–$1,900/yr',
      },
      {
        slug: 'raleigh',
        name: 'Raleigh',
        state: 'North Carolina',
        stateCode: 'NC',
        population: '470,000+',
        highlights: ['Tech corridor', 'New construction', 'Strong job market'],
        avgAutoPremium: '$1,350–$1,850/yr',
        avgHomePremium: '$1,100–$1,750/yr',
      },
      {
        slug: 'durham',
        name: 'Durham',
        state: 'North Carolina',
        stateCode: 'NC',
        population: '290,000+',
        highlights: ['Research Triangle', 'University housing', 'Mixed urban core'],
        avgAutoPremium: '$1,300–$1,800/yr',
        avgHomePremium: '$1,050–$1,700/yr',
      },
      {
        slug: 'wilmington',
        name: 'Wilmington',
        state: 'North Carolina',
        stateCode: 'NC',
        population: '125,000+',
        highlights: ['Coastal wind', 'Flood zones', 'Vacation properties'],
        avgAutoPremium: '$1,450–$2,000/yr',
        avgHomePremium: '$1,400–$2,400/yr',
      },
    ],
    relatedLinks: [
      { href: '/insurance/resources/north-carolina-insurance', label: 'NC Insurance Overview' },
      { href: '/insurance/directory?state=NC', label: 'NC Insurance Agencies' },
    ],
  },
  {
    slug: 'illinois',
    code: 'IL',
    name: 'Illinois',
    tagline: 'Chicago metro complexity and Midwest weather',
    description:
      'Illinois combines dense Chicago renters and condo markets with Midwest hail and winter weather claims statewide. Auto rates in Cook County run higher than downstate averages. Independent agents help with umbrella and business lines.',
    insuranceNotes: [
      'Chicago condo master policies affect unit-owner HO-6 needs',
      'Winter freeze claims — verify pipe and water backup coverage',
      'Minimum auto liability is modest — umbrella policies are popular',
      'Small business BOP packages are widely available through independents',
    ],
    cities: [
      {
        slug: 'chicago',
        name: 'Chicago',
        state: 'Illinois',
        stateCode: 'IL',
        population: '2.7M+',
        highlights: ['Condo HO-6', 'High auto rates', 'Renters market'],
        avgAutoPremium: '$1,900–$2,800/yr',
        avgHomePremium: '$1,400–$2,400/yr',
      },
      {
        slug: 'naperville',
        name: 'Naperville',
        state: 'Illinois',
        stateCode: 'IL',
        population: '150,000+',
        highlights: ['Affluent suburbs', 'Family auto policies', 'Low crime'],
        avgAutoPremium: '$1,500–$2,000/yr',
        avgHomePremium: '$1,200–$1,900/yr',
      },
      {
        slug: 'springfield',
        name: 'Springfield',
        state: 'Illinois',
        stateCode: 'IL',
        population: '115,000+',
        highlights: ['State capital', 'Affordable housing', 'Moderate weather risk'],
        avgAutoPremium: '$1,200–$1,600/yr',
        avgHomePremium: '$950–$1,400/yr',
      },
      {
        slug: 'rockford',
        name: 'Rockford',
        state: 'Illinois',
        stateCode: 'IL',
        population: '150,000+',
        highlights: ['Manufacturing base', 'Winter storms', 'Value-oriented market'],
        avgAutoPremium: '$1,250–$1,650/yr',
        avgHomePremium: '$900–$1,350/yr',
      },
    ],
    relatedLinks: [
      { href: '/insurance/resources/illinois-auto-insurance', label: 'Illinois Auto Guide' },
      { href: '/insurance/resources/umbrella-insurance', label: 'Umbrella Insurance Guide' },
    ],
  },
  {
    slug: "virginia",
    code: "VA",
    name: "Virginia",
    tagline: "Health insurance coverage and local agent guidance in Virginia",
    description: "The DC Metro across the District, Montgomery and Prince George's counties in Maryland, and Arlington and Fairfax in Virginia is a high-income market with significant federal/government employer-sponsored plans, competitive individual/ACA offerings, and robust Medicare demand amon",
    insuranceNotes: [
      "State DOI licensing applies to all VA insurance producers",
      "Compare ACA subsidies and employer plan transitions with a local broker",
      "Medicare Advantage and supplement options vary by county",
      "Bundling auto and home policies may reduce premiums with independent agencies",
    ],
    cities: [
      {
        slug: "washington-dc",
        name: "DC Metro",
        state: "Virginia",
        stateCode: "VA",
        highlights: ["FEHB open season navigation","Contractor-to-private transitions","Maryland Health Connection ACA"],
      },
      {
        slug: "richmond",
        name: "Richmond",
        state: "Virginia",
        stateCode: "VA",
        highlights: ["State employee benefit transitions","Virginia marketplace ACA enrollment","VCU/Bon Secours network alignments"],
      }
    ],
    relatedLinks: [
      { href: "/insurance/directory?state=VA", label: "VA Insurance Agencies" },
      { href: "/insurance/hubs/virginia", label: "Virginia Insurance Hubs" },
    ],
  },
  {
    slug: "pennsylvania",
    code: "PA",
    name: "Pennsylvania",
    tagline: "Health insurance coverage and local agent guidance in Pennsylvania",
    description: "Greater Philadelphia spans three states with Pennie (PA), Get Covered NJ, and Delaware marketplace options. Healthcare employment clusters create strong group-plan expertise among independent agencies serving collar counties and Wilmington corporate corridors.",
    insuranceNotes: [
      "State DOI licensing applies to all PA insurance producers",
      "Compare ACA subsidies and employer plan transitions with a local broker",
      "Medicare Advantage and supplement options vary by county",
      "Bundling auto and home policies may reduce premiums with independent agencies",
    ],
    cities: [
      {
        slug: "philadelphia",
        name: "Philadelphia",
        state: "Pennsylvania",
        stateCode: "PA",
        highlights: ["Pennie ACA enrollment","Cross-state licensing","Healthcare worker benefits"],
      },
      {
        slug: "pittsburgh",
        name: "Pittsburgh",
        state: "Pennsylvania",
        stateCode: "PA",
        highlights: ["UPMC network alignments","University ACA enrollment","Healthcare worker group plans"],
      }
    ],
    relatedLinks: [
      { href: "/insurance/directory?state=PA", label: "PA Insurance Agencies" },
      { href: "/insurance/hubs/pennsylvania", label: "Pennsylvania Insurance Hubs" },
    ],
  },
  {
    slug: "georgia",
    code: "GA",
    name: "Georgia",
    tagline: "Health insurance coverage and local agent guidance in Georgia",
    description: "Atlanta is Georgia's largest geographic health insurance market across Fulton, DeKalb, Gwinnett, Cobb, and Clayton — with 6–7 competing exchange carriers including Kaiser Permanente HMO, Oscar, Anthem BCBS, Ambetter, CareSource, and UnitedHealthcare. Corporate relocations drive l",
    insuranceNotes: [
      "State DOI licensing applies to all GA insurance producers",
      "Compare ACA subsidies and employer plan transitions with a local broker",
      "Medicare Advantage and supplement options vary by county",
      "Bundling auto and home policies may reduce premiums with independent agencies",
    ],
    cities: [
      {
        slug: "atlanta",
        name: "Atlanta",
        state: "Georgia",
        stateCode: "GA",
        highlights: ["Georgia Access ACA (Ambetter, Anthem, Oscar)","Kaiser Permanente HMO networks","Large-group employer plans (Elevance/UnitedHealthcare)"],
      }
    ],
    relatedLinks: [
      { href: "/insurance/directory?state=GA", label: "GA Insurance Agencies" },
      { href: "/insurance/hubs/georgia", label: "Georgia Insurance Hubs" },
    ],
  },
  {
    slug: "arizona",
    code: "AZ",
    name: "Arizona",
    tagline: "Health insurance coverage and local agent guidance in Arizona",
    description: "Maricopa County combines rapid population growth with one of the highest retiree migration rates nationally. Health agents navigate Arizona marketplace plans, Medicare Advantage in sun-belt communities, and property coverage for monsoon and wildfire risks.",
    insuranceNotes: [
      "State DOI licensing applies to all AZ insurance producers",
      "Compare ACA subsidies and employer plan transitions with a local broker",
      "Medicare Advantage and supplement options vary by county",
      "Bundling auto and home policies may reduce premiums with independent agencies",
    ],
    cities: [
      {
        slug: "phoenix",
        name: "Phoenix",
        state: "Arizona",
        stateCode: "AZ",
        highlights: ["Medicare for retirees","Arizona marketplace ACA","Snowbird transitions"],
      },
      {
        slug: "tucson",
        name: "Tucson",
        state: "Arizona",
        stateCode: "AZ",
        highlights: ["Retiree Medicare enrollment","University of Arizona benefits","Davis-Monthan military health"],
      }
    ],
    relatedLinks: [
      { href: "/insurance/directory?state=AZ", label: "AZ Insurance Agencies" },
      { href: "/insurance/hubs/arizona", label: "Arizona Insurance Hubs" },
    ],
  },
  {
    slug: "massachusetts",
    code: "MA",
    name: "Massachusetts",
    tagline: "Health insurance coverage and local agent guidance in Massachusetts",
    description: "Boston Metro across Suffolk, Middlesex, Essex, Norfolk, and Plymouth is a major Northeast insurance market with high-volume employer-sponsored plans in education, healthcare, biotech, and finance, competitive individual/ACA offerings via Massachusetts Health Connector, and robust",
    insuranceNotes: [
      "State DOI licensing applies to all MA insurance producers",
      "Compare ACA subsidies and employer plan transitions with a local broker",
      "Medicare Advantage and supplement options vary by county",
      "Bundling auto and home policies may reduce premiums with independent agencies",
    ],
    cities: [
      {
        slug: "boston",
        name: "Boston",
        state: "Massachusetts",
        stateCode: "MA",
        highlights: ["Massachusetts Health Connector optimization","Biotech & hospital employer transitions","Harvard/MIT student and young professional plans"],
      }
    ],
    relatedLinks: [
      { href: "/insurance/directory?state=MA", label: "MA Insurance Agencies" },
      { href: "/insurance/hubs/massachusetts", label: "Massachusetts Insurance Hubs" },
    ],
  },
  {
    slug: "michigan",
    code: "MI",
    name: "Michigan",
    tagline: "Health insurance coverage and local agent guidance in Michigan",
    description: "Detroit Metro across Wayne, Oakland, and Macomb reflects automotive industry benefit structures, UAW health fund familiarity, and competitive Michigan marketplace enrollment. Independent brokers navigate employer-sponsored plans, ACA individual coverage, and Medicare demand among",
    insuranceNotes: [
      "State DOI licensing applies to all MI insurance producers",
      "Compare ACA subsidies and employer plan transitions with a local broker",
      "Medicare Advantage and supplement options vary by county",
      "Bundling auto and home policies may reduce premiums with independent agencies",
    ],
    cities: [
      {
        slug: "detroit",
        name: "Detroit",
        state: "Michigan",
        stateCode: "MI",
        highlights: ["Auto industry benefit transitions","Michigan marketplace ACA (BCBSM, Priority Health)","Union health fund navigation"],
      }
    ],
    relatedLinks: [
      { href: "/insurance/directory?state=MI", label: "MI Insurance Agencies" },
      { href: "/insurance/hubs/michigan", label: "Michigan Insurance Hubs" },
    ],
  },
  {
    slug: "washington",
    code: "WA",
    name: "Washington",
    tagline: "Health insurance coverage and local agent guidance in Washington",
    description: "Seattle-Tacoma-Bellevue across King, Snohomish, Pierce, and Kitsap reflects Puget Sound's tech economy with high-volume employer-sponsored plans, Washington Healthplanfinder ACA enrollment, and significant Medicare demand among Eastside and North Sound retirees. Independent broke",
    insuranceNotes: [
      "State DOI licensing applies to all WA insurance producers",
      "Compare ACA subsidies and employer plan transitions with a local broker",
      "Medicare Advantage and supplement options vary by county",
      "Bundling auto and home policies may reduce premiums with independent agencies",
    ],
    cities: [
      {
        slug: "seattle",
        name: "Seattle",
        state: "Washington",
        stateCode: "WA",
        highlights: ["Washington Healthplanfinder ACA","Amazon/Microsoft employer transitions","Contractor 1099 coverage"],
      }
    ],
    relatedLinks: [
      { href: "/insurance/directory?state=WA", label: "WA Insurance Agencies" },
      { href: "/insurance/hubs/washington", label: "Washington Insurance Hubs" },
    ],
  },
  {
    slug: "minnesota",
    code: "MN",
    name: "Minnesota",
    tagline: "Health insurance coverage and local agent guidance in Minnesota",
    description: "Minneapolis-St. Paul across Hennepin and Ramsey counties features high-volume employer-sponsored plans from healthcare and retail headquarters, competitive MNsure individual/ACA offerings, and robust Medicare demand among aging suburbs. Independent brokers navigate Mayo-adjacent ",
    insuranceNotes: [
      "State DOI licensing applies to all MN insurance producers",
      "Compare ACA subsidies and employer plan transitions with a local broker",
      "Medicare Advantage and supplement options vary by county",
      "Bundling auto and home policies may reduce premiums with independent agencies",
    ],
    cities: [
      {
        slug: "minneapolis",
        name: "Twin Cities",
        state: "Minnesota",
        stateCode: "MN",
        highlights: ["MNsure ACA marketplace","Healthcare employer plans (Medtronic corridor)","Medicare in Hennepin & Ramsey suburbs"],
      }
    ],
    relatedLinks: [
      { href: "/insurance/directory?state=MN", label: "MN Insurance Agencies" },
      { href: "/insurance/hubs/minnesota", label: "Minnesota Insurance Hubs" },
    ],
  },
  {
    slug: "colorado",
    code: "CO",
    name: "Colorado",
    tagline: "Health insurance coverage and local agent guidance in Colorado",
    description: "Denver Metro across Denver, Arapahoe, Jefferson, and Adams counties reflects Colorado's relocation boom with high-volume employer-sponsored plans, Connect for Health Colorado individual enrollment, and significant Medicare demand. Independent brokers serve bilingual communities, ",
    insuranceNotes: [
      "State DOI licensing applies to all CO insurance producers",
      "Compare ACA subsidies and employer plan transitions with a local broker",
      "Medicare Advantage and supplement options vary by county",
      "Bundling auto and home policies may reduce premiums with independent agencies",
    ],
    cities: [
      {
        slug: "denver",
        name: "Denver",
        state: "Colorado",
        stateCode: "CO",
        highlights: ["Connect for Health Colorado ACA","Relocation & early-retiree coverage","Medicare in Aurora & Lakewood suburbs"],
      }
    ],
    relatedLinks: [
      { href: "/insurance/directory?state=CO", label: "CO Insurance Agencies" },
      { href: "/insurance/hubs/colorado", label: "Colorado Insurance Hubs" },
    ],
  },
  {
    slug: "maryland",
    code: "MD",
    name: "Maryland",
    tagline: "Health insurance coverage and local agent guidance in Maryland",
    description: "Baltimore Metro across Baltimore City and Baltimore County serves Maryland Health Connection enrollees, Johns Hopkins and University of Maryland healthcare employees, and DC commuter benefit transitions. Independent brokers navigate Mid-Atlantic Medicare markets and diverse urban",
    insuranceNotes: [
      "State DOI licensing applies to all MD insurance producers",
      "Compare ACA subsidies and employer plan transitions with a local broker",
      "Medicare Advantage and supplement options vary by county",
      "Bundling auto and home policies may reduce premiums with independent agencies",
    ],
    cities: [
      {
        slug: "baltimore",
        name: "Baltimore",
        state: "Maryland",
        stateCode: "MD",
        highlights: ["Maryland Health Connection ACA","Hopkins/UMMS network alignments","DC commuter FEHB transitions"],
      }
    ],
    relatedLinks: [
      { href: "/insurance/directory?state=MD", label: "MD Insurance Agencies" },
      { href: "/insurance/hubs/maryland", label: "Maryland Insurance Hubs" },
    ],
  },
  {
    slug: "missouri",
    code: "MO",
    name: "Missouri",
    tagline: "Health insurance coverage and local agent guidance in Missouri",
    description: "Greater St. Louis across St. Louis City and St. Louis County spans Missouri and Illinois marketplaces, requiring bi-state licensing for ACA and employer transitions. Independent brokers including Arch Brokerage (since 1969) serve healthcare, manufacturing, and diverse metro commu",
    insuranceNotes: [
      "State DOI licensing applies to all MO insurance producers",
      "Compare ACA subsidies and employer plan transitions with a local broker",
      "Medicare Advantage and supplement options vary by county",
      "Bundling auto and home policies may reduce premiums with independent agencies",
    ],
    cities: [
      {
        slug: "st-louis",
        name: "St. Louis",
        state: "Missouri",
        stateCode: "MO",
        highlights: ["Bi-state MO/IL ACA enrollment","BJC/WashU network alignments","Arch Brokerage individual health"],
      },
      {
        slug: "kansas-city",
        name: "Kansas City",
        state: "Missouri",
        stateCode: "MO",
        highlights: ["Bi-state MO/KS ACA","Johnson County KS enrollment","Logistics worker health plans"],
      }
    ],
    relatedLinks: [
      { href: "/insurance/directory?state=MO", label: "MO Insurance Agencies" },
      { href: "/insurance/hubs/missouri", label: "Missouri Insurance Hubs" },
    ],
  },
  {
    slug: "oregon",
    code: "OR",
    name: "Oregon",
    tagline: "Health insurance coverage and local agent guidance in Oregon",
    description: "Portland Metro across Multnomah, Washington, and Clackamas counties spans Oregon marketplace enrollment with cross-river Washington demand, tech-commuter ACA transitions, and strong independent Medicare broker competition in progressive healthcare markets.",
    insuranceNotes: [
      "State DOI licensing applies to all OR insurance producers",
      "Compare ACA subsidies and employer plan transitions with a local broker",
      "Medicare Advantage and supplement options vary by county",
      "Bundling auto and home policies may reduce premiums with independent agencies",
    ],
    cities: [
      {
        slug: "portland",
        name: "Portland",
        state: "Oregon",
        stateCode: "OR",
        highlights: ["Oregon marketplace ACA","Cross-river WA/OR licensing","Tech commuter individual plans"],
      }
    ],
    relatedLinks: [
      { href: "/insurance/directory?state=OR", label: "OR Insurance Agencies" },
      { href: "/insurance/hubs/oregon", label: "Oregon Insurance Hubs" },
    ],
  },
  {
    slug: "nevada",
    code: "NV",
    name: "Nevada",
    tagline: "Health insurance coverage and local agent guidance in Nevada",
    description: "Las Vegas Valley across Clark County combines hospitality-worker ACA demand with retiree Medicare growth, California relocation health transitions, and bilingual enrollment in a rapidly expanding desert metro spanning Las Vegas, Henderson, and Summerlin.",
    insuranceNotes: [
      "State DOI licensing applies to all NV insurance producers",
      "Compare ACA subsidies and employer plan transitions with a local broker",
      "Medicare Advantage and supplement options vary by county",
      "Bundling auto and home policies may reduce premiums with independent agencies",
    ],
    cities: [
      {
        slug: "las-vegas",
        name: "Las Vegas",
        state: "Nevada",
        stateCode: "NV",
        highlights: ["Hospitality worker ACA","Retiree Medicare Advantage","California relocation coverage"],
      }
    ],
    relatedLinks: [
      { href: "/insurance/directory?state=NV", label: "NV Insurance Agencies" },
      { href: "/insurance/hubs/nevada", label: "Nevada Insurance Hubs" },
    ],
  },
  {
    slug: "ohio",
    code: "OH",
    name: "Ohio",
    tagline: "Health insurance coverage and local agent guidance in Ohio",
    description: "Greater Cincinnati across Hamilton, Butler, Clermont, and Warren counties navigates tri-state OH/KY/IN marketplace enrollment, P&G corridor corporate benefits, UC Health retiree Medicare, and Ohio River community health plan comparisons.",
    insuranceNotes: [
      "State DOI licensing applies to all OH insurance producers",
      "Compare ACA subsidies and employer plan transitions with a local broker",
      "Medicare Advantage and supplement options vary by county",
      "Bundling auto and home policies may reduce premiums with independent agencies",
    ],
    cities: [
      {
        slug: "cincinnati",
        name: "Cincinnati",
        state: "Ohio",
        stateCode: "OH",
        highlights: ["Tri-state ACA enrollment","P&G corridor group benefits","UC Health network alignments"],
      },
      {
        slug: "columbus",
        name: "Columbus",
        state: "Ohio",
        stateCode: "OH",
        highlights: ["State employee benefit transitions","Ohio marketplace ACA enrollment","Ohio State corridor group plans"],
      }
    ],
    relatedLinks: [
      { href: "/insurance/directory?state=OH", label: "OH Insurance Agencies" },
      { href: "/insurance/hubs/ohio", label: "Ohio Insurance Hubs" },
    ],
  },
  {
    slug: "connecticut",
    code: "CT",
    name: "Connecticut",
    tagline: "Health insurance coverage and local agent guidance in Connecticut",
    description: "Hartford Metro across Hartford, Tolland, Middlesex, and New London counties combines Access Health CT enrollment with deep insurance-industry employment expertise, capital-region group benefits, and suburban Medicare demand in the insurance capital of the world.",
    insuranceNotes: [
      "State DOI licensing applies to all CT insurance producers",
      "Compare ACA subsidies and employer plan transitions with a local broker",
      "Medicare Advantage and supplement options vary by county",
      "Bundling auto and home policies may reduce premiums with independent agencies",
    ],
    cities: [
      {
        slug: "hartford",
        name: "Hartford",
        state: "Connecticut",
        stateCode: "CT",
        highlights: ["Access Health CT ACA","Insurance industry group plans","Capital region Medicare"],
      }
    ],
    relatedLinks: [
      { href: "/insurance/directory?state=CT", label: "CT Insurance Agencies" },
      { href: "/insurance/hubs/connecticut", label: "Connecticut Insurance Hubs" },
    ],
  },
  {
    slug: "iowa",
    code: "IA",
    name: "Iowa",
    tagline: "Health insurance coverage and local agent guidance in Iowa",
    description: "Des Moines Metro across Polk, Dallas, Warren, and Madison counties hosts major insurer headquarters creating deep agent expertise in Iowa marketplace enrollment, group benefit administration, and growing suburban Medicare demand in Iowa's capital city.",
    insuranceNotes: [
      "State DOI licensing applies to all IA insurance producers",
      "Compare ACA subsidies and employer plan transitions with a local broker",
      "Medicare Advantage and supplement options vary by county",
      "Bundling auto and home policies may reduce premiums with independent agencies",
    ],
    cities: [
      {
        slug: "des-moines",
        name: "Des Moines",
        state: "Iowa",
        stateCode: "IA",
        highlights: ["Iowa marketplace ACA","Insurer HQ group administration","Medicare in Polk County"],
      }
    ],
    relatedLinks: [
      { href: "/insurance/directory?state=IA", label: "IA Insurance Agencies" },
      { href: "/insurance/hubs/iowa", label: "Iowa Insurance Hubs" },
    ],
  },
  {
    slug: "tennessee",
    code: "TN",
    name: "Tennessee",
    tagline: "Health insurance coverage and local agent guidance in Tennessee",
    description: "Nashville Metro (Rating Area 4) across Davidson, Williamson, and Rutherford is the epicenter of Tennessee corporate health insurance volume. HCA Healthcare and healthcare industry HQ concentration drive premium-heavy employer-sponsored plans, while the individual market attracts ",
    insuranceNotes: [
      "State DOI licensing applies to all TN insurance producers",
      "Compare ACA subsidies and employer plan transitions with a local broker",
      "Medicare Advantage and supplement options vary by county",
      "Bundling auto and home policies may reduce premiums with independent agencies",
    ],
    cities: [
      {
        slug: "nashville",
        name: "Nashville",
        state: "Tennessee",
        stateCode: "TN",
        highlights: ["HCA and healthcare HQ group benefits","Oscar/Cigna/UHC individual ACA","Williamson suburban employer plans"],
      },
      {
        slug: "chattanooga",
        name: "Chattanooga",
        state: "Tennessee",
        stateCode: "TN",
        highlights: ["BCBS TN marketplace & group plans","Alliant Health Platinum-tier ACA","Hamilton County employer benefits"],
      },
      {
        slug: "knoxville",
        name: "Knoxville & Tri-Cities",
        state: "Tennessee",
        stateCode: "TN",
        highlights: ["Covenant Health network plans","UT Medical Center alignments","BCBS TN employer group"],
      },
      {
        slug: "memphis",
        name: "Memphis",
        state: "Tennessee",
        stateCode: "TN",
        highlights: ["FedEx-scale employer benefits","Logistics corridor group health","Shelby County ACA marketplace"],
      }
    ],
    relatedLinks: [
      { href: "/insurance/directory?state=TN", label: "TN Insurance Agencies" },
      { href: "/insurance/hubs/tennessee", label: "Tennessee Insurance Hubs" },
    ],
  },
  {
    slug: "indiana",
    code: "IN",
    name: "Indiana",
    tagline: "Health insurance coverage and local agent guidance in Indiana",
    description: "Indianapolis-Carmel-Anderson across Marion, Hamilton, Hendricks, Johnson, and Hancock counties combines healthcare employment benefits expertise with Indiana marketplace enrollment, logistics-worker ACA demand, and fast-growing suburban Medicare in Carmel, Fishers, and Avon corri",
    insuranceNotes: [
      "State DOI licensing applies to all IN insurance producers",
      "Compare ACA subsidies and employer plan transitions with a local broker",
      "Medicare Advantage and supplement options vary by county",
      "Bundling auto and home policies may reduce premiums with independent agencies",
    ],
    cities: [
      {
        slug: "indianapolis",
        name: "Indianapolis",
        state: "Indiana",
        stateCode: "IN",
        highlights: ["Healthcare system employee benefits","Indiana marketplace ACA enrollment","Carmel/Fishers suburban group plans"],
      }
    ],
    relatedLinks: [
      { href: "/insurance/directory?state=IN", label: "IN Insurance Agencies" },
      { href: "/insurance/hubs/indiana", label: "Indiana Insurance Hubs" },
    ],
  },
  {
    slug: "utah",
    code: "UT",
    name: "Utah",
    tagline: "Health insurance coverage and local agent guidance in Utah",
    description: "Salt Lake City-Provo-Orem across Salt Lake, Davis, Weber, and Utah counties serves young-family health plan demand, Silicon Slopes tech relocation coverage, Utah marketplace enrollment, and growing Medicare demand in the Wasatch Front suburban corridors.",
    insuranceNotes: [
      "State DOI licensing applies to all UT insurance producers",
      "Compare ACA subsidies and employer plan transitions with a local broker",
      "Medicare Advantage and supplement options vary by county",
      "Bundling auto and home policies may reduce premiums with independent agencies",
    ],
    cities: [
      {
        slug: "salt-lake-city",
        name: "Salt Lake",
        state: "Utah",
        stateCode: "UT",
        highlights: ["Utah marketplace ACA enrollment","Silicon Slopes tech relocation","Young family health plans"],
      }
    ],
    relatedLinks: [
      { href: "/insurance/directory?state=UT", label: "UT Insurance Agencies" },
      { href: "/insurance/hubs/utah", label: "Utah Insurance Hubs" },
    ],
  },
  {
    slug: "wisconsin",
    code: "WI",
    name: "Wisconsin",
    tagline: "Health insurance coverage and local agent guidance in Wisconsin",
    description: "Milwaukee-Waukesha across Milwaukee, Waukesha, Ozaukee, and Washington counties navigates manufacturing benefit transitions, Wisconsin marketplace enrollment, brewery-corridor employer plans, and lakefront community Medicare growth in Brookfield, Wauwatosa, and Menomonee Falls su",
    insuranceNotes: [
      "State DOI licensing applies to all WI insurance producers",
      "Compare ACA subsidies and employer plan transitions with a local broker",
      "Medicare Advantage and supplement options vary by county",
      "Bundling auto and home policies may reduce premiums with independent agencies",
    ],
    cities: [
      {
        slug: "milwaukee",
        name: "Milwaukee",
        state: "Wisconsin",
        stateCode: "WI",
        highlights: ["Manufacturing benefit transitions","Wisconsin marketplace ACA enrollment","Milwaukee County Medicare"],
      }
    ],
    relatedLinks: [
      { href: "/insurance/directory?state=WI", label: "WI Insurance Agencies" },
      { href: "/insurance/hubs/wisconsin", label: "Wisconsin Insurance Hubs" },
    ],
  },
  {
    slug: "oklahoma",
    code: "OK",
    name: "Oklahoma",
    tagline: "Health insurance coverage and local agent guidance in Oklahoma",
    description: "Oklahoma City Metro across Oklahoma, Canadian, and Cleveland counties serves energy sector benefit transitions, Tinker AFB military family health enrollment, Oklahoma marketplace ACA demand, and tornado-alley property/health bundling in Moore, Edmond, and Norman suburbs.",
    insuranceNotes: [
      "State DOI licensing applies to all OK insurance producers",
      "Compare ACA subsidies and employer plan transitions with a local broker",
      "Medicare Advantage and supplement options vary by county",
      "Bundling auto and home policies may reduce premiums with independent agencies",
    ],
    cities: [
      {
        slug: "oklahoma-city",
        name: "OKC",
        state: "Oklahoma",
        stateCode: "OK",
        highlights: ["Energy sector benefit transitions","Tinker AFB military family health","Oklahoma marketplace ACA enrollment"],
      }
    ],
    relatedLinks: [
      { href: "/insurance/directory?state=OK", label: "OK Insurance Agencies" },
      { href: "/insurance/hubs/oklahoma", label: "Oklahoma Insurance Hubs" },
    ],
  },
  {
    slug: "kentucky",
    code: "KY",
    name: "Kentucky",
    tagline: "Health insurance coverage and local agent guidance in Kentucky",
    description: "Louisville-Jefferson County across Jefferson, Oldham, Bullitt, and Shelby counties serves Norton Healthcare and Baptist Health employment corridors, UPS Worldport logistics benefits, Kentucky marketplace enrollment, and bi-state Southern Indiana commuter health transitions along ",
    insuranceNotes: [
      "State DOI licensing applies to all KY insurance producers",
      "Compare ACA subsidies and employer plan transitions with a local broker",
      "Medicare Advantage and supplement options vary by county",
      "Bundling auto and home policies may reduce premiums with independent agencies",
    ],
    cities: [
      {
        slug: "louisville",
        name: "Louisville",
        state: "Kentucky",
        stateCode: "KY",
        highlights: ["Healthcare system employee benefits","Kentucky marketplace ACA enrollment","UPS/logistics corridor group plans"],
      }
    ],
    relatedLinks: [
      { href: "/insurance/directory?state=KY", label: "KY Insurance Agencies" },
      { href: "/insurance/hubs/kentucky", label: "Kentucky Insurance Hubs" },
    ],
  },
  {
    slug: "alabama",
    code: "AL",
    name: "Alabama",
    tagline: "Health insurance coverage and local agent guidance in Alabama",
    description: "Birmingham-Hoover across Jefferson, Shelby, St. Clair, and Blount counties serves UAB Medicine and St. Vincent's healthcare employment corridors, Alabama marketplace enrollment, steel-legacy retiree Medicare, and fast-growing Hoover–Vestavia Hills suburban family demand along the",
    insuranceNotes: [
      "State DOI licensing applies to all AL insurance producers",
      "Compare ACA subsidies and employer plan transitions with a local broker",
      "Medicare Advantage and supplement options vary by county",
      "Bundling auto and home policies may reduce premiums with independent agencies",
    ],
    cities: [
      {
        slug: "birmingham",
        name: "Birmingham",
        state: "Alabama",
        stateCode: "AL",
        highlights: ["UAB healthcare employee benefits","Alabama marketplace ACA enrollment","Jefferson County Medicare"],
      }
    ],
    relatedLinks: [
      { href: "/insurance/directory?state=AL", label: "AL Insurance Agencies" },
      { href: "/insurance/hubs/alabama", label: "Alabama Insurance Hubs" },
    ],
  },
  {
    slug: "rhode-island",
    code: "RI",
    name: "Rhode Island",
    tagline: "Health insurance coverage and local agent guidance in Rhode Island",
    description: "Providence-Warwick across Providence, Kent, and Bristol counties serves HealthSource RI marketplace enrollment, Brown University and Rhode Island Hospital employment corridors, Boston commuter benefit transitions, and coastal Warwick–Cranston suburban Medicare growth in Rhode Isl",
    insuranceNotes: [
      "State DOI licensing applies to all RI insurance producers",
      "Compare ACA subsidies and employer plan transitions with a local broker",
      "Medicare Advantage and supplement options vary by county",
      "Bundling auto and home policies may reduce premiums with independent agencies",
    ],
    cities: [
      {
        slug: "providence",
        name: "Providence",
        state: "Rhode Island",
        stateCode: "RI",
        highlights: ["HealthSource RI ACA enrollment","Brown University corridor benefits","Boston commuter FEHB transitions"],
      }
    ],
    relatedLinks: [
      { href: "/insurance/directory?state=RI", label: "RI Insurance Agencies" },
      { href: "/insurance/hubs/rhode-island", label: "Rhode Island Insurance Hubs" },
    ],
  },
  {
    slug: "louisiana",
    code: "LA",
    name: "Louisiana",
    tagline: "Health insurance coverage and local agent guidance in Louisiana",
    description: "New Orleans-Metairie across Orleans, Jefferson, St. Tammany, and Plaquemines parishes navigates Louisiana marketplace enrollment, Ochsner and LCMC Health employment corridors, tourism-hospitality seasonal coverage gaps, and hurricane-zone property/health bundling in Metairie, Ken",
    insuranceNotes: [
      "State DOI licensing applies to all LA insurance producers",
      "Compare ACA subsidies and employer plan transitions with a local broker",
      "Medicare Advantage and supplement options vary by county",
      "Bundling auto and home policies may reduce premiums with independent agencies",
    ],
    cities: [
      {
        slug: "new-orleans",
        name: "New Orleans",
        state: "Louisiana",
        stateCode: "LA",
        highlights: ["Louisiana marketplace ACA enrollment","Ochsner/LCMC network alignments","Orleans Parish Medicare"],
      }
    ],
    relatedLinks: [
      { href: "/insurance/directory?state=LA", label: "LA Insurance Agencies" },
      { href: "/insurance/hubs/louisiana", label: "Louisiana Insurance Hubs" },
    ],
  },
  {
    slug: "hawaii",
    code: "HI",
    name: "Hawaii",
    tagline: "Health insurance coverage and local agent guidance in Hawaii",
    description: "Urban Honolulu across Oahu serves Hawaii's unique state marketplace enrollment, Tripler Army Medical Center and Pearl Harbor military health coordination, Waikiki tourism-worker ACA transitions, and HMSA/Kaiser island network alignments from Kailua to Kapolei.",
    insuranceNotes: [
      "State DOI licensing applies to all HI insurance producers",
      "Compare ACA subsidies and employer plan transitions with a local broker",
      "Medicare Advantage and supplement options vary by county",
      "Bundling auto and home policies may reduce premiums with independent agencies",
    ],
    cities: [
      {
        slug: "honolulu",
        name: "Honolulu",
        state: "Hawaii",
        stateCode: "HI",
        highlights: ["Hawaii marketplace ACA enrollment","Military/TRICARE coordination","Honolulu County Medicare"],
      }
    ],
    relatedLinks: [
      { href: "/insurance/directory?state=HI", label: "HI Insurance Agencies" },
      { href: "/insurance/hubs/hawaii", label: "Hawaii Insurance Hubs" },
    ],
  },
  {
    slug: "new-mexico",
    code: "NM",
    name: "New Mexico",
    tagline: "Health insurance coverage and local agent guidance in New Mexico",
    description: "Albuquerque across Bernalillo, Sandoval, Valencia, and Torrance counties serves beWellnm marketplace enrollees, Sandia National Laboratories and Kirtland AFB employment corridors, diverse Native community health needs, and fast-growing Rio Rancho suburban Medicare demand along th",
    insuranceNotes: [
      "State DOI licensing applies to all NM insurance producers",
      "Compare ACA subsidies and employer plan transitions with a local broker",
      "Medicare Advantage and supplement options vary by county",
      "Bundling auto and home policies may reduce premiums with independent agencies",
    ],
    cities: [
      {
        slug: "albuquerque",
        name: "Albuquerque",
        state: "New Mexico",
        stateCode: "NM",
        highlights: ["beWellnm ACA enrollment","Sandia/Kirtland federal benefits","Bernalillo County Medicare"],
      }
    ],
    relatedLinks: [
      { href: "/insurance/directory?state=NM", label: "NM Insurance Agencies" },
      { href: "/insurance/hubs/new-mexico", label: "New Mexico Insurance Hubs" },
    ],
  },
  {
    slug: "nebraska",
    code: "NE",
    name: "Nebraska",
    tagline: "Health insurance coverage and local agent guidance in Nebraska",
    description: "Omaha-Council Bluffs across Douglas, Sarpy, Washington, and Cass counties leverages deep insurance-industry expertise for Nebraska marketplace enrollment, CHI Health and Methodist employment corridors, Mutual of Omaha corridor retiree transitions, and bi-state Iowa-Nebraska benef",
    insuranceNotes: [
      "State DOI licensing applies to all NE insurance producers",
      "Compare ACA subsidies and employer plan transitions with a local broker",
      "Medicare Advantage and supplement options vary by county",
      "Bundling auto and home policies may reduce premiums with independent agencies",
    ],
    cities: [
      {
        slug: "omaha",
        name: "Omaha",
        state: "Nebraska",
        stateCode: "NE",
        highlights: ["Nebraska marketplace ACA enrollment","CHI Health/Methodist network alignments","Douglas County Medicare"],
      }
    ],
    relatedLinks: [
      { href: "/insurance/directory?state=NE", label: "NE Insurance Agencies" },
      { href: "/insurance/hubs/nebraska", label: "Nebraska Insurance Hubs" },
    ],
  }
];

export function getDestinationBySlug(slug: string): DestinationState | undefined {
  return DESTINATION_STATES.find((d) => d.slug === slug);
}

export function getDestinationCity(
  stateSlug: string,
  citySlug: string
): { state: DestinationState; city: DestinationCity } | undefined {
  const state = getDestinationBySlug(stateSlug);
  if (!state) return undefined;
  const city = state.cities.find((c) => c.slug === citySlug);
  if (!city) return undefined;
  return { state, city };
}

export function getAllDestinationSlugs(): string[] {
  return DESTINATION_STATES.map((d) => d.slug);
}