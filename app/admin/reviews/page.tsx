import Link from 'next/link';
import { searchReviewsForAdmin } from '@/actions/moderate-reviews';
import { ReviewsAdminDashboard } from '@/components/reviews/reviews-admin-dashboard';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { AdminReviewStatus } from '@/lib/reviews/queries';

export const metadata = {
  title: 'Review Moderation',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

type PageProps = {
  searchParams: Promise<{ status?: string }>;
};

function parseStatus(raw?: string): AdminReviewStatus {
  if (raw === 'approved' || raw === 'rejected' || raw === 'all' || raw === 'pending') {
    return raw;
  }
  return 'pending';
}

export default async function AdminReviewsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const status = parseStatus(params.status);
  const { reviews, total } = await searchReviewsForAdmin({
    status,
    page: 1,
    pageSize: 25,
  });
  const adminReady = isSupabaseAdminConfigured();

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Review Moderation</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Approve, deny, and search community reviews. Approved reviews appear on the
            carrier&apos;s directory profile and community page after revalidation.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/suggestions">Suggestions</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/quotes">Quote Analytics</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin">Companies</Link>
          </Button>
        </div>
      </div>

      {!adminReady && (
        <Card className="mb-6 border-amber-200 bg-amber-50/80 p-4 text-sm text-amber-900">
          Add <code className="rounded bg-amber-100 px-1">SUPABASE_SERVICE_ROLE_KEY</code> to
          load and moderate reviews.
        </Card>
      )}

      <ReviewsAdminDashboard
        initialReviews={reviews}
        initialTotal={total}
        initialStatus={status}
      />
    </div>
  );
}
