'use client';

import { MyInsuranceProvider } from '@/components/insurance/my-insurance/my-insurance-provider';
import { AuthModal } from '@/components/insurance/my-insurance/auth-modal';
import { CompareTray } from '@/components/insurance/my-insurance/compare-tray';
import type { ReactNode } from 'react';

export function MyInsuranceShell({ children }: { children: ReactNode }) {
  return (
    <MyInsuranceProvider>
      {children}
      <AuthModal />
      <CompareTray />
    </MyInsuranceProvider>
  );
}
