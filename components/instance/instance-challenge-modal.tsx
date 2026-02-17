'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { InstanceChallengeModalContent } from './instance-challenge-modal-content';
import { Suspense } from 'react';
import { ChallengeModalContentSkeleton } from '@/components/challenge/skeletons/challenge-modal-content-skeleton';

const InstanceChallengeModal: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const challengeName = searchParams.get('instance');

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('instance');
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Dialog open={!!challengeName} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="p-0 max-w-4xl overflow-hidden">
        <DialogTitle className="sr-only">
          {challengeName || 'Instance Challenge'}
        </DialogTitle>
        <DialogDescription className="sr-only">
          Instance challenge details and controls
        </DialogDescription>
        {challengeName && (
          <Suspense fallback={<ChallengeModalContentSkeleton />}>
            <InstanceChallengeModalContent challengeName={challengeName} />
          </Suspense>
        )}
      </DialogContent>
    </Dialog>
  );
};

export { InstanceChallengeModal };
