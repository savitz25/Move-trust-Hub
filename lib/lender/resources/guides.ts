export type LenderGuideCategory = 'Buying Guide' | 'Regulation' | 'Planning';

export type LenderGuideEntry = {
  slug: string;
  title: string;
  excerpt: string;
  category: LenderGuideCategory;
  href: string;
  readTime: string;
  updatedAt: string;
};

export const lenderGuides: LenderGuideEntry[] = [
  {
    slug: 'how-to-choose-mortgage-lender',
    title:
      'How to Choose the Right Mortgage Lender in 2026: Key Factors, Red Flags & Comparison Tips',
    excerpt:
      'Essential evaluation criteria, NMLS verification steps, red flags to avoid, and proven comparison strategies for securing optimal rates and service.',
    category: 'Buying Guide',
    href: '/lender/resources/how-to-choose-mortgage-lender',
    readTime: '12 min read',
    updatedAt: 'July 2026',
  },
  {
    slug: 'fixed-vs-adjustable-rate-mortgages',
    title:
      'Fixed-Rate vs. Adjustable-Rate Mortgages in 2026: Pros, Cons, Break-Even Analysis, and When to Choose Each',
    excerpt:
      'Compare fixed-rate and ARM options for 2026: pros, cons, break-even math, rate risk, and when each loan type fits your timeline and risk tolerance.',
    category: 'Planning',
    href: '/lender/resources/fixed-vs-adjustable-rate-mortgages',
    readTime: '12 min read',
    updatedAt: 'July 2026',
  },
];

export function getLenderGuide(slug: string) {
  return lenderGuides.find((g) => g.slug === slug);
}

export const lenderGuidesByCategory = lenderGuides.reduce<Record<string, LenderGuideEntry[]>>(
  (acc, guide) => {
    if (!acc[guide.category]) acc[guide.category] = [];
    acc[guide.category].push(guide);
    return acc;
  },
  {}
);