import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
// import axios from 'axios';
// import config from '@/config';

// const AUTH_URL = config.authApiUrl;

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json({ message: 'Invalid idToken' }, { status: 400 });
    }

    // Call third-party login API
    // const { data: authUser } = await axios.post(
    //   `${AUTH_URL}/api/v1/auth/login-google`,
    //   { idToken },
    // );
    const authUser = {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMTU4MzY2NjA2NjQxMjA2OTk3NzgiLCJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3NDQ3MDgyNDMwNDctdmxpNmhyZjVyYTE3azZvZXZnamlrZzlwdWxuOTB2b2MuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3NDQ3MDgyNDMwNDctdmxpNmhyZjVyYTE3azZvZXZnamlrZzlwdWxuOTB2b2MuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTU4MzY2NjA2NjQxMjA2OTk3NzgiLCJoZCI6InNvdGF0ZWsuY29tIiwiZW1haWwiOiJtaW5oLnRhMkBzb3RhdGVrLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiNzZtOW8wc01obTBHOEV0QmJ3UjhUQSIsIm5vbmNlIjoib1loMTJSalNJN2ZvV0R1cHlGSGd3OUVXQjg0IiwibmJmIjoxNzM4ODI3NTMyLCJuYW1lIjoiTWluaCBUYSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMMmVLZG1yREtScWx3OFJNVEJLd2E1OXJ4cjJFMGoyaFYzdDlvTFJPWTJpWmxqMEhnPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Ik1pbmgiLCJmYW1pbHlfbmFtZSI6IlRhIiwiaWF0IjoxNzM4ODI3ODMyLCJleHAiOjE3Mzg4MzE0MzIsImp0aSI6IjdjY2I5Y2VkNWFlNjc2Y2FjZWJmNDdlZTY4ODE0ZWNmMmYyNmE5NjMifQ.YxG6i30z9u2XYBxMBZzT4uaEO0Upc33Nu5RhvsvPqBs',
      salt: '143332832504227692735233981887907887969',
    };
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
