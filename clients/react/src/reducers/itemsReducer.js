import {combineReducers} from 'redux';
import editItemReducer from './editItemReducer';
import itemListReducer from './itemListReducer';

export default combineReducers({
  paging: itemListReducer,
  editItem: editItemReducer
});
