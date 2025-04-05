import ChallengeDetails from './challenge-details';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import * as DialogPrimitive from '@radix-ui/react-dialog';

const ChallengeModal: React.FC<
  { challengeId: string } & React.ComponentProps<typeof DialogPrimitive.Root>
> = ({ challengeId, ...props }) => {
  return (
    <Dialog {...props}>
      <DialogContent className="bg-muted">
        {/* 
          The following element is visually hidden so as to 
          improve accessibility for visually impaired users 
        */}
        <VisuallyHidden>
          <DialogTitle>Challenge Details</DialogTitle>
        </VisuallyHidden>
        <ChallengeDetails challengeId={challengeId} />
      </DialogContent>
    </Dialog>
  );
};

export default ChallengeModal;
