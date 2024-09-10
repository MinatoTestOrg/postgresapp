import { Component, OnInit,inject } from '@angular/core';
import { Patable1ListBaseComponent } from '@baseapp/patable1/patable1/patable1-list/patable1-list.base.component';
import { Patable1Service } from '@baseapp/patable1/patable1/patable1.service';


@Component({
  selector: 'app-patable1-list',
  templateUrl: '../../../../../base/app/patable1/patable1/patable1-list/patable1-list.component.html',
  styleUrls: ['./patable1-list.scss']
})
export class Patable1ListComponent extends Patable1ListBaseComponent implements OnInit {
 
	
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