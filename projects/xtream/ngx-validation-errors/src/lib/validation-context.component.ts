import {AfterContentInit, Component, ContentChildren, Input, QueryList} from '@angular/core';
import {InputValidatorComponent} from './input-validator.component';

@Component({
  // tslint:disable:component-selector
  selector: '[validationContext]',
  template: '<ng-content></ng-content>'
})
export class ValidationContextComponent implements AfterContentInit {

  @ContentChildren(InputValidatorComponent, {descendants: true}) validators: QueryList<InputValidatorComponent>;

  // tslint:disable:no-input-rename
  @Input('validationContext') validationContext: string;
  @Input() innerValidationError: boolean;

  ngAfterContentInit(): void {
    if (this.validators) {
      this.validators.forEach(i => {
        i.setValidationContext(this.validationContext);
        i.setInnerValidation(this.innerValidationError);
      });
    }
  }
}
