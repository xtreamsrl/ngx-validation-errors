import {Component, HostBinding, Input} from '@angular/core';
import {AbstractControl, AbstractControlDirective} from '@angular/forms';
import {ErrorsComponent} from './error-validation-config';

@Component({

  // tslint:disable-next-line:component-selector
  selector: 'input-errors',
  template: `
      <div class="error-wrapper">
          <span class="help-block" *ngFor="let message of messages;">{{ message | mapToMessage:params }}</span>
      </div>
  `,
  styleUrls: ['./input-errors.component.scss']
})
export class InputErrorsComponent implements ErrorsComponent {

  @Input() public messages: string[] = [];
  @Input() public params: {[key: string]: any} = {};
  @Input() @HostBinding('class.is-inner') public innerValidationError: boolean;

  @Input()
  private control: AbstractControlDirective | AbstractControl;

}
