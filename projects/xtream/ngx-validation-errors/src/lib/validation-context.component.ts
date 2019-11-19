import {AfterContentInit, Component, ContentChildren, Input, QueryList} from '@angular/core';
import {FormFieldContainerComponent} from './form-field-container.component';
import {FormArrayContainerComponent} from './form-array-container.component';

@Component({
  // tslint:disable:component-selector
  selector: '[validationContext]',
  template: '<ng-content></ng-content>'
})
export class ValidationContextComponent implements AfterContentInit {

  @ContentChildren(FormFieldContainerComponent, {descendants: true}) fieldValidators: QueryList<FormFieldContainerComponent>;
  @ContentChildren(FormArrayContainerComponent, {descendants: true}) arrayValidators: QueryList<FormArrayContainerComponent>;

  // tslint:disable:no-input-rename
  @Input() validationContext: string;
  @Input() innerValidationError: boolean;

  ngAfterContentInit(): void {
    if (this.fieldValidators) {
      this.fieldValidators.forEach(i => {
        i.setValidationContext(this.validationContext);
        i.setInnerValidation(this.innerValidationError);
      });
    }
    if (this.arrayValidators) {
      this.arrayValidators.forEach(i => {
        i.setValidationContext(this.validationContext);
        i.setInnerValidation(this.innerValidationError);
      });
    }
  }
}
