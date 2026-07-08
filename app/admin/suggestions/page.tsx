import Link from 'next/link';
import { Suspense } from 'react';
import { OrphanedApprovedQueue } from '@/components/suggestions/orphaned-approved-queue';
import { SuggestionsModerationQueue } from '@/components/suggestions/suggestions-moderation-queue';
import { AdminLoginForm } from '@/components/admin/admin-login-form';
import { isAdminSession } from '@/lib/admin/auth';
import { getDirectoryDbStatus } from '@/lib/directory/directory-db-status';
import { getOrphanedApprovedSuggestions } from '@/lib/suggestions/repair-approved';
import { getPendingSuggestions } from '@/lib/suggestions/queries';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const metadata = {
  title: 'Company Suggestions',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AdminSuggestionsPage() {
  const adminReady = isSupabaseAdminConfigured();
  const loggedIn = await isAdminSession();
  const dbStatus = await getDirectoryDbStatus();
  const queue = loggedIn && adminReady ? await getPendingSuggestions() : [];
  const orphans = loggedIn && adminReady ? await getOrphanedApprovedSuggestions() : [];
  const directoryBlocked =
    adminReady &&
    (!dbStatus.companiesTableReadable ||
      !dbStatus.companiesPublishReady ||
      dbStatus.seedFallbackActive);
  const needsLogin = adminReady && dbStatus.pendingSuggestions > 0 && !loggedIn;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Company Suggestions</h1>
          <p className="text-sm text-muted-foreground">
            Review multi-source onboarding submissions (FMCSA primary, Google supplemental, BBB
            public scrape). Approving publishes the company profile and revalidates directory caches.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/reviews">Reviews</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin">Companies</Link>
          </Button>
        </div>
      </div>

      {!adminReady && (
        <Card className="mb-6 border-amber-200 bg-amber-50/80 p-4 text-sm text-amber-900">
          Add <code className="rounded bg-amber-100 px-1">SUPABASE_SERVICE_ROLE_KEY</code> to
          load and moderate suggestions.
        </Card>
      )}

      {adminReady ? (
        <Card
          className={`mb-6 p-4 text-sm ${
            directoryBlocked
              ? 'border-destructive/40 bg-destructive/5 text-destructive'
              : 'border-emerald-200 bg-emerald-50/60 text-emerald-900'
          }`}
        >
          <p className="font-medium">Directory database</p>
          <p className="mt-1">{dbStatus.message}</p>
          {dbStatus.supabaseProjectHost ? (
            <p className="mt-1 text-xs text-muted-foreground">
              Connected Supabase project: <code>{dbStatus.supabaseProjectHost}</code>
              {dbStatus.publishUsesRpc ? ' · publish RPC active' : ''}
            </p>
          ) : null}
          {!dbStatus.companiesPublishReady ? (
            <ol className="mt-3 list-decimal pl-5 text-xs space-y-1">
              <li>
                Supabase → <strong>SQL Editor</strong> → run{' '}
                <code>supabase/migrations/20260708140000_ensure_companies_directory.sql</code>
              </li>
              <li>
                Run{' '}
                <code>supabase/migrations/20260709140000_publish_directory_company_rpc.sql</code>
              </li>
              <li>
                Run <code>notify pgrst, &apos;reload schema&apos;;</code> then{' '}
                <strong>Settings → API → Reload schema</strong>
              </li>
              <li>Wait one minute, refresh this page, then click Approve again</li>
            </ol>
          ) : directoryBlocked ? (
            <p className="mt-2 text-xs">
              Submitted companies are stored in <code>company_suggestions</code> until approval
              writes to <code>public.companies</code>. Profile URLs like{' '}
              <code>/companies/vellar-holdings-llc</code> go live only after Approve succeeds.
            </p>
          ) : null}
          <ul className="mt-2 text-xs space-y-0.5">
            <li>Supabase project: {dbStatus.supabaseProjectHost ?? 'not configured'}</li>
            <li>
              Postgres <code>companies</code> table:{' '}
              {dbStatus.postgresCompaniesExists == null
                ? 'unknown (run RPC migration)'
                : dbStatus.postgresCompaniesExists
                  ? 'exists'
                  : 'missing'}
            </li>
            <li>Publish RPC: {dbStatus.publishRpcAvailable ? 'ready' : 'not installed'}</li>
            <li>Pending suggestions: {dbStatus.pendingSuggestions}</li>
            <li>Approved suggestions: {dbStatus.approvedSuggestions}</li>
            <li>API published rows: {dbStatus.companiesRowCount}</li>
          </ul>
        </Card>
      ) : null}

      {needsLogin ? (
        <Card className="mb-6 border-primary/30 bg-primary/5 p-5">
          <p className="font-medium">Sign in to approve suggestions</p>
          <p className="mt-1 text-sm text-muted-foreground">
            There {dbStatus.pendingSuggestions === 1 ? 'is' : 'are'}{' '}
            <strong>{dbStatus.pendingSuggestions}</strong> pending suggestion
            {dbStatus.pendingSuggestions === 1 ? '' : 's'} in the database (including Vellar
            Holdings, Cirta Moving, America First Moving, and others). Submitting a company only
            queues it — you must sign in and click <strong>Approve</strong> before{' '}
            <code>/companies/[slug]</code> goes live.
          </p>
          <Suspense fallback={<p className="mt-4 text-sm text-muted-foreground">Loading sign-in…</p>}>
            <AdminLoginForm className="mt-4 max-w-sm" redirectTo="/admin/suggestions" />
          </Suspense>
        </Card>
      ) : null}

      <OrphanedApprovedQueue initialOrphans={orphans} />

      <p className="text-sm text-muted-foreground mb-4">
        {loggedIn
          ? `${queue.length} pending suggestion${queue.length === 1 ? '' : 's'}`
          : `Sign in to view the moderation queue (${dbStatus.pendingSuggestions} pending in database)`}
      </p>

      {loggedIn ? (
        <SuggestionsModerationQueue initialQueue={queue} />
      ) : (
        <Card className="p-8 text-center text-muted-foreground">
          Admin session required to approve or reject suggestions.
        </Card>
      )}
    </div>
  );
}