import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ cart: [] });
}

export async function POST(request) {
  const body = await request.json();
  return NextResponse.json({ success: true, cart: body });
}