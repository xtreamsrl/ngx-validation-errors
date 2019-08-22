import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LazyFormComponent} from './lazy-form/lazy-form.component';

const routes: Routes = [
  {
    path:'',
    component: LazyFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
