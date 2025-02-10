import { TCoinMetadata } from '@/libs/wallet/type';
import { sortBy } from 'lodash';
import { client, covertMistToDec } from './format';
import { SUI_COIN_TYPE } from '@/constants';
import { TokenImages } from '@/assets/images/token';

export const fetchCoinBalances = async (
  address: string,
): Promise<TCoinMetadata[]> => {
  try {
    if (!address) return [];
    const balances = await client.getAllBalances({
      owner: address,
    });

    const balancesFormatted = [];
    for (const balance of balances) {
      const coin = await client.getCoinMetadata({ coinType: balance.coinType });
      balancesFormatted.push({
        ...coin,
        image: balance?.coinType === SUI_COIN_TYPE ? TokenImages.sui : coin?.iconUrl,
        coinType: balance.coinType,
        decimals: coin?.decimals,
        balance: covertMistToDec(balance.totalBalance, coin?.decimals),
      } as TCoinMetadata);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    return sortBy(balancesFormatted, ['type', 'balance']);
  } catch (error) {
    console.log('fetchCoinsBalanceMap error: ' + error);
    return [];
  }
};
