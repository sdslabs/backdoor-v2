'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Bell } from 'lucide-react';

type Notification = {
  title: string;
  description: string;
  datetime: string;
};

export default function NotificationPopover() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const [hasNew, setHasNew] = useState(false);
  const openRef = useRef(open);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    const evtSource = new EventSource('/api/notifications');

    evtSource.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setNotifications((prev) => [data, ...prev]);

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

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (value) setHasNew(false);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger className="relative">
        <Bell className="w-5 h-5 cursor-pointer" />
        {hasNew && (
          <span className="absolute top-0 right-0 h-2 w-2 bg-highlight rounded-full" />
        )}
      </PopoverTrigger>
      <PopoverContent className="w-96 max-h-96 overflow-y-auto">
        <h4 className="text-sm font-semibold mb-2">Notifications</h4>
        {notifications.length > 0 ? (
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
