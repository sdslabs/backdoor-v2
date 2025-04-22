'use client';

import { useAuthStore } from '@/lib/stores/auth-store';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const AdminRouteLayout = ({ children }: { children: React.ReactNode }) => {
  const { role } = useAuthStore();
  const router = useRouter();

  // Do this on mount
  useEffect(() => {
    if (role !== 'admin') {
      toast.error('You are not authorized to access this page');
      router.push('/dashboard');
    }
  }, []);

  return <>{children}</>;
};

export default AdminRouteLayout;
