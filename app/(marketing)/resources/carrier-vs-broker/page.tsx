import Link from 'next/link';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Handshake,
  HelpCircle,
  Phone,
  Scale,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArticleSchema } from '@/components/resources/article-schema';
import { GuideFooter } from '@/components/resources/guide-footer';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildResourceMetadata } from '@/lib/seo/resource-metadata';

const TITLE = 'Carrier vs Broker vs Carrier-Broker: Key Differences for Interstate Moves';
const DESCRIPTION =
  'Understand the real differences between moving carriers, brokers, and carrier-brokers before your interstate move. Learn FMCSA requirements, costs, risks, and how to choose with confidence using free tools at MoveTrustHub.com.';

const comparisonRows = [
  {
    aspect: 'Owns Trucks & Equipment',
    carrier: 'Yes',
    broker: 'No',
    hybrid: 'Yes (primary fleet)',
  },
  {
    aspect: 'Performs the Move',
    carrier: 'Directly',
    broker: 'Arranges only',
    hybrid: 'Directly or via trusted partners',
  },
  {
    aspect: 'FMCSA Authority',
    carrier: 'Motor Carrier (MC)',
    broker: 'Property Broker (HHG Broker)',
    hybrid: 'Both Carrier + Broker',
  },
  {
    aspect: 'Overhead Costs',
    carrier: 'High (fleet, labor, fuel, maintenance)',
    broker: 'Low (office/marketing)',
    hybrid: 'High (fleet) + brokerage flexibility',
  },
  {
    aspect: 'Accountability',
    carrier: 'Direct (full responsibility)',
    broker: 'Limited (to carrier selection)',
    hybrid: 'High (direct or contracted oversight)',
  },
  {
    aspect: 'Estimate Reliability',
    carrier: 'Usually more accurate post-survey',
    broker: 'Quick but may change',
    hybrid: 'Balanced accuracy and flexibility',
  },
  {
    aspect: 'Typical Oversight',
    carrier: 'Strict DOT/FMCSA safety compliance',
    broker: 'Less operational burden',
    hybrid: 'Full carrier compliance + broker rules',
  },
];

const companyTypes = [
  {
    icon: Truck,
    title: 'Moving Carrier',
    subtitle: 'Asset-based mover',
    color: 'emerald',
    description:
      'Owns or operates trucks, employs professional crews, and directly handles packing, loading, transportation, and unloading.',
    responsibilities: [
      'Fleet ownership, maintenance, fuel, and repairs',
      'Full-time drivers, movers, and higher cargo/liability insurance',
      'Strict FMCSA compliance and direct Bill of Lading accountability',
      'End-to-end responsibility for your household goods',
    ],
    advantages: [
      'Greater control and direct accountability',
      'More thorough estimates after physical or virtual surveys',
      'Stronger incentives to protect reputation through quality service',
    ],
    note: 'Higher overhead may mean higher base quotes — but often fewer surprises. Confirm active MC authority via the FMCSA Company Snapshot.',
  },
  {
    icon: Handshake,
    title: 'Moving Broker',
    subtitle: 'Intermediary',
    color: 'amber',
    description:
      'Does not own trucks or employ crews. Arranges transportation by matching your move with a third-party carrier from their network.',
    responsibilities: [
      'Lower overhead — primarily office, marketing, and sales',
      'No direct transportation authority or equipment',
      'Must register with FMCSA as a broker and use only registered carriers',
      'Often provides quick phone or online estimates without a physical survey',
    ],
    advantages: [
      'Convenience and potentially competitive initial pricing',
      'Can shop multiple carriers on your behalf',
      'Faster quote turnaround for simple moves',
    ],
    note: 'Brokers must provide the Your Rights and Responsibilities When You Move booklet. Red flags: large upfront deposits (over 30%) or failure to disclose broker status.',
  },
  {
    icon: Building2,
    title: 'Carrier-Broker',
    subtitle: 'Hybrid model',
    color: 'blue',
    description:
      'Holds both Motor Carrier and Broker authority. Maintains their own fleet while brokering overflow or specialized jobs to partner carriers.',
    responsibilities: [
      'Asset-based capabilities for many moves',
      'Flexibility to source additional capacity when needed',
      'Direct oversight on brokered portions through established relationships',
      'Full carrier compliance plus broker rules when subcontracting',
    ],
    advantages: [
      'Best balance for most families — in-house crews plus network flexibility',
      'Higher accountability than pure brokers when they supervise partners',
      'Broader availability without sacrificing reputation standards',
    ],
    note: 'Most established interstate companies operate under this structure. Ask directly: "Will your own crews perform the entire move?"',
  },
];

const prosCons = [
  {
    type: 'Carriers',
    icon: Truck,
    pros: 'Maximum control and accountability; firmer pricing once the contract is signed.',
    cons: 'Higher or less flexible base quotes; limited capacity during peak season.',
    verdict: 'Best for families who prioritize direct responsibility over the lowest headline price.',
  },
  {
    type: 'Brokers',
    icon: Handshake,
    pros: 'Speed and potentially lower initial quotes; convenient one-call shopping.',
    cons: 'Handoff risks, communication gaps, and final charges that may exceed the original estimate.',
    verdict: 'Works when you verify the assigned carrier independently — but transparency is critical.',
  },
  {
    type: 'Carrier-Brokers',
    icon: Building2,
    pros: 'In-house capabilities plus network flexibility; balanced accuracy and availability.',
    cons: 'You must confirm whether your specific move is performed in-house or subcontracted.',
    verdict: 'Often the strongest option when the company maintains high standards for partner carriers.',
  },
];

const verificationSteps = [
  {
    step: '01',
    title: 'Search the FMCSA database',
    description:
      'Enter the USDOT or MC number on the official FMCSA Company Snapshot page. Confirm authority type, active status, and complaint history.',
  },
  {
    step: '02',
    title: 'Review insurance and licensing',
    description:
      'Ensure required cargo insurance and state registrations are current for the company handling your shipment.',
  },
  {
    step: '03',
    title: 'Request a detailed written estimate',
    description:
      'Prefer in-home or virtual surveys for accuracy. Compare binding or not-to-exceed options across 2–3 top-rated companies.',
  },
  {
    step: '04',
    title: 'Check reviews and references',
    description:
      'Prioritize verified customer feedback on multiple platforms — not just the company website.',
  },
  {
    step: '05',
    title: 'Ask direct questions',
    description:
      '"Will your own crews perform the entire move, or will it be subcontracted?" Legitimate companies answer clearly.',
  },
  {
    step: '06',
    title: 'Use independent tools',
    description:
      'Leverage Move Trust Hub\'s Moving Calculator, directory filters, and side-by-side comparison features before booking.',
  },
];

const faqs = [
  {
    question: 'Can a broker perform my move themselves?',
    answer:
      'No. Brokers are not authorized to transport household goods. They must hire a registered carrier to perform the physical move.',
  },
  {
    question: 'Is it safer to choose a carrier over a broker?',
    answer:
      'Carriers generally offer more direct accountability, but reputable carrier-brokers also provide strong protection when they maintain high standards for partner carriers.',
  },
  {
    question: 'How do I know if a company is a broker?',
    answer:
      'Check the FMCSA Company Snapshot. Broker authority appears separately from carrier authority. Legitimate brokers must disclose their role before you sign.',
  },
  {
    question: 'Will using a broker save me money?',
    answer:
      'Not always. While initial quotes may appear lower, final costs from the assigned carrier plus broker fees can equal or exceed direct carrier pricing.',
  },
  {
    question: 'What should I do if something goes wrong?',
    answer:
      'Document everything and contact the company that issued your Bill of Lading. For disputes, file complaints through FMCSA and BBB. Our specialist team at 1-800-918-1477 can provide guidance.',
  },
  {
    question: 'Does Move Trust Hub recommend only carriers?',
    answer:
      'We list transparent, verified options of all types and provide clear data — FMCSA licensing, complaint ratios, reputation scores, and reviews — so you can choose based on your priorities.',
  },
];

const colorMap = {
  emerald: {
    border: 'border-emerald-200/80',
    bg: 'bg-emerald-50/50',
    icon: 'bg-emerald-100 text-emerald-700',
    badge: 'bg-emerald-100 text-emerald-800',
  },
  amber: {
    border: 'border-amber-200/80',
    bg: 'bg-amber-50/50',
    icon: 'bg-amber-100 text-amber-700',
    badge: 'bg-amber-100 text-amber-800',
  },
  blue: {
    border: 'border-blue-200/80',
    bg: 'bg-blue-50/50',
    icon: 'bg-blue-100 text-blue-700',
    badge: 'bg-blue-100 text-blue-800',
  },
};

export const metadata = buildResourceMetadata(
  '/resources/carrier-vs-broker',
  TITLE,
  DESCRIPTION
);

export default function CarrierVsBrokerPage() {
  return (
    <>
      <ArticleSchema
        title={TITLE}
        description={DESCRIPTION}
        path="/resources/carrier-vs-broker"
        datePublished="2026-06-25"
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }}
      />

      <div className="min-h-screen">
        {/* Hero */}
        <section className="border-b bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="container mx-auto px-4 py-10 max-w-3xl">
            <Link
              href="/resources"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to all resources
            </Link>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="secondary" className="text-[11px] font-medium tracking-wide">
                Buying Guide
              </Badge>
              <span className="text-xs text-muted-foreground">8 min read</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.15] text-balance">
              Carrier vs Broker vs Carrier-Broker
            </h1>
            <p className="mt-2 text-lg text-muted-foreground font-medium">
              Key differences for interstate moves
            </p>

            <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Planning an interstate move often brings excitement mixed with significant stress —
              especially when navigating quotes and company types. According to FMCSA data, consumer
              complaints about household goods moves remain common, with issues frequently tied to
              unclear roles between parties handling the shipment.
            </p>

            <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-2xl">
              Whether relocating from Florida to New York, Texas to California, or any other
              long-distance route, knowing these distinctions empowers informed decisions. At{' '}
              <Link href="/" className="text-primary underline underline-offset-2">
                Move Trust Hub
              </Link>
              , our independent directory helps you research and compare trusted options using
              verified FMCSA data, real reviews, and reputation scores — with no paid placements.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-10 max-w-3xl space-y-14">
          {/* Quick type overview */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight mb-2">Three company types at a glance</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Every interstate mover falls into one of these categories. The FMCSA registers each
              authority type separately — and that distinction directly affects your move&apos;s
              reliability, costs, and protection.
            </p>

            <div className="grid sm:grid-cols-3 gap-3">
              {companyTypes.map(({ icon: Icon, title, subtitle, color }) => {
                const styles = colorMap[color as keyof typeof colorMap];
                return (
                  <div
                    key={title}
                    className={`rounded-xl border ${styles.border} ${styles.bg} p-5 text-center`}
                  >
                    <div
                      className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${styles.icon}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-sm">{title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Detailed type cards */}
          {companyTypes.map(({ icon: Icon, title, subtitle, color, description, responsibilities, advantages, note }) => {
            const styles = colorMap[color as keyof typeof colorMap];
            return (
              <section
                key={title}
                className={`rounded-2xl border ${styles.border} ${styles.bg} p-6 sm:p-8`}
              >
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${styles.icon}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${styles.badge} mb-2`}>
                      {subtitle}
                    </span>
                    <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{description}</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                      Key characteristics
                    </p>
                    <ul className="space-y-2">
                      {responsibilities.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm leading-relaxed">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                      Advantages for consumers
                    </p>
                    <ul className="space-y-2">
                      {advantages.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border bg-card/60 px-4 py-3 text-sm text-muted-foreground leading-relaxed">
                  {note}
                </div>
              </section>
            );
          })}

          {/* Comparison table */}
          <section>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <Scale className="h-4 w-4 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">Side-by-side comparison</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Data synthesized from FMCSA guidelines and industry sources. Always verify individual
              company authority on{' '}
              <a
                href="https://www.fmcsa.dot.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                fmcsa.dot.gov
              </a>
              .
            </p>

            <div className="overflow-x-auto rounded-2xl border shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/60">
                    <th className="p-4 text-left font-semibold min-w-[140px]">Aspect</th>
                    <th className="p-4 text-left font-semibold min-w-[130px]">
                      <span className="inline-flex items-center gap-1.5">
                        <Truck className="h-3.5 w-3.5 text-emerald-600" />
                        Carrier
                      </span>
                    </th>
                    <th className="p-4 text-left font-semibold min-w-[130px]">
                      <span className="inline-flex items-center gap-1.5">
                        <Handshake className="h-3.5 w-3.5 text-amber-600" />
                        Broker
                      </span>
                    </th>
                    <th className="p-4 text-left font-semibold min-w-[150px]">
                      <span className="inline-flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5 text-blue-600" />
                        Carrier-Broker
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {comparisonRows.map((row) => (
                    <tr key={row.aspect} className="hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium text-foreground">{row.aspect}</td>
                      <td className="p-4 text-muted-foreground">{row.carrier}</td>
                      <td className="p-4 text-muted-foreground">{row.broker}</td>
                      <td className="p-4 text-muted-foreground">{row.hybrid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Pros and cons */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight mb-2">
              Pros and cons for your interstate move
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Cost transparency matters. Broker-arranged moves sometimes result in final charges
              from the actual carrier exceeding the original estimate. Carriers and hybrids with
              their own fleets generally commit more firmly once the contract is signed.
            </p>

            <div className="space-y-4">
              {prosCons.map(({ type, icon: Icon, pros, cons, verdict }) => (
                <div key={type} className="rounded-xl border bg-card p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-semibold">{type}</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div className="rounded-lg bg-emerald-50/60 border border-emerald-200/60 px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
                        Pros
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{pros}</p>
                    </div>
                    <div className="rounded-lg bg-rose-50/60 border border-rose-200/60 px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-rose-700 mb-1">
                        Cons
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{cons}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <strong className="text-foreground font-medium">Bottom line:</strong> {verdict}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Scam prevention callout */}
          <section className="rounded-2xl border border-amber-200/80 bg-amber-50/40 p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100">
                <AlertTriangle className="h-5 w-5 text-amber-700" />
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-tight mb-2">Scam prevention tip</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Use Move Trust Hub&apos;s{' '}
                  <Link href="/compare" className="text-primary underline underline-offset-2">
                    side-by-side comparison tool
                  </Link>{' '}
                  to review FMCSA licensing, complaint ratios, verified reviews, and reputation
                  scores for any company — regardless of type.
                </p>
                <p className="text-sm text-muted-foreground">
                  Compare top-rated carriers and brokers side-by-side in our directory before signing
                  anything — then request written estimates directly from your shortlisted movers.
                </p>
              </div>
            </div>
          </section>

          {/* How to verify */}
          <section>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">How to verify and choose</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Companies with strong in-house fleets and transparent broker practices consistently earn
              higher customer satisfaction in verified reviews.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {verificationSteps.map(({ step, title, description }) => (
                <div key={step} className="rounded-xl border bg-card p-5 shadow-sm">
                  <span className="text-xs font-bold text-primary/70 tracking-wider">{step}</span>
                  <h3 className="font-semibold mt-1 mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <HelpCircle className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">Frequently asked questions</h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border bg-card shadow-sm [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-medium text-sm sm:text-base hover:bg-muted/30 transition-colors rounded-xl">
                    {faq.question}
                    <span className="text-muted-foreground text-lg leading-none group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t pt-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Conclusion CTA */}
          <section className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/8 via-primary/5 to-transparent p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight mb-2">
              Ready to move with confidence?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-1">
              Understanding carriers, brokers, and carrier-brokers removes much of the uncertainty
              in interstate moving. Select companies with appropriate FMCSA authority, transparent
              practices, and proven track records.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Use our free{' '}
              <Link href="/moving-calculator" className="text-primary underline underline-offset-2">
                Moving Calculator
              </Link>
              , browse the{' '}
              <Link href="/companies" className="text-primary underline underline-offset-2">
                directory
              </Link>
              , and compare movers side-by-side in our independent directory.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="shadow-sm">
                <Link href="/companies">
                  Compare Trusted Movers
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/moving-calculator">Moving Calculator</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/compare">Compare Movers</Link>
              </Button>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 shrink-0" />
              <span>
                Or call our specialist team at{' '}
                <a href="tel:18009181477" className="text-primary font-medium hover:underline">
                  1-800-918-1477
                </a>
              </span>
            </div>
          </section>

          <GuideFooter
            relatedSlugs={['how-to-choose', 'fmcsa', 'scams', 'move-size-weight', 'checklist']}
          />

          <p className="text-xs text-muted-foreground text-center pb-4">
            Always verify licensing and authority directly with{' '}
            <a
              href="https://www.fmcsa.dot.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              FMCSA.gov
            </a>
            . Move Trust Hub is an independent directory with no affiliations or paid placements.
          </p>
        </div>
      </div>
    </>
  );
}