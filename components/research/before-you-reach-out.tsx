'use client';

import { useCallback, useState } from 'react';
import { Copy, Check, Printer, Mail } from 'lucide-react';
import { TrustMark } from '@/components/network/trust-mark';
import {
  MOVE_CALL_QUESTIONS,
  SOFT_NEXT_STEPS_FOOTER,
  SOFT_NEXT_STEPS_TITLE,
} from '@/lib/research/soft-next-steps';
import { cn } from '@/lib/utils';

export type BeforeYouReachOutProps = {
  /** Plain-text summary lines for copy / mailto (name, IDs, URLs) */
  summaryLines?: string[];
  mailtoSubject?: string;
  showPrint?: boolean;
  showCopy?: boolean;
  showMailto?: boolean;
  className?: string;
  /** Optional alternate questions (defaults to move checklist) */
  questions?: readonly string[];
  title?: string;
};

/**
 * Soft next step: questions to ask providers + takeaway actions.
 * User-initiated only; no lead-gen.
 */
export function BeforeYouReachOut({
  summaryLines = [],
  mailtoSubject = 'My Move Trust Hub research shortlist',
  showPrint = true,
  showCopy = true,
  showMailto = true,
  className,
  questions = MOVE_CALL_QUESTIONS,
  title = SOFT_NEXT_STEPS_TITLE,
}: BeforeYouReachOutProps) {
  const [copied, setCopied] = useState(false);

  const buildPlainText = useCallback(() => {
    const parts: string[] = [title, ''];
    if (summaryLines.length) {
      parts.push('Shortlist / profile summary:', ...summaryLines.map((l) => `• ${l}`), '');
    }
    parts.push('Questions to ask:', ...questions.map((q, i) => `${i + 1}. ${q}`), '');
    parts.push(SOFT_NEXT_STEPS_FOOTER);
    parts.push('Standard: https://www.asktrusthub.com/methodology');
    return parts.join('\n');
  }, [title, summaryLines, questions]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildPlainText());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // silent — user can still print/mail
    }
  };

  const onPrint = () => window.print();

  const mailtoHref = (() => {
    const body = encodeURIComponent(buildPlainText());
    const subject = encodeURIComponent(mailtoSubject);
    return `mailto:?subject=${subject}&body=${body}`;
  })();

  return (
    <aside
      className={cn(
        'rounded-xl border border-border/70 bg-muted/20 px-5 py-5 sm:px-6 print:border print:bg-white',
        className
      )}
      aria-labelledby="soft-next-steps-heading"
    >
      <h2
        id="soft-next-steps-heading"
        className="text-base font-semibold tracking-tight text-foreground sm:text-lg"
      >
        {title}
      </h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Questions to ask the provider — not guarantees. Verify licenses on primary sources before
        you commit.
      </p>

      <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-foreground/90">
        {questions.map((q) => (
          <li key={q}>{q}</li>
        ))}
      </ol>

      {(showCopy || showPrint || showMailto) && (
        <div className="mt-5 flex flex-wrap gap-2 print:hidden">
          {showCopy ? (
            <button
              type="button"
              onClick={onCopy}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-border/80 bg-background px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted/40"
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-600" aria-hidden />
              ) : (
                <Copy className="h-4 w-4" aria-hidden />
              )}
              {copied ? 'Copied' : 'Copy summary'}
            </button>
          ) : null}
          {showPrint ? (
            <button
              type="button"
              onClick={onPrint}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-border/80 bg-background px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted/40"
            >
              <Printer className="h-4 w-4" aria-hidden />
              Print
            </button>
          ) : null}
          {showMailto ? (
            <a
              href={mailtoHref}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-border/80 bg-background px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted/40"
            >
              <Mail className="h-4 w-4" aria-hidden />
              Email me this
            </a>
          ) : null}
        </div>
      )}

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        {SOFT_NEXT_STEPS_FOOTER}
      </p>
      <div className="mt-2">
        <TrustMark />
      </div>
    </aside>
  );
}
