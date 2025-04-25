import ChallengeCardSkeleton from './challenge-card-skeleton';

const ChallengeListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 9 }).map((_, i) => (
        <ChallengeCardSkeleton key={i} />
      ))}
    </div>
  );
};

export { ChallengeListSkeleton };
