import {BaseCurrency, ChainConf, ChainSymbol} from "../../models/chains.model";

export class Chain {
  chainSymbol: ChainSymbol;
  name: string;
  colorKey: string;
  icon: string;
  baseCurrency: BaseCurrency;

  constructor(chainConf: ChainConf) {
    this.chainSymbol = chainConf.chainSymbol;
    this.name = chainConf.name;
    this.colorKey = chainConf.color;
    this.icon = chainConf.icon;
    this.baseCurrency = chainConf.baseCurrency;
  }
}
