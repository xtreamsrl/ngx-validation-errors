import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {NgxValidationErrorsModule} from '@xtream/ngx-validation-errors';

@NgModule({
  declarations: [],
  imports: [
    NgxValidationErrorsModule
  ],
  exports: [
    TranslateModule,
    NgxValidationErrorsModule,
    CommonModule
  ]
})
export class SharedModule {
}
