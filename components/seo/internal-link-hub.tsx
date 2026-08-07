import Link from 'next/link';
import { ArrowRight, BookOpen, Calculator, MapPinned, Scale, ShieldCheck } from 'lucide-react';
import type { HubId } from '@/lib/hub/types';

type InternalLink = {
  href: string;
  label: string;
  description: string;
  icon: typeof BookOpen;
};

/** Move-hub tools only — cross-vertical links live in footer After Your Move module. */
const MOVE_LINKS: InternalLink[] = [
  {
    href: '/moving-calculator',
    label: 'Moving calculator',
    description: 'Estimate cubic footage before you contact carriers.',
    icon: Calculator,
  },
  {
    href: '/verify-dot',
    label: 'Verify a DOT number',
    description: 'Look up USDOT/MC and jump to the official FMCSA record.',
    icon: ShieldCheck,
  },
  {
    href: '/compare',
    label: 'Compare movers',
    description: 'Side-by-side reputation and licensing signals.',
    icon: Scale,
  },
  {
    href: '/local-movers',
    label: 'Local movers by state',
    description: 'County guides with Local vs Regional honesty rules.',
    icon: MapPinned,
  },
  {
    href: '/my-move',
    label: 'My Move workspace',
    description: 'Save inventories, shortlists, and comparisons.',
    icon: BookOpen,
  },
  {
    href: '/resources/how-to-choose',
    label: 'How to choose a mover',
    description: 'Step-by-step framework for interstate moves.',
    icon: BookOpen,
  },
  {
    href: '/resources/interstate-moving-insurance',
    label: 'Moving insurance guide',
    description: 'Released Value vs. Full Value Protection explained.',
    icon: ShieldCheck,
  },
  {
    href: '/about/how-we-score-movers',
    label: 'Trust Center methodology',
    description: 'How reputation scores and vetting work — no paid placements.',
    icon: ShieldCheck,
  },
];

export function InternalLinkHub({
  hub = 'move',
  title = 'Moving research tools',
  subtitle = 'Guides and tools for your interstate move.',
  className,
}: {
  hub?: HubId;
  title?: string;
  subtitle?: string;
  className?: string;
}) {
  if (hub !== 'move') return null;

  return (
    <section
      className={className ?? 'content-auto rounded-2xl border bg-muted/20 p-6 sm:p-8'}
      aria-labelledby="internal-link-hub-heading"
    >
      <h2 id="internal-link-hub-heading" className="text-xl font-semibold tracking-tight">
        {title}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {MOVE_LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group flex h-full items-start gap-3 rounded-xl border bg-card p-4 transition-all duration-200 hover:border-primary/30 hover:shadow-trust hover-lift"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-1 font-medium group-hover:text-primary">
                    {link.label}
                    <ArrowRight
                      className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{link.description}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}