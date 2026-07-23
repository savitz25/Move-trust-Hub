/**
 * State Resource Hub content pack — master template for high-authority state landers.
 * California is the first full implementation; other states can register the same shape.
 */

export type StateHubIntent = {
  id: 'within' | 'to' | 'from';
  label: string;
  href: string;
  description: string;
};

export type StateHubSnapshotStat = {
  label: string;
  value: string;
  note?: string;
};

export type StateHubRegion = {
  id: string;
  name: string;
  shortName: string;
  blurb: string;
  countySlugs: string[];
};

export type StateHubRegulationBlock = {
  title: string;
  intro: string;
  interstate: { title: string; body: string };
  intrastate: { title: string; body: string };
  verifySteps: string[];
  protections: Array<{ title: string; detail: string }>;
  officialLinks: Array<{ label: string; href: string; external?: boolean }>;
};

export type StateHubCostRange = {
  label: string;
  value: string;
  note?: string;
};

export type StateHubRoute = {
  label: string;
  href?: string;
  note: string;
};

export type StateHubChallenge = {
  title: string;
  detail: string;
};

export type StateHubFaqItem = {
  question: string;
  answer: string;
};

export type StateResourceHubPack = {
  stateSlug: string;
  stateCode: string;
  /** SEO H1 */
  h1: string;
  /** Meta / document title override */
  metaTitle: string;
  metaDescription: string;
  heroSubhead: string;
  trustBar: string[];
  intents: StateHubIntent[];
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  snapshot: {
    title: string;
    methodology: string;
    stats: StateHubSnapshotStat[];
  };
  regulations: StateHubRegulationBlock;
  regions: StateHubRegion[];
  costs: {
    title: string;
    intro: string;
    ranges: StateHubCostRange[];
    factors: string[];
  };
  routes: {
    title: string;
    intro: string;
    outbound: StateHubRoute[];
    inbound?: StateHubRoute[];
  };
  challenges: {
    title: string;
    intro: string;
    items: StateHubChallenge[];
  };
  tools: Array<{ label: string; href: string; description: string }>;
  faq: StateHubFaqItem[];
  trust: {
    byline: string;
    lastReviewed: string; // ISO date
    methodology: string;
    independence: string;
  };
  stickyNav: Array<{ id: string; label: string }>;
};
