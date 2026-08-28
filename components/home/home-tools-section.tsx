import Link from 'next/link';
import { Card } from '@/components/ui/card';

const TOOLS = [
  {
    href: '/verify-dot',
    title: 'Verify a USDOT number',
    body: 'Look up USDOT or MC and open the official FMCSA SAFER record.',
  },
  {
    href: '/moving-calculator',
    title: 'Moving calculator',
    body: 'Build a room-by-room inventory and estimate cubic feet and truck size.',
  },
  {
    href: '/compare',
    title: 'Compare movers',
    body: 'Side-by-side licensing, ratings, and services — you decide.',
  },
  {
    href: '/my-move',
    title: 'My Move',
    body: 'Save inventories, shortlists, and comparisons in your workspace.',
  },
  {
    href: '/companies',
    title: 'Research directory',
    body: 'Browse published mover profiles. This is a research directory, not a ranking.',
  },
  {
    href: '/local-movers',
    title: 'State research',
    body: 'Open county guides and local mover landings for every state.',
  },
] as const;

export function HomeToolsSection() {
  return (
    <section id="use-the-research" aria-labelledby="use-research-heading" className="move-section">
      <div className="move-section-inner">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          Use the research
        </p>
        <h2 id="use-research-heading" className="mt-2 text-3xl font-semibold tracking-tight text-[#0A2540] sm:text-4xl">
          Continue with the tools you already use
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Verify official records, size the shipment, compare evidence, and save the plan.
          None of these tools is a TrustHub recommendation list.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => (
            <li key={tool.href}>
              <Link prefetch={false} href={tool.href} className="group block h-full no-underline">
                <Card className="h-full p-5 transition-colors group-hover:border-primary/40">
                  <h3 className="text-lg font-semibold text-[#0A2540] group-hover:text-primary">
                    {tool.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tool.body}</p>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
