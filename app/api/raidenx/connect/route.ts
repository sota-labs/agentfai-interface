import axios from 'axios';
import { NextResponse } from 'next/server';
import config from '@/config';
import { cookies } from 'next/headers';

const RAIDENX_OATH_URL = config.appRaidenXApiUrl;
const AUTH_API_URL = config.authApiUrl;
const RAIDENX_CLIENT_SECRET_KEY =
  process.env.RAIDENX_CLIENT_SECRET_KEY || '9dd4abe7f02496740c101052ed934d86';
const RAIDENX_CLIENT_ID = config.raidenXClientId;

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
      clientId: RAIDENX_CLIENT_ID,
      clientSecret: RAIDENX_CLIENT_SECRET_KEY,
    });
    console.log('getRaidenXAccessToken success', {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
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
    console.log('connectToRaidenXAgent', {
      accessToken,
      refreshToken,
      clientId: RAIDENX_CLIENT_ID,
      clientSecret: RAIDENX_CLIENT_SECRET_KEY,
      appAccessToken: appAccessToken,
    });
    await axios.post(
      `${AUTH_API_URL}/api/v1/agent/connect`,
      {
        agentId: config.raidenXAgentId,
        accessToken,
        refreshToken,
        clientId: RAIDENX_CLIENT_ID,
        clientSecret: RAIDENX_CLIENT_SECRET_KEY,
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
