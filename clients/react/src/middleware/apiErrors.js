import {createTokenManager, triggerAuth} from '../helpers/oidcHelpers';
import {browserHistory} from 'react-router';
import * as actions from '../actions/actions';
import * as actionTypes from '../constants/actionTypes';
import toastr from 'toastr';

export default function ({dispatch}) {
  return next => action => {
    let nextAction = action;
    if (action.type === actionTypes.API_REQUEST_FAILED) {
      const {err, body} = action.error;
      if (err.status === 401 || err.status === 403 ||
        err.status === 419 || err.status === 440) {
        const manager = createTokenManager();
        if (manager.expired) {
          triggerAuth();
        } else {
          dispatch(actions.authorizationError({err, body}));
          browserHistory.push('/');
        }
      }
      const error = body || err;
      if (err.status === 400) { //validation error
        toastr.error((error && error.message) || 'Validation error');
      }

      nextAction = action.failureAction;
    }

    next(nextAction);
  };
}
