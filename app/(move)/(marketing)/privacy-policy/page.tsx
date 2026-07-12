import { LegalDocument } from '@/components/legal/legal-document';
import { buildResourceMetadata } from '@/lib/seo/resource-metadata';

export const metadata = buildResourceMetadata(
  '/privacy-policy',
  'Privacy Policy — Move Trust Hub',
  'How Move Trust Hub collects, uses, stores, and protects personal information from contact forms, reviews, and site usage. Learn how to request data deletion.'
);

const LAST_UPDATED = 'July 12, 2026';

const sections = [
  {
    id: 'overview',
    title: 'Overview',
    paragraphs: [
      'Move Trust Hub ("we," "us," or "our") operates movetrusthub.com, an independent research directory for interstate moving companies. This Privacy Policy explains what personal information we collect, how we use it, who we share it with, and your choices.',
      'By using our website, leaving a review, or contacting us, you agree to this policy. If you do not agree, please do not use our services.',
    ],
  },
  {
    id: 'information-we-collect',
    title: 'Information we collect',
    paragraphs: ['We collect information you provide directly and limited technical data automatically:'],
    list: [
      'Review submissions: reviewer name, email (kept private), rating, review text, optional photos, optional move date, and carrier DOT/MC number.',
      'Contact form: name, email, subject, and message content.',
      'Save My Move (optional accounts): email address only, saved moving inventories, saved mover shortlists with private notes, saved comparisons, and email preference settings. Accounts are passwordless (Google sign-in or one-time email link).',
      'DOT verification searches: carrier number searched, timestamp, source page, and anonymized IP address for abuse prevention.',
      'Technical data: browser type, pages visited, and referral source via standard analytics (when enabled).',
    ],
  },
  {
    id: 'how-we-use',
    title: 'How we use your information',
    paragraphs: ['We use personal information to:'],
    list: [
      'Moderate and publish customer reviews when approved.',
      'Respond to contact inquiries, data corrections, and privacy requests.',
      'Store and sync your saved inventories and mover shortlists when you choose to use Save My Move.',
      'Send transactional emails you request (sign-in links, inventory copies, requested documents). Marketing emails are off by default.',
      'Prevent spam, fraud, and abuse (rate limiting, duplicate review detection).',
      'Improve our directory, tools, and website performance.',
      'Comply with legal obligations.',
    ],
  },
  {
    id: 'sharing',
    title: 'How we share information',
    paragraphs: [
      'We do not sell your personal information or share it with moving companies for lead generation. We may share data with:',
    ],
    list: [
      'Service providers: Supabase (database hosting), Resend (transactional email), Vercel (hosting), and Brevo (optional CRM sync) — only as needed to operate the service.',
      'Legal requirements: when required by law, court order, or to protect rights and safety.',
    ],
  },
  {
    id: 'retention',
    title: 'Data retention',
    paragraphs: [
      'Review submissions are retained for moderation and display (approved reviews are published; rejected reviews are not shown publicly). Contact messages are retained as long as needed to resolve your inquiry.',
      'Save My Move data is retained until you delete individual items or delete your account from the My Move dashboard. Account deletion permanently removes your email, saved inventories, mover shortlists, comparisons, and preferences.',
      'You may request deletion of your personal data at any time (see "Your rights" below).',
    ],
  },
  {
    id: 'security',
    title: 'Security',
    paragraphs: [
      'We use industry-standard measures including HTTPS encryption, access controls, and Row Level Security on our database. No method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.',
    ],
  },
  {
    id: 'your-rights',
    title: 'Your rights',
    paragraphs: [
      'Depending on your location, you may have the right to access, correct, delete, or export your personal data, and to opt out of certain processing. To exercise these rights:',
    ],
    list: [
      'Email hello@movetrusthub.com with subject "Privacy Request".',
      'Use our contact form and select "Privacy / data deletion request".',
      'Include enough detail for us to locate your records (email used on submission).',
    ],
  },
  {
    id: 'children',
    title: "Children's privacy",
    paragraphs: [
      'Our services are not directed to children under 13. We do not knowingly collect personal information from children. Contact us if you believe we have collected a child\'s information.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    paragraphs: [
      'We may update this Privacy Policy from time to time. The "Last updated" date at the top reflects the latest revision. Continued use of the site after changes constitutes acceptance of the updated policy.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact us',
    paragraphs: [
      'For privacy questions or data requests, contact us at hello@movetrusthub.com or via our contact page at movetrusthub.com/contact.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      subtitle="How Move Trust Hub handles personal information collected through reviews, contact forms, and site tools."
      lastUpdated={LAST_UPDATED}
      sections={sections}
    />
  );
}