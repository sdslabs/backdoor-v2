// Server-side query functions for prefetching
// These run on the server during SSR/prefetching

import { Notification } from '@/lib/types';

// Fetchers
const fetchRecentNotificationsServer = async () => {
  const res = await fetch('/api/notifications/recent');
  if (!res.ok) {
    throw new Error('Failed to fetch notifications');
  }
  const data = (await res.json()) as Notification[];
  return data;
};

// Queries
export const recentNotificationsServerQuery = () => ({
  queryKey: ['recentNotifications'],
  queryFn: fetchRecentNotificationsServer,
});
