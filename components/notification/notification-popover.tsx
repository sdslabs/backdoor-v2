'use client';

import { useEffect, useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Bell } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { NotificationStream } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import { recentNotificationsQuery } from '@/lib/api/notifications';
import { API_BASE_URL } from '@/lib/constants';

export default function NotificationPopover() {
  const [hasNew, setHasNew] = useState(false);

  useEffect(() => {
    const evtSource = new EventSource(`${API_BASE_URL}/notification/stream`);

    evtSource.onmessage = (e) => {
      const data: NotificationStream = JSON.parse(e.data);
      setHasNew(true);
      toast(data.Title, { description: data.Description });
    };

    evtSource.onerror = () => {
      console.error('SSE connection error.');
      evtSource.close();
    };

    return () => evtSource.close();
  }, []);

  useEffect(() => {
    // Updates event when it's open
    // NOTE: since this fetches all the notification, usage to be discussed
    refetch();
  }, [hasNew]);

  const {
    data: notificationsData,
    isLoading,
    refetch,
  } = useQuery(recentNotificationsQuery());

  const fetchRecentNotificationsHandler = (isOpen: boolean) => {
    if (isOpen) {
      refetch();
    }
  };

  return (
    <Popover onOpenChange={fetchRecentNotificationsHandler}>
      <PopoverTrigger asChild className="relative cursor-pointer">
        <Button size="icon" variant={'navSideAction'} className="rounded-lg">
          <Bell className="size-4" />
          {hasNew && (
            <span className="absolute top-2 right-2 h-2 w-2 bg-highlight rounded-full" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 max-h-96 overflow-y-auto p-3">
        <h4 className="text-sm font-semibold mb-2">Notifications</h4>
        {isLoading ? (
          <ul className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i} className="p-2 border rounded-md bg-muted">
                <div className="space-y-2">
                  <div className="h-4 w-3/4 bg-secondary rounded-md skeleton" />
                  <div className="h-3 w-full bg-secondary rounded-md skeleton" />
                  <div className="h-2 w-1/2 bg-secondary rounded-md skeleton" />
                </div>
              </li>
            ))}
          </ul>
        ) : (notificationsData ?? []).length > 0 ? (
          <ul className="space-y-2">
            {notificationsData?.map((notif, idx) => (
              <li key={idx} className="px-4 py-3 rounded-md shadow-sm bg-muted">
                <p className="font-medium text-primary">{notif.title}</p>
                <p className="text-sm text-secondary-foreground">
                  {notif.desc}
                </p>
                <p className="text-xs text-right text-muted-foreground mt-1">
                  {new Date(notif.updated_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No notifications yet.</p>
        )}
      </PopoverContent>
    </Popover>
  );
}
