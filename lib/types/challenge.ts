// I have used numbers here so as to easily parse the stars in ui
export enum ChallengeDifficulty {
  easy = 1,
  medium = 2,
  hard = 3,
}

export type ChallengeCategory = 'static' | 'bare' | 'web' | 'service';

export type ChallengeDeployedStatus = 'deployed' | 'undeployed';

export type ChallengeSolveStatus = 'solved' | 'unsolved';

export interface ChallengeMetadata {
  id: string;
  name: string;
  tags: string[]; // 'pwn', 'web' etc.
  points: number;
  difficulty: keyof typeof ChallengeDifficulty; // easy, medium, hard
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
  dynamic?: boolean;
  flag?: string; // * for the admin side
}

export interface ChallengeSolveResp {
  id: number;
  name: string;
  category: string;
  tags: string[];
  solvedAt: Date;
  points: number;
}
