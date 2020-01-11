import {AfterViewInit, Component, ContentChild, ElementRef} from '@angular/core';
import {ControlContainer, FormArrayName} from '@angular/forms';
import {FormValidationContainer} from './form-validation-container';

@Component({
  selector: '[ngxValidationErrorsArray], ngx-validation-errors-array',
  template: `
      <ng-content></ng-content>
      <ng-container #errorsContainer></ng-container>
  `
})
export class FormArrayContainerComponent extends FormValidationContainer implements AfterViewInit {

  // tslint:disable-next-line:variable-name
  @ContentChild(FormArrayName,{ static: true}) _formControl: FormArrayName;

  // tslint:disable-next-line:variable-name
  @ContentChild(FormArrayName, {read: ElementRef,  static: true}) _el: ElementRef;


  get formControl() {
    return this._formControl.control;
  }
  get formControlName(): string {
    return this._formControl.name;
  }

  get el(): ElementRef<any> {
    return this._el;
  }
}
