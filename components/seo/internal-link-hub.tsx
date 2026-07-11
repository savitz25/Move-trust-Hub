import Link from 'next/link';
import { ArrowRight, BookOpen, Calculator, MapPinned, Scale, ShieldCheck } from 'lucide-react';
import { hubPath } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';

type InternalLink = {
  href: string;
  label: string;
  description: string;
  icon: typeof BookOpen;
};

const MOVE_LINKS: InternalLink[] = [
  {
    href: '/moving-calculator',
    label: 'Moving calculator',
    description: 'Estimate cubic footage before you contact carriers.',
    icon: Calculator,
  },
  {
    href: '/resources/how-to-choose',
    label: 'How to choose a mover',
    description: 'Step-by-step framework for 2026 interstate moves.',
    icon: BookOpen,
  },
  {
    href: '/local-movers',
    label: 'Local movers by state',
    description: 'County-level directories in all 50 states.',
    icon: MapPinned,
  },
  {
    href: '/compare',
    label: 'Compare tool',
    description: 'Side-by-side reputation and service comparison.',
    icon: Scale,
  },
  {
    href: '/resources/interstate-moving-insurance',
    label: 'Moving insurance guide',
    description: 'Released Value vs. Full Value Protection explained.',
    icon: ShieldCheck,
  },
  {
    href: hubPath('lender', '/resources/how-to-choose-mortgage-lender'),
    label: 'Mortgage lender guide',
    description: 'Buying after your move? Compare NMLS-verified lenders.',
    icon: BookOpen,
  },
  {
    href: hubPath('insurance', '/resources/how-to-choose-health-insurance-plan'),
    label: 'Health insurance guide',
    description: 'New state, new plan — compare networks and metal tiers.',
    icon: ShieldCheck,
  },
];

export function InternalLinkHub({
  hub = 'move',
  title = 'Keep exploring — your move toolkit',
  subtitle = 'Independent guides and tools to research every step of your relocation.',
  className,
}: {
  hub?: HubId;
  title?: string;
  subtitle?: string;
  className?: string;
}) {
  const links = hub === 'move' ? MOVE_LINKS : MOVE_LINKS.slice(0, 4);

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
        {links.map((link) => {
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