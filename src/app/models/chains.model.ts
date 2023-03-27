import {ChainDetailsDTO} from "./api.model";
import {Chain} from "../services/chains/constants";


export interface ChainState {
  sourceBlockchainId?: ChainSymbol;
  destinationBlockchainId?: ChainSymbol;
  tokenFromKey?: string;
  tokenToKey?: string;
}

export interface ChainInfo extends ChainDetailsDTO {
  chain: Chain;
  chainId: number;
  bridgeAddress: string;
  tokenKeys: string[];
}

export enum ChainSymbol {
  GRL = 'GRL',
  SOL = 'SOL',
  TRX = 'TRX',
  POL = 'POL',
  ETH = 'ETH',
  HECO = 'HECO',
  BSC = 'BSC',
  AVA = 'AVA',
  CELO = 'CELO',
  FTM = 'FTM',
  AURO = 'AURO',
  HRM = 'HRM',
  FUSE = 'FUSE',
  ARB = 'ARB',
}

export interface ChainConf {
  chainSymbol: ChainSymbol;
  name: string;
  baseCurrency: BaseCurrency;
  blockExplorerLink: string;
  txPath: string;
  accountPath: string;
  paramsStr?: string;
  color: string;
  icon: string;
}

export interface BaseCurrency {
  symbol: string;
  decimals: number;
}

export interface AssetInfo {
  chainSymbol: ChainSymbol;
  tokens: SelectedToken[];
}

export interface SelectedToken {
  key: string;
  isSelected?: boolean;
}

export interface ChainSelectorData {
  title: string;
  list: AssetInfo[];
}

