import config from '@/config';
import { WHITE_LIST_COINS } from '@/constants/coinWhitelist';
import { TCoinMetadata } from '@/libs/wallet/type';
import { sortBy } from 'lodash';
import { client, covertMistToDec } from './format';

export const fetchCoinBalances = async (
  address: string,
): Promise<TCoinMetadata[]> => {
  try {
    if (!address) return [];
    const balances = await client.getAllBalances({
      owner: address,
    });

    const balancesFormatted: TCoinMetadata[] = [];

    balances.forEach((item) => {
      const coinInWl = WHITE_LIST_COINS[config.network as 'testnet' | 'mainnet'].find(
        (coin) => coin.type === item.coinType,
      );

      if (coinInWl) {
        balancesFormatted.push({
          ...coinInWl,
          balance: covertMistToDec(item.totalBalance, coinInWl.decimal),
        });
      }
    });

    return sortBy(balancesFormatted, ['type', 'balance']);
  } catch (error) {
    console.log('fetchCoinsBalanceMap error: ' + error);
    return [];
  }
};
