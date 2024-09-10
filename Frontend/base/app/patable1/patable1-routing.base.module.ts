import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@baseapp/auth.can-deactivate-guard.service';

import { Patable1DetailComponent } from '@app/patable1/patable1/patable1-detail/patable1-detail.component';
import { Patable1ListComponent } from '@app/patable1/patable1/patable1-list/patable1-list.component';

export const routes: Routes = [

{
     path: 'patable1detail',
     component: Patable1DetailComponent,
     canDeactivate: [ CanDeactivateGuard ],
     data: {
     	label: "PATABLE1_DETAIL",
        breadcrumb: "PATABLE1_DETAIL",
        roles : [					"all"
				]
     }
},
{
     path: 'patable1list',
     component: Patable1ListComponent,
     canDeactivate: [ CanDeactivateGuard ],
     data: {
     	label: "PATABLE1_LIST",
        breadcrumb: "PATABLE1_LIST",
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
export class Patable1BaseRoutingModule
{
}
