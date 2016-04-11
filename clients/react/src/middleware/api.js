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

      const [REQUEST, SUCCESS, FAILURE] = types;
      const [requestCreator, successCreator, failureCreator] = creators || [];
      next({...rest, type: REQUEST});
      if (requestCreator) {
        dispatch(requestCreator);
      }
      const actionPromise = promise(client);
      actionPromise.then(
        (response) => {
          next({...rest, response, type: SUCCESS});
          if (successCreator) {
            dispatch(successCreator());
          }
        },
        (error) => {
          next({...rest, error, type: FAILURE});
          if (failureCreator) {
            dispatch(failureCreator());
          }
        }
      ).catch((error) => {
        next({...rest, error, type: FAILURE});
        if (failureCreator) {
          dispatch(failureCreator());
        }
      });

      return actionPromise;
    };
  };
}
