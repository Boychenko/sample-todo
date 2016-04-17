import * as types from '../constants/actionTypes';

export default function editItemReducer(state = null, action) {
  switch (action.type) {
    case types.ITEM_REQUEST:
    case types.ITEM_FAILURE:
      return null;
    case types.ITEM_EDIT:
      return action.data || action.response;
    default:
      return state;
  }
}
