export type CoinBalance = {
  balance: string;
  type: string;
};

export type UserWallet = {
  address: string;
  coinBalances: CoinBalance[];
};
