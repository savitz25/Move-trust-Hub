'use client';

import { useState } from 'react';

export function CopyIdentifierButton({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-border bg-white px-3 text-sm font-medium text-[#0A2540] hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:w-auto"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        } catch {
          setCopied(false);
        }
      }}
    >
      {copied ? `Copied ${label}` : `Copy ${label}`}
    </button>
  );
}
