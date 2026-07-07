import { isAdminSession } from '@/lib/admin/auth';
import { AdminRefreshVerification } from '@/components/verification/admin-refresh-verification';

export async function AdminRefreshVerificationShell({ companyId }: { companyId: string }) {
  if (!(await isAdminSession())) return null;
  return (
    <div className="rounded-lg border border-dashed border-primary/30 bg-primary/5 p-4 mb-6">
      <p className="text-xs font-medium text-muted-foreground mb-2">Admin tools</p>
      <AdminRefreshVerification companyId={companyId} />
    </div>
  );
}