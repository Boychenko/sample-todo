import * as types from '../constants/actionTypes';

export default function referencesReducer(state = null, action) {
  switch (action.type) {
    case types.REFERENCES_REQUEST:
    case types.REFERENCES_FAILURE:
      return null;
    case types.REFERENCES_SUCCESS:
      return action.response;
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return Boolean(globalState.references);
}
