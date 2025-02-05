import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    return NextResponse.json({});
  } catch (error: any) {
    console.error('Get raidenx access token error', error);
    return NextResponse.json(
      { message: 'Invalid credentials', error: error.response?.data },
      { status: 401 },
    );
  }
}
