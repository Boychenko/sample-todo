import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {ItemsListComponent} from './items.list.component';
import {ItemEditComponent} from './item.edit.component';

@Component({
  moduleId: module.id,
  directives: [ROUTER_DIRECTIVES],
  template: `<router-outlet></router-outlet>`
})
@RouteConfig([
  { path: '/', name: 'ItemsList', component: ItemsListComponent, useAsDefault: true },
  { path: '/:id', name: 'ItemEdit', component: ItemEditComponent }
])
export class ItemsComponent {
}
