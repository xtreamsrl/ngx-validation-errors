import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {InputErrorsComponent} from './input-errors.component';
import {FormFieldContainerComponent} from './form-field-container.component';
import {ValidationContextComponent} from './validation-context.component';
import {VALIDATION_ERROR_CONFIG, ValidationErrorsConfig} from './error-validation-config';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormArrayContainerComponent} from './form-array-container.component';
import {MapToMessagePipe} from './map-to-message.pipe';
import {InnerMapToMessagePipe} from './inner-map-to-message.pipe';


export const defaultConfig = {
  defaultContext: 'GENERAL',
  errorComponent: InputErrorsComponent as any
} as ValidationErrorsConfig;

export const ValidationErrorsConfigObject = new InjectionToken('ValidationErrorsConfigObject');
export const FOR_ROOT_OPTIONS_TOKEN = new InjectionToken('forRootOptionToken');
export const MESSAGES_PROVIDER = new InjectionToken<{instant(key: string): string;}>('MessagesProvider');
export const MESSAGES_PIPE_FACTORY_TOKEN = new InjectionToken('MessagePipeFactoryToken');

export function configFactory(customConfig: ValidationErrorsConfig, currentConfig: ValidationErrorsConfig) {
  const actualConfig = {...currentConfig};
  if (customConfig) {
    if (customConfig.defaultContext) {
      actualConfig.defaultContext = customConfig.defaultContext;
    }

    if (customConfig.errorComponent) {
      actualConfig.errorComponent = customConfig.errorComponent;
    }
  }
  return actualConfig;
}

@NgModule({
  declarations: [
    InputErrorsComponent,
    FormFieldContainerComponent,
    FormArrayContainerComponent,
    ValidationContextComponent,
    MapToMessagePipe,
    InnerMapToMessagePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    InputErrorsComponent,
    FormFieldContainerComponent,
    FormArrayContainerComponent,
    ValidationContextComponent
  ],
  entryComponents: [
    InputErrorsComponent
  ]
})
export class NgxValidationErrorsModule {

  static forRoot(config?: ValidationErrorsConfig): ModuleWithProviders {
    return {
      ngModule: NgxValidationErrorsModule,
      providers: [
        {
          provide: ValidationErrorsConfigObject, useValue: defaultConfig as ValidationErrorsConfig
        },
        {
          provide: FOR_ROOT_OPTIONS_TOKEN,
          useValue: config
        },
        MapToMessagePipe,
        {
          provide: VALIDATION_ERROR_CONFIG,
          useFactory: configFactory,
          deps: [FOR_ROOT_OPTIONS_TOKEN, ValidationErrorsConfigObject]
        },
        MapToMessagePipe,
        InnerMapToMessagePipe
      ]
    };
  }
}

