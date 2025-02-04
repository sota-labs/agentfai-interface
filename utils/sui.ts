import { SuiClient } from '@mysten/sui/client';
import BigNumber from 'bignumber.js';
import { sortBy } from 'lodash';

export const fetchCoinsBalance = async (
  suiProvider: SuiClient,
  address: string,
): Promise<Array<{ balance: string; type: string }>> => {
  try {
    if (!address) return [];
    const balances = await suiProvider.getAllBalances({ owner: address });
    const balancesFormatted = balances.map((item) => {
      return {
        type: item.coinType,
        balance: BigNumber(item.totalBalance).toFixed(),
      };
    });

    return sortBy(balancesFormatted, ['type', 'balance']);
  } catch (error) {
    console.log('fetchCoinsBalanceMap error: ' + error);
    return [];
  }
};
