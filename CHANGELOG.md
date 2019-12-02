## 0.3.0 (2019-11-19)

## Breaking Changes
The 0.3.0 version removes the dependency from @ngx-translate/core to allow using the library
also without this @ngx-translate or with this or other similar libraries

To update you need to modify the app.module.ts like this:
```typescript
import {MESSAGES_PIPE_FACTORY_TOKEN, MESSAGES_PROVIDER, NgxValidationErrorsModule} from '@xtream/ngx-validation-errors'; 

export function translatePipeFactoryCreator(translateService: TranslateService) {
  return (detector: ChangeDetectorRef) => new TranslatePipe(translateService, detector);
}

@NgModule({
  providers: [
    {
     provide: MESSAGES_PIPE_FACTORY_TOKEN,
     useFactory: translatePipeFactoryCreator,
     deps: [TranslateService]
    },
    {
     provide: MESSAGES_PROVIDER,
     useExisting: TranslateService
    }
  ]
})

```

The function returns a factory that is used by the library to create a pipe and pass a ChangeDetectorRef instance so on lang change 
(or similar event) the components can be updated accordingly. 

If you want to use a custom error mapping without translation you can provide your custom pipe and message provider (that exposes an `instant(key:string):string` method)
like this:

```typescript
import {MESSAGES_PIPE_FACTORY_TOKEN, MESSAGES_PROVIDER, NgxValidationErrorsModule} from '@xtream/ngx-validation-errors';

export function simpleCustomPipeFactoryCreator(messageProvider: SimpleMessagesProviderService) {
  return (detector: ChangeDetectorRef) => new SimpleErrorPipe(messageProvider, detector);
}

@NgModule({
  providers: [
    {
      provide: MESSAGES_PIPE_FACTORY_TOKEN,
      useFactory: simpleCustomPipeFactoryCreator,
      deps: [SimpleMessagesProviderService]
    },
    {
      provide: MESSAGES_PROVIDER,
      useExisting: SimpleMessagesProviderService
    }
  ]
})
```

### Features

* remove dependency form @ngx-translate


## 0.2.0 (2019-11-19)

### Features

* add imperative validation clearing

## 0.1.0 (2019-11-19)


### Features

* **array:** add array controls validation

## 0.0.4 (2019-10-31)


### Bug Fixes

* change forRoot method to work with AOT


## 0.0.3 (2019-08-2)


### Bug Fixes

* change module import for lazy loading error


## 0.0.2 (2019-05-20)


### Bug Fixes

* add class is-invalid correclty on error 89fb90e
* fallback strategy of error messages 3b5a029
* FormFieldContainer selector in kebab-case 35db7ae



