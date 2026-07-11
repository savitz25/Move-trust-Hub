import { unpackCoverageFromFmcsaPreview } from '@/lib/suggestions/suggestion-coverage-storage';
import type { PendingSuggestion } from '@/lib/suggestions/queries';
import { Badge } from '@/components/ui/badge';

type Props = {
  suggestion: PendingSuggestion;
};

export function AdminCoveragePreview({ suggestion }: Props) {
  const coverage = unpackCoverageFromFmcsaPreview(suggestion.fmcsa_preview);
  if (!coverage?.consentGiven) return null;

  return (
    <div className="mt-3 rounded-md border bg-muted/20 p-3 space-y-2">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-medium">Website coverage scan</span>
        <Badge variant="outline">{coverage.status}</Badge>
        {coverage.isNationalOnly ? <Badge variant="secondary">National only</Badge> : null}
      </div>
      {coverage.websiteUrl ? (
        <p className="text-xs text-muted-foreground break-all">{coverage.websiteUrl}</p>
      ) : null}
      {coverage.summary ? <p className="text-sm">{coverage.summary}</p> : null}
      {coverage.error ? (
        <p className="text-xs text-amber-700 dark:text-amber-300">{coverage.error}</p>
      ) : null}
    </div>
  );
}