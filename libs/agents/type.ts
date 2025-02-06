import { StaticImageData } from 'next/image';

export type AgentT = {
  id: string;
  name: string;
  description: string;
  isConnected: boolean;
  logo?: string | StaticImageData;
};
