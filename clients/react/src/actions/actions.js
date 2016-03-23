import * as types from '../constants/ActionTypes';

export function loadItems() {
  return {
    types: [types.ITEMS_REQUEST, types.ITEMS_SUCCESS, types.ITEMS_FAILURE],
    promise: (client) => client.get('/items') // params not used, just shown as demonstration
  };
}
