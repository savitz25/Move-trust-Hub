export type GuideCategory =
  | 'Planning'
  | 'Buying Guide'
  | 'Safety'
  | 'Checklist'
  | 'Regulation'
  | 'Routes';

export type GuideEntry = {
  slug: string;
  title: string;
  excerpt: string;
  category: GuideCategory;
  href: string;
  related: string[];
};

export const guides: GuideEntry[] = [
  {
    slug: 'move-size-weight',
    title: 'Why Knowing the Size and Weight of Your Move Matters',
    excerpt: 'Stop guessing your move size. Learn why accurate cubic footage protects you from lowball quotes and inflated prices.',
    category: 'Planning',
    href: '/resources/move-size-weight',
    related: ['interstate-moving-costs', 'how-to-choose', 'packing-checklist', 'routes'],
  },
  {
    slug: 'interstate-moving-costs',
    title: 'Interstate Moving Costs 2026: Average Prices & Savings Tips',
    excerpt:
      '2026 average prices by home size and distance, key cost drivers, and proven strategies to save without sacrificing quality.',
    category: 'Planning',
    href: '/resources/interstate-moving-costs',
    related: ['best-time-to-move', 'move-size-weight', 'how-to-choose', 'carrier-vs-broker', 'routes', 'checklist'],
  },
  {
    slug: 'best-time-to-move',
    title: 'Best Time to Move Interstate in 2026: Seasonal Pricing & Tips',
    excerpt:
      'Peak vs off-peak months, weather risks, school schedules, and strategies to secure lower rates and better crew availability.',
    category: 'Planning',
    href: '/resources/best-time-to-move',
    related: ['interstate-moving-costs', 'move-size-weight', 'routes', 'how-to-choose', 'checklist'],
  },
  {
    slug: 'how-to-choose',
    title: 'How to Choose an Interstate Mover in 2026',
    excerpt: 'A step-by-step framework using reputation scores, licensing verification, and quote evaluation.',
    category: 'Buying Guide',
    href: '/resources/how-to-choose',
    related: ['carrier-vs-broker', 'fmcsa', 'interstate-moving-insurance', 'scams', 'move-size-weight', 'routes'],
  },
  {
    slug: 'carrier-vs-broker',
    title: 'Carrier vs Broker vs Carrier-Broker: Key Differences',
    excerpt:
      'Understand FMCSA authority types, costs, risks, and accountability before booking your interstate move.',
    category: 'Buying Guide',
    href: '/resources/carrier-vs-broker',
    related: ['how-to-choose', 'fmcsa', 'scams', 'move-size-weight', 'routes'],
  },
  {
    slug: 'scams',
    title: '8 Red Flags of Interstate Moving Scams',
    excerpt: 'Protect yourself from rogue brokers, bait-and-switch operators, and hostage-load tactics.',
    category: 'Safety',
    href: '/resources/scams',
    related: ['fmcsa', 'how-to-choose', 'checklist'],
  },
  {
    slug: 'fmcsa',
    title: 'Understanding FMCSA Safety Ratings & Complaint Data',
    excerpt: 'What USDOT numbers, safety ratings, and complaint ratios mean when choosing a long-distance mover.',
    category: 'Regulation',
    href: '/resources/fmcsa',
    related: [
      'bill-of-lading-shipper-rights',
      'interstate-moving-insurance',
      'how-to-choose',
      'scams',
      'routes',
    ],
  },
  {
    slug: 'interstate-moving-insurance',
    title:
      'Interstate Moving Insurance Explained: Valuation Options, Coverage Limits & What to Choose in 2026',
    excerpt:
      'Compare FMCSA Released Value vs. Full Value Protection, coverage limits, costs, third-party options, and how to choose the right level for your belongings.',
    category: 'Regulation',
    href: '/resources/interstate-moving-insurance',
    related: [
      'bill-of-lading-shipper-rights',
      'fmcsa',
      'how-to-choose',
      'carrier-vs-broker',
      'interstate-moving-costs',
      'checklist',
    ],
  },
  {
    slug: 'bill-of-lading-shipper-rights',
    title:
      'Understanding Your Bill of Lading and Shipper Rights in Long-Distance Moves',
    excerpt:
      'What your interstate Bill of Lading really means: key sections, FMCSA shipper rights, valuation, delivery windows, and how to protect yourself before you sign.',
    category: 'Regulation',
    href: '/resources/bill-of-lading-shipper-rights',
    related: [
      'interstate-moving-insurance',
      'fmcsa',
      'how-to-choose',
      'scams',
      'checklist',
      'carrier-vs-broker',
    ],
  },
  {
    slug: 'checklist',
    title: 'Complete Interstate Moving Checklist',
    excerpt: 'Timeline from 8 weeks out through delivery day and post-move tasks.',
    category: 'Checklist',
    href: '/resources/checklist',
    related: ['packing-checklist', 'how-to-choose', 'move-size-weight'],
  },
  {
    slug: 'packing-checklist',
    title: 'Room-by-Room Packing Checklist for Long-Distance Moves',
    excerpt: 'What to pack first, supplies you need, fragile-item tips, and how to label boxes for interstate delivery.',
    category: 'Checklist',
    href: '/resources/packing-checklist',
    related: ['checklist', 'move-size-weight', 'how-to-choose'],
  },
  {
    slug: 'routes',
    title: 'Popular Interstate Moving Routes & Planning Guides',
    excerpt: 'Distance, timing, pricing factors, and mover research tips for the most common long-distance corridors.',
    category: 'Routes',
    href: '/resources/routes',
    related: ['how-to-choose', 'move-size-weight', 'fmcsa'],
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}

export function getRelatedGuides(slugs: string[]) {
  return slugs
    .map((slug) => guides.find((g) => g.slug === slug))
    .filter((g): g is GuideEntry => Boolean(g));
}

export const guidesByCategory = guides.reduce<Record<string, GuideEntry[]>>((acc, guide) => {
  if (!acc[guide.category]) acc[guide.category] = [];
  acc[guide.category].push(guide);
  return acc;
}, {});