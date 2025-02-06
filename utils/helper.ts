import config from '@/config';

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
  return `${config.explorerUrl}/account/${account}`;
};

export const getRaindexAuthorizeUrl = () => {
  const agentScopes = 'full_read_only,order.market.write,order.limit.write';
  const params = new URLSearchParams({
    redirect_uri: config.raidenXCallbackUrl,
    client_id: config.raidenXClientId,
    scope: agentScopes
  });
  return `${config.appRaidenXUrl}/authorize?${params.toString()}`;
};
