'use client';

import { fetchChallengeMetadata } from '@/lib/data/challenge';
import { ChallengeMetadata } from '@/lib/types';
import React, { useEffect, useState } from 'react';
import ChallengeCardSkeleton from './skeletons/challenge-card-skeleton';
import ChallengeCard from './challenge-card';

const ChallengeList = () => {
  const [challenges, setChallenges] = useState<ChallengeMetadata[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchChallengeMetadata()
      .then((data) => {
        setChallenges(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {loading
        ? Array.from({ length: 6 }).map((_, index) => (
            <ChallengeCardSkeleton key={index} />
          ))
        : challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} {...challenge} />
          ))}
    </div>
  );
};

export default ChallengeList;
