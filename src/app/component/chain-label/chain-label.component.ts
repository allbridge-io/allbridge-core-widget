import {Component, Input} from '@angular/core';
import {Chain} from "../../services/chains/constants";

@Component({
  selector: 'app-chain-label',
  templateUrl: './chain-label.component.html',
  styleUrls: ['./chain-label.component.sass']
})
export class ChainLabelComponent {
  @Input() chain?: Chain;
}
