'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);

    toast.error(error.message || 'Something went wrong');
  }, [error]);

  return (
    <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Something went wrong!
        </h2>
        <p className="text-muted-foreground">
          {error.message || 'An unexpected error occurred'}
        </p>
      </div>

      <Button variant="outline" onClick={reset} className="mt-4">
        Try again
      </Button>
    </div>
  );
}
