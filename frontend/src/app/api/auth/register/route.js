import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      user: { id: 1, name: body.name, email: body.email },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}