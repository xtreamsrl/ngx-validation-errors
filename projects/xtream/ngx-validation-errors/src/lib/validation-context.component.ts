import {AfterContentInit, ChangeDetectorRef, Component, ContentChildren, Input, QueryList} from '@angular/core';
import {FormFieldContainerComponent} from './form-field-container.component';
import {FormArrayContainerComponent} from './form-array-container.component';
import {FormFieldEmptyContainerDirective} from './form-field-empty-container.directive';

@Component({
  // tslint:disable:component-selector
  selector: '[validationContext]',
  template: '<ng-content></ng-content>'
})
export class ValidationContextComponent implements AfterContentInit {

  @ContentChildren(FormFieldContainerComponent, {descendants: true}) fieldValidators: QueryList<FormFieldContainerComponent>;
  @ContentChildren(FormArrayContainerComponent, {descendants: true}) arrayValidators: QueryList<FormArrayContainerComponent>;
  @ContentChildren(FormFieldEmptyContainerDirective, {descendants: true}) directives: QueryList<FormFieldEmptyContainerDirective>;

  // tslint:disable:no-input-rename
  @Input() validationContext: string;
  @Input() innerValidationError: boolean;


  constructor(private cdRef: ChangeDetectorRef) {
  }

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
    if (this.directives) {
      this.directives.forEach(i => {
        i.setValidationContext(this.validationContext);
        i.setInnerValidation(this.innerValidationError);
      });
    }
  }

  public clear(): void {

    if (this.fieldValidators) {
      this.fieldValidators.forEach(v => {
        v.clear();
      });
    }

    if (this.arrayValidators) {
      this.arrayValidators.forEach(v => {
        v.clear();
      });
    }
    if (this.directives) {
      this.directives.forEach(v => {
        v.clear();
      });
    }
    this.cdRef.markForCheck();
  }

}
