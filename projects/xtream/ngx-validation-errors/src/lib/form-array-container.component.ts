import {AfterViewInit, Component, ContentChild, ElementRef} from '@angular/core';
import {ControlContainer, FormArrayName} from '@angular/forms';
import {FormValidationContainer} from './form-validation-container';

@Component({
  // tslint:disable:component-selector
  selector: '[formArrayContainer], form-array-container',
  template: `
      <ng-content></ng-content>
      <ng-container #errorsContainer></ng-container>
  `
})
export class FormArrayContainerComponent extends FormValidationContainer implements AfterViewInit {

  // tslint:disable-next-line:variable-name
  @ContentChild(FormArrayName) _formControl: FormArrayName;

  // tslint:disable-next-line:variable-name
  @ContentChild(FormArrayName, {read: ElementRef}) _el: ElementRef;

  get formControl(): ControlContainer {
    return this._formControl;
  }

  get el(): ElementRef<any> {
    return this._el;
  }
}
