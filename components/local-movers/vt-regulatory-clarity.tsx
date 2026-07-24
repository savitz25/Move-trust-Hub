import Link from 'next/link';
import { Scale } from 'lucide-react';

/**
 * Vermont regulatory clarity — no dedicated statewide HHG certificate board (unlike NH RSA 359-T).
 * VT DMV Commercial Vehicle Operations handles IRP/IFTA/UCR/commercial frameworks.
 * Do not copy NH RSA, NY, MA DPU, ME, NJ public-mover language onto Vermont pages.
 *
 * Accurate current VT framing (site state hub + VT DMV CVO):
 * Vermont does not maintain a dedicated household-goods consumer permit board for most local movers.
 * For pure in-state jobs: written estimates matching legal name, cargo/liability insurance, clear inventory.
 * Commercial carriers may still face VT DMV motor-carrier registration/safety frameworks when applicable.
 * Interstate: FMCSA USDOT/MC.
 * @see https://dmv.vermont.gov/CVO
 */
export function VtRegulatoryClarity({ countyLabel }: { countyLabel: string }) {
  return (
    <section
      id="vt-licensing"
      className="mb-10 scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/40"
      aria-labelledby="vt-licensing-heading"
    >
      <div className="flex items-start gap-3">
        <Scale className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h2 id="vt-licensing-heading" className="text-lg font-semibold tracking-tight">
            Licensing in Vermont: local vs interstate
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            For moves in {countyLabel}, the correct authority depends on whether your household goods
            stay inside Vermont or cross a state line. Do not expect a New Hampshire–style household
            goods carrier permit number on every pure Vermont local job.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>
              <span className="font-medium text-foreground">Intrastate / local Vermont moves</span> —
              Vermont does not maintain a dedicated statewide household-goods mover certificate program
              comparable to New Hampshire RSA 359-T or Massachusetts DPU operating certificates.
              For pure in-state jobs, insist on a written estimate matching the legal business name,
              cargo and liability insurance certificates, and clear inventory terms. Commercial motor
              carriers operating in Vermont may still need to comply with{' '}
              <span className="font-medium text-foreground">
                Vermont DMV Commercial Vehicle Operations (CVO)
              </span>{' '}
              registration, safety, and related motor-carrier frameworks when applicable — ask what
              credentials apply to the company named on your estimate.
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
              . Many northern Vermont jobs become interstate when they touch New York, New Hampshire,
              or Canada-adjacent logistics.
            </li>
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            Use our{' '}
            <Link href="/verify-dot" className="text-primary font-medium hover:underline">
              USDOT lookup
            </Link>{' '}
            for interstate carriers, and review{' '}
            <a
              href="https://dmv.vermont.gov/CVO"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              Vermont DMV Commercial Vehicle Operations
            </a>{' '}
            before you put down a deposit.
          </p>
        </div>
      </div>
    </section>
  );
}
