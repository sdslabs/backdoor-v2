import { ChallengeSolveResp } from './challenge';

export type UserRole = 'admin' | 'contestant' | 'author' | 'maintainer';

export const UserStatus: Record<number, string> = {
  0: 'normal',
  1: 'ban',
  2: 'hide',
};

export interface User {
  id: number;
  username: string;
  role: UserRole;
  status: keyof typeof UserStatus;
  score: number;
  rank: number;
  email: string;
  challenges: ChallengeSolveResp[];
}

export type UserInfo = Omit<User, 'challenges'>;
