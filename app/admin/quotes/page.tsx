import Link from 'next/link';
import { getQuoteAnalytics } from '@/lib/quotes/analytics';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const metadata = {
  title: 'Quote Analytics',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AdminQuotesPage() {
  const analytics = await getQuoteAnalytics();
  const adminReady = isSupabaseAdminConfigured();

  const phoneRate =
    analytics.totalQuotes > 0
      ? Math.round((analytics.withPhone / analytics.totalQuotes) * 100)
      : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Quote Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Live lead volume, attribution, and conversion signals from Supabase.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/fmcsa">FMCSA Refresh</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/bbb">BBB Refresh</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/my-move-users">My Move Users</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/reviews">Review Moderation</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin">Companies</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">View site</Link>
          </Button>
        </div>
      </div>

      {!adminReady && (
        <Card className="mb-6 border-amber-200 bg-amber-50/80 p-4 text-sm text-amber-900">
          Add <code className="rounded bg-amber-100 px-1">SUPABASE_SERVICE_ROLE_KEY</code> to
          Vercel (server-only) to load quote data. Public quote submissions still work with the
          anon key.
        </Card>
      )}

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total leads" value={analytics.totalQuotes} />
        <StatCard label="Last 7 days" value={analytics.last7Days} />
        <StatCard label="Last 30 days" value={analytics.last30Days} />
        <StatCard label="Phone provided" value={`${phoneRate}%`} sub={`${analytics.withPhone} leads`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="font-semibold">Top destinations</h2>
          <p className="mb-4 text-xs text-muted-foreground">Attributed city hub slugs</p>
          <ul className="space-y-2 text-sm">
            {analytics.topDestinations.length === 0 ? (
              <li className="text-muted-foreground">No attributed quotes yet</li>
            ) : (
              analytics.topDestinations.map((row) => (
                <li key={row.destination_slug} className="flex items-center justify-between gap-2">
                  <Link
                    href={`/moving-to/${row.destination_slug}`}
                    className="truncate text-primary hover:underline"
                  >
                    {row.destination_slug}
                  </Link>
                  <Badge variant="secondary">{row.count}</Badge>
                </li>
              ))
            )}
          </ul>
        </Card>

        <Card className="p-5">
          <h2 className="font-semibold">By source</h2>
          <p className="mb-4 text-xs text-muted-foreground">Form entry points</p>
          <ul className="space-y-2 text-sm">
            {analytics.bySource.map((row) => (
              <li key={row.source} className="flex items-center justify-between gap-2">
                <span className="truncate font-mono text-xs">{row.source}</span>
                <Badge variant="outline">{row.count}</Badge>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5">
          <h2 className="font-semibold">Service type</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {analytics.byServiceType.map((row) => (
              <li key={row.service_type} className="flex justify-between">
                <span className="capitalize">{row.service_type}</span>
                <span className="font-medium">{row.count}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5">
          <h2 className="font-semibold">Daily volume (14 days)</h2>
          <ul className="mt-4 space-y-1.5 text-sm">
            {analytics.dailyVolume.map((row) => (
              <li key={row.date} className="flex justify-between text-muted-foreground">
                <span>{row.date}</span>
                <span className="font-medium text-foreground">{row.count}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <Card className="p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-semibold tabular-nums">{value}</p>
      {sub ? <p className="mt-1 text-xs text-muted-foreground">{sub}</p> : null}
    </Card>
  );
}