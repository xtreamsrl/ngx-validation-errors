import {
  AfterContentInit,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  Renderer2,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ValidationErrorsConfig} from './error-validation-config';
import {toScreamingSnakeCase} from './utils';
import {AbstractControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {toChangeObservable} from './toChangeObservable';

export abstract class FormValidationContainer implements AfterContentInit, OnDestroy {

  @Input() customErrorMessages: {} = {};
  @Input() messageParams: {} = {};
  @Input() validationDisabled = false;
  @Input() innerValidationError: boolean;

  @ViewChild('errorsContainer', {read: ViewContainerRef, static: true}) errorsContainer: ViewContainerRef;

  public messages: string[];
  private validationContext;
  private componentRef: ComponentRef<any>;

  @HostBinding('class.has-error')
  public hasErrors: boolean;

  @HostBinding('class.has-success')
  public hasSuccess: boolean;

  private subscription: Subscription;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private messageProvider: { instant(key: string): string; },
    private cdRef: ChangeDetectorRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private validationErrorsConfig: ValidationErrorsConfig) {
    this.validationContext = validationErrorsConfig.defaultContext;
  }

  ngAfterContentInit(): void {
    this.addErrorComponent();
    this.subscription = toChangeObservable(this.formControl).subscribe(value => {
      this.checkErrors();
      this.checkSuccess();
      this.updateErrorComponent();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addErrorComponent() {
    if (this.errorsContainer && !this.componentRef) {
      this.errorsContainer.clear();
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.validationErrorsConfig.errorComponent as any);
      this.componentRef = this.errorsContainer.createComponent(componentFactory);
    }
  }

  updateErrorComponent() {
    if (this.componentRef) {
      this.componentRef.instance.innerValidationError = this.innerValidationError;
      this.componentRef.instance.messages = this.messages;
      this.componentRef.instance.params = this.messageParams;
    }
  }

  checkErrors() {
    const hasError = (!this.formControl.valid && this.formControl.dirty && this.formControl.touched) && !this.validationDisabled;
    if (hasError && this.el && this.el.nativeElement) {
      this.messages = Object.keys(this.formControl.errors || {}).map(error => {
        const fieldName = this.formControlName;
        const errorKey = `${toScreamingSnakeCase(fieldName + '')}.ERRORS.${toScreamingSnakeCase(error)}`;
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
      if (this.messages && this.messages.length > 0) {
        this.messages = [this.messages[0]];
      }
      try {
        this.renderer.removeClass(this.el.nativeElement, 'is-valid');

      } catch (e) {
      }
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');

    }

    this.hasErrors = hasError;
  }

  checkSuccess(): void {
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
    this.hasSuccess = hasSuccess;
  }

  public setValidationContext(context: string): void {
    this.validationContext = context;
  }

  setInnerValidation(innerValidation: boolean): void {
    this.innerValidationError = innerValidation;
  }

  abstract get formControl(): AbstractControl;

  abstract get statusChanges(): Observable<any>;

  abstract get formControlName(): string | number;

  abstract get el(): ElementRef;

  public clear() {
    this.formControl.reset();
    this.formControl.setErrors(null);
    this.renderer.removeClass(this.el.nativeElement, 'is-valid');
    this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    this.messages = [];
  }

}
