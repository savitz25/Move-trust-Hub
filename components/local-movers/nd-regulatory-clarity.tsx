import Link from 'next/link';
import { Scale } from 'lucide-react';

/**
 * North Dakota regulatory clarity — NDDOT Household Goods Carrier Permit vs FMCSA interstate.
 * Do not reuse MN, SD, MT, WY, NE PSC, NJ, etc. onto North Dakota pages.
 *
 * Accurate current ND framing (site state hub + NDDOT Motor Vehicle HHG permit frameworks):
 * Household goods carriers operating in North Dakota generally need a Household Goods Carrier Permit
 * through NDDOT Motor Vehicle application processes (statutory fees, insurance documentation, renewals).
 * Interstate: FMCSA USDOT/MC.
 */
export function NdRegulatoryClarity({ countyLabel }: { countyLabel: string }) {
  return (
    <section
      id="nd-licensing"
      className="mb-10 scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/40"
      aria-labelledby="nd-licensing-heading"
    >
      <div className="flex items-start gap-3">
        <Scale className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h2 id="nd-licensing-heading" className="text-lg font-semibold tracking-tight">
            Licensing in North Dakota: local vs interstate
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            For moves in {countyLabel}, the correct authority depends on whether your household goods
            stay inside North Dakota or cross a state line. FMCSA alone does not cover every local
            North Dakota move.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>
              <span className="font-medium text-foreground">
                Intrastate / local North Dakota moves
              </span>{' '}
              — household goods carriers operating for-hire in North Dakota generally must hold a{' '}
              <span className="font-medium text-foreground">
                Household Goods Carrier Permit through North Dakota Department of Transportation
                (NDDOT) Motor Vehicle
              </span>{' '}
              application frameworks (statutory application fees, insurance documentation, and
              renewal processes commonly apply). Confirm permit status matching the legal name on
              your estimate and get a written estimate before you book an in-state-only job.
            </li>
            <li>
              <span className="font-medium text-foreground">Interstate moves</span> — require active
              FMCSA USDOT (and usually MC) authority. Verify on{' '}
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
            for interstate carriers, and review{' '}
            <a
              href="https://www.dot.nd.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              North Dakota DOT
            </a>{' '}
            motor vehicle / household goods permit resources before you put down a deposit.
          </p>
        </div>
      </div>
    </section>
  );
}
