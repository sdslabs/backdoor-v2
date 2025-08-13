import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { Stepper, StepperProgress, Step } from '@/components/ui/stepper';
import { StepOne, StepTwo, StepThree } from './steps';

const STEPS = [
  { step: 0, Component: StepOne },
  { step: 1, Component: StepTwo },
  { step: 2, Component: StepThree },
];

const ChallengeCreate = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'secondary'} size={'icon'}>
          <PlusIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Create Challenge</DialogTitle>
        </DialogHeader>
        <Stepper totalSteps={STEPS.length}>
          <StepperProgress />
          {STEPS.map(({ step, Component }) => (
            <Step key={step} index={step}>
              <Component />
            </Step>
          ))}
        </Stepper>
      </DialogContent>
    </Dialog>
  );
};

export default ChallengeCreate;
