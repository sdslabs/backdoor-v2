import { Spinner } from '@/components/ui/spinner';
import React from 'react';

const LoadingLeaderboard = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Spinner className="m-auto size-8 bg-muted" />
    </div>
  );
};

export default LoadingLeaderboard;
