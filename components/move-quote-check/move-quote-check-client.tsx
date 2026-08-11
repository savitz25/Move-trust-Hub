'use client';

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCopy,
  ExternalLink,
  FileSearch,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  DEFAULT_ANSWERS,
  type QuoteCheckAnswers,
  type QuoteCheckFinding,
  type QuoteCheckReport,
} from '@/lib/move-quote-check/types';
import { evaluateQuoteCheck } from '@/lib/move-quote-check/rules';
import {
  trackQuoteCheckCopyQuestions,
  trackQuoteCheckReportGenerated,
  trackQuoteCheckStart,
  trackQuoteCheckVerifyDotClick,
} from '@/lib/move-quote-check/analytics';

const STEPS = [
  { id: 'start', label: 'Start' },
  { id: 'estimate', label: 'Estimate' },
  { id: 'company', label: 'Company' },
  { id: 'survey', label: 'Survey' },
  { id: 'money', label: 'Money' },
  { id: 'docs', label: 'Documents' },
  { id: 'report', label: 'Report' },
] as const;

type StepId = (typeof STEPS)[number]['id'];

function RadioGroup<T extends string>({
  name,
  value,
  onChange,
  options,
}: {
  name: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string; help?: string }[];
}) {
  return (
    <ul className="space-y-2" role="radiogroup" aria-label={name}>
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <li key={opt.value}>
            <button
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(opt.value)}
              className={cn(
                'w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors',
                active
                  ? 'border-primary bg-primary/5 ring-1 ring-primary/30'
                  : 'border-border bg-card hover:border-primary/40'
              )}
            >
              <span className="font-semibold text-foreground">{opt.label}</span>
              {opt.help ? (
                <span className="mt-0.5 block text-xs text-muted-foreground leading-relaxed">
                  {opt.help}
                </span>
              ) : null}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function severityStyles(s: QuoteCheckFinding['severity']) {
  if (s === 'high') return 'border-amber-300 bg-amber-50 text-amber-950';
  if (s === 'review') return 'border-sky-200 bg-sky-50 text-sky-950';
  return 'border-emerald-200 bg-emerald-50/80 text-emerald-950';
}

function statusLabel(s: QuoteCheckFinding['status']) {
  if (s === 'present') return 'Present';
  if (s === 'needs_review') return 'Needs review';
  return 'Missing / unclear';
}

/**
 * Move Quote Check Phase 1 — guided questionnaire + deterministic report.
 */
export function MoveQuoteCheckClient() {
  const [step, setStep] = useState<StepId>('start');
  const [answers, setAnswers] = useState<QuoteCheckAnswers>(DEFAULT_ANSWERS);
  const [report, setReport] = useState<QuoteCheckReport | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    trackQuoteCheckStart();
  }, []);

  const patch = useCallback((partial: Partial<QuoteCheckAnswers>) => {
    setAnswers((a) => ({ ...a, ...partial }));
  }, []);

  const stepIndex = STEPS.findIndex((s) => s.id === step);

  function goReport() {
    const r = evaluateQuoteCheck(answers);
    setReport(r);
    setStep('report');
    trackQuoteCheckReportGenerated({
      high_count: r.highCount,
      review_count: r.reviewCount,
      has_usdot: Boolean(r.verifyDotHref),
      estimate_type: answers.estimateType,
    });
  }

  function next() {
    if (step === 'docs') {
      goReport();
      return;
    }
    const i = stepIndex;
    if (i >= 0 && i < STEPS.length - 1) setStep(STEPS[i + 1].id);
  }

  function back() {
    if (step === 'report') {
      setStep('docs');
      return;
    }
    const i = stepIndex;
    if (i > 0) setStep(STEPS[i - 1].id);
  }

  async function copyQuestions() {
    if (!report) return;
    const text = report.questions.map((q, i) => `${i + 1}. ${q}`).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      trackQuoteCheckCopyQuestions();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  const grouped = useMemo(() => {
    if (!report) return null;
    return {
      present: report.findings.filter((f) => f.status === 'present'),
      needs_review: report.findings.filter((f) => f.status === 'needs_review'),
      missing_unclear: report.findings.filter((f) => f.status === 'missing_unclear'),
    };
  }, [report]);

  return (
    <div className="mx-auto max-w-2xl" data-tool="move-quote-check">
      {/* Progress */}
      {step !== 'start' ? (
        <div className="mb-6 flex flex-wrap gap-1.5" aria-label="Progress">
          {STEPS.filter((s) => s.id !== 'start').map((s, i) => {
            const active = s.id === step;
            const done = stepIndex > STEPS.findIndex((x) => x.id === s.id);
            return (
              <span
                key={s.id}
                className={cn(
                  'rounded-full px-2.5 py-1 text-[11px] font-semibold',
                  active
                    ? 'bg-primary text-primary-foreground'
                    : done
                      ? 'bg-primary/15 text-primary'
                      : 'bg-muted text-muted-foreground'
                )}
              >
                {i + 1}. {s.label}
              </span>
            );
          })}
        </div>
      ) : null}

      {step === 'start' ? (
        <section className="space-y-6 rounded-2xl border bg-card p-6 sm:p-8 shadow-sm">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
              <Shield className="h-3.5 w-3.5" aria-hidden />
              No lead form · No account required · Research only
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Decision tool
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
              Move Quote Check
            </h1>
            <p className="mt-2 text-lg font-medium text-foreground">
              Know what you&apos;re signing before you sign.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Educational review of estimate terms using federal household-goods consumer-protection
              concepts. Not a price oracle, not a scam verdict, and not legal advice. No mover
              receives this review.
            </p>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              Answer from your written estimate — about 3–5 minutes
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              Get checklist findings and questions to ask the company
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              Deep-link to Verify DOT when a USDOT is on the paper
            </li>
          </ul>
          <Button type="button" size="lg" className="w-full sm:w-auto" onClick={() => setStep('estimate')}>
            Start review
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
          </Button>
          <p className="text-xs leading-relaxed text-muted-foreground">
            We do not store your estimate contents by default. Do not enter Social Security numbers
            or payment card details.
          </p>
        </section>
      ) : null}

      {step === 'estimate' ? (
        <Section
          title="Estimate type"
          help="Look for words like binding, non-binding, or not-to-exceed on the document."
        >
          <RadioGroup
            name="estimateType"
            value={answers.estimateType}
            onChange={(v) => patch({ estimateType: v })}
            options={[
              { value: 'binding', label: 'Binding', help: 'Price is presented as fixed under the written terms' },
              { value: 'non_binding', label: 'Non-binding', help: 'Price may change after weight/services are verified' },
              {
                value: 'binding_nte',
                label: 'Binding not-to-exceed / similar',
                help: 'A stated maximum under defined conditions',
              },
              { value: 'not_sure', label: 'Not sure / not stated' },
            ]}
          />
          <NavButtons onBack={back} onNext={next} />
        </Section>
      ) : null}

      {step === 'company' ? (
        <Section
          title="Company identity"
          help="Copy names and numbers exactly as printed on the estimate."
        >
          <label className="block text-sm font-medium">
            Company name on estimate
            <Input
              className="mt-1.5"
              value={answers.companyName}
              onChange={(e) => patch({ companyName: e.target.value })}
              placeholder="As printed"
              autoComplete="off"
            />
          </label>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="block text-sm font-medium">
              USDOT number
              <Input
                className="mt-1.5"
                value={answers.usdot}
                onChange={(e) => patch({ usdot: e.target.value })}
                placeholder="Digits only if possible"
                inputMode="numeric"
                autoComplete="off"
              />
            </label>
            <label className="block text-sm font-medium">
              MC number (optional)
              <Input
                className="mt-1.5"
                value={answers.mcNumber}
                onChange={(e) => patch({ mcNumber: e.target.value })}
                placeholder="If shown"
                autoComplete="off"
              />
            </label>
          </div>
          <p className="mt-4 text-sm font-medium">Does this look like a mover/carrier or a broker?</p>
          <div className="mt-2">
            <RadioGroup
              name="companyRole"
              value={answers.companyRole}
              onChange={(v) => patch({ companyRole: v })}
              options={[
                { value: 'carrier', label: 'Mover / motor carrier' },
                { value: 'broker', label: 'Broker (arranges, may not haul)' },
                { value: 'unclear', label: 'Unclear' },
              ]}
            />
          </div>
          <NavButtons onBack={back} onNext={next} />
        </Section>
      ) : null}

      {step === 'survey' ? (
        <Section title="Survey & inventory" help="How was the estimate prepared, and how detailed is the list?">
          <p className="text-sm font-medium">Survey basis</p>
          <RadioGroup
            name="survey"
            value={answers.surveyBasis}
            onChange={(v) => patch({ surveyBasis: v })}
            options={[
              { value: 'in_home', label: 'In-home survey' },
              { value: 'virtual', label: 'Virtual / video survey' },
              { value: 'phone_only', label: 'Phone only / no survey' },
              { value: 'not_sure', label: 'Not sure' },
            ]}
          />
          <p className="mt-5 text-sm font-medium">Inventory detail</p>
          <div className="mt-2">
            <RadioGroup
              name="inventory"
              value={answers.inventoryDetail}
              onChange={(v) => patch({ inventoryDetail: v })}
              options={[
                { value: 'itemized', label: 'Itemized inventory' },
                { value: 'room_or_volume', label: 'Room-level only / generic volume' },
                { value: 'little_or_none', label: 'Little or no inventory detail' },
                { value: 'not_sure', label: 'Not sure' },
              ]}
            />
          </div>
          <NavButtons onBack={back} onNext={next} />
        </Section>
      ) : null}

      {step === 'money' ? (
        <Section title="Money terms & valuation" help="Use figures from the estimate. Leave blank if not shown.">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm font-medium">
              Estimated total ($)
              <Input
                className="mt-1.5"
                value={answers.estimatedTotal}
                onChange={(e) => patch({ estimatedTotal: e.target.value })}
                inputMode="decimal"
                placeholder="e.g. 4200"
              />
            </label>
            <label className="block text-sm font-medium">
              Deposit amount ($)
              <Input
                className="mt-1.5"
                value={answers.depositAmount}
                onChange={(e) => patch({ depositAmount: e.target.value })}
                inputMode="decimal"
                placeholder="e.g. 500"
              />
            </label>
          </div>
          <p className="mt-4 text-sm font-medium">Deposit timing</p>
          <div className="mt-2">
            <RadioGroup
              name="depositTiming"
              value={answers.depositTiming}
              onChange={(v) => patch({ depositTiming: v })}
              options={[
                { value: 'at_booking', label: 'At booking / to reserve' },
                { value: 'before_load', label: 'Before load day' },
                { value: 'at_delivery', label: 'At delivery' },
                { value: 'none', label: 'No deposit' },
                { value: 'not_sure', label: 'Not sure' },
              ]}
            />
          </div>
          <p className="mt-4 text-sm font-medium">Payment method requested (if known)</p>
          <div className="mt-2">
            <RadioGroup
              name="payment"
              value={answers.paymentMethod}
              onChange={(v) => patch({ paymentMethod: v })}
              options={[
                { value: 'card', label: 'Card' },
                { value: 'check', label: 'Check' },
                { value: 'cash', label: 'Cash' },
                { value: 'wire', label: 'Wire transfer' },
                { value: 'zelle', label: 'Zelle / similar instant app' },
                { value: 'other', label: 'Other' },
                { value: 'not_sure', label: 'Not sure' },
              ]}
            />
          </div>
          <p className="mt-4 text-sm font-medium">Valuation / liability option</p>
          <div className="mt-2">
            <RadioGroup
              name="valuation"
              value={answers.valuation}
              onChange={(v) => patch({ valuation: v })}
              options={[
                {
                  value: 'released',
                  label: 'Released value',
                  help: 'Minimal protection option — often limited per-pound unless higher value is declared',
                },
                {
                  value: 'full_value',
                  label: 'Full Value Protection',
                  help: 'Broader protection option subject to contract terms and deductibles',
                },
                { value: 'unclear', label: 'Unclear / not selected' },
              ]}
            />
          </div>
          <NavButtons onBack={back} onNext={next} />
        </Section>
      ) : null}

      {step === 'docs' ? (
        <Section
          title="Document completeness"
          help="Quick signals from the paper you have — choose the best match."
        >
          {(
            [
              ['signedCustomer', 'Signed by customer?'],
              ['signedCompany', 'Signed by company?'],
              ['datesPresent', 'Dates present?'],
              ['originDestinationPresent', 'Origin and destination present?'],
              ['rightsBookletReferenced', 'Consumer rights booklet referenced?'],
              ['blankOrSubjectToChange', 'Blank fields or broad “subject to change” language noticed?'],
            ] as const
          ).map(([key, label]) => (
            <div key={key} className="mt-4 first:mt-0">
              <p className="text-sm font-medium">{label}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {(
                  [
                    { v: 'yes' as const, l: 'Yes' },
                    { v: 'no' as const, l: 'No' },
                    { v: 'not_sure' as const, l: 'Not sure' },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.v}
                    type="button"
                    onClick={() => patch({ [key]: opt.v })}
                    className={cn(
                      'rounded-full border px-3 py-1.5 text-xs font-semibold',
                      answers[key] === opt.v
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border text-muted-foreground'
                    )}
                  >
                    {opt.l}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button type="button" variant="outline" onClick={back}>
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden />
              Back
            </Button>
            <Button type="button" onClick={goReport}>
              <FileSearch className="mr-2 h-4 w-4" aria-hidden />
              Generate report
            </Button>
          </div>
        </Section>
      ) : null}

      {step === 'report' && report ? (
        <section className="space-y-6" aria-labelledby="report-heading">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Your review</p>
            <h2 id="report-heading" className="mt-1 text-2xl font-semibold tracking-tight">
              {report.summaryHeadline}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{report.summaryBody}</p>
            <dl className="mt-4 grid gap-2 sm:grid-cols-3 text-sm">
              <div className="rounded-lg border bg-muted/30 px-3 py-2">
                <dt className="text-xs text-muted-foreground">Estimate type</dt>
                <dd className="font-semibold">{report.estimateTypeLabel}</dd>
              </div>
              <div className="rounded-lg border bg-muted/30 px-3 py-2">
                <dt className="text-xs text-muted-foreground">Items to review</dt>
                <dd className="font-semibold">
                  {report.highCount + report.reviewCount}{' '}
                  <span className="font-normal text-muted-foreground">
                    ({report.highCount} higher priority)
                  </span>
                </dd>
              </div>
              <div className="rounded-lg border bg-muted/30 px-3 py-2">
                <dt className="text-xs text-muted-foreground">Info signals</dt>
                <dd className="font-semibold">{report.infoCount}</dd>
              </div>
            </dl>
            <p className="mt-3 text-xs text-muted-foreground">
              Never labeled SAFE, UNSAFE, SCAM, or APPROVED — research checklist only. Not legal
              advice.
            </p>
          </div>

          {report.exposureNote ? (
            <div className="rounded-2xl border border-sky-200 bg-sky-50/80 p-5">
              <h3 className="text-sm font-semibold text-sky-950">Educational delivery-payment context</h3>
              <p className="mt-2 text-sm text-sky-950/90 leading-relaxed">
                Entered estimate:{' '}
                <strong>${report.exposureNote.estimatedTotal.toLocaleString('en-US')}</strong>
                {' · '}
                Educational 110% figure:{' '}
                <strong>
                  ${report.exposureNote.educationalMaxAtDelivery.toLocaleString('en-US')}
                </strong>
              </p>
              <p className="mt-2 text-xs leading-relaxed text-sky-900/80">
                {report.exposureNote.explanation}
              </p>
            </div>
          ) : null}

          {/* Checklist groups */}
          {grouped
            ? (
                [
                  ['needs_review', 'Needs review', grouped.needs_review],
                  ['missing_unclear', 'Missing / unclear', grouped.missing_unclear],
                  ['present', 'Present / constructive', grouped.present],
                ] as const
              ).map(([key, label, list]) =>
                list.length ? (
                  <div key={key}>
                    <h3 className="text-sm font-semibold tracking-tight mb-2">{label}</h3>
                    <ul className="space-y-3">
                      {list.map((f) => (
                        <li
                          key={f.id}
                          className={cn('rounded-xl border p-4 text-sm', severityStyles(f.severity))}
                        >
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wide opacity-80">
                              {f.severity} · {statusLabel(f.status)}
                            </span>
                          </div>
                          <p className="mt-1 font-semibold">{f.title}</p>
                          <p className="mt-1 text-xs leading-relaxed opacity-90">{f.explanation}</p>
                          <p className="mt-2 text-xs font-medium">Action: {f.action}</p>
                          <p className="mt-1 text-[11px] opacity-75">{f.citation}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null
              )
            : null}

          {/* Questions */}
          <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-semibold">Questions to ask your mover</h3>
              <Button type="button" size="sm" variant="outline" onClick={copyQuestions}>
                <ClipboardCopy className="mr-1.5 h-3.5 w-3.5" aria-hidden />
                {copied ? 'Copied' : 'Copy all'}
              </Button>
            </div>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              {report.questions.map((q) => (
                <li key={q} className="text-foreground/90">
                  {q}
                </li>
              ))}
            </ol>
          </div>

          {/* Next steps */}
          <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <h3 className="text-sm font-semibold">Next research steps</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {report.verifyDotHref ? (
                <li>
                  <Link
                    href={report.verifyDotHref}
                    className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                    onClick={() => trackQuoteCheckVerifyDotClick()}
                  >
                    Verify DOT with this USDOT
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    href="/verify-dot"
                    className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                    onClick={() => trackQuoteCheckVerifyDotClick()}
                  >
                    Verify a USDOT on FMCSA-oriented tools
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </li>
              )}
              <li>
                <Link href="/companies" className="font-semibold text-primary hover:underline">
                  Research movers in the directory
                </Link>
              </li>
              <li>
                <Link href="/moving-calculator" className="font-semibold text-primary hover:underline">
                  Build or review inventory
                </Link>
              </li>
              <li>
                <Link href="/compare" className="font-semibold text-primary hover:underline">
                  Compare movers side by side
                </Link>
              </li>
              <li>
                <Link href="/my-move" className="font-semibold text-primary hover:underline">
                  Open My Move
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="outline" onClick={() => setStep('docs')}>
              Edit answers
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setAnswers(DEFAULT_ANSWERS);
                setReport(null);
                setStep('start');
              }}
            >
              Start over
            </Button>
          </div>

          <p className="text-xs leading-relaxed text-muted-foreground">
            Move Quote Check is an independent research aid. It does not approve movers, set prices,
            or provide legal advice. Federal consumer materials and FMCSA records remain the primary
            sources for authority and rights information.
          </p>
        </section>
      ) : null}
    </div>
  );
}

function Section({
  title,
  help,
  children,
}: {
  title: string;
  help?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border bg-card p-5 sm:p-6 shadow-sm">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      {help ? <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{help}</p> : null}
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}

function NavButtons({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <Button type="button" variant="outline" onClick={onBack}>
        <ArrowLeft className="mr-2 h-4 w-4" aria-hidden />
        Back
      </Button>
      <Button type="button" onClick={onNext}>
        Continue
        <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
      </Button>
    </div>
  );
}
