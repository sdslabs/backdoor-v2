'use client';

import { useEffect, useRef, useState } from 'react';
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
  const [open, setOpen] = useState(false);
  const [hasNew, setHasNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const openRef = useRef(open);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    const evtSource = new EventSource('/api/notifications');

    evtSource.onmessage = (e) => {
      const data: Notification = JSON.parse(e.data);

      toast(data.title, {
        description: data.description,
      });

      if (!openRef.current) {
        setHasNew(true);
      }
    };

    evtSource.onerror = () => {
      console.error('SSE connection error.');
      evtSource.close();
    };

    return () => {
      evtSource.close();
    };
  }, []);

  const fetchRecentNotifications = async () => {
    try {
      setLoading(true);

      const res = await fetch('/api/notifications/recent');
      const data = await res.json();
      setNotifications(data);

      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (err) {
      toast.error('Failed to load notifications.');
      setLoading(false);
    }
  };

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (value) {
      setHasNew(false);
      fetchRecentNotifications();
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
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
              <li
                key={i}
                className="p-2 border rounded-md bg-muted animate-pulse"
              >
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-full mb-1" />
                <div className="h-2 bg-gray-200 rounded w-1/2" />
              </li>
            ))}
          </ul>
        ) : notifications.length > 0 ? (
          <ul className="space-y-2">
            {notifications.map((notif, idx) => (
              <li
                key={idx}
                className="p-2 border rounded-md shadow-sm bg-muted"
              >
                <p className="font-medium">{notif.title}</p>
                <p className="text-sm text-muted-foreground">
                  {notif.description}
                </p>
                <p className="text-xs text-right text-gray-500 mt-1">
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
