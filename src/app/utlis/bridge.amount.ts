import {checkAmount, floatToInt, fromSystemPrecision, intToFloat} from "./index";
import {SwapPoolInfo, TokenDTO} from "../models/api.model";
import {SwapCalcInfo} from "../services/bridge/bridge.service";
import Big from "big.js";
import {
  swapAndBridgeCalculation,
  swapAndBridgeCalculationReverse,
  SwapFromVUsdCalcResult,
  SwapToVUsdCalcResult
} from "./calculations";

export class BridgeAmounts {
  private _oldValue: BridgeAmountValue = {
    amount: '',
    amountReceived: '',
    swapCalcInfo: undefined,
    sourceTokenAddress: undefined,
    destinationTokenAddress: undefined,
    sourcePoolInfo: undefined,
    destinationPoolInfo: undefined,
  };

  constructor() {
  }

  updateValue(amount: string | null | undefined, amountReceived: string | null | undefined, sourceToken: TokenDTO, destinationToken: TokenDTO): BridgeAmountValue {
    let calcData: BridgeAmountValue;

    const amountInInt = amount && floatToInt(amount, sourceToken.decimals);
    const oldAmountInInt = this._oldValue.amount && floatToInt(this._oldValue.amount, sourceToken.decimals);

    const amountReceivedInInt = amountReceived && floatToInt(amountReceived, destinationToken.decimals);
    const oldAmountReceivedInInt = this._oldValue.amountReceived && floatToInt(this._oldValue.amountReceived, destinationToken.decimals);

    const sourcePoolInfo = JSON.stringify(sourceToken.poolInfo);
    const destinationPoolInfo = JSON.stringify(destinationToken.poolInfo);

    if (
      this._oldValue.sourceTokenAddress === sourceToken.tokenAddress &&
      this._oldValue.destinationTokenAddress === destinationToken.tokenAddress &&
      amountInInt === oldAmountInInt &&
      amountReceivedInInt === oldAmountReceivedInInt &&
      sourcePoolInfo === this._oldValue.sourcePoolInfo &&
      destinationPoolInfo === this._oldValue.destinationPoolInfo
    ) {
      this._oldValue.amount = amount;
      this._oldValue.amountReceived = amountReceived;
      this._oldValue.sourcePoolInfo = sourcePoolInfo;
      this._oldValue.destinationPoolInfo = destinationPoolInfo;
      return this._oldValue;
    }

    if (amountReceived !== this._oldValue.amountReceived) {
      calcData = this._recalculationAmount(amountReceived, true, sourceToken, destinationToken);
    } else {
      calcData = this._recalculationAmount(amount, false, sourceToken, destinationToken);
    }
    this._oldValue = {
      amount: calcData.amount,
      amountReceived: calcData.amountReceived,
      swapCalcInfo: calcData.swapCalcInfo,
      sourceTokenAddress: sourceToken.tokenAddress,
      destinationTokenAddress: destinationToken.tokenAddress,
      sourcePoolInfo,
      destinationPoolInfo
    };
    return calcData;
  }

  private _recalculationAmount(amount: string | null | undefined, reversedCalculation: boolean, sourceToken: TokenDTO | undefined, destinationToken: TokenDTO | undefined): BridgeAmountValue {
    try {
      amount = checkAmount(amount);
    } catch (e) {
      return {
        amount: '',
        amountReceived: '',
        swapCalcInfo: undefined
      };
    }
    if (!amount || !sourceToken || !destinationToken) {
      return {
        amount: '',
        amountReceived: '',
        swapCalcInfo: undefined
      };
    }
    const source: SwapPoolInfo = {
      feeShare: sourceToken.feeShare,
      decimals: sourceToken.decimals,
      poolInfo: sourceToken.poolInfo
    };
    const destination: SwapPoolInfo = {
      feeShare: destinationToken.feeShare,
      decimals: destinationToken.decimals,
      poolInfo: destinationToken.poolInfo
    };
    const amountInInt = floatToInt(amount, !reversedCalculation ? sourceToken.decimals : destinationToken.decimals);
    const {
      swapToVUsdCalcResult,
      swapFromVUsdCalcResult
    } = !reversedCalculation ? swapAndBridgeCalculation(amountInInt, source, destination) : swapAndBridgeCalculationReverse(amountInInt, source, destination);
    const swapCalcInfo: SwapCalcInfo = this._getSwapCalcInfo(amountInInt, swapToVUsdCalcResult, swapFromVUsdCalcResult, sourceToken.decimals, destinationToken.decimals, reversedCalculation);

    const newAmount = swapFromVUsdCalcResult.amountIncludingCommissionInTokenPrecision;
    if (Big(newAmount).lte(0)) {
      throw new Error('Insufficient pool liquidity');
    }
    const decimals = !reversedCalculation ? destinationToken.decimals : sourceToken.decimals;
    const int = intToFloat(newAmount, decimals);
    const intWithPercent = intToFloat(Big(newAmount).div(100).times(100.01).round().toFixed(), decimals);
    const finalNewAmount = !reversedCalculation ? int : intWithPercent;
    return {
      swapCalcInfo,
      amount: !reversedCalculation ? amount : finalNewAmount,
      amountReceived: reversedCalculation ? amount : finalNewAmount
    };
  }

  private _getSwapCalcInfo(amountInTokenPrecision: string,
                           swapToVUsdCalcResult: SwapToVUsdCalcResult,
                           swapFromVUsdCalcResult: SwapFromVUsdCalcResult,
                           sourceTokenDecimals: number,
                           destinationTokenDecimals: number,
                           reversedCalculation: boolean): SwapCalcInfo {
    let sourceLiquidityFee = '';
    if (!reversedCalculation) {
      sourceLiquidityFee = intToFloat(swapToVUsdCalcResult.bridgeFeeInTokenPrecision, sourceTokenDecimals);
    } else {
      sourceLiquidityFee = intToFloat(swapFromVUsdCalcResult.bridgeFeeInTokenPrecision, sourceTokenDecimals);
    }

    let destinationLiquidityFee = '';
    if (!reversedCalculation) {
      destinationLiquidityFee = intToFloat(swapFromVUsdCalcResult.bridgeFeeInTokenPrecision, destinationTokenDecimals);
    } else {
      destinationLiquidityFee = intToFloat(swapToVUsdCalcResult.bridgeFeeInTokenPrecision, destinationTokenDecimals);
    }

    let sourceSwap = '';
    if (!reversedCalculation) {
      const newAmountInTokenPrecision = fromSystemPrecision(swapToVUsdCalcResult.amountExcludingCommissionInSystemPrecision, sourceTokenDecimals);
      sourceSwap = intToFloat(Big(amountInTokenPrecision).minus(newAmountInTokenPrecision).toFixed(), sourceTokenDecimals);
    } else {
      const vUsdInTokenPrecision = fromSystemPrecision(swapToVUsdCalcResult.amountIncludingCommissionInSystemPrecision, sourceTokenDecimals);
      sourceSwap = intToFloat(Big(swapFromVUsdCalcResult.amountExcludingCommissionInTokenPrecision).minus(vUsdInTokenPrecision).toFixed(), sourceTokenDecimals);
    }

    let destinationSwap = '';
    if (!reversedCalculation) {
      const vUsdInTokenPrecision = fromSystemPrecision(swapToVUsdCalcResult.amountIncludingCommissionInSystemPrecision, destinationTokenDecimals);
      destinationSwap = intToFloat(Big(vUsdInTokenPrecision).minus(swapFromVUsdCalcResult.amountExcludingCommissionInTokenPrecision).toFixed(), destinationTokenDecimals);
    } else {
      const vUsdInTokenPrecision = fromSystemPrecision(swapToVUsdCalcResult.amountExcludingCommissionInSystemPrecision, destinationTokenDecimals);
      destinationSwap = intToFloat(Big(vUsdInTokenPrecision).minus(amountInTokenPrecision).toFixed(), destinationTokenDecimals);
    }
    return {
      sourceLiquidityFee,
      destinationLiquidityFee,
      sourceSwap,
      destinationSwap
    };
  }
}

export interface BridgeAmountValue {
  amount: string | null | undefined;
  amountReceived: string | null | undefined;
  swapCalcInfo?: SwapCalcInfo;
  sourceTokenAddress?: string;
  destinationTokenAddress?: string;
  sourcePoolInfo?: string;
  destinationPoolInfo?: string;
}

