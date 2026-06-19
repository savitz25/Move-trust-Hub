export const trustStats = {
  verifiedMovers: 25,
  totalReviews: 52400,
  averageRating: 4.3,
  fmcsaVerified: 22,
};

export const trustBadges = [
  {
    id: 'fmcsa',
    label: 'FMCSA Data Verified',
    description: 'USDOT & MC licensing checked',
    href: '/resources/fmcsa',
    externalHref: 'https://www.fmcsa.dot.gov/',
  },
  {
    id: 'licensed',
    label: '25+ Licensed Movers',
    description: 'Interstate carriers in directory',
    href: '/companies',
  },
  {
    id: 'reviews',
    label: '52k+ Real Reviews',
    description: 'Google, BBB & Trustpilot',
    href: '/companies?sort=reputation',
  },
  {
    id: 'rating',
    label: '4.3★ Avg Rating',
    description: 'Across listed companies',
    href: '/companies?sort=rating',
  },
  {
    id: 'independent',
    label: 'Independent Directory',
    description: 'Not affiliated with movers',
    href: '/about#disclaimer',
  },
] as const;

export const reviewHighlights = [
  {
    companyName: 'Amerisafe Van Lines',
    slug: 'amerisafe-van-lines',
    rating: 4.7,
    reviewCount: 1650,
    reputationScore: 97,
    highlight: 'Top reputation score with strong FMCSA standing and consistently high customer ratings.',
    source: 'Google & Verified Customer',
  },
  {
    companyName: 'JK Moving Services',
    slug: 'jk-moving-services',
    rating: 4.7,
    reviewCount: 3120,
    reputationScore: 93,
    highlight: 'One of the most-reviewed interstate movers in our directory with thousands of verified feedback.',
    source: 'Google',
  },
  {
    companyName: 'Pensey Moving & Storage',
    slug: 'pensey-moving',
    rating: 4.8,
    reviewCount: 940,
    reputationScore: 94,
    highlight: 'Excellent customer satisfaction scores and transparent long-distance pricing patterns.',
    source: 'Google & Trustpilot',
  },
] as const;

export const testimonials = [
  {
    quote:
      'We used the calculator and comparison tool to choose between 4 movers. Saved over $2,800 and the move went perfectly.',
    name: 'Sarah & Michael T.',
    location: 'Moved from VA to TX',
    rating: 5,
    toolsUsed: ['moving-calculator', 'compare'] as const,
  },
  {
    quote:
      'Got quotes from 5 different companies in less than a day. The reviews and FMCSA data on this site gave us total peace of mind.',
    name: 'The Ramirez Family',
    location: 'Moved from CA to FL',
    rating: 5,
    toolsUsed: ['companies', 'fmcsa'] as const,
  },
  {
    quote:
      'The reputation scores helped us avoid a broker with a high complaint ratio. We booked a carrier with a Satisfactory FMCSA rating instead.',
    name: 'David L.',
    location: 'Moved from TX to CA',
    rating: 5,
    toolsUsed: ['companies', 'fmcsa'] as const,
  },
  {
    quote:
      'Building our inventory first meant every quote was based on the same cubic footage. No more guessing or surprise charges.',
    name: 'Jennifer M.',
    location: 'Moved from FL to NY',
    rating: 5,
    toolsUsed: ['moving-calculator'] as const,
  },
] as const;

export const toolLinks = {
  'moving-calculator': { label: 'Moving Calculator', href: '/moving-calculator' },
  compare: { label: 'Compare Tool', href: '/compare' },
  companies: { label: 'Mover Directory', href: '/companies' },
  fmcsa: { label: 'FMCSA Guide', href: '/resources/fmcsa' },
} as const;