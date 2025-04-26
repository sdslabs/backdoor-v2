const ChallengeDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <div>ChallengeDetails {id}</div>;
};

export default ChallengeDetails;
