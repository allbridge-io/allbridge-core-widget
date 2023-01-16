import {Directive, ElementRef, HostListener} from '@angular/core';
import {NgControl} from '@angular/forms';

const FLOAT_PATTERN = /^\d*[.]?\d*$/;

@Directive({
  selector: '[appFloatingNumberInput]',
})
export class FloatingNumberInputDirective {

  private _value = '';
  private _oldSelectionStart: number | null = null;
  private _oldSelectionEnd: number | null = null;

  constructor(private _el: ElementRef,
              private _control: NgControl) {
  }

  @HostListener('input')
  @HostListener('keyup')
  @HostListener('keydown')
  @HostListener('mousedown')
  @HostListener('mouseup')
  @HostListener('select')
  @HostListener('contextmenu')
  @HostListener('focusout')
  private _updateValue(): void {
    const input: HTMLInputElement = this._el.nativeElement;
    if (!input.value) {
      this._value = '';
      return;
    }
    if (FLOAT_PATTERN.test(input.value)) {
      this._value = input.value;
      this._oldSelectionStart = input.selectionStart;
      this._oldSelectionEnd = input.selectionEnd;
    } else {
      this._control.control?.patchValue(this._value);
      if (this._oldSelectionStart && this._oldSelectionEnd) {
        input.setSelectionRange(this._oldSelectionStart, this._oldSelectionEnd);
      }
    }
  }
}
