export type ChainDetailsMapDTO = {
  [chainSymbol: string]: ChainDetailsDTO;
};

export interface ChainDetailsDTO {
  tokens: TokenDTO[];
  chainId: number;
  bridgeAddress: string;
  txTime: TxTimeDTO;
  confirmations: number;
}

export type TxTimeDTO = {
  [messenger in MessengerKeyDTO]: MessengerDTO;
};

export interface TokenDTO {
  symbol: string;
  name: string;
  decimals: number;
  poolAddress: string;
  tokenAddress: string;
  poolInfo: PoolInfoDTO;
  feeShare: string;
  apr: number;
  lpRate: number;
}

export interface SwapPoolInfo {
  decimals: number;
  feeShare: string;
  poolInfo: PoolInfoDTO;
}

export interface PoolInfoDTO {
  aValue: string;
  dValue: string;
  tokenBalance: string;
  vUsdBalance: string;
  totalLpAmount: string;
  accRewardPerShareP: string;
  p: number;
}


export enum MessengerKeyDTO {
  ALLBRIDGE = 'allbridge',
  WORMHOLE = 'wormhole'
}

export interface MessengerDTO {
  in: number;
  out: number;
}

export interface PoolInfoDTO {
  aValue: string;
  dValue: string;
  tokenBalance: string;
  vUsdBalance: string;
  totalLpAmount: string;
  accRewardPerShareP: string;
  p: number;
}
