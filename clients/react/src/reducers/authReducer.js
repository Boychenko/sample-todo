import {createTokenManager} from '../helpers/oidcHelpers';
import * as types from '../constants/actionTypes';

const getAuthState = () => {
  const manager = createTokenManager();
  return {
    isAuthenticated: !manager.expired,
    profile        : !manager.expired && manager.profile
  };
};

export default function authReducer(state = getAuthState(), action) {
  switch (action.type) {
    case types.AUTHENTICATION_SUCCESS:
      return getAuthState();
    case types.AUTHENTICATION_ERROR:
    case types.LOGOUT:
      return {
        isAuthenticated: false,
        profile        : {}
      };
    default:
      return state;
  }
}
