// Instance types for instance-on-demand challenges

export interface InstanceResponse {
  instance_id: string;
  challenge_name: string;
  hosted_address: string;
  port: number;
  created_at: string;
  expires_at: string;
  ttl_seconds: number;
}

export interface AdminInstanceResponse extends InstanceResponse {
  user_id: string;
  username: string;
  container_id: string;
  deployment_type: string;
}

export interface InstanceChallenge {
  id: string;
  name: string;
  tags: string[];
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  solvesNumber: number;
  solveStatus: 'solved' | 'unsolved' | 'all';
  isInstanced: boolean;
  description?: string;
  assets?: string[];
  hints?: { id: number; points: number; description: string }[];
}

// Check solution response (for sadserver challenges)
export interface CheckSolutionResponse {
  message: string;
  success: boolean;
}

// Instance action types
export type InstanceAction = 'spawn' | 'extend' | 'kill' | 'check';
