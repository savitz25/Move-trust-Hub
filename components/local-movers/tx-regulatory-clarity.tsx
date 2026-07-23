import Link from 'next/link';
import { Scale } from 'lucide-react';

/**
 * Texas regulatory clarity — TxDMV intrastate household goods vs FMCSA interstate.
 * Do not reuse CA BHGS or FL FDACS language on Texas pages.
 */
export function TxRegulatoryClarity({ countyLabel }: { countyLabel: string }) {
  return (
    <section
      id="tx-licensing"
      className="mb-10 scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/40"
      aria-labelledby="tx-licensing-heading"
    >
      <div className="flex items-start gap-3">
        <Scale className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h2 id="tx-licensing-heading" className="text-lg font-semibold tracking-tight">
            Licensing in Texas: local vs interstate
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            For moves in {countyLabel}, the correct authority depends on whether your household goods
            stay inside Texas or cross a state line. FMCSA alone does not cover every local Texas move.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>
              <span className="font-medium text-foreground">Intrastate / local Texas moves</span> —
              household goods movers operating within Texas generally need active Texas Department of
              Motor Vehicles (TxDMV) household goods authority / certificate. Confirm the company is
              currently authorized for in-state household goods work before you book.
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
            for interstate carriers, and check the{' '}
            <a
              href="https://www.txdmv.gov/motor-carriers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              TxDMV motor carrier resources
            </a>{' '}
            / Truck Stop–style lookup tools for Texas in-state household goods authority before you put
            down a deposit.
          </p>
        </div>
      </div>
    </section>
  );
}
