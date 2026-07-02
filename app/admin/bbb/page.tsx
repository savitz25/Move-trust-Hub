import Link from 'next/link';
import { BbbRefreshDashboard } from '@/components/admin/bbb-refresh-dashboard';
import { isBbbRefreshConfigured } from '@/lib/bbb/refresh/auth';
import { getBbbRefreshStats } from '@/lib/bbb/refresh/runner';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'BBB Refresh',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

export default async function AdminBbbPage() {
  const { runs, changes, companyStats } = await getBbbRefreshStats();
  const configured = isBbbRefreshConfigured();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">BBB Data Refresh</h1>
          <p className="text-sm text-muted-foreground">
            Automated BBB accreditation, rating, complaint, and alert sync for the movers directory.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/fmcsa">FMCSA Refresh</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/quotes">Quotes</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin">Companies</Link>
          </Button>
        </div>
      </div>

      <BbbRefreshDashboard
        runs={runs as any}
        changes={changes as any}
        companyStats={companyStats}
        configured={configured}
      />
    </div>
  );
}