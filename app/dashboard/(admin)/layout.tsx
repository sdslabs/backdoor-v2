import { redirect } from 'next/navigation';

import { getSessionAdminNav } from '@/lib/server/session-nav';

export default async function AdminSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await getSessionAdminNav())) {
    redirect('/dashboard');
  }

  return <>{children}</>;
}
