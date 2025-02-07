
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';
import config from '@/config';
import { jwtDecode } from 'jwt-decode';

const AUTH_URL = config.authApiUrl;

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json({ message: 'Invalid idToken' }, { status: 400 });
    }

    // Call third-party login API
    const { data: authUser } = await axios.post(`${AUTH_URL}/api/v1/auth/login-google`, { idToken });
    const { accessToken } = authUser;

    // decode accessToken
    const decodedToken = jwtDecode(accessToken);
    
    // Set auth token in a session cookie
    cookies().set('Authorization', accessToken, {
      httpOnly: true,
      secure: process.env.NEXT_PUBLIC_ENV === 'prod',
      maxAge: Math.max(60 * 60, (decodedToken.exp || 0) - Math.floor(Date.now() / 1000)), // Set maxAge based on token expiration
      path: '/',
    });

    return NextResponse.json(authUser);
  } catch (error: any) {
    console.error('Login Google Error', error);
    return NextResponse.json(
      { message: 'Invalid credentials', error: error.response?.data },
      { status: 401 }
    );
  }
}