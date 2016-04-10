import * as types from '../constants/ActionTypes';

export function loadItems(params) {
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

export function deleteItem(item) {
  return {
    types: [types.DELETE_ITEM_REQUEST, types.DELETE_ITEM_SUCCESS, types.DELETE_ITEM_FAILURE],
    promise: (client) => client.del(`/items/${item.id}`)
  };
}
