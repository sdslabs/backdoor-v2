import { Button } from '@/components/ui/button';
import { DifficultyRating } from '@/components/ui/difficulty-rating';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useStepper } from '@/components/ui/stepper';
import { ChallengeDifficulty } from '@/lib/types';
import useCreateChallengeStore from '@/lib/stores/create-challenge-store';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const StepThree = () => {
  const stepper = useStepper();
  const {
    difficulty,
    setDifficulty,
    isPointsDynamic,
    setIsPointsDynamic,
    isFlagDynamic,
    setIsFlagDynamic,
    points,
    setPoints,
  } = useCreateChallengeStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: create the challenge
    // stepper.nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <Label
          htmlFor="difficulty"
          description="Select the difficulty level suitable to the challenge"
        >
          Select Difficulty
        </Label>
        <RadioGroup
          defaultValue={difficulty}
          onValueChange={(value) => setDifficulty(value as ChallengeDifficulty)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="easy" id="easy" />
            <Label htmlFor="easy">
              <DifficultyRating difficulty="easy" /> Easy
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="medium" />
            <Label htmlFor="medium">
              <DifficultyRating difficulty="medium" /> Medium
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hard" id="hard" />
            <Label htmlFor="hard">
              <DifficultyRating difficulty="hard" /> Hard
            </Label>
          </div>
        </RadioGroup>
      </div>
      <Input
        label="Enter Points"
        description="how much is the challenge worth?"
        placeholder="for eg. 100"
        type="number"
        defaultValue={points?.toString() || ''}
        onChange={(e) => setPoints(parseInt(e.target.value))}
      />
      <div className="flex w-full items-center justify-between">
        <Label description="Points decrease with each solve">
          Enable dynamic points
        </Label>
        <Switch
          checked={isPointsDynamic}
          onCheckedChange={setIsPointsDynamic}
        />
      </div>

      <div className="flex w-full items-center justify-between">
        <Label description="Flag is unique for each instance of the challenge">
          Enable dynamic flag
        </Label>
        <Switch checked={isFlagDynamic} onCheckedChange={setIsFlagDynamic} />
      </div>

      <Hints />

      <div className="flex gap-2 justify-end">
        <Button
          className="w-32"
          variant={'ghost'}
          onClick={() => stepper.prevStep()}
        >
          Back
        </Button>
        <Button className="w-32" type="submit">
          Create
        </Button>
      </div>
    </form>
  );
};

const Hints = () => {
  const { hints, setHints } = useCreateChallengeStore();
  const [activeHint, setActiveHint] = useState(0);
  return (
    <div className="space-y-2">
      <Label description="Give some hints to solve the challenge (optional)">
        Hints
      </Label>
      {!hints.length ? (
        <Button
          variant={'secondary'}
          size={'icon'}
          onClick={() => setHints([...hints, ''])}
        >
          <Plus className="w-3 h-3" />
        </Button>
      ) : (
        <>
          <div className="flex flex-row gap-2">
            {Array.from({ length: hints.length ?? 1 }).map((_, index) => {
              return (
                <button
                  className={cn(
                    'w-6 h-6 text-xs rounded flex items-center justify-center',
                    activeHint === index
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  )}
                  key={index}
                  onClick={() => setActiveHint(index)}
                >
                  {index + 1}
                </button>
              );
            })}
            <button
              className="w-6 h-6 text-xs rounded flex items-center justify-center"
              onClick={() => setHints([...hints, ''])}
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <Textarea
            value={hints[activeHint]}
            onChange={(e) => {
              const newHints = [...hints];
              newHints[activeHint] = e.target.value;
              setHints(newHints);
            }}
          />
        </>
      )}
    </div>
  );
};

export default StepThree;
