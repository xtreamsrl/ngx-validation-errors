import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ContentChild,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  Renderer2,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {FormControlName} from '@angular/forms';
import {InputErrorsComponent} from './input-errors.component';
import {FormFieldDirective} from './form-field.directive';
import {TranslateService} from '@ngx-translate/core';
import {VALIDATION_ERROR_CONFIG, ValidationErrorsConfig} from './error-validation-config';

function toScreamingSnakeCase(input: string): string {
  return input.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();
}

@Component({
  // tslint:disable:component-selector
  selector: '[formFieldContainer], formFieldContainer',
  template: `
    <ng-content></ng-content>
    <ng-container #errorsContainer></ng-container>
  `
})
//    <input-errors [innerValidationError]="innerValidationError" [messages]="messages" [params]="messageParams"></input-errors>
export class InputValidatorComponent implements AfterContentInit, AfterViewInit {


  @ContentChild(FormControlName) formControl: FormControlName;
  @ContentChild(InputErrorsComponent) public messagesBlock: InputErrorsComponent;

  @ContentChild(FormFieldDirective, {read: ElementRef}) input: ElementRef;

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
    private translateService: TranslateService,
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
    console.debug('setting info',this.componentRef, this.formControl.name, this.messages, this.messageParams);
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
    console.debug('formControl', this.formControl.name, hasError);

    if (hasError && this.input && this.input.nativeElement) {
      this.messages = Object.keys(this.formControl.errors).map(error => {
        const fieldName = this.formControl.name;
        const errorKey = `ERRORS.${toScreamingSnakeCase(fieldName)}.${toScreamingSnakeCase(error)}`;
        if (this.translateService.instant(`${this.validationContext}.${errorKey}`) === `${this.validationContext}.${errorKey}`) {
          return `${this.validationErrorsConfig.defaultContext}.${errorKey}`;
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
        this.renderer.removeClass(this.input.nativeElement, 'is-valid');

      } catch (e) {
      }
      this.renderer.addClass(this.input.nativeElement, 'is-invalid');
    }
    this.updateErrorComponent();
    console.debug('formControl', this.formControl.name, this.messageParams, this.messages);

    return hasError;
  }

  @HostBinding('class.has-success')
  get hasSuccess(): boolean {
    const hasSuccess = (
      !this.formControl.valid &&
      this.formControl.dirty && this.formControl.touched) &&
      !this.validationDisabled;
    if (hasSuccess && this.input && this.input.nativeElement) {
      this.messages = [];
      try {
        this.renderer.removeClass(this.input.nativeElement, 'is-invalid');

      } catch (e) {
      }
    }
    return;
  }

  ngAfterContentInit(): void {
    if (this.messagesBlock) {
      this.messagesBlock.messages = this.messages;
    }
  }

  public setValidationContext(context: string): void {
    this.validationContext = context;
  }

  setInnerValidation(innerValidation: boolean): void {
    this.innerValidationError = innerValidation;
  }
}
