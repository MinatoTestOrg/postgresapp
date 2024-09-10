import { Component, OnInit,inject } from '@angular/core';
import { Patable2ListBaseComponent } from '@baseapp/patable2/patable2/patable2-list/patable2-list.base.component';
import { Patable2Service } from '@baseapp/patable2/patable2/patable2.service';


@Component({
  selector: 'app-patable2-list',
  templateUrl: '../../../../../base/app/patable2/patable2/patable2-list/patable2-list.component.html',
  styleUrls: ['./patable2-list.scss']
})
export class Patable2ListComponent extends Patable2ListBaseComponent implements OnInit {
 
	
  ngAfterViewInit(): void {
    this.onAfterViewInit()
  }

  ngOnInit(): void {
    super.onInit();
  }

  ngOnChanges(changes:any){
    super.onChanges(changes);
  }
 
}