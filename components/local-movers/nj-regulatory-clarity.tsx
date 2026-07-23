import Link from 'next/link';
import { Scale } from 'lucide-react';

/**
 * NJ-specific regulatory clarity — intrastate DCA public movers vs interstate FMCSA.
 * Shown only on New Jersey county pages.
 */
export function NjRegulatoryClarity({ countyLabel }: { countyLabel: string }) {
  return (
    <section
      id="nj-licensing"
      className="mb-10 scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/40"
      aria-labelledby="nj-licensing-heading"
    >
      <div className="flex items-start gap-3">
        <Scale className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h2 id="nj-licensing-heading" className="text-lg font-semibold tracking-tight">
            Licensing in New Jersey: local vs interstate
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            For moves in {countyLabel}, the correct authority depends on whether your household goods
            stay inside New Jersey or cross a state line. FMCSA alone does not cover every local NJ move.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>
              <span className="font-medium text-foreground">Intrastate / local NJ moves</span> — regulated
              under New Jersey’s public movers framework (Division of Consumer Affairs). Confirm the
              company is properly licensed for in-state household goods work before you book.
            </li>
            <li>
              <span className="font-medium text-foreground">Interstate moves</span> — require active FMCSA
              USDOT (and usually MC) authority. Verify on{' '}
              <a
                href="https://safer.fmcsa.dot.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline"
              >
                FMCSA SAFER
              </a>
              .
            </li>
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            Use our{' '}
            <Link href="/verify-dot" className="text-primary font-medium hover:underline">
              USDOT lookup
            </Link>{' '}
            for interstate carriers, and ask in-state movers for their New Jersey public-mover credentials
            when the job never leaves the state.
          </p>
        </div>
      </div>
    </section>
  );
}
