import {Component, OnInit} from '@angular/core';

import {AuthService} from '../common/auth.service';

@Component({
  moduleId: module.id,
  template: `<div>
        <h2>About us</h2>
        <p>
          Sample Todo application.
        </p>
        <p>
          It's more playground and starter kit
        </p>
        <button (click)="forceAuth()">Auth test</button>
        <pre>{{_profile | json}}</pre>
      </div>`
})
export class AboutComponent {

  constructor(private _authService: AuthService) {
  }
  forceAuth() {
    this._authService.triggerAuth('/items');
  }
}
