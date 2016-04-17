import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {routerReducer} from 'react-router-redux';
import authReducer from './authReducer';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import itemReducer from './itemsReducer';

const rootReducer = combineReducers({
  items  : itemReducer,
  form   : formReducer,
  routing: routerReducer,
  auth   : authReducer,
  reduxAsyncConnect
});

export default rootReducer;
