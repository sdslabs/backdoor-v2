'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getHintDetails, redeemHint } from '@/lib/api/challenge/actions';
import { toast } from 'sonner';
import { Check, Lock } from 'lucide-react';

interface HintButtonsProps {
  hints: { id: number; points: number; description?: string }[];
  variant?: 'modal' | 'details';
}

export const HintButtons: React.FC<HintButtonsProps> = ({
  hints,
  variant = 'modal',
}) => {
  const [selectedHint, setSelectedHint] = useState<{
    id: number;
    points: number;
    description?: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [hintContent, setHintContent] = useState<string | null>(null);
  const [isRedeemed, setIsRedeemed] = useState(false);
  const [hintStatuses, setHintStatuses] = useState<
    Record<number, { isRedeemed: boolean; isLoading: boolean }>
  >({});

  useEffect(() => {
    const fetchHintStatuses = async () => {
      const statuses: Record<
        number,
        { isRedeemed: boolean; isLoading: boolean }
      > = {};

      for (const hint of hints) {
        statuses[hint.id] = { isRedeemed: false, isLoading: true };
      }
      setHintStatuses(statuses);

      for (const hint of hints) {
        const result = await getHintDetails(hint.id);
        if (result.success) {
          setHintStatuses((prev) => ({
            ...prev,
            [hint.id]: {
              isRedeemed: result.data.description !== 'Hint is not taken yet',
              isLoading: false,
            },
          }));
        } else {
          setHintStatuses((prev) => ({
            ...prev,
            [hint.id]: { isRedeemed: false, isLoading: false },
          }));
        }
      }
    };

    fetchHintStatuses();
  }, [hints]);

  const handleHintClick = async (hint: {
    id: number;
    points: number;
    description?: string;
  }) => {
    setIsFetching(true);

    const result = await getHintDetails(hint.id);
    setIsFetching(false);

    if (!result.success) {
      if (variant === 'modal') {
        alert(result.error || 'Failed to fetch hint');
      } else {
        toast.error(result.error || 'Failed to fetch hint');
      }
      return;
    }

    const hintData = result.data;

    if (hintData.description === 'Hint is not taken yet') {
      setSelectedHint({ ...hint, points: hintData.points });
      setHintContent(null);
      setIsRedeemed(false);
      setIsModalOpen(true);
    } else {
      setHintContent(hintData.description);
      setIsRedeemed(true);
      setIsModalOpen(true);
      setHintStatuses((prev) => ({
        ...prev,
        [hint.id]: { isRedeemed: true, isLoading: false },
      }));
    }
  };

  const handleRedeemHint = async () => {
    if (!selectedHint) return;

    setIsRedeeming(true);
    const result = await redeemHint(selectedHint.id);
    setIsRedeeming(false);

    if (result.success) {
      setHintContent(result.data.message);
      setIsRedeemed(true);
      setHintStatuses((prev) => ({
        ...prev,
        [selectedHint.id]: { isRedeemed: true, isLoading: false },
      }));
    } else {
      if (variant === 'modal') {
        alert(result.error || 'Failed to redeem hint');
      } else {
        toast.error(result.error || 'Failed to redeem hint');
      }
    }
  };

  return (
    <>
      <TooltipProvider>
        <div className={variant === 'modal' ? 'mb-6' : ''}>
          <div
            className={
              variant === 'modal'
                ? 'flex items-center gap-2 mb-2'
                : 'flex items-center gap-2'
            }
          >
            <span>Hints</span>
            {hints.map((hint, index) => {
              const status = hintStatuses[hint.id];
              const isHintRedeemed = status?.isRedeemed || false;
              const isLoading = status?.isLoading || false;

              return (
                <Tooltip key={hint.id}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isHintRedeemed ? 'default' : 'outline'}
                      size="sm"
                      className={`font-mono text-xs transition-all duration-200 ${
                        isHintRedeemed
                          ? 'bg-primary/20 hover:bg-primary/30 border-primary'
                          : 'hover:bg-primary/10 hover:border-primary'
                      } disabled:opacity-50`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleHintClick(hint);
                      }}
                      type="button"
                      disabled={isFetching || isLoading}
                    >
                      <span className="flex items-center gap-1.5">
                        {isLoading ? (
                          <span className="text-xs">Loading...</span>
                        ) : isHintRedeemed ? (
                          <>
                            <span className="font-semibold">
                              Hint {index + 1}
                            </span>
                          </>
                        ) : (
                          <>
                            <Lock size={14} className="text-muted-foreground" />
                            <span className="font-semibold">
                              Hint {index + 1}
                            </span>
                          </>
                        )}
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{hint.points} points</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>
      </TooltipProvider>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-background border rounded-lg p-6 shadow-lg max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-2">Hint</h2>
            <p className="text-muted-foreground text-sm mb-6">
              {isRedeemed
                ? hintContent
                : `Do you want to redeem this hint for ${selectedHint?.points} points?`}
            </p>
            <div className="flex justify-end gap-2">
              {isRedeemed ? (
                <Button onClick={() => setIsModalOpen(false)}>Close</Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    disabled={isRedeeming}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleRedeemHint} disabled={isRedeeming}>
                    {isRedeeming ? 'Redeeming...' : 'Redeem'}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
