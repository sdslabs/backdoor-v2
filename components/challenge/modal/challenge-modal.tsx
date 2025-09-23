'use client';

import { ChallengeModalContent } from './challenge-modal-content';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useChallengeParams } from '@/lib/hooks/use-challenge-params';
import { useRouter } from 'next/navigation';
import { ChallengeModalContentSkeleton } from '../skeletons/challenge-modal-content-skeleton';
import { Suspense } from 'react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const ChallengeModal: React.FC = () => {
  const { name } = useChallengeParams();
  const router = useRouter();
  const open = !!name;

  if (open) {
    return (
      <Dialog
        open={open}
        // If router.back() fails, fallback to the challenge page
        onOpenChange={() =>
          router.back() ?? router.push('/dashboard/challenge')
        }
      >
        <DialogContent className="bg-muted">
          {/* 
          The following element is visually hidden so as to 
          improve accessibility for visually impaired users 
        */}
          <VisuallyHidden>
            <DialogTitle>Challenge Details</DialogTitle>
          </VisuallyHidden>
          <Suspense fallback={<ChallengeModalContentSkeleton />}>
            <ChallengeModalContent challengeName={name} />
          </Suspense>
        </DialogContent>
      </Dialog>
    );
  } else {
    return;
  }
};

export { ChallengeModal };
