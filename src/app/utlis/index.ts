import {TokenDTO} from "../models/api.model";
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import Big from 'big.js';
import {SYSTEM_PRECISION} from "../constants";
export function checkAndAddSlashToTheEnd(str: string): string {
  return str.length ? /\/$/.test(str) ? str : str + '/' : '';
}

export function validateAmount(getAsset: () => Pick<TokenDTO, 'decimals'> | undefined): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const asset = getAsset();
    if (!asset) {
      return {amount: 'Please select network and token'};
    }
    const {decimals} = asset;


    const amount = control.value;
    if (!amount) {
      return {amount: 'Please enter the amount'};
    }
    let intAmountInBig: Big;
    try {
      intAmountInBig = Big(floatToInt(amount, decimals));
    } catch (e) {
      return {amount: 'Invalid amount'};
    }

    if (!validateDecimals(amount, decimals)) {
      return {amount: 'Amount is too long'};
    }
    if (intAmountInBig.eq(0)) {
      return {amount: 'Invalid amount'};
    }
    return null;
  };
}

function validateDecimals(amount: string, precision: number): boolean {
  const amountInBig = new Big(amount).times(pow10(precision));
  const round = amountInBig.round(0);
  return amountInBig.eq(round);
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

