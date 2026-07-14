import { listAdminCompanies } from '@/actions/admin-companies';
import { getAdminCompanyStats } from '@/actions/admin-company-stats';
import { isAdminSession } from '@/lib/admin/auth';
import { loadAdminCompaniesForDashboard } from '@/lib/admin/load-companies-dashboard';
import { AdminLoginForm } from '@/components/admin/admin-login-form';
import { CompaniesDashboard } from '@/components/admin/companies-dashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const authed = await isAdminSession();
  if (!authed) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <AdminLoginForm redirectTo="/admin" />
      </div>
    );
  }

  const [{ companies, warning, source }, stats] = await Promise.all([
    loadAdminCompaniesForDashboard(),
    getAdminCompanyStats().catch(() => null),
  ]);

  return (
    <CompaniesDashboard
      initialCompanies={companies}
      stats={stats}
      loadWarning={warning}
      dataSource={source}
    />
  );
}