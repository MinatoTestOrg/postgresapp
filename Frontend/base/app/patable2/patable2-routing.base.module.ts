import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@baseapp/auth.can-deactivate-guard.service';

import { Patable2DetailComponent } from '@app/patable2/patable2/patable2-detail/patable2-detail.component';
import { Patable2ListComponent } from '@app/patable2/patable2/patable2-list/patable2-list.component';

export const routes: Routes = [

{
     path: 'patable2detail',
     component: Patable2DetailComponent,
     canDeactivate: [ CanDeactivateGuard ],
     data: {
     	label: "PATABLE2_DETAIL",
        breadcrumb: "PATABLE2_DETAIL",
        roles : [					"all"
				]
     }
},
{
     path: 'patable2list',
     component: Patable2ListComponent,
     canDeactivate: [ CanDeactivateGuard ],
     data: {
     	label: "PATABLE2_LIST",
        breadcrumb: "PATABLE2_LIST",
        roles : [
        			"App Admin",
				    "Development Administrator"
]
     }
}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class Patable2BaseRoutingModule
{
}
