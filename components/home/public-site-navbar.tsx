'use client';

import Link from 'next/link';

import { CompetitionBrandMark } from '@/components/home/competition-brand-mark';
import { Button } from '@/components/ui/button';
import type { CompetitionInfo } from '@/lib/competition/schedule';
import { cn } from '@/lib/utils';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '@/lib/stores/auth-store';

/** Taller than `size="lg"`; `!` wins over duplicate `h-*` from `cva`/`clsx`. */
const publicNavBtnTall = '!h-11 min-h-11 px-4';

/** One class string for Login + Register so they are pixel-identical. */
const publicNavGuestTwinClass = cn(
  publicNavBtnTall,
  'normal-case min-w-[7.5rem] justify-center border-2 border-primary !text-base font-bold'
);

const publicNavActionFrame =
  'normal-case justify-center border-2 !text-base font-bold';
const publicNavAuthPairMin = 'min-w-[7rem]';

export function PublicSiteNavbar({
  authed,
  showGoToDashboard,
  competitionInfo,
}: {
  authed: boolean;
  showGoToDashboard: boolean;
  competitionInfo: CompetitionInfo | null;
}) {
  const logout = useAuthStore((s) => s.logout);

  return (
    <header className="border-b-2 border-border/70 bg-background/80 backdrop-blur-md">
      <nav className="flex w-full flex-row flex-wrap items-stretch justify-between gap-x-4 gap-y-3 px-[10%] py-5 sm:py-6">
        <div className="flex min-w-0 flex-1 flex-row items-center gap-4 sm:gap-6">
          {competitionInfo ? (
            <CompetitionBrandMark
              info={competitionInfo}
              imgClassName="h-16 w-auto max-h-[4.5rem] object-contain sm:h-[4.5rem] sm:max-h-20"
              fallbackClassName="flex size-16 shrink-0 items-center justify-center rounded-md border border-border/60 bg-muted/50 sm:size-[4.5rem]"
            />
          ) : null}
          <Link
            href="/"
            className="font-display text-4xl text-primary transition-opacity hover:opacity-80 sm:text-5xl"
          >
            hydra
          </Link>
        </div>
        <div className="flex shrink-0 flex-row flex-wrap content-center items-center justify-end gap-3 self-stretch">
          {!authed ? (
            <>
              <Button
                asChild
                size="lg"
                variant="outline"
                className={publicNavGuestTwinClass}
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className={publicNavGuestTwinClass}
              >
                <Link href="/login?tab=signup">Register</Link>
              </Button>
            </>
          ) : (
            <>
              {showGoToDashboard ? (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className={cn(
                    publicNavActionFrame,
                    publicNavBtnTall,
                    'border-primary sm:min-w-[11rem]'
                  )}
                >
                  <Link href="/dashboard/challenge">Go to dashboard</Link>
                </Button>
              ) : null}
              <Button
                type="button"
                size="lg"
                variant="outline"
                className={cn(
                  publicNavActionFrame,
                  publicNavAuthPairMin,
                  publicNavBtnTall,
                  'border-primary gap-2'
                )}
                onClick={() => logout()}
              >
                <LogOut className="size-4 shrink-0" />
                Log out
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
