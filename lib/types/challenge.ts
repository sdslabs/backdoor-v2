import { UserSolveResp } from './user';

export type ChallengeDifficulty = 'easy' | 'medium' | 'hard';

export const ChallengeDifficultyValue: Record<ChallengeDifficulty, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};

export type ChallengeTag =
  | 'all'
  | 'general'
  | 'web'
  | 'forensics'
  | 'pwn'
  | 'rev'
  | 'crypto'
  | 'osint';

export type ChallengeCategory = 'static' | 'bare' | 'web' | 'service';

export type ChallengeDeployedStatus = 'deployed' | 'undeployed';

export type ChallengeSolveStatus = 'solved' | 'unsolved';

export interface ChallengeMetadata {
  id: string;
  name: string;
  tags: ChallengeTag[]; // 'pwn', 'web' etc.
  points: number;
  difficulty: ChallengeDifficulty; // easy, medium, hard
  solvesNumber: number;
  solveStatus: ChallengeSolveStatus;
  deployedStatus: ChallengeDeployedStatus;
}

export interface Challenge extends ChallengeMetadata {
  description: string;
  // TODO
  // hints -> hintsNumber and query the hint from the backend
  // when the user asks to buy the hint for some points.
  // * Will make an issue of this later
  hints: string[];
  createdAt: Date;
  category: ChallengeCategory;
  assets: string[]; // assets names, will generate the link on the frontend
  additionalLinks: string[]; // these are links to additional resources
  ports: number[];
}

export interface ChallengeDetails extends Challenge {
  dynamicFlag: boolean;
  flag: string;
  solves: UserSolveResp[];
}

export interface ChallengeSolveResp {
  id: number;
  name: string;
  category: string;
  tags: string[];
  solvedAt: Date;
  points: number;
}
