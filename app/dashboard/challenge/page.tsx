import {
  ChallengeList,
  ChallengeModal,
  ChallengeTagsSidebar,
  ChallengeHeader,
} from '@/components/challenge';

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
  return (
    <>
      <div className="flex flex-row gap-8 w-full">
        <ChallengeTagsSidebar />
        <div className="flex flex-1 flex-col">
          <ChallengeHeader />
          <ChallengeList />
        </div>
      </div>
      {/* 
        Model state is persisted with url with query params.
      */}
      <ChallengeModal />
    </>
  );
};

export default ChallengePage;
