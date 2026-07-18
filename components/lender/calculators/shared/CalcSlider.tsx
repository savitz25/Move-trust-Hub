'use client';

import { Slider } from '@/components/lender/ui/slider';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import { cn } from '@/lib/lender/utils';

interface CalcSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
  suffix?: string;
  tip?: string;
  className?: string;
}

export function CalcSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
  suffix,
  tip,
  className,
}: CalcSliderProps) {
  const display = format ? format(value) : `${value}${suffix ?? ''}`;
  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex justify-between text-sm">
        <span className="inline-flex items-center gap-1.5 font-medium text-[#0F172A] dark:text-zinc-200">
          {label}
          {tip ? <InfoTooltip title={label} description={tip} /> : null}
        </span>
        <span className="font-bold text-emerald-600">{display}</span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v[0])}
        aria-label={label}
      />
    </div>
  );
}