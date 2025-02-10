export const WHITE_LIST_COINS = {
  mainnet: [{ type: '0x2::sui::SUI', decimal: 9, name: 'SUI', symbol: 'SUI' }],
  testnet: [
    { type: '0x2::sui::SUI', decimal: 9, name: 'SUI', symbol: 'SUI' },
    {
      type: '0x7a36063de0879644fd8cb3bacd28ac7d892b61493c780ac1ff7557c9d5138daf::usdc::USDC',
      decimal: 9,
      name: 'USDC',
      symbol: 'USDC',
    },
  ],
};
