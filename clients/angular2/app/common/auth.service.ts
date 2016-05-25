import {Injectable} from '@angular/core';
import {Router} from '@angular/router-deprecated';

import {CONFIG} from '../common/config';

@Injectable()
export class AuthService {
  private _locationPort = window.location.port ? `:${window.location.port}` : '';
  private _redirectPathKey = 'redirectPathKey';
  private _oidcMagagerConfig = {
    client_id: 'todoSample', // client id
    redirect_uri: `${window.location.protocol}//${window.location.hostname}${this._locationPort}/callback`, // callback url
    response_type: 'id_token token', // the response type from the token service
    scope: 'openid profile email', // the scopes to include
    authority: CONFIG.authorityUrl // the authority
  };

  constructor(private _router: Router) {
  }

  processTokenCallbackAsync(queryString?: string) {
    this.createTokenManager().processTokenCallbackAsync(queryString)
      .then(this.onTokenCallbackSuccess.bind(this), this.onTokenCallbackError.bind(this));
  }

  requireAuth(path: string) {
    if (this.createTokenManager().expired) {
      this.setRedirectPath(path);
      this.triggerAuth(path);
      return Promise.resolve(false);
    }

    return Promise.resolve(true);
  }

  triggerAuth(redirectTo?: string) {
    this.setRedirectPath(redirectTo || window.location.pathname);

    const manager = this.createTokenManager();

    manager.removeToken();
    manager.redirectForToken();
  }

  getProfile() {
    return this.createTokenManager().profile;
  }

  getToken() {
    return this.createTokenManager().access_token;
  }

  private createTokenManager() {
    return new OidcTokenManager(this._oidcMagagerConfig);
  }

  private setRedirectPath(path: string) {
    if (path === undefined) {
      localStorage.removeItem(this._redirectPathKey);
    } else {
      localStorage.setItem(this._redirectPathKey, path);
    }
  }

  private getRedirectPath(): string {
    return localStorage.getItem(this._redirectPathKey);
  }

  private onTokenCallbackSuccess() {
    this._router.navigateByUrl(this.getRedirectPath());
  }

  private onTokenCallbackError(error) {
    toastr.error('Authentication failed');
    this._router.navigateByUrl('/');
  }
}
