import { UserInformation } from '@/components/profile-page';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import UserInformationSkeleton from '@/components/profile-page/skeletons/user-information-skeleton';
import YearlyActivity from '@/components/profile-page/yearly-activity';
import { getUserProfile } from '@/lib/api/profile-page/actions';

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  // Check if the user exists
  const userProfile = await getUserProfile(username);

  // If user not found, show the not-found page
  if (userProfile === null) {
    notFound();
  }

  return (
    <div className="bg-background text-foreground p-6 min-h-screen">
      {/* Profile Header */}
      <Suspense fallback={<UserInformationSkeleton />}>
        <UserInformation userProfile={userProfile} />
      </Suspense>

      {/* Yearly activity with solve history and points graph */}
      <YearlyActivity username={username} />
    </div>
  );
}
