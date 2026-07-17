import Link from 'next/link';
import { isAdminSession } from '@/lib/admin/auth';
import { getDisputesUnderReview } from '@/lib/portal/reviews';
import { isPortalDbReady } from '@/lib/portal/db';
import { AdminLoginForm } from '@/components/admin/admin-login-form';
import { PortalDisputesQueue } from '@/components/portal/admin-disputes-queue';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Portal review disputes',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AdminPortalDisputesPage() {
  const loggedIn = await isAdminSession();
  const ready = isPortalDbReady();
  const disputes = loggedIn && ready ? await getDisputesUnderReview() : [];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Review disputes</h1>
          <p className="text-sm text-muted-foreground">
            Owners may dispute only clear policy violations. Reviews stay public with Under Review
            until you resolve. Uphold + remove only when the review clearly violates policy.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/portal-claims">Claims</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/reviews">Reviews</Link>
          </Button>
        </div>
      </div>

      {!ready ? (
        <Card className="mb-6 border-amber-200 bg-amber-50/80 p-4 text-sm">
          Service role not configured.
        </Card>
      ) : null}

      {!loggedIn ? <AdminLoginForm /> : <PortalDisputesQueue disputes={disputes} />}
    </div>
  );
}
