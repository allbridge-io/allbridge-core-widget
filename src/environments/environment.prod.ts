import {ChainConf} from '../app/models/chains.model';

enum ChainSymbol {
  SOL = 'SOL',
  TRX = 'TRX',
  ETH = 'ETH',
  BSC = 'BSC',
}

const CHAIN_LIST: ChainConf[] = [
  {
    chainSymbol: ChainSymbol.BSC,
    name: 'BNB Chain',
    blockExplorerLink: 'https://bscscan.com',
    txPath: 'tx',
    accountPath: 'address',
    baseCurrency: {
      symbol: 'BNB',
      decimals: 18
    },
    color: 'bsc-color',
    icon: 'bsc.svg'
  },
  {
    chainSymbol: ChainSymbol.ETH,
    name: 'Ethereum',
    blockExplorerLink: 'https://etherscan.io',
    txPath: 'tx',
    accountPath: 'address',
    baseCurrency: {
      symbol: 'ETH',
      decimals: 18
    },
    color: 'eth-color',
    icon: 'eth.svg'
  },
  {
    chainSymbol: ChainSymbol.TRX,
    name: 'Tron',
    blockExplorerLink: 'https://tronscan.io/#',
    txPath: 'transaction',
    accountPath: 'address',
    baseCurrency: {
      symbol: 'TRX',
      decimals: 6
    },
    color: 'trx-color',
    icon: 'trx.svg'
  },
  {
    chainSymbol: ChainSymbol.SOL,
    name: 'Solana',
    blockExplorerLink: 'https://explorer.solana.com',
    txPath: 'tx',
    accountPath: 'address',
    baseCurrency: {
      symbol: 'SOL',
      decimals: 9
    },
    color: 'sol-color',
    icon: 'sol.svg'
  }
];

export const environment = {
  production: true,
  CHAIN_LIST,
  api: 'https://core.api.allbridgecoreapi.net',
  AWS_API: 'https://explorer-dev.a11bd.net'
};
