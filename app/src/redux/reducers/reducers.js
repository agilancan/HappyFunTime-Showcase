import { combineReducers } from "redux";
import { firebaseStateReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

import GameReducer from './GameReducer';

const makeRootReducer = asyncReducers =>
  combineReducers({
    firebase: firebaseStateReducer,
    firestore: firestoreReducer,
    GameReducer,
    ...asyncReducers
  });

export default makeRootReducer;
