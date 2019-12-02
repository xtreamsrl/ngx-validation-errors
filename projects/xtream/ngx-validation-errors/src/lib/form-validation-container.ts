import {AfterViewInit, ChangeDetectorRef, ComponentFactoryResolver, ComponentRef, ElementRef, HostBinding, Inject, Input, Optional, Renderer2, ViewChild, ViewContainerRef} from '@angular/core';
import {VALIDATION_ERROR_CONFIG, ValidationErrorsConfig} from './error-validation-config';
import {toScreamingSnakeCase} from './utils';
import {AbstractControl} from '@angular/forms';
import {MESSAGES_PROVIDER} from './ngx-validation-errors.module';

export abstract class FormValidationContainer implements AfterViewInit {

  @Input() customErrorMessages: {} = {};
  @Input() messageParams: {} = {};
  @Input() validationDisabled = false;
  @Input() innerValidationError: boolean;

  @ViewChild('errorsContainer', {read: ViewContainerRef}) errorsContainer: ViewContainerRef;

  public messages: string[];
  private validationContext;
  private componentRef: ComponentRef<any>;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    @Optional() @Inject(MESSAGES_PROVIDER) private messageProvider: {instant(key: string): string;},
    private cdRef: ChangeDetectorRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(VALIDATION_ERROR_CONFIG) private  validationErrorsConfig: ValidationErrorsConfig) {
    this.validationContext = validationErrorsConfig.defaultContext;
  }

  ngAfterViewInit(): void {
    this.addErrorComponent();
    this.updateErrorComponent();
  }

  addErrorComponent() {
    if (this.errorsContainer && !this.componentRef) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.validationErrorsConfig.errorComponent as any);
      this.componentRef = this.errorsContainer.createComponent(componentFactory);
    }
  }

  updateErrorComponent() {
    this.addErrorComponent();

    if (this.componentRef) {
      this.componentRef.instance.innerValidationError = this.innerValidationError;
      this.componentRef.instance.messages = this.messages;
      this.componentRef.instance.params = this.messageParams;
      this.componentRef.changeDetectorRef.detectChanges();
    }
  }

  @HostBinding('class.has-error')
  get hasErrors(): boolean {
    const hasError = (!this.formControl.valid && this.formControl.dirty && this.formControl.touched) && !this.validationDisabled;
    if (hasError && this.el && this.el.nativeElement) {
      this.messages = Object.keys(this.formControl.errors).map(error => {
        const fieldName = this.formControlName;
        const errorKey = `${toScreamingSnakeCase(fieldName)}.ERRORS.${toScreamingSnakeCase(error)}`;
        if (this.messageProvider && this.messageProvider.instant(`${this.validationContext}.${errorKey}`) === `${this.validationContext}.${errorKey}`) {
          return `${this.validationErrorsConfig.defaultContext}.ERRORS.${toScreamingSnakeCase(error)}`;
        } else {
          return `${this.validationContext}.${errorKey}`;
        }
      });
      const params = Object.values(this.formControl.errors).reduce((a, b) => {
        a = {...a, ...b};
        return a;
      }, {});
      this.messageParams = this.messageParams ? {...this.messageParams, ...params} : params;
      if (this.messages && this.messages.length > 0) {
        this.messages = [this.messages[0]];
      }
      try {
        this.renderer.removeClass(this.el.nativeElement, 'is-valid');

      } catch (e) {
      }
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');

    }
    this.updateErrorComponent();

    return hasError;
  }

  @HostBinding('class.has-success')
  get hasSuccess(): boolean {
    const hasSuccess = (
      this.formControl.valid &&
      this.formControl.dirty && this.formControl.touched) &&
      !this.validationDisabled;
    if (hasSuccess && this.el && this.el.nativeElement) {
      this.messages = [];
      try {
        this.renderer.removeClass(this.el.nativeElement, 'is-invalid');

      } catch (e) {
      }
    }
    return;
  }

  public setValidationContext(context: string): void {
    this.validationContext = context;
  }

  setInnerValidation(innerValidation: boolean): void {
    this.innerValidationError = innerValidation;
  }

  abstract get formControl(): AbstractControl;

  abstract get formControlName(): string;

  abstract get el(): ElementRef;

  public clear() {
    this.formControl.reset();
    this.formControl.setErrors(null);
    this.renderer.removeClass(this.el.nativeElement, 'is-valid');
    this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    this.messages = [];
  }

}
