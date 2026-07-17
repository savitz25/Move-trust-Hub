'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building2,
  FileText,
  LayoutDashboard,
  MessageSquare,
  RefreshCw,
  Shield,
  Users,
  BadgeCheck,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/admin', label: 'Companies', icon: LayoutDashboard, exact: true },
  { href: '/admin/suggestions', label: 'Suggestions', icon: Building2 },
  { href: '/admin/reviews', label: 'Reviews', icon: MessageSquare },
  { href: '/admin/portal-claims', label: 'Portal Claims', icon: BadgeCheck },
  { href: '/admin/portal-disputes', label: 'Portal Disputes', icon: AlertTriangle },
  { href: '/admin/quotes', label: 'Quotes', icon: FileText },
  { href: '/admin/my-move-users', label: 'My Move Users', icon: Users },
  { href: '/admin/fmcsa', label: 'FMCSA Batch', icon: RefreshCw },
  { href: '/admin/bbb', label: 'BBB Batch', icon: Shield },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f4f8fb]">
      <div className="border-b border-[#0A2540]/10 bg-white">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3 lg:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#00BFA5]">
              Move Trust Hub
            </p>
            <h1 className="text-lg font-bold text-[#0A2540]">Admin Console</h1>
          </div>
          <Link
            href="/"
            className="text-sm font-medium text-[#0A2540]/70 hover:text-[#0A2540]"
          >
            ← Back to site
          </Link>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1600px] gap-0 lg:gap-6 px-4 py-6 lg:px-6">
        <aside className="hidden w-56 shrink-0 lg:block">
          <nav className="sticky top-6 space-y-1 rounded-xl border bg-white p-2 shadow-sm">
            {NAV.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    active
                      ? 'bg-[#0A2540] text-white'
                      : 'text-[#0A2540]/80 hover:bg-[#00BFA5]/10 hover:text-[#0A2540]'
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}