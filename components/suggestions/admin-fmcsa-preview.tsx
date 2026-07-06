import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';
import { buildFmcsaFieldRows } from '@/components/suggestions/fmcsa-field-grid';
import {
  deriveUsdotStatus,
  extractCargoCarried,
  extractCarrierOperation,
  extractEntityType,
  extractMcs150Mileage,
  extractPowerUnits,
  formatAuthorityStatus,
} from '@/lib/fmcsa/carrier-fields';
import type { PendingSuggestion } from '@/lib/suggestions/queries';

type Props = {
  suggestion: PendingSuggestion;
};

export function AdminFmcsaPreview({ suggestion }: Props) {
  const preview = suggestion.fmcsa_preview as {
    legalName?: string;
    dbaName?: string;
    physicalAddress?: string;
    phone?: string;
    allowedToOperate?: string;
    safetyRating?: string;
    entityType?: string;
    usdotStatus?: string;
    powerUnits?: number;
    carrierOperation?: string;
    cargoCarried?: string;
    mcs150Mileage?: string;
    authorityStatus?: string;
    addressStreet?: string;
    addressCity?: string;
    addressState?: string;
    addressZip?: string;
  } | null;

  const raw =
    suggestion.fmcsa_raw && typeof suggestion.fmcsa_raw === 'object'
      ? (suggestion.fmcsa_raw as Record<string, unknown>)
      : null;

  const rows = buildFmcsaFieldRows({
    entityType: preview?.entityType ?? (raw ? extractEntityType(raw) : null),
    usdotStatus:
      (preview?.usdotStatus as 'ACTIVE' | 'OUT OF SERVICE' | 'INACTIVE' | undefined) ??
      (raw ? deriveUsdotStatus(raw) : null),
    usdot: suggestion.usdot,
    mcNumber: suggestion.mc_number,
    legalName: suggestion.legal_name ?? preview?.legalName ?? null,
    dbaName: preview?.dbaName ?? null,
    headquarters: suggestion.headquarters ?? preview?.physicalAddress ?? null,
    addressStreet: preview?.addressStreet ?? null,
    addressCity: preview?.addressCity ?? null,
    addressState: preview?.addressState ?? null,
    addressZip: preview?.addressZip ?? null,
    phone: suggestion.phone ?? preview?.phone ?? null,
    powerUnits: preview?.powerUnits ?? (raw ? extractPowerUnits(raw) : null),
    carrierOperation:
      preview?.carrierOperation ?? (raw ? extractCarrierOperation(raw) : null),
    cargoCarried: preview?.cargoCarried ?? (raw ? extractCargoCarried(raw) : null),
    mcs150Mileage: preview?.mcs150Mileage ?? (raw ? extractMcs150Mileage(raw) : null),
    authorityStatus:
      suggestion.authority_status ??
      preview?.authorityStatus ??
      (raw ? formatAuthorityStatus(raw) : null),
    safetyRating: preview?.safetyRating ?? null,
  });

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
        {rows.map((row) => (
          <div
            key={row.label}
            className={`text-sm ${row.colSpan ? 'sm:col-span-2' : ''}`}
          >
            <span className="text-muted-foreground">{row.label}: </span>
            <span className="font-medium">{row.value}</span>
          </div>
        ))}
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