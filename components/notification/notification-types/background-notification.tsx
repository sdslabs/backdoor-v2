'use client';
import React, { useActionState, useEffect } from 'react';
import { AuthInput } from '../../ui/auth-input';
import { Spinner } from '../../ui/spinner';
import { Button } from '../../ui/button';
import { sendBackgroundNotificationsAction } from '@/lib/api/notifications';
import { toast } from 'sonner';

const BackgroundNotification = () => {
  const [notificationState, action, isPending] = useActionState(
    sendBackgroundNotificationsAction,
    null
  );
  useEffect(() => {
    if (notificationState?.success === true) {
      toast.success(notificationState?.message);
    } else if (notificationState?.success === false) {
      toast.error(notificationState?.message);
    }
  }, [notificationState]);

  return (
    <div>
      <form action={action} className="space-y-4 w-full">
        <AuthInput
          name="title"
          label="Title"
          error={notificationState?.errors?.title}
          required
        />
        <AuthInput
          name="desc"
          label="Description"
          error={notificationState?.errors?.desc}
          required
        />
        {notificationState?.errors?.general && (
          <p className="text-sm text-destructive">
            {notificationState?.errors?.general}
          </p>
        )}
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <Spinner className="size-4" />
          ) : (
            'Send Background Notification'
          )}
        </Button>
      </form>
    </div>
  );
};

export default BackgroundNotification;
