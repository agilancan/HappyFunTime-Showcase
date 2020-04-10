import { combineReducers } from "redux";

import GameReducer from './GameReducer';

const makeRootReducer = asyncReducers =>
  combineReducers({
    GameReducer,
    ...asyncReducers
  });

export default makeRootReducer;
