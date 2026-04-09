import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/lib/api/profile/actions';

export default async function ProfileIndexPage() {
  const user = await getCurrentUser();
  redirect(`/profile/${user.username}`);
}
