import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import api from '../middleware/api';
import ApiClient from '../helpers/AuthApiClient';
import rootReducer from '../reducers';
import apiErrors from '../middleware/apiErrors';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, api(new ApiClient()), apiErrors));
}
