'use client';

import { useEffect, useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Bell } from 'lucide-react';
import { toast } from 'sonner';

type Notification = {
  title: string;
  description: string;
  datetime: string;
};

export default function NotificationPopover() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasNew, setHasNew] = useState(false);

  useEffect(() => {
    const evtSource = new EventSource('/api/notifications');

    evtSource.onmessage = (e) => {
      const data: Notification = JSON.parse(e.data);
      setHasNew(true);
      toast(data.title, { description: data.description });
    };

    evtSource.onerror = () => {
      console.error('SSE connection error.');
      evtSource.close();
    };

    return () => evtSource.close();
  }, []);

  const fetchRecentNotifications = async (isOpen: boolean) => {
    if (!isOpen) return;
    try {
      setLoading(true);
      const res = await fetch('/api/notifications/recent');
      const data = await res.json();
      setNotifications(data);
      setHasNew(false);
    } catch {
      toast.error('Failed to load notifications.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover onOpenChange={fetchRecentNotifications}>
      <PopoverTrigger className="relative cursor-pointer">
        <Bell className="w-5 h-5" />
        {hasNew && (
          <span className="absolute top-0 right-0 h-2 w-2 bg-highlight rounded-full" />
        )}
      </PopoverTrigger>
      <PopoverContent className="w-96 max-h-96 overflow-y-auto p-3">
        <h4 className="text-sm font-semibold mb-2">Notifications</h4>
        {loading ? (
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
        ) : notifications.length > 0 ? (
          <ul className="space-y-2">
            {notifications.map((notif, idx) => (
              <li key={idx} className="px-4 py-3 rounded-md shadow-sm bg-muted">
                <p className="font-medium text-primary">{notif.title}</p>
                <p className="text-sm text-secondary-foreground">
                  {notif.description}
                </p>
                <p className="text-xs text-right text-muted-foreground mt-1">
                  {new Date(notif.datetime).toLocaleString()}
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
