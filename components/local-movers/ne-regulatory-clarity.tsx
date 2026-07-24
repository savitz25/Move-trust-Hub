import Link from 'next/link';
import { Scale } from 'lucide-react';

/**
 * Nebraska regulatory clarity — Nebraska PSC Household Goods Mover License vs FMCSA interstate.
 * Do not reuse IA DOT, KS KCC, CO PUC, SD, NJ, etc. on Nebraska pages.
 *
 * Accurate current NE framing (Nebraska Public Service Commission):
 * Household Goods Movers are licensed to provide intrastate transportation of personal effects
 * or property to a dwelling. For-hire operators must apply for and be granted a License by the
 * Nebraska Public Service Commission. Licenses are generally valid for one year and renewable.
 * Carriers file rates/charges with the Commission (Commission no longer sets rates as of July 1, 2021).
 * Interstate: FMCSA USDOT/MC.
 * @see https://psc.nebraska.gov/household-goods-movers-licensees
 */
export function NeRegulatoryClarity({ countyLabel }: { countyLabel: string }) {
  return (
    <section
      id="ne-licensing"
      className="mb-10 scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/40"
      aria-labelledby="ne-licensing-heading"
    >
      <div className="flex items-start gap-3">
        <Scale className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h2 id="ne-licensing-heading" className="text-lg font-semibold tracking-tight">
            Licensing in Nebraska: local vs interstate
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            For moves in {countyLabel}, the correct authority depends on whether your household goods
            stay inside Nebraska or cross a state line. FMCSA alone does not cover every local
            Nebraska move.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>
              <span className="font-medium text-foreground">Intrastate / local Nebraska moves</span>{' '}
              — household goods movers providing for-hire intrastate transportation of personal
              effects or property to a dwelling generally must hold a{' '}
              <span className="font-medium text-foreground">
                Household Goods Mover License from the Nebraska Public Service Commission (PSC)
              </span>
              . Confirm the company appears on the PSC licensed household goods movers list (often
              with an ML-# license number), that the legal name matches your estimate, and that you
              receive written rates/terms before you book an in-state-only job. Licenses are
              generally valid for one year and must be renewed to remain authorized.
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
            for interstate carriers, and review the{' '}
            <a
              href="https://psc.nebraska.gov/household-goods-movers-licensees"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              Nebraska PSC household goods movers licensees list
            </a>{' '}
            and{' '}
            <a
              href="https://psc.nebraska.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              Nebraska Public Service Commission
            </a>{' '}
            resources before you put down a deposit.
          </p>
        </div>
      </div>
    </section>
  );
}
