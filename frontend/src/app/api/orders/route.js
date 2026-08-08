import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      order: { id: 'order-123', ...body },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}