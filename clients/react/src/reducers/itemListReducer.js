import * as types from '../constants/actionTypes';
import paginate from './paginate';
import completedItemReducer from './completedItemReducer';

const paginateReducer = paginate({
  types: [
    types.ITEMS_REQUEST,
    types.ITEMS_SUCCESS,
    types.ITEMS_FAILURE
  ]
});

export default function itemListReducer(state, action) {
  return completedItemReducer(paginateReducer(state, action), action);
}
