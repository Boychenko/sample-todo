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

      const dispatchFromCreator = creator => {
        if (creator) {
          const act = creator();
          if (act) {
            dispatch(act);
          }
        }
      };

      const [REQUEST, SUCCESS, FAILURE] = types;
      const [requestCreator, successCreator, failureCreator] = creators || [];
      next({...rest, type: REQUEST});

      dispatchFromCreator(requestCreator);

      const actionPromise = promise(client);
      actionPromise.then(
        (response) => {
          next({...rest, response, type: SUCCESS});
          dispatchFromCreator(successCreator);
        },
        (error) => {
          next({...rest, error, type: FAILURE});
          dispatchFromCreator(failureCreator);
        }
      ).catch((error) => {
        next({...rest, error, type: FAILURE});
        dispatchFromCreator(failureCreator);
      });

      return actionPromise;
    };
  };
}
