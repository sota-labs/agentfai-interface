import axios from 'axios';
import { NextResponse } from 'next/server';
import config from '@/config';

const RAIDENX_OATH_URL = config.appRaidenXApiUrl;
const AUTH_API_URL = config.authApiUrl;

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ message: 'Invalid code' }, { status: 400 });
    }

    const { accessToken, refreshToken } = await getRaidenXAccessToken(code);
    await connectToRaidenXAgent(accessToken, refreshToken);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Get raidenx access token error', error);
    return NextResponse.json(
      { message: 'Invalid credentials', error: error.response?.data },
      { status: 401 },
    );
  }
}

const getRaidenXAccessToken = async (code: string) => {
  try {
    const { data: agentAuth } = await axios.post(
      `${RAIDENX_OATH_URL}/get-access-token`,
      {
        authorizationCode: code,
        clientId: config.raidenXClientId,
        clientSecret: process.env.RAIDENX_CLIENT_SECRET_KEY,
        redirectUri: config.appUrl,
      },
    );
    const { accessToken, refreshToken } = agentAuth;

    return {
      accessToken,
      refreshToken,
    };
  } catch (error: any) {
    throw new Error('getRaidenXAccessToken error', error);
  }
};

const connectToRaidenXAgent = async (
  accessToken: string,
  refreshToken: string,
) => {
  try {
    await axios.post(`${AUTH_API_URL}/agent/connect`, {
      agentId: config,
      accessToken,
      refreshToken,
    });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error: any) {
    throw new Error('connectToRaidenXAgent error', error);
  }
};
