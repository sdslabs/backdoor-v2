import {
  UserInformation,
  UserInformationSkeleton,
  YearlyActivity,
} from '@/components/profile';
import { Suspense } from 'react';

import { getCurrentUser } from '@/lib/api/profile/actions';

export default async function DashboardProfilePage() {
  const user = await getCurrentUser();

  return (
    <div className="bg-background text-foreground p-6 min-h-screen">
      <Suspense fallback={<UserInformationSkeleton />}>
        <UserInformation userProfile={user} showLogout />
      </Suspense>
      <YearlyActivity username={user.username} />
    </div>
  );
}
