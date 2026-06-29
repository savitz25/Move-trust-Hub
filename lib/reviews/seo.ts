import { SITE_URL } from '@/lib/seo/site-metadata';

export const REVIEW_PAGE_PATH = '/review';
export const REVIEW_PAGE_CANONICAL = `${SITE_URL}${REVIEW_PAGE_PATH}`;
export const REVIEW_PAGE_TITLE = 'Leave a Moving Company Review — DOT or MC Lookup';
export const REVIEW_PAGE_DESCRIPTION =
  'Share your interstate moving experience. Search any carrier by USDOT or MC number, submit a moderated review with photos, and help other families choose licensed movers.';

export const reviewFaqItems = [
  {
    question: 'Do I need an account to leave a review?',
    answer:
      'No account is required. Provide your name and email so we can verify your submission and contact you if moderation needs clarification. Your email is never published.',
  },
  {
    question: 'How long does moderation take?',
    answer:
      'Most reviews are reviewed within 1–3 business days. We check for spam, duplicates, and policy violations before publishing approved reviews.',
  },
  {
    question: 'What if the mover is not in your directory?',
    answer:
      'Enter their USDOT or MC number anyway. We automatically create a basic carrier record so your review can be linked and displayed on their profile page.',
  },
  {
    question: 'Can I upload photos?',
    answer:
      'Yes — up to three JPEG, PNG, or WebP images (2 MB each). Photos are optional and subject to the same moderation review as your written feedback.',
  },
];