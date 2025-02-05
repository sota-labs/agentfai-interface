import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    cookies().set('Authorization', undefined, {
      httpOnly: true,
    });

    return NextResponse.json({ message: 'Logout success' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Logout error', error: error.response?.data },
      { status: 404 },
    );
  }
}
