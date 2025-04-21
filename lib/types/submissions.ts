import { ChallengeCategory } from './challenge';

export interface SubmissionResp {
  user_id: number;
  username: string;
  chall_id: number;
  name: string;
  category: ChallengeCategory;
  tags: string[];
  points: number;
  solvedAt: Date;
}

// TODO: Update the submission interfaces into one.
export type SubmissionAdmin = {
  id: string;
  playerId: string;
  challengeTitle: string;
  category: string;
  points: number;
  timestamp: string;
  status: 'correct' | 'incorrect' | 'flagged' | 'suspicious';
  flag: string;
  ipAddress: string;
  userAgent: string;
  timeTaken: number; // in seconds
};
