import { StaticImageData } from 'next/image';

export type AgentT = {
  agentId: string;
  name: string;
  description: string;
  isConnected: boolean;
  logoUrl?: string | StaticImageData;
  oauthRequired: boolean;
};
