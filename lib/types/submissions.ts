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
