import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  moduleId: module.id,
  directives: [NgClass],
  template: `<span class="label" [ngClass]="{'label-success': value, 'label-danger': !value}">&nbsp;</span>`,
  selector: 'colored-flag'
})

export class ColoredFlagComponent {
  @Input() value: boolean;
}
