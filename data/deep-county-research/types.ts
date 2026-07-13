import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type DeepCountyFaqItem = {
  question: string;
  answer: string;
};

export type DeepCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
  faqExtras?: DeepCountyFaqItem[];
};