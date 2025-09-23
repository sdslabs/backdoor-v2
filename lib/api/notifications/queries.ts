import { Notification } from '@/lib/types';

// Fetcher - using fetch since this doesn't need authentication
const fetchRecentNotifications = async () => {
  const res = await fetch('/api/notifications/recent');
  if (!res.ok) {
    throw new Error('Failed to fetch notifications');
  }
  const data = (await res.json()) as Notification[];
  return data;
};

// Query
export const recentNotificationsQuery = () => ({
  queryKey: ['recentNotifications'],
  queryFn: fetchRecentNotifications,
});
