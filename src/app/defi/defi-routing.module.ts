import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefiPage } from './defi.page';

const routes: Routes = [
  {
    path: '',
    component: DefiPage
  },
  {
    path: 'token',
    loadChildren: () => import('../token/token.module').then( m => m.TokenPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefiPageRoutingModule {}
