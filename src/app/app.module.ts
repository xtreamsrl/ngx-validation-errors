import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxValidationErrorsModule} from '@xtream/ngx-validation-errors';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomErrorsComponent} from './custom-errors/custom-errors.component';
import { MainFromComponent } from './main-from/main-from.component';
import {SharedModule} from './shared/shared.module';

export function httpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    CustomErrorsComponent,
    MainFromComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxValidationErrorsModule.forRoot({
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [],
  entryComponents: [CustomErrorsComponent],
  bootstrap: [
    AppComponent,
    MainFromComponent
    ]
})
export class AppModule {
}
