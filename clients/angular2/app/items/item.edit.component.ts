import {Component, OnInit} from '@angular/core';
import {NgIf, NgFor} from '@angular/common';
import {Router, RouteParams} from '@angular/router-deprecated';
import {Observable} from 'rxjs/Observable';
import {DATEPICKER_DIRECTIVES} from 'ng2-bootstrap';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/finally';

import {IItem} from './item';
import {ItemsService} from './items.service';
import {ReferencesService, IReferences} from '../common/references.service';

@Component({
  moduleId: module.id,
  templateUrl: 'item.edit.component.html',
  providers: [ItemsService],
  directives: [DATEPICKER_DIRECTIVES, NgIf, NgFor]
})
export class ItemEditComponent implements OnInit {
  references: IReferences;
  priorities: Array<any>;
  processing: boolean = false;
  item: IItem;
  constructor(
    private _router: Router,
    private _routeParams: RouteParams,
    private _referencesService: ReferencesService,
    private _itemsService: ItemsService) { }

  ngOnInit() {
    Observable.forkJoin(
      this._referencesService.getReferences(),
      this.getItem())
      .subscribe(result => {
        const [references, item] = <Array<any>>result;
        this.references = references;
        this.priorities = Object.keys(references.priorities).map((k) => [k, references.priorities[k]]);
        if (!item.id) {
          item.priority = this.priorities[0][0];
        }
        this.item = item;
      });
  }

  onSubmit(form) {
    if (!form.valid) {
      return;
    }

    this.processing = true;

    this._itemsService.saveItem(this.item)
      .finally(() => this.processing = false)
      .subscribe(() => {
        toastr.success('Saved');
        this._router.navigateByUrl('/items');
      });
  }

  cancel(event: Event) {
    event.preventDefault();
    this._router.navigateByUrl('/items');
  }

  getItem() {
    const id = +this._routeParams.get('id');
    if (id) {
      return this._itemsService.getItem(id);
    } else {
      return Observable.of({
        dueDate: new Date()
      });
    }
  }

}
