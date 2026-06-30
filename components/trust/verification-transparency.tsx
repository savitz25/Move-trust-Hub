import Link from 'next/link';
import { BadgeCheck, FileSearch, ShieldCheck, AlertTriangle } from 'lucide-react';

const VERIFICATION_STEPS = [
  {
    icon: FileSearch,
    title: 'USDOT / MC lookup',
    detail:
      'Every listed carrier is screened for a valid USDOT number. Placeholder or malformed numbers are excluded from rankings.',
  },
  {
    icon: ShieldCheck,
    title: 'FMCSA authority check',
    detail:
      'We verify active interstate household goods authority and surface safety ratings where FMCSA publishes them.',
  },
  {
    icon: BadgeCheck,
    title: 'Directory-linked reviews only',
    detail:
      'AggregateRating schema is emitted only when a mover links to our interstate directory and has named, attributable Google reviews.',
  },
  {
    icon: AlertTriangle,
    title: 'You should still verify',
    detail:
      'Licensing status changes. Always confirm current FMCSA authority and get binding written estimates before paying deposits.',
  },
] as const;

type Props = {
  className?: string;
};

export function VerificationTransparency({ className = '' }: Props) {
  return (
    <section
      className={`rounded-2xl border border-emerald-200/60 bg-emerald-50/30 p-6 ${className}`}
      aria-labelledby="verification-transparency-heading"
    >
      <h2 id="verification-transparency-heading" className="text-lg font-semibold mb-3">
        How we verify companies
      </h2>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        Move Trust Hub is an independent directory — not affiliated with any mover. Our editorial
        team applies the checks below before a company appears in county guides or earns review
        schema.
      </p>
      <ol className="space-y-3 mb-4" role="list">
        {VERIFICATION_STEPS.map((step, index) => (
          <li key={step.title} className="flex items-start gap-3 text-sm">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600/10 text-xs font-bold text-emerald-700">
              {index + 1}
            </span>
            <div>
              <div className="font-medium flex items-center gap-1.5">
                <step.icon className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                {step.title}
              </div>
              <p className="text-muted-foreground leading-relaxed mt-0.5">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="text-xs text-muted-foreground">
        Spot a listing issue?{' '}
        <Link href="/contact" className="text-primary font-medium hover:underline">
          Contact our editorial team
        </Link>{' '}
        or use our{' '}
        <Link href="/review" className="text-primary font-medium hover:underline">
          moderated review form
        </Link>
        .
      </p>
    </section>
  );
}