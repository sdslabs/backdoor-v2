import { NextResponse } from 'next/server';

const mockNotifications = [
  {
    title: 'Server Restart',
    description: 'The server was restarted for maintenance.',
    datetime: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    title: 'New Feature Released',
    description: 'You can now manage your profile settings.',
    datetime: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
  },
  {
    title: 'User Banned',
    description: 'A user has been banned for violating rules.',
    datetime: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
  },
  {
    title: 'Weekly Report Ready',
    description: 'Your weekly performance report is available.',
    datetime: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    title: 'New Challenge Published',
    description: 'Check out the new CTF challenge!',
    datetime: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
];

export async function GET() {
  return NextResponse.json(mockNotifications.slice(0, 5));
}
