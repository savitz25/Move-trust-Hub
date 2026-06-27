export type RouteCostTableRow = {
  homeSize: string;
  cubicFt: string;
  costRange: string;
  transitDays: string;
};

export type RouteDestinationCity = {
  name: string;
  hubPath: string;
  tagline: string;
  paragraphs: string[];
};

export type RouteFaqItem = {
  question: string;
  answer: string;
};

export type RouteHowToStep = {
  name: string;
  text: string;
};

export type RouteInternalLink = {
  label: string;
  href: string;
  description?: string;
};

export type RouteGuideExtendedContent = {
  slug: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  heroSubheadline: string;
  introParagraphs: string[];
  whyMove: {
    heading: string;
    paragraphs: string[];
    highlights: { title: string; body: string }[];
  };
  destinations: {
    heading: string;
    intro: string;
    cities: RouteDestinationCity[];
  };
  costBreakdown: {
    heading: string;
    paragraphs: string[];
    table: RouteCostTableRow[];
    note: string;
  };
  timeline: {
    heading: string;
    paragraphs: string[];
    phases: { label: string; detail: string }[];
    seasons: { period: string; note: string }[];
  };
  pickupTips: {
    heading: string;
    paragraphs: string[];
    tips: string[];
  };
  deliveryTips: {
    heading: string;
    paragraphs: string[];
    tips: string[];
  };
  carShipping: {
    heading: string;
    paragraphs: string[];
    tips: string[];
  };
  faqItems: RouteFaqItem[];
  howToSteps: RouteHowToStep[];
  internalLinks: RouteInternalLink[];
};