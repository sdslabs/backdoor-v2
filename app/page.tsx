import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import LoginTab from '@/components/auth/login-tab';
import SignupTab from '@/components/auth/signup-tab';
import ResetTab from '@/components/auth/reset-tab';

const TABS = [
  { value: 'login', label: 'Login', Component: LoginTab },
  { value: 'signup', label: 'Sign Up', Component: SignupTab },
  { value: 'reset', label: 'Reset Pass', Component: ResetTab },
];

export default function HomePage() {
  return (
    <section className="h-screen flex flex-col items-center justify-center gap-8">
      <div className="space-y-4 text-center">
        <h1 className="text-6xl font-display text-primary">backdoor</h1>
        <p className="text-xl italic">For when the windows are shut</p>
      </div>
      <div className="w-full max-w-sm px-4">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="flex gap-2 w-full">
            {TABS.map(({ value, label }) => (
              <TabsTrigger key={value} value={value} className="cursor-pointer">
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
          {TABS.map(({ value, Component }) => (
            <TabsContent
              key={value}
              value={value}
              className="mt-6 min-h-[300px]"
            >
              <Component />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
