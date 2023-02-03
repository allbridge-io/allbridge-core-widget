import {Component, Input} from '@angular/core';
import {ChainsService} from "../../services/chains/chains.service";
import {AssetInfo, ChainInfo, ChainSelectorData, ChainSymbol, SelectedToken} from "../../models/chains.model";
import {DirectionType, TokenDetails} from "../../models";
import {Chain} from "../../services/chains/constants";


@Component({
  selector: 'app-chains-dialog',
  templateUrl: './chains-dialog.component.html',
  styleUrls: ['./chains-dialog.component.sass'],
})
export class ChainsDialogComponent {
  @Input() chainList?:ChainSelectorData;
  @Input() typeDirection:DirectionType = 'source';
  constructor(public chainsService: ChainsService) {}


  get sortedChainList(): AssetInfo[] | undefined {
    if(!this.chainList){
      return;
    }
    return this.chainList.list.sort((a, b) => {
      const nameA = this.getChain(a.chainSymbol)?.chainSymbol || '';
      const nameB = this.getChain(b.chainSymbol)?.chainSymbol || '';
      if (nameA > nameB) {
        return 1;
      }
      if (nameA < nameB) {
        return -1;
      }
      return 0;
    });

  }

  getSortedTokenList(tokens: SelectedToken[]): SelectedToken[] {
    return tokens.sort((a, b) => {
      const nameA = this.getToken(a.key)?.name || '';
      const nameB = this.getToken(b.key)?.name || '';
      if (nameA > nameB) {
        return 1;
      }
      if (nameA < nameB) {
        return -1;
      }
      return 0;
    });
  }

  getToken(tokenKey: string): TokenDetails | undefined {
    return this.chainsService.localTokenMap[tokenKey];
  }

  getChainInfo(chainSymbol: ChainSymbol): ChainInfo | undefined {
    return this.chainsService.chainMap.get(chainSymbol);
  }

  getChain(chainSymbol: ChainSymbol): Chain | undefined {
    return this.chainsService.localChainMap.get(chainSymbol);
  }

  selectToken(bid: ChainSymbol, tokenKey: string): void {
    this.chainsService.selectChain(this.typeDirection, bid, tokenKey);
  }
}
