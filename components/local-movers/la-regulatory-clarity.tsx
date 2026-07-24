import Link from 'next/link';
import { Scale } from 'lucide-react';

/**
 * Louisiana regulatory clarity — LPSC household goods common carrier certificate vs FMCSA interstate.
 * Do not reuse TX, MS, AL APSC, AR, NJ, etc. on Louisiana pages.
 *
 * Accurate current LA framing (La. R.S. 45:164.E and LPSC Transportation Division guidance):
 * Intrastate household goods movers generally must hold a common carrier certificate from the
 * Louisiana Public Service Commission (LPSC) before engaging in activities related to moving household goods.
 * Consumers should verify registration/good standing and have the right to a written estimate.
 * Interstate: FMCSA USDOT/MC.
 */
export function LaRegulatoryClarity({ countyLabel }: { countyLabel: string }) {
  return (
    <section
      id="la-licensing"
      className="mb-10 scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/40"
      aria-labelledby="la-licensing-heading"
    >
      <div className="flex items-start gap-3">
        <Scale className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h2 id="la-licensing-heading" className="text-lg font-semibold tracking-tight">
            Licensing in Louisiana: local vs interstate
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            For moves in {countyLabel}, the correct authority depends on whether your household goods
            stay inside Louisiana or cross a state line. FMCSA alone does not cover every local
            Louisiana move.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>
              <span className="font-medium text-foreground">Intrastate / local Louisiana moves</span>{' '}
              — household goods moves between points in Louisiana are regulated by the{' '}
              <span className="font-medium text-foreground">
                Louisiana Public Service Commission (LPSC)
              </span>
              . Intrastate movers generally must secure a{' '}
              <span className="font-medium text-foreground">common carrier certificate</span> from the
              LPSC before engaging in household goods moving activities (La. R.S. 45:164.E). Confirm the
              company is registered and in good standing, carries required insurance, and provides a
              written estimate that matches the legal name on the paperwork before you book an
              in-state-only job. LPSC consumer guidance also addresses the customer right to a written
              estimate.
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
              href="https://www.lpsc.louisiana.gov/Carrier_HGM"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              LPSC household goods moving resources
            </a>{' '}
            and the{' '}
            <a
              href="https://lpscpubvalence.lpsc.louisiana.gov/portal/lpsc-web-portal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              LPSC registered mover search
            </a>{' '}
            before you put down a deposit.
          </p>
        </div>
      </div>
    </section>
  );
}
