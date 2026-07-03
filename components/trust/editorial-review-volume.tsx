import {
  EDITORIAL_REVIEW_VOLUME_NOTE,
  formatEditorialReviewVolume,
} from '@/lib/trust/review-display-policy';

type Props = {
  count: number;
  className?: string;
  showNote?: boolean;
};

export function EditorialReviewVolume({
  count,
  className = '',
  showNote = false,
}: Props) {
  return (
    <span className={className} title={EDITORIAL_REVIEW_VOLUME_NOTE}>
      {formatEditorialReviewVolume(count)}
      {showNote ? (
        <span className="block text-[10px] text-muted-foreground font-normal mt-0.5">
          {EDITORIAL_REVIEW_VOLUME_NOTE}
        </span>
      ) : null}
    </span>
  );
}