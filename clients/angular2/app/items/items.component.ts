import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {CanActivate} from '@angular/router-deprecated';
import {PAGINATION_DIRECTIVES, AlertComponent} from 'ng2-bootstrap';
import 'rxjs/add/operator/switchMap';

import {ColoredFlagComponent} from '../common/colored.flag.component';
import {IItem} from './item';
import {ItemsService} from './items.service';
import {requireAuth} from '../common/requireAuth';


@CanActivate(requireAuth)
@Component({
  moduleId: module.id,
  templateUrl: 'items.component.html',
  providers: [ItemsService],
  directives: [PAGINATION_DIRECTIVES, AlertComponent, ColoredFlagComponent]
})

export class ItemsComponent {
  items: IItem[];
  errorMessage: string;
  currentPage: number = 1;
  pageSize: number = 10;
  total: number;
  private _page: BehaviorSubject<number>;


  constructor(private _Itemservice: ItemsService) {
    this._page = new BehaviorSubject(this.currentPage);
    this._page.switchMap(page => this._Itemservice.getItems(page, this.pageSize))
    .subscribe(response => {
      this.items = response.list;
      this.total = response.total;
      this.currentPage = response.page;
    });
  }

  public pageChanged({page}: any): void {
    if (page !== this.currentPage) {
     this._page.next(page);
    }
  }
}
