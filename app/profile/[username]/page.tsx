import {
  UserInformation,
  UserInformationSkeleton,
  YearlyActivity,
} from '@/components/profile';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';

import {
  getUserProfile,
  resolveSessionUsername,
} from '@/lib/api/profile/actions';

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

  const sessionUsername = await resolveSessionUsername();
  const showLogout =
    sessionUsername !== null && sessionUsername === userProfile.username;

  return (
    <div className="bg-background text-foreground p-6 min-h-screen">
      {/* Profile Header */}
      <Suspense fallback={<UserInformationSkeleton />}>
        <UserInformation userProfile={userProfile} showLogout={showLogout} />
      </Suspense>

      {/* Yearly activity with solve history and points graph */}
      <YearlyActivity username={username} />
    </div>
  );
}
