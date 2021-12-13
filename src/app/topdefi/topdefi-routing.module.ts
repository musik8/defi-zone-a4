import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopdefiPage } from './topdefi.page';

const routes: Routes = [
  {
    path: '',
    component: TopdefiPage
  },
  {
    path: '/token',
    loadChildren: () => import('../token/token.module').then( m => m.TokenPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopdefiPageRoutingModule {}
