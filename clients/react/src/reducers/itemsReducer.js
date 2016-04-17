import {combineReducers} from 'redux';
import * as types from '../constants/actionTypes';
import paginate from './paginate';
import editItemReducer from './editItemReducer';

export default combineReducers({
  paging: paginate({
    types: [
      types.ITEMS_REQUEST,
      types.ITEMS_SUCCESS,
      types.ITEMS_FAILURE
    ]
  }),
  editItem: editItemReducer
});
