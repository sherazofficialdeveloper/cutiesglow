import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();
  return NextResponse.json({
    success: true,
    orderId: 'order-123',
    redirectUrl: '/order-confirmation/order-123',
  });
}