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
export const ChallengeTagValues: ChallengeTag[] = [
  'general',
  'web',
  'forensics',
  'pwn',
  'rev',
  'crypto',
  'osint',
];

export type ChallengeCategory = 'static' | 'bare' | 'web' | 'service';

export const ChallengeCategoryValuesWithDescription: Record<
  ChallengeCategory,
  string
> = {
  static: 'Static challenges with no infrastructure requirements',
  bare: 'Bare metal challenges requiring infrastructure',
  web: 'Web-based challenges with HTTP endpoints',
  service: 'Network service based challenges',
};

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
  createdAt: Date;
}

export interface Challenge extends ChallengeMetadata {
  description: string;
  // TODO
  // hints -> hintsNumber and query the hint from the backend
  // when the user asks to buy the hint for some points.
  // * Will make an issue of this later
  hints: string[];
  category: ChallengeCategory;
  assets: string[]; // assets names, will generate the link on the frontend
  additionalLinks: string[]; // these are links to additional resources
  previousTries: number;
  maxAttemptLimit: number;
  deployedLink: string;
}

export interface ChallengeDetails extends Challenge {
  // for admin
  deployedStatus: ChallengeDeployedStatus;
  dynamicFlag: boolean;
  flag: string;
  // solves: UserSolveResp[]; ** Make an api for this separately, this governs the graph and the user solve status table
}

export interface ChallengeSolveResp {
  id: number;
  name: string;
  category: string;
  tags: string[];
  solvedAt: Date;
  points: number;
}

/* 
* service - nc <deployed-link>:<port>

*/
