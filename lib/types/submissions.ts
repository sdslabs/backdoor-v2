import { ChallengeCategory, ChallengeTag } from './challenge';

export type UserActionType = 'ban' | 'unban';
export interface Submission {
  userId: number;
  username: string;
  challId: number;
  name: string;
  category: ChallengeCategory;
  tags: ChallengeTag[];
  points: number;
  solvedAt: Date;
  flag: string;
  correct: boolean;
  Cheating?: boolean;
}

export interface SubmissionResp {
  user_id: number;
  username: string;
  chall_id: number;
  name: string;
  category: ChallengeCategory;
  tags: ChallengeTag[];
  points: number;
  solvedAt: Date;
  flag: string;
  success: boolean;
  Cheating?: boolean;
}
