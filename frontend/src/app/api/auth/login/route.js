import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    // Forward to backend or handle login
    // For now, return a mock response
    return NextResponse.json({
      success: true,
      user: { id: 1, name: 'Test User', email: body.email },
      token: 'mock-jwt-token',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}