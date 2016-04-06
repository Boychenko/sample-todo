import {combineReducers} from 'redux';
import items from './itemsReducer';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  items,
  form: formReducer
});

export default rootReducer;
