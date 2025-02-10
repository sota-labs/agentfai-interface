import { StaticImageData } from 'next/image';

export type AgentT = {
  agentId: string;
  name: string;
  description: string;
  isConnected?: boolean;
  logoUrl?: string | StaticImageData;
  oauthRequired: boolean;
};

export type AgentWallet = {
  address: string;
  aliasName: string;
  balance: string;
  balanceUsd: string;
  isActive: boolean;
  isDefault: boolean;
  isExternal: boolean;
  network: string;
  privateKey: string;
  publicKey: string;
  userId: string;
};
