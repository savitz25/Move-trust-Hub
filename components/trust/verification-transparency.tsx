import Link from 'next/link';
import { BadgeCheck, FileSearch, ShieldCheck, AlertTriangle } from 'lucide-react';

const VERIFICATION_STEPS = [
  {
    icon: FileSearch,
    title: 'USDOT / MC lookup',
    detail:
      'Every listed carrier is screened for a valid USDOT number on FMCSA SAFER. Placeholder, malformed, or revoked authority numbers are excluded from rankings and schema.',
  },
  {
    icon: ShieldCheck,
    title: 'FMCSA authority check',
    detail:
      'Listings with a verified badge include FMCSA USDOT/MC numbers we have confirmed on SAFER. We surface safety ratings only where FMCSA publishes them.',
  },
  {
    icon: BadgeCheck,
    title: 'Attributed reviews only',
    detail:
      'We host a small set of named Google review excerpts on-site. AggregateRating schema is emitted only for moderated community reviews on /company profiles or directory-linked movers with attributable Google data.',
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