import { LegalDocument } from '@/components/legal/legal-document';
import { buildResourceMetadata } from '@/lib/seo/resource-metadata';

export const metadata = buildResourceMetadata(
  '/terms-of-service',
  'Terms of Service — Move Trust Hub',
  'Terms governing use of Move Trust Hub directories, calculators, DOT verification, reviews, and informational content. Independent directory — not a moving company or broker.'
);

const LAST_UPDATED = 'June 29, 2026';

const sections = [
  {
    id: 'acceptance',
    title: 'Acceptance of terms',
    paragraphs: [
      'By accessing or using movetrusthub.com ("the Site"), you agree to these Terms of Service. If you do not agree, do not use the Site. We may update these terms; continued use after changes constitutes acceptance.',
    ],
  },
  {
    id: 'about-service',
    title: 'About our service',
    paragraphs: [
      'Move Trust Hub is an independent informational directory and research directory platform. We are not a moving company, broker, or carrier. We do not transport goods, take deposits, or execute move contracts on your behalf.',
      'Company listings, ratings, and editorial content are provided for research purposes. We are not affiliated with, endorsed by, or partners of the companies listed unless explicitly stated.',
    ],
  },
  {
    id: 'directory-tools',
    title: 'Directory and tools',
    paragraphs: [
      'Move Trust Hub provides free research tools — including a moving calculator, mover directory, and comparison features — for informational purposes only. We do not sell leads, broker moves, or guarantee pricing or availability from listed companies.',
      'You are responsible for verifying each carrier\'s licensing, insurance, and contract terms before booking. Contact movers directly or use our contact form for general site inquiries.',
    ],
  },
  {
    id: 'reviews',
    title: 'Reviews and user content',
    paragraphs: [
      'When you submit a review, you represent that it reflects your genuine experience. Reviews are moderated before publication. We may reject content that is spam, defamatory, off-topic, or violates our policies.',
      'By submitting a review, you grant Move Trust Hub a non-exclusive license to display, store, and distribute your submission on the Site. Your email address is never published.',
    ],
  },
  {
    id: 'prohibited',
    title: 'Prohibited conduct',
    paragraphs: ['You agree not to:'],
    list: [
      'Submit false, misleading, or fraudulent information.',
      'Attempt to scrape, overload, or disrupt the Site.',
      'Use automated tools to submit spam reviews or contact messages.',
      'Misrepresent your affiliation with Move Trust Hub or listed companies.',
      'Violate applicable laws or third-party rights.',
    ],
  },
  {
    id: 'disclaimers',
    title: 'Disclaimers',
    paragraphs: [
      'THE SITE AND ALL CONTENT ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. We do not warrant that directory data, FMCSA information, reviews, or cost estimates are complete, current, or error-free.',
      'Licensing status, safety ratings, and complaint data can change. Always verify directly with FMCSA and state authorities before signing a contract.',
    ],
  },
  {
    id: 'liability',
    title: 'Limitation of liability',
    paragraphs: [
      'To the fullest extent permitted by law, Move Trust Hub and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Site, mover research, or reliance on directory information.',
      'Our total liability for any claim shall not exceed the amount you paid us (typically $0) in the twelve months preceding the claim.',
    ],
  },
  {
    id: 'indemnification',
    title: 'Indemnification',
    paragraphs: [
      'You agree to indemnify and hold harmless Move Trust Hub from claims arising from your use of the Site, your submitted content, or your violation of these terms.',
    ],
  },
  {
    id: 'governing-law',
    title: 'Governing law',
    paragraphs: [
      'These terms are governed by the laws of the United States and the state in which Move Trust Hub operates, without regard to conflict-of-law principles. Disputes shall be resolved in the appropriate courts of that jurisdiction.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    paragraphs: [
      'Questions about these terms: hello@movetrusthub.com or movetrusthub.com/contact.',
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalDocument
      title="Terms of Service"
      subtitle="Rules for using Move Trust Hub directories, quote tools, DOT verification, reviews, and related services."
      lastUpdated={LAST_UPDATED}
      sections={sections}
    />
  );
}