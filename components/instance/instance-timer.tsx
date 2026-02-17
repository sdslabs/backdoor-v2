'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface InstanceTimerProps {
  expiresAt: string;
  onExpire?: () => void;
  className?: string;
}

const InstanceTimer: React.FC<InstanceTimerProps> = ({
  expiresAt,
  onExpire,
  className,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const expireTime = new Date(expiresAt).getTime();
      const now = Date.now();
      const diff = Math.max(0, Math.floor((expireTime - now) / 1000));
      return diff;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);

      if (remaining <= 0) {
        setIsExpired(true);
        clearInterval(timer);
        onExpire?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt, onExpire]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = (): string => {
    if (isExpired) return 'text-destructive';
    if (timeLeft < 60) return 'text-destructive animate-pulse';
    if (timeLeft < 300) return 'text-yellow-500';
    return 'text-green-500';
  };

  if (isExpired) {
    return (
      <span className={cn('font-mono text-destructive', className)}>
        Expired
      </span>
    );
  }

  return (
    <span className={cn('font-mono', getTimerColor(), className)}>
      {formatTime(timeLeft)}
    </span>
  );
};

export { InstanceTimer };
