import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {routerReducer} from 'react-router-redux';
import authReducer from './authReducer';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import itemReducer from './itemsReducer';
import referencesReducer from './referencesReducer';

const rootReducer = combineReducers({
  items     : itemReducer,
  form      : formReducer,
  routing   : routerReducer,
  auth      : authReducer,
  references: referencesReducer,
  reduxAsyncConnect
});

export default rootReducer;
