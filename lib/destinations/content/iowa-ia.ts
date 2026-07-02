import type { DestinationResourceLink } from '@/lib/destinations/types';

export type IowaCorridorCity = {
  slug: string;
  displayName: string;
  zip: string;
  tagline: string;
};

export type IowaClusterContent = {
  h1: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonicalPath: string;
  };
  heroSubheadline: string;
  introParagraphs: string[];
  desMoinesMetroCorridor: IowaCorridorCity[];
  universityInnovationCorridor: IowaCorridorCity[];
  easternCorridor: IowaCorridorCity[];
  driftlessHeritageCorridor: IowaCorridorCity[];
  bodySections: { heading: string; paragraphs: string[] }[];
  resourceLinks: DestinationResourceLink[];
};

export const iowaClusterContent: IowaClusterContent = {
  h1: 'Moving to Iowa: Affordable Midwest City Guides & Trusted Movers',
  seo: {
    title:
      'Moving to Iowa (2026) — Destination Guides, Costs & Trusted Movers | Move Trust Hub',
    description:
      'Explore Iowa inbound moving guides for Des Moines, Ankeny, West Des Moines, Iowa City, Ames, Cedar Rapids, Dubuque, and more. Affordable housing, strong schools, university towns, FMCSA-verified movers, free calculator. Independent directory.',
    keywords: [
      'moving to iowa',
      'iowa movers',
      'des moines ia movers',
      'ankeny iowa relocation',
      'best cities to move to in iowa',
      'affordable midwest relocation iowa',
      'iowa interstate moving costs',
      'moving from illinois to iowa',
      'moving from minnesota to iowa',
    ],
    canonicalPath: '/moving-to/iowa',
  },
  heroSubheadline:
    'Iowa ranks among the Midwest\'s most value-forward inbound states in 2026 — drawing Illinois, Minnesota, Wisconsin, California, Texas, New York, and Florida households to Des Moines\'s insurance-and-finance capital, Ankeny\'s nationally ranked Prairie Trail growth, Iowa City\'s UNESCO City of Literature culture, and Pella\'s spotless Dutch heritage. Affordable housing, strong community schools, and deliberate urban-rural balance create a relocation calculus that coastal and Chicagoland guides rarely capture at city-level precision. Our independent directory covers FMCSA-licensed interstate movers, county-level local directories, and ten city-specific guides with cost tables and free quote matching.',
  introParagraphs: [
    'Whether you are accepting a Des Moines corporate transfer along the Principal Riverwalk, relocating a Chicago family into Ankeny\'s Appoquinimink-adjacent school corridors, downsizing from Minneapolis into Decorah\'s Driftless Region trails, or choosing Pella\'s Tulip Time village over suburban sprawl, the relocation fundamentals are identical: document your inventory with our free calculator, verify every carrier on FMCSA.gov, and compare movers directly on equal cubic footage before signing.',
    'Move Trust Hub is an independent informational directory — we are not affiliated with, endorsed by, or a partner of the moving companies listed. Iowa moves involve Midwest logistics that statewide guides overlook: Des Moines metro builder closing clusters, university-town August turnover in Iowa City and Ames, Cedar Rapids flood-zone delivery planning, Dubuque bluff-street shuttle staging, and harvest-season rural driveway access — factors our city guides surface so you can plan with confidence.',
    'Ten live Iowa hubs span Des Moines metro growth (Ankeny, West Des Moines, Des Moines, Waukee), university and innovation corridors (Iowa City, Ames), eastern manufacturing and river cities (Cedar Rapids, Dubuque), and Driftless heritage communities (Decorah, Pella). Browse each city guide below for 2026–2027 cost tables, calculator prefill by ZIP, and county-level mover directories.',
  ],
  desMoinesMetroCorridor: [
    {
      slug: 'ankeny-ia',
      displayName: 'Ankeny',
      zip: '50023',
      tagline: 'National growth standout · Prairie Trail · excellent schools',
    },
    {
      slug: 'west-des-moines-ia',
      displayName: 'West Des Moines',
      zip: '50266',
      tagline: 'Corporate powerhouse · Jordan Creek · top-rated schools',
    },
    {
      slug: 'des-moines-ia',
      displayName: 'Des Moines',
      zip: '50309',
      tagline: 'Capital opportunity · insurance & finance · riverwalk culture',
    },
    {
      slug: 'waukee-ia',
      displayName: 'Waukee',
      zip: '50263',
      tagline: 'Safety & active lifestyle · trail network · Dallas County value',
    },
  ],
  universityInnovationCorridor: [
    {
      slug: 'iowa-city-ia',
      displayName: 'Iowa City',
      zip: '52240',
      tagline: 'Cultural hub · University of Iowa · UNESCO City of Literature',
    },
    {
      slug: 'ames-ia',
      displayName: 'Ames',
      zip: '50010',
      tagline: 'Tech & innovation · Iowa State University · bike-friendly',
    },
  ],
  easternCorridor: [
    {
      slug: 'cedar-rapids-ia',
      displayName: 'Cedar Rapids',
      zip: '52401',
      tagline: 'Affordable manufacturing hub · Five Seasons · Cedar River',
    },
    {
      slug: 'dubuque-ia',
      displayName: 'Dubuque',
      zip: '52001',
      tagline: 'Mississippi River jewel · historic architecture · riverfront',
    },
  ],
  driftlessHeritageCorridor: [
    {
      slug: 'decorah-ia',
      displayName: 'Decorah',
      zip: '52101',
      tagline: 'Outdoor favorite · Driftless Region · craft beer & trails',
    },
    {
      slug: 'pella-ia',
      displayName: 'Pella',
      zip: '50219',
      tagline: 'Dutch treasure · Tulip Time · Vermeer & Pella Windows heritage',
    },
  ],
  bodySections: [
    {
      heading: 'Why Iowa leads affordable Midwest inbound migration in 2026',
      paragraphs: [
        'Iowa offers a combination increasingly rare among Midwest metros: housing costs that remain meaningfully below Chicago, Minneapolis, and coastal benchmarks; nationally recognized school districts in Ankeny and West Des Moines; and university-town culture in Iowa City and Ames without Boston or Berkeley price tags. Illinois, Minnesota, Wisconsin, California, Texas, New York, and Florida consistently rank among the largest origin states for Iowa relocations.',
        'Polk and Dallas counties anchor the highest inbound volume — Des Moines insurance-and-finance employment, Jordan Creek corporate corridor density, Ankeny\'s Prairie Trail master-planned growth, and Waukee\'s trail-forward family suburbs each carry distinct move logistics. Johnson and Story counties draw academic and innovation households around the University of Iowa and Iowa State. Eastern Linn and Dubuque counties serve manufacturing and river-city buyers; Winneshiek and Marion counties attract Driftless outdoor enthusiasts and Dutch-heritage community seekers.',
        'Our ten Iowa city hubs include 2026–2027 cost tables, calculator prefill by ZIP, county mover directories, and cross-links to Illinois, Minnesota, Wisconsin, and Nebraska for households comparing Upper Midwest relocation corridors.',
      ],
    },
    {
      heading: 'Why the Des Moines metro drives Iowa\'s highest inbound volume',
      paragraphs: [
        'Ankeny, West Des Moines, Des Moines, and Waukee form Iowa\'s growth quadrilateral — nationally ranked schools, corporate campus access, capital-city riverwalk culture, and Dallas County trail inventory at graduated price points. Summer builder closing clusters (May–August) and August university spillover from Ames and Iowa City tighten Polk County delivery windows along I-35 and I-80 corridors.',
        'Jordan Creek and Valley West retail corridors, Prairie Trail town-center density, and Waukee\'s Kettlestone development each create different final-mile requirements — a West Des Moines high-rise COI delivery, an Ankeny new-build HOA move-day reservation, and a Waukee cul-de-sac shuttle truck should never share the same accessorial assumptions. Book 6–10 weeks ahead for peak metro closings.',
      ],
    },
    {
      heading: 'Why university towns and eastern Iowa attract distinct inbound households',
      paragraphs: [
        'Iowa City and Ames serve households prioritizing UNESCO-recognized literary culture, Big Ten university energy, Iowa State research employment, and bike-friendly campus towns without coastal tuition-town premiums. Cedar Rapids and Dubuque offer Five Seasons affordability and Mississippi bluff architecture for buyers who want river-city character at manufacturing-hub economics.',
        'Decorah and Pella anchor northeastern and central Iowa heritage inbound — Driftless Region trout streams, Toppling Goliath craft-beer culture, Tulip Time festival community, and Vermeer/Pella Windows corporate heritage for households choosing small-town intentionality over metro sprawl. Shoulder-season deliveries (April–May, September–October) often offer better carrier availability on rural Iowa routes.',
      ],
    },
  ],
  resourceLinks: [
    {
      title: 'Browse Polk County local movers',
      description: 'Des Moines, Ankeny, and West Des Moines metro coverage.',
      href: '/local-movers/iowa/polk',
    },
    {
      title: 'Browse Dallas County local movers',
      description: 'Waukee and western Des Moines metro relocations.',
      href: '/local-movers/iowa/dallas',
    },
    {
      title: 'Browse Johnson County local movers',
      description: 'Iowa City and University of Iowa corridor moves.',
      href: '/local-movers/iowa/johnson',
    },
    {
      title: 'Browse Story County local movers',
      description: 'Ames and Iowa State University relocations.',
      href: '/local-movers/iowa/story',
    },
    {
      title: 'Browse Linn County local movers',
      description: 'Cedar Rapids and eastern Iowa manufacturing corridor.',
      href: '/local-movers/iowa/linn',
    },
    {
      title: 'Illinois destination cluster',
      description: 'Compare IA with Chicago suburbs and downstate alternatives.',
      href: '/moving-to/illinois',
    },
    {
      title: 'Browse Minnesota local movers',
      description: 'Compare IA with Twin Cities spillover and border county relocations.',
      href: '/local-movers/minnesota',
    },
    {
      title: 'Browse Wisconsin local movers',
      description: 'Compare IA with Madison and Milwaukee metro alternatives.',
      href: '/local-movers/wisconsin',
    },
    {
      title: 'Browse Nebraska local movers',
      description: 'Compare IA with Omaha and Lincoln corridor relocations.',
      href: '/local-movers/nebraska',
    },
    {
      title: 'Verify any mover\'s USDOT & MC number',
      description: 'Step-by-step FMCSA lookup before booking.',
      href: '/resources/fmcsa',
    },
    {
      title: 'All popular destinations',
      description: 'Iowa, Illinois, Minnesota, and nationwide hubs.',
      href: '/moving-to',
    },
  ],
};