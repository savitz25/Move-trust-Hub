type FieldSource = {
  entityType?: string | null;
  usdotStatus?: string | null;
  usdot?: string | null;
  mcNumber?: string | null;
  legalName?: string | null;
  dbaName?: string | null;
  physicalAddress?: string | null;
  headquarters?: string | null;
  addressStreet?: string | null;
  addressCity?: string | null;
  addressState?: string | null;
  addressZip?: string | null;
  phone?: string | null;
  powerUnits?: number | null;
  carrierOperation?: string | null;
  cargoCarried?: string | null;
  mcs150Mileage?: string | null;
  authorityStatus?: string | null;
  safetyRating?: string | null;
};

type FieldRow = {
  label: string;
  value: string | null;
  colSpan?: boolean;
};

function formatUsdot(value: string | null | undefined): string | null {
  if (!value) return null;
  const digits = value.replace(/\D/g, '');
  return digits ? `DOT ${digits}` : null;
}

function formatMc(value: string | null | undefined): string | null {
  if (!value) return null;
  const digits = value.replace(/\D/g, '');
  return digits ? `MC-${digits}` : null;
}

function formatPowerUnits(value: number | null | undefined): string | null {
  if (value === null || value === undefined) return null;
  return String(value);
}

export function buildFmcsaFieldRows(
  source: FieldSource,
  options?: { skipIdentity?: boolean }
): FieldRow[] {
  const addressParts = [source.addressStreet, source.addressCity, source.addressState, source.addressZip]
    .filter(Boolean)
    .join(', ');
  const addressLine =
    source.physicalAddress ?? source.headquarters ?? (addressParts || null);

  const addressDetail =
    source.addressStreet && (source.addressCity || source.addressState || source.addressZip)
      ? [
          source.addressStreet,
          [source.addressCity, source.addressState].filter(Boolean).join(', '),
          source.addressZip,
        ]
          .filter(Boolean)
          .join(' · ')
      : null;

  return [
    { label: 'Entity type', value: source.entityType ?? null },
    { label: 'USDOT status', value: source.usdotStatus ?? null },
    { label: 'USDOT', value: formatUsdot(source.usdot ?? null) },
    { label: 'MC number', value: formatMc(source.mcNumber ?? null) },
    { label: 'Legal name', value: source.legalName ?? null },
    { label: 'DBA', value: source.dbaName ?? null },
    {
      label: 'Physical address',
      value: addressDetail ?? addressLine,
      colSpan: true,
    },
    { label: 'Phone', value: source.phone ?? null },
    { label: 'Power units', value: formatPowerUnits(source.powerUnits) },
    { label: 'Carrier operation', value: source.carrierOperation ?? null, colSpan: true },
    { label: 'Cargo carried', value: source.cargoCarried ?? null, colSpan: true },
    { label: 'MCS-150 mileage / year', value: source.mcs150Mileage ?? null },
    { label: 'Authority status', value: source.authorityStatus ?? null, colSpan: true },
    { label: 'Safety rating', value: source.safetyRating ?? null },
  ].filter(
    (row) =>
      row.value &&
      !(
        options?.skipIdentity && (row.label === 'Legal name' || row.label === 'DBA')
      )
  );
}

type GridProps = {
  source: FieldSource;
  variant?: 'card' | 'readonly';
};

export function FmcsaFieldGrid({
  source,
  variant = 'card',
  skipIdentity = false,
}: GridProps & { skipIdentity?: boolean }) {
  const rows = buildFmcsaFieldRows(source, { skipIdentity });
  if (!rows.length) return null;

  if (variant === 'readonly') {
    return (
      <>
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[140px_1fr] gap-2 text-sm py-1.5 border-b border-border/60 last:border-0"
          >
            <dt className="text-muted-foreground font-medium">{row.label}</dt>
            <dd className="font-medium text-foreground">{row.value}</dd>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {rows.map((row) => (
        <div key={row.label} className={row.colSpan ? 'sm:col-span-2' : undefined}>
          <dt className="text-xs text-muted-foreground">{row.label}</dt>
          <dd className="font-medium">{row.value}</dd>
        </div>
      ))}
    </>
  );
}