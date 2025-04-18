'use client';

import ChallengeDetails from './challenge-details';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useChallengeParams } from '@/lib/hooks/use-challenge-params';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useRouter } from 'next/navigation';

const ChallengeModal: React.FC = () => {
  const { id } = useChallengeParams();
  const router = useRouter();

  return (
    <Dialog
      open={!!id}
      // If router.back() fails, fallback to the challenge page
      onOpenChange={() => router.back() ?? router.push('/dashboard/challenge')}
    >
      <DialogContent className="bg-muted">
        {/* 
          The following element is visually hidden so as to 
          improve accessibility for visually impaired users 
        */}
        <VisuallyHidden>
          <DialogTitle>Challenge Details</DialogTitle>
        </VisuallyHidden>
        {id && <ChallengeDetails challengeId={id} />}
      </DialogContent>
    </Dialog>
  );
};

export { ChallengeModal };
