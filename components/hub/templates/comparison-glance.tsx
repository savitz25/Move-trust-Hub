import { memo } from 'react';
import { Scale } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ResourceArticleSection } from '@/lib/hub/templates/types';

type Props = {
  section: ResourceArticleSection;
};

/** Renders the first "at a glance" section as a scannable comparison card grid. */
export const ComparisonGlance = memo(function ComparisonGlance({ section }: Props) {
  if (!section.bullets?.length) return null;

  return (
    <Card className="mb-10 border-emerald-200/60 bg-emerald-50/40 dark:border-emerald-900/40 dark:bg-emerald-950/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Scale className="h-5 w-5 text-emerald-600" aria-hidden="true" />
          {section.heading}
        </CardTitle>
        <p className="text-sm leading-relaxed text-muted-foreground">{section.content}</p>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-3 sm:grid-cols-2">
          {section.bullets.map((bullet) => {
            const [label, ...rest] = bullet.split(':');
            const detail = rest.join(':').trim();
            return (
              <li
                key={bullet}
                className="rounded-lg border bg-background/80 px-4 py-3 text-sm leading-relaxed"
              >
                <span className="font-medium text-foreground">{label.trim()}</span>
                {detail ? (
                  <span className="mt-1 block text-muted-foreground">{detail}</span>
                ) : null}
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
});