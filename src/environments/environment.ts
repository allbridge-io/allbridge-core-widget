// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


import {ChainConf} from "../app/models/chains.model";

// enum ChainSymbol {
//   GRL = 'GRL',
//   SOL = 'SOL',
//   TRX = 'TRX',
// }
enum ChainSymbol {
  SOL = 'SOL',
  TRX = 'TRX',
  ETH = 'ETH',
  BSC = 'BSC',
}
// export const CHAIN_LIST: ChainConf[] = [
//   {
//     chainSymbol: ChainSymbol.GRL,
//     name: 'Goerli',
//     blockExplorerLink: 'https://goerli.etherscan.io',
//     txPath: 'tx',
//     accountPath: 'address',
//     baseCurrency: {
//       symbol: 'GoerliETH',
//       decimals: 18
//     },
//     color: 'eth-color',
//     icon: 'eth.svg'
//   },
//   {
//     chainSymbol: ChainSymbol.SOL,
//     name: 'Solana',
//     blockExplorerLink: 'https://explorer.solana.com',
//     txPath: 'tx',
//     accountPath: 'address',
//     paramsStr: 'cluster=devnet',
//     baseCurrency: {
//       symbol: 'SOL',
//       decimals: 9
//     },
//     color: 'sol-color',
//     icon: 'sol.svg'
//   },
//   {
//     chainSymbol: ChainSymbol.TRX,
//     name: 'Tron',
//     blockExplorerLink: 'https://shasta.tronscan.org/#',
//     txPath: 'transaction',
//     accountPath: 'address',
//     baseCurrency: {
//       symbol: 'TRX',
//       decimals: 6
//     },
//     color: 'trx-color',
//     icon: 'trx.svg'
//   }
// ];



export const CHAIN_LIST: ChainConf[] = [
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

// export const TOKEN_MAP: TokensMap = {
//   'BSC_0XE9E7CEA3DEDCA5984780BAFC599BD69ADD087D56':
//     {
//       name: 'BUSD Token',
//       symbol: 'BUSD',
//       tokenAddress: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
//       icon: '/assets/token-icons/BUSD.svg',
//       lpIcon: '/assets/token-icons/BUSD_LP.svg'
//     },
//   'BSC_0X55D398326F99059FF775485246999027B3197955':
//     {
//       name: 'Tether USD',
//       symbol: 'USDT',
//       tokenAddress: '0x55d398326f99059fF775485246999027B3197955',
//       icon: '/assets/token-icons/USDT.svg',
//       lpIcon: '/assets/token-icons/USDT_LP.svg'
//     },
//   'ETH_0XDAC17F958D2EE523A2206206994597C13D831EC7':
//     {
//       name: 'Tether USD',
//       symbol: 'USDT',
//       tokenAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
//       icon: '/assets/token-icons/USDT.svg',
//       lpIcon: '/assets/token-icons/USDT_LP.svg'
//     },
//   'ETH_0XA0B86991C6218B36C1D19D4A2E9EB0CE3606EB48':
//     {
//       name: 'USD Coin',
//       symbol: 'USDC',
//       tokenAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
//       icon: '/assets/token-icons/USDC.svg',
//       lpIcon: '/assets/token-icons/USDC_LP.svg'
//     },
//   'ETH_0X6B175474E89094C44DA98B954EEDEAC495271D0F':
//     {
//       name: 'Dai Stablecoin',
//       symbol: 'DAI',
//       tokenAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
//       icon: '/assets/token-icons/DAI.svg',
//       lpIcon: '/assets/token-icons/DAI_LP.svg'
//     },
//   'TRX_TR7NHQJEKQXGTCI8Q8ZY4PL8OTSZGJLJ6T':
//     {
//       name: 'Tether USD',
//       symbol: 'USDT',
//       tokenAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
//       icon: '/assets/token-icons/USDT.svg',
//       lpIcon: '/assets/token-icons/USDT_LP.svg'
//     },
//   'SOL_EPJFWDD5AUFQSSQEM2QN1XZYBAPC8G4WEGGKZWYTDT1V':
//     {
//       name: 'USD Coin',
//       symbol: 'USDC',
//       tokenAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
//       icon: '/assets/token-icons/USDC.svg',
//       lpIcon: '/assets/token-icons/USDC_LP.svg'
//     }
// };


export const environment = {
  production: false,
  CHAIN_LIST,
  // api: 'https://core-dev.a11bd.net',
  api: 'https://core.api.allbridgecoreapi.net',
  AWS_API: 'https://explorer-dev.a11bd.net'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
