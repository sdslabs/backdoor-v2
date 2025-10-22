'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import React, { useState } from 'react';
import {
  AlertNotification,
  BackgroundNotification,
  NewCompetitionNotification,
} from '@/components/notification';

type Props = {};

const NOTIFICATION_TABS = [
  {
    id: 1,
    name: 'Background Notification',
    value: 'background',
    Component: BackgroundNotification,
  },
  {
    id: 2,
    name: 'New Competition',
    value: 'competition',
    Component: NewCompetitionNotification,
  },
  {
    id: 3,
    name: 'Alert',
    value: 'alert',
    Component: AlertNotification,
  },
];

const NotificationPage = (props: Props) => {
  const [selectedTab, setSelectedTab] = useState('background');

  return (
    <div className="pl-6">
      <div className=" flex items-center gap-4 w-full">
        <h1 className="text-lg font-bold">Type of Notification: </h1>
        <RadioGroup defaultValue="background" className="flex space-x-2">
          {NOTIFICATION_TABS.map((tab) => (
            <div className="flex items-center space-x-2" key={tab.id}>
              <RadioGroupItem
                value={tab.value}
                id={tab.value}
                onClick={() => setSelectedTab(tab.value)}
              />
              <Label htmlFor={tab.value}>{tab.name}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="mt-3">
        {NOTIFICATION_TABS.map((tab) => {
          if (tab.value !== selectedTab) return null;
          return <tab.Component key={tab.id} />;
        })}
      </div>
    </div>
  );
};

export default NotificationPage;
