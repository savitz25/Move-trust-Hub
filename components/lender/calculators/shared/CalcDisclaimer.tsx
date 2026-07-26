import { CALC_DISCLAIMER } from '@/lib/lender/calculators/registry';
import { cn } from '@/lib/lender/utils';

export function CalcDisclaimer({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        'border-l-[3px] border-[#3B82F6] bg-[#EFF6FF] py-2 pl-3 text-xs leading-relaxed text-[#4B5563]',
        className,
      )}
      role="note"
    >
      {CALC_DISCLAIMER}
    </p>
  );
}
