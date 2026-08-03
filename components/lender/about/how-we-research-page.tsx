import Link from 'next/link';
import {
  ArrowRight,
  Shield,
  Ban,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Building2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MethodologyBackNav } from '@/components/trust/methodology-back-nav';
import { JsonLd } from '@/lib/seo/json-ld';
import { hubPath } from '@/lib/hub/paths';
import { AskStandardBanner } from '@/components/network/ask-standard-banner';
import {
  BUSINESS_MODEL_ANSWERS,
  COVERAGE_STATS,
  DATA_SOURCES,
  FINAL_CTAS,
  HERO_ACTIONS,
  HOW_WE_RESEARCH_META,
  LIMITATIONS,
  RESEARCH_PROCESS,
  RESEARCH_SIGNALS,
  SCORE_EXPLAINERS,
} from '@/lib/lender/about/how-we-research';
import { cn } from '@/lib/utils';

function pageSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${HOW_WE_RESEARCH_META.canonical}#page`,
        name: HOW_WE_RESEARCH_META.title,
        description: HOW_WE_RESEARCH_META.description,
        url: HOW_WE_RESEARCH_META.canonical,
        isPartOf: {
          '@type': 'WebSite',
          name: 'Lender Trust Hub',
          url: 'https://www.movetrusthub.com/lender',
        },
        about: {
          '@type': 'Thing',
          name: 'Independent mortgage lender research methodology',
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
            name: 'How We Research Lenders',
            item: HOW_WE_RESEARCH_META.canonical,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${HOW_WE_RESEARCH_META.canonical}#business-model`,
        mainEntity: BUSINESS_MODEL_ANSWERS.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };
}

export function HowWeResearchPage() {
  return (
    <>
      <JsonLd data={pageSchema()} />

      <div className="container mx-auto px-4 pt-6">
        <MethodologyBackNav
          fallbackHref={hubPath('lender', '/')}
          fallbackLabel="Back to Lender Trust Hub"
        />
      </div>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100 via-[#F7F8FA] to-[#EEF2F7]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 -top-16 h-80 w-80 rounded-full bg-[#3B82F6]/12 blur-3xl"
          aria-hidden
        />

        <div className="container relative mx-auto px-4 py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-800">
              <Shield className="h-3.5 w-3.5" aria-hidden />
              Independent · No paid rankings · No lead fees
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-[#0A2540] sm:text-4xl md:text-5xl">
              How We Research{' '}
              <span className="text-[#3B82F6]">Mortgage Lenders</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
              Choosing a lender is one of the biggest financial decisions of your life. Lender Trust
              Hub exists so you can research options with clear public signals — not ads disguised as
              advice.
            </p>
            <p className="mt-3 text-sm font-medium text-zinc-500">
              Independent. Data-driven. Built for consumers. No paid rankings. No featured
              placement.
            </p>
            <p className="mt-3 text-sm text-zinc-600">
              Canonical vertical methodology:{' '}
              <Link
                href={hubPath('lender', '/methodology')}
                className="font-semibold text-[#3B82F6] underline-offset-2 hover:underline"
              >
                /methodology
              </Link>
            </p>
            <div className="mx-auto mt-6 max-w-2xl text-left">
              <AskStandardBanner verticalLabel="Lender Trust Hub research" />
            </div>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              {HERO_ACTIONS.map((action) => (
                <Button
                  key={action.label}
                  size="lg"
                  variant={action.variant === 'primary' ? 'default' : 'outline'}
                  asChild
                  className={cn(
                    action.variant === 'primary' && 'bg-[#3B82F6] hover:bg-[#2563EB]',
                    action.variant === 'secondary' && 'border-[#3B82F6]/40'
                  )}
                >
                  <Link href={action.href}>{action.label}</Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why we exist ─────────────────────────────────────── */}
      <section
        id="why"
        className="border-b bg-white py-12 md:py-16"
        aria-labelledby="why-heading"
      >
        <div className="container mx-auto max-w-3xl px-4">
          <p className="text-xs font-semibold uppercase tracking-[2px] text-[#3B82F6]">
            Why we exist
          </p>
          <h2 id="why-heading" className="mt-1 text-2xl font-semibold text-[#0A2540] md:text-3xl">
            The problem isn&apos;t a lack of lenders — it&apos;s a lack of clarity
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-zinc-600">
            <p>
              Home financing is high-stakes and often opaque. Rates, fees, service quality, and
              licensing status are easy to confuse — especially when marketing budgets drown out
              independent research.
            </p>
            <p>
              <strong className="text-[#0A2540]">Lender Trust Hub</strong> gives consumers free
              tools to understand numbers, browse a research directory, compare options, and
              re-verify credentials on official sources before applying.
            </p>
            <p>
              We are not a lender, broker, or lead marketplace. We are a research layer — and we
              document how that research works on this page.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 text-center">
            {COVERAGE_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-zinc-200 bg-zinc-50/80 px-3 py-4"
              >
                <div className="text-xl font-bold text-[#0A2540] sm:text-2xl">{stat.value}</div>
                <div className="mt-1 text-[10px] leading-snug text-zinc-500 sm:text-xs">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-[11px] text-zinc-400">
            *Public review signals referenced across sources we monitor — not reviews collected
            solely on this site.
          </p>
        </div>
      </section>

      {/* ── What we check ────────────────────────────────────── */}
      <section
        id="what-we-check"
        className="border-b bg-zinc-50/80 py-12 md:py-16"
        aria-labelledby="signals-heading"
      >
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[2px] text-[#3B82F6]">
              What we check
            </p>
            <h2 id="signals-heading" className="mt-1 text-2xl font-semibold text-[#0A2540] md:text-3xl">
              Research signals we surface — and why they matter
            </h2>
            <p className="mt-2 text-muted-foreground">
              No single signal is perfect. We combine several public inputs so you can dig deeper
              where it counts.
            </p>
          </div>

          <ol className="grid gap-4 md:grid-cols-2">
            {RESEARCH_SIGNALS.map((signal) => {
              const Icon = signal.icon;
              return (
                <li
                  key={signal.id}
                  className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:flex-row sm:gap-4"
                >
                  <div className="mb-3 flex shrink-0 items-start gap-3 sm:mb-0 sm:flex-col sm:items-center">
                    <span className="text-xs font-bold tabular-nums text-[#3B82F6]/50">
                      {signal.number}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3B82F6]/10 text-[#3B82F6]">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0A2540]">{signal.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                      <span className="font-medium text-zinc-800">Why it matters: </span>
                      {signal.whyItMatters}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      <span className="font-medium text-zinc-700">What we do: </span>
                      {signal.whatWeDo}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ── How scores work ──────────────────────────────────── */}
      <section
        id="scores"
        className="border-b bg-white py-12 md:py-16"
        aria-labelledby="scores-heading"
      >
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[2px] text-[#3B82F6]">
              How our scores work
            </p>
            <h2 id="scores-heading" className="mt-1 text-2xl font-semibold text-[#0A2540] md:text-3xl">
              Trust Score & County Experience Score
            </h2>
            <p className="mt-2 text-muted-foreground">
              Scores help you scan a crowded market. They are research aids — not a crystal ball.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {SCORE_EXPLAINERS.map((score) => {
              const Icon = score.icon;
              return (
                <Card key={score.id} className="border-[#3B82F6]/15 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="border-b border-zinc-100 bg-gradient-to-br from-sky-50/80 to-white p-6">
                      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#3B82F6]/10 text-[#3B82F6]">
                        <Icon className="h-5 w-5" aria-hidden />
                      </div>
                      <h3 className="text-xl font-semibold text-[#0A2540]">{score.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {score.summary}
                      </p>
                    </div>
                    <div className="space-y-4 p-6">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                          Inputs that can feed this score
                        </p>
                        <ul className="mt-2 space-y-1.5">
                          {score.inputs.map((input) => (
                            <li
                              key={input}
                              className="flex items-start gap-2 text-sm text-zinc-600"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3B82F6]" />
                              {input}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3">
                          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                            What it can mean
                          </p>
                          <ul className="space-y-1.5 text-xs leading-relaxed text-emerald-900/80">
                            {score.doesMean.map((line) => (
                              <li key={line}>• {line}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="rounded-xl border border-amber-100 bg-amber-50/40 p-3">
                          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-amber-900">
                            <XCircle className="h-3.5 w-3.5" aria-hidden />
                            What it does not mean
                          </p>
                          <ul className="space-y-1.5 text-xs leading-relaxed text-amber-950/70">
                            {score.doesNotMean.map((line) => (
                              <li key={line}>• {line}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Business model ───────────────────────────────────── */}
      <section
        id="business-model"
        className="border-b bg-[#0A2540] py-12 text-white md:py-16"
        aria-labelledby="business-heading"
      >
        <div className="container mx-auto px-4">
          <div className="mb-8 max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-200">
              <Ban className="h-3.5 w-3.5" aria-hidden />
              Business model transparency
            </div>
            <h2 id="business-heading" className="text-2xl font-semibold md:text-3xl">
              How we make money — and what we will not sell
            </h2>
            <p className="mt-2 text-sky-100/85">
              Direct answers. No fine print games.
            </p>
          </div>

          <div className="mb-8 grid gap-3 sm:grid-cols-3">
            {[
              'No paid rankings',
              'No lead fees for directory placement',
              'No paid “featured” slots',
            ].map((promise) => (
              <div
                key={promise}
                className="flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-100"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" aria-hidden />
                {promise}
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {BUSINESS_MODEL_ANSWERS.map((item) => (
              <div
                key={item.q}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <h3 className="font-semibold text-white">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-sky-100/80">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Data sources ─────────────────────────────────────── */}
      <section
        id="data-sources"
        className="border-b bg-white py-12 md:py-16"
        aria-labelledby="sources-heading"
      >
        <div className="container mx-auto px-4">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[2px] text-[#3B82F6]">
              Data sources
            </p>
            <h2 id="sources-heading" className="mt-1 text-2xl font-semibold text-[#0A2540] md:text-3xl">
              Multiple public signals — none perfect alone
            </h2>
            <p className="mt-2 text-muted-foreground">
              We combine sources so one incomplete dataset doesn&apos;t define your entire shortlist.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DATA_SOURCES.map((source) => {
              const Icon = source.icon;
              return (
                <div
                  key={source.name}
                  className="flex flex-col rounded-2xl border border-zinc-200 bg-zinc-50/50 p-5"
                >
                  <Icon className="mb-3 h-5 w-5 text-[#3B82F6]" aria-hidden />
                  <h3 className="font-semibold text-[#0A2540]">{source.name}</h3>
                  <Badge variant="outline" className="mt-2 w-fit text-[10px]">
                    {source.role}
                  </Badge>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {source.howUsed}
                  </p>
                  {source.officialHref ? (
                    <a
                      href={source.officialHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#3B82F6] hover:underline"
                    >
                      {source.officialLabel ?? 'Official site'}
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Research process ─────────────────────────────────── */}
      <section
        id="process"
        className="border-b bg-zinc-50/80 py-12 md:py-16"
        aria-labelledby="process-heading"
      >
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[2px] text-[#3B82F6]">
              Research process example
            </p>
            <h2 id="process-heading" className="mt-1 text-2xl font-semibold text-[#0A2540] md:text-3xl">
              How a lender gets researched on Lender Trust Hub
            </h2>
            <p className="mt-2 text-muted-foreground">
              A simplified walkthrough — identify → license → feedback → complaints → local
              experience → compare.
            </p>
          </div>

          <ol className="mx-auto max-w-3xl space-y-3">
            {RESEARCH_PROCESS.map((step) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.step}
                  className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0A2540] text-sm font-bold text-white">
                    {step.step}
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3B82F6]/10 text-[#3B82F6]">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A2540]">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.detail}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ── Limitations ──────────────────────────────────────── */}
      <section
        id="limitations"
        className="border-b bg-white py-12 md:py-16"
        aria-labelledby="limits-heading"
      >
        <div className="container mx-auto max-w-3xl px-4">
          <div className="mb-6 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
              <Building2 className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <h2 id="limits-heading" className="text-2xl font-semibold text-[#0A2540] md:text-3xl">
                What our scores don&apos;t mean
              </h2>
              <p className="mt-2 text-muted-foreground">
                Transparency includes limits. Credibly independent research says what it cannot
                prove.
              </p>
            </div>
          </div>
          <ul className="space-y-3">
            {LIMITATIONS.map((line) => (
              <li
                key={line}
                className="flex gap-3 rounded-xl border border-amber-100 bg-amber-50/40 px-4 py-3 text-sm leading-relaxed text-zinc-700"
              >
                <span className="mt-0.5 shrink-0 font-bold text-amber-700">—</span>
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section
        id="next"
        className="bg-gradient-to-b from-[#0A2540] to-[#0f3460] py-12 text-white md:py-16"
        aria-labelledby="cta-heading"
      >
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 id="cta-heading" className="text-2xl font-semibold md:text-3xl">
              Ready to research with clearer eyes?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sky-100/90">
              Explore the directory, run the numbers, or continue with the Home Financing Decision
              Center.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FINAL_CTAS.map((cta) => {
              const Icon = cta.icon;
              return (
                <Link
                  key={cta.title}
                  href={cta.href}
                  className="flex flex-col rounded-2xl border border-white/15 bg-white/5 p-5 transition-colors hover:bg-white/10"
                >
                  <Icon className="mb-3 h-5 w-5 text-sky-200" aria-hidden />
                  <h3 className="font-semibold">{cta.title}</h3>
                  <p className="mt-1.5 flex-1 text-sm text-sky-100/75">{cta.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sky-100">
                    {cta.cta}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
