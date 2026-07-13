import Link from 'next/link';
import { Suspense } from 'react';
import { AdminLoginForm } from '@/components/admin/admin-login-form';
import { MyMoveUsersDashboard } from '@/components/admin/my-move-users-dashboard';
import { isAdminSession } from '@/lib/admin/auth';
import { listMyMoveUsers } from '@/lib/admin/my-move-users';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const metadata = {
  title: 'My Move Customers',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AdminMyMoveUsersPage() {
  const adminReady = isSupabaseAdminConfigured();
  const loggedIn = await isAdminSession();
  const initialData =
    loggedIn && adminReady
      ? await listMyMoveUsers({ page: 1, sortColumn: 'account_created_at', sortDir: 'desc' })
      : { rows: [], totalCount: 0, page: 1, pageSize: 50 };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">My Move Customers</h1>
          <p className="text-sm text-muted-foreground">
            Accounts, saved inventories, movers, comparisons, and email activity from Save My Move.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/quotes">Quote Analytics</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/suggestions">Suggestions</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin">Companies</Link>
          </Button>
        </div>
      </div>

      {!adminReady && (
        <Card className="mb-6 border-amber-200 bg-amber-50/80 p-4 text-sm text-amber-900">
          Add <code className="rounded bg-amber-100 px-1">SUPABASE_SERVICE_ROLE_KEY</code> to load
          My Move customer data. Apply migration{' '}
          <code className="rounded bg-amber-100 px-1">
            supabase/migrations/20260713210000_my_move_admin_activity.sql
          </code>{' '}
          in Supabase SQL Editor for activity tracking and the admin list RPC.
        </Card>
      )}

      {!loggedIn ? (
        <Card className="mb-6 border-primary/30 bg-primary/5 p-5">
          <p className="font-medium">Admin sign-in required</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in with your admin secret to view My Move customer accounts.
          </p>
          <Suspense fallback={<p className="mt-4 text-sm text-muted-foreground">Loading sign-in…</p>}>
            <AdminLoginForm className="mt-4 max-w-sm" redirectTo="/admin/my-move-users" />
          </Suspense>
        </Card>
      ) : (
        <MyMoveUsersDashboard initialData={initialData} adminReady={adminReady} />
      )}
    </div>
  );
}