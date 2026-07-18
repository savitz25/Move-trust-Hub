'use client';

import {
  InfoTooltip as SharedInfoTooltip,
  type InfoTooltipProps,
} from '@/components/ui/info-tooltip';

type LegacyProps = {
  label: string;
  content: string;
};

/**
 * Auto-transport helper — accepts shared InfoTooltip props or legacy `{ label, content }`.
 */
export function InfoTooltip(props: InfoTooltipProps | LegacyProps) {
  if ('label' in props && 'content' in props) {
    return <SharedInfoTooltip title={props.label} description={props.content} />;
  }
  return <SharedInfoTooltip {...props} />;
}

export type { InfoTooltipProps };