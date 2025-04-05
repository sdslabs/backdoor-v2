'use client';

import { ChallengeList, ChallengeModal } from '@/components/challenge';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

/* 
  This page is completely client side rendered.

  Reasons:
  1. We'll get all the metadata at once. Now we'll have to filter 
  and paginate it - which requires state thus client side.

  2. [IMPORTANT] The filters and categories must be sharable - 
  i.e. the state of the filters used or the challenge opened must 
  reflect in the user's URL - so that it's easier to share.

  3. Plus, we can add some cool microinteractions here for filtering.
*/

const ChallengePage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  // Router access is only available in app router, so had to pass as a prop
  // to ChallengeModal.
  const router = useRouter();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Challenges</h1>
      <ChallengeList />
      {/* 
        Model state is persisted with url with query params.
      */}
      {id && (
        <ChallengeModal
          open={true}
          onOpenChange={() => router.back()}
          challengeId={id}
        />
      )}
    </div>
  );
};

export default ChallengePage;
