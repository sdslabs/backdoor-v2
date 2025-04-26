'use client';

import { useAuthStore } from '@/lib/stores/auth-store';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

const AdminRouteLayout = ({ children }: { children: React.ReactNode }) => {
  const { role, isLoggedIn } = useAuthStore();

  if (isLoggedIn === undefined) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner className="m-auto size-8 bg-muted" />
      </div>
    );
  }

  if (!isLoggedIn || role !== 'admin') {
    toast.error('You are not authorized to access this page');
    return redirect('/dashboard');
  }

  return <>{children}</>;
};

export default AdminRouteLayout;
