import NotificationPopover from '@/components/notification/notification-popover';

export default function NotificationsPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-2xl font-bold">Live Notifications</h1>
      <NotificationPopover />
    </main>
  );
}
