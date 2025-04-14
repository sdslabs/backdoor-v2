import { redirect } from 'next/navigation';

export default function ProfilePage() {
  // Redirect to the user's own profile
  // In a real app, you would get the current user's username from auth context
  // For now, we'll just redirect to a default profile
  redirect('/profile-page/default-user');
}
