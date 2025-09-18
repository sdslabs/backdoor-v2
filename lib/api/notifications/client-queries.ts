import { Notification } from '@/lib/types';

// Fetchers
const fetchRecentNotifications = async () => {
  const res = await fetch('/api/notifications/recent');
  if (!res.ok) {
    throw new Error('Failed to fetch notifications');
  }
  const data = (await res.json()) as Notification[];
  return data;
};

// Queries
export const recentNotificationsQuery = () => ({
  queryKey: ['recentNotifications'],
  queryFn: fetchRecentNotifications,
});
