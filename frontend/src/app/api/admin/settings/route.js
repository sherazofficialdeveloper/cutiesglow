import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    siteName: 'Cutish by Razias',
    contactEmail: 'info@cutishbyrazias.com',
  });
}

export async function POST(request) {
  const body = await request.json();
  return NextResponse.json({ success: true, settings: body });
}