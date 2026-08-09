import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    siteName: 'CutiesGlow by Razias',
    contactEmail: 'info@CutiesGlowbyrazias.com',
  });
}

export async function POST(request) {
  const body = await request.json();
  return NextResponse.json({ success: true, settings: body });
}