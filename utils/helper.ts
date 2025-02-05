import config from '@/config';
import { SUI_VISION_URL_CONFIGS } from '@/constants';

export const truncateMiddleText = (
  text: string,
  ellipsis = '...',
  start = 6,
  end = 6,
): string => {
  if (text?.length > start + end) {
    return `${text.slice(0, start)}${ellipsis}${text.slice(end * -1)}`;
  }

  return text;
};

export const getSuiVisionExplore = (account: string) => {
  return `${SUI_VISION_URL_CONFIGS[config.network]}/account/${account}`;
};

export const getRaindexAuthorizeUrl = () => {
  return `${config.appRaidenXUrl}/authorize?redirect_uri=${config.raidenXCallbackUrl}&client_id=${config.raidenXClientId}&scope=${config.agentScopes}`;
};
