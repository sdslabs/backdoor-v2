import { ChallengeSolveResp } from './challenge';

export type UserRole = 'admin' | 'contestant' | 'author' | 'maintainer';

export enum UserStatus {
  normal = 0,
  ban = 1,
  hide = 2,
}

export interface User {
  id: number;
  username: string;
  role: UserRole;
  status: number; // This number should be parsed using UserStatus
  score: number;
  rank: number;
  email: string;
  challenges: ChallengeSolveResp[];
}
