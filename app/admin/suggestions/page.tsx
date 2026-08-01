import Link from 'next/link';
import { Suspense } from 'react';
import { OrphanedApprovedQueue } from '@/components/suggestions/orphaned-approved-queue';
import { SuggestionsModerationQueue } from '@/components/suggestions/suggestions-moderation-queue';
import { AdminLoginForm } from '@/components/admin/admin-login-form';
import { isAdminSession } from '@/lib/admin/auth';
import { getDirectoryDbStatus } from '@/lib/directory/directory-db-status';
import { getOrphanedApprovedSuggestions } from '@/lib/suggestions/repair-approved';
import { getPendingSuggestions } from '@/lib/suggestions/queries';
import type { PendingSuggestion } from '@/lib/suggestions/suggestion-shared';
import type { OrphanedApprovedSuggestion } from '@/lib/suggestions/suggestion-shared';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { logger } from '@/lib/logging/logger';

export const metadata = {
  title: 'Company Suggestions',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

type LoadResult = {
  queue: PendingSuggestion[];
  orphans: OrphanedApprovedSuggestion[];
  loadError: string | null;
};

async function loadQueues(loggedIn: boolean, adminReady: boolean): Promise<LoadResult> {
  if (!loggedIn || !adminReady) {
    return { queue: [], orphans: [], loadError: null };
  }

  try {
    const [queue, orphans] = await Promise.all([
      getPendingSuggestions(),
      getOrphanedApprovedSuggestions(),
    ]);
    return { queue, orphans, loadError: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    logger.error('admin.suggestions_page_load_failed', { message });
    return {
      queue: [],
      orphans: [],
      loadError: `Could not load suggestion queue: ${message}`,
    };
  }
}

export default async function AdminSuggestionsPage() {
  const adminReady = isSupabaseAdminConfigured();
  const loggedIn = await isAdminSession();

  let dbStatus;
  let dbStatusError: string | null = null;
  try {
    dbStatus = await getDirectoryDbStatus();
  } catch (err) {
    dbStatusError = err instanceof Error ? err.message : String(err);
    dbStatus = {
      supabaseConfigured: adminReady,
      adminConfigured: adminReady,
      supabaseProjectHost: null,
      companiesTableReadable: false,
      companiesPublishReady: false,
      publishUsesRpc: false,
      companiesRowCount: 0,
      seedFallbackActive: true,
      suggestionsTableReadable: false,
      pendingSuggestions: 0,
      approvedSuggestions: 0,
      approvedWithoutCompany: 0,
      message: `Directory status check failed: ${dbStatusError}`,
    };
  }

  const { queue, orphans, loadError } = await loadQueues(loggedIn, adminReady);
  const directoryBlocked =
    adminReady &&
    (!dbStatus.companiesTableReadable ||
      !dbStatus.companiesPublishReady ||
      dbStatus.seedFallbackActive);
  const needsLogin = adminReady && !loggedIn;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
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
          Add <code className="rounded bg-amber-100 px-1">SUPABASE_SERVICE_ROLE_KEY</code> to load
          and moderate suggestions.
        </Card>
      )}

      {dbStatusError ? (
        <Card className="mb-6 border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
          <p className="font-medium">Directory status error</p>
          <p className="mt-1">{dbStatusError}</p>
        </Card>
      ) : null}

      {loadError ? (
        <Card className="mb-6 border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
          <p className="font-medium">Queue load error</p>
          <p className="mt-1">{loadError}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            This is not an empty queue — fix the error above and refresh. Check Supabase{' '}
            <code>company_suggestions</code> schema and service role key.
          </p>
        </Card>
      ) : null}

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
            <ol className="mt-3 list-decimal space-y-1 pl-5 text-xs">
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
          <ul className="mt-2 space-y-0.5 text-xs">
            <li>Supabase project: {dbStatus.supabaseProjectHost ?? 'not configured'}</li>
            <li>
              <code>companies</code> table readable:{' '}
              {dbStatus.companiesTableReadable ? 'yes' : 'no'}
            </li>
            <li>
              Publish ready: {dbStatus.companiesPublishReady ? 'yes' : 'no'}
              {dbStatus.publishUsesRpc ? ' (RPC path)' : ''}
            </li>
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
            {dbStatus.pendingSuggestions > 0 ? (
              <>
                There {dbStatus.pendingSuggestions === 1 ? 'is' : 'are'}{' '}
                <strong>{dbStatus.pendingSuggestions}</strong> pending suggestion
                {dbStatus.pendingSuggestions === 1 ? '' : 's'} in the database. Submitting a company
                only queues it — you must sign in and click <strong>Approve</strong> before{' '}
                <code>/companies/[slug]</code> goes live.
              </>
            ) : (
              <>
                Admin authentication is required to view and moderate the company suggestion queue.
              </>
            )}
          </p>
          <Suspense fallback={<p className="mt-4 text-sm text-muted-foreground">Loading sign-in…</p>}>
            <AdminLoginForm className="mt-4 max-w-sm" redirectTo="/admin/suggestions" />
          </Suspense>
        </Card>
      ) : null}

      <OrphanedApprovedQueue initialOrphans={orphans} />

      <p className="mb-4 text-sm text-muted-foreground">
        {loggedIn
          ? loadError
            ? 'Queue unavailable (see error above)'
            : `${queue.length} pending suggestion${queue.length === 1 ? '' : 's'}`
          : `Sign in to view the moderation queue${
              dbStatus.pendingSuggestions > 0
                ? ` (${dbStatus.pendingSuggestions} pending in database)`
                : ''
            }`}
      </p>

      {loggedIn ? (
        loadError ? null : (
          <SuggestionsModerationQueue initialQueue={queue} />
        )
      ) : (
        <Card className="p-8 text-center text-muted-foreground">
          Admin session required to approve or reject suggestions.
        </Card>
      )}
    </div>
  );
}
