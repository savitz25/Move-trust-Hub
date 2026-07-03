import type { DestinationResourceLink } from '@/lib/destinations/types';

export type NewHampshireCorridorCity = {
  slug: string;
  displayName: string;
  zip: string;
  tagline: string;
};

export type NewHampshireClusterContent = {
  h1: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonicalPath: string;
  };
  heroSubheadline: string;
  introParagraphs: string[];
  southernBorderCorridor: NewHampshireCorridorCity[];
  manchesterMetroCorridor: NewHampshireCorridorCity[];
  seacoastCorridor: NewHampshireCorridorCity[];
  capitalCorridor: NewHampshireCorridorCity[];
  upperValleyCorridor: NewHampshireCorridorCity[];
  bodySections: { heading: string; paragraphs: string[] }[];
  resourceLinks: DestinationResourceLink[];
};

export const newHampshireClusterContent: NewHampshireClusterContent = {
  h1: 'Moving to New Hampshire: Southern Border, Manchester, Seacoast, Capital & Upper Valley City Guides & Trusted Movers',
  seo: {
    title:
      'Moving to New Hampshire (2026) — Destination Guides, Costs & Trusted Movers | Move Trust Hub',
    description:
      'Explore New Hampshire inbound moving guides for Nashua, Bedford, Merrimack, Amherst, Manchester, Portsmouth, Dover, Concord, Hanover, and Lebanon. No state income tax, no sales tax, strong schools, Boston proximity, diverse southern border to coastal to mountain lifestyle. FMCSA-verified movers, free calculator. Independent directory.',
    keywords: [
      'moving to new hampshire',
      'new hampshire movers',
      'nashua nh relocation',
      'manchester nh moving',
      'portsmouth nh seacoast movers',
      'bedford nh schools suburb',
      'best cities to move to in new hampshire 2026',
      'new hampshire interstate moving costs',
      'moving from massachusetts to new hampshire',
      'moving from new york to new hampshire',
    ],
    canonicalPath: '/moving-to/new-hampshire',
  },
  heroSubheadline:
    'New Hampshire ranks among the Northeast\'s most strategically attractive inbound relocation markets for 2026 — a Live Free or Die state where no state income tax, no broad-based sales tax, strong public schools, high quality of life, and Boston proximity coexist with diverse lifestyle corridors from Nashua\'s #1-ranked Massachusetts-border commuter value and Bedford\'s affluent school-district suburbs to Manchester\'s mill-yard revitalization and tech-healthcare hub energy, Portsmouth\'s upscale historic seaport character, Concord\'s walkable state-capital government employment, and the Upper Valley\'s Dartmouth-adjacent Hanover and Lebanon academic corridors. Whether you prioritize southern-border Everett Turnpike commuting, Seacoast coastal prestige, capital-region stability, or White Mountains gateway living, our independent directory covers FMCSA-licensed interstate movers, county-level local directories, and city-specific guides with cost tables and trusted mover research tools.',
  introParagraphs: [
    'Whether you are accepting a tech role along Manchester\'s Millyard innovation corridor, settling Bedford\'s top-rated school-district inventory minutes from Boston employment, joining Nashua\'s historic downtown and Massachusetts-border commuter rail spillover, relocating to Portsmouth\'s Market Square seaport walkability, targeting Concord\'s state-government and walkable downtown stability, or considering Upper Valley Hanover and Lebanon for Dartmouth-adjacent academic living, the relocation fundamentals are identical: document your inventory with our free calculator, verify every carrier on FMCSA.gov, and compare movers directly on equal cubic footage before signing.',
    'Move Trust Hub is an independent informational directory — we are not affiliated with, endorsed by, or a partner of the moving companies listed. New Hampshire moves involve corridor logistics that generic Northeast guides overlook: Everett Turnpike and I-93 commuter peak windows in Nashua and Bedford, Manchester Millyard loft COI coordination, Portsmouth historic-district narrow-street shuttle protocols, Concord capital-region parking and walk-up constraints, summer Seacoast tourism peaks along Route 1 and I-95, and Massachusetts-border closing clusters in southern Hillsborough County — factors our city guides surface so you can plan with confidence.',
    'Ten live New Hampshire city guides span the Southern Border corridor (Nashua, Bedford, Merrimack, Amherst), Manchester Metro (Manchester), Seacoast (Portsmouth, Dover), Capital Region (Concord), and Upper Valley (Hanover, Lebanon). Browse each city guide below for 2026–2027 cost tables, calculator prefill by ZIP, and county-level mover directories.',
  ],
  southernBorderCorridor: [
    {
      slug: 'nashua-nh',
      displayName: 'Nashua',
      zip: '03060',
      tagline: '#1 ranked NH city · MA border · Boston commuter · historic downtown',
    },
    {
      slug: 'bedford-nh',
      displayName: 'Bedford',
      zip: '03110',
      tagline: 'Affluent suburb · top schools · Manchester–Boston corridor value',
    },
    {
      slug: 'merrimack-nh',
      displayName: 'Merrimack',
      zip: '03054',
      tagline: 'Southern NH suburban hub · Everett Turnpike · family-friendly inventory',
    },
    {
      slug: 'amherst-nh',
      displayName: 'Amherst',
      zip: '03031',
      tagline: 'Prestigious rural-suburban · top schools · southern border character',
    },
  ],
  manchesterMetroCorridor: [
    {
      slug: 'manchester-nh',
      displayName: 'Manchester',
      zip: '03101',
      tagline: 'Largest NH city · Millyard revitalization · tech & healthcare hub',
    },
  ],
  seacoastCorridor: [
    {
      slug: 'portsmouth-nh',
      displayName: 'Portsmouth',
      zip: '03801',
      tagline: 'Upscale coastal seaport · historic Market Square · premium Seacoast living',
    },
    {
      slug: 'dover-nh',
      displayName: 'Dover',
      zip: '03820',
      tagline: 'Seacoast growth corridor · UNH spillover · Spaulding Turnpike access',
    },
  ],
  capitalCorridor: [
    {
      slug: 'concord-nh',
      displayName: 'Concord',
      zip: '03301',
      tagline: 'State capital · walkable downtown · government & healthcare jobs',
    },
  ],
  upperValleyCorridor: [
    {
      slug: 'hanover-nh',
      displayName: 'Hanover',
      zip: '03755',
      tagline: 'Dartmouth College town · Upper Valley prestige · I-89 corridor',
    },
    {
      slug: 'lebanon-nh',
      displayName: 'Lebanon',
      zip: '03766',
      tagline: 'Dartmouth-Hitchcock medical hub · Upper Valley employment · Vermont border',
    },
  ],
  bodySections: [
    {
      heading: 'Why families and professionals are moving to New Hampshire in 2026',
      paragraphs: [
        'New Hampshire\'s inbound migration story is defined by tax advantage and lifestyle diversity within a compact state — no state income tax on wages, no broad-based sales tax, strong public schools in many communities, and Boston employment reach within a 45-minute to 90-minute drive depending on corridor. Buyers from Massachusetts, New York, Connecticut, and California discover New Hampshire as a Northeast value play: suburban and coastal quality of life without Massachusetts income-tax burden, with southern-border Nashua and Bedford capturing the strongest Massachusetts spillover volume.',
        'The southern border corridor — Nashua, Bedford, Merrimack, and Amherst — anchors the state\'s highest-intent inbound volume for Boston commuters. Nashua consistently ranks among New Hampshire\'s top livable cities with historic downtown character, Massachusetts-border Everett Turnpike access, and manufacturing-and-retail employment diversity. Bedford delivers affluent suburban inventory with nationally competitive school districts minutes from Manchester and Boston corridors. Merrimack offers family-friendly suburban inventory along the Turnpike. Amherst captures prestigious rural-suburban character with top school reputation for households wanting southern-border calm without city density.',
        'Manchester Metro serves as New Hampshire\'s largest urban inbound market. The Millyard revitalization corridor, tech and healthcare hiring, and airport connectivity draw households seeking city energy at costs below Greater Boston inner-ring premiums. Compared to Nashua\'s border-commuter identity or Bedford\'s school-district prestige, Manchester skews toward urban reinvention with genuine mill-yard loft and downtown walkability options.',
        'Seacoast and capital corridors round out New Hampshire\'s lifestyle spectrum. Portsmouth\'s upscale historic seaport, Market Square dining density, and Rockingham County coastal prestige attract Massachusetts, New York, and Connecticut spillover seeking Narragansett Bay-adjacent character without Rhode Island shoreline extremes. Dover captures Seacoast growth with UNH corridor spillover and Spaulding Turnpike connectivity. Concord\'s walkable state capital, government employment stability, and Merrimack County value serve households prioritizing capital-region calm with I-93 corridor access. Upper Valley Hanover and Lebanon draw Dartmouth-adjacent academic and medical-economy relocations along the I-89 corridor.',
        'No two New Hampshire corridors move alike. Nashua historic-downtown walk-ups need shuttle staging. Bedford cul-de-sac estates require driveway access disclosure. Manchester Millyard lofts need COI coordination. Portsmouth narrow historic lanes restrict trailer access. Summer Seacoast tourism compresses June–August schedules. Compare quotes on identical inventory rather than choosing the lowest phone estimate.',
      ],
    },
    {
      heading: 'How to choose an interstate mover for a New Hampshire delivery',
      paragraphs: [
        'Start with FMCSA verification. Every interstate carrier must have a USDOT number and, if operating as a for-hire carrier, an MC number. Look up both on FMCSA.gov and confirm acceptable safety ratings and low complaint ratios. Move Trust Hub surfaces this data alongside Google, BBB, and Trustpilot reviews so you can research before anyone calls you.',
        'Demand inventory-based quotes. Lowball estimates based on phone guesses are the leading cause of moving-day price disputes on I-93, Everett Turnpike, and I-95 corridors into New Hampshire. Use our room-by-room calculator to document cubic feet and estimated weight, then send the same inventory to every carrier you compare.',
        'Ask about New Hampshire-specific accessorials. Southern-border suburban cul-de-sacs frequently require shuttle trucks. Manchester Millyard loft conversions need freight elevator and COI coordination. Portsmouth historic-district properties may restrict 53-foot trailer access. Everett Turnpike and I-93 commuter peak windows (May–September) compress carrier schedules — confirm these line items in writing.',
        'Read our scam avoidance guide before paying more than a modest booking deposit. Reputable interstate carriers do not demand large upfront cash payments via wire transfer or cryptocurrency.',
      ],
    },
    {
      heading: 'Regional New Hampshire moving corridors at a glance',
      paragraphs: [
        'Southern Border (Nashua, Bedford, Merrimack, and Amherst) handles the state\'s highest Massachusetts-commuter inbound volume with distinct final-mile planning between border downtowns, affluent suburbs, and Turnpike corridor subdivisions.',
        'Manchester Metro (Manchester) serves New Hampshire\'s largest urban reinvention and tech-healthcare inbound demand along the Millyard and airport corridor.',
        'Seacoast (Portsmouth and Dover) captures upscale coastal seaport prestige and UNH-corridor growth relocations along I-95 and the Spaulding Turnpike.',
        'Capital Region (Concord) anchors state-government employment and walkable downtown inbound demand in Merrimack County.',
        'Upper Valley (Hanover and Lebanon) serves Dartmouth-adjacent academic and medical-economy relocations along the I-89 corridor.',
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
      title: 'Browse Hillsborough County local movers',
      description: 'Nashua, Manchester, Bedford, and southern NH mover directory.',
      href: '/local-movers/new-hampshire/hillsborough',
    },
    {
      title: 'Browse Rockingham County local movers',
      description: 'Portsmouth and Seacoast coastal mover directory.',
      href: '/local-movers/new-hampshire/rockingham',
    },
    {
      title: 'Browse Merrimack County local movers',
      description: 'Concord capital-region mover directory.',
      href: '/local-movers/new-hampshire/merrimack',
    },
    {
      title: 'Browse Strafford County local movers',
      description: 'Dover and Seacoast growth-corridor mover directory.',
      href: '/local-movers/new-hampshire/strafford',
    },
    {
      title: 'Browse Grafton County local movers',
      description: 'Hanover, Lebanon, and Upper Valley mover directory.',
      href: '/local-movers/new-hampshire/grafton',
    },
    {
      title: 'Massachusetts moving destinations hub',
      description: 'Compare NH corridors with Greater Boston and statewide guides.',
      href: '/moving-to/massachusetts',
    },
    {
      title: 'Rhode Island moving destinations hub',
      description: 'Compare NH Seacoast with RI coastal corridor guides.',
      href: '/moving-to/rhode-island',
    },
    {
      title: 'New York moving destinations hub',
      description: 'Compare NY origin markets and tri-state spillover into southern NH.',
      href: '/moving-to/new-york',
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