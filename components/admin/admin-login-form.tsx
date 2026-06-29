'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export function AdminLoginForm({ className }: { className?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [secret, setSecret] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/admin/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret }),
      });

      if (!res.ok) {
        toast.error('Invalid admin credentials');
        setLoading(false);
        return;
      }

      const next = searchParams.get('next') || '/admin/quotes';
      router.push(next);
      router.refresh();
    } catch {
      toast.error('Login failed — try again');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <label className="text-sm font-medium" htmlFor="admin-secret">
        Admin secret
      </label>
      <Input
        id="admin-secret"
        type="password"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
        placeholder="Enter ADMIN_SECRET"
        className="mt-2"
        autoComplete="current-password"
        required
      />
      <Button type="submit" className="mt-4 w-full" disabled={loading || !secret}>
        {loading ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  );
}