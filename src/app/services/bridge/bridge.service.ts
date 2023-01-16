import {EventEmitter, Injectable} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {checkAmount, validateAmount} from "../../utlis";
import {ChainsService} from "../chains/chains.service";
import {TokenDTO} from "../../models/api.model";
import {URLParams} from "../../models";
import {BridgeAmounts} from "../../utlis/bridge.amount";
import {combineLatest, startWith} from "rxjs";
export interface SwapCalcInfo {
  sourceLiquidityFee: string;
  sourceSwap: string;
  destinationLiquidityFee: string;
  destinationSwap: string;
}
@Injectable({
  providedIn: 'root'
})
export class BridgeService {
  bridgeAmounts = new BridgeAmounts();
  recalculated$ = new EventEmitter<void>();
  form = this._fb.group({
    amount: ['', [validateAmount(this._getAsset.bind(this))]],
    amountReceived: [''],
    destinationAddress: ['']
  });

  constructor(
    private _fb: FormBuilder,
    private _chainsService: ChainsService,
    ) {

    combineLatest([
      this._chainsService.chainStateForm.controls['tokenFromKey'].valueChanges.pipe(startWith(null)),
      this._chainsService.chainStateForm.controls['tokenToKey'].valueChanges.pipe(startWith(null)),
      this.recalculated$.pipe(startWith(true))
    ])
      .subscribe(([tokenFromKey, tokenToKey]) => {
        const sourceToken = this._chainsService.tokenMap.get(tokenFromKey);
        const destinationToken = this._chainsService.tokenMap.get(tokenToKey);
        const {amount, amountReceived} = this.form.value;
        this._recalculation(amount, amountReceived, sourceToken, destinationToken);
      });

    this.form.valueChanges
      .subscribe(value => {
        const {amount, amountReceived} = value;
        const sourceToken = this._chainsService.getSelectedToken('source');
        const destinationToken = this._chainsService.getSelectedToken('destination');
        this._recalculation(amount, amountReceived, sourceToken, destinationToken);
      });
  }


  private _recalculation(amount: string | null | undefined, amountReceived: string | null | undefined, sourceToken: TokenDTO | undefined, destinationToken: TokenDTO | undefined): void {
    // this._errorMap.delete(Errors.INSUFFICIENT_POOL_LIQUIDITY_ERROR);
    // this._errorMap.delete(Errors.CALCULATION_ERROR);
    this.form.controls.amount.markAsDirty();
    this.form.controls.amountReceived.markAsDirty();
    try {
      amount && checkAmount(amount);
      amountReceived && checkAmount(amountReceived);
    } catch (e) {
      return;
    }
    if (!sourceToken || !destinationToken) {
      this.form.patchValue({...this.form.value, amount, amountReceived}, {emitEvent: false});
      return;
    }
    try {
      const newData = this.bridgeAmounts.updateValue(amount, amountReceived, sourceToken, destinationToken);
      this.form.patchValue({
        ...this.form.value,
        amount: newData.amount,
        amountReceived: newData.amountReceived
      }, {emitEvent: false});
    } catch (e) {
      if (e instanceof Error && e.message === 'Insufficient pool liquidity') {
        // this._errorMap.set(Errors.INSUFFICIENT_POOL_LIQUIDITY_ERROR, 'Insufficient pool liquidity');
        this.form.patchValue({...this.form.value, amount, amountReceived}, {emitEvent: false});
      } else {
        // this._errorMap.set(Errors.CALCULATION_ERROR, 'Calculation error');
        this.form.patchValue({...this.form.value, amount: '', amountReceived: ''}, {emitEvent: false});
      }
    }
  }


  private _getAsset(): TokenDTO | undefined {
    return this._chainsService.getSelectedToken('source');
  }

  redirectToAllbridgeCore(): void {
    const amount = this.form.controls['amount'].value;
    const amountReceived = this.form.controls['amountReceived'].value;

    const tokenFromKey = this._chainsService.chainStateForm.controls['tokenFromKey'].value;
    const sourceBlockchainId = this._chainsService.chainStateForm.controls['sourceBlockchainId'].value;

    const tokenToKey = this._chainsService.chainStateForm.controls['tokenToKey'].value;
    const destinationBlockchainId = this._chainsService.chainStateForm.controls['destinationBlockchainId'].value;

      const queryParams: URLParams = {
        f: sourceBlockchainId,
        ft:this._chainsService.tokenMap.get(tokenFromKey)?.symbol,
        t: destinationBlockchainId,
        tt: this._chainsService.tokenMap.get(tokenToKey)?.symbol
      };
      const url = this.createUrlWithQueryParams(queryParams, amount, amountReceived);

    window.open(url, '_blank');
  }

  createUrlWithQueryParams(queryParams: URLParams, amount: string | null, amountReceived: string | null): string {
    const {f, ft, t , tt} = queryParams;
    let url = 'http://stage-stable-bridge-ui.web.app/?';
    if(f){
      url = url + 'f=' + f + '&';
    }
    if(ft){
      url = url + 'ft=' + ft + '&';
    }
    if(t){
      url = url + 't=' + t + '&';
    }
    if(tt){
      url = url + 'tt=' + tt + '&';
    }
    if(amount){
      url = url + 'send=' + amount + '&';
    }
    // if(amountReceived){
    //   url = url + 'receive=' + amountReceived + '&';
    // }
    return url;
  }
}
