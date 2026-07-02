import Link from 'next/link';
import { FmcsaRefreshDashboard } from '@/components/admin/fmcsa-refresh-dashboard';
import { isFmcsaRefreshConfigured } from '@/lib/fmcsa/refresh/auth';
import { getFmcsaRefreshStats } from '@/lib/fmcsa/refresh/runner';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'FMCSA Refresh',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

export default async function AdminFmcsaPage() {
  const { runs, changes, companyStats } = await getFmcsaRefreshStats();
  const configured = isFmcsaRefreshConfigured();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">FMCSA Data Refresh</h1>
          <p className="text-sm text-muted-foreground">
            Automated carrier authority, safety rating, and complaint sync from FMCSA QCMobile API.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/quotes">Quotes</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/reviews">Reviews</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin">Companies</Link>
          </Button>
        </div>
      </div>

      <FmcsaRefreshDashboard
        runs={runs as any}
        changes={changes as any}
        companyStats={companyStats}
        configured={configured}
      />
    </div>
  );
}