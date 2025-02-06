import axios from 'axios';
import { NextResponse } from 'next/server';
import config from '@/config';
import { cookies } from 'next/headers';

const RAIDENX_OATH_URL = config.appRaidenXApiUrl;
const AUTH_API_URL = config.authApiUrl;
const RAIDENX_CALLBACK_URL = `${process.env.NEXT_PUBLIC_APP_URL}/raidenx/callback`;

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ message: 'Invalid code' }, { status: 400 });
    }

    // first step is getting raidex access token
    const { accessToken, refreshToken } = await getRaidenXAccessToken(code);

    // then use it to connect to the raidenx agent
    await connectToRaidenXAgent(accessToken, refreshToken);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Get raidenx access token error', error);
    return NextResponse.json(
      { message: 'Connect to raidenx error', error: error?.response?.data },
      { status: 400 },
    );
  }
}

const getRaidenXAccessToken = async (code: string) => {
  try {
    const { data } = await axios.post(`${RAIDENX_OATH_URL}/get-access-token`, {
      authorizationCode: code,
      clientId: config.raidenXClientId,
      clientSecret: process.env.RAIDENX_CLIENT_SECRET_KEY,
      redirectUri: RAIDENX_CALLBACK_URL,
    });
    console.log('getRaidenXAccessToken success');
    const { accessToken, refreshToken } = data;

    return {
      accessToken,
      refreshToken,
    };
  } catch (error: any) {
    console.log('getRaidenXAccessToken error');
    throw error?.response?.data ?? error;
  }
};

const connectToRaidenXAgent = async (
  accessToken: string,
  refreshToken: string,
) => {
  try {
    const appAccessToken = cookies().get('Authorization')?.value;

    await axios.post(
      `${AUTH_API_URL}/agent/connect`,
      {
        agentId: config.raidenXAgentId,
        accessToken,
        refreshToken,
      },
      { headers: { Authorization: `Bearer ${appAccessToken}` } },
    );
    console.log('connectToRaidenXAgent success');

    return {
      accessToken,
      refreshToken,
    };
  } catch (error: any) {
    console.log('connectToRaidenXAgent error');
    throw error?.response?.data ?? error;
  }
};
