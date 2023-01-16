import {Component, Input} from '@angular/core';
import {TokenDTO} from "../../models/api.model";
import {ChainsService} from "../../services/chains/chains.service";

@Component({
  selector: 'app-token-data',
  templateUrl: './token-data.component.html',
  styleUrls: ['./token-data.component.sass']
})
export class TokenDataComponent {

  @Input() tokenKey = '';

  constructor(public chainsService: ChainsService) {
  }

  get token(): TokenDTO | undefined {
    return this.chainsService.tokenMap.get(this.tokenKey);
  }

  // get link(): string {
  //   if (!this.tokenKey) {
  //     return '';
  //   }
  //   const [chainSymbol] = this.tokenKey.split('_');
  //   return this.chainsService.chainMap.get(chainSymbol as ChainSymbol)?.chain?.blockExplorer?.getAccountLink(this.token?.tokenAddress || '') || '';
  // }

}
