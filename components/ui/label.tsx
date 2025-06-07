'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';

import { cn } from '@/lib/utils';

function Label({
  className,
  description,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> & {
  description?: string;
}) {
  return (
    <div className="space-y-0.5">
      <LabelPrimitive.Root
        data-slot="label"
        className={cn(
          'flex items-center gap-2 leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
          className
        )}
        {...props}
      >
        {props.children}
      </LabelPrimitive.Root>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

export { Label };
