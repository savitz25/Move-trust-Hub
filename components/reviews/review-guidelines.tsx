import { Lightbulb } from 'lucide-react';

const TIPS = [
  'Describe pickup, delivery, and how the crew handled your belongings.',
  'Mention pricing accuracy — deposits, final bill, and any surprise fees.',
  'Note communication quality: responsiveness, updates, and problem resolution.',
  'Keep it factual and constructive. Specific details help other families most.',
];

export function ReviewGuidelines() {
  return (
    <aside className="rounded-lg border border-blue-200/60 bg-blue-50/50 dark:bg-blue-950/20 px-4 py-3">
      <p className="flex items-center gap-1.5 text-sm font-medium text-foreground">
        <Lightbulb className="h-4 w-4 text-blue-600 shrink-0" aria-hidden="true" />
        Tips for a helpful review
      </p>
      <ul className="mt-2 space-y-1 text-xs text-muted-foreground leading-relaxed list-disc pl-5">
        {TIPS.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>
    </aside>
  );
}