import dev from './dev.json';
import prod from './prod.json';

export interface Config {
  appRaidenXUrl: string;
  appRaidenXApiUrl: string;
  appUrl: string;
  appApiUrl: string;
  authApiUrl: string;
  rpcUrl: string;
  zkProofUrl: string;
  suiEpochTime: number;
  googleClientId: string;
  network: string;
  raidenXClientId: string;
  defaultAgentId: string;
  raidenxAgentId: string;
  googleCallbackUrl: string;
  raidenXCallbackUrl: string;
  explorerUrl: string;
}

export const envConfig = process.env.NEXT_PUBLIC_ENV || 'dev';
interface EnvConfig {
  prod: Config;
  dev: Config;
}

const configs: EnvConfig = { dev, prod } as EnvConfig;
let config: Config = configs[envConfig as keyof typeof configs];

const googleCallbackUrl = `${config.appUrl}/google/callback`;
const raidenXCallbackUrl = `${config.appUrl}/raidenx/callback`;

console.log('AppUrl: ' + config.appUrl);

config = {
  ...config,
  googleCallbackUrl,
  raidenXCallbackUrl,
};

export default config;
