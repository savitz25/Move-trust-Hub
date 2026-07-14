import { redirect } from 'next/navigation';
import { listAdminCompanies } from '@/actions/admin-companies';
import { getAdminCompanyStats } from '@/actions/admin-company-stats';
import { isAdminSession } from '@/lib/admin/auth';
import { AdminLoginForm } from '@/components/admin/admin-login-form';
import { CompaniesDashboard } from '@/components/admin/companies-dashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const authed = await isAdminSession();
  if (!authed) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <AdminLoginForm />
      </div>
    );
  }

  let companies;
  let stats;

  try {
    [companies, stats] = await Promise.all([listAdminCompanies(), getAdminCompanyStats()]);
  } catch {
    redirect('/admin/login');
  }

  return <CompaniesDashboard initialCompanies={companies} stats={stats} />;
}