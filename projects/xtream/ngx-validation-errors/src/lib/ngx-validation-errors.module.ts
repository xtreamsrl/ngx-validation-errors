import {ModuleWithProviders, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {InputErrorsComponent} from './input-errors.component';
import {TranslateModule} from '@ngx-translate/core';
import {FormFieldContainerComponent} from './form-field-container.component';
import {ValidationContextComponent} from './validation-context.component';
import {VALIDATION_ERROR_CONFIG, ValidationErrorsConfig} from './error-validation-config';

@NgModule({
  declarations: [
    InputErrorsComponent,
    FormFieldContainerComponent,
    ValidationContextComponent
  ],
  imports: [
    BrowserModule,
    TranslateModule
  ],
  exports: [
    InputErrorsComponent,
    FormFieldContainerComponent,
    ValidationContextComponent
  ],
  entryComponents: [
    InputErrorsComponent
  ]
})
export class NgxValidationErrorsModule {

  static forRoot(config?: ValidationErrorsConfig): ModuleWithProviders {

    const currentConfig = {
      defaultContext: 'GENERAL',
      errorComponent: InputErrorsComponent as any
    } as ValidationErrorsConfig;

    if (config) {
      if (config.defaultContext) {
        currentConfig.defaultContext = config.defaultContext;
      }

      if (config.errorComponent) {
        currentConfig.errorComponent = config.errorComponent;
      }
    }

    return {
      ngModule: NgxValidationErrorsModule,
      providers: [
        {
          provide: VALIDATION_ERROR_CONFIG, useValue: currentConfig as ValidationErrorsConfig
        }
      ]
    };

  }
}
