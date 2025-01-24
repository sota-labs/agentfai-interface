import dev from './dev.json';
import prod from './prod.json';

export interface Config {
  appRaidenXUrl: string;
  apiRaidenXUrl: string;
  apiUrl: string;
  recaptchaSiteKey: string;
  endpoints: {
    ws: string;
    wsRaidenX: string;
  };
  explorerUrl: string;
  network: string;
  tokenAddress: string;
  dao: {
    packageId: string;
    packageIdCurrent: string;
    daoConfigObjectId: string;
  };
  staking: {
    packageId: string;
    packageIdCurrent: string;
    metadataObjectId: string;
    launchpadObjectId: string;
    tokenAddress: string;
  };
}

export const envConfig = process.env.NEXT_PUBLIC_ENV || 'dev';

interface EnvConfig {
  prod: Config;
  dev: Config;
}

const configs: EnvConfig = { dev, prod } as EnvConfig;
const config: Config = configs[envConfig as keyof typeof configs];

export default config;
