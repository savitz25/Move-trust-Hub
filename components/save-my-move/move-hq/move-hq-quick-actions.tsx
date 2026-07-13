'use client';

import Link from 'next/link';
import { Calculator, GitCompare, Search, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const ACTIONS = [
  {
    href: '/moving-calculator',
    label: 'Calculator',
    icon: Calculator,
    description: 'Estimate size',
  },
  {
    href: '/companies',
    label: 'Find movers',
    icon: Search,
    description: 'Browse directory',
  },
  {
    href: '/compare',
    label: 'Compare',
    icon: GitCompare,
    description: 'Side-by-side',
  },
  {
    href: '/verify-dot',
    label: 'Verify DOT',
    icon: ShieldCheck,
    description: 'FMCSA check',
  },
] as const;

type MoveHqQuickActionsProps = {
  className?: string;
};

export function MoveHqQuickActions({ className }: MoveHqQuickActionsProps) {
  return (
    <nav
      className={cn('flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none', className)}
      aria-label="Quick actions"
    >
      {ACTIONS.map((action) => {
        const Icon = action.icon;
        return (
          <Link
            key={action.href}
            href={action.href}
            className="group flex min-w-[7.5rem] flex-col gap-1 rounded-xl border bg-card px-3 py-3 shadow-sm transition-all hover:border-primary/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="text-sm font-semibold">{action.label}</span>
            <span className="text-[10px] text-muted-foreground">{action.description}</span>
          </Link>
        );
      })}
    </nav>
  );
}