import {RouteDefinition} from '@angular/router-deprecated';

import {AboutComponent} from './about/about.component';
import {ItemsComponent} from './items/items.component';
import {CallbackComponent} from './callback.component';

export var APP_ROUTES: RouteDefinition[] = [
    { path: '/', name: 'About', component: AboutComponent, useAsDefault: true },
    { path: '/items/...', name: 'Items', component: ItemsComponent },
    { path: '/callback', name: 'AuthCallback', component: CallbackComponent }
];
