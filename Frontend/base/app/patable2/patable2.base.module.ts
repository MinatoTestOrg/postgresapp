import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { WidgetsBaseModule } from '@libbase/widgets.base.module';
import { Patable2DetailComponent } from '@app/patable2/patable2/patable2-detail/patable2-detail.component';
import { Patable2ListComponent } from '@app/patable2/patable2/patable2-list/patable2-list.component';
import { CanDeactivateGuard } from '@baseapp/auth.can-deactivate-guard.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [
    Patable2DetailComponent,
    Patable2ListComponent
  ],
  imports: [
    SharedModule,
    WidgetsBaseModule,
  ],
  exports: [
    SharedModule,
	WidgetsBaseModule,
    Patable2DetailComponent,
    Patable2ListComponent
  ],
  providers: [
  DynamicDialogConfig,
  DynamicDialogRef,
	CanDeactivateGuard
  ],
  
})
export class Patable2BaseModule { }