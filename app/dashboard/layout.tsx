import { Navbar } from '@/components/ui/navbar';
import { getSessionAdminNav } from '@/lib/server/session-nav';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionAdminNav = await getSessionAdminNav();

  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar sessionAdminNav={sessionAdminNav} />
      <div className="flex-1">{children}</div>
    </div>
  );
}
