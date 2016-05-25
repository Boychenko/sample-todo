import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode, ComponentRef, provide} from '@angular/core';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {HTTP_PROVIDERS, Http, XHRBackend, RequestOptions} from '@angular/http';

import {AppComponent} from './app.component';
import {LoggerService} from './blocks/logger.service';
import {AuthService} from './common/auth.service';
import {isProduction} from './common/config';
import {appInjector} from './common/appInjector';
import {HttpInterceptor} from './common/httpInterceptor';

if (isProduction()) {
  enableProdMode();
}

bootstrap(AppComponent, [
  LoggerService,
  AuthService,
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(Http, {
    useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions, authService: AuthService) =>
      new HttpInterceptor(xhrBackend, requestOptions, authService),
    deps: [XHRBackend, RequestOptions, AuthService]
  })
]).then((appRef: ComponentRef<any>) => {
  // store a reference to the application injector
  appInjector(appRef.injector);
});
