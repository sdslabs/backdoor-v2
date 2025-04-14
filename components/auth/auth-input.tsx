'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

export interface AuthInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  isValid?: boolean;
}

const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
  (
    { className, type = 'text', label, error, isValid = false, ...props },
    ref
  ) => {
    return (
      <div className="space-y-1">
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background transition-colors duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            error
              ? 'border-destructive ring-1 ring-destructive'
              : isValid
                ? 'border-green-500'
                : 'border-input focus-visible:ring-1 focus-visible:ring-primary',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs text-destructive mt-1">{error}</p>}
      </div>
    );
  }
);

AuthInput.displayName = 'AuthInput';

export { AuthInput };
