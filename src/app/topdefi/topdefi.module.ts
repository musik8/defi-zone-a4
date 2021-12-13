import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopdefiPageRoutingModule } from './topdefi-routing.module';

import { TopdefiPage } from './topdefi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopdefiPageRoutingModule
  ],
  declarations: [TopdefiPage]
})
export class TopdefiPageModule {}
