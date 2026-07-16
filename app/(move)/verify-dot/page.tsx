import Link from 'next/link';
import { Suspense } from 'react';
import { Badge } from '@/components/ui/badge';
import { DotVerifier } from '@/components/verify-dot/dot-verifier';
import { PageHeroCta } from '@/components/conversion/page-hero-cta';
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
        <div className="container mx-auto px-4 py-12 sm:py-16 max-w-3xl">
          <Badge variant="outline" className="mb-4">
            FREE TOOL · OFFICIAL FMCSA LINK
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
            Verify a Moving Company
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Check any interstate mover before you sign — search by{' '}
            <strong>USDOT</strong> or <strong>MC number</strong>, or by{' '}
            <strong>company name and state</strong>. We pull structured FMCSA data
            and link you to the official SAFER Company Snapshot, even if the
            company isn&apos;t in our directory yet.
          </p>
          <div className="mt-6">
            <PageHeroCta showTrustBadges={false} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 sm:py-14 max-w-3xl">
        <Suspense
          fallback={
            <div className="h-64 rounded-xl border bg-muted/30 animate-pulse" aria-hidden="true" />
          }
        >
          <DotVerifier sourcePage="/verify-dot" />
        </Suspense>

        <section className="mt-12 prose prose-neutral max-w-none">
          <h2>Why verify before you book</h2>
          <p>
            Rogue brokers and unlicensed operators are a leading cause of moving
            scams. A legitimate interstate household goods carrier must be
            registered with FMCSA. If a company refuses to share a USDOT number,
            or the number doesn&apos;t match the legal name on your estimate,
            walk away.
          </p>
          <p>
            Read our{' '}
            <Link href="/resources/fmcsa">FMCSA safety ratings guide</Link> and{' '}
            <Link href="/resources/scams">moving scam red flags</Link> for what
            to look for on the official report. After verifying, you can{' '}
            <Link href="/review">leave a moderated review</Link> to help other families.
          </p>
        </section>

        <div className="mt-12">
          <FaqSection
            title="DOT Verification FAQ"
            items={verifyDotFaqItems}
          />
        </div>

        <section className="mt-12 rounded-2xl border bg-muted/30 p-6 sm:p-8 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            Verified the carrier? Compare movers next.
          </h2>
          <p className="mt-2 text-muted-foreground max-w-lg mx-auto">
            Browse FMCSA-licensed interstate movers with attributable reviews in
            our independent directory — no lead fees, no paid placements.
          </p>
          <div className="mt-6 flex justify-center">
            <PageHeroCta showTrustBadges className="justify-center" />
          </div>
        </section>
      </div>
    </>
  );
}