import { Navbar } from '@/components/ui/navbar';

// These pages are temporarily hidden behind the splash middleware.
export const dynamic = 'force-dynamic';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default DashboardLayout;
