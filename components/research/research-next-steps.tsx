import Link from 'next/link';
import {
  ArrowRight,
  Calculator,
  FolderHeart,
  Scale,
  ShieldCheck,
  Truck,
  MapPinned,
  BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type ResearchNextLink = {
  href: string;
  label: string;
  description: string;
  icon?: 'calculator' | 'verify' | 'compare' | 'directory' | 'local' | 'my-move' | 'guide';
};

const ICONS = {
  calculator: Calculator,
  verify: ShieldCheck,
  compare: Scale,
  directory: Truck,
  local: MapPinned,
  'my-move': FolderHeart,
  guide: BookOpen,
} as const;

/**
 * Shared tool → research funnel (no lead capture).
 * Server-rendered links for crawlability.
 */
export function ResearchNextSteps({
  title = 'Continue your research',
  subtitle = 'Independent tools and guides — no lead fees, no paid placements.',
  links,
  className,
  compact = false,
}: {
  title?: string;
  subtitle?: string;
  links: ResearchNextLink[];
  className?: string;
  compact?: boolean;
}) {
  if (!links.length) return null;

  return (
    <section
      className={cn(
        'rounded-2xl border bg-muted/15',
        compact ? 'p-4 sm:p-5' : 'p-5 sm:p-6',
        className
      )}
      aria-labelledby="research-next-heading"
    >
      <h2
        id="research-next-heading"
        className={cn('font-semibold tracking-tight', compact ? 'text-base' : 'text-lg')}
      >
        {title}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{subtitle}</p>
      <ul
        className={cn(
          'mt-4 grid gap-2',
          links.length > 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-1'
        )}
      >
        {links.map((link) => {
          const Icon = link.icon ? ICONS[link.icon] : ArrowRight;
          return (
            <li key={link.href + link.label}>
              <Link
                href={link.href}
                className="group flex h-full items-start gap-3 rounded-xl border bg-card p-3.5 transition-colors hover:border-primary/35 hover:bg-primary/[0.03]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-1 text-sm font-semibold group-hover:text-primary">
                    {link.label}
                    <ArrowRight
                      className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground leading-relaxed">
                    {link.description}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** Default post-tool funnel links for Move research tools. */
export const DEFAULT_TOOL_RESEARCH_LINKS: ResearchNextLink[] = [
  {
    href: '/companies',
    label: 'Browse FMCSA mover directory',
    description: 'Independent interstate listings — re-check licensing yourself.',
    icon: 'directory',
  },
  {
    href: '/compare',
    label: 'Compare movers side-by-side',
    description: 'Reputation, licensing signals, and pricing context in one table.',
    icon: 'compare',
  },
  {
    href: '/verify-dot',
    label: 'Verify a USDOT / MC number',
    description: 'Look up authority context and jump to official FMCSA records.',
    icon: 'verify',
  },
  {
    href: '/local-movers',
    label: 'Local movers by state & county',
    description: 'County guides with Local vs Regional honesty rules.',
    icon: 'local',
  },
  {
    href: '/my-move',
    label: 'Open My Move workspace',
    description: 'Save inventories, shortlists, and comparisons (optional account).',
    icon: 'my-move',
  },
  {
    href: '/resources/routes',
    label: 'Interstate route guides',
    description: 'Corridor planning and cost context for long-distance moves.',
    icon: 'guide',
  },
];

export function profileResearchLinks(companySlug: string): ResearchNextLink[] {
  return [
    {
      href: `/compare?add=${encodeURIComponent(companySlug)}`,
      label: 'Add this mover to Compare',
      description: 'Side-by-side licensing and reputation signals.',
      icon: 'compare',
    },
    {
      href: '/verify-dot',
      label: 'Re-verify USDOT on FMCSA tools',
      description: 'Confirm authority status before any deposit.',
      icon: 'verify',
    },
    {
      href: '/moving-calculator',
      label: 'Estimate move volume',
      description: 'Cubic feet and weight for fairer written estimates.',
      icon: 'calculator',
    },
    {
      href: '/my-move',
      label: 'Save research in My Move',
      description: 'Keep shortlists and inventories in one workspace.',
      icon: 'my-move',
    },
    {
      href: '/companies',
      label: 'Browse more movers',
      description: 'Continue independent directory research.',
      icon: 'directory',
    },
    {
      href: '/about/how-we-score-movers',
      label: 'How reputation scores work',
      description: 'Trust Center methodology — not a paid ranking.',
      icon: 'guide',
    },
  ];
}
