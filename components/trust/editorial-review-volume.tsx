import Link from 'next/link';
import {
  EDITORIAL_REVIEW_VOLUME_NOTE,
  formatEditorialReviewVolume,
} from '@/lib/trust/review-display-policy';
import { methodologyHref } from '@/lib/trust/methodology-paths';

type Props = {
  count: number;
  className?: string;
  showNote?: boolean;
  linkToMethodology?: boolean;
};

export function EditorialReviewVolume({
  count,
  className = '',
  showNote = false,
  linkToMethodology = true,
}: Props) {
  const volume = formatEditorialReviewVolume(count);

  const content = linkToMethodology ? (
    <Link
      href={methodologyHref('reviewAttribution')}
      className="underline decoration-muted-foreground/30 underline-offset-2 hover:decoration-primary hover:text-primary transition-colors"
      title={`${EDITORIAL_REVIEW_VOLUME_NOTE} — see methodology`}
    >
      {volume}
    </Link>
  ) : (
    <span>{volume}</span>
  );

  return (
    <span className={className} title={EDITORIAL_REVIEW_VOLUME_NOTE}>
      {content}
      {showNote ? (
        <span className="block text-[10px] text-muted-foreground font-normal mt-0.5">
          {EDITORIAL_REVIEW_VOLUME_NOTE}
        </span>
      ) : null}
    </span>
  );
}