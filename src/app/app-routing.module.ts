import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainFromComponent} from './main-from/main-from.component';

const routes: Routes = [
  {
    path: 'not-lazy',
    component: MainFromComponent
  },
  {
    path: 'lazy',
    loadChildren: './lazy/lazy.module#LazyModule'
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
