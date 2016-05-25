import {appInjector} from './appInjector';
import {AuthService} from './auth.service';
import {ComponentInstruction} from '@angular/router-deprecated';

export const requireAuth = (next: ComponentInstruction, prev: ComponentInstruction) => {
  const injector = appInjector();
  return injector.get(AuthService).requireAuth(next.urlPath);
};
