import {AfterViewInit, Component, ContentChild, ElementRef, ViewContainerRef} from '@angular/core';
import {ControlContainer, FormControlName} from '@angular/forms';
import {FormValidationContainer} from './form-validation-container';

@Component({
  // tslint:disable:component-selector
  selector: '[formFieldContainer], form-field-container',
  template: `
      <ng-content></ng-content>
      <ng-container #errorsContainer></ng-container>
  `
})
export class FormFieldContainerComponent extends FormValidationContainer implements AfterViewInit {

  // tslint:disable-next-line:variable-name
  @ContentChild(FormControlName, {static: true}) _formControl: FormControlName;

  // tslint:disable-next-line:variable-name
  @ContentChild(FormControlName, {read: ElementRef, static: true}) _input: ElementRef;

  get formControl() {
    return this._formControl.control;
  }
  get formControlName(): string {
    return this._formControl.name;
  }

  get el(): ElementRef<any> {
    return this._input;
  }
}
