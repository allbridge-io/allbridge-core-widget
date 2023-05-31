// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


import {ChainConf} from "../app/models/chains.model";
import {TokensMap} from "../app/models";

enum ChainSymbol {
  GRL = 'GRL',
  SOL = 'SOL',
  TRX = 'TRX',
  SPL = 'SPL',
  MUM = 'MUM',
}

const CHAIN_LIST: ChainConf[] = [
  {
    chainSymbol: ChainSymbol.GRL,
    name: 'Goerli',
    blockExplorerLink: 'https://goerli.etherscan.io',
    txPath: 'tx',
    accountPath: 'address',
    baseCurrency: {
      symbol: 'GoerliETH',
      decimals: 18
    },
    color: 'eth-color',
    icon: 'eth.svg'
  },
  {
    chainSymbol: ChainSymbol.MUM,
    name: 'Mumbai',
    blockExplorerLink: 'https://mumbai.polygonscan.com',
    txPath: 'tx',
    accountPath: 'address',
    baseCurrency: {
      symbol: 'MATIC',
      decimals: 18
    },
    color: 'pol-color',
    icon: 'pol.svg'
  },
  {
    chainSymbol: ChainSymbol.SPL,
    name: 'Sepolia',
    blockExplorerLink: 'https://sepolia.etherscan.io',
    txPath: 'tx',
    accountPath: 'address',
    baseCurrency: {
      symbol: 'SepoliaETH',
      decimals: 18
    },
    color: 'eth-color',
    icon: 'eth.svg'
  },
  {
    chainSymbol: ChainSymbol.SOL,
    name: 'Solana',
    blockExplorerLink: 'https://explorer.solana.com',
    txPath: 'tx',
    accountPath: 'address',
    paramsStr: 'cluster=devnet',
    baseCurrency: {
      symbol: 'SOL',
      decimals: 9
    },
    color: 'sol-color',
    icon: 'sol.svg'
  },
  {
    chainSymbol: ChainSymbol.TRX,
    name: 'Tron',
    blockExplorerLink: 'https://nile.tronscan.org/#',
    txPath: 'transaction',
    accountPath: 'address',
    baseCurrency: {
      symbol: 'TRX',
      decimals: 6
    },
    color: 'trx-color',
    icon: 'trx.svg'
  }
];

export const TOKEN_MAP: TokensMap = {
  'GRL_0XDDAC3CB57DEA3FBEFF4997D78215535EB5787117':
    {
      name: 'Yaroslav Stable Token',
      symbol: 'YUSD',
      tokenAddress: '0xDdaC3cb57DEa3fBEFF4997d78215535Eb5787117',
      icon: '/assets/icons/default.svg',
      lpIcon: '/assets/icons/default.svg',
      decimals: 18
    },
  'GRL_0XC7DBC4A896B34B7A10DDA2EF72052145A9122F43':
    {
      name: 'YARO Stable',
      symbol: 'YARO',
      tokenAddress: '0xC7DBC4A896b34B7a10ddA2ef72052145A9122F43',
      icon: '/assets/icons/default.svg',
      lpIcon: '/assets/icons/default.svg',
      decimals: 18
    },
  'SPL_0X49BE77224DC061BD53699B25431B9AA7029A2CB8':
    {
      name: 'USDY',
      symbol: 'USDY',
      tokenAddress: '0x49be77224DC061BD53699B25431B9Aa7029A2cB8',
      icon: '/assets/icons/default.svg',
      lpIcon: '/assets/icons/default.svg',
      decimals: 6
    },
  'SPL_0X0209DA4A278956CA15438AF8B108BD85642F096C':
    {
      name: 'YARO',
      symbol: 'YARO',
      tokenAddress: '0x0209dA4a278956Ca15438af8B108bd85642F096c',
      icon: '/assets/icons/default.svg',
      lpIcon: '/assets/icons/default.svg',
      decimals: 18
    },
  'MUM_0X3DBE838B635C54502C318F752187A8D8E7C73743':
    {
      name: 'YARO',
      symbol: 'YARO',
      tokenAddress: '0x3DBe838b635C54502C318f752187A8d8E7C73743',
      icon: '/assets/icons/default.svg',
      lpIcon: '/assets/icons/default.svg',
      decimals: 18
    },
  'MUM_0XD18967827F4CC29193A7DBE2AA5AD440F6B27597':
    {
      name: 'USDY',
      symbol: 'USDY',
      tokenAddress: '0xd18967827F4cC29193A7dbe2AA5aD440F6b27597',
      icon: '/assets/icons/default.svg',
      lpIcon: '/assets/icons/default.svg',
      decimals: 6
    },
  'TRX_TEYM56HK4554U8GE4VNLZCE59PV7GQY1TV':
    {
      name: 'YARO',
      symbol: 'YARO',
      tokenAddress: 'TEYM56Hk4554u8ge4vNLZcE59pv7GQy1tv',
      icon: '/assets/icons/default.svg',
      lpIcon: '/assets/icons/default.svg',
      decimals: 6
    },
  'TRX_TEWNUEQ4D2OZRTG9X7ZDZGQJHMPYZPATLP':
    {
      name: 'Yaroslav Stable Token',
      symbol: 'USDY',
      tokenAddress: 'TEwnUeq4d2oZRtg9x7ZdZgqJhMpYzpAtLp',
      icon: '/assets/icons/default.svg',
      lpIcon: '/assets/icons/default.svg',
      decimals: 18
    },
  'SOL_F4YHOD6Y7JZVWFFY3IHDG49GAERFTRTP1AC1UBDWX7L':
    {
      name: 'Yaroslav token',
      symbol: 'YARO',
      tokenAddress: 'f4yhod6Y7jzVwFfy3iHDg49GAerFTrtp1Ac1ubdWx7L',
      icon: '/assets/icons/default.svg',
      lpIcon: '/assets/icons/default.svg',
      decimals: 9
    },
  'SOL_FPGHQNPWDCTCAJYU24M9E2YDTE5OWPQGD7UDARKEJHD4':
    {
      name: 'Yaroslav stable',
      symbol: 'USDY',
      tokenAddress: 'FpGHqNpwDctcaJyu24M9E2ydTe5owPQgD7UdarKEJHd4',
      icon: '/assets/icons/default.svg',
      lpIcon: '/assets/icons/default.svg',
      decimals: 9
    },
};

export const environment = {
  production: false,
  CHAIN_LIST,
  api: 'https://core-dev.a11bd.net',
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
