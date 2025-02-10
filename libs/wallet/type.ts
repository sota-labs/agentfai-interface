export type UserWallet = {
  address: string;
  coinBalances: TCoinMetadata[];
};

export type TCoinMetadata = {
  coinType: string;
  decimals: number;
  name: string;
  symbol: string;
  balance: string;
  image?: string;
};
