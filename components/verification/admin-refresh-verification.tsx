'use client';

import { useTransition } from 'react';
import { RefreshCw } from 'lucide-react';
import { refreshCompanyVerificationData } from '@/actions/refresh-company-verification';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function AdminRefreshVerification({ companyId }: { companyId: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="gap-2"
      disabled={pending}
      onClick={() => {
        startTransition(async () => {
          const res = await refreshCompanyVerificationData(companyId);
          if (!res.success) {
            toast.error(res.error ?? 'Refresh failed');
            return;
          }
          toast.success('Verification data refreshed');
          window.location.reload();
        });
      }}
    >
      <RefreshCw className={`h-4 w-4 ${pending ? 'animate-spin' : ''}`} />
      {pending ? 'Refreshing…' : 'Refresh verification data'}
    </Button>
  );
}