import type { DestinationResourceLink } from '@/lib/destinations/types';

export type NorthCarolinaCorridorCity = {
  slug: string;
  displayName: string;
  zip: string;
  tagline: string;
};

export type NorthCarolinaClusterContent = {
  h1: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonicalPath: string;
  };
  heroSubheadline: string;
  introParagraphs: string[];
  charlotteMetroCorridor: NorthCarolinaCorridorCity[];
  researchTriangleCorridor: NorthCarolinaCorridorCity[];
  coastalFoothillsCorridor: NorthCarolinaCorridorCity[];
  bodySections: { heading: string; paragraphs: string[] }[];
  resourceLinks: DestinationResourceLink[];
};

export const northCarolinaClusterContent: NorthCarolinaClusterContent = {
  h1: 'Moving to North Carolina: Charlotte, Research Triangle & Coastal City Guides & Trusted Movers',
  seo: {
    title:
      'Moving to North Carolina (2026) — Destination Guides, Costs & Free Quotes | Move Trust Hub',
    description:
      'Explore North Carolina inbound moving guides for Charlotte, Raleigh, Durham, Apex, Mooresville, Wilmington, Hickory, and more. Banking, tech, biotech jobs, FMCSA-verified movers, free calculator. Independent directory.',
    keywords: [
      'moving to north carolina',
      'north carolina movers',
      'charlotte raleigh movers',
      'research triangle relocation 2026',
      'best cities to move to in north carolina',
      'lake norman wilmington movers',
      'north carolina interstate moving costs',
    ],
    canonicalPath: '/moving-to/north-carolina',
  },
  heroSubheadline:
    'North Carolina ranks among America\'s top growth states in 2026 — driven by Charlotte\'s banking and corporate headquarters corridor, the Research Triangle\'s tech and biotech employment, coastal Wilmington and Leland spillover, and foothills affordability near the Blue Ridge. Our independent directory covers FMCSA-licensed interstate movers, county-level local directories, and city-specific guides with cost tables and free quote matching.',
  introParagraphs: [
    'Whether you are targeting Charlotte\'s Uptown finance district and Lake Norman suburbs, Raleigh and Durham\'s Research Triangle tech corridor, fast-growing Wendell Falls mega-developments, or Wilmington\'s coastal master-planned communities, the relocation fundamentals are identical: document your inventory with our free calculator, verify every carrier on FMCSA.gov, and compare multiple quotes on equal cubic footage before signing.',
    'Move Trust Hub is an independent informational directory — we are not affiliated with, endorsed by, or a partner of the moving companies listed. North Carolina moves involve distinct logistics: Uptown Charlotte high-rise COI requirements, Research Triangle new-build HOA scheduling, Lake Norman peninsula shuttle trucks, coastal hurricane contingency planning, and foothills mountain-access driveways in Hickory — factors our city guides surface so you can plan with confidence.',
    'Seven live North Carolina hubs span Charlotte and Lake Norman (Mooresville), the Research Triangle and Wake County growth corridor (Raleigh & Durham, Wendell & Zebulon, Apex & Fuquay-Varina), and coastal and foothills markets (Wilmington & Leland, Hickory). Browse each city guide below for 2026–2027 cost tables, calculator prefill by ZIP, and county-level mover directories.',
  ],
  charlotteMetroCorridor: [
    {
      slug: 'charlotte-nc',
      displayName: 'Charlotte',
      zip: '28202',
      tagline: 'Largest NC city · banking & fintech · corporate HQ · lakefront suburbs',
    },
    {
      slug: 'mooresville-nc',
      displayName: 'Mooresville',
      zip: '28115',
      tagline: 'Lake Norman lifestyle · easy Charlotte commute · family lakefront',
    },
  ],
  researchTriangleCorridor: [
    {
      slug: 'raleigh-durham-nc',
      displayName: 'Raleigh & Durham',
      zip: '27601',
      tagline: 'Research Triangle · tech/biotech · universities · young professionals',
    },
    {
      slug: 'wendell-zebulon-nc',
      displayName: 'Wendell & Zebulon',
      zip: '27591',
      tagline: 'Fastest-growing municipalities · Wendell Falls · eastern Wake County',
    },
    {
      slug: 'apex-fuquay-varina-nc',
      displayName: 'Apex & Fuquay-Varina',
      zip: '27502',
      tagline: 'Southwest Wake growth · top schools · safety · Triangle proximity',
    },
  ],
  coastalFoothillsCorridor: [
    {
      slug: 'wilmington-leland-nc',
      displayName: 'Wilmington & Leland',
      zip: '28401',
      tagline: 'Coastal port city · Leland spillover · master-planned communities',
    },
    {
      slug: 'hickory-nc',
      displayName: 'Hickory',
      zip: '28601',
      tagline: 'Blue Ridge foothills · affordable vs Charlotte · mountain access',
    },
  ],
  bodySections: [
    {
      heading: 'Why North Carolina leads Southeast growth-state inbound migration in 2026',
      paragraphs: [
        'North Carolina combines Charlotte\'s status as the nation\'s second-largest banking center with the Research Triangle\'s concentration of tech, biotech, and university employment — creating diverse inbound channels for corporate transferees, remote workers, and families seeking highly rated schools at prices below Northeast and California metros. Net domestic migration into Wake, Mecklenburg, and Brunswick counties consistently ranks among the highest in the Southeast.',
        'Lifestyle diversity sets North Carolina apart: Lake Norman and Mooresville lakefront suburbs within Charlotte commute range, coastal Wilmington and Leland master-planned growth minutes from the Grand Strand, and Hickory\'s Blue Ridge foothills offering mountain access at costs well below Asheville or Charlotte Uptown. Interstate pricing from New York, New Jersey, California, and Florida origins is competitive given central East Coast geography.',
        'Our seven North Carolina city hubs include 2026–2027 cost tables, calculator prefill by ZIP, county mover directories, and cross-links to the South Carolina Grand Strand for households comparing coastal Carolinas markets.',
      ],
    },
    {
      heading: 'Why Charlotte and the Research Triangle drive the highest NC inbound volume',
      paragraphs: [
        'Charlotte captures banking, fintech, and corporate headquarters relocations with strong Northeast and Florida inbound flow — Uptown high-rises and Union County suburban master-plans each carry distinct move logistics. Mooresville adds Lake Norman lakefront appeal with a manageable Charlotte commute, drawing families seeking water access without downtown density.',
        'The Raleigh–Durham Research Triangle anchors NC tech and biotech hiring, while Wendell, Zebulon, Apex, and Fuquay-Varina capture the fastest-growing Wake County spillover — mega-developments like Wendell Falls and southwest Wake\'s top-rated school districts attract young families priced out of closer-in Triangle neighborhoods. University and corporate hiring cycles peak late spring, tightening May–August delivery windows.',
      ],
    },
    {
      heading: 'Why coastal and foothills North Carolina attract lifestyle-driven inbound households',
      paragraphs: [
        'Wilmington and Leland serve coastal NC\'s retiree, remote-worker, and military-adjacent inbound mix — with Brunswick County\'s Leland corridor absorbing spillover from New Hanover\'s premium pricing and offering large-scale master-planned communities. Hurricane season (June–November) requires flexible delivery clauses for coastal properties.',
        'Hickory offers foothills living with Blue Ridge mountain access at price points below Charlotte — attracting Florida, Ohio, and Georgia origin households seeking four-season geography without Northeast winters. Mountain terrain and rural driveways are the primary destination accessorial drivers beyond base linehaul.',
      ],
    },
  ],
  resourceLinks: [
    {
      title: 'Browse Mecklenburg County local movers',
      description: 'Charlotte Uptown and greater Charlotte metro carriers.',
      href: '/local-movers/north-carolina/mecklenburg',
    },
    {
      title: 'Browse Wake County local movers',
      description: 'Raleigh, Apex, Wendell, and Research Triangle suburbs.',
      href: '/local-movers/north-carolina/wake',
    },
    {
      title: 'Browse Durham County local movers',
      description: 'Durham and Triangle employment corridor moves.',
      href: '/local-movers/north-carolina/durham',
    },
    {
      title: 'Browse Iredell County local movers',
      description: 'Mooresville and Lake Norman waterfront deliveries.',
      href: '/local-movers/north-carolina/iredell',
    },
    {
      title: 'Browse New Hanover & Brunswick County movers',
      description: 'Wilmington, Leland, and coastal NC relocations.',
      href: '/local-movers/north-carolina/new-hanover',
    },
    {
      title: 'Browse Catawba County local movers',
      description: 'Hickory and foothills NC moves.',
      href: '/local-movers/north-carolina/catawba',
    },
    {
      title: 'Pennsylvania to North Carolina route guide',
      description: 'Charlotte, Research Triangle, and coastal NC pricing from PA origins.',
      href: '/resources/routes/pennsylvania-to-north-carolina',
    },
    {
      title: 'Massachusetts to North Carolina route guide',
      description: 'Boston and statewide MA origins to Charlotte, RTP, and coastal NC.',
      href: '/resources/routes/massachusetts-to-north-carolina',
    },
    {
      title: 'South Carolina Grand Strand hub',
      description: 'Compare NC with Myrtle Beach and Grand Strand SC markets.',
      href: '/moving-to/south-carolina',
    },
    {
      title: 'Verify any mover\'s USDOT & MC number',
      description: 'Step-by-step FMCSA lookup before booking.',
      href: '/resources/fmcsa',
    },
    {
      title: 'All popular destinations',
      description: 'North Carolina, South Carolina, Florida, Tennessee, and more.',
      href: '/moving-to',
    },
  ],
};
