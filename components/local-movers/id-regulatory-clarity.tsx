import Link from 'next/link';
import { Scale } from 'lucide-react';

/**
 * Idaho regulatory clarity — Idaho Public Utilities Commission (IPUC) HHG / motor-carrier
 * frameworks vs FMCSA interstate.
 * Do not reuse WA UTC, OR ODOT, UT UDOT, MT, NV NTA, NJ, etc. on Idaho pages.
 *
 * Consumer framing:
 * For-hire household goods moves wholly within Idaho are subject to Idaho state authority
 * frameworks administered with the Idaho Public Utilities Commission (IPUC) motor carrier /
 * household goods regulatory context as applicable, plus required insurance and written contracts.
 * Interstate: FMCSA USDOT/MC.
 * @see https://puc.idaho.gov/
 */
export function IdRegulatoryClarity({ countyLabel }: { countyLabel: string }) {
  return (
    <section
      id="id-licensing"
      className="mb-10 scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/40"
      aria-labelledby="id-licensing-heading"
    >
      <div className="flex items-start gap-3">
        <Scale className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h2 id="id-licensing-heading" className="text-lg font-semibold tracking-tight">
            Licensing in Idaho: local vs interstate
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            For moves in {countyLabel}, the correct authority depends on whether your household goods
            stay inside Idaho or cross a state line. FMCSA alone does not cover every local Idaho
            move.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>
              <span className="font-medium text-foreground">Intrastate / local Idaho moves</span> —
              for-hire household goods moves between points in Idaho are generally subject to{' '}
              <span className="font-medium text-foreground">
                Idaho Public Utilities Commission (IPUC) motor carrier / household goods regulatory
                frameworks
              </span>{' '}
              as applicable under Idaho law. Confirm the company holds any required Idaho operating
              authority for the service offered, carries cargo and liability insurance, and provides a
              written estimate matching the legal name on the paperwork before you book an
              in-state-only job. Ask for proof of authority and insurance in writing.
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
              href="https://puc.idaho.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              Idaho Public Utilities Commission
            </a>{' '}
            consumer resources before you put down a deposit.
          </p>
        </div>
      </div>
    </section>
  );
}
