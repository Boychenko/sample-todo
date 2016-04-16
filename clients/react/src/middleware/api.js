import * as actionTypes from '../constants/actionTypes';

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
          const failureAction = {...rest, error: body || err, type: FAILURE};
          next({type: actionTypes.API_REQUEST_FAILED, error: {err, body}, failureAction});
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
