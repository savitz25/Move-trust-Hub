import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '@/lib/save-my-move/auth';
import { getActiveOwnersForUser } from '@/lib/portal/ownership';
import {
  getMovingCompanyIdForDirectoryCompany,
  getOwnerReviewsForMovingCompany,
} from '@/lib/portal/reviews';
import { getCompanyBySlugAsync } from '@/lib/data-server';
import { PortalShell } from '@/components/portal/portal-shell';
import { OwnerReviewsPanel } from '@/components/portal/owner-reviews-panel';
import { Card } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

export default async function PortalReviewsPage() {
  const user = await getAuthenticatedUser();
  if (!user) redirect('/portal/login');

  const owners = await getActiveOwnersForUser(user.id);
  if (owners.length === 0) redirect('/portal');

  const primary = owners[0];
  const company = await getCompanyBySlugAsync(primary.company_slug);
  const movingId = company
    ? await getMovingCompanyIdForDirectoryCompany({
        companyId: company.id,
        usdotNumber: company.usdotNumber,
        mcNumber: company.mcNumber,
      })
    : null;

  const reviews = movingId ? await getOwnerReviewsForMovingCompany(movingId) : [];

  return (
    <PortalShell
      pathname="/portal/reviews"
      companyName={primary.company_name ?? primary.company_slug}
    >
      <div className="mb-6 space-y-2">
        <h2 className="text-lg font-semibold">Community reviews</h2>
        <p className="text-sm text-muted-foreground">
          Respond professionally. You cannot edit scores or delete legitimate reviews. Disputes are
          limited to clear policy violations and go to our moderation queue.
        </p>
        <Link href="/portal" className="text-sm text-primary hover:underline">
          ← Dashboard
        </Link>
      </div>

      {!movingId ? (
        <Card className="p-5 text-sm text-muted-foreground">
          No Move Trust Hub community reviews are linked to this listing yet. When customers submit
          moderated reviews, they will appear here.
        </Card>
      ) : (
        <OwnerReviewsPanel companySlug={primary.company_slug} reviews={reviews} />
      )}
    </PortalShell>
  );
}
