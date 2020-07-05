import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ContentChild,
  ElementRef,
  Inject,
  Optional,
  Renderer2
} from '@angular/core';
import {FormControlName} from '@angular/forms';
import {FormValidationContainer} from './form-validation-container';
import {MESSAGES_PROVIDER} from './injection-tokens';
import {VALIDATION_ERROR_CONFIG, ValidationErrorsConfig} from './error-validation-config';
import {Observable} from 'rxjs';

@Component({
  selector: '[ngxValidationErrorsField], ngx-validation-errors-field, [formFieldContainer], form-field-container',
  template: `
      <ng-content></ng-content>
      <ng-template #errorsContainer></ng-template>
  `
})
export class FormFieldContainerComponent extends FormValidationContainer {

  constructor(
    // tslint:disable-next-line:variable-name
    private _elRef: ElementRef,
    // tslint:disable-next-line:variable-name
    private _renderer: Renderer2,
    // tslint:disable-next-line:variable-name
    @Optional() @Inject(MESSAGES_PROVIDER) private _messageProvider: { instant(key: string): string; },
    // tslint:disable-next-line:variable-name
    private _cdRef: ChangeDetectorRef,
    // tslint:disable-next-line:variable-name
    private _componentFactoryResolver: ComponentFactoryResolver,
    // tslint:disable-next-line:variable-name
    @Inject(VALIDATION_ERROR_CONFIG) private  _validationErrorsConfig: ValidationErrorsConfig) {
    super(_elRef, _renderer, _messageProvider, _cdRef, _componentFactoryResolver, _validationErrorsConfig);
  }

  // tslint:disable-next-line:variable-name
  @ContentChild(FormControlName, {static: true}) _formControl: FormControlName;

  // tslint:disable-next-line:variable-name
  @ContentChild(FormControlName, {read: ElementRef, static: true}) _input: ElementRef;

  get formControl() {
    return this._formControl.control;
  }

  get formControlName(): string | number {
    return this._formControl.name;
  }

  get statusChanges(): Observable<any> {
    return this._formControl.control.statusChanges;
  }

  get el(): ElementRef<any> {
    return this._input;
  }
}
