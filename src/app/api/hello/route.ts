import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'Hello from Hackes Jobs API',
    status: 'online',
    version: '2.0.0'
  });
}
