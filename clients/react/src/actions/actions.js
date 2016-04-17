import {browserHistory} from 'react-router';
import {logout as logoutOidc} from 'redux-oidc';
import * as types from '../constants/actionTypes';
import toastr from 'toastr';
import {getRedirectPath, setRedirectPath} from '../helpers/oidcHelpers';

export function loadItems(params) {
  return {
    types  : [types.ITEMS_REQUEST, types.ITEMS_SUCCESS, types.ITEMS_FAILURE],
    promise: (client) => client.get('/items', {params})
  };
}

export function editItem(id) {
  if (id) {
    return {
      types  : [types.ITEM_REQUEST, types.ITEM_EDIT, types.ITEM_FAILURE],
      promise: (client) => client.get(`/items/${id}`)
    };
  }

  return {
    type: types.ITEM_EDIT,
    data: {id: 0, title: '', dueDate: new Date(), completed: false, priority: 0}
  };
}

export function saveItem(item) {
  let promise;
  if (item.id) {
    promise = (client) => client.put('/items', {data: item});
  } else {
    promise = (client) => client.post('/items', {data: item});
  }
  return {
    types   : [types.SAVE_ITEM_REQUEST, types.SAVE_ITEM_SUCCESS, types.SAVE_ITEM_FAILURE],
    creators: [null, () => browserHistory.push('/items')],
    promise
  };
}

export function deleteItem(item, loadParams) {
  return {
    types   : [types.DELETE_ITEM_REQUEST, types.DELETE_ITEM_SUCCESS, types.DELETE_ITEM_FAILURE],
    creators: [null, dispatch => dispatch(loadItems(loadParams))],
    promise : (client) => {
      return client.del(`/items/${item.id}`);
    }
  };
}

export function authenticationSuccess(profile) {
  browserHistory.push(getRedirectPath() || '/');
  setRedirectPath();
  return {
    type: types.AUTHENTICATION_SUCCESS,
    profile
  };
}

export function authenticationError(error) {
  toastr.error('Failed', 'Authentication error');
  return {
    type: types.AUTHENTICATION_ERROR,
    error
  };
}

export function authorizationError({err, body}) {
  toastr.error((body && body.message) || 'Authorization error');
  return {
    type : types.AUTHORIZATION_ERROR,
    error: {err, body}
  };
}

export function logout(error) {
  logoutOidc();
  browserHistory.push('/');
  return {
    type: types.AUTHORIZATION_ERROR,
    error
  };
}
