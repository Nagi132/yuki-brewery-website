import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Cart API endpoint' }, { status: 200 });
}