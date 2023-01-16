import {Component, Input} from '@angular/core';
import {ChainsService} from "../../services/chains/chains.service";
import {ChainInfo, ChainSelectorData, ChainSymbol} from "../../models/chains.model";
import {DirectionType} from "../../models";


@Component({
  selector: 'app-chains-dialog',
  templateUrl: './chains-dialog.component.html',
  styleUrls: ['./chains-dialog.component.sass'],
})
export class ChainsDialogComponent {
  @Input() chainList?:ChainSelectorData;
  @Input() typeDirection:DirectionType = 'source';
  constructor(public chainsService: ChainsService) {}

  getChain(chainSymbol: ChainSymbol): ChainInfo | undefined {
    return this.chainsService.chainMap.get(chainSymbol);
  }

  selectToken(bid: ChainSymbol, tokenKey: string): void {
    this.chainsService.selectChain(this.typeDirection, bid, tokenKey);
  }
}
