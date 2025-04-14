'use client';

import Image from 'next/image';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import LoginTab from '@/components/auth/login-tab';
import { SignupTab } from '@/components/auth/signup-tab';
import { ResetTab } from '@/components/auth/reset-tab';

export default function BackdoorAuth() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-6 bg-background text-foreground">
      <Image src="/backdoor.png" alt="Backdoor Logo" width={200} height={200} />
      <p className="text-xl italic">For when the windows are shut</p>

      <Tabs defaultValue="login" className="w-full max-w-sm">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
          <TabsTrigger value="reset">Reset Pass</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <LoginTab />
        </TabsContent>

        <TabsContent value="signup">
          <SignupTab />
        </TabsContent>

        <TabsContent value="reset">
          <ResetTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
