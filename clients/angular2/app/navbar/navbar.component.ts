import {Component, Input} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';

import {AuthService} from '../common/auth.service';

@Component({
  selector: 'todo-navbar',
  templateUrl: 'app/navbar/navbar.component.html',
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES]
})
export class NavbarComponent {
  @Input() brand: string;
  @Input() routes: any[];

  name: string;

  constructor(private _authService: AuthService, private _router: Router) {
    this._authService.profile.subscribe(profile => this.name = profile && profile.name);
  }

  getName() {
    console.log('getName');
    return this.name;
  }

  logout($event: Event) {
    $event.preventDefault();
    this._authService.logout();
    this._router.navigateByUrl('/');
  }

  isLoggedIn() {
    return Boolean(this.name);
  }
}
