import {BrowserModule} from '@angular/platform-browser';
import {ChangeDetectorRef, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MESSAGES_PIPE_FACTORY_TOKEN, MESSAGES_PROVIDER, NgxValidationErrorsModule} from '@xtream/ngx-validation-errors';
import {TranslateLoader, TranslateModule, TranslatePipe, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomErrorsComponent} from './custom-errors/custom-errors.component';
import {MainFromComponent} from './main-from/main-from.component';
import {SharedModule} from './shared/shared.module';
import {SimpleErrorPipe} from './simple-error-pipe.pipe';
import {SimpleMessagesProviderService} from './simple-messages-provider.service';

export function httpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}


export function translatePipeFactoryCreator(translateService: TranslateService) {
  return (detector: ChangeDetectorRef) => new TranslatePipe(translateService, detector);
}


export function simpleCustomPipeFactoryCreator(translateService: TranslateService) {
  return (detector: ChangeDetectorRef) => new SimpleErrorPipe(translateService, detector);
}

@NgModule({
  declarations: [
    AppComponent,
    CustomErrorsComponent,
    MainFromComponent,
    SimpleErrorPipe
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxValidationErrorsModule.forRoot({}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    /*
    snippet to use with @ngx-translate
    {
      provide: MESSAGES_PIPE_FACTORY_TOKEN,
      useFactory: translatePipeFactoryCreator,
      deps: [TranslateService]
    },
    {
      provide: MESSAGES_PROVIDER,
      useExisting: TranslateService
    }
 */
    {
      provide: MESSAGES_PIPE_FACTORY_TOKEN,
      useFactory: simpleCustomPipeFactoryCreator,
      deps: [SimpleMessagesProviderService]
    },
    {
      provide: MESSAGES_PROVIDER,
      useExisting: SimpleMessagesProviderService
    }
  ],
  entryComponents: [CustomErrorsComponent],
  bootstrap: [
    AppComponent,
    MainFromComponent
  ]
})
export class AppModule {
}
