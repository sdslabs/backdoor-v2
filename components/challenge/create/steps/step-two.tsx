import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useStepper } from '@/components/ui/stepper';
import { FileUpload } from '@/components/ui/file-upload';
import useCreateChallengeStore from '@/lib/stores/create-challenge-store';
import {
  ChallengeCategory,
  ChallengeCategoryValuesWithDescription,
} from '@/lib/types';
import { cn } from '@/lib/utils';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Check } from 'lucide-react';

const StepTwo = () => {
  const stepper = useStepper();
  const {
    category,
    setCategory,
    challengeZip,
    setChallengeZip,
    displayFiles,
    setDisplayFiles,
  } = useCreateChallengeStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    stepper.nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label description="Select the deployment category">
          Select Category
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {Object.entries(ChallengeCategoryValuesWithDescription).map(
            ([key, value]) => (
              <div
                key={key}
                className={cn(
                  'cursor-pointer rounded-xl py-2 px-3',
                  'box-border transition-all duration-150',
                  category === key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/70'
                )}
                onClick={() => setCategory(key as ChallengeCategory)}
              >
                <p className="font-bold capitalize">{key}</p>
                <p className="text-xs">{value}</p>
              </div>
            )
          )}
        </div>
      </div>
      <div>
        <Input
          type="file"
          accept=".zip"
          label="Upload Challenge"
          description="Upload challenge file (.zip)"
          onChange={(e) => {
            setChallengeZip(e.target.files ? e.target.files[0] : null);
          }}
          required={!challengeZip}
        />
        {challengeZip && (
          <span className="text-sm mt-1 inline-flex items-center gap-1 font-bold text-primary">
            <Check className="w-4 h-4" />
            {challengeZip.name}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label description="These files will be available to the participants (optional)">
          Upload Reference Files
        </Label>
        <FileUpload files={displayFiles || []} setFiles={setDisplayFiles} />
      </div>
      <div className="flex gap-2 justify-end">
        <Button
          className="w-32"
          variant={'ghost'}
          onClick={() => stepper.prevStep()}
        >
          Back
        </Button>
        <Button className="w-32" type="submit" disabled={!challengeZip}>
          Save & Next
        </Button>
      </div>
    </form>
  );
};

export default StepTwo;
