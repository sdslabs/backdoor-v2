import { MOCK_NOTIFICATIONS } from '@/lib/api/notifications/mock-data';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(MOCK_NOTIFICATIONS.slice(0, 5));
}
