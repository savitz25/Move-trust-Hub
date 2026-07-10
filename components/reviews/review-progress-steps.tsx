import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ReviewFlowStep = 'rate' | 'write' | 'submit' | 'done';

const STEPS: { id: ReviewFlowStep; label: string }[] = [
  { id: 'rate', label: 'Rate' },
  { id: 'write', label: 'Write' },
  { id: 'submit', label: 'Submit' },
  { id: 'done', label: 'Done' },
];

type Props = {
  current: ReviewFlowStep;
  className?: string;
};

function stepIndex(step: ReviewFlowStep) {
  return STEPS.findIndex((s) => s.id === step);
}

export function ReviewProgressSteps({ current, className }: Props) {
  const activeIndex = stepIndex(current);

  return (
    <nav aria-label="Review progress" className={cn('mb-8', className)}>
      <ol className="flex items-center justify-between gap-2">
        {STEPS.map((step, index) => {
          const isComplete = index < activeIndex;
          const isCurrent = index === activeIndex;

          return (
            <li key={step.id} className="flex flex-1 items-center min-w-0">
              <div className="flex flex-col items-center gap-1.5 w-full">
                <div
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors',
                    isComplete && 'border-primary bg-primary text-primary-foreground',
                    isCurrent && 'border-primary bg-primary/10 text-primary',
                    !isComplete && !isCurrent && 'border-muted-foreground/25 text-muted-foreground'
                  )}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {isComplete ? <Check className="h-4 w-4" aria-hidden="true" /> : index + 1}
                </div>
                <span
                  className={cn(
                    'text-xs font-medium truncate w-full text-center',
                    isCurrent ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < STEPS.length - 1 ? (
                <div
                  className={cn(
                    'hidden sm:block h-0.5 flex-1 mx-1 rounded-full -mt-5',
                    index < activeIndex ? 'bg-primary' : 'bg-muted-foreground/20'
                  )}
                  aria-hidden="true"
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}