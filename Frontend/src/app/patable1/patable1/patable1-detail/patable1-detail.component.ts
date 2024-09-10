import { Component, OnInit,inject } from '@angular/core';
import { Patable1DetailBaseComponent } from '@baseapp/patable1/patable1/patable1-detail/patable1-detail.base.component';
import { Patable1Service } from '@baseapp/patable1/patable1/patable1.service';


@Component({
  selector: 'app-patable1-detail',
  templateUrl: '../../../../../base/app/patable1/patable1/patable1-detail/patable1-detail.component.html',
  styleUrls: ['./patable1-detail.scss']
})
export class Patable1DetailComponent extends Patable1DetailBaseComponent implements OnInit {
 
	
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