import Link from 'next/link';
import { Scale } from 'lucide-react';

/**
 * New Mexico regulatory clarity — NMDOT TRB household goods / state motor-carrier HHG framework vs FMCSA.
 * Do not reuse TX TxDMV, AZ ACC, CO PUC, UT UDOT, NJ, etc. on New Mexico pages.
 *
 * Accurate current NM framing:
 * Intrastate household goods moving companies operating for-hire in New Mexico are regulated under
 * the New Mexico Department of Transportation Transportation Regulation Bureau (TRB) household goods
 * program (statewide motor-carrier consumer/regulatory functions historically associated with the
 * Public Regulation Commission transportation docket). Confirm current NM household goods certificate
 * / operating authority, insurance, and written estimates. Interstate: FMCSA USDOT/MC.
 * @see https://www.dot.nm.gov/trb/household-goods-moving/
 */
export function NmRegulatoryClarity({ countyLabel }: { countyLabel: string }) {
  return (
    <section
      id="nm-licensing"
      className="mb-10 scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/40"
      aria-labelledby="nm-licensing-heading"
    >
      <div className="flex items-start gap-3">
        <Scale className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h2 id="nm-licensing-heading" className="text-lg font-semibold tracking-tight">
            Licensing in New Mexico: local vs interstate
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            For moves in {countyLabel}, the correct authority depends on whether your household goods
            stay inside New Mexico or cross a state line. FMCSA alone does not cover every local New
            Mexico move.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>
              <span className="font-medium text-foreground">
                Intrastate / local New Mexico moves
              </span>{' '}
              — household goods moves between points in New Mexico by for-hire carriers are generally
              regulated through the{' '}
              <span className="font-medium text-foreground">
                New Mexico Department of Transportation Transportation Regulation Bureau (TRB)
              </span>{' '}
              household goods framework (statewide motor-carrier consumer regulation historically
              associated with the Public Regulation Commission transportation docket). Confirm the
              company holds current New Mexico household goods operating authority / certificate
              status, carries required insurance, and provides a written estimate matching the legal
              name on the paperwork before you book an in-state-only job.
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
              href="https://www.dot.nm.gov/trb/household-goods-moving/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              NMDOT TRB household goods moving resources
            </a>{' '}
            and{' '}
            <a
              href="https://www.dot.nm.gov/trb/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              Transportation Regulation Bureau
            </a>{' '}
            before you put down a deposit.
          </p>
        </div>
      </div>
    </section>
  );
}
