import config from '@/config';
import { WHITE_LIST_COINS } from '@/constants/coinWhitelist';
import { TCoinMetadata } from '@/libs/wallet/type';
import { SuiClient } from '@mysten/sui/client';
import BigNumber from 'bignumber.js';
import { sortBy } from 'lodash';

export const fetchCoinsBalance = async (
  suiProvider: SuiClient,
  address: string,
): Promise<TCoinMetadata[]> => {
  try {
    if (!address) return [];
    const balances = await suiProvider.getAllBalances({
      owner: address,
    });

    const balancesFormatted: TCoinMetadata[] = [];

    balances.forEach((item) => {
      const coinInWl = WHITE_LIST_COINS[config.network].find(
        (coin) => coin.type === item.coinType,
      );

      if (coinInWl) {
        balancesFormatted.push({
          ...coinInWl,
          balance: BigNumber(item.totalBalance).toFixed(),
        });
      }
    });

    return sortBy(balancesFormatted, ['type', 'balance']);
  } catch (error) {
    console.log('fetchCoinsBalanceMap error: ' + error);
    return [];
  }
};
