import * as types from '../constants/ActionTypes';

export function loadItems(page) {
  return {
    types: [types.ITEMS_REQUEST, types.ITEMS_SUCCESS, types.ITEMS_FAILURE],
    promise: (client) => client.get('/items', {params})
  };
}

export function saveItem(item) {
  return {
    types: [types.SAVE_ITEM_REQUEST, types.SAVE_ITEM_SUCCESS, types.SAVE_ITEM_FAILURE],
    promise: (client) => client.post('/items', {data: item})
  };
}
