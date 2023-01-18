import {Component} from '@angular/core';
import {ChainsService} from "./services/chains/chains.service";
import {BridgeService} from "./services/bridge/bridge.service";
import {ActivatedRoute} from "@angular/router";
import {ThemeService} from "./services/theme/theme.service";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [
    trigger('cardAnimation', [

      transition(':enter', [
        style({ opacity: 0, visibility: 'hidden' }),
        animate("400ms ease-out" , style({opacity: 1, visibility: 'visible'}))
      ]),
      transition(':leave', [
        style({opacity: 1, visibility: 'visible' }),
        animate("400ms ease-out", style({opacity: 0, visibility: 'hidden' }))
      ])
    ]),
  ]
})
export class AppComponent {
  showChainList = true;

  constructor(
    public chainsService: ChainsService,
    public bridgeService: BridgeService,
    private _themeService: ThemeService,
    private _route: ActivatedRoute) {
    this.loadChains();
    this.chainsService.showChainList$.subscribe((res)=>{
      this.showChainList = !res;
    });
  }

  async loadChains(): Promise<void> {
    this._themeService.initTheme();
    await this.chainsService.updateChainsAndTokens();
    this.chainsService.initChainsFromRouting();
  }

  get disabledToggle(): boolean {
    const value = this.chainsService.chainStateFormValue;
    if (!value) {
      return true;
    }
    const {tokenFromKey, tokenToKey, sourceBlockchainId, destinationBlockchainId} = value;
    return !tokenFromKey || !tokenToKey || !sourceBlockchainId || !destinationBlockchainId;
  }
}
