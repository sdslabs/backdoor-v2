'use client';

import { useAuthStore } from '@/lib/stores/auth-store';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { useState, useEffect } from 'react';

const AdminRouteLayout = ({ children }: { children: React.ReactNode }) => {
  const { role, isLoggedIn } = useAuthStore();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn === undefined) {
      setIsLoading(true);
      return;
    }
    setIsLoading(false);
    if (!isLoggedIn || role !== 'admin') {
      toast.error('You are not authorized to access this page');
      redirect('/dashboard');
    }
  }, [isLoggedIn, role]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner className="m-auto size-8 bg-muted" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminRouteLayout;
