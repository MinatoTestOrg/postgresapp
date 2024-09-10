import { Component, OnInit,inject } from '@angular/core';
import { Patable2DetailBaseComponent } from '@baseapp/patable2/patable2/patable2-detail/patable2-detail.base.component';
import { Patable2Service } from '@baseapp/patable2/patable2/patable2.service';


@Component({
  selector: 'app-patable2-detail',
  templateUrl: '../../../../../base/app/patable2/patable2/patable2-detail/patable2-detail.component.html',
  styleUrls: ['./patable2-detail.scss']
})
export class Patable2DetailComponent extends Patable2DetailBaseComponent implements OnInit {
 
	
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