import {Injectable} from "@angular/core";
import {
  AssetInfo,
  ChainInfo,
  ChainSelectorData,
  ChainState,
  ChainSymbol
} from "../../models/chains.model";
import {ApiService} from "../api/api.service";
import {ChainDetailsMapDTO, TokenDTO} from "../../models/api.model";
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {CHAIN_MAP} from "../../constants";
import {MatDialog} from '@angular/material/dialog';
import {DirectionType, URLParams} from "../../models";
import {BehaviorSubject} from "rxjs";
import {ActivatedRoute} from "@angular/router";

const DEFAULT_ICON = '/assets/icons/default.svg';

@Injectable({
  providedIn: 'root'
})
export class ChainsService {
  chainMap: Map<ChainSymbol, ChainInfo> = new Map();
  tokenMap: Map<string, TokenDTO> = new Map();
  chainStateForm = this._fb.group({
    tokenFromKey: [null, Validators.required],
    tokenToKey: [null, Validators.required],
    sourceBlockchainId: [null, Validators.required],
    destinationBlockchainId: [null, Validators.required]
  }, {
    validators: [this.doChainAndTokenMatch]
  });
  supportedTokens = ['USDC', 'USDT', 'BUSD', 'DAI'];

  // MY
  showChainList$ = new BehaviorSubject<boolean>(false);
  typeDirection: DirectionType = 'source';
  chainList?: ChainSelectorData;

  constructor(
    private _api: ApiService,
    private _fb: FormBuilder,
    private _dialog: MatDialog,
    private _route: ActivatedRoute) {
  }

  get chainStateFormValue(): ChainState | undefined {
    return this.chainStateForm?.value;
  }

  async updateChainsAndTokens(): Promise<void> {
    const data: ChainDetailsMapDTO = await this._api.getChainList();
    Object.keys(data).forEach((chainSymbol) => {
      const chainDetail = data[chainSymbol];
      const chain = CHAIN_MAP.get(chainSymbol as ChainSymbol);
      if (!chain) {
        return;
      }
      const chainInfo: ChainInfo = {
        ...chainDetail,
        chain,
        tokenKeys: []
      };
      chainDetail.tokens.forEach(token => {
        const key = this.getTokenKey(chainSymbol, token.tokenAddress.toLowerCase());
        this.tokenMap.set(key, token);
        chainInfo.tokenKeys.push(key);
      });
      this.chainMap.set((chainSymbol as ChainSymbol), chainInfo);
    });

    // if (!this.isLoaded$.value) {
    //   this.preSelect();
    //   this.isLoaded$.next(true);
    // }
  }

  getTokenKey(chainSymbol: string, tokenAddress: string): string {
    return chainSymbol + '_' + tokenAddress.toUpperCase();
  }

  doChainAndTokenMatch(form: FormGroup): ValidationErrors | null {
    const {destinationBlockchainId, sourceBlockchainId, tokenToKey, tokenFromKey} = form.value;
    if (!tokenToKey || !tokenFromKey || !sourceBlockchainId || !destinationBlockchainId) {
      return {error: 'Form is empty'};
    }
    if (tokenToKey === tokenFromKey) {
      return {error: "Please select different tokens"};
    }
    return null;
  }

  openChainListDialog(type: DirectionType): void {
    const chains: ChainSelectorData = this.getDialogData(type);
    this.typeDirection = type;
    this.chainList = chains;
    this.showChainList$.next(true);
  };

  selectChain(type: DirectionType, bId:ChainSymbol, tokenKey: string): void {
    this.showChainList$.next(false);
    if (!!bId && !!tokenKey && !!type) {
      if (type === 'source') {
        bId === this.chainStateFormValue?.destinationBlockchainId && tokenKey === this.chainStateFormValue.tokenToKey ?
          this.reverseState() : this.chainStateForm.patchValue({sourceBlockchainId: bId, tokenFromKey: tokenKey});
      } else {
        bId === this.chainStateFormValue?.sourceBlockchainId && tokenKey === this.chainStateFormValue.tokenFromKey ?
          this.reverseState() : this.chainStateForm.patchValue({
            destinationBlockchainId: bId,
            tokenToKey: tokenKey
          });
      }
      this.chainStateForm.markAsTouched();
    }
  }

  reverseState(): void {
    if (!this.chainStateFormValue) {
      return;
    }
    const {tokenFromKey, tokenToKey, sourceBlockchainId, destinationBlockchainId} = this.chainStateFormValue;
    this.chainStateForm.patchValue({
      tokenFromKey: tokenToKey,
      tokenToKey: tokenFromKey,
      sourceBlockchainId: destinationBlockchainId,
      destinationBlockchainId: sourceBlockchainId
    });
    this.chainStateForm.updateValueAndValidity();
  }

  getDialogData(type: DirectionType): ChainSelectorData {
    const chainsArray: ChainInfo[] = Array.from(this.chainMap.values());
    const selectedToken = type === 'source' ? this.chainStateFormValue?.tokenFromKey : this.chainStateFormValue?.tokenToKey;
    const assetInfoList: AssetInfo[] = [];
    if (chainsArray) {
      chainsArray.forEach((item => {
        const assetInfo: AssetInfo = {
          chainSymbol: item.chain.chainSymbol,
          tokens: []
        };
        item.tokenKeys.forEach(key => {
          assetInfo.tokens.push({
            key: key,
            isSelected: key === selectedToken
          });
        });
        assetInfoList.push(assetInfo);
      }));
    }
    return {
      title: type === 'source' ? 'Swap from' : 'Swap to',
      list: assetInfoList
    };
  }

  getTokenIcon(key: string | undefined, lp = false): string {
    if (!key) {
      return '';
    }
    const token = this.tokenMap.get(key);
    if (!token) {
      return DEFAULT_ICON;
    }
    if (this.supportedTokens.find(tokenSymbol => tokenSymbol === token.symbol)) {
      const suffix = lp ? '_LP' : '';
      return `/assets/token-icons/${token.symbol}${suffix}.svg`;
    } else {
      return lp ? '/assets/icons/default_LP.svg' : DEFAULT_ICON;
    }
  }

  getChainIcon(bId: ChainSymbol | undefined): string {
    if (!bId) {
      return '';
    }
    const chain = this.chainMap.get(bId);
    if (!chain) {
      return DEFAULT_ICON;
    }
    return '/assets/chain-icons/' + chain.chain.icon;
  }

  getSelectedToken(direction: DirectionType): TokenDTO | undefined {
    const key = this.chainStateFormValue?.[direction === 'source' ? 'tokenFromKey' : 'tokenToKey'];
    if (!key) {
      return;
    }
    return this.tokenMap.get(key);
  }

  getTokenBySymbolForChain(chainSymbol: ChainSymbol, symbol?: string): TokenDTO | undefined {
    let token: TokenDTO | undefined;
    for (let elem of this.tokenMap) {
      const [bId] = elem[0].split('_');
      const t = elem[1];
      if (bId === chainSymbol && t.symbol === symbol) {
        token = t;
      }
    }
    return token;
  }

  initChainsFromRouting(): void {
    const queryParams: URLParams = this._route.snapshot.queryParams;
    if(!queryParams){
      return;
    }
      const sourceChain = this.getTokenBySymbolForChain(queryParams.f as ChainSymbol, queryParams.ft);
      const destinationChain = this.getTokenBySymbolForChain(queryParams.t as ChainSymbol, queryParams.tt);

      if(!sourceChain){
        return;
      }
      const fromTokenKey = this.getTokenKey(queryParams.f as ChainSymbol, sourceChain.tokenAddress);
      if(!destinationChain){
        return;
      }
      const toTokenKey = this.getTokenKey(queryParams.t as ChainSymbol, destinationChain.tokenAddress);

      if(!fromTokenKey){
        return;
      }

      this.selectChain('source', queryParams.f as ChainSymbol, fromTokenKey);
      if(!toTokenKey){
        return;
      }
      this.selectChain('destination', queryParams.t as ChainSymbol, toTokenKey);
    }
}
