import Link from 'next/link';
import { isAdminSession } from '@/lib/admin/auth';
import { getPendingClaims } from '@/lib/portal/claims';
import { isPortalDbReady } from '@/lib/portal/db';
import { AdminLoginForm } from '@/components/admin/admin-login-form';
import { PortalClaimsQueue } from '@/components/portal/admin-claims-queue';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Portal claims',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AdminPortalClaimsPage() {
  const loggedIn = await isAdminSession();
  const ready = isPortalDbReady();
  const claims = loggedIn && ready ? await getPendingClaims() : [];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Mover portal claims</h1>
          <p className="text-sm text-muted-foreground">
            Approve ownership only after DOT match and contact review. Claimants must sign in
            (magic link) before approval so a user_id is linked.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/portal-disputes">Disputes</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin">Companies</Link>
          </Button>
        </div>
      </div>

      {!ready ? (
        <Card className="mb-6 border-amber-200 bg-amber-50/80 p-4 text-sm">
          Service role not configured — claims queue unavailable.
        </Card>
      ) : null}

      {!loggedIn ? (
        <AdminLoginForm />
      ) : (
        <PortalClaimsQueue claims={claims} />
      )}
    </div>
  );
}
