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