'use client';

import { useAuthStore } from '@/lib/stores/auth-store';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';

const AdminRouteLayout = ({ children }: { children: React.ReactNode }) => {
  const { role, isLoggedIn } = useAuthStore();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn === undefined) {
      return;
    }
    if (isLoggedIn && role === 'admin') {
      setIsAuthorized(true);
    } else {
      toast.error('You are not authorized to access this page');
      router.push('/dashboard');
    }
    setIsLoading(false);
  }, [role, isLoggedIn, router]);

  if (isLoading || !isAuthorized) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner className="m-auto size-8 bg-muted" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminRouteLayout;
