import { UserInformation } from '@/components/profile-page';
import YearlyActivity from '@/components/profile-page/yearly-activity';
import { Suspense } from 'react';
import UserInformationSkeleton from '@/components/profile-page/skeletons/user-information-skeleton';

function ProfilePage() {
  return (
    <div className="bg-background text-foreground p-6 min-h-screen">
      {/* Profile Header */}
      <Suspense fallback={<UserInformationSkeleton />}>
        <UserInformation />
      </Suspense>

      {/* Yearly activity */}
      <YearlyActivity />
    </div>
  );
}

export default ProfilePage;
