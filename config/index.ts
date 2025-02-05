import dev from './dev.json';
import prod from './prod.json';

export interface Config {
  appRaidenXUrl: string;
  appApiUrl: string;
  authApiUrl: string;
  rpcUrl: string;
  zkProofUrl: string;
  suiEpochTime: number;
  googleClientId: string;
  appUrl?: string;
  googleCallbackUrl?: string;
  raidenxCallbackUrl?: string;
  network: 'testnet' | 'mainnet';
  raidenxClientId: string;
  agentScopes?: string;
  appRaidenXApiUrl: string;
}

export const envConfig = process.env.NEXT_PUBLIC_ENV || 'dev';
let appUrl = process.env.NEXT_PUBLIC_APP_URL;
if (typeof window !== 'undefined') {
  appUrl = window.location.origin;
}
const googleCallbackUrl = `${appUrl}/google/callback`;
const raidenxCallbackUrl = `${appUrl}/raidenx/callback`;

if (appUrl) {
  console.log('AppUrl: ' + appUrl);
}

const agentScopes =
  process.env.NEXT_PUBLIC_RAIDENX_AGENT_SCOPE ||
  'full_read_only,order.market.write,order.limit.write';

interface EnvConfig {
  prod: Config;
  dev: Config;
}

const configs: EnvConfig = { dev, prod } as EnvConfig;
let config: Config = configs[envConfig as keyof typeof configs];

config = {
  ...config,
  appUrl: appUrl || '',
  googleCallbackUrl,
  raidenxCallbackUrl,
  agentScopes,
};

export default config;
