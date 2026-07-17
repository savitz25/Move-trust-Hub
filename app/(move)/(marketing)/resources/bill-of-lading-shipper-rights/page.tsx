import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  FileText,
  HelpCircle,
  Scale,
  Shield,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArticleSchema } from '@/components/resources/article-schema';
import { GuideFooter } from '@/components/resources/guide-footer';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildResourceMetadata } from '@/lib/seo/resource-metadata';

const TITLE =
  'Understanding Your Bill of Lading and Shipper Rights in Long-Distance Moves';
const DESCRIPTION =
  'Learn what your Bill of Lading really means for an interstate move. Key terms, shipper rights, liability limits, and how to protect yourself under FMCSA rules in 2026. Use MoveTrustHub tools for transparent mover comparisons.';
const PATH = '/resources/bill-of-lading-shipper-rights';

const bolSections = [
  {
    title: 'Inventory and Condition',
    detail:
      'The carrier’s detailed list of items and their noted condition at pickup. Always walk through the inventory with the crew and note any pre-existing damage.',
  },
  {
    title: 'Valuation / Protection Option',
    detail:
      'Your chosen level of liability (Released Value at 60 cents per pound per article or Full Value Protection). This directly determines what you can recover if items are lost or damaged.',
  },
  {
    title: 'Estimated vs. Actual Charges',
    detail:
      'Binding vs. non-binding estimates and how charges can change (only for added items or services).',
  },
  {
    title: 'Delivery Window and Storage-in-Transit',
    detail:
      'The agreed delivery timeframe and rules for storage if delivery is delayed.',
  },
  {
    title: 'Payment Terms',
    detail:
      'When and how payment is due (usually upon delivery for interstate moves).',
  },
];

const bolContains = [
  'Detailed inventory of your belongings',
  'Agreed-upon valuation protection level (Released Value or Full Value)',
  'Estimated weight, volume, and charges',
  'Pickup and delivery dates or windows',
  'Terms of payment and any special services',
  'Carrier’s liability limitations and your rights',
];

const shipperRights = [
  'You have the right to a written estimate and a clear Bill of Lading before loading.',
  'You can refuse to sign if terms are unclear or inventory is inaccurate.',
  'You must receive the “Your Rights and Responsibilities When You Move” booklet.',
  'You are protected from “hostage” situations—carriers cannot withhold your goods for extra payment beyond the agreed amount.',
  'You have 9 months from delivery to file a claim for loss or damage.',
  'You can file complaints with the FMCSA and your state authorities.',
];

const practicalTips = [
  'Read every page before signing.',
  'Request changes in writing if something is missing or unclear.',
  'Photograph or video the loading process for documentation.',
  'Keep a copy of the signed BOL and inventory.',
  'Use MoveTrustHub.com’s mover comparison tools to select carriers with strong reputations for honoring contracts.',
];

const faqs = [
  {
    question: 'Can a carrier change the price after I sign the Bill of Lading?',
    answer:
      'Only under very specific circumstances (added items or services). A binding estimate locks the price except for those additions.',
  },
  {
    question: 'What happens if my items are damaged?',
    answer:
      'Document everything at delivery, note exceptions on the BOL, and file a written claim within 9 months. Your chosen valuation protection determines the payout.',
  },
  {
    question: 'Is the Bill of Lading the same as an estimate?',
    answer:
      'No. The estimate is preliminary; the Bill of Lading is the binding contract once signed.',
  },
  {
    question: 'Can I cancel the move after signing?',
    answer:
      'Yes, but you may owe cancellation fees or storage charges. Review the cancellation policy in the BOL.',
  },
  {
    question: 'How does MoveTrustHub help with this?',
    answer:
      'Our directory highlights movers with strong compliance records and transparent practices, and our tools help you compare before you reach the contract stage.',
  },
];

export const metadata = buildResourceMetadata(PATH, TITLE, DESCRIPTION);

export default function BillOfLadingShipperRightsPage() {
  return (
    <>
      <ArticleSchema
        title={TITLE}
        description={DESCRIPTION}
        path={PATH}
        datePublished="2026-07-17"
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        }}
      />

      <div className="min-h-screen">
        <section className="border-b bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="container mx-auto max-w-3xl px-4 py-10">
            <Link
              href="/resources"
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Back to all resources
            </Link>

            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="text-[11px] font-medium tracking-wide">
                Regulation
              </Badge>
              <span className="text-xs text-muted-foreground">11 min read</span>
            </div>

            <h1 className="text-balance text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl">
              Understanding Your Bill of Lading and Shipper Rights
            </h1>
            <p className="mt-2 text-lg font-medium text-muted-foreground">
              Long-distance moves under FMCSA rules in 2026
            </p>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              The Bill of Lading is the single most important legal document in any interstate
              move. It serves as the contract between you (the shipper) and the moving carrier,
              outlining the terms of service, inventory, valuation protection, and delivery
              expectations. Many consumers sign it without fully understanding its implications,
              only to discover later that their rights and recourse are more limited than expected.
            </p>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Under FMCSA regulations, the Bill of Lading governs everything from liability for
              loss or damage to payment terms and delivery windows. Understanding its key sections
              empowers you to avoid surprises, assert your rights, and hold carriers accountable.
            </p>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              This guide explains the Bill of Lading in plain language, highlights essential shipper
              rights, and provides practical steps for reviewing and negotiating terms in 2026.
              Whether you are moving from Florida to New York or California to Texas, knowledge of
              this document is essential for a successful relocation.
            </p>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              <Link href="/" className="text-primary underline underline-offset-2">
                MoveTrustHub.com
              </Link>{' '}
              remains an independent directory that helps you research and compare FMCSA-licensed
              movers using verified data, reputation scores, and side-by-side tools—no paid
              placements or affiliations.
            </p>
          </div>
        </section>

        <div className="container mx-auto max-w-3xl space-y-14 px-4 py-10">
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                What is a Bill of Lading and why it matters
              </h2>
            </div>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              The Bill of Lading (often called the “BOL”) is the official contract that governs your
              interstate household goods move. It must be issued by every FMCSA-registered carrier
              before loading begins. It contains:
            </p>
            <ul className="space-y-2">
              {bolContains.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Federal law requires the carrier to provide you with the FMCSA booklet{' '}
              <em>Your Rights and Responsibilities When You Move</em> along with the Bill of Lading.
              Never sign until you have read and understood every page.
            </p>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ClipboardList className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Key sections every shipper must understand
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {bolSections.map((section) => (
                <div key={section.title} className="rounded-xl border bg-card p-4">
                  <h3 className="font-semibold">{section.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{section.detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Related:{' '}
              <Link
                href="/resources/interstate-moving-insurance"
                className="text-primary underline underline-offset-2"
              >
                Interstate moving valuation protection
              </Link>{' '}
              ·{' '}
              <Link href="/resources/fmcsa" className="text-primary underline underline-offset-2">
                FMCSA safety ratings explained
              </Link>
            </p>
          </section>

          <section className="rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-6 sm:p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <Scale className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Your rights as a shipper under FMCSA rules
              </h2>
            </div>
            <ul className="space-y-3">
              {shipperRights.map((right) => (
                <li key={right} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Shield className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
                  {right}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Practical tips for reviewing and negotiating your Bill of Lading
              </h2>
            </div>
            <ul className="space-y-2">
              {practicalTips.map((tip) => (
                <li key={tip} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {tip}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <HelpCircle className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Frequently asked questions
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border bg-card px-4 py-3 open:shadow-sm"
                >
                  <summary className="cursor-pointer list-none font-medium marker:content-none [&::-webkit-details-marker]:hidden">
                    {faq.question}
                  </summary>
                  <p className="mt-2 border-t pt-2 text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border bg-muted/30 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">Conclusion</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              The Bill of Lading is your primary legal protection in a long-distance move. Taking
              time to understand it and exercising your rights as a shipper significantly reduces
              risk and stress.
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              MoveTrustHub.com provides the independent resources you need to research carriers,
              compare options, and choose reliable partners who honor their contracts.
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Prepare for a smoother move today. Use our free Moving Calculator, compare
              FMCSA-licensed movers side-by-side, and request competitive quotes. Always verify
              licensing directly with{' '}
              <a
                href="https://www.fmcsa.dot.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                FMCSA.gov
              </a>
              .
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/moving-calculator">Free moving calculator</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/compare">Compare movers</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/resources/how-to-choose">How to choose a mover</Link>
              </Button>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              MoveTrustHub is an independent informational directory with no paid placements or
              affiliations.
            </p>
          </section>

          <GuideFooter />
        </div>
      </div>
    </>
  );
}
