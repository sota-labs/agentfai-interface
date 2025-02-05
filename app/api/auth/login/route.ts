import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';
import config from '@/config';

const AUTH_URL = config.authApiUrl;

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json({ message: 'Invalid idToken' }, { status: 400 });
    }

    // Call third-party login API
    const { data: authUser } = await axios.post(
      `${AUTH_URL}/auth/login-google`,
      { idToken },
    );
    const { accessToken } = authUser;

    // Set auth token in a session cookie (valid for 7 days)
    cookies().set('Authorization', accessToken, {
      httpOnly: true,
      secure: process.env.NEXT_PUBLIC_ENV === 'prod',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return NextResponse.json(authUser);
  } catch (error: any) {
    console.error('Login Google Error', error);
    return NextResponse.json(
      { message: 'Invalid credentials', error: error.response?.data },
      { status: 401 },
    );
  }
}
