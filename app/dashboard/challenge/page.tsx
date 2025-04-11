import {
  ChallengeList,
  ChallengeModal,
  ChallengeTagsSidebar,
  ChallengeHeader,
} from '@/components/challenge';

/* 
  This is the main page for the challenge dashboard.
  It contains the challenge list and the challenge tags sidebar.
  The challenge list is filtered by the selected tags, status and difficulty.
  The challenge tags sidebar allows the user to filter the challenges by tags.
  The challenge modal is used to display the challenge details when a challenge is clicked.

  All the states are in the URL.
  URL Params - 
  * @param id - challenge id
  * @param tag - challenge tag (all, web, pwn, etc.)
  * @param status - challenge status (solved, unsolved)
  * @param difficulty - challenge difficulty (easy, medium, hard)
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
      <ChallengeModal />
    </>
  );
};

export default ChallengePage;
