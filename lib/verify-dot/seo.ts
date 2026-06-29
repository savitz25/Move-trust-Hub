import { SITE_URL } from '@/lib/seo/site-metadata';

export const VERIFY_DOT_TITLE =
  'Verify a DOT Number — Free FMCSA Mover License Lookup (2026)';
export const VERIFY_DOT_DESCRIPTION =
  'Instantly verify any moving company USDOT or MC number. We log your search and link you to the official FMCSA SAFER database for safety ratings, authority, and complaint history.';

export const VERIFY_DOT_CANONICAL = `${SITE_URL}/verify-dot`;

export const verifyDotFaqItems = [
  {
    question: 'What is a USDOT number?',
    answer:
      'A USDOT number is a unique identifier assigned by the U.S. Department of Transportation to commercial motor carriers. Interstate household goods movers must register with FMCSA and display a valid USDOT number.',
  },
  {
    question: 'What is an MC number?',
    answer:
      'An MC (Motor Carrier) number is FMCSA operating authority for for-hire interstate carriers. Many moving companies hold both a USDOT number and an MC docket number. You can search either on SAFER.',
  },
  {
    question: 'Is this an official FMCSA lookup?',
    answer:
      'Move Trust Hub is an independent directory. Our tool logs your search for analytics, may show a preview from public FMCSA data or our directory, and then links you to the official FMCSA SAFER Company Snapshot for authoritative records.',
  },
  {
    question: 'What if the company is not in your database?',
    answer:
      'You can still verify any carrier. We redirect you to FMCSA SAFER with your number pre-filled so you can review licensing, safety ratings, and insurance on the government site.',
  },
  {
    question: 'What should I look for on the FMCSA report?',
    answer:
      'Check that the carrier is authorized for household goods, review the safety rating (if available), out-of-service status, crash and inspection history, and whether the legal business name matches who gave you the quote.',
  },
];

export const verifyDotHowToSteps = [
  {
    name: 'Enter the USDOT or MC number',
    text: 'Type the number from the mover’s estimate, contract, or truck door. Formats like DOT 1234567 or MC-123456 work.',
  },
  {
    name: 'Review the preview (if available)',
    text: 'We may show basic carrier info from FMCSA public data or our verified directory before you leave the site.',
  },
  {
    name: 'Open the official FMCSA SAFER report',
    text: 'You are redirected to safer.fmcsa.dot.gov with your search pre-filled for the full government company snapshot.',
  },
  {
    name: 'Compare licensed movers on Move Trust Hub',
    text: 'After verifying, get free quotes from vetted interstate movers or explore city-level moving guides.',
  },
];

export const popularDestinationLinks = [
  { href: '/moving-to/south-carolina/myrtle-beach-sc', label: 'Myrtle Beach, SC' },
  { href: '/moving-to/florida/miami', label: 'Miami, FL' },
  { href: '/moving-to/tennessee/nashville-tn', label: 'Nashville, TN' },
  { href: '/moving-to/texas/austin-tx', label: 'Austin, TX' },
  { href: '/moving-to/north-carolina', label: 'North Carolina' },
  { href: '/moving-to/florida', label: 'Florida Corridor' },
];