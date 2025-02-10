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
    scope: agentScopes,
  });
  return `${config.appRaidenXUrl}/authorize?${params.toString()}`;
};

export const parseSSEMessage = (sseString: string) => {
  const lines = sseString.split('\n');
  const event: any = {};

  lines.forEach((line) => {
    const [field, ...rest] = line.split(':');
    if (field) {
      const value = rest.join(':').trim();
      if (field === 'data') {
        try {
          event[field] = JSON.parse(value);
        } catch (e) {
          event[field] = value;
        }
      } else {
        event[field] = value;
      }
    }
  });

  return event;
};
