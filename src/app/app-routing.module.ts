import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainFromComponent} from './main-from/main-from.component';
import {MaterialFromComponent} from './material-from/material-from.component';

const routes: Routes = [
  {
    path: 'not-lazy',
    component: MainFromComponent
  },
  {
    path: 'material',
    component: MaterialFromComponent
  },
  {
    path: 'lazy',
    loadChildren: () => import('./lazy/lazy.module').then(res => res.LazyModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'lazy'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
