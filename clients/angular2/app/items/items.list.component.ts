import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {CanActivate, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {PAGINATION_DIRECTIVES, AlertComponent} from 'ng2-bootstrap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/publish';
import * as _ from 'lodash';

import {ColoredFlagComponent} from '../common/colored.flag.component';
import {IItem} from './item';
import {ItemsService} from './items.service';
import {ReferencesService, IReferences} from '../common/references.service';
import {requireAuth} from '../common/requireAuth';
import {IListResponse} from '../common/listResponse';

@CanActivate(requireAuth)
@Component({
  moduleId: module.id,
  templateUrl: 'items.list.component.html',
  providers: [ItemsService],
  directives: [ROUTER_DIRECTIVES, PAGINATION_DIRECTIVES, AlertComponent, ColoredFlagComponent]
})

export class ItemsListComponent implements OnInit {
  items: IItem[];
  references: IReferences;
  errorMessage: string;
  currentPage: number = 1;
  pageSize: number = 10;
  total: number;
  private _page: BehaviorSubject<number>;
  private _responseSource: ReplaySubject<IListResponse<IItem>>;


  constructor(private _itemservice: ItemsService, private _referencesService: ReferencesService) {
    this._page = new BehaviorSubject(this.currentPage);
    this._responseSource = new ReplaySubject(1);
  }

  ngOnInit() {
    this._page.switchMap(page => this._itemservice.getItems(page, this.pageSize))
      .subscribe(response => this._responseSource.next(response));
    const connectable = this._responseSource.publish();
    connectable.subscribe(response => {
      this.items = response.list;
      this.total = response.total;
      this.currentPage = response.page;
    });

    this._referencesService.getReferences().subscribe((references: IReferences) => {
      this.references = references;
      connectable.connect();
    });
  }

  public pageChanged({page}: any): void {
    if (page !== this.currentPage) {
      this._page.next(page);
    }
  }

  public complete(item: IItem, event: Event) {
    event.preventDefault();
    var clone = _.clone(item);
    clone.completed = true;
    this._itemservice.saveItem(clone).subscribe(() => item.completed = true);
  }

  public remove(item: IItem, event: Event) {
    event.preventDefault();
    this._itemservice.deleteItem(item).subscribe(() => this._page.next(this.currentPage));
  }
}
