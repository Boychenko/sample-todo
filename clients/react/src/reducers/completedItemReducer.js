import * as types from '../constants/actionTypes';

function markItemCompleted(state, itemId) {
  return {
    ...state,
    list: state.list.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          completed: true
        };
      }
      return item;
    })
  };
}

export default function completedItemReducer(state, action) {
  switch (action.type) {
    case types.MARK_ITEM_COMPLETED:
      return markItemCompleted(state, action.data);
    default:
      return state;
  }
}
