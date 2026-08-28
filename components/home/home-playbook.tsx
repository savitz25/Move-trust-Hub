import Link from 'next/link';

const STEPS = [
  {
    n: '01',
    title: 'Understand your move',
    body: 'Interstate vs in-state, shipment size, and who will actually haul the load.',
    href: '/resources/how-to-choose',
  },
  {
    n: '02',
    title: 'Research movers',
    body: 'Identity, carrier vs broker, and the named entity on the estimate.',
    href: '/companies',
  },
  {
    n: '03',
    title: 'Verify official records',
    body: 'USDOT / MC lookup on Verify DOT, then the official FMCSA record.',
    href: '/verify-dot',
  },
  {
    n: '04',
    title: 'Compare evidence',
    body: 'Side-by-side licensing and services. You decide — no ranking board.',
    href: '/compare',
  },
  {
    n: '05',
    title: 'Plan and save',
    body: 'From → To, calculator inventory, and My Move workspace.',
    href: '/my-move',
  },
] as const;

export function HomePlaybook() {
  return (
    <section aria-labelledby="playbook-heading" className="move-section border-t border-border/60">
      <div className="move-section-inner">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          Your move playbook
        </p>
        <h2 id="playbook-heading" className="mt-2 text-3xl font-semibold tracking-tight text-[#0A2540] sm:text-4xl">
          Understand. Research. Plan. You decide.
        </h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step) => (
            <li key={step.n}>
              <p className="font-mono text-sm text-primary">STEP {step.n}</p>
              <h3 className="mt-1 text-lg font-semibold text-[#0A2540]">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              <Link href={step.href} className="mt-3 inline-block text-sm font-medium text-primary hover:underline">
                Continue
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
