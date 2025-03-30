'use client';
import ChallengeCard from '@/components/challenge/ChallengeCard';
import ChallengeDetails from '@/components/challenge/ChallengeDetails';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { fetchChallengeMetadata } from '@/lib/data/challenge';
import React, { useEffect, useState } from 'react';
import { ChallengeMetadata } from '@/lib/types';
import ChallengeCardSkeleton from '@/components/challenge/ChallengeSkeleton';

const ChallengePage = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(
    null
  );

  const [challenges, setChallenges] = useState<ChallengeMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChallengeMetadata().then((data) => {
      setChallenges(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Challenges</h1>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <ChallengeCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              {...challenge}
              onClick={() => setSelectedChallenge(challenge.id)}
            />
          ))}
        </div>
      )}
      <Dialog
        open={!!selectedChallenge}
        onOpenChange={(open) => !open && setSelectedChallenge(null)}
      >
        <DialogContent className="bg-muted dark">
          <VisuallyHidden>
            <DialogHeader>
              <DialogTitle>Challenge Details</DialogTitle>
            </DialogHeader>
          </VisuallyHidden>
          <ChallengeDetails challengeId={selectedChallenge!} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChallengePage;
