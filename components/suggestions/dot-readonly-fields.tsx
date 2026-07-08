import { Badge } from '@/components/ui/badge';
import { ShieldCheck } from 'lucide-react';
import { FmcsaFieldGrid } from '@/components/suggestions/fmcsa-field-grid';
import type { FmcsaSuggestionPreview } from '@/lib/suggestions/types';

type Props = {
  preview: FmcsaSuggestionPreview;
};

export function DotReadonlyFields({ preview }: Props) {
  return (
    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-1">
      <div className="flex items-center gap-2 mb-3">
        <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
        <span className="text-sm font-semibold">FMCSA carrier data</span>
        <Badge variant="default" className="text-[10px] ml-auto">
          FMCSA primary
        </Badge>
      </div>
      <dl>
        <FmcsaFieldGrid source={preview} variant="readonly" />
      </dl>
      <p className="text-xs text-muted-foreground pt-2">
        Carrier details are sourced from FMCSA and cannot be edited. Add optional notes below.
      </p>
    </div>
  );
}