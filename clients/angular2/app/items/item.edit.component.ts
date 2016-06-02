import {Component, OnInit} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';

@Component({
  moduleId: module.id,
  templateUrl: 'item.edit.component.html'
})
export class ItemEditComponent implements OnInit {
  id: number;
  constructor(private _routeParams: RouteParams) {

  }

  ngOnInit() {
    this.id = +this._routeParams.get('id');
  }

}
