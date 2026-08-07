import { Database } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  buildCompanyDateStamps,
  formatRecordDate,
  primaryRegulatoryDate,
} from '@/lib/data-quality/record-dates';

type ProfileDataFreshnessProps = {
  fmcsaLastChecked?: string | null;
  bbbLastChecked?: string | null;
  lastUpdated?: string | null;
  googleSyncedAt?: string | null;
  className?: string;
};

/**
 * Honest data freshness — only real sync/update events, never deploy-time stamps.
 * Separates regulatory refresh from profile record updates.
 */
export function ProfileDataFreshness({
  fmcsaLastChecked,
  bbbLastChecked,
  lastUpdated,
  googleSyncedAt,
  className,
}: ProfileDataFreshnessProps) {
  const regulatory = primaryRegulatoryDate({ fmcsaLastChecked, lastUpdated });
  const stamps = buildCompanyDateStamps({
    fmcsaLastChecked,
    bbbLastChecked,
    lastUpdated,
    googleSyncedAt,
  });

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
          {regulatory ? (
            <>
              <strong className="font-semibold">Regulatory data</strong> last refreshed from{' '}
              <a
                href="https://safer.fmcsa.dot.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-2 hover:text-emerald-800"
              >
                FMCSA SAFER
              </a>{' '}
              on <time dateTime={regulatory}>{formatRecordDate(regulatory)}</time>.
            </>
          ) : (
            <>
              <strong className="font-semibold">FMCSA licensing data</strong> has no recorded refresh
              timestamp on this profile — verify current authority on{' '}
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
          {stamps
            .filter((s) => s.kind !== 'regulatory_refreshed' || s.iso !== regulatory)
            .map((s) => (
              <span key={`${s.kind}-${s.iso}`} className="block text-xs text-emerald-800/80 mt-1">
                {s.label}:{' '}
                <time dateTime={s.iso}>{formatRecordDate(s.iso)}</time>
              </span>
            ))}
        </span>
      </p>
    </aside>
  );
}
