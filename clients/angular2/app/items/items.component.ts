import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {CanActivate} from '@angular/router-deprecated';

import {IItem} from './item';
import {ItemsService} from './items.service';
import {requireAuth} from '../common/requireAuth';


@CanActivate(requireAuth)
@Component({
  moduleId: module.id,
  templateUrl: 'items.component.html',
  providers: [ItemsService]
})
export class ItemsComponent implements OnInit {
  Items: Observable<IItem[]>;
  errorMessage: string;

  constructor(private _Itemservice: ItemsService) {

  }

  ngOnInit(): void {
    this.Items = this._Itemservice.getItems().map(response => response.list);
  }
}
