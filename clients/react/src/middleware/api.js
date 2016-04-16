import {createTokenManager, triggerAuth} from '../helpers/oidcHelpers';
import {browserHistory} from 'react-router';
import * as actions from '../actions/actions';

export default function (client) {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const {promise, types, creators, ...rest} = action; // eslint-disable-line no-use-before-define
      if (!promise) {
        return next(action);
      }

      const callCreator = creator => {
        if (creator) {
          creator(dispatch);
        }
      };

      const [REQUEST, SUCCESS, FAILURE] = types;
      const [requestCreator, successCreator, failureCreator] = creators || [];
      next({...rest, type: REQUEST});

      callCreator(requestCreator);

      const actionPromise = promise(client);
      actionPromise.then(
        (response) => {
          next({...rest, response, type: SUCCESS});
          callCreator(successCreator);
        },
        ({err, body}) => {
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
          next({...rest, error: body || err, type: FAILURE});
          callCreator(failureCreator);
        }
      ).catch((error) => {
        next({...rest, error, type: FAILURE});
        callCreator(failureCreator);
      });

      return actionPromise;
    };
  };
}
