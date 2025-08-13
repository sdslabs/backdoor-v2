import * as React from 'react';

import { cn } from '@/lib/utils';
import { Label } from './label';

function Textarea({
  className,
  label,
  description,
  ...props
}: React.ComponentProps<'textarea'> & {
  label?: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Label htmlFor={props.id} description={description}>
          {label}
        </Label>
      )}
      <textarea
        data-slot="textarea"
        className={cn(
          'border-muted-foreground/60 focus:border-muted-foreground border bg-transparent dark:bg-input/30',
          'placeholder:text-muted-foreground',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          'flex field-sizing-content min-h-16 w-full rounded-md px-3 py-2',
          'text-base md:text-sm',
          'shadow-xs transition-[color,box-shadow] outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    </div>
  );
}

export { Textarea };
