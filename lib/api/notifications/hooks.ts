import { useQuery } from '@tanstack/react-query';
import { recentNotificationsQuery } from './queries';

export const useRecentNotifications = () => {
  return useQuery(recentNotificationsQuery());
};
