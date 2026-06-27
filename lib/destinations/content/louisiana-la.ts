import type { DestinationResourceLink } from '@/lib/destinations/types';

export type LouisianaCorridorCity = {
  slug: string;
  displayName: string;
  zip: string;
  tagline: string;
};

export type LouisianaClusterContent = {
  h1: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonicalPath: string;
  };
  heroSubheadline: string;
  introParagraphs: string[];
  greaterNewOrleansCorridor: LouisianaCorridorCity[];
  northshoreCorridor: LouisianaCorridorCity[];
  acadianaSouthwestCorridor: LouisianaCorridorCity[];
  capitalAndNorthCorridor: LouisianaCorridorCity[];
  bodySections: { heading: string; paragraphs: string[] }[];
  resourceLinks: DestinationResourceLink[];
};

export const louisianaClusterContent: LouisianaClusterContent = {
  h1: 'Moving to Louisiana: New Orleans Suburbs, Northshore, Acadiana, Capital Region & Bossier City Guides & Trusted Movers',
  seo: {
    title:
      'Moving to Louisiana (2026) — Destination Guides, Costs & Free Quotes | Move Trust Hub',
    description:
      'Explore Louisiana inbound moving guides for Metairie, Kenner, Slidell, Lafayette, Lake Charles, Bossier City, Houma, Mandeville, Prairieville, and Baton Rouge. Gulf Coast affordability, Cajun culture, industrial growth. FMCSA-verified movers, free calculator. Independent directory.',
    keywords: [
      'moving to louisiana',
      'louisiana movers',
      'metairie la relocation',
      'baton rouge la movers',
      'lafayette la moving',
      'best cities to move to in louisiana 2026',
      'louisiana interstate moving costs',
      'moving from texas to louisiana',
      'new orleans suburb relocation',
      'gulf coast louisiana movers',
    ],
    canonicalPath: '/moving-to/louisiana',
  },
  heroSubheadline:
    'Louisiana ranks among the Gulf Coast\'s most culturally distinctive and competitively affordable inbound relocation markets for 2026 — a state where competitive cost of living, port and energy infrastructure, Cajun and Creole heritage, and industrial growth corridors coexist with family-first New Orleans suburbs, Northshore lake communities, Acadiana tech-and-culture capitals, capital-region LSU employment, and Bossier City\'s modern tech-forward Shreveport spillover. Metairie leads statewide inbound intent as Louisiana\'s #1 destination with strong value and transit access; Kenner delivers Louis Armstrong airport connectivity and retirement-friendly affordability; Mandeville anchors affluent Lake Pontchartrain waterfront living; Lafayette channels Cajun Country cultural capital with education and tech momentum; and Baton Rouge concentrates state-government, LSU, and port-industrial employment along the Mississippi. Our independent directory covers FMCSA-licensed interstate movers, parish-level local directories, and ten city-specific guides with cost tables and free quote matching.',
  introParagraphs: [
    'Whether you are targeting Metairie\'s #1-ranked Louisiana livability as a family-first New Orleans suburb with strong value and transit, Kenner\'s airport-accessible affordable housing, Slidell\'s peaceful Northshore nature community on Lake Pontchartrain, Lafayette\'s Cajun Country cultural capital with tech and education growth, Lake Charles\' industrial and energy boom corridor, Bossier City\'s modern tech-forward suburb across from Shreveport with military influence, Houma\'s authentic bayou affordability, Mandeville\'s affluent waterfront schools, Prairieville\'s fast-growing Baton Rouge suburb excellence, or Baton Rouge\'s state-capital LSU and port-industrial employment, the relocation fundamentals are identical: document your inventory with our free calculator, verify every carrier on FMCSA.gov, and compare multiple quotes on equal cubic footage before signing.',
    'Move Trust Hub is an independent informational directory — we are not affiliated with, endorsed by, or a partner of the moving companies listed. Louisiana moves involve Gulf Coast logistics that generic relocation guides overlook: hurricane-season scheduling windows, Causeway bridge traffic on Northshore deliveries, elevated-home and flood-zone access planning in coastal parishes, petrochemical-corridor industrial scheduling near Lake Charles and Houma, LSU and state-government closing-date clusters in Baton Rouge, and fewer dedicated Louisiana carrier lanes than Texas routes — factors our city guides surface so you can plan with confidence.',
    'Ten live Louisiana city guides span Greater New Orleans (Metairie, Kenner), Northshore (Slidell, Mandeville), Acadiana & Southwest (Lafayette, Lake Charles, Houma), and Capital & North (Baton Rouge, Prairieville, Bossier City). Browse each city guide below for 2026–2027 cost tables, calculator prefill by ZIP, and parish-level mover directories.',
  ],
  greaterNewOrleansCorridor: [
    {
      slug: 'metairie-la',
      displayName: 'Metairie',
      zip: '70002',
      tagline: '#1 in Louisiana · family-first NOLA suburb · strong value · transit access',
    },
    {
      slug: 'kenner-la',
      displayName: 'Kenner',
      zip: '70062',
      tagline: 'Airport access · affordable housing · retirement-friendly',
    },
  ],
  northshoreCorridor: [
    {
      slug: 'slidell-la',
      displayName: 'Slidell',
      zip: '70458',
      tagline: 'Peaceful Northshore nature · Lake Pontchartrain access',
    },
    {
      slug: 'mandeville-la',
      displayName: 'Mandeville',
      zip: '70448',
      tagline: 'Affluent waterfront haven · top schools · low crime',
    },
  ],
  acadianaSouthwestCorridor: [
    {
      slug: 'lafayette-la',
      displayName: 'Lafayette',
      zip: '70501',
      tagline: 'Cajun Country cultural capital · tech & education hub',
    },
    {
      slug: 'lake-charles-la',
      displayName: 'Lake Charles',
      zip: '70601',
      tagline: 'Industrial & energy boom · manufacturing growth',
    },
    {
      slug: 'houma-la',
      displayName: 'Houma',
      zip: '70360',
      tagline: 'Authentic bayou city · affordable deep Louisiana lifestyle',
    },
  ],
  capitalAndNorthCorridor: [
    {
      slug: 'baton-rouge-la',
      displayName: 'Baton Rouge',
      zip: '70801',
      tagline: 'State capital · LSU · major port & industrial jobs',
    },
    {
      slug: 'prairieville-la',
      displayName: 'Prairieville',
      zip: '70769',
      tagline: 'Fast-growing suburb · excellent schools near Baton Rouge',
    },
    {
      slug: 'bossier-city-la',
      displayName: 'Bossier City',
      zip: '71111',
      tagline: 'Modern tech-forward suburb · Shreveport spillover · military influence',
    },
  ],
  bodySections: [
    {
      heading: 'Why families and professionals are moving to Louisiana in 2026',
      paragraphs: [
        'Louisiana\'s inbound migration story blends Gulf Coast affordability with cultural depth that few states can match. Metairie ranks #1 among Louisiana destinations as a family-first New Orleans suburb delivering strong housing value, Jefferson Parish school access, and transit connectivity without French Quarter premiums. Kenner captures Louis Armstrong International Airport spillover with retirement-friendly neighborhoods and among the metro\'s most accessible price points. Across Lake Pontchartrain, Slidell and Mandeville split Northshore demand between peaceful nature-community living and affluent waterfront schools with low crime — each attracting Texas, Florida, and Mississippi spillover households seeking Louisiana lifestyle without New Orleans urban density.',
        'Acadiana and southwest Louisiana add industrial and cultural dimensions. Lafayette anchors Cajun Country as a cultural capital where University of Louisiana at Lafayette, healthcare expansion, and tech-sector growth attract households who want authentic Louisiana heritage with modern employment. Lake Charles channels petrochemical and LNG energy-boom investment with manufacturing growth that draws skilled workers from Texas and Oklahoma corridors. Houma delivers among the state\'s most affordable bayou-authentic lifestyles with offshore-energy and seafood-industry employment for households prioritizing deep Louisiana character over suburban sprawl.',
        'Baton Rouge and north Louisiana round out the state\'s employment spectrum. Baton Rouge concentrates state-government, banking, healthcare, LSU, and Mississippi River port-industrial jobs with riverfront neighborhoods and established suburban inventory. Prairieville captures Ascension Parish\'s fastest-growing school-focused suburban demand minutes from capital-city employment. Bossier City across the Red River from Shreveport offers modern tech-forward suburban growth, Barksdale Air Force Base influence, and casino-and-healthcare corridor employment with north Louisiana affordability. Compared to Houston, Atlanta, or Florida Gulf Coast metros, Louisiana corridors deliver meaningfully lower interstate moving costs and ongoing living expenses.',
        'No two Louisiana parishes move alike. Jefferson Parish subdivisions need flood-zone and driveway disclosure. Northshore Causeway traffic affects Mandeville and Slidell scheduling. Lafayette\'s university turnover peaks in late summer. Lake Charles industrial corridors require exact-address scheduling. Compare quotes on identical inventory rather than choosing the lowest phone estimate.',
      ],
    },
    {
      heading: 'How to choose an interstate mover for a Louisiana delivery',
      paragraphs: [
        'Start with FMCSA verification. Every interstate carrier must have a USDOT number and, if operating as a for-hire carrier, an MC number. Look up both on FMCSA.gov and confirm acceptable safety ratings and low complaint ratios. Move Trust Hub surfaces this data alongside Google, BBB, and Trustpilot reviews so you can research before anyone calls you.',
        'Demand inventory-based quotes. Lowball estimates based on phone guesses are the leading cause of moving-day price disputes on I-10, I-12, and I-49 corridors into Louisiana. Use our room-by-room calculator to document cubic feet and estimated weight, then send the same inventory to every carrier you compare.',
        'Ask about Louisiana-specific accessorials. Coastal and bayou parishes may involve elevated-home stairs, long driveway carries, or hurricane-season scheduling constraints. Northshore Causeway bridge traffic can affect Mandeville and Slidell delivery windows. Petrochemical-corridor addresses near Lake Charles and Houma may need industrial-access coordination. Fewer carriers operate dedicated Louisiana lanes than Texas routes — confirm direct parish delivery versus regional hub consolidation.',
        'Read our scam avoidance guide before paying more than a modest booking deposit. Reputable interstate carriers do not demand large upfront cash payments via wire transfer or cryptocurrency.',
      ],
    },
    {
      heading: 'Regional Louisiana moving corridors at a glance',
      paragraphs: [
        'Greater New Orleans (Jefferson Parish) handles Louisiana\'s highest inbound volume. Metairie leads with #1 statewide livability, family-first suburban planning, and transit value; Kenner adds airport-accessible affordability and retirement-friendly inventory along the I-10 corridor.',
        'Northshore (St. Tammany Parish) serves households seeking Lake Pontchartrain lifestyle. Slidell offers peaceful nature-community character with New Orleans commute access; Mandeville delivers affluent waterfront schools and low-crime suburban prestige.',
        'Acadiana & Southwest captures cultural and industrial growth. Lafayette anchors Cajun Country tech-and-education momentum; Lake Charles channels energy-and-manufacturing boom investment; Houma provides authentic bayou affordability with offshore-industry employment.',
        'Capital & North spans Baton Rouge state-capital employment, Prairieville\'s fast-growing Ascension Parish schools, and Bossier City\'s tech-forward Shreveport spillover with military and healthcare corridor stability.',
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
      title: 'Browse Jefferson Parish local movers',
      description: 'Metairie and Kenner Greater New Orleans mover directory.',
      href: '/local-movers/louisiana/jefferson',
    },
    {
      title: 'Browse St. Tammany Parish local movers',
      description: 'Slidell and Mandeville Northshore mover directory.',
      href: '/local-movers/louisiana/st-tammany',
    },
    {
      title: 'Browse Lafayette Parish local movers',
      description: 'Lafayette Cajun Country mover directory.',
      href: '/local-movers/louisiana/lafayette',
    },
    {
      title: 'Browse Calcasieu Parish local movers',
      description: 'Lake Charles southwest Louisiana mover directory.',
      href: '/local-movers/louisiana/calcasieu',
    },
    {
      title: 'Browse Terrebonne Parish local movers',
      description: 'Houma bayou country mover directory.',
      href: '/local-movers/louisiana/terrebonne',
    },
    {
      title: 'Browse East Baton Rouge Parish local movers',
      description: 'Baton Rouge state capital mover directory.',
      href: '/local-movers/louisiana/east-baton-rouge',
    },
    {
      title: 'Browse Ascension Parish local movers',
      description: 'Prairieville capital-region suburb mover directory.',
      href: '/local-movers/louisiana/ascension',
    },
    {
      title: 'Browse Bossier Parish local movers',
      description: 'Bossier City north Louisiana mover directory.',
      href: '/local-movers/louisiana/bossier',
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