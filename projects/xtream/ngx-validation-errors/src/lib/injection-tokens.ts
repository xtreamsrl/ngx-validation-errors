import {InjectionToken} from '@angular/core';

export const ValidationErrorsConfigObject = new InjectionToken('ValidationErrorsConfigObject');
export const FOR_ROOT_OPTIONS_TOKEN = new InjectionToken('forRootOptionToken');
export const MESSAGES_PROVIDER = new InjectionToken<{ instant(key: string): string; }>('MessagesProvider');
export const MESSAGES_PIPE_FACTORY_TOKEN = new InjectionToken('MessagePipeFactoryToken');
