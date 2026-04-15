import { HomeAuthTabs } from '@/components/home/home-auth-tabs';

type SearchParams = Promise<{ tab?: string | string[] }>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const tabRaw = sp.tab;
  const tab = Array.isArray(tabRaw) ? tabRaw[0] : tabRaw;
  const defaultTab: 'login' | 'signup' | 'reset' =
    tab === 'signup' ? 'signup' : tab === 'reset' ? 'reset' : 'login';

  return (
    <section className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center gap-8 py-12">
      <h2 className="font-display text-2xl text-foreground">Account</h2>
      <HomeAuthTabs defaultTab={defaultTab} />
    </section>
  );
}
