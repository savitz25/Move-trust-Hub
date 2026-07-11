import { BadgeCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { VERIFICATION_BADGE_LEGEND } from '@/lib/trust/site-messaging';
import { cn } from '@/lib/utils';

const DIRECTORY_LEGEND = VERIFICATION_BADGE_LEGEND.find((item) => item.id === 'directory')!;

type DirectoryVerifiedBadgeProps = {
  className?: string;
  compact?: boolean;
};

export function DirectoryVerifiedBadge({ className, compact = false }: DirectoryVerifiedBadgeProps) {
  return (
    <Badge
      variant="success"
      className={cn(compact && 'text-[10px] h-fit', className)}
      title={DIRECTORY_LEGEND.description}
    >
      <BadgeCheck className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
      {DIRECTORY_LEGEND.label}
    </Badge>
  );
}