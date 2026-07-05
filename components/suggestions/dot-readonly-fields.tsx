import { Badge } from '@/components/ui/badge';
import { ShieldCheck } from 'lucide-react';
import type { FmcsaSuggestionPreview } from '@/lib/suggestions/types';

type Props = {
  preview: FmcsaSuggestionPreview;
};

function ReadOnlyRow({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div className="grid grid-cols-[120px_1fr] gap-2 text-sm py-1.5 border-b border-border/60 last:border-0">
      <dt className="text-muted-foreground font-medium">{label}</dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  );
}

export function DotReadonlyFields({ preview }: Props) {
  return (
    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-1">
      <div className="flex items-center gap-2 mb-3">
        <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
        <span className="text-sm font-semibold">FMCSA verified carrier data</span>
        <Badge variant="secondary" className="text-[10px] ml-auto">
          Read-only
        </Badge>
      </div>
      <dl>
        <ReadOnlyRow label="Legal name" value={preview.legalName} />
        <ReadOnlyRow label="DBA" value={preview.dbaName} />
        <ReadOnlyRow label="USDOT" value={preview.usdot ? `DOT ${preview.usdot}` : null} />
        <ReadOnlyRow label="MC number" value={preview.mcNumber ? `MC-${preview.mcNumber}` : null} />
        <ReadOnlyRow label="Address" value={preview.headquarters} />
        <ReadOnlyRow label="Phone" value={preview.phone} />
        <ReadOnlyRow label="Authority" value={preview.authorityStatus} />
        <ReadOnlyRow label="Safety rating" value={preview.safetyRating} />
      </dl>
      <p className="text-xs text-muted-foreground pt-2">
        Carrier details are sourced from FMCSA and cannot be edited. Add optional notes below.
      </p>
    </div>
  );
}