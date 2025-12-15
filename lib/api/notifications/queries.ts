import { Notification } from '@/lib/types';
import { getUnauthenticatedAxios } from '../axios';

const fetchRecentNotifications = async () => {
  const axios = getUnauthenticatedAxios();
  const res = await axios.get('/notification/available');
  console.log(res);
  if (!res) {
    throw new Error('Failed to fetch notifications');
  }

  return res.data as Notification[];
};

// Query
export const recentNotificationsQuery = () => ({
  queryKey: ['recentNotifications'],
  queryFn: fetchRecentNotifications,
});
