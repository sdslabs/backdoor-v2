'use client';

import Image from 'next/image';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import LoginTab from '@/components/auth/login-tab';
import { SignupTab } from '@/components/auth/signup-tab';
import ResetTab from '@/components/auth/reset-tab';

export default function BackdoorAuth() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <div className="flex flex-col items-center justify-center mb-6">
        <Image
          src="/backdoor.png"
          alt="Backdoor Logo"
          width={200}
          height={200}
        />
        <p className="text-xl italic mt-2">For when the windows are shut</p>
      </div>

      <div className="w-full max-w-sm px-4">
        <Tabs defaultValue="login" className="w-full">
          <div className="sticky top-0 bg-background pt-2 pb-4 z-10">
            <TabsList className="grid grid-cols-3 w-full gap-4">
              <TabsTrigger value="login" className="cursor-pointer">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="cursor-pointer">
                Sign Up
              </TabsTrigger>
              <TabsTrigger value="reset" className="cursor-pointer">
                Reset Pass
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="w-full overflow-y-auto">
            <TabsContent
              value="login"
              className="min-h-[350px] flex items-center justify-center py-4"
            >
              <LoginTab />
            </TabsContent>

            <TabsContent
              value="signup"
              className="min-h-[350px] flex items-center justify-center py-4"
            >
              <SignupTab />
            </TabsContent>

            <TabsContent
              value="reset"
              className="min-h-[350px] flex items-center justify-center py-4"
            >
              <ResetTab />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
