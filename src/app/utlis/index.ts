import Big from 'big.js';
import {SYSTEM_PRECISION} from "../constants";
export function checkAndAddSlashToTheEnd(str: string): string {
  return str.length ? /\/$/.test(str) ? str : str + '/' : '';
}

function pow10(decimals: number): Big {
  return Big(10).pow(decimals);
}

export function floatToInt(amount: string, decimals: number): string {
  return Big(amount).times(pow10(decimals)).toFixed();
}

export function intToFloat(amount: string, decimals: number): string {
  return Big(amount).div(pow10(decimals)).toFixed();
}

export function checkAmount(amount?: string | null | undefined): string {
  if (!amount || isNaN(+amount) || Big(amount).eq('0')) {
    throw new Error('Invalid amount!');
  }
  return amount;
}

export function toSystemPrecision(amount: string, decimals: number): string {
  return convertAmountPrecision(amount, decimals, SYSTEM_PRECISION);
}

export function fromSystemPrecision(amount: string, decimals: number): string {
  return convertAmountPrecision(amount, SYSTEM_PRECISION, decimals);
}

export function convertAmountPrecision(amount: string, decimalsFrom: number, decimalsTo: number): string {
  const dif = Big(decimalsTo).minus(decimalsFrom).toNumber();
  return Big(amount).times(pow10(dif)).toFixed();
}

