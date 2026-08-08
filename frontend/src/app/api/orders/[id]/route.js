import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = params;
  return NextResponse.json({
    order: {
      id,
      total: 99.99,
      status: 'pending',
      createdAt: new Date().toISOString(),
      items: [{ id: 1, name: 'Product 1', quantity: 2, price: 49.99 }],
    },
  });
}