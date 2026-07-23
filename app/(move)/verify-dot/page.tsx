import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { DotVerifier } from '@/components/verify-dot/dot-verifier';
import { FaqSection } from '@/components/seo/faq-section';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildResourceMetadata } from '@/lib/seo/resource-metadata';
import {
  VERIFY_DOT_CANONICAL,
  VERIFY_DOT_DESCRIPTION,
  VERIFY_DOT_TITLE,
  verifyDotFaqItems,
  verifyDotHowToSteps,
} from '@/lib/verify-dot/seo';

export const metadata = buildResourceMetadata(
  '/verify-dot',
  VERIFY_DOT_TITLE,
  VERIFY_DOT_DESCRIPTION
);

const verifyDotSchemaGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': VERIFY_DOT_CANONICAL,
      name: VERIFY_DOT_TITLE,
      description: VERIFY_DOT_DESCRIPTION,
      url: VERIFY_DOT_CANONICAL,
      isPartOf: {
        '@type': 'WebSite',
        name: 'Move Trust Hub',
        url: 'https://www.movetrusthub.com',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.movetrusthub.com' },
        { '@type': 'ListItem', position: 2, name: 'Verify DOT Number', item: VERIFY_DOT_CANONICAL },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': `${VERIFY_DOT_CANONICAL}#howto`,
      name: 'How to verify a moving company DOT number',
      description: VERIFY_DOT_DESCRIPTION,
      step: verifyDotHowToSteps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.text,
      })),
    },
    {
      '@type': 'FAQPage',
      '@id': `${VERIFY_DOT_CANONICAL}#faq`,
      mainEntity: verifyDotFaqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ],
};

export default function VerifyDotPage() {
  return (
    <>
      <JsonLd data={verifyDotSchemaGraph} />

      <div className="border-b bg-gradient-to-br from-primary/8 via-background to-background">
        <div className="container mx-auto px-4 pt-8 pb-6 sm:pt-10 sm:pb-8 max-w-3xl">
          <Badge variant="outline" className="mb-3">
            FREE TOOL · OFFICIAL FMCSA LINK
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
            Verify a Moving Company
          </h1>
          <p className="mt-3 text-base text-muted-foreground leading-relaxed max-w-2xl">
            Search by <strong className="text-foreground">USDOT / MC number</strong> or by{' '}
            <strong className="text-foreground">company name + state</strong>. We show structured
            FMCSA data when available and always link you to the official SAFER Company Snapshot.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-3xl">
        {/* Form is the page hero — no Suspense empty shell */}
        <DotVerifier sourcePage="/verify-dot" />

        <section className="mt-12 prose prose-neutral max-w-none">
          <h2>Why verify before you book</h2>
          <p>
            Rogue brokers and unlicensed operators are a leading cause of moving scams. A
            legitimate interstate household goods carrier must be registered with FMCSA. If a
            company refuses to share a USDOT number, or the number doesn&apos;t match the legal
            name on your estimate, walk away.
          </p>
          <p>
            Read our <Link href="/resources/fmcsa">FMCSA safety ratings guide</Link> and{' '}
            <Link href="/resources/scams">moving scam red flags</Link> for what to look for on
            the official report. After verifying, you can{' '}
            <Link href="/review">leave a moderated review</Link> to help other families.
          </p>
          <p className="text-sm text-muted-foreground not-prose">
            This tool focuses on <strong className="text-foreground">interstate</strong> carriers
            (USDOT required). Local / in-state movers that never cross state lines can be added via{' '}
            <Link href="/suggest" className="text-primary underline underline-offset-2">
              Add Company
            </Link>
            .
          </p>
        </section>

        <div className="mt-12">
          <FaqSection title="DOT Verification FAQ" items={verifyDotFaqItems} />
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Ready to compare carriers?{' '}
          <Link href="/companies" className="font-medium text-primary underline underline-offset-2">
            Browse the mover directory
          </Link>
          .
        </p>
      </div>
    </>
  );
}
