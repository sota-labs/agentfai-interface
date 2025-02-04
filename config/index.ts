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
  appUrl: string;
  googleCallbackUrl: string;
  network: 'testnet' | 'mainnet';
}

export const envConfig = process.env.NEXT_PUBLIC_ENV || 'dev';
let appUrl = process.env.NEXT_PUBLIC_APP_URL;
if (typeof window !== 'undefined') {
  appUrl = window.location.origin;
}
const googleCallbackUrl = `${appUrl}/google/callback`;

if (appUrl) {
  console.log('AppUrl: ' + appUrl);
}

interface EnvConfig {
  prod: Config;
  dev: Config;
}

const configs: EnvConfig = { dev, prod } as EnvConfig;
let config: Config = configs[envConfig as keyof typeof configs];

config = {
  ...config,
  appUrl: appUrl || '',
  googleCallbackUrl: googleCallbackUrl,
};

export default config;
