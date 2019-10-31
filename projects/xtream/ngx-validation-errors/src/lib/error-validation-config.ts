import {InjectionToken} from '@angular/core';

export interface ErrorsComponent {
  innerValidationError: boolean;
  messages: string[];
  params: {[key: string]: any};
}

export type ValidationErrorsConfig = {
  defaultContext?: string;
  errorComponent?: ErrorsComponent;
};

export const VALIDATION_ERROR_CONFIG = new InjectionToken<ValidationErrorsConfig>('validationError.config');
