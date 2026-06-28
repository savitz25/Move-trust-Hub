export type DestinationGuide = {
  slug: string;
  title: string;
  description: string;
  destinationHubPath: string;
  destinationLabel: string;
  sections: { heading: string; paragraphs: string[] }[];
  checklist: string[];
  relatedLinks: { title: string; href: string; description: string }[];
};

export const destinationGuides: DestinationGuide[] = [
  {
    slug: 'moving-to-myrtle-beach-2026',
    title: '2026 Moving Guide to Myrtle Beach & the Grand Strand',
    description:
      'Neighborhood overview, seasonal timing, hurricane prep, HOA/condo move rules, and a printable mover-vetting checklist for relocations to Myrtle Beach, SC and the Wilmington–Brunswick corridor.',
    destinationHubPath: '/moving-to/south-carolina',
    destinationLabel: 'South Carolina',
    sections: [
      {
        heading: 'Why families and retirees choose the Grand Strand',
        paragraphs: [
          'Myrtle Beach and the surrounding Grand Strand remain a top inbound market for retirees, remote workers, and families seeking lower taxes, coastal amenities, and relative affordability compared to Northeast metros. Horry County anchors the South Carolina side; Brunswick and New Hanover counties across the state line add Wilmington-area employment and healthcare options.',
          'Interstate moves into this corridor typically originate from Pennsylvania, New Jersey, New York, Ohio, and the Midwest. Peak demand runs May through September, with October–April offering more flexible delivery windows and modestly lower pricing.',
        ],
      },
      {
        heading: 'Neighborhoods and county coverage',
        paragraphs: [
          'Myrtle Beach proper, North Myrtle Beach, Surfside Beach, and Conway fall under Horry County. Southport, Leland, and coastal Brunswick County communities sit between Wilmington and the SC border. Wrightsville Beach and Wilmington are in New Hanover County.',
          'Use our county-level mover directories for vetted local companies in each jurisdiction, and our Myrtle Beach destination hub for interstate carrier comparisons and cost tables.',
        ],
      },
      {
        heading: 'Condo, HOA, and seasonal logistics',
        paragraphs: [
          'Oceanfront condos and gated communities often require move-in certificates, certificate of insurance (COI) naming the building, elevator reservations, and padded hallway protection. Book elevator windows before your carrier loads — missed slots are a common source of rescheduling fees.',
          'Hurricane season (June–November) can affect delivery timing. Confirm contingency language in your bill of lading and avoid scheduling fragile deliveries during named-storm watches when possible.',
        ],
      },
    ],
    checklist: [
      'Build a room-by-room inventory with our moving calculator before requesting quotes',
      'Verify USDOT/MC numbers on FMCSA.gov for every interstate carrier',
      'Request binding or not-to-exceed estimates after a virtual or in-home survey',
      'Confirm HOA/condo move-in rules and elevator reservations at your destination',
      'Compare at least 2–3 quotes on equal cubic footage — not just lowest price',
      'Read our scam avoidance guide before paying deposits',
    ],
    relatedLinks: [
      {
        title: 'South Carolina destination cluster',
        href: '/moving-to/south-carolina',
        description: 'Grand Strand costs, movers, calculator, and FAQ',
      },
      {
        title: 'New York → Myrtle Beach route guide',
        href: '/resources/routes/new-york-to-myrtle-beach',
        description: 'Distance, pricing, and planning tips',
      },
      {
        title: 'Horry County local movers',
        href: '/local-movers/south-carolina/horry',
        description: '10 vetted movers with FMCSA data',
      },
      {
        title: 'FMCSA licensing guide',
        href: '/resources/fmcsa',
        description: 'Verify any carrier before booking',
      },
    ],
  },
  {
    slug: 'moving-to-coeur-dalene-2026',
    title: "2026 Moving Guide to Coeur d'Alene & the Idaho Panhandle",
    description:
      "Lakefront neighborhoods, Spokane metro spillover, winter I-90 pass timing, and a mover-vetting checklist for relocations to Coeur d'Alene, Post Falls, and Kootenai County.",
    destinationHubPath: '/moving-to/idaho/coeur-dalene-id',
    destinationLabel: "Coeur d'Alene, ID",
    sections: [
      {
        heading: "Why families choose Coeur d'Alene",
        paragraphs: [
          "Coeur d'Alene anchors the Idaho Panhandle with lakefront recreation, lower taxes than many West Coast metros, and easy access to Spokane employment. Inbound moves often originate from California, Washington, Oregon, and Montana along the I-90 corridor.",
          'Peak demand runs May through September for lake-season arrivals. Winter moves require planning around Lookout Pass and Fourth of July Pass conditions — confirm your carrier has mountain-route experience.',
        ],
      },
      {
        heading: 'County coverage and local movers',
        paragraphs: [
          'Kootenai County covers Coeur d\'Alene, Post Falls, Hayden, and Rathdrum. Browse our county directory for vetted local movers, then compare FMCSA-licensed interstate carriers on our city destination hub.',
        ],
      },
    ],
    checklist: [
      'Build inventory with our moving calculator before requesting quotes',
      'Verify USDOT/MC numbers on FMCSA.gov',
      'Confirm winter delivery windows if moving November–March',
      'Compare 2–3 binding estimates on equal cubic footage',
    ],
    relatedLinks: [
      { title: "Coeur d'Alene destination hub", href: '/moving-to/idaho/coeur-dalene-id', description: 'Costs, movers, calculator, and FAQ' },
      { title: 'Idaho destination cluster', href: '/moving-to/idaho', description: 'Treasure Valley and Panhandle guides' },
      { title: 'Kootenai County local movers', href: '/local-movers/idaho/kootenai', description: 'Vetted movers with FMCSA data' },
      { title: 'Interstate moving costs 2026', href: '/resources/interstate-moving-costs', description: 'Average prices by home size and distance' },
    ],
  },
  {
    slug: 'moving-to-idaho-falls-2026',
    title: '2026 Moving Guide to Idaho Falls & Eastern Idaho',
    description:
      'INL corridor relocations, agricultural community timing, winter logistics, and a printable mover-vetting checklist for Bonneville County and eastern Idaho.',
    destinationHubPath: '/moving-to/idaho/idaho-falls-id',
    destinationLabel: 'Idaho Falls, ID',
    sections: [
      {
        heading: 'Eastern Idaho inbound market overview',
        paragraphs: [
          'Idaho Falls serves as the commercial hub for eastern Idaho, anchored by Idaho National Laboratory, healthcare, and agriculture. Inbound moves often come from Utah, California, and Pacific Northwest metros seeking affordability and outdoor access.',
          'Delivery windows can extend in winter when I-15 and I-86 see weather delays. Book carriers with experience in rural eastern Idaho access — long driveways and agricultural properties are common.',
        ],
      },
      {
        heading: 'Local and interstate mover research',
        paragraphs: [
          'Start with our Bonneville County local mover directory, then use the Idaho Falls city hub for interstate carrier comparisons, cost tables, and route calculators.',
        ],
      },
    ],
    checklist: [
      'Use our moving calculator for accurate cubic footage',
      'Verify FMCSA licensing for every interstate carrier',
      'Plan around INL and university semester peaks if applicable',
      'Request binding estimates after inventory review',
    ],
    relatedLinks: [
      { title: 'Idaho Falls destination hub', href: '/moving-to/idaho/idaho-falls-id', description: 'Costs, movers, and calculator' },
      { title: 'Bonneville County local movers', href: '/local-movers/idaho/bonneville', description: 'County-level mover directory' },
      { title: 'Idaho destination cluster', href: '/moving-to/idaho', description: 'All Idaho city guides' },
      { title: 'FMCSA licensing guide', href: '/resources/fmcsa', description: 'Verify carriers before booking' },
    ],
  },
  {
    slug: 'moving-to-knoxville-2026',
    title: '2026 Moving Guide to Knoxville & East Tennessee',
    description:
      'University of Tennessee turnover, Oak Ridge corridor jobs, Smoky Mountain access, and a mover-vetting checklist for Knox County inbound relocations.',
    destinationHubPath: '/moving-to/tennessee/knoxville-tn',
    destinationLabel: 'Knoxville, TN',
    sections: [
      {
        heading: 'Why households move to Knoxville',
        paragraphs: [
          'Knoxville combines University of Tennessee energy, Oak Ridge National Laboratory employment, and affordable Smoky Mountain access. Inbound corridors include the Midwest, Florida, and Northeast retirees seeking lower cost of living.',
          'August and May see peak demand around UT semesters. Confirm elevator and parking rules for downtown high-rises and Farragut suburban communities before your load date.',
        ],
      },
      {
        heading: 'Compare local and interstate movers',
        paragraphs: [
          'Browse Knox County local movers for packing and loading help, then use our Knoxville destination hub for interstate quotes, cost tables, and links to Nashville and Chattanooga guides.',
        ],
      },
    ],
    checklist: [
      'Build room-by-room inventory in our calculator',
      'Verify USDOT/MC on FMCSA.gov',
      'Compare binding estimates from 2–3 licensed carriers',
      'Read our scam avoidance guide before paying deposits',
    ],
    relatedLinks: [
      { title: 'Knoxville destination hub', href: '/moving-to/tennessee/knoxville-tn', description: 'Costs, movers, calculator, FAQ' },
      { title: 'Tennessee destination cluster', href: '/moving-to/tennessee', description: 'Nashville, Chattanooga, and more' },
      { title: 'Knox County local movers', href: '/local-movers/tennessee/knox', description: 'Vetted local companies' },
      { title: 'How to choose a mover', href: '/resources/how-to-choose', description: 'Step-by-step vetting framework' },
    ],
  },
  {
    slug: 'moving-to-sandpoint-2026',
    title: '2026 Moving Guide to Sandpoint & North Idaho',
    description:
      'Lake Pend Oreille lifestyle, Schweitzer Mountain seasonal demand, rural access logistics, and a mover-vetting checklist for Bonner County relocations.',
    destinationHubPath: '/moving-to/idaho/sandpoint-id',
    destinationLabel: 'Sandpoint, ID',
    sections: [
      {
        heading: 'Sandpoint and Bonner County overview',
        paragraphs: [
          'Sandpoint draws remote workers, retirees, and outdoor enthusiasts to Lake Pend Oreille and Schweitzer Mountain. Inbound moves often originate from Seattle, Portland, and California metros.',
          'Winter mountain routes and seasonal tourism can affect crew availability. Confirm your carrier can handle narrow rural driveways and second-home deliveries off-season.',
        ],
      },
      {
        heading: 'Research movers before you book',
        paragraphs: [
          'Use our Bonner County local mover directory and Sandpoint city hub for interstate carrier comparisons. Pair with our Idaho Panhandle guides for regional context.',
        ],
      },
    ],
    checklist: [
      'Estimate volume with our moving calculator',
      'Verify FMCSA authority for interstate carriers',
      'Plan around ski-season and summer tourism peaks',
      'Confirm rural property access with your carrier',
    ],
    relatedLinks: [
      { title: 'Sandpoint destination hub', href: '/moving-to/idaho/sandpoint-id', description: 'Costs and mover comparisons' },
      { title: "Coeur d'Alene guide", href: '/moving-to/idaho/coeur-dalene-id', description: 'Panhandle comparison market' },
      { title: 'Bonner County local movers', href: '/local-movers/idaho/bonner', description: 'County mover directory' },
      { title: 'Route guides', href: '/resources/routes', description: 'Corridor planning resources' },
    ],
  },
  {
    slug: 'moving-to-twin-falls-2026',
    title: '2026 Moving Guide to Twin Falls & the Magic Valley',
    description:
      'Snake River Canyon affordability, agricultural corridor logistics, and a mover-vetting checklist for Twin Falls County inbound moves.',
    destinationHubPath: '/moving-to/idaho/twin-falls-id',
    destinationLabel: 'Twin Falls, ID',
    sections: [
      {
        heading: 'Magic Valley relocation overview',
        paragraphs: [
          'Twin Falls anchors southern Idaho\'s Magic Valley with agriculture, food processing, and outdoor recreation along the Snake River Canyon. Inbound moves often come from Utah, California, and Treasure Valley spillover.',
          'Rural property access and long farm driveways are common — share accurate access notes when requesting quotes to avoid delivery-day surprises.',
        ],
      },
      {
        heading: 'Local and long-distance mover options',
        paragraphs: [
          'Browse Twin Falls County local movers, then compare interstate carriers on our city destination hub with cost tables and prefilled calculator links.',
        ],
      },
    ],
    checklist: [
      'Create inventory with our moving calculator',
      'Verify carrier USDOT/MC numbers',
      'Compare 2–3 written binding estimates',
      'Review FMCSA complaint ratios before booking',
    ],
    relatedLinks: [
      { title: 'Twin Falls destination hub', href: '/moving-to/idaho/twin-falls-id', description: 'Costs, movers, calculator' },
      { title: 'Twin Falls County local movers', href: '/local-movers/idaho/twin-falls', description: 'County directory' },
      { title: 'Idaho destination cluster', href: '/moving-to/idaho', description: 'Boise, Idaho Falls, and more' },
      { title: 'Interstate moving costs', href: '/resources/interstate-moving-costs', description: '2026 average price ranges' },
    ],
  },
];

export function getDestinationGuide(slug: string): DestinationGuide | undefined {
  return destinationGuides.find((guide) => guide.slug === slug);
}