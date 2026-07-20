'use client';

import { MapPin, Route } from 'lucide-react';
import type { ServiceScope } from '@/lib/suggestions/service-scope';
import { cn } from '@/lib/utils';

type Props = {
  value: ServiceScope | null;
  onChange: (scope: ServiceScope) => void;
  disabled?: boolean;
};

export function ServiceScopeStep({ value, onChange, disabled }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium text-foreground">What type of mover is this?</p>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          Choose first — it controls verification and where the company appears on Move Trust Hub.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          disabled={disabled}
          onClick={() => onChange('interstate')}
          className={cn(
            'rounded-xl border p-4 text-left transition-colors',
            value === 'interstate'
              ? 'border-primary bg-primary/5 ring-2 ring-primary/30'
              : 'hover:border-primary/40 hover:bg-muted/40'
          )}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-100 text-sky-800">
            <Route className="h-5 w-5" aria-hidden />
          </div>
          <p className="mt-3 font-semibold text-foreground">Interstate</p>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            Crosses state lines. Requires a USDOT number and FMCSA licensing. Listed in the main
            Moving Companies directory.
          </p>
        </button>

        <button
          type="button"
          disabled={disabled}
          onClick={() => onChange('intrastate')}
          className={cn(
            'rounded-xl border p-4 text-left transition-colors',
            value === 'intrastate'
              ? 'border-primary bg-primary/5 ring-2 ring-primary/30'
              : 'hover:border-primary/40 hover:bg-muted/40'
          )}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800">
            <MapPin className="h-5 w-5" aria-hidden />
          </div>
          <p className="mt-3 font-semibold text-foreground">Intrastate / Local</p>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            Operates only within one state (no USDOT required). Verified with Google + BBB and
            shown only on the county pages you select — never the main interstate directory.
          </p>
        </button>
      </div>
    </div>
  );
}
