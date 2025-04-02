export type Submission = {
  id: string;
  playerId: string;
  challengeTitle: string;
  category: string;
  points: number;
  timestamp: string;
  status: 'correct' | 'incorrect' | 'flagged' | 'suspicious';
  flag: string;
  ipAddress: string;
  userAgent: string;
  timeTaken: number; // in seconds
};

export const submissions: Submission[] = [
  {
    id: 'sub_001',
    playerId: 'c4pt4in_h00k_1818',
    challengeTitle: 'Challenge A',
    category: 'Cryptography',
    points: 1000,
    timestamp: '2024-03-15T14:23:45Z',
    status: 'correct',
    flag: 'flag{cr1pt0_m4st3r}',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    timeTaken: 345,
  },
  {
    id: 'sub_002',
    playerId: 'h4shk4t',
    challengeTitle: 'Challenge B',
    category: 'Web Exploitation',
    points: 800,
    timestamp: '2024-03-15T15:30:12Z',
    status: 'flagged',
    flag: 'flag{w3b_h4ck3r}',
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    timeTaken: 60,
  },
  {
    id: 'sub_003',
    playerId: 'L0r3m_1a_2y2s',
    challengeTitle: 'Challenge C',
    category: 'Reverse Engineering',
    points: 1200,
    timestamp: '2024-03-15T16:45:30Z',
    status: 'suspicious',
    flag: 'flag{r3v3rs3_pr0}',
    ipAddress: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64)',
    timeTaken: 45,
  },
  {
    id: 'sub_004',
    playerId: 'n3on_n1nj4',
    challengeTitle: 'Challenge D',
    category: 'Binary Exploitation',
    points: 1500,
    timestamp: '2024-03-15T17:15:20Z',
    status: 'correct',
    flag: 'flag{b1n_pwn3d}',
    ipAddress: '192.168.1.103',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    timeTaken: 890,
  },
  {
    id: 'sub_005',
    playerId: 'b1nary_w0lf',
    challengeTitle: 'Challenge A',
    category: 'Cryptography',
    points: 1000,
    timestamp: '2024-03-15T18:20:10Z',
    status: 'incorrect',
    flag: 'flag{wrong_guess}',
    ipAddress: '192.168.1.104',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1)',
    timeTaken: 234,
  },
];
