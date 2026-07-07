import Link from 'next/link';
import {
  getOrphanedApprovedSuggestionQueue,
  getSuggestionModerationQueue,
} from '@/actions/moderate-suggestions';
import { OrphanedApprovedQueue } from '@/components/suggestions/orphaned-approved-queue';
import { SuggestionsModerationQueue } from '@/components/suggestions/suggestions-moderation-queue';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const metadata = {
  title: 'Company Suggestions',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AdminSuggestionsPage() {
  const [queue, orphans] = await Promise.all([
    getSuggestionModerationQueue(),
    getOrphanedApprovedSuggestionQueue(),
  ]);
  const adminReady = isSupabaseAdminConfigured();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Company Suggestions</h1>
          <p className="text-sm text-muted-foreground">
            Approve user-submitted carriers to add them to the Move Trust Hub directory.
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

      <OrphanedApprovedQueue initialOrphans={orphans} />

      <p className="text-sm text-muted-foreground mb-4">
        {queue.length} pending suggestion{queue.length === 1 ? '' : 's'}
      </p>

      <SuggestionsModerationQueue initialQueue={queue} />
    </div>
  );
}