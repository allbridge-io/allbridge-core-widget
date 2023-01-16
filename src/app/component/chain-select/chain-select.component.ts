import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ChainInfo, ChainSymbol} from "../../models/chains.model";
import {DirectionType} from "../../models";
import {ChainsService} from "../../services/chains/chains.service";
import {TokenDTO} from "../../models/api.model";

@Component({
  selector: 'app-chain-select',
  templateUrl: './chain-select.component.html',
  styleUrls: ['./chain-select.component.sass']
})
export class ChainSelectComponent {
  @Input() chainSymbol?: ChainSymbol = undefined;
  @Input() tokenKey?: string = undefined;
  @Input() direction: DirectionType = 'source';
  @Output() openChainListDialog = new EventEmitter<MouseEvent>();
  constructor(public chainsService: ChainsService) {
  }

  getChain(chainSymbol?: ChainSymbol): ChainInfo | undefined {
    if (!chainSymbol) {
      return undefined;
    }
    return this.chainsService.chainMap.get(chainSymbol);
  }

  getToken(tokenKey: string): TokenDTO | undefined {
    return this.chainsService.tokenMap.get(tokenKey);
  }
}
