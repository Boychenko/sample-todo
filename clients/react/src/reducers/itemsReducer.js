import * as types from '../constants/ActionTypes';

export default function itemsReducer(state = [], action) {
  switch (action.type) {
    case types.ITEMS_SUCCESS:
      return (action.result && action.result.list) || [];
    default:
      return state;
  }
}
