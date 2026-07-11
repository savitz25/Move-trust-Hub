import { Database } from 'lucide-react';
import { cn } from '@/lib/utils';

function formatSyncDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

type ProfileDataFreshnessProps = {
  fmcsaLastChecked?: string | null;
  lastUpdated?: string | null;
  className?: string;
};

/**
 * Prominent, dated freshness note for company profiles.
 * Builds trust by showing when FMCSA licensing data was last synced.
 */
export function ProfileDataFreshness({
  fmcsaLastChecked,
  lastUpdated,
  className,
}: ProfileDataFreshnessProps) {
  const syncDate = fmcsaLastChecked ?? lastUpdated;

  return (
    <aside
      className={cn(
        'rounded-xl border border-emerald-200/80 bg-emerald-50/60 px-4 py-3 text-sm text-emerald-950',
        className
      )}
      role="note"
      aria-label="Data freshness"
    >
      <p className="flex items-start gap-2 leading-relaxed">
        <Database className="h-4 w-4 shrink-0 mt-0.5 text-emerald-700" aria-hidden="true" />
        <span>
          {syncDate ? (
            <>
              <strong className="font-semibold">Licensing and compliance data</strong> last synced
              from{' '}
              <a
                href="https://safer.fmcsa.dot.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-2 hover:text-emerald-800"
              >
                FMCSA SAFER
              </a>{' '}
              on <time dateTime={syncDate}>{formatSyncDate(syncDate)}</time>.
              {lastUpdated && fmcsaLastChecked && lastUpdated !== fmcsaLastChecked ? (
                <span className="block text-xs text-emerald-800/80 mt-1">
                  Profile editorial content last updated{' '}
                  <time dateTime={lastUpdated}>{formatSyncDate(lastUpdated)}</time>.
                </span>
              ) : null}
            </>
          ) : (
            <>
              <strong className="font-semibold">FMCSA licensing data</strong> sync pending — verify
              current authority on{' '}
              <a
                href="https://safer.fmcsa.dot.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-2 hover:text-emerald-800"
              >
                FMCSA SAFER
              </a>{' '}
              before booking.
            </>
          )}
        </span>
      </p>
    </aside>
  );
}