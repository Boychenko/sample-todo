import {Component} from '@angular/core';

import {AuthService} from './common/auth.service';

@Component({
  moduleId: module.id,
  template: '<div (click)="test()">Redirecting...</div>'
})
export class CallbackComponent {
  constructor(private _authService: AuthService) {
    this._authService.processTokenCallbackAsync();
  }
}
