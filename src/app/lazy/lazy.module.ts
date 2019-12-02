import {NgModule} from '@angular/core';
import {LazyFormComponent} from './lazy-form/lazy-form.component';
import {AppRoutingModule} from './lazy-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [LazyFormComponent]
})
export class LazyModule {
}
