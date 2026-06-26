export type RouteGuide = {
  slug: string;
  title: string;
  from: string;
  to: string;
  fromState: string;
  toState: string;
  distance: string;
  driveTime: string;
  avgCostRange: string;
  peakSeason: string;
  deliveryWindow: string;
  description: string;
  planningTips: string[];
  costFactors: string[];
  popularCorridors: string[];
  relatedRoutes: string[];
  /** Optional inbound destination hub for internal linking */
  destinationHubPath?: string;
};

export const routeGuides: RouteGuide[] = [
  {
    slug: 'california-to-texas',
    title: 'Moving from California to Texas',
    from: 'California',
    to: 'Texas',
    fromState: 'CA',
    toState: 'TX',
    distance: '~1,400–1,800 miles',
    driveTime: '20–28 hours transit',
    avgCostRange: '$3,500–$8,500+ (varies by home size)',
    peakSeason: 'May–September and year-end corporate relocations',
    deliveryWindow: '3–10 days typical for full-service interstate loads',
    description:
      'California to Texas is one of the busiest interstate corridors in the U.S., driven by housing costs, job transfers, and business relocations. Pricing depends heavily on cubic footage, pickup access, and whether your shipment shares truck space.',
    planningTips: [
      'Build your inventory with our moving calculator before requesting quotes — CA to TX price swings are often volume-driven.',
      'Compare at least three FMCSA-licensed carriers, not just brokers.',
      'Ask about delivery spread dates; Texas inbound volume can widen windows in summer.',
      'If moving from Southern California, confirm parking and elevator access for large trucks.',
    ],
    costFactors: [
      'Total cubic feet and weight',
      'Stairs, long carries, or shuttle truck requirements',
      'Peak season demand (summer)',
      'Packing services and specialty items (pianos, safes)',
      'Storage-in-transit if closing dates do not align',
    ],
    popularCorridors: [
      'Los Angeles → Dallas–Fort Worth',
      'San Francisco Bay Area → Austin',
      'San Diego → Houston',
    ],
    relatedRoutes: ['texas-to-california', 'california-to-new-york', 'east-coast-to-west-coast'],
  },
  {
    slug: 'new-york-to-florida',
    title: 'Moving from New York to Florida',
    from: 'New York',
    to: 'Florida',
    fromState: 'NY',
    toState: 'FL',
    distance: '~1,100–1,300 miles',
    driveTime: '18–24 hours transit',
    avgCostRange: '$3,200–$7,500+ (varies by home size)',
    peakSeason: 'October–April (snowbird season)',
    deliveryWindow: '2–8 days for most household shipments',
    description:
      'The New York to Florida route sees heavy seasonal demand from retirees, remote workers, and families seeking lower costs of living. Winter months often bring tighter schedules and higher prices southbound.',
    planningTips: [
      'Book early if moving between November and March — snowbird demand spikes.',
      'Verify whether your quote is binding or non-binding after an inventory survey.',
      'Read our scam avoidance guide before paying large deposits.',
      'Confirm hurricane-season delivery contingencies if moving June through November.',
    ],
    costFactors: [
      'Seasonal demand (winter southbound premium)',
      'High-rise pickup/delivery fees in NYC boroughs',
      'Shuttle requirements in gated Florida communities',
      'Fuel surcharges and linehaul minimums',
      'Full-packing vs. self-pack options',
    ],
    popularCorridors: [
      'New York City → Miami',
      'Long Island → Tampa Bay',
      'Westchester → Orlando',
    ],
    relatedRoutes: ['florida-to-new-york', 'california-to-new-york', 'california-to-texas'],
    destinationHubPath: '/moving-to/florida',
  },
  {
    slug: 'california-to-new-york',
    title: 'Moving from California to New York',
    from: 'California',
    to: 'New York',
    fromState: 'CA',
    toState: 'NY',
    distance: '~2,700–2,900 miles',
    driveTime: '5–8 days transit',
    avgCostRange: '$5,500–$12,000+ (varies by home size)',
    peakSeason: 'May–September and summer lease turnover',
    deliveryWindow: '5–14 days typical',
    description:
      'Coast-to-coast moves from California to New York are among the longest and most complex residential relocations. Accurate volume estimates matter because small inventory errors can change pricing dramatically on cross-country linehaul.',
    planningTips: [
      'Use room-by-room inventory — coast-to-coast moves are unforgiving of guesswork.',
      'Ask carriers about storage if your NYC lease start date is uncertain.',
      'Compare enclosed vs. standard handling for high-value furniture.',
      'Review FMCSA complaint ratios for carriers offering unusually low bids.',
    ],
    costFactors: [
      'Long-distance linehaul mileage',
      'Volume/weight (most important variable)',
      'NYC access constraints (permits, parking, walk-ups)',
      'Summer peak pricing',
      'Specialty crating and packing',
    ],
    popularCorridors: [
      'Los Angeles → New York City',
      'Bay Area → Brooklyn/Queens',
      'San Diego → Upstate New York',
    ],
    relatedRoutes: ['california-to-new-york', 'east-coast-to-west-coast', 'california-to-texas'],
  },
  {
    slug: 'florida-to-new-york',
    title: 'Moving from Florida to New York',
    from: 'Florida',
    to: 'New York',
    fromState: 'FL',
    toState: 'NY',
    distance: '~1,100–1,300 miles',
    driveTime: '18–24 hours transit',
    avgCostRange: '$3,000–$7,000+ (varies by home size)',
    peakSeason: 'April–June (northbound snowbird returns)',
    deliveryWindow: '2–8 days for most shipments',
    description:
      'Florida to New York moves often spike in late spring as seasonal residents return north. Carriers may offer better flexibility in off-peak months, but NYC delivery logistics still require careful planning.',
    planningTips: [
      'Schedule northbound moves early spring if possible for better date flexibility.',
      'Confirm elevator and COI requirements for NYC buildings in advance.',
      'Document item condition with photos before load-out in Florida humidity.',
      'Cross-check quotes using the same inventory list for every bidder.',
    ],
    costFactors: [
      'Northbound seasonal demand in spring',
      'NYC building access and parking permits',
      'Humidity-sensitive packing needs',
      'Shuttle or long-carry fees',
      'Insurance/valuation coverage level',
    ],
    popularCorridors: [
      'Miami → New York City',
      'Tampa → New Jersey',
      'Orlando → Connecticut',
    ],
    relatedRoutes: ['new-york-to-florida', 'california-to-new-york', 'east-coast-to-west-coast'],
  },
  {
    slug: 'texas-to-california',
    title: 'Moving from Texas to California',
    from: 'Texas',
    to: 'California',
    fromState: 'TX',
    toState: 'CA',
    distance: '~1,400–1,800 miles',
    driveTime: '20–28 hours transit',
    avgCostRange: '$3,500–$8,500+ (varies by home size)',
    peakSeason: 'May–September and tech-sector hiring cycles',
    deliveryWindow: '3–10 days typical',
    description:
      'Texas to California relocations are common for career moves into tech, entertainment, and coastal markets. California delivery can involve stricter access rules and higher labor costs at destination.',
    planningTips: [
      'Estimate volume before comparing quotes — TX→CA bids vary widely on weight.',
      'Ask about California fuel and labor surcharges in writing.',
      'If moving to the Bay Area or LA, confirm parking permits early.',
      'Use our compare tool to evaluate reputation and complaint history side-by-side.',
    ],
    costFactors: [
      'Shipment size and density',
      'Destination access in dense CA metros',
      'Summer peak demand',
      'Packing and unpacking services',
      'Storage delays between closing dates',
    ],
    popularCorridors: [
      'Austin → San Francisco Bay Area',
      'Dallas → Los Angeles',
      'Houston → San Diego',
    ],
    relatedRoutes: ['california-to-texas', 'california-to-new-york', 'east-coast-to-west-coast'],
  },
  {
    slug: 'east-coast-to-west-coast',
    title: 'Moving from the East Coast to the West Coast',
    from: 'East Coast',
    to: 'West Coast',
    fromState: 'Multi-state',
    toState: 'Multi-state',
    distance: '~2,500–3,000 miles',
    driveTime: '5–10 days transit',
    avgCostRange: '$5,000–$12,000+ (varies by home size)',
    peakSeason: 'May–September',
    deliveryWindow: '5–14 days typical',
    description:
      'Cross-country moves from the Eastern Seaboard to the Pacific Coast are long-haul shipments that demand precise inventory, clear delivery windows, and careful carrier vetting. This guide covers planning principles for any east-to-west corridor.',
    planningTips: [
      'Treat inventory accuracy as non-negotiable on 2,500+ mile moves.',
      'Prefer carriers with strong cross-country experience, not just local agents.',
      'Plan for multi-day delivery spreads and keep essentials in a go-bag.',
      'Read our how-to-choose guide before signing any interstate contract.',
    ],
    costFactors: [
      'Linehaul distance and weight',
      'Origin/destination metro complexity',
      'Seasonal truck capacity',
      'Full-service packing levels',
      'Storage and delayed delivery options',
    ],
    popularCorridors: [
      'Boston/Washington DC → Los Angeles',
      'Atlanta → Seattle',
      'Charlotte → Portland',
    ],
    relatedRoutes: ['california-to-new-york', 'california-to-texas', 'new-york-to-florida'],
  },
  {
    slug: 'new-york-to-myrtle-beach',
    title: 'Moving from New York to Myrtle Beach',
    from: 'New York',
    to: 'Myrtle Beach, SC',
    fromState: 'NY',
    toState: 'SC',
    distance: '~680 miles',
    driveTime: '11–14 hours transit',
    avgCostRange: '$3,200–$7,800+ (varies by home size)',
    peakSeason: 'May–September (Grand Strand peak)',
    deliveryWindow: '2–7 days for most household shipments',
    description:
      'New York to Myrtle Beach is a high-volume Northeast-to-Grand Strand corridor popular with retirees and remote workers. Pricing depends on NYC borough access, inventory volume, and summer seasonal demand along the I-95 corridor.',
    planningTips: [
      'Build your inventory with our moving calculator — NYC high-rise pickups often need elevator and parking permits.',
      'Book early for May–September; Grand Strand demand tightens crew availability.',
      'Verify binding vs. non-binding estimates after a full inventory survey.',
      'Confirm HOA/condo move-in rules at your Myrtle Beach or North Myrtle Beach destination.',
      'Browse our Myrtle Beach destination hub for county-level local movers and cost tables.',
    ],
    costFactors: [
      'Borough high-rise pickup fees and shuttle requirements',
      'Total cubic feet and weight',
      'Summer peak-season demand',
      'Packing services and specialty items',
      'Gated-community long carries in Horry County',
    ],
    popularCorridors: [
      'Manhattan → Myrtle Beach',
      'Long Island → North Myrtle Beach',
      'Westchester → Conway / Surfside Beach',
    ],
    relatedRoutes: ['new-york-to-florida', 'florida-to-new-york', 'east-coast-to-west-coast'],
    destinationHubPath: '/moving-to/south-carolina',
  },
];

export function getRouteGuide(slug: string) {
  return routeGuides.find((r) => r.slug === slug);
}