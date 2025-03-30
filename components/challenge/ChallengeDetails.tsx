import { fetchChallengeData } from '@/lib/data/challenge';
import { Challenge, ChallengeDifficulty } from '@/lib/types';
import { Star, Bookmark, DownloadIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import ChallengeDetailsSkeleton from './ChallengeDetailsSkeleton';

const ChallengeDetails: React.FC<{ challengeId: string }> = ({
  challengeId,
}) => {
  const [flagInput, setFlagInput] = useState('');
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenge = async () => {
      setLoading(true);
      try {
        const response = await fetchChallengeData(challengeId);
        setChallenge(response);
      } catch (error) {
        console.error('Error fetching challenge:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [challengeId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting flag:', flagInput);
  };

  const renderStars = (difficulty: keyof typeof ChallengeDifficulty) => {
    const difficultyMapping: Record<keyof typeof ChallengeDifficulty, number> =
      {
        easy: 1,
        medium: 2,
        hard: 3,
      };

    return Array.from({ length: 3 }, (_, i) => (
      <Star
        key={i}
        size={18}
        className={
          i < difficultyMapping[difficulty]
            ? 'text-primary'
            : 'text-muted-foreground '
        }
      />
    ));
  };
  if (!challenge || loading) {
    return <ChallengeDetailsSkeleton />;
  }

  return (
    <div className="bg-accent text-secondary-foreground p-4 max-w-4xl w-full font-sans ">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-4xl font-display">{challenge.name}</h2>
          <Bookmark
            size={22}
            className="text-muted-foreground cursor-pointer hover:text-primary transition"
          />
        </div>
        <div className="flex items-center gap-1">
          {renderStars(challenge.difficulty)}
        </div>
      </div>

      <div className="flex justify-between align-center">
        <div className="flex gap-2 mb-6 flex-wrap">
          {challenge.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <div className="flex justify-between mb-6">
          <div></div>
          <div className="text-right ">{challenge.solvesNumber} solves</div>
        </div>
      </div>

      <p className="mb-6 text-accent-foreground">{challenge.description}</p>

      {challenge.assets.length > 0 && (
        <div className="mb-6">
          {challenge.assets.map((asset) => (
            <div key={asset} className="flex items-center mb-2">
              <a
                href="#"
                className="text-primary hover:underline flex items-center"
              >
                {asset}
                <DownloadIcon size={16} className="ml-2" />
              </a>
            </div>
          ))}
        </div>
      )}

      {challenge.hints.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span>Hints</span>
            {challenge.hints.map((_, index) => (
              <span
                key={index}
                className="w-6 h-6 flex items-center justify-center bg-muted text-muted-foreground  rounded-md cursor-pointer"
              >
                {index + 1}
              </span>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex mt-4">
        <input
          type="text"
          placeholder="Enter flag"
          className="flex-grow p-3 bg-accent text-accent-foreground  rounded-l-lg focus:outline-none focus:ring focus:ring-primary"
          value={flagInput}
          onChange={(e) => setFlagInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-primary  text-primary-foreground px-6 py-3 rounded-r-lg hover:bg-primary transition"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default ChallengeDetails;
