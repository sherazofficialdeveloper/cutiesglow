import { NextResponse } from 'next/server';

export async function GET() {
  // Return authenticated user
  return NextResponse.json({
    user: { id: 1, name: 'Test User', email: 'test@example.com' },
  });
}