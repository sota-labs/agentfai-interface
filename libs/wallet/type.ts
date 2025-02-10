export type UserWallet = {
  address: string;
  coinBalances: TCoinMetadata[];
};

export type TCoinMetadata = {
  type: string;
  decimal: number;
  name: string;
  symbol: string;
  balance: string;
};
