import { ChallengeCategory, ChallengeTag } from './challenge';

export interface SubmissionResp {
  userId: number;
  username: string;
  challId: number;
  name: string;
  category: ChallengeCategory;
  tags: ChallengeTag[];
  points: number;
  solvedAt: Date;
}
