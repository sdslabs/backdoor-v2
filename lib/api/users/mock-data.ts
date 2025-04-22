import { UserInfo } from '@/lib/types';

export const MOCK_USERS: UserInfo[] = [
  {
    id: 1,
    rank: 1,
    username: 'c4pt4in_h00k_1818',
    score: 4500,
    email: 'captain_hook1818@example.com',
    role: 'contestant',
    status: 0,
  },
  {
    id: 2,
    rank: 2,
    username: 'h4shk4t',
    score: 3000,
    email: 'hashkat@example.com',
    role: 'contestant',
    status: 0,
  },
  {
    id: 3,
    rank: 3,
    username: 'L0r3m_1a_2y2s',
    score: 1800,
    email: 'lorem_1a_2y2s@example.com',
    role: 'contestant',
    status: 0,
  },
  {
    id: 4,
    rank: 4,
    username: 'n3on_n1nj4',
    score: 2500,
    email: 'neon_ninja@example.com',
    role: 'contestant',
    status: 0,
  },
  {
    id: 5,
    rank: 5,
    username: 'b1nary_w0lf',
    score: 2000,
    email: 'binary_wolf@example.com',
    role: 'contestant',
    status: 0,
  },
  {
    id: 6,
    rank: 6,
    username: 'cryp70_h4wk',
    score: 2300,
    email: 'crypto_hawk@example.com',
    role: 'contestant',
    status: 0,
  },
  {
    id: 7,
    rank: 7,
    username: 'm3t4_ph4ntom',
    score: 2700,
    email: 'meta_phantom@example.com',
    role: 'contestant',
    status: 0,
  },
  {
    id: 8,
    rank: 8,
    username: 's0rc3ry_k1ng',
    score: 1000,
    email: 'sorcery_king@example.com',
    role: 'contestant',
    status: 0,
  },
  {
    id: 9,
    rank: 9,
    username: 'd4rk_m4g1c14n',
    score: 1200,
    email: 'dark_magician@example.com',
    role: 'contestant',
    status: 0,
  },
  {
    id: 10,
    rank: 10,
    username: 'wh173_h47',
    score: 800,
    email: 'white_hat@example.com',
    role: 'contestant',
    status: 0,
  },
  // The last 35 users will have 0 points
  ...Array(35)
    .fill(null)
    .map((_, index) => {
      const rank = 11 + index;
      return {
        id: rank,
        rank: rank,
        username: `user_${rank}`,
        score: 0,
        email: `user_${rank}@example.com`,
        role: 'contestant',
        status: 0,
      } satisfies UserInfo; // Use 'satisfies' for type checking
    }),
];
