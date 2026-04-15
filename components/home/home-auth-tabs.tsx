'use client';

import LoginTab from '@/components/auth/login-tab';
import ResetTab from '@/components/auth/reset-tab';
import SignupTab from '@/components/auth/signup-tab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TABS = [
  { value: 'login', label: 'Login', Component: LoginTab },
  { value: 'signup', label: 'Sign Up', Component: SignupTab },
  { value: 'reset', label: 'Reset Pass', Component: ResetTab },
] as const;

export function HomeAuthTabs({
  defaultTab,
}: {
  defaultTab: 'login' | 'signup' | 'reset';
}) {
  return (
    <div className="w-full max-w-md px-4">
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="flex w-full gap-2">
          {TABS.map(({ value, label }) => (
            <TabsTrigger key={value} value={value} className="cursor-pointer">
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        {TABS.map(({ value, Component }) => (
          <TabsContent key={value} value={value} className="mt-6 min-h-[280px]">
            <Component />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
