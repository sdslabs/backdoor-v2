'use client';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from './button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavPages {
  label: string;
  icon: LucideIcon;
  href: string;
}

type SideActionBase<T extends 'component' | 'link'> = {
  type: T;
  icon: LucideIcon;
} & (T extends 'component'
  ? { component: React.ComponentType }
  : { href: string });
type SideAction = SideActionBase<'component'> | SideActionBase<'link'>;

interface NavbarProps {
  pages: NavPages[];
  sideActions: SideAction[];
}

const Navbar: React.FC<NavbarProps> = ({ pages, sideActions }) => {
  const pathname = usePathname();
  return (
    <div className="flex flex-row items-center gap-8 py-4">
      <h1 className="text-2xl font-display text-primary">backdoor</h1>
      <div className="flex flex-row items-center gap-2">
        {pages.map((page) => (
          <Link href={page.href} key={page.label}>
            <Button
              size={'sm'}
              variant={'ghost'}
              effect={pathname === page.href ? 'underline' : 'hoverUnderline'}
              className={cn(
                'cursor-pointer normal-case text-muted-foreground',
                pathname === page.href ? 'text-foreground' : ''
              )}
            >
              <page.icon className="w-4 h-4" /> {page.label}
            </Button>
          </Link>
        ))}
      </div>
      <div className="flex flex-row items-center gap-2 ml-auto">
        {sideActions.map((action, index) => {
          if (action.type === 'link') {
            return (
              <Link href={action.href} key={index}>
                <Button
                  size="icon"
                  variant={'navSideAction'}
                  className="rounded-lg"
                >
                  <action.icon className="size-4" />
                </Button>
              </Link>
            );
          } else if (action.type === 'component') {
            return <action.component key={index} />;
          }
        })}
      </div>
    </div>
  );
};

export type { NavbarProps };
export { Navbar };
