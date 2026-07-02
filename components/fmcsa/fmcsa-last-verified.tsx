import { Clock } from 'lucide-react';

function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  const diffMs = Date.now() - then;
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days < 1) return 'today';
  if (days === 1) return '1 day ago';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? '1 month ago' : `${months} months ago`;
}

export function FmcsaLastVerified({
  checkedAt,
  className,
}: {
  checkedAt?: string | null;
  className?: string;
}) {
  if (!checkedAt) {
    return (
      <p className={`text-xs text-muted-foreground ${className ?? ''}`}>
        FMCSA data not yet refreshed
      </p>
    );
  }

  const formatted = new Date(checkedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <p className={`text-xs text-muted-foreground flex items-center gap-1 ${className ?? ''}`}>
      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
      Last verified {formatted} ({formatRelative(checkedAt)})
    </p>
  );
}