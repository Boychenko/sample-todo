import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {APP_ROUTES} from './app.routes';
import {NavbarComponent} from './navbar/navbar.component';
import {LoggerService} from './blocks/logger.service';

@Component({
  selector: 'todo-app',
  templateUrl: 'app/app.component.html',
  directives: [NavbarComponent, ROUTER_DIRECTIVES]
})
@RouteConfig(APP_ROUTES)
export class AppComponent {
  public menuItems = [
    { caption: 'About', link: 'About' },
    { caption: 'Items', link: 'Items' }
  ];

  constructor(private logger: LoggerService) {
  }
}
