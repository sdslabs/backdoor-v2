'use client';

import { AuthInput } from '@/components/ui/auth-input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Spinner } from '@/components/ui/spinner';
import { sendBackgroundNotificationsAction } from '@/lib/api/notifications';
import React, { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

type Props = {};

const NotificationPage = (props: Props) => {
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
    <div className="pl-6">
      <div className=" flex items-center gap-4 w-full">
        <h1 className="text-lg font-bold">Type of Notification: </h1>
        <RadioGroup defaultValue="option-one" className="flex space-x-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one">Background Notification</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" disabled />
            <Label htmlFor="option-two">New Competition</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-three" id="option-three" disabled />
            <Label htmlFor="option-three">Alert</Label>
          </div>
        </RadioGroup>
      </div>
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
    </div>
  );
};

export default NotificationPage;
