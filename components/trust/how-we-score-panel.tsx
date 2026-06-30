import Link from 'next/link';
import { BarChart3, ShieldCheck, Star, Scale } from 'lucide-react';

type Props = {
  className?: string;
  compact?: boolean;
};

const SCORE_FACTORS = [
  {
    label: 'Review volume & recency',
    weight: '30%',
    detail: 'Named Google reviews with enough volume to be statistically meaningful.',
  },
  {
    label: 'FMCSA safety & complaints',
    weight: '25%',
    detail: 'USDOT authority status, safety rating, and complaint-to-shipment ratio.',
  },
  {
    label: 'Years in business',
    weight: '15%',
    detail: 'Operating history and stability for interstate household goods moves.',
  },
  {
    label: 'BBB accreditation',
    weight: '15%',
    detail: 'Accreditation status and letter grade where publicly available.',
  },
  {
    label: 'Customer trend signals',
    weight: '15%',
    detail: 'Recent rating trajectory and consistency across review sources.',
  },
] as const;

/**
 * Visible E-E-A-T explainer for the 0–100 Reputation Score methodology.
 */
export function HowWeScorePanel({ className = '', compact = false }: Props) {
  return (
    <section
      className={`rounded-2xl border bg-card p-6 ${className}`}
      aria-labelledby="how-we-score-heading"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <BarChart3 className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <div>
          <h2 id="how-we-score-heading" className="text-lg font-semibold tracking-tight">
            How We Score Movers (0–100)
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mt-1">
            Our Reputation Score is an editorial composite — not a star average. Scores above{' '}
            <strong className="text-foreground">85</strong> generally indicate safer interstate
            choices. We never fabricate reviews or inflate ratings.
          </p>
        </div>
      </div>

      {!compact && (
        <ul className="space-y-3 mb-4" role="list">
          {SCORE_FACTORS.map((factor) => (
            <li
              key={factor.label}
              className="flex items-start gap-3 rounded-xl border bg-muted/20 px-4 py-3 text-sm"
            >
              <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary tabular-nums">
                {factor.weight}
              </span>
              <div>
                <div className="font-medium">{factor.label}</div>
                <p className="text-muted-foreground leading-relaxed mt-0.5">{factor.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-2 text-sm">
        <Link
          href="/resources/how-to-choose#reputation-score"
          className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1.5 font-medium hover:border-primary/40 hover:text-primary transition-colors"
        >
          <Scale className="h-3.5 w-3.5" aria-hidden="true" />
          Full methodology
        </Link>
        <Link
          href="/verify-dot"
          className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
        >
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
          Verify USDOT yourself
        </Link>
        <Link
          href="/compare"
          className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
        >
          <Star className="h-3.5 w-3.5 text-amber-600" aria-hidden="true" />
          Compare side-by-side
        </Link>
      </div>
    </section>
  );
}