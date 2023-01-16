import Big from 'big.js';
import {fromSystemPrecision, toSystemPrecision} from "./index";
import {PoolInfoDTO} from "../models/api.model";

export interface SwapToVUsdCalcResult {
  // фи в пресижине токена от передаваемого значения
  bridgeFeeInTokenPrecision: string;
  // результат с учётом вычета комиссии
  amountIncludingCommissionInSystemPrecision: string;
  // результат без учёта комиссии
  amountExcludingCommissionInSystemPrecision: string;
}

export function swapToVUsd(amountInTokenPrecision: string, decimals: number, feeShare: string, poolInfo: Omit<PoolInfoDTO, 'p'>): SwapToVUsdCalcResult {
  const fee = Big(amountInTokenPrecision).times(feeShare);
  const amountWithoutFee = Big(amountInTokenPrecision).minus(fee);

  return {
    bridgeFeeInTokenPrecision: fee.round().toFixed(),
    amountIncludingCommissionInSystemPrecision: calcSwapToVUsd(toSystemPrecision(amountWithoutFee.toFixed(), decimals), poolInfo),
    amountExcludingCommissionInSystemPrecision: calcSwapToVUsd(toSystemPrecision(amountInTokenPrecision, decimals), poolInfo)
  };
}

function calcSwapToVUsd(amountInSystemPrecision: string, poolInfo: Omit<PoolInfoDTO, 'p'>): string {
  const tokenBalance = Big(poolInfo.tokenBalance).plus(amountInSystemPrecision);
  const vUsdNewAmount = getY(tokenBalance.toFixed(), poolInfo.aValue, poolInfo.dValue);
  return Big(poolInfo.vUsdBalance).minus(vUsdNewAmount).round().toFixed();
}

export function swapToVUsdReverse(amountInTokenPrecision: string, decimals: number, feeShare: string, poolInfo: PoolInfoDTO): SwapToVUsdCalcResult {
  const reversedFeeShare = Big(feeShare).div(Big(1).minus(feeShare));
  const fee = Big(amountInTokenPrecision).times(reversedFeeShare);
  const amountWithFee = Big(amountInTokenPrecision).plus(fee);
  return {
    bridgeFeeInTokenPrecision: fee.round().toFixed(),
    amountIncludingCommissionInSystemPrecision: calcSwapToVUsdReverse(toSystemPrecision(amountWithFee.toFixed(), decimals), poolInfo),
    amountExcludingCommissionInSystemPrecision: calcSwapToVUsdReverse(toSystemPrecision(amountInTokenPrecision, decimals), poolInfo)
  };
}

function calcSwapToVUsdReverse(amountInSystemPrecision: string, poolInfo: PoolInfoDTO): string {
  const tokenBalance = Big(poolInfo.tokenBalance).minus(amountInSystemPrecision);
  const vUsdNewAmount = getY(tokenBalance.toFixed(), poolInfo.aValue, poolInfo.dValue);
  return Big(vUsdNewAmount).minus(poolInfo.vUsdBalance).round().toFixed();
}

export interface SwapFromVUsdCalcResult {
  // фи в пресижине токена от передаваемого значения
  bridgeFeeInTokenPrecision: string;
  // результат с учётом вычета комиссии
  amountIncludingCommissionInTokenPrecision: string;
  // результат без учёта комиссии
  amountExcludingCommissionInTokenPrecision: string;
}

export function swapFromVUsd(amount: string, decimals: number, feeShare: string, poolInfo: PoolInfoDTO): SwapFromVUsdCalcResult {
  const vUsdBalance = Big(amount).plus(poolInfo.vUsdBalance);
  const newAmount = getY(vUsdBalance.toFixed(), poolInfo.aValue, poolInfo.dValue);
  const result = fromSystemPrecision(Big(poolInfo.tokenBalance).minus(newAmount).toFixed(), decimals);
  const fee = Big(result).times(feeShare);
  const resultWithoutFee = Big(result).minus(fee);
  return {
    bridgeFeeInTokenPrecision: fee.round().toFixed(),
    amountIncludingCommissionInTokenPrecision: resultWithoutFee.round().toFixed(),
    amountExcludingCommissionInTokenPrecision: result
  };
}

export function swapFromVUsdReverse(vUsdInSystemPrecision: string, decimals: number, feeShare: string, poolInfo: PoolInfoDTO): SwapFromVUsdCalcResult {
  const vUsdNewAmount = Big(poolInfo.vUsdBalance).minus(vUsdInSystemPrecision);
  const tokenBalance = getY(vUsdNewAmount.toFixed(), poolInfo.aValue, poolInfo.dValue);
  const inSystemPrecision = Big(tokenBalance).minus(poolInfo.tokenBalance);
  const amountWithoutFee = fromSystemPrecision(inSystemPrecision.toFixed(), decimals);
  const reversedFeeShare = Big(feeShare).div(Big(1).minus(feeShare));
  const fee = Big(amountWithoutFee).times(reversedFeeShare);
  const amount = Big(amountWithoutFee).plus(fee);
  return {
    bridgeFeeInTokenPrecision: fee.round().toFixed(),
    amountIncludingCommissionInTokenPrecision: amount.round().toFixed(),
    amountExcludingCommissionInTokenPrecision: amountWithoutFee
  };
}

export interface SwapPoolInfo {
  decimals: number;
  feeShare: string;
  poolInfo: PoolInfoDTO;
}

export interface SwapAndBridgeCalculationData {
  swapToVUsdCalcResult: SwapToVUsdCalcResult;
  swapFromVUsdCalcResult: SwapFromVUsdCalcResult;
}

export function swapAndBridgeCalculation(amountInTokenPrecision: string, sourcePoolInfo: SwapPoolInfo, destinationPoolInfo: SwapPoolInfo): SwapAndBridgeCalculationData {
  const swapToVUsdCalcResult = swapToVUsd(amountInTokenPrecision, sourcePoolInfo.decimals, sourcePoolInfo.feeShare, sourcePoolInfo.poolInfo);
  const swapFromVUsdCalcResult = swapFromVUsd(swapToVUsdCalcResult.amountIncludingCommissionInSystemPrecision, destinationPoolInfo.decimals, destinationPoolInfo.feeShare, destinationPoolInfo.poolInfo);
  return {swapToVUsdCalcResult, swapFromVUsdCalcResult};
}

export function swapAndBridgeCalculationReverse(amountInTokenPrecision: string, sourcePoolInfo: SwapPoolInfo, destinationPoolInfo: SwapPoolInfo): SwapAndBridgeCalculationData {
  const swapToVUsdCalcResult = swapToVUsdReverse(amountInTokenPrecision, destinationPoolInfo.decimals, destinationPoolInfo.feeShare, destinationPoolInfo.poolInfo);
  const swapFromVUsdCalcResult = swapFromVUsdReverse(swapToVUsdCalcResult.amountIncludingCommissionInSystemPrecision, sourcePoolInfo.decimals, sourcePoolInfo.feeShare, sourcePoolInfo.poolInfo);
  return {
    swapToVUsdCalcResult,
    swapFromVUsdCalcResult
  };
}

// y = (sqrt(x(4ad³ + x (4a(d - x) - d )²)) + x (4a(d - x) - d ))/8ax
// commonPart = 4a(d - x) - d
// sqrt = sqrt(x * (4ad³ + x * commonPart²)
// y =   (sqrt + x * commonPart) / divider
export function getY(x: string, a: string, d: string): string {
  const commonPartBig = Big(4).times(a).times(Big(d).minus(x)).minus(d);
  const dCubed = Big(d).pow(3);
  const commonPartSquared = commonPartBig.pow(2);
  const sqrtBig = Big(x).times(Big(x).times(commonPartSquared).plus(Big(4).times(a).times(dCubed))).sqrt();
  const dividerBig = Big(8).times(a).times(x);
  return commonPartBig.times(x).plus(sqrtBig).div(dividerBig).toFixed();
}

