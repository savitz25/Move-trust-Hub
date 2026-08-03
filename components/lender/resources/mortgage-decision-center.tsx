import Link from 'next/link';
import {
  ArrowRight,
  Shield,
  Sparkles,
  Lightbulb,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { FaqSection } from '@/components/seo/faq-section';
import { JsonLd } from '@/lib/seo/json-ld';
import { hubPath } from '@/lib/hub/paths';
import { NetworkHandoff } from '@/components/network/network-handoff';
import {
  DECISION_CENTER_META,
  DECISION_FAQS,
  FEATURED_TOOLS,
  GUIDED_CONTENT_CARDS,
  HOMEBUYER_PLAYBOOK,
  INTENT_GATEWAY,
  JOURNEY_STAGES,
  MORTGAGE_MYTHS,
  NEXT_STEP_CTAS,
  TRUST_POINTS,
} from '@/lib/lender/resources/decision-center';
import { cn } from '@/lib/utils';

function decisionCenterSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${DECISION_CENTER_META.canonical}#page`,
        name: DECISION_CENTER_META.title,
        description: DECISION_CENTER_META.description,
        url: DECISION_CENTER_META.canonical,
        isPartOf: {
          '@type': 'WebSite',
          name: 'Lender Trust Hub',
          url: 'https://www.movetrusthub.com/lender',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.movetrusthub.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Lender Trust Hub',
            item: 'https://www.movetrusthub.com/lender',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Decision Center',
            item: DECISION_CENTER_META.canonical,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${DECISION_CENTER_META.canonical}#faq`,
        mainEntity: DECISION_FAQS.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
      {
        '@type': 'ItemList',
        name: 'Featured mortgage calculators',
        itemListElement: FEATURED_TOOLS.map((tool, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: tool.title,
          url: `https://www.movetrusthub.com${tool.href}`,
        })),
      },
    ],
  };
}

export function MortgageDecisionCenter() {
  return (
    <>
      <JsonLd data={decisionCenterSchema()} />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100 via-[#F7F8FA] to-[#EEF2F7]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#3B82F6]/15 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-emerald-200/25 blur-3xl"
          aria-hidden
        />

        <div className="container relative mx-auto px-4 py-12 sm:py-16 md:py-20">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href={hubPath('lender', '/')} className="hover:text-foreground">
                  Lender Trust Hub
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-medium text-foreground">Decision Center</li>
            </ol>
          </nav>

          <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-2xl lg:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-800">
              <Shield className="h-3.5 w-3.5" aria-hidden />
              Independent · No paid placements · No lead fees
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-[#0A2540] sm:text-4xl md:text-5xl">
              Your Home Financing{' '}
              <span className="text-[#3B82F6]">Decision Center</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg">
              Buying a home or refinancing? Start here. Understand your options, run the numbers,
              compare lenders, and verify credentials — before sales pressure enters the room.
            </p>
            <p className="mt-3 text-sm text-zinc-500">
              Free tools and educational guides from Lender Trust Hub. We don&apos;t originate loans
              or sell your contact information.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Button size="lg" asChild className="gap-2 bg-[#3B82F6] hover:bg-[#2563EB]">
                <Link href="#intent">
                  What are you trying to do?
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={hubPath('lender', '/calculators')}>Open free calculators</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Intent gateway ───────────────────────────────────── */}
      <section
        id="intent"
        className="border-b bg-white py-12 md:py-16"
        aria-labelledby="intent-heading"
      >
        <div className="container mx-auto px-4">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[2px] text-[#3B82F6]">
              Start with your goal
            </p>
            <h2 id="intent-heading" className="mt-1 text-2xl font-semibold text-[#0A2540] md:text-3xl">
              What are you trying to do?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Pick the path that matches your situation. We&apos;ll route you to the right tools and
              guides — no account required.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INTENT_GATEWAY.map((card) => {
              const Icon = card.icon;
              return (
                <Card
                  key={card.id}
                  className="group h-full border-[#3B82F6]/15 transition-all hover:border-[#3B82F6]/40 hover:shadow-md"
                >
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#3B82F6]/10 text-[#3B82F6]">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="text-lg font-semibold leading-snug text-[#0A2540]">
                      {card.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {card.description}
                    </p>
                    <div className="mt-5 flex flex-col gap-2">
                      <Button asChild className="w-full justify-between bg-[#0A2540] hover:bg-[#0A2540]/90">
                        <Link href={card.href}>
                          {card.cta}
                          <ArrowRight className="h-4 w-4" aria-hidden />
                        </Link>
                      </Button>
                      {card.secondaryHref && card.secondaryCta ? (
                        <Link
                          href={card.secondaryHref}
                          className="text-center text-xs font-medium text-[#3B82F6] hover:underline"
                        >
                          {card.secondaryCta}
                        </Link>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Journey map ──────────────────────────────────────── */}
      <section
        id="journey"
        className="border-b bg-zinc-50/80 py-12 md:py-16"
        aria-labelledby="journey-heading"
      >
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[2px] text-[#3B82F6]">
              Orient yourself
            </p>
            <h2 id="journey-heading" className="mt-1 text-2xl font-semibold text-[#0A2540] md:text-3xl">
              The homebuying journey
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
              Six stages from education to decision. Jump in where you are — you don&apos;t have to
              finish every step today.
            </p>
          </div>

          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {JOURNEY_STAGES.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <li key={stage.id}>
                  <Link
                    href={stage.href}
                    className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:border-[#3B82F6]/40 hover:shadow-md"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0A2540] text-xs font-bold text-white">
                        {index + 1}
                      </span>
                      <Icon className="h-5 w-5 text-[#3B82F6]" aria-hidden />
                    </div>
                    <span className="text-sm font-semibold text-[#0A2540]">{stage.label}</span>
                    <span className="mt-0.5 text-xs font-medium text-[#3B82F6]">{stage.short}</span>
                    <span className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {stage.description}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ── Featured tools ───────────────────────────────────── */}
      <section
        id="tools"
        className="border-b bg-white py-12 md:py-16"
        aria-labelledby="tools-heading"
      >
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[2px] text-[#3B82F6]">
                Featured tools
              </p>
              <h2 id="tools-heading" className="mt-1 text-2xl font-semibold text-[#0A2540] md:text-3xl">
                Know your numbers before you talk to a lender
              </h2>
              <p className="mt-2 text-muted-foreground">
                Free calculators — no account. Use them to walk into pre-approval with a realistic
                budget, not a guess.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href={hubPath('lender', '/calculators')}>
                All calculators
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.calcId}
                  href={tool.href}
                  className="group flex flex-col rounded-2xl border border-zinc-200 bg-gradient-to-br from-white to-sky-50/50 p-5 transition-all hover:border-[#3B82F6]/40 hover:shadow-md"
                >
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3B82F6]/10 text-[#3B82F6]">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    {tool.tag ? (
                      <Badge variant="secondary" className="text-[10px]">
                        {tool.tag}
                      </Badge>
                    ) : null}
                  </div>
                  <h3 className="font-semibold text-[#0A2540] group-hover:text-[#3B82F6]">
                    {tool.title}
                  </h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {tool.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#3B82F6]">
                    Open tool
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Playbook + guided content ────────────────────────── */}
      <section
        id="playbook"
        className="border-b bg-zinc-50/80 py-12 md:py-16"
        aria-labelledby="playbook-heading"
      >
        <div className="container mx-auto px-4">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[2px] text-[#3B82F6]">
              2026 Homebuyer Playbook
            </p>
            <h2 id="playbook-heading" className="mt-1 text-2xl font-semibold text-[#0A2540] md:text-3xl">
              A sequential path (or jump to your stage)
            </h2>
            <p className="mt-2 text-muted-foreground">
              Guides and tools ordered for first-time and returning buyers. Follow the sequence or
              open only what you need.
            </p>
          </div>

          <ol className="mb-12 space-y-3">
            {HOMEBUYER_PLAYBOOK.map((step) => {
              const Icon = step.icon;
              return (
                <li key={step.step}>
                  <Link
                    href={step.href}
                    className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-4 transition-all hover:border-[#3B82F6]/35 hover:shadow-sm sm:flex-row sm:items-center sm:gap-5 sm:p-5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0A2540] text-sm font-bold text-white">
                      {step.step}
                    </div>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3B82F6]/10 text-[#3B82F6]">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-[#0A2540]">{step.title}</h3>
                        {step.readTime ? (
                          <Badge variant="outline" className="text-[10px]">
                            {step.readTime}
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-[10px]">
                            Tool
                          </Badge>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                      <p className="mt-1 text-xs text-zinc-500">
                        <span className="font-medium text-zinc-600">Who this is for:</span>{' '}
                        {step.whoFor}
                      </p>
                    </div>
                    <ArrowRight className="hidden h-5 w-5 shrink-0 text-[#3B82F6] sm:block" />
                  </Link>
                </li>
              );
            })}
          </ol>

          <h3 className="mb-4 text-lg font-semibold text-[#0A2540]">All guides</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {GUIDED_CONTENT_CARDS.map((guide) => {
              const Icon = guide.icon;
              return (
                <Link key={guide.slug} href={guide.href} className="group h-full">
                  <Card className="h-full border-[#3B82F6]/15 transition-shadow hover:shadow-md">
                    <CardContent className="flex h-full flex-col p-5">
                      <div className="mb-3 flex items-center gap-2">
                        <Icon className="h-4 w-4 text-[#3B82F6]" aria-hidden />
                        <Badge variant="outline" className="text-[10px]">
                          {guide.stageLabel}
                        </Badge>
                      </div>
                      <h4 className="text-base font-semibold leading-snug text-[#0A2540] group-hover:text-[#3B82F6]">
                        {guide.title}
                      </h4>
                      <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">
                        {guide.excerpt}
                      </p>
                      <p className="mt-3 text-xs text-zinc-500">
                        <span className="font-medium">For:</span> {guide.whoFor}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">{guide.readTime}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Trust & verification ─────────────────────────────── */}
      <section
        id="trust"
        className="border-b bg-white py-12 md:py-16"
        aria-labelledby="trust-heading"
      >
        <div className="container mx-auto px-4">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[2px] text-emerald-700">
              Trust & verification
            </p>
            <h2 id="trust-heading" className="mt-1 text-2xl font-semibold text-[#0A2540] md:text-3xl">
              Research lenders the independent way
            </h2>
            <p className="mt-2 text-muted-foreground">
              Lender Trust Hub is built for research — not lead generation. Use our signals, then
              confirm credentials on official sources before you apply.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_POINTS.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.title}
                  className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5"
                >
                  <Icon className="mb-3 h-5 w-5 text-emerald-700" aria-hidden />
                  <h3 className="font-semibold text-[#0A2540]">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {point.detail}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="bg-emerald-700 hover:bg-emerald-800">
              <Link href={hubPath('lender', '/about')}>
                How we verify lenders
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <a
                href="https://www.nmlsconsumeraccess.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                NMLS Consumer Access
                <ExternalLink className="ml-2 h-4 w-4" aria-hidden />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Myths ────────────────────────────────────────────── */}
      <section
        id="myths"
        className="border-b bg-zinc-50/80 py-12 md:py-16"
        aria-labelledby="myths-heading"
      >
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center gap-3">
            <Lightbulb className="h-6 w-6 text-amber-500" aria-hidden />
            <div>
              <h2 id="myths-heading" className="text-2xl font-semibold text-[#0A2540] md:text-3xl">
                Mortgage myths vs. reality
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Common assumptions that cost buyers money or confidence.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {MORTGAGE_MYTHS.map((item) => (
              <div
                key={item.myth}
                className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"
              >
                <div className="border-b border-rose-100 bg-rose-50/60 px-5 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-rose-700">
                    Myth
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#0A2540]">{item.myth}</p>
                </div>
                <div className="px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                    Reality
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.reality}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="border-b bg-zinc-50/80 py-10" aria-label="Related network research">
        <div className="container mx-auto max-w-3xl px-4">
          <NetworkHandoff context="lender-closing" variant="card" />
        </div>
      </section>

      <div className="border-b bg-white">
        <p className="container mx-auto max-w-3xl px-4 pt-12 text-center text-muted-foreground md:pt-16">
          Straight answers — no sales pitch.
        </p>
        <FaqSection
          title="Questions homebuyers actually ask"
          id="faq-heading"
          items={DECISION_FAQS.map((f) => ({
            question: f.question,
            answer: f.answer,
          }))}
        />
      </div>

      {/* ── Next steps ───────────────────────────────────────── */}
      <section
        id="next"
        className="bg-gradient-to-b from-[#0A2540] to-[#0f3460] py-12 text-white md:py-16"
        aria-labelledby="next-heading"
      >
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-200">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              What should I do next?
            </div>
            <h2 id="next-heading" className="text-2xl font-semibold md:text-3xl">
              Move from education to action
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sky-100/90">
              Pick one step based on where you are. You can always come back to this Decision
              Center.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {NEXT_STEP_CTAS.map((cta) => {
              const Icon = cta.icon;
              return (
                <Link
                  key={cta.title}
                  href={cta.href}
                  className={cn(
                    'flex flex-col rounded-2xl border p-5 transition-all',
                    cta.variant === 'primary'
                      ? 'border-[#3B82F6] bg-[#3B82F6] hover:bg-[#2563EB]'
                      : 'border-white/15 bg-white/5 hover:bg-white/10'
                  )}
                >
                  <Icon className="mb-3 h-5 w-5 text-sky-200" aria-hidden />
                  <h3 className="font-semibold">{cta.title}</h3>
                  <p className="mt-1.5 flex-1 text-sm text-sky-100/80">{cta.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                    {cta.cta}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </Link>
              );
            })}
          </div>

          <p className="mt-10 flex items-center justify-center gap-2 text-center text-xs text-sky-200/70">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            Part of the Trust Hub network — same independent research standard as Move Trust Hub
          </p>
        </div>
      </section>
    </>
  );
}
