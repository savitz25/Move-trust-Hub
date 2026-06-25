export interface MarketCostRanges {
  studio: string;
  twoBR: string;
  threeBR: string;
  fourBR: string;
}

export interface Market {
  slug: string;
  displayName: string;
  stateCode: string;
  stateName: string;
  /** Keys like `horry-sc`, `brunswick-nc` */
  primaryCounties: string[];
  lat: number;
  lng: number;
  defaultToZip: string;
  topInboundOrigins: string[];
  avgCostRanges: MarketCostRanges;
  inboundGrowthStat: string;
  peakSeasonNote: string;
  /** Parent cluster slug when this is a sub-city (e.g. `florida`) */
  clusterParent?: string;
  /** True for `/moving-to/florida` style hub index pages */
  isClusterParent?: boolean;
  /** 1–12 for nav ordering and quote attribution */
  priority: number;
  mapDescription?: string;
}

export type DestinationRouteLink = {
  label: string;
  href: string;
  miles?: string;
};

export type DestinationResourceLink = {
  title: string;
  description: string;
  href: string;
};

export type DestinationTestimonial = {
  quote: string;
  name: string;
  detail: string;
};

export type DestinationFaqItem = {
  question: string;
  answer: string;
};

export type DestinationInsightCard = {
  title: string;
  body: string;
};

export type CityHubSeo = {
  title: string;
  description: string;
  keywords: string[];
  canonicalPath: string;
  ogImagePath: string;
  ogImageAlt: string;
};

export type CityHubContent = {
  marketSlug: string;
  h1: string;
  seo: CityHubSeo;
  heroSubheadline: string;
  introParagraphs: string[];
  routeLinks: DestinationRouteLink[];
  costTableRows: {
    homeSize: string;
    cubicFt: string;
    costRange: string;
    transitDays: string;
  }[];
  costTableNote: string;
  insightCards: DestinationInsightCard[];
  bodySections: { heading: string; paragraphs: string[] }[];
  resourceLinks: DestinationResourceLink[];
  testimonials: DestinationTestimonial[];
  faqItems: DestinationFaqItem[];
  featuredInterstateSlugs: string[];
  bestMoversPath: string;
};