import { Lightbulb, ShieldCheck } from 'lucide-react';

const TIPS = [
  'Describe pickup, delivery, and how the crew handled your belongings.',
  'Mention pricing accuracy — deposits, final bill, and any surprise fees.',
  'Note communication quality: responsiveness, updates, and problem resolution.',
  'Keep it factual and constructive. Specific details help other families most.',
];

const TRUST = [
  'Moderated before publish',
  'Email never shown publicly',
  'No paid rankings or placements',
];

export function ReviewGuidelines() {
  return (
    <div className="space-y-3">
      <aside className="rounded-xl border border-primary/15 bg-primary/5 px-4 py-3">
        <p className="flex items-center gap-1.5 text-sm font-medium text-foreground">
          <Lightbulb className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
          What makes a helpful review
        </p>
        <ul className="mt-2 space-y-1 text-xs text-muted-foreground leading-relaxed list-disc pl-5">
          {TIPS.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </aside>

      <aside className="rounded-xl border bg-muted/30 px-4 py-3">
        <p className="flex items-center gap-1.5 text-sm font-medium text-foreground">
          <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" aria-hidden="true" />
          Why families trust these reviews
        </p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {TRUST.map((item) => (
            <li
              key={item}
              className="rounded-full border bg-background px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
