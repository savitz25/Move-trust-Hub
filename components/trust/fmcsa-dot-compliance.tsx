import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { LicenseDisplay } from '@/components/trust/license-display';
import {
  ENTITY_TYPE_NOT_AVAILABLE,
  resolveEntityTypeLabelForProfile,
} from '@/lib/fmcsa/entity-type-display';
import {
  buildFmcsaSaferUrl,
  normalizeMc,
  normalizeUsdot,
} from '@/lib/trust/license-verification';
import type { Company } from '@/types';

type Props = {
  company: Pick<
    Company,
    | 'usdotNumber'
    | 'mcNumber'
    | 'entityType'
    | 'usdotStatus'
    | 'powerUnits'
    | 'services'
    | 'authorityActive'
    | 'outOfService'
    | 'physicalAddress'
    | 'phone'
    | 'headquarters'
  >;
  /** Optional raw FMCSA payload for display-time entity type resolution */
  fmcsaRaw?: Record<string, unknown> | null;
  className?: string;
};

function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits.startsWith('1')) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return phone.trim();
}

function telHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, '');
  return digits || phone.trim();
}

function formatUsdot(value: string): string | null {
  const digits = normalizeUsdot(value);
  return digits ? `DOT ${digits}` : null;
}

function formatMc(value: string): string | null {
  const digits = normalizeMc(value);
  return digits ? `MC-${digits}` : null;
}

function formatUsdotStatus(status: Company['usdotStatus']): string | null {
  if (!status) return null;
  if (status === 'OUT OF SERVICE') return 'Out of Service';
  if (status === 'INACTIVE') return 'Inactive';
  return 'Active';
}

function formatAuthorityStatus(
  company: Pick<Company, 'authorityActive' | 'outOfService' | 'usdotStatus'>
): string | null {
  if (company.outOfService) return 'Out of Service';
  if (company.authorityActive === true) return 'Active';
  if (company.authorityActive === false) return 'Inactive';

  const usdotStatus = formatUsdotStatus(company.usdotStatus);
  if (usdotStatus) return usdotStatus;
  return null;
}

function hasFmcsaComplianceContext(
  company: Pick<
    Company,
    'usdotNumber' | 'mcNumber' | 'entityType' | 'usdotStatus' | 'authorityActive' | 'outOfService'
  >
): boolean {
  return Boolean(
    normalizeUsdot(company.usdotNumber) ||
      normalizeMc(company.mcNumber) ||
      company.entityType ||
      company.usdotStatus ||
      company.authorityActive != null ||
      company.outOfService
  );
}

export function FmcsaDotCompliance({ company, fmcsaRaw, className = '' }: Props) {
  const usdotLabel = formatUsdot(company.usdotNumber);
  const mcLabel = formatMc(company.mcNumber);
  const hasFmcsaContext = hasFmcsaComplianceContext(company);

  const entityTypeDisplay = resolveEntityTypeLabelForProfile(
    {
      entityType: company.entityType,
      fmcsaRaw,
      services: company.services,
    },
    hasFmcsaContext
  );

  const physicalAddress =
    company.physicalAddress?.trim() || company.headquarters?.trim() || null;
  const phoneRaw = company.phone?.trim() || null;

  const rows: Array<{
    label: string;
    value: string | null;
    mono?: boolean;
    muted?: boolean;
    href?: string | null;
    wide?: boolean;
  }> = [
    { label: 'Entity Type', value: entityTypeDisplay, muted: entityTypeDisplay === ENTITY_TYPE_NOT_AVAILABLE },
    { label: 'US DOT Number', value: usdotLabel, mono: true },
    { label: 'MC Number', value: mcLabel, mono: true },
    { label: 'US DOT Status', value: formatUsdotStatus(company.usdotStatus) },
    { label: 'Authority Status', value: formatAuthorityStatus(company) },
    {
      label: 'Power Units',
      value:
        company.powerUnits !== null && company.powerUnits !== undefined
          ? String(company.powerUnits)
          : null,
    },
    {
      label: 'Physical Address',
      value: physicalAddress,
      wide: true,
    },
    {
      label: 'Phone',
      value: phoneRaw ? formatPhoneDisplay(phoneRaw) : null,
      href: phoneRaw ? `tel:${telHref(phoneRaw)}` : null,
    },
  ].filter((row) => row.value);

  if (!rows.length) {
    return <LicenseDisplay company={company} className={className} />;
  }

  const usdot = normalizeUsdot(company.usdotNumber);
  const fmcsaUrl = usdot ? buildFmcsaSaferUrl(usdot) : null;

  return (
    <div className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
        {rows.map((row) => (
          <div key={row.label} className={row.wide ? 'sm:col-span-2' : undefined}>
            <div className="text-muted-foreground text-xs">{row.label}</div>
            <div
              className={
                row.mono
                  ? 'font-mono text-lg'
                  : row.muted
                    ? 'font-medium text-muted-foreground'
                    : 'font-semibold text-foreground'
              }
            >
              {row.href ? (
                <a href={row.href} className="text-primary hover:underline">
                  {row.value}
                </a>
              ) : (
                row.value
              )}
            </div>
          </div>
        ))}
        {fmcsaUrl ? (
          <div className="sm:col-span-2">
            <Link
              href={fmcsaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              Verify on FMCSA SAFER
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}