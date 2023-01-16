import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-main-button',
  templateUrl: './main-button.component.html',
  styleUrls: ['./main-button.component.sass']
})
export class MainButtonComponent {
  @Input() disabled = false;
  @Input() processed = false;
  @Input() styleType: 'flat' | 'light' = 'flat';
  @Input() size: 'normal' | 'small' = 'normal';
  @Input() type: 'button' | 'submit' = 'button';
  @Output() btnClick = new EventEmitter<MouseEvent>();

  constructor() {}
}
