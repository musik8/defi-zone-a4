import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TokenPageRoutingModule } from './token-routing.module';

import { TokenPage } from './token.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TokenPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TokenPage]
})
export class TokenPageModule {}
