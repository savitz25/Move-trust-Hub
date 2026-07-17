import Link from 'next/link';
import { PORTAL_NAME, PORTAL_TAGLINE } from '@/lib/portal/messaging';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/portal', label: 'Dashboard', exact: true },
  { href: '/portal/reviews', label: 'Reviews' },
  { href: '/portal/service-area', label: 'Service area' },
  { href: '/for-movers', label: 'About the portal' },
];

export function PortalShell({
  children,
  companyName,
  pathname = '/portal',
}: {
  children: React.ReactNode;
  companyName?: string;
  pathname?: string;
}) {
  return (
    <div className="min-h-[70vh]">
      <div className="border-b bg-muted/20">
        <div className="container mx-auto px-4 py-6 max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            {PORTAL_NAME}
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            {companyName ? companyName : 'Carrier Command Center'}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{PORTAL_TAGLINE}</p>
          <nav className="mt-4 flex flex-wrap gap-1">
            {NAV.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                    active
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 max-w-5xl">{children}</div>
    </div>
  );
}
