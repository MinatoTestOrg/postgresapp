import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Patable2RoutingModule } from './patable2-routing.module';
import { Patable2BaseModule } from '@baseapp/patable2/patable2.base.module';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    Patable2BaseModule,
    Patable2RoutingModule
    
  ],
  exports: [
      Patable2BaseModule,
  ]

})
export class Patable2Module  { }