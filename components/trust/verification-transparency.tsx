import Link from 'next/link';
import { HOW_WE_VET_INTRO, MOVER_VETTING_CRITERIA } from '@/lib/trust/vetting-criteria';
import { SeeHowWeVetLink } from '@/components/trust/see-how-we-vet-link';
import { FMCSA_PLAIN_ENGLISH } from '@/lib/trust/fmcsa-consumer-copy';

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
        How we vet our movers
      </h2>
      <p className="text-sm text-muted-foreground leading-relaxed mb-2">{HOW_WE_VET_INTRO}</p>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        <strong className="text-foreground">FMCSA</strong> — {FMCSA_PLAIN_ENGLISH}
      </p>
      <ol className="space-y-3 mb-4" role="list">
        {MOVER_VETTING_CRITERIA.map((step, index) => (
          <li key={step.id} className="flex items-start gap-3 text-sm">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600/10 text-xs font-bold text-emerald-700">
              {index + 1}
            </span>
            <div>
              <div className="font-medium">{step.title}</div>
              <p className="text-muted-foreground leading-relaxed mt-0.5">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <SeeHowWeVetLink />
        <p className="text-xs text-muted-foreground">
          Spot a listing issue?{' '}
          <Link href="/contact" className="text-primary font-medium hover:underline">
            Contact our editorial team
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
