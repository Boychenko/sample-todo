import {combineReducers} from 'redux';
import * as types from '../constants/ActionTypes';
import {reducer as formReducer} from 'redux-form';
import paginate from './paginate';

const rootReducer = combineReducers({
  items: paginate({
    types: [
      types.ITEMS_REQUEST,
      types.ITEMS_SUCCESS,
      types.ITEMS_FAILURE
    ]
  }),
  form : formReducer
});

export default rootReducer;
