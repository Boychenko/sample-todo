import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import api from '../middleware/api';
import ApiClient from '../helpers/ApiClient';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, api(new ApiClient())));
}
