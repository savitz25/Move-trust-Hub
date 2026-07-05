import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';
import type { PendingSuggestion } from '@/lib/suggestions/queries';

type Props = {
  suggestion: PendingSuggestion;
};

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div className="text-sm">
      <span className="text-muted-foreground">{label}: </span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

export function AdminFmcsaPreview({ suggestion }: Props) {
  const preview = suggestion.fmcsa_preview as {
    legalName?: string;
    dbaName?: string;
    physicalAddress?: string;
    phone?: string;
    allowedToOperate?: string;
    safetyRating?: string;
    source?: string;
  } | null;

  const raw = suggestion.fmcsa_raw as Record<string, unknown> | null;
  const commonAuthority = raw?.commonAuthorityStatus as string | undefined;
  const brokerAuthority = raw?.brokerAuthorityStatus as string | undefined;
  const allowedToOperate = raw?.allowedToOperate as string | undefined;

  return (
    <Card className="mt-4 border-primary/20 bg-primary/5 p-4">
      <div className="flex items-center gap-2 mb-3">
        <ShieldCheck className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold">FMCSA record preview</span>
        <Badge variant="secondary" className="text-[10px] ml-auto">
          Approve uses this data
        </Badge>
      </div>
      <div className="grid gap-1.5 sm:grid-cols-2">
        <Field label="Legal name" value={suggestion.legal_name ?? preview?.legalName} />
        <Field label="DBA" value={preview?.dbaName} />
        <Field label="USDOT" value={suggestion.usdot ? `DOT ${suggestion.usdot}` : null} />
        <Field label="MC" value={suggestion.mc_number ? `MC-${suggestion.mc_number}` : null} />
        <Field label="Address" value={suggestion.headquarters ?? preview?.physicalAddress} />
        <Field label="Phone" value={suggestion.phone ?? preview?.phone} />
        <Field label="Authority" value={suggestion.authority_status} />
        <Field label="Safety rating" value={preview?.safetyRating} />
        <Field label="Allowed to operate" value={allowedToOperate ?? preview?.allowedToOperate} />
        <Field label="Common authority" value={commonAuthority} />
        <Field label="Broker authority" value={brokerAuthority} />
      </div>
      {suggestion.details ? (
        <p className="mt-3 text-sm text-muted-foreground border-t pt-3">
          <span className="font-medium text-foreground">Submitter notes: </span>
          {suggestion.details}
        </p>
      ) : null}
    </Card>
  );
}