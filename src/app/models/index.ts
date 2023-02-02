export type DirectionType = 'source' | 'destination';

export type TokensMap = {
  [tokenKey: string]: TokenDetails;
};

export interface TokenDetails {
  symbol: string;
  name: string;
  tokenAddress: string;
  icon: string;
  lpIcon: string;
  decimals: number;
}

export interface URLParams {
  f?: string;
  t?: string;
  ft?: string;
  tt?: string;
  theme?: 'dark' | 'light'
}
