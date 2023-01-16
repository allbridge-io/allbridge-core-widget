import {Component, EventEmitter, Input, Output} from '@angular/core';
import {gsap} from 'gsap';
@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.sass']
})
export class ToggleButtonComponent {
  @Input() disabled = false;
  @Output() btnClick = new EventEmitter<MouseEvent>();
  timeline = gsap.timeline();

  constructor() {
  }

  animation(): void {
    if (this.timeline) {
      this.timeline.progress(1);
    }
    this.timeline.set('.toggle-button', {rotation: 0});
    this.timeline
      .to('.toggle-button', {
        rotation: -10,
        duration: .1
      })
      .to('.toggle-button', {
        rotation: 370,
        duration: .6
      })
      .to('.toggle-button', {
        rotation: 360,
        duration: .1,
        ease: 'power2.inOut'
      });
  }

  click(): void {
    this.animation();
    this.btnClick.emit();
  }
}
