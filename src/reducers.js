import { combineReducers } from "redux-immutable";
// import { combineReducers } from "redux";

export default function createReducer(injectedReducers) {
  return combineReducers({
    ...injectedReducers,
  });
}
