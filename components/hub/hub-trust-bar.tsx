import { Shield } from 'lucide-react';

type HubTrustBarProps = {
  items: string[];
};

export function HubTrustBar({ items }: HubTrustBarProps) {
  return (
    <section className="border-y bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          {items.map((item) => (
            <span key={item} className="inline-flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}