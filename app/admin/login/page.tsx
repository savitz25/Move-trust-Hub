import { AdminLoginForm } from '@/components/admin/admin-login-form';

export const metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="container mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Move Trust Hub Admin</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Sign in with your admin secret to view quote analytics and manage data.
      </p>
      <AdminLoginForm className="mt-8" redirectTo="/admin" />
    </div>
  );
}