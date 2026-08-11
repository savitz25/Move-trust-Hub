'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BookmarkPlus,
  ClipboardCopy,
  Columns2,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  DEFAULT_ANSWERS,
  type QuoteCheckAnswers,
  type YesNoUnsure,
} from '@/lib/move-quote-check/types';
import {
  applyPasteSuggestions,
  parseEstimatePasteText,
} from '@/lib/move-quote-check/paste-parse';
import { loadUserInventoryTotals } from '@/lib/move-quote-check/inventory-compare';
import {
  compareTwoEstimates,
  loadCompareHandoffA,
  type TwoEstimateCompareReport,
} from '@/lib/move-quote-check/compare-engine';
import {
  trackCompareReport,
  trackCompareSaveSummary,
  trackCompareStart,
  trackCompareVerifyDotClick,
} from '@/lib/move-quote-check/compare-analytics';
import { saveCompareSummary } from '@/lib/move-quote-check/compare-save';
import {
  matchQuoteCheckDirectory,
  type QuoteCheckDirectoryMatch,
} from '@/actions/move-quote-check-match';
import {
  trackQuoteCheckPasteUsed,
  trackQuoteCheckPrefillApplied,
  trackQuoteCheckProfileMatchClick,
} from '@/lib/move-quote-check/analytics';

type Phase = 'a' | 'b' | 'report';
type MobileTab = 'A' | 'B' | 'diff';

/**
 * Phase 4 — Compare two estimates (assumptions + price, not a winner).
 */
export function CompareTwoEstimatesClient() {
  const [phase, setPhase] = useState<Phase>('a');
  const [answersA, setAnswersA] = useState<QuoteCheckAnswers>({ ...DEFAULT_ANSWERS });
  const [answersB, setAnswersB] = useState<QuoteCheckAnswers>({ ...DEFAULT_ANSWERS });
  const [pasteA, setPasteA] = useState('');
  const [pasteB, setPasteB] = useState('');
  const [report, setReport] = useState<TwoEstimateCompareReport | null>(null);
  const [matchA, setMatchA] = useState<QuoteCheckDirectoryMatch | null>(null);
  const [matchB, setMatchB] = useState<QuoteCheckDirectoryMatch | null>(null);
  const [mobileTab, setMobileTab] = useState<MobileTab>('diff');
  const [copied, setCopied] = useState(false);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const [useInventory, setUseInventory] = useState(true);

  useEffect(() => {
    trackCompareStart();
    const handoff = loadCompareHandoffA();
    if (handoff) {
      setAnswersA({ ...DEFAULT_ANSWERS, ...handoff });
    }
    setUseInventory(Boolean(loadUserInventoryTotals()));
  }, []);

  const patchA = useCallback((p: Partial<QuoteCheckAnswers>) => {
    setAnswersA((a) => ({ ...a, ...p }));
  }, []);
  const patchB = useCallback((p: Partial<QuoteCheckAnswers>) => {
    setAnswersB((a) => ({ ...a, ...p }));
  }, []);

  function applyPaste(side: 'A' | 'B') {
    trackQuoteCheckPasteUsed();
    const text = side === 'A' ? pasteA : pasteB;
    const parsed = parseEstimatePasteText(text);
    const base = side === 'A' ? answersA : answersB;
    const { next, applied } = applyPasteSuggestions(base, parsed.suggestions);
    if (side === 'A') setAnswersA(next);
    else setAnswersB(next);
    trackQuoteCheckPrefillApplied({ field_count: applied.length });
  }

  async function generate() {
    const inv = loadUserInventoryTotals();
    const r = compareTwoEstimates(answersA, answersB, {
      userInventory: inv,
      useUserInventory: useInventory && Boolean(inv),
    });
    setReport(r);
    setPhase('report');
    setSaveMsg(null);
    trackCompareReport({
      has_price_both: r.price.priceA != null && r.price.priceB != null,
      material_rows: r.matrix.filter((m) => m.material).length,
      has_inventory: Boolean(inv && useInventory),
    });

    const [ma, mb] = await Promise.all([
      matchQuoteCheckDirectory({
        usdot: answersA.usdot,
        companyName: answersA.companyName,
      }).catch(() => null),
      matchQuoteCheckDirectory({
        usdot: answersB.usdot,
        companyName: answersB.companyName,
      }).catch(() => null),
    ]);
    setMatchA(ma);
    setMatchB(mb);
  }

  async function copyQuestions() {
    if (!report) return;
    try {
      await navigator.clipboard.writeText(
        report.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  function saveSummary() {
    if (!report) return;
    saveCompareSummary({
      companyA: report.sideA.companyName,
      companyB: report.sideB.companyName,
      priceA:
        report.price.priceA != null
          ? String(report.price.priceA)
          : undefined,
      priceB:
        report.price.priceB != null
          ? String(report.price.priceB)
          : undefined,
      calloutTitles: report.callouts.map((c) => c.title).slice(0, 8),
    });
    trackCompareSaveSummary();
    setSaveMsg('Comparison summary saved on this device. Raw paste text was not saved.');
  }

  return (
    <div className="mx-auto max-w-4xl" data-tool="move-quote-check-compare">
      {phase !== 'report' ? (
        <div className="mb-6 flex flex-wrap gap-2 text-xs font-semibold">
          <span
            className={cn(
              'rounded-full px-3 py-1',
              phase === 'a' ? 'bg-primary text-primary-foreground' : 'bg-muted'
            )}
          >
            1. Estimate A
          </span>
          <span
            className={cn(
              'rounded-full px-3 py-1',
              phase === 'b' ? 'bg-primary text-primary-foreground' : 'bg-muted'
            )}
          >
            2. Estimate B
          </span>
          <span className="rounded-full bg-muted px-3 py-1">3. Comparison</span>
        </div>
      ) : null}

      {phase === 'a' ? (
        <EstimateEditor
          title="Estimate A"
          subtitle="First quote — reuse a completed Quote Check if you just ran one."
          answers={answersA}
          patch={patchA}
          pasteText={pasteA}
          setPasteText={setPasteA}
          onApplyPaste={() => applyPaste('A')}
          footer={
            <div className="mt-6 flex flex-wrap gap-3">
              <Button type="button" asChild variant="outline">
                <Link href="/tools/move-quote-check">
                  <ArrowLeft className="mr-2 h-4 w-4" aria-hidden />
                  Single quote check
                </Link>
              </Button>
              <Button type="button" onClick={() => setPhase('b')}>
                Continue to Estimate B
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Button>
            </div>
          }
        />
      ) : null}

      {phase === 'b' ? (
        <EstimateEditor
          title="Estimate B"
          subtitle="Second quote — normalize the same fields you entered for A."
          answers={answersB}
          patch={patchB}
          pasteText={pasteB}
          setPasteText={setPasteB}
          onApplyPaste={() => applyPaste('B')}
          footer={
            <div className="mt-6 space-y-3">
              {loadUserInventoryTotals() || useInventory ? (
                <label className="flex items-start gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={useInventory}
                    onChange={(e) => setUseInventory(e.target.checked)}
                  />
                  <span>
                    Compare both estimates against my MoveTrustHub inventory baseline (this device)
                  </span>
                </label>
              ) : null}
              <div className="flex flex-wrap gap-3">
                <Button type="button" variant="outline" onClick={() => setPhase('a')}>
                  <ArrowLeft className="mr-2 h-4 w-4" aria-hidden />
                  Back to A
                </Button>
                <Button type="button" onClick={() => void generate()}>
                  <Columns2 className="mr-2 h-4 w-4" aria-hidden />
                  Generate comparison
                </Button>
              </div>
            </div>
          }
        />
      ) : null}

      {phase === 'report' && report ? (
        <section className="space-y-6">
          <div className="rounded-2xl border bg-card p-5 sm:p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Comparison report
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">
              What differs between these estimates
            </h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {report.price.snapshotLine}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">{report.educationalDisclaimer}</p>
          </div>

          {/* Callouts */}
          <ul className="space-y-3">
            {report.callouts.map((c) => (
              <li
                key={c.id}
                className={cn(
                  'rounded-xl border p-4 text-sm',
                  c.severity === 'high'
                    ? 'border-amber-300 bg-amber-50'
                    : c.severity === 'review'
                      ? 'border-sky-200 bg-sky-50'
                      : 'border-emerald-200 bg-emerald-50/70'
                )}
              >
                <p className="font-semibold">{c.title}</p>
                <p className="mt-1 text-xs leading-relaxed opacity-90">{c.body}</p>
              </li>
            ))}
          </ul>

          {/* Mobile tabs */}
          <div className="sm:hidden flex gap-2">
            {(['diff', 'A', 'B'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setMobileTab(t)}
                className={cn(
                  'flex-1 rounded-full border px-3 py-2 text-xs font-semibold',
                  mobileTab === t
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border'
                )}
              >
                {t === 'diff' ? 'Differences' : `Estimate ${t}`}
              </button>
            ))}
          </div>

          {/* Matrix desktop */}
          <div className={cn('rounded-2xl border overflow-hidden', mobileTab !== 'diff' && 'hidden sm:block')}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-sm">
                <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="sticky left-0 bg-muted/80 px-3 py-2.5 font-semibold">Metric</th>
                    <th className="px-3 py-2.5 font-semibold">Estimate A</th>
                    <th className="px-3 py-2.5 font-semibold">Estimate B</th>
                  </tr>
                </thead>
                <tbody>
                  {report.matrix.map((row) => (
                    <tr
                      key={row.id}
                      className={cn(
                        'border-t',
                        row.material
                          ? 'bg-amber-50/80'
                          : row.differs
                            ? 'bg-sky-50/40'
                            : 'bg-card'
                      )}
                    >
                      <th className="sticky left-0 bg-inherit px-3 py-2.5 text-left font-medium">
                        {row.label}
                        {row.material ? (
                          <span className="ml-1 text-[10px] font-bold uppercase text-amber-800">
                            key gap
                          </span>
                        ) : null}
                      </th>
                      <td className="px-3 py-2.5">{row.valueA}</td>
                      <td className="px-3 py-2.5">{row.valueB}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="border-t px-3 py-2 text-[11px] text-muted-foreground">
              Highlighted rows differ. “Key gap” rows are more likely to change apples-to-apples value.
            </p>
          </div>

          {/* Mobile single-side summary */}
          {mobileTab === 'A' || mobileTab === 'B' ? (
            <div className="sm:hidden rounded-xl border p-4 text-sm space-y-2">
              <p className="font-semibold">
                Estimate {mobileTab}:{' '}
                {mobileTab === 'A' ? report.sideA.companyName : report.sideB.companyName}
              </p>
              {report.matrix.map((row) => (
                <div key={row.id} className="flex justify-between gap-2 border-t pt-2">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="font-medium text-right">
                    {mobileTab === 'A' ? row.valueA : row.valueB}
                  </span>
                </div>
              ))}
            </div>
          ) : null}

          {/* Inventory */}
          {report.inventory.inventoryLine ? (
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <h3 className="text-sm font-semibold">Inventory baseline</h3>
              <p className="mt-2 text-sm leading-relaxed">{report.inventory.inventoryLine}</p>
              {report.inventory.againstA && report.inventory.againstB ? (
                <dl className="mt-3 grid gap-2 sm:grid-cols-2 text-xs">
                  <div className="rounded-lg border bg-background px-3 py-2">
                    <dt className="font-semibold">A vs inventory</dt>
                    <dd className="mt-1 text-muted-foreground">
                      {report.inventory.againstA.headline}
                    </dd>
                  </div>
                  <div className="rounded-lg border bg-background px-3 py-2">
                    <dt className="font-semibold">B vs inventory</dt>
                    <dd className="mt-1 text-muted-foreground">
                      {report.inventory.againstB.headline}
                    </dd>
                  </div>
                </dl>
              ) : null}
              <Link
                href="/moving-calculator"
                className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
              >
                Review inventory
              </Link>
            </div>
          ) : null}

          {/* Company research */}
          <div className="rounded-2xl border bg-card p-5 grid gap-4 sm:grid-cols-2">
            <CompanyMatchBlock
              label="A"
              name={report.sideA.companyName}
              usdot={report.sideA.usdot}
              match={matchA}
            />
            <CompanyMatchBlock
              label="B"
              name={report.sideB.companyName}
              usdot={report.sideB.usdot}
              match={matchB}
            />
            {matchA?.matched !== matchB?.matched && (matchA || matchB) ? (
              <p className="sm:col-span-2 text-xs text-muted-foreground">
                One estimate matched a Move Trust Hub profile and the other did not — that is an
                identity research gap, not a quality ranking.
              </p>
            ) : null}
          </div>

          {/* Questions */}
          <div className="rounded-2xl border bg-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-semibold">Questions to ask (gap-based)</h3>
              <Button type="button" size="sm" variant="outline" onClick={() => void copyQuestions()}>
                <ClipboardCopy className="mr-1.5 h-3.5 w-3.5" aria-hidden />
                {copied ? 'Copied' : 'Copy all'}
              </Button>
            </div>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm">
              {report.questions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ol>
          </div>

          {/* Next + save */}
          <div className="rounded-2xl border bg-card p-5 space-y-3">
            <h3 className="text-sm font-semibold">Next steps</h3>
            <Button type="button" size="sm" variant="outline" onClick={saveSummary}>
              <BookmarkPlus className="mr-1.5 h-3.5 w-3.5" aria-hidden />
              Save comparison summary (this device)
            </Button>
            {saveMsg ? <p className="text-xs text-muted-foreground">{saveMsg}</p> : null}
            <ul className="text-sm space-y-1.5">
              <li>
                <Link href="/tools/move-quote-check" className="font-semibold text-primary hover:underline">
                  Run full Quote Check on one estimate
                </Link>
              </li>
              <li>
                <Link href="/moving-calculator" className="font-semibold text-primary hover:underline">
                  Update inventory
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
            <Button type="button" variant="outline" onClick={() => setPhase('b')}>
              Edit Estimate B
            </Button>
            <Button type="button" variant="secondary" onClick={() => setPhase('a')}>
              Edit Estimate A
            </Button>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function CompanyMatchBlock({
  label,
  name,
  usdot,
  match,
}: {
  label: 'A' | 'B';
  name: string;
  usdot: string;
  match: QuoteCheckDirectoryMatch | null;
}) {
  const verify =
    match?.verifyDotHref ||
    (usdot ? `/verify-dot?q=${encodeURIComponent(usdot)}` : '/verify-dot');
  return (
    <div className="rounded-xl border bg-muted/20 p-3 text-sm">
      <p className="text-xs font-bold uppercase text-muted-foreground">Estimate {label}</p>
      <p className="font-semibold">{name}</p>
      {match?.note ? (
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{match.note}</p>
      ) : (
        <p className="mt-1 text-xs text-muted-foreground">Directory match not run or unavailable.</p>
      )}
      <div className="mt-2 flex flex-col gap-1">
        {match?.matched && match.profileHref ? (
          <Link
            href={match.profileHref}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            onClick={() => trackQuoteCheckProfileMatchClick()}
          >
            Open profile
            <ExternalLink className="h-3 w-3" aria-hidden />
          </Link>
        ) : null}
        <Link
          href={verify}
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
          onClick={() => trackCompareVerifyDotClick(label)}
        >
          Verify DOT{usdot ? ` · ${usdot}` : ''}
          <ExternalLink className="h-3 w-3" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

function EstimateEditor({
  title,
  subtitle,
  answers,
  patch,
  pasteText,
  setPasteText,
  onApplyPaste,
  footer,
}: {
  title: string;
  subtitle: string;
  answers: QuoteCheckAnswers;
  patch: (p: Partial<QuoteCheckAnswers>) => void;
  pasteText: string;
  setPasteText: (v: string) => void;
  onApplyPaste: () => void;
  footer: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border bg-card p-5 sm:p-6 shadow-sm space-y-4">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <div>
        <p className="text-sm font-medium">Paste estimate text (optional)</p>
        <textarea
          className="mt-1.5 min-h-[100px] w-full rounded-xl border px-3 py-2 text-sm"
          value={pasteText}
          onChange={(e) => setPasteText(e.target.value)}
          placeholder="Paste text to suggest fields — you still confirm everything."
        />
        <Button
          type="button"
          size="sm"
          variant="secondary"
          className="mt-2"
          onClick={onApplyPaste}
          disabled={pasteText.trim().length < 20}
        >
          Scan &amp; suggest
        </Button>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Scanned in-browser only. Not sold. Not sent to movers.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-medium sm:col-span-2">
          Company name
          <Input
            className="mt-1"
            value={answers.companyName}
            onChange={(e) => patch({ companyName: e.target.value })}
          />
        </label>
        <label className="text-sm font-medium">
          USDOT
          <Input
            className="mt-1"
            value={answers.usdot}
            onChange={(e) => patch({ usdot: e.target.value })}
            inputMode="numeric"
          />
        </label>
        <label className="text-sm font-medium">
          MC
          <Input
            className="mt-1"
            value={answers.mcNumber}
            onChange={(e) => patch({ mcNumber: e.target.value })}
          />
        </label>
        <label className="text-sm font-medium">
          Total price ($)
          <Input
            className="mt-1"
            value={answers.estimatedTotal}
            onChange={(e) => patch({ estimatedTotal: e.target.value })}
            inputMode="decimal"
          />
        </label>
        <label className="text-sm font-medium">
          Deposit ($)
          <Input
            className="mt-1"
            value={answers.depositAmount}
            onChange={(e) => patch({ depositAmount: e.target.value })}
            inputMode="decimal"
          />
        </label>
        <label className="text-sm font-medium">
          Cubic feet
          <Input
            className="mt-1"
            value={answers.estimateCubicFeet}
            onChange={(e) => patch({ estimateCubicFeet: e.target.value })}
            inputMode="decimal"
          />
        </label>
        <label className="text-sm font-medium">
          Weight (lbs)
          <Input
            className="mt-1"
            value={answers.estimateWeightLbs}
            onChange={(e) => patch({ estimateWeightLbs: e.target.value })}
            inputMode="decimal"
          />
        </label>
      </div>

      <SelectRow
        label="Company type"
        value={answers.companyRole}
        onChange={(v) => patch({ companyRole: v as QuoteCheckAnswers['companyRole'] })}
        options={[
          { v: 'carrier', l: 'Carrier / mover' },
          { v: 'broker', l: 'Broker' },
          { v: 'unclear', l: 'Unclear' },
        ]}
      />
      <SelectRow
        label="Estimate type"
        value={answers.estimateType}
        onChange={(v) => patch({ estimateType: v as QuoteCheckAnswers['estimateType'] })}
        options={[
          { v: 'binding', l: 'Binding' },
          { v: 'non_binding', l: 'Non-binding' },
          { v: 'binding_nte', l: 'Binding NTE' },
          { v: 'not_sure', l: 'Unclear' },
        ]}
      />
      <SelectRow
        label="Survey"
        value={answers.surveyBasis}
        onChange={(v) => patch({ surveyBasis: v as QuoteCheckAnswers['surveyBasis'] })}
        options={[
          { v: 'in_home', l: 'In-home' },
          { v: 'virtual', l: 'Virtual' },
          { v: 'phone_only', l: 'Phone only' },
          { v: 'not_sure', l: 'Unclear' },
        ]}
      />
      <SelectRow
        label="Inventory detail"
        value={answers.inventoryDetail}
        onChange={(v) => patch({ inventoryDetail: v as QuoteCheckAnswers['inventoryDetail'] })}
        options={[
          { v: 'itemized', l: 'Itemized' },
          { v: 'room_or_volume', l: 'Room/volume' },
          { v: 'little_or_none', l: 'Little/none' },
          { v: 'not_sure', l: 'Unclear' },
        ]}
      />
      <SelectRow
        label="Valuation"
        value={answers.valuation}
        onChange={(v) => patch({ valuation: v as QuoteCheckAnswers['valuation'] })}
        options={[
          { v: 'released', l: 'Released value' },
          { v: 'full_value', l: 'Full Value Protection' },
          { v: 'unclear', l: 'Unclear' },
        ]}
      />
      <SelectRow
        label="Payment method"
        value={answers.paymentMethod}
        onChange={(v) => patch({ paymentMethod: v as QuoteCheckAnswers['paymentMethod'] })}
        options={[
          { v: 'card', l: 'Card' },
          { v: 'check', l: 'Check' },
          { v: 'cash', l: 'Cash' },
          { v: 'wire', l: 'Wire' },
          { v: 'zelle', l: 'Zelle/app' },
          { v: 'other', l: 'Other' },
          { v: 'not_sure', l: 'Unclear' },
        ]}
      />
      <YesNoRow
        label="Packing included?"
        value={answers.packingIncluded}
        onChange={(v) => patch({ packingIncluded: v })}
      />
      <YesNoRow
        label="Shuttle mentioned?"
        value={answers.shuttleMentioned}
        onChange={(v) => patch({ shuttleMentioned: v })}
      />
      <YesNoRow
        label="Storage mentioned?"
        value={answers.storageMentioned}
        onChange={(v) => patch({ storageMentioned: v })}
      />

      {footer}
    </section>
  );
}

function SelectRow({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { v: string; l: string }[];
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <select
        className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.v} value={o.v}>
            {o.l}
          </option>
        ))}
      </select>
    </label>
  );
}

function YesNoRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: YesNoUnsure;
  onChange: (v: YesNoUnsure) => void;
}) {
  return (
    <div>
      <p className="text-sm font-medium">{label}</p>
      <div className="mt-1.5 flex flex-wrap gap-2">
        {(
          [
            { v: 'yes' as const, l: 'Yes' },
            { v: 'no' as const, l: 'No' },
            { v: 'not_sure' as const, l: 'Unclear' },
          ] as const
        ).map((o) => (
          <button
            key={o.v}
            type="button"
            onClick={() => onChange(o.v)}
            className={cn(
              'rounded-full border px-3 py-1 text-xs font-semibold',
              value === o.v
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-muted-foreground'
            )}
          >
            {o.l}
          </button>
        ))}
      </div>
    </div>
  );
}
