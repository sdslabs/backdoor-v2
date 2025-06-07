import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStepper } from '@/components/ui/stepper';
import { Textarea } from '@/components/ui/textarea';
import useCreateChallengeStore from '@/lib/stores/create-challenge-store';
import { ChallengeTagValues } from '@/lib/types';
import { cn } from '@/lib/utils';
import React from 'react';

const StepOne = () => {
  const stepper = useStepper();
  const { name, setName, description, setDescription, tags, setTags } =
    useCreateChallengeStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    stepper.nextStep();
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <Input
        label="Challenge Name"
        description="Enter a suitable name for your challenge"
        placeholder="for eg. -- I_lov3_FFTs"
        defaultValue={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Textarea
        label="Challenge Description"
        description="Fill in the details required for the challenge (max. 350 characters)"
        placeholder="for eg. -- I love FFTs and I want to share my knowledge with you"
        defaultValue={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <div className="flex flex-col gap-2">
        <Label description="Select the category tags the challenge would fit in">
          Select Tags
        </Label>
        <div className="flex flex-row gap-2 flex-wrap">
          {ChallengeTagValues.map((tag) => (
            <div
              key={tag}
              className={cn(
                'cursor-pointer rounded-full w-24 h-7 flex text-sm items-center justify-center',
                ' box-border transition-all duration-150',
                tags.includes(tag)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/70 border border-muted-foreground/70'
              )}
              onClick={() =>
                setTags(
                  tags.includes(tag)
                    ? tags.filter((t) => t !== tag)
                    : [...tags, tag]
                )
              }
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <Button
          type="submit"
          disabled={!name || !description || !tags.length}
          className="w-32"
        >
          Save & Next
        </Button>
      </div>
    </form>
  );
};

export default StepOne;
