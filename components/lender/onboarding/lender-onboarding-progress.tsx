import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const STEPS = [
  { id: 1, label: 'NMLS Verify' },
  { id: 2, label: 'Reviews & Data' },
  { id: 3, label: 'Your Details' },
  { id: 4, label: 'Submit' },
] as const;

type Props = {
  current: 1 | 2 | 3 | 4;
  className?: string;
};

export function LenderOnboardingProgress({ current, className }: Props) {
  return (
    <nav aria-label="Onboarding progress" className={cn('mb-8', className)}>
      <ol className="flex items-center justify-between gap-2">
        {STEPS.map((step) => {
          const isComplete = step.id < current;
          const isCurrent = step.id === current;
          return (
            <li key={step.id} className="flex flex-1 flex-col items-center gap-1.5">
              <div
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold',
                  isComplete && 'border-[#3B82F6] bg-[#3B82F6] text-white',
                  isCurrent && 'border-[#3B82F6] bg-[#3B82F6]/10 text-[#0A2540]',
                  !isComplete && !isCurrent && 'border-zinc-300 text-zinc-400'
                )}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {isComplete ? <Check className="h-4 w-4" /> : step.id}
              </div>
              <span
                className={cn(
                  'text-xs font-medium text-center',
                  isCurrent ? 'text-[#0A2540]' : 'text-zinc-500'
                )}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}