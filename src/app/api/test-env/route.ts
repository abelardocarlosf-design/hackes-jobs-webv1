import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    env: process.env.NODE_ENV,
    api_url: process.env.NEXT_PUBLIC_API_URL || 'not set',
    has_db_config: !!process.env.MONGODB_URI,
    deployment: process.env.VERCEL_ENV || 'local'
  });
}
