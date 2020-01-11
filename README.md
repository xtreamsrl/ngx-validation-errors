# NgxValidationErrors

This library allows you to show dynamically created errors in forms using **FormControlName**.

## Messages generation

It creates a translation key that follows the following template for each key in the form control errors object

`${validationContext}.${fieldName}.ERRORS.${errorType}`

where:
- validationContext is the form identifier (for example _USER.REGISTRATION_ default: "GENERAL")
- fieldName is the form control name in **SCREAMING_SNAKE_CASE** 
- errorType is the error key in **SCREAMING_SNAKE_CASE** 

the keys are then translated using a pipe enriching the message using parameters taken from the error object.
if the key is not present in the language file the message fallbacks to `${defaultContext}.ERRORS.${errorType}` (_USER.REGISTRATION.NAME.MINLENGTH_ => _GENERAL.ERRORS.MINLENGTH_)

## Install

`npm i @xtream/ngx-validation-errors`

## Usage


Import it using
```typescript
import {NgxValidationErrorsModule} from '@xtream/ngx-validation-errors';

@NgModule({
  imports: [
    ...
    NgxValidationErrorsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```
### Components with auto errors injection
now you can use validationContext and ngxValidationErrorsField in your template

```angular2html
<form [formGroup]="heroForm" validationContext="USER.REGISTRATION">
  <div ngxValidationErrorsField>
    <label>Name</label>
    <input formControlName="name"/>
  </div>
</form>
```
or 
```angular2html
<form [formGroup]="heroForm" validationContext="USER.REGISTRATION">
  <ngx-validation-errors-field>
    <label>Name</label>
    <input formControlName="name"/>
  </ngx-validation-errors-field>
</form>
```

According to the Validators set in the FormControl the errors appear when the input is invalid, dirty and touched.

### Structural directive

The structural directive has been created for special layout library (like material-ui) that have special input/errors
components that do non allow to autoInject errors component. The usage is a little bit more verbose but the you control
errors

```angular2html
<form [formGroup]="heroForm" validationContext="USER.REGISTRATION">
    <mat-form-field *ngxValidationErrors="heroForm.get('name'); errors as errors">
      <input matInput formControlName="name" placeholder="name"/>
      <mat-error *ngIf="errors">{{errors}}</mat-error>
    </mat-form-field>
</form>
```

the structural directive needs the form control as parameter (like heroForm.get('name'), if you find a better way to retrieve the inner form control instance please open an issue).
It exposes errors in the template context so you can use them in the ui.

### Clearing

The ValidationContextComponent has an imperative clear that resets all the fields removing all the errors. 

```typescript
import {ValidationContextComponent} from '@xtream/ngx-validation-errors';


    @ViewChild(ValidationContextComponent) context: ValidationContextComponent;


    clearAll() {
        this.context.clear()
    }
}
```
### Configuration

The library can be configured using the `forRoot` static method 

```typescript
import {NgxValidationErrorsModule} from '@xtream/ngx-validation-errors';

@NgModule({
  declarations: [
    AppComponent,
    CustomErrorsComponent
  ],
  imports: [
    ...
    NgxValidationErrorsModule.forRoot({
      defaultContext: 'CUSTOM_GENERAL',
      errorComponent: CustomErrorsComponent
    })
  ],
  providers: [],
  entryComponents: [CustomErrorsComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```
 
you can set the default validation context and the errorComponent. The last one is instantiated dynamically using 
component factory and substituted to the default one, so remember to add it to the entryComponents list.
It must accept 3 inputs:
```
{
  messages: string[];
  params: {[key: string]: any};
  innerValidation: boolean;
}
```
###Message translation

You can use @ngx-translate providing the translate service and a pipe factory.

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

If you have a custom message mapping you can configure it  providing a custom pipe and service.

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
