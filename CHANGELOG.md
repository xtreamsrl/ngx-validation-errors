# [2.0.0](https://github.com/xtreamsrl/ngx-validation-errors/compare/v1.0.0...v2.0.0) (2020-07-05)


### Bug Fixes

* update pipe creation and usage ([ad000db](https://github.com/xtreamsrl/ngx-validation-errors/commit/ad000db6ae74c1d4c745618b8fd4f01ee0a79ba2))


### chore

* update readme and package.json ([8adbfab](https://github.com/xtreamsrl/ngx-validation-errors/commit/8adbfabcdbd1f9300d924c364ca7bb0b2cf7cea8))


### Features

* update project to angular 9 ([f1b6410](https://github.com/xtreamsrl/ngx-validation-errors/commit/f1b641097942e32315662e4105584ba0d875f296))


### BREAKING CHANGES

* complete update to angular 9



## 0.4.0 (2020-01-11)

### Features

* add structural directive for controlled errors management
* add standard names for components

## 1.0.0 (2020-01-11)

### Features

* update to angular 8
* add structural directive for controlled errors management

## Breaking Changes
The 1.0.0 version is compatible with angular 8.

The components have been renamed according to the angular conventions, now they starts with the library prefix.
Update this
```angular2html
<form [formGroup]="heroForm" validationContext="USER.REGISTRATION">
  <div formFieldContainer>
    <label>Name</label>
    <input formControlName="name"/>
  </div>
</form>
```
changing the name to ngxValidationErrorsField

```angular2html
<form [formGroup]="heroForm" validationContext="USER.REGISTRATION">
  <div ngxValidationErrorsField>
    <label>Name</label>
    <input formControlName="name"/>
  </div>
</form>
```

The old names are still available bu consider it deprecated!

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



