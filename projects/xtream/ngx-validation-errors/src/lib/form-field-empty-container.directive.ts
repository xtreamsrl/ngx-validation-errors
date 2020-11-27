import {Directive, DoCheck, Inject, Input, Optional, Renderer2, TemplateRef, ViewContainerRef} from '@angular/core';
import {AbstractControl, ControlContainer, FormGroup, FormGroupDirective} from '@angular/forms';
import {VALIDATION_ERROR_CONFIG, ValidationErrorsConfig} from './error-validation-config';
import {toScreamingSnakeCase} from './utils';
import {MESSAGES_PROVIDER} from './injection-tokens';

export class ForFieldErrorsContext {
  constructor(public errors: string[]) {
  }
}

@Directive({
  selector: '[ngxValidationErrors]',
  providers: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class FormFieldEmptyContainerDirective implements DoCheck {

  // tslint:disable-next-line:variable-name
  @Input('ngxValidationErrors') formControlRef: AbstractControl;

  @Input() customErrorMessages: {} = {};
  @Input() messageParams: {} = {};
  @Input() validationDisabled = false;

  rootEl: any;

  public messages: string[];
  private validationContext;
  private context = {errors: [] as string[]};

  constructor(
    private renderer: Renderer2,
    private viewContainer: ViewContainerRef,
    private template: TemplateRef<ForFieldErrorsContext>,
    // @Optional() form: FormGroupDirective,
    @Optional() @Inject(MESSAGES_PROVIDER) private messageProvider: any,
    @Inject(VALIDATION_ERROR_CONFIG) private validationErrorsConfig: ValidationErrorsConfig) {
    this.validationContext = validationErrorsConfig.defaultContext;
    const nodes = this.viewContainer.createEmbeddedView(this.template, this.context);
    this.rootEl = nodes.rootNodes[0];
  }

  ngDoCheck(): void {
    const hasError = (!this.formControl.valid && this.formControl.touched) && !this.validationDisabled;
    let messages;
    if (hasError) {
      messages = Object.keys(this.formControl.errors || {}).map(error => {
        const fieldName = this.formControlName;
        const errorKey = `${toScreamingSnakeCase(fieldName)}.ERRORS.${toScreamingSnakeCase(error)}`;
        if (this.messageProvider &&
          this.messageProvider.instant(`${this.validationContext}.${errorKey}`) === `${this.validationContext}.${errorKey}`) {
          return `${this.validationErrorsConfig.defaultContext}.ERRORS.${toScreamingSnakeCase(error)}`;
        } else {
          return `${this.validationContext}.${errorKey}`;
        }
      });
      const params = Object.values(this.formControl.errors || {}).reduce((a, b) => {
        a = {...a, ...b};
        return a;
      }, {});
      this.messageParams = this.messageParams ? {...this.messageParams, ...params} : params;
      if (messages && messages.length > 0) {
        messages = [messages[0]];
      }
    }

    if ((messages && !this.messages) || (!messages && this.messages) || (messages && messages[0] !== this.messages[0])) {
      this.messages = messages;
      this.context.errors = messages;
      if (this.rootEl) {
        if (messages) {
          this.renderer.addClass(this.rootEl, 'has-error');
        } else {
          this.renderer.removeClass(this.rootEl, 'has-error');
        }
      }
    }
  }

  public setValidationContext(context: string): void {
    this.validationContext = context;
  }

  setInnerValidation(innerValidation: boolean): void {
  }

  public clear() {
    this.formControl.reset();
    this.formControl.setErrors(null);
    this.messages = [];
    this.context.errors = undefined;
  }

  get formControl() {
    return this.formControlRef;
  }

  get formControlName(): string {
    if (this.formControlRef['_parent'] instanceof FormGroup) {
      const form = this.formControlRef['_parent'] as FormGroup;
      const name = Object.keys(form.controls).find(k => form.controls[k] === this.formControlRef);
      return name;
    }
    return 'field';
  }

}
