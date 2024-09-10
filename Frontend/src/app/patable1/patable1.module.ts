import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Patable1RoutingModule } from './patable1-routing.module';
import { Patable1BaseModule } from '@baseapp/patable1/patable1.base.module';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    Patable1BaseModule,
    Patable1RoutingModule
    
  ],
  exports: [
      Patable1BaseModule,
  ]

})
export class Patable1Module  { }