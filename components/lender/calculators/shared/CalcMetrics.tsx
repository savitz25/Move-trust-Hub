import { cn, formatCurrency } from '@/lib/lender/utils';

/** Large monthly payment / primary result — soft blue highlight on light UI */
export function ResultHero({
  label,
  value,
  meta,
  className,
}: {
  label: string;
  value: string;
  meta?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'calc-result-hero rounded-2xl border border-[#BFDBFE] bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] p-6 text-center shadow-sm',
        className,
      )}
    >
      <p className="text-sm font-medium text-[#1E40AF]">{label}</p>
      <p className="mt-1 text-3xl font-extrabold tracking-tight text-[#111827] md:text-4xl">
        {value}
      </p>
      {meta ? <p className="mt-2 text-xs text-[#6B7280]">{meta}</p> : null}
    </div>
  );
}

export function MetricGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-3 md:grid-cols-3">{children}</div>;
}

export function MetricCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: 'teal' | 'rose';
}) {
  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white p-3 shadow-sm">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6B7280]">
        {label}
      </span>
      <span
        className={cn(
          'mt-1 block text-base font-bold text-[#111827]',
          highlight === 'teal' && 'text-[#059669]',
          highlight === 'rose' && 'text-rose-600',
        )}
      >
        {value}
      </span>
    </div>
  );
}

export function formatUSD(v: number, decimals = 0) {
  return formatCurrency(v);
}
